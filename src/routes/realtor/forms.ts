import { Router } from 'express';
import { getAvailableFormsFromDealId, getAvailableFormsFromTemplateId, getForm, getSignatureSequence, saveSignatureSequence, updateFormOrderInDealOption, deleteForm, removeSignaturesAndEnableEditing, updateCustomSchema, generateAndLockPDF } from '../../logic/realtor/form-logic';
import { updateFormResponse } from '../../logic/realtor/form-logic';
import { updateFormWithCustomSchema, upload } from '../../logic/realtor/dealOption-logic';
import { AvailableForms, Form, PDFFormField, Schema, SignerAssignment } from '../../types/realtor';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get a specific form


//get all available forms for a specific dealoption
router.get('/available/from-deal/:dealId', async (req, res) => {
  const { dealId } = req.params;
  
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const forms: AvailableForms = await getAvailableFormsFromDealId(dealId, req.supabaseClient!, req.user.sub);
    console.log('this is available forms from deal id: ', forms)
    res.json(forms);
  }
  catch (error) {
    console.error('Error getting available forms: ',  error)
    res.status(500).json({error: 'Failed to get available forms'})
  }

}); 



router.get('/available/from-template-id/:templateId', async (req, res) => {
  const { templateId } = req.params;

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const forms: AvailableForms = await getAvailableFormsFromTemplateId(
      templateId,
      req.supabaseClient!,
      req.user.sub
    );

    res.json(forms);
  } catch (error) {
    console.error('Error getting available forms:', error);
    res.status(500).json({ error: 'Failed to get available forms' });
  }
});

// Get all existing form types from the database
router.get('/all-form-types', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Fetch distinct form types from forms, template_forms, and brokerForms tables
    const { data: formTypes, error: formsError } = await req.supabaseClient!
      .from('forms')
      .select('form_type')
      .not('form_type', 'is', null);

    const { data: templateFormTypes, error: templateError } = await req.supabaseClient!
      .from('template_forms')
      .select('form_type')
      .not('form_type', 'is', null);

    const { data: brokerFormTypes, error: brokerError } = await req.supabaseClient!
      .from('brokerForms')
      .select('form_type')
      .not('form_type', 'is', null);

    if (formsError || templateError || brokerError) {
      console.error('Error fetching form types:', formsError || templateError || brokerError);
      return res.status(500).json({ error: 'Failed to fetch form types' });
    }

    // Combine and deduplicate all form types
    const allFormTypes = new Set<string>();
    
    formTypes?.forEach((item: any) => {
      if (item.form_type) allFormTypes.add(item.form_type);
    });
    
    templateFormTypes?.forEach((item: any) => {
      if (item.form_type) allFormTypes.add(item.form_type);
    });
    
    brokerFormTypes?.forEach((item: any) => {
      if (item.form_type) allFormTypes.add(item.form_type);
    });

    res.json({ formTypes: Array.from(allFormTypes) });
  } catch (error) {
    console.error('Error fetching all form types:', error);
    res.status(500).json({ error: 'Failed to fetch all form types' });
  }
});


router.patch('/updateFormResponse/:formId', async (req, res) => {
  
  if (!req.user) {
    res.status(500).json({error: 'User not authenticated'});
    return;
  }

  const { formId } = req.params;
  const { itemKey, newValue } = req.body;

  try {
    await updateFormResponse(formId, itemKey, newValue, req.user.sub, req.supabaseClient!);
    res.json({message: 'Form response updated successfully'});
  }
  catch (error) {
    console.error('Error updating form response: ', error);
    res.status(500).json({error: 'Failed to update form response'});
  }
});


router.patch('/update-form-order-in-deal-option/', async (req, res) => {
  const {updates} = req.body as {updates: {formId: string, newOrder: number}[]};

  try {
    const updatedDealOption = await updateFormOrderInDealOption(updates, req.supabaseClient!);
    res.json(updatedDealOption);
  }
  catch (error) {
    console.error('Error updating form order in deal option: ', error);
    res.status(500).json({error: 'Failed to update form order in deal option'});
  }

});



