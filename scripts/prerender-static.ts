import fs from "fs";
import path from "path";
import { storesData } from "../src/data/stores";
import { guidesData } from "../src/data/guides";

export const PRERENDER_ROUTES = [
  "/",
  "/stores",
  "/blog",
  "/products",
  "/deals",
  "/compare",
  "/by-country",
  "/return-policies",
  "/store-comparisons",
  "/find-return-desk",
  "/about",
  "/privacy",
  "/terms",
  "/sitemap",
  ...storesData.map((s) => `/stores/${s.slug}`),
  ...guidesData.map((g) => `/blog/${g.slug}`)
];

export function prerenderStaticPages() {
  const distDir = path.resolve(process.cwd(), "dist");
  const indexPath = path.join(distDir, "index.html");

  if (!fs.existsSync(indexPath)) {
    console.warn("⚠️ dist/index.html not found, skipping static prerendering.");
    return;
  }

  const templateHtml = fs.readFileSync(indexPath, "utf8");
  console.log(`🚀 Prerendering ${PRERENDER_ROUTES.length} static HTML pages into dist/...`);

  let count = 0;
  for (const route of PRERENDER_ROUTES) {
    let title = "DSWReturnRefund: Verified 2026 Store Return Policies & Drop-off Guides";
    let description = "Find exact 2026 return windows, receipt requirements, drop-off locations, and instant refund rules for 30+ major retailers.";
    let ssrBodyContent = "";
    let jsonLdSchemas: any[] = [];

    if (route.startsWith("/blog/")) {
      const slug = route.replace("/blog/", "");
      const guide = guidesData.find((g) => g.slug === slug);
      if (guide) {
        title = `${guide.title} (2026 Policy Audit)`;
        description = guide.description;

        jsonLdSchemas.push({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          author: { "@type": "Organization", name: guide.author || "DSWReturnRefund Editorial" },
          publisher: { "@type": "Organization", name: "DSWReturnRefund", url: "https://dswreturnrefund.com" },
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt
        });

        if (guide.faqs && guide.faqs.length > 0) {
          jsonLdSchemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
          });
        }

        ssrBodyContent = `
          <article class="max-w-4xl mx-auto p-6 font-sans">
            <header class="mb-6">
              <span class="text-xs font-mono uppercase bg-teal-100 text-teal-800 px-2 py-1 rounded">Verified 2026 Audit</span>
              <h1 class="text-3xl font-bold text-slate-900 mt-2">${guide.title}</h1>
              <p class="text-sm text-slate-600 mt-1">Published: ${guide.publishedAt} | Updated: ${guide.updatedAt}</p>
            </header>
            <div class="p-4 bg-teal-50 border border-teal-200 rounded-xl mb-6">
              <h2 class="font-bold text-teal-900 text-lg mb-1">Quick Answer</h2>
              <p class="text-slate-800 text-sm leading-relaxed">${guide.quickAnswer || guide.summary || guide.description}</p>
            </div>
            ${
              guide.factRows && guide.factRows.length > 0
                ? `<div class="mb-6">
                    <h2 class="text-xl font-bold mb-3">Key Policy Facts</h2>
                    <table class="w-full border-collapse border border-slate-200 text-sm">
                      <thead><tr class="bg-slate-100"><th class="border p-2 text-left">Metric</th><th class="border p-2 text-left">Details</th></tr></thead>
                      <tbody>${guide.factRows
                        .map((r) => `<tr><td class="border p-2 font-semibold">${r.label}</td><td class="border p-2">${r.value}</td></tr>`)
                        .join("")}</tbody>
                    </table>
                  </div>`
                : ""
            }
            <div class="prose max-w-none text-slate-800 leading-relaxed mb-8">
              <p>${guide.proseContent || guide.summary || guide.description}</p>
            </div>
          </article>
        `;
      }
    } else if (route.startsWith("/stores/")) {
      const slug = route.replace("/stores/", "");
      const store = storesData.find((s) => s.slug === slug);
      if (store) {
        title = `${store.brand} Return Policy 2026: Window, Receipt Rules & Fees`;
        description = `Verified 2026 ${store.brand} return policy: ${(store.metaDescription || store.brand).slice(0, 140)}...`;

        if (store.faqs && store.faqs.length > 0) {
          jsonLdSchemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: store.faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer }
            }))
          });
        }

        ssrBodyContent = `
          <div class="max-w-4xl mx-auto p-6 font-sans">
            <h1 class="text-3xl font-bold text-slate-900 mb-2">${store.brand} Return Policy 2026</h1>
            <p class="text-slate-700 mb-6">${store.metaDescription}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="p-3 bg-slate-100 rounded-lg"><span class="block text-xs font-bold text-slate-500">Return Window</span><span class="text-lg font-extrabold text-teal-800">${store.quickAnswer?.returnWindow || "30 Days"}</span></div>
              <div class="p-3 bg-slate-100 rounded-lg"><span class="block text-xs font-bold text-slate-500">Receipt Required</span><span class="text-lg font-extrabold text-slate-900">${store.quickAnswer?.receiptRequired ? "Yes" : "No / Optional"}</span></div>
            </div>
          </div>
        `;
      }
    } else if (route === "/return-policies") {
      title = "Retailer Return Policies Directory 2026: Window & Fee Index";
      description = "Browse return windows, receipt policies, and drop-off locations for Target, Amazon, Nike, Walmart, Costco, Sephora, and 30+ top brands.";
    } else if (route === "/by-country") {
      title = "Global E-Commerce & Retail Return Policies by Country (2026)";
      description = "Comprehensive guide to return windows and consumer protection laws across US, Canada, UK, Australia, India, Pakistan, and UAE.";
    } else if (route === "/store-comparisons") {
      title = "Retail Return Policy Head-to-Head Comparisons (2026)";
      description = "Side-by-side return policy comparisons: Walmart vs Target, Amazon vs Best Buy, Sephora vs Ulta, Costco vs Sam's Club.";
    }

    let pageHtml = templateHtml;
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
    const headAdditions = `
      <meta name="description" content="${description}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://dswreturnrefund.com${route}" />
      ${jsonLdSchemas.length > 0 ? `<script type="application/ld+json">${JSON.stringify(jsonLdSchemas)}</script>` : ""}
    `;
    pageHtml = pageHtml.replace("</head>", `${headAdditions}</head>`);
    if (ssrBodyContent) {
      pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${ssrBodyContent}</div>`);
    }

    // Determine target output path
    let targetFilePath = "";
    if (route === "/") {
      targetFilePath = path.join(distDir, "index.html");
    } else {
      const routePath = route.startsWith("/") ? route.slice(1) : route;
      const targetSubdir = path.join(distDir, routePath);
      if (!fs.existsSync(targetSubdir)) {
        fs.mkdirSync(targetSubdir, { recursive: true });
      }
      targetFilePath = path.join(targetSubdir, "index.html");
    }

    fs.writeFileSync(targetFilePath, pageHtml, "utf8");
    count++;
  }

  // Generate sitemap.xml in dist/
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDER_ROUTES.map(
  (r) => `  <url>
    <loc>https://dswreturnrefund.com${r === "/" ? "" : r}</loc>
    <lastmod>2026-08-04</lastmod>
    <changefreq>${r === "/" || r === "/stores" || r === "/blog" ? "daily" : "weekly"}</changefreq>
    <priority>${r === "/" ? "1.0" : r.startsWith("/stores/") || r.startsWith("/blog/") ? "0.8" : "0.6"}</priority>
  </url>`
).join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  console.log(`✅ Generated dist/sitemap.xml with ${PRERENDER_ROUTES.length} URLs.`);

  console.log(`✅ Static prerendering complete! Created ${count} pre-rendered HTML files in dist/.`);
}

if (process.argv[1] && process.argv[1].endsWith("prerender-static.ts")) {
  prerenderStaticPages();
}
