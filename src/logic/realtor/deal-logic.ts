import { createClient } from "@supabase/supabase-js";
import {
  Party,
  PartyIntake,
  PartyIntakeSchema,
  PartyIntakeTemplate,
  Deal,
  DealParty,
  DealOption,
  Form,
  TemplateForm,
  StepStatus,
} from "../../types/realtor";
import { getPartiesForDeal } from "./parties-logic";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";
import { resolveKnowledgeBaseForm } from "./form-logic";
import { getCachedData } from "./dealOption-logic";
import { createDealOptionPartyRow } from "./deal_option_parties-actions";

export async function getAllDeals(
  userId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("userId in getalldeals", userId);
  const { data: deals, error } = await supabaseClient!
    .from("deals")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return deals as unknown as Deal[];
}

export async function createDeal(
  insertDeal: Omit<Deal, "id" | "created_at" | "isActive">,
  parties: {
    role: string;
    realtorIsRepresenting: boolean;
    partyNumber: number;
    party: Omit<
      Party,
      | "id"
      | "created_at"
      | "form_information"
      | "notes"
      | "phone_number"
      | "realtor_id"
    >;
  }[],
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("create deal called: ", insertDeal);
  // 1. Create the parent deal row first
  const { data: dealData, error: dealError } = await supabaseClient!
    .from("deals")
    .insert(insertDeal)
    .select()
    .single();

  if (dealError) throw dealError;

  const insertedDeal = dealData as unknown as Deal;
  const realtorId: string = insertedDeal.user_id as unknown as string;

  console.log("creating deal wide deal option")

  const { data: blankDealWideTemplateForms, error: blankDealWideFormsError } =
      (await supabaseClient
        .from("dealOptions")
        .insert({
          address: "deal-wide",
          deal_id: insertedDeal.id,
        })
        .select()
        .single()) as { data: DealOption; error: any };

    if (blankDealWideFormsError) {
      console.error(
        " [DEAL CREATION] Error creating deal-wide dealOption:",
        blankDealWideFormsError
      );
      throw blankDealWideFormsError;
    }

    console.log(
      "[DEAL CREATION] Created deal-wide dealOption:",
      blankDealWideTemplateForms
    );

  // 2. Create the clients and their corresponding intake forms
  console.log(
    "abt to call create dealparty row with",
    blankDealWideTemplateForms.id,
    parties,
    realtorId
  );

  const dealParties: DealParty[] = await createDealOptionPartyRow(
    blankDealWideTemplateForms.id,
    parties,
    realtorId,
    supabaseClient
  ) as unknown as DealParty[];

  console.log("dealParties: ", dealParties);

  const allParties: Party[] = await getPartiesForDeal(
    insertedDeal.id,
    supabaseClient
  );

  // Client intake forms are now created by createDealPartyRow function

  // 3. Finally, create the deal-wide forms now that clients exist
  console.log("Creating deal-wide forms...");

  if (insertedDeal.template.split("-")[2] === "blank") {
    const formsToAdd = KNOWLEDGE_BASE[insertedDeal.template.split("-")[0]][
      insertedDeal.template.split("-")[1]
    ]["TX"].requiredForms.filter((form) => form.placement === "deal-wide");

    console.log(
      "[DEAL CREATION] Forms to add from knowledge base:",
      formsToAdd
    );
    console.log("[DEAL CREATION] Number of forms to add:", formsToAdd.length);

    const cachedData = await getCachedData(realtorId, supabaseClient);
    console.log("[DEAL CREATION] Cached data retrieved:", cachedData);

    const bulkFormsAdd = formsToAdd.map(async (form, index) => {
      try {
        const formResponse = await resolveKnowledgeBaseForm(
          form.formType,
          {},
          cachedData,
          supabaseClient,
          {
            dealOptionId: blankDealWideTemplateForms.id,
            dealId: insertedDeal.id,
            userId: insertedDeal.user_id,
          }
        );
        console.log(
          `[DEAL CREATION] Form ${form.formType} resolved successfully`
        );
        return {
          deal_option_id: blankDealWideTemplateForms.id,
          form_type: form.formType,
          form_response: formResponse,
          order: index + 1,
          form_stage: form.form_stage,
        };
      } catch (error) {
        console.error(
          `[DEAL CREATION] Error resolving form ${form.formType}:`,
          error
        );
        throw error;
      }
    });

    console.log("[DEAL CREATION] Waiting for all forms to be resolved...");
    const resolvedFormsToAdd = await Promise.all(bulkFormsAdd);
    console.log(
      "[DEAL CREATION] All forms resolved, inserting into database..."
    );

    const { error: knowledgeBaseFormsError } = await supabaseClient
      .from("forms")
      .insert(resolvedFormsToAdd);

    if (knowledgeBaseFormsError) {
      console.error(
        "[DEAL CREATION] Error inserting forms:",
        knowledgeBaseFormsError
      );
      throw knowledgeBaseFormsError;
    }
  } else {
    // Handle pre-defined templates

    const { data: templateData, error: dealWideFormsError } =
      await supabaseClient
        .from("templates")
        .select(`template_forms(*)`)
        .eq("user_id", insertedDeal.user_id)
        .eq("name", insertedDeal.template)
        .single();

    if (dealWideFormsError) {
      console.error(
        "[DEAL CREATION] Error fetching template:",
        dealWideFormsError
      );
      throw dealWideFormsError;
    }

    console.log("[DEAL CREATION] Template data retrieved:", templateData);

    const dealWideTemplateForms: TemplateForm[] =
      (
        templateData?.template_forms as unknown as TemplateForm[] | null
      )?.filter((tForm) => tForm?.deal_wide === true) || [];

    console.log(
      "[DEAL CREATION] Deal-wide template forms:",
      dealWideTemplateForms
    );
    console.log(
      "[DEAL CREATION] Number of deal-wide forms:",
      dealWideTemplateForms.length
    );



    console.log(
      "[DEAL CREATION] Created deal-wide dealOption:",
      blankDealWideTemplateForms
    );

    if (dealWideTemplateForms.length > 0) {
      const cachedData = await getCachedData(realtorId, supabaseClient);
      console.log(
        "[DEAL CREATION] Cached data retrieved for pre-defined template:",
        cachedData
      );

      // Process each form from the template using the knowledge base
      const bulkFormsAdd = dealWideTemplateForms.map(
        async (tForm: TemplateForm) => {
          console.log(
            `[DEAL CREATION] Processing template form:`,
            tForm.form_type
          );
          console.log(
            `[DEAL CREATION] Template form response:`,
            tForm.form_response
          );
          console.log(`[DEAL CREATION] Template form order:`, tForm.order);

          try {
            // The knowledge base will pre-fill the form.
            // We pass the template's response as a base, but the knowledge base can override it.
            const formResponse = await resolveKnowledgeBaseForm(
              tForm.form_type,
              tForm.form_response || {}, // Base response from the template
              cachedData,
              supabaseClient,
              {
                dealOptionId: blankDealWideTemplateForms.id,
                userId: insertedDeal.user_id,
              }
            );
            console.log(
              `[DEAL CREATION] Template form ${tForm.form_type} resolved successfully`
            );
            return {
              deal_option_id: blankDealWideTemplateForms.id,
              form_type: tForm.form_type,
              form_response: formResponse, // Use the newly resolved response
              order: tForm.order,
              form_stage: tForm.form_stage,
            };
          } catch (error) {
            console.error(
              `[DEAL CREATION] Error resolving template form ${tForm.form_type}:`,
              error
            );
            throw error;
          }
        }
      );

      console.log(
        "[DEAL CREATION] Waiting for all template forms to be resolved..."
      );
      // Wait for all the async operations to complete
      const resolvedFormsToAdd = await Promise.all(bulkFormsAdd);
      console.log(
        "[DEAL CREATION] All template forms resolved, inserting into database..."
      );
      console.log("these are the resolved forms to add: ", resolvedFormsToAdd);

      // **FIXED**: Insert the `resolvedFormsToAdd` array, not the original template data
      const { error: formsError } = await supabaseClient
        .from("forms")
        .insert(resolvedFormsToAdd);

      if (formsError) {
        console.error(
          "[DEAL CREATION] Error inserting template forms:",
          formsError
        );
        throw formsError;
      }

      console.log("[DEAL CREATION] Successfully inserted all template forms");
    } else {
      console.log("[DEAL CREATION] No deal-wide forms to process");
    }
  }

  return insertedDeal;
}

