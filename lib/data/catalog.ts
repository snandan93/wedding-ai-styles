import type { PersonType, Product, WeddingEvent } from '@/lib/types';

/**
 * Curated, hand-picked catalog of REAL products.
 *
 * Every `productUrl` and `image` in this file was fetched from live Flipkart
 * listings and verified to resolve (HTTP 200) on 2026-07-05. Names and prices
 * are real as of that date. `rating` / `reviewCount` / `inventoryScore` are
 * indicative quality signals (not scraped) — swap for real review-API data later.
 *
 * All items are Flipkart today because Myntra/AJIO block server-side fetches;
 * they can be added the same way via a browser-based fetch path. To grow the
 * catalog, add rows here — the app reads this array directly.
 */

type RawProduct = {
  id: string;
  name: string;
  event: WeddingEvent;
  personType: PersonType;
  price: number;
  colors: string[];
  category: string;
  productUrl: string;
  image: string;
};

const eventThemes: Record<WeddingEvent, string[]> = {
  haldi: ['sunlit', 'floral'],
  mehndi: ['garden', 'dance-ready'],
  sangeet: ['dance-ready', 'shimmer'],
  engagement: ['elegant', 'refined'],
  wedding: ['grand', 'heirloom'],
  reception: ['polished', 'evening'],
  prewedding: ['romantic', 'flowy']
};

const personLabel: Record<PersonType, string> = {
  women: 'Women',
  men: 'Men',
  girl: 'Girl',
  boy: 'Boy'
};

const eventLabel: Record<WeddingEvent, string> = {
  haldi: 'Haldi',
  mehndi: 'Mehndi',
  sangeet: 'Sangeet',
  engagement: 'Engagement',
  wedding: 'Wedding',
  reception: 'Reception',
  prewedding: 'Pre-wedding'
};

