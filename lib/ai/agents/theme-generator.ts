import { eventConfigs } from '@/lib/data/product-index';
import type { PlannerPreferences } from '@/lib/types';

export async function generateThemeMoodboard(preferences: Required<PlannerPreferences>) {
  const event = eventConfigs[preferences.event];
  const requestedColor = preferences.colorPreference || event.heroColor;
  const palette = [requestedColor, ...event.colors.filter(color => color !== requestedColor)].slice(0, 4);

  return {
    title: `${event.label} ${preferences.theme} moodboard`,
    palette,
    notes: [
      `Anchor the look with ${event.heroColor.toLowerCase()} energy for ${event.label.toLowerCase()}.`,
      `Keep the styling ${event.themes.slice(0, 2).join(' and ')} so it feels event-appropriate.`,
      `Prioritize pieces between ₹${preferences.budgetMin.toLocaleString('en-IN')} and ₹${preferences.budgetMax.toLocaleString('en-IN')}.`
    ]
  };
}
