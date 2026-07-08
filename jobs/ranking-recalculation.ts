import { generateShoppingQuery } from '../lib/ai/agents/query-generator';
import { rankProducts } from '../lib/ai/agents/ranking';
import { summarizeReviews } from '../lib/ai/agents/review-summarizer';
import { productIndex } from '../lib/data/product-index';

async function main() {
  const { inferredPreferences } = generateShoppingQuery('haldi women yellow under 7000');
  const summaries = await summarizeReviews(productIndex);
  const ranked = await rankProducts(productIndex, inferredPreferences, summaries);
  console.log(`[ranking-recalculation] Recalculated ranking signals for ${ranked.length} products.`);
}

main().catch(error => {
  console.error('[ranking-recalculation] Failed', error);
  process.exit(1);
});
