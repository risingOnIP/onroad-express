import { Router } from "express";
import { supabaseAnon } from "../../config/supabase";
import { supabase } from "../../config/supabase";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "../../lib/mailgun";

const router = Router();

// Get available deals for a client email
router.get("/available", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find deals associated with this client email
    const { data: clientDeals, error: clientError } = await supabase
      .from("deals_parties")
      .select(`
        deal_id,
        deals:deal_id (
          id,
          dealName,
          dealSide,
          isActive,
          created_at
        )
      `)
      .eq("party_email", email);

    if (clientError) {
      console.error("Error fetching client deals:", clientError);
      return res.status(500).json({ error: "Failed to fetch deals" });
    }

    // Extract and format deal information
    const deals = clientDeals
      ?.map(cd => cd.deals[0])
      .filter(deal => deal && deal.isActive) // Only active deals
      .map(deal => ({
        id: deal.id,
        dealName: deal.dealName,
        dealSide: deal.dealSide,
        isActive: deal.isActive,
        created_at: deal.created_at
      })) || [];

    res.json(deals);
  } catch (error) {
    console.error("Error fetching available deals:", error);
    res.status(500).json({ error: "Failed to fetch available deals" });
  }
});

// Send property to selected deals
router.post("/send-property", async (req, res) => {
  const { dealOptionId, address, clientEmail, selectedDealIds } = req.body;

  if (!dealOptionId || !address || !clientEmail || !selectedDealIds || !Array.isArray(selectedDealIds)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (selectedDealIds.length === 0) {
    return res.status(400).json({ error: "At least one deal must be selected" });
  }

  try {
    // Get the original deal option details
    const { data: originalDealOption, error: dealOptionError } = await supabase
      .from("deal_options")
      .select("*")
      .eq("id", dealOptionId)
      .single();

    if (dealOptionError || !originalDealOption) {
      return res.status(404).json({ error: "Original deal option not found" });
    }

    // Verify client has access to the selected deals
    const { data: clientDeals, error: clientError } = await supabase
      .from("deals_parties")
      .select("deal_id")
      .eq("party_email", clientEmail)
      .in("deal_id", selectedDealIds);

    if (clientError) {
      console.error("Error verifying client deals:", clientError);
      return res.status(500).json({ error: "Failed to verify deal access" });
    }

    const accessibleDealIds = clientDeals?.map(cd => cd.deal_id) || [];
    const unauthorizedDeals = selectedDealIds.filter(id => !accessibleDealIds.includes(id));

    if (unauthorizedDeals.length > 0) {
      return res.status(403).json({ 
        error: "Access denied to some deals",
        unauthorizedDeals 
      });
    }

    // Create new deal options for each selected deal
    const newDealOptions = [];
    for (const dealId of selectedDealIds) {
      const newDealOption = {
        deal_id: dealId,
        address: originalDealOption.address,
        property_information_response: originalDealOption.property_information_response,
        property_images: originalDealOption.property_images,
        client_submitted: true,
        client_email: clientEmail,
        created_at: new Date().toISOString(),
        // Copy other relevant fields but exclude the ID to create new records
        latitude: originalDealOption.latitude,
        longitude: originalDealOption.longitude,
        client_submit_notes: `Submitted by client from email property option`
      };

      const { data: insertedOption, error: insertError } = await supabase
        .from("deal_options")
        .insert(newDealOption)
        .select()
        .single();

      if (insertError) {
        console.error(`Error creating deal option for deal ${dealId}:`, insertError);
        continue; // Continue with other deals even if one fails
      }

      newDealOptions.push(insertedOption);
    }

    if (newDealOptions.length === 0) {
      return res.status(500).json({ error: "Failed to create any deal options" });
    }

    // Get deal and realtor information for notifications
    const { data: dealsWithRealtors, error: dealRealtorError } = await supabase
      .from("deals")
      .select(`
        id,
        dealName,
        user_id,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .in("id", selectedDealIds);

    if (dealRealtorError) {
      console.error("Error fetching deal/realtor info:", dealRealtorError);
    }

    // Send notification emails to realtors
    const emailPromises = dealsWithRealtors?.map(async (deal) => {
      if (!deal.profiles?.[0]?.email) return;

      const subject = `New Property Submitted by Client - ${deal.dealName}`;
      const text = `
Hello ${deal.profiles[0]?.full_name || 'Realtor'},

Your client ${clientEmail} has submitted a new property for consideration in the deal: ${deal.dealName}

Property Address: ${address}

The property has been added to your deal options and is ready for your review.

Please log in to your OnRoad dashboard to review the property details.

Best regards,
OnRoad Platform
      `.trim();

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Property Submitted</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2c3e50;">New Property Submitted by Client</h2>
              
              <p>Hello <strong>${deal.profiles[0]?.full_name || 'Realtor'}</strong>,</p>
              
              <p>Your client <strong>${clientEmail}</strong> has submitted a new property for consideration in the deal: <strong>${deal.dealName}</strong></p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #007bff;">Property Details</h3>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Deal:</strong> ${deal.dealName}</p>
                <p><strong>Submitted by:</strong> ${clientEmail}</p>
              </div>
              
              <p>The property has been added to your deal options and is ready for your review.</p>
              
              <p>Please log in to your OnRoad dashboard to review the property details.</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p>Best regards,<br>
                <strong>OnRoad Platform</strong></p>
              </div>
            </div>
          </body>
        </html>
      `;

              try {
          await sendEmail({
            to: deal.profiles[0]?.email,
            subject,
            text,
            html,
            from: 'OnRoad <noreply@onroad.com>'
          });
        } catch (emailError) {
          console.error(`Failed to send email to ${deal.profiles[0]?.email}:`, emailError);
        }
    }) || [];

    await Promise.allSettled(emailPromises);

    res.status(200).json({
      message: "Property sent to selected deals successfully",
      dealsUpdated: newDealOptions.length,
      dealOptionIds: newDealOptions.map(option => option.id)
    });

  } catch (error) {
    console.error("Error sending property to deals:", error);
    res.status(500).json({ 
      error: "Failed to send property", 
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;