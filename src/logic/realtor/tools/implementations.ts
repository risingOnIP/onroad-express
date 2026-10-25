import { tool } from '@openai/agents';
import { z } from 'zod';
import { getCurrentSupabaseClient } from '../ai-actions-logic';
import {
  RealtorPageNavigation,
  Form,
  SchemaItem,
  FormResponse,
  Deal,
  DealParty,
  Party,
} from "../../../types/realtor";
import {
  AIDealOption,
  AIFormMetaData,
  AISchemaItem,
} from "../../../types/realtor-ai";
import {
  getDealById,
  getAllDeals,
  createDeal,
  getDealParties,
  updateDeal,
  deleteDeal,
} from "../deal-logic";
import {
  getForm,
  updateFormResponse,
  getAllFormsInDealOption,
  deleteForm,
  getAvailableFormsFromDealId,
} from "../form-logic";
import { ALL_SCHEMAS } from "../centralIntelligence/centralIntelligence";
import { getSignedUrl } from "../../file-upload-logic";
import pdfParse from "pdf-parse";
import {
  addFormToDealOption,
  getAllDealOptions,
  insertDealOption,
} from "../dealOption-logic";
import { formGeneralKnowledgeBase } from "../centralIntelligence/knowledgeBase/gk/forms";
import { getPartiesForDeal } from "../parties-logic";

// Global context for userId
// This will be set by the calling code before using the tools
let currentUserId: string;

// Global navigation result tracker
let pendingNavigation: RealtorPageNavigation | null = null;

// Function to get and clear pending navigation
export function getPendingNavigation(): RealtorPageNavigation | null {
  const nav = pendingNavigation;
  pendingNavigation = null;
  return nav;
}

// Global client sender function
let globalSendToClient: ((data: any) => void) | null = null;

// Function to set the client sender
export function setGlobalSendToClient(sendToClient: (data: any) => void) {
  globalSendToClient = sendToClient;
}


// Calculate form completion percentage mirroring current frontend logic
function evaluateVisibleIf(
  schemaItem: SchemaItem,
  formResponse: FormResponse
): boolean {
  if (
    !schemaItem.display_attributes.visibleIf ||
    schemaItem.display_attributes.visibleIf.length === 0
  ) {
    return true;
  }

  return schemaItem.display_attributes.visibleIf.every((condition) => {
    const fieldValue = (formResponse as Record<string, unknown>)[
      condition.unique_id
    ] as unknown;
    const checkValue = condition.valueChecked as unknown;

    switch (condition.operation) {
      case ">":
        return Number(fieldValue) > Number(checkValue);
      case ">=":
        return Number(fieldValue) >= Number(checkValue);
      case "<":
        return Number(fieldValue) < Number(checkValue);
      case "<=":
        return Number(fieldValue) <= Number(checkValue);
      case "==":
        return String(fieldValue) === String(checkValue);
      case "!==":
        return String(fieldValue) !== String(checkValue);
      case "contains":
        if (Array.isArray(fieldValue)) {
          return (fieldValue as unknown[]).includes(checkValue);
        }
        return String(fieldValue ?? "").includes(String(checkValue ?? ""));
      case "doesNotContain":
        if (Array.isArray(fieldValue)) {
          return !(fieldValue as unknown[]).includes(checkValue);
        }
        return !String(fieldValue ?? "").includes(String(checkValue ?? ""));
      default:
        return true;
    }
  });
}

function buildLinkedFieldIdSet(schema: SchemaItem[]): Set<string> {
  const linkedIds = new Set<string>();
  for (const item of schema) {
    const options = item.display_attributes.checkbox_options?.options;
    if (item.display_attributes.input_type === "checkbox" && options) {
      for (const opt of options) {
        if (opt.linkedFields && Array.isArray(opt.linkedFields)) {
          for (const linkedId of opt.linkedFields) {
            linkedIds.add(linkedId);
          }
        }
      }
    }
  }
  return linkedIds;
}

