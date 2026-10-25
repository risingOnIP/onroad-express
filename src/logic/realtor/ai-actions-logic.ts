import { SupabaseClient } from "@supabase/supabase-js";
import { Agent, run } from "@openai/agents";
import pdfParse from "pdf-parse";



// Global supabase client that will be set by runAiWorkflowStream
let currentSupabaseClient: SupabaseClient;

// Getter function for implementations.ts to access the supabase client
export function getCurrentSupabaseClient(): SupabaseClient {
  if (!currentSupabaseClient) {
    throw new Error('Supabase client not initialized. Call runAiWorkflowStream first.');
  } 
  return currentSupabaseClient;
}
import {
  AIMessage,
  AIConnectionTether,
  ToolCall,
  RealtorPageNavigation,
} from "../../types/realtor";
import { buildSystemPrompt } from "../../ai/system-prompt-builder";
import { setToolContext, agentTools, getPendingNavigation, setGlobalSendToClient } from "./tools/implementations";



// Helper function to build system prompt
async function buildSystemPromptHandler(
  userId: string,
  aiTether: AIConnectionTether
): Promise<string> {
  try {
    const basePrompt = buildSystemPrompt({ userId, aiTether });
    return basePrompt;
  } catch (error) {
    console.error("Error building system prompt:", error);
    return `You are Ora, an AI agent for OnRoad real estate platform. I help you manage deals, clients, and forms efficiently. Current page: ${aiTether.pageNavigation.area}`;
  }
}

