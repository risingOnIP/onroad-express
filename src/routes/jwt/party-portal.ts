import { Router } from "express";
import { supabaseAnon, supabase, supabaseService } from "../../config/supabase";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import {
  getDealOption,
  getPropertyImageSignedUrls,
} from "../../logic/realtor/dealOption-logic";
import { didAllSignersSignBeforeStep } from "../../logic/jwt/signing-logic";
import { SignerAssignment } from "../../types/realtor";

const router = Router();
const SIGN_JWT_SECRET = process.env.SIGNING_JWT_SECRET!;

function signToken(email: string, dealId: string, clientId: string) {
  return jwt.sign(
    { email, dealId, clientId }, // payload
    SIGN_JWT_SECRET,
    { expiresIn: "24h" } // 24-hour TTL for client portal access
  );
}

// Request OTP for client portal access
router.post("/:dealId/:clientId/otp/request", async (req, res) => {
  const { dealId, clientId } = req.params;

  try {
    // Verify client is associated with this deal
    const { data: dealClient, error: dealClientError } = await supabase
      .from("deals_parties")
      .select("party_id")
      .eq("deal_id", dealId)
      .eq("party_id", clientId)
      .single();

    if (dealClientError || !dealClient) {
      console.log("Deal client not found in party-portal.ts", dealClientError);
      return res
        .status(404)
        .json({ error: "Access not authorized for this deal" });
    }

    // Get client email
    const { data: client, error: clientError } = await supabase
      .from("parties")
      .select("email")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      console.log("Client not found in party-portal.ts", clientError);
      return res.status(404).json({ error: "Client not found" });
    }

    const clientEmail = client.email;

    // Send OTP
    const { error: otpErr } = await supabase.auth.signInWithOtp({
      email: clientEmail,
      options: { shouldCreateUser: true },
    });

    if (otpErr) {
      console.log("Error sending OTP", otpErr);
      return res.status(500).json({ error: otpErr.message });
    }

    res.json({
      ok: true,
      email: clientEmail, // Return email so frontend knows what email OTP was sent to
    });
  } catch (error) {
    console.error("Error requesting OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP for client portal access
router.post("/:dealId/:clientId/otp/verify", async (req, res) => {
  const { dealId, clientId } = req.params;
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  try {
    // Verify client is associated with this deal
    const { data: dealClient, error: dealClientError } = await supabase
      .from("deals_parties")
      .select("party_id")
      .eq("deal_id", dealId)
      .eq("party_id", clientId)
      .single();

    if (dealClientError || !dealClient) {
      return res
        .status(404)
        .json({ error: "Access not authorized for this deal" });
    }

    // Get client email and verify it matches
    const { data: client, error: clientError } = await supabase
      .from("parties")
      .select("email")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Verify the email matches the client record
    if (client.email !== email) {
      return res
        .status(403)
        .json({ error: "Email does not match client record" });
    }

    // Verify OTP
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error || !data.session) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    const token = signToken(email, dealId, clientId);
    res.json({ token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Get client portal data for a deal
router.get("/:dealId/:clientId", async (req, res) => {
  const { dealId, clientId } = req.params;
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
      email: string;
      dealId: string;
      clientId: string;
    };

    if (payload.dealId !== dealId || payload.clientId !== clientId) {
      return res.status(403).json({ error: "Invalid deal access" });
    }

    // Get deal information
    const { data: dealData, error: dealError } = await supabase
      .from("deals")
      .select("*")
      .eq("id", dealId)
      .single();

    if (dealError || !dealData) {
      return res.status(404).json({ error: "Deal not found" });
    }

    // Check if client is a deal party (has null deal_option_id) or deal option party
    const { data: clientAccess, error: clientAccessError } = await supabase
      .from("deals_parties")
      .select("deal_option_id")
      .eq("party_id", clientId)
      .eq("deal_id", dealId)
      .single();

    if (clientAccessError) {
      console.error("Error fetching client access:", clientAccessError);
    }

    // If client is a deal party (deal_option_id is null), they can see all deal options
    // If client is a deal option party (deal_option_id is not null), they can only see their specific deal option
    const isDealParty = !clientAccess?.deal_option_id;
    const specificDealOptionId = clientAccess?.deal_option_id;

    // Get deal options for this deal with property information
    let dealOptionsQuery = supabase
      .from("dealOptions")
      .select("id, address, property_information_response, created_at")
      .eq("deal_id", dealId);

    // Only filter if client is a deal option party (not a deal party)
    if (!isDealParty && specificDealOptionId) {
      dealOptionsQuery = dealOptionsQuery.eq("id", specificDealOptionId);
    }

    const { data: dealOptions, error: dealOptionsError } =
      await dealOptionsQuery;

    if (dealOptionsError) {
      console.error("Error fetching deal options:", dealOptionsError);
    }
    console.log(
      "Deal options found for client:",
      dealOptions?.length || 0,
      "isDealParty:",
      isDealParty
    );

    // Get all client intake forms for this client/deal
    const { data: allClientIntakes, error: intakeError } = await supabase
      .from("party_intakes")
      .select("id, created_at, party_response, partyrole_partynumber")
      .eq("deal_id", dealId)
      .eq("email", payload.email)
      .eq("form_visible", true);

    if (intakeError) {
      console.error("Error fetching client intakes:", intakeError);
    }
    console.log("All client intakes found:", allClientIntakes?.length || 0);

    // Helper function to check if an intake has been submitted (has meaningful responses)
    const hasSubmittedResponse = (party_response: any): boolean => {
      if (!party_response || typeof party_response !== 'object') return false;
      return Object.values(party_response).some(value => 
        value !== null && value !== undefined && value !== '' && value !== '{}'
      );
    };

    // Filter for pending intakes (not submitted)
    const pendingIntakes = allClientIntakes?.filter(intake => 
      !hasSubmittedResponse(intake.party_response)
    ) || [];

    // Filter for completed intakes (submitted)
    const completedIntakes = allClientIntakes?.filter(intake => 
      hasSubmittedResponse(intake.party_response)
    ) || [];

    // Calculate total published intakes
    const totalPublishedIntakes = (allClientIntakes?.length || 0);
    const hasPublishedIntakes = totalPublishedIntakes > 0;

    console.log("Total published intakes:", totalPublishedIntakes);
    console.log("Pending intakes found:", pendingIntakes.length);
    console.log("Completed intakes found:", completedIntakes.length);

    // Transform pending intakes to include form name
    const transformedIntakes =
      pendingIntakes?.map((intake) => ({
        id: intake.id,
        created_at: intake.created_at,
        party_response: intake.party_response,
        form_name: intake.partyrole_partynumber || "Client Intake Form",
      })) || [];

    // Get signature collections for this client/deal
    const { data: signatures, error: sigError } = await supabase
      .from("signature_collections")
      .select(
        `
        id,
        created_at,
        action_email,
        signature_data,
        forms!inner(
          id,
          dealOptions!inner(
            deal_id
          )
        )
      `
      )
      .eq("action_email", payload.email)
      .eq("forms.dealOptions.deal_id", dealId)
      .is("signature_data", null); // Only get pending signatures

    if (sigError) {
      console.error("Error fetching signatures:", sigError);
    }
    console.log("Signatures found:", signatures?.length || 0);

    // Transform signatures to include form names
    const transformedSignatures =
      signatures?.map((sig) => ({
        id: sig.id,
        created_at: sig.created_at,
        finalized: sig.signature_data ? true : false,
        form_names: ["Signature Required"], // Simplified for now
      })) || [];

    // Log the access control information for debugging
    console.log("Client access analysis:", {
      clientId,
      isDealParty,
      specificDealOptionId,
    });

    // Get all signature collections for this deal (for view-only access)
    const { data: allSignatureCollections, error: sigCollError } =
      await supabase.from("signature_collections").select(`
        id,
        created_at,
        action_email,
        signature_data,
        actionAs,
        form_id
      `); // Get all signature collections (completed and pending)

    if (sigCollError) {
      console.error("Error fetching signature collections:", sigCollError);
    }

    console.log(
      "All signature collections found:",
      allSignatureCollections?.length || 0
    );
    console.log(
      "Sample signature collections:",
      allSignatureCollections?.slice(0, 3)
    );

    // Get all forms with their deal options
    let formsQuery = supabase
      .from("forms")
      .select(
        `
        id,
        form_type,
        finalized_pdf,
        created_at,
        deal_option_id,
        dealOptions!inner(
          id,
          deal_id,
          address
        )
      `
      )
      .eq("dealOptions.deal_id", dealId);

    // Only filter if client is a deal option party (not a deal party)
    if (!isDealParty && specificDealOptionId) {
      formsQuery = formsQuery.eq("deal_option_id", specificDealOptionId);
    }

    const { data: allForms, error: formsError } = await formsQuery;

    if (formsError) {
      console.error("Error fetching forms:", formsError);
    }
    console.log("Forms found:", allForms?.length || 0);

    // Create a map of signature collections by form_id for easy lookup
    const signaturesByFormId = new Map();
    allSignatureCollections?.forEach((sig) => {
      if (!signaturesByFormId.has(sig.form_id)) {
        signaturesByFormId.set(sig.form_id, []);
      }
      signaturesByFormId.get(sig.form_id).push(sig);
    });

    // Transform forms data with signature information
    const formsWithSignatures =
      allForms?.map((form) => {
        const signatures = signaturesByFormId.get(form.id) || [];
        const userSignature = signatures.find(
          (sig: any) => sig.action_email === payload.email
        );

        console.log(
          `Form ${form.id} (${form.form_type}) has ${signatures.length} signatures:`,
          signatures.map((s: any) => ({ id: s.id, email: s.action_email }))
        );

        return {
          ...form,
          signatures: signatures,
          userSignature: userSignature,
          isUserSigner: !!userSignature,
          hasSignatures: signatures.length > 0,
        };
      }) || [];

    // Separate completed and in-progress forms
    const completedForms = formsWithSignatures.filter(
      (form) => form.finalized_pdf
    );
    const inProgressForms = formsWithSignatures.filter(
      (form) => form.hasSignatures && !form.finalized_pdf
    );

    console.log("Portal data response:", {
      dealId: dealData.id,
      dealOptions: dealOptions?.length || 0,
      pendingIntakes: pendingIntakes?.length || 0,
      pendingSignatures: transformedSignatures?.length || 0,
      completedForms: completedForms?.length || 0,
      inProgressForms: inProgressForms?.length || 0,
      clientEmail: payload.email,
      intakeStatus: {
        hasPublishedIntakes,
        totalPublishedIntakes,
        pendingCount: pendingIntakes.length,
        completedCount: completedIntakes.length,
      },
    });

    res.json({
      deal: dealData,
      dealOptions: dealOptions || [],
      pendingIntakes: transformedIntakes,
      pendingSignatures: transformedSignatures,
      formsData: {
        completed: completedForms,
        inProgress: inProgressForms,
      },
      clientEmail: payload.email,
      intakeStatus: {
        hasPublishedIntakes,
        totalPublishedIntakes,
        pendingCount: pendingIntakes.length,
        completedCount: completedIntakes.length,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Session expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid session" });
    }
    console.error("Error fetching client portal data:", error);
    res.status(500).json({ error: "Failed to fetch portal data" });
  }
});

// Get property images for a specific deal option
router.get(
  "/:dealId/:clientId/deal-option/:dealOptionId/images",
  async (req, res) => {
    const { dealId, clientId, dealOptionId } = req.params;
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
        email: string;
        dealId: string;
        clientId: string;
      };

      if (payload.dealId !== dealId || payload.clientId !== clientId) {
        return res.status(403).json({ error: "Invalid deal access" });
      }

      // Check if client is a deal party or deal option party
      const { data: clientAccess, error: accessError } = await supabase
        .from("deals_parties")
        .select("deal_option_id")
        .eq("party_id", clientId)
        .eq("deal_id", dealId)
        .single();

      if (accessError) {
        console.error("Error checking client access:", accessError);
        return res.status(500).json({ error: "Failed to verify access" });
      }

      // If client is a deal party (deal_option_id is null), they can see all deal options
      // If client is a deal option party, they can only see their specific deal option
      const isDealParty = !clientAccess?.deal_option_id;
      const specificDealOptionId = clientAccess?.deal_option_id;

      // Only restrict access if client is a deal option party
      if (
        !isDealParty &&
        specificDealOptionId &&
        specificDealOptionId !== dealOptionId
      ) {
        return res
          .status(403)
          .json({ error: "Access denied to this property" });
      }

      // Get deal option to retrieve image paths
      const dealOption = await getDealOption(
        dealOptionId,
        supabaseService as any
      );

      if (!dealOption || dealOption.deal_id !== dealId) {
        return res.status(404).json({ error: "Deal option not found" });
      }

      const imagePaths =
        Array.isArray(dealOption.property_images) &&
        dealOption.property_images.every((item) => typeof item === "string")
          ? (dealOption.property_images as string[])
          : [];

      if (imagePaths.length === 0) {
        return res.json({});
      }

      // Get signed URLs for all images
      const signedUrls = await getPropertyImageSignedUrls(
        imagePaths,
        supabaseService as any
      );

      res.json(signedUrls);
    } catch (error) {
      console.error("Error fetching property images:", error);
      res.status(500).json({ error: "Failed to fetch property images" });
    }
  }
);

// Get PDF URL for client portal access
router.get("/:dealId/:clientId/pdf/:pdfFileName", async (req, res) => {
  const { dealId, clientId, pdfFileName } = req.params;
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
      email: string;
      dealId: string;
      clientId: string;
    };

    if (payload.dealId !== dealId || payload.clientId !== clientId) {
      return res.status(403).json({ error: "Invalid deal access" });
    }

    // Verify the PDF belongs to a form in this deal and the client has access
    const { data: formCheck, error: formError } = await supabase
      .from("forms")
      .select(
        `
        finalized_pdf,
        dealOptions!inner(
          deal_id
        )
      `
      )
      .eq("finalized_pdf", pdfFileName)
      .eq("dealOptions.deal_id", dealId)
      .single();

    if (formError || !formCheck) {
      return res.status(404).json({ error: "PDF not found or not accessible" });
    }

    // Import the getSignedUrl function
    const { getSignedUrl } = await import("../../logic/file-upload-logic");

    // Get signed URL for the PDF
    console.log("Attempting to get signed URL for PDF:", pdfFileName);
    console.log(
      "Form check result - finalized_pdf field:",
      formCheck.finalized_pdf
    );

    // Try to find the PDF in different possible locations
    let signedUrlResult = await getSignedUrl(pdfFileName);

    console.log("Signed URL result for direct path:", signedUrlResult);

    // If not found, try some alternative paths and buckets
    if (!signedUrlResult.success) {
      console.log("Trying alternative storage approaches...");

      // Try different bucket names
      const buckets = ["pdf-uploads", "finalized-pdfs", "documents", "forms"];
      for (const bucketName of buckets) {
        try {
          console.log(`Checking bucket: ${bucketName}`);
          const { data: listData, error: listError } =
            await supabaseService.storage
              .from(bucketName)
              .list("", { limit: 100 });

          if (!listError && listData) {
            console.log(
              `Files in ${bucketName}:`,
              listData.map((f) => f.name)
            );

            // Check if our file exists in this bucket
            const foundFile = listData.find(
              (f) =>
                f.name === pdfFileName ||
                f.name.includes(pdfFileName.replace("_finalized.pdf", ""))
            );
            if (foundFile) {
              console.log(
                `Found potential match in ${bucketName}:`,
                foundFile.name
              );
              // Try to get signed URL from this bucket
              const { data: signedData, error: signedError } =
                await supabaseService.storage
                  .from(bucketName)
                  .createSignedUrl(foundFile.name, 3600);

              if (!signedError && signedData?.signedUrl) {
                console.log(`Successfully got signed URL from ${bucketName}`);
                signedUrlResult = { success: true, url: signedData.signedUrl };
                break;
              }
            }
          }
        } catch (err) {
          console.log(`Error checking bucket ${bucketName}:`, err);
        }
      }
    }

    // Check if the signed URL generation was successful
    if (!signedUrlResult.success || !signedUrlResult.url) {
      console.error("Failed to generate signed URL:", signedUrlResult.error);
      return res
        .status(500)
        .json({ error: signedUrlResult.error || "Failed to generate PDF URL" });
    }

    console.log("Returning signed URL:", signedUrlResult.url);
    res.json({ url: signedUrlResult.url });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Session expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid session" });
    }
    console.error("Error fetching PDF URL:", error);
    res.status(500).json({ error: "Failed to fetch PDF URL" });
  }
});

router.post("/is-current-step-signer/:formId", async (req, res) => {
  console.log("[PARTY_PORTAL] ====== IS CURRENT STEP SIGNER CHECK ======");
  console.log("[PARTY_PORTAL] is current step signer route called");
  const { formId } = req.params;
  const { email } = req.body;
  console.log(`[PARTY_PORTAL] Checking if email ${email} can sign form ${formId}`);

  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
      email: string;
      dealId: string;
      clientId: string;
    };

    const { data: form, error: formError } = (await supabase
      .from("forms")
      .select("signature_sequence")
      .eq("id", formId)
      .single()) as {
      data: { signature_sequence: SignerAssignment[][] };
      error: any;
    };

    if (formError) {
      return res.status(500).json({ error: formError.message });
    }

    let step: number | undefined;
    console.log("[PARTY_PORTAL] Looking for email in signature sequence: ", email);
    console.log("[PARTY_PORTAL] Signature sequence:", JSON.stringify(form.signature_sequence, null, 2));
    
    form.signature_sequence.forEach(
      (signerAssignment: SignerAssignment[], stepIndex: number) => {
        console.log(`[PARTY_PORTAL] Checking step ${stepIndex + 1}:`, signerAssignment);
        signerAssignment.forEach((signer) => {
          console.log(`[PARTY_PORTAL] Signer in step ${stepIndex + 1}: email=${signer.email}, row_uuid=${signer.row_uuid}, actionAs=${signer.actionAs}`);
          if (signer.email === email) {
            step = stepIndex + 1;
            console.log(`[PARTY_PORTAL] Found email ${email} in step ${step}`);
          }
        });
      }
    );

    console.log('step was set to: ', step)

    if (step === undefined) {
      console.log(`[PARTY_PORTAL] Email ${email} not found in signature sequence`);
      
      // Check if this is a delegated signer who needs to be checked differently
      console.log(`[PARTY_PORTAL] Checking if ${email} is a delegated signer...`);
      const { data: delegationMappings, error: delegationError } = await supabase
        .from("delegation_mappings")
        .select(`
          *,
          delegator_collections:signature_collections!delegation_mappings_delegator_signature_collection_id_fkey(
            id,
            form_id,
            action_email
          )
        `)
        .eq("delegated_to_email", email)
        .eq("delegation_status", "pending");
      
      if (delegationMappings && delegationMappings.length > 0) {
        console.log(`[PARTY_PORTAL] ${email} is a DELEGATED SIGNER!`);
        console.log(`[PARTY_PORTAL] Delegation details:`, JSON.stringify(delegationMappings, null, 2));
        
        // For delegated signers, we need to find the step of their DELEGATOR
        const delegatorCollection = delegationMappings[0].delegator_collections;
        if (delegatorCollection && delegatorCollection.form_id === formId) {
          // Find the delegator's step
          form.signature_sequence.forEach(
            (signerAssignment: SignerAssignment[], stepIndex: number) => {
              signerAssignment.forEach((signer) => {
                if (signer.row_uuid === delegatorCollection.id) {
                  step = stepIndex + 1;
                  console.log(`[PARTY_PORTAL] Found delegator's step: ${step}`);
                }
              });
            }
          );
          
          if (step !== undefined) {
            console.log(`[PARTY_PORTAL] Delegated signer ${email} inherits step ${step} from delegator`);
          }
        }
      }
      
      console.log('in current step signer check, step is: ', step)
      if (step === undefined) {
//not signer or delegator (just viewer party)
console.log('going to send: false')
        return res.json(false); 

      }
    }


    console.log(`[PARTY_PORTAL] About to call didAllSignersSignBeforeStep for step ${step}`);
    const canSign = await didAllSignersSignBeforeStep(
      formId,
      step,
      supabaseAnon as ReturnType<typeof createClient>
    );

    console.log("[PARTY_PORTAL] RESULT - email: ", email);
    console.log("[PARTY_PORTAL] RESULT - step: ", step);
    console.log("[PARTY_PORTAL] RESULT - formId: ", formId);
    console.log("[PARTY_PORTAL] RESULT - canSign: ", canSign);
    console.log(`[PARTY_PORTAL] ====== RETURNING ${canSign ? 'TRUE' : 'FALSE'} ======`);
    res.json(canSign );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Authentication failed" });
  }
});