function calculateCompletionPercentage(form: Form): number {
  if (
    form.file_upload_pdf &&
    typeof form.file_upload_pdf === "string" &&
    form.file_upload_pdf.trim() !== ""
  ) {
    return 100;
  }

  // Determine schema
  let schema: SchemaItem[] = [];
  if (Array.isArray(form.custom_schema) && form.custom_schema.length > 0) {
    schema = form.custom_schema as unknown as SchemaItem[];
  } else if (
    form.form_type &&
    ALL_SCHEMAS[form.form_type as keyof typeof ALL_SCHEMAS]
  ) {
    schema = ALL_SCHEMAS[form.form_type as keyof typeof ALL_SCHEMAS] ?? [];
  }

  const formResponses: FormResponse = (form.form_response ??
    {}) as FormResponse;

  if (!schema || schema.length === 0) {
    // No schema, cannot compute, treat as 0% to be conservative
    return 0;
  }

  // Exclude linked checkbox child fields and hidden fields from progress
  const linkedFieldIds = buildLinkedFieldIdSet(schema);
  const isFieldVisible = (item: SchemaItem): boolean => {
    if (item.display_attributes.isHidden) return false;
    if (linkedFieldIds.has(item.unique_id)) return false;
    return evaluateVisibleIf(item, formResponses);
  };

  // Only count required and visible fields
  const requiredFields = schema.filter(
    (item) => item.display_attributes.isRequired && isFieldVisible(item)
  );
  const totalRequired = requiredFields.length;

  if (totalRequired === 0) {
    return 100;
  }

  const isCompleted = (item: SchemaItem): boolean => {
    const value = (formResponses as Record<string, unknown>)[
      item.unique_id
    ] as unknown;

    // Checkbox with minSelected
    const minSelected = item.display_attributes.checkbox_options?.minSelected;
    if (
      item.display_attributes.input_type === "checkbox" &&
      typeof minSelected === "number"
    ) {
      if (Array.isArray(value)) {
        return (value as unknown[]).length >= minSelected;
      }
      if (
        value &&
        typeof value === "string" &&
        (value as string).trim() !== ""
      ) {
        return minSelected <= 1;
      }
      return false;
    }

    if (Array.isArray(value)) {
      return (value as unknown[]).length > 0;
    }
    return Boolean(value) && value!.toString().trim() !== "";
  };

  const completedRequired = requiredFields.filter(isCompleted).length;
  return Math.round((completedRequired / totalRequired) * 100);
}

