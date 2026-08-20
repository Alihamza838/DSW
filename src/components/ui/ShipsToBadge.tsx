import * as React from "react";
import { Globe, Truck } from "lucide-react";

interface ShipsToBadgeProps {
  label?: string;
  flag?: string;
  storeCountry?: string;
  variant?: "prominent" | "compact" | "banner";
  className?: string;
}

export function ShipsToBadge({
  label,
  flag,
  storeCountry = "US",
  variant = "prominent",
  className = "",
}: ShipsToBadgeProps) {
  const isGlobal = storeCountry === "CN" || label?.includes("Global") || label?.includes("Worldwide");

  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
          isGlobal
            ? "bg-sky-50 text-sky-800 border-sky-200"
            : "bg-amber-50 text-amber-900 border-amber-200"
        } ${className}`}
        title={label}
      >
        {flag ? (
          <span className="text-xs">{flag}</span>
        ) : (
          <Globe className="h-3 w-3 shrink-0" />
        )}
        <span className="truncate">{label || "Market Restricted"}</span>
      </span>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={`w-full px-2.5 py-1 text-[11px] font-mono font-bold flex items-center justify-between gap-1.5 border-b ${
          isGlobal
            ? "bg-sky-950 text-sky-200 border-sky-800"
            : "bg-amber-950 text-amber-200 border-amber-800"
        } ${className}`}
      >
        <span className="flex items-center gap-1.5 truncate">
          <Truck className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span className="truncate">{label}</span>
        </span>
        <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider opacity-80">
          Scope Verified
        </span>
      </div>
    );
  }

  // Default Prominent
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-extrabold shadow-sm border ${
        isGlobal
          ? "bg-sky-50 text-sky-900 border-sky-300"
          : "bg-amber-50 text-amber-950 border-amber-300"
      } ${className}`}
    >
      {flag ? (
        <span className="text-sm shrink-0">{flag}</span>
      ) : (
        <Globe className="h-3.5 w-3.5 shrink-0" />
      )}
      <span className="truncate tracking-tight">{label}</span>
    </div>
  );
}
