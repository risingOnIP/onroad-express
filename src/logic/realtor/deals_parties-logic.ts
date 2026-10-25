import { createClient } from "@supabase/supabase-js";
import {
  Party,
  Deal,
  DealParty,
  PartyIntake,
  PartyIntakeSchema,
  PartyIntakeTemplate,
} from "../../types/realtor";
import { getAllDeals } from "./deal-logic";
import { insertParty } from "./parties-logic";
import { KNOWLEDGE_BASE } from "./centralIntelligence/centralIntelligence";
import { getAllDealOptions } from "./dealOption-logic";

export async function createIntakeFormsForNewClients(
  dealId: string,
  dealParties: DealParty[],
  realtorId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  // Get the deal to access the party intake template
  const { data: deal, error: dealError } = (await supabaseClient
    .from("deals")
    .select("partyIntakeTemplate")
    .eq("id", dealId)
    .single()) as { data: Deal; error: any };

  if (dealError) {
    console.error("Error fetching deal for intake forms:", dealError);
    return; // Don't throw error, just log it - intake forms are not critical for deal-party creation
  }

  const clientIntakes: Omit<PartyIntake, "id" | "created_at">[] = [];
  let clientIntakeTemplate: Omit<
    PartyIntakeTemplate,
    "id" | "created_at" | "name" | "user_id"
  > | null = null;

  // Get template schema similar to how it's done in deal creation
  if (deal.partyIntakeTemplate.split("-")[2] !== "blank") {
    console.log("there is a template for this deal", deal.partyIntakeTemplate);
    const {
      data: clientIntakeTemplateGotten,
      error: clientIntakeTemplateError,
    } = (await supabaseClient
      .from("party_intake_templates")
      .select()
      .eq("user_id", realtorId)
      .eq("name", deal.partyIntakeTemplate as string)
      .single()) as { data: PartyIntakeTemplate; error: any };

    if (clientIntakeTemplateError) {
      console.error(
        `Failed to find template named "${deal.partyIntakeTemplate}" for user ${realtorId}`
      );
      return; // Don't throw error, just return
    }
    const { id, created_at, name, user_id, ...rest } =
      clientIntakeTemplateGotten;
    clientIntakeTemplate = rest;
    console.log("got this template", clientIntakeTemplate);
  } else {
    console.log(
      "no template for this deal, getting: ",
      deal.partyIntakeTemplate
    );
    console.log("getting from knowledge base");
    const splitTemplate = deal.partyIntakeTemplate.split("-");
    clientIntakeTemplate = {
      buyer1_schema:
        splitTemplate[0] === "buy" || splitTemplate[0] === "rent"
          ? KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"]
              .partyIntakeSchemas.buyer1_schema ?? []
          : [],
      buyer2_schema:
        splitTemplate[0] === "buy" || splitTemplate[0] === "rent"
          ? KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"]
              .partyIntakeSchemas.buyer2_schema ?? []
          : [],
      seller1_schema:
        splitTemplate[0] === "sell" || splitTemplate[0] === "lease"
          ? KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"]
              .partyIntakeSchemas.seller1_schema ?? []
          : [],
      seller2_schema:
        splitTemplate[0] === "sell" || splitTemplate[0] === "lease"
          ? KNOWLEDGE_BASE[splitTemplate[0]][splitTemplate[1]]["TX"]
              .partyIntakeSchemas.seller2_schema ?? []
          : [],
    };
    console.log("got from knowledge base", clientIntakeTemplate);
  }

  // Create intake forms for each new client
  for (const dealClient of dealParties) {
    // Skip agent roles - only create intake forms for actual clients
    if (dealClient.party_role.includes("_agent")) {
      continue;
    }

    // Get party email from the parties table
    const { data: party, error: partyError } = (await supabaseClient
      .from("parties")
      .select("email")
      .eq("id", dealClient.party_id)
      .single()) as { data: Party; error: any };

    if (partyError) {
      console.error("Error fetching party email for intake:", partyError);
      continue;
    }

    let clientTemplateSchema: PartyIntakeSchema | null = [];

    // Determine which schema to use based on party role and number
    if (dealClient.partyNumber === 1) {
      if (
        dealClient.party_role === "tenant" ||
        dealClient.party_role === "buyer"
      ) {
        clientTemplateSchema = clientIntakeTemplate?.buyer1_schema ?? [];
      } else if (
        dealClient.party_role === "seller" ||
        dealClient.party_role === "landlord"
      ) {
        clientTemplateSchema = clientIntakeTemplate?.seller1_schema ?? [];
      }
    } else {
      if (
        dealClient.party_role === "tenant" ||
        dealClient.party_role === "buyer"
      ) {
        clientTemplateSchema = clientIntakeTemplate?.buyer2_schema ?? [];
      } else if (
        dealClient.party_role === "seller" ||
        dealClient.party_role === "landlord"
      ) {
        clientTemplateSchema = clientIntakeTemplate?.seller2_schema ?? [];
      }
    }

    clientIntakes.push({
      email: party.email,
      deal_id: dealId,
      party_response: {},
      realtor_id: realtorId,
      party_intake_form_schema: clientTemplateSchema ?? [],
      form_visible: false,
      party_id: dealClient.party_id,
      partyrole_partynumber: `${dealClient.party_role}_${dealClient.partyNumber}`,
    });
  }

  // Insert intake forms if any were created
  if (clientIntakes.length > 0) {
    const { data: clientIntakesData, error: clientIntakesError } =
      await supabaseClient.from("party_intakes").insert(clientIntakes).select();

    if (clientIntakesError) {
      console.error(
        "Error creating intake forms for new clients:",
        clientIntakesError
      );
      // Don't throw error - intake forms are not critical for deal-party creation
    } else {
      console.log("Intake forms created for new clients:", clientIntakesData);
    }
  }
}

