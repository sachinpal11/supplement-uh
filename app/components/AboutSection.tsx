"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.refresh();

    const mm = gsap.matchMedia();

    // Apply parallax effects exclusively on desktop screens (>= 768px)
    mm.add("(min-width: 768px)", () => {
      // 1. Top-Left Absolute Image Parallax
      if (image1Ref.current) {
        gsap.to(image1Ref.current, {
          y: "-200px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // 2. Center Text Block Parallax
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y: "-25px",
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

      // 3. Bottom-Right Absolute Image Parallax
      if (image2Ref.current) {
        gsap.to(image2Ref.current, {
          y: "-250px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
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
      id="about"
      data-scroll-section
      className="relative w-full h-[100vh] min-h-[640px] max-h-[1050px] bg-black text-white px-6 md:px-12 py-8 flex flex-col justify-center items-center font-sans border-t border-white/10 select-none overflow-visible"
    >
      <div className="max-w-[1240px] w-full mx-auto relative flex items-center justify-center min-h-[480px]">

        {/* TOP-LEFT ABSOLUTE IMAGE (Locomotive scroll-speed -3.5, 4:3 aspect ratio) */}
        <div
          ref={image1Ref}
          data-scroll
          data-scroll-speed="-3.5"
          className="absolute -top-12 left-2 sm:left-4 md:top-10 md:left-4 lg:left-8 w-[170px] sm:w-[220px] md:w-[270px] aspect-[4/3] z-10 will-change-transform"
        >
          <div className="relative w-full h-full bg-black border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            <Image
              src="/macro-shoulder.jpg"
              alt="Muscle detail - Deltoid striations"
              fill
              priority
              className="object-cover rounded-none transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 60vw, 25vw"
            />
          </div>
        </div>

        {/* CENTERED TEXT CONTAINER (Main Statement + Body Text) */}
        <div
          ref={headingRef}
          data-scroll
          data-scroll-speed="-0.5"
          className="relative text-center max-w-5xl mx-auto px-4 z-20 will-change-transform"
        >
          <h3 className="font-bebas text-[clamp(32px,4.8vw,60px)] leading-[1.02] tracking-wider uppercase text-white drop-shadow-[0_6px_35px_rgba(0,0,0,0.95)]">
            THE PHYSIQUE IS THE RESULT.
            <br />
            <span className="text-white/90">THE DISCIPLINE IS THE DIFFERENCE.</span>
          </h3>

          <p className="mt-5 md:mt-7 max-w-lg mx-auto text-[12px] md:text-[13px] text-[#9CA3AF] leading-[1.65] tracking-wide font-sans text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The relentless pursuit of perfection. The discipline is the armor against average. True physiological transformation occurs in the spaces between comfort and failure.
          </p>
        </div>

        {/* BOTTOM-RIGHT ABSOLUTE IMAGE (Locomotive scroll-speed -5.5, 4:3 aspect ratio) */}
        <div
          ref={image2Ref}
          data-scroll
          data-scroll-speed="-5.5"
          className="absolute -bottom-12 right-2 sm:right-4 md:-bottom-25 md:right-4 lg:right-8 w-[170px] sm:w-[220px] md:w-[270px] aspect-[4/3] z-10 will-change-transform"
        >
          <div className="relative w-full h-full bg-black border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            <Image
              src="/macro-chest.jpg"
              alt="Muscle detail - Chest striations"
              fill
              className="object-cover rounded-none transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 60vw, 25vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
