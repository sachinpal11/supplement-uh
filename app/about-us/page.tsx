"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VerifyModal } from "@/app/components/VerifyModal";
import { ShieldCheck, Sparkles, PackageCheck, HeartPulse } from "lucide-react";

export default function AboutUsPage() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const pillars = [
    {
      num: "01",
      title: "USA FORMULATED & CRAFTED",
      desc: "Engineered in the USA to support peak athletic muscle growth, strength, and recovery.",
      icon: HeartPulse,
    },
    {
      num: "02",
      title: "LAB-VERIFIED QUALITY",
      desc: "Strict manufacturing controls ensure dependable purity and consistency in every batch.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "TRANSPARENT INGREDIENTS",
      desc: "Formulated with high-grade active compounds and zero unlisted additives.",
      icon: Sparkles,
    },
    {
      num: "04",
      title: "CONFIDENTIAL DISPATCH",
      desc: "Fast order processing, direct WhatsApp coordination, and discreet protective shipping.",
      icon: PackageCheck,
    },
  ];

  const socials = [
    { name: "Facebook", href: "https://www.facebook.com/unitedhormone" },
    { name: "Instagram", href: "https://www.instagram.com/unitedhormone" },
    { name: "X (Twitter)", href: "https://x.com/unitedhormone" },
    { name: "YouTube", href: "https://www.youtube.com/@unitedhormone" },
    { name: "Pinterest", href: "https://in.pinterest.com/unitedhormone/" },
  ];

  return (
    <main className="relative min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans">
      {/* Header Wrapper */}
      <div className="relative z-50 bg-[#0A0A0A]">
        <Navbar
          onOpenLogin={() => setLoginOpen(true)}
          onOpenVerify={() => setVerifyOpen(true)}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full md:w-[80%] max-w-[80%] mx-auto px-4 sm:px-6 pt-28 pb-20 flex-1">
        
        {/* Featured Hero Banner Card with Background Image */}
        <div className="relative w-full bg-black text-white rounded-2xl overflow-hidden mb-12 p-8 md:p-12 border border-neutral-800 shadow-2xl">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/background-hero.png"
              alt="About United Hormone Background"
              fill
              priority
              className="object-cover object-center brightness-75 opacity-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 pointer-events-none" />
          </div>

          {/* Hero Banner Text Content */}
          <div className="relative z-10 max-w-3xl">
            {/* Breadcrumb Header */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-white transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-white font-semibold">ABOUT US</span>
            </div>

            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider text-white uppercase leading-none mb-4 drop-shadow-md">
              ABOUT UNITED HORMONE
            </h1>
            <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal drop-shadow">
              United Hormone is a USA-based supplement brand committed to providing premium-quality performance supplements that support muscle growth, strength, endurance, recovery, and overall athletic performance.
            </p>
          </div>
        </div>

        {/* Story Section: Width 80% */}
        <div className="w-full md:w-[80%] max-w-[80%] mx-auto space-y-5 text-sm md:text-base text-neutral-700 leading-relaxed mb-16">
          <p>
            Our products are carefully formulated using high-quality ingredients to help fitness enthusiasts and athletes achieve their goals with confidence.
          </p>
          <p>
            We focus on quality, consistency, and customer satisfaction by ensuring every product meets high manufacturing standards. Whether you’re looking to improve your workouts, build lean muscle, or enhance recovery, United Hormone is dedicated to delivering supplements you can trust.
          </p>
          <div className="p-6 bg-neutral-50 border-l-2 border-black rounded-r-lg my-6">
            <p className="text-xs md:text-sm text-neutral-800 leading-relaxed">
              If you have any questions about our products or your order, feel free to contact us at{" "}
              <a href="mailto:contact@unitedhormone.com" className="text-black font-semibold underline">
                contact@unitedhormone.com
              </a>
              . You can also reach us on{" "}
              <a href="https://wa.me/353892051142" target="_blank" rel="noopener noreferrer" className="text-black font-semibold underline">
                WhatsApp (+353 89 205 1142)
              </a>
              . Our team is always happy to help.
            </p>
          </div>
        </div>

        {/* Why Choose United Hormones (Human Luxury Minimal Cards) */}
        <div className="mb-16">
          <div className="border-b border-neutral-200 pb-4 mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              BRAND STANDARDS
            </span>
            <h2 className="font-bebas text-3xl md:text-4xl text-black tracking-widest uppercase leading-none">
              WHY CHOOSE UNITED HORMONES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  className="group p-6 bg-neutral-50/70 border border-neutral-200 rounded-xl hover:border-black transition-all duration-300 flex flex-col justify-between hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                        <IconComponent className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                        {item.num}
                      </span>
                    </div>

                    <h3 className="font-bebas text-xl text-black tracking-wider uppercase mb-2 group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Social Follow Strip */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bebas text-xl text-black tracking-wider uppercase">FOLLOW US</span>
          <div className="flex flex-wrap gap-2">
            {socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neutral-100 hover:bg-black text-neutral-800 hover:text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                <span>{soc.name}</span>
              </a>
            ))}
          </div>
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
