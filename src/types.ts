export type BadgeStatus = "yes" | "no" | "warning";

export interface PolicyBadge {
  label: string;
  status: BadgeStatus;
  note?: string;
}

export interface QuickAnswer {
  returnWindow: string;
  receiptRequired: boolean;
  restockingFee: boolean;
  refundMethod: string;
  onlineReturns: boolean;
  inStoreReturns: boolean;
}

export interface PolicyTableRow {
  category: string;
  window: string;
  condition: string;
  fee: string;
}

export interface Step {
  stepNumber?: number;
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PolicyAlert {
  type: "critical" | "updated" | "extended";
  title: string;
  message: string;
  updatedDate?: string;
  actionNote?: string;
}

export interface StoreFrontmatter {
  id?: string;
  brand: string;
  slug: string;
  baseUrl?: string;
  currency?: string; // e.g. "USD", "CAD", "GBP", "AUD", "AED", "PKR", "INR"
  shipsTo?: string[]; // Array of ISO 2 country codes e.g. ["US"], ["PK", "BD", "LK", "NP", "MM"], ["CA"]
  country?: string; // Main primary country code e.g. "US", "CA", "UK", "AU", "AE", "PK", "IN", "CN"
  countryCode?: string; // Standard ISO country code e.g. "US", "CA", "GB", "AU", "AE", "PK", "IN", "CN"
  countryName?: string; // e.g. "United States", "Canada", "Pakistan"
  category: string[];
  logo?: string;
  image?: string;
  lastVerified: string;
  officialPolicyUrl: string;
  metaDescription: string;
  quickAnswer: QuickAnswer;
  badges?: PolicyBadge[];
  policyTable?: PolicyTableRow[];
  policyMatrix?: PolicyTableRow[];
  steps?: Step[];
  faqs?: Faq[];
  relatedBrands?: string[];
  proseContent?: string;
  policyAlert?: PolicyAlert;
  executiveSummary?: { feature: string; rule: string; detail: string }[];
  withoutReceiptRules?: string;
  wornItemsPolicy?: string;
  clearanceRules?: string;
  vipBenefits?: string;
  stepByStepGuide?: { stepNumber: number; title: string; text: string }[];
}

export interface StoreTopicFrontmatter {
  brand: string;
  brandSlug: string;
  topic: string;
  title: string;
  metaDescription: string;
  lastVerified: string;
  quickAnswer: string;
  faqs: Faq[];
  steps: Step[];
  proseContent?: string;
}

export type ArticleCategory =
  | "how-to"
  | "comparison"
  | "consumer-rights"
  | "seasonal"
  | "glossary"
  | "policy-news"
  | "guide";

export interface ArticleGuide {
  title: string;
  slug: string;
  status?: "published" | "needs-review" | "archived";
  description: string;
  category: ArticleCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  heroImage?: string;
  author: string;
  relatedStores: string[];
  relatedArticles: string[];
  summary: string;
  quickAnswer?: string;
  verifiedSourceUrl?: string;
  verifiedSourceDate?: string;
  factRows?: { label: string; value: string; status?: "yes" | "no" | "warning" | "neutral"; note?: string }[];
  sources?: { title: string; url: string; publisher?: string; dateAccessed?: string }[];
  faqs: Faq[];
  steps: Step[];
  proseContent?: string;
}

export interface AffiliateProduct {
  id: string;
  title: string;
  store: string;
  storeSlug: string; // References store slug/id
  category: string;
  originalPrice: string | number;
  salePrice: string | number;
  discount: string;
  image: string;
  rating: number;
  reviewsCount: number;
  affiliateUrl: string;
  returnPolicyWindow: string;
  isTrending?: boolean;
  description?: string;
  // Dynamic market annotations attached by market.ts:
  shipsTo?: string[];
  currency?: string;
  shipsWithinLabel?: string;
  countryFlag?: string;
  countryCode?: string;
  storeCountry?: string;
  storeCountryName?: string;
  returnSteps?: string[];
  refundWindowDays?: number;
  storeLocationVerified?: boolean;
  status?: "live" | "pending";
}
