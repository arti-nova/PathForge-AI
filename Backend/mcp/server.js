const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { githubTool } = require('../tools/githubTool');
const { resumeTool } = require('../tools/resumeTool');

const server = new Server(
  { name: 'pathforge-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// Register all tools
server.setRequestHandler('tools/list', async () => ({
  tools: [
    githubTool.definition,
    resumeTool.definition,
  ]
}));

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'github_fetch') return await githubTool.execute(args);
  if (name === 'resume_analyze') return await resumeTool.execute(args);

  throw new Error(`Unknown tool: ${name}`);
});

async function startMCPServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('MCP Server running...');
}

module.exports = { startMCPServer, server };