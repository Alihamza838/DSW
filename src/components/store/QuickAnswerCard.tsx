import React, { useState } from "react";
import type { QuickAnswer } from "../../types";
import { formatDate } from "../../lib/utils";
import { Copy, Check } from "lucide-react";

export function QuickAnswerCard({ brand, data, lastVerified }: { brand: string; data: QuickAnswer; lastVerified?: string }) {
  const [copied, setCopied] = useState(false);

  const rows = [
    { label: "Return window", value: data.returnWindow },
    { label: "Receipt required", value: data.receiptRequired ? "Yes" : "No - lookup available" },
    { label: "Restocking fee", value: data.restockingFee ? "Yes, on some items" : "None" },
    { label: "Refund method", value: data.refundMethod },
    { label: "Online returns", value: data.onlineReturns ? "Accepted" : "Not accepted" },
    { label: "In-store returns", value: data.inStoreReturns ? "Accepted" : "Not accepted" },
  ];

  const handleCopy = async () => {
    const text = `[${brand.toUpperCase()} RETURN POLICY SUMMARY 2026]
Window: ${data.returnWindow}
Receipt Required: ${data.receiptRequired ? "Yes" : "No (Card/account lookup)"}
Restocking Fee: ${data.restockingFee ? "Yes" : "None"}
Refund Method: ${data.refundMethod}
Audited: ${lastVerified ? formatDate(lastVerified) : "2026"}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="receipt-card px-6 pb-6 pt-6 font-mono border border-slate-200 rounded-xl bg-white shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Quick Summary · {brand}</p>
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors cursor-pointer border border-red-200/60"
          title="Copy policy summary to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-red-600" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <dl className="space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-slate-200 pb-2">
            <dt className="text-slate-500 text-xs">{row.label}</dt>
            <dd className="text-right font-semibold text-slate-900 text-xs flex items-center gap-1.5">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {lastVerified && (
        <div className="mt-5 pt-4 border-t border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Verification Stamp</p>
          <p className="text-[11px] font-bold text-red-600 uppercase">
            Audited: {formatDate(lastVerified)}
          </p>
          {/* Authentic simulated receipt barcode */}
          <div className="mt-3.5 flex items-center justify-center h-6 gap-[1.5px] opacity-60 hover:opacity-90 transition-opacity" title="Verified Policy Barcode">
            {[1, 3, 1, 2, 4, 1, 3, 2, 1, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2].map((w, idx) => (
              <span
                key={idx}
                className="bg-slate-800"
                style={{
                  width: `${w}px`,
                  height: "100%",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
          <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
            * {brand.toUpperCase().replace(/\s+/g, "")}-2026-OK *
          </span>
        </div>
      )}
    </div>
  );
}
