import { queryVectorStore } from '@/lib/data/vector-store';
import type { PlannerPreferences } from '@/lib/types';

export async function runRagEngine(query: string, preferences: PlannerPreferences) {
  const hits = await queryVectorStore(query, preferences.event);
  return hits.map(hit => hit.text);
}
