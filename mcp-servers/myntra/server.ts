import { createDevelopmentAdapter } from '../shared/retailer-adapter';
import { startRetailerMcpServer } from '../shared/server';

startRetailerMcpServer({
  store: 'Myntra',
  port: Number(process.env.MYNTRA_MCP_PORT || 4101),
  apiKey: process.env.MYNTRA_MCP_API_KEY,
  adapter: createDevelopmentAdapter('Myntra')
});