// New endpoint to get user's action type (signer or delegator)
router.post("/get-user-action-type/:formId", async (req, res) => {
  console.log("get user action type route called");
  const { formId } = req.params;
  const { email } = req.body;

  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, SIGN_JWT_SECRET) as {
      email: string;
      dealId: string;
      clientId: string;
    };

    const { data: form, error: formError } = (await supabase
      .from("forms")
      .select("signature_sequence")
      .eq("id", formId)
      .single()) as {
      data: { signature_sequence: SignerAssignment[][] };
      error: any;
    };

    if (formError) {
      return res.status(500).json({ error: formError.message });
    }

    let actionAs: string | undefined;
    form.signature_sequence.forEach(
      (signerAssignment: SignerAssignment[], stepIndex: number) => {
        signerAssignment.forEach((signer) => {
          if (signer.email === email) {
            actionAs = signer.actionAs;
          }
        });
      }
    );

    if (actionAs === undefined) {
      // Check if this is a delegated signer
      const { data: delegationMappings, error: delegationError } = await supabase
        .from("delegation_mappings")
        .select("*")
        .eq("delegated_to_email", email)
        .eq("delegation_status", "pending");
      
      if (delegationMappings && delegationMappings.length > 0) {
        // Delegated signers are always "signer" type
        actionAs = "signer";
        console.log(`[GET_USER_ACTION_TYPE] ${email} is a delegated signer, returning actionAs: "signer"`);
      } else {
        return res
          .json("viewer");
      }
    }

    res.json({ actionAs });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.status(500).json({ error: "Authentication failed" });
  }
});

export default router;
