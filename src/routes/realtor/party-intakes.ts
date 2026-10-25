import { Router } from "express";
import { PartyIntake } from "../../types/realtor";
import {
  disableIntakeLink,
  enableIntakeLink,
  getAllPartyIntakes,
  getFileUploadUrls,
  getPartyIntakeById,
  savePartyIntakeSchema,
  updatePartyResponse,
  pushPartyIntakeAnswersToForms,
} from "../../logic/realtor/party-intakes-logic";

const router = Router();

// Get all party intakes for the authenticated user
router.get("/all/:dealId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const partyIntakes: PartyIntake[] = await getAllPartyIntakes(
      req.params.dealId,
      req.supabaseClient!
    );
    res.json(partyIntakes);
  } catch (error) {
    console.error("Error fetching party intakes:", error);
    res.status(500).json({ error: "Failed to fetch party intakes" });
  }
});

router.get("/id/:partyIntakeId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    console.log('party intake by id called')

    const partyIntake: PartyIntake = await getPartyIntakeById(
      req.params.partyIntakeId,
      req.supabaseClient!
    );
    if (!partyIntake) {
      return res.status(404).json({ error: "Party intake not found" });
    }
    res.json(partyIntake);
  } catch (error) {
    console.error("Error fetching party intake:", error);
    res.status(500).json({ error: "Failed to fetch party intake" });
  }
});

router.patch("/save/:partyIntakeId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { toSaveSchema } = req.body;
    const newlySaved = await savePartyIntakeSchema(
      toSaveSchema,
      req.params.partyIntakeId,
      req.supabaseClient!
    );

    if (!newlySaved) {
      return res.status(404).json({ error: "Problem with saving in database" });
    }

    res.json(newlySaved);
  } catch (error) {
    console.error("Error saving party intake schema:", error);
    res.status(500).json({ error: "Failed to save party intake schema" });
  }
});

  router.patch("/enable-link/:partyIntakeId", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const partyIntakeId = req.params.partyIntakeId; 
      const enabledIntake = await enableIntakeLink(
        partyIntakeId,
        req.supabaseClient!
      );
  
      res.json(enabledIntake);
    } catch (error) {
      console.error("Error saving party intake schema:", error);
      res.status(500).json({ error: "Failed to save party intake schema" });
    }
  });

  router.patch("/disable-link/:partyIntakeId", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const partyIntakeId = req.params.partyIntakeId; 
      const disabledIntake = await disableIntakeLink(
        partyIntakeId,
        req.supabaseClient!
      );
      
      res.json(disabledIntake)
    } catch (error) {
      console.error("Error saving party intake schema:", error);
      res.status(500).json({ error: "Failed to save party intake schema" });
    }
  });

  router.post('/uploaded-file-urls', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const {filepaths} = req.body as {filepaths: string[]};

      const fileUploadUrls: string[] = await getFileUploadUrls(filepaths, req.supabaseClient!);

      res.json(fileUploadUrls);
    } catch (error) {
      console.error("Error getting file upload url:", error);
      res.status(500).json({ error: "Failed to get file upload url" });
    }
  })

  router.post('/push-to-forms/:partyIntakeId', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const partyIntakeId = req.params.partyIntakeId;
      console.log("[API] Starting push party intake answers to forms for:", partyIntakeId);

      const results = await pushPartyIntakeAnswersToForms(
        partyIntakeId,
        req.supabaseClient!
      );

 

      res.json({
        success: true,
        message: "Party intake answers pushed to forms",
        
      });
    } catch (error) {
      console.error("[API] Error pushing party intake answers to forms:", error);
      res.status(500).json({ 
        success: false,
        error: "Failed to push party intake answers to forms",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });



export default router;
