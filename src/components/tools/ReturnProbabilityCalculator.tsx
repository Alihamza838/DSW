import React, { useState } from "react";
import { Calculator, CheckCircle2, AlertTriangle, XCircle, Info, ShieldCheck, RefreshCw } from "lucide-react";
import { storesData } from "../../data/stores";
import { Button } from "../ui/button";

interface ReturnProbabilityCalculatorProps {
  initialStoreSlug?: string;
  className?: string;
}

export function ReturnProbabilityCalculator({ initialStoreSlug = "target", className = "" }: ReturnProbabilityCalculatorProps) {
  const [storeSlug, setStoreSlug] = useState(initialStoreSlug);
  const [timeframe, setTimeframe] = useState<"within-window" | "past-window" | "way-past">("within-window");
  const [proof, setProof] = useState<"receipt" | "app" | "card" | "gift" | "none">("receipt");
  const [condition, setCondition] = useState<"unopened" | "tried" | "worn" | "damaged">("unopened");
  const [category, setCategory] = useState<"general" | "electronics" | "private-brand" | "cosmetics" | "phones">("general");

  const selectedStore = storesData.find((s) => s.slug === storeSlug) || storesData[0];

  const calculateOdds = () => {
    let score = 90;
    const notes: string[] = [];

    // Timeframe evaluation
    if (timeframe === "within-window") {
      score += 5;
      notes.push("Item is within the retailer's active return window.");
    } else if (timeframe === "past-window") {
      score -= 40;
      notes.push("Past standard return deadline - manager approval or store credit may apply.");
    } else {
      score -= 75;
      notes.push("Significantly past deadline - unlikely to be accepted except for specific 365-day brands.");
    }

    // Proof evaluation
    if (proof === "receipt" || proof === "app") {
      score += 10;
      notes.push("Verified proof of purchase guarantees original payment method refund.");
    } else if (proof === "card") {
      score += 5;
      notes.push("Credit/debit card lookup provides verified digital transaction record.");
    } else if (proof === "gift") {
      score += 0;
      notes.push("Gift receipt qualifies for store credit or even product exchange.");
    } else if (proof === "none") {
      score -= 30;
      if (selectedStore.slug.startsWith("target")) {
        notes.push("Target allows no-receipt returns up to $150/year with government ID.");
      } else if (selectedStore.slug.startsWith("walmart")) {
        notes.push("Walmart allows 3 no-receipt returns per 45-day rolling period with photo ID.");
      } else if (selectedStore.slug.startsWith("costco")) {
        score += 25; // Membership lookup
        notes.push("Costco looks up 100% of purchases using your membership ID without paper receipt!");
      } else {
        notes.push("No receipt may result in store credit at the lowest recent selling price.");
      }
    }

    // Condition evaluation
    if (condition === "unopened") {
      score += 5;
    } else if (condition === "tried") {
      if (selectedStore.slug.startsWith("nike")) {
        score += 10;
        notes.push("Nike Members can return worn shoes tested outdoors within 60 days!");
      } else {
        notes.push("Lightly tried items in original packaging are accepted at full refund value.");
      }
    } else if (condition === "worn") {
      if (selectedStore.slug.startsWith("nike")) {
        score += 5;
      } else {
        score -= 35;
        notes.push("Worn or dirty items are usually non-returnable unless defective.");
      }
    } else if (condition === "damaged") {
      score -= 50;
      notes.push("Damaged or user-misused items are subject to partial deductions or rejection.");
    }

    // Category exceptions
    if (category === "private-brand" && selectedStore.slug.startsWith("target")) {
      score += 35;
      notes.push("Target-owned private labels (Cat & Jack, Threshold, Good & Gather) carry a 365-day guarantee!");
    } else if (category === "electronics") {
      if (timeframe !== "within-window") score -= 15;
      notes.push("Electronics usually have shorter windows (15-30 days) and strict serial number tracking.");
    } else if (category === "phones") {
      notes.push("Opened wireless phones may incur restocking fees ($35 Target, $45 Best Buy).");
    }

    // Cap score between 5 and 99
    score = Math.max(5, Math.min(99, score));

    let tier: "High" | "Moderate" | "Low";
    let colorClass: string;
    let badgeBg: string;

    if (score >= 80) {
      tier = "High";
      colorClass = "text-red-700 font-extrabold";
      badgeBg = "bg-red-100/90 border-red-300 text-red-900";
    } else if (score >= 50) {
      tier = "Moderate";
      colorClass = "text-amber-700 font-extrabold";
      badgeBg = "bg-amber-100/90 border-amber-300 text-amber-900";
    } else {
      tier = "Low";
      colorClass = "text-rose-700 font-extrabold";
      badgeBg = "bg-rose-100/90 border-rose-300 text-rose-900";
    }

    return {
      score,
      tier,
      colorClass,
      badgeBg,
      notes,
    };
  };

  const outcome = calculateOdds();

  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs font-sans space-y-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-600 text-white rounded-xl shadow-2xs">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-ink">
              Return Success Probability Estimator
            </h3>
            <p className="text-xs text-ink-600">
              Estimate your likelihood of return approval based on 2026 store rules
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-mono text-red-600 font-bold bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
          2026 Audit Engine
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
        {/* Retailer Select */}
        <div>
          <label htmlFor="prob-store" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            1. Select Retailer
          </label>
          <select
            id="prob-store"
            value={storeSlug}
            onChange={(e) => setStoreSlug(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            {storesData.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.brand} ({s.country || "US"})
              </option>
            ))}
          </select>
        </div>

        {/* Timeframe Select */}
        <div>
          <label htmlFor="prob-timeframe" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            2. Time Elapsed
          </label>
          <select
            id="prob-timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            <option value="within-window">Within standard return window</option>
            <option value="past-window">Slightly past return window (1-30 days over)</option>
            <option value="way-past">Well past return window (3+ months over)</option>
          </select>
        </div>

        {/* Proof of purchase */}
        <div>
          <label htmlFor="prob-proof" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            3. Proof of Purchase
          </label>
          <select
            id="prob-proof"
            value={proof}
            onChange={(e) => setProof(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            <option value="receipt">Original Paper Receipt</option>
            <option value="app">Digital App Order / Account History</option>
            <option value="card">Debit/Credit Card Used at Checkout</option>
            <option value="gift">Gift Receipt</option>
            <option value="none">No Receipt & Cash Paid</option>
          </select>
        </div>

        {/* Item Condition */}
        <div>
          <label htmlFor="prob-condition" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            4. Item Condition
          </label>
          <select
            id="prob-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            <option value="unopened">Unopened in Original Packaging</option>
            <option value="tried">Opened / Lightly Tried Indoors</option>
            <option value="worn">Used / Worn Outdoors</option>
            <option value="damaged">Damaged or Missing Original Box</option>
          </select>
        </div>

        {/* Item Category */}
        <div className="sm:col-span-2">
          <label htmlFor="prob-category" className="block text-xs font-mono font-bold uppercase tracking-wider text-ink-700 mb-1.5">
            5. Product Category
          </label>
          <select
            id="prob-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 font-semibold text-ink focus:border-red-600 focus:outline-none"
          >
            <option value="general">Clothing, Footwear & General Merchandise</option>
            <option value="electronics">Electronics, TVs, Audio & Computers</option>
            <option value="private-brand">Store Private Label (Target Brands, Kirkland, Cat & Jack)</option>
            <option value="cosmetics">Makeup, Skincare & Fragrances</option>
            <option value="phones">Prepaid or Contract Wireless Phones</option>
          </select>
        </div>
      </div>

      {/* Probability Result Gauge & Details */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-2xs font-mono text-2xl font-bold text-ink">
              {outcome.score}%
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-ink-500 block">Approval Confidence</span>
              <span className={`text-lg font-bold font-display ${outcome.colorClass}`}>
                {outcome.tier} Return Odds ({selectedStore.brand})
              </span>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold self-start sm:self-auto flex items-center gap-1.5 ${outcome.badgeBg}`}>
            {outcome.tier === "High" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0" />
                <span>Highly Likely Return</span>
              </>
            ) : outcome.tier === "Moderate" ? (
              <>
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Store Credit / Lookup</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>High Rejection Risk</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase font-bold text-ink-700 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-red-600" />
            <span>Key Policy Assessment & Advice:</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-ink-700">
            {outcome.notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
