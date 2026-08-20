import * as React from "react";
import { AlertCircle, Globe } from "lucide-react";

interface PolicyAlertsAndRegionToggleProps {
  filterAlertsOnly: boolean;
  onToggleAlerts: () => void;
  alertStoresCount: number;
  totalStoresCount: number;
  selectedCountry: string;
  onSelectCountry: (code: string) => void;
  className?: string;
}

export function PolicyAlertsAndRegionToggle({
  filterAlertsOnly,
  onToggleAlerts,
  alertStoresCount,
  totalStoresCount,
  selectedCountry,
  onSelectCountry,
  className = "",
}: PolicyAlertsAndRegionToggleProps) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Policy Alerts Pill */}
      <button
        type="button"
        onClick={onToggleAlerts}
        className={`min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 ${
          filterAlertsOnly
            ? "bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/50"
            : "bg-amber-50/90 border border-amber-300 text-amber-900 hover:bg-amber-100"
        }`}
      >
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 font-bold" />
        <span>Policy Alerts</span>
        <span
          className={`text-[11px] font-mono font-bold rounded-full px-2 py-0.5 ${
            filterAlertsOnly ? "bg-white/20 text-white" : "bg-amber-200 text-amber-900"
          }`}
        >
          {alertStoresCount}
        </span>
      </button>

      {/* Global All Stores Pill */}
      <button
        type="button"
        onClick={() => {
          onSelectCountry("All");
        }}
        className={`min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 ${
          selectedCountry === "All" && !filterAlertsOnly
            ? "bg-slate-900 text-white shadow-xs ring-2 ring-slate-400/50"
            : "bg-white border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
        }`}
      >
        <Globe className="h-4 w-4 shrink-0 text-teal-600" />
        <span>Global Index</span>
        <span
          className={`text-[11px] font-mono font-bold rounded-full px-2 py-0.5 ${
            selectedCountry === "All" && !filterAlertsOnly
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {totalStoresCount}
        </span>
      </button>
    </div>
  );
}
