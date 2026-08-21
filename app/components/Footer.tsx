"use client";

import React from "react";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenVerify: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVerify, onOpenLogin }) => {
  return (
    <footer id="contact" className="relative w-full bg-[#050505] text-white pt-20 md:pt-24 pb-6 px-6 md:px-12 font-sans select-none overflow-hidden border-t border-white/10">

      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Footer Links Grid (Balanced 4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-16 border-b border-white/10">

          {/* Column 1: Brand Logo & Tagline */}
          <div className="space-y-4">
            <Logo size="lg" showText={false} />
            <p className="text-xs text-white/50 leading-relaxed font-sans max-w-xs">
              Specialized pharmaceutical research brand dedicated to precision formulations and verified batch purity.
            </p>

          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              QUICK ACCESS
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/60 font-sans">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Overview &amp; Mission
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Featured Formulations
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-white transition-colors">
                  Quality Commitment
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              COMPOUND CATEGORIES
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/60 font-sans">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Anabolics Matrix
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  SARMs Therapeutics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Peptide Formulations
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Oral Synthetics &amp; PCT
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verification Desk */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              VERIFICATION &amp; PORTAL
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={onOpenVerify}
                  className="text-white hover:text-white/80 flex items-center gap-2 font-bold cursor-pointer transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>VERIFY BATCH SERIAL</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="text-white/60 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>ATHLETE PORTAL LOGIN</span>
                </button>
              </li>
              <li className="pt-2 text-xs text-white/40">
                TECHNICAL ENQUIRIES:
                <a href="mailto:SUPPORT@UNITEDHORMONE.COM" className="block text-white/80 hover:text-white font-semibold mt-0.5">
                  SUPPORT@UNITEDHORMONE.COM
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4 font-sans border-b border-white/5">
          <p>© 2026 UNITED HORMONE LABS. ALL RIGHTS RESERVED. BATCH REGISTRY 2026.</p>
          <div className="flex gap-6 text-xs text-white/50">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white transition-colors cursor-pointer">LAB ASSAY REGISTRY</span>
          </div>
        </div>

      </div>

      {/* GIANT GRAND FINALE BOTTOM HEADER: "UNITED HORMONES" */}
      <div className="w-full pt-10 pb-0 overflow-hidden text-center pointer-events-none select-none">
        <h1 className="font-bebas text-[clamp(54px,14.5vw,250px)] leading-[0.82] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/35 to-white/5 opacity-90 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] whitespace-nowrap transition-all">
          UNITED HORMONES
        </h1>
      </div>

    </footer>
  );
};
