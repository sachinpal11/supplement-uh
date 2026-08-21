"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const QualitySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.refresh();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Subtle background parallax depth
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: "12%",
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

      // Subtle content float
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: "-20px",
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

  return (
    <section
      ref={sectionRef}
      id="commitment"
      className="relative w-full h-[100vh] min-h-[640px] max-h-[1100px] flex items-center justify-center bg-black overflow-hidden select-none z-20 border-t border-white/10"
    >
      {/* Background Image Layer with Extended Padding for Parallax */}
      <div ref={bgRef} className="absolute -top-[10%] -bottom-[10%] inset-x-0 z-0 will-change-transform">
        <Image
          src="/thirdcomponent.png"
          alt="Built on Quality. Driven by Innovation."
          fill
          priority
          className="object-cover object-top brightness-80 saturate-100 scale-105"
          sizes="100vw"
        />
        {/* Dark Vignette Overlay for Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Centered Content Block (Big Heading + Paragraphs) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl w-full mx-auto px-6 text-center space-y-5 md:space-y-7 will-change-transform"
      >
        {/* Header Tag */}


        {/* Big Heading Text */}
        <h2 className="font-bebas text-[clamp(36px,5.2vw,72px)] leading-[1.02] tracking-wider uppercase text-white drop-shadow-[0_6px_35px_rgba(0,0,0,0.95)]">
          BUILT ON QUALITY. DRIVEN BY INNOVATION.
        </h2>

        {/* Accent Divider Rule */}

        {/* Paragraph Block */}
        <div className="max-w-3xl mx-auto space-y-4 font-sans text-[13px] md:text-[15px] text-[#E8E4DD]/95 leading-[1.75] tracking-wide font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center">
          <p>
            Our commitment begins with precision manufacturing and ends with customer confidence.
          </p>
          <p>
            Every formulation is developed using carefully selected ingredients and produced under controlled manufacturing conditions designed to maintain consistency, reliability, and product integrity.
          </p>
          <p>
            From research and quality assurance to secure authentication, every step reflects our commitment to delivering products that meet the highest expectations.
          </p>
        </div>

        {/* 4 Feature Cards Block (Monochrome Black & White, Big Icons, No Circle BG) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 pt-3 md:pt-5 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-black/70 backdrop-blur-md border border-white/15 p-4 md:p-5 rounded-none flex flex-col items-center justify-center text-center group hover:border-white hover:bg-black/95 transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-bebas text-xs md:text-sm tracking-[1.5px] uppercase font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
              PRECISION MANUFACTURING
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-black/70 backdrop-blur-md border border-white/15 p-4 md:p-5 rounded-none flex flex-col items-center justify-center text-center group hover:border-white hover:bg-black/95 transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.595 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="font-bebas text-xs md:text-sm tracking-[1.5px] uppercase font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
              SCIENTIFIC FORMULATION
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-black/70 backdrop-blur-md border border-white/15 p-4 md:p-5 rounded-none flex flex-col items-center justify-center text-center group hover:border-white hover:bg-black/95 transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="font-bebas text-xs md:text-sm tracking-[1.5px] uppercase font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
              STRICT QUALITY CONTROL
            </span>
          </div>

          {/* Card 4 */}
          <div className="bg-black/70 backdrop-blur-md border border-white/15 p-4 md:p-5 rounded-none flex flex-col items-center justify-center text-center group hover:border-white hover:bg-black/95 transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.9)]">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-bebas text-xs md:text-sm tracking-[1.5px] uppercase font-bold text-white/90 group-hover:text-white transition-colors leading-snug">
              SECURE BATCH AUTHENTICATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
