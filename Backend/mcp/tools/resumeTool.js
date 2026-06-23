export const resumeTool = {
  definition: {
    name: "resume_analyze",
    description:
      "Analyzes resume text and extracts skills, score and recommendations",

    inputSchema: {
      type: "object",
      properties: {
        resumeText: {
          type: "string",
          description: "Raw resume text"
        }
      },
      required: ["resumeText"]
    }
  },

  execute: async ({ resumeText }) => {
    try {

      const text = resumeText.toLowerCase()

      // Known Skills

      const skillDatabase = [
        "html",
        "css",
        "javascript",
        "react",
        "node.js",
        "mongodb",
        "express",
        "tailwind",
        "typescript",
        "redux",
        "jest",
        "java",
        "python",
        "git",
        "github"
      ]

      const foundSkills =
        skillDatabase.filter(skill =>
          text.includes(skill)
        )

      // Missing Skills

      const recommendedSkills = [
        "typescript",
        "redux",
        "jest",
        "docker",
        "next.js"
      ]

      const missingSkills =
        recommendedSkills.filter(
          skill => !foundSkills.includes(skill)
        )

      // Experience Check

      const hasExperience =
        text.includes("experience") ||
        text.includes("internship")

      const hasProjects =
        text.includes("project")

      const hasEducation =
        text.includes("b.tech") ||
        text.includes("degree") ||
        text.includes("education")

      // Score Calculation

      let score = 0

      score += foundSkills.length * 8

      if (hasExperience) score += 20
      if (hasProjects) score += 20
      if (hasEducation) score += 20

      score = Math.min(score, 100)

      // Strengths

      const strengths = []

      if (foundSkills.includes("react"))
        strengths.push(
          "Strong React development skills"
        )

      if (hasProjects)
        strengths.push(
          "Good project experience"
        )

      if (hasExperience)
        strengths.push(
          "Industry exposure through internship"
        )

      // Career Suggestions

      const careerSuggestions = []

      if (!foundSkills.includes("typescript"))
        careerSuggestions.push(
          "Learn TypeScript for modern React development"
        )

      if (!foundSkills.includes("jest"))
        careerSuggestions.push(
          "Learn testing with Jest and React Testing Library"
        )

      if (!foundSkills.includes("redux"))
        careerSuggestions.push(
          "Learn advanced state management using Redux"
        )

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                skills: foundSkills,
                score,
                missingSkills,
                strengths,
                careerSuggestions
              },
              null,
              2
            )
          }
        ]
      }

    } catch (error) {

      return {
        content: [
          {
            type: "text",
            text: `Resume error: ${error.message}`
          }
        ]
      }

    }
  }
}