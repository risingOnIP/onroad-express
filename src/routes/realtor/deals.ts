import { Router } from "express";
import {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getDealParties,
  markDealComplete,
  getDealStepsStatuses,
  updateDealStepsStatuses,
} from "../../logic/realtor/deal-logic";
import {
  getAllDealOptionsWithForms,
  getPropertyImageSignedUrls,
} from "../../logic/realtor/dealOption-logic";
import {
  sendEmail,
  formatDealOptionsEmail,
  formatPartyPortalEmail,
} from "../../lib/mailgun";
import { getProfile } from "../../logic/profile-logic";
import { Deal, Party } from "../../types/realtor";

// Define the interface locally
interface DealOptionWithDetails {
  id: string;
  address: string;
  property_information_response?: any;
  property_images?: string[];
  created_at: string;
  deal: {
    dealName: string;
    dealSide: string;
    isActive: boolean;
    created_at: string;
  };
}

const router = Router();

// Get all deals for the authenticated user
router.get("/all", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const deals : Deal[] = await getAllDeals(req.user.sub, req.supabaseClient!);
    res.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

router.post("/", async (req, res) => {
  const { deal, parties } = req.body as {
    deal: Omit<Deal, "id" | "user_id" | "created_at">;
    parties: {
      role: string;
      realtorIsRepresenting: boolean;
      partyNumber: number;
      party: Omit<
        Party,
        | "id"
        | "created_at"
        | "form_information"
        | "notes"
        | "phone_number"
        | "realtor_id"
      >;
    }[];
  };

  if (!req.user) {
    console.error("[ROUTE] User not authenticated");
    return res.status(401).json({ error: "User not authenticated" });
  }

  // Add user_id from JWT token to the deal
  const dealWithUserId = {
    ...deal,
    user_id: req.user.sub,
  };

  try {
    const dealData = await createDeal(
      dealWithUserId,
      parties,
      req.supabaseClient!
    );

    res.status(201).json({
      message: "Deal created successfully",
      deal: dealData,
    });
  } catch (error) {
    console.error("[ROUTE] Error creating deal:", error);
    console.error(
      "[ROUTE] Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    res.status(500).json({ error: "Failed to create deal" });
  }
});

// Get a specific deal
router.get("/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const { id } = req.params;

  try {
    const deal = await getDealById(id, req.supabaseClient!);
    res.json(deal);
  } catch (error) {
    console.error("Error fetching deal:", error);
    res.status(500).json({ error: "Failed to fetch deal" });
  }
});

// Update a specific deal
router.patch("/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const { id } = req.params;
  const { deal } = req.body;

  try {
    const updatedDeal = await updateDeal(id, deal, req.supabaseClient!);
    return res.json(updatedDeal);
  } catch (error) {
    console.error("Error updating deal:", error);
    return res.status(500).json({ error: "Failed to update deal" });
  }
});

// Delete a specific deal
router.delete("/:id", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  //
  const { id } = req.params;

  try {
    await deleteDeal(id, req.supabaseClient!);
    return res.json({ status: "success", code: 200 });
  } catch (error) {
    console.error("Error deleting deal:", error);
    return res.status(500).json({ error: "Failed to delete deal" });
  }
});

router.get("/:dealId/clients", async (req, res) => {
  console.log("getting deal clients");
  try {
    const { dealId } = req.params;
    const parties = await getDealParties(dealId, req.supabaseClient!);
    console.log("this is the parties in the deals.ts route: ", parties);
    res.json(parties);
  } catch (error) {
    console.error("Error fetching deal parties:", error);
    res.status(500).json({ error: "Failed to fetch deal parties" });
  }
});

