export interface CategoryInfo {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'bridal-sets',
    name: 'Bridal Sets',
    subtitle: 'View Pieces',
    description: 'Opulent royal bridal suites meticulously handcrafted with heritage craftsmanship, uncut stones, and timeless grace.',
    image: '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
  },
  {
    slug: 'chokers',
    name: 'Chokers',
    subtitle: 'Shop Now',
    description: 'Majestic collar chokers sculpted with lustrous pearls, gemstones, and 22k antique gold finishes.',
    image: '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
  },
  {
    slug: 'necklaces',
    name: 'Necklaces',
    subtitle: 'Luxury Styles',
    description: 'Cascading multi-strand and statement necklaces designed for royal entrances and celebratory evenings.',
    image: '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    subtitle: 'Statement Pairs',
    description: 'Artisanal heritage earrings, jhumkas, and chandeliers crafted to elevate every bridal and festive silhouette.',
    image: '/assets/jewelry/uploads/04-heritage-earrings.jpg',
  },
  {
    slug: 'pearl-collections',
    name: 'Pearl Collections',
    subtitle: 'Classic Beauty',
    description: 'Luminous freshwater seed pearls and cultured baroque suites evoking quintessential bridal poise.',
    image: '/assets/jewelry/uploads/07-multistrand-pearl-set.jpg',
  },
  {
    slug: 'festive-jewelry',
    name: 'Festive Jewelry',
    subtitle: 'Celebrate Elegance',
    description: 'Shimmering fine jewelry curated for celebratory dinners, soirees, receptions, and memorable galas.',
    image: '/assets/jewelry/uploads/13-classic-gold-set.jpg',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug.toLowerCase().trim());
}

export function categoryNameToSlug(name: string): string {
  const found = CATEGORIES.find((cat) => cat.name.toLowerCase() === name.toLowerCase().trim());
  if (found) return found.slug;
  return name.toLowerCase().replace(/\s+/g, '-');
}
