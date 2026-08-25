import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { SectionPlaceholders } from './components/SectionPlaceholders';
import { FooterPlaceholder } from './components/FooterPlaceholder';
import { SearchModal } from './components/SearchModal';
import { BagDrawer } from './components/BagDrawer';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f9f6f0] flex flex-col antialiased selection:bg-[#c5a059]/30 selection:text-[#f9f6f0]">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Desktop & Mobile Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBag={() => setBagOpen(true)}
        onOpenWishlist={() => setBagOpen(true)}
        cartCount={0}
        wishlistCount={0}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
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

        {/* 5. Clean Structural Placeholders for Remaining Sections */}
        <SectionPlaceholders />
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
    </div>
  );
}
