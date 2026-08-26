import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { SectionPlaceholders } from './components/SectionPlaceholders';
import { FooterPlaceholder } from './components/FooterPlaceholder';
import { SearchModal } from './components/SearchModal';
import { BagDrawer } from './components/BagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function HomePage({ onOpenBag }: { onOpenBag: () => void }) {
  return (
    <>
      {/* 3. Hero Section */}
      <HeroSection
        onShopClick={() => {
          const el = document.getElementById('signature-collection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBridalClick={() => {
          const el = document.getElementById('the-bridal-edit');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Trust Strip */}
      <TrustStrip />

      {/* 5. Clean Structural Sections including Signature Collection */}
      <SectionPlaceholders onOpenBag={onOpenBag} />
    </>
  );
}

function MainApp() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const { totalQuantity } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f9f6f0] flex flex-col antialiased selection:bg-[#c5a059]/30 selection:text-[#f9f6f0]">
      <ScrollToTop />

      {/* 1. Global Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Desktop & Mobile Header with Live Counts */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBag={() => setBagOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        cartCount={totalQuantity}
        wishlistCount={wishlistCount}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage onOpenBag={() => setBagOpen(true)} />} />
          <Route
            path="/product/:slug"
            element={
              <ProductDetailPage
                onOpenBag={() => setBagOpen(true)}
                onOpenWishlist={() => setWishlistOpen(true)}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Fallback route */}
          <Route path="*" element={<HomePage onOpenBag={() => setBagOpen(true)} />} />
        </Routes>
      </main>

      {/* 6. Footer */}
      <FooterPlaceholder />

      {/* Interactive Overlays */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <BagDrawer
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onOpenBag={() => setBagOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <MainApp />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