// Tool functions that can be called directly for testing
export const toolFunctions = {
  navigate_within_deal: async (params: {
    dealId: string;
    tab?: 'timeline' | 'clients' | 'forms' | 'settings' | null;
    clientTab?: 'all' | 'yours' | 'properties' | null;
    clientSection?: 'management' | 'intakes' | 'portals' | null;
    editingIntake?: string | null;
    viewingResponses?: string | null;
    previewingIntake?: string | null;
    selectedClientIntakeId?: string | null;
    viewMode?: 'list' | 'form-editor' | 'property-editor' | 'preview' | 'finalized' | null;
    selectedFormId?: string | null;
    selectedPropertyId?: string | null;
  }) => {
    try {
      console.log("[navigate_within_deal] Called with args:", { dealId: params.dealId, tab: params.tab });
      
      const navigationResult = {
        area: "inside_deal",
        deal: {
          dealId: params.dealId,
          tab: params.tab || "timeline",
          clients: params.tab === "clients" ? {
            clientTab: params.clientTab,
            clientSection: params.clientSection,
            editingIntake: params.editingIntake,
            viewingResponses: params.viewingResponses,
            previewingIntake: params.previewingIntake,
            selectedClientIntakeId: params.selectedClientIntakeId,
          } : undefined,
          forms: params.tab === "forms" ? {
            viewMode: params.viewMode,
            selectedFormId: params.selectedFormId,
            selectedPropertyId: params.selectedPropertyId,
          } : undefined,
        },
      } as RealtorPageNavigation;

      console.log("[TOOL] Navigation result created:", JSON.stringify(navigationResult, null, 2));
      
      return navigationResult;
    } catch (error) {
      console.error("[navigate_within_deal] Error:", error);
      return {
        status: "error",
        errorMessage: "Navigation failed"
      };
    }
  },

  navigate_to_templates: async (params: {
    tab?: 'create' | 'modify' | null;
    modifyType?: 'transaction_forms' | 'client_intake' | null;
    templateId?: string | null;
  }) => {
    try {
      console.log("[navigate_to_templates] Called with args:", params);
      
      const navigationResult = {
        area: "templates",
        templates: {
          tab: params.tab || "create",
          modifyType: params.modifyType,
          templateId: params.templateId,
        },
      } as RealtorPageNavigation;

      console.log("[TOOL] Navigation result created:", JSON.stringify(navigationResult, null, 2));
      
      return navigationResult;
    } catch (error) {
      console.error("[navigate_to_templates] Error:", error);
      return {
        status: "error",
        errorMessage: "Navigation failed"
      };
    }
  },

  navigate_to_workspace: async (params: {}) => {
    try {
      console.log("[navigate_to_workspace] Called");
      
      const navigationResult = {
        area: "workspace",
      } as RealtorPageNavigation;
      
      console.log("[TOOL] Navigation result created:", JSON.stringify(navigationResult, null, 2));
      
      return navigationResult;
    } catch (error) {
      console.error("[navigate_to_workspace] Error:", error);
      return {
        status: "error",
        errorMessage: "Navigation failed"
      };
    }
  },

  navigate_to_crm: async (params: {}) => {
    try {
      console.log("[navigate_to_crm] Called");
      
      const navigationResult = {
        area: "crm",
      } as RealtorPageNavigation;

      console.log("[TOOL] Navigation result created:", JSON.stringify(navigationResult, null, 2));
      
      return navigationResult;
    } catch (error) {
      console.error("[navigate_to_crm] Error:", error);
      return {
        status: "error",
        errorMessage: "Navigation failed"
      };
    }
  },

  navigate_to_help_docs: async (params: {
    tab?: 'getting-started' | 'deal-management' | 'forms-and-templates' | 'ai-features' | 'pdf-editor' | null;
  }) => {
    try {
      console.log("[navigate_to_help_docs] Called with args:", params);
      
      const navigationResult = {
        area: "help-docs",
        helpDocs: {
          tab: params.tab || "getting-started",
        },
      } as RealtorPageNavigation;

      console.log("[TOOL] Navigation result created:", JSON.stringify(navigationResult, null, 2));
      
      return navigationResult;
    } catch (error) {
      console.error("[navigate_to_help_docs] Error:", error);
      return {
        status: "error",
        errorMessage: "Navigation failed"
      };
    }
  },

  request_all_deals: async (params: {}) => {
    try {
      console.log("[request_all_deals] Called for userId:", currentUserId);
      const supabaseClient = getCurrentSupabaseClient();
      const deals = await getAllDeals(currentUserId, supabaseClient as any);
      
      console.log("[request_all_deals] Returning deals:", deals.length);
      return deals;
    } catch (error) {
      console.error("[request_all_deals] Error:", error);
      return {
        status: "error",
        errorMessage: error instanceof Error ? error.message : "Failed to get deals"
      };
    }
  },

  get_form_metadata: async (params: {
    formId: string;
  }) => {
    try {
      console.log("[get_form_metadata] Getting metadata for form:", params.formId);
      const supabaseClient = getCurrentSupabaseClient();
      const form = await getForm(params.formId, supabaseClient as any);
      
      if (!form) {
        return {
          status: "error",
          errorMessage: "Form not found"
        };
      }

      const formMetadata: AIFormMetaData = {
        formId: form.id,
        formType: form.form_type,
        formName: form.form_type,
        dealOptionId: form.deal_option_id,
        createdAt: form.created_at,
        signatureSequence: [],
        form_completion_percentage: calculateCompletionPercentage(form).toString(),
      };

      if (form.file_upload_pdf) {
        formMetadata.uploadedPdfStatus = "uploaded";
        formMetadata.hasCustomSchema = Array.isArray(form.custom_schema) && form.custom_schema.length > 0;
      } else {
        formMetadata.uploadedPdfStatus = "not_uploaded";
        formMetadata.hasCustomSchema = false;
      }

      console.log("[get_form_metadata] Returning metadata:", formMetadata);
      return formMetadata;
    } catch (error) {
      console.error("[get_form_metadata] Error:", error);
      return {
        status: "error",
        errorMessage: error instanceof Error ? error.message : "Failed to get form metadata"
      };
    }
  },
};

