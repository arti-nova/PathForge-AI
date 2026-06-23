import {
  GoogleGenerativeAI
} from "@google/generative-ai"

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_ROADMAP_KEY
  )

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

export const roadmapTool = {

  definition: {
    name: "generate_roadmap",

    description:
      "Generate complete career roadmap dynamically",

    inputSchema: {
      type: "object",

      properties: {
        goal: {
          type: "string"
        }
      },

      required: ["goal"]
    }
  },

  execute: async ({ goal }) => {

    const prompt = `
Generate a complete roadmap for becoming:

${goal}

Return ONLY valid JSON.

Format:

{
  "title":"",
  "skills":[],
  "projects":[],
  "timeline":[],
  "interviewPrep":[],
  "resources":[]
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