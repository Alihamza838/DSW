import React, { useState } from "react";
import { Calendar, Gift, CheckCircle2, Clock, Sparkles, AlertCircle } from "lucide-react";
import { storesData } from "../../data/stores";
import { Button } from "../ui/button";

interface HolidayDeadlineCalculatorProps {
  initialStoreSlug?: string;
  className?: string;
}

export function HolidayDeadlineCalculator({ initialStoreSlug = "target", className = "" }: HolidayDeadlineCalculatorProps) {
  const [selectedStoreSlug, setSelectedStoreSlug] = useState(initialStoreSlug);
  const [purchaseDate, setPurchaseDate] = useState(() => {
    // Default to a date during the holiday season or today
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [isLoyaltyMember, setIsLoyaltyMember] = useState(false);

  const selectedStore = storesData.find((s) => s.slug === selectedStoreSlug) || storesData[0];

  // Calculate return deadline considering store rules & holiday extensions
  const calculateDeadline = () => {
    const pDate = new Date(purchaseDate);
    if (isNaN(pDate.getTime())) return null;

    const month = pDate.getMonth(); // 0-indexed (9 = Oct, 10 = Nov, 11 = Dec)
    const year = pDate.getFullYear();
    const isHolidayPurchase = month >= 9 && month <= 11; // Oct 1 - Dec 31

    let returnDays = 30; // fallback
    let isHolidayExtended = false;
    let extensionNote = "";

    // Parse base return window
    const windowText = selectedStore.quickAnswer.returnWindow.toLowerCase();
    if (windowText.includes("365")) returnDays = 365;
    else if (windowText.includes("180")) returnDays = 180;
    else if (windowText.includes("120")) returnDays = 120;
    else if (windowText.includes("90")) returnDays = 90;
    else if (windowText.includes("60")) returnDays = 60;
    else if (windowText.includes("45")) returnDays = 45;
    else if (windowText.includes("30")) returnDays = 30;
    else if (windowText.includes("15") || windowText.includes("14")) returnDays = 14;

    // Loyalty extensions
    if (isLoyaltyMember) {
      if (selectedStore.slug.startsWith("dsw")) returnDays = 365; // VIP Elite
      else if (selectedStore.slug.startsWith("target")) returnDays = Math.max(returnDays, 120); // Circle Card
      else if (selectedStore.slug.startsWith("nike")) returnDays = Math.max(returnDays, 60); // Nike Member
      else if (selectedStore.slug.startsWith("bestbuy")) returnDays = Math.max(returnDays, 60); // Plus/Total
    }

    // Holiday extensions logic for 2025-2026
    let deadlineDate = new Date(pDate);

    if (isHolidayPurchase) {
      if (selectedStore.slug.startsWith("amazon") || selectedStore.slug.startsWith("walmart")) {
        // Extended through Jan 31 of next year
        const targetYear = year + 1;
        const jan31 = new Date(targetYear, 0, 31);
        if (jan31 > deadlineDate) {
          deadlineDate = jan31;
          isHolidayExtended = true;
          extensionNote = `Extended 2025-2026 Holiday Window: Purchases between Oct 1 and Dec 31 qualify for returns through January 31, ${targetYear}!`;
        }
      } else if (selectedStore.slug.startsWith("bestbuy")) {
        const targetYear = year + 1;
        const jan14 = new Date(targetYear, 0, 14);
        if (jan14 > deadlineDate) {
          deadlineDate = jan14;
          isHolidayExtended = true;
          extensionNote = `Best Buy Holiday Policy: Electronics purchased Oct 27 - Dec 30 are returnable through January 14, ${targetYear}.`;
        }
      } else if (selectedStore.slug.startsWith("target")) {
        const targetYear = year + 1;
        const jan24 = new Date(targetYear, 0, 24);
        if (jan24 > deadlineDate) {
          deadlineDate = jan24;
          isHolidayExtended = true;
          extensionNote = `Target Holiday Policy: Electronics & toys purchased Oct 1 - Dec 24 qualify for extended return windows through late January ${targetYear}.`;
        }
      }
    }

    if (!isHolidayExtended) {
      deadlineDate.setDate(deadlineDate.getDate() + returnDays);
    }

    // Days remaining from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      deadlineDate: deadlineDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      daysRemaining,
      isHolidayExtended,
      extensionNote,
      returnDays,
    };
  };

  const result = calculateDeadline();

  return (
    <div className={`bg-gradient-to-br from-white via-red-50/30 to-slate-50 border border-red-200/80 rounded-2xl p-6 shadow-xs font-sans space-y-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-red-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-600 text-white rounded-xl shadow-2xs">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-ink">
              2026 Return Deadline & Holiday Calculator
            </h3>
            <p className="text-xs text-ink-600">
              Calculate exact expiration dates and holiday extension perks
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono uppercase font-bold text-red-700 bg-red-100/80 px-2.5 py-1 rounded-full border border-red-300">
          <Sparkles className="h-3 w-3 text-red-600" />
          Live Policy Data
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Store selector */}
        <div>
          <label htmlFor="holiday-calc-store" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            Select Retailer
          </label>
          <select
            id="holiday-calc-store"
            value={selectedStoreSlug}
            onChange={(e) => setSelectedStoreSlug(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            {storesData.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.brand} ({s.country || "US"})
              </option>
            ))}
          </select>
        </div>

        {/* Purchase Date picker */}
        <div>
          <label htmlFor="holiday-calc-date" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            Purchase Date
          </label>
          <input
            id="holiday-calc-date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-red-600 focus:outline-none"
          />
        </div>

        {/* Loyalty Tier check */}
        <div>
          <label htmlFor="holiday-calc-loyalty" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            Membership / Card Tier
          </label>
          <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs font-medium text-ink-800">
            <input
              id="holiday-calc-loyalty"
              type="checkbox"
              checked={isLoyaltyMember}
              onChange={(e) => setIsLoyaltyMember(e.target.checked)}
              className="rounded border-slate-300 text-red-600 focus:ring-red-600 h-4 w-4"
            />
            <span>Store Member / Cardholder</span>
          </label>
        </div>
      </div>

      {/* Result Display Card */}
      {result && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-ink-500 block">Exact Return Expiration Deadline</span>
              <span className="font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                {result.deadlineDate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {result.daysRemaining > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-800 border border-red-200 text-xs font-mono font-bold">
                  <Clock className="h-3.5 w-3.5 text-red-600" />
                  {result.daysRemaining} Days Remaining
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-mono font-bold">
                  <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                  Window Expired ({Math.abs(result.daysRemaining)} Days Ago)
                </span>
              )}
            </div>
          </div>

          {result.isHolidayExtended && (
            <div className="p-3 rounded-lg bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs space-y-1">
              <span className="font-bold font-mono uppercase tracking-wider block text-amber-900 inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                <span>Holiday Window Applied</span>
              </span>
              <p>{result.extensionNote}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans text-ink-700 pt-1">
            <div>
              <span className="text-ink-400 block font-mono text-[10px] uppercase">Base Window</span>
              <strong className="text-ink-900">{selectedStore.quickAnswer.returnWindow}</strong>
            </div>
            <div>
              <span className="text-ink-400 block font-mono text-[10px] uppercase">Receipt Required?</span>
              <strong className="text-ink-900">{selectedStore.quickAnswer.receiptRequired ? "Yes (Card Lookup OK)" : "No / Easy Lookup"}</strong>
            </div>
            <div>
              <span className="text-ink-400 block font-mono text-[10px] uppercase">In-Store Dropoff</span>
              <strong className="text-red-700 font-bold">100% Free ($0)</strong>
            </div>
            <div>
              <span className="text-ink-400 block font-mono text-[10px] uppercase">Restocking Fee</span>
              <strong className="text-ink-900">{selectedStore.quickAnswer.restockingFee ? "Applicable" : "$0.00 Fee"}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
