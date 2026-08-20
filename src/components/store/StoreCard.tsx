import React from "react";
import { ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "../ui/Link";
import type { StoreFrontmatter } from "../../types";
import { CountryFlag } from "../ui/CountryFlag";
import { SavePolicyButton } from "../ui/SavePolicyButton";
import { StoreImage } from "../ui/StoreImage";
import { HighlightedText } from "../ui/HighlightedText";

interface StoreCardProps {
  store: StoreFrontmatter;
  className?: string;
  query?: string;
}

export function StoreCard({ store, className = "", query = "" }: StoreCardProps) {
  const restockingText = store.quickAnswer.restockingFee ? "Applicable" : "$0 Fee";

  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-200/90 card-3d-lift shadow-2xs hover:border-teal-brand/70 flex flex-col justify-between overflow-hidden font-sans ${className}`}
    >
      <div>
        {/* Top Header Strip */}
        <div className="p-4 pb-3 flex justify-between items-center gap-2 bg-white">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-teal-brand transition-colors truncate tracking-tight">
              <Link href={`/stores/${store.slug}`}>
                <HighlightedText text={store.brand} query={query} />
              </Link>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase border border-emerald-500/30 text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full shadow-2xs">
              <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
              <span>AUDITED 2026</span>
            </span>
            <SavePolicyButton
              slug={store.slug}
              title={`${store.brand} Return Policy`}
              type="store"
              returnWindow={store.quickAnswer.returnWindow}
              category={store.category?.[0]}
              variant="icon"
              size="sm"
            />
          </div>
        </div>

        {/* Store Image Placeholder / Hero Cover Slot: Insert retailer photo here */}
        {/* /public/images/stores/${store.slug}.png */}
        <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-900 flex items-center justify-center border-y border-slate-100">
          <StoreImage
            storeSlug={store.slug}
            src={store.logo || `/images/stores/${store.slug}.png`}
            alt={`${store.brand}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Country Flag Pill */}
          <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono font-bold bg-slate-950/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
            <CountryFlag code={store.country || store.countryCode || "US"} size="sm" />
            <span>{store.country || store.countryCode || "US"}</span>
          </span>
        </div>

        {/* Fact Ledger Table */}
        <div className="p-4 sm:p-5 space-y-2.5 font-sans">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-100 gap-2">
            <span className="text-slate-500 font-medium text-xs shrink-0">Return Window</span>
            <span className="font-bold text-slate-900 text-xs sm:text-sm text-right leading-snug">
              <HighlightedText text={store.quickAnswer.returnWindow} query={query} />
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 border-b border-slate-100 gap-2">
            <span className="text-slate-500 font-medium text-xs shrink-0">Receipt Policy</span>
            <span className="font-bold text-slate-800 text-xs bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
              <HighlightedText
                text={store.quickAnswer.receiptRequired ? "Mandatory" : "Easy Lookup"}
                query={query}
              />
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500 font-medium text-xs shrink-0">Restocking Fee</span>
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg border ${
                store.quickAnswer.restockingFee
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}
            >
              <HighlightedText text={restockingText} query={query} />
            </span>
          </div>
        </div>
      </div>

      {/* Modern High-Contrast CTA Button */}
      <div className="p-4 pt-0">
        <Link
          href={`/stores/${store.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-brand text-white font-bold text-xs transition-colors shadow-xs group/btn cursor-pointer"
        >
          <span>View Full Return Policy</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
