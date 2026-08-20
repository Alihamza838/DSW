import * as React from "react";
import { ShieldCheck, Scale, FileText, CheckCircle2 } from "lucide-react";

interface ConsumerRightsBannerProps {
  country?: string;
  lawReference?: string;
  rightsSummary?: string[];
}

export function ConsumerRightsBanner({
  country = "United States",
  lawReference = "FTC Consumer Protection Guidelines & State Commercial Codes",
  rightsSummary = [
    "You have legal rights to a full refund if goods are defective or mislabeled.",
    "Restocking fees must be disclosed prior to or at time of purchase.",
    "Return windows cannot be retroactively shortened for past purchases."
  ],
}: ConsumerRightsBannerProps) {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 my-6 border border-slate-800 shadow-md font-sans">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
          <Scale className="h-5 w-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-teal-400 font-bold">
            Consumer Rights & Legal Protection Framework
          </span>
          <h3 className="text-base font-bold text-white">
            {country} Shopper Protections Summary
          </h3>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
        Governed under <span className="text-slate-200 font-semibold">{lawReference}</span>:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {rightsSummary.map((right, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-200"
          >
            <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{right}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Verified against 2026 consumer rights legislation</span>
        </span>
        <span className="font-mono text-slate-500">Document Code: CR-2026-US</span>
      </div>
    </div>
  );
}
