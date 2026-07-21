import { realProducts } from '@/lib/data/catalog';
import type { PersonType, PlannerPreferences, Product, StoreName, WeddingEvent } from '@/lib/types';

type EventConfig = {
  label: string;
  heroColor: string;
  colors: string[];
  themes: string[];
  categories: Record<PersonType, string[]>;
};

type PersonConfig = {
  label: string;
  defaultAgeRange: string;
  images: string[];
};

const priceFilterParam = (min?: number, max?: number) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return '';

  const priceMin = Math.max(0, Math.floor(min || 0));
  const priceMax = Math.max(priceMin, Math.ceil(max || 0));

  return `?rf=${encodeURIComponent(`Price:${priceMin}.0_${priceMax}.0_${priceMin}.0 TO ${priceMax}.0`)}`;
};

const storeUrls: Record<StoreName, (query: string, budgetMin?: number, budgetMax?: number) => string> = {
  Myntra: (query, budgetMin, budgetMax) => `https://www.myntra.com/${encodeURIComponent(query)}${priceFilterParam(budgetMin, budgetMax)}`,
  AJIO: query => `https://www.ajio.com/search/?text=${encodeURIComponent(query)}`,
  Flipkart: query => `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`
};

export const eventConfigs: Record<WeddingEvent, EventConfig> = {
  haldi: {
    label: 'Haldi',
    heroColor: 'Marigold',
    colors: ['yellow', 'ivory', 'gold', 'pastel'],
    themes: ['sunlit', 'playful', 'floral', 'daytime'],
    categories: {
      women: ['embroidered kurta set', 'mirror-work sharara', 'drape saree', 'gota dupatta'],
      men: ['linen kurta set', 'chikankari kurta', 'Nehru jacket', 'kolhapuri sandals'],
      girl: ['embroidered lehenga', 'printed kurta set', 'floral hairband', 'tiny jutti flats'],
      boy: ['cotton kurta set', 'bandhgala jacket', 'mini mojari', 'printed waistcoat']
    }
  },
  mehndi: {
    label: 'Mehndi',
    heroColor: 'Emerald',
    colors: ['green', 'pistachio', 'gold', 'floral'],
    themes: ['garden', 'mirror-work', 'dance-ready', 'fresh'],
    categories: {
      women: ['mirror-work lehenga', 'pistachio saree', 'cape kurta set', 'floral potli'],
      men: ['sage kurta set', 'green bandhgala', 'printed stole', 'leaf pocket square'],
      girl: ['mint lehenga', 'leaf print kurta', 'floral clip set', 'green jutti'],
      boy: ['sage kurta', 'emerald waistcoat', 'brown mojari', 'printed stole']
    }
  },
  sangeet: {
    label: 'Sangeet',
    heroColor: 'Sapphire',
    colors: ['royal blue', 'magenta', 'silver', 'wine'],
    themes: ['dance-ready', 'glam', 'shimmer', 'evening'],
    categories: {
      women: ['sequin lehenga', 'flared sharara set', 'draped gown saree', 'statement earrings'],
      men: ['textured indo-western', 'shimmer bandhgala', 'printed kurta jacket', 'suede loafers'],
      girl: ['twirl lehenga', 'sequin party frock', 'sparkle hair clip', 'comfort jutti'],
      boy: ['indo-western set', 'shimmer waistcoat', 'dress loafers', 'printed kurta']
    }
  },
  engagement: {
    label: 'Engagement',
    heroColor: 'Rose Gold',
    colors: ['rose gold', 'wine', 'ivory', 'dusty pink'],
    themes: ['elegant', 'refined', 'ring-ceremony', 'polished'],
    categories: {
      women: ['embellished gown', 'ring-ceremony saree', 'pastel lehenga', 'delicate drops'],
      men: ['classic bandhgala', 'wine tuxedo jacket', 'silk kurta set', 'patent loafers'],
      girl: ['party gown', 'pastel lehenga', 'pearl hairband', 'ballet flats'],
      boy: ['formal blazer set', 'bow tie shirt', 'dress shoes', 'smart waistcoat']
    }
  },
  wedding: {
    label: 'Wedding',
    heroColor: 'Crimson',
    colors: ['red', 'wine', 'ivory', 'gold'],
    themes: ['grand', 'heirloom', 'zari', 'ceremonial'],
    categories: {
      women: ['bridal lehenga', 'embroidered saree', 'temple jewellery', 'zari dupatta'],
      men: ['embroidered sherwani', 'velvet bandhgala', 'jacquard stole', 'safa brooch'],
      girl: ['red lehenga', 'pearl hair accessory', 'gold jutti', 'velvet potli'],
      boy: ['mini sherwani', 'velvet bandhgala', 'embroidered mojari', 'ivory churidar']
    }
  },
  reception: {
    label: 'Reception',
    heroColor: 'Champagne',
    colors: ['champagne', 'black', 'silver', 'rose gold'],
    themes: ['polished', 'evening', 'sleek', 'camera-ready'],
    categories: {
      women: ['sequin saree', 'structured gown', 'crystal earrings', 'metallic heels'],
      men: ['tuxedo bandhgala', 'black kurta jacket', 'patent loafers', 'dress watch'],
      girl: ['party gown', 'sparkle hair bow', 'soft ballet flats', 'mini sling bag'],
      boy: ['formal jacket set', 'bow tie shirt', 'dress loafers', 'smart waistcoat']
    }
  },
  prewedding: {
    label: 'Pre-wedding',
    heroColor: 'Blush',
    colors: ['blush', 'powder blue', 'cream', 'sage'],
    themes: ['romantic', 'editorial', 'flowy', 'photogenic'],
    categories: {
      women: ['flowy anarkali', 'ruffle saree', 'champagne co-ord', 'pearl drops'],
      men: ['linen kurta set', 'powder blue shirt', 'cream Nehru jacket', 'suede loafers'],
      girl: ['blush party frock', 'bow hair clips', 'soft loafers', 'photo prop bag'],
      boy: ['blue waistcoat set', 'cream jacket', 'soft loafers', 'linen kurta']
    }
  }
};