// Main function to run AI workflow with streaming
export async function runAiWorkflowStream(
  aiTether: AIConnectionTether,
  userId: string,
  supabaseClient: SupabaseClient,
  sendToClient: (data: AIMessage) => void,
  userRole?: string,
  files?: Express.Multer.File[]
): Promise<ToolCall[]> {
  console.log(
    "Debug: aiTether.fullConversation structure:",
    JSON.stringify(aiTether.fullConversation, null, 2)
  );

  // Convert full conversation history to the format expected by the agent runtime
  const conversationMessages = aiTether.fullConversation.map((msg) => {
    if (msg.role === 'user') {
      return {
        role: 'user' as const,
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
      };
    } else {
      // Assistant messages need status and proper content structure
      return {
        role: 'assistant' as const,
        content: [{ 
          type: 'output_text' as const, 
          text: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content) 
        }],
        status: 'completed' as const
      };
    }
  });

  // Get the latest user message for processing files and immediate context
  let latestUserMessage = 
    [...aiTether.fullConversation]
      .reverse()
      .find(
        (m) =>
          m.role === "user" && typeof m.content === "string" && m.content.trim()
      )?.content || "Hello";

  // Handle file uploads
  console.log(
    "[ai-actions-logic.ts] runAiWorkflowStream: Processing uploaded files"
  );
  let fileContext = "";
  if (files && files.length > 0) {
    console.log(
      `[ai-actions-logic.ts] runAiWorkflowStream: Processing ${files.length} uploaded files...`
    );
    for (const file of files) {
      try {
        console.log(`Processing file: ${file.originalname} (${file.mimetype})`);

        if (
          file.mimetype === "text/plain" ||
          file.mimetype === "application/json"
        ) {
          const content = file.buffer.toString("utf-8");
          fileContext += `\n\n--- File: ${file.originalname} ---\n${content}\n--- End of file ---\n`;
        } else if (file.mimetype === "application/pdf") {
          try {
            const pdfData = await pdfParse(file.buffer);
            const extractedText = pdfData.text.trim();
            if (extractedText.length > 0) {
              fileContext += `\n\n--- PDF File: ${file.originalname} (${(
                file.size / 1024
              ).toFixed(
                1
              )}KB) ---\n${extractedText}\n--- End of PDF content ---\n`;
            } else {
              fileContext += `\n\n--- PDF File: ${file.originalname} (${(
                file.size / 1024
              ).toFixed(
                1
              )}KB) ---\nPDF file appears to be empty or contains only images/scanned content with no extractable text.\n--- End of file ---\n`;
            }
          } catch (pdfError) {
            console.error(
              `Error extracting PDF content from ${file.originalname}:`,
              pdfError
            );
            fileContext += `\n\n--- PDF File: ${file.originalname} (${(
              file.size / 1024
            ).toFixed(
              1
            )}KB) ---\nError extracting text from PDF. File may be corrupted or password-protected.\n--- End of file ---\n`;
          }
        } else {
          fileContext += `\n\n--- File: ${file.originalname} (${
            file.mimetype
          }, ${(file.size / 1024).toFixed(
            1
          )}KB) ---\nFile uploaded but content processing not available for this file type.\n--- End of file ---\n`;
        }
      } catch (error) {
        console.error(`Error processing file ${file.originalname}:`, error);
        fileContext += `\n\n--- File: ${file.originalname} ---\nError processing this file.\n--- End of file ---\n`;
      }
    }

    if (fileContext) {
      latestUserMessage += fileContext;
    }
  }

  // Store the supabase client globally for tools to access
  currentSupabaseClient = supabaseClient;
  
  // Set the tool context for the tools to use
  setToolContext(userId);
  
  // Set the global send to client function for direct tool communication
  setGlobalSendToClient(sendToClient);

  const systemInstructionsWithContext = await buildSystemPromptHandler(
    userId,
    aiTether
  );
  console.log(`Full conversation messages: ${conversationMessages.length}`);
  console.log(
    `Latest user message: ${latestUserMessage.substring(0, 200)}${
      latestUserMessage.length > 200 ? "..." : ""
    }`
  );

  const allProcessedToolCalls: ToolCall[] = [];
  let fullAssistantResponse = "";

  try {
    console.log("Starting Agent workflow...");


    
    
    
    const modelName = process.env.AI_MODEL || 'gpt-4o-mini';
    console.log(`[AI CONFIG] Using model: ${modelName}`);
    console.log(`[AI CONFIG] API Key configured: ${process.env.OPENAI_API_KEY ? 'Yes' : 'No'}`);
    
    const agent = new Agent({
      name: 'Ora',
      model: modelName,
      instructions: systemInstructionsWithContext,
      tools: agentTools,
    });
    
    // Try to hook into agent events if available
    if ('on' in agent) {
      console.log("[AGENT EVENTS] Agent has event emitter, setting up listeners");
      (agent as any).on('tool_call_start', (data: any) => {
        console.log("[TOOL_START]", data);
      });
      (agent as any).on('tool_call_complete', (data: any) => {
        console.log("[TOOL_COMPLETE]", data);
        if (data.name?.startsWith('navigate')) {
          sendToClient({
            type: "navigation", 
            navigationData: data.result
          });
        }
      });
    } else {
      console.log("[AGENT EVENTS] No event emitter found on agent");
    }
    
    // The SDK expects a string input for the current user message
    // The conversation history should be embedded in the system instructions
    const inputToSend = latestUserMessage;
    // Try without streaming first to see if it works
    const result = await run(agent, inputToSend, {
      stream: false,
      maxTurns: 15
    });
    // The run function with stream: true should return an AsyncIterable directly
    const resolvedResult = result;

    // Send initial acknowledgment that AI is processing
    sendToClient({ 
      type: "text_chunk", 
      text: "" 
    });
    
    let hasReceivedContent = false;
    let chunkCount = 0;
    
    try {
      // Since we're not streaming, handle the direct result
      if (resolvedResult && (resolvedResult as any).finalOutput) {
        fullAssistantResponse = (resolvedResult as any).finalOutput;
        hasReceivedContent = true;
        sendToClient({ 
          type: "text_chunk", 
          text: fullAssistantResponse 
        });
      } else if (resolvedResult && typeof (resolvedResult as any)[Symbol.asyncIterator] === 'function') {
        console.log("[STREAM] Result is AsyncIterable, starting stream processing...");
        
        for await (const chunk of resolvedResult as any) {
          chunkCount++;
          let contentToSend = '';
          
          // Enhanced logging to understand chunk structure
          console.log(`[CHUNK #${chunkCount}] Type:`, (chunk as any)?.type || 'no-type');
          console.log(`[CHUNK #${chunkCount}] Keys:`, Object.keys(chunk || {}));
          
          // Log the full chunk for first few chunks to understand structure
          if (chunkCount <= 3) {
            console.log(`[CHUNK #${chunkCount}] Full structure:`, JSON.stringify(chunk, null, 2));
          }
          
          // Try multiple patterns to extract text content from agent SDK stream chunks
          
          // First check if this is a tool-related chunk
          if ((chunk as any)?.type === 'tool_call' || (chunk as any)?.type === 'function_call') {
            console.log(`[CHUNK #${chunkCount}] Tool call starting: ${(chunk as any)?.name || 'unknown'}`);
            // Send tool starting progress
            if ((chunk as any)?.name) {
              sendToClient({
                type: "tool_execution_progress",
                toolName: (chunk as any).name,
                status: "starting",
                message: `Starting ${(chunk as any).name}...`,
              });
            }
          }
          // Pattern 1: Check for delta text updates (most common for streaming)
          else if ((chunk as any)?.type === 'delta' && (chunk as any)?.delta) {
            console.log(`[CHUNK #${chunkCount}] Found delta type`);
            const delta = (chunk as any).delta;
            if (delta.content) {
              contentToSend = delta.content;
            } else if (delta.text) {
              contentToSend = delta.text;
            } else if (typeof delta === 'string') {
              contentToSend = delta;
            }
          }
          // Pattern 2: run_item_stream_event structure
          else if ((chunk as any)?.type === 'run_item_stream_event' && (chunk as any)?.item) {
            console.log(`[CHUNK #${chunkCount}] Found run_item_stream_event`);
            const item = (chunk as any).item;
            
            // Check for content in various locations
            if (item.content) {
              if (Array.isArray(item.content)) {
                for (const contentItem of item.content) {
                  if (contentItem.type === 'text' && contentItem.text) {
                    contentToSend += contentItem.text;
                  } else if (typeof contentItem === 'string') {
                    contentToSend += contentItem;
                  }
                }
              } else if (typeof item.content === 'string') {
                contentToSend = item.content;
              } else if (item.content.text) {
                contentToSend = item.content.text;
              }
            } else if (item.text) {
              contentToSend = item.text;
            } else if (item.delta) {
              contentToSend = item.delta;
            }
          }
          // Pattern 3: Direct text/content fields
          else if (typeof chunk === 'string') {
            console.log(`[CHUNK #${chunkCount}] Found string chunk`);
            contentToSend = chunk;
          } else if ((chunk as any)?.content) {
            console.log(`[CHUNK #${chunkCount}] Found content field`);
            if (typeof (chunk as any).content === 'string') {
              contentToSend = (chunk as any).content;
            } else if ((chunk as any).content.text) {
              contentToSend = (chunk as any).content.text;
            }
          } else if ((chunk as any)?.text) {
            console.log(`[CHUNK #${chunkCount}] Found text field`);
            contentToSend = (chunk as any).text;
          } else if ((chunk as any)?.message?.content) {
            console.log(`[CHUNK #${chunkCount}] Found message.content`);
            contentToSend = (chunk as any).message.content;
          }
          // Pattern 4: Check for chunk event with content
          else if ((chunk as any)?.event === 'content' && (chunk as any)?.data) {
            console.log(`[CHUNK #${chunkCount}] Found content event`);
            contentToSend = (chunk as any).data;
          }
          // Pattern 5: Check for message chunks (common in AI provider streaming)
          else if ((chunk as any)?.type === 'message' || (chunk as any)?.type === 'message_delta') {
            console.log(`[CHUNK #${chunkCount}] Found message type`);
            if ((chunk as any)?.content) {
              contentToSend = (chunk as any).content;
            } else if ((chunk as any)?.delta?.content) {
              contentToSend = (chunk as any).delta.content;
            } else if ((chunk as any)?.text) {
              contentToSend = (chunk as any).text;
            }
          }
          // Pattern 6: Check for completion chunks
          else if ((chunk as any)?.type === 'completion' && (chunk as any)?.completion) {
            console.log(`[CHUNK #${chunkCount}] Found completion type`);
            contentToSend = (chunk as any).completion;
          }
          
          // Send text content if we found any
          if (contentToSend && typeof contentToSend === 'string' && contentToSend.trim()) {
            console.log(`[CHUNK #${chunkCount}] Sending text (${contentToSend.length} chars):`, contentToSend.substring(0, 50) + '...');
            fullAssistantResponse += contentToSend;
            hasReceivedContent = true;
            
            // Send the text chunk immediately
            sendToClient({ 
              type: "text_chunk", 
              text: contentToSend 
            });
          } else if (chunkCount <= 10) {
            // Log when we can't extract content from early chunks
            console.log(`[CHUNK #${chunkCount}] No text content extracted from chunk`);
          }
          
          // Handle tool calls if present (check both direct and item locations)
          let toolCallsToProcess = null;
          if ((chunk as any)?.toolCalls || (chunk as any)?.tool_calls) {
            toolCallsToProcess = (chunk as any).toolCalls || (chunk as any).tool_calls;
          } else if ((chunk as any)?.item?.tool_calls) {
            toolCallsToProcess = (chunk as any).item.tool_calls;
          } else if ((chunk as any)?.item?.function_calls) {
            toolCallsToProcess = (chunk as any).item.function_calls;
          }
          
          if (toolCallsToProcess) {
            for (const toolCall of toolCallsToProcess) {
              // Log the raw tool call structure to debug
              const toolCallData: ToolCall = {
                name: toolCall.name || toolCall.function?.name || "unknown",
                arguments: toolCall.arguments || toolCall.function?.arguments || {},
                status: "success",
                result: toolCall.result || toolCall.output || "Tool executed successfully"
              };
              allProcessedToolCalls.push(toolCallData);
              
              // Handle navigation tools specially
              if (toolCallData.name.startsWith("navigate")) {
                if (
                  toolCallData.result &&
                  typeof toolCallData.result === "object" &&
                  "area" in toolCallData.result
                ) {
                  sendToClient({
                    type: "navigation",
                    navigationData: toolCallData.result as RealtorPageNavigation,
                  });
                } else {
                }
              }
              
              // Send tool execution progress updates
              console.log(`[TOOL PROGRESS] Sending progress for tool: ${toolCallData.name}`);
              
              // Send starting status first
              sendToClient({
                type: "tool_execution_progress",
                toolName: toolCallData.name,
                status: "starting",
                message: `Executing ${toolCallData.name}...`,
              });
              
              // Small delay then send completed
              setTimeout(() => {
                sendToClient({
                  type: "tool_execution_progress",
                  toolName: toolCallData.name,
                  status: "completed",
                  message: `${toolCallData.name} completed successfully`,
                });
              }, 500);
            }
          }
        }
        
        console.log(`[STREAM END] Processed ${chunkCount} chunks. Has content: ${hasReceivedContent}`);
        console.log(`[STREAM END] Total response length: ${fullAssistantResponse.length} chars`);
        
      } else if (resolvedResult && Symbol.asyncIterator in Object(resolvedResult)) {
        // Alternative check for AsyncIterable
        console.log("[STREAM] Alternative AsyncIterable detection, processing stream...");
        
        for await (const chunk of resolvedResult as any) {
          const chunkType = (chunk as any)?.type || 'unknown';
          console.log(`[ALT-STREAM] Chunk type: ${chunkType}`);
          
          if (typeof chunk === 'string') {
            sendToClient({ type: "text_chunk", text: chunk });
            fullAssistantResponse += chunk;
            hasReceivedContent = true;
          } else if ((chunk as any)?.content) {
            sendToClient({ type: "text_chunk", text: (chunk as any).content });
            fullAssistantResponse += (chunk as any).content;
            hasReceivedContent = true;
          }
        }
      } else {
        // Handle non-streaming result or Promise that needs to be awaited
        let finalResult = await resolvedResult;
        let finalOutput = '';
        
        // Check if this is an agent state object with state property
        if ((finalResult as any)?.state) {
          const state = (finalResult as any).state;
          
          // Check for messages in the state
          if (state.messages && Array.isArray(state.messages)) {
            // Get the last assistant message
            const assistantMessages = state.messages.filter((msg: any) => 
              msg.role === 'assistant' || msg.sender === 'assistant'
            );
            
            if (assistantMessages.length > 0) {
              const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
              // Extract content from the message
              if (lastAssistantMessage.content) {
                if (Array.isArray(lastAssistantMessage.content)) {
                  // Handle array of content items
                  for (const item of lastAssistantMessage.content) {
                    if (item.type === 'text' && item.text) {
                      finalOutput += item.text;
                    } else if (item.type === 'output_text' && item.text) {
                      finalOutput += item.text;
                    } else if (typeof item === 'string') {
                      finalOutput += item;
                    }
                  }
                } else if (typeof lastAssistantMessage.content === 'string') {
                  finalOutput = lastAssistantMessage.content;
                }
              } else if (lastAssistantMessage.text) {
                finalOutput = lastAssistantMessage.text;
              }
            }
          }
          
          // Also check for tool calls in the state
          if (state.toolCalls || state.tool_calls) {
            const toolCalls = state.toolCalls || state.tool_calls;
            for (const toolCall of toolCalls) {
              const toolCallData: ToolCall = {
                name: toolCall.name || toolCall.function?.name || "unknown",
                arguments: toolCall.arguments || toolCall.function?.arguments || {},
                status: "success",
                result: toolCall.result || toolCall.output || "Tool executed successfully"
              };
              
              allProcessedToolCalls.push(toolCallData);
              
              // Handle navigation tools
              if (toolCallData.name.startsWith("navigate")) {
                if (toolCallData.result && typeof toolCallData.result === "object" && "area" in toolCallData.result) {
                  sendToClient({
                    type: "navigation",
                    navigationData: toolCallData.result as RealtorPageNavigation,
                  });
                }
              }
            }
          }
        } 
        // Fallback to other patterns
        else if ((finalResult as any)?.choices?.[0]?.message?.content) {
          // Standard AI provider response format
          finalOutput = (finalResult as any).choices[0].message.content;
        } else if ((finalResult as any)?.content) {
          finalOutput = (finalResult as any).content;
        } else if ((finalResult as any)?.text) {
          finalOutput = (finalResult as any).text;
        } else if ((finalResult as any)?.output) {
          finalOutput = (finalResult as any).output;
        } else if (typeof finalResult === 'string') {
          finalOutput = finalResult;
        }
        
        if (finalOutput && typeof finalOutput === 'string') {
          fullAssistantResponse = finalOutput;
          hasReceivedContent = true;
          
          sendToClient({ 
            type: "text_chunk", 
            text: finalOutput 
          });
        } else if (!finalOutput) {
        }
      }
      
      // If we didn't receive any content, don't send a fallback message
      if (!hasReceivedContent) {
        // Don't send any fallback text - let the frontend handle empty responses
      }
      
    } catch (streamError) {
      console.error("[DEBUG] Error processing result:", streamError);
      sendToClient({ 
        type: "text_chunk", 
        text: "\n\nI encountered an issue processing your request. Please try again." 
      });
    }

  } catch (error: any) {
    console.error(
      "[ai-actions-logic.ts] runAiWorkflowStream: Agent error:",
      error
    );
    sendToClient({
      type: "text_chunk",
      text: `\n\nAn AI error occurred: ${
        error.message || JSON.stringify(error)
      }`,
    });
  }

  // Update the latest user message in conversation history if it has file context
  if (fileContext && aiTether.fullConversation.length > 0) {
    const lastMessage = aiTether.fullConversation[aiTether.fullConversation.length - 1];
    if (lastMessage.role === "user") {
      lastMessage.content = latestUserMessage;
    }
  }

  // Add assistant response to conversation history
  if (fullAssistantResponse.trim()) {
    const assistantMessage: any = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: fullAssistantResponse.trim(),
      timestamp: new Date(),
      toolCalls:
        allProcessedToolCalls.length > 0 ? allProcessedToolCalls : undefined,
    };
    aiTether.fullConversation.push(assistantMessage);
    console.log(
      `Added assistant response to chat history (${fullAssistantResponse.length} chars, ${allProcessedToolCalls.length} tools)`
    );
  }

  return allProcessedToolCalls;
}