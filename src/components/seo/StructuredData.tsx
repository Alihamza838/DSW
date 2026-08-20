import * as React from "react";
import { storesData } from "../../data/stores";
import { guidesData } from "../../data/guides";
import { topicsData } from "../../data/topics";
import { productsData } from "../../data/products";
import { StructuredDataGenerator } from "../../utils/StructuredDataGenerator";

export interface StructuredDataProps {
  children?: React.ReactNode;
  overridePath?: string;
}

export function StructuredData({ children, overridePath }: StructuredDataProps) {
  React.useEffect(() => {
    const pathname = overridePath || window.location.pathname;

    const SCRIPT_ID = "structured-data-jsonld-schema";
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = SCRIPT_ID;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const schemas: object[] = [];

    // 1. Core WebSite & Organization Schemas
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "DSWReturnRefund",
      url: "https://dswreturnrefund.com",
      description: "Verified store return policies, lost receipt approval odds, & money-back guarantees database.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://dswreturnrefund.com/stores?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    schemas.push(StructuredDataGenerator.generateOrganization());

    // 2. Generate BreadcrumbList
    const breadcrumbSchema = StructuredDataGenerator.generateBreadcrumbs(pathname);
    if (breadcrumbSchema) {
      schemas.push(breadcrumbSchema);
    }

    // 3. Route-Specific Dynamic Schema Injection
    if (pathname.startsWith("/stores/")) {
      const storeSlugPath = pathname.replace("/stores/", "");
      const segments = storeSlugPath.split("/").filter(Boolean);

      if (segments.length === 1) {
        // Main Store Detail Page
        const store = storesData.find((s) => s.slug === segments[0]);
        if (store) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${store.brand} Store Customer Service & Return Desk`,
            description: store.metaDescription || `Verified 2026 ${store.brand} return policy guidelines.`,
            url: `https://dswreturnrefund.com/stores/${store.slug}`,
            telephone: "03126528832",
            priceRange: "$$",
          });

          if (store.steps && store.steps.length > 0) {
            schemas.push(
              StructuredDataGenerator.generateHowTo({
                name: `How to Return Items at ${store.brand}`,
                description: `Official step-by-step instructions for returning items at ${store.brand}.`,
                steps: store.steps.map((st: any) => ({
                  title: st.title || "Step",
                  text: st.text || st.description || ""
                }))
              })
            );
          }

          if (store.faqs && store.faqs.length > 0) {
            const faqSchema = StructuredDataGenerator.generateFAQPage(store.faqs);
            if (faqSchema) schemas.push(faqSchema);
          }
        }
      } else if (segments.length === 2) {
        // Cluster Topic Page
        const topic = topicsData.find(
          (t) => t.brandSlug === segments[0] && t.topic === segments[1]
        );
        if (topic && topic.faqs && topic.faqs.length > 0) {
          const faqSchema = StructuredDataGenerator.generateFAQPage(topic.faqs);
          if (faqSchema) schemas.push(faqSchema);
        }
      }
    } else if (pathname.startsWith("/blog/")) {
      const guideSlug = pathname.replace("/blog/", "");
      const guide = guidesData.find((g) => g.slug === guideSlug);
      if (guide) {
        schemas.push(
          StructuredDataGenerator.generateArticle({
            title: guide.title,
            description: guide.description || guide.summary,
            slug: guide.slug,
            publishedAt: guide.publishedAt,
            updatedAt: guide.updatedAt,
            authorName: guide.author,
            image: guide.heroImage
          })
        );

        if (guide.steps && guide.steps.length > 0) {
          schemas.push(
            StructuredDataGenerator.generateHowTo({
              name: `Step-by-Step Guide: ${guide.title}`,
              description: guide.summary || guide.description,
              steps: guide.steps
            })
          );
        }

        if (guide.faqs && guide.faqs.length > 0) {
          const faqSchema = StructuredDataGenerator.generateFAQPage(guide.faqs);
          if (faqSchema) schemas.push(faqSchema);
        }
      }
    } else if (pathname === "/stores" || pathname === "/return-policies") {
      schemas.push(
        StructuredDataGenerator.generateItemList(
          "Top Retail Store Return Policies 2026",
          storesData.slice(0, 15).map((s) => ({
            name: `${s.brand} Return Policy`,
            url: `/stores/${s.slug}`
          }))
        )
      );
    } else if (pathname === "/products" || pathname === "/deals") {
      // Product & Offer Schemas
      productsData.slice(0, 5).forEach((p) => {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.title,
          description: p.description,
          image: p.image,
          offers: {
            "@type": "Offer",
            priceCurrency: p.currency || "USD",
            price: String(p.salePrice).replace(/[^0-9.]/g, "") || "0.00",
            priceValidUntil: "2026-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: p.store,
            },
          },
        });
      });
    }

    scriptTag.text = JSON.stringify(schemas, null, 2);

    const handlePopState = () => {
      // Force re-run on route change
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [overridePath]);

  return <>{children}</>;
}
