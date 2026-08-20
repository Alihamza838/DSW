import { Link } from "../ui/Link";
import type { ArticleGuide } from "../../types";
import { GuideCard } from "../blog/GuideCard";

export function PopularGuides({ guides }: { guides: ArticleGuide[] }) {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-brand bg-teal-brand/10 border border-teal-brand/20 px-2.5 py-1 rounded-full inline-block mb-2">
              AUDITED CONSUMER INTELLIGENCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Expert Policy Guides
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-normal">
              Deep dives into consumer rights, hidden store clauses, receipt lookup rules, and refund strategies.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-teal-brand hover:text-teal-dark border border-teal-brand/30 hover:border-teal-brand bg-white px-4 py-2 rounded-xl transition-all shrink-0 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <span>Explore All 25+ Guides</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, idx) => (
            <GuideCard key={guide.slug} guide={guide} index={idx} className="h-full" />
          ))}
        </div>
      </div>
    </section>
  );
}

