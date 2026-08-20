/**
 * StructuredDataGenerator Utility
 * Builds standard JSON-LD schema objects for maximum SEO & Rich Snippet eligibility:
 * - Article / NewsArticle
 * - HowTo (for step-by-step return guides)
 * - Person (for verified authors)
 * - Organization (for brand metadata)
 * - ItemList (for store rankings & category pages)
 * - BreadcrumbList (for hierarchical navigation)
 */

export interface SchemaAuthor {
  name: string;
  url?: string;
  jobTitle?: string;
}

export interface SchemaStep {
  title: string;
  text: string;
  image?: string;
  url?: string;
}

export interface SchemaFAQ {
  question: string;
  answer: string;
}

export class StructuredDataGenerator {
  private static SITE_URL = "https://dswreturnrefund.com";
  private static DEFAULT_LOGO = "https://dswreturnrefund.com/icon.png";

  public static generateOrganization(name = "DSWReturnRefund", url = this.SITE_URL) {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      url,
      logo: this.DEFAULT_LOGO,
      sameAs: [
        "https://twitter.com/dswreturnrefund",
        "https://facebook.com/dswreturnrefund"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "akhamza838@gmail.com",
        telephone: "03126528832",
        contactType: "customer service"
      }
    };
  }

  public static generatePerson(authorName: string, jobTitle = "Retail Policy Analyst"): object {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: authorName,
      jobTitle,
      worksFor: {
        "@type": "Organization",
        name: "DSWReturnRefund Editorial Desk"
      }
    };
  }

  public static generateArticle(data: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    updatedAt?: string;
    authorName?: string;
    image?: string;
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      image: [data.image || `${this.SITE_URL}/images/guides/${data.slug}.png`],
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      mainEntityOfPage: `${this.SITE_URL}/blog/${data.slug}`,
      author: this.generatePerson(data.authorName || "DSWReturnRefund Editorial Board"),
      publisher: this.generateOrganization()
    };
  }

  public static generateHowTo(data: {
    name: string;
    description: string;
    steps: SchemaStep[];
    totalTime?: string;
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: data.name,
      description: data.description,
      totalTime: data.totalTime || "PT15M",
      step: data.steps.map((s, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: s.title,
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: s.text
          }
        ]
      }))
    };
  }

  public static generateItemList(title: string, items: Array<{ name: string; url: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${this.SITE_URL}${item.url}`
      }))
    };
  }

  public static generateFAQPage(faqs: SchemaFAQ[]) {
    if (!faqs || faqs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }

  public static generateBreadcrumbs(pathname: string) {
    if (!pathname || pathname === "/") return null;
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = [{ name: "Home", url: "/" }];

    let currentPath = "";
    segments.forEach((seg) => {
      currentPath += `/${seg}`;
      const name = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      breadcrumbItems.push({ name, url: currentPath });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${this.SITE_URL}${item.url}`
      }))
    };
  }
}
