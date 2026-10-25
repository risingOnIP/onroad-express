import { lightningSchemas } from "./centralIntelligence/centralIntelligence";
import { SIDE, DEAL_TYPE } from "./centralIntelligence/centralIntelligence";
import { Schema } from "../../types/realtor";

export function getLightningSchema(side: SIDE, dealType: DEAL_TYPE) {
    return lightningSchemas[side][dealType] as Schema;
} 