// Send deals via email
router.post("/send-email", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const { dealIds, emailAddresses, realtorName } = req.body;

    // Validate required parameters
    if (!dealIds || !Array.isArray(dealIds) || dealIds.length === 0) {
      return res
        .status(400)
        .json({ error: "dealIds is required and must be a non-empty array" });
    }

    if (
      !emailAddresses ||
      !Array.isArray(emailAddresses) ||
      emailAddresses.length === 0
    ) {
      return res.status(400).json({
        error: "emailAddresses is required and must be a non-empty array",
      });
    }

    // Validate email addresses format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emailAddresses.filter(
      (email) => !emailRegex.test(email)
    );
    if (invalidEmails.length > 0) {
      return res.status(400).json({
        error: "Invalid email addresses",
        invalidEmails,
      });
    }

    // Fetch deals and their deal options with property information
    const dealOptionsWithDetails = [];
    const imageUrls: {
      [dealOptionId: string]: { [imagePath: string]: string };
    } = {};

    for (const dealId of dealIds) {
      try {
        // Get the deal details
        const deal = await getDealById(dealId, req.supabaseClient!);
        if (!deal) continue;

        // Get all deal options for this deal
        const dealOptions = await getAllDealOptionsWithForms(
          dealId,
          req.supabaseClient!
        );

        for (const dealOption of dealOptions) {
          // Format the deal option with deal information
          const dealOptionWithDetails: DealOptionWithDetails = {
            id: dealOption.id as string,
            address: dealOption.address as string,
            property_information_response:
              dealOption.property_information_response,
            property_images: (dealOption.property_images || []) as string[],
            created_at: dealOption.created_at as string,
            deal: {
              dealName: deal.dealName as string,
              dealSide: deal.dealSide as string,
              isActive: deal.isActive as boolean,
              created_at: deal.created_at.toISOString(),
            },
          };

          dealOptionsWithDetails.push(dealOptionWithDetails);

          // Get signed URLs for property images
          if (
            dealOptionWithDetails.property_images &&
            dealOptionWithDetails.property_images.length > 0
          ) {
            try {
              const signedUrls = await getPropertyImageSignedUrls(
                dealOptionWithDetails.property_images,
                req.supabaseClient!
              );
              imageUrls[dealOptionWithDetails.id] = signedUrls;
            } catch (imageError) {
              console.error(
                `Error fetching image URLs for deal option ${dealOptionWithDetails.id}:`,
                imageError
              );
              // Continue without images for this deal option
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching deal ${dealId}:`, error);
        // Continue with other deals even if one fails
      }
    }

    if (dealOptionsWithDetails.length === 0) {
      return res.status(404).json({
        error: "No valid deal options found for the provided deal IDs",
      });
    }

    // Format email content with property information and images
    const { subject, text, html } = formatDealOptionsEmail(
      dealOptionsWithDetails,
      realtorName,
      imageUrls
    );

    // Send email
    const emailResult = await sendEmail({
      to: emailAddresses,
      subject,
      text,
      html,
      from: `${realtorName || "OnRoad Realtor"} <noreply@onroad.com>`,
    });

    res.status(200).json({
      message: "Email sent successfully",
      emailsSent: emailAddresses.length,
      dealOptionsSent: dealOptionsWithDetails.length,
      emailResult: {
        id: emailResult.id,
        message: emailResult.message,
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Send client portal invitation
router.post("/send-client-portal-invitation", async (req, res) => {
  interface InviteClientParams {
    dealId: string;
    clientEmail: string;
    clientName: string;
    clientId: string;
  }

  interface InviteClientResponse {
    success: boolean;
    portalUrl: string;
    message?: string;
  }

  try {
    const { clientEmail, clientName, clientId, dealId } =
      req.body as InviteClientParams;

    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    // Validate required fields
    if (!clientEmail || !clientName) {
      return res
        .status(400)
        .json({ error: "Client email and name are required" });
    }

    //get realtor name

    const realtorProfile = await getProfile(
      req.user.sub,
      "realtor",
      req.supabaseClient!
    );
    const realtorName = realtorProfile.firstName;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    // Get deal information
    const deal = await getDealById(dealId, req.supabaseClient!);
    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    // Verify user owns this deal
    if (deal.user_id !== req.user.sub) {
      return res
        .status(403)
        .json({ error: "Not authorized to access this deal" });
    }

    let finalClientId = clientId;

    // Generate portal URL with clientId
    const portalUrl = `${
      process.env.FRONTEND_URL || "www.onroadai.com"
    }/client-portal/${dealId}/${finalClientId}`;

    // Format and send invitation email
    const { subject, text, html } = formatPartyPortalEmail({
      recipientEmail: clientEmail,
      recipientName: clientName,
      dealId: dealId,
      portalUrl: portalUrl,
      senderName: realtorName || "Your Realtor",
    });

    const emailResult = await sendEmail({
      to: clientEmail,
      subject,
      text,
      html,
    });

    const returning: InviteClientResponse = {
      success: true,
      portalUrl: portalUrl,
      message: "Client portal invitation sent successfully",
    };

    res.status(200).json(returning);
  } catch (error) {
    console.error("Error sending client portal invitation:", error);
    res.status(500).json({
      error: "Failed to send invitation",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get stages for a deal based on its template type
router.get("/:dealId/stages", async (req, res) => {
  try {
    console.log("Fetching stages for dealId:", req.params.dealId);

    if (!req.user) {
      console.log("User not authenticated");
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealId } = req.params;

    // Get the deal to find its template
    console.log("Getting deal by ID:", dealId);
    const deal = await getDealById(dealId, req.supabaseClient!);
    if (!deal) {
      console.log("Deal not found:", dealId);
      return res.status(404).json({ error: "Deal not found" });
    }

    console.log("Deal template:", deal.template);

    // Import KNOWLEDGE_BASE here to avoid circular dependencies
    const { KNOWLEDGE_BASE } = await import(
      "../../logic/realtor/centralIntelligence/centralIntelligence"
    );

    // Parse template to get deal type
    const templateParts = (deal.template as string).split("-");
    const dealSide = templateParts[0]; // buy, sell, lease, rent
    const propertyType = templateParts[1]; // residential, commercial, etc.

    console.log(
      "Parsed template - dealSide:",
      dealSide,
      "propertyType:",
      propertyType
    );

    // Get stages from knowledge base
    const knowledgeEntry = KNOWLEDGE_BASE[dealSide]?.[propertyType]?.["TX"];
    console.log("Knowledge entry found:", !!knowledgeEntry);
    console.log("Stages in knowledge entry:", knowledgeEntry?.stages);

    if (!knowledgeEntry?.stages) {
      console.log("No stages defined in knowledge base, returning defaults");
      // Return default stages if none defined
      return res.json([
        { name: "initial", color: "#6B7280", order: 0 },
        { name: "in_progress", color: "#3B82F6", order: 1 },
        { name: "completed", color: "#10B981", order: 2 },
      ]);
    }

    console.log("Returning stages:", knowledgeEntry.stages);
    res.json(knowledgeEntry.stages);
  } catch (error) {
    console.error("Error fetching stages:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    res.status(500).json({ error: "Failed to fetch stages" });
  }
});

router.patch("/mark-complete/:dealId", async (req, res) => {
  try {
    const { dealId } = req.params;

    const updatedDeal = await markDealComplete(dealId, req.supabaseClient!);
    return res.json(updatedDeal);
  } catch (error) {
    console.error("Error marking deal complete:", error);
    return res.status(500).json({ error: "Failed to mark deal complete" });
  }
});

router.put("/:dealId/steps-statuses", async (req, res) => {
  try {
    const { dealId } = req.params;
    const { stepsStatuses } = req.body;

    console.log("this is what i got from the body: ", stepsStatuses);
    const updatedDeal: Deal = await updateDealStepsStatuses(
      dealId,
      stepsStatuses,
      req.supabaseClient!
    );
    return res.json(updatedDeal);
  } catch (error) {
    console.error("Error updating deal steps statuses:", error);
    return res
      .status(500)
      .json({ error: "Failed to update deal steps statuses" });
  }
});

router.get("/:dealId/steps-statuses", async (req, res) => {
  try {
    const { dealId } = req.params;
    const stepsStatuses: Deal = await getDealStepsStatuses(
      dealId,
      req.supabaseClient!
    );
    return res.json(stepsStatuses);
  } catch (error) {
    console.error("Error fetching deal steps statuses:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch deal steps statuses" });
  }
});

export default router;