// Export context setter for userId only
export function setToolContext(userId: string) {
  currentUserId = userId;
}

// Export all tools as an agent SDK tools array
export const agentTools = [
  tool({
    name: 'navigate_within_deal',
    description: 'ALWAYS CALL THIS TOOL when user wants to navigate to any part of a deal. Use this for ALL navigation requests to deals, forms, clients, etc.',
    parameters: z.object({
      dealId: z.string().describe('The exact UUID of the deal to navigate to. Required.'),
      tab: z.enum(['timeline', 'clients', 'forms', 'settings']).nullable().optional().describe('The main tab within the deal to navigate to.'),
      clientTab: z.enum(['all', 'yours', 'properties']).nullable().optional().describe('Sub-tab within the clients section.'),
      clientSection: z.enum(['management', 'intakes', 'portals']).nullable().optional().describe('Section within the clients tab.'),
      editingIntake: z.string().nullable().optional().describe('ID of intake being edited.'),
      viewingResponses: z.string().nullable().optional().describe('ID of intake responses being viewed.'),
      previewingIntake: z.string().nullable().optional().describe('ID of intake being previewed.'),
      selectedClientIntakeId: z.string().nullable().optional().describe('ID of selected client intake.'),
      viewMode: z.enum(['list', 'form-editor', 'property-editor', 'preview', 'finalized']).nullable().optional().describe('View mode within the forms section.'),
      selectedFormId: z.string().nullable().optional().describe('ID of selected form.'),
      selectedPropertyId: z.string().nullable().optional().describe('ID of selected property/deal option.'),
    }),
    execute: async (params: any) => {
      console.log('[SDK WRAPPER] navigate_within_deal execute called with params:', params);
      
      // Send navigation immediately from wrapper
      if (globalSendToClient) {
        console.log("[IMMEDIATE] Sending navigation immediately from wrapper");
        const navigationData = {
          area: "inside_deal",
          deal: {
            dealId: params.dealId,
            tab: params.tab || "timeline",
            clients: params.tab === "clients" ? {
              clientTab: params.clientTab,
              clientSection: params.clientSection,
              editingIntake: params.editingIntake,
              viewingResponses: params.viewingResponses,
              previewingIntake: params.previewingIntake,
              selectedClientIntakeId: params.selectedClientIntakeId,
            } : undefined,
            forms: params.tab === "forms" ? {
              viewMode: params.viewMode,
              selectedFormId: params.selectedFormId,
              selectedPropertyId: params.selectedPropertyId,
            } : undefined,
          },
        };
        globalSendToClient({
          type: "navigation",
          navigationData: navigationData
        });
      }
      
      const result = await toolFunctions.navigate_within_deal(params);
      console.log('[SDK WRAPPER] navigate_within_deal result:', JSON.stringify(result, null, 2));
      return result;
    },
  }),

  tool({
    name: 'navigate_to_templates',
    description: 'REQUIRED when user wants to navigate to templates section or after creating/modifying templates.',
    parameters: z.object({
      tab: z.enum(['create', 'modify']).nullable().optional().describe('The main tab within templates to navigate to.'),
      modifyType: z.enum(['transaction_forms', 'client_intake']).nullable().optional().describe('Type of template to modify.'),
      templateId: z.string().nullable().optional().describe('ID of specific template to modify.'),
    }),
    execute: async (params: any) => {
      console.log('[SDK WRAPPER] navigate_to_templates execute called with params:', params);
      
      // Send navigation immediately from wrapper
      if (globalSendToClient) {
        console.log("[IMMEDIATE] Sending navigation immediately from wrapper");
        globalSendToClient({
          type: "navigation",
          navigationData: {
            area: "templates",
            templates: {
              tab: params.tab || "create",
              modifyType: params.modifyType,
              templateId: params.templateId,
            },
          }
        });
      }
      
      const result = await toolFunctions.navigate_to_templates(params);
      console.log('[SDK WRAPPER] navigate_to_templates result:', JSON.stringify(result, null, 2));
      return result;
    },
  }),

  tool({
    name: 'navigate_to_workspace',
    description: 'REQUIRED when user wants to navigate to main workspace or dashboard.',
    parameters: z.object({}),
    execute: async (params: any) => {
      console.log("[SDK WRAPPER] navigate_to_workspace execute called with params:", params);
      
      // Send navigation immediately from wrapper
      if (globalSendToClient) {
        console.log("[IMMEDIATE] Sending navigation immediately from wrapper");
        globalSendToClient({
          type: "navigation",
          navigationData: { area: "workspace" }
        });
      }
      
      const result = await toolFunctions.navigate_to_workspace(params);
      console.log("[SDK WRAPPER] navigate_to_workspace result:", JSON.stringify(result, null, 2));
      return result;
    },
  }),

  tool({
    name: 'navigate_to_crm',
    description: 'REQUIRED when user wants to navigate to CRM section for client management.',
    parameters: z.object({}),
    execute: async (params: any) => {
      console.log('[SDK WRAPPER] navigate_to_crm execute called with params:', params);
      
      // Send navigation immediately from wrapper
      if (globalSendToClient) {
        console.log("[IMMEDIATE] Sending navigation immediately from wrapper");
        globalSendToClient({
          type: "navigation",
          navigationData: { area: "crm" }
        });
      }
      
      const result = await toolFunctions.navigate_to_crm(params);
      console.log('[SDK WRAPPER] navigate_to_crm result:', JSON.stringify(result, null, 2));
      return result;
    },
  }),

  tool({
    name: 'navigate_to_help_docs',
    description: 'REQUIRED when user wants to navigate to help documentation or get assistance.',
    parameters: z.object({
      tab: z.enum(['getting-started', 'deal-management', 'forms-and-templates', 'ai-features', 'pdf-editor']).nullable().optional().describe('Specific help documentation tab to navigate to.'),
    }),
    execute: async (params: any) => {
      console.log('[SDK WRAPPER] navigate_to_help_docs execute called with params:', params);
      
      // Send navigation immediately from wrapper
      if (globalSendToClient) {
        console.log("[IMMEDIATE] Sending navigation immediately from wrapper");
        globalSendToClient({
          type: "navigation",
          navigationData: {
            area: "help-docs",
            helpDocs: {
              tab: params.tab || "getting-started",
            },
          }
        });
      }
      
      const result = await toolFunctions.navigate_to_help_docs(params);
      console.log('[SDK WRAPPER] navigate_to_help_docs result:', JSON.stringify(result, null, 2));
      return result;
    },
  }),

  tool({
    name: 'request_all_deals',
    description: 'ALWAYS CALL THIS TOOL first when user mentions deals, properties, or wants to see their data. MANDATORY for any deal-related request.',
    parameters: z.object({}),
    execute: async (params: any) => {
      const result = await toolFunctions.request_all_deals(params);
      return result;
    },
  }),

  tool({
    name: 'get_form_metadata',
    description: 'Gets metadata for a specific form including creation date, deal option, form type, signature sequence and form_completion_percentage.',
    parameters: z.object({
      formId: z.string().describe('The UUID of the form to get metadata for. Required.'),
    }),
    execute: async (params: any) => {
      return await toolFunctions.get_form_metadata(params);
    },
  }),
];