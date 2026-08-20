import fs from "fs";

const DOMAIN = "https://dswreturnrefund.com";
const currentDate = new Date().toISOString().split("T")[0];

const corePages = [
  "",
  "/stores",
  "/products",
  "/deals",
  "/blog",
  "/compare",
  "/by-country",
  "/return-policies",
  "/store-comparisons",
  "/about",
  "/privacy",
  "/terms",
  "/sitemap"
];

try {
  // 1. Core / Main Sitemap
  const mainUrls = corePages.map((p) => `  <url>\n    <loc>${DOMAIN}${p}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === "" ? "1.0" : "0.9"}</priority>\n  </url>`);
  const mainXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${mainUrls.join("\n")}\n</urlset>`;
  fs.writeFileSync("public/sitemap-main.xml", mainXml, "utf8");

  // 2. Stores Sub-Sitemap
  const storesData = fs.readFileSync("src/data/stores.ts", "utf8");
  const storeSlugs = Array.from(storesData.matchAll(/slug:\s*["']([^"']+)["']/g), (m) => m[1]);
  const storeUrls = storeSlugs.map((s) => `  <url>\n    <loc>${DOMAIN}/stores/${s}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  const storesXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${storeUrls.join("\n")}\n</urlset>`;
  fs.writeFileSync("public/sitemap-stores.xml", storesXml, "utf8");

  // 3. Blog Sub-Sitemap
  const guidesData = fs.readFileSync("src/data/guides.ts", "utf8");
  const guideSlugs = Array.from(guidesData.matchAll(/slug:\s*["']([^"']+)["']/g), (m) => m[1]);
  const blogUrls = guideSlugs.map((g) => `  <url>\n    <loc>${DOMAIN}/blog/${g}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
  const blogXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${blogUrls.join("\n")}\n</urlset>`;
  fs.writeFileSync("public/sitemap-blog.xml", blogXml, "utf8");

  // 4. Compare Sub-Sitemap
  const comparePairs = [
    "walmart-vs-target",
    "amazon-vs-best-buy",
    "costco-vs-sams-club",
    "sephora-vs-ulta",
    "home-depot-vs-lowes",
    "apple-vs-samsung"
  ];
  const compareUrls = comparePairs.map((cp) => `  <url>\n    <loc>${DOMAIN}/compare/${cp}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`);
  const compareXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${compareUrls.join("\n")}\n</urlset>`;
  fs.writeFileSync("public/sitemap-compare.xml", compareXml, "utf8");

  // 5. Products Sub-Sitemap
  const productCategories = ["electronics", "clothing", "beauty", "home-goods", "sporting"];
  const productUrls = productCategories.map((pc) => `  <url>\n    <loc>${DOMAIN}/products?category=${pc}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`);
  const productXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${productUrls.join("\n")}\n</urlset>`;
  fs.writeFileSync("public/sitemap-products.xml", productXml, "utf8");

  // 6. Root Sitemap Index File (public/sitemap.xml)
  const subSitemaps = [
    "sitemap-main.xml",
    "sitemap-stores.xml",
    "sitemap-blog.xml",
    "sitemap-compare.xml",
    "sitemap-products.xml"
  ];
  const indexEntries = subSitemaps.map((s) => `  <sitemap>\n    <loc>${DOMAIN}/${s}</loc>\n    <lastmod>${currentDate}</lastmod>\n  </sitemap>`);
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${indexEntries.join("\n")}\n</sitemapindex>`;
  
  fs.writeFileSync("public/sitemap.xml", sitemapIndexXml, "utf8");
  console.log(`Successfully generated sitemap index (sitemap.xml) and 5 split sub-sitemaps!`);
} catch (err) {
  console.error("Sitemap build error:", err);
}
