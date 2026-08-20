import * as React from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, ExternalLink, Star, Award, TrendingUp } from "lucide-react";
import { productsData } from "../../data/products";
import { CountryFlag } from "../ui/CountryFlag";
import { OptimizedImage } from "../ui/OptimizedImage";
import { buildAffiliateUrl } from "../../utils/affiliateLink";

export function ProductSlider() {
  const trendingProducts = React.useMemo(() => {
    return productsData.filter((p) => p.isTrending).slice(0, 8);
  }, []);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const total = trendingProducts.length;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch Swipe handlers for mobile screens
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    setTimeout(() => setIsHovered(false), 2000);
  };

  // Cycle every 3.5 seconds unless hovered/interacting
  React.useEffect(() => {
    if (isHovered || total === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, total]);

  if (total === 0) return null;

  const active = trendingProducts[currentIndex];
  const isLive = active.status === "live";

  return (
    <div
      className="bg-white rounded-2xl border border-ink-100 shadow-lg p-5 sm:p-6 overflow-hidden relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 border-b border-ink-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-100 text-amber-800 rounded-lg">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Featured Verified Global Deals
            </h2>
            <p className="text-xs text-ink-500">
              Live prices & return windows synced from audited merchant catalogs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Product"
            className="p-1.5 rounded-lg border border-ink-200 text-ink hover:bg-teal-light/20 hover:border-teal-brand hover:text-teal-brand transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-mono text-xs text-ink-500 font-medium px-1">
            {currentIndex + 1}/{total}
          </span>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Product"
            className="p-1.5 rounded-lg border border-ink-200 text-ink hover:bg-teal-light/20 hover:border-teal-brand hover:text-teal-brand transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Product Image */}
        <div className="md:col-span-5 relative group">
          <OptimizedImage
            src={active.image}
            alt={active.title}
            aspectRatio="4/3"
            className="rounded-xl shadow-md border border-ink-100"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
              {active.discount}
            </span>
            <span className="inline-flex items-center gap-1 bg-ink/80 text-white backdrop-blur font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              <CountryFlag code={active.storeCountry || "US"} size="sm" />
              <span>{active.store}</span>
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-teal-brand font-bold uppercase tracking-wider">
              {active.category} • Audited Offer
            </span>
            <h3 className="font-sans text-xl font-bold text-ink leading-snug line-clamp-2">
              {active.title}
            </h3>
          </div>

          <p className="text-xs text-ink-600 leading-relaxed line-clamp-2">
            {active.description}
          </p>

          {/* Pricing & Rating */}
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-display text-2xl font-bold text-ink">
              {active.salePrice}
            </span>
            {active.originalPrice && (
              <span className="font-mono text-sm text-ink-400 line-through">
                {active.originalPrice}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-bold ml-auto">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{active.rating}</span>
              <span className="text-ink-400 font-normal">({active.reviewsCount})</span>
            </span>
          </div>

          {/* Return Window Badge & CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-dashed border-ink-100">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-dark bg-teal-light/20 border border-teal-brand/30 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="h-4 w-4 text-teal-brand shrink-0" />
              <span>{active.returnPolicyWindow}</span>
            </div>

            {isLive ? (
              <a
                href={buildAffiliateUrl(active.affiliateUrl, "home_product_slider")}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center justify-center gap-2 bg-teal-brand text-ink font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-teal-light transition-colors shadow-xs"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Buy Now at {active.store}</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            ) : (
              <a
                href={`/stores/${active.storeSlug}`}
                className="inline-flex items-center justify-center gap-2 bg-slate-100 border border-slate-300 text-ink-800 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors shadow-2xs"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-teal-brand" />
                <span>Visit {active.store}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator Bar */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {trendingProducts.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx ? "w-6 bg-teal-brand" : "w-1.5 bg-ink-200 hover:bg-ink-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
