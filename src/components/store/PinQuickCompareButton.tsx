import React, { useState } from "react";
import { Scale, Pin, Check, ArrowRight, RefreshCw, X } from "lucide-react";
import { useCompareQueue } from "../../hooks/useCompareQueue";
import { storesData } from "../../data/stores";
import { navigate } from "../ui/Link";

interface PinQuickCompareButtonProps {
  currentSlug: string;
  brandName: string;
  variant?: "header" | "card" | "widget";
  className?: string;
}

export function PinQuickCompareButton({
  currentSlug,
  brandName,
  variant = "header",
  className = "",
}: PinQuickCompareButtonProps) {
  const { queue, addToQueue, removeFromQueue, isInQueue } = useCompareQueue();
  const isPinned = isInQueue(currentSlug);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTogglePin = () => {
    if (isPinned) {
      removeFromQueue(currentSlug);
    } else {
      addToQueue(currentSlug);
    }
  };

  const handleSelectCompare = (secondSlug: string) => {
    if (secondSlug) {
      addToQueue(currentSlug);
      addToQueue(secondSlug);
      navigate(`/compare/${currentSlug}-vs-${secondSlug}`);
    }
  };

  const otherStores = storesData.filter((s) => s.slug !== currentSlug);

  if (variant === "header") {
    return (
      <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={handleTogglePin}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
            isPinned
              ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700"
              : "bg-teal-50 hover:bg-teal-100 text-teal-900 border-teal-200/80"
          }`}
          title={isPinned ? `Unpin ${brandName} from quick comparison` : `Pin ${brandName} to comparison queue`}
        >
          <Pin className={`h-3.5 w-3.5 ${isPinned ? "fill-white text-white rotate-45" : "text-teal-600"}`} />
          <span>{isPinned ? "Pinned to Compare" : "Pin Store"}</span>
          {isPinned && <Check className="h-3.5 w-3.5 text-emerald-200" />}
        </button>

        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-200"
          title="Instant compare against another store"
        >
          <Scale className="h-3.5 w-3.5 text-slate-600" />
          <span>VS...</span>
        </button>

        {/* Dropdown / Compare Selection Modal */}
        {showDropdown && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 sm:p-5 space-y-3 font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-mono uppercase font-bold text-ink flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-teal-brand" />
                  Compare {brandName} With:
                </span>
                <button
                  type="button"
                  onClick={() => setShowDropdown(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-500 font-sans">
                Select a retailer to view side-by-side 2026 return rules:
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
                {otherStores.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => {
                      handleSelectCompare(s.slug);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-ink hover:bg-teal-light/50 hover:text-teal-dark flex items-center justify-between transition-colors cursor-pointer pt-2"
                  >
                    <span className="font-bold text-ink">{s.brand}</span>
                    <span className="text-[11px] font-mono text-teal-brand bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-md">
                      {s.quickAnswer.returnWindow}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 bg-teal-50/70 border border-teal-200/90 rounded-2xl space-y-3 font-sans ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className={`w-4 h-4 ${isPinned ? "text-emerald-600 fill-emerald-600" : "text-teal-600"}`} />
          <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-teal-950">
            Pin & Compare {brandName}
          </h4>
        </div>
        <span className="text-[10px] font-mono font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md">
          {queue.length}/3 Pinned
        </span>
      </div>

      <p className="text-xs text-teal-900 leading-relaxed">
        Pin this store to keep its verified 2026 return terms locked into your side-by-side comparison drawer.
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleTogglePin}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${
            isPinned
              ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
              : "bg-teal-brand text-white border-teal-600 hover:bg-teal-dark shadow-xs"
          }`}
        >
          <Pin className="w-3.5 h-3.5" />
          <span>{isPinned ? "Pinned to Comparison" : "Pin Store Now"}</span>
        </button>

        {queue.length >= 2 && (
          <button
            type="button"
            onClick={() => navigate(`/compare/${queue[0]}-vs-${queue[1]}`)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-ink-900 text-white text-xs font-bold hover:bg-ink-800 transition-colors shrink-0"
          >
            <span>View Side-by-Side</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-light" />
          </button>
        )}
      </div>
    </div>
  );
}
