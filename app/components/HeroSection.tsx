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

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };

        // Background Parallax
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            y: isMobile ? "12%" : "25%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        // Hero Headline Parallax
        if (headlineRef.current) {
          gsap.to(headlineRef.current, {
            y: isMobile ? "20%" : "35%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        // Athlete Figure Parallax
        if (figureRef.current) {
          gsap.to(figureRef.current, {
            y: isMobile ? "6%" : "12%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[80vh] hero-aspect-responsive sm:h-[75vh] md:h-[110vh] min-h-[300px] sm:min-h-[550px] max-h-[1200px] overflow-hidden bg-[#0A0A0A] select-none"
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
          className="object-cover object-center brightness-100 saturate-100 scale-135"
        />
      </div>

      {/* LAYER 4: Hero Headline (z-10 - Behind Athlete Figure) */}
      <div
        ref={headlineRef}
        className="absolute top-[25%] sm:top-[16%] md:top-[18%] left-1/2 -translate-x-1/2 z-[10] pointer-events-none w-full text-center px-2 sm:px-4 will-change-transform"
      >
        <h1 className="font-bebas scale-125 sm:scale-100 text-[clamp(54px,14.5vw,220px)] font-bold leading-[0.82] sm:leading-[0.85] tracking-[2px] sm:tracking-[4px] uppercase text-[#F0EDE8]/[0.9] text-shadow-hero">
          PRECISION
          <br />
          OVER <span className="md:ml-10">HYPE</span>
        </h1>
      </div>

      {/* LAYER 5: Bodybuilder Figure Cutout (z-20 - OVER Headline Text) */}
      <div
        ref={figureRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[20] w-full max-w-5xl md:max-w-7xl h-[80vh] md:h-[84vh] flex justify-center items-end pointer-events-none will-change-transform"
      >
        <div className="relative w-full h-full transform scale-[1.45] sm:scale-115 md:scale-120 origin-bottom">
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
        <div className="absolute left-1/2 -translate-x-1/2 top-[74%] sm:top-[76%] md:top-[78%] w-full px-4 text-center">
          <h2 className="text-[clamp(15px,2.2vw,32px)] font-medium leading-[1.3] tracking-[1.2px] sm:tracking-[1.8px] uppercase text-[#E8E4DD]/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            BUILT FOR THE DISCIPLINE
            <br />
            BEHIND THE PHYSIQUE.
          </h2>
        </div>

        {/* Dual Action Row (CTAs + Center Logo Anchor) */}
        <div className="absolute left-1/2 -mt-5 sm:mt-0 -translate-x-1/2 top-[86%] sm:top-[88%] md:top-[89%] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto w-full px-3">
          <button
            onClick={onExploreProducts}
            className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[2px] sm:tracking-[2.5px] text-[#0A0A0A] bg-white hover:bg-white/90 px-5 py-2.5 sm:px-6 sm:py-2.5 border border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
          >
            EXPLORE PRODUCTS

          </button>

          {/* Small Logo Anchor */}
          <div className="hidden sm:block flex-shrink-0">
            <Logo size="sm" showText={false} />
          </div>

          <button
            onClick={onOpenVerify}
            className="text-[11px] sm:text-[12px] md:text-[13px] font-bold uppercase tracking-[2px] sm:tracking-[2.5px] text-white bg-[#0A0A0A]/80 hover:bg-white hover:text-[#0A0A0A] px-5 py-2.5 sm:px-6 sm:py-2.5 border border-white/60 hover:border-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
          >
            VERIFY PRODUCT

          </button>
        </div>
      </div>
    </section>
  );
};
