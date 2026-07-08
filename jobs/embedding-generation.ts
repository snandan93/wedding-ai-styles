import { ragCorpus } from '../lib/data/rag-corpus';

async function main() {
  console.log(`[embedding-generation] Prepared ${ragCorpus.length} RAG documents for embedding.`);
  console.log('[embedding-generation] Connect this to Qdrant, Pinecone, or Supabase pgvector.');
}

main().catch(error => {
  console.error('[embedding-generation] Failed', error);
  process.exit(1);
});
