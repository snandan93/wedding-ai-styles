import type { Product } from '@/lib/types';

export async function summarizeReviews(products: Product[]) {
  return products.reduce<Record<string, string>>((summaries, product) => {
    const confidence = product.rating >= 4.6 ? 'highly liked' : product.rating >= 4.3 ? 'well liked' : 'solid';
    summaries[product.id] = `${confidence} by shoppers, with ${product.reviewCount} reviews and strong notes for ${product.fitNotes.toLowerCase()}`;
    return summaries;
  }, {});
}
