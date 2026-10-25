import { createClient } from "@supabase/supabase-js";
import {
  AvailableForms,
  CachedData,
  DealOption,
  DealParty,
  Form,
  FormResponse,
  PDFFormField,
  Profile,
  Schema,
  SchemaItem,
  SignatureInput,
  SignerAssignment
} from "../../types/realtor";
import {
  ALL_SCHEMAS,
  KNOWLEDGE_BASE,
} from "./centralIntelligence/centralIntelligence";
import { v4 as uuidv4 } from "uuid";
import { getCachedData } from "./dealOption-logic";
import { getFormMapping } from "../../routes/forms/pdf-templates";

export async function resolveKnowledgeBaseForm(
  formType: string,
  formResponse: FormResponse = {},
  cachedData: CachedData = {},
  supabaseClient: ReturnType<typeof createClient>,
  variables?: {
    dealId?: string; 
    dealOptionId?: string;
    userId?: string; 
  }
): Promise<FormResponse> {
  const schema = ALL_SCHEMAS[formType as keyof typeof ALL_SCHEMAS];
  //priorty order: 1) form_response 2) cached 3) attribute store 4) schemaItem resolution

  // Get attribute store if dealOptionId is provided
  let attributeStore: Record<string, string> = {};
  if (variables?.dealOptionId) {
    const { data: dealOption, error: dealOptionError } = await supabaseClient
      .from("dealOptions")
      .select("attribute_store")
      .eq("id", variables.dealOptionId)
      .single();
    
    if (!dealOptionError && dealOption?.attribute_store) {
      attributeStore = dealOption.attribute_store as Record<string, string>;
    }
  }

  for (const schemaItem of schema) {
    if (formResponse[schemaItem.unique_id]) {
      continue;
    } else if (schemaItem.display_attributes.isCached) {
      formResponse[schemaItem.unique_id] =
        cachedData[formType]?.[schemaItem.unique_id] ?? "";
    } else if (schemaItem.display_attributes.attribute && attributeStore[schemaItem.display_attributes.attribute.key]) {
      // Check attribute store - apply the operation to get the field value
      const attributeValue = attributeStore[schemaItem.display_attributes.attribute.key];
      if (schemaItem.display_attributes.attribute.operation) {
        // Handle both string expressions and functions
        let computedValue: string | string[];
        if (typeof schemaItem.display_attributes.attribute.operation === 'string') {
          // Evaluate string expression
          try {
            const func = new Function('value', `return ${schemaItem.display_attributes.attribute.operation}`);
            computedValue = func(attributeValue);
          } catch (error) {
            console.error('[FORM LOGIC] Error evaluating operation:', error);
            computedValue = attributeValue;
          }
        } else {
          // Legacy function support
          computedValue = schemaItem.display_attributes.attribute.operation(attributeValue);
        }
        formResponse[schemaItem.unique_id] = computedValue as string;
      } else {
        formResponse[schemaItem.unique_id] = attributeValue;
      }
    } else if (schemaItem.display_attributes.value.reserved) {
      if(schemaItem.display_attributes.value.type === "reserved") {
        switch(schemaItem.display_attributes.value.reserved) {
          case "landlord_name_csv":
            console.log("landlord_name_csv hit");
            if (variables?.dealId) {
              console.log('dealid exists')
              const {data: dealsPartiesData, error: dealsPartiesError} = (await supabaseClient
              .from("deals_parties")
              .select("parties(full_name)")
              .eq("deal_id", variables.dealId)
              .eq("party_role", "landlord")) as unknown as {data : {parties: {full_name: string}}[], error: any};
              console.log('dealsPartiesData', dealsPartiesData);
            const landlordNames = dealsPartiesData?.map((party: {parties: {full_name: string}}) => party.parties.full_name);
            formResponse[schemaItem.unique_id] = landlordNames.join(", ");
            console.log('formResponse', formResponse);
            }
            break;
          case "tenant_name_csv":
            console.log("tenant_name_csv hit");
            if (variables?.dealId) {
              console.log('dealid exists')
              const {data: dealsPartiesData, error: dealsPartiesError} = (await supabaseClient
              .from("deals_parties")
              .select("parties(full_name)")
              .eq("deal_id", variables.dealId)
              .eq("party_role", "tenant")) as unknown as {data : {parties: {full_name: string}}[], error: any};
              console.log('dealsPartiesData', dealsPartiesData);
            const tenantNames = dealsPartiesData?.map((party: {parties: {full_name: string}}) => party.parties.full_name);
            formResponse[schemaItem.unique_id] = tenantNames.join(", ");
            console.log('formResponse', formResponse);
            }
            break;
          case "realtor_name_spaced":
            {
              if(variables?.userId) {
              const { data: profile, error: profileError } = await supabaseClient
                .from("profiles")
                .select("first_name, last_name")
                .eq("user_id", variables.userId)
                .single();
                const realtorName = `${profile?.first_name} ${profile?.last_name}`;
                formResponse[schemaItem.unique_id] = realtorName;
              } else {
                formResponse[schemaItem.unique_id] = "";
              }
              break;
            }
          case "property_street_address":
            {
              if(variables?.dealId) {
                const {data: dealData, error: dealNameError} = await supabaseClient
                .from("deals")
                .select("dealName, dealSide")
                .eq("id", variables.dealId)
                .single();
                if(dealData?.dealSide === "lease") {
                  formResponse[schemaItem.unique_id] = dealData?.dealName as string;
                } else {
                  if(variables?.dealOptionId) {
                    const {data: dealOptionData, error: dealOptionError} = await supabaseClient
                    .from("dealOptions")
                    .select("address")
                    .eq("id", variables.dealOptionId)
                    .single();
                    formResponse[schemaItem.unique_id] = dealOptionData?.address as string;
                  }
                }
              }
              break;
            }
          case "buyer/tenant_name_csv":
            {
              if(variables?.dealId) {
                const {data: dealData, error: dealNameError} = await supabaseClient
                .from("deals")
                .select("dealSide")
                .eq("id", variables.dealId)
                .single();
                if(dealData?.dealSide === "buy" || dealData?.dealSide === "sell") {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                  .from("deals_parties")
                  .select("parties(full_name)")
                  .eq("deal_id", variables.dealId)
                  .eq("party_role", "buyer") as unknown as {data : {parties: {full_name: string}}[], error: any};
                  const buyerNames = dealPartiesData?.map((party: {parties: {full_name: string}}) => party.parties.full_name);
                  formResponse[schemaItem.unique_id] = buyerNames.join(", ");
                } else if (dealData?.dealSide === "rent" || dealData?.dealSide === "lease") {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                  .from("deals_parties")
                  .select("parties(full_name)")
                  .eq("deal_id", variables.dealId)
                  .eq("party_role", "tenant") as unknown as {data : {parties: {full_name: string}}[], error: any};
                  const tenantNames = dealPartiesData?.map((party: {parties: {full_name: string}}) => party.parties.full_name);
                  formResponse[schemaItem.unique_id] = tenantNames.join(", ");
                }
              }
              break;
            }
            case "buyer/tenant_phone_number":
              {
                if(variables?.dealId) {
                  const {data: dealData, error: dealNameError} = await supabaseClient
                  .from("deals")
                  .select("dealSide")
                  .eq("id", variables.dealId)
                  .single();
                  if(dealData?.dealSide === "buy" || dealData?.dealSide === "sell") {
                    const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(phone_number)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "buyer")
                    .eq("party_number", "1") as unknown as {data : {parties: {phone_number: string}}[], error: any};
                    const buyerPhoneNumbers = dealPartiesData?.map((party: {parties: {phone_number: string}}) => party.parties.phone_number);
                    formResponse[schemaItem.unique_id] = buyerPhoneNumbers.join(", ");
                  } else if (dealData?.dealSide === "rent" || dealData?.dealSide === "lease") {
                    const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(phone_number)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "tenant") 
                    .eq("party_number", "1") as unknown as {data : {parties: {phone_number: string}}[], error: any};
                    const tenantPhoneNumbers = dealPartiesData?.map((party: {parties: {phone_number: string}}) => party.parties.phone_number);
                    formResponse[schemaItem.unique_id] = tenantPhoneNumbers.join(", ");
                  }
                }
                break;
              }
              case "landlord_phone_number":
                {
                  if(variables?.dealId) {
                    const {data: dealData, error: dealNameError} = await supabaseClient
                    .from("deals")
                    .select("dealSide")
                    .eq("id", variables.dealId)
                    .single();
                    if(dealData?.dealSide === "rent" || dealData?.dealSide === "lease") {
                      const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                      .from("deals_parties")
                      .select("parties(phone_number)")
                      .eq("deal_id", variables.dealId)
                      .eq("party_role", "landlord")
                      .eq("party_number", "1") as unknown as {data : {parties: {phone_number: string}}[], error: any};
                      const buyerPhoneNumbers = dealPartiesData?.map((party: {parties: {phone_number: string}}) => party.parties.phone_number);
                      formResponse[schemaItem.unique_id] = buyerPhoneNumbers.join(", ");
                    }
                  }
                  break;
              }
            case "landlord_1_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "landlord")
                    .eq("party_number", "1")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            case "landlord_2_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "landlord")
                    .eq("party_number", "2")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            case "tenant_1_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "tenant")
                    .eq("party_number", "1")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            case "tenant_2_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "tenant")
                    .eq("party_number", "2")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            case "tenant_3_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "tenant")
                    .eq("party_number", "3")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            case "tenant_4_initials":
              {
                if(variables?.dealId) {
                  const {data: dealPartiesData, error: dealPartiesError} = await supabaseClient
                    .from("deals_parties")
                    .select("parties(full_name)")
                    .eq("deal_id", variables.dealId)
                    .eq("party_role", "tenant")
                    .eq("party_number", "4")
                    .single() as unknown as {data: {parties: {full_name: string}}, error: any};
                  
                  if(dealPartiesData?.parties?.full_name) {
                    const nameParts = dealPartiesData.parties.full_name.trim().split(/\s+/);
                    if(nameParts.length >= 2) {
                      // First initial + Last initial
                      formResponse[schemaItem.unique_id] = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`;
                    } else if(nameParts.length === 1) {
                      // Just first initial if only one name
                      formResponse[schemaItem.unique_id] = nameParts[0].charAt(0).toUpperCase();
                    } else {
                      formResponse[schemaItem.unique_id] = "";
                    }
                  } else {
                    formResponse[schemaItem.unique_id] = "";
                  }
                }
                break;
              }
            }
            break;
        }
    } else if (
      variables?.dealOptionId &&
      schemaItem.display_attributes.value.type === "resolved"
    ) {
      /*
      signer emails
      property address
      */

      if (
        schemaItem.display_attributes.value.supabase &&
        schemaItem.display_attributes.value.supabase.length > 0
      ) {
        let resolvedValue: string = "";
        let resolved = false;

        // Loop through each supabase configuration until one resolves successfully
        for (
          let configIndex = 0;
          configIndex < schemaItem.display_attributes.value.supabase.length;
          configIndex++
        ) {
          const supabaseConfig =
            schemaItem.display_attributes.value.supabase[configIndex];
          const { table, column, eqBy } = supabaseConfig;

          try {
            // Build the query with all equality conditions from eqBy array
            let query = supabaseClient.from(table).select(column);
            for (const eqField of eqBy) {
              if (eqField.variable && variables) {
                switch (eqField.variable) {
                  case ("dealOptionId"):
                    if (variables.dealOptionId) {
                      query = query.eq(eqField.columnName, variables.dealOptionId);
                    }
                    break;
                  case ("userId"):
                    if (variables.userId) {
                      query = query.eq(eqField.columnName, variables.userId);
                    }
                    break;
                  case "dealId":
                    const { data: deal, error: dealError } =
                      (await supabaseClient
                        .from("dealOptions")
                        .select("deal_id")
                        .eq("id", variables.dealOptionId)
                        .single()) as { data: DealOption; error: any };

                    query = query.eq(eqField.columnName, deal.deal_id);
                    break;
                }
              } else if (eqField.hardCodedValue) {
               
                query = query.eq(eqField.columnName, eqField.hardCodedValue);
              }
            }

            // console.log("[FORM RESOLVER] About to execute query...");
            const { data: supabaseData, error: supabaseError } =
              await query.single();

            if (supabaseError) {
              eqBy.map((eqField) => {
                console.error(
                  "i tried this -->  ",
                  "column",
                  eqField.columnName,
                  "table",
                  eqField.hardCodedValue
                );
              });

              // Continue to next config if there's an error
              continue;
            }

            resolvedValue =
              (supabaseData as Record<string, any>)?.[column] ?? "";
            console.log("[FORM RESOLVER] Resolved value:", resolvedValue);

            // Mark as resolved and break out of the loop
            resolved = true;
            break;
          } catch (error) {
            console.error(
              "[FORM RESOLVER] Exception occurred in config",
              configIndex + 1,
              ":",
              error
            );
            // Continue to next config if there's an exception
            continue;
          }
        }

        // If we went through all configs and none resolved, set to empty string
        if (!resolved) {
          console.log(
            "[FORM RESOLVER] No supabase config resolved successfully, setting to empty string"
          );
          formResponse[schemaItem.unique_id] = "";
        } else {
          // Check if this should be a SignatureInput type
          if (
            schemaItem.display_attributes.value.output ===
              "SignatureInput__signer" ||
            schemaItem.display_attributes.value.output ===
              "SignatureInput__delegator"
          ) {
            const actionAs =
              schemaItem.display_attributes.value.output ===
              "SignatureInput__signer"
                ? "signer"
                : "delegator";

            const signatureInput: SignatureInput = {
              actionAs: actionAs,
              email: resolvedValue,
            };

            formResponse[schemaItem.unique_id] = signatureInput;
            console.log(
              "[FORM RESOLVER] SignatureInput created:",
              signatureInput
            );
          } else {
            formResponse[schemaItem.unique_id] = resolvedValue;
            console.log("[FORM RESOLVER] Regular value set:", resolvedValue);
          }
        }
      } else {
        console.log(
          "[FORM RESOLVER] No supabase config found for resolved item:",
          schemaItem.unique_id
        );
      }
    } else {
      // Initialize manual fields with default values if not already set
      if (
        schemaItem.display_attributes.value.type === "manual" &&
        !formResponse[schemaItem.unique_id]
      ) {
        // Set appropriate default based on input type
        if (schemaItem.display_attributes.input_type === "checkbox") {
          formResponse[schemaItem.unique_id] = [];
        } else if (schemaItem.display_attributes.input_type === "radio") {
          formResponse[schemaItem.unique_id] = "";
        } else {
          // For text, text-area, and other input types
          formResponse[schemaItem.unique_id] = "";
        }
        console.log(
          "[FORM RESOLVER] Initialized manual field with default:",
          schemaItem.unique_id,
          "type:",
          schemaItem.display_attributes.input_type
        );
      } else {
        console.log(
          "[FORM RESOLVER] Item is manual type or already has value, skipping:",
          schemaItem.unique_id
        );
      }
    }
  }

  // console.log("[FORM RESOLVER] Finished processing all schema items");
  console.log("[FORM RESOLVER] Final FormResponse:", formResponse);
  return formResponse;
}

export async function insertForm(
  deal_option_id: string,
  form_type: string,
  form_response: FormResponse,
  cachedData: CachedData,
  supabaseClient: ReturnType<typeof createClient>,
  file_upload_pdf: string = "",
  form_stage?: string
) {
  console.log("inserting form with stage:", form_stage);

  const { data: prevForm, error: prevFormError } = await supabaseClient
    .from("forms")
    .select("order")
    .eq("deal_option_id", deal_option_id)
    .order("order", { ascending: false })
    .limit(1);

  if (prevFormError) {
    console.error("Error fetching previous form order:", prevFormError);
  }

  const highestOrder = (prevForm?.[0]?.order as number) ?? 0;

  console.log("highest Order" + highestOrder);

  const { data: dealOption, error: dealOptionError } = (await supabaseClient
    .from("dealOptions")
    .select("user_id, deals(template, id)")
    .eq("id", deal_option_id)
    .single()) as { data: any; error: any };

  const user_id = dealOption?.user_id;

  // Get default stage if not provided
  if (!form_stage && dealOption?.deals?.template) {
    try {
      const templateParts = dealOption.deals.template.split("-");
      const dealSide = templateParts[0];
      const propertyType = templateParts[1];

      const knowledgeEntry = KNOWLEDGE_BASE[dealSide]?.[propertyType]?.["TX"];
      if (knowledgeEntry?.stages && knowledgeEntry.stages.length > 0) {
        // Default to first stage
        form_stage = knowledgeEntry.stages[0].name;
      }
    } catch (err) {
      console.error("Error determining default stage:", err);
    }
  }

  let formResponse;

  if (!file_upload_pdf) {
    formResponse = await resolveKnowledgeBaseForm(
      form_type,
      form_response,
      cachedData,
      supabaseClient,
      {
        dealId: dealOption?.deals?.id,
        dealOptionId: deal_option_id,
        userId: user_id,
      }
    );
  } else {
    formResponse = form_response;
  }

  const { data: form, error: formError } = (await supabaseClient!
    .from("forms")
    .insert({
      deal_option_id: deal_option_id,
      form_type: form_type,
      order: highestOrder + 1,
      form_response: formResponse,
      file_upload_pdf: file_upload_pdf,
      user_id: user_id,
      form_stage: form_stage,
    })
    .select()
    .single()) as { data: Form; error: any };

  if (formError) {
    console.error("Error inserting form:", formError);
    throw formError;
  }

  console.log("Form inserted successfully with stage:", form.form_stage);
  return form as Form;
}

export async function getForm(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: form, error: formError } = (await supabaseClient!
    .from("forms")
    .select("*")
    .eq("id", formId)
    .single()) as { data: Form; error: any };

  if (formError) {
    console.error("Error fetching form:", formError);
    throw new Error(`Failed to fetch form data: ${formError}`);
  }

  if (!form) {
    throw new Error("Form not found");
  }

  return form as Form;
}

export async function getAllFormsInDealOption(
  dealOptionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: forms, error: formsError } = await supabaseClient
  .from('forms')
  .select('*')
  .eq('deal_option_id', dealOptionId) as unknown as {data: Form[], error: any};

  if (formsError) throw formsError;

  return forms as Form[];

}

export async function getAvailableFormsFromDealId(
  dealId: string,
  supabaseClient: ReturnType<typeof createClient>,
  userId?: string
) {
  const { data: deal, error: dealError } = (await supabaseClient
    .from("deals")
    .select("template")
    .eq("id", dealId)
    .single()) as { data: { template: string }; error: any };

  if (dealError) throw dealError;

  const splitTemplate = deal.template.split("-");

  const availableForms = {
    deal_wide:
      KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].availableForms
        .deal_wide || [],
    property_specific:
      KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].availableForms
        .property_specific ?? [],
  } as AvailableForms;

  // Filter TAR forms based on broker uploads if userId provided
  if (userId) {
    const filteredForms = await filterTarFormsForRealtor(availableForms, userId, supabaseClient);
    return filteredForms;
  }
  
  return availableForms;
}

// Helper function to filter TAR forms based on broker uploads
async function filterTarFormsForRealtor(
  availableForms: AvailableForms,
  realtorId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<AvailableForms> {
  // Check if realtor has a broker tether
  const { data: tether, error: tetherError } = await supabaseClient
    .from('brokerRealtorTether')
    .select('broker_id')
    .eq('realtor_id', realtorId)
    .eq('status', 'accepted')
    .single();
  
  if (!tether || tetherError) {
    // No broker tether - remove all TAR forms
    console.log("Realtor has no broker tether - removing all TAR forms from available forms");
    
    const filteredDealWide = availableForms.deal_wide.filter(form => {
      const formMapping = getFormMapping(form.formType);
      return !formMapping || formMapping.orgCreated !== 'TAR';
    });
    
    const filteredPropertySpecific = availableForms.property_specific?.filter(form => {
      const formMapping = getFormMapping(form.formType);
      return !formMapping || formMapping.orgCreated !== 'TAR';
    }) || [];
    
    return {
      deal_wide: filteredDealWide,
      property_specific: filteredPropertySpecific
    };
  }
  
  // Get list of TAR forms uploaded by broker
  const { data: brokerForms, error: brokerFormsError } = await supabaseClient
    .from('brokerForms')
    .select('form_type')
    .eq('broker_id', tether.broker_id as string)
    .eq('org_name', 'TAR');
  
  if (!brokerFormsError && brokerForms) {
    const uploadedFormTypes = new Set(brokerForms.map(f => f.form_type));
    console.log(`Broker has uploaded ${uploadedFormTypes.size} TAR forms:`, Array.from(uploadedFormTypes));
    
    // Filter out TAR forms not uploaded by broker
    const filteredDealWide = availableForms.deal_wide.filter(form => {
      const formMapping = getFormMapping(form.formType);
      if (formMapping && formMapping.orgCreated === 'TAR') {
        return uploadedFormTypes.has(form.formType);
      }
      return true; // Keep non-TAR forms
    });
    
    const filteredPropertySpecific = availableForms.property_specific?.filter(form => {
      const formMapping = getFormMapping(form.formType);
      if (formMapping && formMapping.orgCreated === 'TAR') {
        return uploadedFormTypes.has(form.formType);
      }
      return true; // Keep non-TAR forms
    }) || [];
    
    return {
      deal_wide: filteredDealWide,
      property_specific: filteredPropertySpecific
    };
  } else {
    // Error fetching broker forms - remove all TAR forms as a safety measure
    console.log("Error fetching broker forms - removing all TAR forms");
    
    const filteredDealWide = availableForms.deal_wide.filter(form => {
      const formMapping = getFormMapping(form.formType);
      return !formMapping || formMapping.orgCreated !== 'TAR';
    });
    
    const filteredPropertySpecific = availableForms.property_specific?.filter(form => {
      const formMapping = getFormMapping(form.formType);
      return !formMapping || formMapping.orgCreated !== 'TAR';
    }) || [];
    
    return {
      deal_wide: filteredDealWide,
      property_specific: filteredPropertySpecific
    };
  }
}

export async function getAvailableFormsFromTemplateId(
  templateId: string,
  supabaseClient: ReturnType<typeof createClient>,
  userId?: string
) {
  const { data: templateData, error: templateError } = (await supabaseClient
    .from("templates")
    .select("name")
    .eq("id", templateId)
    .single()) as { data: { name: string }; error: any };

  if (templateError) throw templateError;

  const splitTemplate = templateData.name.split("-");

  const availableForms = {
    deal_wide:
      KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].availableForms
        .deal_wide || [],
    property_specific:
      KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].availableForms
        .property_specific ?? [],
  } as AvailableForms;

  console.log("returnData before filtering", availableForms);

  // Filter TAR forms based on broker uploads if userId provided
  if (userId) {
    const filteredForms = await filterTarFormsForRealtor(availableForms, userId, supabaseClient);
    return filteredForms;
  }

  return availableForms;
}

// Helper function to evaluate visibleIf conditions
function evaluateVisibleIf(
  schemaItem: SchemaItem,
  formResponse: FormResponse
): boolean {
  // If no visibility conditions, field is visible
  if (!schemaItem.display_attributes.visibleIf || schemaItem.display_attributes.visibleIf.length === 0) {
    return true;
  }

  // All conditions must be true for field to be visible
  return schemaItem.display_attributes.visibleIf.every(condition => {
    const fieldValue = formResponse[condition.unique_id];
    const checkValue = condition.valueChecked;

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
          return fieldValue.includes(checkValue);
        }
        return String(fieldValue).includes(checkValue);
      case "doesNotContain":
        if (Array.isArray(fieldValue)) {
          return !fieldValue.includes(checkValue);
        }
        return !String(fieldValue).includes(checkValue);
      default:
        return true;
    }
  });
}

// Helper function to check if a field is a linked checkbox field that's been selected
function isLinkedCheckboxFieldSelected(
  fieldId: string,
  parentSchema: SchemaItem[],
  formResponse: FormResponse
): boolean {
  // Find if this field is linked to any checkbox option
  for (const item of parentSchema) {
    if (item.display_attributes.input_type === 'checkbox' && 
        item.display_attributes.checkbox_options?.options) {
      
      for (const option of item.display_attributes.checkbox_options.options) {
        if (option.linkedFields?.includes(fieldId)) {
          // Check if this checkbox option is selected
          const selectedValues = formResponse[item.unique_id];
          if (Array.isArray(selectedValues)) {
            return selectedValues.includes(option.databaseStored);
          }
          return false;
        }
      }
    }
  }
  
  // Not a linked field, so it's "selected" by default
  return true;
}

export async function updateCustomSchema(
  formId: string,
  custom_schema: Schema,
  supabaseClient: ReturnType<typeof createClient>,
  pdfFormFields?: PDFFormField[]
) {
  console.log("updateCustomSchema called with pdfFormFields: ", pdfFormFields);
  // First get the current form response
  const { data: currentForm, error: fetchError } = await supabaseClient!
    .from("forms")
    .select("form_response")
    .eq("id", formId)
    .single();

  if (fetchError) throw fetchError;

  // Build form response for signature fields from PDF form fields and custom schema
  const signatureFormResponse: Record<
    string,
    { email: string; actionAs: string }
  > = {};

  if (custom_schema && Array.isArray(custom_schema)) {
    custom_schema.forEach((schemaItem: any) => {
      if (schemaItem.display_attributes?.input_type === "signature") {
        // Find the corresponding PDF form field for this signature
        const pdfField = pdfFormFields?.find(
          (field) =>
            field.type === "signature" && field.id === schemaItem.unique_id
        );

        // Use PDF form field data if available, otherwise fall back to schema data
        const email =
          pdfField?.email || schemaItem.display_attributes.placeholder || "";
        const actionAs = pdfField?.actionAs || "signer";
        console.log(
          "i want these two: \nemail: ",
          pdfField?.email,
          "\nactionAs: ",
          pdfField?.actionAs
        );

        signatureFormResponse[schemaItem.unique_id] = {
          email: email,
          actionAs: actionAs,
        };
      }
    });
  }

  // Merge with existing form response
  const updatedFormResponse = {
    ...(currentForm?.form_response || {}),
    ...signatureFormResponse,
  };

  // Update both custom_schema and form_response
  const { data: form, error: formError } = await supabaseClient!
    .from("forms")
    .update({
      custom_schema: custom_schema,
      form_response: updatedFormResponse,
    })
    .eq("id", formId)
    .select()
    .single();

  if (formError) throw formError;
  console.log("form in updateCustomSchema: ", form);

  return form as Form;
}

export async function updateFormResponse(
  formId: string,
  itemKey: string,
  newValue: string | SignatureInput,
  user_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  // First get the current form_response
  const { data: currentForm, error: fetchError } = await supabaseClient!
    .from("forms")
    .select("form_response")
    .eq("id", formId)
    .single();

  if (fetchError) throw fetchError;

  // Safely extract form_response, default to empty object if null
  let responseData = (currentForm.form_response ?? {}) as Record<
  string,
    string | SignatureInput
  >;

  // Add or update the value
  if (responseData === null) {
    responseData = {};
  }

  responseData[itemKey] = newValue;

  console.log("abt to send the following: ", responseData);

  const { data: form, error: formError } = (await supabaseClient!
    .from("forms")
    .update({
      form_response: responseData,
    })
    .eq("id", formId)
    .select()
    .single()) as { data: Form; error: any };

  if (formError) throw formError;

  if (Object.keys(ALL_SCHEMAS).includes(form.form_type)) {
    if (
      ALL_SCHEMAS[form.form_type as keyof typeof ALL_SCHEMAS].find(
        (schemaItem) => schemaItem.unique_id === itemKey
      )?.display_attributes.isCached
    ) {
      const cachedData = await getCachedData(user_id, supabaseClient);
      console.log("cachedData", cachedData);
      if (!cachedData[form.form_type]) {
        cachedData[form.form_type] = {};
      }
      cachedData[form.form_type][itemKey] = newValue;
      console.log("new cached Data", cachedData);

      const { data: cachedDataUpdate, error: cachedDataUpdateError } =
        (await supabaseClient
          .from("profiles")
          .update({
            cached_data: cachedData,
          })
          .eq("user_id", user_id)
          .select()
          .single()) as { data: Profile; error: any };

      if (cachedDataUpdateError) throw cachedDataUpdateError;
    } else if (
      ALL_SCHEMAS[form.form_type as keyof typeof ALL_SCHEMAS].find(
        (schemaItem) => schemaItem.unique_id === itemKey
      )?.display_attributes.attribute
    ) {

      const foundSchemaItem = ALL_SCHEMAS[form.form_type as keyof typeof ALL_SCHEMAS].find(
        (schemaItem) => schemaItem.unique_id === itemKey
      );
      
      const attributeConfig = foundSchemaItem?.display_attributes.attribute;

      if (!attributeConfig) {
        return form;
      }

      const { data: dealOptionData } = (await supabaseClient
        .from("forms")
        .select("deal_option:deal_option_id(id, attribute_store)")
        .eq("id", form.id)
        .single()) as {
        data: {
          deal_option: { id: string; attribute_store: Record<string, string> };
        };
        error: any;
      };

      if(attributeConfig.reverseOperation && dealOptionData?.deal_option) {
        console.log("[ATTRIBUTE UPDATE] Starting attribute update for field:", itemKey);
        console.log("[ATTRIBUTE UPDATE] Original value:", newValue);
        console.log("[ATTRIBUTE UPDATE] Current form ID:", form.id);
        
        // Handle both string expressions and functions
        let reverseValue: string | string[];
        if (typeof attributeConfig.reverseOperation === 'string') {
          // Evaluate string expression
          try {
            const func = new Function('value', `return ${attributeConfig.reverseOperation}`);
            reverseValue = func(newValue as string);
          } catch (error) {
            console.error('[ATTRIBUTE UPDATE] Error evaluating reverseOperation:', error);
            reverseValue = newValue as string;
          }
        } else {
          // Legacy function support
          reverseValue = attributeConfig.reverseOperation(newValue as string);
        }
        console.log("[ATTRIBUTE UPDATE] Reverse value:", reverseValue);
        
        // Update attribute store with the correct key
        const attributeKey = attributeConfig.key;
        console.log("[ATTRIBUTE UPDATE] Attribute key:", attributeKey);
        
        const updatedAttributeStore = {
          ...dealOptionData.deal_option.attribute_store,
          [attributeKey]: reverseValue as string | string[],
        };
        
        // Update the deal option's attribute store
        const { error: updateAttributeError } = await supabaseClient
          .from("dealOptions")
          .update({ attribute_store: updatedAttributeStore })
          .eq("id", dealOptionData.deal_option.id);

        if (updateAttributeError) {
          throw updateAttributeError;
        }

        // Get all forms in this deal option to update fields with the same attribute
        const { data: dealOptionForms, error: dealOptionFormsError } = await supabaseClient
          .from("forms")
          .select("id, form_type, form_response, custom_schema")
          .eq("deal_option_id", dealOptionData.deal_option.id);

        if(dealOptionFormsError) {
          throw dealOptionFormsError;
        }

        console.log("[ATTRIBUTE UPDATE] Found forms to update:", dealOptionForms?.length);

        // Update form responses for all fields with the same attribute
        if (dealOptionForms && dealOptionForms.length > 0) {
          const updatePromises = [];

          for (const dealOptionForm of dealOptionForms) {
            console.log("[ATTRIBUTE UPDATE] Processing form:", dealOptionForm.id, "Type:", dealOptionForm.form_type);
            
            let formSchema: SchemaItem[] | null = null;
            
            // Get the schema for this form
            if (dealOptionForm.custom_schema) {
              formSchema = dealOptionForm.custom_schema as SchemaItem[];
            } else if (Object.keys(ALL_SCHEMAS).includes(dealOptionForm.form_type as string)) {
              formSchema = ALL_SCHEMAS[dealOptionForm.form_type as keyof typeof ALL_SCHEMAS];
            }

            if (!formSchema) {
              console.log("[ATTRIBUTE UPDATE] No schema found for form");
              continue;
            }

            let hasUpdates = false;
            const updatedFormResponse = { ...(dealOptionForm.form_response || {}) } as FormResponse;

            // Check each field in the schema for matching attribute
            for (const fieldItem of formSchema) {
              if (fieldItem.display_attributes.attribute?.key === attributeKey) {
                console.log("[ATTRIBUTE UPDATE] Found field with matching attribute:", fieldItem.unique_id);
                console.log("[ATTRIBUTE UPDATE] Is same form?", dealOptionForm.id === form.id);
                console.log("[ATTRIBUTE UPDATE] Is same field?", fieldItem.unique_id === itemKey);
                
                // Skip if this is the same field that triggered the update in the same form
                if (dealOptionForm.id === form.id && fieldItem.unique_id === itemKey) {
                  console.log("[ATTRIBUTE UPDATE] Skipping original field");
                  continue;
                }
                
                // Check if field is visible
                if (!evaluateVisibleIf(fieldItem, updatedFormResponse)) {
                  console.log("[ATTRIBUTE UPDATE] Field not visible:", fieldItem.unique_id);
                  continue;
                }

                // Check if field is a linked checkbox field that's selected
                if (!isLinkedCheckboxFieldSelected(fieldItem.unique_id, formSchema, updatedFormResponse)) {
                  console.log("[ATTRIBUTE UPDATE] Linked checkbox field not selected:", fieldItem.unique_id);
                  continue;
                }

                // Apply the operation (not reverseOperation) to get the value
                if (fieldItem.display_attributes.attribute?.operation) {
                  let computedValue: string | string[];
                  if (typeof fieldItem.display_attributes.attribute.operation === 'string') {
                    // Evaluate string expression
                    try {
                      const func = new Function('value', `return ${fieldItem.display_attributes.attribute.operation}`);
                      computedValue = func(reverseValue);
                    } catch (error) {
                      console.error('[ATTRIBUTE UPDATE] Error evaluating operation:', error);
                      computedValue = reverseValue as string;
                    }
                  } else {
                    // Legacy function support
                    computedValue = fieldItem.display_attributes.attribute.operation(reverseValue);
                  }
                  console.log("[ATTRIBUTE UPDATE] Computed value for field", fieldItem.unique_id, ":", computedValue);
                  updatedFormResponse[fieldItem.unique_id] = computedValue as string;
                  hasUpdates = true;
                }
              }
            }

            // Update the form if there were changes
            if (hasUpdates) {
              console.log("[ATTRIBUTE UPDATE] Updating form:", dealOptionForm.id, "with changes");
              updatePromises.push(
                supabaseClient
                  .from("forms")
                  .update({ form_response: updatedFormResponse })
                  .eq("id", dealOptionForm.id as string)
              );
            } else {
              console.log("[ATTRIBUTE UPDATE] No updates needed for form:", dealOptionForm.id);
            }
          }

          // Execute all updates
          console.log("[ATTRIBUTE UPDATE] Total forms to update:", updatePromises.length);
          if (updatePromises.length > 0) {
            const results = await Promise.all(updatePromises);
            const firstError = results.find(result => result.error);
            if (firstError?.error) {
              throw firstError.error;
            }
            console.log("[ATTRIBUTE UPDATE] Successfully updated all forms");
          }
        }
      }
    }
  }

  return form;
}

export async function updateFormOrderInDealOption(
  updates: { formId: string; newOrder: number; form_stage?: string }[],
  supabaseClient: ReturnType<typeof createClient>
) {
  // 1. Create an array of promises, one for each form update
  const updatePromises = updates.map((update) => {
    const updateData: any = { order: update.newOrder };

    // If form_stage is provided, update it
    if (update.form_stage !== undefined) {
      updateData.form_stage = update.form_stage;
    }

    return supabaseClient
      .from("forms")
      .update(updateData)
      .eq("id", update.formId);
  });

  // 2. Execute all update promises in parallel
  const results = await Promise.all(updatePromises);

  // 3. Check if any of the updates resulted in an error
  const firstErrorResult = results.find((result) => result.error);
  if (firstErrorResult) {
    console.error("Error updating form orders:", firstErrorResult.error);
    throw firstErrorResult.error;
  }

  console.log("Successfully updated the order for", results.length, "forms.");
}

export async function saveSignatureSequence(
  formId: string,
  signatureSequence: SignerAssignment[][],
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: signatureSequenceData, error: signatureSequenceError } =
    await supabaseClient!
      .from("forms")
      .update({
        signature_sequence: signatureSequence,
      })
      .eq("id", formId)
      .select()
      .single();

  if (signatureSequenceError) {
    console.error("Error saving signature sequence: ", signatureSequenceError);
    throw signatureSequenceError;
  }
  return signatureSequenceData.signature_sequence as SignerAssignment[][];
}

export async function getSignatureSequence(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: signatureSequence, error: signatureSequenceError } =
    await supabaseClient!
      .from("forms")
      .select("signature_sequence")
      .eq("id", formId)
      .single();

  if (signatureSequenceError) throw signatureSequenceError;

  return signatureSequence.signature_sequence as SignerAssignment[][];
}

export async function removeSignaturesAndEnableEditing(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("[REMOVE SIGNATURES] Starting removal for form:", formId);

  try {
    // First, verify the form exists
    const { data: form, error: fetchError } = await supabaseClient
      .from("forms")
      .select("id, finalized_pdf, finalized_audit_json")
      .eq("id", formId)
      .single();

    if (fetchError) {
      console.error("[REMOVE SIGNATURES] Error fetching form:", fetchError);
      throw new Error(`Form not found: ${fetchError.message}`);
    }

    if (!form) {
      throw new Error("Form not found");
    }

    console.log("[REMOVE SIGNATURES] Found form:", form);

    // Delete all signature collections associated with this form
    const { error: signaturesDeleteError } = await supabaseClient
      .from("signature_collections")
      .delete()
      .eq("form_id", formId);

    if (signaturesDeleteError) {
      console.error(
        "[REMOVE SIGNATURES] Error deleting signatures:",
        signaturesDeleteError
      );
      throw new Error(
        `Failed to delete signatures: ${signaturesDeleteError.message}`
      );
    }

    console.log("[REMOVE SIGNATURES] Deleted all signature collections");

    // Delete all delegation mappings for this form
    // First get all signature collection IDs for this form
    const { data: sigCollections, error: sigCollectionsError } =
      await supabaseClient
        .from("signature_collections")
        .select("id")
        .eq("form_id", formId);

    if (!sigCollectionsError && sigCollections && sigCollections.length > 0) {
      const sigCollectionIds = sigCollections.map((sc) => sc.id);
      const { error: delegationsDeleteError } = await supabaseClient
        .from("delegation_mappings")
        .delete()
        .in("delegator_signature_collection_id", sigCollectionIds);

      if (delegationsDeleteError) {
        console.warn(
          "[REMOVE SIGNATURES] Warning deleting delegations:",
          delegationsDeleteError
        );
        // Don't fail the operation if delegation deletion fails
      }
    }

    // Reset form columns to re-enable editing
    const { data: updatedForm, error: updateError } = await supabaseClient
      .from("forms")
      .update({
        finalized_pdf: null,
        finalized_audit_json: null,
        signature_sequence: null,
      })
      .eq("id", formId)
      .select()
      .single();

    if (updateError) {
      console.error("[REMOVE SIGNATURES] Error updating form:", updateError);
      throw new Error(`Failed to reset form: ${updateError.message}`);
    }

    console.log("[REMOVE SIGNATURES] Successfully reset form:", updatedForm);

    return {
      success: true,
      message: "Signatures removed and form editing re-enabled",
      form: updatedForm,
    };
  } catch (error) {
    console.error("[REMOVE SIGNATURES] Operation failed:", error);
    throw error;
  }
}

export async function deleteForm(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("[DELETE FORM] Starting deletion for form:", formId);

  try {
    // First, verify the form exists and get its details
    const { data: form, error: fetchError } = await supabaseClient
      .from("forms")
      .select(
        "id, form_type, deal_option_id, user_id, finalized_pdf, file_upload_pdf"
      )
      .eq("id", formId)
      .single();

    if (fetchError) {
      console.error("[DELETE FORM] Error fetching form:", fetchError);
      throw new Error(`Form not found: ${fetchError.message}`);
    }

    if (!form) {
      throw new Error("Form not found");
    }

    console.log("[DELETE FORM] Found form:", form);

    // Delete all signature collections associated with this form
    const { error: signaturesDeleteError } = await supabaseClient
      .from("signature_collections")
      .delete()
      .eq("form_id", formId);

    if (signaturesDeleteError) {
      console.error(
        "[DELETE FORM] Error deleting signatures:",
        signaturesDeleteError
      );
      throw new Error(
        `Failed to delete associated signatures: ${signaturesDeleteError.message}`
      );
    }

    console.log(
      "[DELETE FORM] Deleted all associated signature collections"
    );

    // Delete associated files from storage if they exist
    const filesToDelete: string[] = [];

    if (form.finalized_pdf && typeof form.finalized_pdf === "string") {
      filesToDelete.push(form.finalized_pdf);
    }

    if (form.file_upload_pdf && typeof form.file_upload_pdf === "string") {
      filesToDelete.push(form.file_upload_pdf);
    }

    // Delete files from Supabase Storage
    if (filesToDelete.length > 0) {
      const { error: storageError } = await supabaseClient.storage
        .from("pdf-uploads")
        .remove(filesToDelete);

      if (storageError) {
        console.warn(
          "[DELETE FORM] Warning deleting files from storage:",
          storageError
        );
        // Don't fail the operation if file deletion fails
      } else {
        console.log(
          "[DELETE FORM] Deleted associated files from storage:",
          filesToDelete
        );
      }
    }

    // Delete the form itself
    const { data: deletedForm, error: deleteError } = await supabaseClient
      .from("forms")
      .delete()
      .eq("id", formId)
      .select()
      .single() as {data: Form, error: any};

    if (deleteError) {
      console.error("[DELETE FORM] Error deleting form:", deleteError);
      throw new Error(`Failed to delete form: ${deleteError.message}`);
    }

    console.log("[DELETE FORM] Successfully deleted form:", deletedForm);

    return {
      success: true,
      message: "Form and all associated data deleted successfully",
      deletedForm,
    };
  } catch (error) {
    console.error("[DELETE FORM] Deletion failed:", error);
    throw error;
  }
}

export async function generateAndLockPDF(
  userId: string,
  file: Express.Multer.File,
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<{ success: boolean; pdfUrl?: string; error?: string }> {
  try {
    const fileName = `${formId}/${uuidv4()}-generated.pdf`;

    const { data: uploadData, error: uploadError } =
      await supabaseClient.storage
        .from("pdf-uploads")
        .upload(fileName, file.buffer, {
          contentType: "application/pdf",
          upsert: false,
        });

    if (uploadError) {
      console.error("Error uploading PDF:", uploadError);
      return { success: false, error: uploadError.message };
    }

    const { error: updateError } = await supabaseClient
      .from("forms")
      .update({
        file_upload_pdf: fileName,
        is_pdf_locked: true,
      })
      .eq("id", formId);

    if (updateError) {
      await supabaseClient.storage.from("pdf-uploads").remove([fileName]);
      return { success: false, error: updateError.message };
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from("pdf-uploads").getPublicUrl(fileName);

    return { success: true, pdfUrl: publicUrl };
  } catch (error) {
    console.error("generateAndLockPDF error:", error);
    return { success: false, error: "Unexpected error" };
  }
}
