import React from 'react';
import {
  ArrowRight,
  Calendar,
  Heart,
  Mail,
  ShoppingBag,
  Shield,
  Sparkles,
} from 'lucide-react';

const categories = [
  {
    name: 'Bridal Sets',
    subtitle: 'View Pieces',
    image: '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
  },
  {
    name: 'Chokers',
    subtitle: 'Shop Now',
    image: '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
  },
  {
    name: 'Necklaces',
    subtitle: 'Luxury Styles',
    image: '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
  },
  {
    name: 'Earrings',
    subtitle: 'Statement Pairs',
    image: '/assets/jewelry/uploads/04-heritage-earrings.jpg',
  },
  {
    name: 'Pearl Collections',
    subtitle: 'Classic Beauty',
    image: '/assets/jewelry/uploads/07-multistrand-pearl-set.jpg',
  },
  {
    name: 'Festive Jewelry',
    subtitle: 'Celebrate Elegance',
    image: '/assets/jewelry/uploads/13-classic-gold-set.jpg',
  },
];

const products = [
  {
    title: 'Noor Multicolor Choker',
    price: '$450.00 USD',
    image: '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
  },
  {
    title: 'Mehr Emerald Pearl Choker',
    price: '$520.00 USD',
    image: '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
  },
  {
    title: 'Ayla Pearl Necklace',
    price: '$420.00 USD',
    image: '/assets/jewelry/uploads/01-pearl-emerald-set.jpg',
  },
  {
    title: 'Meher Heritage Set',
    price: '$560.00 USD',
    image: '/assets/jewelry/uploads/09-royal-ruby-bridal-set.jpg',
  },
  {
    title: 'Gul Statement Set',
    price: '$550.00 USD',
    image: '/assets/jewelry/uploads/08-emerald-opulent-set.jpg',
  },
  {
    title: 'Sahar Statement Earrings',
    price: '$240.00 USD',
    image: '/assets/jewelry/uploads/04-heritage-earrings.jpg',
  },
];

const editCards = [
  {
    id: 'the-emerald-edit',
    kicker: 'The Emerald Edit',
    title: 'A celebration of emeralds and opulence in perfect harmony.',
    cta: 'Discover Now',
    image: '/assets/jewelry/uploads/12-emerald-closeup-edit.jpg',
  },
  {
    id: 'the-bridal-edit',
    kicker: 'The Bridal Edit',
    title: 'Timeless bridal jewelry curated for your unforgettable day.',
    cta: 'Explore Bridal',
    image: '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
  },
  {
    id: 'private-styling',
    kicker: 'Private Styling Consultation',
    title: 'Book a one-on-one styling session with our jewelry experts.',
    cta: 'Book Appointment',
    image: '/assets/jewelry/uploads/13-classic-gold-set.jpg',
  },
];

const occasions = [
  {
    name: 'Weddings',
    subtitle: 'Timeless pieces for your special day',
    icon: Sparkles,
    image: '/assets/jewelry/uploads/05-emerald-royal-bridal-set.jpg',
  },
  {
    name: 'Receptions',
    subtitle: 'Make a statement that lasts forever',
    icon: Shield,
    image: '/assets/jewelry/uploads/09-royal-ruby-bridal-set.jpg',
  },
  {
    name: 'Soirées & Galas',
    subtitle: 'Elegance for every evening affair',
    icon: Calendar,
    image: '/assets/jewelry/uploads/03-ruby-bridal-necklace.jpg',
  },
  {
    name: 'Festive Dinners',
    subtitle: 'Shine in every celebration',
    icon: Sparkles,
    image: '/assets/jewelry/uploads/13-classic-gold-set.jpg',
  },
];

