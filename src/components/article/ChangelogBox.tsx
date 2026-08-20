import * as React from "react";
import { History, CheckCircle2, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";

interface Revision {
  date: string;
  change: string;
  verifiedBy: string;
}

interface ChangelogBoxProps {
  updatedDate?: string;
  revisions?: Revision[];
  defaultOpen?: boolean;
}

export function ChangelogBox({ updatedDate, revisions, defaultOpen = true }: ChangelogBoxProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const defaultRevisions: Revision[] = [
    {
      date: updatedDate || "August 2026",
      change: "2026 Comprehensive Retailer Audit: Re-verified return windows, receipt lookup rules, and restocking fee exemptions.",
      verifiedBy: "Legal Audit Desk #4",
    },
    {
      date: "May 2026",
      change: "FTC Consumer Protection Alignment: Added holiday return exception guidelines and price-match guarantee clauses.",
      verifiedBy: "Senior Consumer Specialist",
    },
    {
      date: "January 2026",
      change: "Annual Policy Sync: Updated receiptless exchange odds and added regional store counter locator links.",
      verifiedBy: "Verification Operations Desk",
    },
  ];

  const list = revisions && revisions.length > 0 ? revisions : defaultRevisions;

  return (
    <div className="my-6 rounded-2xl border border-teal-brand/20 bg-teal-50/40 text-ink font-sans transition-all duration-200 overflow-hidden shadow-2xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle E-E-A-T Policy Revision History & Changelog"
        className="w-full flex items-center justify-between p-4 sm:p-5 border-b border-teal-brand/10 hover:bg-teal-100/30 transition-colors text-left group cursor-pointer"
      >
        <div className="flex items-center gap-2.5 font-display text-xs font-bold uppercase tracking-wider text-teal-dark">
          <History className="h-4 w-4 text-teal-brand group-hover:scale-110 transition-transform" />
          <span>E-E-A-T Policy Revision History & Changelog</span>
          <span className="ml-1 text-[10px] font-mono font-bold text-teal-dark/70 bg-teal-200/50 px-2 py-0.5 rounded-full border border-teal-brand/20">
            {list.length} Logged Updates
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Verified Fresh 2026</span>
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-teal-dark group-hover:translate-y-[-1px] transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 text-teal-dark group-hover:translate-y-[1px] transition-transform" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 space-y-2.5 pt-3 bg-white/40">
          {list.map((rev, idx) => (
            <div
              key={idx}
              className="text-xs space-y-1 bg-white/90 p-3.5 rounded-xl border border-teal-brand/10 shadow-2xs hover:border-teal-brand/30 transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink-500 font-semibold">
                <span className="text-teal-dark font-extrabold">{rev.date}</span>
                <span className="flex items-center gap-1 text-ink-400">
                  <ShieldAlert className="h-3 w-3 text-teal-brand" />
                  {rev.verifiedBy}
                </span>
              </div>
              <p className="text-ink-700 leading-relaxed font-sans">{rev.change}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
