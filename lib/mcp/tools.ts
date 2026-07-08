import { searchProductIndex } from '@/lib/data/product-index';
import { hydrateProductImages } from '@/lib/data/product-images';
import { summarizeReviews } from '@/lib/ai/agents/review-summarizer';
import type { McpToolRequest, McpToolResponse, PlannerPreferences, StoreName } from '@/lib/types';

type ToolHandler = (request: McpToolRequest) => Promise<unknown>;

function storeSearchTool(store: StoreName): ToolHandler {
  return async request => {
    const products = searchProductIndex(request.preferences, request.query).filter(product => product.store === store);
    return hydrateProductImages(products.slice(0, 10));
  };
}

async function productDatabaseTool(request: McpToolRequest) {
  return hydrateProductImages(searchProductIndex(request.preferences, request.query).slice(0, 10));
}

async function reviewAnalysisTool(request: McpToolRequest) {
  return summarizeReviews(request.products || searchProductIndex(request.preferences, request.query).slice(0, 6));
}

async function budgetRecommendationTool(request: McpToolRequest) {
  const preferences: PlannerPreferences = request.preferences || {};
  const budgetMax = request.budgetMax || preferences.budgetMax || 7000;
  const products = searchProductIndex({ ...preferences, budgetMax }, request.query);
  const median = products.length ? products[Math.floor(products.length / 2)].price : budgetMax;

  return {
    requestedBudget: budgetMax,
    recommendedRange: {
      min: Math.max(0, Math.round(median * 0.65)),
      max: Math.round(median * 1.25)
    },
    note: 'Range is based on matching product prices in the local product index.'
  };
}

export const mcpTools: Record<string, ToolHandler> = {
  myntra: storeSearchTool('Myntra'),
  ajio: storeSearchTool('AJIO'),
  flipkart: storeSearchTool('Flipkart'),
  'product-database': productDatabaseTool,
  'review-analysis': reviewAnalysisTool,
  'budget-recommendation': budgetRecommendationTool
};

export async function runMcpTool(tool: string, request: McpToolRequest): Promise<McpToolResponse> {
  const handler = mcpTools[tool];
  if (!handler) {
    return {
      tool,
      ok: false,
      data: {
        error: `Unknown MCP tool: ${tool}`,
        availableTools: Object.keys(mcpTools)
      }
    };
  }

  return {
    tool,
    ok: true,
    data: await handler(request)
  };
}
