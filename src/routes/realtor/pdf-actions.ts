import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// POST /api/realtor/pdf/upload-generated
router.post('/upload-generated', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    const { formId } = req.body;
    const userId = req.user?.sub;

    // Validate inputs
    if (!file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PDF file provided' 
      });
    }

    if (!formId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Form ID is required' 
      });
    }

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authenticated' 
      });
    }

    // Generate unique filename
    const fileName = `${formId}/${uuidv4()}-generated.pdf`;

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await req.supabaseClient!.storage
      .from('pdf-uploads')
      .upload(fileName, file.buffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading PDF:', uploadError);
      return res.status(500).json({ 
        success: false, 
        error: uploadError.message 
      });
    }

    // Update the forms table with the relative path and lock status
    const { error: updateError } = await req.supabaseClient!
      .from('forms')
      .update({
        file_upload_pdf: fileName,
        is_pdf_locked: true
      })
      .eq('id', formId);

    if (updateError) {
      console.error('Error updating form:', updateError);
      // Try to delete the uploaded file
      await req.supabaseClient!.storage
        .from('pdf-uploads')
        .remove([fileName]);
      return res.status(500).json({ 
        success: false, 
        error: updateError.message 
      });
    }

    // Get public URL for the return value
    const { data: { publicUrl } } = req.supabaseClient!.storage
      .from('pdf-uploads')
      .getPublicUrl(fileName);

    res.json({ 
      success: true, 
      pdfUrl: publicUrl 
    });

  } catch (error) {
    console.error('Error in uploadGeneratedPDF:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    });
  }
});

// GET /api/realtor/pdf/lock-status/:formId
router.get('/lock-status/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    
    console.log('[LOCK-STATUS-API] Checking lock status for form ID:', formId);

    const { data, error } = await req.supabaseClient!
      .from('forms')
      .select('is_pdf_locked, file_upload_pdf, custom_schema, form_response')
      .eq('id', formId)
      .single();

    if (error) {
      console.error('[LOCK-STATUS-API] Database error:', error);
      return res.status(500).json({ 
        isLocked: false, 
        error: error.message 
      });
    }

    console.log('[LOCK-STATUS-API] Raw database response:', {
      is_pdf_locked: data?.is_pdf_locked,
      file_upload_pdf: data?.file_upload_pdf,
      has_custom_schema: data?.custom_schema ? (Array.isArray(data.custom_schema) ? data.custom_schema.length > 0 : Object.keys(data.custom_schema).length > 0) : false,
      has_form_response: data?.form_response ? Object.keys(data.form_response).length > 0 : false
    });

    const isLocked = data?.is_pdf_locked || false;
    console.log('[LOCK-STATUS-API] Final isLocked value:', isLocked);

    res.json({
      isLocked: isLocked,
      pdfUrl: data?.file_upload_pdf
    });

  } catch (error) {
    console.error('[LOCK-STATUS-API] Unexpected error:', error);
    res.status(500).json({ 
      isLocked: false, 
      error: 'An unexpected error occurred' 
    });
  }
});

// POST /api/realtor/pdf/unlock/:formId
router.post('/unlock/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authenticated' 
      });
    }

    // Update the lock status
    const { error } = await req.supabaseClient!
      .from('forms')
      .update({ is_pdf_locked: false })
      .eq('id', formId)
      .eq('user_id', userId); // Ensure user owns the form

    if (error) {
      console.error('Error unlocking PDF:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Error in unlockPDF:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    });
  }
});

export default router;