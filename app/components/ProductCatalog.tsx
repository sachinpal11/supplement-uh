"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductDetailModal } from "./ProductDetailModal";

gsap.registerPlugin(ScrollTrigger);

export interface ProductItem {
  id: string;
  title: string;
  subtitle?: string;
  sku: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  desc: string;
}

export interface ProductCatalogProps {
  title?: string;
  subtitle?: string;
  sectionNumber?: string;
  products?: ProductItem[];
}

const defaultProducts: ProductItem[] = [
  {
    id: "mk677",
    title: "Ibutamoren MK-677",
    subtitle: "UNITED HORMONE",
    sku: "UH-MK677-280",
    price: "$0.00",
    rating: 4.80,
    reviewsCount: 5,
    image: "/products/mk677.webp",
    desc: "High potency growth factor secretagogue engineered for lean muscle retention and cellular recovery.",
  },
  {
    id: "yk11",
    title: "Mutant YK-11",
    subtitle: "UNITED HORMONE",
    sku: "UH-YK11-MUTANT",
    price: "$0.00",
    rating: 4.40,
    reviewsCount: 5,
    image: "/products/yk11.webp",
    desc: "Advanced myostatin inhibitor compound formulated for dense muscular hypertrophy and strength output.",
  },
  {
    id: "mk2866",
    title: "Ostarine MK-2866",
    subtitle: "UNITED HORMONE",
    sku: "UH-MK2866-OST",
    price: "$0.00",
    rating: 4.40,
    reviewsCount: 5,
    image: "/products/mk2866.webp",
    desc: "Selective tissue-targeted anabolic agent designed for joint resilience and clean muscle preservation.",
  },
  {
    id: "bulkmass",
    title: "UNI-BULK MASS",
    subtitle: "UNITED HORMONE",
    sku: "UH-BULK-MASS",
    price: "$0.00",
    rating: 4.80,
    reviewsCount: 5,
    image: "/products/bulkmass.webp",
    desc: "Synergistic mass matrix engineered for rapid nitrogen retention and peak physical conditioning.",
  },
  {
    id: "lgd4033",
    title: "Ligandrol LGD-4033",
    subtitle: "UNITED HORMONE",
    sku: "UH-LGD4033-LIG",
    price: "$0.00",
    rating: 4.67,
    reviewsCount: 3,
    image: "/products/lgd4033.webp",
    desc: "Pharmaceutical-grade anabolic agonist for extreme muscle density, stamina, and structural integrity.",
  },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  title = "THE UNITED HORMONE CATALOG",
  subtitle = "UNITED HORMONE OFFICIAL COLLECTION",
  sectionNumber,
  products = defaultProducts,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxHeaderRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !parallaxHeaderRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(parallaxHeaderRef.current, {
        y: "25px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -330, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 330, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F3F2EE] text-[#0A0A0A] px-6 md:px-12 py-16 font-sans select-none overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Bar with Parallax Float */}
        <div ref={parallaxHeaderRef} className="mb-10 will-change-transform">
          <h2 className="font-bebas text-[clamp(36px,4vw,56px)] leading-none tracking-tight uppercase text-[#0A0A0A]">
            {title}
          </h2>
        </div>

        {/* Single Row Horizontal Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto gap-5 pb-4 pt-1 px-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="w-[280px] sm:w-[300px] md:w-[325px] flex-shrink-0 snap-start border border-[#0A0A0A]/12 bg-gradient-to-b from-[#FFFFFF] via-[#FAF9F5] to-[#EDE9E1] p-3.5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-[#0A0A0A]/40 cursor-pointer group relative shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              {/* Top Area: Luxury Product Image Frame */}
              <div>
                <div className="w-full aspect-square bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden rounded-xl border border-black/5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 768px) 280px, 325px"
                  />
                </div>

                {/* Content Area */}
                <div className="pt-3.5 pb-1 px-0.5 font-sans">
                  {/* Rating Badge Line */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-500 text-xs tracking-tighter">★★★★★</div>
                      <span className="font-sans text-[11px] font-bold text-[#0A0A0A]">{item.rating.toFixed(2)}</span>
                      <span className="text-[10px] text-black/40 font-sans">({item.reviewsCount})</span>
                    </div>
                    <span className="text-[9px] font-sans tracking-[1px] uppercase px-2 py-0.5 rounded-full bg-black/5 text-black/70 border border-black/5 font-semibold">
                      IN STOCK
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bebas text-xl md:text-[23px] leading-none uppercase tracking-wide text-[#0A0A0A] group-hover:text-black transition-colors">
                    {item.title}
                  </h3>

                  {/* SKU & Price */}
                  <div className="flex items-center justify-between text-[10px] font-sans tracking-wider text-black/50 uppercase mt-1.5 mb-2">
                    <span>{item.sku}</span>
                    <span className="font-sans font-bold text-[#0A0A0A] text-[11px]">{item.price}</span>
                  </div>

                  {/* Trust Footer Line */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-black/10 text-[10px] font-sans mt-2">
                    <span className="font-semibold tracking-wider uppercase text-black/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      No fake ratings
                    </span>
                    <span className="text-black/50 text-[9px] uppercase tracking-wider font-sans">
                      VERIFIED BATCH
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy via WhatsApp */}
              <div className="flex flex-col gap-2 mt-3.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(item);
                  }}
                  className="w-full py-2.5 px-3 bg-[#0A0A0A] hover:bg-[#222222] text-white font-sans text-[11px] font-bold tracking-[1.5px] uppercase flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-black/10"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>ADD TO CART</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(item);
                  }}
                  className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#25D366] font-sans text-[10px] font-extrabold tracking-[1.5px] uppercase flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-[#0A0A0A] group/wa"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-[#0A0A0A] group-hover/wa:text-[#25D366] transition-colors" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
                  </svg>
                  <span>BUY VIA WHATSAPP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Right Left & Right Scroll Controls */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="w-11 h-11 border border-black/20 bg-white hover:bg-[#0A0A0A] hover:text-white text-[#0A0A0A] flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
            aria-label="Previous Products"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            className="w-11 h-11 border border-black/20 bg-[#0A0A0A] text-white flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
            aria-label="Next Products"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Full Page Interactive Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
