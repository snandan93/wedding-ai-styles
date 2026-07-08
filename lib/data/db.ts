import { productIndex } from '@/lib/data/product-index';
import type { PlannerPreferences, Product } from '@/lib/types';

const preferenceMemory = new Map<string, PlannerPreferences[]>();

export async function getProducts(): Promise<Product[]> {
  return productIndex;
}

export async function savePreferenceMemory(userId: string, preferences: PlannerPreferences) {
  const existing = preferenceMemory.get(userId) || [];
  preferenceMemory.set(userId, [...existing.slice(-9), preferences]);
}

export async function getPreferenceMemory(userId: string) {
  return preferenceMemory.get(userId) || [];
}
