import * as React from "react";
import { ShieldAlert, CheckCircle, Scale, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";
import { Link } from "../ui/Link";
import { Button } from "../ui/button";

export function ConsumerAdvisorySection() {
  const [hasReceipt, setHasReceipt] = React.useState<boolean | null>(true);
  const [withinWindow, setWithinWindow] = React.useState<boolean | null>(true);
  const [isOpened, setIsOpened] = React.useState<boolean | null>(false);
  const [itemValue, setItemValue] = React.useState<number>(120);

  const calculateScore = () => {
    if (hasReceipt === null || withinWindow === null || isOpened === null) return null;

    if (withinWindow === false) {
      return {
        status: "danger",
        title: "Very Low Success Likelihood (15%)",
        color: "text-red-700 border-red-200 bg-red-50/90",
        recoverable: Math.round(itemValue * 0.15),
        message: "Most retailers strictly enforce the return window cutoff. Your best option is a manufacturer warranty claim (if defective) or peer-to-peer marketplace resale.",
      };
    }

    if (hasReceipt === true && isOpened === false) {
      return {
        status: "success",
        title: "99% Refund Success Guaranteed",
        color: "text-emerald-800 border-emerald-200 bg-emerald-50/90",
        recoverable: itemValue,
        message: "You satisfy all criteria. You are eligible for a 100% cash or card refund to your original payment method. Bring the card used at checkout!",
      };
    }

    if (hasReceipt === true && isOpened === true) {
      return {
        status: "success-medium",
        title: "85% Refund Success",
        color: "text-teal-dark border-teal-brand/30 bg-teal-50/90",
        recoverable: Math.round(itemValue * 0.95),
        message: "Having the original receipt satisfies almost all stores (like Target, Walmart, and Nike). Bring original packaging if available.",
      };
    }

    if (hasReceipt === false && isOpened === false) {
      return {
        status: "warning",
        title: "50% Exchange/Store Credit Success",
        color: "text-amber-900 border-amber-300 bg-amber-50/90",
        recoverable: Math.round(itemValue * 0.75),
        message: "Without a receipt, stores require photo ID verification. You will likely receive store credit for the lowest recent sale price.",
      };
    }

    return {
      status: "restricted",
      title: "Highly Restricted (Store Dependent - 25%)",
      color: "text-amber-900 border-amber-300 bg-amber-50/95",
      recoverable: Math.round(itemValue * 0.3),
      message: "An opened item with no receipt is the hardest return. Stores like Sephora can look it up via loyalty account; otherwise, restocking fees or rejection apply.",
    };
  };

  const scoreResult = calculateScore();

  return (
    <section className="border-t border-slate-200 bg-ink text-white py-16 relative overflow-hidden font-sans" id="consumer-advisory">
      {/* Decorative background grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      ></div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column - Informative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-teal-brand/20 border border-teal-brand/40 rounded-full px-3 py-1 text-xs font-semibold text-teal-light">
              <Scale className="h-3.5 w-3.5 text-teal-light" />
              <span>Consumer Protection Council</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-white">
              Know Your Rights:<br />
              <span className="text-teal-light font-semibold">The Consumer Refund Shield</span>
            </h2>
            
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl font-normal">
              Retail return policies aren't just polite favors - they are bound by strict state and international statutes. Under standard state guidelines, any store that fails to post its return terms conspicuously must legally offer full cash refunds within 30 days of purchase.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-teal-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Digital Lookup Access</h4>
                  <p className="text-xs text-white/70 mt-1 font-normal">
                    Major brands are legally mandated to allow purchase histories lookup using your card chip, loyalty ID, or payment tokens.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-teal-light shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Faulty Goods Guarantee</h4>
                  <p className="text-xs text-white/70 mt-1 font-normal">
                    Defective merchandise operates outside of standard store windows. Federal laws protect you against structural product failures.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              <Link href="/blog/return-policy-law-by-state">
                <Button variant="teal" className="text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer shadow-sm">
                  Read State Refund Laws
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="text-xs font-bold px-4 py-2.5 border-white/20 text-white hover:bg-white/10 rounded-xl cursor-pointer">
                  Our Mission
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Interactive Scorecard */}
          <div className="lg:col-span-6">
            <div className="bg-white text-ink rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xl space-y-5 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-teal-brand font-bold tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> 2026 Audit Engine
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">Refund Success Calculator</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setHasReceipt(true);
                    setWithinWindow(true);
                    setIsOpened(false);
                    setItemValue(120);
                  }}
                  className="text-slate-400 hover:text-slate-700 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {/* Item Value Slider */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold uppercase text-slate-700">Item Purchase Price:</span>
                    <span className="font-display font-bold text-teal-brand text-sm">${itemValue}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={itemValue}
                    onChange={(e) => setItemValue(Number(e.target.value))}
                    className="w-full accent-teal-brand cursor-pointer"
                  />
                </div>

                {/* Q1 */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-mono text-slate-600 uppercase font-bold">1. Do you have the receipt or payment card?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setHasReceipt(true)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        hasReceipt === true
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      Yes (Paper or Card)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasReceipt(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        hasReceipt === false
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      No Receipt / Paid Cash
                    </button>
                  </div>
                </div>

                {/* Q2 */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-mono text-slate-600 uppercase font-bold">2. Is it within the store return window?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWithinWindow(true)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        withinWindow === true
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      Yes, within limits
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithinWindow(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        withinWindow === false
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      Expired / Past window
                    </button>
                  </div>
                </div>

                {/* Q3 */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-mono text-slate-600 uppercase font-bold">3. Has the item been opened or used?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpened(false)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        isOpened === false
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      Unopened / Brand New
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOpened(true)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        isOpened === true
                          ? "bg-teal-brand text-white border-teal-brand shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:border-teal-brand/50 text-slate-700"
                      }`}
                    >
                      Opened / Lightly Tried
                    </button>
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
              {scoreResult && (
                <div className={`p-4 rounded-xl border flex flex-col gap-2.5 animate-in fade-in duration-200 ${scoreResult.color}`}>
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <div className="flex items-center gap-2">
                      {scoreResult.status === "danger" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-teal-brand shrink-0" />
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">{scoreResult.title}</span>
                    </div>
                    <span className="text-xs font-mono font-bold bg-white/80 px-2 py-0.5 rounded border border-black/10">
                      ~${scoreResult.recoverable} Recoverable
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium">{scoreResult.message}</p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Trending Keywords & Search Clusters (GEO / AEO / SEO Multiplier) */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-teal-light animate-pulse" />
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
              Trending Audits & High-Traffic Consumer Search Terms
            </h3>
          </div>
          <p className="text-xs text-white/70 max-w-2xl mb-8 leading-relaxed">
            Direct indexing of key legislative acts, secret store limits, and manufacturer loopholes queried across search platforms and Generative AI engines (ChatGPT, Grok, Perplexity):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Cat & Jack Baby Clothes Warranty", href: "/blog/target-return-policy-explained", tag: "Target 365 Days" },
              { label: "Walmart Receipt Lookup Tool", href: "/blog/walmart-return-policy-without-receipt", tag: "Debit/Credit Scan" },
              { label: "Costco 90-Day Electronics Cap", href: "/blog/costco-electronics-return-policy", tag: "Concierge Warranty" },
              { label: "Amazon Label-Free Whole Foods Return", href: "/blog/amazon-return-policy-guide", tag: "Unboxed QR Code" },
              { label: "Best Buy 15-Day Lock Restriction", href: "/blog/best-buy-return-policy-open-box", tag: "iCloud Reset" },
              { label: "Nike Run-Test Athlete Guarantee", href: "/blog/nike-return-policy-worn-shoes", tag: "Worn Shoe Policy" },
              { label: "California Civil Code § 1723", href: "/blog/return-policy-law-by-state", tag: "Refund Statutes" },
              { label: "New York General Business Law § 218-a", href: "/blog/return-policy-law-by-state", tag: "Conspicuous Posting" },
              { label: "The Retail Equation Consumer Score", href: "/blog/sephora-return-blacklist-retail-equation-guide", tag: "ID Ban History" },
              { label: "Sephora Opened Cosmetic Sanitation", href: "/blog/cosmetics-skincare-sanitization-testing-return-guide", tag: "Makeup Destruct" },
              { label: "Electronics Serial Number Tracking", href: "/blog/electronics-serial-number-tracking-policy", tag: "SNV Prevention" },
              { label: "Credit Card Refund Protections", href: "/blog/credit-card-return-protection-guide", tag: "Amex/Chase Shield" },
            ].map((keyword, idx) => (
              <Link key={idx} href={keyword.href} className="group block">
                <div className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-light rounded-lg transition-all duration-150 h-full flex flex-col justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-teal-light transition-colors line-clamp-2">
                    {keyword.label}
                  </span>
                  <span className="text-[9px] font-mono font-semibold text-white/40 group-hover:text-white/60 mt-2 block uppercase tracking-wide">
                    {keyword.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
