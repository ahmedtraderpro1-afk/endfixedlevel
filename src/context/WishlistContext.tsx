import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WishlistItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  category?: string;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  isInWishlist: (idOrSlug: string) => boolean;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (idOrSlug: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

const WISHLIST_STORAGE_KEY = 'jewelry_by_nadia_wishlist';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item): item is WishlistItem =>
              item &&
              typeof item.id === 'string' &&
              typeof item.slug === 'string' &&
              typeof item.title === 'string' &&
              typeof item.price === 'number' &&
              typeof item.image === 'string'
          );
        }
      }
    } catch (err) {
      console.error('Error reading wishlist from localStorage:', err);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.error('Error saving wishlist to localStorage:', err);
    }
  }, [wishlist]);

  const isInWishlist = (idOrSlug: string): boolean => {
    return wishlist.some((item) => item.id === idOrSlug || item.slug === idOrSlug);
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id || i.slug === item.slug);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (idOrSlug: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== idOrSlug && i.slug !== idOrSlug));
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id || i.slug === item.slug);
      if (exists) {
        return prev.filter((i) => i.id !== item.id && i.slug !== item.slug);
      }
      return [...prev, item];
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
