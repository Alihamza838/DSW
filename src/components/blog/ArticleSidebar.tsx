import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Building2, Tag } from "lucide-react";
import { GuideOverviewCard } from "./GuideOverviewCard";
import { AuditedStoreProfilesCard } from "./AuditedStoreProfilesCard";
import { RelatedGuidesCard } from "./RelatedGuidesCard";
import type { ArticleGuide, StoreFrontmatter } from "../../types";

interface ArticleSidebarProps {
  guide: ArticleGuide;
  relatedStores: StoreFrontmatter[];
  relatedGuides: ArticleGuide[];
}

export function ArticleSidebar({ guide, relatedStores, relatedGuides }: ArticleSidebarProps) {
  const [mobileTocOpen, setMobileTocOpen] = useState(true);
  const [mobileStoresOpen, setMobileStoresOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);

  return (
    <aside className="w-full">
      {/* Desktop Sticky Sidebar (lg:block) */}
      <div className="hidden lg:block space-y-6 lg:sticky lg:top-24">
        <GuideOverviewCard
          guideFaqsCount={guide.faqs?.length || 0}
          guideStepsCount={guide.steps?.length || 0}
          relatedStoresCount={relatedStores.length}
        />

        <AuditedStoreProfilesCard stores={relatedStores} />

        <RelatedGuidesCard guides={relatedGuides} />
      </div>

      {/* Mobile/Tablet Collapsible Accordion Sidebar (lg:hidden) */}
      <div className="lg:hidden space-y-4 mt-8 pt-6 border-t border-ink-100">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-400 mb-2">
          Guide Navigation & Reference Cards
        </h3>

        {/* Accordion Item 1: Guide Overview & Index (Open by default) */}
        <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between p-4 bg-paper/60 text-left font-bold text-xs text-ink cursor-pointer hover:bg-paper transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-teal-brand" />
              <span>Guide Overview & Index</span>
            </div>
            {mobileTocOpen ? (
              <ChevronUp className="h-4 w-4 text-ink-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-ink-500" />
            )}
          </button>
          {mobileTocOpen && (
            <div className="p-4 border-t border-ink-100">
              <GuideOverviewCard
                guideFaqsCount={guide.faqs?.length || 0}
                guideStepsCount={guide.steps?.length || 0}
                relatedStoresCount={relatedStores.length}
              />
            </div>
          )}
        </div>

        {/* Accordion Item 2: Audited Store Profiles (Collapsed by default) */}
        {relatedStores.length > 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setMobileStoresOpen(!mobileStoresOpen)}
              className="w-full flex items-center justify-between p-4 bg-paper/60 text-left font-bold text-xs text-ink cursor-pointer hover:bg-paper transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-teal-brand" />
                <span>Audited Store Profiles ({relatedStores.length})</span>
              </div>
              {mobileStoresOpen ? (
                <ChevronUp className="h-4 w-4 text-ink-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-ink-500" />
              )}
            </button>
            {mobileStoresOpen && (
              <div className="p-4 border-t border-ink-100">
                <AuditedStoreProfilesCard stores={relatedStores} />
              </div>
            )}
          </div>
        )}

        {/* Accordion Item 3: Related Consumer Guides (Collapsed by default) */}
        {relatedGuides.length > 0 && (
          <div className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setMobileGuidesOpen(!mobileGuidesOpen)}
              className="w-full flex items-center justify-between p-4 bg-paper/60 text-left font-bold text-xs text-ink cursor-pointer hover:bg-paper transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-teal-brand" />
                <span>Related Consumer Guides ({relatedGuides.length})</span>
              </div>
              {mobileGuidesOpen ? (
                <ChevronUp className="h-4 w-4 text-ink-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-ink-500" />
              )}
            </button>
            {mobileGuidesOpen && (
              <div className="p-4 border-t border-ink-100">
                <RelatedGuidesCard guides={relatedGuides} />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
