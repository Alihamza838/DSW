import fs from "fs";
import path from "path";
import { storesData } from "../data/stores";
import { guidesData } from "../data/guides";

const DOMAIN = "https://dswreturnrefund.com";
const currentDate = new Date().toISOString().split("T")[0];

export function generateAllSitemaps() {
  const publicDir = path.resolve(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Core / Main Pages
  const corePages = [
    "",
    "/stores",
    "/deals",
    "/blog",
    "/compare",
    "/by-country",
    "/return-policies",
    "/store-comparisons",
    "/find-return-desk",
    "/about",
    "/privacy",
    "/terms",
    "/sitemap"
  ];
  const mainUrls = corePages.map(
    (p) =>
      `  <url>\n    <loc>${DOMAIN}${p}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${
        p === "" ? "1.0" : "0.9"
      }</priority>\n  </url>`
  );
  const mainXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${mainUrls.join(
    "\n"
  )}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap-main.xml"), mainXml, "utf8");

  // 2. Stores Sub-Sitemap
  const storeUrls = storesData.map(
    (s) =>
      `  <url>\n    <loc>${DOMAIN}/stores/${s.slug}</loc>\n    <lastmod>${s.lastVerified || currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
  );
  const storesXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${storeUrls.join(
    "\n"
  )}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap-stores.xml"), storesXml, "utf8");

  // 3. Blog Sub-Sitemap
  const blogUrls = guidesData.map(
    (g) =>
      `  <url>\n    <loc>${DOMAIN}/blog/${g.slug}</loc>\n    <lastmod>${g.updatedAt || currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );
  const blogXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${blogUrls.join(
    "\n"
  )}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), blogXml, "utf8");

  // 4. Compare Sub-Sitemap
  const comparePairs = [
    "walmart-vs-target",
    "amazon-vs-best-buy",
    "costco-vs-sams-club",
    "sephora-vs-ulta",
    "home-depot-vs-lowes",
    "apple-vs-samsung"
  ];
  const compareUrls = comparePairs.map(
    (cp) =>
      `  <url>\n    <loc>${DOMAIN}/compare/${cp}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
  );
  const compareXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${compareUrls.join(
    "\n"
  )}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap-compare.xml"), compareXml, "utf8");

  // 5. Country Pillar Sub-Sitemap
  const countries = ["US", "CA", "UK", "AU", "PK", "IN", "AE"];
  const countryUrls = countries.map(
    (c) =>
      `  <url>\n    <loc>${DOMAIN}/by-country/${c.toLowerCase()}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );
  const countryXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${countryUrls.join(
    "\n"
  )}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, "sitemap-country.xml"), countryXml, "utf8");

  // 6. Root Sitemap Index File (public/sitemap.xml)
  const subSitemaps = [
    "sitemap-main.xml",
    "sitemap-stores.xml",
    "sitemap-blog.xml",
    "sitemap-compare.xml",
    "sitemap-country.xml"
  ];
  const indexEntries = subSitemaps.map(
    (s) => `  <sitemap>\n    <loc>${DOMAIN}/${s}</loc>\n    <lastmod>${currentDate}</lastmod>\n  </sitemap>`
  );
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${indexEntries.join(
    "\n"
  )}\n</sitemapindex>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndexXml, "utf8");
  console.log("✅ SitemapGenerator: Successfully generated sitemap index (sitemap.xml) and 5 split sub-sitemaps!");
}

if (process.argv[1] && process.argv[1].endsWith("sitemapGenerator.ts")) {
  generateAllSitemaps();
}
