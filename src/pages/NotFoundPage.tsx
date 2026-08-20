import React, { useState } from "react";
import { Search, Home, BookOpen, ShoppingBag, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Link } from "../components/ui/Link";
import { Button } from "../components/ui/button";
import { storesData } from "../data/stores";

export function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const popularStores = storesData.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/stores?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 font-sans space-y-8 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
          <HelpCircle className="h-4 w-4 text-amber-600" />
          <span>404 - Resource Not Found</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink tracking-tight">
          Looking for a Verified Return Policy?
        </h1>

        <p className="text-sm sm:text-base text-ink-600 max-w-xl mx-auto leading-relaxed">
          The page or policy guide you requested couldn&apos;t be found. Try searching our database of 30+ verified retailer return policies below.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto relative pt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search store name (e.g. Target, Amazon, Nike, Walmart)..."
            className="w-full pl-11 pr-24 py-3 rounded-2xl border border-slate-300 bg-white text-ink placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-red-600 shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Popular Retailer Quick Links */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <h2 className="font-display font-bold text-ink text-base flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-red-600" />
          <span>Popular Retailer Return Policies</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularStores.map((store) => (
            <Link
              key={store.slug}
              href={`/stores/${store.slug}`}
              className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200/80 hover:border-red-200 transition-all flex items-center justify-between group"
            >
              <span className="font-extrabold text-ink text-xs sm:text-sm group-hover:text-red-600 transition-colors">
                {store.brand}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button variant="brand" className="inline-flex items-center gap-2 cursor-pointer">
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline" className="inline-flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4" />
            <span>Browse All Guides</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
