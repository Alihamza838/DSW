import React from "react";
import { ShieldCheck, Info, ExternalLink, Lock } from "lucide-react";
import { AffiliateDisclosureModal } from "./AffiliateDisclosureModal";

interface AffiliateDisclosureProps {
  variant?: "card" | "compact" | "banner";
  className?: string;
}

export function AffiliateDisclosure({ variant = "card", className = "" }: AffiliateDisclosureProps) {
  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between text-[11px] text-slate-500 font-sans border-t border-slate-100 pt-2 ${className}`}>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-red-600 shrink-0" />
          <span>Independent Policy Audit • Zero markup for shoppers</span>
        </div>
        <AffiliateDisclosureModal />
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`bg-slate-900 text-slate-200 text-xs py-2.5 px-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans ${className}`}>
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Info className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong>Editorial Independence:</strong> Return policies & receipt rules are audited independently. Some outgoing product links are undergoing partner review.
          </span>
        </div>
        <AffiliateDisclosureModal />
      </div>
    );
  }

  // Default "card" variant
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 font-sans text-xs space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-red-50 text-red-800 border border-red-200 font-mono text-[10px] font-bold">
            FTC §255
          </span>
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
            Consumer Rights & Affiliate Link Transparency
          </h4>
        </div>
        <AffiliateDisclosureModal />
      </div>

      <p className="text-slate-600 text-xs leading-relaxed">
        <strong>dswReturnRefund</strong> is an independent retail policy directory. All return windows, receipt lookup rules, and restocking fee data are strictly researched for consumer accuracy. When you click on product or deal links, we may receive partner commission at <strong>no extra cost to you</strong>. Partner approvals for certain retailers remain under pending review.
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1 text-slate-800 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <ShieldCheck className="h-3 w-3 text-red-600" />
          <span>100% Free Shopper Access</span>
        </span>
        <span className="flex items-center gap-1">
          <Lock className="h-3 w-3 text-slate-400" />
          <span>No Inflated Prices</span>
        </span>
      </div>
    </div>
  );
}
