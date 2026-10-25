import { createClient } from "@supabase/supabase-js";
import {
  PartyIntake,
  PartyIntakeSchema,
  PartyResponse,
  PartyIntakeSchemaItem,
  Form,
  FormResponse,
  CachedData,
  AvailableForms,
  Deal,
  DealOption,
  Mapping,
} from "../../types/realtor";
import { v4 as uuidv4 } from "uuid";
import { insertForm, getAvailableFormsFromDealId } from "./form-logic";
import { getCachedData } from "./dealOption-logic";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";
import {
  sendEmail,
  formatClientIntakeEmail,
  formatClientIntakeCompletionEmail,
} from "../../lib/mailgun";

export async function getAllPartyIntakes(
  dealId: string,
  supabase: ReturnType<typeof createClient>
): Promise<PartyIntake[]> {
  const { data, error } = await supabase
    .from("party_intakes")
    .select()
    .eq("deal_id", dealId);

  if (error) {
    console.error("Error getting all party intakes:", error);
    throw error;
  }
  return data as unknown as PartyIntake[];
}

export async function getPartyIntakeById(
  partyIntakeId: string,
  supabase: ReturnType<typeof createClient>
): Promise<PartyIntake> {
  const { data, error } = (await supabase
    .from("party_intakes")
    .select()
    .eq("id", partyIntakeId)
    .single()) as { data: PartyIntake; error: any };

  if (error) {
    console.error("Error getting party intake by id:", error);
    throw error;
  }
  console.log("this is returning in getclientintakebyid", data);
  return data as PartyIntake;
}

export async function savePartyIntakeSchema(
  toSaveSchema: PartyIntakeSchema,
  partyIntakeId: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data: newSavedSchema, error } = (await supabase
    .from("party_intakes")
    .update({
      party_intake_form_schema: toSaveSchema,
    })
    .eq("id", partyIntakeId)
    .select()
    .single()) as { data: PartyIntakeSchema; error: any };

  if (error) {
    console.error("Error saving party intake schema:", error);
    throw error;
  }

  return newSavedSchema as PartyIntakeSchema;
}

export async function enableIntakeLink(
  partyIntakeId: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data: partyIntakeData, error: partyIntakeError } = (await supabase
    .from("party_intakes")
    .update({
      form_visible: true,
    })
    .eq("id", partyIntakeId)
    .select()
    .single()) as { data: PartyIntake; error: any };

  if (partyIntakeError) {
    console.error("Error enabling intake link:", partyIntakeError);
    throw partyIntakeError;
  }

  // Get additional data needed for the email
  const { data: dealData, error: dealError } = await supabase
    .from("deals")
    .select("dealName, template")
    .eq("id", partyIntakeData.deal_id)
    .single();

  if (dealError) {
    console.error("Error fetching deal data:", dealError);
    // Don't throw error here, continue without deal data
  }

  // Get realtor information
  const { data: realtorData, error: realtorError } = await supabase
    .from("profiles")
    .select("firstName, lastName")
    .eq("user_id", partyIntakeData.realtor_id)
    .single();

  if (realtorError) {
    console.error("Error fetching realtor data:", realtorError);
    // Don't throw error here, continue without realtor data
  }

  // Get deal option data for address
  const { data: dealOptionData, error: dealOptionError } = await supabase
    .from("dealOptions")
    .select("address")
    .eq("deal_id", partyIntakeData.deal_id)
    .eq("user_id", partyIntakeData.realtor_id)
    .neq("address", "deal-wide")
    .limit(1)
    .single();

  if (dealOptionError) {
    console.error("Error fetching deal option data:", dealOptionError);
    // Don't throw error here, continue without address
  }

  // Get party information
  const { data: partyData, error: partyError } = await supabase
    .from("parties")
    .select("full_name")
    .eq("id", partyIntakeData.party_id)
    .single();

  if (partyError) {
    console.error("Error fetching party data:", partyError);
    // Don't throw error here, continue without party data
  }

  // Construct the portal URL (client portal access page)
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const portalUrl = `${frontendUrl}/client-portal/${partyIntakeData.deal_id}/${partyIntakeData.party_id}`;

  // Send email notification
  try {
    // Construct realtor full name
    const realtorFullName =
      realtorData?.firstName && realtorData?.lastName
        ? `${realtorData.firstName} ${realtorData.lastName}`.trim()
        : "Your Realtor";

    const { subject, text, html } = formatClientIntakeEmail(
      portalUrl,
      (partyData?.full_name as string) || "Client",
      realtorFullName,
      (dealOptionData?.address as string) || undefined
    );

    await sendEmail({
      to: partyIntakeData.email,
      subject,
      text,
      html,
      from: "OnRoad Realtor <noreply@onroadai.com>",
    });

    console.log(
      `Client intake email sent successfully to ${partyIntakeData.email}`
    );
  } catch (emailError) {
    console.error("Error sending client intake email:", emailError);
    // Don't throw error here, the intake was still published successfully
  }

  return partyIntakeData;
}

