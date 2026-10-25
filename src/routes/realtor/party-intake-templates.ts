import { Router, Request, Response } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { updateClientIntakeTemplate, getClientIntakeTemplateSchema , updateSchemaItem, addSchemaItemToTemplate, getPartyIntakeTemplates, createDefaultTemplatesForUser, addClientIntakeTemplate, getAllSchemasForTemplate, saveClientIntakeTemplateSchema } from '../../logic/realtor/party-intake-template-logic';
import { randomUUID } from 'crypto';
import { SchemaItem, PartyIntakeTemplate, PartyIntakeSchema } from '../../types/realtor';

const router = Router();

type SchemaType = 'buyer1_schema' | 'buyer2_schema' | 'seller1_schema' | 'seller2_schema';

router.patch('/update-template/:templateId/:schemaType', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId, schemaType } = req.params;
        const { newSchema } = req.body;
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!['buyer1_schema', 'buyer2_schema', 'seller1_schema', 'seller2_schema'].includes(schemaType)) {
            return res.status(400).json({ error: 'Invalid schema type' });
        }

        const updatedTemplate = await updateClientIntakeTemplate(templateId, newSchema, userId, req.supabaseClient!, schemaType as SchemaType);

        res.json(updatedTemplate as unknown as PartyIntakeTemplate);
    }
    catch (error) {
        console.error('Error updating client intake template:', error);
        res.status(500).json({ error: 'Failed to update client intake template' });
    }
});

router.get('/get-template/:templateId/:schemaType', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId, schemaType } = req.params;
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!['buyer1_schema', 'buyer2_schema', 'seller1_schema', 'seller2_schema'].includes(schemaType)) {
            return res.status(400).json({ error: 'Invalid schema type' });
        }

        const templateSchema: PartyIntakeSchema = await getClientIntakeTemplateSchema(templateId, userId, req.supabaseClient!, schemaType as SchemaType);

        res.json(templateSchema);
    }
    catch (error) {
        console.error('Error getting client intake template schema:', error);
        res.status(500).json({ error: 'Failed to get client intake template schema' });
    }
});

router.patch('/update-schema-item/:templateId/:schemaType', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId, schemaType } = req.params;
        const { schemaItem } = req.body;
        const userId = req.user?.sub;

        console.log('update-schema-item was called, this is the schema item: ', schemaItem)

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!['buyer1_schema', 'buyer2_schema', 'seller1_schema', 'seller2_schema'].includes(schemaType)) {
            return res.status(400).json({ error: 'Invalid schema type' });
        }

        const updatedSchemaItem = await updateSchemaItem(templateId, schemaItem, userId, req.supabaseClient!, schemaType as SchemaType);
        res.json(updatedSchemaItem);
    }
    catch (error) {
        console.error('Error updating schema item:', error);
        res.status(500).json({ error: 'Failed to update schema item' });
    }
});

router.patch("/save/:clientIntakeId", async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
  
      const { toSaveSchema, schemaType } = req.body as {toSaveSchema: PartyIntakeSchema, schemaType: SchemaType};
      const newlySaved: PartyIntakeSchema = await saveClientIntakeTemplateSchema(
        toSaveSchema,
        schemaType,
        req.params.clientIntakeId,
        req.supabaseClient!
      );
  
      if (!newlySaved) {
        return res.status(404).json({ error: "Problem with saving in database" });
      }
  
      res.json(newlySaved);
    } catch (error) {
      console.error("Error saving client intake schema:", error);
      res.status(500).json({ error: "Failed to save client intake schema" });
    }
  });

router.post('/add-schema-item/:templateId/:schemaType', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId, schemaType } = req.params;
        const { schemaItem } = req.body;
        const userId = req.user?.sub;

        console.log('add-schema-item was called, this is the template ID: ', templateId)

        if(!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!['buyer1_schema', 'buyer2_schema', 'seller1_schema', 'seller2_schema'].includes(schemaType)) {
            return res.status(400).json({ error: 'Invalid schema type' });
        }

        console.log('made it through the if statement')

        const schema = await getClientIntakeTemplateSchema(templateId, userId, req.supabaseClient!, schemaType as SchemaType);

        console.log('made it through the getClientIntakeTemplateSchema in routes')

        let schemaItemWithUniqueId: SchemaItem = {
            ...schemaItem,
            unique_id: randomUUID()
        };
    
        console.log('made it through the schemaItemWithUniqueId:')
    
        while (schema.some((item: SchemaItem) => item.unique_id === schemaItemWithUniqueId.unique_id)) {
        console.log(`ID conflict found for ${schemaItemWithUniqueId.unique_id}, generating new ID...`);
        schemaItemWithUniqueId.unique_id = randomUUID();
        }
        
        console.log('this is the schema item: ', schemaItem)

        const updatedSchemaItem = await addSchemaItemToTemplate(templateId, schemaItemWithUniqueId, userId, req.supabaseClient!, schemaType as SchemaType);
        res.json(updatedSchemaItem);
    }
    catch (error) {
        console.error('Error adding schema item:', error);
        res.status(500).json({ error: 'Failed to add schema item' });
    }
});

