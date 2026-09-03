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

  // Calculate pricing breakdown
  const currentSubtotal = checkoutItem ? checkoutItem.numericPrice : subtotal;
  const shippingAmount = currentSubtotal >= 150 || currentSubtotal === 0 ? 0 : 9.99;
  const finalPrice = currentSubtotal + shippingAmount;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !street.trim() || !city.trim()) {
      setError("Please fill out all required delivery fields.");
      return;
    }
    setError("");

    // Build items list
    let orderItems = "";

    if (checkoutItem) {
      orderItems = `• 1x ${checkoutItem.title} (${checkoutItem.sku}) - ${checkoutItem.price}`;
    } else {
      orderItems = cart
        .map(
          (item) =>
            `• ${item.quantity}x ${item.title} (${item.sku}) - $${(
              item.numericPrice * item.quantity
            ).toFixed(2)}`
        )
        .join("\n");
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

💵 *Subtotal:* $${currentSubtotal.toFixed(2)}
📦 *Discreet Express Shipping:* ${shippingAmount === 0 ? "FREE" : `$${shippingAmount.toFixed(2)}`}
💰 *FULL & FINAL TOTAL AMOUNT:* $${finalPrice.toFixed(2)}
--------------------------------
Please confirm order availability and payment dispatch!`;

    const encodedMsg = encodeURIComponent(message);
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
    <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div
        className="fixed inset-0 -z-10"
        onClick={() => setIsWhatsAppModalOpen(false)}
      />

      <div className="bg-[#0A0A0A] border border-white/10 text-[#F0EDE8] max-w-md w-full rounded-xl overflow-hidden relative">
        {/* Minimal Header */}
        <div className="p-5 bg-[#121212] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M73.0163 16.6252C65.533 9.13229 55.5802 5.0038 44.9756 5C23.1241 5 5.34024 22.7818 5.33264 44.6389C5.32884 51.626 7.15551 58.446 10.6245 64.4564L5 85L26.0152 79.4877C31.805 82.6469 38.3248 84.31 44.9586 84.312H44.9756C66.8234 84.312 84.6094 66.5282 84.6169 44.6711C84.6207 34.0782 80.5016 24.12 73.0163 16.6271V16.6252ZM44.9756 77.6174H44.9624C39.0508 77.6156 33.2516 76.0264 28.1917 73.0251L26.9885 72.3105L14.5173 75.5816L17.8456 63.4223L17.0625 62.1754C13.7646 56.9294 12.0215 50.8657 12.0254 44.6408C12.033 26.475 26.8136 11.6945 44.9891 11.6945C53.7897 11.6983 62.0621 15.1293 68.2833 21.3581C74.5047 27.5851 77.928 35.8649 77.9242 44.6674C77.9165 62.8351 63.136 77.6156 44.9756 77.6156V77.6174ZM63.0485 52.9415C62.0581 52.4454 57.1884 50.0503 56.2797 49.7197C55.3712 49.3888 54.7117 49.2236 54.052 50.2157C53.3925 51.2081 51.4936 53.4395 50.9157 54.099C50.3378 54.7605 49.76 54.8423 48.7696 54.346C47.7795 53.85 44.588 52.8046 40.8035 49.4306C37.8592 46.8037 35.8708 43.5612 35.2931 42.5688C34.7152 41.5767 35.2323 41.0406 35.7264 40.5484C36.1711 40.1036 36.7167 39.3908 37.2128 38.8129C37.7091 38.2351 37.8725 37.8208 38.2031 37.1611C38.534 36.4997 38.3686 35.922 38.1215 35.4257C37.8743 34.9297 35.8938 30.0541 35.0669 28.0716C34.2628 26.1405 33.4456 26.4028 32.8392 26.3705C32.2613 26.342 31.6018 26.3363 30.9403 26.3363C30.2788 26.3363 29.2066 26.5834 28.2981 27.5756C27.3896 28.5677 24.831 30.9646 24.831 35.8382C24.831 40.7118 28.3799 45.424 28.876 46.0854C29.3721 46.7469 35.8613 56.7507 45.7968 61.0426C48.1597 62.0633 50.0052 62.6734 51.4441 63.1297C53.8164 63.8843 55.9756 63.7779 57.6825 63.5231C59.5854 63.2381 63.5428 61.1262 64.3677 58.8129C65.1926 56.4997 65.1926 54.5152 64.9456 54.1028C64.6985 53.6903 64.037 53.4413 63.0467 52.9452L63.0485 52.9415Z" fill="#25D366"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bebas text-xl tracking-wide text-white uppercase leading-none">
                WHATSAPP DISPATCH CHECKOUT
              </h3>
              <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5 font-sans">
                DIRECT ORDERING
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
          >
            ✕
          </button>
        </div>

        {/* Order Summary Box with Full & Final Pricing */}
        <div className="p-4 bg-[#121212]/80 border-b border-white/10 font-sans space-y-3">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/60">
            ORDER ITEM(S):
          </div>
          {checkoutItem ? (
            <div className="flex justify-between text-xs text-white">
              <span>1x {checkoutItem.title}</span>
              <span className="font-bold">{checkoutItem.price}</span>
            </div>
          ) : cart.length > 0 ? (
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
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
          ) : (
            <div className="text-xs text-white/50 italic">General Inquiry / Custom Order</div>
          )}

          {/* Detailed Price Breakdown */}
          <div className="pt-2.5 border-t border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Items Subtotal</span>
              <span className="font-semibold text-white">${currentSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Discreet Express Shipping</span>
              <span className={shippingAmount === 0 ? "text-[#25D366] font-bold" : "font-semibold text-white"}>
                {shippingAmount === 0 ? "FREE" : `$${shippingAmount.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 text-sm font-extrabold border-t border-white/10">
              <span className="uppercase tracking-wider text-[11px] text-[#25D366]">FULL &amp; FINAL PRICE</span>
              <span className="text-[#25D366] text-base font-bold">${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckoutSubmit} className="p-5 space-y-3.5 font-sans">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
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
              className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
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
              className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
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
              className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
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
                className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
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
                className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
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
              className="w-full px-3.5 py-2 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#25D366] transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE57] text-[#0A0A0A] font-extrabold text-xs tracking-[2px] uppercase rounded-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer border border-[#25D366]"
            >
              <svg width="20" height="20" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M73.0163 16.6252C65.533 9.13229 55.5802 5.0038 44.9756 5C23.1241 5 5.34024 22.7818 5.33264 44.6389C5.32884 51.626 7.15551 58.446 10.6245 64.4564L5 85L26.0152 79.4877C31.805 82.6469 38.3248 84.31 44.9586 84.312H44.9756C66.8234 84.312 84.6094 66.5282 84.6169 44.6711C84.6207 34.0782 80.5016 24.12 73.0163 16.6271V16.6252ZM44.9756 77.6174H44.9624C39.0508 77.6156 33.2516 76.0264 28.1917 73.0251L26.9885 72.3105L14.5173 75.5816L17.8456 63.4223L17.0625 62.1754C13.7646 56.9294 12.0215 50.8657 12.0254 44.6408C12.033 26.475 26.8136 11.6945 44.9891 11.6945C53.7897 11.6983 62.0621 15.1293 68.2833 21.3581C74.5047 27.5851 77.928 35.8649 77.9242 44.6674C77.9165 62.8351 63.136 77.6156 44.9756 77.6156V77.6174ZM63.0485 52.9415C62.0581 52.4454 57.1884 50.0503 56.2797 49.7197C55.3712 49.3888 54.7117 49.2236 54.052 50.2157C53.3925 51.2081 51.4936 53.4395 50.9157 54.099C50.3378 54.7605 49.76 54.8423 48.7696 54.346C47.7795 53.85 44.588 52.8046 40.8035 49.4306C37.8592 46.8037 35.8708 43.5612 35.2931 42.5688C34.7152 41.5767 35.2323 41.0406 35.7264 40.5484C36.1711 40.1036 36.7167 39.3908 37.2128 38.8129C37.7091 38.2351 37.8725 37.8208 38.2031 37.1611C38.534 36.4997 38.3686 35.922 38.1215 35.4257C37.8743 34.9297 35.8938 30.0541 35.0669 28.0716C34.2628 26.1405 33.4456 26.4028 32.8392 26.3705C32.2613 26.342 31.6018 26.3363 30.9403 26.3363C30.2788 26.3363 29.2066 26.5834 28.2981 27.5756C27.3896 28.5677 24.831 30.9646 24.831 35.8382C24.831 40.7118 28.3799 45.424 28.876 46.0854C29.3721 46.7469 35.8613 56.7507 45.7968 61.0426C48.1597 62.0633 50.0052 62.6734 51.4441 63.1297C53.8164 63.8843 55.9756 63.7779 57.6825 63.5231C59.5854 63.2381 63.5428 61.1262 64.3677 58.8129C65.1926 56.4997 65.1926 54.5152 64.9456 54.1028C64.6985 53.6903 64.037 53.4413 63.0467 52.9452L63.0485 52.9415Z" fill="#0A0A0A"/>
              </svg>
              <span>SEND ORDER TO WHATSAPP (${finalPrice > 0 ? `$${finalPrice.toFixed(2)}` : receiverWhatsApp})</span>
            </button>
            <p className="text-[10px] text-center text-white/40 mt-2">
              🔒 Encrypted &amp; dispatched directly to our operator.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
