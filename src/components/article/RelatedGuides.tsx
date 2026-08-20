import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "../ui/Link";
import { guidesData } from "../../data/guides";

interface RelatedGuidesProps {
  currentSlug: string;
  relatedSlugs?: string[];
  category?: string;
  maxItems?: number;
  className?: string;
}

export function RelatedGuides({
  currentSlug,
  relatedSlugs = [],
  category,
  maxItems = 3,
  className = "",
}: RelatedGuidesProps) {
  const relatedList = React.useMemo(() => {
    if (relatedSlugs && relatedSlugs.length > 0) {
      const explicit = relatedSlugs
        .map((slug) => guidesData.find((g) => g.slug === slug))
        .filter((g): g is typeof guidesData[0] => Boolean(g));
      if (explicit.length > 0) return explicit.slice(0, maxItems);
    }

    // Fallback: Same category or generic fallback
    const sameCat = guidesData.filter(
      (g) => g.slug !== currentSlug && (category ? g.category === category : true)
    );
    if (sameCat.length >= maxItems) {
      return sameCat.slice(0, maxItems);
    }

    // Secondary fallback: Any other guides
    const existingSlugs = new Set(sameCat.map((g) => g.slug));
    const leftovers = guidesData.filter((g) => g.slug !== currentSlug && !existingSlugs.has(g.slug));
    return [...sameCat, ...leftovers].slice(0, maxItems);
  }, [currentSlug, relatedSlugs, category, maxItems]);

  if (relatedList.length === 0) return null;

  return (
    <section className={`p-5 rounded-3xl bg-white border border-ink-100 shadow-2xs space-y-4 font-sans ${className}`}>
      <div className="flex items-center justify-between border-b border-ink-100 pb-2.5">
        <h4 className="font-display text-sm font-bold text-ink flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-teal-brand" />
          <span>Related verified shopper guides</span>
        </h4>
        <Link href="/blog" className="text-xs font-mono font-bold text-teal-brand hover:underline flex items-center gap-1">
          <span>All Guides</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {relatedList.map((guide) => (
          <Link
            key={guide.slug}
            href={`/blog/${guide.slug}`}
            className="block p-3 rounded-2xl border border-ink-100 hover:border-teal-brand hover:bg-teal-50/40 transition-all group"
          >
            <h5 className="text-xs font-bold text-ink group-hover:text-teal-brand line-clamp-2 leading-snug">
              {guide.title}
            </h5>
            <p className="text-[11px] text-ink-500 line-clamp-1 mt-1 font-sans">
              {guide.summary || guide.quickAnswer}
            </p>
            <span className="text-[10px] font-mono text-ink-400 mt-1.5 block font-semibold">
              Updated {guide.updatedAt} • {guide.readingTime || "4 min"} read
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
