import { Router } from "express";
import { Schema } from "../../types/realtor";
import { getIntakeSchemaAnswers, getPublishedIntakeSchema, updateIntakeSchemaAnswersIndividualValue } from "../../logic/party/intake-logic";

const router = Router();

router.get('/schema/:searchId', async (req, res) => {
  try {
    const {searchId} = req.params; 
    const returning : Schema = await getPublishedIntakeSchema(searchId, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /intake/schema/:searchId; failed to get schema by searchId"});
  }
})

router.get('/answers/get/:searchId', async (req, res) => {
  try {
    const {searchId} = req.params; 
    const returning : Record<string, string> = await getIntakeSchemaAnswers(searchId, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /intake/answers/:searchId; failed to get answers by searchId"});
  }
})

router.patch('/answers/update-value/:searchId', async (req, res) => {
    try {
        const {searchId} = req.params; 
        const {itemKey, newValue} = req.body; 
        const returning : Record<string, string> = await updateIntakeSchemaAnswersIndividualValue(searchId, itemKey, newValue, req.supabaseClient!);
        res.json(returning);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: "Error: /intake/answers/update-value/:searchId; failed to update answers by searchId"});
    }
    })

export default router; 