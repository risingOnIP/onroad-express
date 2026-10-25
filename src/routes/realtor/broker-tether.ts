import { Router } from "express";
import { 
    createBrokerRealtorTether,
    getAllBrokerRealtorTethers,
    getAcceptedBrokerRealtorTethers,
    acceptTetherConnection,
    deleteBrokerRealtorTether,
    cancelPendingBrokerRealtorTether
} from "../../logic/realtor/broker-tether-logic";
import { BrokerRealtorTether } from "../../types/tethers";

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { brokerLicense, deleteExisting } = req.body;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!brokerLicense) {
            return res.status(400).json({ error: "Broker license is required" });
        }

        const tether = await createBrokerRealtorTether(brokerLicense, userId, supabaseClient, deleteExisting || false);
        res.json(tether);
    } catch (error: any) {
        console.error("Error in broker-tether create route:", error);
        
        // Handle specific errors
        if (error.message === "Broker not found with the provided license") {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === "Tether already exists between this realtor and broker") {
            return res.status(409).json({ error: error.message });
        }
        if (error.message === "Failed to remove existing broker connection") {
            return res.status(500).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to create broker-realtor tether" });
    }
});

router.get('/all', async (req, res) => {
    try {
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        const tethers = await getAllBrokerRealtorTethers(userId, supabaseClient);
        res.json(tethers);
    } catch (error: any) {
        console.error("Error fetching all broker-realtor tethers:", error);
        res.status(500).json({ error: error.message || "Failed to fetch broker-realtor tethers" });
    }
});

router.get('/accepted', async (req, res) => {
    try {
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;
        
        console.log("API: Getting accepted tethers for user:", userId);

        const tethers = await getAcceptedBrokerRealtorTethers(userId, supabaseClient) as BrokerRealtorTether[];
        
        console.log("API: Returning tethers:", tethers);
        res.json(tethers);
    } catch (error: any) {
        console.error("Error fetching accepted broker-realtor tethers:", error);
        res.status(500).json({ error: error.message || "Failed to fetch accepted broker-realtor tethers" });
    }
});

router.post('/acceptTetherConnection', async (req, res) => {
    try {
        const { tetherId } = req.body;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        const tether = await acceptTetherConnection(tetherId, userId, supabaseClient);
        res.json(tether);
    } catch (error: any) {
        console.error("Error accepting tether connection:", error);
        
        if (error.message === "Tether not found or does not belong to this realtor") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to accept tether connection" });
    }
});

router.delete('/delete/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        await deleteBrokerRealtorTether(tetherId, userId, supabaseClient);
        res.json({ success: true, message: "Broker tether deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting broker tether:", error);
        
        if (error.message === "Tether not found or not in accepted state") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to delete broker tether" });
    }
});

// Accept a broker-initiated tether request
router.put('/accept/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        const tether = await acceptTetherConnection(tetherId, userId, supabaseClient);
        res.json(tether);
    } catch (error: any) {
        console.error("Error accepting broker request:", error);
        
        if (error.message === "Tether not found or does not belong to this realtor") {
            return res.status(404).json({ error: error.message });
        }
        
        res.status(500).json({ error: error.message || "Failed to accept broker request" });
    }
});

// Deny a broker-initiated tether request
router.put('/deny/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        // For now, denying means deleting the pending tether
        const { error } = await supabaseClient
            .from('brokerRealtorTether')
            .delete()
            .eq('id', tetherId)
            .eq('status', 'pending');

        if (error) {
            console.error("Error denying broker request:", error);
            throw new Error("Failed to deny broker request");
        }

        res.json({ success: true, message: "Broker request denied" });
    } catch (error: any) {
        console.error("Error denying broker request:", error);
        res.status(500).json({ error: error.message || "Failed to deny broker request" });
    }
});

router.delete('/cancel/:tetherId', async (req, res) => {
    try {
        const { tetherId } = req.params;
        const userId = req.user!.sub;
        const supabaseClient = req.supabaseClient!;

        if (!tetherId) {
            return res.status(400).json({ error: "Tether ID is required" });
        }

        await cancelPendingBrokerRealtorTether(tetherId, userId, supabaseClient);
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