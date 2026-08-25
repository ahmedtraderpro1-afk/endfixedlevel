import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside 
      id="announcement-bar"
      aria-label="Announcement"
      className="w-full bg-[#1a1a1a] border-b border-[#c5a059]/10 text-[#c5a059] py-2 px-4 select-none relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <button 
          type="button"
          aria-label="Previous announcement"
          className="hidden sm:inline-flex text-[#c5a059]/60 hover:text-[#c5a059] transition-colors p-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="w-full flex items-center justify-center gap-2 text-center font-normal">
          <Sparkles className="w-3 h-3 text-[#c5a059] shrink-0" />
          <p className="tracking-[0.2em]">
            Welcome to Jewelry By Nadia — Luxury jewelry for life’s most beautiful moments.
          </p>
          <Sparkles className="w-3 h-3 text-[#c5a059] shrink-0 hidden sm:inline" />
        </div>

        <button 
          type="button"
          aria-label="Next announcement"
          className="hidden sm:inline-flex text-[#c5a059]/60 hover:text-[#c5a059] transition-colors p-1"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
