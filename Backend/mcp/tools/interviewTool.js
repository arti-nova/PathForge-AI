import {
  GoogleGenerativeAI
} from "@google/generative-ai"

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_INTERVIEW_KEY
  )

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

export const interviewTool = {

  definition: {

    name: "generate_interview",

    description:
      "Generate interview questions dynamically",

    inputSchema: {

      type: "object",

      properties: {
        role: {
          type: "string"
        }
      },

      required: ["role"]
    }
  },

  execute: async ({ role, industry, skillType }) => {

    const prompt = `
Generate 5 professional interview questions.

Role: ${role}

Industry: ${industry}

Assessment Type: ${skillType}

Return ONLY valid JSON:

{
  "role": "${role}",
  "questions": [
    "question 1",
    "question 2",
    "question 3",
    "question 4",
    "question 5"
  ]
}
`

    const result =
      await model.generateContent(prompt)

    const text =
      result.response.text()

    return {
      content: [
        {
          type: "text",
          text
        }
      ]
    }
  }
}