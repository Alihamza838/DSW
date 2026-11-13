/**
 * Runs after vite-react-ssg has written every page (vite.config.ts → onFinished):
 *  - moves <meta charset>/viewport to the top of <head> (must be in the first 1024 bytes)
 *  - writes sitemap.xml from the real pages (indexable ones only, canonical URLs, lastmod)
 *  - writes robots.txt and llms.txt
 */
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://dswreturnrefund.com";

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!["assets", "images", "og"].includes(e.name)) walk(full, out);
    } else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}
const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1] ?? "";
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export function finalizeBuild(distDir: string) {
  const pages: { url: string; title: string; description: string; lastmod: string; noindex: boolean }[] = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const file of walk(distDir)) {
    let html = fs.readFileSync(file, "utf8");
    const charset = html.match(/<meta charset="[^"]*"\s*\/?>/i)?.[0];
    const viewport = html.match(/<meta name="viewport"[^>]*>/i)?.[0];
    if (charset) {
      html = html.replace(charset, "");
      if (viewport) html = html.replace(viewport, "");
      html = html.replace(/<head>/i, `<head>${charset}${viewport ?? ""}`);
      fs.writeFileSync(file, html);
    }
    const head = html.slice(0, html.indexOf("</head>"));
    const metas = head.match(/<meta[^>]+>/gi) ?? [];
    const meta = (key: string) => attr(metas.find((m) => new RegExp(`(name|property)="${key}"`, "i").test(m)) ?? "", "content");
    const canonical = attr(head.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0] ?? "", "href");
    if (!canonical) continue;
    pages.push({
      url: canonical,
      title: decode(head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? ""),
      description: decode(meta("description")),
      lastmod: meta("article:modified_time") || today,
      noindex: /noindex/i.test(meta("robots")),
    });
  }

  const indexable = pages.filter((p) => !p.noindex).sort((a, b) => a.url.localeCompare(b.url));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>\n    <loc>${p.url}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

  fs.writeFileSync(
    path.join(distDir, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );

  const section = (label: string, prefix: string) =>
    `## ${label}\n\n${indexable
      .filter((p) => p.url.startsWith(`${SITE_URL}${prefix}`))
      .map((p) => `- [${p.title.replace(/ \| DSWReturnRefund$/, "")}](${p.url}): ${p.description}`)
      .join("\n")}\n`;
  const llms = `# DSWReturnRefund

> Independent, plain-English summaries of store return and refund policies (DSW, Walmart, Target, Amazon and others). Each store page is checked against the retailer's official policy page, shows the date it was checked and links to the source. Not affiliated with any retailer.

${section("Store return policies", "/stores/")}
${section("Comparisons", "/compare/")}
${section("Guides", "/blog/")}`;
  fs.writeFileSync(path.join(distDir, "llms.txt"), llms);

  console.log(`finalize-build: ${pages.length} pages, ${indexable.length} in sitemap.xml`);
}
