import * as React from "react";
import { StorePolicyComparer, POPULAR_MATCHUPS } from "../components/compare/StorePolicyComparer";
import { BreadcrumbNav } from "../components/ui/BreadcrumbNav";
import { useSEO } from "../hooks/useSEO";
import { Link } from "../components/ui/Link";
import { storesData } from "../data/stores";
import { calculatePolicyGrade } from "../lib/utils";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Building2,
  Zap,
  HelpCircle,
  FileText,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
  Layers,
  ChevronRight
} from "lucide-react";

export function ComparePage() {
  const [activePair, setActivePair] = React.useState<{ storeA: string; storeB: string }>({
    storeA: "dsw",
    storeB: "nike",
  });

  useSEO({
    title: "Side-by-Side Store Return Policy Comparison Tool - 2026 Audit",
    description: "Compare return windows, receipt requirements, shipping fees, restocking penalties, and refund speeds side-by-side for major retail stores like DSW, Nike, Target, Walmart, Sephora, and Ulta.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Stores", item: "/stores" },
      { name: "Policy Comparison", item: "/compare" },
    ],
  });

  // Top Curated Comparison Pair Cards
  const curatedPairs = [
    {
      slugA: "dsw",
      slugB: "nike",
      title: "DSW vs Nike",
      category: "Footwear & Athletic",
      tagline: "90-Day VIP Window vs 60-Day Trial Window",
    },
    {
      slugA: "sephora",
      slugB: "ulta",
      title: "Sephora vs Ulta",
      category: "Beauty & Cosmetics",
      tagline: "30-Day Cash Refund vs 60-Day Original Payment",
    },
    {
      slugA: "target",
      slugB: "walmart",
      title: "Target vs Walmart",
      category: "Superstore Retail",
      tagline: "90-Day Standard vs RedCard 120-Day Extension",
    },
    {
      slugA: "apple",
      slugB: "best-buy",
      title: "Apple vs Best Buy",
      category: "Consumer Tech",
      tagline: "Strict 14-Day Apple Window vs 15-60 Day Best Buy",
    },
    {
      slugA: "nordstrom",
      slugB: "macys",
      title: "Nordstrom vs Macy's",
      category: "Department Stores",
      tagline: "Case-by-Case Unlimited vs 90-Day Strict Window",
    },
    {
      slugA: "ikea",
      slugB: "wayfair",
      title: "IKEA vs Wayfair",
      category: "Furniture & Home",
      tagline: "365-Day Unopened Dropoff vs 30-Day Mail Returns",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { label: "Stores", href: "/stores" },
            { label: "Side-by-Side Policy Comparer" },
          ]}
        />

        {/* Hero Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/30">
              <Scale className="h-4 w-4 text-red-400" />
              <span>2026 RETAIL POLICY AUDIT ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Compare Retailer Return Policies Side-by-Side
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Evaluate return windows, receipt lookup options, mail-in shipping costs, restocking penalties, and member extensions before making a purchase. Updated continuously against official retail terms.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                50+ Audited Stores
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                100% Verified Terms
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-400" />
                Instant Winner Verdict
              </span>
            </div>
          </div>
        </div>

        {/* Popular Retail Matchups Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                Featured Comparisons
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                Top Retail Policy Matchups of 2026
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Click any card to inspect full side-by-side metrics
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {curatedPairs.map((pair) => {
              const storeA = storesData.find((s) => s.slug === pair.slugA);
              const storeB = storesData.find((s) => s.slug === pair.slugB);
              if (!storeA || !storeB) return null;

              const gradeA = calculatePolicyGrade(storeA.quickAnswer);
              const gradeB = calculatePolicyGrade(storeB.quickAnswer);

              return (
                <div
                  key={pair.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-red-300 transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                  onClick={() => {
                    setActivePair({ storeA: pair.slugA, storeB: pair.slugB });
                    const el = document.getElementById("policy-comparer-container");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {pair.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-red-600 flex items-center gap-1">
                        <Scale className="h-3.5 w-3.5" />
                        <span>Compare</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                      {pair.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {pair.tagline}
                    </p>

                    {/* Dual Store Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                        <span className="font-extrabold text-slate-900 text-xs block truncate">
                          {storeA.brand}
                        </span>
                        <span className={`inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${gradeA.bgClass} ${gradeA.colorClass}`}>
                          Grade {gradeA.grade}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center space-y-1">
                        <span className="font-extrabold text-slate-900 text-xs block truncate">
                          {storeB.brand}
                        </span>
                        <span className={`inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${gradeB.bgClass} ${gradeB.colorClass}`}>
                          Grade {gradeB.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs font-bold text-slate-700 flex items-center justify-between group-hover:text-red-600 transition-colors border-t border-slate-100">
                    <span>Inspect Side-by-Side</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-red-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Comparer Tool */}
        <StorePolicyComparer initialStoreA={activePair.storeA} initialStoreB={activePair.storeB} />

        {/* Industry Sector Benchmark Matrix */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">
                Retail Benchmark Standard
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
                2026 Industry Average Return Windows & Norms
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
              Retail Industry Audit Standard
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Understanding how a specific store compares to its sector average helps you identify whether a retailer&apos;s return terms are shopper-friendly or overly restrictive.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                  <th className="p-3.5 border border-slate-800">Retail Category</th>
                  <th className="p-3.5 border border-slate-800">Industry Avg Window</th>
                  <th className="p-3.5 border border-slate-800">Opened / Used Item Policy</th>
                  <th className="p-3.5 border border-slate-800">Mail Return Fee Norm</th>
                  <th className="p-3.5 border border-slate-800">Top Rated Retailer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 bg-slate-50">Footwear & Athletics</td>
                  <td className="p-3.5 font-bold text-red-700">60 – 90 Days</td>
                  <td className="p-3.5">Unworn in original box (30-day wear test at Nike)</td>
                  <td className="p-3.5 font-semibold text-emerald-700">FREE for Rewards VIPs</td>
                  <td className="p-3.5 font-extrabold text-slate-900">DSW & Zappos (365 Days)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 bg-slate-50">Beauty & Cosmetics</td>
                  <td className="p-3.5 font-bold text-red-700">30 – 60 Days</td>
                  <td className="p-3.5">Gently used products allowed with receipt</td>
                  <td className="p-3.5 font-semibold text-emerald-700">FREE in-store dropoff</td>
                  <td className="p-3.5 font-extrabold text-slate-900">Sephora & Ulta (60 Days)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 bg-slate-50">Consumer Electronics</td>
                  <td className="p-3.5 font-bold text-rose-700">14 – 30 Days</td>
                  <td className="p-3.5">Opened items subject to 15% restocking fee</td>
                  <td className="p-3.5 text-slate-600">$5.99 – $9.99 deducted label</td>
                  <td className="p-3.5 font-extrabold text-slate-900">Costco (90 Days, $0 Fee)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 bg-slate-50">Department Stores</td>
                  <td className="p-3.5 font-bold text-red-700">90 Days</td>
                  <td className="p-3.5">Original tags attached</td>
                  <td className="p-3.5 font-semibold text-emerald-700">100% Free in-store</td>
                  <td className="p-3.5 font-extrabold text-slate-900">Nordstrom (No Time Limit)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 bg-slate-50">Furniture & Home Improvement</td>
                  <td className="p-3.5 font-bold text-red-700">90 – 365 Days</td>
                  <td className="p-3.5">Unopened / unassembled items</td>
                  <td className="p-3.5 text-slate-600">Freight pick-up charges apply</td>
                  <td className="p-3.5 font-extrabold text-slate-900">IKEA & Home Depot (365 Days)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Pro Hacks to Never Pay Return Shipping */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              Consumer Protection Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              3 Golden Rules to Avoid Return Fees at Any Retailer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-white text-base">
                <CheckCircle2 className="h-5 w-5 text-red-400 shrink-0" />
                <span>1. Always Drop Off In-Store</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Even if an online order charges $7.99 for mail return labels, returning online orders in-person at physical retail locations is 100% free across 98% of major stores.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-white text-base">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
                <span>2. Join Free VIP Rewards</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Retailers like DSW, Nike, and Target waive return shipping fees completely and extend return windows automatically when you sign up for free rewards accounts.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-white text-base">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>3. Give Phone / Email at Checkout</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Giving your phone number or email at the register creates an automated digital receipt in store databases, guaranteeing receipt lookup even if paper receipts are lost.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison FAQs Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">
              Policy Comparison Knowledge Base
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
              Side-by-Side Comparison FAQs
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Answers to common questions regarding store return score ratings, receipt lookup rules, and restocking penalties.
            </p>
          </div>

          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Which retailer offers the single longest return policy in 2026?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6 mt-1">
                Zappos, Nordstrom, IKEA, and DSW (VIP Elite members) offer up to a full 365 days for returns with free return shipping. Costco also offers virtually unlimited return windows on most general merchandise with a valid membership.
              </p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>How are store return policy grades calculated in this comparison tool?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6 mt-1">
                Our policy algorithm evaluates stores on a 100-point scale based on: length of return window (+20 pts for 365 days), receipt lookup flexibility (+10 pts for card/email lookup), absence of restocking penalties (+15 pts), and free return shipping or in-store dropoffs (+10 pts).
              </p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Do online-only retailers charge return shipping fees?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6 mt-1">
                It varies. While Zappos and Amazon offer 100% free mail returns or dropoffs at Whole Foods/UPS, other online fashion brands deduct $5.99 to $9.99 for return labels unless you hold a VIP loyalty account.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Can I compare beauty stores like Sephora and Ulta?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6 mt-1">
                Yes! Both Sephora and Ulta offer 60-day return windows for gently used cosmetics with proof of purchase. Sephora issues store credit between days 31–60 for online orders, whereas Ulta refunds to original payment up to day 60.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
