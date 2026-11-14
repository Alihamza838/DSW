/**
 * Draws the explainer images from the verified data (npm run images):
 *   store timelines   public/images/policy/<slug>.webp (800x420) + public/og/stores/<slug>.jpg (1200x630)
 *   guide covers      public/images/guides-v2/<slug>.webp + public/og/guides/<slug>.jpg
 *   comparison cards  public/og/compare/<a>-vs-<b>.jpg
 *   default preview   public/og/default.jpg
 *
 * No store logos: the store name is plain text, so nothing looks official. Each timeline shows the
 * real milestones from src/data/policies.ts, so re-run this after changing a policy.
 * Optional filter: npm run images -- dsw
 * Uses Playwright's Chromium (set CHROMIUM_PATH to use another Chrome binary).
 */
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import sharp from "sharp";
import { chromium } from "playwright-core";
import { POLICIES, getPolicy, type VerifiedPolicy } from "../src/data/policies";
import { COMPARE_PAIRS, pairSlug } from "../src/site/data";
import { parseGuide } from "../src/site/guides-parse";

const GUIDES = readdirSync("src/content/guides")
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseGuide(readFileSync(`src/content/guides/${f}`, "utf8"), f));

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const BASE_CSS = `*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;font-family:"DejaVu Sans",Arial,sans-serif;color:#13202b;background:#fbfaf7}
.serif{font-family:"DejaVu Serif",Georgia,serif}
.brand{position:absolute;left:64px;bottom:44px;display:flex;align-items:center;gap:14px;font-size:24px;font-weight:700}
.brand b{color:#0f766e}
.brand svg{width:44px;height:44px}
.paper{position:absolute;inset:0;background:radial-gradient(700px 400px at 100% 0%,#ccfbf1 0%,transparent 60%),radial-gradient(600px 380px at 0% 100%,#f3f1ec 0%,transparent 70%)}`;
const LOGO = `<svg viewBox="0 0 100 100"><rect x="2" y="2" width="96" height="96" rx="22" fill="#0D9488"/><path d="M 50 50 C 62 33, 84 33, 84 50 C 84 67, 62 67, 50 50 C 38 33, 16 33, 16 50 C 16 67, 38 67, 50 50 Z" fill="none" stroke="#fff" stroke-width="6.25" stroke-linecap="round"/><circle cx="82" cy="33" r="4" fill="#5EEAD4"/></svg>`;
const brand = `<div class="brand">${LOGO}<span>DSW<b>ReturnRefund</b></span></div>`;

/** Position on the track: square-root scale so day 14 and day 365 both stay readable. */
function trackX(day: number, max: number, width: number) {
  return Math.sqrt(day / max) * width;
}

