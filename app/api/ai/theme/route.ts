import { generateShoppingQuery } from '@/lib/ai/agents/query-generator';
import { generateThemeMoodboard } from '@/lib/ai/agents/theme-generator';
import type { PlannerPreferences } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    preferences?: PlannerPreferences;
  };

  const { inferredPreferences } = generateShoppingQuery(body.message || '', body.preferences);
  const moodboard = await generateThemeMoodboard(inferredPreferences);

  return Response.json({
    inferredPreferences,
    moodboard
  });
}
