import express from "express"
import multer from "multer"
import fs from "fs"
import pdf from "pdf-parse-new"
import Roadmap from "../models/Roadmap.js"
//import Chat from "../models/Chat.js"
import ChatHistory from "../models/ChatHistory.js"
import {
  generateChatResponse,
  generateRoadmapResponse,
  generateResumeResponse,
  decideMCPTool,
} from "../services/geminiServices.js"
import { executeMCPTool } from "../mcp/services/mcpService.js"
import {resumeTool} from "../mcp/tools/resumeTool.js"
import { roadmapTool } from "../mcp/tools/roadmapTool.js"
import { interviewTool } from "../mcp/tools/interviewTool.js"

const router = express.Router()

const upload = multer({ dest: "uploads/" })


router.get("/test-roadmap-mcp", async (req, res) => {
  try {

    const result =
      await roadmapTool.execute({
        goal: "frontend developer"
      })

    res.json(result)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
})
// =========================
// ANALYZE RESUME
// =========================

router.post(
  "/analyze-resume",
  upload.single("resume"),
  async (req, res) => {
    try {

      // Check file exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "Resume PDF is required"
        })
      }

      const pdfPath = req.file.path

      const dataBuffer = fs.readFileSync(pdfPath)

      const pdfData = await pdf(dataBuffer)

      const resumeText = pdfData.text

      // MCP Resume Analysis
      const mcpResult = await resumeTool.execute({
        resumeText
      })

      const mcpText =
        mcpResult.content
          ?.filter(c => c.type === "text")
          ?.map(c => c.text)
          ?.join("") || "{}"

      const analysis = JSON.parse(mcpText)

      // Delete uploaded file
      fs.unlinkSync(pdfPath)

      res.json({
        success: true,

        analysis: {
          score: analysis.score || 0,

          skills: analysis.skills || [],

          strengths:
            analysis.strengths || [],

          missingSkills:
            analysis.missingSkills || [],

          suggestions:
            analysis.careerSuggestions || []
        }
      })

    } catch (error) {

      console.log("Resume Analysis Error:", error)

      res.status(500).json({
        success: false,
        error: error.message
      })

    }
  }
)
// =========================
// GENERATE ROADMAP
// =========================
router.post("/generate-roadmap", async (req, res) => {
  try {

    const { goal, userEmail } = req.body

    const mcpResult =
      await roadmapTool.execute({
        goal
      })

    let roadmapText =
      mcpResult.content[0].text

    roadmapText =
      roadmapText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()

    const roadmap =
      JSON.parse(roadmapText)

    await Roadmap.create({
      goal,
      roadmap,
      userEmail
    })

    res.json({
      success: true,
      roadmap
    })

  } catch (error) {

    console.log("ROADMAP ERROR:", error)

    res.status(500).json({
      success: false,
      error: error.message
    })

  }
})
// =========================
// GET ROADMAPS
// =========================

router.get("/roadmaps/:email", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userEmail: req.params.email })
    res.json({ success: true, roadmaps })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// =========================
// GENERATE TASKS
// =========================

