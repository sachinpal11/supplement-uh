"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { VerifyModal } from "./components/VerifyModal";

export default function NotFound() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col justify-between select-none overflow-hidden selection:bg-white selection:text-black">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/background-hero.png"
          alt="United Hormones 404 Background"
          fill
          priority
          className="object-cover object-center brightness-75 opacity-70 scale-105"
        />
        {/* Soft Dark Vignette Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85 pointer-events-none" />
      </div>

      {/* Header Navbar */}
      <div className="relative z-50">
        <Navbar
          onOpenLogin={() => setLoginOpen(true)}
          onOpenVerify={() => setVerifyOpen(true)}
        />
      </div>

      {/* Minimal 404 Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-36 pb-20 max-w-md mx-auto w-full">
        {/* Giant Minimalist 404 */}
        <h1 className="font-bebas text-[130px] sm:text-[190px] md:text-[240px] leading-none tracking-tighter text-white font-extrabold drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
          404
        </h1>

        {/* Stark Headline */}
        <h2 className="font-bebas text-2xl sm:text-3xl md:text-4xl tracking-[4px] uppercase text-white -mt-4 sm:-mt-8 mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          PAGE NOT FOUND
        </h2>

        {/* Minimal Subtext */}
        <p className="text-xs sm:text-sm text-neutral-200 font-sans tracking-wide leading-relaxed mb-8 max-w-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>

        {/* High-Contrast Black & White Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black hover:bg-neutral-200 transition-all font-sans text-xs font-bold uppercase tracking-[3px] rounded-none shadow-2xl border border-white hover:border-neutral-200 cursor-pointer"
        >
          GO TO HOME
        </Link>
      </div>

      {/* Product Verification Modal Popup */}
      <VerifyModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onOpenVerify={() => setVerifyOpen(true)}
          onOpenLogin={() => setLoginOpen(true)}
        />
      </div>
    </main>
  );
}
