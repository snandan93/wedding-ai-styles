import { generateShoppingQuery } from '@/lib/ai/agents/query-generator';
import { runProductSearchAgent } from '@/lib/ai/agents/product-search';
import { rankProducts } from '@/lib/ai/agents/ranking';
import { summarizeReviews } from '@/lib/ai/agents/review-summarizer';
import { generateThemeMoodboard } from '@/lib/ai/agents/theme-generator';
import { runRagEngine } from '@/lib/ai/rag';
import { rememberUserPreference } from '@/lib/data/user-memory';
import type { PlannerPreferences, PlannerResponse } from '@/lib/types';

export async function runPlannerOrchestration({
  message,
  preferences,
  userId = 'anonymous'
}: {
  message: string;
  preferences?: PlannerPreferences;
  userId?: string;
}): Promise<PlannerResponse> {
  const { inferredPreferences, generatedQueries } = generateShoppingQuery(message, preferences);
  const ragContext = await runRagEngine(`${message} ${generatedQueries.join(' ')}`, inferredPreferences);
  const products = await runProductSearchAgent(inferredPreferences, generatedQueries);
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
