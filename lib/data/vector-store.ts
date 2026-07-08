import { ragCorpus } from '@/lib/data/rag-corpus';
import type { WeddingEvent } from '@/lib/types';

function overlapScore(source: string, query: string) {
  const sourceTokens = new Set(source.toLowerCase().split(/\W+/).filter(Boolean));
  return query
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean)
    .reduce((score, token) => score + (sourceTokens.has(token) ? 1 : 0), 0);
}

export async function queryVectorStore(query: string, event?: WeddingEvent) {
  return ragCorpus
    .filter(item => !event || item.event === event)
    .map(item => ({ ...item, score: overlapScore(item.text, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
