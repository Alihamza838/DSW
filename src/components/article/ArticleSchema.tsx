import React from "react";
import type { ArticleFrontmatter } from "../../types/article";
import { SITE_CONFIG } from "../../config/siteConfig";

interface ArticleSchemaProps {
  article: ArticleFrontmatter;
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const domain = SITE_CONFIG.domain || "https://dswreturnrefund.com";
  const canonicalUrl = `${domain}/blog/${article.slug}`;

  // 1. Article / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.quickAnswer || article.summary || article.title,
    "image": article.heroImage || `${domain}/icon.png`,
    "datePublished": article.publishedDate,
    "dateModified": article.updatedDate,
    "author": {
      "@type": "Organization",
      "name": article.author || "DSWReturnRefund Editorial Team",
      "url": domain
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name || "DSWReturnRefund",
      "logo": {
        "@type": "ImageObject",
        "url": `${domain}/icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  // 2. FAQPage Schema
  const faqSchema = article.faq && article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": domain
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides & Articles",
        "item": `${domain}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
