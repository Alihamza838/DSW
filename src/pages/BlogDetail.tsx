import { Link } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { ArticleLayout } from "../components/article/ArticleLayout";
import { getGuideBySlug } from "../components/blog/utils";
import { getGuideImagePath } from "../data/assets";
import { useSEO } from "../hooks/useSEO";
import { BreadcrumbNav } from "../components/ui/BreadcrumbNav";
import type { ArticleFrontmatter } from "../types/article";

export function BlogDetailPage({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="font-display text-2xl font-bold text-ink">Guide Article Not Found</h1>
        <p className="text-sm text-ink-600 mt-2">
          The requested return guidelines article doesn&apos;t exist or has been relocated.
        </p>
        <Link href="/blog" className="mt-6">
          <Button variant="default">Browse All Guides</Button>
        </Link>
      </div>
    );
  }

  // Parse & map raw guide metadata into the structured ArticleFrontmatter interface
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

  const isMarkdownFormat = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("format") === "md";

  useSEO({
    title: `${frontmatter.title} - Verified Shopper Guide`,
    description: frontmatter.quickAnswer || frontmatter.summary || `In-depth expert review of ${frontmatter.title}.`,
    ogImage: frontmatter.heroImage || getGuideImagePath(frontmatter.slug),
    ogType: "article",
    markdownUrl: `https://dswreturnrefund.com/blog/${frontmatter.slug}.md`,
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Guides & Articles", item: "/blog" },
      { name: frontmatter.title, item: `/blog/${frontmatter.slug}` },
    ],
  });

  if (isMarkdownFormat) {
    const markdownText = `# ${frontmatter.title}\n\n` +
      `> **Published:** ${frontmatter.publishedDate} | **Updated:** ${frontmatter.updatedDate}\n` +
      `> **Author:** ${frontmatter.author || "MALIK UMAR"}\n\n` +
      `## Quick Answer\n\n${frontmatter.quickAnswer}\n\n` +
      (frontmatter.factRows && frontmatter.factRows.length > 0 ? `## Key Policy Facts\n\n` + frontmatter.factRows.map((r) => `- **${r.label}**: ${r.value} (${r.status || "Verified"})`).join("\n") + "\n\n" : "") +
      `## Overview & Analysis\n\n${frontmatter.proseContent || frontmatter.summary}\n\n` +
      (frontmatter.faq && frontmatter.faq.length > 0 ? `## Frequently Asked Questions\n\n` + frontmatter.faq.map((f) => `### ${f.q}\n${f.a}`).join("\n\n") : "");

    return (
      <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm p-6 bg-slate-900 text-slate-100 min-h-screen">
        {markdownText}
      </pre>
    );
  }

  return (
    <div className="fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BreadcrumbNav
          items={[
            { label: "Guides & Articles", href: "/blog" },
            { label: frontmatter.title },
          ]}
        />
      </div>
      <ArticleLayout frontmatter={frontmatter} />
    </div>
  );
}


