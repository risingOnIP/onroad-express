import { createClient } from "@supabase/supabase-js";
import {
  AuditJson,
  SignatureCollection,
  SignatureEvent,
} from "../../types/realtor";
import {
  Form,
  FormResponse,
  SchemaItem,
  SignerAssignment,
} from "../../types/realtor";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getForm, saveSignatureSequence } from "./form-logic";
import { getDealById } from "./deal-logic";
import { Request } from "express";
import { sendEmail, formatSignatureCollectionEmail } from "../../lib/mailgun";

export async function generateSignatureCollection(
  form_id: string,
  actionAs: string,
  action_email: string,
  audit_json: AuditJson,
  request_user_agent: string,
  request_ip_address: string,
  sender_id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log("Generating link for form_id: ", form_id);
  console.log("actionAs: ", actionAs);
  console.log("action_email: ", action_email);
  console.log("sender_id: ", sender_id);
  console.log("got audit json of: ", audit_json);

  const updatedAuditJson: AuditJson = {
    ...audit_json,
    document_id: form_id,
    sender_id: sender_id,
  };

  if (updatedAuditJson.events && updatedAuditJson.events.length > 0) {
    updatedAuditJson.events[0] = {
      ...updatedAuditJson.events[0],
      ip_address: request_ip_address,
      user_agent: request_user_agent,
      timestamp: new Date(Date.now()),
      actor_uuid: sender_id,
    };
  }
  console.log("updatedAuditJson: ", updatedAuditJson);

  //changing for pushing

  const form = await getForm(form_id, supabaseClient);

  const { data: signatureCollectionData, error: signatureCollectionError } =
    await supabaseClient!
      .from("signature_collections")
      .insert({
        form_id: form_id,
        actionAs: actionAs,
        action_email: action_email,
        sender_id: sender_id,
        audit_json: updatedAuditJson,
        form_response: form.form_response,  
        form_type: form.form_type,
        custom_schema: form.custom_schema,
        signature_sequence: form.signature_sequence,
        file_upload_pdf: form.file_upload_pdf,
      })
      .select()
      .single() as { data: SignatureCollection; error: any };

  if (signatureCollectionError) {
    console.log("error: ", signatureCollectionError);
    throw new Error("Error creating signature collection");
  }


  //now updating row_uuid in signature_sequence table in forms
  const {data: formData, error: formError} = await supabaseClient
    .from("forms")
    .select('signature_sequence')
    .eq("id", form_id)
    .single() as { data: {signature_sequence: SignerAssignment[][]}; error: any };

  if (formError) {
    console.log("error: ", formError);
    throw new Error("Error getting form data");
  }


  console.log("updatedsignaturesequence: ", formData.signature_sequence);

  const updatedSignatureSequence = formData.signature_sequence.map((signers) =>
    signers.map((s) =>
      s.email === action_email ? { ...s, row_uuid: signatureCollectionData.id } : s
    )
  );

  console.log("updatedsignaturesequence: ", updatedSignatureSequence);

  const {data: updatedFormData, error: updateFormError} = await supabaseClient
    .from("forms")
    .update({signature_sequence: updatedSignatureSequence})
    .eq("id", form_id)
    .select()
    .single();

  console.log("updatedFormData: ", updatedFormData);

  if (updateFormError) {
    console.log("error: ", updateFormError);
    throw new Error("Error updating form data");
  }
  
  return signatureCollectionData as unknown as SignatureCollection;
}

export async function unfinalizeFormPdf(
  signatureCollectionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const signatureCollection = await getSignatureCollection(
    signatureCollectionId,
    supabaseClient
  );
  const formId = signatureCollection.form_id;

  const { data: formData, error: updateFormAuditJsonError } =
    await supabaseClient
      .from("forms")
      .update({
        finalized_audit_json: null,
        finalized_pdf: null,
      })
      .eq("id", formId)
      .select("id")
      .single();

  if (updateFormAuditJsonError) {
    throw new Error(
      "Error unfinalizing form pdf: " + updateFormAuditJsonError.message
    );
  }
}

