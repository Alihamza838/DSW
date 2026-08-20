import * as React from "react";
import { X, ExternalLink, ShieldCheck, Star, ShoppingBag, CheckCircle2 } from "lucide-react";
import type { AffiliateProduct } from "../../types";
import { Button } from "./button";
import { OptimizedImage } from "./OptimizedImage";

interface ProductModalProps {
  product: AffiliateProduct | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const isLive = product.status === "live";

  const handleAction = () => {
    if (isLive) {
      window.open(product.affiliateUrl, "_blank", "noopener,noreferrer,sponsored");
    } else {
      window.location.href = `/stores/${product.storeSlug}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 hover:bg-white text-ink rounded-full shadow border border-ink-100 transition-colors"
          aria-label="Close product view"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-paper-muted/40 aspect-square md:aspect-auto">
          <OptimizedImage
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-ink/90 text-white font-mono text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded">
            {product.store} Official
          </div>
        </div>

        {/* Details Content */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <span className="font-mono">{product.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-ink-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-ink text-xl leading-tight">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-teal-dark font-display">{product.salePrice}</span>
              <span className="text-sm text-ink-400 line-through font-mono">{product.originalPrice}</span>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Save {product.discount}
              </span>
            </div>

            {/* Return Policy Highlight Box */}
            <div className="p-3 bg-teal-brand/10 border border-teal-brand/30 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-teal-dark text-xs">
                <ShieldCheck className="h-4 w-4 text-teal-brand shrink-0" />
                <span>Verified Policy Protection</span>
              </div>
              <p className="text-xs text-ink-600 leading-relaxed font-medium">
                {product.returnPolicyWindow}
              </p>
            </div>

            {product.description && (
              <p className="text-xs text-ink-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="space-y-1.5 pt-2 border-t border-ink-100 text-xs text-ink-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Verified Direct Retailer Fulfillment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Full Consumer Protection & Return Rights</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-2 pt-3 border-t border-ink-100">
            <Button
              variant={isLive ? "teal" : "outline"}
              size="lg"
              onClick={handleAction}
              className="w-full flex items-center justify-center gap-2 font-bold text-sm shadow-md"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{isLive ? `Buy Now at ${product.store}` : `Visit ${product.store}`}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-[10px] text-center text-ink-400 font-mono">
              {isLive
                ? `Redirects to official ${product.store} partner checkout • rel="nofollow sponsored"`
                : `Verified independent guide for ${product.store} • rel="noopener noreferrer"`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
