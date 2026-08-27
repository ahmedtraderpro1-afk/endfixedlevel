import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, ArrowRight, Trash2, ExternalLink } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBag?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBag,
}) => {
  const { wishlist, wishlistCount, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isEmpty = wishlist.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            id="wishlist-drawer-backdrop"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0c0c0c] border-l border-[#c5a059]/20 z-50 flex flex-col justify-between shadow-2xl"
            id="wishlist-drawer-container"
            aria-label="Wishlist Drawer"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-[#f9f6f0]/10 flex items-center justify-between shrink-0 bg-[#0c0c0c]">
              <div className="flex items-center gap-2.5 text-xs font-sans tracking-[0.25em] uppercase text-[#f9f6f0]">
                <Heart className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                <span id="wishlist-drawer-title">Wishlist ({wishlistCount})</span>
              </div>
              <button
                type="button"
                id="close-wishlist-drawer-btn"
                onClick={onClose}
                aria-label="Close wishlist"
                className="p-1.5 text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {isEmpty ? (
              /* Empty Wishlist State */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#c5a059]/20 flex items-center justify-center mb-4 text-[#c5a059]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#f9f6f0] mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#f9f6f0]/60 max-w-xs leading-relaxed mb-6 font-light">
                  Save your favorite handcrafted bridal pieces to review or purchase later.
                </p>
                <button
                  type="button"
                  id="explore-collection-wishlist-empty-btn"
                  onClick={onClose}
                  aria-label="Explore collection"
                  className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-colors cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* Populated Wishlist Items List */
              <div
                id="wishlist-items-list"
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-[#f9f6f0]/5"
              >
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    id={`wishlist-item-${item.id}`}
                    className="pt-4 first:pt-0 flex gap-3 sm:gap-4 group"
                  >
                    {/* Item Image */}
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={onClose}
                      className="relative w-20 h-24 sm:w-22 sm:h-26 shrink-0 overflow-hidden bg-[#141414] border border-[#c5a059]/20 block hover:border-[#c5a059]/60 transition-colors"
                      aria-label={`View ${item.title}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={onClose}
                            className="font-serif text-xs sm:text-sm text-[#f9f6f0] hover:text-[#c5a059] transition-colors leading-snug line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            id={`remove-wishlist-item-${item.id}`}
                            onClick={() => removeFromWishlist(item.id)}
                            aria-label={`Remove ${item.title} from wishlist`}
                            className="text-[#f9f6f0]/40 hover:text-[#c5a059] p-1 -mr-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] font-sans text-[#c5a059] font-medium mt-1">
                          ${item.price.toFixed(2)} USD
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-3 pt-2">
                        <button
                          type="button"
                          id={`wishlist-add-to-bag-${item.id}`}
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              title: item.title,
                              image: item.image,
                              price: item.price,
                              quantity: 1,
                            });
                            onClose();
                            onOpenBag?.();
                          }}
                          aria-label={`Add ${item.title} to bag`}
                          className="flex-1 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.15em] uppercase py-2 px-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={onClose}
                          aria-label={`View ${item.title} product details`}
                          className="border border-[#c5a059]/30 text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059] font-sans text-[10px] tracking-[0.15em] uppercase py-2 px-2.5 flex items-center justify-center transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-[#f9f6f0]/10 bg-[#0e0e0e] shrink-0">
              {!isEmpty ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    id="wishlist-add-all-to-bag-btn"
                    onClick={() => {
                      wishlist.forEach((item) => {
                        addToCart({
                          id: item.id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: 1,
                        });
                      });
                      onClose();
                      onOpenBag?.();
                    }}
                    aria-label="Move all wishlist items to bag"
                    className="w-full bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs tracking-[0.2em] uppercase py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All to Bag</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Continue shopping"
                    className="w-full text-center py-2 text-[10px] uppercase tracking-[0.18em] text-[#f9f6f0]/60 hover:text-[#c5a059] transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[10px] text-[#f9f6f0]/40 uppercase tracking-wider">
                    Curate your personal collection of heirloom fine jewelry.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
