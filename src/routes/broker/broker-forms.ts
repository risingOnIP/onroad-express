import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { applyFieldsToPdf, pdfHasExistingFields } from '../../logic/broker/pdf-field-service';
import { getFormMapping } from '../forms/pdf-templates';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { uploadType, formType, orgName } = req.body;
    const file = req.file;
    const brokerId = req.user?.sub;

    if (!file || !uploadType || !formType || !orgName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!brokerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create the storage path
    const folderType = uploadType === 'custom' ? 'custom' : 'TAR';
    const fileName = `${Date.now()}_${uuidv4()}.pdf`;
    const storagePath = `${brokerId}/${folderType}/${fileName}`;

    // Check if bucket exists, create if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === 'brokerForms');
    
    if (!bucketExists) {
      const { error: createBucketError } = await supabase.storage.createBucket('brokerForms', {
        public: false,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (createBucketError && !createBucketError.message?.includes('already exists')) {
        console.error('Error creating bucket:', createBucketError);
        return res.status(500).json({ error: 'Failed to create storage bucket' });
      }
    }

    // Process the PDF - apply fields if it's a TAR form
    let pdfBuffer = file.buffer;
    
    if (orgName === 'TAR') {

      console.log("is a tar form, going to process it")
      // Get the form mapping to see if we have field definitions
      const formMapping = getFormMapping(formType);
      console.log("formMapping:", formMapping);
      
      if (formMapping && formMapping.fields) {
        console.log(`Applying fields to TAR form: ${formType}`);
        try {
          // Check if PDF already has fields
          const hasFields = await pdfHasExistingFields(pdfBuffer);
          if (hasFields) {
            console.log('PDF has existing fields, they will be removed and replaced');
          }
          
          // Apply our field definitions (this removes existing fields first)
          pdfBuffer = await applyFieldsToPdf(pdfBuffer, formMapping.fields);
          console.log(`Successfully applied ${formMapping.fields.length} fields to ${formType}`);
        } catch (fieldError) {
          console.error(`Error applying fields to TAR form ${formType}:`, fieldError);
          // Continue with original PDF if field application fails
        }
      } else {
        console.log(`No field definitions found for TAR form: ${formType}`);
      }
    }

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('brokerForms')
      .upload(storagePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    // Insert record into brokerForms table with storage path
    const { data: formRecord, error: dbError } = await supabase
      .from('brokerForms')
      .insert({
        broker_id: brokerId,
        form_type: formType,
        org_name: orgName,
        broker_custom_pdf: storagePath, // Store the path, not the signed URL
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('brokerForms').remove([storagePath]);
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save form record' });
    }

    res.json(formRecord);
  } catch (error) {
    console.error('Error uploading broker form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/broker/forms/list
 * Get all forms for the authenticated broker
 */
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const brokerId = req.user?.sub;

    if (!brokerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch forms for the broker
    const { data: forms, error } = await supabase
      .from('brokerForms')
      .select('*')
      .eq('broker_id', brokerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching broker forms:', error);
      return res.status(500).json({ error: 'Failed to fetch forms' });
    }

    res.json(forms || []);
  } catch (error) {
    console.error('Error fetching broker forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/broker/forms/update
 * Update a broker form PDF
 */
router.put('/update', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { formId } = req.body;
    const file = req.file;
    const brokerId = req.user?.sub;

    if (!file || !formId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!brokerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // First get the existing form to verify ownership and get metadata
    const { data: existingForm, error: fetchError } = await supabase
      .from('brokerForms')
      .select('*')
      .eq('id', formId)
      .single();

    if (fetchError || !existingForm) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Verify the broker owns this form
    if (existingForm.broker_id !== brokerId) {
      return res.status(403).json({ error: 'Unauthorized - you do not own this form' });
    }

    // Delete old file from storage using the stored path
    const oldStoragePath = existingForm.broker_custom_pdf;
    
    if (oldStoragePath) {
      await supabase.storage.from('brokerForms').remove([oldStoragePath]);
    }

    // Process the PDF - apply fields if it's a TAR form
    let pdfBuffer = file.buffer;
    
    if (existingForm.org_name === 'TAR') {
      // Get the form mapping to see if we have field definitions
      const formMapping = getFormMapping(existingForm.form_type);
      
      if (formMapping && formMapping.fields) {
        console.log(`Applying fields to TAR form update: ${existingForm.form_type}`);
        try {
          // Check if PDF already has fields
          const hasFields = await pdfHasExistingFields(pdfBuffer);
          if (hasFields) {
            console.log('PDF has existing fields, they will be removed and replaced');
          }
          
          // Apply our field definitions (this removes existing fields first)
          pdfBuffer = await applyFieldsToPdf(pdfBuffer, formMapping.fields);
          console.log(`Successfully applied ${formMapping.fields.length} fields to ${existingForm.form_type}`);
        } catch (fieldError) {
          console.error(`Error applying fields to TAR form ${existingForm.form_type}:`, fieldError);
          // Continue with original PDF if field application fails
        }
      } else {
        console.log(`No field definitions found for TAR form: ${existingForm.form_type}`);
      }
    }

    // Upload new file
    const folderType = existingForm.org_name === 'TAR' ? 'TAR' : 'custom';
    const fileName = `${Date.now()}_${uuidv4()}.pdf`;
    const storagePath = `${brokerId}/${folderType}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('brokerForms')
      .upload(storagePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    // Update database record with the new storage path
    const { data: updatedForm, error: updateError } = await supabase
      .from('brokerForms')
      .update({
        broker_custom_pdf: storagePath, // Store the path, not the signed URL
        updated_at: new Date().toISOString(),
      })
      .eq('id', formId)
      .select()
      .single();

    if (updateError) {
      // Clean up uploaded file if database update fails
      await supabase.storage.from('brokerForms').remove([storagePath]);
      console.error('Database error:', updateError);
      return res.status(500).json({ error: 'Failed to update form record' });
    }

    res.json(updatedForm);
  } catch (error) {
    console.error('Error updating broker form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/broker/forms/signed-url/:formId
 * Get a signed URL for a specific broker form
 */
router.get('/signed-url/:formId', authMiddleware, async (req, res) => {
  try {
    const { formId } = req.params;
    const brokerId = req.user?.sub;

    if (!brokerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch the form to verify ownership and get the storage path
    const { data: form, error: fetchError } = await supabase
      .from('brokerForms')
      .select('broker_custom_pdf')
      .eq('id', formId)
      .eq('broker_id', brokerId)
      .single();

    if (fetchError || !form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Generate a signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('brokerForms')
      .createSignedUrl(form.broker_custom_pdf, 3600);

    if (signedUrlError || !signedUrlData) {
      console.error('Error creating signed URL:', signedUrlError);
      return res.status(500).json({ error: 'Failed to generate signed URL' });
    }

    res.json({ url: signedUrlData.signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/broker/forms/:formId
 * Delete a broker form
 */
router.delete('/:formId', authMiddleware, async (req, res) => {
  try {
    const { formId } = req.params;
    const brokerId = req.user?.sub;

    if (!brokerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // First get the form to get the storage path
    const { data: form, error: fetchError } = await supabase
      .from('brokerForms')
      .select('broker_custom_pdf, broker_id, form_type, org_name')
      .eq('id', formId)
      .single();

    if (fetchError || !form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Verify the broker owns this form
    if (form.broker_id !== brokerId) {
      return res.status(403).json({ error: 'Unauthorized - you do not own this form' });
    }

    // Delete from storage using the stored path
    const storagePath = form.broker_custom_pdf;
    
    if (storagePath) {
      const { error: deleteStorageError } = await supabase.storage
        .from('brokerForms')
        .remove([storagePath]);

      if (deleteStorageError) {
        console.error('Error deleting from storage:', deleteStorageError);
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete from database
    const { error: deleteDbError } = await supabase
      .from('brokerForms')
      .delete()
      .eq('id', formId);

    if (deleteDbError) {
      console.error('Error deleting from database:', deleteDbError);
      return res.status(500).json({ error: 'Failed to delete form record' });
    }

    res.json({ success: true, message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting broker form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;