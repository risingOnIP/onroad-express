import { Router } from "express";
import { Party, DealParty } from "../../types/realtor";
import { createDealPartyRow, getDealPartiesByDealId } from "../../logic/realtor/deals_parties-logic";
import { getAllDealsParties } from "../../logic/realtor/deals_parties-logic";

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { deal_id, parties } = req.body as {
      deal_id: string;
      parties: {
        role: string;
        realtorIsRepresenting: boolean;
        partyNumber: number;
        party: Omit<
          Party,
          "id" | "created_at" | "form_information" | "notes" | "phone_number"
        >;
      }[];
    };

    const dealPartyRows: DealParty[] = await createDealPartyRow(
      deal_id,
      parties,
      req.user!.sub,
      req.supabaseClient!
    );

    res.json(dealPartyRows);
  } catch (error) {
    console.error("Error creating deal party row:", error);
    res.status(500).json({ error: "Failed to create deal party row" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const dealPartyRows: DealParty[] = await getAllDealsParties(
      req.user!.sub,
      req.supabaseClient!
    );
    res.json(dealPartyRows);
  } catch (error) {
    console.error("Error getting all deal parties:", error);
    res.status(500).json({ error: "Failed to get all deal parties" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { deal_id, party_id } = req.body as {
      deal_id: string;
      party_id: string;
    };

    const { error } = await req
      .supabaseClient!.from("deals_parties")
      .delete()
      .eq("deal_id", deal_id)
      .eq("party_id", party_id);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: "Party removed from deal successfully",
    });
  } catch (error) {
    console.error("Error removing party from deal:", error);
    res.status(500).json({ error: "Failed to remove party from deal" });
  }
});

router.get("/by-deal-id/:deal_id", async (req, res) => {
  try {
    const { deal_id } = req.params;
    const dealPartyRows: DealParty[] = await getDealPartiesByDealId(
      deal_id,
      req.supabaseClient!
    );
    console.log("dealPartyRows", dealPartyRows);
    res.json(dealPartyRows);
  } catch (error) {
    console.error("Error getting deal parties by deal id:", error);
    res.status(500).json({ error: "Failed to get deal parties by deal id" });
  }
});

export default router;
