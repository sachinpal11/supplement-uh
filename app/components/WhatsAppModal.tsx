"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export const WhatsAppModal: React.FC = () => {
  const {
    cart,
    subtotal,
    isWhatsAppModalOpen,
    setIsWhatsAppModalOpen,
    checkoutItem,
    clearCart,
  } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  if (!isWhatsAppModalOpen) return null;

  const receiverWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567";

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !street.trim() || !city.trim()) {
      setError("Please fill out all required delivery fields.");
      return;
    }
    setError("");

    // Build items list
    let orderItems = "";
    let finalTotal = 0;

    if (checkoutItem) {
      orderItems = `• 1x ${checkoutItem.title} (${checkoutItem.sku}) - ${checkoutItem.price}`;
      finalTotal = checkoutItem.numericPrice;
    } else {
      orderItems = cart
        .map(
          (item) =>
            `• ${item.quantity}x ${item.title} (${item.sku}) - $${(
              item.numericPrice * item.quantity
            ).toFixed(2)}`
        )
        .join("\n");
      finalTotal = subtotal;
    }

    const fullAddress = `${street.trim()}, ${city.trim()} ${postalCode.trim()}`.trim();

    // Format WhatsApp pre-filled text
    const message = `*NEW ORDER - UNITED HORMONE*
--------------------------------
*CUSTOMER INFORMATION:*
👤 *Name:* ${name.trim()}
📞 *Phone:* ${phone.trim()}
📍 *Delivery Address:* ${fullAddress}
${notes.trim() ? `📝 *Notes:* ${notes.trim()}\n` : ""}
--------------------------------
*ORDER DETAILS:*
${orderItems}

💵 *Subtotal:* $${finalTotal.toFixed(2)}
📦 *Discreet Express Shipping:* ${finalTotal >= 150 ? "FREE" : "$9.99"}
💰 *TOTAL AMOUNT:* $${(finalTotal + (finalTotal >= 150 ? 0 : 9.99)).toFixed(2)}
--------------------------------
Please confirm order availability and payment dispatch!`;

    const encodedMsg = encodeURIComponent(message);
    // Clean target phone number
    const targetPhone = receiverWhatsApp.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;

    // Open WhatsApp link in new window
    window.open(whatsappUrl, "_blank");

    // Clear cart if full cart checkout
    if (!checkoutItem) {
      clearCart();
    }

    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none font-sans">
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsWhatsAppModalOpen(false)}
      />

      <div className="bg-[#0A0A0A] border border-white/15 text-[#F0EDE8] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-6 bg-[#141414] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center">
              <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bebas text-2xl tracking-wide text-white uppercase leading-none">
                WHATSAPP DISPATCH CHECKOUT
              </h3>
              <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                DIRECT PHARMACEUTICAL ORDERING
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Order Summary Box */}
        <div className="p-4 bg-[#141414]/50 border-b border-white/10 font-sans">
          <div className="text-[11px] font-bold tracking-[1px] uppercase text-white mb-1">
            ORDER ITEM(S):
          </div>
          {checkoutItem ? (
            <div className="flex justify-between text-xs text-white">
              <span>1x {checkoutItem.title}</span>
              <span className="font-bold">{checkoutItem.price}</span>
            </div>
          ) : (
            <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-white/80">
                  <span>
                    {item.quantity}x {item.title}
                  </span>
                  <span className="font-bold text-white">
                    ${(item.numericPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4 font-sans">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
              FULL NAME *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
              PHONE NUMBER *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 987 654 3210"
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
              STREET ADDRESS *
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 123 Muscle Way, Apt 4B"
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
                CITY *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
                POSTAL / ZIP CODE
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="10001"
                className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mb-1">
              SPECIAL DISPATCH INSTRUCTIONS (OPTIONAL)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Leave package at doorstep, stealth packing required, etc."
              className="w-full px-4 py-2 bg-[#1A1A1A] border border-white/15 rounded-xl text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE57] text-[#0A0A0A] font-extrabold text-xs tracking-[2px] uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_rgba(37,211,102,0.4)] cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current text-[#0A0A0A]" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
              </svg>
              <span>SEND ORDER TO WHATSAPP ({receiverWhatsApp})</span>
            </button>
            <p className="text-[10px] text-center text-white/40 mt-2">
              🔒 Your details are encrypted and sent directly to our dispatch operator.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
