import * as React from "react";
import { ShieldCheck, UserCheck, ExternalLink, Calendar, CheckCircle2, Bot, Hash, Clock, Sparkles } from "lucide-react";
import { getCrawlVerificationDetails } from "../../utils/crawlVerifier";

interface VerifiedSourceBadgeProps {
  author?: string;
  updatedAt?: string;
  storeSlug?: string;
  storeName?: string;
  officialPolicyUrl?: string;
}

export function VerifiedSourceBadge({
  author = "DSWReturnRefund Editorial Team",
  updatedAt = "2026-08-01",
  storeSlug = "store",
  storeName,
  officialPolicyUrl,
}: VerifiedSourceBadgeProps) {
  const crawlDetails = getCrawlVerificationDetails(updatedAt, storeSlug, storeName || "Store");

  const verifiedText = storeName
    ? `Verified against ${storeName}'s official terms on ${crawlDetails.formattedDate}`
    : `Verified against official terms on ${crawlDetails.formattedDate}`;

  return (
    <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-ink font-sans print:bg-white print:border-slate-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-medium text-slate-700">
            {verifiedText} · <span className="text-slate-500 font-mono">Next check due {crawlDetails.nextScheduledCrawl}</span>
          </span>
        </div>

        {officialPolicyUrl && (
          <a
            href={officialPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-teal-brand font-bold hover:underline text-xs shrink-0"
          >
            <span>Official Direct Source</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}

// Keep export alias for backwards compatibility
export { VerifiedSourceBadge as EeatAuditBadge };

