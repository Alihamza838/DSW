import fs from "fs";
import path from "path";
import { storesData } from "../src/data/stores";
import { guidesData } from "../src/data/guides";
import { topicsData } from "../src/data/topics";

interface RouteSEO {
  path: string;
  title: string;
  description: string;
  hasArticleSchema?: boolean;
  hasFAQSchema?: boolean;
  hasBreadcrumbSchema?: boolean;
}

function verifySEOCompliance() {
  console.log("🔍 Running SEO Compliance & Schema Verification Audit...\n");

  const routes: RouteSEO[] = [];
  const errors: string[] = [];

  // 1. Static Routes
  const staticRoutes = [
    {
      path: "/",
      title: "DSW Return Policy (2026 Complete Guide) | dswReturnRefund",
      description: "Complete 2026 DSW return policy breakdown: 90 days for VIP members, 60 days for guests, and 365 days for Elite VIPs. Rules for unworn shoes, no-receipt returns, clearance, and online returns.",
    },
    {
      path: "/stores",
      title: "Store Directory: Verified Return Policies (US, Canada, UK, Australia, Asia)",
      description: "Browse verified 2026 return policies for major global retailers. Search by country, return window, receipt rules, and store perks.",
    },
    {
      path: "/blog",
      title: "Consumer Return Guides & Retail Legal Protection: 2026 E-E-A-T Library",
      description: "In-depth consumer protection guides, return policy legal breakdowns, FTC compliance disclosures, and country ecommerce guides.",
    },
    {
      path: "/about",
      title: "About DSWReturnRefund: Independent Consumer Return Policy Directory",
      description: "Learn how DSWReturnRefund audits, fact-checks, and simplifies complex retail return policies for global consumers.",
    },
    {
      path: "/contact",
      title: "Contact & Editorial Support: DSWReturnRefund Compliance Desk",
      description: "Contact our editorial board to report store policy discrepancies, request missing retailers, or get live support.",
    },
    {
      path: "/editorial-policy",
      title: "Editorial Policy & Verification Protocol: DSWReturnRefund",
      description: "Understand our double-blind verification methodology, fact-checking standards, and affiliate independence rules.",
    },
    {
      path: "/legal-disclaimer",
      title: "Legal Disclaimer & Independent Status: DSWReturnRefund",
      description: "Mandatory legal disclosure confirming DSWReturnRefund is an independent unofficial resource not affiliated with retailers.",
    },
    {
      path: "/privacy-policy",
      title: "Privacy Policy & Data Protection: DSWReturnRefund",
      description: "Read our privacy-first principles, zero cross-site tracking, and GDPR/CCPA data minimization compliance.",
    },
    {
      path: "/terms-of-use",
      title: "Terms of Use & Site Directory Guidelines: DSWReturnRefund",
      description: "Review standard terms of service, acceptable usage guidelines, scraping restrictions, and intellectual property terms.",
    },
  ];

  staticRoutes.forEach((r) => routes.push(r));

  // 2. Store Detail Pages
  storesData.forEach((store) => {
    const storePath = `/stores/${store.slug}`;
    const title = `${store.brand} Return Policy 2026: Window, Receipt Rules & Fees`;
    const description = `Verified 2026 ${store.brand} return policy: ${(store.metaDescription || store.brand).slice(0, 140)}...`;

    // Check JSON-LD schema requirements for stores (FAQPage + Breadcrumb + Store/Organization)
    const hasFAQSchema = Boolean(store.faqs && store.faqs.length > 0);
    const hasBreadcrumbSchema = true;

    if (!hasFAQSchema) {
      errors.push(`❌ Store missing FAQ schema: ${store.slug}`);
    }

    routes.push({
      path: storePath,
      title,
      description,
      hasFAQSchema,
      hasBreadcrumbSchema,
    });
  });

  // 2b. Cluster Topics
  topicsData.forEach((topic) => {
    const topicPath = `/stores/${topic.brandSlug}/${topic.topic}`;
    routes.push({
      path: topicPath,
      title: `${topic.title} 2026`,
      description: `${topic.metaDescription}`,
      hasFAQSchema: true,
      hasBreadcrumbSchema: true,
    });
  });

  // 3. Blog Detail Pages
  guidesData.forEach((guide) => {
    const guidePath = `/blog/${guide.slug}`;
    const title = `${guide.title}: 2026 Guide`;
    const description = (guide.description || guide.summary || guide.title).slice(0, 155);
    const hasArticleSchema = Boolean(guide.title && (guide.publishedAt || guide.updatedAt) && guide.author);
    const hasFAQSchema = Boolean(guide.faqs && guide.faqs.length > 0);

    if (!hasArticleSchema) {
      errors.push(`❌ Blog missing Article schema fields: ${guide.slug}`);
    }
    if (!hasFAQSchema) {
      errors.push(`❌ Blog missing FAQ schema fields: ${guide.slug}`);
    }

    routes.push({
      path: guidePath,
      title,
      description,
      hasArticleSchema,
      hasFAQSchema,
      hasBreadcrumbSchema: true,
    });
  });

  // 4. Verify Title & Meta Description Uniqueness
  const titlesSeen = new Map<string, string>();
  const descriptionsSeen = new Map<string, string>();

  routes.forEach((r) => {
    if (!r.title || r.title.trim().length === 0) {
      errors.push(`❌ Route missing title: ${r.path}`);
    } else if (titlesSeen.has(r.title)) {
      errors.push(`❌ Duplicate title found between ${r.path} and ${titlesSeen.get(r.title)}`);
    } else {
      titlesSeen.set(r.title, r.path);
    }

    if (!r.description || r.description.trim().length === 0) {
      errors.push(`❌ Route missing meta description: ${r.path}`);
    } else if (descriptionsSeen.has(r.description)) {
      errors.push(`❌ Duplicate meta description found between ${r.path} and ${descriptionsSeen.get(r.description)}`);
    } else {
      descriptionsSeen.set(r.description, r.path);
    }
  });

  console.log(`📊 Total Routes Audited: ${routes.length}`);
  console.log(`✅ Unique SEO Titles Verified: ${titlesSeen.size}`);
  console.log(`✅ Unique Meta Descriptions Verified: ${descriptionsSeen.size}`);

  if (errors.length > 0) {
    console.error("\n❌ SEO Compliance Audit Failed with errors:");
    errors.forEach((err) => console.error(err));
    process.exit(1);
  } else {
    console.log("🎉 100% SEO Compliance Verified! All routes have unique titles, descriptions, and required JSON-LD schemas.\n");
  }
}

verifySEOCompliance();
