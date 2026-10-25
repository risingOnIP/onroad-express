import { Router } from "express";
import { ALL_SCHEMAS } from "../../logic/realtor/centralIntelligence/centralIntelligence";
import { Schema } from "../../types/realtor";
import { getFormSchemaKey, getFormMapping } from "../forms/pdf-templates";
import { createClient } from "@supabase/supabase-js";
import { authMiddleware } from "../../middleware/auth";

const router = Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.get("/all", authMiddleware, async (req, res) => {
  console.log("=== BACKEND: /api/realtor/schema/all CALLED ===");
  console.log("Request headers:", req.headers);
  console.log("Auth header present:", !!req.headers.authorization);
  console.log("User from request:", (req as any).user);

  try {
    const realtorId = req.user?.sub;
    
    // Start with all schemas
    let filteredSchemas = { ...ALL_SCHEMAS };
    
    if (realtorId) {
      // Check if realtor has a broker tether
      const { data: tether, error: tetherError } = await supabase
        .from('brokerRealtorTether')
        .select('broker_id')
        .eq('realtor_id', realtorId)
        .eq('status', 'accepted')
        .single();
      
      if (!tether || tetherError) {
        console.log("Realtor has no broker tether - removing all TAR forms");
        
        // Remove all TAR forms if no broker tether
        for (const schemaKey of Object.keys(filteredSchemas)) {
          // Extract form type from schema key (they typically match or have _schema suffix)
          const formType = schemaKey.replace('_schema', '');
          const formMapping = getFormMapping(formType);
          
          if (formMapping && formMapping.orgCreated === 'TAR') {
            console.log(`Removing TAR form: ${schemaKey}`);
            delete filteredSchemas[schemaKey];
          }
        }
      } else {
        console.log(`Realtor has broker tether with broker_id: ${tether.broker_id}`);
        
        // Get list of TAR forms uploaded by broker
        const { data: brokerForms, error: brokerFormsError } = await supabase
          .from('brokerForms')
          .select('form_type')
          .eq('broker_id', tether.broker_id)
          .eq('org_name', 'TAR');
        
        if (!brokerFormsError && brokerForms) {
          const uploadedFormTypes = new Set(brokerForms.map(f => f.form_type));
          console.log(`Broker has uploaded ${uploadedFormTypes.size} TAR forms:`, Array.from(uploadedFormTypes));
          
          // Remove TAR forms that broker hasn't uploaded
          for (const schemaKey of Object.keys(filteredSchemas)) {
            const formType = schemaKey.replace('_schema', '');
            const formMapping = getFormMapping(formType);
            
            if (formMapping && formMapping.orgCreated === 'TAR') {
              if (!uploadedFormTypes.has(formType)) {
                console.log(`Removing TAR form not uploaded by broker: ${schemaKey}`);
                delete filteredSchemas[schemaKey];
              }
            }
          }
        } else {
          console.log("Error fetching broker forms or no forms found - removing all TAR forms");
          
          // If error fetching broker forms, remove all TAR forms
          for (const schemaKey of Object.keys(filteredSchemas)) {
            const formType = schemaKey.replace('_schema', '');
            const formMapping = getFormMapping(formType);
            
            if (formMapping && formMapping.orgCreated === 'TAR') {
              delete filteredSchemas[schemaKey];
            }
          }
        }
      }
    }
    
    const schemaKeys = Object.keys(filteredSchemas);
    console.log(`Filtered schemas has ${schemaKeys.length} entries:`, schemaKeys);

    res.json(filteredSchemas);
    console.log("Successfully sent filtered schemas response");
    console.log("=== BACKEND: /api/realtor/schema/all END ===");
  } catch (error) {
    console.error("Error returning all schemas:", error);
    res.status(500).json({ error: "Failed to return all schemas" });
  }
});

//get all the schema for a specific form_type
router.get("/:form_type", (req, res) => {
  try {
    const { form_type } = req.params;
    const schemaKey = getFormSchemaKey(form_type);
    const returning = ALL_SCHEMAS[schemaKey] ?? ([] as Schema);
    returning.sort((a, b) => a.display_attributes.order - b.display_attributes.order);
    res.json(returning);
  } catch (error) {
    console.error("Error returning schema by FormType:", error);
    res.status(500).json({ error: "Failed to return schema byb formtype" });
  }
});

export default router;
