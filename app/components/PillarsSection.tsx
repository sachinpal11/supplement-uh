"use client";

import React, { useState } from "react";

export const PillarsSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillarsData = [
    {
      number: "01",
      title: "PRECISION",
      subtitle: "HPLC SPECIFICATION & DOSING EXACTNESS",
      tagline: "MICRONIZED PURITY TO 99.8% STANDARDS",
      content:
        "Every batch undergoes High-Performance Liquid Chromatography (HPLC) testing and Gas Chromatography-Mass Spectrometry (GC-MS) assay validation. We guarantee exact active pharmaceutical ingredient (API) concentrations with zero variance between vials.",
      metrics: [
        { label: "ASSAY PURITY", value: "99.85%" },
        { label: "DOSING VARIANCE", value: "±0.01%" },
        { label: "HEAVY METAL TEST", value: "PASSED (ND)" },
        { label: "HPLC METHODOLOGY", value: "USP-NF 42" },
      ],
    },
    {
      number: "02",
      title: "CONSISTENCY",
      subtitle: "STERILE ISO 5 CLEANROOM MANUFACTURING",
      tagline: "ZERO BATCH-TO-BATCH FLUCTUATION",
      content:
        "Manufactured strictly within ISO 5 certified sterile cleanroom facilities utilizing 0.22-micron pharmaceutical membrane filtration. Our carrier media is cold-pressed, refined sesame oil engineered for optimal viscosity and zero injection site inflammation.",
      metrics: [
        { label: "CLEANROOM RATING", value: "ISO CLASS 5" },
        { label: "FILTRATION MEMBRANE", value: "0.22 MICRON" },
        { label: "ENDOTOXIN LEVEL", value: "< 0.05 EU/mL" },
        { label: "STERILITY TESTING", value: "14-DAY INCUBATION" },
      ],
    },
    {
      number: "03",
      title: "CONTROL",
      subtitle: "CRYPTOGRAPHIC ANTI-COUNTERFEIT PROTOCOL",
      tagline: "END-TO-END SUPPLY CHAIN VERIFICATION",
      content:
        "Each unit features an individual tamper-evident holographic seal encoding a 128-bit cryptographic hash. Athletes can instantly query our global verification database to validate lot origin, COA laboratory certificates, and production dates.",
      metrics: [
        { label: "AUTHENTICATION HASH", value: "SHA-256 ENCRYPTED" },
        { label: "SEAL INTEGRITY", value: "TAMPER-EVIDENT" },
        { label: "TRACEABILITY", value: "BATCH LEVEL" },
        { label: "GLOBAL DATABASE", value: "24/7 LIVE QUERY" },
      ],
    },
  ];

  return (
    <section id="pillars" className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] border-t border-[#2D2D2D]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#C8B84D]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#C8B84D]">
              02 / THE METHODOLOGY
            </span>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-[2px] text-[#F0EDE8]">
            THE THREE PILLARS OF DISCIPLINE
          </h2>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pillarsData.map((pillar, idx) => (
            <div
              key={pillar.number}
              onClick={() => setActivePillar(idx)}
              className={`p-8 border transition-all duration-300 cursor-pointer ${
                activePillar === idx
                  ? "bg-[#1A1A1A] border-[#C8B84D] shadow-[0_0_30px_rgba(200,184,77,0.1)]"
                  : "bg-[#0A0A0A] border-[#2D2D2D] hover:border-white/20"
              }`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-bebas text-5xl md:text-6xl text-[#C8B84D]/40 font-bold">
                  {pillar.number}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#C8B84D]">
                  {pillar.subtitle}
                </span>
              </div>

              <h3 className="font-bebas text-3xl text-[#F0EDE8] tracking-[2px] mb-2">
                {pillar.title}
              </h3>
              <p className="text-[11px] font-mono text-[#C8B84D] uppercase tracking-wider mb-4">
                {pillar.tagline}
              </p>
              <p className="text-xs text-white/60 leading-relaxed font-sans mb-6">
                {pillar.content}
              </p>

              {/* Metrics grid inside card */}
              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-3 font-mono text-[10px]">
                {pillar.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-white/40 block">{m.label}</span>
                    <span className="text-[#F0EDE8] font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
