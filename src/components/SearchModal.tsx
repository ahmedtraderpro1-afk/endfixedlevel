import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            id="search-modal-backdrop"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#c5a059]/20 p-6 sm:p-8 rounded-none shadow-2xl z-10"
            id="search-modal-container"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#f9f6f0]/5 mb-6">
              <div className="flex items-center gap-2 text-[#c5a059] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-serif">
                <Sparkles className="w-4 h-4" />
                <span>Search Collections</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="w-4 h-4 text-[#c5a059] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bridal chokers, necklaces, heritage sets..."
                autoFocus
                className="w-full bg-[#151515] border border-[#c5a059]/20 rounded-none px-12 py-3.5 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/60 mb-3">
                POPULAR SEARCHES
              </p>
              <div className="flex flex-wrap gap-2">
                {['Bridal Choker', 'Emerald Edit', 'Heritage Sets', 'Pearl Necklaces', 'Kundan Sets'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-none bg-[#151515] border border-[#c5a059]/10 text-xs text-[#f9f6f0]/80 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
