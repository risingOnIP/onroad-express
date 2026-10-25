import OpenAI from "openai";
import type { ResponseCreateParams } from "openai/resources/responses/responses";
import {
  DealTabs,
  ClientTabs,
  ClientSections,
  ViewModes,
  TemplateTabsEnum,
  ModifyTypes,
  HelpTabs,
} from "./types";

// All available tools - can be filtered by role
// Define source in legacy shape, export flattened to Responses API shape
type ResponsesToolList = NonNullable<ResponseCreateParams["tools"]>;
const allToolsSource = [
  {
    type: "function",
    function: {
      name: "navigate_within_deal",
      description:
        "REQUIRED when user wants to navigate within a specific deal or after creating/accessing deal-related resources. Use when user says: 'take me to deal [name/id]', 'go to [deal tab]', 'show me deal forms', 'navigate to deal timeline', or when you create/access deal-related resources like forms or properties. Always use this after creating forms, deal options, or accessing deal-specific content. Use actual deal IDs, not names. Call this LAST after all other tools when working within deals.",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description:
              "The exact UUID of the deal to navigate to. Required. Get from request_all_deals or request_deal if needed.",
          },

          tab: {
            type: "string",
            enum: [...DealTabs],
            description:
              "The main tab within the deal to navigate to. Defaults to 'timeline' if not specified.",
          },
          clientTab: {
            type: "string",
            enum: [...ClientTabs],
            description:
              "Sub-tab within the clients section. Only used when tab is 'clients'.",
          },
          clientSection: {
            type: "string",
            enum: [...ClientSections],
            description:
              "Section within the clients tab. Only used when tab is 'clients'.",
          },
          editingIntake: {
            type: "string",
            description:
              "ID of intake being edited. Only used when in clients section.",
          },
          viewingResponses: {
            type: "string",
            description:
              "ID of intake responses being viewed. Only used when in clients section.",
          },
          previewingIntake: {
            type: "string",
            description:
              "ID of intake being previewed. Only used when in clients section.",
          },
          selectedClientIntakeId: {
            type: "string",
            description:
              "ID of selected client intake. Only used when in clients section.",
          },
          viewMode: {
            type: "string",
            enum: [...ViewModes],
            description:
              "View mode within the forms section. Only used when tab is 'forms'.",
          },
          selectedFormId: {
            type: "string",
            description:
              "ID of selected form. Only used when tab is 'forms' and viewMode requires it.",
          },
          selectedPropertyId: {
            type: "string",
            description:
              "ID of selected property/deal option. Only used when tab is 'forms' and viewMode is 'property-editor'.",
          },
        },
        required: ["dealId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_templates",
      description:
        "REQUIRED when user wants to navigate to templates section or after creating/modifying templates. Use when user says: 'take me to templates', 'go to template creation', 'show me templates', 'create a new template', or when you create/access template-related resources. Always use this after creating or modifying templates. Call this LAST after all other tools when working with templates.",
      parameters: {
        type: "object",
        properties: {
          tab: {
            type: "string",
            enum: [...TemplateTabsEnum],
            description:
              "The main tab within templates to navigate to. Defaults to 'create' if not specified.",
          },
          modifyType: {
            type: "string",
            enum: [...ModifyTypes],
            description:
              "Type of template to modify. Only used when tab is 'modify'.",
          },
          templateId: {
            type: "string",
            description:
              "ID of specific template to modify. Optional - user can select template after navigation if not provided. Only used when tab is 'modify'.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_workspace",
      description:
        "REQUIRED when user wants to navigate to main workspace or dashboard. Use when user says: 'take me to workspace', 'go to dashboard', 'show me my deals overview', 'go home', or when you want to show the user their main work area. This is the default landing page for realtors showing deal overview and recent activity.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_crm",
      description:
        "REQUIRED when user wants to navigate to CRM section for client management. Use when user says: 'take me to CRM', 'show me my clients', 'go to client management', 'manage my contacts', or when you want to show client-related information outside of specific deals. This is for overall client relationship management.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "navigate_to_help_docs",
      description:
        "REQUIRED when user wants to navigate to help documentation or get assistance. Use when user says: 'take me to help', 'show me documentation', 'how do I use this feature', 'go to help docs', or when you want to direct them to relevant documentation. Use this to help users learn the platform features.",
      parameters: {
        type: "object",
        properties: {
          tab: {
            type: "string",
            enum: [...HelpTabs],
            description:
              "Specific help documentation tab to navigate to. Defaults to 'getting-started' if not specified.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "request_all_deals",
      description:
        "REQUIRED when user asks about their deals or wants to work with a specific deal. Use this whenever user says: 'what are my deals', 'show me my deals', 'go to my deal', 'add form to deal', or any deal-related request. Returns complete list with dealIds needed for subsequent actions. WORKFLOW: After getting deals, use dealId for get_all_deal_options_in_deal when adding forms.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_form_metadata",
      description:
        "Gets metadata for a specific form including creation date, deal option, form type, signature sequence and form_completion_percentage. If the form has been uploaded by the user rather than a standardized form, then PDF status, and custom schema information will also be present. Use when user asks about form details, form status, form name, or other form details. Keep in mind formtype and form name are used interchangeably.",
      parameters: {
        type: "object",
        properties: {
          formId: {
            type: "string",
            description: "The UUID of the form to get metadata for. Required.",
          },
        },
        required: ["formId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_form_values",
      description:
        "Gets specific field values and schema information for requested fields in a form. Use when user wants to see specific field values from a specific form instance.",
      parameters: {
        type: "object",
        properties: {
          formId: {
            type: "string",
            description: "The ID of the form to retrieve values from",
          },
          formType: {
            type: "string",
            description:
              "The type of the form (must match the form's actual type)",
          },
          unique_ids: {
            type: "array",
            items: {
              type: "string",
            },
            description:
              "Array of specific field unique_ids to retrieve values for",
          },
        },
        required: ["formId", "formType", "unique_ids"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_fields_in_form",
      description:
        "Lists fields for a specific form type showing basic field information. Use this first to discover what fields are available before using getFormValues with the array of unique ids to get specific field data.",
      parameters: {
        type: "object",
        properties: {
          formType: {
            type: "string",
            description: "The type of form to list fields for. Required.",
          },
        },
        required: ["formType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_file_upload_pdf_form",
      description:
        "Retrieves a user-uploaded PDF form file for analysis. Use when user wants AI to examine their custom PDF form or when analyzing uploaded document content.",
      parameters: {
        type: "object",
        properties: {
          formId: {
            type: "string",
            description:
              "The UUID of the form containing the uploaded PDF file. Required.",
          },
        },
        required: ["formId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_fields",
      description:
        "Updates specific field values in forms. Use when user wants to modify form data or when AI needs to populate form fields with new information. For field with input type checkbox, insert the array of options that need to be checked even if there is only one check, keep a singleton array. For input type signature, keep the object as {actionAs: 'signer' | 'delegator', email: string} where the email field is the email of the person and actionAs depends on whether you want the person to sign by themselves or delegate their signature to another person. Use signer by default when not specified and delegator only with the other realtor being in the email box so they can send to their client.",
      parameters: {
        type: "object",
        properties: {
          form_id: {
            type: "string",
            description: "The ID of the form to update",
          },
          updates: {
            type: "array",
            items: {
              type: "object",
              properties: {
                unique_id: {
                  type: "string",
                  description: "The unique identifier of the field to update",
                },
                new_value: {
                  oneOf: [
                    {
                      type: "string",
                      description: "String value for text fields",
                    },
                    {
                      type: "array",
                      items: { type: "string" },
                      description: "Array of strings for checkbox fields",
                    },
                    {
                      type: "object",
                      properties: {
                        actionAs: {
                          type: "string",
                          enum: ["signer", "delegator"],
                          description:
                            "Whether person signs directly or delegates to another",
                        },
                        email: {
                          type: "string",
                          description: "Email address of the person",
                        },
                      },
                      required: ["actionAs", "email"],
                      description:
                        "Signature object with action type and email",
                    },
                  ],
                  description:
                    "The new value to set for this field. Use string for text, array for checkboxes, or signature object for signatures.",
                },
              },
              required: ["unique_id", "new_value"],
            },
            description: "Array of field updates to apply",
          },
        },
        required: ["form_id", "updates"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_all_form_metadatas_in_deal_option",
      description:
        "Gets metadata for all forms associated with a specific deal option/property. Use when user wants to see all forms for a property or when analyzing deal option documentation.",
      parameters: {
        type: "object",
        properties: {
          dealOptionId: {
            type: "string",
            description:
              "The UUID of the deal option to get forms for. Required.",
          },
        },
        required: ["dealOptionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_all_deal_options_in_deal",
      description:
        "Gets all property/deal options within a specific deal. MANDATORY when adding forms: After request_all_deals, you MUST call this tool with the dealId to get dealOptionId(s). This is step 2 of 3 for adding forms. NEVER try to add forms without calling this first. Use when user wants to add any form (IABS, lease agreement, etc.).",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description: "The UUID of the deal to get options for. Required.",
          },
        },
        required: ["dealId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_form",
      description:
        "Deletes a form from the system. Use when user wants to remove a form completely. WARNING: This is permanent and cannot be undone.",
      parameters: {
        type: "object",
        properties: {
          formId: {
            type: "string",
            description: "The UUID of the form to delete. Required.",
          },
        },
        required: ["formId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_form_to_dealoption",
      description:
        "FINAL STEP for adding forms to deals. This is step 3 of 3: 1) request_all_deals → 2) get_all_deal_options_in_deal → 3) add_form_to_dealoption. NEVER skip steps 1-2. Use dealOptionId from step 2 (NOT dealId). When user says 'add IABS' or 'add [form]', complete all 3 steps.",
      parameters: {
        type: "object",
        properties: {
          formType: {
            type: "string",
            description:
              "The type of form to add. Use get_available_forms_to_add to see available options.",
          },
          dealOptionId: {
            type: "string",
            description:
              "The UUID of the deal option to add the form to. Required. This must be a dealOptionId (NOT dealId). Use get_all_deal_options_in_deal to get this ID.",
          },
        },
        required: ["formType", "dealOptionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_available_forms_to_add",
      description:
        "Gets all available form types that can be added to deal options within a deal. WORKFLOW REMINDER: After using this to choose a form type, ALWAYS call get_all_deal_options_in_deal to get dealOptionId, then add_form_to_dealoption with that dealOptionId (NOT dealId).",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description:
              "The UUID of the deal to get available forms for. Required.",
          },
        },
        required: ["dealId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "send_form_for_signature",
      description:
        "Sends a form for signature workflow. By default, sends all signatures in step 1. If steps are specified, signers in step 1 must complete before step 2 signers can access.",
      parameters: {
        type: "object",
        properties: {
          formId: {
            type: "string",
            description: "The UUID of the form to send for signature.",
          },
          signatureSteps: {
            type: "object",
            additionalProperties: {
              type: "array",
              items: { type: "string" },
            },
            description:
              "Optional. Record mapping step numbers to arrays of signer emails. If not provided, all signers will be in step 1.",
          },
        },
        required: ["formId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_info_about_form_type",
      description:
        "Gets detailed information about a specific form type including when it should be used, required fields, and best practices for the form.",
      parameters: {
        type: "object",
        properties: {
          formType: {
            type: "string",
            description: "The form type to get information about. Required.",
          },
        },
        required: ["formType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_deal_option",
      description:
        "Adds a new deal option/property to a deal. Can only be added to buy or rent deals, not sell or lease deals. For buy/rent deals, the deal option name should be an address.",
      parameters: {
        type: "object",
        properties: {
          deal_option_address: {
            type: "string",
            description:
              "Address of the deal option. Should be an address for buy/rent deals. Use search_for_full_address first to get the proper address format.",
          },
          deal_id: {
            type: "string",
            description:
              "The UUID of the deal to add the option to. Must be a buy or rent deal.",
          },
        },
        required: ["deal_option_address", "deal_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_for_full_address",
      description:
        "Searches for and returns an array of properly formatted full address strings. Use this before creating deals or adding deal options that require addresses.",
      parameters: {
        type: "object",
        properties: {
          partialAddress: {
            type: "string",
            description:
              "Partial address to search for (can be street address, city, etc.).",
          },
        },
        required: ["partialAddress"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_deal",
      description:
        "Creates a new deal with specified name, parties, and optional templates. Deal name can be anything for buy/rent deals but should be an address for sell/lease deals. Use search_for_full_address first for address-based deals.",
      parameters: {
        type: "object",
        properties: {
          deal_name: {
            type: "string",
            description:
              "Name of the deal. Can be anything for buy/rent deals, should be address for sell/lease deals.",
          },
          parties: {
            type: "array",
            items: {
              type: "object",
              properties: {
                role: {
                  type: "string",
                  enum: ["tenant", "buyer", "seller", "landlord"],
                  description: "Role of the party in the transaction",
                },
                name: {
                  type: "string",
                  description: "Full name of the party",
                },
                email: {
                  type: "string",
                  description: "Email address of the party",
                },
              },
              required: ["role", "name", "email"],
            },
            description:
              "Array of parties involved in the deal. At least one party is required.",
          },
          formTemplate: {
            type: "string",
            description:
              "Optional form template in format [buy|rent|sell|lease]-[residential|commercial|improved_land|unimproved_land]-default",
          },
          clientTemplate: {
            type: "string",
            description:
              "Optional client template in format [buy|rent|sell|lease]-[residential|commercial|improved_land|unimproved_land]-default",
          },
        },
        required: ["deal_name", "parties"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_deal_metadata",
      description:
        "Gets metadata for a specific deal including deal name, creation date, template information, and deal side information.",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description: "The UUID of the deal to get metadata for. Required.",
          },
        },
        required: ["dealId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_deal_name",
      description:
        "Updates the name of an existing deal. Use when user wants to rename a deal.",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description: "The UUID of the deal to rename.",
          },
          newName: {
            type: "string",
            description: "The new name for the deal.",
          },
        },
        required: ["dealId", "newName"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_deal",
      description:
        "Deletes a deal and all associated data. WARNING: This is permanent and cannot be undone. Use when user explicitly wants to delete a deal.",
      parameters: {
        type: "object",
        properties: {
          dealId: {
            type: "string",
            description: "The UUID of the deal to delete. Required.",
          },
        },
        required: ["dealId"],
      },
    },
  },
];

// Export as Responses API function tools (flattened shape)
export const allTools: ResponsesToolList = (allToolsSource as any[]).map(
  (t) => ({
    type: "function",
    name: (t as any).function?.name,
    description: (t as any).function?.description,
    parameters: (t as any).function?.parameters,
    strict: (t as any).function?.strict ?? true,
  })
) as ResponsesToolList;
