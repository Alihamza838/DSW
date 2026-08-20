import * as React from "react";
import { storesData } from "../../data/stores";
import { calculatePolicyGrade } from "../../lib/utils";
import { StoreFrontmatter } from "../../types";
import { Link } from "../ui/Link";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Scale,
  ArrowRightLeft,
  Trophy,
  Sparkles,
  ExternalLink,
  Search,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Building2,
  ShoppingBag,
  Zap,
  Info,
  Share2,
  Copy,
  Check
} from "lucide-react";

interface StorePolicyComparerProps {
  initialStoreA?: string;
  initialStoreB?: string;
}

// Category Presets for Quick Selection
export const POPULAR_MATCHUPS = [
  { label: "👟 Footwear", storeA: "dsw", storeB: "nike", title: "DSW vs Nike" },
  { label: "💄 Beauty", storeA: "sephora", storeB: "ulta", title: "Sephora vs Ulta" },
  { label: "🛒 Superstores", storeA: "target", storeB: "walmart", title: "Target vs Walmart" },
  { label: "⚡ Electronics", storeA: "apple", storeB: "best-buy", title: "Apple vs Best Buy" },
  { label: "🛍️ Department", storeA: "nordstrom", storeB: "macys", title: "Nordstrom vs Macy's" },
  { label: "👗 Fashion", storeA: "zara", storeB: "hm", title: "Zara vs H&M" },
  { label: "🛋️ Home", storeA: "ikea", storeB: "wayfair", title: "IKEA vs Wayfair" },
];

