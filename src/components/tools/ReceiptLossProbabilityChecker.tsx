import React, { useState } from "react";
import { Receipt, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, ShieldCheck, FileText, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { storesData } from "../../data/stores";
import { Link } from "../ui/Link";

export function ReceiptLossProbabilityChecker() {
  const [selectedStore, setSelectedStore] = useState(storesData[0].slug);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [itemCondition, setItemCondition] = useState("unopened");
  const [hasTags, setHasTags] = useState(true);
  const [daysElapsed, setDaysElapsed] = useState(15);
  const [calculated, setCalculated] = useState(false);

  const store = storesData.find((s) => s.slug === selectedStore) || storesData[0];

  // Calculate receiptless return score
  let score = 85;
  let grade = "A";
  let color = "text-red-600 bg-red-50 border-red-200";

  if (paymentMethod === "cash") score -= 30;
  if (paymentMethod === "card") score += 10;
  if (paymentMethod === "account") score += 15;
  if (itemCondition === "opened") score -= 15;
  if (itemCondition === "used") score -= 35;
  if (!hasTags) score -= 20;
  if (daysElapsed > 90) score -= 30;
  else if (daysElapsed > 30) score -= 10;

  // Bound score 5-98
  score = Math.max(5, Math.min(98, score));

  if (score >= 80) {
    grade = "A (High Approval Probability)";
    color = "text-red-700 bg-red-50 border-red-300";
  } else if (score >= 60) {
    grade = "B (Moderate Probability - Account Lookup Needed)";
    color = "text-blue-700 bg-blue-50 border-blue-300";
  } else if (score >= 40) {
    grade = "C (Store Credit / Manager Discretion Likely)";
    color = "text-amber-700 bg-amber-50 border-amber-300";
  } else {
    grade = "F (High Rejection Risk)";
    color = "text-rose-700 bg-rose-50 border-rose-300";
  }

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-slate-200 font-sans space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono font-bold tracking-wider uppercase mb-1">
            <Sparkles className="h-3 w-3" />
            <span>Interactive Consumer Utility</span>
          </div>
          <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <Receipt className="h-5 w-5 text-red-600" />
            <span>Lost Receipt Return Approval Predictor</span>
          </h3>
        </div>
        <button
          onClick={() => setCalculated(false)}
          className="text-xs text-ink-500 hover:text-red-600 flex items-center gap-1 font-mono"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1">Select Retailer Store</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600"
            >
              {storesData.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.brand} (Window: {s.quickAnswer.returnWindow})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1">Payment Method Used</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600"
            >
              <option value="account">Store Account / Rewards Card</option>
              <option value="card">Credit or Debit Card</option>
              <option value="cash">Cash / Gift Card</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">Item Condition</label>
              <select
                value={itemCondition}
                onChange={(e) => setItemCondition(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600"
              >
                <option value="unopened">Unopened / Sealed</option>
                <option value="opened">Opened / Like New</option>
                <option value="used">Used / Worn</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">Original Tags?</label>
              <select
                value={hasTags ? "yes" : "no"}
                onChange={(e) => setHasTags(e.target.value === "yes")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600"
              >
                <option value="yes">Attached / Included</option>
                <option value="no">Missing / Removed</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-ink mb-1">
              <span>Days Since Purchase</span>
              <span className="font-mono text-red-600">{daysElapsed} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="180"
              value={daysElapsed}
              onChange={(e) => setDaysElapsed(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          <Button
            onClick={() => setCalculated(true)}
            variant="brand"
            className="w-full py-2.5 text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Calculate Return Odds</span>
          </Button>
        </div>

        {/* Results Panel */}
        <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500">
              {store.brand} Policy Lookup Verdict
            </span>

            <div className={`mt-2 p-3.5 rounded-xl border ${color} space-y-1`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold font-mono">{score}%</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 shadow-xs">
                  Grade: {grade.split(" ")[0]}
                </span>
              </div>
              <p className="text-xs font-semibold">{grade}</p>
            </div>

            <div className="mt-4 space-y-2 text-xs text-ink-700">
              <p className="font-bold flex items-center gap-1.5 text-ink">
                <FileText className="h-3.5 w-3.5 text-red-600" />
                <span>Next Action Steps at Store Counter:</span>
              </p>
              <ul className="list-disc pl-4 space-y-1 text-ink-600">
                {paymentMethod === "card" && (
                  <li>Bring the original card used. Customer service can swipe to retrieve receipt.</li>
                )}
                {paymentMethod === "account" && (
                  <li>Provide your phone number or account barcode registered with {store.brand}.</li>
                )}
                {paymentMethod === "cash" && (
                  <li>Government-issued photo ID is required for non-receipt cash returns.</li>
                )}
                <li>Store policy window for {store.brand}: <strong>{store.quickAnswer.returnWindow}</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60">
            <Link
              href={`/stores/${store.slug}`}
              className="text-xs font-bold text-red-600 hover:underline flex items-center justify-between"
            >
              <span>Read Full {store.brand} Policy Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
