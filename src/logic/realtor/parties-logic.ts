import { createClient } from "@supabase/supabase-js";
import { Party } from "../../types/realtor";

export async function getAllParties(
  realtorUserId: string,
  supabase: ReturnType<typeof createClient>
): Promise<Party[]> {
  const { data, error } = await supabase
    .from("parties")
    .select()
    .eq("realtor_id", realtorUserId);

  if (error) {
    console.error("Error getting all parties:", error);
    throw error;
  }
  if (!data) {
    return [];
  }

  return data as unknown as Party[];
}

export async function insertParty(
  partyData: Omit<Party, "id" | "realtor_id" | "created_at">,
  realtorId: string,
  supabase: ReturnType<typeof createClient>
) {
  const { data, error } = await supabase
    .from("parties")
    .insert({
      ...partyData,
      realtor_id: realtorId,
    })
    .select()
    .single();

  if (error) throw error;
  return data as unknown as Party;
}

export async function updateParty(
  partyId: string,
  partyData: Partial<Party>,
  supabase: ReturnType<typeof createClient>
) {
  const { created_at, ...updatePayload } = partyData;

  const { data: returnedData, error } = await supabase
    .from("parties")
    .update(updatePayload)
    .eq("id", partyId)
    .select()
    .single();

  if (error) {
    console.error("Error updating party:", error);
    throw error;
  }
  return returnedData as unknown as Party;
}

export async function getPartiesForDeal(
  dealId: string,
  supabase: ReturnType<typeof createClient>
): Promise<Party[]> {
  const { data, error } = await supabase
    .from("deals_parties")
    .select("parties(*)")
    .eq("deal_id", dealId) as unknown as {data: {parties: Party}[], error: any};

  if (error) {
    console.error("Error getting parties for deal:", error);
    throw error;
  }

  // `data` is Array<{ parties: Party }>
  // so map over it and extract the nested `parties` object:
  console.log('this is the data from getPartiesForDeal: ', data);
  const parties: Party[] = data.map((partyInside) => {
    return partyInside.parties;
  })

  console.log('this is the parties from getPartiesForDeal: ', parties);


  return parties as Party[];
}

export async function getPartyById(clientId: string, supabase: ReturnType<typeof createClient>): Promise<Party> {
  const { data, error } = await supabase
    .from("parties")
    .select()
    .eq("id", clientId)
    .single() as {data: Party, error: any};

  if (error) {
    console.error("Error getting party by id:", error);
    throw error;
  }
  return data;
}
