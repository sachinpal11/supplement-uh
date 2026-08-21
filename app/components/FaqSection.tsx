"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category: "AUTHENTICITY" | "ORDERS";
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      number: "01",
      question: "How can I verify the authenticity of my United Hormone products?",
      answer:
        "Every official United Hormone formulation carries a unique lot batch serial code printed on the bottle assay label. You can verify your batch instantly by using our 'Verify Product' portal to access full third-party HPLC purity certification records.",
      category: "AUTHENTICITY",
    },
    {
      id: "faq-2",
      number: "02",
      question: "Are all compounds independently lab-tested for chemical purity?",
      answer:
        "Yes. Every production batch undergoes rigorous High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry testing. We guarantee >99.0% active pharmaceutical purity with zero heavy metals or synthetic fillers.",
      category: "AUTHENTICITY",
    },
    {
      id: "faq-3",
      number: "03",
      question: "How are orders packaged and dispatched for delivery?",
      answer:
        "All orders are packed in climate-controlled, tamper-evident sealed containers with plain, discreet outer packaging for privacy and safety. Detailed tracking info is issued via email/WhatsApp within 24 hours of dispatch.",
      category: "ORDERS",
    },
    {
      id: "faq-4",
      number: "04",
      question: "How can I get direct support or inquire about bulk orders?",
      answer:
        "You can reach our dedicated technical support team directly through our WhatsApp portal or verification desk for immediate assistance regarding order status, batch documentation, or compound specifications.",
      category: "ORDERS",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} id="faq" className="relative w-full min-h-[780px] sm:min-h-[840px] flex flex-col justify-center bg-[#0A0A0A] text-white px-6 md:px-12 py-20 md:py-28 font-sans select-none overflow-hidden border-t border-white/10">
      {/* Background Image Layer with GSAP ScrollTrigger Parallax (faq-section-bg.png) */}
      <div ref={bgRef} className="absolute -top-[20%] -bottom-[20%] inset-x-0 z-0 will-change-transform">
        <Image
          src="/faq-section-bg.png"
          alt="FAQ Section Background"
          fill
          priority
          className="object-cover object-center opacity-90 brightness-90 scale-105"
          sizes="100vw"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 pointer-events-none" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-10 md:mb-14 justify-center pb-4">
          <h2 className="font-bebas text-4xl sm:text-5xl text-center md:text-6xl leading-none uppercase tracking-tight text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* Minimalist Accordion List with Fixed Container Height */}
        <div className="space-y-4 min-h-[460px] sm:min-h-[500px]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border transition-all duration-300 rounded-2xl overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? "bg-gradient-to-b from-[#1E1E1E]/90 via-[#121212]/90 to-[#080808]/90 border-white/40 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
                    : "bg-gradient-to-b from-[#161616]/75 via-[#0D0D0D]/75 to-[#050505]/75 border-white/15 hover:border-white/35 hover:from-[#1C1C1C]/85 hover:to-[#090909]/85"
                }`}
              >
                {/* Accordion Header Toggle */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    <span className="font-sans text-xs sm:text-sm font-bold text-white/40 pt-0.5">
                      {faq.number}
                    </span>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-white leading-snug tracking-tight">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Plus / Minus Indicator Icon */}
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "bg-white text-black border-white rotate-180"
                        : "bg-white/10 text-white border-white/20 group-hover:bg-white/20"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"}
                      />
                    </svg>
                  </div>
                </button>

                {/* Collapsible Answer Box */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 md:px-7 pb-6 pt-1 text-xs sm:text-sm text-white/80 font-sans leading-relaxed border-t border-white/10">
                      <p className="max-w-2xl">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
