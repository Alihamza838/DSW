import * as React from "react";
import { StoreFrontmatter } from "../../types";
import { storesData } from "../../data/stores";
import { Link } from "../ui/Link";
import { StoreImage } from "../ui/StoreImage";
import { CountryFlag } from "../ui/CountryFlag";
import { ShieldCheck, ArrowRight, Clock, DollarSign, Sparkles, Building2 } from "lucide-react";
import { calculatePolicyGrade } from "../../lib/utils";

interface SimilarStorePoliciesProps {
  currentStore: StoreFrontmatter;
}

export function SimilarStorePolicies({ currentStore }: SimilarStorePoliciesProps) {
  const similarStores = React.useMemo(() => {
    return storesData
      .filter((s) => s.slug !== currentStore.slug)
      .map((s) => {
        let score = 0;
        // Category overlap
        if (currentStore.category && s.category) {
          const overlap = s.category.some((cat) => currentStore.category.includes(cat));
          if (overlap) score += 50;
        }
        // Same return window duration
        if (s.quickAnswer.returnWindow === currentStore.quickAnswer.returnWindow) {
          score += 35;
        }
        // Same restocking fee policy ($0 vs fee)
        if (s.quickAnswer.restockingFee === currentStore.quickAnswer.restockingFee) {
          score += 25;
        }
        // Same country / region
        if ((s.country || "US") === (currentStore.country || "US")) {
          score += 15;
        }

        return { store: s, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.store);
  }, [currentStore]);

  if (similarStores.length === 0) return null;

  return (
    <section className="my-12 pt-10 border-t border-slate-200/90 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-50 border border-teal-200/80 text-teal-800 text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span>Store Discovery Engine</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">Category Benchmarks</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Explore Similar Store Return Policies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed font-sans">
            Looking for alternatives? Discover retailers in similar categories with comparable return windows and terms.
          </p>
        </div>

        <Link
          href="/stores"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-200/90 px-4 py-2.5 rounded-xl shadow-2xs transition-all group shrink-0 self-start sm:self-auto"
        >
          <span>Browse All Stores</span>
          <ArrowRight className="h-3.5 w-3.5 text-teal-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {similarStores.map((store) => {
          const gradeInfo = calculatePolicyGrade(store.quickAnswer);
          const countryCode = store.country || store.countryCode || "US";

          return (
            <Link
              key={store.slug}
              href={`/stores/${store.slug}`}
              className="group relative bg-white border border-slate-200/90 hover:border-teal-500/60 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Store Hero Image / Logo Showcase Frame */}
                <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 mb-4 flex items-center justify-center p-3">
                  <StoreImage
                    src={store.logo || store.image || `/images/stores/${store.slug}.png`}
                    alt={store.brand}
                    storeSlug={store.slug}
                    fitMode="contain"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Top-Right Country Badge */}
                  <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-sm">
                    <CountryFlag code={countryCode} size="sm" />
                    <span>{countryCode}</span>
                  </span>

                  {/* Top-Left Grade Badge */}
                  <span className={`absolute top-2 left-2 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${gradeInfo.bgClass} ${gradeInfo.colorClass}`}>
                    Grade {gradeInfo.grade}
                  </span>
                </div>

                {/* Store Title Header */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-display text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 tracking-tight">
                    {store.brand}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      <span>Score: {gradeInfo.score}/100</span>
                    </span>
                    <span className="text-slate-400">Audited 2026</span>
                  </div>
                </div>

                {/* Structured Key Metrics (No Text Overlap!) */}
                <div className="space-y-2 pt-1 font-sans">
                  {/* Return Window Block */}
                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-2.5 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <Clock className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                        <span>Return Window</span>
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {store.quickAnswer.returnWindow}
                    </p>
                  </div>

                  {/* Restocking Fee Row */}
                  <div className="flex items-center justify-between bg-slate-50/90 border border-slate-200/80 rounded-xl px-2.5 py-2 text-xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Restocking Fee</span>
                    </span>
                    <span
                      className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        store.quickAnswer.restockingFee
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {store.quickAnswer.restockingFee ? "Applies" : "$0 FREE"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
                <span>View Full Policy</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-teal-600" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

