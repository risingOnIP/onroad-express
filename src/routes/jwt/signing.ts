import { Router } from "express";
import { getForm } from "../../logic/realtor/form-logic";
import { supabaseAnon, supabaseService } from "../../config/supabase";
import { supabase } from "../../config/supabase";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  AuditJson,
  FormResponse,
  Schema,
  SignatureCollection,
  SignatureEvent,
  SignerAssignment,
} from "../../types/realtor";
import {
  generateSignatureCollection,
  getSignatureCollection,
  modifyPDF,
} from "../../logic/realtor/signatures-logic";
import jwt from "jsonwebtoken";
import {
  didAllSignersSign,
  generateFinalizedPDF,
  getUpdatedAuditJson,
  didAllSignersSignBeforeStep,
} from "../../logic/jwt/signing-logic";
import { ALL_SCHEMAS } from "../../logic/realtor/centralIntelligence/centralIntelligence";
import { getFormPDFFilename } from "../forms/pdf-templates";
import { getDealById } from "../../logic/realtor/deal-logic";
import { getAllDealOptionsWithForms } from "../../logic/realtor/dealOption-logic";

const router = Router();
const SIGN_JWT_SECRET = process.env.SIGNING_JWT_SECRET!;

function signToken(email: string, coll: string) {
  return jwt.sign(
    { email, coll }, // payload
    SIGN_JWT_SECRET,
    { expiresIn: "60m" } // 60-minute TTL
  );
}

// ===== SIGNATURE OTP ROUTES =====

router.post("/:id/otp/request", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("signature_collections")
    .select("action_email, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return res.status(404).json({ error: "Invalid link" });
  const createdAt = new Date(data.created_at as Date).getTime();
  if (Date.now() - createdAt > 24 * 60 * 60 * 1000) {
    return res.status(400).json({ error: "Link expired" });
  }

  const { error: otpErr } = await supabase.auth.signInWithOtp({
    email: data.action_email,
    options: { shouldCreateUser: true },
  });

  if (otpErr) return res.status(500).json({ error: otpErr.message });
  res.json({ ok: true });
});

router.get("/:id/email", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("signature_collections")
    .select("action_email, created_at")
    .eq("id", id)
    .single();

  if (error || !data) return res.status(404).json({ error: "Invalid link" });

  const createdAt = new Date(data.created_at as Date).getTime();

  if (Date.now() - createdAt > 3 * 24 * 60 * 60 * 1000) {
    return res.status(400).json({ error: "Link expired" });
  }

  res.json({ email: data.action_email });
});

router.post("/:id/otp/verify", async (req, res) => {
  const { id } = req.params;
  const { email, code } = req.body;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email",
  });
  if (error || !data.session)
    return res.status(400).json({ error: "Bad code" });

  const token = signToken(email, id);
  res.json({ token });
});

// ===== FILE DOWNLOAD FOR JWT AUTHENTICATED USERS =====

// Get signed URL for file download with JWT authentication
router.post("/file-download-url", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify JWT token
    try {
      jwt.verify(token, SIGN_JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ error: "No fileName provided" });
    }

    console.log(`[FILE_DOWNLOAD] Getting signed URL for: ${fileName}`);

    // Get signed URL for the file
    const { getSignedUrl } = await import("../../logic/file-upload-logic");
    const signedUrlResult = await getSignedUrl(fileName);

    if (signedUrlResult.success && signedUrlResult.url) {
      console.log(`[FILE_DOWNLOAD] Generated signed URL successfully`);
      return res.json({ url: signedUrlResult.url });
    } else {
      console.log(`[FILE_DOWNLOAD] Failed to generate signed URL`);
      return res.status(500).json({
        error: "Failed to generate download URL",
        details: signedUrlResult.error,
      });
    }
  } catch (error) {
    console.error("[FILE_DOWNLOAD] Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// ===== PARTY PORTAL JWT AUTHENTICATION FOR SIGNATURES =====

// Verify party portal JWT token for signature access
router.post("/:id/verify-party-token", async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Verify the party portal JWT token
    const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
      email: string;
      dealId: string;
      clientId: string;
    };

    // Get signature collection to verify the user can access it
    const { data: signatureCollection, error: sigError } = await supabase
      .from("signature_collections")
      .select("action_email, created_at, form_id")
      .eq("id", id)
      .single();

    if (sigError || !signatureCollection) {
      return res.status(404).json({ error: "Invalid signature link" });
    }

    // Check if the email matches the signer email
    if (payload.email !== signatureCollection.action_email) {
      return res
        .status(403)
        .json({ error: "Token email does not match signer email" });
    }

    // Check if signature collection is still valid (24h limit)
    const createdAt = new Date(
      signatureCollection.created_at as Date
    ).getTime();
    if (Date.now() - createdAt > 24 * 60 * 60 * 1000) {
      return res.status(400).json({ error: "Signature link expired" });
    }

    // Verify that the signature belongs to the same deal as the party portal token
    const { data: form, error: formError } = await supabase
      .from("forms")
      .select(
        `
        dealOptions!inner(
          deal_id
        )
      `
      )
      .eq("id", signatureCollection.form_id)
      .single();

    if (formError || !form) {
      return res.status(404).json({ error: "Form not found" });
    }

    // Check if the deal ID matches
    if ((form as any).dealOptions.deal_id !== payload.dealId) {
      return res
        .status(403)
        .json({ error: "Signature does not belong to your deal" });
    }

    // Generate a signature-specific JWT token for this session
    const signatureToken = signToken(payload.email, id);

    res.json({
      token: signatureToken,
      verified: true,
      email: payload.email,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Party portal session expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid party portal token" });
    }
    console.error("Error verifying party token:", error);
    res.status(500).json({ error: "Failed to verify token" });
  }
});

