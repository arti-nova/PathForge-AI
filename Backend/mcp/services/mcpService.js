import { githubTool } from "../tools/githubTool.js"
import { resumeTool } from "../tools/resumeTool.js"
import { roadmapTool } from "../tools/roadmapTool.js"
import { interviewTool } from "../tools/interviewTool.js"

const toolMap = {

  github_fetch: githubTool,

  resume_analyze: resumeTool,

  generate_roadmap: roadmapTool,

  generate_interview: interviewTool
}

export const executeMCPTool =
  async (toolName, args) => {

    const tool =
      toolMap[toolName]

    if (!tool) {
      throw new Error(
        `Tool "${toolName}" not found`
      )
    }

    return await tool.execute(args)
  }

export const getMCPToolDefinitions =
  () => {
    return Object.values(toolMap)
      .map(
        (tool) => tool.definition
      )
  }