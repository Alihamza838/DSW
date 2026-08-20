/**
 * Dynamic FX Currency Conversion & Formatting Utility
 * Benchmark rates updated for global market pricing conversions.
 */

export interface CurrencyMeta {
  code: string;
  symbol: string;
  name: string;
  rateToUSD: number; // How many 1 USD is equal to in target currency
}

export const CURRENCIES: Record<string, CurrencyMeta> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateToUSD: 1.0 },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", rateToUSD: 1.38 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rateToUSD: 0.78 },
  AUD: { code: "AUD", symbol: "AU$", name: "Australian Dollar", rateToUSD: 1.52 },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", rateToUSD: 3.67 },
  PKR: { code: "PKR", symbol: "Rs. ", name: "Pakistani Rupee", rateToUSD: 278.5 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", rateToUSD: 83.9 },
};

const ACTIVE_CURRENCY_KEY = "rpf_user_currency";
const LISTENERS: Array<() => void> = [];

export function getActiveCurrency(): string {
  if (typeof window === "undefined") return "USD";
  try {
    const saved = localStorage.getItem(ACTIVE_CURRENCY_KEY);
    if (saved && CURRENCIES[saved.toUpperCase()]) {
      return saved.toUpperCase();
    }
  } catch {
    // fallback
  }
  return "USD";
}

export function setActiveCurrency(code: string) {
  if (typeof window === "undefined") return;
  const upper = code.toUpperCase();
  if (!CURRENCIES[upper]) return;

  try {
    localStorage.setItem(ACTIVE_CURRENCY_KEY, upper);
    LISTENERS.forEach((fn) => fn());
  } catch {
    // ignore
  }
}

export function subscribeCurrencyChange(callback: () => void): () => void {
  LISTENERS.push(callback);
  return () => {
    const idx = LISTENERS.indexOf(callback);
    if (idx > -1) LISTENERS.splice(idx, 1);
  };
}

/**
 * Converts a price string or number (assumed in source Currency or USD) to target currency.
 */
export function convertAndFormatPrice(
  amountInUSD: number,
  targetCurrencyCode: string
): string {
  const meta = CURRENCIES[targetCurrencyCode.toUpperCase()] || CURRENCIES.USD;
  const converted = amountInUSD * meta.rateToUSD;

  if (meta.code === "PKR" || meta.code === "INR" || meta.code === "AED") {
    return `${meta.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${meta.symbol}${converted.toFixed(2)}`;
}

/**
 * Utility to parse numeric price from strings like "$129.99" or "Rs. 35,000"
 */
export function parseNumericPrice(priceStr: string, sourceCurrency = "USD"): number {
  if (!priceStr) return 0;
  const digits = priceStr.replace(/[^0-9.]/g, "");
  const num = parseFloat(digits);
  if (isNaN(num)) return 0;

  const sourceMeta = CURRENCIES[sourceCurrency.toUpperCase()] || CURRENCIES.USD;
  // Convert source amount to USD first
  return num / sourceMeta.rateToUSD;
}
