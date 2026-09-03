"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenVerify: () => void;
  transparentOnTop?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenVerify,
  transparentOnTop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  const isTransparentOnTop =
    transparentOnTop !== undefined ? transparentOnTop : pathname === "/";

  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Smooth Animation for Mobile Sidebar Open & Close
  useEffect(() => {
    if (!overlayRef.current || !sidebarRef.current) return;

    if (mobileMenuOpen) {
      // Prevent background scroll
      document.body.style.overflow = "hidden";

      // Animate overlay backdrop
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
        ease: "power2.out",
      });

      // Animate sidebar drawer slide in
      gsap.to(sidebarRef.current, {
        x: "0%",
        duration: 0.45,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";

      // Animate sidebar drawer slide out
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.35,
        ease: "power3.in",
      });

      // Animate overlay backdrop fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "ABOUT US", href: "/about-us" },
    { label: "CONTACT US", href: "/contact-us" },
    { label: "FAQS", href: "/contact-us#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/15 py-3.5 shadow-2xl"
            : isTransparentOnTop
            ? "bg-transparent border-b border-transparent py-4 shadow-none"
            : "bg-[#0A0A0A] border-b border-white/10 py-4 shadow-lg"
        }`}
      >
        {/* Left Navigation Group (Desktop Only - XL screens and above) */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[2.5px] text-white/85 hover:text-white transition-opacity duration-200 cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Menu Toggle Button (Screens below XL) */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="xl:hidden text-white p-2 focus:outline-none cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 cursor-pointer p-1">
          <Logo size="md" />
        </Link>

        {/* Right Navigation Group */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Desktop Only Cart Button (XL screens and above) */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="hidden xl:flex items-center gap-2 text-[11px] md:text-[12px] font-semibold py-1.5 px-3.5 uppercase tracking-[2px] text-white border border-white/40 hover:bg-white hover:text-black transition-colors rounded-xs cursor-pointer group"
            aria-label="Shopping Cart"
          >
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>CART</span>
            <span className="bg-[#ffffff] text-[#0A0A0A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              {totalCount}
            </span>
          </button>

          {/* Desktop Verify Button (XL screens and above) */}
          <button
            onClick={onOpenVerify}
            className="hidden xl:inline-flex items-center gap-1.5 text-[12px] rounded-xs font-semibold py-1.5 uppercase tracking-[2px] text-white border border-white/40 px-3.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            VERIFY CODE
          </button>
        </div>
      </nav>

      {/* GSAP Smooth Mobile Sidebar Drawer Overlay (Screens below XL) */}
      <div
        ref={overlayRef}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-none xl:hidden"
      >
        {/* Mobile Sidebar Panel */}
        <div
          ref={sidebarRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-y-0 left-0 w-[80%] max-w-xs bg-gradient-to-b from-[#121212] via-[#0A0A0A] to-[#050505] border-r border-white/15 text-white shadow-2xl p-6 flex flex-col justify-between transform -translate-x-full"
        >
          <div>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Logo size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-8 space-y-5">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bebas text-2xl tracking-[3px] text-white/90 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer Actions */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#1A1A1A] via-[#242424] to-[#1A1A1A] border border-white/20 text-white font-extrabold text-xs tracking-[2px] uppercase rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>VIEW CART</span>
              <span className="bg-[#ffffff] text-[#0A0A0A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-1 group-hover:bg-black group-hover:text-white transition-colors">
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerify();
              }}
              className="w-full py-3 bg-white text-[#0A0A0A] font-extrabold text-xs tracking-[2px] uppercase rounded-xl hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              VERIFY PRODUCT CODE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
