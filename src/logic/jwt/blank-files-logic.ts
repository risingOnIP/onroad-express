import { getFormMapping, getFormPDFFilename } from "../../routes/forms/pdf-templates";
import path from "path";
import { readFile } from "fs/promises";
import { SupabaseClient } from "@supabase/supabase-js";

// Initialize Supabase client


export async function getBlankFile(formType: string, supabase: SupabaseClient, signatureCollectionId: string) {
  // Validate form type to prevent directory traversal
  if (!formType || typeof formType !== 'string' || formType.includes('/') || formType.includes('\\')) {
    throw { status: 400, error: "Invalid form type" };
  }

  console.log("getting blank file for form type in logic", formType);

  const { data: signatureCollection, error: signatureCollectionError } = await supabase
    .from('signature_collections')
    .select('sender_id')
    .eq('id', signatureCollectionId)
    .single();

  if (signatureCollectionError) {
    throw { status: 400, error: "Invalid signature collection ID" };
  }

  const senderId = signatureCollection?.sender_id;
  
  // Check if this is a TAR form
  const formMapping = getFormMapping(formType);
  
  // If it's a TAR form and we have an authenticated user, check for broker upload
  if (formMapping && formMapping.orgCreated === 'TAR') {
    // Extract JWT token from Authorization header if presen
        
          console.log(`[BLANK-FILES] Checking for broker-uploaded TAR form: ${formType} for user: ${senderId}`);
          
          // Check if realtor has a broker via tether
          const { data: tether } = await supabase
            .from('brokerRealtorTether')
            .select('broker_id')
            .eq('realtor_id', senderId)
            .eq('status', 'accepted')
            .single();

              console.log('realtorid', senderId)
          
            console.log('tether', tether)

          if (tether) {

            console.log('tether succeeded')

            // Check if broker has uploaded this TAR form
            const { data: brokerForm } = await supabase
              .from('brokerForms')
              .select('broker_custom_pdf')
              .eq('broker_id', tether.broker_id as string)
              .eq('form_type', formType)
              .eq('org_name', 'TAR')
              .single();
            
            if (brokerForm && brokerForm.broker_custom_pdf) {
              console.log(`[BLANK-FILES] Found broker-uploaded TAR form, serving broker's version`);
              
              // Download the broker's PDF from storage
              const { data: fileData, error: dlErr } = await supabase.storage
                .from('brokerForms')
                .download(brokerForm.broker_custom_pdf as string);
              
              if (!dlErr && fileData) {
                const buffer = Buffer.from(await fileData.arrayBuffer());
                return buffer;
              }
            } else {
              // TAR form but broker hasn't uploaded it
              console.error(`[BLANK-FILES] TAR form ${formType} requested but broker hasn't uploaded it`);
              throw { 
                status: 404,
                error: `TAR form "${formType}" not available. Your broker needs to upload this form first.`,
                errorType: 'TAR_FORM_NOT_UPLOADED'
              };
            }
          } else {
            // TAR form but no broker tether
            console.error(`[BLANK-FILES] TAR form ${formType} requested but realtor not tethered to broker`);
            throw { 
              status: 403,
              error: 'TAR forms require a broker connection. Please connect with your broker first.',
              errorType: 'NO_BROKER_TETHER'
            };
          }
        }
  
  
  
  // For non-TAR forms or unauthenticated TAR form requests (e.g., signing pages)
  // Get the actual PDF filename using the mapping
  const pdfFilename = getFormPDFFilename(formType);
  const filePath = path.join(__dirname, "..", "..", "lib", "blank_files", pdfFilename);
  
  console.log(`[BLANK-FILES] Serving default PDF file: ${filePath}`);
  
  // Read the PDF file
  const fileBuffer = await readFile(filePath);
  
  return fileBuffer;
}
