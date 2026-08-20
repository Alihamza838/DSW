import * as React from "react";
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, Scale, FileText } from "lucide-react";

interface ComparisonRow {
  feature: string;
  valueA: string;
  valueB: string;
}

interface ComparisonMatrixProps {
  brandA: string;
  brandB: string;
  rows: ComparisonRow[];
}

export function ComparisonMatrix({ brandA, brandB, rows }: ComparisonMatrixProps) {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold">
            <Scale className="h-4 w-4" />
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Side-by-Side Return Matrix Breakdown
          </h2>
        </div>
        <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
          2026 Verified Data
        </span>
      </div>

      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl bg-white shadow-2xs">
        <table className="w-full text-sm border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-900 text-white text-left font-display uppercase tracking-wider text-xs font-bold">
              <th className="px-4 py-3.5 w-2/5">Feature / Requirement</th>
              <th className="px-4 py-3.5 w-3/10 text-red-300">{brandA}</th>
              <th className="px-4 py-3.5 w-3/10 text-red-300">{brandB}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {rows.map((row) => {
              const isStrictA = row.valueA.toLowerCase().includes("strict") || row.valueA.toLowerCase().includes("applicable");
              const isStrictB = row.valueB.toLowerCase().includes("strict") || row.valueB.toLowerCase().includes("applicable");

              return (
                <tr key={row.feature} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-red-600 shrink-0" />
                    <span>{row.feature}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs sm:text-sm font-sans">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        isStrictA
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-red-50 text-red-900 border border-red-200/80"
                      }`}
                    >
                      {isStrictA ? (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-red-600 shrink-0" />
                      )}
                      <span>{row.valueA}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs sm:text-sm font-sans">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        isStrictB
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-red-50 text-red-900 border border-red-200/80"
                      }`}
                    >
                      {isStrictB ? (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-red-600 shrink-0" />
                      )}
                      <span>{row.valueB}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
