import type { PlannerPreferences, Product, RankedProduct } from '@/lib/types';

export async function rankProducts(
  products: Product[],
  preferences: Required<PlannerPreferences>,
  reviewSummaries: Record<string, string>
): Promise<RankedProduct[]> {
  return products
    .map(product => {
      const colorMatch = product.colors.some(color => preferences.colorPreference.toLowerCase().includes(color) || color.includes(preferences.colorPreference.toLowerCase()));
      const themeMatch = product.themeTags.some(tag => preferences.theme.toLowerCase().includes(tag) || tag.includes(preferences.theme.toLowerCase()));
      const budgetFit = product.price <= preferences.budgetMax ? 18 : -8;
      const score = Math.min(
        99,
        Math.round(product.rating * 12 + product.inventoryScore / 2 + budgetFit + (colorMatch ? 12 : 0) + (themeMatch ? 8 : 0))
      );

      return {
        ...product,
        matchScore: score,
        rankReason: `${colorMatch ? 'Color preference matched' : 'Palette-adjacent pick'} · ${product.price <= preferences.budgetMax ? 'inside budget' : 'slightly above budget'} · ${product.fitNotes}`,
        reviewSummary: reviewSummaries[product.id] || 'Review signal pending.'
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
