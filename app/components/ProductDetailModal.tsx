"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "./ProductCatalog";

export interface ProductDetailModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  // 2 distinct images for the Amazon/Flipkart gallery
  const galleryImages = [
    { src: product.image, label: "MAIN PRODUCT RENDER" },
    { src: "/thirdcomponent.png", label: "LAB FORMULATION CLOSEUP" },
  ];

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in">
      {/* Background Click to Dismiss */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Card (Fixed 90vh Height, Zero Scroll) */}
      <div className="bg-[#F3F2EE] text-[#0A0A0A] max-w-[1100px] w-full h-[90vh] max-h-[90vh] rounded-3xl overflow-hidden border border-black/15 shadow-2xl relative flex flex-col md:flex-row select-none">
        
        {/* Close Card Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/10 hover:bg-[#0A0A0A] hover:text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close product card"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Amazon/Flipkart E-Commerce Gallery (Hero Showcase Stage + 2 Small Thumbnails) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 md:p-6 bg-[#EAE8E3]/70 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 overflow-hidden">
          
          {/* Main Hero Showcase Stage */}
          <div className="w-full flex-1 bg-[#0A0A0A] rounded-2xl overflow-hidden relative border border-black/5 min-h-[220px]">
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={`${product.title} showcase`}
              fill
              className="object-cover transition-all duration-500"
              priority
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* 2 Small Thumbnail Selector Bar (Strict 1:1 Aspect Ratio) */}
          <div className="mt-3.5 flex items-center gap-3 flex-shrink-0">
            {galleryImages.map((imgItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`w-20 md:w-24 aspect-square bg-[#0A0A0A] rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? "border-[#0A0A0A] ring-2 ring-black/25 opacity-100 scale-[1.02]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgItem.src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Spec & Order Actions (Fits 90vh, Zero Scroll) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-between font-sans overflow-hidden">
          <div className="flex flex-col justify-between h-full">
            {/* Top Meta */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] md:text-[10px] font-sans font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                  IN STOCK
                </span>
                <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-[1px] text-black/50 uppercase">
                  100% AUTHENTIC
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-bebas text-3xl md:text-5xl leading-none uppercase tracking-wide text-[#0A0A0A] mb-2">
                {product.title}
              </h2>

              {/* Rating Bar */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-500 text-xs md:text-sm tracking-tight">★★★★★</div>
                <span className="font-sans text-xs font-bold text-[#0A0A0A]">
                  {product.rating.toFixed(2)}
                </span>
                <span className="text-xs text-black/50 font-sans">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>

              {/* SKU & Price */}
              <div className="flex items-center justify-between py-2.5 border-y border-black/10 text-xs font-sans uppercase tracking-wider my-3 text-black/70">
                <div>
                  <span className="text-black/40 block text-[9px]">PRODUCT SKU</span>
                  <span className="font-bold text-black">{product.sku}</span>
                </div>
                <div className="text-right">
                  <span className="text-black/40 block text-[9px]">PRICE</span>
                  <span className="font-bold text-black text-sm md:text-base">{product.price}</span>
                </div>
              </div>

              {/* Extended Details */}
              <div className="my-2">
                <h4 className="text-[10px] font-bold tracking-[1.5px] uppercase text-black/50 mb-1">
                  SPECIFICATIONS
                </h4>
                <p className="text-xs text-black/80 leading-relaxed font-sans line-clamp-3 md:line-clamp-4">
                  {product.desc} Formulated under pharmaceutical precision standards for peak biological purity, stability, and tissue-selective affinity.
                </p>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="pt-3 border-t border-black/10 mt-auto">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-[1.5px] text-black/70">
                  QUANTITY:
                </span>
                <div className="flex items-center border border-black/20 rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={handleQuantityDecrease}
                    className="w-8 h-8 flex items-center justify-center font-bold text-black hover:bg-black/10 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-bold text-xs font-sans">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleQuantityIncrease}
                    className="w-8 h-8 flex items-center justify-center font-bold text-black hover:bg-black/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy via WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  className="w-full sm:w-1/2 py-3 px-4 bg-[#0A0A0A] hover:bg-[#222222] text-white font-sans text-xs font-bold tracking-[2px] uppercase flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-black/10"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>ADD TO CART</span>
                </button>

                <button
                  type="button"
                  className="w-full sm:w-1/2 py-3 px-4 bg-[#25D366] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#25D366] font-sans text-xs font-extrabold tracking-[1.5px] uppercase flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-[#0A0A0A] group/waBtn"
                >
                  <svg className="w-4 h-4 fill-current text-[#0A0A0A] group-hover/waBtn:text-[#25D366] transition-colors" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
                  </svg>
                  <span>BUY VIA WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
