import { createClient } from '@supabase/supabase-js';
import { DealParty, DealPartyRequest, Party } from '../../types/realtor';
import { createIntakeFormsForNewClients } from './deals_parties-logic';

export async function createDealOptionPartyRow(dealOptionId: string, parties: DealPartyRequest[], userId: string, supabaseClient: ReturnType<typeof createClient>) {
  try {
    console.log('Creating deal option party rows for deal option:', dealOptionId);
    console.log('Parties data:', parties);

    let dealsParties: DealParty[] = [];

    const partyInserts = [];
    const dealsPartiesInserts = [];

    const { data: dealId, error: dealIdError } = await supabaseClient
      .from('dealOptions')
      .select('deal_id')
      .eq('id', dealOptionId)
      .single() as { data: { deal_id: string }, error: any };

    if (dealIdError) {
      console.error('Error fetching deal ID:', dealIdError);
      throw new Error(`Failed to fetch deal ID: ${dealIdError.message}`);
    }
    
    console.log('Deal ID:', dealId.deal_id);

    for (const partyData of parties) {
      const { party, role, realtorIsRepresenting, partyNumber } = partyData;

      // Check if party exists by email
      const { data: existingParty, error: partyFetchError } = await supabaseClient
        .from('parties')
        .select('*')
        .eq('email', party.email)
        .single();

      if (partyFetchError && partyFetchError.code !== 'PGRST116') {
        console.error('Error checking existing party:', partyFetchError);
        throw new Error(`Failed to check existing party: ${partyFetchError.message}`);
      }

      let partyId: string;

      if (existingParty) {
        partyId = existingParty.id as string;
        console.log('Using existing party:', partyId);
      } else {
        // Create new party
        const { data: newParty, error: partyInsertError } = await supabaseClient
          .from('parties')
          .insert({
            full_name: party.full_name,
            email: party.email,
            current_transaction_status: party.current_transaction_status || 'lead',
            realtor_id: userId,
          })
          .select()
          .single();

        if (partyInsertError) {
          console.error('Error creating party:', partyInsertError);
          throw new Error(`Failed to create party: ${partyInsertError.message}`);
        }

        console.log('Created new party:', newParty.id);
        partyId = newParty.id as string;

      }

      // Create deal option party relationship
      dealsPartiesInserts.push({
        deal_option_id: dealOptionId,
        party_id: partyId,
        party_role: role,
        realtorIsRepresenting: realtorIsRepresenting,
        partyNumber: partyNumber,
        party_email: party.email,
        deal_id: dealId.deal_id,
      });
    }

    // Insert deal option party relationships
    const { data: dealsPartiesData, error: dealsPartiesError } = await supabaseClient
      .from('deals_parties')
      .insert(dealsPartiesInserts)
      .select() as { data: DealParty[], error: any };

    if (dealsPartiesError) {
      console.error('Error creating deal option party relationships:', dealsPartiesError);
      throw new Error(`Failed to create deal option party relationships: ${dealsPartiesError.message}`);
    }

    try {
      await createIntakeFormsForNewClients(
        dealId.deal_id,
        dealsPartiesData,
        userId,
        supabaseClient
      );
    } catch (error) {
      console.error('Error creating intake forms for new clients:', error);
      throw new Error(`Failed to create intake forms for new clients: ${error}`);
    }



    console.log('Successfully created deal option party relationships:', dealsPartiesData);
    return dealsPartiesData;

  } catch (error) {
    console.error('Error in createDealOptionPartyRow:', error);
    throw error;
  }
}

export async function getDealPartiesByDealOptionId(dealOptionId: string, supabaseClient: ReturnType<typeof createClient>) : Promise<DealParty[]> {
  try {
    console.log('Getting parties for deal option:', dealOptionId);

    const { data, error } = await supabaseClient
      .from('deals_parties')
      .select()
      .eq('deal_option_id', dealOptionId);

    if (error) {
      console.error('Error fetching deal option parties:', error);
      throw new Error(`Failed to fetch deal option parties: ${error.message}`);
    }

    console.log('Deal option parties data:', data);

    return data as unknown as DealParty[];

  } catch (error) {
    console.error('Error in getDealOptionParties:', error);
    throw error;
  }
}

