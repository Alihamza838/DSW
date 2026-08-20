import React, { useState } from "react";
import { CheckSquare, Square, CheckCircle2, AlertTriangle, XCircle, Info, Sparkles, HelpCircle } from "lucide-react";
import { StoreFrontmatter } from "../../types";

interface ReturnEligibilityChecklistProps {
  store: StoreFrontmatter;
  className?: string;
}

interface Criterion {
  id: string;
  label: string;
  sublabel: string;
  requiredForCash: boolean;
}

export function ReturnEligibilityChecklist({ store, className = "" }: ReturnEligibilityChecklistProps) {
  // Checklist states
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    tags: true,
    condition: true,
    packaging: true,
    proof: true,
    window: true,
    notFinalSale: true,
  });

  const criteria: Criterion[] = [
    {
      id: "window",
      label: `Within ${store.quickAnswer.returnWindow} Return Window`,
      sublabel: `Purchased within the allowed timeframe (${store.quickAnswer.returnWindow}).`,
      requiredForCash: true,
    },
    {
      id: "proof",
      label: "Proof of Purchase Available",
      sublabel: "Paper receipt, digital app barcode, order confirmation email, or original payment card.",
      requiredForCash: true,
    },
    {
      id: "condition",
      label: "Unworn & Clean Condition",
      sublabel: "Free of sole wear, dirt, makeup stains, perfume odors, or signs of heavy usage.",
      requiredForCash: true,
    },
    {
      id: "tags",
      label: "Original Price Tags & Labels Attached",
      sublabel: "Original hangtags, UPC barcodes, or brand stickers attached to item.",
      requiredForCash: false,
    },
    {
      id: "packaging",
      label: "Original Box or Product Packaging Included",
      sublabel: "Original shoe box, brand box, plastic sleeve, or manual included.",
      requiredForCash: false,
    },
    {
      id: "notFinalSale",
      label: "Not Marked 'Final Sale' or Clearance",
      sublabel: "Item was not sold as a non-returnable clearance item or hygiene-restricted product.",
      requiredForCash: true,
    },
  ];

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate score
  const totalCount = criteria.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllChecked = checkedCount === totalCount;
  const missingWindow = !checkedItems.window;
  const missingProof = !checkedItems.proof;
  const missingCondition = !checkedItems.condition;
  const isFinalSale = !checkedItems.notFinalSale;

  const uncheckedCount = totalCount - checkedCount;

  let statusTitle = "100% Ready for Direct Cash or Card Refund";
  let statusBadgeColor = "bg-emerald-50 text-emerald-900 border-emerald-300";

  if (uncheckedCount > 0) {
    statusTitle = `${uncheckedCount} of ${totalCount} items need attention before return`;
    statusBadgeColor = "bg-amber-50 text-amber-900 border-amber-300";
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs font-sans ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-brand" />
            <h3 className="font-display text-lg font-bold text-ink">
              {store.brand} Return Eligibility Verification
            </h3>
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Check off your item status to ensure a fast, hassle-free return experience.
          </p>
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1.5 rounded-xl border font-sans text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto ${statusBadgeColor}`}>
          {uncheckedCount === 0 ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{statusTitle}</span>
        </div>
      </div>

      {/* Interactive Checklist items */}
      <div className="mt-4 space-y-2.5">
        {criteria.map((c) => {
          const isChecked = !!checkedItems[c.id];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleItem(c.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                isChecked
                  ? "bg-teal-50/50 border-teal-200/80 text-ink-900"
                  : "bg-slate-50/70 border-slate-200/80 text-ink-600 hover:bg-slate-100/60"
              }`}
            >
              <div className="mt-0.5 shrink-0 text-teal-brand">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-teal-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs sm:text-sm font-bold ${isChecked ? "text-ink-900" : "text-ink-600 line-through opacity-75"}`}>
                    {c.label}
                  </span>
                  {c.requiredForCash && (
                    <span className="text-[10px] font-mono uppercase bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                      Required for Cash
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-ink-500 mt-0.5 leading-relaxed">
                  {c.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Outcome Advice Panel */}
      <div className="mt-5 p-4 rounded-xl border bg-slate-50 space-y-2">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-brand" />
          {store.brand} Return Action Recommendation
        </h4>

        {status === "eligible" && (
          <p className="text-xs text-ink-700 leading-relaxed flex items-start gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>All requirements met!</strong> You qualify for a 100% refund back to your original payment method. Bring your item and proof of purchase to any {store.brand} physical store or initiate a mail return in your account.
            </span>
          </p>
        )}

        {status === "warning" && (
          <div className="space-y-1 text-xs text-amber-950">
            <p className="leading-relaxed flex items-center gap-1.5 font-bold">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Potential Restrictions:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-900 font-medium pl-5">
              {missingProof && (
                <li>Without a receipt, {store.brand} will attempt to look up your order via credit card or app barcode. If untraceable, you may receive merchandise store credit at the lowest recent sale price.</li>
              )}
              {missingWindow && (
                <li>Past the standard {store.quickAnswer.returnWindow} return window, cash refunds are closed. Store managers may occasionally approve store credit for unopened items.</li>
              )}
            </ul>
          </div>
        )}

        {status === "ineligible" && (
          <div className="space-y-1 text-xs text-rose-950">
            <p className="leading-relaxed flex items-center gap-1.5 font-bold">
              <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>High Rejection Risk:</span>
            </p>
            <p className="text-[11px] text-rose-900 font-medium leading-relaxed pl-5">
              {isFinalSale
                ? "Final sale and worn items cannot be returned for remorse. However, if the item arrived defective or damaged, federal law requires merchant remedy."
                : "Worn or damaged items are strictly non-returnable unless you are claiming a manufacturer defect."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
