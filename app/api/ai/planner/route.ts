import { runPlannerOrchestration } from '@/lib/ai/router';
import type { PlannerPreferences } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    message?: string;
    preferences?: PlannerPreferences;
    userId?: string;
  };

  const result = await runPlannerOrchestration({
    message: body.message || '',
    preferences: body.preferences,
    userId: body.userId
  });

  return Response.json(result);
}
