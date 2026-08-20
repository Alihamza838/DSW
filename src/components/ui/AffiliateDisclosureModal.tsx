import * as React from "react";
import { ShieldCheck, Info, ExternalLink, X, CheckCircle2, Lock, ArrowRight, Award, FileText, Globe, AlertCircle } from "lucide-react";
import { Link } from "./Link";

export function AffiliateDisclosureModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"ftc" | "networks" | "guarantees">("ftc");

  return (
    <>
      {/* Footer / Sub-nav Disclosure Badge Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-ink-600 hover:text-teal-brand bg-paper-muted hover:bg-teal-brand/10 border border-ink-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs group"
        title="View Official FTC Affiliate & Price Protection Integrity Disclosure"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-teal-brand shrink-0 group-hover:scale-110 transition-transform" />
        <span>FTC Affiliate & Price Protection Disclosure</span>
        <Info className="h-3 w-3 text-ink-400 shrink-0" />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden font-sans text-ink-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D9488] text-white p-4 sm:p-6 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-500/20 rounded-xl text-teal-300 border border-teal-400/30 shrink-0">
                  <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-teal-400/20 text-teal-200 border border-teal-300/30 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                      FTC 16 CFR § 255 Verified
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-300">
                      • 2026 Audit
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                    Affiliate & Consumer Protection Disclosure
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    100% Free Consumer Rights & Price Protection Transparency
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close disclosure modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 font-mono text-xs font-bold">
              <button
                onClick={() => setActiveTab("ftc")}
                className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "ftc"
                    ? "border-teal-brand text-teal-dark font-extrabold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Zero Price Difference</span>
              </button>
              <button
                onClick={() => setActiveTab("guarantees")}
                className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "guarantees"
                    ? "border-teal-brand text-teal-dark font-extrabold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>Editorial Principles</span>
              </button>
              <button
                onClick={() => setActiveTab("networks")}
                className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "networks"
                    ? "border-teal-brand text-teal-dark font-extrabold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Partner Networks</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto font-sans text-xs sm:text-sm leading-relaxed grow">
              {activeTab === "ftc" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-teal-50/80 border border-teal-200/90 rounded-xl space-y-2">
                    <h4 className="font-bold text-teal-950 flex items-center gap-2 text-sm sm:text-base">
                      <Lock className="h-4 w-4 text-teal-600 shrink-0" />
                      <span>$0 Extra Cost - 100% Free For All Consumers</span>
                    </h4>
                    <p className="text-slate-700 text-xs sm:text-sm leading-normal">
                      When you click outbound store buy or check deal buttons on DSWReturnRefund, we may earn a referral commission from verified retailer affiliate networks.
                    </p>
                    <div className="pt-2 border-t border-teal-200/60 flex flex-wrap gap-2 text-[11px] text-teal-900 font-mono font-bold">
                      <span className="bg-white/90 px-2.5 py-1 rounded-md border border-teal-300/60 inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-teal-brand shrink-0" />
                        <span>Identical Retail Pricing</span>
                      </span>
                      <span className="bg-white/90 px-2.5 py-1 rounded-md border border-teal-300/60 inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-teal-brand shrink-0" />
                        <span>Full Merchant Return Windows</span>
                      </span>
                      <span className="bg-white/90 px-2.5 py-1 rounded-md border border-teal-300/60 inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-teal-brand shrink-0" />
                        <span>Full Card Refund Rights</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
                      FTC 16 CFR § 255 Regulatory Compliance Summary:
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      In accordance with the Federal Trade Commission guidelines concerning the use of endorsements and testimonials, we explicitly declare that material connections exist between DSWReturnRefund and the merchants referenced on this portal. Referral revenues sustain our independent 2026 store return policy research, receipt predictor algorithms, and location database.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 space-y-1">
                      <span className="font-bold block">100% Secure Direct Checkout Assurance</span>
                      <span>All transactions take place directly on official merchant domains (e.g., Target.com, Walmart.com, Nike.com, Amazon.com). DSWReturnRefund never requests or stores consumer financial or payment card data.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "guarantees" && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Our 4 Core Consumer Protection Commitments:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                        <span>Unbiased Policy Audits</span>
                      </div>
                      <p className="text-slate-600 text-[11px] sm:text-xs">
                        Retailers cannot pay to alter their 2026 return window grade or erase lost-receipt warning labels.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                        <span>Direct Official Links</span>
                      </div>
                      <p className="text-slate-600 text-[11px] sm:text-xs">
                        Outbound buy buttons redirect strictly to verified, HTTPS encrypted official merchant checkout portals.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                        <span>Full Warranty Rights</span>
                      </div>
                      <p className="text-slate-600 text-[11px] sm:text-xs">
                        Purchasing via affiliate links guarantees 100% of brand manufacturer warranties and store return windows.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0" />
                        <span>Global Market Parity</span>
                      </div>
                      <p className="text-slate-600 text-[11px] sm:text-xs">
                        Verified pricing and shipping eligibility badges match regional customer locations across US, CA, UK, AE, IN & PK.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "networks" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Authorized Retail Affiliate Networks:
                    </h4>
                    <p className="text-xs text-slate-600">
                      We maintain official publisher agreements with major verified affiliate networks:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs font-bold">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Amazon Associates
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Walmart Affiliate Program
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Target Circle Partner
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Rakuten Advertising
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Impact.com
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      CJ Affiliate
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Awin / ShareASale
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Daraz / Flipkart / Noon
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-center text-slate-800">
                      Temu / AliExpress / Shein
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <Link
                href="/blog/ftc-affiliate-disclosure-price-protection-guide"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-bold text-xs underline decoration-teal-300 underline-offset-2 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-teal-600" />
                <span>Read Full FTC Integrity & Protection Policy Guide</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm text-center"
              >
                I Understand & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
