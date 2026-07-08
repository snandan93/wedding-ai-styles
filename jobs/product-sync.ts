import { productIndex } from '../lib/data/product-index';

async function main() {
  console.log(`[product-sync] Synced ${productIndex.length} indexed demo products.`);
  console.log('[product-sync] Replace this with retailer/API ingestion for Myntra, AJIO and Flipkart.');
}

main().catch(error => {
  console.error('[product-sync] Failed', error);
  process.exit(1);
});
