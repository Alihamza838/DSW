import * as React from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProviderProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  articleData?: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    url: string;
  };
  children?: React.ReactNode;
}

export function SEOProvider({
  title = "DSWReturnRefund - Verified 2026 Store Return & Refund Policy Database",
  description = "Search 50+ store return policies, no-receipt return limits, worn shoe guarantees, and refund windows verified for 2026.",
  canonicalUrl = "https://dswreturnrefund.com",
  faqs = [],
  breadcrumbs = [],
  articleData,
  children,
}: SEOProviderProps) {
  React.useEffect(() => {
    // 1. Update Title & Meta Tags dynamically
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 2. Manage Dynamic JSON-LD Script tag in <head>
    const SCRIPT_ID = "dynamic-jsonld-schema";
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = SCRIPT_ID;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const schemas: object[] = [
      // WebSite Schema
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "DSWReturnRefund",
        url: "https://dswreturnrefund.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://dswreturnrefund.com/stores?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      // Organization Schema for EEAT
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "DSWReturnRefund Editorial Desk",
        url: "https://dswreturnrefund.com",
        logo: "https://dswreturnrefund.com/icon.png",
        sameAs: [
          "https://twitter.com/dswreturnrefund",
          "https://facebook.com/dswreturnrefund",
        ],
      },
    ];

    // Breadcrumbs Schema
    if (breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: b.name,
          item: b.url.startsWith("http") ? b.url : `https://dswreturnrefund.com${b.url}`,
        })),
      });
    }

    // FAQ Schema for AEO
    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      });
    }

    // Article Schema
    if (articleData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: articleData.headline,
        description: articleData.description,
        image: [articleData.image || "https://dswreturnrefund.com/icon.png"],
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified,
        mainEntityOfPage: articleData.url,
        author: {
          "@type": "Organization",
          name: articleData.authorName,
          url: "https://dswreturnrefund.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "DSWReturnRefund",
          logo: {
            "@type": "ImageObject",
            url: "https://dswreturnrefund.com/icon.png",
          },
        },
      });
    }

    scriptTag.text = JSON.stringify(schemas, null, 2);

    return () => {
      // Keep persistent head tags clean
    };
  }, [title, description, canonicalUrl, faqs, breadcrumbs, articleData]);

  return <>{children}</>;
}
