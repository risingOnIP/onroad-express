import { Router } from "express";
import multer from "multer";
import { supabaseAnon } from "../../config/supabase";
import { createClient } from "@supabase/supabase-js";
import { PartyIntake, PartyResponse } from "../../types/realtor";
// Removed JWT import - no longer using token authentication
import {
  getPartyIntakeById,
  updatePartyResponse,
  pushPartyIntakeAnswersToForms,
} from "../../logic/realtor/party-intakes-logic";

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
// Removed JWT secret - no longer using token authentication

// Removed JWT token generation - no longer needed for direct access

// Removed OTP request endpoint - direct access enabled

// Removed email endpoint - no longer needed for OTP flow

// Removed OTP verification endpoint - direct access enabled

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const partyIntake: PartyIntake = await getPartyIntakeById(
      id,
      supabaseAnon as ReturnType<typeof createClient>
    );

    res.json(partyIntake);
  } catch (error) {
    console.error("Error fetching client intake:", error);
    res.status(500).json({ error: "Failed to fetch client intake" });
  }
});

router.patch("/:id/update", upload.any(), async (req, res) => {
  const { id } = req.params;
  
  console.log("[PARTY INTAKE UPDATE] Received update request for intake ID:", id);
  console.log("[PARTY INTAKE UPDATE] Request body keys:", Object.keys(req.body));
  console.log("[PARTY INTAKE UPDATE] Number of files received:", (req.files as Express.Multer.File[])?.length || 0);
  
  try {
    // Parse party response from form data
    const partyResponse = JSON.parse(req.body.partyResponse) as PartyResponse;
    console.log("[PARTY INTAKE UPDATE] Parsed party response keys:", Object.keys(partyResponse));
    console.log("[PARTY INTAKE UPDATE] Party response values sample:", Object.entries(partyResponse).slice(0, 3));
    
    // Process files from multer
    const fileUploadResponse: Record<string, File[]> = {};
    const files = (req.files as Express.Multer.File[]) || [];
    
    // Group files by field ID
    const filesByField: Record<string, Express.Multer.File[]> = {};
    files.forEach((file) => {
      const fieldIdMatch = file.fieldname.match(/^file_(.+)_\d+$/);
      if (fieldIdMatch) {
        const fieldId = fieldIdMatch[1];
        if (!filesByField[fieldId]) {
          filesByField[fieldId] = [];
        }
        filesByField[fieldId].push(file);
      }
    });
    
    console.log("[PARTY INTAKE UPDATE] Files grouped by field:", Object.keys(filesByField));
    
    // Convert multer files to File-like objects for the logic function
    Object.entries(filesByField).forEach(([fieldId, multerFiles]) => {
      fileUploadResponse[fieldId] = multerFiles.map((multerFile) => {
        // Create a File-like object that works with the existing logic
        const fileObj = {
          name: multerFile.originalname,
          type: multerFile.mimetype,
          arrayBuffer: async () => multerFile.buffer.buffer.slice(multerFile.buffer.byteOffset, multerFile.buffer.byteOffset + multerFile.buffer.byteLength),
        } as File;
        return fileObj;
      });
    });

    console.log("[PARTY INTAKE UPDATE] Calling updatePartyResponse with intake ID:", id);
    const updatedPartyIntake = await updatePartyResponse(
      id,
      partyResponse,
      fileUploadResponse,
      supabaseAnon as ReturnType<typeof createClient>
    );
    console.log("[PARTY INTAKE UPDATE] updatePartyResponse completed successfully");

    // Auto-push to forms after successful response update
    try {
      console.log("[AUTO-PUSH] Attempting to push party intake answers to forms for:", id);
     await pushPartyIntakeAnswersToForms(
        id,
        supabaseAnon as ReturnType<typeof createClient>
      );
      
      // Include push results in response
      res.json({
        ...updatedPartyIntake,
      });
    } catch (pushError) {
      console.error("[AUTO-PUSH] Failed to push answers to forms:", pushError);
      // Still return the updated intake even if push fails
      res.json({
        ...updatedPartyIntake,
        pushResults: {
          success: false,
          error: pushError instanceof Error ? pushError.message : "Auto-push failed",
          createdCount: 0,
          updatedCount: 0,
          errorCount: 1
        }
      });
    }
  } catch (error) {
    console.error("Error updating client intake:", error);
    res.status(500).json({ error: "Failed to update client intake response" });
  }
});

export default router;
