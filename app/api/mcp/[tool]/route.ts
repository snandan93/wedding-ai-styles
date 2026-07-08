import { runMcpTool } from '@/lib/mcp/tools';
import type { McpToolRequest } from '@/lib/types';

export async function POST(request: Request, context: { params: Promise<{ tool: string }> }) {
  const body = (await request.json()) as McpToolRequest;
  const params = await context.params;
  const result = await runMcpTool(params.tool, body);
  return Response.json(result, { status: result.ok ? 200 : 404 });
}
