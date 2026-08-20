import React from "react";
import { Scale, Plus, Check, ArrowRight, X } from "lucide-react";
import { useCompareQueue } from "../../hooks/useCompareQueue";
import { storesData } from "../../data/stores";
import { navigate } from "../ui/Link";

interface FloatingQuickCompareProps {
  currentSlug: string;
  brandName: string;
}

export function FloatingQuickCompare({ currentSlug, brandName }: FloatingQuickCompareProps) {
  const { queue, addToQueue, removeFromQueue, isInQueue } = useCompareQueue();
  const isAdded = isInQueue(currentSlug);

  const handleToggle = () => {
    if (isAdded) {
      removeFromQueue(currentSlug);
    } else {
      addToQueue(currentSlug);
    }
  };

  const handleGoToCompare = () => {
    if (queue.length >= 2) {
      navigate(`/compare/${queue[0]}-vs-${queue[1]}`);
    } else if (queue.length === 1 && queue[0] !== currentSlug) {
      navigate(`/compare/${queue[0]}-vs-${currentSlug}`);
    } else {
      navigate("/compare");
    }
  };

  const queueStoreNames = queue
    .map((slug) => storesData.find((s) => s.slug === slug)?.brand)
    .filter(Boolean);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 font-sans no-print flex flex-col items-end space-y-2">
      {/* Active comparison queue notification bar if 1 or 2 items added */}
      {queue.length > 0 && (
        <div className="bg-ink-900/95 text-white backdrop-blur-md border border-teal-500/40 rounded-2xl p-3 shadow-xl max-w-xs sm:max-w-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 overflow-hidden text-xs">
            <Scale className="h-4 w-4 text-teal-light shrink-0" />
            <div className="truncate">
              <span className="font-mono text-[10px] text-teal-light uppercase font-bold block">
                Queue ({queue.length}/3)
              </span>
              <span className="font-semibold text-white truncate block">
                {queueStoreNames.join(" vs ")}
              </span>
            </div>
          </div>

          <button
            onClick={handleGoToCompare}
            className="inline-flex items-center gap-1 bg-teal-brand hover:bg-teal-dark text-white text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            <span>Compare</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main floating action toggle button */}
      <button
        onClick={handleToggle}
        className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border text-xs font-extrabold transition-all duration-300 cursor-pointer ${
          isAdded
            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 ring-2 ring-emerald-300/50"
            : "bg-teal-brand hover:bg-teal-dark text-white border-teal-400 hover:shadow-teal-brand/30 hover:scale-105"
        }`}
        title={isAdded ? "Remove from comparison queue" : `Add ${brandName} to quick comparison queue`}
      >
        <Scale className="h-4 w-4 text-white" />
        <span>{isAdded ? `Added ${brandName}` : `Quick Compare ${brandName}`}</span>
        {isAdded ? (
          <Check className="h-4 w-4 text-emerald-200" />
        ) : (
          <Plus className="h-4 w-4 text-white/80 group-hover:text-white" />
        )}
      </button>
    </div>
  );
}
