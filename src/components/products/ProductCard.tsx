import React from "react";
import { ExternalLink, Heart, ShieldCheck, ShoppingBag, Award } from "lucide-react";
import { motion } from "motion/react";
import { OptimizedImage } from "../ui/OptimizedImage";
import type { AffiliateProduct } from "../../types";
import { buildAffiliateUrl } from "../../utils/affiliateLink";
import { CountryFlag } from "../ui/CountryFlag";
import { isFavorite, toggleFavorite, subscribeFavorites } from "../../utils/favorites";
import { getActiveCurrency, subscribeCurrencyChange, convertAndFormatPrice, parseNumericPrice } from "../../utils/currency";

interface ProductCardProps {
  product: AffiliateProduct;
  compact?: boolean;
  onQuickView?: (product: AffiliateProduct) => void;
  showShippingBadge?: boolean;
  index?: number;
}

export function ProductCard({ product, compact = false, onQuickView, showShippingBadge, index = 0 }: ProductCardProps) {
  const affiliateUrl = buildAffiliateUrl(product.affiliateUrl, product.storeSlug);
  const [fav, setFav] = React.useState(() => isFavorite(product.id));
  const [activeCurrency, setActiveCurrencyState] = React.useState(() => getActiveCurrency());
  const isEven = index % 2 === 0;

  React.useEffect(() => {
    const unsubFav = subscribeFavorites(() => {
      setFav(isFavorite(product.id));
    });
    const unsubCurr = subscribeCurrencyChange(() => {
      setActiveCurrencyState(getActiveCurrency());
    });
    return () => {
      unsubFav();
      unsubCurr();
    };
  }, [product.id]);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowFav = toggleFavorite({
      id: product.id,
      type: "product",
      title: product.title,
      slugOrUrl: affiliateUrl,
      brandOrStore: product.store,
      imageOrLogo: product.image,
    });
    setFav(isNowFav);
  };

  // Convert price if active currency differs
  const displayPrice = React.useMemo(() => {
    if (!product.salePrice) return "$0.00";
    const strPrice = String(product.salePrice);
    if (activeCurrency === "USD" && strPrice.startsWith("$")) {
      return strPrice;
    }
    const numUSD = parseNumericPrice(strPrice, product.currency || "USD");
    return convertAndFormatPrice(numUSD, activeCurrency);
  }, [product.salePrice, product.currency, activeCurrency]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      className="h-full min-w-0"
    >
      <div
        className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-red-600 p-3 sm:p-5 shadow-2xs hover:shadow-receipt transition-all duration-300 font-sans h-full"
        id={`product-card-${product.id}`}
      >
      <div>
        {/* Top Badges & Favorite Heart */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-3">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-red-600 bg-red-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-red-200 truncate max-w-[100px] sm:max-w-none">
            <CountryFlag code={product.countryCode || product.storeCountry || "US"} size="sm" />
            <span className="truncate">{product.store}</span>
          </span>

          <div className="flex items-center gap-1">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
              <Award className="h-3 w-3 text-red-600 shrink-0" />
              <span>AUDITED 2026</span>
            </span>

            <button
              type="button"
              onClick={handleToggleFav}
              aria-label={fav ? "Remove from favorites" : "Save to favorites"}
              className={`min-w-[32px] min-h-[32px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-lg sm:rounded-xl transition-colors cursor-pointer ${
                fav ? "text-amber-500 bg-amber-50 border border-amber-200" : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${fav ? "fill-amber-500 text-amber-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative h-32 sm:h-44 w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 mb-2 sm:mb-3 group-hover:bg-red-50/50 transition-colors">
          <OptimizedImage
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[9px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur px-1.5 py-0.5 rounded">
              {product.discount}
            </span>
          )}
        </div>

        {/* Product Title in Fraunces / Display font */}
        <h4 className="text-xs sm:text-base font-display font-bold text-ink group-hover:text-red-600 line-clamp-2 transition-colors leading-tight sm:leading-snug">
          {product.title}
        </h4>

        {/* Short Description */}
        <p className="hidden sm:block text-xs text-ink-500 mt-1 line-clamp-2 leading-relaxed font-sans">
          {product.description}
        </p>

        {/* Ledger-style Row for Return Guarantee */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-dashed border-slate-200 flex justify-between items-center text-[10px] sm:text-xs font-sans">
          <span className="text-ink-500 font-medium flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-600 shrink-0" />
            <span className="hidden xs:inline">Return:</span>
          </span>
          <span className="font-mono font-bold text-red-800 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 text-[9px] sm:text-[11px] truncate">
            {product.returnPolicyWindow}
          </span>
        </div>
      </div>

      {/* Pricing & CTA Button */}
      <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2">
        <div>
          <span className="text-[9px] sm:text-[10px] text-ink-400 block font-mono uppercase">Price ({activeCurrency})</span>
          <span className="text-sm sm:text-base font-bold text-ink font-mono">
            {displayPrice}
          </span>
        </div>

        {product.status === "live" ? (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            data-affiliate="true"
            data-merchant={product.store}
            data-tag={product.storeSlug}
            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs transition-all cursor-pointer shrink-0"
          >
            <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Buy Now</span>
            <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-80" />
          </a>
        ) : (
          <a
            href={`/stores/${product.storeSlug}`}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 text-[10px] sm:text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-600" />
            <span>Visit {product.store}</span>
          </a>
        )}
      </div>
    </div>
    </motion.div>
  );
}
