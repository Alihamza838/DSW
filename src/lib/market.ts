import type { AffiliateProduct, StoreFrontmatter } from "../types";
import { detectUserCountry as detectGeo, getCountryMeta, SUPPORTED_COUNTRIES } from "./geo";

export { detectGeo as detectUserCountry };

/**
 * Returns normalized shipping scope for a store.
 */
export function getStoreShipsTo(store: StoreFrontmatter): string[] {
  if (store.shipsTo && store.shipsTo.length > 0) {
    return store.shipsTo.map((c) => c.toUpperCase());
  }

  // Fallback defaults based on primary country field
  const primary = (store.country || "US").toUpperCase();
  switch (primary) {
    case "PK":
      return ["PK", "BD", "LK", "NP", "MM"];
    case "IN":
      return ["IN"];
    case "AE":
    case "SA":
      return ["AE", "SA", "QA", "KW", "OM", "BH"];
    case "CA":
      return ["CA"];
    case "UK":
    case "GB":
      return ["UK", "GB"];
    case "AU":
      return ["AU", "NZ"];
    case "CN":
      return ["US", "CA", "UK", "AU", "AE", "PK", "IN", "CN", "GLOBAL"];
    case "US":
    default:
      return ["US"];
  }
}

/**
 * Returns formatted native currency code for a store.
 */
export function getStoreCurrency(store: StoreFrontmatter): string {
  if (store.currency) return store.currency;
  const primary = (store.country || "US").toUpperCase();
  switch (primary) {
    case "PK": return "PKR";
    case "IN": return "INR";
    case "AE": return "AED";
    case "UK":
    case "GB": return "GBP";
    case "CA": return "CAD";
    case "AU": return "AUD";
    case "US":
    default: return "USD";
  }
}

/**
 * Returns unmissable shipping scope text label for badges and CTAs.
 */
export function formatShipsToLabel(shipsTo: string[], countryName?: string, primaryCountry?: string): string {
  const primary = (primaryCountry || shipsTo[0] || "US").toUpperCase();
  const meta = getCountryMeta(primary);

  if (shipsTo.includes("GLOBAL") || primary === "CN") {
    return "🌏 Ships Worldwide & Global Direct";
  }

  if (primary === "PK") {
    return "🇵🇰 Ships within Pakistan & South Asia";
  }
  if (primary === "IN") {
    return "🇮🇳 Ships within India only";
  }
  if (primary === "AE" || primary === "SA") {
    return "🇦🇪 Ships within UAE, KSA & GCC";
  }
  if (primary === "CA") {
    return "🇨🇦 Ships within Canada only";
  }
  if (primary === "UK" || primary === "GB") {
    return "🇬🇧 Ships within UK only";
  }
  if (primary === "AU") {
    return "🇦🇺 Ships within Australia only";
  }
  if (primary === "US") {
    return "🇺🇸 Ships within USA only";
  }

  return `${meta.flag} Ships to ${countryName || meta.name}`;
}

/**
 * Single source of truth: Annotates product with store shipping scope and currency details.
 */
export function annotateProduct(product: AffiliateProduct, stores: StoreFrontmatter[]): AffiliateProduct {
  const store = stores.find(
    (s) => s.slug === product.storeSlug || s.slug.toLowerCase() === (product.storeSlug || "").toLowerCase()
  );

  const shipsTo = store ? getStoreShipsTo(store) : getStoreShipsTo({ country: product.storeSlug?.split("-")[1] } as any);
  const currency = store ? getStoreCurrency(store) : "USD";
  const primaryCountry = store?.country || product.storeSlug?.split("-")[1] || "US";
  const meta = getCountryMeta(primaryCountry);
  const label = formatShipsToLabel(shipsTo, store?.countryName || meta.name, primaryCountry);

  return {
    ...product,
    shipsTo,
    currency,
    shipsWithinLabel: label,
    countryFlag: meta.flag,
    storeCountry: meta.code,
    storeCountryName: meta.name,
  };
}

/**
 * Returns all products annotated with market metadata.
 */
export function annotateAllProducts(products: AffiliateProduct[], stores: StoreFrontmatter[]): AffiliateProduct[] {
  return products.map((p) => annotateProduct(p, stores));
}

/**
 * HYBRID Filter: Returns products valid for the active market mode.
 * - If activeMarket is 'global', returns ALL annotated products.
 * - Otherwise, filters products to ONLY those whose store shipsTo includes userCountry.
 */
export function getProductsForMarket(
  products: AffiliateProduct[],
  stores: StoreFrontmatter[],
  activeMarket: string
): AffiliateProduct[] {
  const annotated = annotateAllProducts(products, stores);

  if (!activeMarket || activeMarket === "global" || activeMarket === "all") {
    return annotated;
  }

  const marketUpper = activeMarket.toUpperCase();

  return annotated.filter((p) => {
    if (!p.shipsTo || p.shipsTo.length === 0) return true;
    return (
      p.shipsTo.includes(marketUpper) ||
      p.shipsTo.includes("GLOBAL") ||
      (marketUpper === "UK" && p.shipsTo.includes("GB")) ||
      (marketUpper === "GB" && p.shipsTo.includes("UK"))
    );
  });
}

/**
 * Market-Aware Filter for Store Chips: Returns only stores that have at least 1 valid product in active market.
 */
export function getValidStoresForMarket(
  stores: StoreFrontmatter[],
  products: AffiliateProduct[],
  activeMarket: string
): StoreFrontmatter[] {
  if (!activeMarket || activeMarket === "global" || activeMarket === "all") {
    return stores;
  }

  const marketProducts = getProductsForMarket(products, stores, activeMarket);
  const validStoreSlugs = new Set(marketProducts.map((p) => p.storeSlug.toLowerCase()));

  // Also include stores whose primary country matches the active market
  return stores.filter(
    (s) =>
      validStoreSlugs.has(s.slug.toLowerCase()) ||
      getStoreShipsTo(s).includes(activeMarket.toUpperCase())
  );
}

/**
 * Market-Aware Filter for Category Chips: Returns categories with products in active market.
 */
export function getValidCategoriesForMarket(
  products: AffiliateProduct[],
  stores: StoreFrontmatter[],
  activeMarket: string
): string[] {
  const marketProducts = getProductsForMarket(products, stores, activeMarket);
  const categories = new Set<string>();
  marketProducts.forEach((p) => {
    if (p.category) categories.add(p.category);
  });
  return ["all", ...Array.from(categories)];
}
