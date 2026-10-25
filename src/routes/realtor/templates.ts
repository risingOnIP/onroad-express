import { Router } from "express";
import { addFormToTemplate, addFormToTemplateByTemplateId, deleteTemplateForm, getIndividualTemplateForm, getStagesById, getTemplate, getTemplateForms, getTemplateFormsByTemplateId, getTemplates } from "../../logic/realtor/template-logic";
import { getTemplateFormResponses, updateTemplateFormResponse, updateTemplateFormStage } from "../../logic/realtor/template-logic";
import { Template, TemplateForm } from "../../types/realtor";
import { addTemplate } from "../../logic/realtor/template-logic";


const router = Router();

router.get('/get-template/:template_id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { template_id } = req.params;
    const template = await getTemplate(template_id, req.supabaseClient!);
    res.json(template); 
  } catch (error) {
    console.error("Error getting template:", error);
    res.status(500).json({ error: "Failed to get template" });
  }
})

router.get('/get-forms/:formattedTemplate', async (req, res) => {

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const user_id = req.user?.sub;
    const { formattedTemplate } = req.params;
    const template = await getTemplateForms(user_id, formattedTemplate, req.supabaseClient!);
    res.json(template);
  } catch (error) {
    console.error("Error getting forms from template:", error);
    res.status(500).json({ error: "Failed to get forms from template" });
  }
});

router.get('/get-forms/by-template-id/:template_id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { template_id } = req.params;
    const templateForms = await getTemplateFormsByTemplateId(template_id, req.supabaseClient!);
    res.json(templateForms);
  } catch (error) {
    console.error("Error getting forms by template ID:", error);
    res.status(500).json({ error: "Failed to get forms by template ID" });
  }
});



router.get('/get-individual-template-form/:formattedTemplate', async (req, res) => {
try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
  
    const { formattedTemplate } = req.params;
    const user_id = req.user.sub;

    const templateFormFields: TemplateForm = await getIndividualTemplateForm(
      user_id,
      formattedTemplate,
      req.supabaseClient!
    );
    res.json(templateFormFields);
}
catch (error) {
  console.log()
  console.error("Error getting template form fields:", error);
  res.status(500).json({ error: "Failed to get template form fields" });
}
});

router.post('/addform/by-template-id/:template_id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { template_id } = req.params;
    const { form_type, deal_wide, form_stage } = req.body;
    const templateForms = await addFormToTemplateByTemplateId(req.user.sub, template_id, form_type, deal_wide, form_stage, req.supabaseClient!);
    res.json(templateForms);
  
  
  } catch (error) {
    console.error("Error adding a form to a template:", error);
    res.status(500).json({ error: "Failed to add a form to a template" });
  }
});

router.post('/addform/:formattedTemplateName', async (req, res) => {

    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { formattedTemplateName } = req.params;
      const { form_type, deal_wide } = req.body;
      console.log(' i am here in addform')
  
      const dealOptionWithForms = await addFormToTemplate(
        req.user.sub,
        formattedTemplateName,
        form_type,
        deal_wide,
        req.supabaseClient!
      );
  
      res.json(dealOptionWithForms);
    } catch (error) {
      console.error("Error adding a form to a deal option:", error);
      res.status(500).json({ error: "Failed to add a form to a deal option" });
    }
  }); 

  router.get('/getformfields/:template_form_id', async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const { template_form_id } = req.params;
      const formFields = await getTemplateFormResponses(template_form_id, req.supabaseClient!);
      res.json(formFields);
    } catch (error) {
      console.error("Error getting form responses:", error);
      res.status(500).json({ error: "Failed to get form responses" });
    }
  });
 

  //get individual template form field 

  

 // update template form field

 router.patch('/updateTemplateFormResponse/:formId', async (req, res) => {
  console.log('in updateFormResponse');
  const { formId } = req.params;
  const { itemKey, newValue } = req.body;

  try {
    await updateTemplateFormResponse(formId, itemKey, newValue, req.supabaseClient!);
    res.json({message: 'Form response updated successfully'});
  }
  catch (error) {
    console.error('Error updating form response: ', error);
    res.status(500).json({error: 'Failed to update form response'});
  }
});

router.patch('/updateTemplateFormStage/:formId', async (req, res) => {
  console.log('in updateTemplateFormStage');
  const { formId } = req.params;
  const { form_stage } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    await updateTemplateFormStage(formId, form_stage, req.supabaseClient!);
    res.json({message: 'Template form stage updated successfully'});
  }
  catch (error) {
    console.error('Error updating template form stage: ', error);
    res.status(500).json({error: 'Failed to update template form stage'});
  }
});

  
router.get('/getFormResponses/:template_form_id', async (req, res) => {
  try {
    const { template_form_id } = req.params;
    const formResponses = await getTemplateFormResponses(template_form_id, req.supabaseClient!);
    res.json(formResponses);
  } catch (error) {
    console.error('Error getting form responses:', error);
    res.status(500).json({error: 'Failed to get form responses'});
  }
});

router.post('/addTemplate/:formattedTemplateName', async (req, res) => {
  try {
    const { formattedTemplateName } = req.params;
    const template: Template = await addTemplate(formattedTemplateName, req.user?.sub as string, req.supabaseClient!);
    res.json(template);
  }
  catch (error) {
    console.error('Error adding template:', error);
    res.status(500).json({error: 'Failed to add template'});
  }
})
  

router.get('/getTemplates', async (req, res) => {
  try {
    const templates = await getTemplates(req.user?.sub as string, req.supabaseClient!);
    res.json(templates);
  }
  catch (error) {
    console.error('Error getting templates:', error);
    res.status(500).json({error: 'Failed to get templates'});
  }
})

router.get('/getAllTemplates', async (req, res) => {
  try {
    const templates = await getTemplates(req.user?.sub as string, req.supabaseClient!) as unknown as Template[];
    res.json(templates);
  }
  catch (error) {
    console.error('Error getting template names:', error);
    res.status(500).json({error: 'Failed to get template names'});
  }
})

router.get('/getStagesById/:template_id', async (req, res) => {
  try {
    const { template_id } = req.params;
    const stages = await getStagesById(template_id, req.supabaseClient!);
    res.json(stages);
  }
  catch (error) {
    console.error('Error getting stages by id:', error);
    res.status(500).json({error: 'Failed to get stages by id'});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTemplateForm(id, req.supabaseClient!);
    if (result.success) {
      res.json({success: true, message: result.message});
    } else {
      throw new Error("there was an error deleting the template");
    }
  }
  catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json(error);
  }
})


export default router;