router.post(
  "/submit-delegated-document/:signatureCollectionId",
  async (req, res) => {
    console.log("[DELEGATION] Starting delegation submission");
    const { signatureCollectionId } = req.params;
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    console.log(
      "[DELEGATION] Token received:",
      token ? "Present" : "Missing"
    );
    console.log("[DELEGATION] Collection ID:", signatureCollectionId);

    const { delegationDataMapping, signingEvents } = req.body as {
      delegationDataMapping: Record<string, string>; //email to field id
      signingEvents: SignatureEvent[];
    };

    console.log("[DELEGATION] Delegation mapping:", delegationDataMapping);
    console.log(
      "[DELEGATION] Signing events count:",
      signingEvents?.length || 0
    );
    console.log(
      "[DELEGATION] Signing events:",
      JSON.stringify(signingEvents, null, 2)
    );

    if (!token) {
      console.log("[DELEGATION] No token provided");
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      console.log("[DELEGATION] Verifying JWT token");
      const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
        email: string;
        coll: string;
      };

      console.log("[DELEGATION] Token verified for email:", payload.email);
      console.log("[DELEGATION] Token collection:", payload.coll);

      if (payload.coll !== signatureCollectionId) {
        console.log("[DELEGATION] Collection ID mismatch");
        return res.status(403).json({ error: "Invalid collection ID" });
      }

      console.log("[DELEGATION] Fetching signature collection data");
      const { data: signatureCollection, error: signatureCollectionError } =
        (await supabase
          .from("signature_collections")
          .select("action_email, sender_id, forms(signature_sequence, id)")
          .eq("id", signatureCollectionId)
          .single()) as {
          data: {
            action_email: string;
            sender_id: string;
            forms: {
              id: string;
              signature_sequence: SignerAssignment[][];
            };
          };
          error: any;
        };

      if (signatureCollectionError) {
        console.log(
          "[DELEGATION] Error fetching signature collection:",
          signatureCollectionError
        );
        return res
          .status(500)
          .json({ error: signatureCollectionError.message });
      }

      console.log("[DELEGATION] Signature collection fetched:", {
        action_email: signatureCollection.action_email,
        sender_id: signatureCollection.sender_id,
        form_id: signatureCollection.forms.id,
        signature_sequence_length:
          signatureCollection.forms.signature_sequence.length,
      });

      console.log(
        "[DELEGATION] Finding step for collection ID:",
        signatureCollectionId
      );
      let step: number | undefined;

      signatureCollection.forms.signature_sequence.forEach(
        (signerAssignment: SignerAssignment[], stepIndex: number) => {
          console.log(
            `[DELEGATION] Checking step ${stepIndex + 1}:`,
            signerAssignment
          );
          signerAssignment.forEach((signer) => {
            console.log("[DELEGATION] Checking signer:", {
              email: signer.email,
              row_uuid: signer.row_uuid,
              actionAs: signer.actionAs,
            });
            if (signer.row_uuid === signatureCollectionId) {
              step = stepIndex + 1;
              console.log(`[DELEGATION] Found matching step: ${step}`);
            }
          });
        }
      );

      console.log("[DELEGATION] Final step determined:", step);

      if (step === undefined) {
        console.log(
          "[DELEGATION] Signature collection not found in sequence"
        );
        return res
          .status(400)
          .json({ error: "Signature collection not found" });
      }

      console.log(
        "[DELEGATION] Checking if all previous signers have signed"
      );
      const allSignersSignedBeforeStep = await didAllSignersSignBeforeStep(
        signatureCollection.forms.id,
        step,
        supabaseAnon as ReturnType<typeof createClient>
      );

      console.log(
        "[DELEGATION] Previous signers check result:",
        allSignersSignedBeforeStep
      );

      if (!allSignersSignedBeforeStep) {
        console.log("[DELEGATION] Not all previous signers have signed");
        return res
          .status(400)
          .json({ error: "All signers must sign before this step" });
      }

      console.log("[DELEGATION] Hydrating signature events");
      const hydratedSignatureEvents = signingEvents.map((event) => ({
        ...event,
        actor_uuid: payload.email,
        ip_address: req.ip || req.socket.remoteAddress || "",
        user_agent: req.headers["user-agent"] || "",
      }));

      console.log(
        "[DELEGATION] Events hydrated:",
        hydratedSignatureEvents.length
      );

      console.log("[DELEGATION] Creating updated audit JSON");
      const toUpdateAuditJson = await getUpdatedAuditJson(
        signatureCollectionId,
        hydratedSignatureEvents,
        supabaseAnon as ReturnType<typeof createClient>
      );

      if (!toUpdateAuditJson) {
        console.log("[DELEGATION] Failed to create audit JSON");
        return res
          .status(400)
          .json({ error: "Failed to create newly updated audit json" });
      }

      console.log("[DELEGATION] Audit JSON created successfully");
      console.log(
        "[DELEGATION] Serialized audit JSON: ",
        JSON.stringify(toUpdateAuditJson)
      );

      console.log(
        "[DELEGATION] NEW APPROACH: Creating delegation mappings without modifying form data"
      );

      // CRITICAL: Never modify form_response or signature_sequence during delegation
      // This preserves the original delegator information and maintains delegation privacy

      console.log(
        "[DELEGATION] Creating signature collections for delegated signers"
      );
      const createdCollections: Array<{
        email: string;
        collectionId: string;
        fieldId: string;
      }> = [];

      for (const [email, fieldId] of Object.entries(delegationDataMapping)) {
        console.log(
          `[DELEGATION] Creating signature collection for ${email} -> field ${fieldId}`
        );
        try {
          const newCollection = await generateSignatureCollection(
            signatureCollection.forms.id,
            "signer",
            email,
            toUpdateAuditJson,
            req.headers["user-agent"] || "",
            req.ip || req.socket.remoteAddress || "",
            signatureCollection.sender_id,
            supabaseAnon as ReturnType<typeof createClient>
          );

          createdCollections.push({
            email,
            collectionId: newCollection.id,
            fieldId,
          });

          console.log(
            `[DELEGATION] Signature collection created for ${email}: ${newCollection.id}`
          );
        } catch (genError) {
          console.log(
            `[DELEGATION] Error creating signature collection for ${email}:`,
            genError
          );
          throw genError;
        }
      }

      console.log("[DELEGATION] Creating delegation mapping records");
      for (const { email, collectionId, fieldId } of createdCollections) {
        console.log(
          `[DELEGATION] Creating delegation mapping: ${payload.email} -> ${email} for field ${fieldId}`
        );

        const { error: delegationMappingError } = await supabase
          .from("delegation_mappings")
          .insert({
            delegator_signature_collection_id: signatureCollectionId,
            delegator_email: payload.email,
            original_field_id: fieldId,
            delegated_to_email: email,
            delegated_signer_collection_id: collectionId,
            delegation_status: "pending",
            delegation_audit_data: {
              delegation_events: hydratedSignatureEvents,
              delegated_at: new Date().toISOString(),
              delegator_collection_id: signatureCollectionId,
            },
          });

        if (delegationMappingError) {
          console.log(
            `[DELEGATION] Error creating delegation mapping for ${email}:`,
            delegationMappingError
          );
          throw new Error(
            `Failed to create delegation mapping: ${delegationMappingError.message}`
          );
        }

        console.log(`[DELEGATION] Delegation mapping created for ${email}`);
      }

      console.log(
        "[DELEGATION] Updating original signature collection status to 'delegated'"
      );
      const {
        data: updatedSignatureCollection,
        error: updateSignatureCollectionError,
      } = (await supabase
        .from("signature_collections")
        .update({
          delegation_status: "delegated",
          audit_json: toUpdateAuditJson,
          // CRITICAL: Do NOT populate signature_data during delegation
          // This field should only be populated when someone actually signs
        })
        .eq("id", signatureCollectionId)
        .select()
        .single()) as unknown as { data: SignatureCollection; error: any };

      if (updateSignatureCollectionError) {
        console.log(
          "[DELEGATION] Error updating signature collection:",
          updateSignatureCollectionError
        );
        return res
          .status(500)
          .json({ error: updateSignatureCollectionError.message });
      }

      console.log("[DELEGATION] Delegation process completed successfully");
      res.status(200).json({ updatedSignatureCollection });
    } catch (error) {
      console.log("[DELEGATION] Unexpected error:", error);
      if (error instanceof jwt.TokenExpiredError) {
        console.log("[DELEGATION] Token expired");
        return res.status(401).json({ error: "Token expired" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        console.log("[DELEGATION] Invalid token");
        return res.status(401).json({ error: "Invalid token" });
      } else {
        console.log("[DELEGATION] Internal server error:", error);
        return res
          .status(500)
          .json({ error: "Internal server error when delegating document" });
      }
    }
  }
);

router.post(
  "/submit-signed-document/:signatureCollectionId",
  async (req, res) => {
    const { signatureCollectionId } = req.params;
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    const { signatureDataMapping, signingEvents, currentDate } = req.body as {
      signatureDataMapping: Record<string, Record<string, string>>;
      signingEvents: SignatureEvent[];
      currentDate: string;
    };

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
        email: string;
        coll: string;
      };

      if (payload.coll !== signatureCollectionId) {
        return res.status(403).json({ error: "Invalid collection ID" });
      }

      //check if all signers have signed before the step

      console.log("Starting submit signed document try ");
      const { data: signatureCollection, error: signatureCollectionError } =
        (await supabase
          .from("signature_collections")
          .select(
            "forms(signature_sequence, id, form_response, custom_schema, form_type)"
          )
          .eq("id", signatureCollectionId)
          .single()) as {
          data: {
            forms: {
              id: string;
              signature_sequence: SignerAssignment[][];
              form_response: FormResponse;
              custom_schema: Schema;
              form_type: string;
            };
          };
          error: any;
        };

      if (signatureCollectionError) {
        return res
          .status(500)
          .json({ error: signatureCollectionError.message });
      }
      console.log(
        "this is the signature sequence",
        signatureCollection.forms.signature_sequence
      );

      let step: number | undefined;
      console.log("i am looking for id of: ", signatureCollectionId);
      signatureCollection.forms.signature_sequence.forEach(
        (signerAssignment: SignerAssignment[], stepIndex: number) => {
          signerAssignment.forEach((signer) => {
            console.log("this is the row uuid", signer.row_uuid);
            if (signer.row_uuid === signatureCollectionId) {
              step = stepIndex + 1;
            }
          });
        }
      );

      console.log("this is the step", step);

      if (step === undefined) {
        return res
          .status(400)
          .json({ error: "Signature collection not found" });
      }

      console.log("going to call didAllSignersSignBeforeStep");
      const allSignersSignedBeforeStep = await didAllSignersSignBeforeStep(
        signatureCollection.forms.id,
        step,
        supabaseAnon as ReturnType<typeof createClient>
      );

      console.log("allSignersSignedBeforeStep", allSignersSignedBeforeStep);

      if (!allSignersSignedBeforeStep) {
        console.log("all signers did not sign before this step");
        return res
          .status(400)
          .json({ error: "All signers must sign before this step" });
      }

      //check if any signature has a linked date field

      const workingSchema: Schema =
        signatureCollection.forms.custom_schema ??
        ALL_SCHEMAS[signatureCollection.forms.form_type];
      const linkedDateFields: string[] = [];

      for (const key of Object.keys(signatureDataMapping)) {
        const workingSchemaItem = workingSchema.find(
          (item) => item.unique_id === key
        );

        if (workingSchemaItem?.pdf_attributes) {
          workingSchemaItem.pdf_attributes.forEach((attr) => {
            if (attr.linked_dates) {
              attr.linked_dates.forEach((date) => {
                linkedDateFields.push(date.dateFieldName);
              });
            }
          });
        }
      }

      //adding date fields

      let newFormResponse: FormResponse =
        signatureCollection.forms.form_response;

      for (const key of linkedDateFields) {
        if (
          newFormResponse[key] === undefined ||
          newFormResponse[key] === null ||
          newFormResponse[key] === ""
        ) {
          newFormResponse[key] = currentDate;
        }
      }

      console.log("newFormResponse", newFormResponse);

      const { data: updatedForm, error: updateFormError } = await supabase
        .from("forms")
        .update({
          form_response: newFormResponse,
        })
        .eq("id", signatureCollection.forms.id)
        .select()
        .single();

      if (updateFormError) {
        return res.status(500).json({ error: updateFormError.message });
      }

      console.log("updatedForm", updatedForm);

      //update signature collection with audit_json (events)  + signatureDataMapping row

      //first hydrating events
      const hydratedSignatureEvents = signingEvents.map((event) => ({
        ...event,
        actor_uuid: req.user?.sub || `jwt_token: ${token}`,
        ip_address: req.ip || req.socket.remoteAddress || "",
        user_agent: req.headers["user-agent"] || "",
      }));

      const toUpdateAuditJson = await getUpdatedAuditJson(
        signatureCollectionId,
        hydratedSignatureEvents,
        supabaseAnon as ReturnType<typeof createClient>
      );

      if (!toUpdateAuditJson) {
        return res
          .status(400)
          .json({ error: "Failed to create newly updated audit json" });
      }

      console.log(
        "all events are now serialized: ",
        JSON.stringify(toUpdateAuditJson)
      );

      const {
        data: updatedSignatureCollection,
        error: updateSignatureCollectionError,
      } = (await supabase
        .from("signature_collections")
        .update({
          signature_data: signatureDataMapping,
          audit_json: toUpdateAuditJson,
          delegation_status: "signed",
        })
        .eq("id", signatureCollectionId)
        .select()
        .single()) as unknown as { data: SignatureCollection; error: any };

      if (updateSignatureCollectionError) {
        return res
          .status(500)
          .json({ error: updateSignatureCollectionError.message });
      }

      // [DELEGATION HANDLING] Check if this was a delegated signature collection
      console.log(
        "[SIGNING] Checking if this is a delegated signature collection"
      );
      const { data: delegationMapping, error: delegationMappingError } =
        await supabase
          .from("delegation_mappings")
          .select("*")
          .eq("delegated_signer_collection_id", signatureCollectionId)
          .eq("delegation_status", "pending")
          .single();

      if (
        delegationMappingError &&
        delegationMappingError.code !== "PGRST116"
      ) {
        console.log(
          "[SIGNING] Error checking delegation mapping:",
          delegationMappingError
        );
        // Don't fail the signing process for delegation mapping errors
      } else if (delegationMapping) {
        console.log(
          "[SIGNING] This is a delegated signature collection, updating delegation status"
        );

        // Update delegation mapping to 'signed' status
        const { error: updateDelegationError } = await supabase
          .from("delegation_mappings")
          .update({
            delegation_status: "signed",
            signed_at: new Date().toISOString(),
          })
          .eq("id", delegationMapping.id);

        if (updateDelegationError) {
          console.log(
            "[SIGNING] Error updating delegation mapping:",
            updateDelegationError
          );
          // Don't fail the signing process for delegation mapping errors
        } else {
          console.log(
            `[SIGNING] Delegation mapping updated: ${delegationMapping.delegator_email} -> ${delegationMapping.delegated_to_email} for field ${delegationMapping.original_field_id}`
          );
        }
      } else {
        console.log(
          "[SIGNING] This is not a delegated signature collection"
        );
      }

      //check if all signers have signed and if so, update form row with finalized pdf and audit json

      console.log("[SIGNING] Checking if all signers have signed...");
      const allSigned = await didAllSignersSign(
        updatedSignatureCollection.form_id,
        supabaseService as ReturnType<typeof createClient>
      );
      console.log("[SIGNING] All signers signed?", allSigned);

      if (allSigned) {
        console.log("[SIGNING] All signers have signed, generating finalized PDF...");
        
        console.log("[SIGNING] Calling generateFinalizedPDF...");
        const startTime = Date.now();
        
        const {
          fileName: finalizedPdfFileName,
          mergedAuditJson: finalizedAuditJson,
        } = await generateFinalizedPDF(
          updatedSignatureCollection.form_id,
          supabaseService as ReturnType<typeof createClient>
        );
        
        const generateTime = Date.now() - startTime;
        console.log(`[SIGNING] generateFinalizedPDF completed in ${generateTime}ms`);
        console.log(`[SIGNING] Generated file: ${finalizedPdfFileName}`);

        console.log("[SIGNING] Updating form with finalized PDF...");
        const { data: formData, error: formError } = await supabase
          .from("forms")
          .update({
            finalized_pdf: finalizedPdfFileName,
            finalized_audit_json: finalizedAuditJson,
          })
          .eq("id", updatedSignatureCollection.form_id)
          .single();

        if (formError) {
          console.error("[SIGNING] Error updating form:", formError);
          return res.status(500).json({ error: formError.message });
        }
        console.log("[SIGNING] Form updated successfully");
      } else {
        console.log("[SIGNING] Not all signers have signed, skipping PDF generation");
      }

      console.log("[SIGNING] Sending success response...");
      res.status(200).json({ updatedSignatureCollection });
      console.log("[SIGNING] Response sent successfully");
    } catch (error) {
      console.error("[SIGNING] Error in submit-signed-document:", error);
      
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: "Token expired" });
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token" });
      }
      
      // Catch-all for any other errors
      console.error("[SIGNING] Unhandled error:", error);
      return res.status(500).json({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    }
  }
);

