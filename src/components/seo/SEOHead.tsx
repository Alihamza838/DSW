import * as React from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  markdownUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string[];
  author?: string;
  geoRegion?: string; // e.g. "US-NY", "PK-PB", "AE-DU"
  geoPlacename?: string; // e.g. "New York", "Dubai", "Lahore"
}

export function SEOHead({
  title = "DSWReturnRefund - 2026 Verified Global Store Return Rules & Deals",
  description = "Audit-backed return policy guidelines, receipt lookup rules, and verified shopping deals across Target, Walmart, Nike, Sephora, Daraz, Flipkart, Noon, Temu and 50+ global retailers.",
  canonicalUrl = "https://dswreturnrefund.com/",
  markdownUrl,
  ogImage = "/images/og-default.png",
  ogType = "website",
  keywords = [
    "return policy",
    "store return policy 2026",
    "receipt lookup",
    "365 day return policy",
    "refund guide",
    "consumer rights",
    "global shopping deals",
  ],
  author = "DSWReturnRefund Global Editorial Audit Board",
  geoRegion = "US",
  geoPlacename = "Global Shopping Hub",
}: SEOHeadProps) {
  React.useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes("DSWReturnRefund")
      ? title
      : `${title} | DSWReturnRefund`;
    document.title = fullTitle;

    // Helper to update meta tag by name or property
    const setMetaTag = (attribute: "name" | "property", attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords.join(", "));
    setMetaTag("name", "author", author);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // 3. GEO & AEO Meta Signals
    setMetaTag("name", "geo.region", geoRegion);
    setMetaTag("name", "geo.placename", geoPlacename);
    setMetaTag("name", "distribution", "global");

    // 4. OpenGraph Tags
    const resolvedOgImage = ogImage.startsWith("http")
      ? ogImage
      : typeof window !== "undefined"
      ? `${window.location.origin}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
      : ogImage;

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", resolvedOgImage);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", "DSWReturnRefund");

    // 5. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", resolvedOgImage);

    // 6. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 7. Markdown Mirror Link for AI Crawlers
    let markdownLink = document.querySelector('link[rel="alternate"][type="text/markdown"]');
    if (markdownUrl) {
      if (!markdownLink) {
        markdownLink = document.createElement("link");
        markdownLink.setAttribute("rel", "alternate");
        markdownLink.setAttribute("type", "text/markdown");
        document.head.appendChild(markdownLink);
      }
      markdownLink.setAttribute("href", markdownUrl);
    } else if (markdownLink) {
      markdownLink.remove();
    }

  }, [title, description, canonicalUrl, markdownUrl, ogImage, ogType, keywords, author, geoRegion, geoPlacename]);

  return null;
}
