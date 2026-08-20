import * as React from "react";
import type { AffiliateProduct, StoreFrontmatter } from "../../types";
import { getValidCategoriesForMarket, getValidStoresForMarket } from "../../lib/market";

interface StoreFilterBarProps {
  stores: StoreFrontmatter[];
  products: AffiliateProduct[];
  activeMarket: string;
  selectedStore: string;
  selectedCategory: string;
  onSelectStore: (storeSlug: string) => void;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function StoreFilterBar({
  stores,
  products,
  activeMarket,
  selectedStore,
  selectedCategory,
  onSelectStore,
  onSelectCategory,
  className = "",
}: StoreFilterBarProps) {
  // Compute valid stores & categories strictly within current active market context
  const validStores = React.useMemo(() => {
    return getValidStoresForMarket(stores, products, activeMarket);
  }, [stores, products, activeMarket]);

  const validCategories = React.useMemo(() => {
    return getValidCategoriesForMarket(products, stores, activeMarket);
  }, [products, stores, activeMarket]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono font-bold uppercase text-ink-400 shrink-0 mr-1">
          Category:
        </span>
        {validCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all shrink-0 ${
                isSelected
                  ? "bg-teal-brand text-white shadow-sm"
                  : "bg-paper-muted text-ink-600 hover:bg-ink-100 hover:text-ink"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          );
        })}
      </div>

      {/* Store Filter Row (ONLY shows stores valid for current market view) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono font-bold uppercase text-ink-400 shrink-0 mr-1">
          Store:
        </span>
        <button
          type="button"
          onClick={() => onSelectStore("all")}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
            selectedStore === "all"
              ? "bg-ink text-white shadow-sm"
              : "bg-white border border-ink-200 text-ink-600 hover:bg-paper-muted hover:text-ink"
          }`}
        >
          All Stores ({validStores.length})
        </button>

        {validStores.map((store) => {
          const isSelected = selectedStore === store.slug;
          return (
            <button
              key={store.slug}
              type="button"
              onClick={() => onSelectStore(store.slug)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-ink text-white shadow-sm border border-ink"
                  : "bg-white border border-ink-200 text-ink-600 hover:bg-paper-muted hover:text-ink"
              }`}
            >
              <span>{store.brand}</span>
              {store.country && (
                <span className="text-[10px] opacity-70 font-mono">
                  ({store.country})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
