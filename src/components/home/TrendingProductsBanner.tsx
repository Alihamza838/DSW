import * as React from "react";
import { Link } from "../ui/Link";
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles, ExternalLink, Globe } from "lucide-react";
import { OptimizedImage } from "../ui/OptimizedImage";
import { productsData } from "../../data/products";
import { storesData } from "../../data/stores";
import { Button } from "../ui/button";
import { detectUserCountry, getProductsForMarket } from "../../lib/market";
import { formatNativePrice } from "../../lib/currency-format";

export function TrendingProductsBanner() {
  const [userCountry, setUserCountry] = React.useState("US");

  React.useEffect(() => {
    setUserCountry(detectUserCountry().toLowerCase());
  }, []);

  const marketProducts = React.useMemo(() => {
    return getProductsForMarket(productsData, storesData, userCountry);
  }, [userCountry]);

  const trendingProducts = React.useMemo(() => {
    const trending = marketProducts.filter((p) => p.isTrending);
    return (trending.length >= 3 ? trending : marketProducts).slice(0, 3);
  }, [marketProducts]);

  return (
    <section className="bg-gradient-to-br from-ink-900 via-ink to-teal-dark text-paper py-12 px-4 sm:px-6 my-8 rounded-3xl shadow-2xl relative overflow-hidden border border-teal-light/20">
      {/* Subtle background graphics */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Column: Heading & Copy */}
        <div className="space-y-4 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-wider font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Market-Aware Verified Retailer Deals</span>
          </div>

          <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
            Buy Verified Products With Guaranteed Return Protection
          </h2>

          <p className="text-sm text-paper-muted leading-relaxed">
            Shop directly from verified merchants in your region with complete transparency on return windows, receipt lookups, and native pricing.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link href="/products">
              <Button variant="teal" size="lg" className="w-full sm:w-auto font-bold text-sm gap-2 shadow-lg hover:shadow-xl">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Products in Your Market</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/products?market=global">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 font-medium text-sm gap-1.5">
                <Globe className="h-4 w-4 text-amber-300" />
                <span>Browse All Global Markets</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Trending Mini Product Showcase Cards */}
        <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {trendingProducts.map((product) => {
            const formattedPrice = formatNativePrice(product.salePrice, product.currency);
            return (
              <div
                key={product.id}
                onClick={() => window.open(product.affiliateUrl, "_blank", "noopener,noreferrer,sponsored")}
                className="bg-white/95 text-ink p-3 rounded-xl shadow-md border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2 group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-paper-muted">
                  <OptimizedImage
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-1 left-1 text-[9px] font-mono font-bold bg-ink text-white px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    {product.countryFlag ? (
                      <span>{product.countryFlag}</span>
                    ) : (
                      <ShoppingBag className="h-2.5 w-2.5 text-teal-light shrink-0" />
                    )}
                    <span>{product.store}</span>
                  </span>
                  <span className="absolute top-1 right-1 text-[9px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded shadow-xs">
                    {product.discount}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs line-clamp-1 group-hover:text-teal-brand transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] mt-1">
                    <span className="font-bold text-teal-dark font-display">{formattedPrice}</span>
                    <span className="text-[10px] text-ink-400 font-mono uppercase">({product.currency || "USD"})</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-ink-100 flex items-center justify-between text-[10px] text-teal-dark font-medium">
                  <span className="flex items-center gap-1 truncate font-mono">
                    <ShieldCheck className="h-3 w-3 text-teal-brand shrink-0" />
                    <span className="truncate">{product.shipsWithinLabel || `${product.store} Policy`}</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-ink-400 group-hover:text-teal-brand shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
