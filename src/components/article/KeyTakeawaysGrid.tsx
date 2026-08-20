import * as React from "react";
import { Sparkles, Check, Bookmark } from "lucide-react";

export interface TakeawayItem {
  title: string;
  detail: string;
  highlight?: string;
}

interface KeyTakeawaysGridProps {
  title?: string;
  items: TakeawayItem[];
}

export function KeyTakeawaysGrid({
  title = "Key Policy Takeaways & Executive Summary",
  items,
}: KeyTakeawaysGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-5 md:p-6 my-6 font-sans shadow-2xs">
      <div className="flex items-center gap-2.5 pb-3 border-b border-teal-200/80 mb-4">
        <div className="h-9 w-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-teal-950">{title}</h3>
          <p className="text-xs text-teal-800">Direct actionable summary for smart shoppers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3.5 bg-white rounded-xl border border-teal-100 shadow-2xs space-y-1 hover:border-teal-300 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-xs text-teal-900 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                {item.title}
              </span>
              {item.highlight && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {item.highlight}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-5">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
