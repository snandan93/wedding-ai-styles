import { z } from 'zod';

export const WeddingEventSchema = z.enum(['haldi', 'mehndi', 'sangeet', 'engagement', 'wedding', 'reception', 'prewedding']);
export const PersonTypeSchema = z.enum(['girl', 'boy', 'men', 'women']);
export const StoreNameSchema = z.enum(['Myntra', 'AJIO', 'Flipkart']);
export const ClothingSizeSchema = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom']);
export const BodyTypeSchema = z.enum(['Petite', 'Straight', 'Curvy', 'Athletic', 'Plus size', 'Prefer not to say']);
export const SkinToneSchema = z.enum(['Fair', 'Light', 'Medium', 'Olive', 'Dusky', 'Deep', 'Prefer not to say']);

export const PlannerPreferencesSchema = z.object({
  theme: z.string().trim().min(1).optional(),
  event: WeddingEventSchema.optional(),
  personType: PersonTypeSchema.optional(),
  ageRange: z.string().trim().min(1).optional(),
  budgetMin: z.number().nonnegative().optional(),
  budgetMax: z.number().positive().optional(),
  colorPreference: z.string().trim().min(1).optional(),
  preferredColors: z.array(z.string().trim().min(1)).max(8).optional(),
  size: ClothingSizeSchema.optional(),
  bodyType: BodyTypeSchema.optional(),
  skinTone: SkinToneSchema.optional(),
  stylePreferences: z.array(z.string().trim().min(1)).max(8).optional(),
  photoAssetId: z.string().trim().max(256).optional()
}).refine(value => value.budgetMin === undefined || value.budgetMax === undefined || value.budgetMin <= value.budgetMax, {
  message: 'budgetMin must be less than or equal to budgetMax',
  path: ['budgetMax']
});

export const PlannerGraphInputSchema = z.object({
  requestId: z.string().trim().min(1).max(128),
  userId: z.string().trim().min(1).max(128).optional(),
  threadId: z.string().trim().min(1).max(128).optional(),
  message: z.string().trim().max(4000).default(''),
  preferences: PlannerPreferencesSchema.default({})
});

export const RetailerProductSchema = z.object({
  id: z.string().trim().min(1),
  retailerProductId: z.string().trim().min(1),
  store: StoreNameSchema,
  name: z.string().trim().min(1),
  description: z.string().trim().optional(),
  category: z.string().trim().min(1),
  event: WeddingEventSchema.optional(),
  personType: PersonTypeSchema.optional(),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  currency: z.string().length(3).default('INR'),
  colors: z.array(z.string().trim().min(1)).default([]),
  sizes: z.array(ClothingSizeSchema).default([]),
  imageUrl: z.string().url(),
  productUrl: z.string().url(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  inStock: z.boolean(),
  fetchedAt: z.string().datetime(),
  sourceQuery: z.string().trim().optional()
});

export const GraphErrorSchema = z.object({
  node: z.string().trim().min(1),
  code: z.string().trim().min(1),
  message: z.string().trim().min(1),
  retryable: z.boolean().default(false),
  retailer: StoreNameSchema.optional()
});

export const CompleteLookItemSchema = z.object({
  role: z.enum(['outfit', 'jewelry', 'footwear', 'accessory', 'beauty']),
  productId: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1),
  guidance: z.string().trim().min(1),
  estimatedPrice: z.number().nonnegative().optional()
});

export const CompleteLookSchema = z.object({
  id: z.string().trim().min(1),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  event: WeddingEventSchema,
  palette: z.array(z.string().trim().min(1)).min(1).max(8),
  items: z.array(CompleteLookItemSchema).min(1),
  totalEstimatedPrice: z.number().nonnegative(),
  matchScore: z.number().min(0).max(100),
  reasoning: z.array(z.string().trim().min(1)).min(1),
  warnings: z.array(z.string()).default([])
});

export const PlannerGraphStateSchema = PlannerGraphInputSchema.extend({
  preferences: PlannerPreferencesSchema,
  missingFields: z.array(z.string()).default([]),
  retailerQueries: z.record(z.string(), z.array(z.string())).default({}),
  retailerResults: z.record(z.string(), z.array(RetailerProductSchema)).default({}),
  ragContext: z.array(z.string()).default([]),
  reviewSignals: z.record(z.string(), z.string()).default({}),
  rankedProductIds: z.array(z.string()).default([]),
  completeLooks: z.array(CompleteLookSchema).default([]),
  warnings: z.array(z.string()).default([]),
  errors: z.array(GraphErrorSchema).default([])
});

export type PlannerGraphInput = z.infer<typeof PlannerGraphInputSchema>;
export type RetailerProduct = z.infer<typeof RetailerProductSchema>;
export type GraphError = z.infer<typeof GraphErrorSchema>;
export type CompleteLook = z.infer<typeof CompleteLookSchema>;
export type PlannerGraphState = z.infer<typeof PlannerGraphStateSchema>;