export async function disableIntakeLink(
  partyIntakeId: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data, error } = (await supabase
    .from("party_intakes")
    .update({
      form_visible: false,
      party_response: null, // Clear party responses when unpublishing
    })
    .eq("id", partyIntakeId)
    .select()
    .single()) as { data: PartyIntake; error: any };

  if (error) {
    console.error("Error disabling intake link:", error);
    throw error;
  }

  return data;
}

export async function updatePartyResponse(
  partyIntakeId: string,
  partyResponse: PartyResponse,
  fileUploadResponse: Record<string, File[]>,
  supabase: ReturnType<typeof createClient>
) {
  //add file uploads to supabase storage

  // Upload files to Supabase Storage
  const fileUploads: { id: string; path: string[] }[] = await Promise.all(
    Object.entries(fileUploadResponse).map(async ([fieldId, files]) => {
      const fileNames = await Promise.all(
        files.map(async (file) => {
          const uniqueFileName = `${partyIntakeId}/${fieldId}/${uuidv4()}-${
            file.name
          }`;

          // Convert File object to ArrayBuffer for proper upload
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          const { data: fileUploadData, error: fileUploadError } =
            await supabase.storage
              .from("client-intake-files")
              .upload(uniqueFileName, uint8Array, {
                contentType: file.type,
                upsert: false,
              });

          if (fileUploadError) {
            console.error("Error uploading file:", fileUploadError);
            throw fileUploadError;
          }

          return uniqueFileName;
        })
      );

      return { id: fieldId, path: fileNames };
    })
  );

  //  add to party response
  fileUploads.forEach((fileUploadData) => {
    partyResponse[fileUploadData.id] = fileUploadData.path;
  });

  const { data, error: updatePartyResponseError } = (await supabase
    .from("party_intakes")
    .update({
      party_response: partyResponse,
    })
    .eq("id", partyIntakeId)
    .select()
    .single()) as { data: PartyIntake; error: any };

  if (updatePartyResponseError) {
    console.error("Error updating party response:", updatePartyResponseError);
    throw updatePartyResponseError;
  }

  // Send email notification to realtor about completed intake
  console.log(
    "[EMAIL NOTIFICATION] Starting client intake completion email process..."
  );
  console.log("[EMAIL NOTIFICATION] Party Intake ID:", partyIntakeId);
  console.log("[EMAIL NOTIFICATION] Deal ID:", data.deal_id);
  console.log("[EMAIL NOTIFICATION] Realtor ID:", data.realtor_id);
  console.log("[EMAIL NOTIFICATION] Party ID:", data.party_id);

  try {
    // Get additional data needed for the email
    console.log("[EMAIL NOTIFICATION] Fetching deal data...");
    const { data: dealData, error: dealError } = await supabase
      .from("deals")
      .select("dealName")
      .eq("id", data.deal_id)
      .single();

    if (dealError) {
      console.error(
        "[EMAIL NOTIFICATION] Error fetching deal data:",
        dealError
      );
    } else {
      console.log("[EMAIL NOTIFICATION] Deal data fetched:", dealData);
    }

    // Get realtor information
    console.log("[EMAIL NOTIFICATION] Fetching realtor data...");
    const { data: realtorData, error: realtorError } = await supabase
      .from("profiles")
      .select("firstName, lastName, email")
      .eq("user_id", data.realtor_id)
      .single();

    if (realtorError) {
      console.error(
        "[EMAIL NOTIFICATION] Error fetching realtor data:",
        realtorError
      );
    } else {
      console.log("[EMAIL NOTIFICATION] Realtor data fetched:", {
        firstName: realtorData?.firstName,
        lastName: realtorData?.lastName,
        email: realtorData?.email,
      });
    }

    // Get party information
    console.log("[EMAIL NOTIFICATION] Fetching party data...");
    const { data: partyData, error: partyError } = await supabase
      .from("parties")
      .select("full_name")
      .eq("id", data.party_id)
      .single();

    if (partyError) {
      console.error(
        "[EMAIL NOTIFICATION] Error fetching party data:",
        partyError
      );
    } else {
      console.log("[EMAIL NOTIFICATION] Party data fetched:", partyData);
    }

    // Get deal option data for address
    console.log("[EMAIL NOTIFICATION] Fetching deal option data...");
    const { data: dealOptionData, error: dealOptionError } = await supabase
      .from("dealOptions")
      .select("address")
      .eq("deal_id", data.deal_id)
      .neq("address", "deal-wide")
      .limit(1)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no results

    if (dealOptionError) {
      console.error(
        "[EMAIL NOTIFICATION] Error fetching deal option data:",
        dealOptionError
      );
      console.log("[EMAIL NOTIFICATION] Continuing without address...");
    } else if (!dealOptionData) {
      console.log(
        "[EMAIL NOTIFICATION] No deal options found (might be a deal-wide only deal)"
      );
    } else {
      console.log(
        "[EMAIL NOTIFICATION] Deal option data fetched:",
        dealOptionData
      );
    }

    // Construct realtor full name
    const realtorFullName =
      realtorData?.firstName && realtorData?.lastName
        ? `${realtorData.firstName} ${realtorData.lastName}`.trim()
        : null;

    // Check if we have all required data
    console.log("[EMAIL NOTIFICATION] Checking required data:");
    console.log("  - Realtor email:", realtorData?.email ? "" : "");
    console.log("  - Realtor name:", realtorFullName ? "" : "");
    console.log("  - Deal name:", dealData?.dealName ? "" : "");
    console.log("  - Party name:", partyData?.full_name ? "" : "");

    // Send notification email to realtor if we have all the required data
    if (
      realtorData?.email &&
      realtorFullName &&
      dealData?.dealName &&
      partyData?.full_name
    ) {
      console.log(
        "[EMAIL NOTIFICATION] All required data present, preparing email..."
      );

      const { subject, text, html } = formatClientIntakeCompletionEmail(
        realtorFullName,
        partyData.full_name as string,
        dealData.dealName as string,
        data.deal_id,
        (dealOptionData?.address as string) || undefined
      );

      console.log("[EMAIL NOTIFICATION] Email prepared:");
      console.log("  - To:", realtorData.email);
      console.log("  - Subject:", subject);
      console.log("  - From:", "OnRoad Realtor <noreply@onroadai.com>");

      console.log("[EMAIL NOTIFICATION] Sending email via Mailgun...");
      const emailResult = await sendEmail({
        to: realtorData.email as string,
        subject,
        text,
        html,
        from: "OnRoad <noreply@onroadai.com>",
      });

      console.log("[EMAIL NOTIFICATION] Email sent successfully!");
      console.log("[EMAIL NOTIFICATION] Mailgun response:", emailResult);
      console.log(
        `[EMAIL NOTIFICATION] Client intake completion email sent to ${realtorData.email}`
      );
    } else {
      console.log(
        "[EMAIL NOTIFICATION] Missing required data, email not sent"
      );
      console.log("[EMAIL NOTIFICATION] Missing data details:");
      if (!realtorData?.email) console.log("  - Missing realtor email");
      if (!realtorFullName)
        console.log("  - Missing realtor name (firstName or lastName)");
      if (!dealData?.dealName) console.log("  - Missing deal name");
      if (!partyData?.full_name) console.log("  - Missing party name");
    }
  } catch (emailError) {
    console.error(
      "[EMAIL NOTIFICATION] Error in email notification process:",
      emailError
    );
    console.error("[EMAIL NOTIFICATION] Error details:", {
      message:
        emailError instanceof Error ? emailError.message : "Unknown error",
      stack: emailError instanceof Error ? emailError.stack : undefined,
    });
    // Don't throw error here, the intake was still updated successfully
  }

  console.log("[EMAIL NOTIFICATION] Email notification process completed");

  return data;
}

