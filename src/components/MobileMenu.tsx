import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Sparkles, Heart, ShoppingBag, Search } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenBag: () => void;
  onOpenWishlist?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenBag,
  onOpenWishlist,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            id="mobile-menu-backdrop"
          />

          {/* Drawer */}
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#0c0c0c] border-r border-[#c5a059]/20 z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#f9f6f0]/5">
                <BrandLogo size="sm" className="!items-start text-left" />
                <button
                  type="button"
                  id="close-mobile-menu-btn"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 text-[#f9f6f0]/60 hover:text-[#c5a059] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 py-4 border-b border-[#f9f6f0]/5 my-3">
                <button
                  type="button"
                  id="mobile-drawer-search-btn"
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-[#151515] border border-[#c5a059]/10 text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 mb-1" />
                  <span className="text-[10px] tracking-wider uppercase">Search</span>
                </button>

                <button
                  type="button"
                  id="mobile-drawer-wishlist-btn"
                  onClick={() => {
                    onClose();
                    onOpenWishlist?.();
                  }}
                  aria-label={`Wishlist with ${wishlistCount} items`}
                  className="flex flex-col items-center justify-center p-3 bg-[#151515] border border-[#c5a059]/10 text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 mb-1" />
                  <span className="text-[10px] tracking-wider uppercase">
                    Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
                  </span>
                </button>

                <button
                  type="button"
                  id="mobile-drawer-bag-btn"
                  onClick={() => {
                    onClose();
                    onOpenBag();
                  }}
                  aria-label={`Shopping bag with ${cartCount} items`}
                  className="flex flex-col items-center justify-center p-3 bg-[#151515] border border-[#c5a059]/10 text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 mb-1" />
                  <span className="text-[10px] tracking-wider uppercase">Bag ({cartCount})</span>
                </button>
              </div>

              {/* Navigation Links */}
              <ul className="space-y-1 py-4">
                <li>
                  <a
                    href="#home"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0] bg-[#151515] border-l-2 border-[#c5a059]"
                  >
                    <span>Home</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  </a>
                </li>
                <li>
                  <a
                    href="#shop-by-category"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/70 hover:text-[#c5a059] hover:bg-[#151515] transition-all"
                  >
                    <span>Shop</span>
                    <ChevronRight className="w-4 h-4 text-[#c5a059]/40" />
                  </a>
                </li>
                <li>
                  <a
                    href="#signature-collection"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/70 hover:text-[#c5a059] hover:bg-[#151515] transition-all"
                  >
                    <span>Collections</span>
                    <ChevronRight className="w-4 h-4 text-[#c5a059]/40" />
                  </a>
                </li>
                <li>
                  <a
                    href="#shop-by-occasion"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/70 hover:text-[#c5a059] hover:bg-[#151515] transition-all"
                  >
                    <span>Occasions</span>
                    <ChevronRight className="w-4 h-4 text-[#c5a059]/40" />
                  </a>
                </li>
                <li>
                  <a
                    href="#crafted-to-perfection"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/70 hover:text-[#c5a059] hover:bg-[#151515] transition-all"
                  >
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#private-styling"
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 text-xs font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/70 hover:text-[#c5a059] hover:bg-[#151515] transition-all"
                  >
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Bottom concierge */}
            <div className="pt-6 border-t border-[#f9f6f0]/5 text-left">
              <div className="p-3.5 bg-[#151515] border border-[#c5a059]/20">
                <p className="text-[10px] font-sans tracking-[0.2em] text-[#c5a059] uppercase font-medium">
                  Bespoke Consultation
                </p>
                <p className="text-xs text-[#f9f6f0]/60 mt-1 font-light">
                  Connect with our jewelry stylists for custom bridal suites.
                </p>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};
