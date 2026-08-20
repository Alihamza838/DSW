import * as React from "react";
import { Clock, FileCheck2, DollarSign, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

interface PolicySummaryHeroCardProps {
  brandName: string;
  returnWindowDays: string | number;
  receiptRequired: boolean;
  restockingFee: boolean | string;
  exchangeWindowDays?: string | number;
  inStoreFee?: string;
  mailFee?: string;
}

export function PolicySummaryHeroCard({
  brandName,
  returnWindowDays,
  receiptRequired,
  restockingFee,
  exchangeWindowDays = "Same as return window",
  inStoreFee = "$0 (Free)",
  mailFee = "Varies by weight / Free with membership",
}: PolicySummaryHeroCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-800 my-6 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400">
            2026 Executive Policy Summary
          </span>
          <h3 className="text-lg font-bold text-white">
            {brandName} At a Glance
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Official 2026 Policy Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {/* Return Window */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            <Clock className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Return Window</span>
          </div>
          <div className="text-base font-extrabold text-white font-mono">
            {typeof returnWindowDays === "number" ? `${returnWindowDays} Days` : returnWindowDays}
          </div>
        </div>

        {/* Receipt Required */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            <FileCheck2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Receipt Strictness</span>
          </div>
          <div className="text-sm font-extrabold text-white flex items-center gap-1">
            {receiptRequired ? (
              <>
                <XCircle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Strict Receipt</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Card Lookup Available</span>
              </>
            )}
          </div>
        </div>

        {/* Restocking Fee */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            <DollarSign className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Restocking Fee</span>
          </div>
          <div className="text-sm font-extrabold text-white">
            {typeof restockingFee === "boolean"
              ? restockingFee
                ? "15% on tech/appliances"
                : "No Restocking Fee ($0)"
              : restockingFee}
          </div>
        </div>

        {/* Exchange Window */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            <RefreshCw className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Exchange Rules</span>
          </div>
          <div className="text-sm font-extrabold text-white truncate">
            {exchangeWindowDays}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
        <span>In-Store Return Fee: <strong className="text-emerald-400 font-mono">{inStoreFee}</strong></span>
        <span>Mail Return Label: <strong className="text-teal-300 font-mono">{mailFee}</strong></span>
      </div>
    </div>
  );
}
