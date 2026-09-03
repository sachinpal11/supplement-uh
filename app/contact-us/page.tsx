"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VerifyModal } from "@/app/components/VerifyModal";
import { ShieldCheck, Sparkles, PackageCheck, HeartPulse, Mail, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

export default function ContactUsPage() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    const targetWhatsApp = "353892051142";
    const messageText = `*NEW CONTACT ENQUIRY - UNITED HORMONE*\n--------------------------------\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nWhatsApp: ${formData.whatsapp.trim() || "Not provided"}\nMessage: ${formData.message.trim()}`;

    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${targetWhatsApp}?text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
    { name: "Pinterest", href: "https://in.pinterest.com/unitedhormone" },
  ];

  const faqs = [
    {
      id: "faq-1",
      question: "What is United Hormone?",
      answer:
        "United Hormone is a USA-based supplement brand that offers premium-quality performance supplements designed to support muscle growth, strength, recovery, endurance, and overall athletic performance. Our products are made with carefully selected ingredients to help you achieve your fitness goals with confidence.",
    },
    {
      id: "faq-2",
      question: "How does United Hormone ensure product quality?",
      answer:
        "Every production batch undergoes strict quality control standards and high-purity testing to maintain product integrity and customer satisfaction.",
    },
    {
      id: "faq-3",
      question: "Who can use United Hormone products?",
      answer:
        "Our formulations are developed for adult athletes, bodybuilders, and fitness enthusiasts seeking reliable, premium supplements to support their workouts and body composition goals.",
    },
    {
      id: "faq-4",
      question: "How can I contact United Hormone for support?",
      answer:
        "You can email our customer support team directly at contact@unitedhormone.com or message us via WhatsApp at +353 89 205 1142. Our team is available to assist you with order tracking, product guidance, and general inquiries.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white font-sans overflow-x-hidden">
      {/* Header Wrapper */}
      <div className="relative z-50 bg-[#0A0A0A]">
        <Navbar
          onOpenLogin={() => setLoginOpen(true)}
          onOpenVerify={() => setVerifyOpen(true)}
        />
      </div>

      {/* Main Content Area: 80% Width Container */}
      <div className="relative z-10 w-full md:w-[80%] max-w-[80%] mx-auto px-4 sm:px-6 pt-28 pb-20 flex-1">
        
        {/* Featured Hero Banner Card with Background Image */}
        <div className="relative w-full bg-black text-white rounded-2xl overflow-hidden mb-12 p-8 md:p-12 border border-neutral-800 shadow-2xl">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <Image
              src="/background-hero.png"
              alt="Contact United Hormone Background"
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
              <span className="text-white font-semibold">CONTACT US</span>
            </div>

            <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider text-white uppercase leading-none mb-4 drop-shadow-md">
              CONTACT UNITED HORMONE
            </h1>
            <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal drop-shadow">
              United Hormone is a USA-based supplement brand offering premium-quality supplements to support muscle growth, strength, recovery, and peak athletic performance. We’re committed to delivering trusted products that help you achieve your fitness goals with confidence.
            </p>
          </div>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left Column: Direct Contacts & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-bebas text-2xl md:text-3xl text-black tracking-widest uppercase mb-2">
                GOT ANY QUESTIONS? NEED HELP?
              </h2>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                Contact us with any questions about our products or your order. Our support team is ready to assist you.
              </p>
            </div>

            {/* Direct Info Cards */}
            <div className="space-y-3 font-sans">
              
              {/* Email Card */}
              <a
                href="mailto:contact@unitedhormone.com"
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-black transition-all duration-300 flex items-center gap-3.5 group block shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                  <Mail className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-mono">EMAIL SUPPORT</span>
                  <span className="text-xs font-semibold text-black group-hover:underline">
                    contact@unitedhormone.com
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/353892051142"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-black transition-all duration-300 flex items-center gap-3.5 group block shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366] text-black flex items-center justify-center group-hover:bg-[#1EBE57] transition-colors">
                  <MessageSquare className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-mono">WHATSAPP DIRECT</span>
                  <span className="text-xs font-semibold text-black group-hover:underline">
                    +353 89 205 1142
                  </span>
                </div>
              </a>

            </div>

            {/* Social Follow Links */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                FOLLOW US
              </h3>
              <div className="flex flex-wrap gap-2">
                {socials.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-neutral-100 hover:bg-black text-neutral-700 hover:text-white rounded-lg text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    {soc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-8 font-sans shadow-xs">
            <h2 className="font-bebas text-2xl md:text-3xl text-black tracking-widest uppercase mb-1">
              SEND US A MESSAGE
            </h2>
            <p className="text-xs text-neutral-600 mb-5">
              Fill out the form below to send an instant query to our support team.
            </p>

            {submitted && (
              <div className="p-3 rounded-lg bg-neutral-900 text-white text-xs font-semibold mb-4">
                Message initiated! Redirecting your query to WhatsApp.
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                  NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-black placeholder:text-neutral-400 text-xs focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                    WHATSAPP NUMBER
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+353..."
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-black placeholder:text-neutral-400 text-xs focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-black placeholder:text-neutral-400 text-xs focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="How can we assist you with your order?"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-black placeholder:text-neutral-400 text-xs focus:outline-none focus:border-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-[2px] uppercase rounded-lg transition-colors cursor-pointer"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

        </div>

        {/* Why Choose United Hormones (Human Luxury Minimal Cards) */}
        <div className="mb-16 border-t border-neutral-200 pt-12">
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

        {/* Embedded FAQ Section */}
        <div id="faq" className="mb-12 border-t border-neutral-200 pt-12">
          <h2 className="font-bebas text-3xl md:text-4xl text-black tracking-widest uppercase mb-6 text-center">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="max-w-3xl mx-auto space-y-3 font-sans">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-xs text-black">
                      {faq.question}
                    </span>
                    <span className="text-black">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
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