export async function deleteDeal(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealData, error: dealError } = await supabaseClient!
    .from("deals")
    .delete()
    .eq("id", deal_id);

  if (dealError) throw dealError;

  return dealData as unknown as Deal;
}

export async function markDealComplete(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealData, error: dealError } = (await supabaseClient!
    .from("deals")
    .update({ isActive: false })
    .eq("id", deal_id)
    .select()
    .single()) as { data: Deal; error: any };

  if (dealError) throw dealError;

  return dealData;
}

export async function getDealById(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealData, error: dealError } = (await supabaseClient!
    .from("deals")
    .select()
    .eq("id", deal_id)
    .single()) as { data: Deal; error: any };

  if (dealError) throw dealError;

  return dealData;
}

export async function updateDeal(
  deal_id: string,
  updateDeal: Partial<Deal>,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: dealData, error: dealError } = await supabaseClient!
    .from("deals")
    .update(updateDeal)
    .eq("id", deal_id)
    .select()
    .single();

  if (dealError) throw dealError;

  return dealData as unknown as Deal;
}

export async function updateDealPartyForm(
  deal_id: string,
  client_form: any,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data, error } = await supabaseClient
    .from("deals")
    .update({ client_form })
    .eq("id", deal_id)
    .select("client_form")
    .single();
  if (error) throw error;
  return data;
}

