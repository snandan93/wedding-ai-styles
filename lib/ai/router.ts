import { rankProducts } from '@/lib/ai/agents/ranking';
import { summarizeReviews } from '@/lib/ai/agents/review-summarizer';
import { generateThemeMoodboard } from '@/lib/ai/agents/theme-generator';
import { runRetailerRetrievalGraph } from '@/lib/ai/graph/retailer-graph';
import { rememberUserPreference } from '@/lib/data/user-memory';
import type { PlannerPreferences, PlannerResponse, Product, RetailerProduct } from '@/lib/types';

function toLegacyProduct(product: RetailerProduct, preferences: Required<PlannerPreferences>): Product {
  return {
    id: product.id,
    name: product.name,
    event: product.event || preferences.event,
    personType: product.personType || preferences.personType,
    ageRange: preferences.ageRange,
    price: product.price,
    store: product.store,
    category: product.category,
    colors: product.colors,
    themeTags: preferences.stylePreferences,
    image: product.imageUrl,
    searchUrl: product.productUrl,
    productUrl: product.productUrl,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    inventoryScore: product.inStock ? 100 : 0,
    fitNotes: `${preferences.personType} ${preferences.event} pick — ${product.category}`
  };
}

export async function runPlannerOrchestration({
  message,
  preferences,
  userId = 'anonymous'
}: {
  message: string;
  preferences?: PlannerPreferences;
  userId?: string;
}): Promise<PlannerResponse> {
  const graphState = await runRetailerRetrievalGraph({
    requestId: crypto.randomUUID(),
    userId,
    message,
    preferences: preferences || {}
  });
  const inferredPreferences = graphState.preferences as Required<PlannerPreferences>;
  const generatedQueries = graphState.generatedQueries;
  const ragContext = graphState.ragContext;
  const products = Object.values(graphState.retailerResults)
    .flatMap(retailerProducts => retailerProducts || [])
    .map(product => toLegacyProduct(product, inferredPreferences));
  const reviewSummaries = await summarizeReviews(products);
  const rankedProducts = await rankProducts(products, inferredPreferences, reviewSummaries);
  const moodboard = await generateThemeMoodboard(inferredPreferences);

  await rememberUserPreference(userId, inferredPreferences);

  return {
    reply: `I found ${rankedProducts.length} ${inferredPreferences.event} options for ${inferredPreferences.personType}, tuned around ${inferredPreferences.colorPreference} and under ₹${inferredPreferences.budgetMax.toLocaleString('en-IN')}. The product list is ready with store redirects.`,
    inferredPreferences,
    generatedQueries,
    moodboard,
    products: rankedProducts,
    ragContext
  };
}
