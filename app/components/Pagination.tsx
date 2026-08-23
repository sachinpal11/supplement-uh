"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-black/10 font-sans">
      {/* Items Range Summary */}
      <div className="text-xs text-black/70 font-medium">
        Showing <strong className="text-[#0A0A0A]">{startItem}</strong> to{" "}
        <strong className="text-[#0A0A0A]">{endItem}</strong> of{" "}
        <strong className="text-[#0A0A0A] font-bold">{totalItems}</strong> products
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3.5 py-2 rounded-xl border border-black/15 bg-white text-black text-xs font-bold hover:bg-[#0A0A0A] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((num, idx) => {
            if (num === "...") {
              return (
                <span key={`dots-${idx}`} className="px-2 text-black/40 text-xs">
                  ...
                </span>
              );
            }

            const isCurrent = num === currentPage;
            return (
              <button
                key={`page-${num}`}
                onClick={() => onPageChange(num as number)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#0A0A0A] text-white shadow-md scale-105 border border-black font-black"
                    : "bg-white border border-black/15 text-black/80 hover:bg-[#F5F4F0] hover:text-black"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3.5 py-2 rounded-xl border border-black/15 bg-white text-black text-xs font-bold hover:bg-[#0A0A0A] hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">NEXT</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
