/**
 * PolicyActions.tsx - "Print / save as PDF" and "Share" for a policy page. Handy at the returns
 * desk: many shoppers bring a printout or show the page on their phone. Uses the browser's own
 * print dialog and share sheet; the link is copied to the clipboard where sharing isn't offered.
 */
import { useState } from "react";

export default function PolicyActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the visitor closed the share sheet */
    }
  };
  const btn =
    "inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line bg-card px-4 text-sm font-semibold text-ink-2 transition hover:border-brand-500 hover:text-brand-700";
  return (
    <div className="no-print flex flex-wrap gap-2">
      <button type="button" className={btn} onClick={() => window.print()}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
        </svg>
        Print / save PDF
      </button>
      <button type="button" className={btn} onClick={share}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" />
        </svg>
        <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
      </button>
    </div>
  );
}
