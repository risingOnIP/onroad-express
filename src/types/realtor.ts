export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  files?: { name: string; type: string }[];
  toolCalls?: ToolCall[];
  isError?: boolean;
}

export interface ToolCall {
  name: string;
  arguments?: Record<string, any>;
  status?: "pending" | "success" | "error";
  result?: any;
  error?: string;
}



export interface Deal {
  id: string;
  user_id: string;
  created_at: Date;
  dealName: string;
  template: string;
  isActive: boolean;
  dealSide: "buy" | "rent" | "sell" | "lease";
  partyIntakeTemplate: string;
  steps_statuses: {stepId: string, status: StepStatus}[]; 
}
export type StepStatus = "completed" | "current" | "upcoming";

export interface DealOption
  extends Record<
    string,
    string | boolean | Form[] | Record<string, string> | string[]
  > {
  id: string;
  deal_id: string;
  user_id: string;
  address: string;
  is_selected: boolean;
  created_at: string;
  updated_at: string;
  property_information_response: Record<string, string>;
  property_images: string[];
  attribute_store: Record<string, string>;
}

export interface DealOptionFormMerged extends DealOption {
  forms: Form[];
}

export type SignatureInput = {
  actionAs: "signer" | "delegator";
  email: string;
};


export interface SignerAssignment {
  email: string;
  display_names?: string[]; // display names this person signs
  row_uuid: string; //uuid of signature row
  actionAs: string;
}

export type SignatureOutput = Record<string, Record<string, string>>;

export type FormResponse = Record<string, string | string [] | SignatureInput> ; 
export type PartyResponse = Record<string, string | string[]>; //unique id to value (array for files)

export interface Form extends Record<string, string | number | any> {
  id: string;
  user_id: string;
  created_at: string;
  deal_option_id: string;
  form_type: string;
  form_response: FormResponse;
  order: number;
  signature_sequence: SignerAssignment[][];
  finalized_pdf: string;
  file_upload_pdf: string;
  finalized_audit_json: AuditJson;
  custom_schema: Schema;
  form_stage?: string;
  comments?: FormComments[];
}

export interface FullTemplate extends Template {
  template_forms: Array<TemplateForm>;
}

export interface Template {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
}

export interface TemplateForm {
  id: string;
  created_at: string;
  user_id: string;
  template_id: string;
  form_type: string;
  order: number;
  form_response: FormResponse;
  deal_wide: boolean;
  form_stage?: string;
}

export type CachedData = Record<string, FormResponse>; //form_type -> unique_id -> value

export interface Profile {
  user_id: string;
  role: string;
  created_at: string;
  firstName: string;
  lastName: string;
  email: string;
  broker_license: string;
  realtor_license_number: string;
  cached_data: CachedData;
}

//change below to ensure comments with discriminated unions
export interface SchemaItem {
  unique_id: string;

  pdf_attributes?: {
    formType: string;               
    formfield: string | string[]; // PDF field name (no coordinates), string array for same value radio buttons
    linked_form_fields_text?: string[]; // continuation boxes (left‑to‑right)
    linked_form_fields_radio?: { radioField: string; displayName: string }[];
    linked_form_fields_checkbox?: { fromDatabase: string; pdfAttribute: string}[];
    linked_dates?: { dateFieldName: string }[];
  }[];
  
