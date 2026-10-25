import { SupabaseClient } from "@supabase/supabase-js";
import { GenericSchema } from "@supabase/supabase-js/dist/module/lib/types";
import { StatusResponse, AIFormMetaData, AISchemaItem, AIDealOption, AIDeal } from "../../../types/realtor-ai";
import { RealtorPageNavigation, Deal, DealOption, SignatureInput, AvailableForms } from "../../../types/realtor";
import { FormGK } from "../centralIntelligence/knowledgeBase/gk/forms";

// Shared enums to eliminate duplication
export const DealTabs = ['timeline', 'clients', 'forms', 'settings'] as const;
export const ClientTabs = ['all', 'yours', 'properties'] as const;
export const ClientSections = ['management', 'intakes', 'portals'] as const;
export const ViewModes = ['list', 'form-editor', 'property-editor', 'preview', 'finalized'] as const;
export const TemplateTabsEnum = ['create', 'modify'] as const;
export const ModifyTypes = ['transaction_forms', 'client_intake'] as const;
export const HelpTabs = ['getting-started', 'deal-management', 'forms-and-templates', 'ai-features', 'pdf-editor'] as const;

// Tool argument interfaces
export interface ToolArgs {
  navigate_within_deal: { 
    dealId: string;
    tab?: typeof DealTabs[number];
    clientTab?: typeof ClientTabs[number];
    clientSection?: typeof ClientSections[number];
    editingIntake?: string;
    viewingResponses?: string;
    previewingIntake?: string;
    selectedClientIntakeId?: string;
    viewMode?: typeof ViewModes[number];
    selectedFormId?: string;
    selectedPropertyId?: string;
  };
  navigate_to_templates: {
    tab?: typeof TemplateTabsEnum[number];
    modifyType?: typeof ModifyTypes[number];
    templateId?: string;
  };
  navigate_to_workspace: {};
  navigate_to_crm: {};
  navigate_to_help_docs: {
    tab?: typeof HelpTabs[number];
  };
  request_all_deals: {};
  get_form_metadata: {
    formId: string;
  };
  get_form_values: {
    formId: string;
    formType: string;
    unique_ids: string[];
  };
  list_fields_in_form: {
    formType: string;
  };
  get_file_upload_pdf_form: {
    formId: string;
  };
  update_fields: {
    form_id: string;
    updates: {
      unique_id: string;
      new_value: string;
    }[];
  };
  get_all_form_metadatas_in_deal_option: {
    dealOptionId: string;
  };
  get_all_deal_options_in_deal: {
    dealId: string;
  };
  delete_form: {
    formId: string;
  };
  add_form_to_dealoption: {
    formType: string;
    dealOptionId: string;
  };
  get_available_forms_to_add: {
    dealId: string;
  };
  send_form_for_signature: {
    formId: string;
    signatureSteps?: Record<number, string[]>;
  };
  get_info_about_form_type: {
    formType: string;
  };
  add_deal_option: {
    deal_option_address: string;
    deal_id: string;
  };
  search_for_full_address: {
    partialAddress: string;
  };
  create_deal: {
    deal_name: string;
    parties: {
      role: 'tenant' | 'buyer' | 'seller' | 'landlord';
      name: string;
      email: string;
    }[];
    formTemplate?: string;
    clientTemplate?: string;
  };
  get_deal_metadata: {
    dealId: string;
  };
  update_deal_name: {
    dealId: string;
    newName: string;
  };
  delete_deal: {
    dealId: string;
  };
}

// Tool return type mappings
export interface ToolReturns {
  navigate_within_deal: RealtorPageNavigation | StatusResponse;
  navigate_to_templates: RealtorPageNavigation | StatusResponse;
  navigate_to_workspace: RealtorPageNavigation | StatusResponse;
  navigate_to_crm: RealtorPageNavigation | StatusResponse;
  navigate_to_help_docs: RealtorPageNavigation | StatusResponse;
  request_all_deals: Deal[] | StatusResponse;
  get_form_metadata: AIFormMetaData | { error: boolean } | StatusResponse;
  get_form_values: AISchemaItem[] | StatusResponse;
  list_fields_in_form: {
    unique_id: string;
    display_name: string;
    input_type: string;
    required: boolean;
    block: string;
  }[] | StatusResponse;
  get_file_upload_pdf_form: {
    formId: string;
    fileName: string;
    fileUrl: string;
    contentType: string;
    uploadDate: string;
    status: "success";
    // Parsed PDF content
    extractedText: string;
    pageCount: number;
    metadata: {
      info: Record<string, any>;
      version: string;
    };
    // Fallback base64 content
    base64Content: string;
    fileSizeBytes: number;
  } | StatusResponse;
  update_fields:  StatusResponse;
  get_all_form_metadatas_in_deal_option: AIFormMetaData[] | StatusResponse;
  get_all_deal_options_in_deal: AIDealOption[] | StatusResponse;
  delete_form: StatusResponse;
  add_form_to_dealoption: StatusResponse & { formId: string | null; formType: string | null };
  get_available_forms_to_add: AvailableForms | StatusResponse;
  send_form_for_signature: StatusResponse & {
    formId: string;
    signatureCollection: string;
    steps: Record<number, string[]>;
    emailsSent: number;
    message: string;
  };
  get_info_about_form_type: FormGK | StatusResponse;
  add_deal_option: StatusResponse & { dealOptionId: string | null; dealOptionAddress: string | null };
  search_for_full_address: string[] | StatusResponse;
  create_deal: StatusResponse & { dealId: string | null; dealName: string | null; partiesCount: number | null };
  get_deal_metadata: AIDeal | StatusResponse;
  update_deal_name: StatusResponse & { dealId: string | null; dealName: string | null };
  delete_deal: StatusResponse;
}

// Tool function type with type-safe return types
export type ToolFunction<TName extends keyof ToolArgs> = (
  args: ToolArgs[TName],
  supabaseClient: SupabaseClient<unknown, never, GenericSchema>,
  userId: string,
) => Promise<ToolReturns[TName]>;