function storeHtml(p: VerifiedPolicy) {
  const pts = p.timeline;
  const max = Math.max(...pts.map((t) => t.day), 1);
  const W = 1060;
  let marks = "";
  let lastX = -999;
  pts.forEach((t, i) => {
    // keep dots at least 56px apart (e.g. Best Buy day 14 and day 15)
    const x = Math.min(W, Math.max(trackX(t.day, max, W), lastX + 56));
    lastX = x;
    const up = i % 2 === 1;
    marks += `<div class="mk" style="left:${x}px"><span class="dot ${t.day === 0 ? "start" : ""}"></span>
      <div class="lab ${up ? "up" : "down"}" style="${x > W - 160 ? "right:0;text-align:right" : x < 120 ? "left:0" : "transform:translateX(-50%);text-align:center"}">
      <b>${t.day === 0 ? "Day 0" : `Day ${t.day}`}</b><span>${esc(t.label)}</span></div></div>`;
  });
  const single = pts.length < 2;
  const big = p.headline.startsWith("No change-of-mind") ? "No returns" : p.windowDays === null ? (p.slug === "costco" || /no set|any time|no fixed/i.test(p.headline) ? "No set limit" : "Varies") : `${p.windowDays} days`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.k{position:absolute;left:64px;top:52px;font-size:22px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0f766e}
h1{position:absolute;left:64px;top:92px;font-size:62px;font-weight:700;letter-spacing:-.01em}
.big{position:absolute;right:64px;top:56px;background:#0d9488;color:#fff;border-radius:26px;padding:18px 28px;text-align:center;box-shadow:0 14px 30px rgba(13,148,136,.3)}
.big b{display:block;font-size:46px;line-height:1.15;margin-bottom:4px}.big span{font-size:16px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ccfbf1}
.hl{position:absolute;left:64px;top:178px;width:720px;font-size:30px;line-height:1.25;color:#3b4a57}
.track{position:absolute;left:70px;top:${single ? 380 : 392}px;width:${W}px;height:10px;border-radius:5px;background:linear-gradient(90deg,#99f6e4,#0d9488)}
.mk{position:absolute;top:-17px}
.dot{position:absolute;left:-22px;width:44px;height:44px;border-radius:50%;background:#0d9488;border:7px solid #fff;box-shadow:0 6px 16px rgba(19,32,43,.2)}
.dot.start{background:#fff;border-color:#99f6e4}
.lab{position:absolute;width:240px;font-size:20px;line-height:1.25;color:#3b4a57}
.lab.down{top:46px}.lab.up{bottom:20px}
.lab b{display:block;font-size:26px;color:#13202b}
.chk{position:absolute;right:64px;bottom:50px;font-size:20px;color:#065f46;background:#ecfdf5;border:2px solid #a7f3d0;border-radius:999px;padding:10px 20px;font-weight:700}
</style></head><body><div class="paper"></div>
<div class="k">${esc(p.country)} · Return policy</div>
<h1 class="serif">${esc(p.name)}</h1>
<div class="big"><b class="serif">${esc(big)}</b><span>${big === "No returns" ? "change of mind" : "main window"}</span></div>
<p class="hl">${esc(p.headline)}</p>
<div class="track">${marks}</div>
<div class="chk">✓ Checked ${fmt(p.checked)} on the official site</div>
${brand}</body></html>`;
}

const GUIDE_ICONS: Record<string, string> = {
  Seasonal: "🎁",
  Comparison: "⚖",
  Explainer: "?",
  "How-to": "→",
  "Your rights": "§",
};

function guideHtml(title: string, category: string, stores: string[]) {
  const names = stores.map((s) => getPolicy(s)?.name).filter(Boolean).slice(0, 5) as string[];
  const size = title.length > 50 ? 54 : 62;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.k{position:absolute;left:64px;top:56px;display:inline-flex;align-items:center;gap:12px;font-size:22px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0f766e}
.k i{display:inline-flex;width:44px;height:44px;border-radius:12px;background:#0d9488;color:#fff;font-style:normal;align-items:center;justify-content:center;font-size:24px;letter-spacing:0}
h1{position:absolute;left:64px;top:118px;width:760px;font-size:${size}px;line-height:1.12;font-weight:700;letter-spacing:-.01em}
.card{position:absolute;right:64px;top:110px;width:270px;background:#fff;border:2px solid #e7e3da;border-radius:24px;padding:24px;box-shadow:0 20px 40px rgba(19,32,43,.1);transform:rotate(2deg)}
.card p{font-size:16px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#64727e}
.card li{list-style:none;margin-top:12px;font-size:22px;font-weight:700;display:flex;gap:10px;align-items:center}
.card li::before{content:"";width:12px;height:12px;border-radius:50%;background:#0d9488}
</style></head><body><div class="paper"></div>
<div class="k"><i>${GUIDE_ICONS[category] ?? "•"}</i>${esc(category)} · Guide</div>
<h1 class="serif">${esc(title)}</h1>
${names.length ? `<div class="card"><p>Stores covered</p><ul>${names.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>` : ""}
${brand}</body></html>`;
}

function compareHtml(a: VerifiedPolicy, b: VerifiedPolicy) {
  const box = (p: VerifiedPolicy) => {
    const big = p.headline.startsWith("No change-of-mind") ? "No returns" : p.windowDays === null ? (p.slug === "costco" || /no set|any time|no fixed/i.test(p.headline) ? "No limit" : "Varies") : `${p.windowDays} days`;
    return `<div class="b"><p class="serif n">${esc(p.name)}</p><p class="serif d">${esc(big)}</p><p class="h">${esc(p.headline)}</p></div>`;
  };
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
.k{position:absolute;left:64px;top:56px;font-size:22px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0f766e}
.row{position:absolute;left:64px;right:64px;top:110px;display:flex;align-items:center;gap:28px}
.b{flex:1;height:350px;background:#fff;border:2px solid #e7e3da;border-radius:28px;padding:32px;box-shadow:0 20px 40px rgba(19,32,43,.08)}
.n{font-size:44px;font-weight:700}.d{margin-top:14px;font-size:64px;font-weight:700;color:#0f766e}.h{margin-top:14px;font-size:24px;line-height:1.3;color:#3b4a57}
.vs{width:88px;height:88px;border-radius:50%;background:#13202b;color:#fff;font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none}
</style></head><body><div class="paper"></div>
<div class="k">Return policy comparison</div>
<div class="row">${box(a)}<div class="vs">vs</div>${box(b)}</div>
${brand}</body></html>`;
}

function defaultHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}
h1{position:absolute;left:64px;top:120px;width:820px;font-size:70px;line-height:1.08;font-weight:700}
h1 b{color:#0f766e}
p{position:absolute;left:64px;top:410px;width:760px;font-size:30px;line-height:1.3;color:#3b4a57}
.stack{position:absolute;right:70px;top:120px;display:flex;flex-direction:column;gap:14px}
.s{width:250px;background:#fff;border:2px solid #e7e3da;border-radius:18px;padding:14px 20px;display:flex;justify-content:space-between;font-size:24px;font-weight:700}
.s span{color:#0f766e}
</style></head><body><div class="paper"></div>
<h1 class="serif">Store return policies, <b>checked & explained</b></h1>
<p>How many days you have, receipts and fees for ${POLICIES.length} stores, each checked on the official site.</p>
<div class="stack">${["dsw", "walmart", "target", "amazon", "nike"]
    .map((s) => getPolicy(s)!)
    .map((p) => `<div class="s">${esc(p.name)}<span>${p.windowDays ? `${p.windowDays}d` : "—"}</span></div>`)
    .join("")}</div>
${brand}</body></html>`;
}

async function main() {
  const only = process.argv[2];
  for (const d of ["public/images/policy", "public/images/guides-v2", "public/og/stores", "public/og/guides", "public/og/compare"]) mkdirSync(d, { recursive: true });
  const jobs: { html: string; og: string; webp?: string }[] = [];
  for (const p of POLICIES) jobs.push({ html: storeHtml(p), og: `public/og/stores/${p.slug}.jpg`, webp: `public/images/policy/${p.slug}.webp` });
  for (const g of GUIDES) jobs.push({ html: guideHtml(g.title, g.category, g.stores), og: `public/og/guides/${g.slug}.jpg`, webp: `public/images/guides-v2/${g.slug}.webp` });
  for (const [a, b] of COMPARE_PAIRS) jobs.push({ html: compareHtml(getPolicy(a)!, getPolicy(b)!), og: `public/og/compare/${pairSlug(a, b)}.jpg` });
  jobs.push({ html: defaultHtml(), og: "public/og/default.jpg" });

  const list = jobs.filter((j) => !only || j.og.includes(only));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const j of list) {
    await page.setContent(j.html, { waitUntil: "load" });
    const png = await page.screenshot({ type: "png" });
    await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toFile(j.og);
    if (j.webp) await sharp(png).resize(800, 420).webp({ quality: 82 }).toFile(j.webp);
  }
  await browser.close();
  console.log(`generate-images: ${list.length} images written`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