router.post("/generate-tasks", async (req, res) => {
  try {
    const { goal } = req.body

    const text = await generateChatResponse(`
Create a highly productive daily plan for someone who wants to become:

${goal}

Include:
1. Daily learning tasks
2. Coding practice
3. Projects to build
4. Interview prep
5. Productivity tips
6. Weekly milestones
`)

    res.json({ success: true, response: text })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// =========================
// CHAT WITH MCP INTEGRATION
// =========================

router.post("/chat", async (req, res) => {
  try {
    const { message, userEmail } = req.body

    // =========================
    // STEP 1: MCP TOOL DECISION
    // =========================

    const mcpDecision = await decideMCPTool(message)
    let mcpContext = ""

    if (mcpDecision.tool) {
      try {
        const toolResult = await executeMCPTool(mcpDecision.tool, mcpDecision.args)

        // Extract text from MCP tool result
        mcpContext = toolResult?.content
          ?.filter((c) => c.type === "text")
          ?.map((c) => c.text)
          ?.join("\n") || ""

      } catch (toolError) {
        console.log("MCP tool error:", toolError)
        // Continue without MCP data if tool fails
      }
    }

    // =========================
    // STEP 2: FIND USER MEMORY
    // =========================

    let userChat = await ChatHistory.findOne({ userEmail })

    if (!userChat) {
      userChat = await ChatHistory.create({ userEmail, messages: [] })
    }

    // =========================
    // STEP 3: PREVIOUS CONVERSATIONS
    // =========================

    const previousMessages = userChat.messages
      .slice(-10)
      .map((msg) => `${msg.role}: ${msg.text}`)
      .join("\n")

    // =========================
    // STEP 4: SAVE USER MESSAGE
    // =========================

    userChat.messages.push({ role: "user", text: message })
    await userChat.save()

    // =========================
    // STEP 5: STREAM HEADERS
    // =========================

    res.setHeader("Content-Type", "text/plain")
    res.setHeader("Transfer-Encoding", "chunked")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    let aiFullResponse = ""

    // =========================
    // STEP 6: BUILD PROMPT
    // =========================

    const mcpSection = mcpContext
      ? `\nREAL-TIME DATA FROM TOOLS:\n${mcpContext}\n`
      : ""
const historySection = previousMessages.trim()
  ? `PREVIOUS CONVERSATIONS:\n${previousMessages}`
  : "This is the start of a new conversation. Do NOT mention or reference any previous conversations."

const finalPrompt = `
You are PathForge AI.
You are a futuristic AI career mentor.

STRICT RULES:
- NEVER mention or refer to previous conversations unless they are shown below
- NEVER say "I recall" or "In our last interaction" unless real history exists
- NEVER make up or hallucinate past chats
- Only use the history provided below

${historySection}
${mcpSection}
USER MESSAGE:
${message}

Help with:
- coding
- DSA
- internships
- AI
- resume
- interview prep
- productivity
- web development
- projects
- roadmaps

Give:
- intelligent responses
- personalized advice
- practical guidance
- beginner-friendly answers
`


    // =========================
    // STEP 7: GENERATE & STREAM
    // =========================

    await generateChatResponse(finalPrompt, (chunk) => {
      aiFullResponse += chunk
      res.write(chunk)
    })

    // =========================
    // STEP 8: SAVE AI RESPONSE
    // =========================

    userChat.messages.push({ role: "ai", text: aiFullResponse })
    await userChat.save()

    res.end()

  } catch (error) {
    console.log(error)
    res.status(500).end("Error generating response")
  }
})

// =========================
// INTERVIEW QUESTION
// =========================


router.post(
  "/interview-question",
  async (req, res) => {

    try {

      const { role } =
        req.body

      const result =
        await interviewTool.execute({
          role
        })

      let interviewText =
          result.content[0].text

interviewText =
  interviewText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()
const interview =
  JSON.parse(interviewText)

      res.json({
        success: true,
        interview
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
)


router.post(
  "/generate-interview",
  async (req, res) => {

    try {

      const { role, industry, skillType } =
        req.body

      const mcpResult =
        await interviewTool.execute({
          role,
          industry,
          skillType
        })

      const interview =
        JSON.parse(
          mcpResult.content[0].text
        )

      res.json({
        success: true,
        interview
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
)

router.post(
  "/evaluate-answer",
  async (req, res) => {

    try {

      const {
        question,
        answer
      } = req.body

      const prompt = `
You are a senior technical interviewer.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and provide:

1. Score out of 10
2. Strengths
3. Weaknesses
4. Missing points
5. Improved answer

Keep feedback concise and professional.
`

      const response =
        await generateChatResponse(prompt)

      res.json({
        success: true,
        response
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  }
)


export default router
