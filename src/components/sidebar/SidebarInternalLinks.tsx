import React from "react";
import { Link } from "../ui/Link";
import { StoreImage } from "../ui/StoreImage";
import { storesData } from "../../data/stores";
import { guidesData } from "../../data/guides";
import { ChevronRight, Store, FileText, Sparkles, ExternalLink, ArrowRight } from "lucide-react";

interface SidebarTopStoresProps {
  currentSlug?: string;
  limit?: number;
}

export function SidebarTopStoresWidget({ currentSlug, limit = 8 }: SidebarTopStoresProps) {
  // Select top featured stores excluding current if on store page
  const featuredStores = React.useMemo(() => {
    return storesData
      .filter((s) => s.slug !== currentSlug)
      .slice(0, limit);
  }, [currentSlug, limit]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
          <Store className="h-4 w-4 text-red-600" />
          <span>Top Retail Policy Desks</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-200/60">
          2026 Audited
        </span>
      </div>

      <div className="space-y-2">
        {featuredStores.map((s) => (
          <Link
            key={s.slug}
            href={`/stores/${s.slug}`}
            className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-slate-50/80 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                <StoreImage
                  storeSlug={s.slug}
                  src={s.logo || s.image}
                  alt={`${s.brand} Logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="truncate">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                  {s.brand}
                </h4>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  {s.quickAnswer.returnWindow}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-red-600 transition-colors shrink-0">
              <span className="hidden sm:inline">View</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/stores"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-red-600 transition-all shadow-2xs group"
        >
          <span>Browse All 100+ Store Policy Guides</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

interface SidebarPopularGuidesProps {
  currentSlug?: string;
  limit?: number;
}

export function SidebarPopularGuidesWidget({ currentSlug, limit = 5 }: SidebarPopularGuidesProps) {
  const featuredGuides = React.useMemo(() => {
    return guidesData
      .filter((g) => g.slug !== currentSlug)
      .slice(0, limit);
  }, [currentSlug, limit]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
          <FileText className="h-4 w-4 text-red-600" />
          <span>Popular Policy Guides</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
          Verified Hacks
        </span>
      </div>

      <div className="space-y-2.5">
        {featuredGuides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group block p-2.5 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-slate-50/80 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                {g.title}
              </h4>
              <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-red-600 shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-slate-500">
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">{g.category}</span>
              <span>•</span>
              <span>{g.readingTime || "5 min read"}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/blog"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-200 hover:text-slate-900 transition-all"
        >
          <span>Explore All Consumer Guides</span>
        </Link>
      </div>
    </div>
  );
}
