import React from "react";
import { MarkdownRenderer } from "../article/MarkdownRenderer";
import { FaqAccordion } from "../store/FaqAccordion";
import { StepGuide } from "../store/StepGuide";
import type { ArticleGuide } from "../../types";
import { VerifiedSourceBadge } from "../article/VerifiedSourceBadge";
import { KeyFactsBox } from "../article/KeyFactsBox";

interface ContentBlockProps {
  guide: ArticleGuide;
  ArticleComp?: React.ComponentType | null;
}

export function ContentBlock({ guide, ArticleComp }: ContentBlockProps) {
  const storeSlug = guide.relatedStores && guide.relatedStores.length > 0 ? guide.relatedStores[0] : undefined;

  return (
    <div className="space-y-8 font-sans">
      {/* Verified Source Audit Header */}
      <VerifiedSourceBadge
        author={guide.author}
        updatedAt={guide.updatedAt}
        storeName={storeSlug ? storeSlug.toUpperCase() : undefined}
        officialPolicyUrl={guide.verifiedSourceUrl}
      />

      {/* Executive Policy Summary Box */}
      <KeyFactsBox
        title={`Key Policy Takeaways - ${guide.title}`}
        summaryText={guide.summary}
        takeaways={[
          { label: "Category", detail: guide.category.replace("-", " ").toUpperCase(), highlight: "VERIFIED 2026" },
          { label: "Reading Time", detail: guide.readingTime || "5 min", highlight: "QUICK AUDIT" },
          { label: "Audited By", detail: guide.author || "DSWReturnRefund Team", highlight: "EXPERT REVIEWED" },
          { label: "Related Stores", detail: (guide.relatedStores || []).join(", ").toUpperCase() || "ALL MERCHANTS", highlight: "DIRECT DEALS" },
        ]}
      />

      {/* Main Prose / Article Content */}
      {ArticleComp ? (
        <div className="prose prose-neutral max-w-none text-ink-700 leading-relaxed text-sm md:text-base font-sans">
          <ArticleComp />
        </div>
      ) : guide.proseContent ? (
        <MarkdownRenderer content={guide.proseContent} />
      ) : (
        <div className="prose prose-neutral max-w-none text-ink-700 leading-relaxed text-sm md:text-base font-sans">
          <p>{guide.summary}</p>
        </div>
      )}

      {/* Step Guide Component */}
      {guide.steps && guide.steps.length > 0 && (
        <div className="mt-8 border-t border-ink-100 pt-6">
          <h3 className="font-display text-lg font-bold text-ink mb-4">Step-by-Step Return Process</h3>
          <StepGuide steps={guide.steps} />
        </div>
      )}

      {/* FAQ Component */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div className="mt-8 border-t border-ink-100 pt-6">
          <h3 className="font-display text-lg font-bold text-ink mb-4">Frequently Asked Questions</h3>
          <FaqAccordion faqs={guide.faqs} />
        </div>
      )}
    </div>
  );
}
