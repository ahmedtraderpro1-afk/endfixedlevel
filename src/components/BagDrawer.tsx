import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    items,
    totalQuantity,
    subtotal,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const isEmpty = items.length === 0;

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
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0c0c0c] border-l border-[#c5a059]/20 z-50 flex flex-col justify-between shadow-2xl"
            id="bag-drawer-container"
            aria-label="Shopping Bag Drawer"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-[#f9f6f0]/10 flex items-center justify-between shrink-0 bg-[#0c0c0c]">
              <div className="flex items-center gap-2.5 text-xs font-sans tracking-[0.25em] uppercase text-[#f9f6f0]">
                <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
                <span id="bag-drawer-title">Shopping Bag ({totalQuantity})</span>
              </div>
              <button
                type="button"
                id="close-bag-drawer-btn"
                onClick={onClose}
                aria-label="Close bag"
                className="p-1.5 text-[#f9f6f0]/60 hover:text-[#f9f6f0] transition-colors rounded-full hover:bg-[#151515] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {isEmpty ? (
              /* Empty Bag State */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
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
                  id="explore-collection-empty-btn"
                  onClick={onClose}
                  aria-label="Explore collection"
                  className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-colors cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* Populated Cart Items List */
              <div
                id="bag-items-list"
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-[#f9f6f0]/5"
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="pt-4 first:pt-0 flex gap-3 sm:gap-4 group"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-24 sm:w-22 sm:h-26 shrink-0 overflow-hidden bg-[#141414] border border-[#c5a059]/20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-xs sm:text-sm text-[#f9f6f0] leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <button
                            type="button"
                            id={`remove-cart-item-${item.id}`}
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title} from bag`}
                            className="text-[#f9f6f0]/40 hover:text-[#c5a059] p-1 -mr-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] font-sans text-[#c5a059] font-medium mt-1">
                          ${item.price.toFixed(2)} USD
                        </p>
                      </div>

                      {/* Quantity and Line Total */}
                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="inline-flex items-center border border-[#c5a059]/30 bg-[#121212]">
                          <button
                            type="button"
                            id={`decrement-qty-${item.id}`}
                            onClick={() => decrementQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity for ${item.title}`}
                            className={`w-7 h-7 flex items-center justify-center text-[#f9f6f0] hover:bg-[#c5a059]/20 transition-colors ${
                              item.quantity <= 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span
                            id={`item-qty-${item.id}`}
                            className="w-8 text-center text-xs font-sans text-[#f9f6f0] font-medium"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            id={`increment-qty-${item.id}`}
                            onClick={() => incrementQuantity(item.id)}
                            aria-label={`Increase quantity for ${item.title}`}
                            className="w-7 h-7 flex items-center justify-center text-[#f9f6f0] hover:bg-[#c5a059]/20 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <span className="text-[10px] text-[#f9f6f0]/50 block uppercase tracking-wider">
                            Total
                          </span>
                          <span
                            id={`item-line-total-${item.id}`}
                            className="text-xs sm:text-sm font-sans font-medium text-[#f9f6f0]"
                          >
                            ${(item.price * item.quantity).toFixed(2)} USD
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer / Summary */}
            <div className="p-4 sm:p-6 border-t border-[#f9f6f0]/10 bg-[#0e0e0e] shrink-0">
              {!isEmpty && (
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans uppercase tracking-[0.18em] text-[#f9f6f0]/70">
                      Subtotal
                    </span>
                    <span
                      id="bag-subtotal-value"
                      className="text-base sm:text-lg font-serif text-[#c5a059] font-medium"
                    >
                      ${subtotal.toFixed(2)} USD
                    </span>
                  </div>
                  <p className="text-[10px] text-[#f9f6f0]/45 leading-relaxed">
                    Taxes and shipping calculated at checkout.
                  </p>
                </div>
              )}

              {!isEmpty ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    id="proceed-to-checkout-btn"
                    aria-label="Proceed to Checkout"
                    onClick={() => {
                      onClose();
                      navigate('/checkout');
                    }}
                    className="w-full bg-[#c5a059] hover:bg-[#d4af37] text-[#0a0a0a] font-sans font-bold text-xs tracking-[0.2em] uppercase py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
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
                    Complimentary insured worldwide shipping on all signature orders.
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
