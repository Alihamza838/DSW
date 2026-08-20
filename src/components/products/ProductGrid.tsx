import React, { useState } from "react";
import { ShieldCheck, Filter, Globe, Sparkles } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { productsData } from "../../data/products";
import { AFFILIATE_DISCLOSURE_SHORT } from "../../utils/affiliateLink";

interface ProductGridProps {
  initialStoreSlug?: string;
  title?: string;
  description?: string;
  limit?: number;
  inArticle?: boolean;
  cols?: 2 | 3 | 4;
}

export function ProductGrid({
  initialStoreSlug,
  title = "Popular Products with Guaranteed Return Coverage",
  description = "Shop top-rated items with verified 2026 return windows, no-receipt lookup guarantees, and easy doorstep returns.",
  limit,
  inArticle = false,
  cols,
}: ProductGridProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  let filtered = productsData;

  if (initialStoreSlug) {
    const rootSlug = initialStoreSlug.split("-")[0];
    filtered = filtered.filter((p) => p.storeSlug === initialStoreSlug || p.storeSlug.includes(rootSlug));
  }

  if (selectedCountry !== "ALL") {
    filtered = filtered.filter((p) => (p.storeCountry || p.countryFlag) === selectedCountry || p.storeCountry === selectedCountry);
  }

  if (selectedCategory !== "ALL") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  const displayedProducts = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="space-y-4 my-8 font-sans [container-type:inline-size] w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>2026 Store Product Deals & Return Coverage</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-ink min-w-0 break-words">{title}</h2>
          <p className="text-xs text-ink-600 mt-0.5 max-w-2xl">{description}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Country Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-transparent font-bold text-ink cursor-pointer focus:outline-none text-xs"
            >
              <option value="ALL">All Markets (Global)</option>
              <option value="US">United States (US)</option>
              <option value="IN">India (IN)</option>
              <option value="PK">Pakistan (PK)</option>
              <option value="AE">United Arab Emirates (UAE)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-bold text-ink cursor-pointer focus:outline-none text-xs"
            >
              <option value="ALL">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Footwear">Footwear</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
            </select>
          </div>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-ink-500">
          No items found matching the selected country or category filters.
        </div>
      ) : (
        <div
          className={
            inArticle
              ? "grid grid-cols-1 @[480px]:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0"
              : cols === 2 || (initialStoreSlug && cols !== 4)
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full min-w-0"
          }
        >
          {displayedProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx} />
          ))}
        </div>
      )}

      {/* Affiliate Transparency Disclosure Banner */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-ink-500 font-mono flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
          <span>{AFFILIATE_DISCLOSURE_SHORT}</span>
        </span>
      </div>
    </section>
  );
}
