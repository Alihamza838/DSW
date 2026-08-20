import * as React from "react";
import { Tag, Clock, AlertCircle, ShieldAlert } from "lucide-react";

export interface CategoryRule {
  categoryName: string;
  returnWindowDays: number | string;
  conditionNote?: string;
  isRestricted?: boolean;
}

interface StoreCategoryBadgeListProps {
  brandName: string;
  categories: CategoryRule[];
}

export function StoreCategoryBadgeList({
  brandName,
  categories,
}: StoreCategoryBadgeListProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-2xs my-6 font-sans">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
        <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold shrink-0">
          <Tag className="h-5 w-5 text-teal-700" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {brandName} Category Specific Return Windows
          </h3>
          <p className="text-xs text-slate-500">
            Return window breakdown by product type and category restrictions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border transition-all ${
              cat.isRestricted
                ? "bg-amber-50/50 border-amber-200/80 text-amber-950"
                : "bg-slate-50/70 border-slate-200/80 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-bold text-xs truncate">{cat.categoryName}</span>
              <span
                className={`font-mono font-bold text-xs px-2 py-0.5 rounded-md shrink-0 ${
                  cat.isRestricted
                    ? "bg-amber-200/70 text-amber-900"
                    : "bg-teal-100 text-teal-800"
                }`}
              >
                {typeof cat.returnWindowDays === "number"
                  ? `${cat.returnWindowDays} Days`
                  : cat.returnWindowDays}
              </span>
            </div>

            {cat.conditionNote && (
              <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-slate-200/60">
                {cat.isRestricted ? (
                  <AlertCircle className="h-3 w-3 text-amber-600 shrink-0" />
                ) : (
                  <Clock className="h-3 w-3 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{cat.conditionNote}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
