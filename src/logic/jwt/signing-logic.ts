import { createClient } from "@supabase/supabase-js";
import {
  AuditJson,
  Schema,
  SignatureCollection,
  SignatureEvent,
  SignerAssignment,
} from "../../types/realtor";
import { readFile } from "fs/promises";
import { join } from "path";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { ALL_SCHEMAS } from "../realtor/centralIntelligence/centralIntelligence";
import { getSignatureCollection, modifyPDF } from "../realtor/signatures-logic";
import { getFormPDFFilename, getFormSchemaKey } from "../../routes/forms/pdf-templates";

export async function didAllSignersSign(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
): Promise<boolean> {
  // 1) fetch the signature sequence
  const { data: signatureSequence, error: signatureSequenceError } =
    await supabaseClient
      .from("forms")
      .select("signature_sequence")
      .eq("id", formId)
      .single();

  if (signatureSequenceError) {
    throw new Error(
      "Error getting signature sequence: " + signatureSequenceError.message
    );
  }

  const signatureSequenceData =
    signatureSequence.signature_sequence as SignerAssignment[][];

  // 2) collect all the row_uuids, bail early if any is missing
  const allAssignments = signatureSequenceData.flat();
  const rowUuids: string[] = [];
  for (const signer of allAssignments) {
    if (!signer.row_uuid) {
      return false;
    }
    rowUuids.push(signer.row_uuid);
  }

  // 3) batch-fetch all signature_collections
  const { data: signatureCollections, error: signatureCollectionsError } =
    (await supabaseClient
      .from("signature_collections")
      .select("id, signature_data, delegation_status")
      .in("id", rowUuids)) as {
      data: {
        id: string;
        signature_data: Record<string, Record<string, string>>;
        delegation_status: string | null;
      }[];
      error: any;
    };

  if (signatureCollectionsError) {
    throw new Error(
      "Error getting signature collections: " +
        signatureCollectionsError.message
    );
  }

  // 4) build lookup maps
  const signatureMap = new Map<string, Record<string, Record<string, string>>>();
  const delegationStatusMap = new Map<string, string | null>();
  for (const col of signatureCollections) {
    signatureMap.set(col.id, col.signature_data);
    delegationStatusMap.set(col.id, col.delegation_status);
  }

  // 5) ensure each signer has either signed or delegated
  for (const signer of allAssignments) {
    const sigData = signatureMap.get(signer.row_uuid);
    const delegationStatus = delegationStatusMap.get(signer.row_uuid);

    // Check if the signer has delegated their signature
    if (delegationStatus === "delegated") {
      console.log("signer has delegated their signature", signer.row_uuid);
      continue;
    }

    // If not delegated, check if they have signed
    if (!sigData) {
      // missing collection = not signed
      console.log("missing collection for signer", signer.row_uuid);
      return false;
    }
    // Check if all signature fields are filled in the nested structure
    const hasEmptySignatures = Object.values(sigData).some((fieldMap) => {
      if (!fieldMap || typeof fieldMap !== 'object') return true;
      return Object.values(fieldMap).some((signaturePng) => !signaturePng);
    });
    if (hasEmptySignatures) {
      console.log("missing signature values for signer", signer.row_uuid);
      return false;
    }
  }

  return true;
}

