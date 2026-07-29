'use client';

import type { PlannerPreferences, PlannerResponse, RankedProduct } from '@/lib/types';

export type SavedLook = {
  id: string;
  title: string;
  savedAt: string;
  preferences: Required<PlannerPreferences>;
  moodboard: PlannerResponse['moodboard'];
  products: RankedProduct[];
};

const LOOKS_KEY = 'vivaah_saved_looks';
const FAVORITES_KEY = 'vivaah_favorite_products';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedLooks(): SavedLook[] {
  return readJson<SavedLook[]>(LOOKS_KEY, []);
}

export function saveLook(look: Omit<SavedLook, 'id' | 'savedAt'>): SavedLook[] {
  const entry: SavedLook = { ...look, id: `look-${Date.now()}`, savedAt: new Date().toISOString() };
  const next = [entry, ...getSavedLooks()].slice(0, 20);
  writeJson(LOOKS_KEY, next);
  return next;
}

export function removeLook(id: string): SavedLook[] {
  const next = getSavedLooks().filter(look => look.id !== id);
  writeJson(LOOKS_KEY, next);
  return next;
}

export function getFavoriteProducts(): RankedProduct[] {
  return readJson<RankedProduct[]>(FAVORITES_KEY, []);
}

export function toggleFavoriteProduct(product: RankedProduct): RankedProduct[] {
  const favorites = getFavoriteProducts();
  const exists = favorites.some(item => item.id === product.id);
  const next = exists ? favorites.filter(item => item.id !== product.id) : [product, ...favorites];
  writeJson(FAVORITES_KEY, next);
  return next;
}

export function buildShareUrl(preferences: Required<PlannerPreferences>): string {
  const params = new URLSearchParams({
    event: preferences.event,
    personType: preferences.personType,
    ageRange: preferences.ageRange,
    colorPreference: preferences.colorPreference,
    theme: preferences.theme,
    budgetMin: String(preferences.budgetMin),
    budgetMax: String(preferences.budgetMax)
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}#planner`;
}

export function readSharedPreferences(): Partial<Required<PlannerPreferences>> | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  if (!params.has('event')) return null;

  const shared: Partial<Required<PlannerPreferences>> = {
    event: (params.get('event') as PlannerPreferences['event']) || undefined,
    personType: (params.get('personType') as PlannerPreferences['personType']) || undefined,
    ageRange: params.get('ageRange') || undefined,
    colorPreference: params.get('colorPreference') || undefined,
    theme: params.get('theme') || undefined,
    budgetMin: params.has('budgetMin') ? Number(params.get('budgetMin')) : undefined,
    budgetMax: params.has('budgetMax') ? Number(params.get('budgetMax')) : undefined
  };

  return Object.fromEntries(Object.entries(shared).filter(([, value]) => value !== undefined)) as Partial<
    Required<PlannerPreferences>
  >;
}
