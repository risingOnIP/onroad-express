import Mailgun from "mailgun.js";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const mailgun = new Mailgun(FormData);

// Initialize Mailgun client
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY as string, // Your API key
});

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

interface EmailData {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
  attachments?: Array<{
    data: Buffer;
    filename: string;
    contentType: string;
  }>;
}

export async function sendEmail(emailData: EmailData) {
  console.log("[MAILGUN] sendEmail function called");
  console.log("[MAILGUN] Email details:");
  console.log("  - To:", Array.isArray(emailData.to) ? emailData.to.join(", ") : emailData.to);
  console.log("  - Subject:", emailData.subject);
  console.log("  - From:", emailData.from || "OnRoad Realtor <noreply@onroadai.com>");
  console.log("  - Has HTML:", !!emailData.html);
  console.log("  - Has Text:", !!emailData.text);
  console.log("  - Has Attachments:", !!emailData.attachments);
  console.log("  - Mailgun Domain:", MAILGUN_DOMAIN);
  console.log("  - Mailgun API Key exists:", !!process.env.MAILGUN_API_KEY);
  
  try {
    const messageData: any = {
      from: emailData.from || "OnRoad Realtor <noreply@onroadai.com>",
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    };

    if (emailData.attachments) {
      messageData.attachment = emailData.attachments;
    }

    console.log("[MAILGUN] Sending email to Mailgun API...");
    const data = await mg.messages.create(MAILGUN_DOMAIN!, messageData);

    console.log("[MAILGUN] Email sent successfully!");
    console.log("[MAILGUN] Mailgun response:", data);
    console.log("[MAILGUN] Message ID:", data.id);
    console.log("[MAILGUN] Message:", data.message);
    return data;
  } catch (error) {
    console.error("[MAILGUN] Error sending email:", error);
    console.error("[MAILGUN] Error type:", error?.constructor?.name);
    console.error("[MAILGUN] Error message:", error instanceof Error ? error.message : "Unknown error");
    console.error("[MAILGUN] Error stack:", error instanceof Error ? error.stack : undefined);
    
    // Log additional error details if available
    if (error && typeof error === 'object' && 'response' in error) {
      console.error("[MAILGUN] Response error:", (error as any).response);
      console.error("[MAILGUN] Response status:", (error as any).response?.status);
      console.error("[MAILGUN] Response data:", (error as any).response?.data);
    }
    
    throw error;
  }
}

// Interface for property information
interface PropertyInformation {
  property_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  property_type?: string;
  listing_price?: string;
  bedrooms?: string;
  bathrooms?: string;
  building_square_footage?: string;
  year_built?: string;
  lot_size?: string;
  mls_listing_number?: string;
  occupancy_status?: string;
  [key: string]: any;
}

interface DealOptionWithDetails {
  id: string;
  address: string;
  property_information_response?: PropertyInformation;
  property_images?: string[];
  created_at: string;
  deal: {
    dealName: string;
    dealSide: string;
    isActive: boolean;
    created_at: string;
  };
}

