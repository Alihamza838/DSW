import React from "react";
import { Tag, Clock, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Link } from "../ui/Link";
import type { ArticleGuide } from "../../types";
import { formatReadingTime } from "./utils";

interface RelatedGuidesCardProps {
  guides: ArticleGuide[];
}

export function RelatedGuidesCard({ guides }: RelatedGuidesCardProps) {
  if (!guides || guides.length === 0) return null;

  return (
    <div className="p-5 rounded-3xl bg-white border border-ink-100 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-800">
          <Tag className="h-4 w-4 text-teal-brand" />
          <span>Related Consumer Guides</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {guides.map((rg) => {
          const categoryLabel = (rg.category || "Guide").replace("-", " ");

          return (
            <Link
              key={rg.slug}
              href={`/blog/${rg.slug}`}
              className="group block p-3.5 rounded-2xl border border-ink-100 hover:border-teal-brand/40 bg-paper hover:bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-teal-dark bg-teal-brand/10 px-2 py-0.5 rounded-md">
                  <Layers className="h-2.5 w-2.5" />
                  <span>{categoryLabel}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink-400">
                  <Clock className="h-2.5 w-2.5 text-teal-brand" />
                  <span>{formatReadingTime(rg.readingTime)}</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-ink group-hover:text-teal-brand transition-colors line-clamp-2 leading-snug">
                  {rg.title}
                </h4>
                <ArrowRight className="h-3.5 w-3.5 text-ink-400 group-hover:text-teal-brand group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-1 border-t border-ink-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-brand hover:text-teal-dark transition-colors"
        >
          <span>Explore all consumer guides →</span>
        </Link>
      </div>
    </div>
  );
}
