import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { z } from 'zod';
import type { NextFunction, Request, Response } from 'express';
import { PlannerPreferencesSchema } from '../../lib/ai/schemas';
import type { StoreName } from '../../lib/types';
import type { RetailerAdapter } from './retailer-adapter';

export function startRetailerMcpServer({ store, port, apiKey, adapter }: { store: StoreName; port: number; apiKey?: string; adapter: RetailerAdapter }) {
  const app = createMcpExpressApp();
  const requestWindows = new Map<string, { count: number; resetAt: number }>();

  app.use((request: Request, response: Response, next: NextFunction) => {
    if (apiKey && request.headers.authorization !== `Bearer ${apiKey}`) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const key = request.ip || 'unknown';
    const now = Date.now();
    const window = requestWindows.get(key);
    const current = !window || window.resetAt < now ? { count: 0, resetAt: now + 60_000 } : window;
    current.count += 1;
    requestWindows.set(key, current);
    if (current.count > 60) {
      response.status(429).json({ error: 'Rate limit exceeded' });
      return;
    }
    next();
  });

  app.post('/mcp', async (request: Request, response: Response) => {
    const server = new McpServer({ name: `${store.toLowerCase()}-retailer-mcp`, version: '0.1.0' });
    server.registerTool('search_products', {
      description: `Search and normalize authorized ${store} product data`,
      inputSchema: {
        query: z.string().trim().min(1),
        preferences: PlannerPreferencesSchema.default({}),
        limit: z.number().int().min(1).max(25).default(10)
      }
    }, async ({ query, preferences, limit }) => {
      await adapter.authenticate();
      const products = await adapter.search(query, preferences, limit);
      return { content: [{ type: 'text', text: JSON.stringify(products) }] };
    });

    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    try {
      await server.connect(transport);
      await transport.handleRequest(request, response, request.body);
    } catch (error) {
      if (!response.headersSent) response.status(500).json({ error: error instanceof Error ? error.message : 'MCP server error' });
    } finally {
      response.on('close', () => {
        transport.close().catch(() => undefined);
        server.close().catch(() => undefined);
      });
    }
  });

  app.get('/health', (_request: Request, response: Response) => response.json({ ok: true, store, adapter: 'development-catalog' }));
  app.listen(port, () => console.log(`${store} MCP listening at http://localhost:${port}/mcp`));
}
