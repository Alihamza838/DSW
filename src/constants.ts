export const SITE_NAME = "dswReturnRefund";
export const SITE_DESCRIPTION =
  "Verified return, refund, and exchange policies for major US stores - return windows, receipt rules, fees, and step-by-step instructions.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stores", href: "/stores" },
  { label: "Return Perks", href: "/deals" },
  { label: "Guides", href: "/blog" },
  { label: "Compare", href: "/compare" },
] as const;


export const FOOTER_LINKS = {
  "Consumer Utilities": [
    { label: "Find Return Desk Counters", href: "/find-return-desk" },
    { label: "Lost Receipt Approval Predictor", href: "/lost-receipt-checker" },
    { label: "Visual Sitemap Directory", href: "/sitemap" },
    { label: "Raw XML Sitemap (/sitemap.xml)", href: "/sitemap.xml" },
  ],
  Company: [
    { label: "About Our Project", href: "/about" },
    { label: "Editorial Audit Policy", href: "/editorial-policy" },
    { label: "Contact Consumer Help", href: "/contact" },
    { label: "General Legal Disclaimer", href: "/disclaimer" },
    { label: "Consumer Privacy Policy", href: "/privacy" },
    { label: "Verified Terms of Use", href: "/terms" },
  ],
  "Global Territories": [
    { label: "United States Stores", href: "/stores", code: "US" },
    { label: "Canada Marketplace", href: "/stores", code: "CA" },
    { label: "United Kingdom Stores", href: "/stores", code: "GB" },
    { label: "Australia Directory", href: "/stores", code: "AU" },
    { label: "Pakistan (Daraz & COD)", href: "/stores", code: "PK" },
    { label: "India (Flipkart, Myntra, UPI)", href: "/stores", code: "IN" },
    { label: "China (AliExpress, Temu, Shein)", href: "/stores", code: "CN" },
    { label: "United Arab Emirates", href: "/stores", code: "AE" },
    { label: "Saudi Arabia / KSA", href: "/stores", code: "SA" },
  ],
  "Popular Showdowns": [
    { label: "Target vs Walmart", href: "/compare/target-vs-walmart" },
    { label: "Sephora vs Ulta", href: "/compare/sephora-vs-ulta" },
    { label: "DSW vs Nordstrom", href: "/compare/dsw-vs-nordstrom" },
    { label: "Daraz vs Amazon PK", href: "/compare/daraz-vs-amazon" },
    { label: "Flipkart vs Myntra India", href: "/compare/flipkart-vs-myntra" },
    { label: "Temu vs AliExpress Global", href: "/compare/temu-vs-aliexpress" },
    { label: "Shein vs Myntra Fashion", href: "/compare/shein-vs-myntra" },
    { label: "Shein vs Temu Shopping", href: "/compare/shein-vs-temu" },
    { label: "Walmart US vs Canada", href: "/compare/walmart-vs-walmart-ca" },
  ],
  "Deep-Dive Guides": [
    { label: "Pakistan 2026 E-Commerce Returns", href: "/blog/pakistan-daraz-refund-return-guide-2026" },
    { label: "India Flipkart vs Myntra Battle", href: "/blog/india-e-commerce-return-policy-battle-2026" },
    { label: "AliExpress vs Temu vs Shein Guide", href: "/blog/china-cross-border-ecommerce-return-guide-2026" },
    { label: "Dubai & UAE Consumer Audit 2026", href: "/blog/dubai-e-commerce-return-policy-guide-2026" },
    { label: "Saudi Arabia E-Commerce Regulations", href: "/blog/saudia-e-commerce-return-policy-guide-2026" },
    { label: "eBay Global Country-by-Country", href: "/blog/ebay-global-return-policy-all-countries-2026" },
  ],
} as const;

export const CATEGORIES = [
  { slug: "department-stores", label: "Department Stores" },
  { slug: "clothing", label: "Clothing & Apparel" },
  { slug: "activewear", label: "Activewear & Athletic" },
  { slug: "electronics", label: "Tech & Electronics" },
  { slug: "home-improvement", label: "Home Improvement" },
  { slug: "grocery-bigbox", label: "Grocery & Big Box" },
  { slug: "beauty", label: "Beauty" },
  { slug: "furniture", label: "Furniture" },
  { slug: "marketplaces", label: "Online Marketplaces" },
] as const;
