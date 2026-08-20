import React from "react";
import { ArticleLayout } from "../article/ArticleLayout";
import type { ArticleGuide } from "../../types";
import type { ArticleFrontmatter } from "../../types/article";

export function ArticleShell({ guide }: { guide: ArticleGuide }) {
  const frontmatter: ArticleFrontmatter = {
    title: guide.title,
    slug: guide.slug,
    category: guide.category,
    storeId: guide.relatedStores?.[0] || undefined,
    publishedDate: guide.publishedAt,
    updatedDate: guide.updatedAt,
    verifiedSourceUrl: guide.verifiedSourceUrl,
    verifiedSourceDate: guide.verifiedSourceDate || guide.updatedAt,
    quickAnswer: guide.quickAnswer || guide.summary,
    author: guide.author,
    readingTime: guide.readingTime,
    heroImage: guide.heroImage,
    summary: guide.summary,
    factRows: guide.factRows,
    sources: guide.sources,
    faq: guide.faqs?.map((f) => ({ q: f.question, a: f.answer })),
    relatedSlugs: guide.relatedArticles,
    relatedStores: guide.relatedStores,
    tags: guide.tags,
    proseContent: guide.proseContent,
    steps: guide.steps?.map((s) => ({ title: s.title, description: s.text })),
  };

  return <ArticleLayout frontmatter={frontmatter} />;
}
