import React, { useState, useMemo } from "react";
import { Search, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "../ui/Link";

interface FeeRow {
  storeName: string;
  storeSlug: string;
  mailFee: string;
  inStoreFee: string;
  waiverMethod: string;
  status: "free" | "waivable" | "paid";
}

const RETAILER_FEE_DATA: FeeRow[] = [
  {
    storeName: "Amazon",
    storeSlug: "amazon",
    mailFee: "$0.00 (Kohl's/Whole Foods)",
    inStoreFee: "$0.00",
    waiverMethod: "Drop off unboxed at Kohl's, Whole Foods, or UPS Store",
    status: "free",
  },
  {
    storeName: "Target",
    storeSlug: "target",
    mailFee: "$0.00 (Circle Card)",
    inStoreFee: "$0.00",
    waiverMethod: "Pay with Target Circle Card or drop off at any Guest Services desk",
    status: "free",
  },
  {
    storeName: "Nike",
    storeSlug: "nike",
    mailFee: "$0.00 (Nike Members)",
    inStoreFee: "$0.00",
    waiverMethod: "Create free Nike Member account to get prepaid UPS return label",
    status: "free",
  },
  {
    storeName: "Nordstrom",
    storeSlug: "nordstrom",
    mailFee: "$0.00 FREE",
    inStoreFee: "$0.00",
    waiverMethod: "Prepaid $0.00 return label included with every order",
    status: "free",
  },
  {
    storeName: "Macy's",
    storeSlug: "macys",
    mailFee: "$9.99 (Waived for Star Rewards)",
    inStoreFee: "$0.00",
    waiverMethod: "Join free Star Rewards program or drop off in-store",
    status: "waivable",
  },
  {
    storeName: "DSW",
    storeSlug: "dsw",
    mailFee: "$8.50 (Waived for VIP Gold/Elite)",
    inStoreFee: "$0.00",
    waiverMethod: "Upgrade to DSW VIP Gold/Elite or drop off at any DSW store",
    status: "waivable",
  },
  {
    storeName: "Zara US",
    storeSlug: "zara",
    mailFee: "$4.95 deduction",
    inStoreFee: "$0.00",
    waiverMethod: "Drop off at any Zara physical retail store counter",
    status: "paid",
  },
  {
    storeName: "J.Crew",
    storeSlug: "jcrew",
    mailFee: "$7.50 deduction",
    inStoreFee: "$0.00",
    waiverMethod: "Return in-store with original digital receipt",
    status: "paid",
  },
  {
    storeName: "Urban Outfitters",
    storeSlug: "urban-outfitters",
    mailFee: "$5.00 label fee",
    inStoreFee: "$0.00",
    waiverMethod: "Return in-store at any UO cash register counter",
    status: "paid",
  },
  {
    storeName: "Sephora",
    storeSlug: "sephora",
    mailFee: "$0.00 (Free label)",
    inStoreFee: "$0.00",
    waiverMethod: "Prepaid return label generated in Sephora App or store drop-off",
    status: "free",
  },
  {
    storeName: "Ulta Beauty",
    storeSlug: "ulta",
    mailFee: "Customer pays mail postage",
    inStoreFee: "$0.00",
    waiverMethod: "Drop off at any Ulta Beauty store for instant $0 refund",
    status: "waivable",
  },
  {
    storeName: "Best Buy",
    storeSlug: "bestbuy",
    mailFee: "$0.00 (Prepaid label)",
    inStoreFee: "$0.00",
    waiverMethod: "Print prepaid return label online or drop off in-store",
    status: "free",
  },
  {
    storeName: "Walmart",
    storeSlug: "walmart",
    mailFee: "$0.00 (Prepaid label)",
    inStoreFee: "$0.00",
    waiverMethod: "Schedule free home pickup via FedEx or drop off at Customer Service",
    status: "free",
  },
];

export function ReturnShippingFeeTable() {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "free" | "waivable" | "paid">("all");

  const filteredData = useMemo(() => {
    return RETAILER_FEE_DATA.filter((item) => {
      const matchQuery =
        item.storeName.toLowerCase().includes(query.toLowerCase()) ||
        item.waiverMethod.toLowerCase().includes(query.toLowerCase());
      if (filterStatus === "all") return matchQuery;
      return matchQuery && item.status === filterStatus;
    });
  }, [query, filterStatus]);

  return (
    <div className="my-8 space-y-4 font-sans [container-type:inline-size] w-full min-w-0">
      <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              <span>Interactive 2026 Audit Tool</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white">Search Retail Mail-Return Shipping Fees</h3>
            <p className="text-xs text-slate-300">Compare mail label costs & learn how to unlock $0.00 return processing.</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search store name or fee perk (e.g. Nike, Macy's, Star Rewards)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === "all" ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All Retailers ({RETAILER_FEE_DATA.length})
            </button>
            <button
              onClick={() => setFilterStatus("free")}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === "free" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              $0 Free Mail
            </button>
            <button
              onClick={() => setFilterStatus("waivable")}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === "waivable" ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Waivable via Perk
            </button>
            <button
              onClick={() => setFilterStatus("paid")}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === "paid" ? "bg-rose-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Paid Mail Fee
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-display font-bold text-xs uppercase tracking-wider">
              <th className="p-3.5">Retailer</th>
              <th className="p-3.5">Mail Return Shipping Fee</th>
              <th className="p-3.5">In-Store Drop-off Fee</th>
              <th className="p-3.5">How to Waive Fee ($0 Return)</th>
              <th className="p-3.5 text-right">Audit Desk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-sans text-ink-800">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-xs text-ink-500">
                  No retailers found matching "{query}".
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.storeSlug} className="hover:bg-teal-50/40 transition-colors">
                  <td className="p-3.5 font-extrabold text-ink whitespace-nowrap flex items-center gap-2">
                    <span className="font-display text-base text-ink">{row.storeName}</span>
                  </td>
                  <td className="p-3.5 font-mono font-bold whitespace-nowrap">
                    {row.status === "free" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        {row.mailFee}
                      </span>
                    ) : row.status === "waivable" ? (
                      <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        {row.mailFee}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {row.mailFee}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {row.inStoreFee} (FREE)
                  </td>
                  <td className="p-3.5 text-xs text-ink-700 leading-relaxed font-medium">
                    {row.waiverMethod}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <Link
                      href={`/stores/${row.storeSlug}`}
                      className="inline-flex items-center gap-1 font-bold text-xs text-teal-brand hover:text-teal-dark hover:underline"
                    >
                      <span>Policy</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