//saving signature signing sequence 
router.post('/save-signature-sequence/:formId', async (req, res) => {
 

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { formId } = req.params;
    const { signatureSequence } = req.body;

    const signatureSaved: SignerAssignment[][] = await saveSignatureSequence(formId, signatureSequence, req.supabaseClient!);
    res.json(signatureSaved);
  }
  catch (error) {
    console.error('Error saving signature sequence: ', error);
    res.status(500).json({error: 'Failed to save signature sequence'});
  }

});

router.get('/get-signature-sequence/:formId', async (req, res) => {

  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { formId } = req.params;
    const signatureSequence: SignerAssignment [][] = await getSignatureSequence(formId, req.supabaseClient!);
    res.json(signatureSequence);
}
catch (error) {
  console.error('Error getting singature sequence: ', error);
  res.status(500).json({error: "failed to get signature sequence"})
}
}); 

router.patch('/update-custom-schema/:formId', async (req, res) => {
  const { formId } = req.params as { formId: string };
  console.log('req.body: ', req.body)
  const { custom_schema, pdf_form_fields } = req.body as { custom_schema: Schema, pdf_form_fields: PDFFormField[] };
  console.log('custom_schema: ', custom_schema)
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  try {
    const updatedForm = await updateCustomSchema(formId, custom_schema, req.supabaseClient!, pdf_form_fields);
    res.json(updatedForm);
  }
  catch (error) {
    console.error('Error updating custom schema: ', error);
    res.status(500).json({error: 'Failed to update custom schema'});
  }
});

router.patch('/turn-into-custom-form/:id', upload.single('file_upload_pdf'), async (req, res) => {
  try {
    const { id } = req.params;
    const { custom_schema } = req.body;
    const file: Express.Multer.File | undefined = req.file;
    const userId = req.user?.sub;

    console.log("[CUSTOM-FORM-CONVERSION] Starting conversion for form:", id);
    console.log("[CUSTOM-FORM-CONVERSION] User ID:", userId);
    console.log("[CUSTOM-FORM-CONVERSION] File received:", !!file, file ? `Size: ${file.size} bytes, Type: ${file.mimetype}` : "No file");
    console.log("[CUSTOM-FORM-CONVERSION] Custom schema length:", Array.isArray(custom_schema) ? custom_schema.length : "Not array");

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    let filePath = '';
    
    // Handle file upload if provided
    if (file) {
      // Generate unique filename and path
      const fileName = `${uuidv4()}.pdf`;
      filePath = `${userId}/custom-forms/${fileName}`;
      console.log('[CUSTOM-FORM-CONVERSION] Generated file path:', filePath);
      console.log('[CUSTOM-FORM-CONVERSION] Uploading file of size:', file.size, 'bytes');

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await req.supabaseClient!.storage
        .from("pdf-uploads")
        .upload(filePath, file.buffer, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        console.error("[CUSTOM-FORM-CONVERSION] Supabase upload error:", uploadError);
        return res.status(400).json({ 
          error: `Failed to upload PDF: ${uploadError.message}` 
        });
      }
      
      console.log('[CUSTOM-FORM-CONVERSION] File uploaded successfully to:', filePath);
    } else {
      console.log('[CUSTOM-FORM-CONVERSION] No file provided for upload');
    }

    // Parse custom schema if it's a string
    let parsedCustomSchema = [];
    if (custom_schema) {
      try {
        parsedCustomSchema = typeof custom_schema === 'string' 
          ? JSON.parse(custom_schema) 
          : custom_schema;
      } catch (error) {
        return res.status(400).json({ 
          error: 'Invalid custom_schema format. Must be valid JSON.' 
        });
      }
    }

    // Create empty form response for custom forms
    const formResponse = {};

    // Update the form with custom schema and file path
    console.log('[CUSTOM-FORM-CONVERSION] About to update form with file path:', filePath);
    console.log('[CUSTOM-FORM-CONVERSION] Custom schema to save:', JSON.stringify(parsedCustomSchema, null, 2));
    
    const updatedForm: Form = await updateFormWithCustomSchema(
      id,
      formResponse,
      req.supabaseClient!,
      filePath,
      parsedCustomSchema
    );

    console.log('[CUSTOM-FORM-CONVERSION] Form updated successfully');
    console.log('[CUSTOM-FORM-CONVERSION] Updated form is_pdf_locked:', updatedForm.is_pdf_locked);
    console.log('[CUSTOM-FORM-CONVERSION] Updated form file_upload_pdf:', updatedForm.file_upload_pdf);

    res.json({
      success: true,
      message: 'Form successfully converted to custom form',
      form: updatedForm,
      filePath: filePath || undefined
    });

  } catch (error) {
    console.error('Turn into custom form route error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
});

// Delete a specific form
router.delete('/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Form ID is required' });
    }

    const result = await deleteForm(id, req.supabaseClient!);

    res.json({
      message: 'Form deleted successfully',
      success: true,
      deletedForm: result.deletedForm,
    });
  } catch (error) {
    console.error('Delete form route error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ 
      error: 'Failed to delete form',
      details: errorMessage
    });
  }
});

