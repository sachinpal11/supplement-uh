"use client";

import React from "react";

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      quote:
        "When competing at the IFBB Pro level, lab integrity is everything. United Hormone's HPLC batch testing gives me 100% confidence in exact dosage consistency every week of prep.",
      athlete: "MARCUS 'TITAN' VANCE",
      title: "IFBB HEAVYWEIGHT PRO ATHLETE",
      category: "CONTEST PREP CYCLE",
      rating: "5.0 / 5.0",
      verifiedBatch: "UH-8892-X",
    },
    {
      id: 2,
      quote:
        "Zero pip, unmatched carrier oil clarity, and predictable serum blood levels. United Hormone set the standard for what pharmaceutical execution should be.",
      athlete: "DR. ALEXEI PETROV",
      title: "SPORTS PHYSIOLOGY & ENDOCRINOLOGY SPECIALIST",
      category: "LABORATORY ANALYSIS",
      rating: "5.0 / 5.0",
      verifiedBatch: "UH-9042-X",
    },
    {
      id: 3,
      quote:
        "The anti-counterfeit scratch code system gives our athletes absolute security. We scan every batch before it enters our competition training camp protocol.",
      athlete: "VICTOR HENDERSON",
      title: "HEAD COACH, APEX PERFORMANCE LABS",
      category: "TEAM VERIFICATION",
      rating: "5.0 / 5.0",
      verifiedBatch: "UH-4410-Z",
    },
  ];

  return (
    <section id="reviews" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] border-t border-[#2D2D2D]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2D2D2D]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#C8B84D]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#C8B84D]">
                03 / ATHLETE TESTIMONIALS
              </span>
            </div>
            <h2 className="font-bebas text-4xl md:text-6xl tracking-[2px] text-[#F0EDE8]">
              VERIFIED ATHLETE REVIEWS
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-white/50">
            AGGREGATE ATHLETE RATING: <span className="text-[#C8B84D] font-bold">5.0 / 5.0 STAR ASSAY</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1A1A1A] border border-[#2D2D2D] p-8 flex flex-col justify-between relative group hover:border-[#C8B84D]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-[10px] font-mono text-[#C8B84D] tracking-wider uppercase">
                    {rev.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    VERIFIED BATCH {rev.verifiedBatch}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#F0EDE8]/90 italic leading-relaxed mb-6 font-sans">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bebas text-xl text-[#F0EDE8] tracking-[1.5px] group-hover:text-[#C8B84D] transition-colors">
                  {rev.athlete}
                </h4>
                <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                  {rev.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
