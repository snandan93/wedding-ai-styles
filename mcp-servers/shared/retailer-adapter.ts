import { searchProductIndex } from '../../lib/data/product-index';
import { RetailerProductSchema } from '../../lib/ai/schemas';
import type { PlannerPreferences, RetailerProduct, StoreName } from '../../lib/types';

export type RetailerAdapter = {
  authenticate(): Promise<void>;
  search(query: string, preferences: PlannerPreferences, limit: number): Promise<RetailerProduct[]>;
};

async function retry<T>(operation: () => Promise<T>, attempts = 3) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise(resolve => setTimeout(resolve, attempt * 150));
    }
  }
  throw lastError;
}

export function createDevelopmentAdapter(store: StoreName): RetailerAdapter {
  return {
    async authenticate() {
      // Production adapters exchange retailer/affiliate credentials here.
    },
    async search(query, preferences, limit) {
      return retry(async () => searchProductIndex(preferences, query)
        .filter(product => product.store === store)
        .slice(0, limit)
        .map(product => RetailerProductSchema.parse({
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
        })));
    }
  };
}
