/**
 * data.ts - everything the pages list: store categories, popular comparisons and guides.
 * Built from the verified policies (src/data/policies.ts) and the Markdown guides in
 * src/content/guides, so lists, routes, the sitemap and the images all agree.
 */
import { POLICIES, getPolicy, type VerifiedPolicy } from "../data/policies";

// ─── Categories ──────────────────────────────────────────────────────────────
export interface StoreCategory {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  match: string[];
}

export const CATEGORIES: StoreCategory[] = [
  {
    slug: "shoes-sneakers",
    name: "Shoes & sneakers",
    title: "Shoe Store Return Policies Compared (DSW, Nike, Foot Locker)",
    description:
      "Return windows for DSW, Nike, Foot Locker and adidas side by side: how many days you get, whether worn shoes are accepted and who charges for return shipping.",
    intro:
      "Shoes are one of the most returned purchases, because fit is hard to judge online. These stores differ most on two points: how long you have, and whether shoes you have worn outside can still come back.",
    match: ["Shoes", "Shoes & sportswear"],
  },
  {
    slug: "clothing-fashion",
    name: "Clothing & fashion",
    title: "Clothing Store Return Policies Compared",
    description:
      "Return windows, fees and tag rules for H&M, Zara, Old Navy, American Eagle, lululemon, T.J. Maxx, Marshalls, SHEIN and more, checked on each store's site.",
    intro:
      "Most clothing stores give 30 days, but the details decide whether a return is free: tags still attached, returning in a store instead of by mail, and whether sale items count.",
    match: ["Clothing", "Sportswear", "Off-price", "Online fashion"],
  },
  {
    slug: "department-stores",
    name: "Department stores",
    title: "Department Store Return Policies: Walmart, Target, Kohl's",
    description:
      "Walmart, Target, Kohl's, Macy's, Nordstrom and Costco return policies compared: windows for everyday items and electronics, receipts and holiday rules.",
    intro:
      "Big-box and department stores have the most generous windows for everyday items, and the shortest for electronics. The table shows both, so you know which deadline applies to what you bought.",
    match: ["Department store", "Warehouse club", "Hypermarket"],
  },
  {
    slug: "online-marketplaces",
    name: "Online marketplaces",
    title: "Online Marketplace Return Policies: Amazon, eBay, Temu",
    description:
      "How returns work on Amazon, eBay, Etsy, Temu, AliExpress, noon, Daraz and Flipkart: platform windows, seller policies and buyer protection, explained simply.",
    intro:
      "On marketplaces the platform's rule and the seller's rule can differ. These summaries show which one applies, how long you have, and what protection you get if an item never arrives or isn't as described.",
    match: ["Online marketplace"],
  },
  {
    slug: "beauty",
    name: "Beauty",
    title: "Beauty Return Policies: Sephora vs Ulta and More",
    description:
      "Sephora, Ulta Beauty and Sephora Canada return policies compared: refund windows, store credit rules and whether you need a receipt for opened products.",
    intro:
      "Beauty stores accept opened products, but the refund window is short and the receipt matters. Here is how the main beauty retailers compare.",
    match: ["Beauty"],
  },
  {
    slug: "electronics-home",
    name: "Electronics, home & apps",
    title: "Electronics & Home Return Policies: Best Buy, Apple, IKEA",
    description:
      "Return windows and restocking fees for Best Buy, Apple, Home Depot and IKEA, plus app subscription refunds, checked against each company's official policy.",
    intro:
      "Electronics have the shortest windows of all, often 14 or 15 days, and some carry a restocking fee once opened. Home and furniture stores are the opposite, with windows up to a year.",
    match: ["Electronics", "Home improvement", "Furniture", "Subscription"],
  },
];

export function storesInCategory(c: StoreCategory): VerifiedPolicy[] {
  return POLICIES.filter((p) => c.match.includes(p.category));
}
export function categoryOf(p: VerifiedPolicy): StoreCategory | undefined {
  return CATEGORIES.find((c) => c.match.includes(p.category));
}
export function relatedStores(p: VerifiedPolicy, limit = 4): VerifiedPolicy[] {
  const cat = categoryOf(p);
  const same = POLICIES.filter((x) => x.slug !== p.slug && cat?.match.includes(x.category));
  const sameRegion = same.filter((x) => x.region === p.region);
  return [...new Set([...sameRegion, ...same])].slice(0, limit);
}

// ─── Popular comparisons (each gets its own prerendered page) ────────────────
export const COMPARE_PAIRS: [string, string][] = [
  ["walmart", "target"],
  ["amazon", "walmart"],
  ["target", "amazon"],
  ["costco", "walmart"],
  ["kohls", "macys"],
  ["sephora", "ulta"],
  ["nike", "adidas"],
  ["dsw", "foot-locker"],
  ["dsw", "nike"],
  ["tj-maxx", "marshalls"],
  ["shein", "temu"],
  ["best-buy", "walmart"],
  ["hm", "zara"],
  ["old-navy", "american-eagle"],
  ["amazon", "ebay"],
  ["home-depot", "ikea"],
  ["temu", "aliexpress"],
  ["flipkart", "myntra"],
  ["next", "marks-and-spencer"],
  ["asos", "next"],
  ["argos", "currys"],
  ["amazon-uk", "argos"],
  ["noon", "amazon-ae"],
  ["namshi", "centrepoint"],
  ["amazon-in", "flipkart"],
  ["nykaa", "myntra"],
  ["khaadi", "sapphire"],
  ["sapphire", "gul-ahmed"],
  ["kmart-au", "target-au"],
  ["canadian-tire", "walmart-ca"],
  ["zalando", "asos"],
  ["lowes", "home-depot"],
  ["gap", "old-navy"],
  ["wayfair", "ikea"],
  ["tesco", "argos"],
  ["otto", "zalando"],
  ["extra", "jarir"],
  ["limelight", "khaadi"],
];
export const pairSlug = (a: string, b: string) => `${a}-vs-${b}`;
export function parsePair(slug: string | undefined): [VerifiedPolicy, VerifiedPolicy] | undefined {
  const pair = COMPARE_PAIRS.find(([a, b]) => pairSlug(a, b) === slug);
  if (!pair) return undefined;
  const a = getPolicy(pair[0]);
  const b = getPolicy(pair[1]);
  return a && b ? [a, b] : undefined;
}
export function pairsFor(slug: string) {
  return COMPARE_PAIRS.filter(([a, b]) => a === slug || b === slug);
}

// ─── Image paths (drawn by scripts/generate-images.tsx) ──────────────────────
export const storeImage = (slug: string) => `/images/policy/${slug}.webp`;
export const storeOg = (slug: string) => `/og/stores/${slug}.jpg`;
export const guideImage = (slug: string) => `/images/guides-v2/${slug}.webp`;
export const guideOg = (slug: string) => `/og/guides/${slug}.jpg`;
export const compareOg = (slug: string) => `/og/compare/${slug}.jpg`;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
