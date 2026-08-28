import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onOpenBag?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenBag }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <article
      id={`product-card-${product.id}`}
      className="group border border-[#c5a059]/18 bg-[#0d0d0d] overflow-hidden hover:border-[#c5a059]/55 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#131313]">
          <Link
            to={`/product/${product.slug}`}
            className="block w-full h-full"
            aria-label={`View ${product.title} details`}
          >
            <img
              src={product.mainImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <button
            type="button"
            id={`wishlist-toggle-${product.id}`}
            aria-label={inWishlist ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist({
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                image: product.mainImage,
                category: product.category,
              });
            }}
            className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
              inWishlist
                ? 'bg-[#c5a059] border-[#c5a059] text-[#0a0a0a]'
                : 'bg-[#0a0a0a]/70 border-[#f9f6f0]/12 text-[#f9f6f0] hover:text-[#c5a059] hover:border-[#c5a059]/50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="px-3 pt-3.5 pb-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#c5a059]/75 block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="text-[12px] sm:text-[13px] text-[#f4efe8] hover:text-[#c5a059] transition-colors leading-snug line-clamp-2 min-h-[34px] block font-normal"
          >
            {product.title}
          </Link>
        </div>
      </div>

      <div className="px-3 pb-3.5">
        <div className="mt-2 flex items-end justify-between gap-2 pt-2 border-t border-[#c5a059]/10">
          <p className="text-[11px] sm:text-xs text-[#c5a059] font-medium font-sans">
            ${product.price.toFixed(2)} USD
          </p>
          <button
            type="button"
            id={`add-to-bag-${product.id}`}
            aria-label={`Add ${product.title} to bag`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                title: product.title,
                image: product.mainImage,
                price: product.price,
              });
              onOpenBag?.();
            }}
            className="w-7 h-7 border border-[#c5a059]/35 text-[#c5a059] flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
