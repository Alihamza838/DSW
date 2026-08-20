import * as React from "react";
import { Link } from "../ui/Link";
import { BookOpen } from "lucide-react";

interface Guide {
  slug: string;
  title: string;
  readingTime?: string;
}

interface RelatedGuidesWidgetProps {
  brand: string;
  guides: Guide[];
}

export function RelatedGuidesWidget({ brand, guides }: RelatedGuidesWidgetProps) {
  if (guides.length === 0) return null;

  return (
    <div className="bg-[#FAF8F3] border border-ink-100 rounded-lg p-5 space-y-4 shadow-2xs">
      <h4 className="font-display text-base font-bold text-ink flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-teal-brand shrink-0" />
        <span>Related Guides & Hacks</span>
      </h4>
      <p className="text-xs text-ink-600 leading-relaxed">
        Detailed editorial reviews, loophole guides, and consumer protection advisory matching {brand}:
      </p>
      <div className="space-y-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group block">
            <div className="p-3 bg-white rounded border border-ink-50 hover:border-teal-brand group-hover:shadow-3xs transition-all">
              <p className="text-xs font-bold text-ink group-hover:text-teal-brand transition-colors line-clamp-2">
                {guide.title}
              </p>
              <span className="text-[9px] font-mono text-ink-400 mt-1 block uppercase tracking-wider">
                {guide.readingTime || "5 min"} read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
