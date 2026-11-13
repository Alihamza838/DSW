/** All guides from src/content/guides/*.md, bundled at build time by Vite. */
import { parseGuide, type Guide } from "./guides-parse";

export type { Guide } from "./guides-parse";
export { slugify } from "./guides-parse";

const files = import.meta.glob("../content/guides/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
export const GUIDES: Guide[] = Object.entries(files)
  .map(([file, raw]) => parseGuide(raw, file))
  .sort((a, b) => (a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : a.title.localeCompare(b.title)));

export const getGuide = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug);
export const guidesForStore = (slug: string) => GUIDES.filter((g) => g.stores.includes(slug));
export function relatedGuides(g: Guide, limit = 3) {
  return GUIDES.filter((x) => x.slug !== g.slug)
    .map((x) => ({ x, s: x.stores.filter((s) => g.stores.includes(s)).length + (x.category === g.category ? 1 : 0) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.x);
}

