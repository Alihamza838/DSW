import React from "react";
import { UserCheck, ShieldCheck, Clock, ExternalLink } from "lucide-react";

interface AuthorBylineProps {
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  verifiedSourceUrl?: string;
  verifiedSourceDate?: string;
  className?: string;
}

export function AuthorByline({
  author = "MALIK UMAR",
  publishedDate = "2026-01-15",
  updatedDate = "2026-08-01",
  verifiedSourceUrl,
  verifiedSourceDate = "2026-08-01",
  className = "",
}: AuthorBylineProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 pt-3 pb-4 border-y border-ink-100 text-xs text-ink-600 font-sans ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-teal-brand/15 text-teal-dark font-bold flex items-center justify-center shrink-0 border border-teal-brand/30">
          <UserCheck className="h-4 w-4 text-teal-brand" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-ink">{author}</span>
            <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              Verified Compliance Desk
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-ink-400 mt-0.5">
            <span>Published: {publishedDate}</span>
            <span>•</span>
            <span className="text-teal-dark font-semibold">
              Updated: {updatedDate}
            </span>
          </div>
        </div>
      </div>

      {verifiedSourceUrl && (
        <a
          href={verifiedSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 px-3 py-1.5 text-[11px] font-mono font-bold text-emerald-900 hover:bg-emerald-100 transition-colors shrink-0 shadow-2xs"
          title="Official Retailer Terms Source"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Terms ({verifiedSourceDate || updatedDate})</span>
          <ExternalLink className="h-3 w-3 text-emerald-700" />
        </a>
      )}
    </div>
  );
}
