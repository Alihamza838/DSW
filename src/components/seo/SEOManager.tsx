import * as React from "react";
import { storesData } from "../../data/stores";
import { guidesData } from "../../data/guides";
import { getStoreImagePath, getGuideImagePath } from "../../data/assets";
import { notifyIndexNow } from "../../utils/indexNow";

export function SEOManager() {
  const [pathname, setPathname] = React.useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  React.useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    // Interval check for pushState / replaceState URL changes
    const interval = setInterval(() => {
      if (window.location.pathname !== pathname) {
        setPathname(window.location.pathname);
      }
    }, 500);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      clearInterval(interval);
    };
  }, [pathname]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const origin = window.location.origin;
    const fullUrl = `${origin}${pathname}`;

    // Ping IndexNow protocol for real-time crawler notification
    notifyIndexNow([pathname]);

    const schemas: Record<string, any>[] = [];

    // 1. Core Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "dswReturnRefund",
      url: origin,
      logo: {
        "@type": "ImageObject",
        url: `${origin}/icon.svg`,
        width: "512",
        height: "512",
      },
      sameAs: [
        "https://twitter.com/dswreturnrefund",
        "https://github.com/dswreturnrefund",
      ],
      description:
        "Authoritative directory for verified retailer return policies, digital receipt lookups, and consumer protection rights.",
    });

    // 2. Core WebSite & SearchAction Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: "dswReturnRefund",
      publisher: { "@id": `${origin}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${origin}/stores?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    // 3. Universal BreadcrumbList Schema for Google SERP rich snippets
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbItems: any[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: origin,
      },
    ];

    let accumulatedPath = origin;
    pathSegments.forEach((segment, idx) => {
      accumulatedPath += `/${segment}`;
      let name = segment.replace(/-/g, " ");
      name = name.charAt(0).toUpperCase() + name.slice(1);

      if (segment === "stores") name = "Stores Directory";
      else if (segment === "blog") name = "Consumer Guides";
      else if (segment === "products") name = "Product Catalog";
      else if (segment === "find-return-desk") name = "Return Desk Counter Finder";
      else if (segment === "lost-receipt-checker") name = "Lost Receipt Calculator";
      else if (pathname.startsWith("/stores/")) {
        const store = storesData.find((s) => s.slug === segment);
        if (store) name = `${store.brand} Return Policy`;
      } else if (pathname.startsWith("/blog/")) {
        const guide = guidesData.find((g) => g.slug === segment);
        if (guide) name = guide.title;
      }

      breadcrumbItems.push({
        "@type": "ListItem",
        position: idx + 2,
        name,
        item: accumulatedPath,
      });
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });

    // 3. Page-Specific Schema Generator
    if (pathname.startsWith("/stores/")) {
      const slug = pathname.replace("/stores/", "").replace("/", "");
      const store = storesData.find((s) => s.slug === slug);
      if (store) {
        // Merchant / Organization Schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "MerchantReturnPolicy",
          name: `${store.brand} Return Policy 2026`,
          image: `${origin}${getStoreImagePath(store.slug)}`,
          merchantReturnDays: store.quickAnswer?.returnWindow || "30 Days",
          returnFees: store.quickAnswer?.restockingFee
            ? "RestockingFeeApplies"
            : "FreeReturn",
          returnPolicyCategory:
            "https://schema.org/MerchantReturnFiniteReturnWindow",
          refundType: store.quickAnswer?.receiptRequired
            ? "FullRefundWithReceipt"
            : "StoreCreditWithoutReceipt",
          customerRemedy: store.quickAnswer?.refundMethod || "FullRefund",
          inStoreReturnsOffered: store.quickAnswer?.inStoreReturns ?? true,
          applicableCountry: store.country || "US",
        });

        // HowTo Schema: How to return an item to Store
        schemas.push({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to Return an Item to ${store.brand} (Receipt & No-Receipt Steps)`,
          description:
            store.metaDescription ||
            `Step-by-step guide on returning items to ${store.brand}.`,
          step: store.steps && store.steps.length > 0
            ? store.steps.map((st, idx) => ({
                "@type": "HowToStep",
                position: idx + 1,
                name: st.title,
                text: st.text,
              }))
            : [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Gather proof of purchase or order ID",
                  text: "Locate paper receipt, order confirmation email, or credit card used for payment.",
                },
                {
                  "@type": "HowToStep",
                  position: 2,
                  name: "Check item condition & tag requirements",
                  text: "Ensure items are unworn with original tags or packaging intact.",
                },
                {
                  "@type": "HowToStep",
                  position: 3,
                  name: "Visit store customer service desk or start online mail return",
                  text: `Initiate return within the verified ${store.quickAnswer?.returnWindow || "30 days"} window.`,
                },
              ],
        });
      }
    } else if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "").replace("/", "");
      const guide = guidesData.find((g) => g.slug === slug);
      if (guide) {
        // Article Schema
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${fullUrl}#article`,
          headline: guide.title,
          description: guide.description || guide.summary,
          image: [
            guide.heroImage ? (guide.heroImage.startsWith("http") ? guide.heroImage : `${origin}${guide.heroImage}`) : `${origin}${getGuideImagePath(guide.slug)}`,
          ],
          datePublished: guide.publishedAt
            ? `${guide.publishedAt}T08:00:00Z`
            : "2026-01-15T08:00:00Z",
          dateModified: guide.updatedAt
            ? `${guide.updatedAt}T10:00:00Z`
            : "2026-08-01T10:00:00Z",
          author: {
            "@type": "Person",
            name: guide.author || "DSWReturnRefund Legal Audit Team",
            jobTitle: "Senior Consumer Policy Analyst",
            worksFor: { "@id": `${origin}/#organization` },
          },
          publisher: { "@id": `${origin}/#organization` },
          mainEntityOfPage: fullUrl,
        });

        // Person Schema (Author EEAT Signal)
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Person",
          name: guide.author || "DSWReturnRefund Editorial Desk",
          jobTitle: "Consumer Protection Auditor",
          description:
            "Specializing in retail compliance, FTC consumer rights, and store exchange terms.",
        });

        // HowTo Schema for Blog Guide
        schemas.push({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `Step-by-Step Guide: ${guide.title}`,
          description: guide.description || guide.summary,
          step: guide.steps
            ? guide.steps.map((step, idx) => ({
                "@type": "HowToStep",
                position: idx + 1,
                name: step.title,
                text: step.text,
              }))
            : [
                {
                  "@type": "HowToStep",
                  position: 1,
                  name: "Review policy terms",
                  text: guide.summary,
                },
              ],
        });
      }
    } else if (pathname === "/stores" || pathname === "/return-policies") {
      // ItemList Schema for Retailers Directory
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Verified Store Return Policies Directory 2026",
        numberOfItems: storesData.length,
        itemListElement: storesData.slice(0, 20).map((store, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${store.brand} Return Policy`,
          url: `${origin}/stores/${store.slug}`,
        })),
      });
    }

    // Insert Script tag into document head
    let scriptEl = document.getElementById("seo-manager-jsonld");
    if (scriptEl) {
      scriptEl.remove();
    }

    scriptEl = document.createElement("script");
    scriptEl.id = "seo-manager-jsonld";
    scriptEl.setAttribute("type", "application/ld+json");
    scriptEl.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(scriptEl);

    // Dynamic Markdown Alternate Link Tag for AI Crawlers (GPTBot, ClaudeBot, etc.)
    let mdLinkEl = document.querySelector('link[rel="alternate"][type="text/markdown"]');
    if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "").replace("/", "");
      const mdUrl = `${origin}/blog/${slug}?format=md`;
      if (!mdLinkEl) {
        mdLinkEl = document.createElement("link");
        mdLinkEl.setAttribute("rel", "alternate");
        mdLinkEl.setAttribute("type", "text/markdown");
        document.head.appendChild(mdLinkEl);
      }
      mdLinkEl.setAttribute("href", mdUrl);
    } else if (pathname.startsWith("/stores/") && pathname !== "/stores") {
      const slug = pathname.replace("/stores/", "").replace("/", "");
      const mdUrl = `${origin}/stores/${slug}?format=md`;
      if (!mdLinkEl) {
        mdLinkEl = document.createElement("link");
        mdLinkEl.setAttribute("rel", "alternate");
        mdLinkEl.setAttribute("type", "text/markdown");
        document.head.appendChild(mdLinkEl);
      }
      mdLinkEl.setAttribute("href", mdUrl);
    } else if (mdLinkEl) {
      mdLinkEl.remove();
    }

    return () => {
      const el = document.getElementById("seo-manager-jsonld");
      if (el) el.remove();
    };
  }, [pathname]);

  return null;
}
