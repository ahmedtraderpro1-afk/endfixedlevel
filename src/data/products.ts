export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  currency: 'USD';
  mainImage: string;
  additionalImages?: string[];
  shortDescription: string;
  fullDescription: string;
  materials: string[];
  inStock: boolean;
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'noor-multicolor-choker',
    slug: 'noor-multicolor-choker',
    title: 'Noor Multicolor Choker',
    category: 'Chokers',
    price: 450,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/06-ruby-choker-set.jpg',
      '/assets/jewelry/uploads/09-royal-ruby-bridal-set.jpg',
    ],
    shortDescription: 'Regal multicolored gemstone choker handcrafted with rubies, emerald accents, and lustrous freshwater pearls.',
    fullDescription: 'The Noor Multicolor Choker is an exquisite masterpiece of bridal artistry. Designed with hand-selected ruby droplets, lustrous micro-pearls, and antique gold filigree, this piece captures the royal heritage of Mughal courts with contemporary refinement. Each gemstone is carefully set by master artisans to ensure exceptional brilliance and comfort against the collarbone.',
    materials: [
      '22k Antique Gold Micron Finish',
      'Hand-Cut Hydro Rubies & Emerald Cabochons',
      'AAA Grade Natural Freshwater Seed Pearls',
      'Hand-Woven Adjustable Zari Dori Backing',
      'Artisanal Hypoallergenic Brass Alloy Core',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'mehr-emerald-pearl-choker',
    slug: 'mehr-emerald-pearl-choker',
    title: 'Mehr Emerald Pearl Choker',
    category: 'Chokers',
    price: 520,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
      '/assets/jewelry/uploads/08-emerald-opulent-set.jpg',
    ],
    shortDescription: 'Mesmerizing deep green emerald choker crowned with layered cluster pearls and antique gold bezel setting.',
    fullDescription: 'Echoing the grandeur of royal dynasties, the Mehr Emerald Pearl Choker combines deep emerald hues with delicate seed pearls. Hand-carved stone settings and intricate lattice backing make it exceptionally comfortable while delivering maximum regal drama for evening soirees and grand wedding celebrations.',
    materials: [
      '22k Antique Matte Gold Bath',
      'Faceted Colombian Emerald-Tone Hydro Quartz',
      'Tiered South Sea Cultured Drop Pearls',
      'Handcrafted Filigree Clasp with Adjustable Cord',
      'Lead and Nickel Free Fine Alloy',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'ayla-pearl-necklace',
    slug: 'ayla-pearl-necklace',
    title: 'Ayla Pearl Necklace',
    category: 'Necklaces',
    price: 420,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/01-pearl-emerald-set.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/07-multistrand-pearl-set.jpg',
      '/assets/jewelry/uploads/10-noor-pearl-pendant-set.jpg',
    ],
    shortDescription: 'Timeless multi-strand graduated pearl necklace with emerald center medallion and cascading droplets.',
    fullDescription: 'The Ayla Pearl Necklace embodies quintessential sophistication. Cascading rows of luminous ivory pearls lead to an intricately sculpted emerald and polki medallion, creating an ethereal contour for wedding banquets, receptions, and black-tie gala evenings.',
    materials: [
      'Sterling Silver Base with 22k Gold Dipping',
      'AAA High-Lustre Graduated Ivory Pearls',
      'Hand-Carved Emerald Hydro Quartz Medallion',
      'Reinforced Multi-Ply Silk Thread Weaving',
      'Signature Nadia Crest Security Clasp',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'meher-heritage-set',
    slug: 'meher-heritage-set',
    title: 'Meher Heritage Set',
    category: 'Bridal Sets',
    price: 560,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/09-royal-ruby-bridal-set.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
      '/assets/jewelry/uploads/06-ruby-choker-set.jpg',
    ],
    shortDescription: 'Opulent royal ruby bridal set with matching statement jhumkas and intricate heritage embellishments.',
    fullDescription: 'Designed for the discerning bride who values timeless legacy. The Meher Heritage Set features a grandiose bib collar inlaid with hand-cut cabochon rubies and suspended teardrop pearls, accompanied by matching statement earrings for a cohesive ceremonial presence.',
    materials: [
      'Solid Brass with 24k Matte Gold Bath',
      'Cabochon Cut Ruby & Polki Accents',
      'Basra-Style Suspended Drop Pearls',
      'Includes Matching Heritage Jhumka Earrings',
      'Presented in Custom Velvet Presentation Chest',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'gul-statement-set',
    slug: 'gul-statement-set',
    title: 'Gul Statement Set',
    category: 'Bridal Sets',
    price: 550,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/08-emerald-opulent-set.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
      '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
    ],
    shortDescription: 'Lavish architectural emerald floral set with sculpted petals, micro-kundan, and chandelier drops.',
    fullDescription: 'The Gul Statement Set blooms with artisanal splendour. Each motif is carefully hand-set with micro-faceted green stones and framed by champagne kundan petals, evoking the manicured royal gardens of Kashmir.',
    materials: [
      'Hand-Carved Stone Petals with Kundan Framing',
      'Emerald Drop Beads and Basra Pearl Clusters',
      '22k Champagne Gold Gilded Finish',
      'Includes Matching Chandelier Earrings',
      'Ergonomic Flexible Collar Articulation',
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'sahar-statement-earrings',
    slug: 'sahar-statement-earrings',
    title: 'Sahar Statement Earrings',
    category: 'Earrings',
    price: 240,
    currency: 'USD',
    mainImage: '/assets/jewelry/uploads/04-heritage-earrings.jpg',
    additionalImages: [
      '/assets/jewelry/uploads/02-emerald-jhumka-earrings.jpg',
    ],
    shortDescription: 'Dramatic artisanal heritage earrings with delicate filigree arches and hanging pearl clusters.',
    fullDescription: 'The Sahar Statement Earrings bring timeless royalty to any look. Sculpted with delicate lattice archways and balanced weight distribution, these earrings catch every ray of ambient light with their swinging pearl tassels and emerald crown.',
    materials: [
      'Sterling Silver Base with 22k Gold Vermeil',
      'Natural Rice Pearls and Emerald Hydro Droplets',
      'Lightweight Hollow-Back Construction for Comfort',
      'Handcrafted Push-Back Fastening with Support Discs',
    ],
    inStock: true,
    featured: true,
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
