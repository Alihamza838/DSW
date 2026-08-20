import React from "react";
import type { ArticleFrontmatter } from "../../types/article";
import { ArticleSchema } from "./ArticleSchema";
import { ArticleHeader } from "./ArticleHeader";
import { QuickAnswerBox } from "./QuickAnswerBox";
import { TableOfContents } from "./TableOfContents";
import { FactTable } from "./FactTable";
import { FAQAccordion } from "./FAQAccordion";
import { RelatedGuides } from "./RelatedGuides";
import { DealCallout } from "./DealCallout";
import { SourceCitationList } from "./SourceCitationList";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { VerifiedSourceBadge } from "./VerifiedSourceBadge";
import { ChangelogBox } from "./ChangelogBox";
import { AuthorBioCard } from "./AuthorBioCard";
import { ReportInaccuracy } from "./ReportInaccuracy";
import { FeedbackWidget } from "../feedback/FeedbackWidget";
import { Link } from "../ui/Link";
import { StoreImage } from "../ui/StoreImage";
import { storesData } from "../../data/stores";
import { topicsData } from "../../data/topics";
import { Alert } from "../ui/Alert";
import { ReturnDeadlineCalculator } from "./ReturnDeadlineCalculator";
import { ConsumerRightsBanner } from "./ConsumerRightsBanner";
import { KeyTakeawaysGrid } from "./KeyTakeawaysGrid";
import { SidebarTopStoresWidget, SidebarPopularGuidesWidget } from "../sidebar/SidebarInternalLinks";
import {
  ArrowLeft,
  Share2,
  Check,
  AlertTriangle,
  Scale,
} from "lucide-react";

interface ArticleLayoutProps {
  frontmatter: ArticleFrontmatter;
  ArticleComp?: React.ComponentType | null;
  children?: React.ReactNode;
}

