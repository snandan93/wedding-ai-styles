# Vow & Vogue

Next.js wedding planner scaffold for AI-assisted Indian wedding styling.

The old `index.html` prototype is still present as a static reference. The active app architecture now lives in the Next.js folders.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run lint
```

## Architecture Map

- User Website: `app/page.tsx`, `components/wedding-planner/*`, `app/globals.css`
- Backend Layer:
  - `app/api/ai/planner/route.ts`
  - `app/api/ai/theme/route.ts`
  - `app/api/products/search/route.ts`
  - `app/api/products/rank/route.ts`
  - `app/api/rag/query/route.ts`
  - `app/api/mcp/[tool]/route.ts`
- AI Orchestration Layer: `lib/ai/*`
- MCP Tool Layer: `lib/mcp/tools.ts`
- Data Layer: `lib/data/*`
- Background Jobs: `jobs/*`

## Current Behavior

- Theme selection
- Event selection: Haldi, Mehndi, Wedding, Reception, Pre-wedding
- Person type: Girl, Boy, Men, Women
- Age, budget, and color preferences
- Product result page with ranked retailer search links
- AI chat planner backed by local orchestration

The product catalog, RAG context, tool responses, review summaries, and ranking are deterministic local implementations. For production, connect `lib/data/*` to PostgreSQL, Redis, and a vector DB, then replace the MCP tool handlers with real retailer/product integrations.
