import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  variant?: "standard" | "loadMore";
  totalItems?: number;
  loadedItemsCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  variant = "standard",
  totalItems,
  loadedItemsCount,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      role="navigation"
      aria-label={`Pagination Navigation. Currently on page ${currentPage} of ${totalPages}`}
      className={`pt-6 pb-4 font-sans ${className}`}
    >
      {/* Mobile-First Compact Prev / Page X of Y / Next Bar */}
      <div className="flex sm:hidden items-center justify-between gap-2 px-2 w-full">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2 inline-flex items-center justify-center gap-1 text-xs font-bold rounded-xl border border-slate-200 bg-white text-ink-800 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none shadow-2xs transition-all cursor-pointer"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2 inline-flex items-center justify-center gap-1 text-xs font-bold rounded-xl border border-slate-200 bg-white text-ink-800 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none shadow-2xs transition-all cursor-pointer"
          aria-label="Go to next page"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop & Tablet Full Numbered Pagination Bar */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-h-[44px] min-w-[44px] px-4 py-2 inline-flex items-center justify-center gap-1 text-xs font-extrabold rounded-xl border border-slate-200 bg-white text-ink-700 hover:border-teal-brand hover:text-teal-brand disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {/* Numbered Buttons */}
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((p, idx) => {
            if (typeof p === "string") {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-ink-400 font-mono">
                  •••
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                type="button"
                key={p}
                onClick={() => onPageChange(p)}
                className={`min-w-[44px] min-h-[44px] px-2 text-xs font-mono font-extrabold rounded-xl transition-all shadow-2xs cursor-pointer ${
                  isCurrent
                    ? "bg-teal-brand text-white border border-teal-dark shadow-sm scale-105"
                    : "bg-white border border-slate-200 text-ink-700 hover:border-teal-brand hover:text-teal-brand"
                }`}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-h-[44px] min-w-[44px] px-4 py-2 inline-flex items-center justify-center gap-1 text-xs font-extrabold rounded-xl border border-slate-200 bg-white text-ink-700 hover:border-teal-brand hover:text-teal-brand disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
          aria-label="Go to next page"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

