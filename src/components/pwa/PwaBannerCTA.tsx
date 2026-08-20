import React from "react";
import { usePWA } from "../../hooks/usePWA";
import { Download, Monitor, Smartphone, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../ui/button";

interface PwaBannerCTAProps {
  onOpenModal: (tab: "desktop" | "mobile") => void;
}

export function PwaBannerCTA({ onOpenModal }: PwaBannerCTAProps) {
  const { isMobile, isWindows, isInstalled, deferredPrompt, triggerInstall } = usePWA();

  if (isInstalled) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const success = await triggerInstall();
      if (!success) {
        onOpenModal(isMobile ? "mobile" : "desktop");
      }
    } else {
      onOpenModal(isMobile ? "mobile" : "desktop");
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-ink via-ink-900 to-red-900 p-6 md:p-8 text-white shadow-xl relative overflow-hidden font-sans border border-slate-700/50">
      <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-200 text-[10px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="h-3 w-3" />
            <span>Official Progressive Web App</span>
          </div>
          
          <h3 className="font-display text-2xl font-bold text-white">
            {isMobile
              ? "Install Mobile App for 1-Tap Policy Access at Store Counters"
              : "Install DSWReturnRefund App for Fast Offline Access"}
          </h3>
          
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {isMobile
              ? "Access 150+ store return guidelines, return window calculators, and receipt lookup advice directly from your phone home screen."
              : "Experience instant keyboard search, standalone app windowing, and complete offline store policy reference on your computer."}
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-red-200 pt-1">
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Offline Ready</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>100% Free & Fast</span>
            </span>
            <span className="flex items-center gap-1">
              {isMobile ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
              <span>{isMobile ? "iOS & Android" : "Chrome, Edge & Safari"}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
          <Button
            onClick={handleInstallClick}
            variant="teal"
            size="lg"
            className="w-full sm:w-auto font-bold text-xs md:text-sm shadow-lg flex items-center justify-center gap-2 py-3 px-6 rounded-xl"
          >
            <Download className="h-4 w-4" />
            <span>{isMobile ? "Install App on Phone" : "Install App"}</span>
          </Button>

          <Button
            onClick={() => onOpenModal(isMobile ? "mobile" : "desktop")}
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 border border-white/20 rounded-xl"
          >
            <span>Installation Guide</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
