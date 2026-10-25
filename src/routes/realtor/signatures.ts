import { Router } from "express";
import {
  generateSignatureCollection,
  generateSignedPdfUrl,
  getSignatureCollection,
  removeSignatureCollection,
  renewSignatureCollection,
  unfinalizeFormPdf,
  updateSignatureCollections,
} from "../../logic/realtor/signatures-logic";
import {
  SignatureCollection,
  AuditJson,
  SignerAssignment,
} from "../../types/realtor";
import { ALL_SCHEMAS } from "../../logic/realtor/centralIntelligence/centralIntelligence";
import { getFormSchemaKey, getFormDisplayName } from "../forms/pdf-templates";

const router = Router();

router.post("/solicit-signature/", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { solicitSignature } = req.body as {
      solicitSignature: Omit<
        SignatureCollection,
        "id" | "created_at" | "sender_id" | "signature_data"
      >;
    };
    const { form_id, actionAs, action_email, audit_json } = solicitSignature;
    const request_user_agent = req.headers["user-agent"] || "";
    const request_ip_address = req.ip || req.socket.remoteAddress || "";

    const signatureSaved: SignatureCollection =
      await generateSignatureCollection(
        form_id,
        actionAs,
        action_email,
        audit_json,
        request_user_agent,
        request_ip_address,
        req.user.sub,
        req.supabaseClient!
      );
    res.json(signatureSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/get-signature-collection/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const signatureCollection: SignatureCollection =
      await getSignatureCollection(id, req.supabaseClient!);
    res.json(signatureCollection);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.delete(
  "/remove-signature-collection/:signatureCollectionId",
  async (req, res) => {
    try {
      const { signatureCollectionId } = req.params;

      await unfinalizeFormPdf(signatureCollectionId, req.supabaseClient!);
      await removeSignatureCollection(
        signatureCollectionId,
        req.supabaseClient!
      );
      res.json({ message: "Signature collection removed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

router.get("/generate-signed-pdf-url/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const signedPdfUrl = await generateSignedPdfUrl(
      formId,
      req.supabaseClient!
    );
    res.json({ signedPdfUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Get all forms with signature information for a deal
router.get("/deal/:dealId/forms-with-signatures", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealId } = req.params;

    // This endpoint is no longer needed since we're getting the data directly
    // from the frontend using getDealOptionsWithForms
    res.status(410).json({
      error: "This endpoint has been deprecated",
      message: "Use getDealOptionsWithForms from the frontend instead",
    });
  } catch (error) {
    console.error("Error fetching forms with signatures:", error);
    res.status(500).json({
      error: "Failed to fetch forms with signatures",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Get schema by form type
router.get("/get-schema/:formType", async (req, res) => {
  try {
    const { formType } = req.params;
    const schemaKey = getFormSchemaKey(formType);
    const schema = ALL_SCHEMAS[schemaKey] ?? [];
    res.json(schema);
  } catch (error) {
    console.error("Error getting schema by form type:", error);
    res.status(500).json({ error: "Failed to get schema by form type" });
  }
});

// Update signature collections based on new signature sequence
// This route now handles saving sequences, updating collections, and sending emails
router.post("/update-signature-collections", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { formsData, dealId } = req.body as {
      formsData: Array<{
        formId: string;
        formName: string;
        signatureSequence: SignerAssignment[][];
      }>;
      dealId: string;
    };

    if (!formsData || !dealId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const returning = await updateSignatureCollections(
      formsData,
      dealId,
      req.supabaseClient!,
      req.user.sub,
      req.user.name || "Your Realtor",
      req
    );

    console.log("returning from update-signature-collections: ", returning);

    res.json(returning);
  } catch (error) {
    console.error("Error updating signature collections:", error);
    res.status(500).json({ error: "Failed to update signature collections" });
  }
});

// Note: send-signature-update-email route has been removed
// All functionality is now handled in /update-signature-collections

router.patch(
  "/renew-signature-collection/:signatureCollectionId",
  async (req, res) => {
    try {
      const { signatureCollectionId } = req.params;

      if (!signatureCollectionId) {
        return res
          .status(404)
          .json({ error: "Signature collection not found" });
      }

      await renewSignatureCollection(
        signatureCollectionId,
        req.supabaseClient!
      );

      res.json({ success: true, message: "Signature collection renewed" });
    } catch (error) {
      console.error("Error renewing signature collection:", error);
      res.status(500).json({ error: "Failed to renew signature collection" });
    }
  }
);
export default router;