const rawCatalog: RawProduct[] = [
  // ---- Wedding · Men (sherwani) ----
  { id: 'fk-w-men-1', name: 'XEPON Self Design Sherwani', event: 'wedding', personType: 'men', price: 1423, colors: ['cream', 'gold'], category: 'sherwani', productUrl: 'https://www.flipkart.com/xepon-self-design-sherwani/p/itm3e52e1c1e1d10', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sherwani/1/9/x/s-hh-9-xepon-original-imahm5egbrn4yfpb.jpeg' },
  { id: 'fk-w-men-2', name: 'Ethzy Printed Sherwani', event: 'wedding', personType: 'men', price: 1691, colors: ['maroon', 'gold'], category: 'sherwani', productUrl: 'https://www.flipkart.com/ethzy-printed-sherwani/p/itmcd624bb3f11ca', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sherwani/1/a/f/m-ss-7-xepon-original-imahm559fj5gz4ce.jpeg' },
  { id: 'fk-w-men-3', name: 'REBELIKA Striped Sherwani Kurta Set', event: 'wedding', personType: 'men', price: 1588, colors: ['wine', 'ivory'], category: 'sherwani', productUrl: 'https://www.flipkart.com/rebelika-ai-pritam-striped-sherwani/p/itm30313bc13274d', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sherwani/p/9/t/l-sherwani-kurta-punjabi-wedding-premium-8-rebelika-original-imahgqf4fgjsp2xz.jpeg' },
  { id: 'fk-w-men-4', name: 'Raj Fashion Sherwani Pyjama Jacket Set', event: 'wedding', personType: 'men', price: 4500, colors: ['maroon', 'gold'], category: 'sherwani set', productUrl: 'https://www.flipkart.com/raj-fashion-men-sherwani-pyjama-ethnic-jacket-set/p/itm3ff27e7d49bee', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/l/s/p/42-2indw07-raj-fashion-original-imahzpsujmscf9gz.jpeg' },

  // ---- Wedding · Women (bridal lehenga) ----
  { id: 'fk-w-wom-1', name: 'Cute Fellow Embroidered Semi-Stitched Lehenga Choli', event: 'wedding', personType: 'women', price: 420, colors: ['red', 'gold'], category: 'bridal lehenga', productUrl: 'https://www.flipkart.com/cute-fellow-embroidered-semi-stitched-lehenga-choli/p/itm565f282d41b67', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-lehenga-choli/x/l/h/free-3-4-sleeve-semi-stitched-0-new-design-lehenga-choli-and-resized-original-imahdbfnn5mkdjr5.jpeg' },
  { id: 'fk-w-wom-2', name: 'Divastri Embroidered Semi-Stitched Lehenga Choli', event: 'wedding', personType: 'women', price: 423, colors: ['maroon', 'gold'], category: 'bridal lehenga', productUrl: 'https://www.flipkart.com/divastri-embroidered-semi-stitched-lehenga-choli/p/itmcf4b6e4fb772f', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-lehenga-choli/b/f/v/free-half-sleeve-semi-stitched-44-mehendi-dress-for-women-bridal-resized-original-imahdh857gkfhzrq.jpeg' },
  { id: 'fk-w-wom-3', name: 'Udbhav Export Heavy Party-Wear Lehenga', event: 'wedding', personType: 'women', price: 450, colors: ['red', 'wine'], category: 'bridal lehenga', productUrl: 'https://www.flipkart.com/udbhav-export-embroidered-semi-stitched-lehenga-choli/p/itmd548b84780b2a', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/t/m/r/free-short-sleeve-heavy-party-wear-lehenga-for-wedding-resized-original-imahexczfbwcvhkp.jpeg' },
  { id: 'fk-w-wom-4', name: 'RUKHA FAB Zari Flare Lehenga & Crop Top', event: 'wedding', personType: 'women', price: 1463, colors: ['pink', 'gold'], category: 'bridal lehenga', productUrl: 'https://www.flipkart.com/rukha-fab-embroidered-semi-stitched-lehenga-crop-top/p/itm8eb8bbcc112f8', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/7/f/2/free-half-sleeve-pink-zari-flare-lehenga01-rukha-fab-original-imahnzqv29hngk6t.jpeg' },

  // ---- Haldi · Women (yellow saree) ----
  { id: 'fk-h-wom-1', name: 'Ruhabs Printed Kalamkari Linen Saree', event: 'haldi', personType: 'women', price: 448, colors: ['yellow', 'mustard'], category: 'saree', productUrl: 'https://www.flipkart.com/ruhabs-printed-kalamkari-linen-saree/p/itm31f2b328c21ce', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/v/f/e/free-luxe-mustard-ruhabs-unstitched-original-imahzxdbktwfnndd.jpeg?q=70' },
  { id: 'fk-h-wom-2', name: 'ROSYQUEEN Embroidered Banarasi Georgette Saree', event: 'haldi', personType: 'women', price: 591, colors: ['yellow', 'gold'], category: 'saree', productUrl: 'https://www.flipkart.com/rosyqueen-self-design-embroidered-banarasi-georgette-saree/p/itm411ad95a7bb6f', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-sari/r/6/v/free-rf-bhalo-1-yellow-rhg-fashion-unstitched-resized-original-imahg4ukgmcg4fkr.jpeg?q=70' },
  { id: 'fk-h-wom-3', name: 'HouseOfCommon Embellished Silk-Blend Saree', event: 'haldi', personType: 'women', price: 539, colors: ['mustard', 'gold'], category: 'saree', productUrl: 'https://www.flipkart.com/houseofcommon-embellished-bollywood-silk-blend-saree/p/itma53f63d2952ea', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/q/2/n/free-superstar-mustard-jo-vraggi-unstitched-original-imahkvn4vrgetmcc.jpeg?q=70' },
  { id: 'fk-h-wom-4', name: 'PinkEVE Floral Print Chiffon Saree', event: 'haldi', personType: 'women', price: 403, colors: ['yellow', 'floral'], category: 'saree', productUrl: 'https://www.flipkart.com/pinkeve-floral-print-dyed-polka-print-bollywood-chiffon-saree/p/itma0a80083c7cd7', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/8/b/8/free-fk-pe-ai1-37956-pinkeve-unstitched-original-imahzkdftfczmthg.jpeg?q=70' },

  // ---- Mehndi · Women (green lehenga) ----
  { id: 'fk-m-wom-1', name: 'Cute Fellow Designer Semi-Stitched Lehenga Choli', event: 'mehndi', personType: 'women', price: 381, colors: ['green', 'gold'], category: 'lehenga', productUrl: 'https://www.flipkart.com/cute-fellow-embroidered-semi-stitched-lehenga-choli/p/itmb36f1cf97ea55', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-lehenga-choli/8/y/h/free-3-4-sleeve-semi-stitched-0-new-design-lehenga-choli-for-resized-original-imahejz5qnha3cqz.jpeg' },
  { id: 'fk-m-wom-2', name: 'SWAMI STUDIO Self-Design Lehenga Choli', event: 'mehndi', personType: 'women', price: 616, colors: ['green', 'pistachio'], category: 'lehenga', productUrl: 'https://www.flipkart.com/swami-studio-self-design-semi-stitched-lehenga-choli/p/itmf4cf72f0cbbb3', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/8/r/l/free-half-sleeve-naklhg-swami-studio-original-imahhrnj8ghvzfza.jpeg' },
  { id: 'fk-m-wom-3', name: 'Udbhav Export Designer Lehenga', event: 'mehndi', personType: 'women', price: 740, colors: ['green', 'gold'], category: 'lehenga', productUrl: 'https://www.flipkart.com/udbhav-export-embroidered-semi-stitched-lehenga-choli/p/itm1f4e0046ac813', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/3/4/r/free-sleeveless-new-designer-lehenga-2023-udbhav-export-resized-original-imahfz8kbpzye5gm.jpeg' },
  { id: 'fk-m-wom-4', name: 'WARTHY ENTERPRISE Mehndi Lehenga Choli', event: 'mehndi', personType: 'women', price: 868, colors: ['green', 'floral'], category: 'lehenga', productUrl: 'https://www.flipkart.com/warthy-enterprise-embroidered-semi-stitched-lehenga-choli/p/itm5b4636d7a783e', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/lehenga-choli/n/e/q/free-3-4-sleeve-d-1213-mehndi-warthy-enterprise-original-imahzrmfercr8w5k.jpeg' },

  // ---- Sangeet · Women (flare dress) ----
  { id: 'fk-s-wom-1', name: 'HIVA TRENDZ Fit & Flare Dress', event: 'sangeet', personType: 'women', price: 299, colors: ['royal blue'], category: 'party dress', productUrl: 'https://www.flipkart.com/hiva-trendz-women-fit-flare-blue-knee-length-dress/p/itmbced95f68d0dc', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/e/z/2/l-wd5011-blue-hiva-trendz-resized-original-imah3nu7arh3e4hg.jpeg?q=70' },
  { id: 'fk-s-wom-2', name: 'Sangria Fit & Flare Dress', event: 'sangeet', personType: 'women', price: 668, colors: ['royal blue'], category: 'party dress', productUrl: 'https://www.flipkart.com/sangria-women-fit-flare-blue-above-knee-mid-thigh-length-dress/p/itmf82e0c02a9b9e', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/6/m/y/-original-imahfkscg2zag9eu.jpeg?q=70' },
  { id: 'fk-s-wom-3', name: 'NG Fashion Fit & Flare Dress', event: 'sangeet', personType: 'women', price: 681, colors: ['magenta', 'white'], category: 'party dress', productUrl: 'https://www.flipkart.com/ng-fashion-women-fit-flare-pink-white-midi-calf-length-dress/p/itm68975b1944833', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/dress/6/8/c/l-ng-1091-pink-white-ng-fashion-resized-original-imahfrdgjkgczuvv.jpeg?q=70' },

  // ---- Engagement · Women (anarkali gown) ----
  { id: 'fk-e-wom-1', name: 'BHOOLKU Embroidered Georgette Anarkali Gown', event: 'engagement', personType: 'women', price: 650, colors: ['wine', 'gold'], category: 'anarkali gown', productUrl: 'https://www.flipkart.com/bhoolku-anarkali-gown/p/itmadbe267e8bbb0', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/5/n/o/na-m-full-sleeve-stitched-maskalli-bhoolku-na-resized-original-imahm29dyzeu35gc.jpeg' },
  { id: 'fk-e-wom-2', name: 'MALAVIYA FASHION Art-Silk Anarkali Gown', event: 'engagement', personType: 'women', price: 1170, colors: ['ivory', 'rose gold'], category: 'anarkali gown', productUrl: 'https://www.flipkart.com/malaviya-fashion-anarkali-gown/p/itm38721e4173847', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/3/h/i/216-l-full-sleeve-stitched-b2-parevdi-green-l-malaviya-fashion-original-imahzd3zzqsxbdty.jpeg' },

  // ---- Reception · Women (gown) ----
  { id: 'fk-r-wom-1', name: 'ABHIETHNICS A-line Cotton Gown', event: 'reception', personType: 'women', price: 515, colors: ['ivory', 'champagne'], category: 'gown', productUrl: 'https://www.flipkart.com/abhiethnics-flared-a-line-gown/p/itm8037c716ac777', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/0/u/q/na-m-short-sleeve-stitched-ae-white-gown-s-abhiethnics-na-original-imahnrg4nmvpkadz.jpeg?q=70' },
  { id: 'fk-r-wom-2', name: 'Fashionsufi Cotton-Blend Anarkali Gown', event: 'reception', personType: 'women', price: 574, colors: ['black', 'silver'], category: 'gown', productUrl: 'https://www.flipkart.com/fashionsufi-anarkali-gown/p/itm062c7fde77365', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/8/j/v/na-xl-3-4-sleeve-stitched-001-fashionsufi-na-resized-original-imahh8kgbvfx9z7r.jpeg?q=70' },
  { id: 'fk-r-wom-3', name: 'WELLCRAFT Georgette Anarkali Gown', event: 'reception', personType: 'women', price: 808, colors: ['rose gold', 'champagne'], category: 'gown', productUrl: 'https://www.flipkart.com/wellcraft-anarkali-gown/p/itm9c1c7b6bc7aed', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/r/a/t/0-m-full-sleeve-stitched-mox01-wellcraft-0-original-imahzgrc8ptenxpy.jpeg?q=70' },
  { id: 'fk-r-wom-4', name: 'Yuwan Floral A-line Gown', event: 'reception', personType: 'women', price: 428, colors: ['champagne', 'floral'], category: 'gown', productUrl: 'https://www.flipkart.com/yuwan-flared-a-line-gown/p/itm599e5e545576e', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/k/n/z/na-xxl-short-sleeve-stitched-gown-5-yuwan-na-original-imahh2gbqsgabnnr.jpeg?q=70' },

  // ---- Pre-wedding · Women (pastel gown) ----
  { id: 'fk-p-wom-1', name: 'Lino Royal Lavender Anarkali Gown', event: 'prewedding', personType: 'women', price: 428, colors: ['blush', 'cream'], category: 'flowy gown', productUrl: 'https://www.flipkart.com/lino-royal-anarkali-gown/p/itm6782abff22887', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/n/p/e/na-s-full-sleeve-stitched-202-lavender-kajal-2-kayraenterprise-resized-original-imahgkh5sxnfqfpb.jpeg?q=70' },
  { id: 'fk-p-wom-2', name: 'KV Fashion Flowy A-line Gown', event: 'prewedding', personType: 'women', price: 756, colors: ['cream', 'sage'], category: 'flowy gown', productUrl: 'https://www.flipkart.com/kv-fashion-flared-a-line-gown/p/itm5696049a0449b', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/v/t/a/na-free-full-sleeve-semi-stitched-cross-gown-a1-aika-na-original-imahzrn7mp8gmggy.jpeg?q=70' },
  { id: 'fk-p-wom-3', name: 'DEETIBOUTIQUE Blush Anarkali Gown', event: 'prewedding', personType: 'women', price: 1709, colors: ['blush', 'powder blue'], category: 'flowy gown', productUrl: 'https://www.flipkart.com/deetiboutique-anarkali-gown/p/itmb247377b8b049', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/gown/e/g/a/na-3xl-full-sleeve-stitched-3-nsr-pink-deetiboutique-na-original-imahzrwdhjqhqmhf.jpeg?q=70' },

  // ---- Haldi · Men (kurta set) ----
  { id: 'fk-h-men-1', name: 'DARKCHILL Cotton-Blend Kurta Pyjama Set', event: 'haldi', personType: 'men', price: 428, colors: ['yellow', 'ivory'], category: 'kurta set', productUrl: 'https://www.flipkart.com/darkchill-men-kurta-pyjama-set/p/itmcd19cf86f1475', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/u/g/m/3xl-01-kurta-set-darkchill-resized-original-imahhphgtw4pdg73.jpeg' },
  { id: 'fk-h-men-2', name: 'fabzy Leaf-Printed Kurta Pyjama Set', event: 'haldi', personType: 'men', price: 448, colors: ['green', 'ivory'], category: 'kurta set', productUrl: 'https://www.flipkart.com/fabzy-men-kurta-pyjama-set/p/itm0feff94002d35', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/9/y/q/l-mens-leaves-printed-shaded-long-kurta-sets-fabzy-original-imahznhvqmzyz9qm.jpeg' },
  { id: 'fk-h-men-3', name: 'balajiis Cotton-Rayon Kurta Pyjama Set', event: 'haldi', personType: 'men', price: 425, colors: ['cream', 'gold'], category: 'kurta set', productUrl: 'https://www.flipkart.com/balajiis-men-kurta-pyjama-set/p/itm072be5184d8b4', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/e/8/l/s-680-balajiis-original-imahkmsegu7hsgss.jpeg' },
  { id: 'fk-h-men-4', name: 'Tibra Collection Kurta Pyjama Set', event: 'haldi', personType: 'men', price: 364, colors: ['yellow', 'gold'], category: 'kurta set', productUrl: 'https://www.flipkart.com/tibra-collection-men-kurta-pyjama-set/p/itmf829dcb27f31f', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/5/v/h/xxl-05-tibra-collection-original-imahkycu9q8fqvpb.jpeg' },

  // ---- Wedding · Girl (kids lehenga) ----
  { id: 'fk-g-girl-1', name: 'Gajra Girls Embroidered Lehenga Choli Set (5-6y)', event: 'wedding', personType: 'girl', price: 288, colors: ['red', 'gold'], category: 'kids lehenga', productUrl: 'https://www.flipkart.com/fashion-prime-girls-lehenga-choli-ethnic-wear-embroidered-lehenga-dupatta-set/p/itm375591779ffc8?pid=KLCG62X4JG3D63FZ', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-lehenga-choli/y/m/z/5-6-years-gajra-the-fashion-prime-original-imah3gapsztnptaz.jpeg?q=70' },
  { id: 'fk-g-girl-2', name: 'Gajra Girls Embroidered Lehenga Choli Set (3-4y)', event: 'wedding', personType: 'girl', price: 287, colors: ['pink', 'gold'], category: 'kids lehenga', productUrl: 'https://www.flipkart.com/fashion-prime-girls-lehenga-choli-ethnic-wear-embroidered-lehenga-dupatta-set/p/itm3a6613f6af661?pid=KLCG62X4C99GPWX3', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-lehenga-choli/s/w/4/3-4-years-gajra-the-fashion-prime-resized-original-imah3gzgtzh48gkf.jpeg?q=70' },
  { id: 'fk-g-girl-3', name: 'Wemation Girls Lehenga Choli Set (12-13y)', event: 'wedding', personType: 'girl', price: 283, colors: ['blue', 'silver'], category: 'kids lehenga', productUrl: 'https://www.flipkart.com/wemation-girls-lehenga-choli-ethnic-wear-embroidered-lehenga-dupatta-set/p/itmcc731bc776ec0?pid=KLCGG29UCJHQJUH5', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-lehenga-choli/r/z/j/12-13-years-lizza-wemation-resized-original-imagg25ejt2t7qr7.jpeg?q=70' },

  // ---- Wedding · Boy (kids ethnic set) ----
  { id: 'fk-b-boy-1', name: 'DigiFashion Boys Festive Kurta Pyjama Set', event: 'wedding', personType: 'boy', price: 217, colors: ['yellow', 'gold'], category: 'kids kurta set', productUrl: 'https://www.flipkart.com/digifashion-boys-festive-party-kurta-pyjama-set/p/itm3e7e4c47acf32', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-ethnic-set/r/i/s/9-10-years-yellowkp-digifashion-resized-original-imah8j5uxesh3gxg.jpeg' },
  { id: 'fk-b-boy-2', name: 'DigiFashion Boys Printed Kurta Pyjama Set', event: 'wedding', personType: 'boy', price: 310, colors: ['pink', 'ivory'], category: 'kids kurta set', productUrl: 'https://www.flipkart.com/digifashion-boys-festive-party-kurta-pyjama-set/p/itm1f2dad600ab5e', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-ethnic-set/f/i/5/8-9-years-pinkprintedkp-digifashion-original-imahb9bvtsy9ygbg.jpeg' },
  { id: 'fk-b-boy-3', name: 'AksGarments Boys Sherwani Set', event: 'wedding', personType: 'boy', price: 519, colors: ['black', 'gold'], category: 'kids sherwani', productUrl: 'https://www.flipkart.com/aksgarments-boys-festive-party-kurta-pyjama-set/p/itm93528c2a35bfc', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/kids-ethnic-set/f/h/a/6-9-months-black-sherwani-sets-aksgarments-resized-original-imahj83p3hestawj.jpeg' },

  // ---- Reception · Men (blazer) ----
  { id: 'fk-r-men-1', name: 'Essentiele Checkered Single-Breasted Blazer', event: 'reception', personType: 'men', price: 3090, colors: ['charcoal', 'silver'], category: 'blazer', productUrl: 'https://www.flipkart.com/essentiele-checkered-single-breasted-party-casual-men-blazer/p/itmbd195806e003a', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/r/x/o/m-esblz0003-m-essentiele-original-imahg2q6zbyazhye.jpeg' },
  { id: 'fk-r-men-2', name: 'ASTHETIC Solid Party Blazer', event: 'reception', personType: 'men', price: 1099, colors: ['gold', 'champagne'], category: 'blazer', productUrl: 'https://www.flipkart.com/asthetic-solid-single-breasted-party-festive-formal-wedding-casual-men-blazer/p/itmed48e8815c605', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/r/a/q/s-bp272-gold-36-asthetic-original-imahzk6mmpxfuvy9.jpeg' },
  { id: 'fk-r-men-3', name: 'INVICTUS Solid Formal Blazer', event: 'reception', personType: 'men', price: 2369, colors: ['black', 'silver'], category: 'blazer', productUrl: 'https://www.flipkart.com/invictus-solid-single-breasted-formal-men-blazer/p/itm60d73d8e0bb97', image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/b/m/t/38-33444441-invictus-original-imahhazdce5gtuzy.jpeg' }
];

function buildProduct(raw: RawProduct, index: number): Product {
  const isKid = raw.personType === 'girl' || raw.personType === 'boy';
  const rating = Number((4.0 + ((index * 3) % 8) / 10).toFixed(1)); // 4.0–4.7, indicative
  const reviewCount = 150 + ((index * 137) % 900);
  const inventoryScore = 80 + ((index * 7) % 16);

  return {
    id: raw.id,
    name: raw.name,
    event: raw.event,
    personType: raw.personType,
    ageRange: isKid ? '3-16' : '18-60',
    price: raw.price,
    store: 'Flipkart',
    category: raw.category,
    colors: raw.colors,
    themeTags: eventThemes[raw.event],
    image: raw.image,
    searchUrl: raw.productUrl,
    productUrl: raw.productUrl,
    rating,
    reviewCount,
    inventoryScore,
    fitNotes: `${personLabel[raw.personType]} ${eventLabel[raw.event].toLowerCase()} pick — ${raw.category}.`
  };
}

export const realProducts: Product[] = rawCatalog.map(buildProduct);
