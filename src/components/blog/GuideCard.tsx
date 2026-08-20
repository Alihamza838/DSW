import React from "react";
import { Clock, Tag, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "../ui/Link";
import { GuideImage } from "../ui/GuideImage";
import type { ArticleGuide } from "../../types";

interface GuideCardProps {
  guide: ArticleGuide;
  className?: string;
  index?: number;
}

// High quality curated stock visuals for policy guides
const GUIDE_IMAGES: Record<string, string> = {
  "american-eagle-return-policy": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  "ulta-return-policy-used-makeup": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  "home-depot-plant-return-policy": "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=800&q=80",
  "walmart-return-policy-without-receipt": "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
  "target-return-policy-explained": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
  "costco-electronics-return-policy": "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
  "amazon-return-policy-guide": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  "capcut-pro-refund-policy": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  "capcut-policy-guide": "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
  "holiday-return-policies-decoded": "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
  "nike-worn-shoes-return-policy": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  "sephora-ulta-return-policy-compared": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  "dsw-complete-return-policy-guide": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
};

export function GuideCard({ guide, className = "", index = 0 }: GuideCardProps) {
  // Determine image source priority: guide.heroImage if valid HTTP, or curated map, or topic image
  const imageSrc =
    guide.heroImage && guide.heroImage.startsWith("http")
      ? guide.heroImage
      : GUIDE_IMAGES[guide.slug] ||
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: (index % 4) * 0.05 }}
      className={`group bg-white rounded-2xl border border-slate-200/90 hover:border-teal-brand/70 transition-all duration-300 card-3d-lift shadow-2xs flex flex-col font-sans overflow-hidden ${className}`}
    >
      <Link href={`/blog/${guide.slug}`} className="flex flex-col h-full p-4 sm:p-5 justify-between space-y-4">
        <div className="space-y-3">
          {/* Guide Cover Image Banner */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 group-hover:border-teal-brand/30 transition-all">
            <GuideImage
              slug={guide.slug}
              title={guide.title}
              image={guide.heroImage || GUIDE_IMAGES[guide.slug]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                {guide.category.replace("-", " ")}
              </span>
              <span className="text-[10px] font-mono text-paper-muted bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
                <Clock className="h-3 w-3 text-teal-light" />
                <span>{guide.readingTime}</span>
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-base sm:text-lg font-semibold text-ink group-hover:text-teal-brand transition-colors line-clamp-2 tracking-tight leading-snug">
            {guide.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-ink-600 line-clamp-3 leading-relaxed font-normal">
            {guide.description}
          </p>

          {/* Tags */}
          {guide.tags && guide.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {guide.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-mono text-ink-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
          <span className="text-ink-500 text-[11px] font-mono font-normal">
            By {guide.author || "Policy Team"}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-teal-brand group-hover:text-teal-dark group-hover:translate-x-1 transition-transform">
            <span>Read Guide</span>
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

