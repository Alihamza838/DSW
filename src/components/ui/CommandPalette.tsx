import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  Store,
  FileText,
  ArrowRight,
  X,
  Sparkles,
  Clock,
  Trash2,
  TrendingUp,
  Globe,
  CornerDownLeft,
} from "lucide-react";
import { storesData } from "../../data/stores";
import { guidesData } from "../../data/guides";
import { Link, navigate } from "./Link";
import { VoiceSearchButton } from "./VoiceSearchButton";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = "rpf_recent_searches_v1";
const MAX_RECENT_SEARCHES = 5;

// Popular search suggestions for instant 1-click access
const POPULAR_SUGGESTIONS = [
  { term: "Walmart", href: "/stores/walmart", category: "Store Policy" },
  { term: "Target 365 Days", href: "/stores/target", category: "Store Policy" },
  { term: "DSW VIP", href: "/stores/dsw", category: "Store Policy" },
  { term: "Nike Worn Shoes", href: "/stores/nike", category: "Store Policy" },
  { term: "Sephora Makeup", href: "/stores/sephora", category: "Store Policy" },
  { term: "Costco Lifetime", href: "/stores/costco", category: "Store Policy" },
  { term: "No Receipt Lookup", href: "/blog/walmart-return-policy-without-receipt", category: "Guide" },
  { term: "Compare Walmart vs Target", href: "/compare/target-vs-walmart", category: "Comparison" },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount / open
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, MAX_RECENT_SEARCHES));
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [isOpen]);

  // Lock body scroll while palette is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Add query to recent searches
  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(
        0,
        MAX_RECENT_SEARCHES
      );
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const updated = recentSearches.filter((s) => s !== termToRemove);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const clearAllRecentSearches = () => {
    try {
      setRecentSearches([]);
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  // Combine search items
  const storeItems = storesData.map((s) => ({
    id: `store-${s.slug}`,
    title: `${s.brand} Return Policy`,
    category: "Store Policy",
    href: `/stores/${s.slug}`,
    icon: Store,
    detail: `${s.quickAnswer.returnWindow} window • Verified 2026`,
    keywords: [s.brand, s.slug, s.category, "store", "return window", s.quickAnswer.returnWindow],
  }));

  const guideItems = guidesData.map((g) => ({
    id: `guide-${g.slug}`,
    title: g.title,
    category: "Guide / Article",
    href: `/blog/${g.slug}`,
    icon: FileText,
    detail: (g.summary || g.description || "").slice(0, 75) + "...",
    keywords: [g.title, g.slug, g.category || "", ...(g.tags || [])],
  }));

  const countryItems = [
    { id: "country-us", title: "United States Stores Index", category: "Country Hub", href: "/by-country/us", icon: Globe, detail: "US Retail Return Policies & State Laws", keywords: ["us", "usa", "america"] },
    { id: "country-uk", title: "United Kingdom Store Index", category: "Country Hub", href: "/by-country/uk", icon: Globe, detail: "UK Rights & Consumer Protection", keywords: ["uk", "united kingdom", "britain"] },
    { id: "country-ca", title: "Canada Store Index", category: "Country Hub", href: "/by-country/ca", icon: Globe, detail: "Canadian Retail Return Windows", keywords: ["ca", "canada"] },
    { id: "country-ae", title: "UAE & Middle East Retail Hub", category: "Country Hub", href: "/by-country/ae", icon: Globe, detail: "Noon, Amazon & Gulf Store Policies", keywords: ["uae", "dubai", "saudi", "gcc"] },
    { id: "country-pk", title: "Pakistan E-Commerce Guide", category: "Country Hub", href: "/by-country/pk", icon: Globe, detail: "Daraz, Shophive & Local Return Rules", keywords: ["pk", "pakistan", "daraz"] },
    { id: "country-in", title: "India E-Commerce Store Directory", category: "Country Hub", href: "/by-country/in", icon: Globe, detail: "Flipkart, Myntra & Ajio Return Policies", keywords: ["in", "india", "flipkart"] },
  ];

  const allItems = [...storeItems, ...guideItems, ...countryItems];

  const filteredItems = query.trim()
    ? allItems
        .filter((item) => {
          const q = query.toLowerCase().trim();
          return (
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.detail.toLowerCase().includes(q) ||
            item.keywords.some((k) => (Array.isArray(k) ? k.join(" ") : String(k || "")).toLowerCase().includes(q))
          );
        })
        .slice(0, 10)
    : [];

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle item select / click
  const handleSelectItem = (item: typeof allItems[0]) => {
    saveRecentSearch(item.title.replace(" Return Policy", ""));
    onClose();
    navigate(item.href);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredItems.length > 0 && selectedIndex < filteredItems.length) {
      handleSelectItem(filteredItems[selectedIndex]);
    } else if (query.trim()) {
      saveRecentSearch(query.trim());
      onClose();
      navigate(`/stores?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-8 sm:pt-16 md:pt-20 px-3 sm:px-4 font-sans no-print">
      {/* Dark Blurred Backdrop Overlay - Click anywhere outside modal to close */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-fade-in cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Modal Box */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[85vh] sm:max-h-[80vh] divide-y divide-slate-100 transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Return Policies"
      >
        {/* Top Input Header Bar */}
        <form onSubmit={handleFormSubmit} className="relative flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 gap-2 sm:gap-3 bg-slate-50/90 border-b border-slate-200/80">
          <Search className="h-5 w-5 text-red-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search store return policies, rules, or guides..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-sans font-medium pr-2"
          />

          {/* Voice Search Button */}
          <VoiceSearchButton
            size="sm"
            onSearchQuery={(q) => {
              setQuery(q);
              saveRecentSearch(q);
            }}
          />

          {/* Clear Query Button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Clear text"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* ESC badge */}
          <span className="hidden md:inline-flex items-center gap-0.5 px-2 py-1 rounded text-[10px] font-mono text-slate-400 bg-slate-200/70 border border-slate-300/80">
            ESC
          </span>

          {/* Prominent Visible 'X' Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search overlay"
            className="p-1.5 sm:p-2 rounded-xl bg-slate-200/80 hover:bg-rose-500 hover:text-white text-slate-600 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ml-1"
            title="Close Search (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Modal Main Body (Scrollable) */}
        <div className="overflow-y-auto p-3 sm:p-4 space-y-4 flex-1 scrollbar-thin">
          {/* STATE 1: User has typed a search query */}
          {query.trim() ? (
            filteredItems.length === 0 ? (
              <div className="py-10 text-center text-slate-500 space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <p className="font-bold text-slate-800 text-sm">No matching store policies found for &quot;{query}&quot;</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try searching for major stores like <span className="font-bold text-red-700">Walmart</span>, <span className="font-bold text-red-700">Target</span>, or queries like <span className="font-bold text-red-700">receipt</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    saveRecentSearch(query.trim());
                    onClose();
                    navigate(`/stores?q=${encodeURIComponent(query.trim())}`);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <span>Search all stores directory</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  <span>Matching Results ({filteredItems.length})</span>
                  <span>Use ↑↓ to navigate</span>
                </div>
                {filteredItems.map((item, idx) => {
                  const IconComponent = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? "bg-red-50 border border-red-200 text-red-950 shadow-2xs"
                          : "hover:bg-slate-50 text-slate-700 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.title}</span>
                            <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isSelected && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-red-700 font-bold bg-red-100/70 px-2 py-0.5 rounded">
                            <CornerDownLeft className="h-3 w-3" /> Press Enter
                          </span>
                        )}
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? "text-red-600 translate-x-1" : "text-slate-300"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* STATE 2: Empty query - Show Recent Searches & Trending Quick Discovery */
            <div className="space-y-5">
              {/* RECENT SEARCHES SECTION */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-red-600" />
                      Recent Searches ({recentSearches.length})
                    </span>
                    <button
                      type="button"
                      onClick={clearAllRecentSearches}
                      className="text-[11px] font-mono text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Clear search history"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          saveRecentSearch(term);
                        }}
                        className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Clock className="h-3.5 w-3.5 text-slate-400 group-hover:text-red-600 shrink-0" />
                          <span className="text-xs font-semibold text-slate-800 group-hover:text-red-950 truncate">
                            {term}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => removeRecentSearch(e, term)}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors opacity-80 group-hover:opacity-100"
                          title="Remove from history"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TRENDING / POPULAR SEARCH SUGGESTIONS */}
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 px-1">
                  <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                  Popular Policy Searches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SUGGESTIONS.map((item) => (
                    <Link
                      key={item.term}
                      href={item.href}
                      onClick={() => {
                        saveRecentSearch(item.term);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white border border-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-2xs group"
                    >
                      <Sparkles className="h-3 w-3 text-amber-500 group-hover:text-amber-300 shrink-0" />
                      <span>{item.term}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* QUICK FEATURED STORES GRID */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 px-1 block">
                  Featured Retailers Directory
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {storesData.slice(0, 4).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/stores/${s.slug}`}
                      onClick={() => {
                        saveRecentSearch(s.brand);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-red-400 bg-white hover:bg-red-50/50 transition-all flex flex-col justify-between group"
                    >
                      <span className="text-xs font-bold text-slate-900 group-hover:text-red-700">{s.brand}</span>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">{s.quickAnswer.returnWindow}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="px-3.5 sm:px-4 py-2.5 bg-slate-50 text-[11px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold shadow-2xs">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold shadow-2xs">
                ↵
              </kbd>{" "}
              Select
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-red-700 font-extrabold">
            <Sparkles className="h-3 w-3 text-amber-500" />
            2026 Verified Search
          </span>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(content, document.body) : null;
}
