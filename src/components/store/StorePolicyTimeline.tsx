import * as React from "react";
import { History, ShieldCheck, Clock, CheckCircle, ArrowRight } from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  badge?: string;
  isLatest?: boolean;
}

interface StorePolicyTimelineProps {
  brandName: string;
  events?: TimelineEvent[];
}

export function StorePolicyTimeline({
  brandName,
  events = [
    {
      year: "2026 Update",
      title: "Digital Receipt Lookup & Extended Member Safeguards",
      description: "App-integrated barcode lookup introduced to eliminate paper receipt dependency across physical store locations.",
      badge: "Verified 2026",
      isLatest: true,
    },
    {
      year: "2025 Shift",
      title: "Drop-off Partner Expansion",
      description: "Added expanded third-party drop-off locations (UPS, Kohl's, Staples) for instant $0 return label processing.",
      badge: "Verified 2025",
    },
    {
      year: "2024 Policy Adjustment",
      title: "Refined Electronics & Category Windows",
      description: "Standardized 14-day to 30-day windows on high-demand tech items to curb open-box depreciation.",
      badge: "Historical Audit",
    },
  ],
}: StorePolicyTimelineProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-2xs my-6 font-sans">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
        <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold shrink-0">
          <History className="h-5 w-5 text-teal-700" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {brandName} Policy Timeline & Verified Changes
          </h3>
          <p className="text-xs text-slate-500">
            Audited history of policy shifts, return window adjustments & member perks
          </p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Dot marker */}
            <div
              className={`absolute -left-[1.65rem] top-1 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                event.isLatest
                  ? "bg-teal-600 border-white ring-4 ring-teal-100"
                  : "bg-slate-300 border-white"
              }`}
            />

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/70">
                  {event.year}
                </span>
                {event.badge && (
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      event.isLatest
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {event.badge}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900">{event.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
