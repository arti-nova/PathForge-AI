import { generateAIResponse } from "../services/geminiServices.js"

export async function analyzeResume(req, res) {

  try {

    const { resumeText } = req.body

    const prompt = `
    Analyze this resume and give:
    1. Skill strengths
    2. Weaknesses
    3. Internship readiness
    4. Career suggestions

    Resume:
    ${resumeText}
    `

    const response = await generateAIResponse(prompt)

    res.json({
      success: true,
      response,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    })

  }
}