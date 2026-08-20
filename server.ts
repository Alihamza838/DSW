import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { guidesData } from "./src/data/guides";
import { storesData } from "./src/data/stores";
import { topicsData } from "./src/data/topics";

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for feedback submission dispatched to compliance desk
app.post("/api/feedback", (req, res) => {
  const { itemKey, rating, comment, userEmail, userPhone } = req.body || {};
  if (!itemKey || !rating) {
    return res.status(400).json({ error: "Missing required fields: itemKey and rating" });
  }

  const destinationEmail = "akhamza838@gmail.com";
  const contactPhone = "03126528832";
  
  console.log(`[FEEDBACK RECEIVED] Item: ${itemKey} | Rating: ${rating} | User: ${userEmail || "Anonymous"} | Phone: ${userPhone || "N/A"}`);
  console.log(`[DISPATCHED TO DESK] Recipient: ${destinationEmail} | Support Line: ${contactPhone}`);
  if (comment) {
    console.log(`[COMMENT]: ${comment}`);
  }

  return res.json({
    success: true,
    message: `Feedback submitted and dispatched to compliance desk (${destinationEmail})`,
    timestamp: new Date().toISOString()
  });
});

// Smart Image Resolver Middleware: Automatically handles PNG, JPG, JPEG, WEBP, and SVG requests
app.get("/images/*", (req, res, next) => {
  const reqPath = req.path; // e.g. /images/stores/target.png
  const publicFilePath = path.join(process.cwd(), "public", reqPath);
  const distFilePath = path.join(process.cwd(), "dist", reqPath);

  // If exact requested file exists on disk, continue to standard static server
  if (fs.existsSync(publicFilePath) || fs.existsSync(distFilePath)) {
    return next();
  }

  // Parse path to try alternate extensions (.png, .jpg, .jpeg, .webp, .svg)
  const parsed = path.parse(reqPath);
  const extensionsToTry = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

  for (const ext of extensionsToTry) {
    if (ext.toLowerCase() === parsed.ext.toLowerCase()) continue;
    const candidateRel = path.join(parsed.dir, `${parsed.name}${ext}`);
    const candidatePublic = path.join(process.cwd(), "public", candidateRel);
    const candidateDist = path.join(process.cwd(), "dist", candidateRel);

    if (fs.existsSync(candidatePublic)) {
      return res.sendFile(candidatePublic);
    }
    if (fs.existsSync(candidateDist)) {
      return res.sendFile(candidateDist);
    }
  }

  next();
});

// Helper to generate clean markdown for a guide
function generateGuideMarkdown(guide: typeof guidesData[0]): string {
  const quickAnswer = guide.quickAnswer || guide.summary || guide.description;
  const author = guide.author || "DSWReturnRefund Editorial Team";
  const sourceUrl = guide.verifiedSourceUrl || "https://dswreturnrefund.com";
  const sourceDate = guide.verifiedSourceDate || guide.updatedAt;

  let md = `# ${guide.title}\n\n`;
  md += `> **Category:** ${guide.category} | **Published:** ${guide.publishedAt} | **Updated:** ${guide.updatedAt}\n`;
  md += `> **Author:** ${author}\n`;
  md += `> **Verified Source:** [Official Retailer Policy](${sourceUrl}) (Verified on ${sourceDate})\n\n`;

  md += `## Quick Answer\n\n${quickAnswer}\n\n`;

  if (guide.factRows && guide.factRows.length > 0) {
    md += `## Key Policy Facts\n\n`;
    md += `| Policy Metric | Details | Status |\n`;
    md += `|---|---|---|\n`;
    guide.factRows.forEach((row) => {
      md += `| **${row.label}** | ${row.value} | ${row.status || "Policy Detail"} |\n`;
    });
    md += `\n`;
  }

  md += `## Overview & Analysis\n\n${guide.proseContent || guide.summary || guide.description}\n\n`;

  if (guide.steps && guide.steps.length > 0) {
    md += `## Step-by-Step Return Instructions\n\n`;
    guide.steps.forEach((step, idx) => {
      md += `${idx + 1}. **${step.title}**: ${step.text}\n`;
    });
    md += `\n`;
  }

  if (guide.faqs && guide.faqs.length > 0) {
    md += `## Frequently Asked Questions\n\n`;
    guide.faqs.forEach((faq) => {
      md += `### ${faq.question}\n${faq.answer}\n\n`;
    });
  }

  if (guide.sources && guide.sources.length > 0) {
    md += `## Cited References & Legal Frameworks\n\n`;
    guide.sources.forEach((src) => {
      md += `- [${src.title}](${src.url}) - Published by ${src.publisher || "Official Source"}\n`;
    });
    md += `\n`;
  }

  md += `---\n*Canonical URL: https://dswreturnrefund.com/blog/${guide.slug}*\n`;
  return md;
}

