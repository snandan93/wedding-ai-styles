import type { WeddingEvent } from '@/lib/types';

export const ragCorpus: Array<{ id: string; event: WeddingEvent; text: string }> = [
  {
    id: 'haldi-colors',
    event: 'haldi',
    text: 'Haldi styling performs best with yellow, ivory, marigold, gota details, breathable fabrics, and silhouettes that allow movement.'
  },
  {
    id: 'mehndi-motion',
    event: 'mehndi',
    text: 'Mehndi outfits should handle seated rituals and dancing. Mirror-work, greens, floral accents, and comfortable footwear are strong matches.'
  },
  {
    id: 'sangeet-dance',
    event: 'sangeet',
    text: 'Sangeet is a performance night: prioritise movement-friendly silhouettes, sequins and shimmer, jewel tones like royal blue and magenta, and secure footwear for dancing.'
  },
  {
    id: 'engagement-refined',
    event: 'engagement',
    text: 'Engagement and ring-ceremony looks read refined and photogenic: rose gold, wine and pastel tones, embellished gowns or classic bandhgalas, and delicate rather than heavy jewellery.'
  },
  {
    id: 'wedding-formality',
    event: 'wedding',
    text: 'Wedding-day looks can carry richer fabrics, zari, red, wine, ivory, gold, structured drapes, sherwanis, and heirloom-inspired jewellery.'
  },
  {
    id: 'reception-evening',
    event: 'reception',
    text: 'Reception styling leans evening-ready: metallic accents, structured gowns, sleek bandhgalas, polished footwear, and camera-friendly contrast.'
  },
  {
    id: 'prewedding-camera',
    event: 'prewedding',
    text: 'Pre-wedding shoots benefit from flow, soft colors, coordinated but not identical palettes, and silhouettes that photograph well outdoors.'
  }
];