export const SectionPlaceholders: React.FC = () => {
  return (
    <div className="w-full space-y-14 sm:space-y-18 lg:space-y-20 py-10 sm:py-14 lg:py-16">
      <section
        id="shop-by-category"
        aria-label="Shop By Category"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.32em] uppercase block mb-2 font-medium">
            Shop By Category
          </span>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-[#f9f6f0] tracking-wide">
            Shop By Category
          </h2>
          <div className="w-14 h-px bg-[#c5a059]/45 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <article
              key={cat.name}
              className="group overflow-hidden border border-[#c5a059]/25 bg-[#0d0d0d] hover:border-[#c5a059]/60 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#131313]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="px-3 py-3 text-center border-t border-[#c5a059]/12">
                <h3 className="text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-[#f9f6f0] font-medium">
                  {cat.name}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] mt-1">
                  {cat.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="signature-collection"
        aria-label="Signature Collection"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="text-center sm:text-left">
            <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.32em] uppercase block mb-1.5 font-medium">
              Signature Collection
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#f9f6f0] tracking-wide">
              Signature Collection
            </h2>
          </div>
          <a
            href="#shop-by-category"
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#c5a059] hover:text-[#d4af37] inline-flex items-center gap-1.5"
          >
            <span>View All Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <article
              key={product.title}
              className="group border border-[#c5a059]/18 bg-[#0d0d0d] overflow-hidden hover:border-[#c5a059]/55 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#131313]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <button
                  type="button"
                  aria-label={`Add ${product.title} to wishlist`}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#0a0a0a]/70 border border-[#f9f6f0]/12 text-[#f9f6f0] flex items-center justify-center"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-3 py-3.5">
                <h3 className="text-[12px] text-[#f4efe8] leading-snug min-h-[34px]">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <p className="text-[11px] text-[#c5a059] font-medium">{product.price}</p>
                  <button
                    type="button"
                    aria-label={`Add ${product.title} to bag`}
                    className="w-7 h-7 border border-[#c5a059]/35 text-[#c5a059] flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {editCards.map((card) => (
            <article
              id={card.id}
              key={card.id}
              className="relative min-h-[270px] overflow-hidden border border-[#c5a059]/22 bg-[#101010]"
            >
              <img
                src={card.image}
                alt={card.kicker}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/92 via-[#0a0a0a]/68 to-[#0a0a0a]/30" />
              <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.28em] uppercase block mb-3 font-medium">
                    {card.kicker}
                  </span>
                  <p className="text-[#f9f6f0] text-base sm:text-lg leading-relaxed max-w-[18rem]">
                    {card.title}
                  </p>
                </div>
                <a
                  href={`#${card.id}`}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#f3e5ca] border border-[#c5a059]/45 px-4 py-3 self-start hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-colors"
                >
                  <span>{card.cta}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="shop-by-occasion"
        aria-label="Shop By Occasion"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.32em] uppercase block mb-2 font-medium">
            Shop By Occasion
          </span>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-[#f9f6f0] tracking-wide">
            Shop By Occasion
          </h2>
          <div className="w-14 h-px bg-[#c5a059]/45 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {occasions.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.name}
                className="relative min-h-[220px] overflow-hidden border border-[#c5a059]/22 bg-[#101010]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/58" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full border border-[#c5a059]/35 bg-[#0a0a0a]/55 text-[#c5a059] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-[24px] text-[#f9f6f0] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#f9f6f0]/78 max-w-[220px] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="crafted-to-perfection"
        aria-label="Crafted To Perfection"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] border border-[#c5a059]/22 bg-[#0d0d0d] overflow-hidden">
          <div className="min-h-[290px] lg:min-h-[420px]">
            <img
              src="/assets/jewelry/uploads/12-emerald-closeup-edit.jpg"
              alt="Crafted To Perfection"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.32em] uppercase block mb-3 font-medium">
              Crafted To Perfection
            </span>
            <h2 className="font-serif text-[30px] sm:text-[38px] leading-tight text-[#f9f6f0] max-w-xl">
              Where Tradition Meets Timeless Artistry
            </h2>
            <p className="text-sm sm:text-base text-[#f9f6f0]/72 leading-relaxed mt-4 max-w-xl">
              Every piece is meticulously handcrafted by master artisans using time-honored techniques and the finest materials.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#c5a059]/14">
              {[
                'Exquisite Detailing',
                'Master Craftsmanship',
                'Heritage of Excellence',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[#c5a059] text-[11px] uppercase tracking-[0.18em]">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="newsletter"
        aria-label="Newsletter"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="border border-[#c5a059]/18 bg-[#111111] px-5 py-6 sm:px-7 sm:py-7 flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-11 h-11 rounded-full bg-[#151515] border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0 hidden sm:flex">
              <Mail className="w-4 h-4" />
            </div>
            <p className="text-sm sm:text-base text-[#f9f6f0]">
              Be the first to discover new collections, exclusive offers &amp; style inspiration.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#151515] border border-[#c5a059]/20 px-4 py-3 text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/30 focus:outline-none focus:border-[#c5a059] min-w-[250px]"
            />
            <button
              type="submit"
              className="bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-7 py-3 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
