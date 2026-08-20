import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, ShieldCheck } from "lucide-react";
import type { FactRowItem } from "../../types/article";

interface FactTableProps {
  title?: string;
  rows?: FactRowItem[];
  factRows?: FactRowItem[];
  itemKey?: string;
}

export function FactTable({ title, rows, factRows, itemKey }: FactTableProps) {
  const items = rows || factRows || [];

  if (!items || items.length === 0) {
    return null;
  }

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "yes":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Allowed</span>
          </span>
        );
      case "no":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-700">
            <XCircle className="h-3.5 w-3.5 text-rose-600" />
            <span>Restricted</span>
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span>Conditional</span>
          </span>
        );
      case "neutral":
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
            <Info className="h-3.5 w-3.5 text-slate-500" />
            <span>Policy Detail</span>
          </span>
        );
    }
  };

  return (
    <div
      data-fact-table={itemKey || "article-fact-table"}
      className="my-6 rounded-2xl border border-ink-200 bg-white shadow-xs overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-ink-100 bg-slate-50/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-teal-brand shrink-0" />
          <h3 className="font-display text-sm sm:text-base font-bold text-ink">
            {title || "Verified Policy Snapshot & Fact Ledger"}
          </h3>
        </div>
        <span className="font-mono text-[11px] font-semibold text-teal-dark bg-teal-light/30 px-2.5 py-0.5 rounded-full border border-teal-brand/20">
          Structured Data
        </span>
      </div>

      <div className="divide-y divide-ink-100">
        {items.map((row, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-6 gap-2 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-[200px]">
              <span className="flex h-2 w-2 rounded-full bg-teal-brand shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-ink-800">
                {row.label}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-4 sm:pl-0">
              <span className="text-xs sm:text-sm font-bold text-ink-900 font-mono text-left sm:text-right">
                {row.value}
              </span>
              {row.status && getStatusBadge(row.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