export async function removeSignatureCollection(
  id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  //remove row_uuid from signature_sequence table in forms
  /* ----------------------------------------------------------
   * 1. Get the form_id for this collection
   * -------------------------------------------------------- */
  const { data: sigCollection, error: sigCollectionErr } = (await supabaseClient
    .from("signature_collections")
    .select("form_id") // column on signature_collections
    .eq("id", id)
    .single()) as { data: SignatureCollection; error: any };

  if (sigCollectionErr || !sigCollection) {
    throw new Error(
      `Could not find signature collection ${id}: ${sigCollectionErr?.message}`
    );
  }

  const formId = sigCollection.form_id;

  /* ----------------------------------------------------------
   * 2. Load the current signature_sequence for that form
   * -------------------------------------------------------- */
  const { data: formRow, error: formErr } = (await supabaseClient
    .from("forms")
    .select()
    .eq("id", formId)
    .single()) as { data: Form; error: any };

  if (formErr || !formRow) {
    throw new Error(`Could not load form ${formId}: ${formErr?.message}`);
  }

  /* ----------------------------------------------------------
   * 3. Remove every signer whose row_uuid === id
   * -------------------------------------------------------- */
  const updatedSignatureSequence: SignerAssignment[][] =
    formRow.signature_sequence.map((row) =>
      row.map((signer) =>
        signer.row_uuid === id ? { ...signer, row_uuid: "" } : signer
      )
    );
  /* ----------------------------------------------------------
   * 4. Persist the new sequence back to forms
   * -------------------------------------------------------- */
  const { error: updateFormErr } = await supabaseClient
    .from("forms")
    .update({ signature_sequence: updatedSignatureSequence })
    .eq("id", formId);

  if (updateFormErr) {
    throw new Error(
      `Failed to update signature_sequence on form ${formId}: ${updateFormErr.message}`
    );
  }

  /* ----------------------------------------------------------
   * 5. Finally delete the signature_collections row
   * -------------------------------------------------------- */
  const { error: deleteErr } = await supabaseClient
    .from("signature_collections")
    .delete()
    .eq("id", id);

  if (deleteErr) {
    throw new Error(
      `Failed to delete signature collection ${id}: ${deleteErr.message}`
    );
  }
}

export async function getSignatureCollection(
  id: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: signatureCollectionData, error: signatureCollectionError } =
    await supabaseClient!
      .from("signature_collections")
      .select("*")
      .eq("id", id)
      .single();

  if (signatureCollectionError) {
    console.log("error: ", signatureCollectionError);
    throw new Error("Error getting signature collection");
  }

  return signatureCollectionData as unknown as SignatureCollection;
}


