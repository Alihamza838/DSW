import * as React from "react";
import { Check, Sparkles, BookOpen } from "lucide-react";

export interface KeyFactItem {
  label: string;
  detail: string;
  highlight?: string;
}

interface KeyFactsBoxProps {
  title?: string;
  summaryText: string;
  takeaways: KeyFactItem[];
}

export function KeyFactsBox({
  title = "Key Policy Takeaways",
  summaryText,
  takeaways,
}: KeyFactsBoxProps) {
  return (
    <div className="my-6 p-5 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 font-sans relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-3 text-amber-300 font-mono text-xs uppercase tracking-wider font-extrabold">
        <BookOpen className="h-4 w-4 text-teal-400" />
        <span>{title}</span>
        <span className="ml-auto bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
          <Sparkles className="h-3 w-3" /> Verified Key Facts
        </span>
      </div>

      <p className="text-sm text-slate-200 leading-relaxed font-medium mb-4 pb-3 border-b border-slate-800">
        {summaryText}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {takeaways.map((item, idx) => (
          <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 flex items-start gap-2.5">
            <div className="p-1 bg-teal-500/20 text-teal-300 rounded shrink-0 mt-0.5">
              <Check className="h-3.5 w-3.5" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block mb-0.5">{item.label}</span>
              <span className="text-slate-300">{item.detail}</span>
              {item.highlight && (
                <span className="inline-block mt-1 font-mono text-[10px] bg-teal-950 text-teal-300 px-1.5 py-0.5 rounded border border-teal-800 font-bold">
                  {item.highlight}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Keep export alias for backwards compatibility
export { KeyFactsBox as GeoTakeawaysBox };
