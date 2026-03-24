"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedQty: string;
  unitPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, selectedQty: string, unitPrice: number, qty?: number) => void;
  removeItem: (productId: string, selectedQty: string) => void;
  updateQty: (productId: string, selectedQty: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "gills_cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addItem = useCallback(
    (product: Product, selectedQty: string, unitPrice: number, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.selectedQty === selectedQty
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.selectedQty === selectedQty
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { product, quantity: qty, selectedQty, unitPrice }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, selectedQty: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedQty === selectedQty))
    );
  }, []);

  const updateQty = useCallback(
    (productId: string, selectedQty: string, qty: number) => {
      if (qty <= 0) {
        removeItem(productId, selectedQty);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedQty === selectedQty
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
