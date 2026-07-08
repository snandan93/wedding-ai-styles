import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vow & Vogue | AI Wedding Planner',
  description: 'Next.js wedding planner with AI orchestration, product ranking, RAG context, and MCP-style retailer tools.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