// Original function for backward compatibility
export function formatDealEmail(
  deals: any[],
  realtorName: string = "Your Realtor"
): { subject: string; text: string; html: string } {
  /* ─────────────────────
     1. Subject with engagement
  ───────────────────── */
  const subject = `🏠 ${deals.length} New Property Deal${
    deals.length > 1 ? "s" : ""
  } from ${realtorName}`;

  /* ─────────────────────
     2. Enhanced plain-text
  ───────────────────── */
  const text = `
Hi there!

${realtorName} has shared ${deals.length} exciting property deal${
    deals.length > 1 ? "s" : ""
  } with you.

Property Deals:
${deals
  .map(
    (deal, index) => `
${index + 1}. ${deal.dealName}
   • Deal Type: ${deal.dealSide}
   • Status: ${deal.isActive ? "Active" : "Inactive"}
   ${deal.address ? `• Address: ${deal.address}` : ""}
   • Created: ${new Date(deal.created_at).toLocaleDateString()}
`
  )
  .join("\n")}

View these deals in your OnRoad portal for more details, photos, and next steps.

Best regards,
${realtorName}
OnRoad Platform

P.S. Active deals may have limited availability, so don't miss out!

13239 Dolomite Drive, Frisco, Texas 75035
  `.trim();

  /* ─────────────────────
     3. Premium HTML design
  ───────────────────── */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>New Property Deals</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:600px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Deal count badge */
.deal-count{display:inline-block;background:#4299e1;color:#ffffff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;margin-top:16px;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Deal cards */
.deal-card{background:#f7fafc;border-radius:12px;padding:24px;margin-bottom:16px;border-left:4px solid #4299e1;transition:all 0.3s ease;}
.deal-card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.1);}
.deal-header{display:flex;justify-content:space-between;align-items:start;margin-bottom:16px;}
.deal-title{font-size:18px;font-weight:600;color:#2d3748;margin:0;}
.deal-badges{display:flex;gap:8px;flex-wrap:wrap;}
.badge{display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;}
.badge-type{background:#e6f3ff;color:#2563eb;}
.badge-active{background:#d1fae5;color:#065f46;}
.badge-inactive{background:#fee2e2;color:#991b1b;}
.deal-details{font-size:14px;color:#4a5568;line-height:1.6;}
.deal-detail{margin-bottom:8px;display:flex;align-items:center;}
.detail-icon{width:20px;text-align:center;margin-right:8px;}

/* CTA section */
.cta-section{background:#edf2f7;border-radius:12px;padding:32px;margin:32px 0;text-align:center;}
.cta-text{font-size:16px;color:#2d3748;margin:0 0 20px 0;}
.cta-button{display:inline-block;background:#4299e1;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(66,153,225,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#3182ce;box-shadow:0 6px 12px rgba(66,153,225,0.4);}

/* Footer */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer-sender{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #4a5568;}
.footer-sender p{color:#e2e8f0;font-size:15px;margin:0 0 8px 0;}
.footer-sender h4{color:#ffffff;font-size:20px;margin:8px 0 0 0;font-weight:600;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .deal-card{background:#374151!important;}
  .deal-title{color:#e2e8f0!important;}
  .deal-details{color:#9ca3af!important;}
  .cta-section{background:#374151!important;}
  .cta-text{color:#e2e8f0!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .deal-header{flex-direction:column;}
  .deal-badges{margin-top:12px;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="New Property Deals" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>New Property Opportunities</h1>
      <p>Curated by ${realtorName}</p>
      <div class="deal-count">${deals.length} Deal${
    deals.length > 1 ? "s" : ""
  } Available</div>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi there! 👋</p>
      
      <p class="intro-text">
        I'm excited to share ${
          deals.length === 1
            ? "an exclusive property deal"
            : "some carefully selected property deals"
        } 
        that ${deals.length === 1 ? "matches" : "match"} your interests. 
        ${
          deals.filter((d) => d.isActive).length > 0
            ? "These active opportunities won't last long!"
            : ""
        }
      </p>
      
      <!-- Deal Cards -->
      ${deals
        .map(
          (deal, index) => `
        <div class="deal-card">
          <div class="deal-header">
            <h3 class="deal-title">${deal.dealName}</h3>
            <div class="deal-badges">
              <span class="badge badge-type">${deal.dealSide}</span>
              <span class="badge ${
                deal.isActive ? "badge-active" : "badge-inactive"
              }">
                ${deal.isActive ? "✓ Active" : "Inactive"}
              </span>
            </div>
          </div>
          <div class="deal-details">
            ${
              deal.address
                ? `
              <div class="deal-detail">
                <span class="detail-icon">📍</span>
                <span>${deal.address}</span>
              </div>
            `
                : ""
            }
            <div class="deal-detail">
              <span class="detail-icon">📅</span>
              <span>Listed ${new Date(deal.created_at).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}</span>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
      
      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">
          Ready to explore these opportunities in detail?<br>
          View photos, documents, and take next steps in your portal.
        </p>
        <a href="#" class="cta-button" style="color:#ffffff;text-decoration:none;">
          View All Deals →
        </a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;">
        Have questions about any of these properties? I'm here to help! 
        Simply reply to this email or give me a call.
      </p>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <div class="footer-sender">
        <p>Best regards,</p>
        <h4>${realtorName}</h4>
      </div>
      <p><strong>OnRoad</strong>: Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}

// New enhanced function for deal options with property information and images
// Modern Deal Options Email Template with Property Details
export function formatDealOptionsEmail(
  dealOptions: DealOptionWithDetails[],
  realtorName: string = "Your Realtor",
  imageUrls: { [dealOptionId: string]: { [imagePath: string]: string } } = {}
): { subject: string; text: string; html: string } {
  /* ─────────────────────
     1. Subject with count
  ───────────────────── */
  const subject = `🏡 ${dealOptions.length} Property Listing${
    dealOptions.length > 1 ? "s" : ""
  } from ${realtorName}`;

  /* ─────────────────────
     2. Enhanced plain-text
  ───────────────────── */
  let text = `
Hi there!

${realtorName} has curated ${dealOptions.length} exceptional property listing${
    dealOptions.length > 1 ? "s" : ""
  } for you.

Property Listings:
`;

  dealOptions.forEach((dealOption, index) => {
    const propertyInfo = dealOption.property_information_response || {};
    const fullAddress = formatPropertyAddress(propertyInfo, dealOption.address);

    text += `
${index + 1}. ${dealOption.deal.dealName}
   • Address: ${fullAddress}
   • Deal Type: ${dealOption.deal.dealSide}
   • Status: ${dealOption.deal.isActive ? "Active" : "Inactive"}`;

    if (propertyInfo.listing_price) {
      text += `\n   • Price: ${propertyInfo.listing_price}`;
    }
    if (propertyInfo.bedrooms && propertyInfo.bathrooms) {
      text += `\n   • Beds/Baths: ${propertyInfo.bedrooms}/${propertyInfo.bathrooms}`;
    }
    if (propertyInfo.building_square_footage) {
      text += `\n   • Square Feet: ${propertyInfo.building_square_footage}`;
    }
    if (propertyInfo.property_type) {
      text += `\n   • Type: ${propertyInfo.property_type}`;
    }
    text += `\n   • Listed: ${new Date(
      dealOption.created_at
    ).toLocaleDateString()}\n`;
  });

  text += `
View these properties with photos, virtual tours, and detailed information in your OnRoad portal.

Best regards,
${realtorName}
OnRoad Platform

P.S. Schedule a viewing for any property that catches your eye!

13239 Dolomite Drive, Frisco, Texas 75035
  `.trim();

  /* ─────────────────────
     3. Premium HTML design
  ───────────────────── */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Property Listings</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:700px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Property count badge */
.property-count{display:inline-block;background:#4299e1;color:#ffffff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;margin-top:16px;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Property cards */
.property-card{background:#ffffff;border-radius:12px;margin-bottom:24px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:all 0.3s ease;}
.property-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.15);}

/* Property header */
.property-header{background:#f7fafc;padding:20px 24px;border-bottom:1px solid #e2e8f0;}
.property-title{font-size:20px;font-weight:600;color:#2d3748;margin:0 0 8px 0;}
.property-address{font-size:15px;color:#4a5568;margin:0 0 12px 0;display:flex;align-items:center;}
.property-badges{display:flex;gap:8px;flex-wrap:wrap;}
.badge{display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;}
.badge-type{background:#e6f3ff;color:#2563eb;}
.badge-active{background:#d1fae5;color:#065f46;}
.badge-inactive{background:#fee2e2;color:#991b1b;}

/* Property images */
.property-images{position:relative;height:250px;overflow:hidden;background:#e2e8f0;}
.property-images img{width:100%;height:100%;object-fit:cover;}
.image-gallery{display:flex;height:100%;}
.main-image{flex:1;position:relative;}
.thumbnail-strip{width:120px;display:flex;flex-direction:column;gap:2px;background:#1a202c;}
.thumbnail{height:calc(25% - 2px);overflow:hidden;cursor:pointer;opacity:0.7;transition:opacity 0.3s;}
.thumbnail:hover{opacity:1;}
.thumbnail img{width:100%;height:100%;object-fit:cover;}
.more-images{background:#1a202c;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;}
.no-image{display:flex;align-items:center;justify-content:center;height:100%;color:#718096;font-size:48px;}

/* Property details */
.property-details{padding:24px;}
.detail-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;margin-bottom:20px;}
.detail-item{text-align:center;padding:16px;background:#f7fafc;border-radius:8px;}
.detail-value{font-size:22px;font-weight:600;color:#2d3748;margin-bottom:4px;}
.detail-label{font-size:12px;color:#718096;text-transform:uppercase;letter-spacing:0.5px;}

/* Additional info */
.additional-info{margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;}
.info-row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;}
.info-label{color:#718096;}
.info-value{color:#2d3748;font-weight:500;}

/* CTA section */
.cta-section{background:#edf2f7;border-radius:12px;padding:32px;margin:32px 0;text-align:center;}
.cta-text{font-size:16px;color:#2d3748;margin:0 0 20px 0;}
.cta-button{display:inline-block;background:#4299e1;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(66,153,225,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#3182ce;box-shadow:0 6px 12px rgba(66,153,225,0.4);}

/* Footer */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer-sender{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #4a5568;}
.footer-sender p{color:#e2e8f0;font-size:15px;margin:0 0 8px 0;}
.footer-sender h4{color:#ffffff;font-size:20px;margin:8px 0 0 0;font-weight:600;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .property-card{background:#374151!important;}
  .property-header{background:#4b5563!important;border-bottom-color:#6b7280!important;}
  .property-title{color:#e2e8f0!important;}
  .property-address{color:#9ca3af!important;}
  .property-details{background:#374151!important;}
  .detail-item{background:#4b5563!important;}
  .detail-value{color:#e2e8f0!important;}
  .additional-info{border-top-color:#6b7280!important;}
  .info-label{color:#9ca3af!important;}
  .info-value{color:#e2e8f0!important;}
  .cta-section{background:#374151!important;}
  .cta-text{color:#e2e8f0!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .property-images{height:200px!important;}
  .image-gallery{flex-direction:column!important;}
  .thumbnail-strip{width:100%!important;flex-direction:row!important;height:80px!important;}
  .thumbnail{width:25%!important;height:100%!important;}
  .detail-grid{grid-template-columns:repeat(2,1fr)!important;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="Property Listings" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="700" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>Exclusive Property Listings</h1>
      <p>Handpicked by ${realtorName}</p>
      <div class="property-count">${dealOptions.length} Propert${
    dealOptions.length > 1 ? "ies" : "y"
  } Available</div>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi there! 👋</p>
      
      <p class="intro-text">
        I've carefully selected ${
          dealOptions.length === 1
            ? "an exceptional property"
            : `${dealOptions.length} outstanding properties`
        } 
        that ${
          dealOptions.length === 1 ? "matches" : "match"
        } your criteria. Each listing has been vetted for quality and value.
      </p>
      
      <!-- Property Cards -->
      ${dealOptions
        .map((dealOption, index) => {
          const propertyInfo = dealOption.property_information_response || {};
          const images = imageUrls[dealOption.id] || {};
          const imageUrlsList = Object.values(images);
          const fullAddress = formatPropertyAddress(
            propertyInfo,
            dealOption.address
          );

          return `
        <div class="property-card">
          <!-- Property Header -->
          <div class="property-header">
            <h3 class="property-title">${dealOption.deal.dealName}</h3>
            <p class="property-address">
              <span style="margin-right:8px;">📍</span>
              ${fullAddress}
            </p>
            <div class="property-badges">
              <span class="badge badge-type">${dealOption.deal.dealSide}</span>
              <span class="badge ${
                dealOption.deal.isActive ? "badge-active" : "badge-inactive"
              }">
                ${dealOption.deal.isActive ? "✓ Active" : "Inactive"}
              </span>
              ${
                propertyInfo.property_type
                  ? `<span class="badge badge-type">${propertyInfo.property_type}</span>`
                  : ""
              }
            </div>
          </div>
          
          <!-- Property Images -->
          <div class="property-images">
            ${
              imageUrlsList.length > 0
                ? `
              <div class="image-gallery">
                <div class="main-image">
                  <img src="${imageUrlsList[0]}" alt="${
                    dealOption.deal.dealName
                  }">
                </div>
                ${
                  imageUrlsList.length > 1
                    ? `
                  <div class="thumbnail-strip">
                    ${imageUrlsList
                      .slice(1, 4)
                      .map(
                        (url) => `
                      <div class="thumbnail">
                        <img src="${url}" alt="Property view">
                      </div>
                    `
                      )
                      .join("")}
                    ${
                      imageUrlsList.length > 4
                        ? `
                      <div class="thumbnail more-images">
                        +${imageUrlsList.length - 4}
                      </div>
                    `
                        : ""
                    }
                  </div>
                `
                    : ""
                }
              </div>
            `
                : `
              <div class="no-image">🏠</div>
            `
            }
          </div>
          
          <!-- Property Details -->
          <div class="property-details">
            <div class="detail-grid">
              ${
                propertyInfo.listing_price
                  ? `
                <div class="detail-item" style="background:#e8f5e8;">
                  <div class="detail-value" style="color:#059669;">${propertyInfo.listing_price}</div>
                  <div class="detail-label">Price</div>
                </div>
              `
                  : ""
              }
              
              ${
                propertyInfo.bedrooms
                  ? `
                <div class="detail-item">
                  <div class="detail-value">${propertyInfo.bedrooms}</div>
                  <div class="detail-label">Bedrooms</div>
                </div>
              `
                  : ""
              }
              
              ${
                propertyInfo.bathrooms
                  ? `
                <div class="detail-item">
                  <div class="detail-value">${propertyInfo.bathrooms}</div>
                  <div class="detail-label">Bathrooms</div>
                </div>
              `
                  : ""
              }
              
              ${
                propertyInfo.building_square_footage
                  ? `
                <div class="detail-item">
                  <div class="detail-value">${propertyInfo.building_square_footage}</div>
                  <div class="detail-label">Sq Ft</div>
                </div>
              `
                  : ""
              }
            </div>
            
            <!-- Additional Information -->
            <div class="additional-info">
              ${
                propertyInfo.year_built
                  ? `
                <div class="info-row">
                  <span class="info-label">Year Built</span>
                  <span class="info-value">${propertyInfo.year_built}</span>
                </div>
              `
                  : ""
              }
              
              ${
                propertyInfo.lot_size
                  ? `
                <div class="info-row">
                  <span class="info-label">Lot Size</span>
                  <span class="info-value">${propertyInfo.lot_size}</span>
                </div>
              `
                  : ""
              }
              
              <div class="info-row">
                <span class="info-label">Listed</span>
                <span class="info-value">${new Date(
                  dealOption.created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
            </div>
          </div>
        </div>
      `;
        })
        .join("")}
      
      <!-- CTA Section -->
      <div class="cta-section">
        <p class="cta-text">
          Want to see more photos, schedule viewings, or get additional details?<br>
          Everything you need is in your personalized portal.
        </p>
        <a href="#" class="cta-button" style="color:#ffffff;text-decoration:none;">
          View Full Listings →
        </a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;text-align:center;">
        <strong>Ready to move fast?</strong> The best properties don't stay on the market long.<br>
        Reply to this email or call me directly to schedule viewings.
      </p>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <div class="footer-sender">
        <p>Best regards,</p>
        <h4>${realtorName}</h4>
      </div>
      <p><strong>OnRoad</strong>: Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}

// Helper function to format property address
function formatPropertyAddress(
  propertyInfo: any,
  defaultAddress: string
): string {
  if (propertyInfo.address && propertyInfo.city && propertyInfo.state) {
    return `${propertyInfo.address}, ${propertyInfo.city}, ${
      propertyInfo.state
    } ${propertyInfo.zip || ""}`.trim();
  }
  return defaultAddress || "Address Available Upon Request";
}

// Interface for signature collection email
interface SignatureEmailData {
  recipientEmail: string;
  recipientName: string;
  signatureUrl: string;
  formnames: string[];
  senderName: string;
  expirationDate: string;
}

// Format signature collection email with matching modern style
export function formatSignatureCollectionEmail(data: SignatureEmailData): {
  subject: string;
  text: string;
  html: string;
} {
  /* ─────────────────────
     1. Subject with urgency
  ───────────────────── */
  const subject = `✍️ Signature Required - ${
    data.formnames.length > 1
      ? `${data.formnames.length} Documents`
      : data.formnames[0] || "Important Documents"
  }`;

  /* ─────────────────────
     2. Enhanced plain-text
  ───────────────────── */
  const text = `
Hi ${data.recipientName},

${
  data.senderName
} needs your signature on important documents for "${"your transaction"}".

Document${data.formnames.length > 1 ? "s" : ""} Ready for Signature:
${data.formnames?.map((formname) => `- ${formname}`).join("\n") || ""}

🔗 Sign Documents Now:
${data.signatureUrl}

⏰ Important Details:
• Deadline: ${data.expirationDate}
• Email verification required for security
• All signatures are legally binding
• Works on any device (phone, tablet, computer)

The signing process takes just a few minutes. You'll be able to review each document before signing.

Questions? Contact ${data.senderName} directly or reply to this email.

Is the button not working? Copy and paste this link into your preferred search engine:
${data.signatureUrl}

Best regards,
${data.senderName}
OnRoad Platform

P.S. Don't wait! This link expires on ${data.expirationDate}.

  `.trim();

  /* ─────────────────────
     3. Premium HTML design matching party portal style
  ───────────────────── */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Signature Request</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles - matching party portal */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:600px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Urgency banner */
.urgency-banner{background:#fef3c7;border-bottom:2px solid #fbbf24;padding:16px;text-align:center;}
.urgency-banner p{color:#92400e;font-size:14px;font-weight:600;margin:0;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Document list */
.documents-container{background:#f7fafc;border-radius:12px;padding:24px;margin:32px 0;border:2px solid #e2e8f0;}
.documents-header{display:flex;align-items:center;margin-bottom:20px;}
.documents-icon{width:48px;height:48px;background:#4299e1;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;margin-right:16px;}
.documents-title{flex:1;}
.documents-title h3{margin:0;font-size:18px;color:#2d3748;}
.documents-title p{margin:4px 0 0 0;font-size:14px;color:#718096;}
.document-item{background:#ffffff;border-radius:8px;padding:16px;margin-bottom:12px;display:flex;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
.document-number{width:32px;height:32px;background:#e6f3ff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;color:#2563eb;margin-right:16px;flex-shrink:0;}
.document-name{font-size:15px;color:#2d3748;font-weight:500;}

/* CTA button - green for signing */
.cta-container{text-align:center;margin:40px 0;}
.cta-button{display:inline-block;background:#10b981;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(16,185,129,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#059669;box-shadow:0 6px 12px rgba(16,185,129,0.4);}

/* Important info cards */
.info-cards{margin:32px 0;}
.info-card{display:flex;align-items:flex-start;margin-bottom:16px;padding:16px;background:#fef3c7;border-radius:8px;border-left:4px solid #f59e0b;}
.info-icon{font-size:20px;margin-right:12px;flex-shrink:0;}
.info-content{flex:1;}
.info-content p{font-size:14px;color:#92400e;margin:0;line-height:1.5;}

/* Link fallback */
.link-fallback{margin-top:24px;padding:16px;background:#f7fafc;border-radius:8px;word-break:break-all;}
.link-fallback p{font-size:13px;color:#718096;margin:0 0 8px 0;}
.link-fallback a{color:#4299e1;font-size:14px;}

/* Footer - matching party portal */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer-sender{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #4a5568;}
.footer-sender p{color:#e2e8f0;font-size:15px;margin:0 0 8px 0;}
.footer-sender h4{color:#ffffff;font-size:20px;margin:8px 0 0 0;font-weight:600;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}
.social-links{margin-top:20px;}
.social-links a{display:inline-block;margin:0 8px;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .urgency-banner{background:#7c2d12!important;border-bottom-color:#ea580c!important;}
  .urgency-banner p{color:#fed7aa!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .documents-container{background:#374151!important;border-color:#4b5563!important;}
  .documents-title h3{color:#e2e8f0!important;}
  .documents-title p{color:#9ca3af!important;}
  .document-item{background:#4b5563!important;}
  .document-name{color:#e2e8f0!important;}
  .info-card{background:#7c2d12!important;border-left-color:#ea580c!important;}
  .info-content p{color:#fed7aa!important;}
  .link-fallback{background:#374151!important;}
  .link-fallback p{color:#9ca3af!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .documents-container{padding:20px!important;}
  .documents-header{flex-direction:column;text-align:center;}
  .documents-icon{margin:0 0 16px 0!important;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="Signature Request" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>Signature Required</h1>
      <p>${"Important Documents"}</p>
    </td>
  </tr>
  
  <!-- Urgency Banner -->
  <tr>
    <td class="urgency-banner">
      <p>⏰ Action Required by ${data.expirationDate}</p>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi <strong>${data.recipientName}</strong> 👋</p>
      
      <p class="intro-text">
        <strong>${
          data.senderName
        }</strong> has sent you a document that requires your signature.
      </p>
      
      <!-- Documents List -->
      <div class="documents-container">
        <div class="documents-header">
          <div class="documents-icon">📄</div>
          <div class="documents-title">
            <h3>Document${data.formnames.length > 1 ? "s" : ""} to Sign</h3>
            <p>${
              data.formnames.length > 1 ? "Documents" : "Document"
            } ready for review</p>
          </div>
        </div>
        
        ${data.formnames
          .map(
            (formname, index) => `
          <div class="document-item">
            <div class="document-number">${index + 1}</div>
            <div class="document-name">${formname}</div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div class="cta-container">
        <a href="${
          data.signatureUrl
        }" class="cta-button" style="color:#ffffff;text-decoration:none;">
          Review & Sign Documents →
        </a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;">
        Need help? Contact ${data.senderName} directly or reply to this email. 
        The signing process typically takes just a few minutes.
      </p>
      
      <!-- Link fallback -->
      <div class="link-fallback">
        <p><strong>Is the button not working?</strong> Copy and paste this link into your preferred search engine:</p>
        <a href="${data.signatureUrl}" style="color:#4299e1;word-break:break-all;">${data.signatureUrl}</a>
      </div>
      
      <!-- Important Information -->
      <div class="info-cards">
        
        <div class="info-card">
          <span class="info-icon">🔐</span>
          <div class="info-content">
            <p><strong>Secure:</strong> You will need to verify your email before signing for added security.</p>
          </div>
        </div>
        
        <div class="info-card">
          <span class="info-icon">⚖️</span>
          <div class="info-content">
            <p><strong>Legal:</strong> All electronic signatures are legally binding and encrypted.</p>
          </div>
        </div>
        
        <div class="info-card">
          <span class="info-icon">📱</span>
          <div class="info-content">
            <p><strong>Any Device:</strong> Sign from your computer, tablet, or smartphone.</p>
          </div>
        </div>
      </div>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <div class="footer-sender">
        <p>Best regards,</p>
        <h4>${data.senderName}</h4>
      </div>
      <p><strong>OnRoad</strong> - Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
      <div class="social-links">
        <a href="#" style="color:#90cdf4;">Privacy Policy</a> · 
        <a href="#" style="color:#90cdf4;">Terms of Service</a> · 
        <a href="#" style="color:#90cdf4;">Help Center</a>
      </div>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}
// Interface for party portal email
interface PartyPortalEmailData {
  recipientEmail: string;
  recipientName: string;
  dealId: string;
  portalUrl: string;
  senderName: string;
}

// Format party portal access email template
export function formatPartyPortalEmail(data: PartyPortalEmailData): {
  subject: string;
  text: string;
  html: string;
} {
  /* ─────────────────────
     1. Subject with urgency
  ───────────────────── */
  const subject = `${data.senderName} invited you to Onroad: your secure portal is ready.`;

  /* ─────────────────────
     2. Enhanced plain-text
  ───────────────────── */
  const text = `
Hi ${data.recipientName},

Great news! ${data.senderName} has set up your secure portal for Onroad.

Your portal is your one-stop hub where you can:
✓ Browse all available property options with photos & details
✓ Complete required intake forms at your own pace
✓ Review and electronically sign important documents
✓ Track deal progress in real-time

🔗 Access Your Portal Now:
${data.portalUrl}

Security Note: You'll receive a one-time verification code via email when you first sign in.

Need help? Simply reply to this email or contact ${data.senderName} directly.

Best regards,
The OnRoad Team

P.S. Your portal works great on mobile too - access it anywhere, anytime!

13239 Dolomite Drive, Frisco, Texas 75035
  `.trim();

  /* ─────────────────────
     3. Premium HTML design
  ───────────────────── */
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Your Party Portal is Ready</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:600px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Feature cards */
.features-container{margin:32px 0;}
.feature-card{background:#f7fafc;border-radius:12px;padding:24px;margin-bottom:16px;border-left:4px solid #4299e1;}
.feature-icon{display:inline-block;width:40px;height:40px;background:#e6f3ff;border-radius:50%;text-align:center;line-height:40px;font-size:20px;margin-right:16px;vertical-align:middle;}
.feature-text{display:inline-block;vertical-align:middle;font-size:15px;color:#2d3748;width:calc(100% - 64px);}

/* CTA button */
.cta-container{text-align:center;margin:40px 0;}
.cta-button{display:inline-block;background:#4299e1;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(66,153,225,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#3182ce;box-shadow:0 6px 12px rgba(66,153,225,0.4);}

/* Security notice */
.security-notice{background:#edf2f7;border-radius:8px;padding:20px;margin:32px 0;text-align:center;}
.security-notice p{font-size:14px;color:#4a5568;margin:0;}
.lock-icon{font-size:24px;margin-bottom:8px;}

/* Link fallback */
.link-fallback{margin-top:24px;padding:16px;background:#f7fafc;border-radius:8px;word-break:break-all;}
.link-fallback p{font-size:13px;color:#718096;margin:0 0 8px 0;}
.link-fallback a{color:#4299e1;font-size:14px;}

/* Footer */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}
.social-links{margin-top:20px;}
.social-links a{display:inline-block;margin:0 8px;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .feature-card{background:#374151!important;border-left-color:#60a5fa!important;}
  .feature-text{color:#e2e8f0!important;}
  .security-notice{background:#374151!important;}
  .security-notice p{color:#e2e8f0!important;}
  .link-fallback{background:#374151!important;}
  .link-fallback p{color:#9ca3af!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="Party Portal Access" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>Your officially Onroaded!</h1>
      <p>Access your secure portal below</p>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi <strong>${data.recipientName}</strong> 👋</p>
      
      <p class="intro-text">
        <strong>${
          data.senderName
        }</strong> has created your personalized party portal. 
        Everything you need for is now in one secure, 
        easy-to-access place.
      </p>
      
      <div class="features-container">
        
        <div class="feature-card">
          <span class="feature-icon">📋</span>
          <span class="feature-text"><strong>Complete Forms</strong><br>
          Fill out required intake forms at your convenience</span>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">✍️</span>
          <span class="feature-text"><strong>E-Sign Documents</strong><br>
          Review and sign important documents electronically</span>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">📊</span>
          <span class="feature-text"><strong>Track Progress</strong><br>
          Stay updated on deal status and next steps in real-time</span>
        </div>
      </div>
      
      <div class="cta-container">
        <a href="${
          data.portalUrl
        }" class="cta-button" style="color:#ffffff;text-decoration:none;">
          Access Your Portal →
        </a>
      </div>
      
      <div class="security-notice">
        <div class="lock-icon">🔒</div>
        <p><strong>Bank-level security:</strong> You'll verify your email with a one-time code on first login</p>
      </div>
      
      <div class="link-fallback">
        <p>Button not working? Copy and paste this link:</p>
        <a href="${data.portalUrl}" style="color:#4299e1;">${data.portalUrl}</a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;">
        Questions? Simply reply to this email or reach out to ${
          data.senderName
        } directly. 
        We're here to make your experience as smooth as possible.
      </p>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <p><strong>OnRoad</strong> - Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
      <div class="social-links">
        <a href="#" style="color:#90cdf4;">Privacy Policy</a> · 
        <a href="#" style="color:#90cdf4;">Terms of Service</a> · 
        <a href="#" style="color:#90cdf4;">Help Center</a>
      </div>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}


export function formatClientIntakeEmail(portalUrl: string, partyName: string, realtorName: string, dealAddress?: string) {
  const subject = `${realtorName} has published a new intake form for you${dealAddress ? ` - ${dealAddress}` : ''}`;
  
  const text = `
Hi ${partyName},

Great news! ${realtorName} has published a new client intake form for you to complete${dealAddress ? ` for ${dealAddress}` : ''}.

You can access and complete this form through your secure portal:

🔗 Access Your Portal:
${portalUrl}

In your portal, you'll be able to:
✓ Complete the new intake form at your own pace
✓ Your data is encrypted and only shared with authorized parties
✓ Get deals done faster with our streamlined process

What You'll Need for the Intake Form:
• Personal contact information
• Current address details
• Employment information
• Financial details (if applicable)
• Any specific documents your realtor has requested

Security Note: You'll receive a one-time verification code via email when you sign in.

Questions? Simply reply to this email or contact ${realtorName} directly.

Best regards,
The OnRoad Team

© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.

13239 Dolomite Drive, Frisco, Texas 75035
  `.trim();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>New Intake Form Available</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles - matching party portal */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:600px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Feature cards */
.features-container{margin:32px 0;}
.feature-card{background:#f7fafc;border-radius:12px;padding:24px;margin-bottom:16px;border-left:4px solid #4299e1;}
.feature-icon{display:inline-block;width:40px;height:40px;background:#e6f3ff;border-radius:50%;text-align:center;line-height:40px;font-size:20px;margin-right:16px;vertical-align:middle;}
.feature-text{display:inline-block;vertical-align:middle;font-size:15px;color:#2d3748;width:calc(100% - 64px);}

/* CTA button */
.cta-container{text-align:center;margin:40px 0;}
.cta-button{display:inline-block;background:#4299e1;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(66,153,225,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#3182ce;box-shadow:0 6px 12px rgba(66,153,225,0.4);}

/* Notice banner */
.notice-banner{background:#fef3c7;border:1px solid #fbbf24;border-radius:8px;padding:20px;margin:32px 0;text-align:left;}
.notice-banner p{font-size:14px;color:#92400e;margin:0;line-height:1.6;}

/* Security notice */
.security-notice{background:#edf2f7;border-radius:8px;padding:20px;margin:32px 0;text-align:center;}
.security-notice p{font-size:14px;color:#4a5568;margin:0;}
.lock-icon{font-size:24px;margin-bottom:8px;}

/* Link fallback */
.link-fallback{margin-top:24px;padding:16px;background:#f7fafc;border-radius:8px;word-break:break-all;}
.link-fallback p{font-size:13px;color:#718096;margin:0 0 8px 0;}
.link-fallback a{color:#4299e1;font-size:14px;}

/* Footer */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}
.social-links{margin-top:20px;}
.social-links a{display:inline-block;margin:0 8px;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .feature-card{background:#374151!important;border-left-color:#60a5fa!important;}
  .feature-text{color:#e2e8f0!important;}
  .notice-banner{background:#451a03!important;border-color:#92400e!important;}
  .notice-banner p{color:#fef3c7!important;}
  .security-notice{background:#374151!important;}
  .security-notice p{color:#e2e8f0!important;}
  .link-fallback{background:#374151!important;}
  .link-fallback p{color:#9ca3af!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="New Intake Form" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>New Intake Form Available</h1>
      <p>${dealAddress ? `Property: ${dealAddress}` : 'Complete your client information'}</p>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi <strong>${partyName}</strong> 👋</p>
      
      <p class="intro-text">
        <strong>${realtorName}</strong> has published a new client intake form for you to complete. 
        This form will help gather all the necessary information for your real estate transaction.
      </p>
      
      <div class="notice-banner">
        <p>📋 <strong>Action Required:</strong> Please complete the intake form at your earliest convenience. You can access it through your secure portal.</p>
      </div>
      
      <div class="features-container">
        <div class="feature-card">
          <span class="feature-icon">📝</span>
          <span class="feature-text"><strong>Complete the Intake Form</strong><br>
          Fill out your information at your own pace - save and return anytime</span>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">🔐</span>
          <span class="feature-text"><strong>Your Privacy Matters</strong><br>
          Your data is encrypted and only shared with authorized parties in your transaction</span>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">⚡</span>
          <span class="feature-text"><strong>Get Deals Done Faster</strong><br>
          Streamlined process means less paperwork and quicker closings</span>
        </div>
      </div>
      
      <div class="cta-container">
        <a href="${portalUrl}" class="cta-button" style="color:#ffffff;text-decoration:none;">
          Access Your Portal →
        </a>
      </div>
      
      <div class="security-notice">
        <div class="lock-icon">🔒</div>
        <p><strong>Bank-level security:</strong> You'll verify your email with a one-time code on first login</p>
      </div>
      
      <div class="link-fallback">
        <p>Button not working? Copy and paste this link:</p>
        <a href="${portalUrl}" style="color:#4299e1;">${portalUrl}</a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;">
        Questions? Simply reply to this email or reach out to ${realtorName} directly. 
        We're here to make your experience as smooth as possible.
      </p>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <p><strong>OnRoad</strong> - Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
      <div class="social-links">
        <a href="#" style="color:#90cdf4;">Privacy Policy</a> · 
        <a href="#" style="color:#90cdf4;">Terms of Service</a> · 
        <a href="#" style="color:#90cdf4;">Help Center</a>
      </div>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}

// New template for client intake completion notification to realtor
export function formatClientIntakeCompletionEmail(
  realtorName: string,
  clientName: string,
  dealName: string,
  dealId: string,
  dealAddress?: string
): { subject: string; text: string; html: string } {
  const subject = `✅ Client Intake Completed - ${clientName} for ${dealName}`;
  
  const text = `
Hi ${realtorName},

Great news! ${clientName} has successfully completed their client intake form.

Deal Information:
• Deal Name: ${dealName}
${dealAddress ? `• Property Address: ${dealAddress}` : ''}
• Client: ${clientName}
• Status: Intake Form Completed

The client's responses have been automatically synced to your deal forms. You can now proceed with the next steps in your transaction.

Log in to your OnRoad dashboard to review the completed intake and continue managing this deal.

Best regards,
The OnRoad Team

© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.

13239 Dolomite Drive, Frisco, Texas 75035
  `.trim();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Client Intake Completed</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
/* Reset & base styles */
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
body{margin:0;padding:0;width:100%!important;min-width:100%;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}

/* Container styles */
.email-container{max-width:600px;margin:0 auto;background:#ffffff;}
.hero-section{background:linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);padding:48px 40px;text-align:center;}
.hero-section h1{color:#ffffff;font-size:28px;font-weight:700;margin:0 0 12px 0;line-height:1.3;}
.hero-section p{color:#e8f0ff;font-size:16px;margin:0;opacity:0.95;}

/* Success badge */
.success-badge{display:inline-block;background:#10b981;color:#ffffff;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:600;margin-top:16px;}

/* Content styles */
.content-section{padding:40px;}
.greeting{font-size:18px;color:#1a1a1a;margin:0 0 24px 0;}
.intro-text{font-size:16px;color:#4a5568;line-height:1.6;margin:0 0 32px 0;}

/* Deal info card */
.deal-info-card{background:#f7fafc;border-radius:12px;padding:24px;margin:32px 0;border:2px solid #e2e8f0;}
.deal-info-header{margin-bottom:24px;}
.deal-info-title h3{margin:0;font-size:18px;color:#2d3748;}
.deal-info-title p{margin:4px 0 0 0;font-size:14px;color:#718096;}
.info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:16px 0;border-bottom:1px solid #e2e8f0;font-size:15px;}
.info-row:last-child{border-bottom:none;}
.info-label{color:#718096;font-weight:500;flex-shrink:0;margin-right:16px;}
.info-value{color:#2d3748;font-weight:600;text-align:right;flex:1;word-break:break-word;}

/* CTA button */
.cta-container{text-align:center;margin:40px 0;}
.cta-button{display:inline-block;background:#4299e1;color:#ffffff;font-size:17px;font-weight:600;padding:16px 48px;border-radius:8px;text-decoration:none;box-shadow:0 4px 6px rgba(66,153,225,0.3);transition:all 0.3s ease;}
.cta-button:hover{background:#3182ce;box-shadow:0 6px 12px rgba(66,153,225,0.4);}

/* Notice */
.notice-text{background:#edf2f7;border-radius:8px;padding:20px;margin:32px 0;text-align:center;}
.notice-text p{font-size:14px;color:#4a5568;margin:0;line-height:1.5;}

/* Footer */
.footer{background:#2d3748;padding:32px 40px;text-align:center;}
.footer p{color:#a0aec0;font-size:14px;margin:0 0 8px 0;}
.footer a{color:#90cdf4;text-decoration:none;}

/* Dark mode support */
@media (prefers-color-scheme:dark){
  body{background-color:#1a202c!important;}
  .email-container{background:#2d3748!important;}
  .hero-section{background:linear-gradient(135deg,#2d3748 0%,#1a202c 100%)!important;}
  .greeting,.intro-text{color:#e2e8f0!important;}
  .deal-info-card{background:#374151!important;border-color:#4b5563!important;}
  .deal-info-title h3{color:#e2e8f0!important;}
  .deal-info-title p{color:#9ca3af!important;}
  .info-row{border-bottom-color:#4b5563!important;}
  .info-label{color:#9ca3af!important;}
  .info-value{color:#e2e8f0!important;}
  .notice-text{background:#374151!important;}
  .notice-text p{color:#e2e8f0!important;}
}

/* Mobile responsiveness */
@media screen and (max-width:600px){
  .hero-section{padding:32px 24px!important;}
  .hero-section h1{font-size:24px!important;}
  .content-section{padding:24px!important;}
  .deal-info-card{padding:20px!important;}
  .info-row{flex-direction:column;align-items:flex-start!important;gap:8px!important;}
  .info-value{text-align:left!important;}
  .cta-button{padding:14px 32px!important;font-size:16px!important;}
  .footer{padding:24px!important;}
}
</style>
</head>
<body>
<div role="article" aria-roledescription="email" aria-label="Client Intake Completed" style="font-size:16px;">
<!--[if mso]>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center">
<tr>
<td>
<![endif]-->

<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" class="email-container">
  <!-- Hero Section -->
  <tr>
    <td class="hero-section">
      <h1>Client Intake Completed</h1>
      <p>Your client has submitted their information</p>
      <div class="success-badge">✓ Form Completed</div>
    </td>
  </tr>
  
  <!-- Main Content -->
  <tr>
    <td class="content-section">
      <p class="greeting">Hi <strong>${realtorName}</strong> 👋</p>
      
      <p class="intro-text">
        Great news! <strong>${clientName}</strong> has successfully completed their client intake form. 
        All responses are ready to be pushed to your deal forms.
      </p>
      
      <!-- Deal Information Card -->
      <div class="deal-info-card">
        <div class="deal-info-header">
          <div class="deal-info-title">
            <h3>Intake Form Completed</h3>
            <p>Client information received and processed</p>
          </div>
        </div>
        
        <div class="info-row">
          <span class="info-label">Deal Name</span>
          <span class="info-value">${dealName}</span>
        </div>
        
        ${dealAddress ? `
        <div class="info-row">
          <span class="info-label">Property Address</span>
          <span class="info-value">${dealAddress}</span>
        </div>
        ` : ''}
        
        <div class="info-row">
          <span class="info-label">Client Name</span>
          <span class="info-value">${clientName}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">Completed At</span>
          <span class="info-value">${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>
      
      <div class="notice-text">
        <p>💡 <strong>Next Steps:</strong> The client's responses are now available in your deal forms. 
        You can proceed with document preparation and signature collection.</p>
      </div>
      
      <div class="cta-container">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/realtor/workspace/${dealId}" class="cta-button" style="color:#ffffff;text-decoration:none;">
          View Deal in Workspace →
        </a>
      </div>
      
      <p style="margin-top:32px;font-size:15px;color:#718096;line-height:1.6;text-align:center;">
        Need help? Our support team is here to assist you with any questions about the intake process.
      </p>
    </td>
  </tr>
  
  <!-- Footer -->
  <tr>
    <td class="footer">
      <p><strong>OnRoad</strong>: Simplifying Real Estate Transactions</p>
      <p style="font-size:13px;">© ${new Date().getFullYear()} OnRoad Platform. All rights reserved.</p>
      <p style="font-size:12px;margin-top:16px;color:#9ca3af;">13239 Dolomite Drive, Frisco, Texas 75035</p>
    </td>
  </tr>
</table>

<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
</div>
</body>
</html>`;

  return { subject, text, html };
}