// Remove signatures and re-enable form editing
router.post('/remove-signatures/:id', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Form ID is required' });
    }

    const result = await removeSignaturesAndEnableEditing(id, req.supabaseClient!);

    res.json({
      message: 'Signatures removed and form editing re-enabled',
      success: true,
      form: result.form,
    });
  } catch (error) {
    console.error('Remove signatures route error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ 
      error: 'Failed to remove signatures',
      details: errorMessage
    });
  }
});

//custom pdf actions
router.post('/generate-and-lock-pdf/:formId', upload.single("pdf"), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user?.sub;
    const { formId } = req.params;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const result = await generateAndLockPDF(
      userId,
      file,
      formId,
      req.supabaseClient! 
    );

    if (!result.success) {
      return res.status(400).json({ error: result.error || "Upload failed" });
    }

    res.json({ pdfUrl: result.pdfUrl });
  } catch (error) {
    console.error("Generated PDF upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
);


router.get("/checklock/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const supabase = req.supabaseClient!;

    const { data, error } = await supabase
      .from("forms")
      .select("is_pdf_locked, file_upload_pdf")
      .eq("id", formId)
      .single();

    if (error) {
      console.error("Error checking PDF lock status:", error);
      return res.status(500).json({ isLocked: false, error: error.message });
    }

    res.json({
      isLocked: data?.is_pdf_locked || false,
      pdfUrl: data?.file_upload_pdf
    });
  } catch (error) {
    console.error("checklock error:", error);
    res.status(500).json({ isLocked: false, error: "Unexpected error" });
  }
});

router.post("/unlock-generated-pdf/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    const supabase = req.supabaseClient!;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Not authenticated" });
    }

    const { error } = await supabase
      .from("forms")
      .update({ is_pdf_locked: false })
      .eq("id", formId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error unlocking PDF:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("unlock route error:", error);
    res.status(500).json({ success: false, error: "Unexpected error" });
  }
});

// Send form for broker review
router.patch("/:formId/send-for-review", async (req, res) => {
  try {
    const { formId } = req.params;
    const supabase = req.supabaseClient!;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify the form belongs to this realtor
    const { data: form, error: formError } = await supabase
      .from("forms")
      .select("id, user_id, review_stage")
      .eq("id", formId)
      .single();

    if (formError || !form) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (form.user_id !== userId) {
      return res.status(403).json({ error: "Unauthorized to modify this form" });
    }

    // Update the review stage to 'reviewing'
    const { data: updatedForm, error: updateError } = await supabase
      .from("forms")
      .update({ review_stage: 'reviewing' })
      .eq("id", formId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating review stage:", updateError);
      return res.status(500).json({ error: "Failed to send form for review" });
    }

    res.json({ 
      success: true, 
      message: "Form sent for broker review",
      form: updatedForm 
    });
  } catch (error) {
    console.error("send-for-review error:", error);
    res.status(500).json({ error: "Unexpected error" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const form = await getForm(id, req.supabaseClient!);

    res.json(form);
  } catch (error) {
    console.error('Error fetching form:', error); 
    res.status(500).json({ error: 'Failed to fetch form' });
  }
}); 


export default router; 