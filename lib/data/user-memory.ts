import { getPreferenceMemory, savePreferenceMemory } from '@/lib/data/db';
import type { PlannerPreferences } from '@/lib/types';

export async function rememberUserPreference(userId: string, preferences: PlannerPreferences) {
  await savePreferenceMemory(userId, preferences);
}

export async function getUserPreferenceSummary(userId: string) {
  const memory = await getPreferenceMemory(userId);
  if (!memory.length) return 'No previous style memory yet.';

  const latest = memory[memory.length - 1];
  return `Latest preference: ${latest.event || 'event open'}, ${latest.personType || 'person open'}, ${latest.colorPreference || 'color open'}.`;
}
