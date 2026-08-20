import * as React from "react";
import { AlertCircle, Globe } from "lucide-react";
import { CountryFlag } from "../ui/CountryFlag";
import { storesData } from "../../data/stores";

export interface CountryOption {
  code: string;
  name: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "All", name: "Global All" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "UAE" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "ES", name: "EU / Europe" },
];

interface CountryFilterChipsProps {
  selectedCountry: string;
  onSelectCountry: (code: string) => void;
  filterAlertsOnly: boolean;
  onToggleAlerts: () => void;
  alertStoresCount: number;
  totalStoresCount: number;
  className?: string;
}

export function CountryFilterChips({
  selectedCountry,
  onSelectCountry,
  filterAlertsOnly,
  onToggleAlerts,
  alertStoresCount,
  totalStoresCount,
  className = "",
}: CountryFilterChipsProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar sm:flex-wrap scroll-smooth">
        {/* Policy Alerts Special Chip */}
        <button
          type="button"
          onClick={onToggleAlerts}
          className={`shrink-0 min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 ${
            filterAlertsOnly
              ? "bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40"
              : "bg-amber-50 border border-amber-300/80 text-amber-900 hover:bg-amber-100"
          }`}
        >
          <AlertCircle className={`h-3.5 w-3.5 shrink-0 ${filterAlertsOnly ? "text-white" : "text-amber-600"}`} />
          <span className="whitespace-nowrap">Policy Alerts</span>
          <span
            className={`text-[10px] font-mono font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
              filterAlertsOnly ? "bg-white/25 text-white" : "bg-amber-200/90 text-amber-950"
            }`}
          >
            {alertStoresCount}
          </span>
        </button>

        {/* Global All & Country Filter Chips */}
        {COUNTRIES.map((cty) => {
          const isAll = cty.code === "All";
          const count = isAll
            ? totalStoresCount
            : storesData.filter((s) => (s.country || "US") === cty.code).length;

          const active = !filterAlertsOnly && selectedCountry === cty.code;

          return (
            <button
              key={cty.code}
              type="button"
              onClick={() => onSelectCountry(cty.code)}
              className={`shrink-0 min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95 ${
                active
                  ? "bg-red-600 text-white font-bold ring-2 ring-red-500/30 shadow-xs"
                  : "bg-slate-100/90 border border-slate-200/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              {isAll ? (
                <Globe className={`h-3.5 w-3.5 shrink-0 ${active ? "text-white" : "text-red-600"}`} />
              ) : (
                <CountryFlag code={cty.code} size="sm" />
              )}
              <span className="whitespace-nowrap font-sans">{cty.name}</span>
              <span
                className={`text-[10px] font-mono font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                  active ? "bg-white/25 text-white" : "bg-slate-200/90 text-slate-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

