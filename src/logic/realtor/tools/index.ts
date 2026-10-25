import OpenAI from "openai";
import type { ResponseCreateParams } from "openai/resources/responses/responses";
import { REALTOR_ALLOWED_TOOLS } from "./permissions";
import { allTools } from "./definitions";

// Re-export everything that was previously exported from ai-tools-logic.ts
export { REALTOR_ALLOWED_TOOLS } from "./permissions";
export { allTools } from "./definitions";
export { ToolArgs, ToolFunction } from "./types";
export { toolFunctions } from "./implementations";

// Function to get tools filtered by user role
type ResponsesToolList = NonNullable<ResponseCreateParams["tools"]>;

export function getToolsForRole(userRole: string): ResponsesToolList {
  console.log(`[AI TOOLS] getToolsForRole - Input:`, userRole);
  let allowedToolNames: string[];

  switch (userRole) {
    case "realtor":
      allowedToolNames = REALTOR_ALLOWED_TOOLS;
      break;
    case "client":
      // Future: define CLIENT_ALLOWED_TOOLS
      allowedToolNames = [];
      break;
    case "broker":
      // Future: define BROKER_ALLOWED_TOOLS
      allowedToolNames = [];
      break;
    default:
      allowedToolNames = REALTOR_ALLOWED_TOOLS; // Default to realtor for now
  }

  return allTools.filter((tool) =>
    allowedToolNames.includes((tool as any).function?.name || "")
  ) as ResponsesToolList;
}