export async function didAllSignersSignBeforeStep(
  formId: string,
  step: number,
  supabaseClient: ReturnType<typeof createClient>
) {
  console.log(
    `[didAllSignersSignBeforeStep] ====== STARTING DELEGATION-AWARE CHECK ======`
  );
  console.log(
    `[didAllSignersSignBeforeStep] Starting check for formId: ${formId}, step: ${step}`
  );

  if (step <= 1) {
    console.log("step is less than 1, returning true");
    console.log("step is", step);
    return true;
  }

  console.log(
    `[didAllSignersSignBeforeStep] Fetching signature sequence for formId: ${formId}`
  );

  const { data: initialFormData, error: initialFormError } =
    (await supabaseClient
      .from("forms")
      .select("signature_sequence")
      .eq("id", formId)
      .single()) as {
      data: { signature_sequence: SignerAssignment[][] };
      error: any;
    };

  if (initialFormError) {
    console.error(
      `[didAllSignersSignBeforeStep] Error fetching signature sequence:`,
      initialFormError
    );
    throw new Error(
      "Error getting signature sequence: " + initialFormError.message
    );
  }

  console.log(
    `[didAllSignersSignBeforeStep] Successfully fetched signature sequence`
  );
  console.log(
    `[didAllSignersSignBeforeStep] Signature sequence data:`,
    JSON.stringify(initialFormData.signature_sequence, null, 2)
  );

  const signatureSequenceData: SignerAssignment[][] =
    initialFormData.signature_sequence;

  const allSignerIds: string[] = [];

  const useStep =
    step <= signatureSequenceData.length ? step : signatureSequenceData.length;

  console.log(
    `[didAllSignersSignBeforeStep] Original step: ${step}, signature sequence length: ${signatureSequenceData.length}, useStep: ${useStep}`
  );

  signatureSequenceData.forEach((row, index) => {
    const stepIndex = index + 1;
    console.log(
      `[didAllSignersSignBeforeStep] Processing row ${
        index + 1
      }, stepIndex: ${stepIndex}, useStep: ${useStep}`
    );
    if (stepIndex < useStep) {
      console.log(
        `[didAllSignersSignBeforeStep] Row ${
          index + 1
        } is before step ${useStep}, adding signers:`,
        row
      );
      row.forEach((signer) => {
        console.log(
          `[didAllSignersSignBeforeStep] Adding signer with row_uuid: ${signer.row_uuid}`
        );
        allSignerIds.push(signer.row_uuid);
      });
    } else {
      console.log(
        `[didAllSignersSignBeforeStep] Row ${
          index + 1
        } is at or after step ${useStep}, skipping`
      );
    }
  });

  console.log(
    `[didAllSignersSignBeforeStep] Collected signer IDs:`,
    allSignerIds
  );

  // If no signers to check, return true
  if (allSignerIds.length === 0) {
    console.log(
      `[didAllSignersSignBeforeStep] No signers to check, returning true`
    );
    return true;
  }

  console.log(
    `[didAllSignersSignBeforeStep] Fetching signature collections for ${allSignerIds.length} signers`
  );

  // Check if all signers have signed before the step
  const { data: signatureCollections, error: signatureCollectionsError } =
    (await supabaseClient
      .from("signature_collections")
      .select("id, signature_data, delegation_status")
      .in("id", allSignerIds)) as {
      data: {
        id: string;
        signature_data: Record<string, Record<string, string>>;
        delegation_status: string | null;
      }[];
      error: any;
    };

  if (signatureCollectionsError) {
    console.error(
      `[didAllSignersSignBeforeStep] Error fetching signature collections:`,
      signatureCollectionsError
    );
    throw new Error(
      "Error getting signature collections: " +
        signatureCollectionsError.message
    );
  }

  console.log(
    `[didAllSignersSignBeforeStep] Fetched ${signatureCollections.length} signature collections`
  );
  console.log(
    `[didAllSignersSignBeforeStep] Signature collections:`,
    JSON.stringify(signatureCollections, null, 2)
  );

  // Log each collection's delegation status specifically
  signatureCollections.forEach((col, index) => {
    console.log(
      `[didAllSignersSignBeforeStep] Collection ${index + 1}: ID=${
        col.id
      }, delegation_status=${
        col.delegation_status
      }, has_signature_data=${!!col.signature_data}`
    );
  });

  // Check if all required signature collections exist
  if (signatureCollections.length !== allSignerIds.length) {
    console.log(
      `[didAllSignersSignBeforeStep] Missing signature collections. Expected: ${allSignerIds.length}, Found: ${signatureCollections.length}`
    );
    console.log(
      `[didAllSignersSignBeforeStep] Missing signer IDs:`,
      allSignerIds.filter(
        (id) => !signatureCollections.find((col) => col.id === id)
      )
    );
    return false;
  }

  console.log(
    `[didAllSignersSignBeforeStep] All signature collections found, building lookup map`
  );

  // Build lookup maps for signature data and delegation status
  const signatureMap = new Map<string, Record<string, Record<string, string>>>();
  const delegationStatusMap = new Map<string, string | null>();
  for (const col of signatureCollections) {
    signatureMap.set(col.id, col.signature_data);
    delegationStatusMap.set(col.id, col.delegation_status);

  }

  console.log(
    `[didAllSignersSignBeforeStep] Signature map built with ${signatureMap.size} entries`
  );

  // Verify that all signers have either signed or delegated their signatures
  for (const signerId of allSignerIds) {
    console.log(`[didAllSignersSignBeforeStep] Checking signer: ${signerId}`);
    const sigData = signatureMap.get(signerId);
    const delegationStatus = delegationStatusMap.get(signerId);

    console.log(
      `[didAllSignersSignBeforeStep] Signer ${signerId} - delegation_status: ${delegationStatus}`
    );

    // Check if the signer has delegated their signature
    if (delegationStatus === "delegated") {
      console.log(
        `[didAllSignersSignBeforeStep] Signer ${signerId} has delegated their signature - considering as completed`
      );
      console.log(
        `[didAllSignersSignBeforeStep] DELEGATION DETECTED: This signer completed their task via delegation`
      );
      continue;
    }

    // If not delegated, check if they have signed
    if (!sigData) {
      console.log(
        `[didAllSignersSignBeforeStep] No signature data found for signer: ${signerId} (not delegated)`
      );
      console.log(
        `[didAllSignersSignBeforeStep] FAILURE: Signer ${signerId} has neither signed nor delegated`
      );
      console.log(
        `[didAllSignersSignBeforeStep] ====== DELEGATION-AWARE CHECK COMPLETE: FAILURE ======`
      );
      return false;
    }
    console.log(
      `[didAllSignersSignBeforeStep] Signature data for ${signerId}:`,
      JSON.stringify(sigData, null, 2)
    );
    // Check if all signature fields are filled in the nested structure
    const hasEmptySignatures = Object.values(sigData).some((fieldMap) => {
      if (!fieldMap || typeof fieldMap !== 'object') return true;
      return Object.values(fieldMap).some((signaturePng) => !signaturePng);
    });
    if (hasEmptySignatures) {
      console.log(
        `[didAllSignersSignBeforeStep] Found empty signature fields for signer: ${signerId}`
      );
      console.log(
        `[didAllSignersSignBeforeStep] FAILURE: Signer ${signerId} has incomplete signature data`
      );
      console.log(
        `[didAllSignersSignBeforeStep] ====== DELEGATION-AWARE CHECK COMPLETE: FAILURE ======`
      );
      return false;
    }
    console.log(
      `[didAllSignersSignBeforeStep] All signature fields completed for signer: ${signerId}`
    );
  }

  console.log(
    `[didAllSignersSignBeforeStep] All signers have completed signatures (signed OR delegated), returning true`
  );
  console.log(
    `[didAllSignersSignBeforeStep] ====== DELEGATION-AWARE CHECK COMPLETE: SUCCESS ======`
  );
  return true;
}

