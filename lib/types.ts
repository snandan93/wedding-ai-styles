export type WeddingEvent = 'haldi' | 'mehndi' | 'sangeet' | 'engagement' | 'wedding' | 'reception' | 'prewedding';

export type PersonType = 'girl' | 'boy' | 'men' | 'women';

export type BudgetRange = 'value' | 'mid' | 'premium' | 'luxury';

export type StoreName = 'Myntra' | 'AJIO' | 'Flipkart';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';

export type BodyType = 'Petite' | 'Straight' | 'Curvy' | 'Athletic' | 'Plus size' | 'Prefer not to say';

export type SkinTone = 'Fair' | 'Light' | 'Medium' | 'Olive' | 'Dusky' | 'Deep' | 'Prefer not to say';

export type PlannerPreferences = {
  theme?: string;
  event?: WeddingEvent;
  personType?: PersonType;
  ageRange?: string;
  budgetMin?: number;
  budgetMax?: number;
  colorPreference?: string;
  preferredColors?: string[];
  size?: ClothingSize;
  bodyType?: BodyType;
  skinTone?: SkinTone;
  stylePreferences?: string[];
  photoAssetId?: string;
};

export type Product = {
  id: string;
  name: string;
  event: WeddingEvent;
  personType: PersonType;
  ageRange: string;
  price: number;
  store: StoreName;
  category: string;
  colors: string[];
  themeTags: string[];
  image: string;
  searchUrl: string;
  productUrl?: string;
  rating: number;
  reviewCount: number;
  inventoryScore: number;
  fitNotes: string;
};

export type RankedProduct = Product & {
  matchScore: number;
  rankReason: string;
  reviewSummary: string;
};

export type PlannerResponse = {
  reply: string;
  inferredPreferences: Required<PlannerPreferences>;
  generatedQueries: string[];
  moodboard: {
    title: string;
    palette: string[];
    notes: string[];
  };
  products: RankedProduct[];
  ragContext: string[];
};

export type McpToolRequest = {
  query?: string;
  preferences?: PlannerPreferences;
  products?: Product[];
  budgetMax?: number;
};

export type McpToolResponse = {
  tool: string;
  ok: boolean;
  data: unknown;
};

export type { CompleteLook, GraphError, PlannerGraphInput, PlannerGraphState, RetailerProduct } from '@/lib/ai/schemas';
