import { executeMCPTool } from "../services/mcpService.js"


// =========================
// RUN MCP TOOL BY NAME
// =========================

export const runMCPTool = async (toolName, args) => {
  return await executeMCPTool(toolName, args)
}