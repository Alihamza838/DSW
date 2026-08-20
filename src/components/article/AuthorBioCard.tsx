import * as React from "react";
import { UserCheck, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface AuthorBioCardProps {
  authorName?: string;
  role?: string;
  updatedDate?: string;
  verifiedCount?: number;
}

export function AuthorBioCard({
  authorName = "MALIK UMAR",
  role = "Senior Consumer Rights & Retail Compliance Auditor",
  updatedDate = "August 2026",
  verifiedCount = 340,
}: AuthorBioCardProps) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 bg-slate-50/90 font-sans shadow-xs h-full flex flex-col justify-between space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-red-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md border-2 border-red-400 text-base">
          MU
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-display font-extrabold text-base text-slate-900">{authorName}</h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Verified Auditor & Analyst</span>
            </span>
          </div>
          <p className="text-xs font-mono text-red-700 font-bold">{role}</p>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            MALIK UMAR evaluates official terms of service, FTC retail guidelines, and statutory consumer protection rules daily. Over {verifiedCount}+ international retailer return policies audited and verified for accuracy.
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <Award className="h-3.5 w-3.5 text-amber-500" />
          <span>Independent & Unbiased Analysis</span>
        </span>
        <span className="flex items-center gap-1 font-semibold text-slate-700">
          <CheckCircle2 className="h-3.5 w-3.5 text-red-600" />
          <span>Last Reviewed: {updatedDate}</span>
        </span>
      </div>
    </div>
  );
}

