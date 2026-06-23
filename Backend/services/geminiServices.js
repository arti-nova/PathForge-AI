import { GoogleGenerativeAI } from "@google/generative-ai"
import { executeMCPTool, getMCPToolDefinitions } from "../mcp/services/mcpService.js"

console.log("CHAT KEY:", process.env.GEMINI_AICHAT_KEY)
console.log("ROADMAP KEY:", process.env.GEMINI_ROADMAP_KEY)
console.log("RESUME KEY:", process.env.GEMINI_RESUME_KEY)

// =========================
// GEMINI INSTANCES
// =========================

const chatAI = new GoogleGenerativeAI(process.env.GEMINI_AICHAT_KEY)
const roadmapAI = new GoogleGenerativeAI(process.env.GEMINI_ROADMAP_KEY)
const resumeAI = new GoogleGenerativeAI(process.env.GEMINI_RESUME_KEY)

// =========================
// MODELS
// =========================

const chatModel = chatAI.getGenerativeModel({ model: "gemini-2.5-flash" })
const roadmapModel = roadmapAI.getGenerativeModel({ model: "gemini-2.5-flash" })
const resumeModel = resumeAI.getGenerativeModel({ model: "gemini-2.5-flash" })

// =========================
// MCP TOOL DECISION
// =========================

export const decideMCPTool = async (message) => {
  try {
    const tools = getMCPToolDefinitions()

    const decisionPrompt = `
You are PathForge AI tool selector.

User message: "${message}"

Available MCP tools:
${JSON.stringify(tools, null, 2)}

Decide if any tool should be called.

Reply ONLY with valid JSON, no markdown:
{ "tool": "<tool_name>", "args": { ... } }
OR if no tool needed:
{ "tool": null }
`

    const result = await chatModel.generateContent(decisionPrompt)
    const text = result.response.text().replace(/```json|```/g, "").trim()
    return JSON.parse(text)

  } catch (error) {
    console.log("MCP decision error:", error)
    return { tool: null }
  }
}

// =========================
// STREAMING CHAT RESPONSE
// =========================

export const generateChatResponse = async (prompt, onChunk) => {
  try {
    const result = await chatModel.generateContentStream(prompt)

    let fullText = ""

    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullText += chunkText
      if (onChunk) onChunk(chunkText)
    }

    return fullText

  } catch (error) {
    console.log(error)
    throw error
  }
}

// =========================
// ROADMAP RESPONSE
// =========================

export const generateRoadmapResponse = async (prompt) => {
  try {
    const result = await roadmapModel.generateContent(prompt)
    const response = await result.response
    return response.text()

  } catch (error) {
    console.log(error)
    if (error.status === 429) return "⚠ Roadmap API limit reached. Please try again later."
    return "Error generating roadmap."
  }
}

// =========================
// RESUME ANALYZER RESPONSE
// =========================

export const generateResumeResponse = async (prompt) => {
  try {
    const result = await resumeModel.generateContent(prompt)
    const response = await result.response
    return response.text()

  } catch (error) {
    console.log(error)
    if (error.status === 429) return "⚠ Resume API limit reached. Please try again later."
    return "Error analyzing resume."
  }
}