export async function generateFinalizedPDF(
  formId: string,
  supabaseClient: ReturnType<typeof createClient>
) {
  const { data: initialFormData, error: initialFormError } =
    (await supabaseClient
      .from("forms")
      .select(
        "user_id, form_response, form_type, signature_sequence, file_upload_pdf, custom_schema"
      )
      .eq("id", formId)
      .single()) as {
      data: {
        user_id: string;
        form_response: Record<string, string>;
        form_type: string;
        signature_sequence: SignerAssignment[][];
        file_upload_pdf: string;
        custom_schema: Schema;
      };
      error: any;
    };

  if (initialFormError) {
    throw new Error(
      "Error getting signature sequence: " + initialFormError.message
    );
  }

  const signatureSequenceData =
    initialFormData.signature_sequence as SignerAssignment[][];
  const formResponse = initialFormData.form_response;

  // Create an array to store all row_uuids
  const rowUuids: string[] = [];

  // Iterate through each row and signer to collect row_uuids
  signatureSequenceData.forEach((row) => {
    row.forEach((signer) => {
      if (signer.row_uuid) {
        rowUuids.push(signer.row_uuid);
      }
    });
  });

  // 6) fetch all signature_collections for the row_uuids
  const { data: signatureCollections, error: signatureCollectionsError } =
    (await supabaseClient
      .from("signature_collections")
      .select("signature_data, audit_json")
      .eq("actionAs", "signer")
      .in("id", rowUuids)) as {
      data: { signature_data: Record<string, Record<string, string>>; audit_json: AuditJson }[];
      error: any;
    };

  // Combine nested signature data structure for PDF generation
  // Keep the nested format: Record<unique_id, Record<formfield_name, signaturePng>>
  const combinedSignatureData = signatureCollections.reduce(
    (acc, row) => {
      if (row.signature_data) {
        Object.assign(acc, row.signature_data);
      }
      return acc;
    },
    {} as Record<string, Record<string, string>>
  );

  const mergedAuditJson = signatureCollections.reduce((acc, curr, idx) => {
    if (idx === 0) {
      return {
        ...curr.audit_json,
        events: [...curr.audit_json.events],
      };
    }
    return {
      ...acc,
      events: [...acc.events, ...curr.audit_json.events],
    };
  }, {} as AuditJson);

  // Sort events by timestamp and update sequence numbers
  mergedAuditJson.events
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .forEach((event, index) => {
      event.sequence = index + 1;
    });

  console.log("this is the merged audit json", mergedAuditJson);

  // console.log("combinedSignatureData is", combinedSignatureData);
  // 7) generate the pdf

  console.log("initialFormData.form_type is", initialFormData.form_type);

  console.log("initialFormData is: ", initialFormData);
  console.log(
    "initialFormData.file_upload_pdf is",
    initialFormData.file_upload_pdf
  );
  console.log(
    "initialFormData.custom_schema is",
    initialFormData.custom_schema
  );

  let pdfBytes: Uint8Array | undefined;

  if (initialFormData.file_upload_pdf) {
    /* ----- option A: generate a signed URL then fetch it ----- */
    // const { data: urlData, error: urlErr } = await supabaseClient.storage
    //   .from("pdf-uploads")
    //   .createSignedUrl(initialFormData.file_upload_pdf, 60);

    // if (urlErr) throw new Error(`Signed-URL error: ${urlErr.message}`);

    // const res = await fetch(urlData.signedUrl);
    // if (!res.ok) throw new Error(`Failed to download PDF: ${res.statusText}`);

    // pdfBytes = new Uint8Array(await res.arrayBuffer());

    // ----- option B (simpler on the server): skip the signed URL and download directly -----
    const { data: fileData, error: dlErr } = await supabaseClient.storage
      .from("pdf-uploads")
      .download(initialFormData.file_upload_pdf);

    if (dlErr) throw new Error(`Download error: ${dlErr.message}`);
    if (!fileData) throw new Error("Download returned no data");

    pdfBytes = new Uint8Array(await fileData.arrayBuffer());
    // ------------------------------------------------------------------- */
  } else {
    // Check if this is a TAR form and if the broker has uploaded a custom version
    const { getFormMapping } = await import('../../routes/forms/pdf-templates');
    const formMapping = getFormMapping(initialFormData.form_type);
    
    let usedBrokerPdf = false;
    
    if (formMapping && formMapping.orgCreated === 'TAR') {
      console.log(`[SIGNING] Checking for broker-uploaded TAR form: ${initialFormData.form_type}`);
      
      // Get the realtor's broker via tether relationship
      const { data: tether, error: tetherError } = await supabaseClient
        .from('brokerRealtorTether')
        .select('broker_id')
        .eq('realtor_id', initialFormData.user_id as string)
        .eq('status', 'accepted')
        .single();
      
      if (!tetherError && tether) {
        // Check if broker has uploaded this TAR form
        const { data: brokerForm, error: brokerFormError } = await supabaseClient
          .from('brokerForms')
          .select('broker_custom_pdf')
          .eq('broker_id', tether.broker_id as string)
          .eq('form_type', initialFormData.form_type)
          .eq('org_name', 'TAR')
          .single();
        
        if (!brokerFormError && brokerForm) {
          console.log(`[SIGNING] Found broker-uploaded TAR form, using broker's version`);
          
          // Download the broker's custom PDF from storage
          const { data: fileData, error: dlErr } = await supabaseClient.storage
            .from('brokerForms')
            .download(brokerForm.broker_custom_pdf as string);
          
          if (!dlErr && fileData) {
            pdfBytes = new Uint8Array(await fileData.arrayBuffer());
            usedBrokerPdf = true;
            console.log(`[SIGNING] Successfully loaded broker's custom TAR form`);
          } else {
            console.error(`[SIGNING] Failed to download broker's TAR form:`, dlErr);
          }
        }
      }
    }
    
    // If we didn't use a broker PDF, fall back to local blank form
    if (!usedBrokerPdf) {
      console.log(`[SIGNING] Using default blank form for ${initialFormData.form_type}`);
      try {
        pdfBytes = await readFile(
          join(
            process.cwd(),
            "src",
            "lib",
            "blank_files",
            getFormPDFFilename(initialFormData.form_type)
          )
        );
      } catch (fileError) {
        console.error(`[SIGNING] Failed to read blank file: ${fileError}`);
        // Try the dist directory if src directory doesn't work
        try {
          pdfBytes = await readFile(
            join(
              process.cwd(),
              "dist",
              "lib",
              "blank_files",
              getFormPDFFilename(initialFormData.form_type)
            )
          );
        } catch (distError) {
          console.error(`[SIGNING] Failed to read blank file from dist: ${distError}`);
          throw new Error(`Failed to load blank PDF file for form type: ${initialFormData.form_type}`);
        }
      }
    }
  }

  if (!pdfBytes) {
    throw new Error(`Failed to load PDF for form type: ${initialFormData.form_type}`);
  }

  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form_schema =
    initialFormData.file_upload_pdf && initialFormData.custom_schema
      ? initialFormData.custom_schema
      : ALL_SCHEMAS[getFormSchemaKey(initialFormData.form_type)];

  const modifiedPdfDoc = await modifyPDF(
    pdfDoc,
    form_schema,
    formResponse,
    combinedSignatureData
  );
  const pdfDocForm = (await modifiedPdfDoc).getForm();
  pdfDocForm.flatten();

  const savingPdfBytes = await pdfDoc.save();

  // 8) save the pdf to supabase storage
  const fileName = `${formId}_finalized.pdf`;
  const { data: uploadData, error: uploadError } = await supabaseClient.storage
    .from("finalized-pdfs")
    .upload(fileName, savingPdfBytes, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (uploadError) {
    throw new Error("Error uploading PDF: " + uploadError.message);
  }

  const bytesForHashing = new Uint8Array(savingPdfBytes);
  let pdfHash: string = "";
  try {
    const hashBuffer = await crypto.subtle.digest("SHA-256", bytesForHashing);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    pdfHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log("PDF hash generated successfully:", pdfHash);
  } catch (hashError) {
    console.error("Error generating PDF hash:", hashError);
    throw new Error("Failed to generate PDF hash");
  }

  //update the form audit json with the new events
  mergedAuditJson.final_document_hash = pdfHash;

  return { fileName, mergedAuditJson };
}

export async function addSignatureEvents(
  id: string,
  events: SignatureEvent[],
  supabaseClient: ReturnType<typeof createClient>
) {
  const currentAuditJson = (await getSignatureCollection(id, supabaseClient))
    .audit_json;

  console.log("currentAuditJson is", currentAuditJson);

  const highestSequenceNumber = currentAuditJson.events?.length || 0;

  const updatedEvents = events.map((event, index) => ({
    ...event,
    sequence: highestSequenceNumber + index + 1,
  }));

  const updatedAuditJson = {
    ...currentAuditJson,
    events: [...(currentAuditJson.events || []), ...updatedEvents],
  };

  console.log("updatedAuditJson is", updatedAuditJson);
  const { data, error } = await supabaseClient
    .from("signature_collections")
    .update({ audit_json: updatedAuditJson })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Error adding signature event" + error);
  }

  return data as unknown as SignatureCollection;
}

export async function getUpdatedAuditJson(
  id: string,
  events: SignatureEvent[],
  supabaseClient: ReturnType<typeof createClient>
) {
  const currentAuditJson = (await getSignatureCollection(id, supabaseClient))
    .audit_json;

  console.log("currentAuditJson is", currentAuditJson);

  const highestSequenceNumber = currentAuditJson.events?.length || 0;

  const updatedEvents = events.map((event, index) => ({
    ...event,
    sequence: highestSequenceNumber + index + 1,
  }));

  const updatedAuditJson = {
    ...currentAuditJson,
    events: [...(currentAuditJson.events || []), ...updatedEvents],
  };

  return updatedAuditJson as AuditJson;
}
