
import { createClient } from "@supabase/supabase-js";
import { Profile } from "../types/realtor";

export async function getProfile(
    user_id: string,
    role: string,
    supabaseClient: ReturnType<typeof createClient>
  ) {

    console.log('this is my user_id: ', user_id)
    console.log('this is my role: ', role)
    
    const { data: profileData, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .eq('role', role)
      .single();
  
    if (error) throw error;
  
    return profileData as unknown as Profile;
  }