export const modifyPDF = async (
  pdfDoc: PDFDocument,
  form_schema: SchemaItem[],
  form_response: FormResponse,
  signature_data: Record<string, Record<string, string>>
): Promise<PDFDocument> => {

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pdfDocForm = pdfDoc.getForm();
  // const BLUE_COLOR = rgb(0, 0, 0.5); // RGB(0, 0, 128) normalized to 0-1 range

  for (const schemaItem of form_schema) {


    if (schemaItem.pdf_attributes) {
      // 1) Changed .forEach to a for...of loop to properly handle await
      for (const pdfAttribute of schemaItem.pdf_attributes) {
        try {
          // Handle text input
          const value = form_response[schemaItem.unique_id];
          if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
            continue; 
          }
          if (schemaItem.display_attributes.input_type === "text" || schemaItem.display_attributes.input_type === "text-area") {
            let userText = form_response[schemaItem.unique_id] as string;
            if (!pdfAttribute.linked_form_fields_text || pdfAttribute.linked_form_fields_text.length === 0) {
              if (typeof userText === "string") {
                const pdfField = pdfDocForm.getTextField(
                  pdfAttribute.formfield as string
                );
                
                // Check if field supports multiline from both PDF structure and schema
                const isPdfFieldMultiline = pdfField.isMultiline();
                const isSchemaMultiline = schemaItem.display_attributes.input_type === "text-area";
                const shouldHandleAsMultiline = isPdfFieldMultiline || isSchemaMultiline;
                
                // Get field dimensions
                const acroField = pdfField.acroField;
                const widgets = acroField.getWidgets();
                const rect = widgets[0].getRectangle();
                const fieldWidth = rect.width;
                const fieldHeight = rect.height;
                
                if (shouldHandleAsMultiline) {
                  // Enable multiline on the field if not already enabled
                  if (!isPdfFieldMultiline) {
                    pdfField.enableMultiline();
                  }
                  
                  // Split text by newlines first
                  const requestedLines = userText.split('\n');
                  
                  // Start with larger font size for better readability
                  let fontSize = 16;
                  
                  // Use adaptive line height - tighter spacing when more lines needed
                  const calculateLineHeight = (fs: number, lineCount: number) => {
                    if (lineCount <= 2) return fs * 1.3; // More spacing for few lines
                    if (lineCount <= 4) return fs * 1.2; // Standard spacing
                    if (lineCount <= 6) return fs * 1.1; // Tighter spacing for more lines
                    return fs * 1.05; // Very tight spacing for many lines
                  };
                  
                  let lineHeight = calculateLineHeight(fontSize, requestedLines.length);
                  let maxLines = Math.floor(fieldHeight / lineHeight);
                  
                  // Ensure at least 1 line can fit
                  if (maxLines < 1) {
                    maxLines = 1;
                    fontSize = Math.max(8, fieldHeight / 1.3); // Don't go below 8pt
                    lineHeight = calculateLineHeight(fontSize, 1);
                  }
                  
                  // Adjust font size if we have too many lines (less aggressive reduction)
                  while (requestedLines.length > maxLines && fontSize > 8) {
                    fontSize -= 0.25; // Smaller reduction steps
                    lineHeight = calculateLineHeight(fontSize, requestedLines.length);
                    maxLines = Math.floor(fieldHeight / lineHeight);
                  }
                  
                  // Take only the lines that fit and check width constraints
                  const finalLines = requestedLines.slice(0, maxLines);
                  
                  // Check if any line is too wide and adjust font size accordingly (less aggressive)
                  const maxLineWidth = Math.max(...finalLines.map(line => 
                    font.widthOfTextAtSize(line, fontSize)
                  ));
                  
                  // Be less aggressive with width-based font reduction
                  while (maxLineWidth > fieldWidth && fontSize > 8) {
                    fontSize -= 0.25; // Smaller reduction steps
                    // Recalculate line height with new font size
                    lineHeight = calculateLineHeight(fontSize, finalLines.length);
                  }
                  
                  // Join the final lines with proper line breaks for PDF
                  const finalText = finalLines.join('\n');
                  
                  pdfField.setFontSize(fontSize);
                  pdfField.setText(finalText);
                  
                  // Set text color to blue
                  try {
                    const acroField = pdfField.acroField;
                    acroField.setDefaultAppearance(`0 0 0.5 rg /${font.name} ${fontSize} Tf`);
                  } catch (error) {
                    console.warn('Could not set text color for field:', error);
                  }
                } else {
                  // For single-line fields, convert newlines to spaces
                  const singleLineText = userText.replace(/\n/g, ' ');
                  
                  // Calculate appropriate font size (max 12, shrink if needed)
                  let fontSize = 12;
                  let textWidth = font.widthOfTextAtSize(singleLineText, fontSize);
                  while (textWidth > fieldWidth && fontSize > 1) {
                    fontSize -= 0.5;
                    textWidth = font.widthOfTextAtSize(singleLineText, fontSize);
                  }
                  
                  pdfField.setFontSize(fontSize);
                  pdfField.setText(singleLineText);
                  
                  // Set text color to blue
                  try {
                    const acroField = pdfField.acroField;
                    acroField.setDefaultAppearance(`0 0 0.5 rg /${font.name} ${fontSize} Tf`);
                  } catch (error) {
                    console.warn('Could not set text color for field:', error);
                  }
                }
              }
            } else {
              // If linked_form_fields_text is present, distribute words across those fields
              
              // Helper function to calculate optimal font size for all linked fields
              const calculateOptimalFontSize = (text: string, totalWidth: number): number => {
                let fontSize = 12;
                let textWidth = font.widthOfTextAtSize(text, fontSize);
                while (textWidth > totalWidth && fontSize > 1) {
                  fontSize -= 0.5;
                  textWidth = font.widthOfTextAtSize(text, fontSize);
                }
                return fontSize;
              };
              
              const defaultFontSize = 12;
              const linkedFields = pdfAttribute.linked_form_fields_text.map(
                (fieldName) => {
                  const pdfField = pdfDocForm.getTextField(fieldName);
                  const acroField = pdfField.acroField;
                  const widgets = acroField.getWidgets();
                  const rect = widgets[0].getRectangle();
                  const fieldWidth = rect.width;
                  return { pdfField, fieldWidth };
                }
              );
              
              // Calculate optimal font size based on total text and total width
              const totalFieldWidth = linkedFields.reduce((sum, field) => sum + field.fieldWidth, 0);
              const textToCalculate = typeof userText === "string" ? userText : "";
              const optimalFontSize = calculateOptimalFontSize(textToCalculate, totalFieldWidth);
              
              const measureWidth = (text: string) =>
                font.widthOfTextAtSize(text, optimalFontSize);

              let words: string[] = [];
              if (typeof userText === "string") {
                words = userText.split(/\s+/).filter((w) => w.length > 0);
              }

              const assignedTexts = Array(linkedFields.length).fill("");
              let wordIndex = 0;

              for (let i = 0; i < linkedFields.length - 1; i++) {
                const { fieldWidth } = linkedFields[i];
                let fieldText = "";

                while (wordIndex < words.length) {
                  const candidateText =
                    fieldText.length === 0
                      ? words[wordIndex]
                      : fieldText + " " + words[wordIndex];

                  if (measureWidth(candidateText) <= fieldWidth) {
                    fieldText = candidateText;
                    wordIndex++;
                  } else {
                    break;
                  }
                }

                assignedTexts[i] = fieldText.trimEnd();
                if (wordIndex >= words.length) {
                  break;
                }
              }

              if (wordIndex < words.length) {
                assignedTexts[linkedFields.length - 1] = words
                  .slice(wordIndex)
                  .join(" ");
              }

              linkedFields.forEach((f, idx) => {
                // Apply the uniform optimal font size to all linked fields
                f.pdfField.setFontSize(optimalFontSize);
                f.pdfField.setText(assignedTexts[idx]);
                
                // Set text color to blue
                try {
                  const acroField = f.pdfField.acroField;
                  acroField.setDefaultAppearance(`0 0 0.5 rg /${font.name} ${optimalFontSize} Tf`);
                } catch (error) {
                  console.warn('Could not set text color for linked field:', error);
                }
              });
            }
          } else if (schemaItem.display_attributes.input_type === "radio") {
            const radioOption = (form_response[schemaItem.unique_id]);
            if (typeof radioOption === "string" && radioOption.trim() !== "") {
                if (Array.isArray(pdfAttribute.formfield)) {
                  pdfAttribute.formfield.forEach((field) => {
                    pdfDocForm.getRadioGroup(field).select(radioOption);
                  });
                } else {
                  pdfDocForm
                    .getRadioGroup(pdfAttribute.formfield as string)
                    .select(radioOption);
                }
            }

            //checkboxes start here
          } else if (schemaItem.display_attributes.input_type === "checkbox" ) {
            const checkboxResponseValues : string[] | undefined = form_response[schemaItem.unique_id] as string[];

            console.log("[DOWNLOAD] checkboxResponseValues:", checkboxResponseValues);
            if (!checkboxResponseValues) {
              const checkBoxField = pdfDocForm.getCheckBox(pdfAttribute.formfield as string);
            }
            
            checkboxResponseValues?.forEach((value) => {
              const checkBoxPdfAttribute = pdfAttribute.linked_form_fields_checkbox?.find((checkbox) => checkbox.fromDatabase === value)?.pdfAttribute;
              if (checkBoxPdfAttribute) {
                const checkBoxField = pdfDocForm.getCheckBox(checkBoxPdfAttribute);
                checkBoxField.check();
              }
            })

            //singatures start here
          } else if (
            schemaItem.display_attributes.input_type === "signature" &&
            signature_data
          ) {
            // Use nested structure: signature_data[unique_id][formfield_name] = signaturePng
            const uniqueIdSignatures = signature_data[schemaItem.unique_id];
            if (uniqueIdSignatures) {
              const sigData = uniqueIdSignatures[pdfAttribute.formfield as string];
              if (sigData) {
                const signatureImage = await pdfDoc.embedPng(sigData);
                const signatureField = pdfDocForm.getTextField(
                  pdfAttribute.formfield as string
                );
                
                // Set the image
                signatureField.setImage(signatureImage);
              }
            }
          } else {
            console.log("Input type not supported");
          }
        } catch (error) {
          // 2) Added a try-catch block to log errors for any failed field interaction
          console.error(
            `Failed to process form field: '${pdfAttribute.formfield}' for unique_id: '${schemaItem.unique_id}'.`,
            error
          );
        }
      }
    }
  }
  
  // Update appearances to apply color changes
  pdfDocForm.updateFieldAppearances();
  
  return pdfDoc;
};


