"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenVerify: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVerify }) => {
  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/unitedhormone",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/unitedhormone",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/unitedhormone",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@unitedhormone",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://in.pinterest.com/unitedhormone/",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="contact" className="relative w-full bg-[#050505] text-white pt-16 md:pt-20 pb-6 px-6 md:px-12 font-sans select-none overflow-hidden border-t border-white/10">

      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start pb-14 border-b border-white/10">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Logo size="lg" showText={false} />
            <p className="text-xs text-white/50 leading-relaxed font-sans max-w-xs">
              United Hormone is a USA-based supplement brand offering premium performance formulations designed for muscle growth, strength, recovery, and peak athletic performance.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              QUICK MENU
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop Catalog
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Verification */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              VERIFICATION &amp; LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 font-sans">
              <li>
                <button
                  type="button"
                  onClick={onOpenVerify}
                  className="text-[#C8B84D] hover:text-white flex items-center gap-2 font-bold cursor-pointer transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C8B84D] animate-pulse" />
                  <span>PRODUCT VERIFICATION</span>
                </button>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div>
            <h4 className="font-bebas text-lg text-white tracking-widest uppercase mb-4">
              DIRECT CONTACT
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              <li className="text-white/60">
                EMAIL SUPPORT:
                <a href="mailto:contact@unitedhormone.com" className="block text-white hover:text-[#C8B84D] font-semibold mt-0.5 transition-colors">
                  contact@unitedhormone.com
                </a>
              </li>
              <li className="text-white/60">
                WHATSAPP DISPATCH:
                <a href="https://wa.me/353892051142" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-[#25D366] font-semibold mt-0.5 transition-colors">
                  +353 89 205 1142
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-mono mb-2">FOLLOW US:</span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white text-white/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                      title={soc.name}
                    >
                      {soc.icon}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-8 pb-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4 font-sans border-b border-white/5">
          <p>© 2026 UNITED HORMONE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">TERMS &amp; CONDITIONS</Link>
            <button onClick={onOpenVerify} className="hover:text-white transition-colors cursor-pointer">PRODUCT VERIFICATION</button>
          </div>
        </div>

      </div>

      {/* GRAND FINALE BOTTOM HEADER: "UNITED HORMONES" */}
      <div className="w-full pt-8 pb-0 overflow-hidden text-center pointer-events-none select-none">
        <h1 className="font-bebas text-[clamp(54px,14.5vw,250px)] leading-[0.82] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/35 to-white/5 opacity-90 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] whitespace-nowrap transition-all">
          UNITED HORMONES
        </h1>
      </div>

    </footer>
  );
};
