import React, { useState, useRef, useEffect } from "react";
import { Link } from "../ui/Link";

const TRENDING_STORES = [
  { name: "Target", slug: "target" },
  { name: "Walmart", slug: "walmart" },
  { name: "DSW", slug: "dsw" },
  { name: "Amazon", slug: "amazon" },
  { name: "Nike", slug: "nike" },
  { name: "Costco", slug: "costco" },
  { name: "Sephora", slug: "sephora" },
  { name: "Shein", slug: "shein" },
  { name: "Best Buy", slug: "best-buy font-sans" },
  { name: "Home Depot", slug: "home-depot" },
  { name: "Lululemon", slug: "lululemon" },
  { name: "Zara", slug: "zara" },
];

export function TrendingMarquee() {
  const [isInteracting, setIsInteracting] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInteractionStart = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    // Resume marquee 1.5s after touch/mouse interaction ends
    resumeTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Duplicate items array once to create continuous infinite loop
  const duplicatedPills = [...TRENDING_STORES, ...TRENDING_STORES];

  return (
    <div className="w-full my-6 font-sans">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
          <span>Trending 2026 Store Audits</span>
        </span>
      </div>

      {/* Marquee Wrapper Container with Edge Gradient Fade */}
      <div
        className="relative w-full overflow-hidden py-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        <div className={`animate-marquee-track flex items-center gap-3 ${isInteracting ? "paused" : ""}`}>
          {duplicatedPills.map((item, idx) => (
            <Link
              key={`${item.slug}-${idx}`}
              href={`/stores/${item.slug}`}
              className="shrink-0 rounded-full border border-slate-200/90 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:border-teal-brand hover:text-teal-brand hover:bg-teal-50/60 transition-all shadow-2xs hover:shadow-xs cursor-pointer select-none whitespace-nowrap"
            >
              {item.name} Policy
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
