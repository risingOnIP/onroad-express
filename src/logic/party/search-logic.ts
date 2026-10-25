import { createClient } from "@supabase/supabase-js";
import { Search } from "../../types/party";
import { RealtorPartyTether } from "../../types/tethers";

export async function getAllSearches(supabaseClient: ReturnType<typeof createClient>) {
    const { data: searches, error } = await supabaseClient!
        .from('party_searches')
        .select()
        .order('created_at', { ascending: false });

    if (error) throw error;

    return searches as unknown as Search[];
}

export async function getSearchById(searchId: string, supabaseClient: ReturnType<typeof createClient>) {
    const { data: search, error } = await supabaseClient!
        .from('party_searches')
        .select()
        .eq('id', searchId)
        .single();

    if (error) throw error;

    return search as unknown as Search;
}

export async function addSearch(newSearch: Partial<Search>, implicitlyTether: boolean , supabaseClient : ReturnType<typeof createClient>) {

    console.log('this is what add search received: ', newSearch); 

    //add to searches table

    const { data: search, error } = await supabaseClient!
        .from('party_searches')
        .insert(newSearch)
        .select()
        .single(); 

    if (error) throw error;

    const inSearch = search as unknown as Search;

    
    if (!implicitlyTether || inSearch.realtor_email === null || inSearch.realtor_email === "") {
        //if there is no realtor_email, there is nobody to tether to
        //if there is already a realtor_id, tethering has happened
        //if we should not implicitly tether  return

        return search;
    }

    //check if there is a pending realtor deal in realtorPartyTether between realtor email and client email

        //get client email from profiles

    const { data: partyProfile, error: partyProfileError } = await supabaseClient!
        .from('profiles')  
        .select('email')
        .eq('user_id', inSearch.party_id)
        .single();  
    if (partyProfileError) throw partyProfileError;
    const partyEmail: string = partyProfile.email as string;
        
        //check if there is a pending tether between the realtor and client and client is pending

    const {data: tetherData, error: tetherError} = await supabaseClient!
        .from('realtorPartyTether')
        .select()
        .eq('realtor_email', inSearch.realtor_email)
        .eq('party_email', partyEmail)
        .eq('tether_status', 'pending')  
        .eq('pendingBy', 'client')
        .limit(1)
        .maybeSingle();

    if (tetherError)  {
        console.log('these were searches: \n')
        console.log("realtor email: ", inSearch.realtor_email);
        console.log("party email: ", partyEmail);
        console.log("caught tether error: ", tetherError);
        throw tetherError
    };
    const tether = tetherData as unknown as RealtorPartyTether;

    if (!tether) {
        const insertingTether : Partial<RealtorPartyTether> = {
            party_id: inSearch.party_id,
            tether_status: 'pending',
            pendingBy: 'realtor',
            search_id: inSearch.id,
            realtor_email: inSearch.realtor_email,
            party_email: partyEmail
        
        }

        await supabaseClient!
            .from('realtorPartyTether')
            .insert(insertingTether)
        
        
        return search;
    }

        //there is a pending tether, so we need to update the search id in the tether table

    const {data: updatedTether, error: updatedTetherError} = await supabaseClient!
        .from('realtorPartyTether')
        .update({party_id: inSearch.party_id, search_id: inSearch.id, tether_status: 'active', pendingBy: ""})
        .eq('id', tether.id)
        .select()
        .single();    


    return search;
}

export async function getSearchesWithoutRealtor(supabaseClient: ReturnType<typeof createClient>) {
    const { data: searches, error } = await supabaseClient!
        .from('party_searches')
        .select()
        .eq('realtor_email', '');

    if (error) throw error;

    return searches as unknown as Search[];
}

