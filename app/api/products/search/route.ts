import { searchProductIndex } from '@/lib/data/product-index';
import { hydrateProductImages } from '@/lib/data/product-images';
import type { PlannerPreferences } from '@/lib/types';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const preferences: PlannerPreferences = {
    event: (url.searchParams.get('event') || undefined) as PlannerPreferences['event'],
    personType: (url.searchParams.get('personType') || undefined) as PlannerPreferences['personType'],
    colorPreference: url.searchParams.get('color') || undefined,
    budgetMin: url.searchParams.get('budgetMin') ? Number(url.searchParams.get('budgetMin')) : undefined,
    budgetMax: url.searchParams.get('budgetMax') ? Number(url.searchParams.get('budgetMax')) : undefined
  };
  const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10;

  const products = searchProductIndex(preferences, url.searchParams.get('q') || '').slice(0, limit);

  return Response.json({
    products: await hydrateProductImages(products)
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    query?: string;
    preferences?: PlannerPreferences;
    limit?: number;
  };

  const products = searchProductIndex(body.preferences, body.query).slice(0, body.limit || 10);

  return Response.json({
    products: await hydrateProductImages(products)
  });
}
