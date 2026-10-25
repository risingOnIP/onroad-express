import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createClient } from '@supabase/supabase-js';

const router = Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/realtor/broker-forms/check/:formType
 * Check if the realtor's broker has uploaded a specific TAR form
 */
router.get('/check/:formType', authMiddleware, async (req, res) => {
  try {
    const { formType } = req.params;
    const realtorId = req.user?.sub;

    if (!realtorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the realtor's broker via tether relationship
    const { data: tether, error: tetherError } = await supabase
      .from('brokerRealtorTether')
      .select('broker_id')
      .eq('realtor_id', realtorId)
      .eq('status', 'accepted')
      .single();

    if (tetherError || !tether) {
      // Realtor not tethered to a broker, return no custom form
      return res.json({ hasCustomForm: false });
    }

    const brokerId = tether.broker_id;

    // Check if broker has uploaded this TAR form
    const { data: brokerForm, error: formError } = await supabase
      .from('brokerForms')
      .select('id, broker_custom_pdf')
      .eq('broker_id', brokerId)
      .eq('form_type', formType)
      .eq('org_name', 'TAR')
      .single();

    if (formError || !brokerForm) {
      return res.json({ hasCustomForm: false });
    }

    // Generate a signed URL for the broker's custom PDF
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('brokerForms')
      .createSignedUrl(brokerForm.broker_custom_pdf, 3600); // 1 hour expiry

    if (signedUrlError || !signedUrlData) {
      console.error('Error creating signed URL:', signedUrlError);
      return res.json({ hasCustomForm: false });
    }

    res.json({ 
      hasCustomForm: true,
      customPdfUrl: signedUrlData.signedUrl,
      brokerFormId: brokerForm.id
    });
  } catch (error) {
    console.error('Error checking broker forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/realtor/broker-forms/list
 * Get all TAR forms uploaded by the realtor's broker
 */
/**
 * POST /api/realtor/broker-forms/check
 * Check if the realtor's broker has uploaded a specific form
 */
router.post('/check', authMiddleware, async (req, res) => {
  try {
    const { formType, orgName } = req.body;
    const realtorId = req.user?.sub;

    if (!realtorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!formType) {
      return res.status(400).json({ error: 'Form type is required' });
    }

    // Get the realtor's broker via tether relationship
    const { data: tether, error: tetherError } = await supabase
      .from('brokerRealtorTether')
      .select('broker_id')
      .eq('realtor_id', realtorId)
      .eq('status', 'accepted')
      .single();

    if (tetherError || !tether) {
      // Realtor not tethered to a broker
      return res.json({ exists: false });
    }

    const brokerId = tether.broker_id;

    // Build query
    let query = supabase
      .from('brokerForms')
      .select('id, broker_custom_pdf')
      .eq('broker_id', brokerId)
      .eq('form_type', formType);
    
    // Add org_name filter if provided
    if (orgName) {
      query = query.eq('org_name', orgName);
    }

    const { data: brokerForm, error: formError } = await query.single();

    if (formError || !brokerForm) {
      return res.json({ exists: false });
    }

    // Generate a signed URL for the broker's custom PDF
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('brokerForms')
      .createSignedUrl(brokerForm.broker_custom_pdf, 3600); // 1 hour expiry

    if (signedUrlError || !signedUrlData) {
      console.error('Error creating signed URL:', signedUrlError);
      return res.json({ exists: false });
    }

    res.json({ 
      exists: true,
      signedUrl: signedUrlData.signedUrl,
      brokerFormId: brokerForm.id
    });
  } catch (error) {
    console.error('Error checking broker forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const realtorId = req.user?.sub;

    if (!realtorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get the realtor's broker via tether relationship
    const { data: tether, error: tetherError } = await supabase
      .from('brokerRealtorTether')
      .select('broker_id')
      .eq('realtor_id', realtorId)
      .eq('status', 'accepted')
      .single();

    if (tetherError || !tether) {
      // Realtor not tethered to a broker, return empty list
      return res.json([]);
    }

    const brokerId = tether.broker_id;

    // Get all TAR forms uploaded by the broker
    const { data: brokerForms, error: formsError } = await supabase
      .from('brokerForms')
      .select('id, form_type, created_at')
      .eq('broker_id', brokerId)
      .eq('org_name', 'TAR')
      .order('form_type');

    if (formsError) {
      console.error('Error fetching broker TAR forms:', formsError);
      return res.json([]);
    }

    res.json(brokerForms || []);
  } catch (error) {
    console.error('Error listing broker forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;