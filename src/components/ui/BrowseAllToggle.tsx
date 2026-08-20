import * as React from "react";
import { Globe, ShieldAlert, Sparkles } from "lucide-react";

interface BrowseAllToggleProps {
  isGlobalMode: boolean;
  onToggle: (enableGlobal: boolean) => void;
  className?: string;
}

export function BrowseAllToggle({ isGlobalMode, onToggle, className = "" }: BrowseAllToggleProps) {
  return (
    <div className={`inline-flex items-center gap-3 p-1.5 bg-paper-muted/80 border border-ink-200 rounded-xl shadow-inner ${className}`}>
      <button
        type="button"
        onClick={() => onToggle(false)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
          !isGlobalMode
            ? "bg-teal-dark text-white shadow-sm"
            : "text-ink-600 hover:text-ink hover:bg-white/50"
        }`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>My Region Only</span>
      </button>

      <button
        type="button"
        onClick={() => onToggle(true)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
          isGlobalMode
            ? "bg-amber-600 text-white shadow-sm"
            : "text-ink-600 hover:text-ink hover:bg-white/50"
        }`}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>Browse All Markets</span>
        {isGlobalMode && (
          <span className="text-[10px] bg-amber-800 text-amber-100 font-mono px-1.5 py-0.2 rounded font-extrabold uppercase">
            Global
          </span>
        )}
      </button>
    </div>
  );
}
