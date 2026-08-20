import React from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { formatDate } from "../../lib/utils";

interface LastVerifiedBadgeProps {
  date: string;
  storeName?: string;
  officialPolicyUrl?: string;
}

export function LastVerifiedBadge({ date, storeName, officialPolicyUrl }: LastVerifiedBadgeProps) {
  // Calculate relative audit cycle
  const daysAgo = React.useMemo(() => {
    try {
      const verifiedTime = new Date(date).getTime();
      const now = new Date("2026-08-05").getTime();
      return Math.max(0, Math.floor((now - verifiedTime) / (1000 * 60 * 60 * 24)));
    } catch {
      return 14;
    }
  }, [date]);

  const daysUntilNextAudit = Math.max(1, 90 - (daysAgo % 90));

  return (
    <div className="flex flex-wrap items-center gap-2 font-sans text-xs sm:text-sm text-slate-700">
      <div className="inline-flex items-center gap-2 font-semibold text-slate-900 bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-2xs">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
        <span>
          Verified against {storeName ? `${storeName}'s` : "official"} policy on {formatDate(date)}
        </span>
      </div>

      <span className="hidden md:inline-block text-slate-400 font-mono text-xs">
        · Next check due in {daysUntilNextAudit} days
      </span>

      {officialPolicyUrl && (
        <a
          href={officialPolicyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-800 hover:underline text-xs ml-1"
        >
          <span>Official Terms</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
