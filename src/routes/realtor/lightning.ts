import { Router } from "express";
import { getLightningSchema } from "../../logic/realtor/lightning-logic";
import { DEAL_TYPE, SIDE } from "../../logic/realtor/centralIntelligence/centralIntelligence";
import { Schema } from "../../types/realtor";

const router = Router();

router.get("/:side/:dealType", (req, res) => {
  const { side, dealType } = req.params as { side: SIDE, dealType: DEAL_TYPE };
  const schema : Schema = getLightningSchema(side, dealType);
  res.send(schema);
});

export default router;