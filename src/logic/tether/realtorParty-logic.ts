import { createClient } from "@supabase/supabase-js";
import { RealtorPartyTether } from "../../types/tethers";

export async function getRealtorPartyTetherBySearchId(searchId: string, supabaseClient: ReturnType<typeof createClient>) {
    const { data: tether, error } = await supabaseClient!
        .from('realtorPartyTether')
        .select()
        .eq('search_id', searchId)
        .single();

    if (error) throw error;

    return tether as unknown as RealtorPartyTether;
}

export async function getRealtorPartyTetherByDealId(dealId: string, supabaseClient: ReturnType<typeof createClient>) {
    const { data: tether, error } = await supabaseClient!
        .from('realtorPartyTether')
        .select()
        .eq('deal_id', dealId)
        .single();

    if (error) throw error;

    return tether as unknown as RealtorPartyTether;
}   

export async function getPendingTetherRequestsForRealtor(realtorEmail: string, supabaseClient: ReturnType<typeof createClient>) {
    const { data: tether, error } = await supabaseClient!
        .from('realtorPartyTether')
        .select()
        .eq('realtor_email', realtorEmail)
        .eq('tether_status', 'pending')
        .eq('pendingBy', 'realtor')

    if (error) throw error;

    return tether as unknown as RealtorPartyTether[];  
}

export async function getPendingTetherRequestsForParty(partyEmail: string, supabaseClient: ReturnType<typeof createClient>) {
    const { data: tether, error } = await supabaseClient!
        .from('realtorPartyTether')
        .select()
        .eq('party_email', partyEmail)
        .eq('tether_status', 'pending')
        .eq('pendingBy', 'party')

    if (error) throw error;

    return tether as unknown as RealtorPartyTether[];
}   

export async function acceptPendingTetherRequestByParty (tetherId: string, searchId: string, partyId: string, supabaseClient: ReturnType<typeof createClient>) {
    //add tether to realtor party table
    
    const { data: tether, error } = await supabaseClient!
        .from('realtorPartyTether')
        .update({ party_id: partyId, search_id: searchId, tether_status: 'active', pendingBy: "" })
        .eq('id', tetherId)
        .select()
        .single();

    if (error) throw error;


    //add realtor email to searches table

    const realtorEmail: string= tether.realtor_email as string;
    console.log('this is the searchId', searchId);

    const {data: search, error: searchError} = await supabaseClient!
        .from('party_searches')
        .update({ realtor_email: realtorEmail })
        .eq('id', searchId)
        .select()
        .single();

    if (searchError) throw searchError;


    return tether as unknown as RealtorPartyTether;
}