export function StorePolicyComparer({
  initialStoreA = "dsw",
  initialStoreB = "nike",
}: StorePolicyComparerProps) {
  const [storeASlug, setStoreASlug] = React.useState<string>(initialStoreA);
  const [storeBSlug, setStoreBSlug] = React.useState<string>(initialStoreB);
  
  // Search inputs
  const [searchA, setSearchA] = React.useState<string>("");
  const [searchB, setSearchB] = React.useState<string>("");

  // Mobile View Mode: 'side-by-side' | 'storeA' | 'storeB'
  const [mobileView, setMobileView] = React.useState<"side-by-side" | "storeA" | "storeB">("side-by-side");

  // Expanded details toggle for deeper matrix rows
  const [showDetailedMatrix, setShowDetailedMatrix] = React.useState<boolean>(true);
  
  // Copy shareable link state
  const [copied, setCopied] = React.useState<boolean>(false);

  // Sync initial query params on load if present
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlA = params.get("storeA");
      const urlB = params.get("storeB");
      if (urlA && storesData.some((s) => s.slug === urlA || s.id === urlA)) {
        setStoreASlug(urlA);
      }
      if (urlB && storesData.some((s) => s.slug === urlB || s.id === urlB)) {
        setStoreBSlug(urlB);
      }
    }
  }, []);

  // Sync props if changed externally
  React.useEffect(() => {
    if (initialStoreA) setStoreASlug(initialStoreA);
    if (initialStoreB) setStoreBSlug(initialStoreB);
  }, [initialStoreA, initialStoreB]);

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/compare?storeA=${storeASlug}&storeB=${storeBSlug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const storeA = React.useMemo(() => {
    return storesData.find((s) => s.slug === storeASlug || s.id === storeASlug) || storesData[0];
  }, [storeASlug]);

  const storeB = React.useMemo(() => {
    return storesData.find((s) => s.slug === storeBSlug || s.id === storeBSlug) || storesData[1] || storesData[0];
  }, [storeBSlug]);

  const gradeA = React.useMemo(() => calculatePolicyGrade(storeA.quickAnswer), [storeA]);
  const gradeB = React.useMemo(() => calculatePolicyGrade(storeB.quickAnswer), [storeB]);

  // Filtered lists for dropdown search
  const filteredStoresA = React.useMemo(() => {
    if (!searchA.trim()) return storesData;
    return storesData.filter((s) =>
      s.brand.toLowerCase().includes(searchA.toLowerCase())
    );
  }, [searchA]);

  const filteredStoresB = React.useMemo(() => {
    if (!searchB.trim()) return storesData;
    return storesData.filter((s) =>
      s.brand.toLowerCase().includes(searchB.toLowerCase())
    );
  }, [searchB]);

  const handleSwap = () => {
    const tempA = storeASlug;
    setStoreASlug(storeBSlug);
    setStoreBSlug(tempA);
    setSearchA("");
    setSearchB("");
  };

  const handleSelectPreset = (aSlug: string, bSlug: string) => {
    setStoreASlug(aSlug);
    setStoreBSlug(bSlug);
    setSearchA("");
    setSearchB("");
    // Scroll smoothly to comparer if needed
    const el = document.getElementById("policy-comparer-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Helper Labels & Icons
  const getReceiptLabel = (val: boolean | string | undefined) => {
    if (typeof val === "boolean") {
      return val ? "Strict Receipt Required" : "Digital Receipt Lookup Supported";
    }
    return val || "Receipt Lookup Supported";
  };

  const getRestockingLabel = (val: boolean | string | undefined) => {
    if (typeof val === "boolean") {
      return val ? "Restocking Penalty Applies" : "No Restocking Fee ($0 Penalty)";
    }
    return val || "No Restocking Fee";
  };

  // Determine Overall Winner
  const winnerInfo = React.useMemo(() => {
    if (gradeA.score > gradeB.score) {
      const diff = gradeA.score - gradeB.score;
      return {
        winner: storeA,
        loser: storeB,
        diff,
        reason: `${storeA.brand} achieves a higher rating (Grade ${gradeA.grade}) with a more flexible ${storeA.quickAnswer?.returnWindow || "return"} policy and shopper-friendly terms.`,
      };
    } else if (gradeB.score > gradeA.score) {
      const diff = gradeB.score - gradeA.score;
      return {
        winner: storeB,
        loser: storeA,
        diff,
        reason: `${storeB.brand} achieves a higher rating (Grade ${gradeB.grade}) with a more flexible ${storeB.quickAnswer?.returnWindow || "return"} policy and shopper-friendly terms.`,
      };
    }
    return {
      winner: null,
      loser: null,
      diff: 0,
      reason: `Both ${storeA.brand} and ${storeB.brand} have matching Grade ${gradeA.grade} policy scores. Choose based on preferred shopping location or loyalty perks.`,
    };
  }, [gradeA, gradeB, storeA, storeB]);

  // Derived sub-scores for visual bars
  const calculateSubScores = (store: StoreFrontmatter, gradeObj: { score: number }) => {
    const windowStr = (store.quickAnswer?.returnWindow || "").toLowerCase();
    let flex = 70;
    if (windowStr.includes("365") || windowStr.includes("1 year")) flex = 98;
    else if (windowStr.includes("90")) flex = 88;
    else if (windowStr.includes("60")) flex = 78;
    else if (windowStr.includes("30")) flex = 65;
    else if (windowStr.includes("14")) flex = 50;

    let cost = 80;
    if (store.quickAnswer?.restockingFee) cost -= 25;
    if (store.vipBenefits || (store.quickAnswer?.onlineReturns && store.quickAnswer?.inStoreReturns)) cost += 15;
    cost = Math.min(100, Math.max(40, cost));

    let convenience = 85;
    if (!store.quickAnswer?.inStoreReturns) convenience -= 20;
    if (store.quickAnswer?.receiptRequired === false) convenience += 10;
    convenience = Math.min(100, Math.max(50, convenience));

    return {
      overall: gradeObj.score,
      flexibility: flex,
      costSavings: cost,
      convenience: convenience,
    };
  };

  const subScoresA = React.useMemo(() => calculateSubScores(storeA, gradeA), [storeA, gradeA]);
  const subScoresB = React.useMemo(() => calculateSubScores(storeB, gradeB), [storeB, gradeB]);

  return (
    <div id="policy-comparer-container" className="space-y-8 font-sans">
      {/* Popular Matchup Preset Filter Chips */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
            <Zap className="h-4 w-4 text-red-600" />
            <span>Popular Retail Matchups (Click to Load)</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-400 hidden sm:inline">
            7 Quick Comparisons
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_MATCHUPS.map((m) => {
            const isActive =
              (storeASlug === m.storeA && storeBSlug === m.storeB) ||
              (storeASlug === m.storeB && storeBSlug === m.storeA);
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => handleSelectPreset(m.storeA, m.storeB)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50/50 hover:text-red-700"
                }`}
              >
                <span>{m.label}</span>
                {isActive && <CheckCircle2 className="h-3.5 w-3.5 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparison Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold border border-red-100">
              <Scale className="h-3.5 w-3.5 text-red-600" />
              <span>2026 Audit Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Interactive Retail Policy Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Comparing official return terms, receipt lookup rules, shipping fees, and restocking penalties.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-2xs cursor-pointer"
              title="Copy shareable link to this store comparison"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700 font-extrabold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 text-slate-600" />
                  <span>Share Comparison</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              title="Swap store positions"
            >
              <ArrowRightLeft className="h-4 w-4 text-red-400" />
              <span>Swap Stores</span>
            </button>
          </div>
        </div>

        {/* Dual Store Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
          {/* Store 1 Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-red-600" />
                <span>Store #1 (Primary)</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                {storesData.length} Stores Available
              </span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter Store 1 by name..."
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <select
                value={storeA.slug}
                onChange={(e) => {
                  setStoreASlug(e.target.value);
                  setSearchA("");
                }}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-extrabold focus:ring-2 focus:ring-red-500 focus:outline-none shadow-2xs cursor-pointer"
              >
                {filteredStoresA.map((s) => (
                  <option key={`a-${s.slug}`} value={s.slug} disabled={s.slug === storeB.slug}>
                    {s.brand} — {s.quickAnswer?.returnWindow || "Standard Policy"}
                  </option>
                ))}
              </select>
            </div>

            {/* Store 1 Quick Summary Card Header */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shrink-0 border border-slate-800">
                  {storeA.brand.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{storeA.brand}</h3>
                  <p className="text-xs text-slate-500">
                    {storeA.category?.[0] || "Retail"} • {storeA.quickAnswer?.returnWindow || "Standard"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold border ${gradeA.bgClass} ${gradeA.colorClass}`}>
                  Grade {gradeA.grade}
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{gradeA.score}/100 Score</p>
              </div>
            </div>
          </div>

          {/* Store 2 Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-red-600" />
                <span>Store #2 (Comparison)</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                {storesData.length} Stores Available
              </span>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter Store 2 by name..."
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <select
                value={storeB.slug}
                onChange={(e) => {
                  setStoreBSlug(e.target.value);
                  setSearchB("");
                }}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-extrabold focus:ring-2 focus:ring-red-500 focus:outline-none shadow-2xs cursor-pointer"
              >
                {filteredStoresB.map((s) => (
                  <option key={`b-${s.slug}`} value={s.slug} disabled={s.slug === storeA.slug}>
                    {s.brand} — {s.quickAnswer?.returnWindow || "Standard Policy"}
                  </option>
                ))}
              </select>
            </div>

            {/* Store 2 Quick Summary Card Header */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shrink-0 border border-slate-800">
                  {storeB.brand.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{storeB.brand}</h3>
                  <p className="text-xs text-slate-500">
                    {storeB.category?.[0] || "Retail"} • {storeB.quickAnswer?.returnWindow || "Standard"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold border ${gradeB.bgClass} ${gradeB.colorClass}`}>
                  Grade {gradeB.grade}
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{gradeB.score}/100 Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Banner Box */}
        <div className={`p-5 sm:p-6 rounded-2xl border ${winnerInfo.winner ? "bg-red-50/60 border-red-200" : "bg-slate-50 border-slate-200"} space-y-3`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${winnerInfo.winner ? "bg-red-600 text-white" : "bg-slate-700 text-white"}`}>
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-800">
                  2026 Audit Verdict & Comparison Winner
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {winnerInfo.winner ? (
                    <>
                      🏆 <span className="text-red-700">{winnerInfo.winner.brand}</span> Wins (+{winnerInfo.diff} Score Differential)
                    </>
                  ) : (
                    "Even Matchup: Both Stores Offer Comparable Terms"
                  )}
                </h3>
              </div>
            </div>

            {winnerInfo.winner && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-800 text-xs font-bold shadow-2xs self-start sm:self-auto">
                <ShieldCheck className="h-4 w-4 text-red-600" />
                <span>Recommended Choice</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
            {winnerInfo.reason}
          </p>
        </div>

        {/* Mobile Layout Switcher Tabs (Only visible on small devices) */}
        <div className="flex sm:hidden items-center justify-center p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setMobileView("side-by-side")}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              mobileView === "side-by-side" ? "bg-white text-slate-900 shadow-2xs font-extrabold" : "text-slate-600"
            }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setMobileView("storeA")}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              mobileView === "storeA" ? "bg-white text-slate-900 shadow-2xs font-extrabold" : "text-slate-600"
            }`}
          >
            {storeA.brand}
          </button>
          <button
            type="button"
            onClick={() => setMobileView("storeB")}
            className={`flex-1 py-2 rounded-lg text-center transition-all ${
              mobileView === "storeB" ? "bg-white text-slate-900 shadow-2xs font-extrabold" : "text-slate-600"
            }`}
          >
            {storeB.brand}
          </button>
        </div>

        {/* Side-by-Side Comparison Matrix Table */}
        <div className="overflow-hidden border border-slate-200 rounded-2xl shadow-2xs bg-white">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-display">
                <th className="p-3.5 sm:p-4 w-1/3 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Policy Metric
                </th>
                <th className={`p-3.5 sm:p-4 w-1/3 font-bold border-l border-slate-800 ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-white">{storeA.brand}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                        {gradeA.grade}
                      </span>
                    </div>
                    <Link
                      href={`/stores/${storeA.slug}`}
                      className="text-[11px] font-mono text-red-400 hover:text-white underline hidden lg:inline-flex items-center gap-0.5"
                    >
                      <span>Full Guide</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </th>
                <th className={`p-3.5 sm:p-4 w-1/3 font-bold border-l border-slate-800 ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-white">{storeB.brand}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                        {gradeB.grade}
                      </span>
                    </div>
                    <Link
                      href={`/stores/${storeB.slug}`}
                      className="text-[11px] font-mono text-red-400 hover:text-white underline hidden lg:inline-flex items-center gap-0.5"
                    >
                      <span>Full Guide</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-slate-800">
              {/* Return Window Row */}
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                  <div className="space-y-0.5">
                    <div>Standard Return Window</div>
                    <p className="text-[11px] text-slate-500 font-normal">Days allowed from purchase date</p>
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-extrabold text-red-700 ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">{storeA.quickAnswer?.returnWindow || "Standard Policy"}</span>
                    {storeA.quickAnswer?.returnWindow?.includes("90") || storeA.quickAnswer?.returnWindow?.includes("365") ? (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-mono font-bold">Generous</span>
                    ) : null}
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-extrabold text-red-700 ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">{storeB.quickAnswer?.returnWindow || "Standard Policy"}</span>
                    {storeB.quickAnswer?.returnWindow?.includes("90") || storeB.quickAnswer?.returnWindow?.includes("365") ? (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-mono font-bold">Generous</span>
                    ) : null}
                  </div>
                </td>
              </tr>

              {/* Receipt Policy */}
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                  <div className="space-y-0.5">
                    <div>Receipt Lookup Support</div>
                    <p className="text-[11px] text-slate-500 font-normal">Card/email/account lookup</p>
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    {storeA.quickAnswer?.receiptRequired === false ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                    )}
                    <span>{getReceiptLabel(storeA.quickAnswer?.receiptRequired)}</span>
                  </span>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    {storeB.quickAnswer?.receiptRequired === false ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                    )}
                    <span>{getReceiptLabel(storeB.quickAnswer?.receiptRequired)}</span>
                  </span>
                </td>
              </tr>

              {/* Restocking Penalty */}
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                  <div className="space-y-0.5">
                    <div>Restocking Penalty</div>
                    <p className="text-[11px] text-slate-500 font-normal">Fees on opened or returned items</p>
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{getRestockingLabel(storeA.quickAnswer?.restockingFee)}</span>
                  </span>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{getRestockingLabel(storeB.quickAnswer?.restockingFee)}</span>
                  </span>
                </td>
              </tr>

              {/* Refund Payment Method */}
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                  <div className="space-y-0.5">
                    <div>Refund Method</div>
                    <p className="text-[11px] text-slate-500 font-normal">Form of payment issued</p>
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-medium ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  {storeA.quickAnswer?.refundMethod || "Original Payment / Store Credit"}
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-medium ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  {storeB.quickAnswer?.refundMethod || "Original Payment / Store Credit"}
                </td>
              </tr>

              {/* Channels Supported */}
              <tr className="bg-white hover:bg-slate-50 transition-colors">
                <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                  <div className="space-y-0.5">
                    <div>Return Channels</div>
                    <p className="text-[11px] text-slate-500 font-normal">In-store & Online options</p>
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-medium ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Free In-Store Dropoff</span>
                    </div>
                    {storeA.quickAnswer?.onlineReturns && (
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>Prepaid Mail Shipping Label</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className={`p-3.5 sm:p-4 border-l border-slate-100 font-medium ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Free In-Store Dropoff</span>
                    </div>
                    {storeB.quickAnswer?.onlineReturns && (
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>Prepaid Mail Shipping Label</span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>

              {/* Extended Details Section Toggle */}
              {showDetailedMatrix && (
                <>
                  {/* Without Receipt Rules */}
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <div>Without Receipt Policy</div>
                        <p className="text-[11px] text-slate-500 font-normal">If paper/card receipt is missing</p>
                      </div>
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeA.withoutReceiptRules || "Store credit issued at current lowest selling price with valid photo ID."}
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeB.withoutReceiptRules || "Store credit issued at current lowest selling price with valid photo ID."}
                    </td>
                  </tr>

                  {/* Worn / Opened Items */}
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <div>Worn / Opened Items</div>
                        <p className="text-[11px] text-slate-500 font-normal">Condition requirements</p>
                      </div>
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeA.wornItemsPolicy || "Unworn/new condition required. Defective items accepted for exchange or refund."}
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeB.wornItemsPolicy || "Unworn/new condition required. Defective items accepted for exchange or refund."}
                    </td>
                  </tr>

                  {/* VIP & Loyalty Extension */}
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <div>VIP / Member Extension</div>
                        <p className="text-[11px] text-slate-500 font-normal">Perks for loyalty members</p>
                      </div>
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed font-semibold text-red-700 ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeA.vipBenefits || "Free rewards members unlock extended return deadlines and free mail returns."}
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed font-semibold text-red-700 ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeB.vipBenefits || "Free rewards members unlock extended return deadlines and free mail returns."}
                    </td>
                  </tr>

                  {/* Clearance & Final Sale */}
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <div>Clearance Rules</div>
                        <p className="text-[11px] text-slate-500 font-normal">Final sale exceptions</p>
                      </div>
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeB" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeA.clearanceRules || "Standard clearance returnable unless explicitly stamped 'Final Sale'."}
                    </td>
                    <td className={`p-3.5 sm:p-4 border-l border-slate-100 text-xs leading-relaxed ${mobileView === "storeA" ? "hidden sm:table-cell" : "table-cell"}`}>
                      {storeB.clearanceRules || "Standard clearance returnable unless explicitly stamped 'Final Sale'."}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {/* Toggle Button for Extended Matrix Rows */}
          <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowDetailedMatrix(!showDetailedMatrix)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
            >
              <span>{showDetailedMatrix ? "Collapse Additional Deep Rules" : "Expand All Deep Matrix Criteria (Without Receipt, Worn Items, VIP)"}</span>
              {showDetailedMatrix ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Visual Benchmark Score Comparison Bars */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400">
                Visual Score Breakdown
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Policy Dimension Score Benchmark
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              100-Point Algorithmic Rating Scale
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store A Bar Card */}
            <div className="space-y-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-extrabold text-white text-base">{storeA.brand}</span>
                <span className="text-xs font-mono font-extrabold text-red-400">{subScoresA.overall}/100 Overall</span>
              </div>

              {/* Bar 1: Return Window Flexibility */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Return Window Flexibility</span>
                  <span className="font-mono font-bold">{subScoresA.flexibility}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresA.flexibility}%` }} />
                </div>
              </div>

              {/* Bar 2: Fee Savings */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Cost & Restocking Savings</span>
                  <span className="font-mono font-bold">{subScoresA.costSavings}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresA.costSavings}%` }} />
                </div>
              </div>

              {/* Bar 3: Dropoff Convenience */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Dropoff & Receipt Convenience</span>
                  <span className="font-mono font-bold">{subScoresA.convenience}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresA.convenience}%` }} />
                </div>
              </div>
            </div>

            {/* Store B Bar Card */}
            <div className="space-y-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-extrabold text-white text-base">{storeB.brand}</span>
                <span className="text-xs font-mono font-extrabold text-red-400">{subScoresB.overall}/100 Overall</span>
              </div>

              {/* Bar 1: Return Window Flexibility */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Return Window Flexibility</span>
                  <span className="font-mono font-bold">{subScoresB.flexibility}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresB.flexibility}%` }} />
                </div>
              </div>

              {/* Bar 2: Fee Savings */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Cost & Restocking Savings</span>
                  <span className="font-mono font-bold">{subScoresB.costSavings}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresB.costSavings}%` }} />
                </div>
              </div>

              {/* Bar 3: Dropoff Convenience */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Dropoff & Receipt Convenience</span>
                  <span className="font-mono font-bold">{subScoresB.convenience}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-400 h-2 rounded-full transition-all duration-500" style={{ width: `${subScoresB.convenience}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Pros & Cons Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Advantages of Store A */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Why Choose {storeA.brand}?</span>
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Grade {gradeA.grade}
              </span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Return Window:</strong> {storeA.quickAnswer?.returnWindow || "Standard window"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>In-Store Dropoff:</strong> Free returns at any physical location with instant processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>No Restocking Fee:</strong> Full 100% refund credited back without hidden fees.</span>
              </li>
              {storeA.vipBenefits && (
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">★</span>
                  <span><strong>Member Benefit:</strong> {storeA.vipBenefits}</span>
                </li>
              )}
            </ul>
            <div className="pt-2">
              <Link
                href={`/stores/${storeA.slug}`}
                className="text-xs font-extrabold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
              >
                <span>Read complete {storeA.brand} policy guide</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Advantages of Store B */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Why Choose {storeB.brand}?</span>
              </h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Grade {gradeB.grade}
              </span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Return Window:</strong> {storeB.quickAnswer?.returnWindow || "Standard window"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>In-Store Dropoff:</strong> Free returns at any physical location with instant processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>No Restocking Fee:</strong> Full 100% refund credited back without hidden fees.</span>
              </li>
              {storeB.vipBenefits && (
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">★</span>
                  <span><strong>Member Benefit:</strong> {storeB.vipBenefits}</span>
                </li>
              )}
            </ul>
            <div className="pt-2">
              <Link
                href={`/stores/${storeB.slug}`}
                className="text-xs font-extrabold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
              >
                <span>Read complete {storeB.brand} policy guide</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