  /** Rendering, linking, and validation */
  display_attributes: {
    display_name?: string;
    input_type: "text" | "radio" | "checkbox" | "signature" | "fileUpload" | "info" | "text-area";
    description?: string; 
    order: number;                   // global, increments by 1
    attribute?: {
      key: string; 
      operation: string | ((value: string | string[]) => string | string[]); 
      reverseOperation?: string | ((value: string | string[]) => string | string[]);
    };              // simple semantic tag ("address", "phone", etc.)
    block?: string;                  // optional grouping label
    block_style?: {
      title?: string;
      description?: string;
      icon?: string;                   
      color_theme?: 'blue' | 'green' | 'purple' | 'orange' | 'gray';
    }
    visibleIf?: {
      unique_id: string;
      operation: ">" | ">=" | "<" | "<=" | "==" | "!==" | "contains" | "doesNotContain";
      valueChecked: string;
    }[];
    validation?: {
      loopback?: {
        regex: string,
        message: string; // if rule not met display this message to user
      }[]
      crossField?: {
        rule: ">" | ">=" | "<" | "<=" | "==" | "!==" 
        unique_id: string; // the unique_id of the field to check against
        message?: string; // if rule not met display this message to user
      }[]
    };
    placeholder?: string;
    width?: number;                  // 12‑unit grid
    display_radio_options?: string[];
    checkbox_options?: {
      options: {display_name: string, databaseStored: string, linkedFields?: string[]}[];
      maxSelected?: number;
      minSelected?: number;
    }
    
    value: {
      type: "manual" | "resolved" | "reserved";
      output?: "string" | "SignatureInput__signer" | "SignatureInput__delegator";
      supabase?: {
        table: string;
        column: string;
        eqBy: { columnName: string; hardCodedValue?: string; variable?: "dealId" | "dealOptionId" | "userId" }[];
      }[];
      reserved?: "landlord_name_csv" | "tenant_name_csv" | "realtor_name_spaced" | "property_street_address" | "buyer/tenant_name_csv" | "buyer/tenant_phone_number" | "landlord_phone_number" | "landlord_1_initials" | "landlord_2_initials" | "tenant_1_initials" | "tenant_2_initials" | "tenant_3_initials" | "tenant_4_initials"
    };

    breakBefore?: boolean; 

    /** Caching flag: set to true for realtor info */
    isCached?: boolean;  // true for fields such as realtor_name, realtor_number, realtor_phone, realtor_email, broker_firm_name
    isRequired?: boolean;
    isHidden?: boolean; 
    
    special_input?: {
      text?: {
        percentage?: boolean; //for text input
        phone?: boolean; //for text input
        date?: boolean; //for text input like January 1, 2025
        numbered_date?: boolean;  // like 01/01/2025
        month_year?: boolean; // for month/year picker (displays as "Month YYYY")
        currency?: boolean; //for text input with currency formatting
        number?: boolean; //for text input with number-only validation
      }
      checkbox?: {
        asRadio?: boolean; //for checkbox input
        horizontal?: number; //for checkbox input - number of columns
      },
      info?: {
        style?: 'default' | 'subtle' | 'minimal' | 'inline' | 'compact' | 'warning' | 'success' | 'error' | 'tip';
        icon?: boolean; //whether to show icon
        minimizable?: boolean; //whether user can minimize/collapse
      }
      radio?: {
        layout?: 'vertical' | 'horizontal' | 'grid';
        columns?: number; //for grid layout
      }
      signature?: {
        type: "initials" | "signature";
      }
    }
  };
  
}

export interface IndividualKnowledgeRuleSet {
  version: string; 
  requiredForms: {formType: "IABS" | "Animal_Agreement" | "landlord_floodplain_notice" | "Third_party_financing" | "residential_lease_agreement", placement: "deal-wide" | "property-specific", form_stage?: string}[]; // auto-attached forms
  conditionalForms?: {
    if: {
      unique_id: string;
      rule: ">" | ">=" | "<" | "<=" | "==" | "!==";
      value?: string; // for regex / numeric rules
      idCheckedAgainst?: string; // cross-field
    };
    then: {
      formTypes: string[];
    };
  }[];
  suggestions?: { message: string; showTo: "user" | "ai" }[]; // best practice nudges to show to users or to give to ai
  partyIntakeSchemas: {
    buyer1_schema?: PartyIntakeSchema;
    buyer2_schema?: PartyIntakeSchema;
    seller1_schema?: PartyIntakeSchema;
    seller2_schema?: PartyIntakeSchema;
  }
  availableForms: AvailableForms;

  stages: Stage[];

}

