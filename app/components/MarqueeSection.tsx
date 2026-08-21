"use client";

import React from "react";

export const MarqueeSection: React.FC = () => {
  const marqueeWords = [
    "PRECISION",
    "PERFORMANCE",
    "QUALITY",
    "EXCELLENCE",
    "INNOVATION",
    "RELIABILITY",
    "AUTHENTICITY",
    "INTEGRITY",
    "CONSISTENCY",
    "TRUST",
    "CONFIDENCE",
    "ADVANCED",
    "SCIENTIFIC",
    "PROFESSIONAL",
    "PREMIUM",
  ];

  // Repeat items for seamless infinite scroll
  const items = [...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <section className="relative w-full py-8 md:py-14 bg-black overflow-hidden select-none z-30 -mt-20">
      {/* Tilted Marquee Banner with top-to-bottom dark gradient shading */}
      <div className="w-[115%] -left-[7.5%] relative bg-gradient-to-b from-[#1C1C1C] via-[#0E0E0E] to-[#050505] py-4 md:py-5 transform -rotate-2 scale-105 overflow-hidden flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
        <div className="animate-marquee flex items-center gap-8 md:gap-12 whitespace-nowrap">
          {items.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="font-bebas text-2xl md:text-4xl lg:text-5xl tracking-[3px] uppercase font-bold text-[#E8E4DD]/85 hover:text-white transition-colors"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
