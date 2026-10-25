import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey); 

export const supabaseAnon: SupabaseClient = createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY!) ;

export const supabaseService: SupabaseClient = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
