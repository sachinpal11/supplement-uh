"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VerifyModal } from "@/app/components/VerifyModal";
import { ProductDetailModal } from "@/app/components/ProductDetailModal";
import { ShopFilters, FilterState } from "@/app/components/ShopFilters";
import { Pagination } from "@/app/components/Pagination";
import { ProductItem } from "@/app/components/ProductCatalog";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  "All",
  "SARMs",
  "Peptides",
  "Mass Builders",
  "PCT & Recovery",
  "Fat Burners",
];

export default function ShopPage() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: "All",
    inStockOnly: false,
    sort: "featured",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    totalItems: 0,
    totalPages: 1,
  });

  const { addToCart, openWhatsAppCheckout } = useCart();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        q: filters.searchQuery,
        category: filters.category,
        inStock: filters.inStockOnly ? "true" : "false",
        sort: filters.sort,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to load products");
      const data = await res.json();

      setProducts(data.products || []);
      if (data.pagination) {
        setPagination((prev) => ({
          ...prev,
          totalItems: data.pagination.totalItems,
          totalPages: data.pagination.totalPages,
        }));
      }
    } catch (err) {
      console.error("Error fetching shop products:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "All",
      inStockOnly: false,
      sort: "featured",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <main className="relative min-h-screen bg-[#F5F4F0] text-[#0A0A0A] overflow-x-hidden font-sans selection:bg-black selection:text-white">
      {/* Fixed Navbar Header */}
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        onOpenVerify={() => setVerifyOpen(true)}
      />

      {/* Hero Banner Header (Light Theme) */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#E7E4DC] via-[#F0EEE8] to-[#F5F4F0] border-b border-black/10 select-none overflow-hidden text-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/5 via-transparent to-transparent pointer-events-none" />
        <Image src="/faq-section-bg.png" alt="Shop Header Background" fill priority className="object-cover blur-[1px] pointer-events-none opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">


          <h1 className="font-bebas text-[clamp(42px,6vw,84px)] leading-none tracking-tight uppercase text-[#F0EDE8] mb-4 drop-shadow-sm">
            SHOP NOW
          </h1>

          <p className="text-sm md:text-base text-[#F0EDE8] max-w-2xl mx-auto leading-relaxed font-sans font-medium mb-8">
            Explore HPLC-certified anabolic compounds, peptide matrices, and targeted muscle secretagogues. Fast discreet worldwide dispatch.
          </p>

          {/* Full Search & Filter Card embedded into Shop Now Hero Section */}
          <div className="max-w-[1200px] mx-auto text-left">
            <ShopFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              categories={CATEGORIES}
            />
          </div>
        </div>
      </section>

      {/* Main Shop Catalog Container */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[360px] sm:h-[420px] rounded-2xl bg-white border border-black/10 animate-pulse p-2.5 sm:p-4 flex flex-col justify-between"
              >
                <div className="w-full aspect-square bg-black/5 rounded-xl" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-black/10 rounded w-3/4" />
                  <div className="h-3 bg-black/5 rounded w-1/2" />
                </div>
                <div className="h-10 bg-black/10 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-black/10 my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mx-auto mb-4 text-black/60">
              🔍
            </div>
            <h3 className="font-bebas text-3xl tracking-wide text-[#0A0A0A] uppercase mb-2">
              NO MATCHING PRODUCTS FOUND
            </h3>
            <p className="text-xs text-black/60 max-w-md mx-auto mb-6 font-sans">
              No compounds matched your search criteria. Try resetting your search query or selecting a different category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#0A0A0A] text-white font-extrabold text-xs uppercase tracking-[2px] rounded-xl hover:bg-neutral-800 transition-all cursor-pointer shadow-md"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className="group border border-black/10 bg-white text-[#0A0A0A] p-2.5 sm:p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-black/30 hover:-translate-y-1 hover:shadow-xl cursor-pointer relative"
              >
                {/* Product Image Frame */}
                <div>
                  <div className="w-full aspect-square bg-[#F0EEE8] flex items-center justify-center relative overflow-hidden rounded-xl border border-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 768px) 50vw, 300px"
                    />
                    {/* Category Tag Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#0A0A0A] backdrop-blur-md text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-[1px] border border-black">
                      {item.category || "SARMs"}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="pt-3 sm:pt-4 pb-1">
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5 flex-wrap gap-1">
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <div className="flex text-amber-500 text-[10px] sm:text-xs tracking-tighter">★★★★★</div>
                        <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[#0A0A0A]">
                          {item.rating.toFixed(2)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-black/40">({item.reviewsCount})</span>
                      </div>
                      <span
                        className={`text-[8px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] uppercase px-1.5 py-0.5 rounded-full font-semibold border ${item.inStock
                          ? "bg-emerald-500/10 text-emerald-800 border-emerald-500/20"
                          : "bg-red-500/10 text-red-800 border-red-500/20"
                          }`}
                      >
                        {item.inStock ? "IN STOCK" : "OUT OF STOCK"}
                      </span>
                    </div>

                    <h3 className="font-bebas text-lg sm:text-2xl leading-none uppercase tracking-wide text-[#0A0A0A] group-hover:text-black transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-sans tracking-wider text-black/60 uppercase mt-1 sm:mt-1.5 mb-2 sm:mb-3">
                      <span className="font-medium truncate max-w-[90px] sm:max-w-none">{item.sku}</span>
                      <span className="font-bold text-[#0A0A0A] text-[10px] sm:text-xs">{item.price}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-col gap-1.5 sm:gap-2 pt-2 border-t border-black/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: item.id,
                        title: item.title,
                        subtitle: item.subtitle || "UNITED HORMONE",
                        sku: item.sku,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                    className="w-full py-2 sm:py-2.5 px-2 sm:px-3 bg-[#0A0A0A] hover:bg-[#252525] text-white font-sans text-[10px] sm:text-xs font-bold tracking-[1px] sm:tracking-[1.5px] uppercase flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-black/10 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWhatsAppCheckout({
                        id: item.id,
                        title: item.title,
                        subtitle: item.subtitle || "UNITED HORMONE",
                        sku: item.sku,
                        price: item.price,
                        numericPrice: parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0,
                        image: item.image,
                        quantity: 1,
                      });
                    }}
                    className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-[#25D366] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#25D366] font-sans text-[9px] sm:text-[11px] font-extrabold tracking-[0.5px] sm:tracking-[1px] uppercase flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl transition-all duration-300 cursor-pointer border border-black shadow-sm group/wa"
                  >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#0A0A0A] group-hover/wa:text-[#25D366] transition-colors" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.417 5.176 5.297-1.389c1.464.798 3.116 1.217 4.773 1.218h.004c5.504 0 9.986-4.478 9.988-9.985 0-2.668-1.038-5.176-2.924-7.063a9.92 9.92 0 0 0-7.056-2.942zm5.727 14.168c-.244.688-1.42 1.314-1.961 1.398-.541.084-1.246.12-2.008-.124-.462-.148-1.062-.344-1.834-.678-3.238-1.405-5.352-4.685-5.514-4.901-.162-.216-1.318-1.754-1.318-3.346 0-1.592.835-2.376 1.132-2.7.297-.324.649-.405.865-.405.216 0 .433.002.622.012.203.01.474-.077.744.57.27.648.919 2.242.999 2.404.08.162.135.351.027.568-.108.216-.162.351-.324.54-.162.189-.34.423-.486.568-.162.162-.331.338-.142.662.189.324.84 1.387 1.802 2.245 1.238 1.103 2.28 1.444 2.604 1.606.324.162.54.243.622.378.081.135.081.784-.163 1.472z" />
                    </svg>
                    <span>BUY VIA WHATSAPP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          limit={pagination.limit}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        />
      </section>

      {/* Product Verification Modal */}
      <VerifyModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Luxury Footer */}
      <Footer
        onOpenVerify={() => setVerifyOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />
    </main>
  );
}
