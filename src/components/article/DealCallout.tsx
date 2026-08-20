import React from "react";
import { Tag, ExternalLink, ShieldCheck, Clock } from "lucide-react";
import { OptimizedImage } from "../ui/OptimizedImage";
import { productsData } from "../../data/products";

interface DealCalloutProps {
  storeId?: string;
  productId?: string;
  customTitle?: string;
}

export function DealCallout({ storeId, productId, customTitle }: DealCalloutProps) {
  // Find product by id or store slug match
  const deal = productId
    ? productsData.find((p) => p.id === productId)
    : storeId
    ? productsData.find((p) => p.storeSlug.includes(storeId) || p.id.includes(storeId))
    : productsData[0];

  if (!deal) return null;

  const isPending = deal.status === "pending" || !deal.affiliateUrl || deal.affiliateUrl.includes("#");

  return (
    <div className="my-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-white to-paper border border-amber-500/30 shadow-2xs font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-amber-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-amber-500 text-white">
            <Tag className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
            {customTitle || `Verified ${deal.store} Deal & Policy Coverage`}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isPending && (
            <span className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-600" />
              <span>Network Review Pending</span>
            </span>
          )}
          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
            {deal.discount || "Featured Deal"}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-white border border-ink-100 p-2 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
          <OptimizedImage
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h4 className="text-sm font-bold text-ink line-clamp-2 leading-snug">
            {deal.title}
          </h4>
          <p className="text-xs text-ink-500 mt-1 font-mono">
            <span className="font-extrabold text-teal-dark text-sm">{deal.salePrice}</span>
            {deal.originalPrice && (
              <span className="line-through text-ink-400 ml-1.5">{deal.originalPrice}</span>
            )}
            <span className="mx-2">•</span>
            <span className="text-ink-700 font-semibold">{deal.returnPolicyWindow}</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1 italic">
            *Independent Shopper Research: Store links connect directly to verified retailer pages. Network affiliate terms are under pending partner review.
          </p>
        </div>

        {isPending ? (
          <a
            href={`/stores/${deal.storeSlug}`}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>Check Store Policy</span>
          </a>
        ) : (
          <a
            href={deal.affiliateUrl || "#"}
            target="_blank"
            rel="nofollow sponsored"
            className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <span>View Verified Deal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
