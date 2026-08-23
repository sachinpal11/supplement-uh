"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    isCartOpen,
    setIsCartOpen,
    openWhatsAppCheckout,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      setMounted(true);
    } else if (mounted) {
      // Exit Animation via GSAP
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            setMounted(false);
          },
        });

        tl.to(".cart-item-card", {
          opacity: 0,
          y: 10,
          duration: 0.15,
          ease: "power2.in",
        })
          .to(
            drawerRef.current,
            {
              x: "100%",
              duration: 0.35,
              ease: "power3.in",
            },
            "-=0.05"
          )
          .to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            "-=0.2"
          );
      });

      return () => ctx.revert();
    }
  }, [isCartOpen]);

  // Entrance Animation via GSAP after mounted
  useEffect(() => {
    if (mounted && isCartOpen) {
      const ctx = gsap.context(() => {
        // Initial state set
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(drawerRef.current, { x: "100%" });

        const tl = gsap.timeline();

        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        })
          .to(
            drawerRef.current,
            {
              x: "0%",
              duration: 0.45,
              ease: "power3.out",
            },
            "-=0.25"
          )
          .fromTo(
            ".cart-item-card",
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.15"
          );
      });

      return () => ctx.revert();
    }
  }, [mounted, isCartOpen]);

  if (!mounted) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden select-none">
      {/* Darkened Backdrop Overlay with GSAP Fade */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm opacity-0"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slide Panel with GSAP Slide */}
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-[#0A0A0A] border-l border-white/10 text-[#F0EDE8] shadow-2xl flex flex-col justify-between transform translate-x-full"
        >

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-b from-[#181818] to-[#101010]">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="font-bebas text-2xl tracking-wider text-white uppercase">
                YOUR CART ({totalCount})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>




          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-white/50 space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-bebas text-2xl tracking-wide text-white/80 uppercase">
                  YOUR CART IS EMPTY
                </h3>
                <p className="text-xs text-white/50 max-w-xs">
                  Explore our premium pharmaceutical-grade catalog and add high-performance products.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-[2px] rounded-lg hover:bg-[#C8B84D] transition-colors cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item-card flex gap-4 p-3 rounded-xl bg-[#141414] border border-white/10 relative group transition-all hover:border-white/20"
                >
                  {/* Item Image Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-[#0A0A0A] overflow-hidden relative flex-shrink-0 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Item Content Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bebas text-lg leading-none tracking-wide text-white uppercase">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/40 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                        {item.sku}
                      </p>
                    </div>

                    {/* Quantity & Item Subtotal Row */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white hover:bg-white/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white hover:bg-white/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-sm text-white font-sans">
                        ${(item.numericPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121212] border-t border-white/10 space-y-4 font-sans">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-400 font-medium">
                    {subtotal >= freeShippingThreshold ? "FREE" : "$9.99"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg pt-2 border-t border-white/10 font-bold text-white">
                  <span>TOTAL AMOUNT</span>
                  <span className="text-white text-xl font-sans font-bold">
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Row */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => openWhatsAppCheckout()}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE57] text-[#0A0A0A] font-extrabold text-xs tracking-[2px] uppercase rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current text-[#0A0A0A]" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
                  </svg>
                  <span>CHECKOUT VIA WHATSAPP</span>
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[10px] uppercase font-bold tracking-[1.5px] text-white/40 hover:text-red-400 transition-colors text-center cursor-pointer"
                >
                  CLEAR ENTIRE CART
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
