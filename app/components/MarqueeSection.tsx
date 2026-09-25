"use client";

import React, { useEffect, useRef } from "react";

export const MarqueeSection: React.FC = () => {
  const marqueeWords = [
    "STRENGTH",
    "DISCIPLINE",
    "INTENSITY",
    "FOCUS",
    "POWER",
    "DRIVE",
    "COMMITMENT",
    "PROGRESS",
    "ENDURANCE",
    "RESOLVE",
    "DEDICATION",
    "LIMITLESS",
    "RAW",
    "UNSTOPPABLE",
    "NO LIMIT"
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let xPos = 0;

    // Slow, calm baseline speed when scrolling has stopped
    const BASE_SPEED = 0.45;
    let targetSpeed = BASE_SPEED;
    let currentSpeed = BASE_SPEED;

    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Accelerate smoothly proportional to scroll velocity
      const velocity = Math.min(delta * 0.12, 6);
      targetSpeed = BASE_SPEED + velocity;

      // When scrolling stops, smoothly ease targetSpeed back to the slow BASE_SPEED
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetSpeed = BASE_SPEED;
      }, 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      // Smooth deceleration / acceleration interpolation (lerp)
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      if (!isHoveredRef.current) {
        xPos -= currentSpeed;
      }

      // Seamless wrap-around at 50% width
      const totalWidth = track.scrollWidth / 2;
      if (totalWidth > 0) {
        if (xPos <= -totalWidth) {
          xPos += totalWidth;
        } else if (xPos > 0) {
          xPos -= totalWidth;
        }
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Repeated sets of words for seamless continuous looping
  const items = [
    ...marqueeWords,
    ...marqueeWords,
    ...marqueeWords,
    ...marqueeWords,
  ];

  return (
    <section className="relative w-full py-8 md:py-14 bg-black overflow-hidden select-none z-30 -mt-20">
      {/* Tilted Marquee Banner */}
      <div className="w-[115%] -left-[7.5%] relative bg-gradient-to-b from-[#1C1C1C] via-[#0E0E0E] to-[#050505] py-4 md:py-5 transform -rotate-2 scale-105 overflow-hidden flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
        <div
          ref={trackRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          className="flex items-center gap-8 md:gap-12 whitespace-nowrap will-change-transform cursor-default"
        >
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
