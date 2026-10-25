import { Router } from 'express';
import { 
    getAllRealtorTethers,
    getAcceptedRealtorTethers,
    acceptRealtorTether,
    denyRealtorTether,
    createRealtorTetherByEmail,
    deleteRealtorTether,
    cancelPendingRealtorTether
} from '../../logic/broker/realtor-tether-logic';

const router = Router();

// Get broker license from authenticated broker's profile
async function getBrokerLicense(brokerId: string, supabaseClient: any): Promise<string> {
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('broker_license')
        .eq('role', 'broker')
        .eq('user_id', brokerId)
        .single();

    if (error || !data?.broker_license) {
        console.log(data)
        throw new Error("Broker license not found for this user");
    }

    return data.broker_license;
}

// Get all realtor tethers for this broker
router.get('/all', async (req, res) => {
    try {
        const brokerId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;
        const brokerLicense = await getBrokerLicense(brokerId, supabaseClient);
        const tethers = await getAllRealtorTethers(brokerLicense, supabaseClient);
        
        res.json(tethers);
    } catch (error: any) {
        console.error("Error fetching all realtor tethers:", error);
        res.status(500).json({ error: error.message || "Failed to fetch realtor tethers" });
    }
});

// Get only accepted realtor tethers for this broker
router.get('/accepted', async (req, res) => {
    try {
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        const brokerLicense = await getBrokerLicense(userId, supabaseClient);
        const tethers = await getAcceptedRealtorTethers(brokerLicense, supabaseClient);
        
        res.json(tethers);
    } catch (error: any) {
        console.error("Error fetching accepted realtor tethers:", error);
        res.status(500).json({ error: error.message || "Failed to fetch accepted realtor tethers" });
    }
});

// Accept a realtor tether request
router.put('/accept-realtor-request/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        const tether = await acceptRealtorTether(tetherId, req.user!.sub, supabaseClient);
        
        res.json(tether);
    } catch (error: any) {
        console.error("Error accepting realtor tether:", error);
        
        if (error.message === "Tether not found or does not belong to this broker") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to accept realtor tether" });
    }
});

// Deny a realtor tether request
router.put('/deny/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        const brokerLicense = await getBrokerLicense(userId, supabaseClient);
        const tether = await denyRealtorTether(tetherId, brokerLicense, req.user!.sub, supabaseClient);
        
        res.json(tether);
    } catch (error: any) {
        console.error("Error denying realtor tether:", error);
        
        if (error.message === "Tether not found or does not belong to this broker") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to deny realtor tether" });
    }
});

// Create a tether request by realtor email
router.post('/create', async (req, res) => {
    try {
        const { realtorEmail, deleteExisting } = req.body;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!realtorEmail) {
            return res.status(400).json({ error: "Realtor email is required" });
        }

        const brokerLicense = await getBrokerLicense(userId, supabaseClient);
        const tether = await createRealtorTetherByEmail(realtorEmail, brokerLicense, userId, supabaseClient, deleteExisting || false);
        
        res.json(tether);
    } catch (error: any) {
        console.error("Error creating realtor tether:", error);
        
        if (error.message.includes("Realtor not found")) {
            return res.status(404).json({ error: error.message });
        }
        if (error.message.includes("pending tether request already exists")) {
            return res.status(409).json({ error: error.message });
        }
        if (error.message.includes("active tether already exists")) {
            return res.status(409).json({ error: error.message });
        }
        if (error.message === "Failed to remove existing realtor connection") {
            return res.status(500).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to create realtor tether" });
    }
});

// Delete an accepted realtor tether
router.delete('/delete/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        const brokerLicense = await getBrokerLicense(userId, supabaseClient);
        await deleteRealtorTether(tetherId, brokerLicense, supabaseClient);
        
        res.json({ success: true, message: "Realtor tether deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting realtor tether:", error);
        
        if (error.message === "Tether not found or not in accepted state") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to delete realtor tether" });
    }
});

// Cancel a pending realtor tether
router.delete('/cancel/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        const brokerLicense = await getBrokerLicense(userId, supabaseClient);
        await cancelPendingRealtorTether(tetherId, brokerLicense, supabaseClient);
        
        res.json({ success: true, message: "Pending tether canceled successfully" });
    } catch (error: any) {
        console.error("Error canceling pending tether:", error);
        
        if (error.message === "Pending tether not found") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to cancel pending tether" });
    }
});

export default router;