export async function getDealParties(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data, error } = await supabaseClient
    .from("deals_parties")
    .select(
      `
      id,
      deal_id,
      party_id,
      party_role,
      partyNumber,
      realtorIsRepresenting,
      created_at,
      parties (
        id,
        full_name,
        email,
        phone_number,
        current_transaction_status,
        notes,
        form_information,
        created_at,
        realtor_id
      )
    `
    )
    .eq("deal_id", deal_id);

  if (error) throw error;

  console.log("this is the joined data from deals_parties and parties: ", data);

  // Transform the data to match frontend expectations
  const transformedData =
    data?.map((item: any) => ({
      id: item.party_id, // Use party_id as the main id for frontend compatibility
      deal_id: item.deal_id,
      party_id: item.party_id,
      party_role: item.party_role,
      partyNumber: item.partyNumber,
      realtorIsRepresenting: item.realtorIsRepresenting,
      created_at: item.created_at,
      // Frontend-compatible field names (without party_ prefix)
      email: item.parties?.email || "",
      full_name: item.parties?.full_name || "",
      phone_number: item.parties?.phone_number || "",
      current_transaction_status:
        item.parties?.current_transaction_status || "",
      notes: item.parties?.notes || "",
      form_information: item.parties?.form_information || {},
      // Keep party_ prefixed versions for backward compatibility
      party_email: item.parties?.email || "",
      party_name: item.parties?.full_name || "",
      party_prospective: false, // Default to false since this field appears to be legacy
      party_phone: item.parties?.phone_number || "",
      party_status: item.parties?.current_transaction_status || "",
      party_notes: item.parties?.notes || "",
      party_form_information: item.parties?.form_information || {},
      party_created_at: item.parties?.created_at || "",
      party_realtor_id: item.parties?.realtor_id || "",
    })) || [];

  console.log("transformed party data: ", transformedData);

  return transformedData;
}

export async function updateDealStepsStatuses(
  deal_id: string,
  steps_statuses: { stepId: string; status: StepStatus }[],
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("steps statuses to update with: ", steps_statuses);

  const currentSteps: { stepId: string; status: StepStatus }[] =
    (await getDealById(deal_id, supabaseClient)).steps_statuses ?? [];

  steps_statuses.forEach((step) => {
    const foundStep = currentSteps.find((s) => s.stepId === step.stepId);
    if (foundStep) {
      foundStep.status = step.status;
    } else {
      currentSteps.push({ stepId: step.stepId, status: step.status });
    }
  });

  console.log("steps to update: ", currentSteps);

  const { data, error } = (await supabaseClient
    .from("deals")
    .update({
      steps_statuses: currentSteps,
    })
    .eq("id", deal_id)
    .select()
    .single()) as { data: Deal; error: any };

  if (error) throw error;
  return data as unknown as Deal;
}

export async function getDealStepsStatuses(
  deal_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data, error } = (await supabaseClient
    .from("deals")
    .select("steps_statuses")
    .eq("id", deal_id)
    .single()) as { data: Deal; error: any };

  if (error) throw error;
  return data;
}
