import { SUPPORTED_COUNTRIES } from "./geo";

/**
 * Formats a raw price value or string into the store's exact native currency string.
 * Never silently converts across currencies.
 */
export function formatNativePrice(price: string | number, currencyCode: string = "USD"): string {
  if (price === undefined || price === null || price === "") return "";

  // If price is already formatted (e.g., "Rs. 5,999", "729 AED", "CA$109.98", "£94.95", "₹1,299", "$109.99")
  const strPrice = String(price).trim();
  if (
    strPrice.includes("$") ||
    strPrice.includes("£") ||
    strPrice.includes("₹") ||
    strPrice.includes("Rs") ||
    strPrice.includes("AED") ||
    strPrice.includes("AU$") ||
    strPrice.includes("CA$")
  ) {
    return strPrice;
  }

  const num = typeof price === "number" ? price : parseFloat(strPrice.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return strPrice;

  const code = (currencyCode || "USD").toUpperCase();

  switch (code) {
    case "PKR":
      return `Rs. ${num.toLocaleString("en-PK")}`;
    case "INR":
      return `₹${num.toLocaleString("en-IN")}`;
    case "AED":
      return `${num.toLocaleString("en-US")} AED`;
    case "GBP":
      return `£${num.toFixed(2)}`;
    case "CAD":
      return `CA$${num.toFixed(2)}`;
    case "AUD":
      return `AU$${num.toFixed(2)}`;
    case "USD":
    default:
      return `$${num.toFixed(2)}`;
  }
}
