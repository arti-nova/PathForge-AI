import axios from "axios"

console.log("✅ GitHub MCP Tool Triggered")
export const githubTool = {
  definition: {
    name: "github_fetch",
    description: "Fetches GitHub repos and contributions for a user",
    inputSchema: {
      type: "object",
      properties: {
        username: { type: "string", description: "GitHub username" },
      },
      required: ["username"],
    },
  },

  execute: async ({ username }) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      )

      const repos = res.data.map((r) => ({
        name: r.name,
        language: r.language,
        stars: r.stargazers_count,
        description: r.description,
      }))

      return {
        content: [{ type: "text", text: JSON.stringify(repos) }],
      }

    } catch (error) {
      return {
        content: [{ type: "text", text: `GitHub error: ${error.message}` }],
      }
    }
  },
}