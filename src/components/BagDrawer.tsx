import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({ isOpen, onClose }) => {
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
            id="bag-drawer-backdrop"
          />

            <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0c0c0c] border-l border-[#c5a059]/20 z-50 p-6 flex flex-col justify-between shadow-2xl"
            id="bag-drawer-container"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#f9f6f0]/5">
                <div className="flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[#f9f6f0]">
                  <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
                  <span>Shopping Bag (0)</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close bag"
                  className="p-1.5 text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Empty Bag State */}
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#c5a059]/20 flex items-center justify-center mb-4 text-[#c5a059]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-[#f9f6f0] mb-2">
                  Your Bag is Currently Empty
                </h3>
                <p className="text-xs text-[#f9f6f0]/60 max-w-xs leading-relaxed mb-6 font-light">
                  Explore our Signature Collection to discover handcrafted bridal statement pieces.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-colors cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f9f6f0]/5 text-center">
              <p className="text-[10px] text-[#f9f6f0]/40 uppercase tracking-wider">
                Complimentary insured worldwide shipping on all signature orders.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
