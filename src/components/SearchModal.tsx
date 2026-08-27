import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const searchResults = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed)
      )
    : [];

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
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#c5a059]/20 p-6 sm:p-8 rounded-none shadow-2xl z-10 max-h-[85vh] flex flex-col"
            id="search-modal-container"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#f9f6f0]/5 mb-6 shrink-0">
              <div className="flex items-center gap-2 text-[#c5a059] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-serif">
                <Sparkles className="w-4 h-4" />
                <span>Search Collections</span>
              </div>
              <button
                type="button"
                id="close-search-modal-btn"
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-6 shrink-0">
              <Search className="w-4 h-4 text-[#c5a059] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-input-field"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bridal chokers, necklaces, heritage sets..."
                autoFocus
                className="w-full bg-[#151515] border border-[#c5a059]/20 rounded-none pl-12 pr-4 py-3.5 text-xs sm:text-sm text-[#f9f6f0] placeholder-[#f9f6f0]/30 focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-4">
              {trimmed ? (
                <div>
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#c5a059] mb-3 font-semibold">
                    Matching Creations ({searchResults.length})
                  </p>
                  {searchResults.length === 0 ? (
                    <div className="text-center py-8 text-[#f9f6f0]/50 text-xs">
                      No jewelry pieces found matching &ldquo;{query}&rdquo;.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2.5 bg-[#141414] border border-[#c5a059]/15 hover:border-[#c5a059]/50 transition-colors group"
                        >
                          <img
                            src={product.mainImage}
                            alt={product.title}
                            className="w-12 h-14 object-cover shrink-0 border border-[#c5a059]/20"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-serif text-[#f9f6f0] group-hover:text-[#c5a059] transition-colors truncate">
                              {product.title}
                            </h4>
                            <p className="text-[11px] text-[#c5a059] font-sans font-medium mt-0.5">
                              ${product.price.toFixed(2)} USD
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#c5a059]/60 group-hover:text-[#c5a059] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#f9f6f0]/60 mb-3">
                    POPULAR SEARCHES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Chokers', 'Bridal Sets', 'Necklaces', 'Earrings', 'Emerald', 'Pearl', 'Ruby'].map((term) => (
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
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
