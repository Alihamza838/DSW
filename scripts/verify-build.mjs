/**
 * Post-build checks (npm run build): every page is real, unique and linked.
 *  - exactly one <title> (≤ 60 chars, unique) and one <h1>; meta description (unique);
 *    absolute canonical matching the page URL; enough body text
 *  - every internal link and image points to a file in dist/
 *  - every redirect destination exists, and no redirect hides a live page
 *  - sitemap lists every indexable page
 */
import fs from "node:fs";
import path from "node:path";
import { REDIRECTS } from "./redirects.mjs";

const DIST = path.resolve("dist");
const SITE = "https://dswreturnrefund.com";
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!["assets", "images", "og"].includes(e.name)) walk(full, out);
    } else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}
const routeOf = (f) => {
  const rel = path.relative(DIST, f).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404";
  return "/" + rel.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
};
const exists = (p) => {
  const clean = decodeURIComponent(p.split("#")[0].split("?")[0]);
  if (clean === "/") return true;
  const f = path.join(DIST, clean);
  return fs.existsSync(f) && fs.statSync(f).isFile() ? true : fs.existsSync(path.join(f, "index.html"));
};
const attr = (tag, n) => tag.match(new RegExp(`${n}="([^"]*)"`, "i"))?.[1] ?? "";

const pages = walk(DIST).map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const metas = head.match(/<meta[^>]+>/gi) || [];
  const meta = (k) => attr(metas.find((m) => new RegExp(`(name|property)="${k}"`, "i").test(m)) || "", "content");
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    route: routeOf(file),
    titles: [...head.matchAll(/<title[^>]*>([^<]*)<\/title>/gi)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&#x27;/g, "'")),
    description: meta("description"),
    robots: meta("robots"),
    canonical: attr(head.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0] || "", "href"),
    h1: (body.match(/<h1[\s>]/gi) || []).length,
    words: text.split(" ").length,
    links: [...body.matchAll(/<a[^>]+href="(\/[^"]*)"/gi)].map((m) => m[1]),
    images: [...html.matchAll(/(?:src|content)="((?:https:\/\/dswreturnrefund\.com)?\/(?:images|og)\/[^"]+)"/gi)].map((m) => m[1].replace(SITE, "")),
  };
});

const indexable = pages.filter((p) => p.route !== "/404" && !/noindex/i.test(p.robots));
const seen = { title: new Map(), desc: new Map() };
for (const p of indexable) {
  if (p.titles.length !== 1) errors.push(`${p.route}: ${p.titles.length} <title> tags`);
  const t = p.titles[0] || "";
  if (t.length > 60) errors.push(`${p.route}: title ${t.length} chars: "${t}"`);
  if (p.h1 !== 1) errors.push(`${p.route}: ${p.h1} <h1> tags`);
  if (!p.description) errors.push(`${p.route}: no meta description`);
  else if (p.description.length > 160) warnings.push(`${p.route}: description ${p.description.length} chars`);
  const want = `${SITE}${p.route}`;
  if (p.canonical !== want) errors.push(`${p.route}: canonical "${p.canonical}" (expected ${want})`);
  // Content pages need substance; short legal/contact pages only a minimum
  const minWords = /^\/(stores|blog|compare)\/|^\/$/.test(p.route) ? 250 : 150;
  if (p.words < minWords) errors.push(`${p.route}: only ${p.words} words (min ${minWords})`);
  if (seen.title.has(t)) errors.push(`duplicate title "${t}": ${seen.title.get(t)} and ${p.route}`);
  seen.title.set(t, p.route);
  if (seen.desc.has(p.description)) errors.push(`duplicate description: ${seen.desc.get(p.description)} and ${p.route}`);
  seen.desc.set(p.description, p.route);
}

const broken = new Map();
for (const p of pages) {
  for (const l of p.links) if (!exists(l)) broken.set(l, p.route);
  for (const i of p.images) if (!exists(i)) errors.push(`${p.route}: missing image ${i}`);
  for (const l of p.links) if (!l.endsWith("/") && !l.includes("#") && !l.includes("?") && !/\.[a-z]+$/.test(l)) warnings.push(`${p.route}: link without trailing slash ${l}`);
}
for (const [l, r] of broken) errors.push(`broken link ${l} (on ${r})`);

for (const [from, to] of Object.entries(REDIRECTS)) {
  if (!exists(to)) errors.push(`redirect ${from} → ${to}: destination missing`);
  if (exists(from + "/")) errors.push(`redirect ${from} hides a live page`);
}

const sitemap = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
for (const p of indexable) if (!sitemap.includes(`<loc>${SITE}${p.route}</loc>`)) errors.push(`sitemap missing ${p.route}`);

const uniqueWarn = [...new Set(warnings)];
uniqueWarn.slice(0, 15).forEach((w) => console.warn("  warn:", w));
errors.forEach((e) => console.error("  ERROR:", e));
console.log(`verify-build: ${pages.length} pages (${indexable.length} indexable), ${Object.keys(REDIRECTS).length} redirects checked, ${errors.length} errors, ${uniqueWarn.length} warnings`);
process.exit(errors.length ? 1 : 0);
