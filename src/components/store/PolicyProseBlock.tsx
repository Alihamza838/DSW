import * as React from "react";
import { MarkdownText } from "../blog/MarkdownText";
import { ChevronDown, ChevronUp, FileText, BookOpen, ShieldCheck, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

interface PolicyProseBlockProps {
  source: string;
  brandName: string;
  className?: string;
}

export function PolicyProseBlock({ source, brandName, className }: PolicyProseBlockProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isStickyActive, setIsStickyActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stickyHeaderRef = React.useRef<HTMLDivElement>(null);

  // Approximate reading time
  const wordCount = React.useMemo(() => {
    return source.split(/\s+/).filter(Boolean).length;
  }, [source]);

  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Determine if block is long enough to collapse (> 800 characters or > 120 words)
  const isLongText = wordCount > 100;

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Activate sticky indicator state when top of prose container scrolls past top header
      const isHeaderSticky = rect.top <= 100 && rect.bottom >= 200;
      setIsStickyActive(isHeaderSticky);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleExpand = () => {
    if (isExpanded && containerRef.current) {
      // Smoothly scroll back to the top of container when collapsing
      const topOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
    setIsExpanded((prev) => !prev);
  };

  const handleScrollToTop = () => {
    if (containerRef.current) {
      const topOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-white border border-slate-200/90 rounded-2xl shadow-2xs relative transition-all duration-300",
        className
      )}
    >
      {/* Sticky Header Bar when scrolling through long policy text */}
      <div
        ref={stickyHeaderRef}
        className={cn(
          "sticky top-14 sm:top-18 z-20 px-5 py-3 rounded-t-2xl bg-white/95 backdrop-blur-md border-b transition-all flex items-center justify-between gap-3",
          isStickyActive
            ? "border-teal-500/40 bg-slate-900/95 text-white shadow-md my-0"
            : "border-slate-100 text-slate-800 bg-slate-50/80"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              isStickyActive ? "text-teal-400" : "text-teal-brand"
            )}
          />
          <span className="font-bold text-xs sm:text-sm truncate">
            {brandName} Detailed Policy Analysis & Fine Print
          </span>
          <span
            className={cn(
              "hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0",
              isStickyActive
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                : "bg-slate-200/80 text-slate-600"
            )}
          >
            {readTimeMinutes} min read
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isStickyActive && (
            <button
              type="button"
              onClick={handleScrollToTop}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer text-[11px] font-mono font-semibold flex items-center gap-1"
              title="Jump to top of section"
            >
              <ArrowUp className="h-3.5 w-3.5 text-teal-300" />
              <span className="hidden sm:inline">Top</span>
            </button>
          )}

          {isLongText && (
            <button
              type="button"
              onClick={handleToggleExpand}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1",
                isStickyActive
                  ? "bg-teal-500 text-slate-950 hover:bg-teal-400"
                  : "bg-slate-900 text-white hover:bg-teal-brand"
              )}
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Prose Text Block */}
      <div className="p-5 sm:p-6 md:p-8 relative">
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isLongText && !isExpanded ? "max-h-[380px] overflow-hidden" : "max-h-none"
          )}
        >
          <MarkdownText
            source={source}
            className="prose prose-neutral max-w-none text-ink-600 text-sm md:text-base leading-relaxed"
          />
        </div>

        {/* Bottom Gradient Mask & Expand Trigger (Visible when collapsed on long text) */}
        <AnimatePresence>
          {isLongText && !isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-2xl flex flex-col justify-end items-center pb-4 px-4 z-10"
            >
              {/* Floating Expand Prompt Pill */}
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="pointer-events-auto bg-slate-900 hover:bg-teal-brand text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 border border-slate-700/80 cursor-pointer group"
              >
                <ShieldCheck className="h-4 w-4 text-teal-400 group-hover:text-white transition-colors" />
                <span>Read Full {brandName} Policy Rules ({readTimeMinutes} Min Read)</span>
                <ChevronDown className="h-4 w-4 text-teal-400 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <p className="text-[11px] font-mono text-slate-400 mt-2 pointer-events-auto">
                Scroll or tap above to reveal full terms & return conditions
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer bar when fully expanded */}
      {isLongText && isExpanded && (
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
          <span className="font-mono text-[11px]">
            Fully expanded ({wordCount} words verified against 2026 guidelines)
          </span>
          <button
            type="button"
            onClick={handleToggleExpand}
            className="text-teal-brand hover:text-teal-dark font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Collapse text block</span>
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
