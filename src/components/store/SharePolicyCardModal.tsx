import React, { useState } from "react";
import { Share2, Copy, Check, X, ExternalLink, ShieldCheck } from "lucide-react";
import { StoreFrontmatter } from "../../types";
import { Button } from "../ui/button";

interface SharePolicyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: StoreFrontmatter;
}

export function SharePolicyCardModal({ isOpen, onClose, store }: SharePolicyCardModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!isOpen) return null;

  const storeUrl = `https://dswreturnrefund.com/stores/${store.slug}`;

  const summaryText = `${store.brand} Return Policy Summary (2026 Audit)
• Return Window: ${store.quickAnswer.returnWindow}
• Receipt Required: ${store.quickAnswer.receiptRequired ? "Yes (Card lookup accepted)" : "No / Easy lookup"}
• Refund Method: ${store.quickAnswer.refundMethod}
• Restocking Fee: ${store.quickAnswer.restockingFee}
• Verified Link: ${storeUrl}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${store.brand} Return Policy 2026`,
          text: `Verified 2026 return rules for ${store.brand}: ${store.quickAnswer.returnWindow} return window.`,
          url: storeUrl,
        });
      } catch (e) {
        console.log("Native share dismissed or failed", e);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-teal-brand text-white rounded-xl shadow-2xs">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-ink">
              Share {store.brand} Policy Rules
            </h3>
            <p className="text-xs text-ink-600">
              Send verified return guidelines to friends, family, or support chats
            </p>
          </div>
        </div>

        {/* Branded Summary Card Preview */}
        <div className="bg-gradient-to-br from-ink-900 via-ink to-teal-dark text-white rounded-2xl p-5 shadow-md space-y-4 border border-teal-500/30">
          <div className="flex justify-between items-start border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-light font-bold">
                DSWReturnRefund Audit
              </span>
              <h4 className="font-display text-xl font-bold text-white">
                {store.brand} Return Terms
              </h4>
            </div>
            <span className="text-xs font-mono bg-white/10 border border-white/20 text-teal-light px-2.5 py-1 rounded-full font-bold">
              2026 Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-[10px] font-mono text-paper-muted uppercase block">Return Window</span>
              <strong className="text-white text-sm">{store.quickAnswer.returnWindow}</strong>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-[10px] font-mono text-paper-muted uppercase block">Receipt Rules</span>
              <strong className="text-white text-sm">
                {store.quickAnswer.receiptRequired ? "Receipt / Card Lookup" : "Optional / Lookup"}
              </strong>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-[10px] font-mono text-paper-muted uppercase block">Refund Type</span>
              <strong className="text-white text-sm">{store.quickAnswer.refundMethod}</strong>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
              <span className="text-[10px] font-mono text-paper-muted uppercase block">In-Store Fee</span>
              <strong className="text-emerald-300 text-sm">$0.00 FREE</strong>
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-paper-muted border-t border-white/10 pt-2.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> verified source
            </span>
            <span>dswreturnrefund.com</span>
          </div>
        </div>

        {/* Copy / Share Actions */}
        <div className="space-y-2">
          {"share" in navigator && (
            <Button
              onClick={handleNativeShare}
              variant="teal"
              className="w-full h-11 text-xs font-bold gap-2 shadow-sm bg-teal-brand hover:bg-teal-dark text-white cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              <span>Share via App / Messages (Web Share API)</span>
            </Button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleCopySummary}
              variant={!("share" in navigator) ? "teal" : "outline"}
              className="w-full h-10 text-xs font-bold gap-2 shadow-2xs cursor-pointer"
            >
              {copiedSummary ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span>{copiedSummary ? "Summary Copied!" : "Copy Summary Text"}</span>
            </Button>

            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full h-10 text-xs font-bold gap-2 border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <ExternalLink className="h-4 w-4" />}
              <span>{copiedLink ? "Link Copied!" : "Copy Policy URL"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
