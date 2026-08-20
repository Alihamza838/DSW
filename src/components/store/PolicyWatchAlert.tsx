import * as React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

interface PolicyWatchAlertProps {
  alertCount: number;
  onViewAlerts: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export function PolicyWatchAlert({
  alertCount,
  onViewAlerts,
  title = "2026 Critical Policy Watch",
  description = "Target, Walmart, Amazon, DSW, and Costco recently updated Cat & Jack receipt rules, drop-off locations, and no-receipt ID limits.",
  className = "",
}: PolicyWatchAlertProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-amber-50/90 border-l-4 border-l-amber-500 border border-amber-200/90 p-4 sm:p-5 shadow-2xs ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500 text-white text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-2xs">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-100" />
            <span>POLICY WATCH 2026</span>
          </span>
          <h3 className="text-sm sm:text-base font-bold text-amber-950 font-display">
            {title} ({alertCount} Retailers)
          </h3>
        </div>

        <button
          type="button"
          onClick={onViewAlerts}
          className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer shrink-0 flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <span>View {alertCount} Active Alerts</span>
          <ChevronRight className="h-4 w-4 text-amber-300 shrink-0" />
        </button>
      </div>

      {/* Description Body */}
      <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
}