router.get("/form/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await getForm(
      formId,
      supabaseAnon as ReturnType<typeof createClient>
    );
    res.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ error: "Failed to fetch form" });
  }
});

router.get("/get-signature-collection/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const signatureCollection: SignatureCollection =
      await getSignatureCollection(
        id,
        supabaseAnon as ReturnType<typeof createClient>
      );

    res.json(signatureCollection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Get signature collections for same step (for showing co-signer signatures)
router.get(
  "/get-all-signatures/:formId/:signatureCollectionId",
  async (req, res) => {
    try {
      const { formId, signatureCollectionId } = req.params;

      console.log(
        `[SAME_STEP_SIGNATURES] Getting same-step signatures for form: ${formId}, collection: ${signatureCollectionId}`
      );

      // Get the form to access signature_sequence
      const form = await getForm(
        formId,
        supabaseAnon as ReturnType<typeof createClient>
      );
      if (!form) {
        console.log(`[SAME_STEP_SIGNATURES] Form ${formId} not found`);
        return res.status(404).json({ error: "Form not found" });
      }

      // Find which step the current signer is in
      let currentStep = -1;
      let allSignerIds: string[] = [];

      if (form.signature_sequence) {

        form.signature_sequence.forEach((step) => {
          step.forEach((signer) => {
            allSignerIds.push(signer.row_uuid);
          });
        });
      }

      console.log(`[ALL_SIGNATURES] All signers: ${allSignerIds.length}`);

      // Fetch signature data from same-step signers
      const sameStepSignatures: Record<string, string> = {};

      for (const signerId of allSignerIds) {
        try {
          const signerCollection = await getSignatureCollection(
            signerId,
            supabaseAnon as ReturnType<typeof createClient>
          );

          if (signerCollection.signature_data) {
            console.log(
              `[SAME_STEP_SIGNATURES] Found signatures from co-signer ${signerId}`
            );
            Object.assign(sameStepSignatures, signerCollection.signature_data);
          }
        } catch (err) {
          console.error(
            `[SAME_STEP_SIGNATURES] Error fetching co-signer ${signerId}:`,
            err
          );
          // Continue with other signers
        }
      }

      console.log(
        `[SAME_STEP_SIGNATURES] Returning ${
          Object.keys(sameStepSignatures).length
        } signatures`
      );
      res.json({ signatures: sameStepSignatures });
    } catch (error) {
      console.error("[SAME_STEP_SIGNATURES] Error:", error);
      res.status(500).json({
        error: "Failed to get same-step signatures",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
  //commmits
);

router.get("/get-schema-by-form-type/:formType", async (req, res) => {
  try {
    const { formType } = req.params;
    const schema = ALL_SCHEMAS[formType] ?? [];
    res.json(schema);
  } catch (error) {
    console.error("Error getting schema by form type:", error);
    res.status(500).json({ error: "Failed to get schema by form type" });
  }
});

// Generate preview PDF for a form (public endpoint for viewing PDFs)
router.get("/generate-preview-pdf/:formId", async (req, res) => {
  try {
    const { formId } = req.params;

    console.log(`[PREVIEW_PDF] Generating preview PDF for form: ${formId}`);

    // Get form data
    const form = await getForm(
      formId,
      supabaseAnon as ReturnType<typeof createClient>
    );
    if (!form) {
      console.log(`[PREVIEW_PDF] Form ${formId} not found`);
      return res.status(404).json({ error: "Form not found" });
    }

    console.log(`[PREVIEW_PDF] Form found: ${form.form_type}`);

    // Check if form has a finalized PDF first
    if (form.finalized_pdf) {
      console.log(
        `[PREVIEW_PDF] Using finalized PDF: ${form.finalized_pdf}`
      );

      // Get signed URL for the finalized PDF
      try {
        const { getSignedUrl } = await import("../../logic/file-upload-logic");
        const signedUrlResult = await getSignedUrl(form.finalized_pdf);

        if (signedUrlResult.success && signedUrlResult.url) {
          console.log(
            `[PREVIEW_PDF] Generated signed URL for finalized PDF`
          );
          return res.json({ pdfUrl: signedUrlResult.url });
        } else {
          console.log(
            `[PREVIEW_PDF] Failed to generate signed URL for finalized PDF:`,
            signedUrlResult.error
          );
          // Fall through to try other PDF sources
        }
      } catch (error) {
        console.error(
          `[PREVIEW_PDF] Error generating signed URL for finalized PDF:`,
          error
        );
        // Fall through to try other PDF sources
      }
    }

    // Process all forms to generate PDFs with current signatures
    if (form.form_type && form.form_response) {
      console.log(`[PREVIEW_PDF] Processing form: ${form.form_type}`);

      // Import necessary modules
      const { join } = await import("path");
      const { readFile } = await import("fs/promises");
      const { PDFDocument } = await import("pdf-lib");

      // Determine schema source
      const isCustomForm =
        form.custom_schema &&
        Array.isArray(form.custom_schema) &&
        form.custom_schema.length > 0;
      const form_schema = isCustomForm
        ? form.custom_schema
        : ALL_SCHEMAS[form.form_type];

      if (!form_schema) {
        console.log(`[PREVIEW_PDF] No schema found for form`);
        return res.status(400).json({ error: `No schema available for form` });
      }

      console.log(
        `[PREVIEW_PDF] Using ${isCustomForm ? "custom" : "standard"} schema`
      );

      // Load the base PDF
      let pdfBytes: ArrayBuffer;

      if (form.file_upload_pdf && form.file_upload_pdf !== "") {
        console.log(
          `[PREVIEW_PDF] Loading uploaded PDF: ${form.file_upload_pdf}`
        );

        try {
          // Get signed URL for the uploaded PDF
          const { getSignedUrl } = await import(
            "../../logic/file-upload-logic"
          );
          const signedUrlResult = await getSignedUrl(form.file_upload_pdf);

          if (signedUrlResult.success && signedUrlResult.url) {
            // Fetch the PDF content using https
            const url = await import("url");
            const https = await import("https");
            const http = await import("http");

            const parsedUrl = url.parse(signedUrlResult.url);
            const client = parsedUrl.protocol === "https:" ? https : http;

            const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
              if (!signedUrlResult.url) {
                reject(new Error("No URL available for PDF"));
                return;
              }
              client
                .get(signedUrlResult.url, (response) => {
                  if (response.statusCode !== 200) {
                    reject(
                      new Error(
                        `HTTP ${response.statusCode}: ${response.statusMessage}`
                      )
                    );
                    return;
                  }

                  const chunks: Buffer[] = [];
                  response.on("data", (chunk) => chunks.push(chunk));
                  response.on("end", () => resolve(Buffer.concat(chunks)));
                  response.on("error", reject);
                })
                .on("error", reject);
            });

            pdfBytes = pdfBuffer.buffer.slice(
              pdfBuffer.byteOffset,
              pdfBuffer.byteOffset + pdfBuffer.byteLength
            ) as ArrayBuffer;
            console.log(`[PREVIEW_PDF] Loaded uploaded PDF successfully`);
          } else {
            throw new Error(
              signedUrlResult.error || "Failed to get signed URL"
            );
          }
        } catch (error) {
          console.error(`[PREVIEW_PDF] Error loading uploaded PDF:`, error);

          // For custom forms, we can't fall back to a template
          if (isCustomForm) {
            return res
              .status(400)
              .json({ error: "Failed to load uploaded PDF for custom form" });
          }

          // For standard forms, fall back to template
          console.log(`[PREVIEW_PDF] Falling back to template PDF`);
          const pdfFilename = getFormPDFFilename(form.form_type);
          const pdfPath = join(
            process.cwd(),
            "src",
            "lib",
            "blank_files",
            pdfFilename
          );
          try {
            const blankPdf = await readFile(pdfPath);
            pdfBytes = blankPdf.buffer as ArrayBuffer;
          } catch (err) {
            return res.status(400).json({
              error: `Template PDF not found for form type: ${form.form_type}`,
            });
          }
        }
      } else {
        // No uploaded PDF, use template
        if (isCustomForm) {
          return res
            .status(400)
            .json({ error: "Custom form requires an uploaded PDF" });
        }

        const pdfFilename = getFormPDFFilename(form.form_type);
        const pdfPath = join(
          process.cwd(),
          "src",
          "lib",
          "blank_files",
          pdfFilename
        );
        try {
          const blankPdf = await readFile(pdfPath);
          pdfBytes = blankPdf.buffer as ArrayBuffer;
          console.log(`[PREVIEW_PDF] Loaded template PDF`);
        } catch (error) {
          console.log(`[PREVIEW_PDF] Template PDF not found: ${pdfPath}`);
          return res.status(400).json({
            error: `Template PDF not found for form type: ${form.form_type}`,
          });
        }
      }

      // Load PDF with pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Collect all existing signatures from all signers
      let allSignatures: Record<string, Record<string, string>> = {};

      if (form.signature_sequence) {
        console.log(`[PREVIEW_PDF] Collecting signatures from all signers`);

        for (const step of form.signature_sequence) {
          for (const signer of step) {
            if (signer.row_uuid) {
              try {
                const signerCollection = await getSignatureCollection(
                  signer.row_uuid,
                  supabaseAnon as ReturnType<typeof createClient>
                );

                if (
                  signerCollection.signature_data &&
                  signerCollection.actionAs === "signer"
                ) {
                  console.log(
                    `[PREVIEW_PDF] Found signatures from ${signer.email}`
                  );
                  Object.assign(allSignatures, signerCollection.signature_data);
                }
              } catch (err) {
                console.log(
                  `[PREVIEW_PDF] No signatures yet from ${signer.email}`
                );
                // Continue - signer might not have signed yet
              }
            }
          }
        }

        console.log(
          `[PREVIEW_PDF] Total signatures collected: ${
            Object.keys(allSignatures).length
          }`
        );
      }

      // Generate PDF with form data and all collected signatures
      const modifiedPdfDoc = await modifyPDF(
        pdfDoc,
        form_schema,
        form.form_response,
        allSignatures
      );

      const pdfDocForm = modifiedPdfDoc.getForm();
      pdfDocForm.flatten();

      const finalPdfBytes = await modifiedPdfDoc.save();

      // Return PDF directly as binary data
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${form.form_type}_preview.pdf"`
      );
      res.setHeader("Content-Length", finalPdfBytes.length);

      console.log(
        `[PREVIEW_PDF] Generated PDF with ${
          Object.keys(allSignatures).length
        } signatures`
      );
      return res.send(Buffer.from(finalPdfBytes));
    }

    // No PDF available
    console.log(`[PREVIEW_PDF] No PDF data available for form ${formId}`);
    return res
      .status(400)
      .json({ error: "No PDF data available for this form" });
  } catch (error) {
    console.error("[PREVIEW_PDF] Error generating preview PDF:", error);
    res.status(500).json({
      error: "Failed to generate preview PDF",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Get finalized PDF with signatures (public endpoint for viewing completed PDFs)
router.get("/finalized-pdf/:formId", async (req, res) => {
  try {
    const { formId } = req.params;

    console.log(`[FINALIZED_PDF] Getting finalized PDF for form: ${formId}`);

    // Get form data
    const form = await getForm(
      formId,
      supabaseAnon as ReturnType<typeof createClient>
    );
    if (!form) {
      console.log(`[FINALIZED_PDF] Form ${formId} not found`);
      return res.status(404).json({ error: "Form not found" });
    }

    if (!form.finalized_pdf) {
      console.log(`[FINALIZED_PDF] Form ${formId} has no finalized PDF`);
      return res
        .status(404)
        .json({ error: "No finalized PDF available for this form" });
    }

    console.log(
      `[FINALIZED_PDF] Found finalized PDF: ${form.finalized_pdf}`
    );

    // Try to get signed URL from different possible storage locations
    const { getSignedUrl } = await import("../../logic/file-upload-logic");
    let signedUrlResult = await getSignedUrl(form.finalized_pdf);

    // If that fails, try with the supabaseService client which might have different permissions
    if (!signedUrlResult.success) {
      console.log("[FINALIZED_PDF] Trying with service role client...");

      // Try different bucket names where finalized PDFs might be stored
      const buckets = ["pdf-uploads", "finalized-pdfs", "documents", "forms"];

      for (const bucketName of buckets) {
        try {
          console.log(`[FINALIZED_PDF] Checking bucket: ${bucketName}`);

          const { data: signedData, error: signedError } =
            await supabaseService.storage
              .from(bucketName)
              .createSignedUrl(form.finalized_pdf, 3600);

          if (!signedError && signedData?.signedUrl) {
            console.log(
              `[FINALIZED_PDF] Successfully got signed URL from ${bucketName}`
            );
            return res.json({ pdfUrl: signedData.signedUrl });
          }

          // Also try without the full path (just filename)
          const fileName =
            form.finalized_pdf.split("/").pop() || form.finalized_pdf;
          const { data: signedData2, error: signedError2 } =
            await supabaseService.storage
              .from(bucketName)
              .createSignedUrl(fileName, 3600);

          if (!signedError2 && signedData2?.signedUrl) {
            console.log(
              `[FINALIZED_PDF] Successfully got signed URL from ${bucketName} (filename only)`
            );
            return res.json({ pdfUrl: signedData2.signedUrl });
          }
        } catch (err) {
          console.log(
            `[FINALIZED_PDF] Error checking bucket ${bucketName}:`,
            err
          );
        }
      }
    } else {
      console.log(`[FINALIZED_PDF] Generated signed URL successfully`);
      return res.json({ pdfUrl: signedUrlResult.url });
    }

    // If we get here, we couldn't generate a signed URL
    console.error(
      `[FINALIZED_PDF] Failed to generate signed URL for finalized PDF`
    );
    return res
      .status(500)
      .json({ error: "Failed to generate URL for finalized PDF" });
  } catch (error) {
    console.error("[FINALIZED_PDF] Error getting finalized PDF:", error);
    res.status(500).json({
      error: "Failed to get finalized PDF",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Get bulk signature data for a deal (public endpoint for signature recipients)
router.get("/bulk/:dealId", async (req, res) => {
  try {
    const { dealId } = req.params;
    const { email } = req.query;

    console.log(
      `[BULK_SIGNATURE_ACCESS] Accessing bulk signatures for deal: ${dealId}, email: ${email}`
    );

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    // Get deal information
    const deal = await getDealById(dealId, supabaseAnon as any);
    if (!deal) {
      console.log(`[BULK_SIGNATURE_ACCESS] Deal ${dealId} not found`);
      return res.status(404).json({ error: "Deal not found" });
    }

    console.log(
      `[BULK_SIGNATURE_ACCESS] Deal found: ${
        deal.dealName || "Unnamed Deal"
      }`
    );

    // Get all deal options with their forms for this deal
    const dealOptions = await getAllDealOptionsWithForms(
      dealId,
      supabaseAnon as any
    );
    console.log(
      `[BULK_SIGNATURE_ACCESS] Found ${dealOptions.length} deal options`
    );

    const bulkSignatureForms = [];

    // Process each deal option's forms
    for (const dealOption of dealOptions) {
      if (dealOption.forms && dealOption.forms.length > 0) {
        console.log(
          `[BULK_SIGNATURE_ACCESS] Processing ${dealOption.forms.length} forms from deal option`
        );

        for (const form of dealOption.forms) {
          // Get signature collections for this form and email
          const { data: signatureCollections, error: collectionsError } =
            await supabaseAnon
              .from("signature_collections")
              .select("*")
              .eq("form_id", (form as any).id)
              .eq("action_email", email);

          if (collectionsError) {
            console.error(
              `[BULK_SIGNATURE_ACCESS] Error fetching signature collections for form ${
                (form as any).id
              }:`,
              collectionsError
            );
            continue;
          }

          console.log(
            `[BULK_SIGNATURE_ACCESS] Found ${
              signatureCollections.length
            } signature collections for form ${(form as any).id}`
          );

          // For each signature collection, create a form entry
          for (const collection of signatureCollections) {
            // Check if already signed (has signature data)
            const signed =
              collection.signature_data &&
              Object.keys(collection.signature_data).length > 0 &&
              Object.values(collection.signature_data).some(
                (value: any) => value && value.length > 0
              );

            const formData = form as any;
            bulkSignatureForms.push({
              id: formData.id,
              form_name:
                formData.form_name ||
                `${formData.form_type || "Form"} (${formData.id.slice(0, 8)})`,
              form_type: formData.form_type || "custom",
              signatureCollectionId: collection.id,
              signed: signed,
              signerEmail: collection.action_email,
              displayName: "Signature", // Could be enhanced to get field display name
              actionAs: collection.actionAs,
            });

            console.log(
              `[BULK_SIGNATURE_ACCESS] Added form ${formData.id} (${collection.id}) - signed: ${signed}`
            );
          }
        }
      }
    }

    const response = {
      dealId,
      dealName: deal.dealName || "Deal",
      forms: bulkSignatureForms,
      recipientEmail: email as string,
      recipientName: (email as string)
        .split("@")[0]
        .split(/[._-]/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log(
      `[BULK_SIGNATURE_ACCESS] Returning ${bulkSignatureForms.length} forms for `
    );
    res.json(response);
  } catch (error) {
    console.error(
      "[BULK_SIGNATURE_ACCESS] Error fetching bulk signature data:",
      error
    );
    res.status(500).json({
      error: "Failed to fetch bulk signature data",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
