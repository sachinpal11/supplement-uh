"use client";

import React from "react";

export interface FilterState {
  searchQuery: string;
  category: string;
  inStockOnly: boolean;
  sort: string;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  categories: string[];
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
}) => {
  const isFiltered =
    filters.searchQuery !== "" ||
    filters.category !== "All" ||
    filters.inStockOnly ||
    filters.sort !== "featured";

  return (
    <div className="bg-white border border-black/12 rounded-2xl p-3 md:p-4 font-sans shadow-sm text-[#0A0A0A]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search products..."
            className="w-full pl-10 pr-8 py-2.5 bg-[#F4F3EF] border border-black/15 rounded-xl text-[#0A0A0A] placeholder:text-black/40 text-xs md:text-sm focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-black/40 hover:text-black text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdowns & Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Category Dropdown (Next to Sort) */}
          <div className="relative flex-1 md:flex-initial min-w-[130px]">
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full bg-[#F4F3EF] border border-black/15 text-[#0A0A0A] text-xs font-semibold rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:border-black focus:bg-white cursor-pointer pr-8 uppercase tracking-[0.5px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "Category: All" : cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-black/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 md:flex-initial min-w-[140px]">
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value })}
              className="w-full bg-[#F4F3EF] border border-black/15 text-[#0A0A0A] text-xs font-semibold rounded-xl px-3.5 py-2.5 appearance-none focus:outline-none focus:border-black focus:bg-white cursor-pointer pr-8 uppercase tracking-[0.5px]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-black/40">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* In Stock Toggle Button */}
          <button
            onClick={() => onFilterChange({ inStockOnly: !filters.inStockOnly })}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-[0.5px] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${filters.inStockOnly
              ? "bg-[#0A0A0A] text-white border-black shadow-md"
              : "bg-[#F4F3EF] border-black/15 text-black/70 hover:text-black hover:border-black/30"
              }`}
          >
            IN STOCK ONLY
          </button>

          {/* Reset All Filters Button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs text-black hover:underline uppercase font-bold tracking-[0.5px] py-2 px-2 cursor-pointer transition-colors whitespace-nowrap ml-1"
            >
              RESET
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
