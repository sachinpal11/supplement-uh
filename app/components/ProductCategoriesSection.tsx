"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProductCategoriesSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mouseY, setMouseY] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.refresh();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  const categories = [
    {
      id: "anabolics",
      number: "01",
      name: "ANABOLICS",
      tag: "8+",
      url: "https://unitedhormone.com/wp-content/uploads/2026/01/Ibutamoren-MK-677-United-Hormone-280x280.webp",
      image: "/anabolics-category.webp",
    },
    {
      id: "sarms",
      number: "02",
      name: "SARMS",
      tag: "4+",
      url: "https://unitedhormone.com/wp-content/uploads/2026/06/Mast-P-100-United-Hormone-280x280.webp",
      image: "/sarms-category.webp",
    },
    {
      id: "peptides",
      number: "03",
      name: "PEPTIDES",
      tag: "6+",
      url: "https://unitedhormone.com/wp-content/uploads/2026/06/Boldenone-250-United-Hormone-280x280.webp",
      image: "/peptides-category.webp",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rightColRef.current) {
      const rect = rightColRef.current.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      setMouseY(relativeY);
    }
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-[#F3F2EE] text-[#0A0A0A] font-sans select-none overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* Left Side: Dark Hero Image with Parallax Movement */}
        <div className="relative bg-[#0A0A0A] p-8 md:p-14 lg:p-16 flex flex-col justify-between min-h-[550px] lg:min-h-screen overflow-hidden">
          {/* Parallax Background Container */}
          <div ref={bgRef} className="absolute -top-[15%] -bottom-[15%] inset-x-0 z-0 will-change-transform">
            <Image
              src="/component-five-background2.png"
              alt="Performance x Product"
              fill
              className="object-cover object-center opacity-100 scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-black/80 z-10" />
          </div>

          {/* Top Heading (Stays Stationary) */}
          <div className="relative z-20 text-left">
            <h2 className="font-bebas text-4xl md:-ml-10 md:-mt-10 sm:text-6xl md:text-7xl leading-[0.88] uppercase tracking-wider text-white text-left">
              PERFORMANCE
              <br />
              x PRODUCT
            </h2>
          </div>

          {/* Bottom Paragraph (Stays Stationary) */}
          <div className="relative z-20 mt-auto pt-10">
            <p className="text-xs md:text-sm text-white/85 font-sans leading-relaxed max-w-md">
              Hardcore athlete mindset built on precision engineering, pharmaceutical integrity, and peak athletic performance.
            </p>
          </div>
        </div>

        {/* Right Side: Product Types List with Floating 1:1 Image Y-Follower */}
        <div
          ref={rightColRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCategory(null)}
          className="relative bg-[#F3F2EE] text-[#0A0A0A] p-8 md:p-14 lg:p-16 flex flex-col justify-start min-h-[550px] lg:min-h-screen overflow-hidden"
        >
          {/* Header */}
          <div className="mb-6 md:mb-8 pb-4">
            <h2 className="font-bebas mb-10 mt-5 text-4xl sm:text-5xl md:text-6xl leading-none uppercase tracking-tight text-[#0A0A0A]">
              PRODUCT TYPES
            </h2>
          </div>

          {/* Clean 3 Category Name Rows (No Dropdown, No Description) */}
          <div className="flex flex-col space-y-1 relative z-10">
            {categories.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredCategory(item.id)}
                className="group py-4 sm:py-5 md:py-6 border-b border-black/15 flex items-center justify-between transition-all duration-300 hover:pl-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4">

                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl leading-none uppercase tracking-wide text-[#0A0A0A] group-hover:text-black transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Clean Circular Arrow Action Button */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Floating 1:1 Aspect Ratio Preview Image with Top-Right Tag on Image */}
          <div
            className={`absolute right-6 md:right-14 z-20 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 aspect-square rounded-2xl overflow-hidden border-2 border-black/20 shadow-2xl bg-black pointer-events-none transition-opacity duration-200 ${hoveredCategory ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            style={{
              top: 0,
              transform: `translateY(${Math.max(30, Math.min(mouseY - 128, 500))}px)`,
              transition: "transform 0.08s ease-out, opacity 0.2s ease-out, scale 0.2s ease-out",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`absolute inset-0 transition-opacity duration-300 ${hoveredCategory === cat.id ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                {/* Top-Right Tag Badge directly ON the image */}
                <span className="absolute top-3 right-3 z-10 font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-full bg-[#0A0A0A]/90 text-white border border-white/20 backdrop-blur-md shadow-lg">
                  {cat.tag}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
