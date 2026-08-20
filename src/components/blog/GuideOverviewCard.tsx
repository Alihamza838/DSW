import React, { useState, useEffect } from "react";
import { BookOpen, HelpCircle, ListOrdered, Building2, FileText, Sparkles, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  type: "faq" | "steps" | "stores" | "takeaways" | "heading";
  level?: number;
}

interface GuideOverviewCardProps {
  guideFaqsCount?: number;
  guideStepsCount?: number;
  relatedStoresCount?: number;
  guideSummary?: string;
}

export function GuideOverviewCard({
  guideFaqsCount = 0,
  guideStepsCount = 0,
  relatedStoresCount = 0,
}: GuideOverviewCardProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Collect DOM headings dynamically from the article body
    const articleHeadings = Array.from(
      document.querySelectorAll(".article-body h2, .article-body h3")
    );

    const items: TocItem[] = [];

    // Add article headings
    articleHeadings.forEach((heading, idx) => {
      let id = heading.id;
      if (!id) {
        id = `heading-${idx}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || idx}`;
        heading.id = id;
      }
      const text = heading.textContent || `Section ${idx + 1}`;
      const isH3 = heading.tagName.toLowerCase() === "h3";

      items.push({
        id,
        text,
        type: "heading",
        level: isH3 ? 3 : 2,
      });
    });

    // Add structured sections if present
    if (guideStepsCount > 0) {
      items.push({
        id: "step-by-step-return-process",
        text: `Step-by-Step Instructions (${guideStepsCount} steps)`,
        type: "steps",
      });
    }

    if (guideFaqsCount > 0) {
      items.push({
        id: "frequently-asked-questions",
        text: `Frequently Asked Questions (${guideFaqsCount})`,
        type: "faq",
      });
    }

    if (relatedStoresCount > 0) {
      items.push({
        id: "audited-retailers",
        text: `Audited Retailer Profiles (${relatedStoresCount})`,
        type: "stores",
      });
    }

    // Fallback if no headings found in DOM
    if (items.length === 0) {
      items.push({ id: "article-content", text: "Article Content", type: "heading" });
    }

    setTocItems(items);

    // Setup IntersectionObserver for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    // Observe heading & section elements
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [guideFaqsCount, guideStepsCount, relatedStoresCount]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  const getSectionIcon = (type: TocItem["type"]) => {
    switch (type) {
      case "faq":
        return <HelpCircle className="h-3.5 w-3.5 text-teal-brand shrink-0" />;
      case "steps":
        return <ListOrdered className="h-3.5 w-3.5 text-emerald-600 shrink-0" />;
      case "stores":
        return <Building2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />;
      case "takeaways":
        return <Sparkles className="h-3.5 w-3.5 text-teal-brand shrink-0" />;
      default:
        return <FileText className="h-3.5 w-3.5 text-ink-400 shrink-0" />;
    }
  };

  return (
    <div className="p-5 rounded-3xl bg-white border border-ink-100 shadow-2xs space-y-4 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-dark border-b border-ink-100 pb-3">
        <BookOpen className="h-4 w-4 text-teal-brand" />
        <span>Guide Overview & Index</span>
      </div>

      <p className="text-xs text-ink-500 leading-relaxed">
        Click any topic to jump directly to verified 2026 policy guidelines:
      </p>

      <nav aria-label="Table of contents" className="space-y-1 text-xs">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium focus-visible:ring-2 focus-visible:ring-teal-brand focus-visible:ring-offset-1 focus-visible:outline-hidden ${
                item.level === 3 ? "ml-3 text-[11px]" : ""
              } ${
                isActive
                  ? "border-l-3 border-teal-brand bg-teal-brand/10 text-teal-dark font-bold pl-2.5 shadow-2xs"
                  : "text-ink-700 hover:bg-teal-brand/5 hover:text-teal-brand"
              }`}
            >
              {getSectionIcon(item.type)}
              <span className="truncate">{item.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
