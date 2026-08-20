/**
 * Centralized Affiliate Network Configuration & Store Tag Mapping
 * 
 * HOW TO ADD OR EDIT YOUR AFFILIATE LINKS:
 * --------------------------------------------------
 * 1. Default Network Tags: Replace the values below with your actual affiliate network IDs / partner codes.
 * 2. Store Specific Overrides: Add custom affiliate URLs or sub-ids inside STORE_AFFILIATE_MAP.
 * 3. Product Links: Use `buildAffiliateUrl(rawUrl, storeSlug)` across product cards and store buttons.
 */

export const DEFAULT_AFFILIATE_NETWORKS = {
  // Amazon Associates Tag (e.g., dswreturnrefund-20 for US, dswreturnrefund-21 for UK, etc.)
  amazonUsTag: "dswreturnrefund-20",
  amazonInTag: "dswreturnrefundin-21",
  amazonUkTag: "dswreturnrefunduk-21",
  
  // Walmart Affiliate ID / Impact Radius
  walmartImpactId: "rpf_walmart_2026",
  
  // Target Partner ID (Impact)
  targetImpactId: "rpf_target_2026",
  
  // Nike Affiliate Tag (CJ / Rakuten)
  nikePartnerId: "rpf_nike_2026",
  
  // Sephora Affiliate Tag
  sephoraPartnerId: "rpf_sephora_2026",

  // Flipkart India Affiliate Tag
  flipkartAffId: "rpf_flipkart_2026",

  // Daraz Pakistan Affiliate SubID
  darazAffSubId: "rpf_daraz_2026",

  // Noon UAE / KSA Partner Code
  noonPartnerCode: "RPF2026",

  // Generic Default Sub-ID / UTM Source
  defaultUtmSource: "dswreturnrefund",
  defaultUtmMedium: "affiliate_audit",
};

/**
 * Store-Specific Affiliate Link Configuration
 */
export interface StoreAffiliateConfig {
  storeSlug: string;
  affiliateNetwork: "amazon" | "impact" | "cj" | "rakuten" | "flipkart" | "daraz" | "noon" | "direct";
  trackingParam: string;
  trackingValue: string;
  fallbackUrl: string;
}

export const STORE_AFFILIATE_MAP: Record<string, StoreAffiliateConfig> = {
  "amazon-return-policy-guide": {
    storeSlug: "amazon-return-policy-guide",
    affiliateNetwork: "amazon",
    trackingParam: "tag",
    trackingValue: DEFAULT_AFFILIATE_NETWORKS.amazonUsTag,
    fallbackUrl: "https://www.amazon.com?tag=" + DEFAULT_AFFILIATE_NETWORKS.amazonUsTag,
  },
  "walmart-return-policy-without-receipt": {
    storeSlug: "walmart-return-policy-without-receipt",
    affiliateNetwork: "impact",
    trackingParam: "irgwc",
    trackingValue: "1",
    fallbackUrl: "https://www.walmart.com",
  },
  "target-return-policy-explained": {
    storeSlug: "target-return-policy-explained",
    affiliateNetwork: "impact",
    trackingParam: "afid",
    trackingValue: DEFAULT_AFFILIATE_NETWORKS.targetImpactId,
    fallbackUrl: "https://www.target.com",
  },
  "flipkart": {
    storeSlug: "flipkart",
    affiliateNetwork: "flipkart",
    trackingParam: "affid",
    trackingValue: DEFAULT_AFFILIATE_NETWORKS.flipkartAffId,
    fallbackUrl: "https://www.flipkart.com",
  },
  "daraz": {
    storeSlug: "daraz",
    affiliateNetwork: "daraz",
    trackingParam: "sub_id",
    trackingValue: DEFAULT_AFFILIATE_NETWORKS.darazAffSubId,
    fallbackUrl: "https://www.daraz.pk",
  },
  "noon": {
    storeSlug: "noon",
    affiliateNetwork: "noon",
    trackingParam: "utm_campaign",
    trackingValue: DEFAULT_AFFILIATE_NETWORKS.noonPartnerCode,
    fallbackUrl: "https://www.noon.com",
  },
};
