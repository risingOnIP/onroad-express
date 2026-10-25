import { Router } from "express";
import { getAllParties, getPartiesForDeal, getPartyById, insertParty, updateParty } from "../../logic/realtor/parties-logic";
import { Party } from "../../types/realtor";

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const parties = await getAllParties(req.user!.sub, req.supabaseClient!);
        res.json(parties);
    } catch (error) {
        console.error("Error fetching parties:", error);
        res.status(500).json({ error: "Failed to fetch parties" });
    }
});

router.post('/insert', async (req, res) => {
    try {
        const {partyData} = req.body;
        const party : Party = await insertParty(partyData, req.user!.sub, req.supabaseClient!);
        res.json(party);
    } catch (error) {
        console.error("Error creating party:", error);
        res.status(500).json({ error: "Failed to create party" });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const partyId = req.params.id;
        const {updatingParty} = req.body as {updatingParty: Partial<Party>};
        const party = await updateParty(partyId, updatingParty, req.supabaseClient!);
        res.json(party);
    } catch (error) {
        console.error("Error updating party:", error);
        res.status(500).json({ error: "Failed to update party" });
    }
});

router.get('/:dealId', async (req, res) => {
    try {
        const dealId = req.params.dealId;
        const parties = await getPartiesForDeal(dealId, req.supabaseClient!);
        res.json(parties);
    } catch (error) {
        console.error("Error fetching parties for deal:", error);
        res.status(500).json({ error: "Failed to fetch parties for deal" });
    }
});

router.get('/by-id/:clientId', async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const party = await getPartyById(clientId, req.supabaseClient!);
        res.json(party);
    } catch (error) {
        console.error("Error fetching party by id:", error);
        res.status(500).json({ error: "Failed to fetch party by id" });
    }
});

export default router;
