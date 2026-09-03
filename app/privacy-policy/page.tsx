"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VerifyModal } from "@/app/components/VerifyModal";

export default function PrivacyPolicyPage() {
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
          <span className="text-black font-semibold">PRIVACY POLICY</span>
        </div>

        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <h1 className="font-bebas text-5xl sm:text-6xl tracking-wider text-black uppercase leading-none mb-2">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
            UNITED HORMONE
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              1. OVERVIEW &amp; PRIVACY COMMITMENT
            </h2>
            <p>
              At <strong className="text-black">United Hormone</strong> (unitedhormone.com), we respect customer privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how your data is collected, encrypted, and utilized when visiting our website or contacting dispatch support.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              2. INFORMATION WE COLLECT
            </h2>
            <p>
              We only collect essential information required to fulfill orders and respond to customer inquiries:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600">
              <li>Contact Information: Name, Email Address, and Phone/WhatsApp Number.</li>
              <li>Delivery Information: Street Address, City, and Postal/ZIP code for fulfillment.</li>
            </ul>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              3. ORDER PRIVACY
            </h2>
            <p>
              Order details submitted through direct dispatch channels are kept strictly confidential. We do not store payment card credentials on site servers. All orders are packed discreetly with zero external product identifiers for privacy.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              4. DATA PROTECTION
            </h2>
            <p>
              We utilize essential performance cookies strictly to preserve cart state and site functionality. We never sell or share your personal data with third-party brokers.
            </p>
          </section>

          <section className="space-y-2.5">
            <h2 className="font-bebas text-xl sm:text-2xl text-black tracking-wider uppercase">
              5. CONTACT US
            </h2>
            <p>
              For questions regarding your data, contact our team at{" "}
              <a href="mailto:contact@unitedhormone.com" className="text-black font-semibold underline">
                contact@unitedhormone.com
              </a>{" "}
              or reach us on WhatsApp at{" "}
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
