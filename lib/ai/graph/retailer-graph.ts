import { Annotation, END, START, StateGraph } from '@langchain/langgraph';
import { generateShoppingQuery } from '@/lib/ai/agents/query-generator';
import { runRagEngine } from '@/lib/ai/rag';
import { searchAllRetailers } from '@/lib/mcp/retailer-client';
import type { GraphError, PlannerGraphInput, PlannerPreferences, RetailerProduct, StoreName } from '@/lib/types';

const RetailerGraphState = Annotation.Root({
  requestId: Annotation<string>,
  message: Annotation<string>,
  preferences: Annotation<PlannerPreferences>,
  generatedQueries: Annotation<string[]>({ reducer: (_, right) => right, default: () => [] }),
  retailerResults: Annotation<Partial<Record<StoreName, RetailerProduct[]>>>({ reducer: (_, right) => right, default: () => ({}) }),
  ragContext: Annotation<string[]>({ reducer: (_, right) => right, default: () => [] }),
  errors: Annotation<GraphError[]>({ reducer: (left, right) => [...left, ...right], default: () => [] })
});

async function prepareQuery(state: typeof RetailerGraphState.State) {
  const { inferredPreferences, generatedQueries } = generateShoppingQuery(state.message, state.preferences);
  return { preferences: inferredPreferences, generatedQueries };
}

async function retrieveInParallel(state: typeof RetailerGraphState.State) {
  const query = state.generatedQueries.join(' ');
  const [retailers, rag] = await Promise.allSettled([
    searchAllRetailers(query, state.preferences),
    runRagEngine(`${state.message} ${query}`, state.preferences)
  ]);

  const errors: GraphError[] = [];
  let retailerResults: Partial<Record<StoreName, RetailerProduct[]>> = {};
  let ragContext: string[] = [];

  if (retailers.status === 'fulfilled') {
    retailerResults = retailers.value.results;
    errors.push(...retailers.value.errors.map(error => ({
      node: 'retailer-retrieval', code: 'RETAILER_UNAVAILABLE', message: error.message, retryable: true, retailer: error.store
    })));
  } else {
    errors.push({ node: 'retailer-retrieval', code: 'ALL_RETAILERS_FAILED', message: String(retailers.reason), retryable: true });
  }

  if (rag.status === 'fulfilled') ragContext = rag.value;
  else errors.push({ node: 'rag-retrieval', code: 'RAG_FAILED', message: String(rag.reason), retryable: true });

  return { retailerResults, ragContext, errors };
}

export const retailerRetrievalGraph = new StateGraph(RetailerGraphState)
  .addNode('prepare-query', prepareQuery)
  .addNode('parallel-retrieval', retrieveInParallel)
  .addEdge(START, 'prepare-query')
  .addEdge('prepare-query', 'parallel-retrieval')
  .addEdge('parallel-retrieval', END)
  .compile();

export async function runRetailerRetrievalGraph(input: PlannerGraphInput) {
  return retailerRetrievalGraph.invoke({
    requestId: input.requestId,
    message: input.message,
    preferences: input.preferences
  });
}
