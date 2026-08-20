import { useEffect } from "react";

export interface SEOBreadcrumb {
  name: string;
  item: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  markdownUrl?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: SEOBreadcrumb[];
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function useSEO({
  title,
  description,
  canonical,
  markdownUrl,
  ogType = "website",
  ogImage = "/images/og-default.png",
  author = "dswReturnRefund Editorial Team",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Dynamic Page Title
    const fullTitle = title.toLowerCase().includes("dswreturnrefund")
      ? title
      : `${title} | dswReturnRefund (Verified 2026 Audit)`;
    document.title = fullTitle;

    // Helper for adding or updating meta tags
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard SEO Meta
    setMetaTag("name", "description", description);
    setMetaTag("name", "author", author);
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // GEO & EEAT Specific Signals
    setMetaTag("name", "geo.region", "US");
    setMetaTag("name", "coverage", "Worldwide");
    setMetaTag("name", "rating", "General");

    // 3. OpenGraph Tags
    const resolvedOgImage = ogImage
      ? (ogImage.startsWith("http")
          ? ogImage
          : `${window.location.origin}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`)
      : `${window.location.origin}/images/og-default.png`;

    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "dswReturnRefund");
    setMetaTag("property", "og:image", resolvedOgImage);

    const currentHref = canonical || window.location.origin + window.location.pathname;
    setMetaTag("property", "og:url", currentHref);

    if (publishedTime) setMetaTag("property", "article:published_time", publishedTime);
    if (modifiedTime) setMetaTag("property", "article:modified_time", modifiedTime);
    if (author) setMetaTag("property", "article:author", author);

    // 4. Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", resolvedOgImage);

    // 5. Canonical Link Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", currentHref);

    // 5b. Markdown Mirror Link for AI Crawlers
    let linkMarkdown = document.querySelector('link[rel="alternate"][type="text/markdown"]');
    if (markdownUrl) {
      if (!linkMarkdown) {
        linkMarkdown = document.createElement("link");
        linkMarkdown.setAttribute("rel", "alternate");
        linkMarkdown.setAttribute("type", "text/markdown");
        document.head.appendChild(linkMarkdown);
      }
      linkMarkdown.setAttribute("href", markdownUrl);
    } else if (linkMarkdown) {
      linkMarkdown.remove();
    }

    // 5c. Global Hreflang Tags for Regionalized Product & Store Pages
    const baseUrl = currentHref.split("?")[0];
    const hreflangs = [
      { lang: "en-US", url: `${baseUrl}` },
      { lang: "en-CA", url: `${baseUrl}?country=CA` },
      { lang: "en-GB", url: `${baseUrl}?country=UK` },
      { lang: "en-IN", url: `${baseUrl}?country=IN` },
      { lang: "en-PK", url: `${baseUrl}?country=PK` },
      { lang: "en-CN", url: `${baseUrl}?country=CN` },
      { lang: "x-default", url: `${baseUrl}` },
    ];

    // Remove old hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    // Append updated hreflang links
    hreflangs.forEach(({ lang, url }) => {
      const linkHref = document.createElement("link");
      linkHref.setAttribute("rel", "alternate");
      linkHref.setAttribute("hreflang", lang);
      linkHref.setAttribute("href", url);
      document.head.appendChild(linkHref);
    });

    // 6. JSON-LD Schema Construction
    const schemas: Record<string, any>[] = [];

    // Add Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "dswReturnRefund",
      url: window.location.origin,
      logo: `${window.location.origin}/icon.png`,
      description: "Verified Retailer Return Policies, Digital Receipt Lookup Guides, and Merchant Market Analytics.",
    });

    // Add BreadcrumbList Schema if breadcrumbs provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: bc.name,
          item: bc.item.startsWith("http") ? bc.item : `${window.location.origin}${bc.item}`,
        })),
      });
    }

    // Add custom jsonLd payloads passed in
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemas.push(...jsonLd);
      } else {
        schemas.push(jsonLd);
      }
    }

    // Insert Script tag
    const existingScript = document.getElementById("seo-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "seo-jsonld";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      const scriptToClean = document.getElementById("seo-jsonld");
      if (scriptToClean) {
        scriptToClean.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, author, publishedTime, modifiedTime, breadcrumbs, jsonLd]);
}

