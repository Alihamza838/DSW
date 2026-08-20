import * as React from "react";
import { DollarSign, ShieldCheck, ArrowRight, AlertCircle, Info } from "lucide-react";

interface RestockingFeeCalculatorProps {
  brandName?: string;
  defaultMailFee?: number;
  defaultRestockingPct?: number;
}

export function RestockingFeeCalculator({
  brandName = "Retailer",
  defaultMailFee = 5,
  defaultRestockingPct = 0,
}: RestockingFeeCalculatorProps) {
  const [itemPrice, setItemPrice] = React.useState<number>(100);
  const [returnMethod, setReturnMethod] = React.useState<"inStore" | "mail">("inStore");
  const [mailFee, setMailFee] = React.useState<number>(defaultMailFee);
  const [restockingPct, setRestockingPct] = React.useState<number>(defaultRestockingPct);
  const [isOpenedTech, setIsOpenedTech] = React.useState<boolean>(false);

  const calculations = React.useMemo(() => {
    const activeRestockingPct = isOpenedTech && restockingPct === 0 ? 15 : restockingPct;
    const restockingFeeDollar = (itemPrice * activeRestockingPct) / 100;
    const activeMailFee = returnMethod === "mail" ? mailFee : 0;
    const totalDeductions = restockingFeeDollar + activeMailFee;
    const netRefund = Math.max(0, itemPrice - totalDeductions);
    const savingsIfInStore = activeMailFee;

    return {
      activeRestockingPct,
      restockingFeeDollar,
      activeMailFee,
      totalDeductions,
      netRefund,
      savingsIfInStore,
    };
  }, [itemPrice, returnMethod, mailFee, restockingPct, isOpenedTech]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-2xs space-y-4 font-sans my-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Net Refund & Fee Calculator ({brandName})
            </h3>
            <p className="text-xs text-slate-500">
              Calculate exact deductions for mail return labels & restocking fees
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Item Purchase Price */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">
            Item Purchase Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              min={1}
              value={itemPrice}
              onChange={(e) => setItemPrice(Math.max(0, Number(e.target.value) || 0))}
              className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:border-teal-600"
            />
          </div>
        </div>

        {/* Return Method Selection */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">
            Return Method
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setReturnMethod("inStore")}
              className={`py-1.5 px-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                returnMethod === "inStore"
                  ? "bg-white text-teal-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              In-Store ($0 Fee)
            </button>
            <button
              type="button"
              onClick={() => setReturnMethod("mail")}
              className={`py-1.5 px-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                returnMethod === "mail"
                  ? "bg-white text-teal-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Mail Portal (${mailFee})
            </button>
          </div>
        </div>
      </div>

      {/* Tech / Opened Option */}
      <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700">
        <input
          type="checkbox"
          id="openedTechCheck"
          checked={isOpenedTech}
          onChange={(e) => setIsOpenedTech(e.target.checked)}
          className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
        />
        <label htmlFor="openedTechCheck" className="cursor-pointer font-medium">
          Is this an opened electronic, drone, laptop, or specialty item? (May incur 15% restocking fee)
        </label>
      </div>

      {/* Calculation Breakdowns */}
      <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Original Item Price:</span>
          <span className="font-mono font-semibold">${itemPrice.toFixed(2)}</span>
        </div>

        {calculations.restockingFeeDollar > 0 && (
          <div className="flex justify-between text-amber-800 font-medium">
            <span>Restocking Fee ({calculations.activeRestockingPct}%):</span>
            <span className="font-mono">-${calculations.restockingFeeDollar.toFixed(2)}</span>
          </div>
        )}

        {calculations.activeMailFee > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Mail Return Shipping Label Fee:</span>
            <span className="font-mono">-${calculations.activeMailFee.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-2 border-t border-teal-200 flex justify-between items-center text-sm font-extrabold text-teal-950">
          <span>Your Expected Net Refund:</span>
          <span className="text-lg font-mono text-teal-700">${calculations.netRefund.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings Tip */}
      {returnMethod === "mail" && (
        <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            Pro Tip: Return this item at a local physical store location to save ${calculations.activeMailFee.toFixed(2)} in mail shipping fees!
          </span>
        </p>
      )}
    </div>
  );
}
