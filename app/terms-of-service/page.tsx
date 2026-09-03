"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VerifyModal } from "@/app/components/VerifyModal";

export default function TermsOfServicePage() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-5">
        <Image
          src="/background-hero.png"
          alt="Background Pattern"
          fill
          priority
          className="object-cover object-center grayscale"
        />
      </div>

      {/* Header Wrapper */}
      <div className="relative z-50 bg-[#0A0A0A]">
        <Navbar
          onOpenLogin={() => setLoginOpen(true)}
          onOpenVerify={() => setVerifyOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 md:pt-16 pb-20 flex-1 w-full">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-black font-semibold">TERMS OF SERVICE</span>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <h1 className="font-bebas text-5xl sm:text-6xl tracking-wider text-black uppercase leading-none mb-2">
            TERMS OF SERVICE
          </h1>
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
            UNITED HORMONE
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              1. ACCEPTANCE OF TERMS
            </h2>
            <p>
              By accessing unitedhormone.com or purchasing products from United Hormone, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue website usage.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              2. PRODUCT QUALITY &amp; STANDARDS
            </h2>
            <p>
              United Hormone provides high-quality performance supplements. All products meet manufacturing standards designed to maintain consistency, reliability, and product integrity.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              3. ORDERS &amp; SHIPPING
            </h2>
            <p>
              All orders are processed and dispatched in discreet outer packaging. Order tracking information is provided upon dispatch. Free shipping applies to orders over $150.00.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              4. INTELLECTUAL PROPERTY
            </h2>
            <p>
              All content, brand assets, and graphics presented on unitedhormone.com are the property of United Hormone. Unauthorized duplication is prohibited.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              5. CONTACT SUPPORT
            </h2>
            <p>
              For questions regarding products or orders, contact{" "}
              <a href="mailto:contact@unitedhormone.com" className="text-black font-semibold underline">
                contact@unitedhormone.com
              </a>{" "}
              or message us on WhatsApp at{" "}
              <a href="https://wa.me/353892051142" className="text-black font-semibold underline">
                +353 89 205 1142
              </a>.
            </p>
          </section>
        </div>
      </div>

      <VerifyModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />

      <Footer
        onOpenVerify={() => setVerifyOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />
    </main>
  );
}
