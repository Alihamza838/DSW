import * as React from "react";
import { Search, Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Link, navigate } from "../ui/Link";
import { VoiceSearchButton } from "../ui/VoiceSearchButton";
import { BrandLogo } from "../ui/BrandLogo";
import { TrendingMarquee } from "./TrendingMarquee";

export function HeroSection() {
  const [query, setQuery] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/stores?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-teal-50/60 via-slate-50/40 to-white overflow-hidden py-16 sm:py-24">
      {/* Subtle Ambient Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-teal-200/20 via-emerald-200/15 to-indigo-200/20 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
        {/* Brand Trademark Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-brand/30 shadow-2xs mb-6 backdrop-blur-md"
        >
          <BrandLogo size="sm" showText={false} />
          <span className="font-mono text-xs uppercase tracking-wider text-teal-dark font-semibold flex items-center gap-1.5">
            <span>Verified 2026 Worldwide Retail Audit</span>
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
          </span>
        </motion.div>

        {/* Hero Title - Clean & Crisp Display Font Pattern matching Screenshot */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-ink tracking-tight"
        >
          Can you return it?{" "}
          <span className="font-display italic text-teal-brand font-normal block sm:inline">
            Find out in 10 seconds.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-normal"
        >
          Return windows, receipt rules, and refund methods for every major US store - no scrolling through fine print required.
        </motion.p>

        {/* Search Form - Clean & Proportional */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          onSubmit={handleSearchSubmit}
          className="mx-auto mt-6 flex max-w-md items-center gap-2 px-1.5 bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm hover:border-teal-brand/60 transition-all"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a store, e.g. Target, Nike"
              className="w-full rounded-lg border border-transparent bg-transparent py-2 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-sans font-normal"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <VoiceSearchButton
                size="sm"
                onSearchQuery={(speechQuery) => {
                  setQuery(speechQuery);
                  navigate(`/stores?q=${encodeURIComponent(speechQuery)}`);
                }}
              />
            </div>
          </div>
          <Button type="submit" variant="teal" className="h-[38px] px-5 font-semibold text-sm rounded-lg shrink-0 shadow-2xs">
            Search
          </Button>
        </motion.form>

        {/* Auto-sliding Trending Store Pills Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
        >
          <TrendingMarquee />
        </motion.div>

        {/* Trust Points Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="mt-10 pt-8 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-mono font-semibold text-slate-600"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>50+ Global Retailers Audited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-brand shrink-0" />
            <span>Updated for 2026 Policies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Zero Fine Print Confusion</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


