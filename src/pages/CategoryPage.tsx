import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { getCategoryBySlug, CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';

interface CategoryPageProps {
  onOpenBag?: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onOpenBag }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categoryInfo = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  // Fallback category name if not in static list
  const categoryName = categoryInfo
    ? categoryInfo.name
    : categorySlug
    ? categorySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Collection';

  const categoryProducts = useMemo(() => {
    if (!categoryName) return [];
    return PRODUCTS.filter(
      (p) => p.category.toLowerCase().trim() === categoryName.toLowerCase().trim()
    );
  }, [categoryName]);

  return (
    <div className="w-full min-h-[70vh] pb-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <nav
          id="category-breadcrumbs"
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-[11px] font-sans tracking-[0.15em] uppercase text-[#f9f6f0]/50"
        >
          <Link to="/" className="hover:text-[#c5a059] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <Link to="/shop" className="hover:text-[#c5a059] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <span className="text-[#c5a059] font-medium">{categoryName}</span>
        </nav>
      </div>

      {/* Category Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 sm:mb-12">
        <div className="text-center py-6 sm:py-10 border-b border-[#c5a059]/15">
          <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase block mb-2.5 font-medium">
            {categoryInfo?.subtitle || 'Curated Suite'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f9f6f0] tracking-wide">
            {categoryName}
          </h1>
          <p className="text-sm sm:text-base text-[#f9f6f0]/65 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
            {categoryInfo?.description ||
              `Discover exquisite handcrafted ${categoryName.toLowerCase()} designed for unforgettable occasions.`}
          </p>
        </div>
      </section>

      {/* Product Count & Filter Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#c5a059]/10">
          <div className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#c5a059]/80">
            <span>
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Piece' : 'Pieces'} in {categoryName}
            </span>
          </div>

          <Link
            to="/shop"
            className="text-[11px] font-sans tracking-[0.18em] uppercase text-[#c5a059] hover:text-[#f3e5ca] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View All Jewelry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Products Grid or Empty Category State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {categoryProducts.map((product) => (
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
              New bridal and celebratory creations are currently being set in our atelier. Explore our complete catalogue of fine jewelry.
            </p>
            <Link
              to="/shop"
              id="empty-category-shop-all-btn"
              className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 transition-colors"
            >
              <span>Shop All Jewelry</span>
            </Link>
          </div>
        )}
      </section>

      {/* Explore Other Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-20 pt-12 border-t border-[#c5a059]/15">
        <div className="text-center mb-8">
          <span className="text-[#c5a059] text-[10px] font-sans tracking-[0.3em] uppercase block mb-1">
            Other Collections
          </span>
          <h2 className="font-serif text-xl sm:text-2xl text-[#f9f6f0]">
            Continue Exploring
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`p-3 border transition-all text-center group ${
                cat.slug === categorySlug
                  ? 'bg-[#c5a059]/15 border-[#c5a059]'
                  : 'bg-[#111111] border-[#c5a059]/20 hover:border-[#c5a059]/60'
              }`}
            >
              <span
                className={`text-[11px] uppercase tracking-[0.15em] block font-medium transition-colors ${
                  cat.slug === categorySlug
                    ? 'text-[#c5a059]'
                    : 'text-[#f9f6f0] group-hover:text-[#c5a059]'
                }`}
              >
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
