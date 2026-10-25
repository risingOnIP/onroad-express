import { Router } from "express";
import { sendEmail } from "../lib/mailgun";

const router = Router();

router.post("/send-contact-email", async (req, res) => {
  try {
    const { name, email, phone, subject, message, recipients } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Name, email, and message are required" 
      });
    }

    // Format the email content
    const emailSubject = `OnRoad Contact Form: ${subject || 'General Inquiry'} - from ${name}`;
    
    const emailText = `
New contact form submission from OnRoad website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

---
This email was sent from the OnRoad contact form.
    `.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #4a5568; margin-bottom: 5px; display: block; }
    .value { color: #2d3748; padding: 10px; background: #f7fafc; border-radius: 4px; }
    .message { white-space: pre-wrap; line-height: 1.6; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">OnRoad Website</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <span class="label">Phone:</span>
        <div class="value">${phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <span class="label">Subject:</span>
        <div class="value">${subject || 'General Inquiry'}</div>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="value message">${message}</div>
      </div>
      <div class="footer">
        <p>This email was sent from the OnRoad contact form.</p>
        <p>Reply directly to ${email} to respond to this inquiry.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to all recipients
    const emailResult = await sendEmail({
      to: recipients,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      from: `OnRoad Contact Form <noreply@onroadai.com>`
    });

    console.log("Contact email sent successfully:", emailResult);

    res.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      messageId: emailResult.id 
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ 
      error: "Failed to send contact email",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;