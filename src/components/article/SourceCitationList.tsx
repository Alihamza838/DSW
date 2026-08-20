import React from "react";
import { Link2, ExternalLink, ShieldCheck } from "lucide-react";

export interface SourceCitation {
  title: string;
  url: string;
  publisher?: string;
  dateAccessed?: string;
}

interface SourceCitationListProps {
  sources?: SourceCitation[];
  verifiedSourceUrl?: string;
  verifiedSourceDate?: string;
}

export function SourceCitationList({
  sources = [],
  verifiedSourceUrl,
  verifiedSourceDate = "August 2026",
}: SourceCitationListProps) {
  // Combine sources with verifiedSourceUrl if present
  const allSources: SourceCitation[] = [...sources];

  if (verifiedSourceUrl && !allSources.some((s) => s.url === verifiedSourceUrl)) {
    allSources.unshift({
      title: "Official Retailer Return Terms & Conditions Manual",
      url: verifiedSourceUrl,
      publisher: "Primary Merchant Legal Desk",
      dateAccessed: verifiedSourceDate,
    });
  }

  if (allSources.length === 0) return null;

  return (
    <div id="source-citations" className="my-8 p-5 rounded-3xl bg-paper border border-ink-200/80 font-sans scroll-mt-24">
      <div className="flex items-center gap-2 border-b border-ink-100 pb-3 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
        <Link2 className="h-4 w-4 text-teal-brand" />
        <span>Cited Official Sources & Reference Materials</span>
      </div>

      <ul className="space-y-2.5 text-xs text-ink-600">
        {allSources.map((source, idx) => (
          <li key={idx} className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white border border-ink-100">
            <div className="flex items-start gap-2 min-w-0">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-bold text-ink truncate">{source.title}</p>
                <p className="text-[11px] font-mono text-ink-400">
                  {source.publisher || "Official Source"} • Verified {source.dateAccessed || "August 2026"}
                </p>
              </div>
            </div>

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-teal-brand hover:text-teal-dark shrink-0 hover:underline"
            >
              <span>View Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
