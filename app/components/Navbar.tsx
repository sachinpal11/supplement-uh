"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenVerify: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenVerify }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "ABOUT US", href: "/#about" },
    { label: "CONTACT US", href: "/#contact" },
    { label: "FAQS", href: "/#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/75 backdrop-blur-md border-b border-white/10 py-4 shadow-xl"
            : "bg-transparent backdrop-blur-none border-b border-transparent py-5"
        }`}
      >
        {/* Left Navigation Group */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none z-50 cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Center Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 cursor-pointer">
          <Logo size="md" />
        </Link>

        {/* Right Navigation Group */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 text-[11px] md:text-[12px] font-semibold py-1.5 px-3 md:px-3.5 uppercase tracking-[2px] text-white border border-white/40 hover:bg-white hover:text-black transition-colors rounded-xs cursor-pointer group"
            aria-label="Shopping Cart"
          >
            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden sm:inline">CART</span>
            <span className="bg-[#C8B84D] text-[#0A0A0A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              {totalCount}
            </span>
          </button>

          <button
            onClick={onOpenVerify}
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] rounded-xs font-semibold py-1.5 uppercase tracking-[2px] text-white border border-white/40 px-3.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            VERIFY CODE
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bebas tracking-[4px] text-white hover:text-white/70 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVerify();
            }}
            className="text-sm font-bold uppercase tracking-[3px] text-white bg-black/80 hover:bg-white hover:text-black border border-white/60 px-6 py-2.5 transition-colors cursor-pointer"
          >
            VERIFY PRODUCT
          </button>
        </div>
      )}
    </>
  );
};