export async function createDealPartyRow(
  deal_id: string,
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
  realtorId: string,
  supabaseClient: ReturnType<typeof createClient>,
  deal_option_id?: string
): Promise<DealParty[]> {


  let dealOptionId: string;
  if (deal_option_id) {
    dealOptionId = deal_option_id;
  } else {
    const dealOptions = await getAllDealOptions(deal_id, supabaseClient);
    dealOptionId = dealOptions.find(option => option.address === 'deal-wide')?.id ?? '';
  }

  const result: DealParty[] = [];

  console.log("[DEAL_PARTIES] Total parties to process:", parties.length);
  console.log(
    "[DEAL_PARTIES] Parties data:",
    JSON.stringify(parties, null, 2)
  );

  for (const entry of parties) {
    console.log(
      "[DEAL_PARTIES] Processing entry:",
      JSON.stringify(entry, null, 2)
    );
    const { role, realtorIsRepresenting, partyNumber, party } = entry;

    console.log(
      "[DEAL_PARTIES] Extracted party:",
      JSON.stringify(party, null, 2)
    );

    if (!party || !party.email) {
      console.error("[DEAL_PARTIES] Party email missing - party:", party);
      throw new Error(
        `Party email is required for party at index ${parties.indexOf(entry)}`
      );
    }

    const emailToCheck = party.email as string;
    console.log("[DEAL_PARTIES] Using email:", emailToCheck);

    // 1) Check if a party with this email already exists
    const { data: existingParty, error: selectError } = (await supabaseClient
      .from("parties")
      .select("id")
      .eq("email", emailToCheck)
      .eq("realtor_id", realtorId)
      .single()) as { data: Party; error: any };

    // If the error is something other than "no rows returned" (code PGRST116), throw it
    if (selectError && selectError.code !== "PGRST116") {
      throw selectError;
    }

    let partyId: string;
    if (existingParty) {
      // If a row was returned, grab its id
      partyId = existingParty.id;
    } else {
      // 2) Insert a new party row (only full_name, email, and current_transaction_status)

      const insertingParty: Omit<Party, "id" | "realtor_id" | "created_at"> = {
        full_name: party.full_name,
        email: party.email,
        current_transaction_status:
          party.current_transaction_status ?? "searching",
        form_information: {} as JSON,
        notes: "",
        phone_number: "",
      };
      const newParty = await insertParty(
        insertingParty,
        realtorId,
        supabaseClient
      );
      console.log("this is the newParty", newParty);

      partyId = newParty.id;
    }

    // 4) insert a new deals_parties row
    const insertLinkPayload = {
      deal_id,
      party_id: partyId,
      party_role: role,
      partyNumber: partyNumber,
      realtorIsRepresenting: realtorIsRepresenting,
      party_email: party.email,
      deal_option_id: dealOptionId,
    };

    console.log("this is the insertLinkPayload", insertLinkPayload);

    const { data: newLink, error: insertLinkError } = (await supabaseClient
      .from("deals_parties")
      .insert(insertLinkPayload)
      .select()
      .single()) as { data: DealParty; error: any };

    if (insertLinkError) {
      throw insertLinkError;
    }
    result.push(newLink);
  }

  // Create intake forms for newly added clients
  try {
    console.log(
      "abt to call create intake forms for new clients with",
      deal_id,
      result,
      realtorId
    );
    await createIntakeFormsForNewClients(
      deal_id,
      result,
      realtorId,
      supabaseClient
    );
  } catch (error) {
    console.error("Error creating intake forms for new clients:", error);
    // Don't throw error - intake forms are not critical for deal-party creation
  }

  return result as DealParty[];
}

export async function getAllDealsParties(
  userId: string,
  supabase: ReturnType<typeof createClient>
) {
  const allDeals: Deal[] = await getAllDeals(userId, supabase);

  const allDealParties = await Promise.all(
    allDeals.map(async (deal) => {
      const { data: dealParties, error } = await supabase
        .from("deals_parties")
        .select("*")
        .eq("deal_id", deal.id);

      if (error) {
        throw error;
      }

      return dealParties;
    })
  );

  // If you want one array of all parties (instead of array-of-arrays), uncomment the next line:
  // return allDealParties.flat();
  const returning = allDealParties.flat();
  console.log("returning", returning);

  return returning as unknown as DealParty[];
}

export async function getDealPartiesByDealId(
  deal_id: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data: dealParties, error } = await supabase
    .from("deals_parties")
    .select()
    .eq("deal_id", deal_id);
  console.log("dealParty data was: ", dealParties);

  if (error) {
    throw error;
  }

  return dealParties as unknown as DealParty[];
}