export async function getDealPartiesByDealAndOptionId(dealId: string, dealOptionId: string, supabaseClient: ReturnType<typeof createClient>) {
  try {
    console.log('Getting parties for deal:', dealId);
    console.log('Getting parties for deal option:', dealOptionId);

    const { data, error } = await supabaseClient
      .from('deals_parties')
      .select()
      .eq('deal_id', dealId)
      .eq('deal_option_id', dealOptionId);


    const { data: dealOption, error: dealOptionError } = await supabaseClient
      .from('dealOptions')
      .select()
      .eq('deal_id', dealId)
      .eq('address', 'deal-wide')
      .single();

    if (dealOptionError) {
      console.error('Error fetching deal option:', dealOptionError);
      throw new Error(`Failed to fetch deal option: ${dealOptionError.message}`);
    }
    const { data: dealOptionParties, error: dealOptionPartiesError } = await supabaseClient
      .from('deals_parties')
      .select()
      .eq('deal_option_id', dealOption.id as string);

    console.log("dealOptionParties", dealOptionParties)

    const dealOptionPartiesData = dealOptionParties as unknown as DealParty[];
      
    if (dealOptionPartiesError) {
      console.error('Error fetching deal option parties:', dealOptionPartiesError);
      throw new Error(`Failed to fetch deal option parties: ${dealOptionPartiesError.message}`);
    }

    const dealWidePartiesData = data as unknown as DealParty[];
      

    if (error) {
      console.error('Error fetching deal parties:', error);
      throw new Error(`Failed to fetch deal parties: ${error.message}`);
    }

    console.log('Deal parties data:', data);

    const result = [...(dealOptionPartiesData || []), ...(dealWidePartiesData || [])].reduce((unique: DealParty[], item: DealParty) => {
      const exists = unique.find((u: DealParty) => u.party_id === item.party_id);
      if (!exists) {
        unique.push(item); 
      }
      return unique;
    }, [] as DealParty[]);

    console.log("result", result)

    return result;

  } catch (error) {
    console.error('Error in getDealPartiesByDealAndOptionId:', error);
    throw error;
  }
}

export async function removeDealOptionParty(dealOptionId: string, partyId: string, supabaseClient: ReturnType<typeof createClient>) {
  try {
    console.log('Removing party from deal option:', { dealOptionId, partyId });

    const { error } = await supabaseClient
      .from('deals_parties')
      .delete()
      .eq('deal_option_id', dealOptionId)
      .eq('party_id', partyId);

    if (error) {
      console.error('Error removing deal option party:', error);
      throw new Error(`Failed to remove deal option party: ${error.message}`);
    }

    console.log('Successfully removed party from deal option');
    return { success: true };

  } catch (error) {
    console.error('Error in removeDealOptionParty:', error);
    throw error;
  }
}

export async function getAllDealOptionParties(userId: string, supabaseClient: ReturnType<typeof createClient> ) : Promise<DealParty[]> {
  try {
    console.log('Getting all deal option parties for user:', userId);

    const { data, error } = await supabaseClient
      .from('deals_parties')
      .select(`
        *,
        parties (
          id,
          full_name,
          email,
          phone_number,
          current_transaction_status,
          form_information,
          notes,
          created_at
        ),
        dealOptions (
          id,
          address,
          deal_id
        )
      `)
      .not('deal_option_id', 'is', null);

    if (error) {
      console.error('Error fetching all deal option parties:', error);
      throw new Error(`Failed to fetch all deal option parties: ${error.message}`);
    }

    console.log('All deal option parties data:', data);
    return data as unknown as DealParty[];

  } catch (error) {
    console.error('Error in getAllDealOptionParties:', error);
    throw error;
  }
}