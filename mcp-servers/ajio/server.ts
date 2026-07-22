import { createDevelopmentAdapter } from '../shared/retailer-adapter';
import { startRetailerMcpServer } from '../shared/server';

startRetailerMcpServer({
  store: 'AJIO',
  port: Number(process.env.AJIO_MCP_PORT || 4103),
  apiKey: process.env.AJIO_MCP_API_KEY,
  adapter: createDevelopmentAdapter('AJIO')
});