export async function generateSignedPdfUrl(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {

  const { data: formData, error: formError } = (await supabaseClient
    .from("forms")
    .select("finalized_pdf")
    .eq("id", formId)
    .single()) as { data: { finalized_pdf: string }; error: any };

  if (formError) {
    throw new Error("Error getting form data: " + formError.message);
  }

  if (!formData.finalized_pdf) {
    throw new Error("No finalized PDF found for form: " + formId);
  }


  const signedPdfUrl = await supabaseClient.storage
    .from("finalized-pdfs")
    .createSignedUrl(formData.finalized_pdf, 60 * 60);

  console.log("this is signedPdfUrl: ", signedPdfUrl.data?.signedUrl);
  return signedPdfUrl.data?.signedUrl;
}

export async function renewSignatureCollection(
  signatureCollectionId: string,
  supabaseClient: ReturnType<typeof createClient>
) {

  const { data: signatureCollectionData, error: signatureCollectionError } =
    await supabaseClient!
      .from("signature_collections")
      .update({
        created_at: new Date(Date.now()),
      })
      .eq("id", signatureCollectionId);

  if (signatureCollectionError) {
    throw new Error("Error renewing signature collection: " + signatureCollectionError.message);
  }
}














export async function updateSignatureCollections(
  formsData: Array<{
    formId: string;
    formName: string;
    signatureSequence: SignerAssignment[][];
  }>,
  dealId: string,
  supabaseClient: ReturnType<typeof createClient>,
  userId: string,
  userName: string,
  req: Request
) {
  interface AffectedClient {
    email: string;
    name: string;
    clientId: string;
    affectedFormNames: string[];
  }

  const clientToFormsMap = new Map<string, AffectedClient>();
  let totalRemovedCount = 0;
  let totalAddedCount = 0;
  
  // Process each form
  for (const { formId, formName, signatureSequence } of formsData) {
    // Step 1: Save signature sequence for this form
    await saveSignatureSequence(formId, signatureSequence, supabaseClient);
    console.log("Saved signature sequence for form:", formId);
    
    // Step 2: Get the form to understand deal context
    const form = await getForm(formId, supabaseClient);
    if (!form) {
      throw new Error(`Form not found: ${formId}`);
    }

    // Step 3: Get existing signature collections for this form
    const { data: existingCollections, error: fetchError } = await supabaseClient
      .from("signature_collections")
      .select("*")
      .eq("form_id", formId);

    if (fetchError) {
      throw fetchError;
    }

    // Track which emails should have signature collections
    const requiredEmails = new Set<string>();
    signatureSequence.forEach((step: any[]) => {
      step.forEach((signer: any) => {
        if (signer.email) {
          requiredEmails.add(signer.email);
        }
      });
    });

    // Remove signature collections for emails no longer in the sequence
    const collectionsToRemove =
      existingCollections?.filter(
        (col) =>
          col.action_email && !requiredEmails.has(col.action_email as string)
      ) || [];

    for (const collection of collectionsToRemove) {
      await removeSignatureCollection(
        collection.id as string,
        supabaseClient
      );
    }
    totalRemovedCount += collectionsToRemove.length;

    // Create signature collections for new emails in the sequence
    const existingEmails = new Set(
      existingCollections?.map((col) => col.action_email).filter(Boolean) || []
    );

    for (const email of requiredEmails) {
      if (!existingEmails.has(email)) {
        // Create new signature collection
        const signerData = signatureSequence
          .flat()
          .find((s: any) => s.email === email);
        if (signerData) {
          const audit_json: AuditJson = {
            document_id: formId,
            sender_id: userId,
            original_document_hash: "",
            final_document_hash: "",
            consent_text_version: "v1.0",
            events: [
              {
                event: "signature_created",
                sequence: 1,
                timestamp: new Date(),
                ip_address: req.ip || req.socket?.remoteAddress || "",
                user_agent: req.headers?.["user-agent"] || "",
                actor_uuid: userId,
                actor_auth_method: "login",
                signer_email: email,
              },
            ],
          };

          await generateSignatureCollection(
            formId,
            signerData.actionAs,
            email,
            audit_json,
            req.headers?.["user-agent"] || "",
            req.ip || req.socket?.remoteAddress || "",
            userId,
            supabaseClient
          );
          totalAddedCount++;
          
          // Get client info for notification
          const { data: partiesData } = await supabaseClient
            .from("parties")
            .select("id, full_name, email")
            .eq("email", email)
            .eq("realtor_id", userId)
            .single();

          let clientId: string;
          let clientName: string;

          if (partiesData && !("error" in partiesData)) {
            console.log(
              `[UPDATE_SIGNATURE] Found client in parties table:`,
              partiesData
            );
            clientId = (partiesData as any).id;
            clientName = (partiesData as any).full_name || email.split("@")[0];
          } else {
            console.log(
              `[UPDATE_SIGNATURE] Client not found in parties table, creating fallback clientId`
            );

            // Generate a fallback clientId based on email hash
            const crypto = require("crypto");
            clientId = `ext_${crypto
              .createHash("md5")
              .update(email)
              .digest("hex")
              .substring(0, 8)}`;
            
            clientName = email
              .split("@")[0]
              .split(/[._-]/)
              .map(
                (part: string) => part.charAt(0).toUpperCase() + part.slice(1)
              )
              .join(" ");
          }

          // Track which forms affect each client
          const clientKey = email;
          if (clientToFormsMap.has(clientKey)) {
            // Client already exists, add this form to their list
            const existingClient = clientToFormsMap.get(clientKey)!;
            existingClient.affectedFormNames.push(formName);
          } else {
            // New client, create entry with this form
            clientToFormsMap.set(clientKey, {
              email,
              name: clientName,
              clientId,
              affectedFormNames: [formName]
            });
          }
        }
      }
    }
  }

  // Step 4: Send emails to affected clients
  const clientsWithForms: AffectedClient[] = Array.from(clientToFormsMap.values());
  
  if (clientsWithForms.length > 0) {
    // Get deal information for email
    const deal = await getDealById(dealId, supabaseClient);
    if (!deal) {
      throw new Error("Deal not found");
    }

    const baseUrl = process.env.FRONTEND_URL || "www.onroadai.com";
    let successCount = 0;

    for (const client of clientsWithForms) {
      try {
        console.log(`[EMAIL_SEND] Processing client: ${client.email} with clientId: ${client.clientId}`);
        console.log(`[EMAIL_SEND] Forms for ${client.email}:`, client.affectedFormNames);

        // Construct client portal URL
        const portalUrl = `${baseUrl}/client-portal/${dealId}/${client.clientId}`;
        
        // Prepare email content
        const emailSubject = `New Document Ready for Signature`;
        
        const signatureEmail = formatSignatureCollectionEmail({
          recipientEmail: client.email,
          recipientName: client.name,
          signatureUrl: portalUrl,
          formnames: client.affectedFormNames,
          senderName: userName || "Your Realtor",
          expirationDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        // Send email
        console.log(`[EMAIL_SEND] Sending email to ${client.email}...`);
        const emailResult = await sendEmail({
          to: client.email,
          subject: emailSubject,
          text: signatureEmail.text,
          html: signatureEmail.html,
        });

        console.log(
          `[EMAIL_SEND] Successfully sent email to ${client.email}. Message ID: ${emailResult?.id}`
        );
        successCount++;
      } catch (error) {
        console.error(
          `[EMAIL_SEND] Error sending update email to ${client.email}:`,
          error
        );
        // Continue sending to other clients even if one fails
      }
    }

    console.log(
      `[EMAIL_SEND] Email sending summary: ${successCount}/${clientsWithForms.length} emails sent successfully`
    );
  }

  return {
    success: true,
    affectedClients: clientsWithForms.map(c => ({
      email: c.email,
      name: c.name,
      clientId: c.clientId
    })),
    removedCount: totalRemovedCount,
    addedCount: totalAddedCount,
    formCount: formsData.length,
  };
}

