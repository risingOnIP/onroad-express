import { createClient } from "@supabase/supabase-js";
import { getFormMapping, getFormPDFFilename } from "../../routes/forms/pdf-templates";
import path from "path";
import { readFile } from "fs/promises";

// Initialize Supabase client


export async function getBlankFile(formType: string, supabase: ReturnType<typeof createClient>, authToken?: string) {
  // Validate form type to prevent directory traversal
  if (!formType || typeof formType !== 'string' || formType.includes('/') || formType.includes('\\')) {
    throw { status: 400, error: "Invalid form type" };
  }
  
  // Check if this is a TAR form
  const formMapping = getFormMapping(formType);
  
  // If it's a TAR form and we have an authenticated user, check for broker upload
  if (formMapping && formMapping.orgCreated === 'TAR') {
    // Extract JWT token from Authorization header if present
    if (authToken) {
      try {
        // Verify the JWT token
        const { data: { user }, error: authError } = await supabase.auth.getUser(authToken);
        
        if (!authError && user) {
          console.log(`[BLANK-FILES] Checking for broker-uploaded TAR form: ${formType} for user: ${user.id}`);
          
          // Check if realtor has a broker via tether
          const { data: tether } = await supabase
            .from('brokerRealtorTether')
            .select('broker_id')
            .eq('realtor_id', user.id)
            .eq('status', 'accepted')
            .single();

            console.log('realtorid', user.id)
          
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
      } catch (error) {
        // Re-throw if it's our custom error
        if (error && typeof error === 'object' && 'status' in error) {
          throw error;
        }
        console.log(`[BLANK-FILES] Error checking auth, proceeding with default for non-TAR or unauthenticated request`);
      }
    }
    
    // If we get here for a TAR form without auth, it's likely a client/party accessing it
    // For signing pages, we should not block access
    console.log(`[BLANK-FILES] TAR form requested without realtor auth, likely for signing`);
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