// Keep the original routes for backward compatibility, defaulting to buyer1_schema
router.patch('/update-template/:templateId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const { newSchema } = req.body;
        const userId = req.user?.id;
        
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedTemplate = await updateClientIntakeTemplate(templateId, newSchema, userId, req.supabaseClient!, 'buyer1_schema');

        res.json(updatedTemplate);
    }
    catch (error) {
        console.error('Error updating client intake template:', error);
        res.status(500).json({ error: 'Failed to update client intake template' });
    }
});

router.get('/get-template/:templateId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const templateSchema = await getClientIntakeTemplateSchema(templateId, userId, req.supabaseClient!, 'buyer1_schema');

        res.json(templateSchema);
    }
    catch (error) {
        console.error('Error getting client intake template schema:', error);
        res.status(500).json({ error: 'Failed to get client intake template schema' });
    }
});

router.patch('/update-schema-item/:templateId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const { schemaItem } = req.body;
        const userId = req.user?.sub;

        console.log('update-schema-item was called, this is the schema item: ', schemaItem)

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedSchemaItem = await updateSchemaItem(templateId, schemaItem, userId, req.supabaseClient!, 'buyer1_schema');
        res.json(updatedSchemaItem);
    }
    catch (error) {
        console.error('Error updating schema item:', error);
        res.status(500).json({ error: 'Failed to update schema item' });
    }
});

router.post('/add-schema-item/:templateId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const { schemaItem } = req.body;
        const userId = req.user?.sub;

        console.log('add-schema-item was called, this is the template ID: ', templateId)

        if(!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log('made it through the if statement')

        const schema = await getClientIntakeTemplateSchema(templateId, userId, req.supabaseClient!, 'buyer1_schema');

        console.log('made it through the getClientIntakeTemplateSchema in routes')

        let schemaItemWithUniqueId: SchemaItem = {
            ...schemaItem,
            unique_id: randomUUID()
        };
    
        console.log('made it through the schemaItemWithUniqueId:')
    
        while (schema.some((item: SchemaItem) => item.unique_id === schemaItemWithUniqueId.unique_id)) {
        console.log(`ID conflict found for ${schemaItemWithUniqueId.unique_id}, generating new ID...`);
        schemaItemWithUniqueId.unique_id = randomUUID();
        }
        
        console.log('this is the schema item: ', schemaItem)

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedSchemaItem = await addSchemaItemToTemplate(templateId, schemaItemWithUniqueId, userId, req.supabaseClient!, 'buyer1_schema');
        res.json(updatedSchemaItem);
    }
    catch (error) {
        console.error('Error adding schema item:', error);
        res.status(500).json({ error: 'Failed to add schema item' });
    }
});

router.get('/get-all-schemas/:templateId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateId } = req.params;
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const schemas = await getAllSchemasForTemplate(templateId, userId, req.supabaseClient!);
        res.json(schemas);
    }
    catch (error) {
        console.error('Error getting all schemas for template:', error);
        res.status(500).json({ error: 'Failed to get all schemas for template' });
    }
});

router.get('/get-all-templates', authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const templates = await getPartyIntakeTemplates(userId, req.supabaseClient!);
        res.json(templates);
    }
    catch (error) {
        console.error('Error getting all templates:', error);
        res.status(500).json({ error: 'Failed to get all templates' });
    }
});

router.get('/get-by-dealside/:dealSide', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { dealSide } = req.params;
        const userId = req.user?.sub;
        
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const templates: PartyIntakeTemplate[] = await getPartyIntakeTemplates(userId, req.supabaseClient!);

        const templatesByDealSide: PartyIntakeTemplate[] = templates.filter((template) => template.name.split("-")[0]===(dealSide));
        res.json(templatesByDealSide);
    }
    catch (error) {
        console.error('Error getting templates by deal side:', error);
        res.status(500).json({ error: 'Failed to get templates by deal side' });
    }
})

router.post('/create-default-templates', authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.user?.sub;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const templates = await createDefaultTemplatesForUser(userId, req.supabaseClient!);
        res.json({ message: 'Default templates created successfully', templates });
    }
    catch (error) {
        console.error('Error creating default templates:', error);
        res.status(500).json({ error: 'Failed to create default templates' });
    }
});

router.post('/add-template/:templateName', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { templateName } = req.params;
        const userId = req.user?.sub;
        
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const template = await addClientIntakeTemplate(templateName, userId, req.supabaseClient!);
        res.json(template);
    }
    catch (error) {
        console.error('Error adding template:', error);
        res.status(500).json({ error: 'Failed to add template' });
    }
})

export default router;