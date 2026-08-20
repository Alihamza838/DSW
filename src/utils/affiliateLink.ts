import { DEFAULT_AFFILIATE_NETWORKS, STORE_AFFILIATE_MAP } from "../config/affiliateConfig";

/**
 * Builds an optimized affiliate link by attaching official partner tags, UTM parameters, or store tracking tokens.
 */
export function buildAffiliateUrl(rawUrl: string, storeSlug?: string, customTag?: string): string {
  if (!rawUrl) return "#";

  try {
    const urlObj = new URL(rawUrl);

    // 1. Amazon Link Injections
    if (urlObj.hostname.includes("amazon.com")) {
      urlObj.searchParams.set("tag", customTag || DEFAULT_AFFILIATE_NETWORKS.amazonUsTag);
    } else if (urlObj.hostname.includes("amazon.in")) {
      urlObj.searchParams.set("tag", customTag || DEFAULT_AFFILIATE_NETWORKS.amazonInTag);
    } else if (urlObj.hostname.includes("amazon.co.uk")) {
      urlObj.searchParams.set("tag", customTag || DEFAULT_AFFILIATE_NETWORKS.amazonUkTag);
    }
    // 2. Store Specific Map Lookup
    else if (storeSlug && STORE_AFFILIATE_MAP[storeSlug]) {
      const config = STORE_AFFILIATE_MAP[storeSlug];
      urlObj.searchParams.set(config.trackingParam, config.trackingValue);
    }

    // 3. Attach standard UTM analytics parameters for transparent tracking
    if (!urlObj.searchParams.has("utm_source")) {
      urlObj.searchParams.set("utm_source", DEFAULT_AFFILIATE_NETWORKS.defaultUtmSource);
      urlObj.searchParams.set("utm_medium", DEFAULT_AFFILIATE_NETWORKS.defaultUtmMedium);
    }

    return urlObj.toString();
  } catch {
    // If relative path or invalid URL string, append query safely
    const separator = rawUrl.includes("?") ? "&" : "?";
    return `${rawUrl}${separator}utm_source=${DEFAULT_AFFILIATE_NETWORKS.defaultUtmSource}`;
  }
}

export const AFFILIATE_DISCLOSURE_SHORT =
  "DSWReturnRefund may earn an affiliate commission on qualifying purchases made through links on this site, at no extra cost to you.";
