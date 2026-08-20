import * as React from "react";
import { Calendar, Clock, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

interface ReturnDeadlineCalculatorProps {
  defaultStore?: string;
  defaultDays?: number;
}

export function ReturnDeadlineCalculator({
  defaultStore = "Target",
  defaultDays = 90,
}: ReturnDeadlineCalculatorProps) {
  const [purchaseDate, setPurchaseDate] = React.useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [returnDays, setReturnDays] = React.useState<number>(defaultDays);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("standard");

  // Category presets for quick calculations
  const presets = [
    { label: "Standard Return (90 Days)", days: 90, id: "standard" },
    { label: "Electronics / Tech (30 Days)", days: 30, id: "electronics" },
    { label: "Short Window / Mobile (14 Days)", days: 14, id: "short" },
    { label: "Circle / Loyalty (120 Days)", days: 120, id: "loyalty" },
    { label: "Store Owned Brand (365 Days)", days: 365, id: "owned" },
  ];

  const deadlineInfo = React.useMemo(() => {
    if (!purchaseDate) return null;
    const bought = new Date(purchaseDate);
    if (isNaN(bought.getTime())) return null;

    const deadline = new Date(bought);
    deadline.setDate(deadline.getDate() + returnDays);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffMs = deadline.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const isExpired = daysRemaining < 0;
    const isUrgent = daysRemaining >= 0 && daysRemaining <= 7;

    return {
      deadlineFormatted: deadline.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      daysRemaining,
      isExpired,
      isUrgent,
    };
  }, [purchaseDate, returnDays]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 md:p-6 shadow-md border border-slate-800 space-y-4 my-6 font-sans">
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
        <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Return Deadline Calculator</h3>
          <p className="text-xs text-slate-400">
            Calculate your exact last return date for {defaultStore} or custom purchases
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Purchase Date Input */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1.5">
            Purchase / Delivery Date
          </label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400 text-sm font-mono"
          />
        </div>

        {/* Custom Window Days */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1.5">
            Allowed Return Window (Days)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={730}
              value={returnDays}
              onChange={(e) => {
                setReturnDays(Number(e.target.value) || 30);
                setSelectedCategory("custom");
              }}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400 text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setReturnDays(preset.days);
              setSelectedCategory(preset.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === preset.id
                ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Result Display */}
      {deadlineInfo && (
        <div
          className={`p-4 rounded-xl border transition-all ${
            deadlineInfo.isExpired
              ? "bg-rose-950/40 border-rose-800/80 text-rose-200"
              : deadlineInfo.isUrgent
              ? "bg-amber-950/40 border-amber-800/80 text-amber-200"
              : "bg-emerald-950/40 border-emerald-800/80 text-emerald-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider opacity-80">
                Calculated Return Deadline
              </span>
              <div className="text-base sm:text-xl font-extrabold flex items-center gap-2">
                <span>{deadlineInfo.deadlineFormatted}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              {deadlineInfo.isExpired ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Window Expired ({Math.abs(deadlineInfo.daysRemaining)} days ago)</span>
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs ${
                    deadlineInfo.isUrgent
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {deadlineInfo.daysRemaining === 0
                      ? "Expires Today!"
                      : `${deadlineInfo.daysRemaining} Days Remaining`}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs opacity-90 mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-400" />
            <span>
              Tip: In-store returns process immediately up until store closing on this date. Mail returns must be postmarked by this deadline.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
