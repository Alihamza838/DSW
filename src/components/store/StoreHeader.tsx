import React from "react";
import { AlertTriangle, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { StoreImage } from "../ui/StoreImage";
import { BreadcrumbNav } from "../ui/BreadcrumbNav";
import { LastVerifiedBadge } from "./LastVerifiedBadge";
import { QuickAnswerCard } from "./QuickAnswerCard";
import type { StoreFrontmatter } from "../../types";
import { CountryFlag } from "../ui/CountryFlag";

interface StoreHeaderProps {
  store: StoreFrontmatter;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <header className="space-y-6 font-sans">
      {/* Top Single Breadcrumb */}
      <div className="border-b border-slate-100 pb-3">
        <BreadcrumbNav
          items={[
            { label: "Stores", href: "/stores" },
            { label: `${store.brand} Return Policy` },
          ]}
        />
      </div>

      {/* Prominent Policy Alert Banner (if active) */}
      {store.policyAlert && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-950">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded tracking-wider">
                2026 Policy Advisory
              </span>
              <span className="font-bold text-sm text-amber-950 font-sans">
                {store.policyAlert.title}
              </span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed font-medium">
              {store.policyAlert.message}
            </p>
          </div>
        </div>
      )}

      {/* Header meta grid */}
      <div id="top" className="flex flex-col md:flex-row gap-8 justify-between items-start border-b border-slate-200 pb-8 scroll-mt-24">
        <div className="space-y-4 max-w-2xl w-full">
          {/* Store Main Image Placeholder / Front Cover Slot: Insert store storefront image here */}
          {/* Path: /public/images/stores/${store.slug}.png */}
          <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
            <StoreImage
              src={store.image || `/images/stores/${store.slug}.png`}
              alt={`${store.brand} Store Front & Return Policy`}
              storeSlug={store.slug}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {store.countryName && (
              <div className="absolute bottom-3 right-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg border border-white/20">
                  <CountryFlag code={store.countryCode || store.country || "US"} size="sm" />
                  <span>{store.countryName} Market</span>
                </span>
              </div>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {store.brand} Return Policy (2026 Guide)
            {store.countryName && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-red-600 font-semibold border border-red-200 rounded-lg px-2.5 py-0.5 ml-2 bg-red-50 align-middle">
                <CountryFlag code={store.countryCode || store.country || "US"} size="sm" />
                <span>{store.countryName}</span>
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {store.metaDescription}
          </p>
          <div className="pt-1">
            <LastVerifiedBadge
              date={store.lastVerified}
              storeName={store.brand}
              officialPolicyUrl={store.officialPolicyUrl}
            />
          </div>
        </div>

        {/* Quick Answer summary card */}
        <div className="w-full md:max-w-xs shrink-0">
          <QuickAnswerCard brand={store.brand} data={store.quickAnswer} lastVerified={store.lastVerified} />
        </div>
      </div>
    </header>
  );
}
