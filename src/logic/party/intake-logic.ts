import { createClient } from "@supabase/supabase-js";
import { Schema } from "../../types/realtor";

export async function getPublishedIntakeSchema(searchId: string, supabaseClient: ReturnType<typeof createClient>) {
  const { data: intakeSchema, error } = await supabaseClient
    .from('realtorClientTether')
    .select('intake_form_schema')
    .eq('search_id', searchId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching schema: ${error.message}`);
  }

  return (intakeSchema?.intake_form_schema as unknown as Schema) ?? [];
}

export async function getIntakeSchemaAnswers(searchId: string, supabaseClient: ReturnType<typeof createClient>) {
  const { data: intakeSchemaAnswers, error } = await supabaseClient
    .from('realtorClientTether')
    .select('party_answers')
    .eq('search_id', searchId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error fetching schema answers: ${error.message}`);
  }

  return (intakeSchemaAnswers?.party_answers as unknown as Record<string, string>) ?? {};
}

export async function updateIntakeSchemaAnswersIndividualValue(searchId: string, itemKey: string, newValue: string, supabaseClient: ReturnType<typeof createClient>) {
  

    //get previous answers

    let inserting = await getIntakeSchemaAnswers(searchId, supabaseClient);
    
    if (inserting === null) {
        inserting = {};
      }
    
      inserting[itemKey] = newValue;
    
      console.log('abt to send the following: ', inserting)
    
      inserting[itemKey] = newValue;
      
  
    const { data: insertedAnswers, error } = await supabaseClient
    .from('realtorClientTether')
    .update({ party_answers: inserting })
    .eq('search_id', searchId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating schema answers: ${error.message}`);
  }

  return insertedAnswers as unknown as Record<string, string>;
}
