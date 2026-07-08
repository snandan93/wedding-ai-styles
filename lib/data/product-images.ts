import type { Product } from '@/lib/types';

const fallbackImages = {
  apparel: '/assets/hero-3d-editorial.png',
  menswear: '/assets/hero-3d-man.png',
  footwear: '/assets/hero-3d-editorial.png',
  jewelry: '/assets/hero-3d-editorial.png',
  bag: '/assets/hero-3d-editorial.png',
  fabric: '/assets/hero-3d-editorial.png',
  kids: '/assets/hero-3d-child.png'
};

function fallbackImage(product: Product) {
  const category = product.category.toLowerCase();

  if (/sandal|heel|mojari|jutti|loafer|flat/.test(category)) return fallbackImages.footwear;
  if (/jhumka|bangle|jewellery|jewelry|brooch|watch|hair|clip|pin|earring|bracelet|tikka/.test(category)) return fallbackImages.jewelry;
  if (/potli|bag|sling/.test(category)) return fallbackImages.bag;
  if (/dupatta|stole|pocket square/.test(category)) return fallbackImages.fabric;
  if (product.personType === 'girl' || product.personType === 'boy') return fallbackImages.kids;
  if (product.personType === 'men') return fallbackImages.menswear;

  return fallbackImages.apparel;
}

export async function hydrateProductImages<T extends Product>(products: T[]): Promise<T[]> {
  return products.map(product => ({
    ...product,
    image: product.image || fallbackImage(product)
  }));
}
