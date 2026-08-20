import * as React from "react";
import { 
  Receipt, 
  Calendar, 
  Gift, 
  Scale, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  ArrowLeftRight,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Cpu
} from "lucide-react";

export function ArticleBanner({ slug }: { slug: string }) {
  // Select matching premium visual based on slug
  const renderVisual = () => {
    switch (slug) {
      case "walmart-return-policy-without-receipt":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-amber-light/20 text-amber-brand px-2.5 py-0.5 rounded border border-amber-brand/30">Receipt Lookup Engine</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">No-Receipt Verification</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Digital card lookup, photo ID limits, and instant receipt recovery pathways.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-40 h-40">
              <div className="absolute inset-0 bg-[#2A6F77]/5 rounded-full border border-[#2A6F77]/10 animate-pulse"></div>
              <div className="relative p-6 bg-white border border-[#D6DCEA] rounded-xl shadow-md rotate-3 hover:rotate-0 transition-transform duration-300">
                <Receipt className="h-12 w-12 text-[#2A6F77]" />
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-10 bg-[#14213D]/20 rounded"></div>
                  <div className="h-1 w-16 bg-[#14213D]/20 rounded"></div>
                  <div className="h-1 w-12 bg-teal-brand/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "target-return-policy-explained":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2.5 py-0.5 rounded border border-[#2A6F77]/30">Standard 90-Day Loop</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">The 1-Year Guarantee</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">365-day return privileges on owned private labels and registry allowances.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-40 h-40">
              {/* Pulsing Target Bullseye */}
              <div className="w-24 h-24 rounded-full border-8 border-red-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "sephora-ulta-return-policy-compared":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-[#14213D]/10 text-[#14213D] px-2.5 py-0.5 rounded border border-[#14213D]/20">Gently Used Trial</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Beauty Returns Decoded</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Side-by-side comparison of Sephora's 60-day limits vs Ulta's rigid rules.</p>
            </div>
            <div className="relative hidden sm:flex gap-4 items-center">
              <div className="p-4 bg-white border border-[#D6DCEA] rounded-lg shadow-sm text-center -rotate-3 hover:rotate-0 transition-all">
                <span className="block text-xs font-bold text-[#14213D]">Sephora</span>
                <span className="block text-lg font-mono font-black text-[#2A6F77]">60d</span>
              </div>
              <div className="p-4 bg-white border border-[#D6DCEA] rounded-lg shadow-sm text-center rotate-3 hover:rotate-0 transition-all">
                <span className="block text-xs font-bold text-ink-600">Ulta</span>
                <span className="block text-lg font-mono font-black text-amber-brand">60d</span>
              </div>
            </div>
          </div>
        );

      case "holiday-return-policies-decoded":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-amber-light/20 text-amber-brand px-2.5 py-0.5 rounded border border-amber-brand/30">Extended Grace Window</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Holiday Extension Map</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Return purchases from Nov 1st all the way through Jan 31st without penalty.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 bg-red-500/5 rounded-full border border-red-500/10"></div>
              <Gift className="h-16 w-16 text-red-500 animate-bounce" />
            </div>
          </div>
        );

      case "return-policy-law-by-state":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2.5 py-0.5 rounded border border-[#2A6F77]/30">Statutory Rights</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">State Return Laws</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Detailed legal compliance frameworks for CA, NY, FL, and default fallback options.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 bg-[#2A6F77]/5 rounded-full border border-[#2A6F77]/10"></div>
              <Scale className="h-14 w-14 text-[#2A6F77]" />
            </div>
          </div>
        );

      case "sephora-return-blacklist-retail-equation-guide":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-red-500/10 text-red-500 px-2.5 py-0.5 rounded border border-red-500/30">Loss Prevention Registry</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">The Retail Equation (TRE)</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Inside Sephora's secret return-tracking software and driver's license scans.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 bg-red-500/5 rounded-full border border-red-500/10 animate-pulse"></div>
              <ShieldAlert className="h-14 w-14 text-red-500" />
            </div>
          </div>
        );

      case "cosmetics-skincare-sanitization-testing-return-guide":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-teal-brand px-2.5 py-0.5 rounded border border-teal-brand/30">Hygiene & Sustainability</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Cosmetic Return Audit</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Do opened lipsticks get sanitized? Inside cosmetic hazardous waste protocols.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 bg-teal-brand/5 rounded-full border border-teal-brand/10"></div>
              <Sparkles className="h-14 w-14 text-teal-brand animate-pulse" />
            </div>
          </div>
        );

      case "electronics-serial-number-tracking-policy":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-amber-light/20 text-amber-brand px-2.5 py-0.5 rounded border border-amber-brand/30">Serial Validation (SNV)</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Anti-Fraud Serial Tracking</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Why Costco and Best Buy scan computer microchip identifiers at returns.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <div className="absolute inset-0 bg-amber-brand/5 rounded-full border border-amber-brand/10"></div>
              <Cpu className="h-14 w-14 text-amber-brand" />
            </div>
          </div>
        );

      case "walmart-us-vs-canada-return-policy":
      case "target-us-vs-target-australia-different-companies":
      case "sephora-us-vs-canada-return-policy":
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2.5 py-0.5 rounded border border-[#2A6F77]/30">International Alert</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Cross-Border Divergence</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Why global brand logos do not mean global return rules. 14-day tech caps compared.</p>
            </div>
            <div className="relative hidden sm:flex items-center gap-2">
              <Globe className="h-12 w-12 text-[#2A6F77] animate-spin-slow" />
              <ArrowLeftRight className="h-5 w-5 text-[#14213D]/40" />
              <ShieldCheck className="h-10 w-10 text-amber-brand" />
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full flex items-center justify-between px-6 md:px-12">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase bg-teal-light/20 text-[#2A6F77] px-2.5 py-0.5 rounded border border-[#2A6F77]/30">Consumer Intelligence</span>
              <h4 className="font-display text-xl font-bold text-[#14213D]">Smart Refund Guide</h4>
              <p className="text-xs text-[#14213D]/70 max-w-xs">Protecting your hard-earned money with verified retailer return timetables.</p>
            </div>
            <div className="relative hidden sm:flex items-center justify-center w-36 h-36">
              <TrendingUp className="h-14 w-14 text-[#2A6F77]" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#FAF8F3] border border-[#D6DCEA] shadow-3xs mb-8 flex items-center">
      {/* Visual Dot Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-4 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#14213D 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      ></div>
      
      {/* Decorative colored accents */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-teal-light/10 to-transparent pointer-events-none"></div>
      
      {/* Visual render */}
      <div className="relative w-full h-full z-10">
        {renderVisual()}
      </div>
    </div>
  );
}
