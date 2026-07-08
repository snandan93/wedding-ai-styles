import { searchProductIndex } from '@/lib/data/product-index';
import { hydrateProductImages } from '@/lib/data/product-images';
import type { PlannerPreferences } from '@/lib/types';

export async function runProductSearchAgent(preferences: PlannerPreferences, generatedQueries: string[]) {
  const mergedQuery = generatedQueries.join(' ');
  return hydrateProductImages(searchProductIndex(preferences, mergedQuery).slice(0, 10));
}
