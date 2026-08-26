import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface AddToCartInput {
  id?: string;
  title: string;
  image: string;
  price: number | string;
  quantity?: number;
}

export interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addToCart: (product: AddToCartInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = 'jewelry_by_nadia_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: number | string): number {
  if (typeof price === 'number') {
    return isNaN(price) ? 0 : price;
  }
  const cleanStr = price.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleanStr);
  return isNaN(parsed) ? 0 : parsed;
}

function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.id === 'string' &&
              typeof item.title === 'string' &&
              typeof item.image === 'string' &&
              typeof item.price === 'number' &&
              !isNaN(item.price) &&
              typeof item.quantity === 'number' &&
              item.quantity >= 1
          );
        }
      }
    } catch (err) {
      console.error('Error reading cart from localStorage:', err);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }, [items]);

  const addToCart = (product: AddToCartInput) => {
    const numericPrice = parsePrice(product.price);
    const productId = product.id || generateId(product.title);
    const qtyToAdd = Math.max(1, product.quantity || 1);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === productId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: productId,
          title: product.title,
          image: product.image,
          price: numericPrice,
          quantity: qtyToAdd,
        },
      ];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const incrementQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        addToCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
