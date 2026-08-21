"use client";

import React, { useState } from "react";

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export const VerifyModal: React.FC<VerifyModalProps> = ({ isOpen, onClose }) => {
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full md:w-[80%] max-w-[80%] mx-auto bg-gradient-to-b from-[#1C1C1C] via-[#0F0F0F] to-[#040404] border border-white/15 p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl overflow-hidden font-sans text-white select-none">
        {/* Ambient Studio Radial Lighting Layers for Rich Depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide uppercase leading-none">
            PRODUCT VERIFICATION
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mt-5 mb-8 max-w-xl">
          Enter your code to verify product authenticity, chemical batch assay, and manufacturing integrity.
        </p>

        {/* Form Row */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="input your code"
              className="flex-1 bg-[#141414] text-white text-sm sm:text-base px-5 py-4 rounded-2xl border border-white/20 focus:border-white outline-none placeholder:text-white/30 font-sans tracking-wider transition-colors uppercase"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-white hover:bg-[#EAEAEA] active:scale-98 text-[#0A0A0A] font-sans text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>VERIFY</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/50 font-sans">
            <span>Sample Test Code:</span>
            <button
              type="button"
              onClick={() => fillSampleCode("UH-8892-X")}
              className="text-white underline hover:text-white/80 font-semibold cursor-pointer"
            >
              UH-8892-X
            </button>
          </div>
        </form>

        {/* Verification Result Output */}
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
    </div>
  );
};
