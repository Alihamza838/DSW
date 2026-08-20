import React, { useState, useEffect } from "react";
import { List, ChevronDown, ChevronUp, X, Navigation } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  proseContent?: string;
  headings?: TOCItem[];
  enableFloating?: boolean;
}

export function TableOfContents({
  proseContent,
  headings: customHeadings,
  enableFloating = true,
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    if (customHeadings && customHeadings.length > 0) {
      setToc(customHeadings);
      return;
    }

    if (proseContent) {
      const lines = proseContent.split("\n");
      const extracted: TOCItem[] = [];
      lines.forEach((line) => {
        const h2Match = line.match(/^##\s+(.+)$/);
        const h3Match = line.match(/^###\s+(.+)$/);
        if (h2Match) {
          const text = h2Match[1].replace(/[*_~`]/g, "").trim();
          const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          extracted.push({ id, text, level: 2 });
        } else if (h3Match) {
          const text = h3Match[1].replace(/[*_~`]/g, "").trim();
          const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          extracted.push({ id, text, level: 3 });
        }
      });
      if (extracted.length > 0) {
        setToc(extracted);
        return;
      }
    }

    // DOM auto-detection fallback for H2 and H3 headers
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>("article h2, article h3, main h2, main h3");
      const extractedDom: TOCItem[] = [];
      elements.forEach((el, index) => {
        const text = el.innerText.trim();
        if (!text) return;
        let id = el.id;
        if (!id) {
          id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || `heading-${index}`;
          el.id = id;
        }
        const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
        extractedDom.push({ id, text, level });
      });
      if (extractedDom.length > 0) {
        setToc(extractedDom);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [proseContent, customHeadings]);

  // Scroll listener for floating button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active header tracking
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    setIsOpen(false);
    setIsFloatingOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* 1. Inline Table of Contents Card */}
      <nav
        aria-label="Table of Contents"
        className="my-6 rounded-2xl border border-ink-100 bg-paper-muted/60 p-4 font-sans shadow-2xs"
      >
        {/* Mobile Accordion Toggle Header */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-ink-700">
            <List className="h-4 w-4 text-teal-brand" aria-hidden="true" />
            <span>Table of Contents ({toc.length})</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="toc-list-mobile"
            aria-label={isOpen ? "Collapse Table of Contents" : "Expand Table of Contents"}
            className="p-1.5 rounded-lg hover:bg-ink-100 text-ink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-ink-700 mb-3 pb-2 border-b border-ink-100">
          <List className="h-4 w-4 text-teal-brand" aria-hidden="true" />
          <span>In This Article ({toc.length} Sections)</span>
        </div>

        {/* Heading List */}
        <div
          id="toc-list-mobile"
          role="region"
          aria-label="Article sections list"
          className={`${isOpen ? "block mt-3" : "hidden"} sm:block space-y-1.5`}
        >
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`w-full text-left block text-xs leading-snug transition-all rounded-lg px-2.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand cursor-pointer ${
                item.level === 3 ? "pl-6 text-ink-600" : "font-medium text-ink-800"
              } ${
                activeId === item.id
                  ? "bg-teal-brand/10 text-teal-dark font-bold border-l-2 border-teal-brand"
                  : "hover:bg-ink-100/60 hover:text-teal-brand"
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>
      </nav>

      {/* 2. Floating Quick Table of Contents Button & Modal */}
      {enableFloating && showFloatingButton && (
        <div className="fixed bottom-6 right-6 z-40 font-sans no-print">
          <button
            type="button"
            onClick={() => setIsFloatingOpen(!isFloatingOpen)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-full shadow-lg border border-slate-700 transition-all cursor-pointer transform hover:scale-105"
            title="Quick Section Navigation"
          >
            <Navigation className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Article Sections</span>
            <span className="bg-slate-800 text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded-full border border-slate-700">
              {toc.length}
            </span>
          </button>

          {/* Floating TOC Popup Drawer */}
          {isFloatingOpen && (
            <div className="absolute bottom-12 right-0 w-80 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase font-mono">
                  <List className="h-3.5 w-3.5 text-teal-brand" />
                  <span>Quick Navigation</span>
                </div>
                <button
                  onClick={() => setIsFloatingOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1">
                {toc.map((item) => (
                  <button
                    key={`floating-${item.id}`}
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                      item.level === 3 ? "pl-5 text-slate-600" : "font-semibold text-slate-900"
                    } ${
                      activeId === item.id
                        ? "bg-teal-50 text-teal-900 font-bold border-l-2 border-teal-500"
                        : "hover:bg-slate-50 hover:text-teal-600"
                    }`}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
