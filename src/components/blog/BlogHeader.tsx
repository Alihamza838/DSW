import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { GuideImage } from "../ui/GuideImage";
import { formatDate } from "../../lib/utils";
import { formatReadingTime } from "./utils";
import type { ArticleGuide } from "../../types";

interface BlogHeaderProps {
  guide: ArticleGuide;
}

export function BlogHeader({ guide }: BlogHeaderProps) {
  return (
    <header className="mb-8 font-sans">
      {/* Guide Hero Image Banner */}
      <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 mb-6">
        <GuideImage
          slug={guide.slug}
          title={guide.title}
          image={guide.heroImage}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end pointer-events-none z-10">
          <span className="text-xs font-mono uppercase font-semibold bg-teal-brand text-white px-2.5 py-1 rounded-lg shadow-2xs">
            Verified Policy Guide
          </span>
          <span className="text-xs font-mono text-white bg-black/50 backdrop-blur px-2.5 py-1 rounded-lg border border-white/20">
            {guide.category.replace("-", " ")}
          </span>
        </div>
      </div>

      <Badge variant="outline" className="mb-4 capitalize bg-teal-light/20 border-teal-light text-teal-brand font-semibold shadow-2xs text-xs">
        {guide.category.replace("-", " ")}
      </Badge>
      <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl tracking-tight">
        {guide.title}
      </h1>
      <p className="mt-4 text-base md:text-lg text-ink-600 leading-relaxed font-sans font-normal">
        {guide.description}
      </p>
      {/* Single Clean Human-Readable Trust Strip directly under H1 */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-600 border-y border-ink-100 py-3 bg-paper/50 px-3 sm:px-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-ink-900 font-bold">
            By {guide.author || "DSWReturnRefund Editorial Desk"}
          </span>
          <span className="text-ink-300">•</span>
          <span className="flex items-center gap-1.5 font-semibold text-ink-700">
            <Clock className="h-3.5 w-3.5 text-teal-brand" />
            {formatReadingTime(guide.readingTime)}
          </span>
          <span className="text-ink-300">•</span>
          <span className="flex items-center gap-1.5 font-semibold text-ink-700">
            <CalendarDays className="h-3.5 w-3.5 text-teal-brand" />
            Updated {formatDate(guide.updatedAt)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-teal-brand font-bold text-[11px] hover:underline">
          <a
            href="#audited-retailers"
            className="flex items-center gap-1 hover:text-teal-dark transition-colors"
          >
            <span>Verified against official policy on {formatDate(guide.updatedAt)} →</span>
          </a>
        </div>
      </div>
    </header>
  );
}
