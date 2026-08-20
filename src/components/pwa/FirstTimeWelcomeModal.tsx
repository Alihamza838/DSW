import React, { useState, useEffect } from "react";
import { usePWA } from "../../hooks/usePWA";
import { Sparkles, Monitor, Smartphone, Download, X, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../ui/button";

interface FirstTimeWelcomeModalProps {
  onOpenFullInstallModal: (defaultTab: "windows" | "mac" | "mobile" | "desktop") => void;
}

export function FirstTimeWelcomeModal({ onOpenFullInstallModal }: FirstTimeWelcomeModalProps) {
  const { isMobile, isWindows, isStandalone, isInstalled, deferredPrompt, triggerInstall } = usePWA();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If running in PWA mode or already installed/dismissed recently, don't auto-show
    if (isStandalone || isInstalled) return;

    const dismissed = localStorage.getItem("rpf_welcome_seen_v2");
    if (!dismissed) {
      // Small delay for smooth entry after initial paint
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isStandalone, isInstalled]);

  const handleDismiss = () => {
    localStorage.setItem("rpf_welcome_seen_v2", "true");
    setIsVisible(false);
  };

  const handleInstallClick = async () => {
    localStorage.setItem("rpf_welcome_seen_v2", "true");
    setIsVisible(false);
    if (deferredPrompt) {
      const success = await triggerInstall();
      if (!success) {
        onOpenFullInstallModal(isMobile ? "mobile" : "desktop");
      }
    } else {
      onOpenFullInstallModal(isMobile ? "mobile" : "desktop");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Dim Backdrop */}
      <div
        className="fixed inset-0 bg-ink/75 backdrop-blur-md transition-opacity"
        onClick={handleDismiss}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Top Header Visual Accent */}
        <div className="bg-gradient-to-r from-ink via-ink-900 to-teal-dark p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-teal-brand/20 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-teal-light mb-3 shadow-inner">
            {isMobile ? <Smartphone className="h-7 w-7" /> : <Monitor className="h-7 w-7" />}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light/20 text-teal-light text-[10px] font-mono font-bold tracking-wider uppercase mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome First Time Visitor</span>
          </div>

          <h2 className="font-display text-2xl font-extrabold text-white leading-tight">
            {isMobile ? "Install DSWReturnRefund App" : "Install DSWReturnRefund App"}
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 max-w-xs mx-auto">
            {isMobile
              ? "Get 1-tap store return policy access right at checkout counters offline!"
              : "Experience instant policy search, offline guides, and standalone web app convenience."}
          </p>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-teal-brand">
                <Zap className="h-3.5 w-3.5" />
                <span>Instant Load</span>
              </div>
              <p className="text-[11px] text-ink-600">Opens in &lt; 0.2s as a standalone PWA</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-teal-brand">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Offline Search</span>
              </div>
              <p className="text-[11px] text-ink-600">150+ Store rules available without internet</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={handleInstallClick}
              variant="teal"
              className="w-full py-3 text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 rounded-xl"
            >
              <Download className="h-4 w-4" />
              <span>
                {isMobile ? "Install App on Phone" : "Install DSWReturnRefund App"}
              </span>
            </Button>

            <button
              onClick={handleDismiss}
              className="w-full py-2.5 text-xs text-ink-600 font-semibold hover:text-ink transition-colors flex items-center justify-center gap-1"
            >
              <span>Continue on Web Version</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
