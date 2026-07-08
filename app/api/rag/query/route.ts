import { runRagEngine } from '@/lib/ai/rag';
import type { PlannerPreferences } from '@/lib/types';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    query?: string;
    preferences?: PlannerPreferences;
  };

  return Response.json({
    context: await runRagEngine(body.query || '', body.preferences || {})
  });
}