export const personConfigs: Record<PersonType, PersonConfig> = {
  women: {
    label: 'Women',
    defaultAgeRange: '18-60',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff6b0c?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1610030469668-8e8b1ae9a7e9?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1583391733981-849840bf9376?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=520&q=80'
    ]
  },
  men: {
    label: 'Men',
    defaultAgeRange: '18-60',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1609261509940-0c8c62d8e46e?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=520&q=80',
      '/assets/hero-3d-man.png'
    ]
  },
  girl: {
    label: 'Girl',
    defaultAgeRange: '3-16',
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=520&q=80',
      '/assets/hero-3d-child.png',
      '/assets/hero-3d-boy.png'
    ]
  },
  boy: {
    label: 'Boy',
    defaultAgeRange: '3-16',
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=520&q=80',
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=520&q=80',
      '/assets/hero-3d-boy.png',
      '/assets/hero-3d-child.png'
    ]
  }
};

const stores: StoreName[] = ['Myntra', 'Flipkart', 'AJIO'];
const events = Object.keys(eventConfigs) as WeddingEvent[];
const people = Object.keys(personConfigs) as PersonType[];

const discoveryBrands: Record<StoreName, string[]> = {
  Myntra: ['Anouk', 'House of Pataudi', 'Sangria', 'Indo Era', 'Vishudh', 'Kisah'],
  Flipkart: ['Divastri', 'Majestic Man', 'Aurelia', 'Ethzy', 'Fashion Dream', 'Hangup'],
  AJIO: ['AVAASA', 'Netplay', 'Fig', 'Azorte', 'DNMX', 'Performax']
};

const storeHome: Record<StoreName, string> = {
  Myntra: 'https://www.myntra.com/',
  Flipkart: 'https://www.flipkart.com/',
  AJIO: 'https://www.ajio.com/'
};

/**
 * A deterministic discovery catalog used to exercise every styling journey.
 *
 * These are search-ready recommendations, not claims about live retailer SKUs:
 * they intentionally omit `productUrl`, and `searchProductIndex` replaces the
 * placeholder URL with a retailer search for the selected color/category/event.
 * Live MCP/feed adapters can replace these records without changing the UI.
 */
