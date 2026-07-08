import { generateShoppingQuery } from '@/lib/ai/agents/query-generator';
import { rankProducts } from '@/lib/ai/agents/ranking';
import { summarizeReviews } from '@/lib/ai/agents/review-summarizer';
import { hydrateProductImages } from '@/lib/data/product-images';
import { searchProductIndex } from '@/lib/data/product-index';
import { WeddingPlanner } from '@/components/wedding-planner/wedding-planner';

export default async function Home() {
  const { inferredPreferences, generatedQueries } = generateShoppingQuery('haldi women yellow under 7000');
  const products = await hydrateProductImages(searchProductIndex(inferredPreferences, generatedQueries.join(' ')).slice(0, 10));
  const summaries = await summarizeReviews(products);
  const rankedProducts = await rankProducts(products, inferredPreferences, summaries);

  return <WeddingPlanner initialProducts={rankedProducts} initialPreferences={inferredPreferences} />;
}
