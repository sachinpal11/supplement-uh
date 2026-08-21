"use client";

import React, { useState } from "react";

interface VerificationResult {
  code: string;
  verified: boolean;
  productName: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  hplcConcentration: string;
  purity: string;
  sealStatus: string;
}

export const VerifySection: React.FC = () => {
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setLoading(true);
    setSearched(false);

    setTimeout(() => {
      const codeClean = inputCode.trim().toUpperCase();
      setLoading(false);
      setSearched(true);

      if (codeClean.includes("UH") || codeClean.length >= 4) {
        setResult({
          code: codeClean,
          verified: true,
          productName: "TEST-MAX 250 (TESTOSTERONE ENANTHATE)",
          batchNumber: `BATCH #${codeClean}-2026-X`,
          mfgDate: "JAN 2026",
          expDate: "JAN 2029",
          hplcConcentration: "250.4 MG / ML",
          purity: "99.85%",
          sealStatus: "AUTHENTIC & VERIFIED — PASS",
        });
      } else {
        setResult({
          code: codeClean,
          verified: false,
          productName: "UNREGISTERED SERIAL NUMBER",
          batchNumber: "UNVERIFIED",
          mfgDate: "N/A",
          expDate: "N/A",
          hplcConcentration: "0.00%",
          purity: "0.00%",
          sealStatus: "UNAUTHORIZED CODE — CAUTION",
        });
      }
    }, 600);
  };

  const fillSampleCode = (code: string) => {
    setInputCode(code);
  };

  return (
    <section id="verify" className="w-full bg-[#F3F2EE] text-[#0A0A0A] px-6 md:px-12 py-16 -mt-20 font-sans select-none ">
      {/* 80% Width Verification Card Container with Multi-Shade Dark Gradient & Depth */}
      <div className="relative w-full md:w-[80%] max-w-[80%] mx-auto bg-gradient-to-b from-[#1C1C1C] via-[#0F0F0F] to-[#040404] border border-white/15 p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl overflow-hidden font-sans text-white">
        {/* Ambient Studio Radial Lighting Layers for Rich Depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Header Bar */}
        <div className="pb-4">
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase leading-none">
            PRODUCT VERIFICATION
          </h2>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mt-5 mb-8 max-w-xl">
          Enter your code to verify product authenticity, chemical batch assay, and manufacturing integrity.
        </p>

        {/* Form Row */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Input Field: Strictly Black & White with Theme Font */}
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="input your code"
              className="flex-1 bg-[#141414] text-white text-sm sm:text-base px-5 py-4 rounded-2xl border border-white/20 focus:border-white outline-none placeholder:text-white/30 font-sans tracking-wider transition-colors uppercase"
            />

            {/* Submit Action Button: Black & White Theme */}
            <button
              type="submit"
              disabled={loading}
              className="bg-white hover:bg-[#EAEAEA] active:scale-98 text-[#0A0A0A] font-sans text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              {loading ? (
                <span className="inline-block font-extrabold w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>VERIFY</span>

                </>
              )}
            </button>
          </div>

          {/* Sample Code Button */}

        </form>

        {/* Verification Result Output: Strictly Black & White */}
        {searched && result && (
          <div
            className="mt-8 p-5 sm:p-6 rounded-2xl border border-white/20 bg-white/5 text-white transition-all animate-fade-in"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${result.verified ? "bg-white animate-pulse" : "bg-white/40"
                    }`}
                />
                <span className="font-bebas text-xl sm:text-2xl text-white tracking-wide uppercase">
                  {result.sealStatus}
                </span>
              </div>
              <span className="text-xs font-sans text-white/50 tracking-wider">{result.code}</span>
            </div>

            {result.verified ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">PRODUCT NAME</span>
                  <span className="text-white font-bold">{result.productName}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">BATCH SERIAL</span>
                  <span className="text-white font-semibold">{result.batchNumber}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">HPLC PURITY</span>
                  <span className="text-white font-bold">{result.purity}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider mb-0.5">CONCENTRATION</span>
                  <span className="text-white font-semibold">{result.hplcConcentration}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Warning: The serial code entered is not registered in our lab database. Please inspect your package seal or contact support.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
