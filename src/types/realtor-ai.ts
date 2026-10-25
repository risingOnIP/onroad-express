import {
  Deal,
  DealOption,
  Form,
  SchemaItem,
  SignatureInput,
  Template,
} from "./realtor";

// Standard status response type for action-oriented tools
  export type StatusResponse = {
    status: "success" | "error";
    errorMessage?: string;
    successMessage?: string;
  };

export type AIFormMetaData = Omit<
  Form,
  "form_response" | "finalized_audit_json" | 'user_id'
> & 
{
    form_completion_percentage: string; 
};
// need to tell the ai that if the form has a custom schema then it is a custom pdf that is uploaded by the user
// need to say that file_uplaod pdf is the pdf that is uploaded by the user  and form_type is the name of it then

export type BlankSchemaItem = Omit<SchemaItem, "pdf_attributes"> & {
  display_attributes: Omit<
    SchemaItem["display_attributes"],
    | "special_input"
    | "attribute"
    | "block_style"
    | "width"
    | "value"
    | "breakBefore"
  >;
};
//need to explain isCached, isRequired, isHidden etc

export type AISchemaItem = BlankSchemaItem & {
  user_value: string | string[] | SignatureInput | null;
};

export type AISchema = AISchemaItem[];

export type AIDealOption = Omit<
  DealOption,
  "user_id" | "property_images" | "attribute_store"
>;

export type AIDeal = Omit<Deal, "user_id" | "created_at"> & {
  partiesOfDeal: { party_role: string; email: string; full_name: string }[];
};


//TEMPLATES

export type AITemplate = Omit<Template, "user_id" | "created_at"> & {
  partiesOfTemplate: { role: string; full_name: string }[];
};

//export type parties = Omit<Party, 'created_at'> & {dealID: {deal_id: string}[];

//export type availableForms = AvailableForms;

//export type SignatureCollection = Omit<SignatureCollection, 'audit_json'>;

//

//

//
