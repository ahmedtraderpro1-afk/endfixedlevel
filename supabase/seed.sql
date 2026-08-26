-- ==============================================================================
-- Jewelry By Nadia — Product Seed Data (Signature Collection)
-- File: supabase/seed.sql
-- ==============================================================================

INSERT INTO public.products (
  slug,
  title,
  category,
  price,
  currency,
  main_image_url,
  short_description,
  full_description,
  materials,
  in_stock,
  featured,
  active
) VALUES
(
  'noor-multicolor-choker',
  'Noor Multicolor Choker',
  'Chokers',
  450.00,
  'USD',
  '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
  'Regal multicolored gemstone choker handcrafted with rubies, emerald accents, and lustrous freshwater pearls.',
  'The Noor Multicolor Choker is an exquisite masterpiece of bridal artistry. Designed with hand-selected ruby droplets, lustrous micro-pearls, and antique gold filigree, this piece captures the royal heritage of Mughal courts with contemporary refinement. Each gemstone is carefully set by master artisans to ensure exceptional brilliance and comfort against the collarbone.',
  '["22k Antique Gold Micron Finish", "Hand-Cut Hydro Rubies & Emerald Cabochons", "AAA Grade Natural Freshwater Seed Pearls", "Hand-Woven Adjustable Zari Dori Backing", "Artisanal Hypoallergenic Brass Alloy Core"]'::jsonb,
  true,
  true,
  true
),
(
  'mehr-emerald-pearl-choker',
  'Mehr Emerald Pearl Choker',
  'Chokers',
  520.00,
  'USD',
  '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
  'Mesmerizing deep green emerald choker crowned with layered cluster pearls and antique gold bezel setting.',
  'Echoing the grandeur of royal dynasties, the Mehr Emerald Pearl Choker combines deep emerald hues with delicate seed pearls. Hand-carved stone settings and intricate lattice backing make it exceptionally comfortable while delivering maximum regal drama for evening soirees and grand wedding celebrations.',
  '["22k Antique Matte Gold Bath", "Faceted Colombian Emerald-Tone Hydro Quartz", "Tiered South Sea Cultured Drop Pearls", "Handcrafted Filigree Clasp with Adjustable Cord", "Lead and Nickel Free Fine Alloy"]'::jsonb,
  true,
  true,
  true
),
(
  'ayla-pearl-necklace',
  'Ayla Pearl Necklace',
  'Necklaces',
  420.00,
  'USD',
  '/assets/jewelry/uploads/01-pearl-emerald-set.jpg',
  'Timeless multi-strand graduated pearl necklace with emerald center medallion and cascading droplets.',
  'The Ayla Pearl Necklace embodies quintessential sophistication. Cascading rows of luminous ivory pearls lead to an intricately sculpted emerald and polki medallion, creating an ethereal contour for wedding banquets, receptions, and black-tie gala evenings.',
  '["Sterling Silver Base with 22k Gold Dipping", "AAA High-Lustre Graduated Ivory Pearls", "Hand-Carved Emerald Hydro Quartz Medallion", "Reinforced Multi-Ply Silk Thread Weaving", "Signature Nadia Crest Security Clasp"]'::jsonb,
  true,
  true,
  true
),
(
  'meher-heritage-set',
  'Meher Heritage Set',
  'Bridal Sets',
  560.00,
  'USD',
  '/assets/jewelry/uploads/09-royal-ruby-bridal-set.jpg',
  'Opulent royal ruby bridal set with matching statement jhumkas and intricate heritage embellishments.',
  'Designed for the discerning bride who values timeless legacy. The Meher Heritage Set features a grandiose bib collar inlaid with hand-cut cabochon rubies and suspended teardrop pearls, accompanied by matching statement earrings for a cohesive ceremonial presence.',
  '["Solid Brass with 24k Matte Gold Bath", "Cabochon Cut Ruby & Polki Accents", "Basra-Style Suspended Drop Pearls", "Includes Matching Heritage Jhumka Earrings", "Presented in Custom Velvet Presentation Chest"]'::jsonb,
  true,
  true,
  true
),
(
  'gul-statement-set',
  'Gul Statement Set',
  'Bridal Sets',
  550.00,
  'USD',
  '/assets/jewelry/uploads/08-emerald-opulent-set.jpg',
  'Lavish architectural emerald floral set with sculpted petals, micro-kundan, and chandelier drops.',
  'The Gul Statement Set blooms with artisanal splendour. Each motif is carefully hand-set with micro-faceted green stones and framed by champagne kundan petals, evoking the manicured royal gardens of Kashmir.',
  '["Hand-Carved Stone Petals with Kundan Framing", "Emerald Drop Beads and Basra Pearl Clusters", "22k Champagne Gold Gilded Finish", "Includes Matching Chandelier Earrings", "Ergonomic Flexible Collar Articulation"]'::jsonb,
  true,
  true,
  true
),
(
  'sahar-statement-earrings',
  'Sahar Statement Earrings',
  'Earrings',
  240.00,
  'USD',
  '/assets/jewelry/uploads/04-heritage-earrings.jpg',
  'Dramatic artisanal heritage earrings with delicate filigree arches and hanging pearl clusters.',
  'The Sahar Statement Earrings bring timeless royalty to any look. Sculpted with delicate lattice archways and balanced weight distribution, these earrings catch every ray of ambient light with their swinging pearl tassels and emerald crown.',
  '["Sterling Silver Base with 22k Gold Vermeil", "Natural Rice Pearls and Emerald Hydro Droplets", "Lightweight Hollow-Back Construction for Comfort", "Handcrafted Push-Back Fastening with Support Discs"]'::jsonb,
  true,
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  currency = EXCLUDED.currency,
  main_image_url = EXCLUDED.main_image_url,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  materials = EXCLUDED.materials,
  in_stock = EXCLUDED.in_stock,
  featured = EXCLUDED.featured,
  active = EXCLUDED.active,
  updated_at = now();