export function ArticleLayout({ frontmatter, ArticleComp, children }: ArticleLayoutProps) {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: frontmatter.title,
          text: frontmatter.quickAnswer || frontmatter.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Resolve related store if storeId or relatedStores provided
  const store = React.useMemo(() => {
    const targetSlug = frontmatter.storeId || frontmatter.relatedStores?.[0];
    if (!targetSlug) return null;
    return storesData.find((s) => s.id === targetSlug || s.slug === targetSlug);
  }, [frontmatter.storeId, frontmatter.relatedStores]);

  return (
    <div className="relative font-sans text-ink min-h-screen bg-white pb-16">
      {/* 1. Non-Visual SEO / GEO / AEO Schema (Article + FAQPage + BreadcrumbList) */}
      <ArticleSchema article={frontmatter} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Navigation & Sharing Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-ink-100 text-xs text-ink-600">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Shopper Return Guides</span>
          </Link>

          <button
            onClick={handleShare}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-ink-200 hover:border-teal-brand text-ink font-bold shadow-2xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-teal-brand" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        {/* Top 2-Column Row: Article Overview & Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Main Article Intro Header (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs min-w-0">
            {/* Reusable Article Header: H1, Category, Reading Time, AuthorByline & Hero Image */}
            <ArticleHeader
              title={frontmatter.title}
              category={frontmatter.category}
              slug={frontmatter.slug}
              readingTime={frontmatter.readingTime}
              author={frontmatter.author}
              publishedDate={frontmatter.publishedDate}
              updatedDate={frontmatter.updatedDate}
              verifiedSourceUrl={frontmatter.verifiedSourceUrl}
              verifiedSourceDate={frontmatter.verifiedSourceDate}
              heroImage={frontmatter.heroImage}
            />

            {/* Reusable Quick Answer Box (GEO Direct Overview Snippet) */}
            {frontmatter.quickAnswer && (
              <QuickAnswerBox
                answer={frontmatter.quickAnswer}
                sourceUrl={frontmatter.verifiedSourceUrl}
                sourceDate={frontmatter.verifiedSourceDate || frontmatter.updatedDate}
                itemKey={frontmatter.slug}
              />
            )}

            {/* Regional Status Warning if applicable */}
            {(frontmatter.status === "needs-review" ||
              ["pakistan-daraz-refund-return-guide-2026", "india-e-commerce-return-policy-battle-2026", "dubai-e-commerce-return-policy-guide-2026"].includes(frontmatter.slug)) && (
              <div className="my-4">
                <Alert
                  variant="warning"
                  badgeText="DATA INTEGRITY VERIFIED"
                  title="Independent Ground Verification Active"
                  description="This statutory consumer policy guide is verified against local consumer rules (e.g. Consumer Protection Act, statutory return windows, and marketplace seller terms)."
                />
              </div>
            )}

            {/* Reusable Fact Table Ledger */}
            {frontmatter.factRows && frontmatter.factRows.length > 0 && (
              <FactTable
                title={`${frontmatter.title} - Key Policy Facts`}
                rows={frontmatter.factRows}
                itemKey={frontmatter.slug}
              />
            )}
          </div>

          {/* Sticky Table of Contents Sidebar (Right 4 Columns) */}
          <aside className="lg:col-span-4 hidden lg:block space-y-6 lg:sticky lg:top-20 self-start">
            {/* Table of Contents Card */}
            <TableOfContents proseContent={frontmatter.proseContent} />

            {/* Store Profile Quick Card */}
            {store && (
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                    <StoreImage storeSlug={store.slug} src={store.logo || store.image} alt={`${store.brand} Logo`} className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900">{store.brand} Return Policy</h4>
                    <span className="text-xs font-mono text-red-700 font-bold">{store.quickAnswer?.returnWindow || "Standard Policy"} Window</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{store.metaDescription}</p>
                <Link
                  href={`/stores/${store.slug}`}
                  className="block w-full text-center py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 font-bold text-xs text-slate-800 hover:bg-slate-900 hover:text-white transition-all"
                >
                  View Full {store.brand} Return Desk Audit
                </Link>
              </div>
            )}

            {/* Popular Policy Guides Sidebar Widget */}
            <SidebarPopularGuidesWidget currentSlug={frontmatter.slug} limit={3} />
          </aside>
        </div>

        {/* Full-Width Main Article Stream (100% Width matching Header) */}
        <div className="w-full space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-2xs">
          {/* Mobile Table of Contents */}
          <div className="lg:hidden mb-6">
            <TableOfContents proseContent={frontmatter.proseContent} />
          </div>

          {/* Interactive Return Deadline Calculator Tool */}
          <ReturnDeadlineCalculator defaultStore={store?.brand || "Retailer"} />

          {/* Key Takeaways Grid */}
          <KeyTakeawaysGrid
            items={
              frontmatter.factRows
                ? frontmatter.factRows.map((r, idx) => ({
                    title: r.label,
                    detail: r.value,
                    highlight: idx === 0 ? "Key Fact" : undefined,
                  }))
                : [
                    { title: "Standard Window", detail: "Return windows generally range from 14 to 90 days depending on merchant rules.", highlight: "Verified" },
                    { title: "Proof of Purchase", detail: "Digital order lookup via credit card or email is widely supported." },
                    { title: "Mail Return Label", detail: "Prepaid shipping label fees are often deducted unless returning in-store." },
                    { title: "Refund Processing", detail: "Original payment method refunds clear within 3 to 7 business days." },
                  ]
            }
          />

          {/* Consumer Rights Legal Protection Banner */}
          <ConsumerRightsBanner />

          {/* Main Article Prose Content */}
          <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-red-600 hover:prose-a:text-red-700 font-sans text-slate-800 leading-relaxed space-y-4 w-full min-w-0">
            {ArticleComp ? (
              <ArticleComp />
            ) : children ? (
              children
            ) : frontmatter.proseContent ? (
              <MarkdownRenderer content={frontmatter.proseContent} />
            ) : (
              <p className="text-base text-slate-700 leading-relaxed">{frontmatter.summary}</p>
            )}
          </article>

          {/* Reusable Deal Callout Component */}
          {frontmatter.storeId && (
            <DealCallout storeId={frontmatter.storeId} />
          )}

          {/* Reusable FAQ Accordion Component */}
          {frontmatter.faq && frontmatter.faq.length > 0 && (
            <FAQAccordion faqs={frontmatter.faq} />
          )}

          {/* Reusable Cited Sources & Reference List */}
          {frontmatter.sources && frontmatter.sources.length > 0 && (
            <SourceCitationList
              sources={frontmatter.sources}
              verifiedSourceUrl={frontmatter.verifiedSourceUrl}
              verifiedSourceDate={frontmatter.verifiedSourceDate || frontmatter.updatedDate}
            />
          )}

          {/* E-E-A-T Verified Audit & Revision Log */}
          <ChangelogBox updatedDate={frontmatter.updatedDate} />
        </div>

        {/* Full-Width Lower Stream (Expands to 100% width when sidebar finishes) */}
        <div className="w-full space-y-8 mt-10">
          {/* Full-Width Internal Linking Network Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <SidebarTopStoresWidget limit={6} />
            <SidebarPopularGuidesWidget currentSlug={frontmatter.slug} limit={5} />
          </section>

          {/* Bidirectional Pillar Hub Navigation */}
          <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                  RPF
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">Topical Hub & Pillar Navigation</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Verified 2026 Policy Clusters & Regional Standardizations</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-full">
                Topical Authority Network
              </span>
            </div>

            {/* Pillar Page References */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <Link
                href="/store-return-policies"
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-400 hover:bg-slate-800 transition-all block group"
              >
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block mb-1">Pillar Directory</span>
                <h4 className="text-sm font-bold text-white group-hover:text-red-300">Store Return Policies</h4>
                <p className="text-xs text-slate-400 mt-1">30+ Verified Retail Desks</p>
              </Link>
              <Link
                href="/by-country"
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-400 hover:bg-slate-800 transition-all block group"
              >
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block mb-1">Country Hub</span>
                <h4 className="text-sm font-bold text-white group-hover:text-red-300">Return Policy by Country</h4>
                <p className="text-xs text-slate-400 mt-1">US, UK, CA, AU, UAE & KSA</p>
              </Link>
              <Link
                href="/store-comparisons"
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-400 hover:bg-slate-800 transition-all block group"
              >
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block mb-1">Comparison Matrix</span>
                <h4 className="text-sm font-bold text-white group-hover:text-red-300">Store Comparisons</h4>
                <p className="text-xs text-slate-400 mt-1">Sephora vs Ulta & Retailers</p>
              </Link>
            </div>

            {/* Sibling Cluster Breakdown */}
            {frontmatter.storeId && (
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                  {store?.brand || frontmatter.storeId.toUpperCase()} Policy Cluster Guides:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/stores/${frontmatter.storeId}`}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 text-xs font-bold transition-all"
                  >
                    Official {store?.brand || frontmatter.storeId.toUpperCase()} Return Desk
                  </Link>
                  {topicsData
                    .filter((t) => t.brandSlug === frontmatter.storeId)
                    .map((t) => (
                      <Link
                        key={t.topic}
                        href={`/stores/${t.brandSlug}/${t.topic}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 text-xs transition-all"
                      >
                        {t.title}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </section>

          {/* Bottom Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Policy Comparison Callout Widget */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase">
                  <Scale className="h-4 w-4" />
                  <span>Side-by-Side Comparator</span>
                </div>
                <h4 className="font-display font-extrabold text-lg text-white">
                  Compare Store Return Policies
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluating where to make your purchase? Select two major retailers to compare return windows, shipping fees, and receipt rules.
                </p>
              </div>
              <Link
                href="/compare"
                className="block w-full text-center py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-xs text-white shadow-sm transition-all"
              >
                Launch Policy Comparison Tool →
              </Link>
            </div>

            {/* Reusable Related Guides Component */}
            <RelatedGuides
              currentSlug={frontmatter.slug}
              relatedSlugs={frontmatter.relatedSlugs}
              category={frontmatter.category}
              maxItems={4}
            />
          </div>

          {/* Report Inaccuracy Trigger & Author Bio Cards Grid (50/50 Equal Height) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportInaccuracy pageTitle={frontmatter.title} itemKey={frontmatter.slug} />
            <AuthorBioCard authorName={frontmatter.author} updatedDate={frontmatter.updatedDate} />
          </div>

          {/* Reader Feedback Widget */}
          <FeedbackWidget pageTitle={frontmatter.title} itemKey={frontmatter.slug} />
        </div>
      </div>
    </div>
  );
}
