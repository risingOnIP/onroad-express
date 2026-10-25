import { createClient } from "@supabase/supabase-js";
import { Form } from "../../types/realtor";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getFormsForReview(brokerId: string) {

  console.log("in the logic to get forms for review")

  // First get all realtors tethered to this broker
  const { data: tethers, error: tetherError } = await supabase
    .from('brokerRealtorTether')
    .select('realtor_id')
    .eq('broker_id', brokerId)
    .eq('status', 'accepted');

  if (tetherError) {
    throw new Error(`Failed to fetch tethers: ${tetherError.message}`);
  }

  console.log("tethers", tethers)

  const realtorIds = tethers.map((t: any) => t.realtor_id);

  console.log("realtorIds", realtorIds)

  if (realtorIds.length === 0) {
    return [];
  }

  // Get all forms from deals that belong to these realtors
  const { data: forms, error: formsError } = await supabase
    .from('forms')
    .select(`
      id,
      form_type,
      review_stage,
      form_response,
      finalized_pdf,
      file_upload_pdf,
      deal_option_id,
      created_at,
      dealOptions!inner (
        id,
        address,
        deals!inner (
          id,
          dealName,
          user_id
        )
      )
    `)
    .in('dealOptions.deals.user_id', realtorIds)
    .eq('review_stage', 'reviewing')
    .order('created_at', { ascending: false });

  if (formsError) {
    throw new Error(`Failed to fetch forms: ${formsError.message}`);
  }

  const formsWithFormType = forms.map((form) => ({
    form_type: form.form_type,
    review_stage: form.review_stage,
  }));

  console.log("gotall the forms", formsWithFormType);

  // Get realtor profiles for the forms
  const realtorIdsFromForms = [...new Set(forms?.map((f: any) => f.dealOptions?.deals?.user_id).filter(Boolean))];
  
  let profiles: any[] = [];
  if (realtorIdsFromForms.length > 0) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('user_id, firstName, lastName, email')
      .in('user_id', realtorIdsFromForms);
    
    if (!profileError && profileData) {
      profiles = profileData;
    }
  }

  // Create a map of user_id to profile for quick lookup
  const profileMap = new Map(profiles.map(p => [p.user_id, p]));

  // Transform the data to match the expected format
  const transformedForms = forms?.map((form: any) => {
    const realtorId = form.dealOptions?.deals?.user_id;

    console.log("realtorId", realtorId)

    const profile = realtorId ? profileMap.get(realtorId) : null;
    
    return {
      id: form.id,
      form_type: form.form_type,
      review_stage: form.review_stage,
      form_response: form.form_response,
      finalized_pdf: form.finalized_pdf,
      file_upload_pdf: form.file_upload_pdf,
      deal_option_id: form.deal_option_id,
      created_at: form.created_at,
      deal_option: form.dealOptions ? {
        id: form.dealOptions.id,
        address: form.dealOptions.address,
        deal: form.dealOptions.deals ? {
          id: form.dealOptions.deals.id,
          deal_name: form.dealOptions.deals.dealName,
          realtor: profile ? {
            id: realtorId,
            full_name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Unknown',
            email: profile.email || ''
          } : {
            id: realtorId,
            full_name: 'Unknown',
            email: ''
          }
        } : undefined
      } : undefined
    };
  }) || [];

  console.log("transformedForms", transformedForms);

  return transformedForms;
}

export async function updateFormReviewStage(
  brokerId: string,
  formId: string,
  reviewStage: 'not_sent' | 'reviewing' | 'approved'
) {
  // First verify that this broker has permission to update this form
  // by checking if the form belongs to a realtor tethered to this broker
  const { data: form, error: formError } = await supabase
    .from('forms')
    .select(`
      id,
      dealOptions!inner (
        id,
        deals!inner (
          user_id
        )
      )
    `)
    .eq('id', formId)
    .single();

  if (formError || !form) {
    throw new Error('Form not found');
  }

  const realtorId = (form as any).dealOptions?.deals?.user_id;

  // Check if this realtor is tethered to the broker
  const { data: tether, error: tetherError } = await supabase
    .from('brokerRealtorTether')
    .select('id')
    .eq('broker_id', brokerId)
    .eq('realtor_id', realtorId)
    .eq('status', 'accepted')
    .single();

  if (tetherError || !tether) {
    throw new Error('Unauthorized: Realtor is not tethered to this broker');
  }

  // Update the form's review stage
  const { data: updatedForm, error: updateError } = await supabase
    .from('forms')
    .update({ review_stage: reviewStage })
    .eq('id', formId)
    .select()
    .single();

  if (updateError) {
    throw new Error(`Failed to update form review stage: ${updateError.message}`);
  }

  return {
    success: true,
    message: `Form review stage updated to ${reviewStage}`,
    form: updatedForm
  };
}