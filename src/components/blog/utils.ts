import { guidesData } from "../../data/guides";
import type { ArticleGuide } from "../../types";

export function sortByNewest(guides: ArticleGuide[]): ArticleGuide[] {
  return [...guides].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getGuideBySlug(slug: string): ArticleGuide | undefined {
  return guidesData.find((g) => g.slug === slug);
}

export function formatReadingTime(readingTime: string): string {
  return readingTime.includes("read") ? readingTime : `${readingTime} read`;
}

/**
 * Related guides: prefer explicit relatedArticles links, fall back to
 * same-category guides so every article always has recirculation links.
 */
export function getRelatedGuides(guide: ArticleGuide, max = 3): ArticleGuide[] {
  const explicit = (guide.relatedArticles || [])
    .map((slug) => guidesData.find((g) => g.slug === slug))
    .filter((g): g is ArticleGuide => Boolean(g));

  if (explicit.length >= max) return explicit.slice(0, max);

  const fallback = guidesData.filter(
    (g) => g.slug !== guide.slug && g.category === guide.category && !explicit.includes(g)
  );

  return [...explicit, ...fallback].slice(0, max);
}
