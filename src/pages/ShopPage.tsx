import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onOpenBag?: () => void;
}

const FILTER_CATEGORIES = [
  'All',
  'Bridal Sets',
  'Chokers',
  'Necklaces',
  'Earrings',
  'Pearl Collections',
  'Festive Jewelry',
];

export const ShopPage: React.FC<ShopPageProps> = ({ onOpenBag }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // Sync with searchParams if url changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const match = FILTER_CATEGORIES.find(
        (c) => c.toLowerCase() === categoryParam.toLowerCase() ||
               c.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
      );
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, [searchParams]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat.toLowerCase().replace(/\s+/g, '-') }, { replace: true });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return PRODUCTS;
    }
    return PRODUCTS.filter(
      (p) => p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
    );
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-[70vh] pb-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <nav
          id="shop-breadcrumbs"
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-[11px] font-sans tracking-[0.15em] uppercase text-[#f9f6f0]/50"
        >
          <Link to="/" className="hover:text-[#c5a059] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <span className="text-[#c5a059]">Shop</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
              <span className="text-[#f9f6f0] font-medium">{selectedCategory}</span>
            </>
          )}
        </nav>
      </div>

      {/* Hero Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-12">
        <div className="text-center py-6 sm:py-10 border-b border-[#c5a059]/15">
          <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase block mb-2.5 font-medium">
            Fine Jewelry Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f9f6f0] tracking-wide">
            Shop All Jewelry
          </h1>
          <p className="text-sm sm:text-base text-[#f9f6f0]/65 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            Explore our handcrafted collection of royal bridal sets, chokers, necklaces, and regal heritage statement pieces.
          </p>
        </div>
      </section>

      {/* Filter Bar & Product Count */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-6 border-b border-[#c5a059]/10">
          
          {/* Category Filter Pills */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#c5a059] flex items-center gap-1.5 mr-2 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-[10px] sm:text-[11px] uppercase tracking-[0.16em] px-3.5 py-2 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#c5a059] border-[#c5a059] text-[#0a0a0a] font-semibold'
                        : 'bg-[#121212] border-[#c5a059]/20 text-[#f9f6f0]/75 hover:text-[#c5a059] hover:border-[#c5a059]/50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Counter */}
          <div className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#c5a059]/80 self-end md:self-center shrink-0">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'} Available
            </span>
          </div>

        </div>
      </section>

      {/* Products Grid or Empty State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenBag={onOpenBag}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 px-4 text-center border border-[#c5a059]/20 bg-[#0d0d0d] max-w-2xl mx-auto my-8">
            <div className="w-14 h-14 rounded-full bg-[#151515] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mx-auto mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#f9f6f0] mb-2">
              No pieces are currently available in this collection.
            </h3>
            <p className="text-xs sm:text-sm text-[#f9f6f0]/60 max-w-md mx-auto mb-6 leading-relaxed">
              New couture creations are currently being set by our master artisans. Explore all active creations in our signature catalog.
            </p>
            <button
              type="button"
              id="shop-all-reset-btn"
              onClick={() => handleCategorySelect('All')}
              className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 transition-colors cursor-pointer"
            >
              <span>Shop All Jewelry</span>
            </button>
          </div>
        )}
      </section>

      {/* Quick Category Jump Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-20 pt-12 border-t border-[#c5a059]/15">
        <div className="text-center mb-8">
          <span className="text-[#c5a059] text-[10px] font-sans tracking-[0.3em] uppercase block mb-1">
            Browse By Realm
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#f9f6f0]">
            Explore Collections
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="p-3 bg-[#111111] border border-[#c5a059]/20 hover:border-[#c5a059]/60 transition-all text-center group"
            >
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#f9f6f0] group-hover:text-[#c5a059] transition-colors block font-medium">
                {cat.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059]/70 block mt-0.5">
                {cat.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
