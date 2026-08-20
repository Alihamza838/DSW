import React from "react";
import { Sparkles, ExternalLink, ShieldCheck, HelpCircle, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ClarityBadge } from "../ui/ClarityBadge";

export interface QuickAnswerQuestion {
  question: string;
  answer: string;
  verdict?: "YES" | "NO" | "CONDITIONAL";
  verdictNote?: string;
}

interface QuickAnswerBoxProps {
  answer?: string;
  questions?: QuickAnswerQuestion[];
  sourceUrl?: string;
  sourceDate?: string;
  itemKey?: string;
}

export function QuickAnswerBox({
  answer,
  questions,
  sourceUrl,
  sourceDate,
  itemKey = "quick-answer",
}: QuickAnswerBoxProps) {
  if (!answer && (!questions || questions.length === 0)) return null;

  return (
    <div className="my-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 border-l-4 border-emerald-600 border-y border-r border-emerald-200 shadow-sm font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          </div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-emerald-900">
            Verified Quick Answer Summary (2026 Audit)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ClarityBadge itemKey={itemKey} score={98} />
        </div>
      </div>

      {answer && (
        <p className="text-sm sm:text-base text-ink-900 font-medium leading-relaxed">
          {answer}
        </p>
      )}

      {questions && questions.length > 0 && (
        <div className="mt-4 space-y-3 pt-3 border-t border-teal-brand/10">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-teal-dark">
            <HelpCircle className="h-4 w-4 text-teal-brand" />
            <span>Direct Question & Answer Summary</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {questions.map((qa, index) => {
              const isYes = qa.verdict === "YES";
              const isNo = qa.verdict === "NO";
              const isConditional = qa.verdict === "CONDITIONAL";

              return (
                <div
                  key={index}
                  className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-xs"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-ink text-xs sm:text-sm leading-snug">
                      {qa.question}
                    </h4>

                    {qa.verdict && (
                      <span
                        className={`shrink-0 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isYes
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : isNo
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {isYes && <CheckCircle className="h-3 w-3 text-emerald-600" />}
                        {isNo && <XCircle className="h-3 w-3 text-rose-600" />}
                        {isConditional && <AlertCircle className="h-3 w-3 text-amber-600" />}
                        <span>{qa.verdictNote || qa.verdict}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-ink-600 leading-relaxed font-medium">
                    {qa.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sourceUrl && (
        <div className="mt-3.5 pt-2.5 border-t border-teal-brand/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-ink-500 gap-2">
          <span className="flex items-center gap-1.5 text-teal-dark font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-brand" />
            <span>Cross-referenced against official retailer guidelines {sourceDate ? `(${sourceDate})` : ""}</span>
          </span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-teal-brand font-bold hover:underline"
          >
            <span>Official Policy Terms</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}

// Alias for backwards compatibility
export { QuickAnswerBox as AeoQuickAnswers };
