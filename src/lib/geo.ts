export interface CountryMeta {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  regionLabel: string;
}

export const SUPPORTED_COUNTRIES: Record<string, CountryMeta> = {
  US: {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    regionLabel: "North America (USA)",
  },
  CA: {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "CA$",
    regionLabel: "Canada",
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    regionLabel: "United Kingdom & Europe",
  },
  AU: {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "AU$",
    regionLabel: "Australia & Oceania",
  },
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "AED",
    regionLabel: "UAE & GCC Region",
  },
  PK: {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    currencySymbol: "Rs.",
    regionLabel: "Pakistan & South Asia",
  },
  IN: {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    currencySymbol: "₹",
    regionLabel: "India",
  },
  CN: {
    code: "CN",
    name: "China & Global Direct",
    flag: "🇨🇳",
    currency: "USD",
    currencySymbol: "$",
    regionLabel: "Global Direct Shipping",
  },
};

export const DEFAULT_COUNTRY = "US";

/**
 * Detects user country based on browser locale / timezone heuristics with fallback.
 */
export function detectUserCountry(): string {
  if (typeof window === "undefined") return DEFAULT_COUNTRY;

  try {
    // Check saved market preference first
    const saved = localStorage.getItem("rpf_user_market");
    if (saved && (SUPPORTED_COUNTRIES[saved.toUpperCase()] || saved === "global")) {
      return saved.toLowerCase();
    }

    // Heuristic via Intl timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Karachi")) return "PK";
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "IN";
    if (tz.includes("Dubai")) return "AE";
    if (tz.includes("London")) return "UK";
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Perth")) return "AU";
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Edmonton")) return "CA";
    if (tz.includes("Shanghai") || tz.includes("Urumqi") || tz.includes("Chongqing")) return "CN";
    if (tz.includes("America/")) return "US";

    // Heuristic via language
    const lang = navigator.language || "";
    if (lang.includes("en-CA")) return "CA";
    if (lang.includes("en-GB")) return "UK";
    if (lang.includes("en-AU")) return "AU";
    if (lang.includes("ur") || lang.includes("en-PK")) return "PK";
    if (lang.includes("hi") || lang.includes("en-IN")) return "IN";
    if (lang.includes("ar") || lang.includes("en-AE")) return "AE";
    if (lang.includes("zh")) return "CN";
  } catch {
    // Fallback on error
  }

  return DEFAULT_COUNTRY;
}

export function getCountryMeta(code: string): CountryMeta {
  const upper = (code || "").toUpperCase();
  return SUPPORTED_COUNTRIES[upper] || SUPPORTED_COUNTRIES.US;
}
