import { summarizeReviews } from '../lib/ai/agents/review-summarizer';
import { productIndex } from '../lib/data/product-index';

async function main() {
  const summaries = await summarizeReviews(productIndex.slice(0, 10));
  console.log(`[review-refresh] Refreshed ${Object.keys(summaries).length} review summaries.`);
}

main().catch(error => {
  console.error('[review-refresh] Failed', error);
  process.exit(1);
});