export async function getFileUploadUrls(
  filepaths: string[],
  supabase: ReturnType<typeof createClient>
) {
  const fileUploadUrls: string[] = await Promise.all(
    filepaths.map(async (filepath) => {
      const { data, error } = await supabase.storage
        .from("client-intake-files")
        .createSignedUrl(filepath, 60);

      if (error) {
        console.error("Error getting file upload url:", error);
        throw error;
      }

      return data.signedUrl;
    })
  );

  return fileUploadUrls;
}

export async function pushPartyIntakeAnswersToForms(
  partyIntakeId: string,
  supabase: ReturnType<typeof createClient>
) {
  console.log("[PUSH TO FORMS] Starting pushPartyIntakeAnswersToForms");
  console.log("[PUSH TO FORMS] Party Intake ID:", partyIntakeId);
  
  const partyIntake = await getPartyIntakeById(partyIntakeId, supabase);
  console.log("[PUSH TO FORMS] Retrieved party intake:", {
    id: partyIntake.id,
    deal_id: partyIntake.deal_id,
    party_id: partyIntake.party_id,
    responseKeys: Object.keys(partyIntake.party_response || {})
  });
  
  let filteredPartyResponse: {
    uniqueId: string;
    value: string | string[];
    mapping: Mapping[];
  }[] = [];
  const partyIntakeSchema =
    partyIntake.party_intake_form_schema as PartyIntakeSchemaItem[];

  console.log("[PUSH TO FORMS] Party intake schema items count:", partyIntakeSchema?.length || 0);

  for (const uniqueId of Object.keys(partyIntake.party_response)) {
    const schemaItem = partyIntakeSchema.find((item) => item.unique_id === uniqueId);
    
    console.log(`[PUSH TO FORMS] Processing response field: ${uniqueId}`);
    console.log(`  - Value:`, partyIntake.party_response[uniqueId]);
    console.log(`  - Schema item found:`, !!schemaItem);
    console.log(`  - Has mapping:`, !!schemaItem?.mapping);
    
    if (schemaItem) {
      console.log(`  - Field type:`, schemaItem.display_attributes.input_type);
      console.log(`  - Field label:`, schemaItem.display_attributes.display_name);
      if (schemaItem.display_attributes.input_type === 'checkbox') {
        console.log(`  [CHECKBOX] Detected checkbox field`);
        console.log(`  [CHECKBOX] Options:`, schemaItem.display_attributes.checkbox_options);
        console.log(`  [CHECKBOX] Value type:`, typeof partyIntake.party_response[uniqueId]);
        console.log(`  [CHECKBOX] Is array:`, Array.isArray(partyIntake.party_response[uniqueId]));
      }
      if (schemaItem.mapping) {
        console.log(`  - Mappings count:`, schemaItem.mapping.length);
        schemaItem.mapping.forEach((m, i) => {
          console.log(`    Mapping ${i + 1}: formType=${m.formType}, uniqueId=${m.uniqueId}`);
        });
      }
    }
    
    if (schemaItem?.mapping) {
      filteredPartyResponse.push({
        uniqueId: uniqueId,
        value: partyIntake.party_response[uniqueId] as string | string[],
        mapping: schemaItem.mapping,
      });
    }
  }

  console.log("[PUSH TO FORMS] Filtered party response entries:", filteredPartyResponse.length);
  filteredPartyResponse.forEach((item, index) => {
    console.log(`  Entry ${index + 1}:`);
    console.log(`    - Source field: ${item.uniqueId}`);
    console.log(`    - Value:`, item.value);
    console.log(`    - Value type:`, typeof item.value);
    console.log(`    - Is array:`, Array.isArray(item.value));
    console.log(`    - Mappings to ${item.mapping.length} form field(s)`);
  });

  //get deal-wide forms

  const { data: dealData, error: dealError } = (await supabase
    .from("deals")
    .select("template")
    .eq("id", partyIntake.deal_id)
    .single()) as { data: { template: string }; error: any };

  if (dealError) {
    console.error("Error getting deal data:", dealError);
    throw dealError;
  }

  ///get all dealOoptions

  const { data: dealOptionsData, error: dealOptionsError } = (await supabase
    .from("dealOptions")
    .select("id, address")
    .eq("deal_id", partyIntake.deal_id)) as {
    data: { id: string; address: string }[];
    error: any;
  };

  if (dealOptionsError) {
    console.error("Error getting deal options data:", dealOptionsError);
  }

  const dealWideDealOptionId: string = dealOptionsData.find(
    (option) => option.address === "deal-wide"
  )?.id!;
  const restDealOptionIds = dealOptionsData
    .filter((option) => option.address !== "deal-wide")
    .map((option) => option.id);

  //deal wide logic for implementing

  const { data, error: dealWideFormsError } = await supabase
    .from("forms")
    .select()
    .eq("deal_option_id", dealWideDealOptionId);
  const dealWideExistingForms = data as Form[];

  if (dealWideFormsError) {
    console.error("Error getting deal wide forms:", dealWideFormsError);
    throw dealWideFormsError;
  }

  const splitTemplate = dealData.template.split("-");
  const availableForms: AvailableForms =
    KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"].availableForms;

  //dealWideNonexistingForms
  const dealWideNonexistingForms = availableForms.deal_wide.filter(
    (form) =>
      !dealWideExistingForms.some(
        (existingForm) => existingForm.form_type === form.formType
      )
  );
  console.log("deal wide nonexisting forms", dealWideNonexistingForms);

  const toAddDealWideForms: {
    formType: string;
    formResponse: FormResponse;
    stage: string;
  }[] = [];
  
  console.log("[PUSH TO FORMS] Building deal-wide forms to add...");
  filteredPartyResponse.forEach((item) => {
    item.mapping.forEach((mapping) => {
      const matchingForm = dealWideNonexistingForms.find(
        (form) => form.formType === mapping.formType
      );
      
      console.log(`  Processing mapping: ${item.uniqueId} -> ${mapping.formType}:${mapping.uniqueId}`);
      console.log(`    - Matching form found:`, !!matchingForm);
      console.log(`    - Value to map:`, item.value);
      console.log(`    - Value type:`, typeof item.value);
      console.log(`    - Is array:`, Array.isArray(item.value));
      
      if (matchingForm) {
        // Process the value based on mapping type
        let mappedValue: string | string[] = item.value;
        
        // Handle checkbox mapping - map source options to target options
        if (mapping.checkbox_mapping && Array.isArray(item.value)) {
          console.log(`    [CHECKBOX MAPPING] Processing checkbox mapping`);
          console.log(`    Source values:`, item.value);
          console.log(`    Checkbox mappings:`, mapping.checkbox_mapping);
          
          mappedValue = item.value.map((sourceOption) => {
            const mappingEntry = mapping.checkbox_mapping?.find(
              (cm) => cm.option === sourceOption
            );
            const targetOption = mappingEntry?.mappedCheckboxField || sourceOption;
            console.log(`      Mapping "${sourceOption}" -> "${targetOption}"`);
            return targetOption;
          });
          
          console.log(`    Mapped values:`, mappedValue);
        }
        
        // Check if we already have an entry for this formType
        const existingEntry = toAddDealWideForms.find(
          (f) => f.formType === mapping.formType
        );
        if (existingEntry) {
          console.log(`    Merging into existing form entry for ${mapping.formType}`);
          console.log(`    Adding field ${mapping.uniqueId} with mapped value:`, mappedValue);
          // Merge the form response
          existingEntry.formResponse[mapping.uniqueId] = mappedValue;
        } else {
          console.log(`    Creating new form entry for ${mapping.formType}`);
          console.log(`    Initial field ${mapping.uniqueId} with mapped value:`, mappedValue);
          toAddDealWideForms.push({
            formType: mapping.formType,
            formResponse: {
              [mapping.uniqueId]: mappedValue,
            },
            stage: matchingForm.preferredStage || "init",
          });
        }
      }
    });
  });
  
  console.log("[PUSH TO FORMS] Deal-wide forms to add:", toAddDealWideForms.length);
  toAddDealWideForms.forEach((form, i) => {
    console.log(`  Form ${i + 1}: ${form.formType}`);
    console.log(`    - Stage: ${form.stage}`);
    console.log(`    - Response fields:`, Object.keys(form.formResponse));
    Object.entries(form.formResponse).forEach(([key, value]) => {
      console.log(`      ${key}:`, value);
    });
  });

  //add deal wide forms
  if (toAddDealWideForms.length > 0) {
    const { data: dealWideFormsData, error: insertDealWideFormsError } =
      (await supabase
        .from("forms")
        .insert(
          toAddDealWideForms.map((form) => ({
            form_type: form.formType,
            form_response: form.formResponse,
            deal_option_id: dealWideDealOptionId,
            form_stage: form.stage,
          }))
        )
        .select()) as { data: Form[]; error: any };

    if (insertDealWideFormsError) {
      console.error(
        "Error inserting deal wide forms:",
        insertDealWideFormsError
      );
      throw insertDealWideFormsError;
    }
  }

  //Updating deal wide forms
  const existingDealWideFormTypes = dealWideExistingForms.map(
    (form) => form.form_type
  );

  const toUpdateDealWideForms: {
    formId: string;
    formType: string;
    updates: FormResponse;
  }[] = [];
  
  console.log("[PUSH TO FORMS] Building deal-wide forms to update...");
  filteredPartyResponse.forEach((item) => {
    item.mapping.forEach((mapping) => {
      const existingForm = dealWideExistingForms.find(
        (form) => form.form_type === mapping.formType
      );
      
      console.log(`  Checking for existing form: ${mapping.formType}`);
      console.log(`    - Existing form found:`, !!existingForm);
      
      if (existingForm) {
        console.log(`    - Form ID: ${existingForm.id}`);
        console.log(`    - Mapping field ${item.uniqueId} -> ${mapping.uniqueId}`);
        console.log(`    - Value to update:`, item.value);
        
        // Process the value based on mapping type
        let mappedValue: string | string[] = item.value;
        
        // Handle checkbox mapping - map source options to target options
        if (mapping.checkbox_mapping && Array.isArray(item.value)) {
          console.log(`    [CHECKBOX MAPPING] Processing checkbox mapping for update`);
          console.log(`    Source values:`, item.value);
          console.log(`    Checkbox mappings:`, mapping.checkbox_mapping);
          
          mappedValue = item.value.map((sourceOption) => {
            const mappingEntry = mapping.checkbox_mapping?.find(
              (cm) => cm.option === sourceOption
            );
            const targetOption = mappingEntry?.mappedCheckboxField || sourceOption;
            console.log(`      Mapping "${sourceOption}" -> "${targetOption}"`);
            return targetOption;
          });
          
          console.log(`    Mapped values:`, mappedValue);
        }
        
        // Check if we already have an update entry for this form
        const existingUpdate = toUpdateDealWideForms.find(
          (u) => u.formId === existingForm.id
        );
        if (existingUpdate) {
          console.log(`    Adding to existing update for form ${existingForm.id}`);
          existingUpdate.updates[mapping.uniqueId] = mappedValue;
        } else {
          console.log(`    Creating new update entry for form ${existingForm.id}`);
          toUpdateDealWideForms.push({
            formId: existingForm.id,
            formType: mapping.formType,
            updates: {
              [mapping.uniqueId]: mappedValue,
            },
          });
        }
      }
    });
  });

  console.log("[PUSH TO FORMS] Deal-wide forms to update:", toUpdateDealWideForms.length);
  toUpdateDealWideForms.forEach((update, i) => {
    console.log(`  Update ${i + 1}: Form ${update.formType} (ID: ${update.formId})`);
    console.log(`    - Fields to update:`, Object.keys(update.updates));
    Object.entries(update.updates).forEach(([key, value]) => {
      console.log(`      ${key}:`, value);
    });
  });

  // Update existing deal-wide forms only if fields are empty or blank
  console.log("[PUSH TO FORMS] Applying updates to existing deal-wide forms...");
  for (const updateItem of toUpdateDealWideForms) {
    const existingForm = dealWideExistingForms.find(
      (f) => f.id === updateItem.formId
    );
    if (existingForm) {
      console.log(`  Updating form ${updateItem.formType} (ID: ${updateItem.formId})`);
      const currentFormResponse = existingForm.form_response || {};
      const updatedFormResponse = { ...currentFormResponse };

      // Only update fields that are empty or blank
      for (const [key, value] of Object.entries(updateItem.updates)) {
        const currentValue = currentFormResponse[key];
        console.log(`    - Field ${key}:`);
        console.log(`      Current value:`, currentValue);
        console.log(`      New value:`, value);
        
        // Check if field is empty - includes empty arrays for checkbox fields
        const isEmpty = !currentValue || 
                       currentValue === "" || 
                       (Array.isArray(currentValue) && currentValue.length === 0);
        
        console.log(`      Is empty/blank:`, isEmpty);
        
        if (isEmpty) {
          console.log(`      Updating field (was empty)`);
          updatedFormResponse[key] = value;
        } else {
          console.log(`      Skipping field (already has value)`);
        }
      }

      // Only update if there are actual changes
      const hasChanges = JSON.stringify(currentFormResponse) !== JSON.stringify(updatedFormResponse);
      console.log(`    - Has changes:`, hasChanges);
      
      if (hasChanges) {
        console.log(`    Updating form in database...`);
        console.log(`    Updated form response:`, updatedFormResponse);
        
        const { error: updateError } = await supabase
          .from("forms")
          .update({ form_response: updatedFormResponse })
          .eq("id", updateItem.formId);

        if (updateError) {
          console.error(`    Error updating deal wide form:`, updateError);
          throw updateError;
        }
        console.log(`    Form updated successfully`);
      } else {
        console.log(`    No changes to apply`);
      }
    }
  }

  // Property-specific forms logic
  for (const dealOptionId of restDealOptionIds) {
    // Get existing forms for this deal option
    const { data: propertyForms, error: propertyFormsError } = await supabase
      .from("forms")
      .select()
      .eq("deal_option_id", dealOptionId);

    if (propertyFormsError) {
      console.error("Error getting property forms:", propertyFormsError);
      throw propertyFormsError;
    }

    const existingPropertyForms = propertyForms as Form[];

    // Identify non-existing property-specific forms
    const propertyNonexistingForms = availableForms.property_specific?.filter(
      (form) =>
        !existingPropertyForms.some(
          (existingForm) => existingForm.form_type === form.formType
        )
    );

    // Create new property-specific forms
    const toAddPropertyForms: {
      formType: string;
      formResponse: FormResponse;
      stage: string;
    }[] = [];
    filteredPartyResponse.forEach((item) => {
      item.mapping.forEach((mapping) => {
        const matchingForm = propertyNonexistingForms?.find(
          (form) => form.formType === mapping.formType
        );
        if (matchingForm) {
          // Process the value based on mapping type
          let mappedValue: string | string[] = item.value;
          
          // Handle checkbox mapping - map source options to target options
          if (mapping.checkbox_mapping && Array.isArray(item.value)) {
            mappedValue = item.value.map((sourceOption) => {
              const mappingEntry = mapping.checkbox_mapping?.find(
                (cm) => cm.option === sourceOption
              );
              return mappingEntry?.mappedCheckboxField || sourceOption;
            });
          }
          
          const existingEntry = toAddPropertyForms.find(
            (f) => f.formType === mapping.formType
          );
          if (existingEntry) {
            existingEntry.formResponse[mapping.uniqueId] = mappedValue;
          } else {
            toAddPropertyForms.push({
              formType: mapping.formType,
              formResponse: {
                [mapping.uniqueId]: mappedValue,
              },
              stage: matchingForm.preferredStage || "init",
            });
          }
        }
      });
    });

    // Insert new property-specific forms
    if (toAddPropertyForms.length > 0) {
      const { error: insertPropertyFormsError } = await supabase
        .from("forms")
        .insert(
          toAddPropertyForms.map((form) => ({
            form_type: form.formType,
            form_response: form.formResponse,
            deal_option_id: dealOptionId,
            form_stage: form.stage,
          }))
        );

      if (insertPropertyFormsError) {
        console.error(
          "Error inserting property forms:",
          insertPropertyFormsError
        );
        throw insertPropertyFormsError;
      }
    }

    // Update existing property-specific forms
    const toUpdatePropertyForms: {
      formId: string;
      formType: string;
      updates: FormResponse;
    }[] = [];
    filteredPartyResponse.forEach((item) => {
      item.mapping.forEach((mapping) => {
        const existingForm = existingPropertyForms.find(
          (form) => form.form_type === mapping.formType
        );
        if (existingForm) {
          // Process the value based on mapping type
          let mappedValue: string | string[] = item.value;
          
          // Handle checkbox mapping - map source options to target options
          if (mapping.checkbox_mapping && Array.isArray(item.value)) {
            mappedValue = item.value.map((sourceOption) => {
              const mappingEntry = mapping.checkbox_mapping?.find(
                (cm) => cm.option === sourceOption
              );
              return mappingEntry?.mappedCheckboxField || sourceOption;
            });
          }
          
          const existingUpdate = toUpdatePropertyForms.find(
            (u) => u.formId === existingForm.id
          );
          if (existingUpdate) {
            existingUpdate.updates[mapping.uniqueId] = mappedValue;
          } else {
            toUpdatePropertyForms.push({
              formId: existingForm.id,
              formType: mapping.formType,
              updates: {
                [mapping.uniqueId]: mappedValue,
              },
            });
          }
        }
      });
    });

    // Update existing property forms only if fields are empty or blank
    for (const updateItem of toUpdatePropertyForms) {
      const existingForm = existingPropertyForms.find(
        (f) => f.id === updateItem.formId
      );
      if (existingForm) {
        const currentFormResponse = existingForm.form_response || {};
        const updatedFormResponse = { ...currentFormResponse };

        // Only update fields that are empty or blank
        for (const [key, value] of Object.entries(updateItem.updates)) {
          const currentValue = currentFormResponse[key];
          
          // Check if field is empty - includes empty arrays for checkbox fields
          const isEmpty = !currentValue || 
                         currentValue === "" || 
                         (Array.isArray(currentValue) && currentValue.length === 0);
          
          if (isEmpty) {
            updatedFormResponse[key] = value;
          }
        }

        // Only update if there are actual changes
        if (
          JSON.stringify(currentFormResponse) !==
          JSON.stringify(updatedFormResponse)
        ) {
          const { error: updateError } = await supabase
            .from("forms")
            .update({ form_response: updatedFormResponse })
            .eq("id", updateItem.formId);

          if (updateError) {
            console.error("Error updating property form:", updateError);
            throw updateError;
          }
        }
      }
    }
  }

  console.log("[PUSH TO FORMS] Successfully pushed party intake answers to forms");
  console.log("[PUSH TO FORMS] Summary:");
  console.log(`  - Party Intake ID: ${partyIntakeId}`);
  console.log(`  - Total responses processed: ${Object.keys(partyIntake.party_response).length}`);
  console.log(`  - Responses with mappings: ${filteredPartyResponse.length}`);
  console.log(`  - Deal-wide forms added: ${toAddDealWideForms.length}`);
  console.log(`  - Deal-wide forms updated: ${toUpdateDealWideForms.length}`);
  console.log(`  - Properties processed: ${restDealOptionIds.length}`);
  console.log("[PUSH TO FORMS] Process completed successfully");
}
