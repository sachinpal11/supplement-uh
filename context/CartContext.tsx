"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AddToCartInput {
  id: string;
  title: string;
  subtitle?: string;
  sku: string;
  price: string;
  numericPrice?: number;
  image: string;
  category?: string;
  inStock?: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  sku: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
  category?: string;
  inStock?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartInput, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  checkoutItem: CartItem | null;
  setCheckoutItem: (item: CartItem | null) => void;
  openWhatsAppCheckout: (item?: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CartItem | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("united_hormone_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem("united_hormone_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const parsePrice = (priceStr: string, numericPrice?: number): number => {
    if (typeof numericPrice === "number" && !isNaN(numericPrice)) return numericPrice;
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const addToCart = (
    item: AddToCartInput,
    quantityToAdd = 1
  ) => {
    const numericPrice = parsePrice(item.price, item.numericPrice);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantityToAdd;
        return updated;
      }
      return [
        ...prevCart,
        {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || "UNITED HORMONE",
          sku: item.sku,
          price: item.price,
          numericPrice,
          image: item.image,
          quantity: quantityToAdd,
          category: item.category,
          inStock: item.inStock ?? true,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openWhatsAppCheckout = (singleItem?: CartItem) => {
    if (singleItem) {
      setCheckoutItem(singleItem);
    } else {
      setCheckoutItem(null);
    }
    setIsCartOpen(false);
    setIsWhatsAppModalOpen(true);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        checkoutItem,
        setCheckoutItem,
        openWhatsAppCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
