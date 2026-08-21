"use client";

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { MarqueeSection } from "./components/MarqueeSection";
import { QualitySection } from "./components/QualitySection";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductCategoriesSection } from "./components/ProductCategoriesSection";
import { FaqSection } from "./components/FaqSection";
import { VerifySection } from "./components/VerifySection";
import { VerifyModal } from "./components/VerifyModal";
import { Footer } from "./components/Footer";

import { SmoothScroll } from "./components/SmoothScroll";

export default function Home() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpenVerifyWithCode = (code?: string) => {
    setVerifyOpen(true);
  };

  const handleExploreProducts = () => {
    const section = document.querySelector("#products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#0A0A0A] text-[#F0EDE8] overflow-x-hidden selection:bg-[#C8B84D]/30 selection:text-white">
        {/* Fixed Navbar Header */}
        <Navbar
          onOpenLogin={() => setLoginOpen(true)}
          onOpenVerify={() => setVerifyOpen(true)}
        />

        {/* Cinematic Layered Hero Section */}
        <HeroSection
          onOpenVerify={() => setVerifyOpen(true)}
          onExploreProducts={handleExploreProducts}
        />

        {/* About Brand / The Mindset Section */}
        <AboutSection />

        {/* Tilted White Brand Values Marquee */}
        <MarqueeSection />


        <ProductCategoriesSection />

        {/* Third Component: Quality & Innovation Commitment Section */}
        <QualitySection />

        {/* Featured Products Catalog */}
        <div id="products" className="-mb-20">
          <ProductCatalog title="FEATURED PRODUCTS" />
        </div>

        {/* New Arrivals Catalog */}
        <ProductCatalog title="NEW ARRIVALS" />

        {/* Premium & Minimal FAQ Section */}
        <FaqSection />

        {/* Product Verification Modal Popup (Triggered via Navbar/Buttons) */}
        <VerifyModal
          isOpen={verifyOpen}
          onClose={() => setVerifyOpen(false)}
        />

        {/* Crazy Premium Modern Footer with Giant "UNITED HORMONES" Bottom Header */}
        <Footer
          onOpenVerify={() => setVerifyOpen(true)}
          onOpenLogin={() => setLoginOpen(true)}
        />
      </main>
    </SmoothScroll>
  );
}
