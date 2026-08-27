import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductDetailPageProps {
  onOpenBag: () => void;
  onOpenWishlist: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onOpenBag,
  onOpenWishlist,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  // Scroll to top and reset state when product slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedImage(product.mainImage);
      setQuantity(1);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#f9f6f0] mb-3">
          Jewelry Piece Not Found
        </h1>
        <p className="text-sm text-[#f9f6f0]/60 max-w-md mb-8">
          The requested creation is either unavailable or has been moved to our private archive.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </Link>
      </div>
    );
  }

  const allImages = [
    product.mainImage,
    ...(product.additionalImages || []).filter((img) => img !== product.mainImage),
  ];

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product.slug, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: product.mainImage,
      price: product.price,
      quantity: quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
    onOpenBag();
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.mainImage,
      category: product.category,
    });
  };

  return (
    <div className="w-full pb-20">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        <nav
          id="product-breadcrumbs"
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-[11px] font-sans tracking-[0.15em] uppercase text-[#f9f6f0]/50"
        >
          <Link to="/" className="hover:text-[#c5a059] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <Link to="/#signature-collection" className="hover:text-[#c5a059] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <span className="text-[#c5a059]/80">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-[#c5a059]/40" />
          <span className="text-[#f9f6f0] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Product Stage */}
      <section
        id="product-detail-main"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-2 sm:mt-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Large Product Image & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary High-Resolution Display Container */}
            <div
              id="product-main-image-container"
              className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-[#0f0f0f] border border-[#c5a059]/25 overflow-hidden flex items-center justify-center shadow-2xl group"
            >
              <img
                id="product-main-image"
                src={selectedImage || product.mainImage}
                alt={product.title}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* In-Stock Badge Overlay */}
              <div className="absolute top-4 left-4 bg-[#0a0a0a]/85 backdrop-blur-md border border-[#c5a059]/30 px-3 py-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#dfc89e]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>In Stock & Ready</span>
              </div>

              {/* Wishlist Quick Toggle on image */}
              <button
                type="button"
                id="image-wishlist-toggle-btn"
                onClick={handleWishlistToggle}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                  inWishlist
                    ? 'bg-[#c5a059] border-[#c5a059] text-[#0a0a0a] shadow-lg shadow-[#c5a059]/30'
                    : 'bg-[#0a0a0a]/75 border-[#f9f6f0]/20 text-[#f9f6f0] hover:text-[#c5a059] hover:border-[#c5a059]/50'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails Foundation */}
            {allImages.length > 1 && (
              <div
                id="product-gallery-thumbnails"
                className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none"
              >
                {allImages.map((img, idx) => {
                  const isSelected = (selectedImage || product.mainImage) === img;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      aria-label={`View product image ${idx + 1}`}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-[#141414] border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                          : 'border-[#c5a059]/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Details, Actions & Trust */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Header / Titles */}
            <div className="border-b border-[#f9f6f0]/10 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#c5a059] text-[11px] font-sans tracking-[0.3em] uppercase font-semibold">
                  {product.category}
                </span>
                <span className="text-[#f9f6f0]/30">•</span>
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/60">
                  Signature Collection
                </span>
              </div>

              <h1
                id="product-title"
                className="font-serif text-3xl sm:text-4xl text-[#f9f6f0] tracking-wide leading-tight"
              >
                {product.title}
              </h1>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span
                  id="product-price"
                  className="font-serif text-2xl sm:text-3xl text-[#c5a059] font-normal"
                >
                  ${product.price.toFixed(2)} USD
                </span>
                <span className="text-xs text-[#f9f6f0]/50 uppercase tracking-widest">
                  Taxes Included
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p
              id="product-short-description"
              className="text-sm sm:text-[15px] text-[#f9f6f0]/80 leading-relaxed font-light"
            >
              {product.shortDescription}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#f9f6f0]/70">
                  Quantity
                </span>
                {/* Quantity Box */}
                <div className="inline-flex items-center border border-[#c5a059]/40 bg-[#121212]">
                  <button
                    type="button"
                    id="product-qty-decrease-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className={`w-10 h-10 flex items-center justify-center text-[#f9f6f0] hover:bg-[#c5a059]/20 transition-colors ${
                      quantity <= 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span
                    id="product-selected-quantity"
                    className="w-12 text-center text-sm font-sans font-medium text-[#f9f6f0]"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    id="product-qty-increase-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center text-[#f9f6f0] hover:bg-[#c5a059]/20 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                <button
                  type="button"
                  id="add-to-bag-button"
                  onClick={handleAddToCart}
                  aria-label={`Add ${quantity} ${product.title} to bag`}
                  className="flex-1 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs sm:text-sm tracking-[0.22em] uppercase py-4 px-6 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#c5a059]/15 hover:shadow-[#c5a059]/30"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                  {quantity > 1 && (
                    <span className="bg-[#0a0a0a] text-[#c5a059] text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold">
                      ({quantity})
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  id="wishlist-action-btn"
                  onClick={handleWishlistToggle}
                  aria-label={inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  className={`border py-4 px-5 flex items-center justify-center gap-2 text-xs font-sans tracking-[0.18em] uppercase transition-all cursor-pointer ${
                    inWishlist
                      ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#dfc89e]'
                      : 'border-[#c5a059]/30 text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Added Toast Notification */}
              {addedToast && (
                <div
                  id="added-to-bag-toast"
                  className="p-3 bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#dfc89e] text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    <span>Added {quantity} × {product.title} to your bag.</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenBag}
                    className="underline text-[#f9f6f0] hover:text-[#c5a059] font-medium tracking-wider uppercase text-[10px]"
                  >
                    View Bag
                  </button>
                </div>
              )}
            </div>

            {/* Product Specifications & Full Description Accordion / Card */}
            <div className="border border-[#c5a059]/20 bg-[#0d0d0d] p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[#c5a059] font-semibold mb-2">
                  Artisan Heritage & Narrative
                </h3>
                <p className="text-xs sm:text-sm text-[#f9f6f0]/75 leading-relaxed font-light">
                  {product.fullDescription}
                </p>
              </div>

              <div className="border-t border-[#f9f6f0]/10 pt-4">
                <h3 className="text-xs font-sans tracking-[0.2em] uppercase text-[#c5a059] font-semibold mb-3">
                  Materials & Craft Details
                </h3>
                <ul className="space-y-2 text-xs text-[#f9f6f0]/80">
                  {product.materials.map((mat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Luxury Assurance & Trust Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 bg-[#121212] border border-[#c5a059]/15">
                <Truck className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-[#f9f6f0] font-medium">
                    Insured Express Delivery
                  </h4>
                  <p className="text-[10px] text-[#f9f6f0]/50">Complimentary worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#121212] border border-[#c5a059]/15">
                <Award className="w-5 h-5 text-[#c5a059] shrink-0" />
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-[#f9f6f0] font-medium">
                    Handcrafted Authenticity
                  </h4>
                  <p className="text-[10px] text-[#f9f6f0]/50">Official Certificate of Origin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jewelry Pieces */}
      {relatedProducts.length > 0 && (
        <section
          id="related-jewelry-section"
          aria-label="You May Also Like"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-24 pt-12 border-t border-[#f9f6f0]/10"
        >
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[#c5a059] text-[10px] sm:text-[11px] font-sans tracking-[0.32em] uppercase block mb-2 font-medium">
              Curated Pairings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f9f6f0] tracking-wide">
              You May Also Adore
            </h2>
            <div className="w-12 h-px bg-[#c5a059]/45 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                id={`related-product-${rel.id}`}
                className="group border border-[#c5a059]/18 bg-[#0d0d0d] overflow-hidden hover:border-[#c5a059]/55 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link
                    to={`/product/${rel.slug}`}
                    className="relative aspect-[4/5] block overflow-hidden bg-[#131313]"
                    aria-label={`View ${rel.title}`}
                  >
                    <img
                      src={rel.mainImage}
                      alt={rel.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <div className="p-3 sm:p-4">
                    <Link
                      to={`/product/${rel.slug}`}
                      className="text-xs sm:text-sm font-serif text-[#f4efe8] hover:text-[#c5a059] transition-colors leading-snug line-clamp-2"
                    >
                      {rel.title}
                    </Link>
                    <p className="text-[11px] font-sans text-[#c5a059] font-medium mt-1.5">
                      ${rel.price.toFixed(2)} USD
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: rel.id,
                        title: rel.title,
                        image: rel.mainImage,
                        price: rel.price,
                        quantity: 1,
                      });
                      onOpenBag();
                    }}
                    aria-label={`Add ${rel.title} to bag`}
                    className="w-full py-2 bg-[#151515] hover:bg-[#c5a059] text-[#f9f6f0] hover:text-[#0a0a0a] border border-[#c5a059]/30 text-[10px] uppercase tracking-[0.18em] font-sans font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