export type AvailableForms = {
  deal_wide: {
    formType: string;
    preferredStage?: string;
    whenToAdd?: string;
  }[];
  property_specific?: {
    formType: string;
    preferredStage?: string;
    whenToAdd?: string;
  }[];
}

export type Stage = {
  name: string;
  color: string;
  order: number;
}

export interface PartyIntakeSchemaItem
  extends Omit<SchemaItem, "pdf_attributes"> {
  mapping?: {
    formType: string;
    uniqueId: string;
    radioMapping?: Record<string, string>[];
  }[];
}

export type PartyIntakeSchema = PartyIntakeSchemaItem[];

export interface PartyIntake {
  id: string;
  email: string;
  deal_id: string;
  party_response: PartyResponse;
  realtor_id: string;
  party_intake_form_schema: PartyIntakeSchema;
  form_visible: boolean;
  created_at: string;
  party_id: string;
  partyrole_partynumber: string;
}

export interface DealParty {
  id: string;
  deal_id: string;
  party_id: string;
  party_role: "seller" | "buyer" | "landlord" | "tenant" | "seller_agent" | "buyer_agent" | "tenant_agent" |  "landlord_agent";
  realtorIsRepresenting: boolean;
  partyNumber: number;
  created_at: Date;
  party_email: string;
}

export interface Party {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  current_transaction_status:
    | "lead"
    | "searching"
    | "under_contract"
    | "closed"
    | "cancelled";
  form_information: JSON;
  notes: string;
  realtor_id: string;
  created_at: string;
}

export interface Mapping {
  formType: string;
  uniqueId: string;
  radio_mapping?: {
    option: string;
    mappedRadioField: string;
  }[];

  checkbox_mapping?: {
    option: string;
    mappedCheckboxField: string;
  }[];
}

export interface PDFFormField {
  id: string;
  type: "text" | "signature" | "date" | "checkmark";
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
  value?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  displayName?: string; // For signature fields
  email?: string; // For signature fields
  actionAs?: "signer" | "delegator"; // For signature fields
  color?: string;
}

export interface DealPartyRequest {
  role: string;
  realtorIsRepresenting: boolean;
  partyNumber: number;
  party: Omit<Party, "id" | "created_at" | "form_information" | "notes" | "phone_number" | "realtor_id">;
}

interface TextChunkMessage {
  type: "text_chunk";
  text: string;
}

interface ActionButtonMessage {
  type: "action_button";
  buttons: Array<{
    label: string;
    action: string;
    style?: "primary" | "secondary" | "danger";
  }>;
}

interface NavigationMessage {
  type: "navigation";
  navigationData: RealtorPageNavigation;
}

interface StatusUpdateMessage {
  type: "status_update";
  status: string;
  progress?: number;
  loading?: boolean;
}

interface ToolCallsCompleteMessage {
  type: "tool_calls_complete";
  toolCalls: ToolCall[];
}

interface ToolExecutionProgressMessage {
  type: "tool_execution_progress";
  toolName: string;
  status: "starting" | "in_progress" | "completed" | "error";
  message?: string;
}

interface StreamCompleteMessage {
  type: "stream_complete";
  message: string;
}

interface ErrorMessage {
  type: "error";
  message: string;
}

export type AIMessage = TextChunkMessage | ActionButtonMessage | NavigationMessage | StatusUpdateMessage | ToolCallsCompleteMessage | ToolExecutionProgressMessage | StreamCompleteMessage | ErrorMessage;

export interface RealtorPageNavigation {
  area: "workspace" | "inside_deal" | "crm" | "templates" | "help-docs" | "first-sign-in";
  
  // Deal-specific navigation (when area === "inside_deal")
  deal?: {
    dealId: string;
    
    // Simple navigation state
    tab: 'timeline' | 'clients' | 'forms' | 'settings';

    clients?: {
        clientTab?: "all" | "yours" | "properties";
        clientSection?: "management" | "intakes" | "portals";
        editingIntake?: string;
        viewingResponses?: string;
        previewingIntake?: string;
        selectedClientIntakeId?: string;
    }
 
 
    forms?: {
        viewMode?: 'list' | 'form-editor' | 'property-editor' | 'preview' | 'finalized';
        selectedFormId?: string;
        selectedPropertyId?: string;
    }
  }

