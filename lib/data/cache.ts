type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

export async function getCache<T>(key: string): Promise<T | null> {
  const entry = memoryCache.get(key);
  if (!entry || entry.expiresAt < Date.now()) {
    memoryCache.delete(key);
    return null;
  }

  return entry.value as T;
}

export async function setCache<T>(key: string, value: T, ttlMs = 5 * 60 * 1000) {
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
}
