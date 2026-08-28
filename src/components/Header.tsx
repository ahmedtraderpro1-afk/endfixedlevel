import React, { useState, useEffect } from 'react';
import { Menu, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenBag: () => void;
  onOpenWishlist: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenBag,
  onOpenWishlist,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c5a059]/15 shadow-lg shadow-black/60'
            : 'bg-[#0a0a0a] border-b border-[#f9f6f0]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="relative flex items-center justify-between h-16 sm:h-20 lg:h-22">
            
            {/* MOBILE: Left Hamburger Menu */}
            <div className="flex items-center lg:hidden z-10">
              <button
                type="button"
                id="mobile-menu-trigger-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="p-2 -ml-2 text-[#f9f6f0]/80 hover:text-[#c5a059] transition-colors focus:outline-none"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* BRAND LOGO: Absolute True Center on Mobile, Standard Left on Desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-auto lg:static lg:translate-x-0 lg:text-left z-10">
              <Link
                to="/"
                id="brand-logo-link"
                className="inline-block group focus:outline-none py-1"
                aria-label="Jewelry By Nadia - Return to Home"
              >
                <BrandLogo size="md" />
              </Link>
            </div>

            {/* DESKTOP NAVIGATION (Center) */}
            <nav
              id="desktop-navigation"
              aria-label="Desktop Navigation"
              className="hidden lg:flex items-center space-x-7 xl:space-x-8"
            >
              <Link
                to="/"
                id="nav-link-home"
                className="text-[11px] uppercase tracking-[0.15em] text-[#f9f6f0] hover:text-[#c5a059] transition-colors relative py-1"
              >
                <span>Home</span>
              </Link>

              {/* Shop with Category Dropdown */}
              <div className="relative group">
                <Link
                  to="/shop"
                  id="nav-link-shop"
                  className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#c5a059] text-[#f9f6f0] transition-colors py-1"
                >
                  <span>Shop</span>
                  <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:text-[#c5a059] transition-transform group-hover:rotate-180 duration-200" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-48 bg-[#0c0c0c] border border-[#c5a059]/25 shadow-xl shadow-black/80 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#c5a059] hover:bg-[#161616] border-b border-[#c5a059]/15 font-semibold"
                  >
                    All Jewelry
                  </Link>
                  <Link
                    to="/category/bridal-sets"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Bridal Sets
                  </Link>
                  <Link
                    to="/category/chokers"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Chokers
                  </Link>
                  <Link
                    to="/category/necklaces"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Necklaces
                  </Link>
                  <Link
                    to="/category/earrings"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Earrings
                  </Link>
                  <Link
                    to="/category/pearl-collections"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Pearl Collections
                  </Link>
                  <Link
                    to="/category/festive-jewelry"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Festive Jewelry
                  </Link>
                </div>
              </div>

              {/* Collections */}
              <div className="relative group">
                <Link
                  to="/shop"
                  id="nav-link-collections"
                  className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#c5a059] text-[#f9f6f0] transition-colors py-1"
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:text-[#c5a059] transition-transform group-hover:rotate-180 duration-200" />
                </Link>

                {/* Collections Dropdown */}
                <div className="absolute top-full left-0 w-52 bg-[#0c0c0c] border border-[#c5a059]/25 shadow-xl shadow-black/80 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/category/bridal-sets"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    The Bridal Edit
                  </Link>
                  <Link
                    to="/category/chokers"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    The Emerald Edit
                  </Link>
                  <Link
                    to="/category/pearl-collections"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#f9f6f0]/80 hover:text-[#c5a059] hover:bg-[#161616] transition-colors"
                  >
                    Pearl Heritage
                  </Link>
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#c5a059] hover:bg-[#161616] border-t border-[#c5a059]/15 font-semibold"
                  >
                    View All Collections
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <a
                  href="/#shop-by-occasion"
                  id="nav-link-occasions"
                  className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#c5a059] text-[#f9f6f0] transition-colors py-1"
                >
                  <span>Occasions</span>
                </a>
              </div>

              <a
                href="/#crafted-to-perfection"
                id="nav-link-about"
                className="text-[11px] uppercase tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#c5a059] text-[#f9f6f0] transition-colors py-1"
              >
                About
              </a>

              <a
                href="/#private-styling"
                id="nav-link-contact"
                className="text-[11px] uppercase tracking-[0.15em] opacity-80 hover:opacity-100 hover:text-[#c5a059] text-[#f9f6f0] transition-colors py-1"
              >
                Contact
              </a>
            </nav>

            {/* RIGHT: Action Icons (Search, Wishlist, Bag) */}
            <div className="flex items-center space-x-1.5 sm:space-x-4 lg:space-x-5 z-10">
              <button
                type="button"
                id="header-search-btn"
                onClick={onOpenSearch}
                aria-label="Search jewelry"
                className="p-1.5 sm:p-2 text-[#f9f6f0]/80 hover:text-[#c5a059] transition-colors rounded-full hover:bg-[#151515] focus:outline-none"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>

              <button
                type="button"
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                className="p-1.5 sm:p-2 text-[#f9f6f0]/80 hover:text-[#c5a059] transition-colors rounded-full hover:bg-[#151515] relative focus:outline-none"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#c5a059] text-[#0a0a0a] text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="header-bag-btn"
                onClick={onOpenBag}
                aria-label="Shopping bag"
                className="p-1.5 sm:p-2 text-[#f9f6f0]/80 hover:text-[#c5a059] transition-colors rounded-full hover:bg-[#151515] relative focus:outline-none flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-[0.15em] text-[#c5a059] font-medium">
                  Bag ({cartCount})
                </span>
                {cartCount > 0 && (
                  <span className="sm:hidden absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#c5a059] text-[#0a0a0a] text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={onOpenSearch}
        onOpenBag={onOpenBag}
        onOpenWishlist={onOpenWishlist}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
};
