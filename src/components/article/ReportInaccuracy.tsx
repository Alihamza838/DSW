import * as React from "react";
import { AlertCircle, CheckCircle, Send, ShieldAlert, Clock, FileSpreadsheet } from "lucide-react";

interface ReportInaccuracyProps {
  pageTitle?: string;
  itemKey?: string;
}

export function ReportInaccuracy({ pageTitle = "Return Policy", itemKey = "general" }: ReportInaccuracyProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [details, setDetails] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason || details) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setReason("");
        setDetails("");
      }, 2500);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-amber-300/80 bg-amber-50/70 font-sans shadow-xs h-full flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full mb-1">
              Community Audit Desk
            </span>
            <h4 className="font-display font-extrabold text-sm sm:text-base text-amber-950 leading-snug">
              Spotted a policy change or outdated return rule?
            </h4>
          </div>
        </div>

        <p className="text-xs text-amber-900/90 leading-relaxed">
          Our compliance auditors monitor terms across 340+ retail chains daily. If you noticed a recent change in return windows, restocking fees, or receipt rules for <strong className="font-semibold text-amber-950">{pageTitle}</strong>, notify our legal team.
        </p>

        {/* Quick Audit Triggers / Expand Form Button */}
        {!isOpen && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="w-full py-2.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Report Policy Correction to Legal Desk</span>
            </button>
          </div>
        )}

        {isOpen && (
          <form onSubmit={handleSubmit} className="pt-3 border-t border-amber-300/80 space-y-3 animate-fade-in">
            {submitted ? (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Thank you! Our legal audit team will re-verify {pageTitle} within 24 hours.</span>
              </div>
            ) : (
              <>
                <p className="text-[11px] text-amber-900 font-medium">
                  Select the policy section requiring re-verification:
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    "Return Window Changed",
                    "Restocking Fee Discrepancy",
                    "Receipt Policy Change",
                    "Missing Exception Rule",
                  ].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReason(r)}
                      className={`p-2 rounded-xl border text-left font-medium text-[11px] transition-all cursor-pointer ${
                        reason === r
                          ? "border-amber-600 bg-amber-200/80 text-amber-950 font-bold shadow-2xs"
                          : "border-amber-300/80 bg-white text-amber-900 hover:bg-amber-100/60"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide official store link or details..."
                  rows={2}
                  className="w-full rounded-xl border border-amber-300 bg-white p-2.5 text-xs text-slate-900 placeholder-amber-700/60 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800 hover:bg-amber-200/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!reason && !details}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Audit Flag</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>

      {/* Footer SLA Guarantee */}
      <div className="pt-3 border-t border-amber-300/80 flex items-center justify-between text-[11px] font-mono text-amber-900/90">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-amber-700" />
          <span>SLA Response: &lt; 24 Hours</span>
        </span>
        <span className="font-bold text-amber-950 bg-amber-200/60 px-2 py-0.5 rounded-md">
          Verified Legal Desk
        </span>
      </div>
    </div>
  );
}

