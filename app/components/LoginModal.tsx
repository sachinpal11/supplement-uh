"use client";

import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1A1A1A] border border-[#2D2D2D] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-xl p-2 font-mono"
        >
          [✕]
        </button>

        <div className="mb-6">
          <span className="text-[11px] font-medium tracking-[3px] text-[#C8B84D] uppercase block mb-1">
            ATHLETE PORTAL ACCESS
          </span>
          <h3 className="font-bebas text-3xl text-[#F0EDE8] tracking-[2px]">
            AUTHENTICATE USER
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold tracking-[2px] uppercase text-white/60 block mb-1">
              ATHLETE EMAIL / ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@unitedhormone.com"
              className="w-full bg-[#0A0A0A] border border-[#2D2D2D] focus:border-[#C8B84D] px-4 py-3 text-xs text-[#F0EDE8] font-mono outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold tracking-[2px] uppercase text-white/60 block mb-1">
              CRYPTOGRAPHIC KEY / PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0A0A0A] border border-[#2D2D2D] focus:border-[#C8B84D] px-4 py-3 text-xs text-[#F0EDE8] font-mono outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C8B84D] hover:bg-[#d6c65b] text-[#0A0A0A] font-semibold text-xs uppercase tracking-[2.5px] py-3.5 mt-2 transition-colors flex items-center justify-center gap-2"
          >
            {submitted ? (
              <span className="text-[#0A0A0A] font-bold">AUTHENTICATING...</span>
            ) : (
              "ACCESS ATHLETE PORTAL →"
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-white/5 pt-4">
          <p className="text-[10px] text-white/40 tracking-wider">
            FOR AUTHORIZED ATHLETES & VERIFIED DISTRIBUTION PARTNERS ONLY
          </p>
        </div>
      </div>
    </div>
  );
};
