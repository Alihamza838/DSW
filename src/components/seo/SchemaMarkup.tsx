import * as React from "react";
import type { Faq } from "../../types";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface OrganizationSchemaData {
  name?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

export interface StoreSchemaData {
  name: string;
  url: string;
  description: string;
  telephone?: string;
  priceRange?: string;
}

export interface ProductSchemaData {
  name: string;
  description: string;
  image?: string;
  brand: string;
  price: number;
  currency: string;
  url: string;
}

export interface ArticleSchemaData {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  url: string;
}

export interface SchemaMarkupProps {
  article?: ArticleSchemaData;
  faqs?: Faq[];
  breadcrumbs?: BreadcrumbItem[];
  organization?: OrganizationSchemaData;
  store?: StoreSchemaData;
  product?: ProductSchemaData;
  includeGlobalWebSiteSchema?: boolean;
}

export function SchemaMarkup({
  article,
  faqs,
  breadcrumbs,
  organization,
  store,
  product,
  includeGlobalWebSiteSchema = true,
}: SchemaMarkupProps) {
  const schemas: object[] = [];

  // Global Website & SearchAction Schema
  if (includeGlobalWebSiteSchema) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DSWReturnRefund",
      "url": "https://dswreturnrefund.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://dswreturnrefund.com/stores?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": organization?.name || "DSWReturnRefund",
      "url": organization?.url || "https://dswreturnrefund.com/",
      "logo": organization?.logo || "https://dswreturnrefund.com/icon.svg",
      "sameAs": organization?.sameAs || [
        "https://twitter.com/dswreturnrefund",
        "https://facebook.com/dswreturnrefund"
      ]
    });
  }

  // Article JSON-LD Schema
  if (article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url,
      },
      "headline": article.headline,
      "description": article.description,
      "image": article.image ? [article.image] : undefined,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "author": {
        "@type": "Person",
        "name": article.authorName || "DSWReturnRefund Editorial Audit Team",
      },
      "publisher": {
        "@type": "Organization",
        "name": article.publisherName || "DSWReturnRefund",
        "logo": {
          "@type": "ImageObject",
          "url": article.publisherLogo || "https://dswreturnrefund.com/icon.svg",
        },
      },
    });
  }

  // Store / Merchant Schema
  if (store) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Store",
      "name": store.name,
      "url": store.url,
      "description": store.description,
      "priceRange": store.priceRange || "$$",
    });
  }

  // Product Schema
  if (product) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image ? [product.image] : undefined,
      "brand": {
        "@type": "Brand",
        "name": product.brand,
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency || "USD",
        "availability": "https://schema.org/InStock",
        "url": product.url,
      }
    });
  }

  // FAQPage JSON-LD Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  // BreadcrumbList JSON-LD Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith("http") ? item.url : `https://dswreturnrefund.com${item.url}`,
      })),
    });
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schemaObj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
        />
      ))}
    </>
  );
}
