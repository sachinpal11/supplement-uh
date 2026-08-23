"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Logo } from "./Logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onOpenVerify: () => void;
  onExploreProducts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenVerify,
  onExploreProducts,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.refresh();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Background slow downward parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: "18%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // 2. Headline text upward speed parallax
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          y: "-30%",
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });
      }

      // 3. Bodybuilder Cutout subtle forward 3D depth parallax
      if (figureRef.current) {
        gsap.to(figureRef.current, {
          y: "8%",
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[68vh] hero-aspect-responsive min-[401px]:h-[88vh] md:h-[110vh] min-h-[480px] min-[401px]:min-h-[650px] md:min-h-[750px] max-h-[600px] min-[401px]:max-h-[715px] md:max-h-[1400px] overflow-hidden bg-[#0A0A0A] select-none"
    >
      {/* LAYER 1: Background Image (GSAP Responsive Parallax) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <Image
          src="/background-hero.png"
          alt="Industrial Gym Atmosphere"
          fill
          priority
          className="object-cover object-center brightness-100 saturate-100 scale-125"
        />
      </div>

      {/* LAYER 4: Hero Headline (z-10 - Behind Athlete Figure) */}
      <div
        ref={headlineRef}
        className="absolute top-[20%] min-[401px]:top-[23%] md:top-[18%] left-1/2 -translate-x-1/2 z-[10] pointer-events-none w-full text-center px-2 sm:px-4 will-change-transform"
      >
        <h1 className="font-bebas scale-110 min-[401px]:scale-125 sm:scale-100 text-[clamp(44px,12vw,220px)] md:text-[clamp(54px,14.5vw,220px)] font-bold leading-[0.82] sm:leading-[0.85] tracking-[2px] sm:tracking-[4px] uppercase text-[#F0EDE8]/[0.9] text-shadow-hero">
          <span className="">United</span>
          <br />
          HORMONE
        </h1>
      </div>

      {/* LAYER 5: Bodybuilder Figure Cutout (Compact for <= 400px, Larger for > 400px) */}
      <div
        ref={figureRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[20] w-full max-w-5xl md:max-w-7xl h-[60vh] min-[401px]:h-[72vh] md:h-[84vh] flex justify-center items-end pointer-events-none will-change-transform"
      >
        <div className="relative w-full h-full transform scale-[1.12] min-[401px]:scale-[1.28] md:scale-120 origin-bottom">
          <Image
            src="/bodybuilder-hero.png"
            alt="United Hormone Athlete"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* LAYER 6: Foreground UI Overlay Elements (z-30) */}
      <div className="absolute inset-0 z-[30] pointer-events-none">
        {/* Sub-headline */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[68%] min-[401px]:top-[74%] md:top-[78%] w-full px-4 text-center">
          <h2 className="text-[clamp(13px,1.9vw,32px)] md:text-[clamp(15px,2.2vw,32px)] font-medium leading-[1.3] tracking-[1.2px] sm:tracking-[1.8px] uppercase text-[#E8E4DD]/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            BUILT FOR THE STAGE.
            <br />
            ENGINEERED FOR THE ELITE.
          </h2>
        </div>

        {/* Dual Action Row (CTAs + Center Logo Anchor) */}
        <div className="absolute left-1/2 -mt-2 sm:mt-0 -translate-x-1/2 top-[80%] min-[401px]:top-[84%] md:top-[89%] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto w-full px-3">
          <button
            onClick={onExploreProducts}
            className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[2px] sm:tracking-[2.5px] text-[#0A0A0A] bg-white hover:bg-white/90 px-5 py-2 sm:px-6 sm:py-2.5 border border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
          >
            EXPLORE PRODUCTS
          </button>

          {/* Small Logo Anchor */}
          <div className="hidden sm:block flex-shrink-0">
            <Logo size="sm" showText={false} />
          </div>

          <button
            onClick={onOpenVerify}
            className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[2px] sm:tracking-[2.5px] text-white bg-[#0A0A0A]/80 hover:bg-white hover:text-[#0A0A0A] px-5 py-2 sm:px-6 sm:py-2.5 border border-white/60 hover:border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
          >
            VERIFY PRODUCT
          </button>
        </div>
      </div>
    </section>
  );
};
