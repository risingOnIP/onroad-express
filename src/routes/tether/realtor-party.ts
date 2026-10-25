import { Router } from "express";
import { RealtorPartyTether } from "../../types/tethers";
import { getRealtorPartyTetherBySearchId, getRealtorPartyTetherByDealId, getPendingTetherRequestsForRealtor, getPendingTetherRequestsForParty, acceptPendingTetherRequestByParty } from "../../logic/tether/realtorParty-logic";

const router = Router();


router.get('/by-search-id/:searchId', async (req, res) => {
  try {
    const {searchId} = req.params; 
    const returning : RealtorPartyTether = await getRealtorPartyTetherBySearchId(searchId, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /get-by-search-id; failed to get schema by dealId"});
  }
})

router.get('/by-dealId/:dealId', async (req, res) => {
    try {
      const {dealId} = req.params; 
      const returning : RealtorPartyTether = await getRealtorPartyTetherByDealId(dealId, req.supabaseClient!);
      res.json(returning);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({error: "Error: /get-by-deal-id; failed to get schema by dealId"});
    }
  })


router.get('/pending-requests/for-realtor/', async (req, res) => {
  try {
    const returning : RealtorPartyTether[] = await getPendingTetherRequestsForRealtor(req.user!.email!, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /get-pending-requests-for-realtor; failed to get pending requests for realtor"});
  }
})

router.get('/pending-requests/for-client/', async (req, res) => {
  try {
    const returning : RealtorPartyTether[] = await getPendingTetherRequestsForParty(req.user!.email!, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /get-pending-requests-for-client; failed to get pending requests for client"});
  }
})

router.patch('/accept-pending-request/by-client/:tetherId', async (req, res) => {
  try {
    const { tetherId } = req.params;
    const { searchId } = req.body;
    const returning : RealtorPartyTether = await acceptPendingTetherRequestByParty(tetherId, searchId, req.user!.sub!, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /accept-pending-request/by-client; failed to accept pending request by client"});
  }
})
  

export default router;