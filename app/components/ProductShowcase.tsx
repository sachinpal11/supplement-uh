"use client";

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  chemical: string;
  category: "injectable" | "oral" | "pct";
  concentration: string;
  purity: string;
  halfLife: string;
  batchCode: string;
  description: string;
  rating: number;
}

interface ProductShowcaseProps {
  onVerifyCode: (code: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onVerifyCode }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const products: Product[] = [
    {
      id: "prod-1",
      name: "TEST-MAX 250",
      chemical: "TESTOSTERONE ENANTHATE USP",
      category: "injectable",
      concentration: "250 MG / ML",
      purity: "99.85%",
      halfLife: "7.0 DAYS",
      batchCode: "UH-8892-X",
      description: "Pharmaceutical-grade androgenic foundation formulated in pharmaceutical-grade sesame carrier oil for precision bioavailability.",
      rating: 5.0,
    },
    {
      id: "prod-2",
      name: "ANAVAR-30",
      chemical: "OXANDROLONE ULTRA-MICRONIZED",
      category: "oral",
      concentration: "30 MG / TAB",
      purity: "99.92%",
      halfLife: "9.0 HOURS",
      batchCode: "UH-4410-Z",
      description: "Ultra-pure anabolic compound engineered for maximum lean muscle retention and dense vascularity without water retention.",
      rating: 4.9,
    },
    {
      id: "prod-3",
      name: "TREN-E 200",
      chemical: "TRENBOLONE ENANTHATE",
      category: "injectable",
      concentration: "200 MG / ML",
      purity: "99.78%",
      halfLife: "8.0 DAYS",
      batchCode: "UH-9042-X",
      description: "Elite anabolic conditioning matrix for extreme muscle hardness, nutrient partitioning, and explosive strength output.",
      rating: 5.0,
    },
    {
      id: "prod-4",
      name: "MAST-100",
      chemical: "DROSTANOLONE PROPIONATE",
      category: "injectable",
      concentration: "100 MG / ML",
      purity: "99.89%",
      halfLife: "2.5 DAYS",
      batchCode: "UH-1102-M",
      description: "Anti-estrogenic hardening formulation designed for stage-ready muscle dryness and granitic conditioning.",
      rating: 4.9,
    },
    {
      id: "prod-5",
      name: "PRIMO-150",
      chemical: "METHENOLONE ENANTHATE",
      category: "injectable",
      concentration: "150 MG / ML",
      purity: "99.94%",
      halfLife: "10.0 DAYS",
      batchCode: "UH-7733-P",
      description: "Premium smooth anabolic formulation providing consistent nitrogen retention with minimal side-effect profile.",
      rating: 5.0,
    },
    {
      id: "prod-6",
      name: "PCT-RESTORE",
      chemical: "CLOMIPHENE + TAMOXIFEN MATRIX",
      category: "pct",
      concentration: "50 MG / 20 MG",
      purity: "99.90%",
      halfLife: "24.0 HOURS",
      batchCode: "UH-3390-C",
      description: "Synergistic post-cycle recovery matrix formulated to rapidly reactivate endogenous HPTA axis signaling.",
      rating: 4.8,
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] border-t border-[#2D2D2D]">
      {/* Background Section Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1B2A4A]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#2D2D2D]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#C8B84D]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#C8B84D]">
                01 / PRECISION FORMULATIONS
              </span>
            </div>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-[2px] text-[#F0EDE8]">
              PHARMACEUTICAL CATALOG
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {[
              { id: "all", label: "ALL FORMULATIONS" },
              { id: "injectable", label: "INJECTABLES" },
              { id: "oral", label: "ORAL MATRIX" },
              { id: "pct", label: "RECOVERY / PCT" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`text-[11px] font-semibold tracking-[2px] uppercase px-4 py-2 transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[#C8B84D] text-[#0A0A0A]"
                    : "bg-[#1A1A1A] text-white/60 hover:text-white border border-[#2D2D2D]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#C8B84D]/60 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              {/* Corner Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#C8B84D] uppercase">
                  {product.category}
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  HPLC {product.purity}
                </span>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="font-bebas text-2xl md:text-3xl text-[#F0EDE8] tracking-[1.5px] group-hover:text-[#C8B84D] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[11px] font-mono text-[#C8B84D]/90 mb-3 tracking-wider">
                  {product.chemical}
                </p>
                <p className="text-xs text-white/60 leading-relaxed mb-6 font-sans">
                  {product.description}
                </p>
              </div>

              {/* Product Technical Specs Table */}
              <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-white/60">
                  <span>CONCENTRATION:</span>
                  <span className="text-[#F0EDE8] font-semibold">{product.concentration}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>ACTIVE HALF-LIFE:</span>
                  <span className="text-[#F0EDE8]">{product.halfLife}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>LOT BATCH SERIAL:</span>
                  <span className="text-[#C8B84D] font-bold">{product.batchCode}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onVerifyCode(product.batchCode)}
                className="mt-6 w-full bg-[#0A0A0A] hover:bg-[#C8B84D] text-[#C8B84D] hover:text-[#0A0A0A] border border-[#C8B84D]/40 hover:border-[#C8B84D] py-3 text-[11px] font-semibold uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VERIFY BATCH ASSAY</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
