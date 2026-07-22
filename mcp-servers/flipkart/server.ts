import { createDevelopmentAdapter } from '../shared/retailer-adapter';
import { startRetailerMcpServer } from '../shared/server';

startRetailerMcpServer({
  store: 'Flipkart',
  port: Number(process.env.FLIPKART_MCP_PORT || 4102),
  apiKey: process.env.FLIPKART_MCP_API_KEY,
  adapter: createDevelopmentAdapter('Flipkart')
});
