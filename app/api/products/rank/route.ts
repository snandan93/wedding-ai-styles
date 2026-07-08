import { generateShoppingQuery } from '@/lib/ai/agents/query-generator';
import { rankProducts } from '@/lib/ai/agents/ranking';
import { summarizeReviews } from '@/lib/ai/agents/review-summarizer';
import { hydrateProductImages } from '@/lib/data/product-images';
import { searchProductIndex } from '@/lib/data/product-index';
import type { PlannerPreferences, Product } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    preferences?: PlannerPreferences;
    products?: Product[];
  };

  const { inferredPreferences, generatedQueries } = generateShoppingQuery(body.message || '', body.preferences);
  const products = await hydrateProductImages(body.products || searchProductIndex(inferredPreferences, generatedQueries.join(' ')));
  const summaries = await summarizeReviews(products);

  return Response.json({
    products: await rankProducts(products, inferredPreferences, summaries)
  });
}
