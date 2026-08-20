import { SITE_NAME } from "../constants";
import { getSiteUrl } from "./utils";
import type { ArticleGuide, StoreFrontmatter, StoreTopicFrontmatter } from "../types";

function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateStoreJsonLd(fm: StoreFrontmatter) {
  const SITE_URL = getSiteUrl();
  const url = `${SITE_URL}/stores/${fm.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${fm.brand} Return Policy: Windows, Receipts & Exceptions`,
        description: fm.metaDescription,
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
        dateModified: fm.lastVerified,
        mainEntityOfPage: url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: fm.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: `How to Return an Item to ${fm.brand}`,
        step: fm.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Stores", url: `${SITE_URL}/stores` },
        { name: fm.brand, url },
      ]),
    ],
  };
}

export function generateStoreTopicJsonLd(fm: StoreTopicFrontmatter) {
  const SITE_URL = getSiteUrl();
  const url = `${SITE_URL}/stores/${fm.brandSlug}/${fm.topic}`;
  const graph: any[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: fm.title,
      description: fm.metaDescription,
      publisher: { "@type": "Organization", name: SITE_NAME },
      dateModified: fm.lastVerified,
      mainEntityOfPage: url,
    },
    breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Stores", url: `${SITE_URL}/stores` },
      { name: fm.brand, url: `${SITE_URL}/stores/${fm.brandSlug}` },
      { name: fm.title, url },
    ]),
  ];

  if (fm.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: fm.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function generateArticleJsonLd(fm: ArticleGuide) {
  const SITE_URL = getSiteUrl();
  const url = `${SITE_URL}/blog/${fm.slug}`;

  const graph: any[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: fm.title,
      description: fm.description,
      author: { "@type": "Organization", name: fm.author },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
      datePublished: fm.publishedAt,
      dateModified: fm.updatedAt,
      image: fm.heroImage ? `${SITE_URL}${fm.heroImage}` : undefined,
      mainEntityOfPage: url,
    },
    breadcrumbJsonLd([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: fm.title, url },
    ]),
  ];

  if (fm.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: fm.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (fm.steps.length > 0) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: fm.title,
      step: fm.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function generateSiteJsonLd() {
  const SITE_URL = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/stores?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