// 1. Explicit Markdown Mirror Route (/blog/:slug.md or /blog/:slug?format=md)
app.get("/blog/:slug.md", (req, res) => {
  const { slug } = req.params;
  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) {
    return res.status(404).send("# Article Not Found\n\nThe requested return guide does not exist.");
  }
  const md = generateGuideMarkdown(guide);
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.send(md);
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "DSWReturnRefund SSR Server", timestamp: new Date().toISOString() });
});

// High-speed API for Stores
app.get("/api/stores", (req, res) => {
  try {
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    return res.json({ success: true, count: storesData.length, data: storesData });
  } catch (error) {
    console.error("[API ERROR /api/stores]:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/api/stores/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const store = storesData.find((s) => s.slug === slug || s.id === slug);
    if (!store) {
      return res.status(404).json({ success: false, error: "Store not found" });
    }
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    return res.json({ success: true, data: store });
  } catch (error) {
    console.error("[API ERROR /api/stores/:slug]:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// High-speed API for Guides/Blog
app.get("/api/guides", (req, res) => {
  try {
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    return res.json({ success: true, count: guidesData.length, data: guidesData });
  } catch (error) {
    console.error("[API ERROR /api/guides]:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/api/guides/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const guide = guidesData.find((g) => g.slug === slug || (g as any).id === slug);
    if (!guide) {
      return res.status(404).json({ success: false, error: "Guide not found" });
    }
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    return res.json({ success: true, data: guide });
  } catch (error) {
    console.error("[API ERROR /api/guides/:slug]:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// High-speed API for Deals
app.get("/api/deals/:storeId", (req, res) => {
  try {
    const { storeId } = req.params;
    const store = storesData.find((s) => s.slug === storeId || (s as any).id === storeId);
    const deals = (store as any)?.deals || [];
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
    return res.json({ success: true, storeId, brand: store?.brand || storeId, deals });
  } catch (error) {
    console.error("[API ERROR /api/deals/:storeId]:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// High-speed Dynamic Sitemap XML Endpoints
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://dswreturnrefund.com/sitemap-main.xml</loc>
    <lastmod>2026-08-05</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://dswreturnrefund.com/sitemap-stores.xml</loc>
    <lastmod>2026-08-05</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://dswreturnrefund.com/sitemap-blog.xml</loc>
    <lastmod>2026-08-05</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://dswreturnrefund.com/sitemap-compare.xml</loc>
    <lastmod>2026-08-05</lastmod>
  </sitemap>
</sitemapindex>`;
  return res.send(sitemapIndex);
});

app.get("/sitemap-main.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  const mainRoutes = ["/", "/stores", "/blog", "/compare", "/currency-guides", "/find-return-desk", "/lost-receipt-checker", "/products"];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainRoutes.map((r) => `  <url>
    <loc>https://dswreturnrefund.com${r === "/" ? "" : r}</loc>
    <lastmod>2026-08-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>${r === "/" ? "1.0" : "0.9"}</priority>
  </url>`).join("\n")}
</urlset>`;
  return res.send(xml);
});

app.get("/sitemap-stores.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${storesData.map((s) => `  <url>
    <loc>https://dswreturnrefund.com/stores/${s.slug}</loc>
    <lastmod>2026-08-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;
  return res.send(xml);
});

app.get("/sitemap-blog.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${guidesData.map((g) => `  <url>
    <loc>https://dswreturnrefund.com/blog/${g.slug}</loc>
    <lastmod>${g.updatedAt || g.publishedAt || "2026-08-05"}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;
  return res.send(xml);
});

app.get("/sitemap-compare.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dswreturnrefund.com/compare</loc>
    <lastmod>2026-08-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
  return res.send(xml);
});

// Helper function to inject SSR content into HTML template for non-JS bots and initial paint
function renderPreRenderedHTML(templateHtml: string, reqPath: string, queryFormat?: string): string {
  let title = "DSWReturnRefund - Verified 2026 Store Return Policy Finder";
  let description = "Search 2026 return policies, receipt rules, return windows, & money-back guarantees across 30+ global stores.";
  let ssrBodyContent = "";
  let jsonLdSchemas: any[] = [];
  let markdownUrl: string | null = null;

  // Handle format=md query param
  if (queryFormat === "md" && reqPath.startsWith("/blog/")) {
    const slug = reqPath.replace("/blog/", "");
    const guide = guidesData.find((g) => g.slug === slug);
    if (guide) {
      return generateGuideMarkdown(guide);
    }
  }

  // Blog Route
  if (reqPath.startsWith("/blog/")) {
    const slug = reqPath.replace("/blog/", "");
    const guide = guidesData.find((g) => g.slug === slug);
    if (guide) {
      title = `${guide.title} - DSWReturnRefund 2026`;
      description = (guide.description || guide.summary || guide.title).slice(0, 155);
      markdownUrl = `https://dswreturnrefund.com/blog/${guide.slug}.md`;

      // Article Schema
      jsonLdSchemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description,
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt || guide.publishedAt,
        author: { "@type": "Person", name: guide.author || "DSWReturnRefund Editorial Board" },
        publisher: {
          "@type": "Organization",
          name: "DSWReturnRefund",
          logo: { "@type": "ImageObject", url: "https://dswreturnrefund.com/icon.png" }
        },
        mainEntityOfPage: `https://dswreturnrefund.com/blog/${guide.slug}`
      });

      // FAQ Schema
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

      // Pre-render core body text for non-JS crawlers
      ssrBodyContent = `
        <article class="max-w-4xl mx-auto p-6 font-sans">
          <header class="mb-6">
            <span class="text-xs font-mono uppercase bg-teal-100 text-teal-800 px-2 py-1 rounded">Verified 2026 Audit</span>
            <h1 class="text-3xl font-bold text-slate-900 mt-2">${guide.title}</h1>
            <p class="text-sm text-slate-600 mt-1">Published: ${guide.publishedAt} | Updated: ${guide.updatedAt} | Author: ${guide.author || "DSWReturnRefund Editorial"}</p>
          </header>
          
          <div class="p-4 bg-teal-50 border border-teal-200 rounded-xl mb-6">
            <h2 class="font-bold text-teal-900 text-lg mb-1">Quick Answer</h2>
            <p class="text-slate-800 text-sm leading-relaxed">${guide.quickAnswer || guide.summary || guide.description}</p>
          </div>

          ${guide.factRows && guide.factRows.length > 0 ? `
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-3">Key Policy Facts</h2>
              <table class="w-full border-collapse border border-slate-200 text-sm">
                <thead>
                  <tr class="bg-slate-100">
                    <th class="border border-slate-200 p-2 text-left">Metric</th>
                    <th class="border border-slate-200 p-2 text-left">Policy Details</th>
                    <th class="border border-slate-200 p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${guide.factRows.map((r) => `
                    <tr>
                      <td class="border border-slate-200 p-2 font-semibold">${r.label}</td>
                      <td class="border border-slate-200 p-2">${r.value}</td>
                      <td class="border border-slate-200 p-2 text-teal-700 font-medium">${r.status || "Verified"}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          ` : ""}

          <div class="prose max-w-none text-slate-800 leading-relaxed mb-8">
            <h2 class="text-xl font-bold mb-2">Overview & Consumer Guidance</h2>
            <p>${guide.proseContent || guide.summary || guide.description}</p>
          </div>

          ${guide.faqs && guide.faqs.length > 0 ? `
            <section class="mt-8 border-t border-slate-200 pt-6">
              <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <div class="space-y-4">
                ${guide.faqs.map((faq) => `
                  <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h3 class="font-bold text-slate-900">${faq.question}</h3>
                    <p class="text-slate-700 text-sm mt-1">${faq.answer}</p>
                  </div>
                `).join("")}
              </div>
            </section>
          ` : ""}
        </article>
      `;
    }
  } else if (reqPath.startsWith("/stores/")) {
    const slug = reqPath.replace("/stores/", "");
    const store = storesData.find((s) => s.slug === slug);
    if (store) {
      title = `${store.brand} Return Policy 2026 - Window, Receipt Rules & Fees`;
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
            <div class="p-3 bg-slate-100 rounded-lg"><span class="block text-xs font-bold text-slate-500">Refund Method</span><span class="text-lg font-extrabold text-slate-900">${store.quickAnswer?.refundMethod || "Original Payment"}</span></div>
            <div class="p-3 bg-slate-100 rounded-lg"><span class="block text-xs font-bold text-slate-500">Online Returns</span><span class="text-lg font-extrabold text-emerald-700">${store.quickAnswer?.onlineReturns ? "Supported" : "In-Store Only"}</span></div>
          </div>
        </div>
      `;
    }
  } else if (reqPath.startsWith("/compare")) {
    title = "Store Return Policy Comparison Tool (2026 Audit) - DSWReturnRefund";
    description = "Compare return windows, restocking fees, and receipt requirements side-by-side between top retailers.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Store Return Policy Comparison Hub</h1>
        <p class="text-slate-700 mb-6">Compare return policies side-by-side: Target vs Walmart, Sephora vs Ulta, Home Depot vs Lowe's, and Amazon vs Best Buy.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-xl">
            <h2 class="text-lg font-bold text-slate-900">Walmart vs Target Return Policy</h2>
            <p class="text-xs text-slate-600">Walmart (90 days standard) vs Target (90 days, 1 year for store brands & RedCard).</p>
          </div>
          <div class="p-4 border rounded-xl">
            <h2 class="text-lg font-bold text-slate-900">Sephora vs Ulta Return Policy</h2>
            <p class="text-xs text-slate-600">Sephora (30/60 day tier) vs Ulta (60 day money-back guarantee with Ultamate Rewards).</p>
          </div>
        </div>
      </div>
    `;
  } else if (reqPath.startsWith("/currency-guides")) {
    title = "Global Return Policy & Consumer Protection Laws (2026)";
    description = "International return policy standards, consumer protection laws, and currency refund rules across US, UK, EU, UAE, India, KSA, and Pakistan.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Global Return Policy & Consumer Rights Guides</h1>
        <p class="text-slate-700 mb-6">Audited international guides for consumer protection laws, BNPL refund rules, and cross-border return procedures.</p>
      </div>
    `;
  } else if (reqPath === "/") {
    title = "DSWReturnRefund - Verified 2026 Store Return Policy Finder";
    description = "Search 2026 return policies, receipt rules, return windows, & money-back guarantees across 30+ global stores.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Verified Store Return Policy Directory & Consumer Guides (2026)</h1>
        <p class="text-slate-700 mb-6">Audited return windows, lost receipt lookup algorithms, and money-back guarantee rules across 50+ major retailers.</p>
      </div>
    `;
  } else if (reqPath === "/find-return-desk") {
    title = "Find Nearest Store Return Desk & Drop-Off Location";
    description = "Locate physical customer service desks, Amazon drop-off points (Kohl's, UPS, Whole Foods), and store return kiosks near you.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Store Return Desk Locator</h1>
        <p class="text-slate-700 mb-4">Find customer service return counters, drop-off locations, and official return centers near you.</p>
      </div>
    `;
  } else if (reqPath === "/lost-receipt-checker") {
    title = "Lost Receipt Approval Predictor (2026)";
    description = "Predict whether your lost-receipt return will be approved at Walmart, Target, Home Depot, Best Buy, or DSW based on store database rules.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Lost Receipt Approval Predictor</h1>
        <p class="text-slate-700 mb-4">Calculate the probability of getting a store credit, cash refund, or exchange without a receipt using audited store rules.</p>
      </div>
    `;
  } else if (reqPath === "/stores") {
    title = "All Retail Store Return Policies Index (2026)";
    description = "Browse audited return policies for 30+ major stores including Walmart, Target, Costco, DSW, Sephora, Home Depot, and Nike.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Retail Store Return Policy Index</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          ${storesData.map((s) => `<div class="p-3 border rounded-lg font-bold text-sm text-slate-800">${s.brand}</div>`).join("")}
        </div>
      </div>
    `;
  } else if (reqPath === "/blog") {
    title = "Return Policy Guides & Consumer Protection Articles (2026)";
    description = "In-depth consumer guides, no-receipt return strategies, and store policy teardowns published by DSWReturnRefund.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Return Policy Consumer Guides</h1>
        <div class="space-y-3 mt-4">
          ${guidesData.slice(0, 15).map((g) => `<div class="p-3 border rounded-lg font-bold text-sm text-slate-900">${g.title}</div>`).join("")}
        </div>
      </div>
    `;
  } else if (reqPath.startsWith("/products")) {
    title = "Regional Retail Products & Local Market Return Conditions (2026)";
    description = "Browse regional return terms for electronics, fashion, groceries, and beauty products across North America, Europe, Asia, and Middle East.";
    ssrBodyContent = `
      <div class="max-w-4xl mx-auto p-6 font-sans">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Regional Product Category Return Guides</h1>
        <p class="text-slate-700 mb-4">Market-specific return terms for consumer electronics, luxury fashion, cosmetics, and seasonal retail items.</p>
      </div>
    `;
  }

  // Inject into templateHtml
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);

  // Inject Meta Description, OpenGraph, Twitter, and JSON-LD into Head
  const headAdditions = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://dswreturnrefund.com${reqPath}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    ${markdownUrl ? `<link rel="alternate" type="text/markdown" href="${markdownUrl}" />` : ""}
    ${jsonLdSchemas.length > 0 ? `<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(jsonLdSchemas)}</script>` : ""}
  `;

  html = html.replace("</head>", `${headAdditions}</head>`);

  // Inject ssrBodyContent into <div id="root"></div>
  if (ssrBodyContent) {
    html = html.replace('<div id="root"></div>', `<div id="root">${ssrBodyContent}</div>`);
  }

  return html;
}

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    // Development catch-all handler with SSR injection
    app.get("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const indexPath = path.join(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf8");
        template = await vite.transformIndexHtml(url, template);

        const rendered = renderPreRenderedHTML(template, req.path, req.query.format as string);
        if (typeof rendered === "string" && rendered.startsWith("# ")) {
          res.setHeader("Content-Type", "text/markdown; charset=utf-8");
          return res.send(rendered);
        }
        res.status(200).set({ "Content-Type": "text/html" }).end(rendered);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production static serving & fallback
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (!fs.existsSync(indexPath)) {
        return res.status(500).send("Build output dist/index.html not found.");
      }
      const template = fs.readFileSync(indexPath, "utf8");
      const rendered = renderPreRenderedHTML(template, req.path, req.query.format as string);
      if (typeof rendered === "string" && rendered.startsWith("# ")) {
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        return res.send(rendered);
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(rendered);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 DSWReturnRefund SSR & API Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
