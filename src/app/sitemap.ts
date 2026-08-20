import { storesData } from "../data/stores";
import { guidesData } from "../data/guides";
import { topicsData } from "../data/topics";
import { productsData } from "../data/products";

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

const DOMAIN = "https://dswreturnrefund.com";

export function getSitemapEntries(): SitemapEntry[] {
  const currentDate = new Date().toISOString().split("T")[0];

  const entries: SitemapEntry[] = [
    // Core Navigation & Legal Pages
    { url: `${DOMAIN}/`, lastmod: currentDate, changefreq: "daily", priority: 1.0 },
    { url: `${DOMAIN}/stores`, lastmod: currentDate, changefreq: "daily", priority: 0.9 },
    { url: `${DOMAIN}/products`, lastmod: currentDate, changefreq: "daily", priority: 0.9 },
    { url: `${DOMAIN}/deals`, lastmod: currentDate, changefreq: "daily", priority: 0.9 },
    { url: `${DOMAIN}/blog`, lastmod: currentDate, changefreq: "daily", priority: 0.8 },
    { url: `${DOMAIN}/compare`, lastmod: currentDate, changefreq: "weekly", priority: 0.8 },
    { url: `${DOMAIN}/find-return-desk`, lastmod: currentDate, changefreq: "weekly", priority: 0.7 },
    { url: `${DOMAIN}/lost-receipt-checker`, lastmod: currentDate, changefreq: "weekly", priority: 0.7 },
    { url: `${DOMAIN}/about`, lastmod: currentDate, changefreq: "monthly", priority: 0.5 },
    { url: `${DOMAIN}/contact`, lastmod: currentDate, changefreq: "monthly", priority: 0.5 },
    { url: `${DOMAIN}/editorial-policy`, lastmod: currentDate, changefreq: "monthly", priority: 0.5 },
    { url: `${DOMAIN}/legal-disclaimer`, lastmod: currentDate, changefreq: "monthly", priority: 0.5 },
    { url: `${DOMAIN}/privacy-policy`, lastmod: currentDate, changefreq: "yearly", priority: 0.4 },
    { url: `${DOMAIN}/terms-of-use`, lastmod: currentDate, changefreq: "yearly", priority: 0.4 },
  ];

  // Dynamic Store Policy Pages
  storesData.forEach((store) => {
    entries.push({
      url: `${DOMAIN}/stores/${store.slug}`,
      lastmod: store.lastVerified || currentDate,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // Dynamic Topic Pages per Store
  topicsData.forEach((t) => {
    entries.push({
      url: `${DOMAIN}/stores/${t.brandSlug}/${t.topic}`,
      lastmod: t.lastVerified || currentDate,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  // Dynamic Blog Guide Articles
  guidesData.forEach((guide) => {
    entries.push({
      url: `${DOMAIN}/blog/${guide.slug}`,
      lastmod: guide.updatedAt || currentDate,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  return entries;
}

export function generateSitemapXml(): string {
  const entries = getSitemapEntries();

  const xmlUrls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export default function sitemap() {
  return getSitemapEntries();
}