  // Templates-specific navigation (when area === "templates")
  templates?: {
    tab: 'create' | 'modify' 
    modify?: {
        type: "transaction_forms" | "client_intake"
        templateId?: string; 
    }
  };
  
  // Info page navigation (when area === "info_page")
  help_docs?: {
    tab: 'getting-started' | 'deal-management' | 'forms-and-templates' | 'ai-features' | 'pdf-editor';
  };
  
}

export interface AIConnectionTether {
  role: 'realtor' | 'broker' | 'client' | 'tenant' 
  pageNavigation: RealtorPageNavigation;
  fullConversation: ChatMessage[];
}

export type aiPartyIntakeQuestionGeneration = {
  question: string;
  input_type: "text" | "radio" | "checkbox";
  placeholder?: string;
  radio_options?: string[];
  mapping?: {
    form_type: string;
    field_name: string;
  };
};

export interface SignatureCollection {
  id: string;
  form_id: string;
  created_at: Date;
  actionAs: string;
  action_email: string;
  sender_id: string;
  signature_data: Record<string, Record<string, string>>;
  form_response: FormResponse;
  custom_schema: Schema;
  signature_sequence: SignerAssignment[][];
  file_upload_pdf: string;
  audit_json: AuditJson;
  expirationDate: Date;
}

export interface PartyIntakeTemplate {
  id: string;
  name: string;
  user_id: string;
  buyer1_schema: PartyIntakeSchema;
  buyer2_schema: PartyIntakeSchema;
  seller1_schema: PartyIntakeSchema;
  seller2_schema: PartyIntakeSchema;
  created_at: Date;
}

export type AuditJson = {
  document_id: string;
  sender_id: string;
  original_document_hash: string;
  final_document_hash: string;
  consent_text_version: string;
  events: SignatureEvent[];
};

export type SignatureEvent = {
  event:
    | "signature_created"
    | "esign_consent_given"
    | "signature_applied"
    | "delegation_applied"
    | "document_submitted"
    | "delegated";
  sequence: number;
  timestamp: Date;
  ip_address: string;
  user_agent: string;
  actor_uuid: string;
  actor_auth_method: "login" | "email_otp";
  field_signed?: {
    unique_id: string;
    field_name: string;
    field_value: string;
    signature_method: "draw" | "typed";
  };
  signer_email: string;
  //consider adding unqiue event_uuid for each event
};

export type Schema = SchemaItem[];
export type FILE_NAMES = "IABS" | "Animal_Agreement" | "landlord_floodplain_notice" | "Third_party_financing"

// Deal Page Context Types for AI Chat
export type TabMode = 'timeline' | 'clients' | 'forms' | 'files' | 'settings';
export type ViewMode = 'list' | 'form-editor' | 'client-editor' | 'property-editor' | 'preview' | 'finalized';

export interface DealPageContext {
  // Deal information
  dealId: string;
  dealSide: string;
  dealData?: any;
  
  // Current navigation state
  currentTab: TabMode;
  viewMode: ViewMode;
  
  // Selected items
  selectedFormId?: string;
  selectedClientIntakeId?: string;
  selectedPropertyId?: string;
  
  // Client section navigation
  clientSection?: 'management' | 'intakes' | 'portals';
  clientTab?: 'all' | 'yours' | 'properties';
  editingIntake?: string;
  viewingResponses?: string;
  previewingIntake?: string;  
}

export interface lightningSchemaItem extends SchemaItem { 
  formType: string;
  category?: string;
}

export interface FormComments {
  sender_id?: string;
  comments: {
    unique_id?: string;
    comment: string;
  }[];
}



export type lightningSchema = lightningSchemaItem[];

export type AutoFilledTypes = "intake" | "cached" | "resolved" | "template"

