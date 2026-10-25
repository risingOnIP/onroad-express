import { Router, Request, Response } from 'express';
import { runAiWorkflowStream } from '../../logic/realtor/ai-actions-logic';
import { createClient } from "@supabase/supabase-js";
import { authMiddleware } from '../../middleware/auth';
import { aiRateLimitMiddleware } from '../../middleware/ai-permissions';
import { AIMessage, AIConnectionTether } from '../../types/realtor';
import multer from 'multer';

const router = Router();

// Configure multer for file uploads
const upload = multer();


// POST route for frontend compatibility (/chat - frontend format)  
router.post('/chat', authMiddleware, aiRateLimitMiddleware(), upload.any(), async (req: Request, res: Response) => {
  console.log("AI Actions Chat Route (Frontend Format)");
  await handleAIRequest(req, res);
});


// Unified AI request handler
async function handleAIRequest(req: Request, res: Response) {
  console.log("[ai-actions.ts] handleAIRequest: === NEW AI REQUEST ===");
  console.log("[ai-actions.ts] handleAIRequest: Raw body keys:", Object.keys(req.body || {}));
  console.log("[ai-actions.ts] handleAIRequest: Files count:", req.files?.length || 0);
  console.log("[ai-actions.ts] handleAIRequest: User info:", {
    userId: req.user?.sub,
    userEmail: req.user?.email
  });

  // Set headers for Server-Sent Events (SSE) 
  console.log("[ai-actions.ts] handleAIRequest: Setting SSE headers");
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  // Disable timeout for long-lived connections
  res.socket?.setTimeout(0);

  // Parse AIConnectionTether from form data
  const aiTetherString = req.body.aiTether;
  if (!aiTetherString) {
    res.write(`data: ${JSON.stringify({ type: "text_chunk", text: `❌ **Error**: AIConnectionTether not provided` })}\n\n`);
    return res.status(400).end();
  }

  let aiTether: AIConnectionTether;
  try {
    aiTether = JSON.parse(aiTetherString);
  } catch (error) {
    res.write(`data: ${JSON.stringify({ type: "text_chunk", text: `❌ **Error**: Invalid AIConnectionTether format` })}\n\n`);
    return res.status(400).end();
  }

  const userId = req.user?.sub;
  console.log("Parsed AIConnectionTether:", aiTether);

  console.log("right before first try")
  try {
    if (!userId) {
      throw new Error("User ID not found in token.");
    }
    console.log("[ai-actions.ts] handleAIRequest: User ID validated:", userId);
  } catch (error) {
    console.error("[ai-actions.ts] handleAIRequest: Authentication error:", error);
    return res.status(401).send('Invalid or expired token');
  }

  console.log("right after try")

  if (!aiTether.fullConversation || aiTether.fullConversation.length === 0) {
    const errorMessage = 'Missing required chat parameters: conversation history.';
    res.write(`data: ${JSON.stringify({ type: "text_chunk", text: `❌ **Error**: ${errorMessage}` })}\n\n`);
    return res.status(400).end();
  }


  // Helper to send data as SSE
  const sendToClient = (data: AIMessage) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    console.log("[ai-actions.ts] Starting AI workflow stream...");

    const toolCalls = await runAiWorkflowStream(
      aiTether, // Pass the entire AIConnectionTether object
      userId,
      req.supabaseClient!,
      sendToClient,
      aiTether.role,
      req.files as Express.Multer.File[]
    );

    console.log("[ai-actions.ts] AI workflow completed. Tool calls:", toolCalls?.length || 0);

    // Send tool calls as final message if any were executed
    if (toolCalls && toolCalls.length > 0) {
      sendToClient({
        type: "tool_calls_complete",
        toolCalls: toolCalls
      });
    }
    
    // Send completion signal
    sendToClient({
      type: "stream_complete",
      message: "AI response complete"
    });
    
  } catch (error: any) {
    console.error("[ai-actions.ts] handleAIRequest: Error in AI workflow stream route:", error);
    
    // Send error message to client
    sendToClient({
      type: "error",
      message: "I encountered an error processing your request. Please try again."
    });
    
  } finally {
    console.log("[ai-actions.ts] handleAIRequest: === REQUEST COMPLETED, ENDING RESPONSE ===");
    
    // Add a small delay to ensure all data is sent before closing
    setTimeout(() => {
      res.end();
    }, 100);
  }
}

// router.post('/small-generation', authMiddleware, aiRateLimitMiddleware(), async (req: Request, res: Response) => {
//   const { functionType, request } = req.body;
//   const userId = req.user?.sub;

//   if (!userId) {
//     throw new Error("User ID not found in token.");
//   }

//   const response = await runAiSmallGenerationStream(functionType, request);
//   res.json(response);
// });

export default router;