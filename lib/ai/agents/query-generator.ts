import { getDefaultPreferences } from '@/lib/data/product-index';
import type { PersonType, PlannerPreferences, WeddingEvent } from '@/lib/types';

const eventKeywords: Array<[WeddingEvent, RegExp]> = [
  ['prewedding', /\b(pre[-\s]?wedding|shoot|photoshoot)\b/i],
  ['sangeet', /\b(sangeet|dance night|musical night)\b/i],
  ['engagement', /\b(engagement|ring ceremony|roka|sagai|sagan)\b/i],
  ['reception', /\b(reception|cocktail|evening)\b/i],
  ['mehndi', /\b(mehndi|henna)\b/i],
  ['haldi', /\b(haldi|turmeric|marigold)\b/i],
  ['wedding', /\b(wedding|shaadi|ceremony|bride|groom)\b/i]
];

const personKeywords: Array<[PersonType, RegExp]> = [
  ['girl', /\b(girl|daughter|niece|kid girl|little girl)\b/i],
  ['boy', /\b(boy|son|nephew|kid boy|little boy)\b/i],
  ['men', /\b(men|man|groom|husband|brother|father)\b/i],
  ['women', /\b(women|woman|bride|wife|sister|mother|guest)\b/i]
];

const colorKeywords = [
  'yellow',
  'green',
  'red',
  'wine',
  'gold',
  'ivory',
  'black',
  'silver',
  'champagne',
  'blush',
  'blue',
  'cream',
  'pastel',
  'emerald',
  'pink'
];

function findBudget(message: string) {
  const compact = message.toLowerCase().replace(/,/g, '');
  const underMatch = compact.match(/(?:under|below|upto|up to)\s*(?:rs\.?|₹)?\s*(\d+)\s*k?/);
  const aroundMatch = compact.match(/(?:around|budget|within)\s*(?:rs\.?|₹)?\s*(\d+)\s*k?/);
  const rangeMatch = compact.match(/(?:₹|rs\.?)?\s*(\d+)\s*k?\s*(?:-|to)\s*(?:₹|rs\.?)?\s*(\d+)\s*k?/);

  if (rangeMatch) {
    const min = Number(rangeMatch[1]) * (rangeMatch[1].length <= 2 ? 1000 : 1);
    const max = Number(rangeMatch[2]) * (rangeMatch[2].length <= 2 ? 1000 : 1);
    return { budgetMin: min, budgetMax: max };
  }

  const matched = underMatch || aroundMatch;
  if (!matched) return {};

  const value = Number(matched[1]) * (matched[1].length <= 2 ? 1000 : 1);
  return underMatch ? { budgetMin: 0, budgetMax: value } : { budgetMin: Math.round(value * 0.55), budgetMax: Math.round(value * 1.25) };
}

export function generateShoppingQuery(message = '', preferences: PlannerPreferences = {}) {
  const defaults = getDefaultPreferences();
  const inferred: Required<PlannerPreferences> = { ...defaults };

  for (const [key, value] of Object.entries(preferences) as Array<[keyof PlannerPreferences, PlannerPreferences[keyof PlannerPreferences]]>) {
    if (value !== undefined) {
      Object.assign(inferred, { [key]: value });
    }
  }

  const eventMatch = eventKeywords.find(([, pattern]) => pattern.test(message));
  const personMatch = personKeywords.find(([, pattern]) => pattern.test(message));
  const colorMatch = colorKeywords.find(color => message.toLowerCase().includes(color));
  const budget = findBudget(message);

  if (eventMatch) inferred.event = eventMatch[0];
  if (personMatch) inferred.personType = personMatch[0];
  if (colorMatch) inferred.colorPreference = colorMatch;
  inferred.budgetMin = budget.budgetMin ?? inferred.budgetMin;
  inferred.budgetMax = budget.budgetMax ?? inferred.budgetMax;

  const generatedQueries = [
    `${inferred.colorPreference} ${inferred.event} outfit for ${inferred.personType}`,
    `${inferred.theme} ${inferred.event} ${inferred.personType} under ${inferred.budgetMax}`,
    `${inferred.event} wedding ${inferred.colorPreference} accessories ${inferred.personType}`
  ];

  return { inferredPreferences: inferred, generatedQueries };
}
