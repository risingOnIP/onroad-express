import { Router } from 'express';
import { Request, Response } from 'express';
import { createDealOptionPartyRow, removeDealOptionParty, getAllDealOptionParties, getDealPartiesByDealOptionId, getDealPartiesByDealAndOptionId } from '../../logic/realtor/deal_option_parties-actions';
import { DealParty } from '../../types/realtor';

const router = Router();

// Test endpoint to verify route is working
router.get('/test', async (req: Request, res: Response) => {
  res.json({ message: 'Deal option parties route is working!' });
});

// Get parties for a specific deal option
router.get('/:dealOptionId', async (req: Request, res: Response) => {
  try {
    const { dealOptionId } = req.params;
    const userId = req.user?.sub; // Use 'sub' instead of 'id' for Supabase JWT

    console.log('deal_option_parties_simple route hit:', { dealOptionId, userId, userObject: req.user });

    if (!userId) {
      console.log('User not authenticated - req.user:', req.user);
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!dealOptionId) {
      return res.status(400).json({ error: 'Deal option ID is required' });
    }

    console.log('Getting parties for deal option:', dealOptionId);

    const parties : DealParty[] = await getDealPartiesByDealOptionId(dealOptionId, req.supabaseClient!) as DealParty[];
    res.status(200).json(parties);

  } catch (error) {
    console.error('Error in GET /:dealOptionId:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch deal option parties' 
    });
  }
});

// Create deal option parties (simplified)
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { deal_option_id, parties } = req.body;
    const userId = req.user?.sub; // Use 'sub' instead of 'id' for Supabase JWT

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!deal_option_id) {
      return res.status(400).json({ error: 'Deal option ID is required' });
    }

    if (!parties || !Array.isArray(parties) || parties.length === 0) {
      return res.status(400).json({ error: 'Parties array is required and cannot be empty' });
    }

    // Validate party data
    for (const party of parties) {
      if (!party.party?.email || !party.party?.full_name || !party.role) {
        return res.status(400).json({
          error: 'Each party must have email, full_name, and role'
        });
      }
    }

    console.log('Creating deal option parties:', { deal_option_id, partiesCount: parties?.length });

    const result = await createDealOptionPartyRow(deal_option_id, parties, userId, req.supabaseClient! );
    res.status(201).json({
      success: true,
      data: result,
      message: 'Deal option parties created successfully'
    });

  } catch (error) {
    console.error('Error in POST /create:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create deal option parties' 
    });
  }
});

router.get('/get-deal-wide-and-deal-option-parties/:dealId/:dealOptionId', async (req: Request, res: Response) => {
  try {

    console.log("getting deal parties by deal and option id on express", req.params);

    const { dealId, dealOptionId } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!dealId || !dealOptionId) {
      return res.status(400).json({ error: 'Deal ID and deal option ID are required' });
    }

    

    const parties = await getDealPartiesByDealAndOptionId(dealId, dealOptionId, req.supabaseClient!);
    res.status(200).json(parties);

  } catch (error) {
    console.error('Error in GET /get-deal-and-option-parties:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch deal and option parties' 
    });
  }
})

export default router;