export const developmentProducts: Product[] = events.flatMap((event, eventIndex) =>
  people.flatMap((personType, personIndex) =>
    stores.flatMap((store, storeIndex) =>
      Array.from({ length: 12 }, (_, itemIndex): Product => {
        const eventConfig = eventConfigs[event];
        const personConfig = personConfigs[personType];
        const category = eventConfig.categories[personType][itemIndex % eventConfig.categories[personType].length];
        const color = eventConfig.colors[itemIndex % eventConfig.colors.length];
        const brand = discoveryBrands[store][itemIndex % discoveryBrands[store].length];
        const imageCount = personType === 'boy' || personType === 'girl' ? 2 : 3;
        const price = 699 + eventIndex * 275 + personIndex * 180 + storeIndex * 125 + itemIndex * 310;
        const sequence = String(itemIndex + 1).padStart(2, '0');

        return {
          id: `discovery-${store.toLowerCase()}-${event}-${personType}-${sequence}`,
          name: `${brand} ${eventConfig.label} ${category}`,
          event,
          personType,
          ageRange: personConfig.defaultAgeRange,
          price,
          store,
          category,
          colors: [color, eventConfig.colors[(itemIndex + 1) % eventConfig.colors.length]],
          themeTags: [...eventConfig.themes, eventConfig.heroColor.toLowerCase()],
          image: personConfig.images[itemIndex % imageCount],
          searchUrl: storeHome[store],
          rating: Number((3.9 + (itemIndex % 9) * 0.1).toFixed(1)),
          reviewCount: 80 + eventIndex * 37 + personIndex * 29 + storeIndex * 41 + itemIndex * 53,
          inventoryScore: 72 + ((eventIndex + personIndex + storeIndex + itemIndex) % 25),
          fitNotes: `${personConfig.label} ${eventConfig.label} discovery option; confirm size, price, and availability on ${store}.`
        };
      })
    )
  )
);

// Keep verified product pages first, then add balanced retailer discovery inventory.
export const productIndex: Product[] = [...realProducts, ...developmentProducts];

function parseAgeRange(range: string): [number, number] {
  const plus = range.match(/^\s*(\d+)\s*\+\s*$/);
  if (plus) return [Number(plus[1]), 200];

  const span = range.match(/(\d+)\s*(?:-|to)\s*(\d+)/);
  if (span) return [Number(span[1]), Number(span[2])];

  const single = range.match(/(\d+)/);
  if (single) return [Number(single[1]), Number(single[1])];

  return [0, 200];
}

function ageRangesOverlap(a: string, b: string) {
  const [aMin, aMax] = parseAgeRange(a);
  const [bMin, bMax] = parseAgeRange(b);
  return aMin <= bMax && bMin <= aMax;
}

function productSearchQuery(product: Product) {
  return `${product.colors[0]} ${product.category} ${personConfigs[product.personType].label} ${eventConfigs[product.event].label}`;
}

export function getDefaultPreferences(): Required<PlannerPreferences> {
  return {
    theme: 'royal modern',
    event: 'haldi',
    personType: 'women',
    ageRange: '18-35',
    budgetMin: 0,
    budgetMax: 7000,
    colorPreference: 'yellow'
  };
}

export function searchProductIndex(preferences: PlannerPreferences = {}, query = '') {
  const defaults = getDefaultPreferences();
  const normalized = { ...defaults };

  for (const [key, value] of Object.entries(preferences) as Array<[keyof PlannerPreferences, PlannerPreferences[keyof PlannerPreferences]]>) {
    if (value !== undefined) {
      Object.assign(normalized, { [key]: value });
    }
  }

  // A person selection without an explicit age should use that audience's age
  // range; otherwise the adult default would silently hide Boy/Girl inventory.
  if (preferences.personType && preferences.ageRange === undefined) {
    normalized.ageRange = personConfigs[preferences.personType].defaultAgeRange;
  }

  normalized.colorPreference = normalized.colorPreference.toLowerCase();
  const tokens = new Set(`${query} ${normalized.theme} ${normalized.colorPreference}`.toLowerCase().split(/\W+/).filter(Boolean));

  return productIndex
    .filter(product => {
      const eventMatch = !normalized.event || product.event === normalized.event;
      const personMatch = !normalized.personType || product.personType === normalized.personType;
      // Budget max is the hard limit; min only nudges ranking (below) — a cheaper
      // outfit should never be excluded from results for being under an inferred floor.
      const budgetMatch = product.price <= normalized.budgetMax;
      const ageMatch = !normalized.ageRange || ageRangesOverlap(product.ageRange, normalized.ageRange);
      return eventMatch && personMatch && budgetMatch && ageMatch;
    })
    .map(product => {
      const searchable = [
        product.name,
        product.category,
        product.event,
        product.personType,
        product.store,
        ...product.colors,
        ...product.themeTags
      ].join(' ').toLowerCase();
      const tokenScore = [...tokens].reduce((score, token) => score + (searchable.includes(token) ? 4 : 0), 0);
      const budgetScore = Math.max(0, 20 - Math.abs(product.price - normalized.budgetMax * 0.72) / 350);
      const qualityScore = product.rating * 6 + product.inventoryScore / 6;

      return {
        product,
        score: Math.round(tokenScore + budgetScore + qualityScore)
      };
    })
    .sort((a, b) => b.score - a.score)
    .map(item => ({
      ...item.product,
      searchUrl: storeUrls[item.product.store](productSearchQuery(item.product), normalized.budgetMin, normalized.budgetMax)
    }));
}
