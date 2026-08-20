import React, { useState } from "react";
import { DollarSign, ArrowRight, ShieldCheck, Sparkles, AlertCircle, Store, Truck, Tag, RefreshCw, Info } from "lucide-react";
import { storesData } from "../../data/stores";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface ReturnValueCalculatorProps {
  initialStoreSlug?: string;
  className?: string;
}

export function ReturnValueCalculator({ initialStoreSlug, className = "" }: ReturnValueCalculatorProps) {
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>(initialStoreSlug || "dsw");
  const [itemPrice, setItemPrice] = useState<number>(75.00);
  const [taxRate, setTaxRate] = useState<number>(8.875); // %
  const [includeTax, setIncludeTax] = useState<boolean>(true);
  
  const [originalShipping, setOriginalShipping] = useState<number>(7.99);
  const [refundOriginalShipping, setRefundOriginalShipping] = useState<boolean>(false);

  const [returnMethod, setReturnMethod] = useState<"store" | "mail">("store");
  const [customReturnShipping, setCustomReturnShipping] = useState<number>(8.50);

  const [restockingFeeType, setRestockingFeeType] = useState<"none" | "15percent" | "phone45" | "custom">("none");
  const [customRestockingFee, setCustomRestockingFee] = useState<number>(0);

  const [returnReason, setReturnReason] = useState<"remorse" | "defective">("remorse");

  // Lookup store defaults when store selection changes
  const handleStoreChange = (slug: string) => {
    setSelectedStoreSlug(slug);
    const store = storesData.find(s => s.slug === slug);
    if (store) {
      if (slug === "dsw") {
        setCustomReturnShipping(8.50);
        setRestockingFeeType("none");
      } else if (slug === "best-buy") {
        setCustomReturnShipping(0);
        setRestockingFeeType("15percent");
      } else if (slug === "amazon") {
        setCustomReturnShipping(0);
        setRestockingFeeType("none");
      } else if (slug === "walmart" || slug === "target") {
        setCustomReturnShipping(0);
        setRestockingFeeType("none");
      }
    }
  };

  const selectedStore = storesData.find((s) => s.slug === selectedStoreSlug);

  // Calculate breakdown
  const baseItemRefund = itemPrice > 0 ? itemPrice : 0;
  const salesTaxRefund = includeTax ? (baseItemRefund * (taxRate / 100)) : 0;
  const originalShippingRefund = (refundOriginalShipping || returnReason === "defective") ? originalShipping : 0;

  // Return shipping cost
  let returnShippingCost = 0;
  if (returnReason === "defective") {
    returnShippingCost = 0; // Merchant covers defect return shipping
  } else if (returnMethod === "mail") {
    returnShippingCost = customReturnShipping;
  }

  // Restocking fee cost
  let restockingFeeCost = 0;
  if (returnReason === "defective") {
    restockingFeeCost = 0; // Merchant cannot charge restocking fee for defective item
  } else if (restockingFeeType === "15percent") {
    restockingFeeCost = baseItemRefund * 0.15;
  } else if (restockingFeeType === "phone45") {
    restockingFeeCost = 45.00;
  } else if (restockingFeeType === "custom") {
    restockingFeeCost = customRestockingFee;
  }

  const totalPaidOriginally = itemPrice + salesTaxRefund + originalShipping;
  const totalNetRefund = Math.max(0, baseItemRefund + salesTaxRefund + originalShippingRefund - returnShippingCost - restockingFeeCost);
  const recoveryPercentage = totalPaidOriginally > 0 ? Math.round((totalNetRefund / totalPaidOriginally) * 100) : 0;

  return (
    <Card className={`border border-slate-200/90 shadow-md bg-white rounded-2xl overflow-hidden font-sans ${className}`}>
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-ink-900 to-ink-800 text-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/20 border border-red-600/40 rounded-xl text-red-300">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <CardTitle className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Return Value & Refund Calculator
              </CardTitle>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                Calculate your exact net cash/card refund after shipping fees and restocking deductions.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setItemPrice(75);
              setOriginalShipping(7.99);
              setRefundOriginalShipping(false);
              setReturnMethod("store");
              setRestockingFeeType("none");
              setReturnReason("remorse");
            }}
            className="text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10"
            title="Reset calculator"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Input Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Store Selector Preset */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold uppercase font-mono tracking-wider text-ink-700 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-red-600" />
              Select Retailer Preset (Optional)
            </label>
            <select
              value={selectedStoreSlug}
              onChange={(e) => handleStoreChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-ink-900 font-medium rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
            >
              {storesData.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.brand} ({s.quickAnswer.returnWindow} return window)
                </option>
              ))}
            </select>
          </div>

          {/* Reason for Return Toggle */}
          <div className="p-3.5 bg-red-50/60 border border-red-200/80 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold uppercase font-mono tracking-wider text-red-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                Return Reason
              </span>
              {returnReason === "defective" && (
                <span className="text-[10px] font-mono font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded-md border border-red-300">
                  FTC Protection Active
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setReturnReason("remorse")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                  returnReason === "remorse"
                    ? "bg-white text-ink-900 border-red-600 shadow-xs"
                    : "bg-slate-100/80 text-ink-600 border-transparent hover:bg-white"
                }`}
              >
                Changed Mind / Size
              </button>
              <button
                type="button"
                onClick={() => setReturnReason("defective")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                  returnReason === "defective"
                    ? "bg-red-600 text-white border-red-700 shadow-xs"
                    : "bg-slate-100/80 text-ink-600 border-transparent hover:bg-white"
                }`}
              >
                Defective / Wrong Item Sent
              </button>
            </div>
            {returnReason === "defective" && (
              <p className="text-[11px] text-red-900 font-medium leading-relaxed">
                Under federal law & consumer rights, merchant must waive return fees and refund original shipping when the item arrives damaged or defective.
              </p>
            )}
          </div>

          {/* Item Price & Sales Tax */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase font-mono tracking-wider text-ink-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-red-600" />
                Item Purchase Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-ink-400 font-extrabold text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 text-ink-900 font-extrabold rounded-xl pl-8 pr-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase font-mono tracking-wider text-ink-700 flex justify-between items-center">
                <span>Sales Tax Rate (%)</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTax}
                    onChange={(e) => setIncludeTax(e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-red-600 relative"></span>
                </label>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  disabled={!includeTax}
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className={`w-full bg-slate-50 border border-slate-200 font-extrabold rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    !includeTax ? "opacity-50 text-slate-400" : "text-ink-900"
                  }`}
                />
                <span className="absolute right-3.5 top-2.5 text-ink-400 font-bold text-xs">%</span>
              </div>
            </div>
          </div>

          {/* Original Shipping Paid */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase font-mono tracking-wider text-ink-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-slate-600" />
                Original Shipping Paid ($)
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-ink-700">
                <input
                  type="checkbox"
                  checked={refundOriginalShipping}
                  onChange={(e) => setRefundOriginalShipping(e.target.checked)}
                  disabled={returnReason === "defective"}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-600"
                />
                <span>Refundable by store?</span>
              </label>
            </div>
            <div className="relative max-w-xs">
              <span className="absolute left-3.5 top-2 text-ink-400 font-bold text-xs">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={originalShipping}
                onChange={(e) => setOriginalShipping(parseFloat(e.target.value) || 0)}
                className="w-full bg-white border border-slate-200 text-ink-900 font-bold rounded-lg pl-7 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Return Method (Store vs Mail) */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase font-mono tracking-wider text-ink-700">
              Return Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReturnMethod("store")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  returnMethod === "store"
                    ? "bg-red-50 border-red-600 text-red-950 ring-1 ring-red-600"
                    : "bg-slate-50 border-slate-200 text-ink-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                  <span>In-Store Drop-off</span>
                  <span className="text-red-700 font-mono text-xs">$0.00</span>
                </div>
                <p className="text-[11px] text-ink-500 mt-1">Free return desk drop-off at store counter.</p>
              </button>

              <button
                type="button"
                onClick={() => setReturnMethod("mail")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  returnMethod === "mail"
                    ? "bg-amber-50/80 border-amber-400 text-amber-950 ring-1 ring-amber-400"
                    : "bg-slate-50 border-slate-200 text-ink-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                  <span>Mail Return</span>
                  <span className="text-amber-700 font-mono text-xs">-${customReturnShipping.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-ink-500 mt-1">Prepaid shipping label deducted from refund.</p>
              </button>
            </div>

            {returnMethod === "mail" && returnReason !== "defective" && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-ink-600 font-medium">Custom Mail Label Fee ($):</span>
                <input
                  type="number"
                  min="0"
                  step="0.50"
                  value={customReturnShipping}
                  onChange={(e) => setCustomReturnShipping(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-50 border border-slate-200 text-ink-900 font-bold rounded-lg px-2.5 py-1 text-xs"
                />
              </div>
            )}
          </div>

          {/* Restocking Fee Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase font-mono tracking-wider text-ink-700">
              Restocking Fee Deduction
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setRestockingFeeType("none")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                  restockingFeeType === "none"
                    ? "bg-red-50 text-red-900 border-red-400 shadow-2xs"
                    : "bg-slate-50 text-ink-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                $0 (None)
              </button>
              <button
                type="button"
                onClick={() => setRestockingFeeType("15percent")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                  restockingFeeType === "15percent"
                    ? "bg-amber-50 text-amber-900 border-amber-400 shadow-2xs"
                    : "bg-slate-50 text-ink-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                15% (Drones/DSLR)
              </button>
              <button
                type="button"
                onClick={() => setRestockingFeeType("phone45")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                  restockingFeeType === "phone45"
                    ? "bg-amber-50 text-amber-900 border-amber-400 shadow-2xs"
                    : "bg-slate-50 text-ink-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                $45 (Cellular)
              </button>
              <button
                type="button"
                onClick={() => setRestockingFeeType("custom")}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                  restockingFeeType === "custom"
                    ? "bg-amber-50 text-amber-900 border-amber-400 shadow-2xs"
                    : "bg-slate-50 text-ink-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Custom Fee
              </button>
            </div>
            {restockingFeeType === "custom" && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-ink-600 font-medium">Custom Restocking Amount ($):</span>
                <input
                  type="number"
                  min="0"
                  step="1.00"
                  value={customRestockingFee}
                  onChange={(e) => setCustomRestockingFee(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-slate-50 border border-slate-200 text-ink-900 font-bold rounded-lg px-2.5 py-1 text-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 bg-slate-50/90 border border-slate-200/90 p-5 rounded-2xl">
          <div className="space-y-4">
            {/* Top Estimated Refund Highlight Card */}
            <div className="bg-white border border-red-600/30 rounded-xl p-4 sm:p-5 shadow-xs text-center space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-800 block">
                Estimated Net Cash/Card Refund
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-display text-red-900">
                ${totalNetRefund.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="text-[11px] font-mono font-bold bg-red-100 text-red-900 px-2.5 py-0.5 rounded-full border border-red-200">
                  {recoveryPercentage}% Refunded of Total Spent (${totalPaidOriginally.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200 text-xs font-sans">
              <h4 className="font-extrabold uppercase font-mono text-[11px] text-ink-500 pb-1.5 border-b border-slate-100">
                Refund Financial Breakdown
              </h4>

              <div className="flex justify-between items-center py-1">
                <span className="text-ink-600 font-medium">Item Base Price</span>
                <span className="font-mono font-bold text-ink-900">+${baseItemRefund.toFixed(2)}</span>
              </div>

              {includeTax && (
                <div className="flex justify-between items-center py-1 border-t border-slate-100">
                  <span className="text-ink-600 font-medium">Sales Tax ({taxRate}%)</span>
                  <span className="font-mono font-bold text-red-700">+${salesTaxRefund.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-1 border-t border-slate-100">
                <span className="text-ink-600 font-medium">Original Shipping Refund</span>
                <span className={`font-mono font-bold ${originalShippingRefund > 0 ? "text-red-700" : "text-ink-400"}`}>
                  {originalShippingRefund > 0 ? `+$${originalShippingRefund.toFixed(2)}` : "$0.00"}
                </span>
              </div>

              {returnShippingCost > 0 && (
                <div className="flex justify-between items-center py-1 border-t border-slate-100">
                  <span className="text-amber-800 font-medium">Less: Return Shipping Fee</span>
                  <span className="font-mono font-bold text-amber-700">-${returnShippingCost.toFixed(2)}</span>
                </div>
              )}

              {restockingFeeCost > 0 && (
                <div className="flex justify-between items-center py-1 border-t border-slate-100">
                  <span className="text-amber-800 font-medium">Less: Restocking Fee Deduction</span>
                  <span className="font-mono font-bold text-amber-700">-${restockingFeeCost.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2.5 border-t-2 border-slate-200 text-sm font-bold text-ink-900">
                <span>Net Total Refund</span>
                <span className="font-mono text-red-800">${totalNetRefund.toFixed(2)}</span>
              </div>
            </div>

            {/* Smart Advice / Optimization Tips */}
            <div className="space-y-2">
              {returnMethod === "mail" && customReturnShipping > 0 && returnReason !== "defective" && (
                <div className="p-3 bg-amber-50 border border-amber-300/80 rounded-xl flex items-start gap-2 text-amber-950 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Save ${customReturnShipping.toFixed(2)} instantly:</span> Drop off this item in-store at nearest location to get 100% free return processing.
                  </div>
                </div>
              )}

              {selectedStoreSlug === "dsw" && returnMethod === "mail" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-950 text-xs">
                  <Sparkles className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">DSW VIP Perk:</span> DSW VIP Gold & Elite members get $0 mail return shipping labels. Standard members pay $8.50.
                  </div>
                </div>
              )}

              {selectedStoreSlug === "target" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-950 text-xs">
                  <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Target Private Brands:</span> Target-owned brands (Cat & Jack, Threshold, Good & Gather) get a 365-day satisfaction window with receipt or Target App barcode.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 text-center text-[11px] font-mono text-ink-400">
            Calculated based on 2026 verified retail return fee schedules.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
