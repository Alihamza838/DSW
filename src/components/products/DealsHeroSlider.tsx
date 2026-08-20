import * as React from "react";
import { ShoppingBag, ShieldCheck, Globe, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Award, Zap, ExternalLink } from "lucide-react";
import { CountryFlag } from "../ui/CountryFlag";
import { Link } from "../ui/Link";

interface DealsHeroSliderProps {
  isGlobalMode: boolean;
  marketMeta: { name: string; flag: string; code: string } | null;
  onSelectMarketFilter?: (market: string) => void;
  onSelectStoreFilter?: (storeSlug: string) => void;
}

export function DealsHeroSlider({
  isGlobalMode,
  marketMeta,
  onSelectStoreFilter,
}: DealsHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const slides = React.useMemo(() => [
    // --- SLIDE 1 (Slate / Teal - Global Verified Catalog) ---
    {
      id: "global-catalog",
      badgeIcon: <ShoppingBag className="h-3.5 w-3.5 text-teal-300" />,
      badgeText: "Market-Aware Verified Affiliate Catalog (2026)",
      heading: isGlobalMode ? (
        <span className="text-white">All Global Stores & Regional Return Deals</span>
      ) : (
        <span className="flex items-center gap-2 flex-wrap text-white">
          <span>Verified Products for</span>
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl border border-white/30 text-white font-extrabold shadow-sm">
            <CountryFlag code={marketMeta?.code || "US"} size="md" />
            <span>{marketMeta?.name}</span>
          </span>
        </span>
      ),
      description: isGlobalMode
        ? "Browsing full verified global catalog across USA, Canada, UK, Australia, UAE, Pakistan, India, and China. Every item features audited return windows, zero price markups, and direct merchant checkout."
        : `Showing products verified for doorstep delivery within ${marketMeta?.name}. Includes 2026 return guarantees, native store pricing, and instant merchant checkout links.`,
      tags: [
        { label: "100% Native Price Parity", icon: <ShieldCheck className="h-4 w-4 text-emerald-300" />, href: "/blog/ftc-affiliate-disclosure-price-protection-guide" },
        { label: "Market Scope Verified", icon: <Globe className="h-4 w-4 text-amber-300" />, href: "/stores?market=global" },
        { label: "Direct Official Checkout", icon: <Award className="h-4 w-4 text-teal-300" />, href: "/products" },
      ],
      ctaText: "Browse Global Stores",
      ctaHref: "/stores?market=global",
      secondaryCtaText: "FTC Transparency",
      secondaryCtaHref: "/blog/ftc-affiliate-disclosure-price-protection-guide",
      bgGradient: "from-[#0B132B] via-[#1C2541] to-[#DC2626]",
      accentDecoration: <Globe className="w-80 h-80 text-red-400/10" />,
      layoutStyle: "standard",
    },

    // --- SLIDE 2 (Warm Amber / Gold / Dark Emerald - Extended Store Guarantees) ---
    {
      id: "extended-perks",
      badgeIcon: <Zap className="h-3.5 w-3.5 text-amber-300 fill-amber-400" />,
      badgeText: "2026 Audited Store Perks & Guarantees",
      heading: (
        <span className="text-amber-100">
          365-Day Returns & Lifetime Store Guarantees
        </span>
      ),
      description: "Verified 2026 store terms: Target Cat & Jack 365-day kids clothing guarantee, DSW VIP 365-day shoe returns, Costco lifetime protection, and Nike worn footwear wear-tests.",
      tags: [
        { label: "Target Cat & Jack 365-Day", icon: <Award className="h-4 w-4 text-amber-400" />, href: "/stores/target" },
        { label: "Costco Lifetime Electronics", icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, href: "/stores/costco" },
        { label: "Nike Worn Shoes Coverage", icon: <Sparkles className="h-4 w-4 text-amber-300" />, href: "/stores/nike" },
        { label: "DSW VIP 365 Days", icon: <Award className="h-4 w-4 text-amber-300" />, href: "/stores/dsw" },
      ],
      ctaText: "Compare 365-Day Policies",
      ctaHref: "/compare",
      bgGradient: "from-[#2A1810] via-[#1E293B] to-[#064E3B]",
      accentDecoration: <Award className="w-80 h-80 text-amber-400/10" />,
      layoutStyle: "split-amber",
      secondaryCtaText: "Lost Receipt Checker",
      secondaryCtaHref: "/lost-receipt-checker",
    },

    // --- SLIDE 3 (Vibrant Purple / Ocean Teal - Cross-Border Marketplaces) ---
    {
      id: "regional-marketplaces",
      badgeIcon: <Globe className="h-3.5 w-3.5 text-teal-300" />,
      badgeText: "Cross-Border Marketplaces: UAE, Pakistan, India & China",
      heading: (
        <span className="text-teal-100">
          Daraz PK, Flipkart IN, Noon UAE & Temu Cross-Border
        </span>
      ),
      description: "Cross-border return tracking & door-step pickup rules: Daraz 14-day TCS pickup, Flipkart 7-day replacement guarantee, Noon UAE express courier pickups, and Temu/AliExpress 90-day free returns.",
      tags: [
        { label: "Daraz Doorstep TCS", icon: <CountryFlag code="PK" size="sm" />, href: "/stores/daraz" },
        { label: "Flipkart 7-Day Replacement", icon: <CountryFlag code="IN" size="sm" />, href: "/stores/flipkart" },
        { label: "Noon Express UAE", icon: <CountryFlag code="AE" size="sm" />, href: "/stores/noon" },
        { label: "Temu 90-Day Pickups", icon: <CountryFlag code="CN" size="sm" />, href: "/stores/temu" },
      ],
      ctaText: "Read Cross-Border Guides",
      ctaHref: "/blog",
      bgGradient: "from-[#1E1B4B] via-[#311042] to-[#115E59]",
      accentDecoration: <ShieldCheck className="w-80 h-80 text-teal-300/10" />,
      layoutStyle: "vibrant-grid",
      secondaryCtaText: "Return Desk Finder",
      secondaryCtaHref: "/find-return-desk",
    },
  ], [isGlobalMode, marketMeta]);

  const totalSlides = slides.length;

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play timer (3 seconds) - pauses when hovered
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const active = slides[currentSlide];

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Banner Container with dynamic gradient */}
      <div className={`bg-gradient-to-r ${active.bgGradient} text-paper p-4 sm:p-8 md:p-10 min-h-[260px] sm:min-h-[280px] flex flex-col justify-between relative transition-all duration-700 px-10 sm:px-14`}>
        
        {/* Top Header Badge & Slide Counter */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur px-2.5 sm:px-3.5 py-1 rounded-full border border-white/20 shadow-xs text-white max-w-[80%] sm:max-w-none truncate">
            {active.badgeIcon}
            <span className="truncate">{active.badgeText}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-paper-muted bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/15">
            <span className="text-white font-bold">{currentSlide + 1}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>
        </div>

        {/* Content Body - Reserved padding prevents arrow overlap */}
        <div className="relative z-10 space-y-2.5 sm:space-y-3.5 max-w-3xl my-2 sm:my-3">
          <h1 className="font-display text-xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
            {active.heading}
          </h1>
          <p className="text-xs sm:text-sm text-paper-muted leading-relaxed font-sans line-clamp-2 sm:line-clamp-none">
            {active.description}
          </p>

          {/* Tags & Internal Linking CTAs - Horizontally Scrollable Chip Row on Mobile */}
          <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-paper-muted font-mono">
            <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-2 py-1 -mx-2 px-2 sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0 shrink-0">
              {active.tags.map((tag, idx) => (
                tag.href ? (
                  <Link
                    key={idx}
                    href={tag.href}
                    className="snap-start inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur px-2.5 sm:px-3 py-1 rounded-lg border border-white/20 text-white font-medium hover:underline transition-all whitespace-nowrap text-[11px] sm:text-xs"
                  >
                    {tag.icon}
                    <span>{tag.label}</span>
                  </Link>
                ) : (
                  <span
                    key={idx}
                    className="snap-start inline-flex items-center gap-1.5 bg-white/12 backdrop-blur px-2.5 sm:px-3 py-1 rounded-lg border border-white/15 text-white font-medium whitespace-nowrap text-[11px] sm:text-xs"
                  >
                    {tag.icon}
                    <span>{tag.label}</span>
                  </span>
                )
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 sm:pt-0 shrink-0">
              {active.secondaryCtaHref && (
                <Link
                  href={active.secondaryCtaHref}
                  className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold font-sans text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors border border-white/20"
                >
                  <span>{active.secondaryCtaText}</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}

              {active.ctaHref && (
                <Link
                  href={active.ctaHref}
                  className="inline-flex items-center gap-1.5 bg-red-600 text-white font-bold font-sans text-xs px-3 sm:px-3.5 py-1.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>{active.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Positioned in reserved padding zone with min 44px tap area */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 text-white backdrop-blur border border-white/20 hover:bg-black/70 active:scale-95 transition-all opacity-90 sm:opacity-80 group-hover:opacity-100 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 text-white backdrop-blur border border-white/20 hover:bg-black/70 active:scale-95 transition-all opacity-90 sm:opacity-80 group-hover:opacity-100 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Bottom Progress Bar Dots */}
        <div className="relative z-10 flex items-center justify-center gap-2 pt-1 sm:pt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? "w-6 sm:w-8 bg-red-500" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Decorative Background Graphic */}
        <div className="absolute right-[-40px] bottom-[-40px] pointer-events-none transition-transform duration-700">
          {active.accentDecoration}
        </div>
      </div>
    </div>
  );
}
