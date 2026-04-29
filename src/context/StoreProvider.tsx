"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  size: string;
  color: string;
  qty: number;
  img: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, qty: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQty: (index: number, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  toast: { msg: string; show: boolean };
  showToast: (msg: string) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  user: any;
  setUser: (user: any) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState({ msg: "", show: false });
  const [user, setUser] = useState<any>(null);

  const showToast = (msg: string) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        return prev.map((item, i) => 
          i === existingIndex ? { ...item, qty: item.qty + qty } : item
        );
      }

      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        size,
        color,
        qty,
        img: product.images[0]
      }];
    });
    
    showToast(`${product.name} (${size}) added to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQty = (index: number, delta: number) => {
    setCart(prev => {
      return prev.map((item, i) => {
        if (i !== index) return item;
        return {
          ...item,
          qty: Math.max(1, Math.min(10, item.qty + delta))
        };
      });
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Removed from wishlist");
        return prev.filter(id => id !== productId);
      }
      showToast("Added to wishlist!");
      return [...prev, productId];
    });
  };

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateCartQty,
      isCartOpen, setIsCartOpen,
      isSearchOpen, setIsSearchOpen,
      selectedProduct, setSelectedProduct,
      toast, showToast,
      wishlist, toggleWishlist,
      user, setUser
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
