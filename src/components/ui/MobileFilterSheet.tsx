import React from "react";
import { X, ListFilter, Check, Sparkles } from "lucide-react";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: "all" | "receipt" | "curbside" | "instant" | "saved";
  setActiveFilter: (filter: "all" | "receipt" | "curbside" | "instant" | "saved") => void;
  distanceRadius: number;
  setDistanceRadius: (radius: number) => void;
  sortBy: "distance" | "name" | "features";
  setSortBy: (sort: "distance" | "name" | "features") => void;
  savedCount: number;
  totalResults: number;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  activeFilter,
  setActiveFilter,
  distanceRadius,
  setDistanceRadius,
  sortBy,
  setSortBy,
  savedCount,
  totalResults,
}: MobileFilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-xs p-0 sm:p-4 font-sans animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Strip */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-paper-muted/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-brand text-white">
              <ListFilter className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-base text-ink">
                Filter & Sort Return Desks
              </h3>
              <p className="text-xs text-ink-500 font-mono">
                {totalResults} Verified Locations Available
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* 1. Sort Preference */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
              Sort Order
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "distance", label: "Distance (Nearest)" },
                { id: "name", label: "Store Name (A-Z)" },
                { id: "features", label: "Most Features" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    sortBy === opt.id
                      ? "bg-teal-brand text-white border-teal-brand shadow-xs"
                      : "bg-white text-ink-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Desk Capabilities */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
              Desk Capabilities & Perks
            </label>
            <div className="space-y-2">
              {[
                { id: "all", label: "All Return Counters", count: null },
                { id: "receipt", label: "Card Receipt Lookup Desk", count: null },
                { id: "curbside", label: "Curbside Drive-Up Dropoff", count: null },
                { id: "instant", label: "Instant Card Refund Counter", count: null },
                { id: "saved", label: `Saved Stores (${savedCount})`, count: savedCount },
              ].map((filterItem) => {
                const isSelected = activeFilter === filterItem.id;
                return (
                  <button
                    key={filterItem.id}
                    onClick={() => setActiveFilter(filterItem.id as any)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-teal-brand/10 border-teal-brand text-teal-dark font-extrabold"
                        : "bg-white text-ink-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>{filterItem.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-teal-brand shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Distance Radius */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-500">
              Distance Radius Limit
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: 10, label: "Under 10 miles" },
                { val: 25, label: "Under 25 miles" },
                { val: 50, label: "Under 50 miles" },
                { val: 100, label: "Under 100 miles" },
                { val: 5000, label: "Worldwide / Unlimited" },
              ].map((rad) => (
                <button
                  key={rad.val}
                  onClick={() => setDistanceRadius(rad.val)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    distanceRadius === rad.val
                      ? "bg-ink text-white border-ink shadow-xs"
                      : "bg-white text-ink-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {rad.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Apply */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-teal-brand hover:bg-teal-dark text-white font-extrabold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Apply Filters ({totalResults} Stores)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
