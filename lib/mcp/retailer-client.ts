import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { CallToolResultSchema } from '@modelcontextprotocol/sdk/types.js';
import { RetailerProductSchema } from '@/lib/ai/schemas';
import { searchProductIndex } from '@/lib/data/product-index';
import type { PlannerPreferences, RetailerProduct, StoreName } from '@/lib/types';

const retailerConfig: Record<StoreName, { url?: string; apiKey?: string }> = {
  Myntra: { url: process.env.MYNTRA_MCP_URL, apiKey: process.env.MYNTRA_MCP_API_KEY },
  Flipkart: { url: process.env.FLIPKART_MCP_URL, apiKey: process.env.FLIPKART_MCP_API_KEY },
  AJIO: { url: process.env.AJIO_MCP_URL, apiKey: process.env.AJIO_MCP_API_KEY }
};

function normalizeLocalProduct(store: StoreName, product: ReturnType<typeof searchProductIndex>[number], query: string): RetailerProduct {
  return RetailerProductSchema.parse({
    id: `${store.toLowerCase()}-${product.id}`,
    retailerProductId: product.id,
    store,
    name: product.name,
    category: product.category,
    event: product.event,
    personType: product.personType,
    price: product.price,
    currency: 'INR',
    colors: product.colors,
    sizes: [],
    imageUrl: product.image.startsWith('/') ? `http://localhost:3000${product.image}` : product.image,
    productUrl: product.productUrl || product.searchUrl,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.inventoryScore > 0,
    fetchedAt: new Date().toISOString(),
    sourceQuery: query
  });
}

function localFallback(store: StoreName, query: string, preferences: PlannerPreferences) {
  return searchProductIndex(preferences, query)
    .filter(product => product.store === store)
    .slice(0, 10)
    .map(product => normalizeLocalProduct(store, product, query));
}

function resultText(result: Awaited<ReturnType<Client['callTool']>>) {
  const parsed = CallToolResultSchema.parse(result);
  const block = parsed.content.find(item => item.type === 'text');
  if (!block || block.type !== 'text') throw new Error('Retailer MCP returned no text payload');
  return block.text;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Retailer MCP timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function searchRetailer(store: StoreName, query: string, preferences: PlannerPreferences): Promise<RetailerProduct[]> {
  const config = retailerConfig[store];
  if (!config.url) return localFallback(store, query, preferences);

  const client = new Client({ name: 'vivaah-ai-web', version: '0.1.0' });
  const transport = new StreamableHTTPClientTransport(new URL(config.url), {
    requestInit: config.apiKey ? { headers: { Authorization: `Bearer ${config.apiKey}` } } : undefined
  });

  try {
    await withTimeout(client.connect(transport), 5000);
    const result = await withTimeout(client.callTool({
      name: 'search_products',
      arguments: { query, preferences, limit: 10 }
    }), 8000);
    return RetailerProductSchema.array().parse(JSON.parse(resultText(result)));
  } finally {
    await client.close().catch(() => undefined);
  }
}

export async function searchAllRetailers(query: string, preferences: PlannerPreferences) {
  const stores: StoreName[] = ['Myntra', 'Flipkart', 'AJIO'];
  const settled = await Promise.allSettled(stores.map(store => searchRetailer(store, query, preferences)));

  return settled.reduce<{ results: Partial<Record<StoreName, RetailerProduct[]>>; errors: Array<{ store: StoreName; message: string }> }>(
    (output, result, index) => {
      const store = stores[index];
      if (result.status === 'fulfilled') output.results[store] = result.value;
      else output.errors.push({ store, message: result.reason instanceof Error ? result.reason.message : 'Unknown retailer error' });
      return output;
    },
    { results: {}, errors: [] }
  );
}
