import React, { useState } from "react";
import { usePWA } from "../../hooks/usePWA";
import { Download, Monitor, Smartphone, CheckCircle, Share, PlusSquare, X, ShieldCheck, Zap, WifiOff, Sparkles, Laptop, Command } from "lucide-react";
import { Button } from "../ui/button";
import { BrandLogoIcon } from "../ui/BrandLogo";

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "windows" | "mac" | "mobile";
}

export function PwaInstallModal({ isOpen, onClose, defaultTab }: PwaInstallModalProps) {
  const { isMobile, isIOS, isWindows, triggerInstall, isInstalled, deferredPrompt } = usePWA();
  const [activeTab, setActiveTab] = useState<"windows" | "mac" | "mobile">(
    defaultTab || (isMobile ? "mobile" : isWindows ? "windows" : "mac")
  );
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const installed = await triggerInstall();
      if (installed) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2200);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200/90 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Glowing Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-dark p-6 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-teal-brand/20 rounded-full blur-2xl pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-slate-900 border border-teal-500/40 text-white shadow-xl overflow-hidden p-2">
              <BrandLogoIcon variant="color" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-brand/20 text-teal-light text-[10px] font-mono font-bold tracking-wider uppercase mb-1 border border-teal-brand/30">
                <Sparkles className="h-3 w-3 text-teal-brand" />
                <span>Desktop & Mobile App</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Install DSWReturnRefund
              </h2>
            </div>
          </div>
        </div>

        {/* 3-Platform OS Tab Switcher */}
        <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/90 p-1.5 gap-1 text-xs">
          <button
            onClick={() => setActiveTab("windows")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold transition-all ${
              activeTab === "windows"
                ? "bg-white text-ink shadow-xs border border-slate-200/90"
                : "text-slate-500 hover:text-ink hover:bg-slate-100/60"
            }`}
          >
            <Monitor className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>Windows</span>
            {isWindows && <span className="h-2 w-2 rounded-full bg-teal-brand shrink-0" title="Your Current Device" />}
          </button>

          <button
            onClick={() => setActiveTab("mac")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold transition-all ${
              activeTab === "mac"
                ? "bg-white text-ink shadow-xs border border-slate-200/90"
                : "text-slate-500 hover:text-ink hover:bg-slate-100/60"
            }`}
          >
            <Laptop className="h-3.5 w-3.5 text-slate-800 shrink-0" />
            <span>macOS</span>
            {!isMobile && !isWindows && <span className="h-2 w-2 rounded-full bg-teal-brand shrink-0" title="Your Current Device" />}
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold transition-all ${
              activeTab === "mobile"
                ? "bg-white text-ink shadow-xs border border-slate-200/90"
                : "text-slate-500 hover:text-ink hover:bg-slate-100/60"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-teal-brand shrink-0" />
            <span>Mobile</span>
            {isMobile && <span className="h-2 w-2 rounded-full bg-teal-brand shrink-0" title="Your Current Device" />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto font-sans">
          {installSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-extrabold text-ink">App Successfully Installed!</h3>
              <p className="text-xs sm:text-sm text-ink-600">
                You can now launch DSWReturnRefund directly from your device home screen or application launcher.
              </p>
            </div>
          ) : isInstalled ? (
            <div className="text-center py-6 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-200">
                <CheckCircle className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-ink">App Currently Installed & Active</h3>
              <p className="text-xs text-ink-600 max-w-xs mx-auto">
                DSWReturnRefund is running as an installed app. You have offline access to store return policies and guides!
              </p>
              <Button onClick={onClose} variant="teal" className="w-full h-11 rounded-2xl font-bold shadow-xs">
                Continue Using App
              </Button>
            </div>
          ) : activeTab === "windows" ? (
            /* WINDOWS TAB */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-teal-brand font-mono flex items-center gap-1.5">
                    <Monitor className="h-4 w-4 text-blue-600" />
                    <span>Windows 11 / 10 App Perks</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">Chrome & Edge</span>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-xs text-ink-700 font-medium">
                  <li className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Instant Desktop Shortcut</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <WifiOff className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>Works Offline 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Zero PC Storage Overhead</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-3.5 w-3.5 text-teal-brand shrink-0" />
                    <span>Dedicated Window</span>
                  </li>
                </ul>
              </div>

              {deferredPrompt ? (
                <Button
                  onClick={handleInstallClick}
                  variant="teal"
                  className="w-full h-12 text-xs sm:text-sm font-bold shadow-md shadow-teal-brand/20 flex items-center justify-center gap-2 rounded-2xl"
                >
                  <Download className="h-4 w-4" />
                  <span>Install DSWReturnRefund App on Windows</span>
                </Button>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/90 text-xs text-amber-900 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Monitor className="h-4 w-4 text-amber-600" />
                    Manual 1-Click Installation (Windows Edge/Chrome):
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-ink-800">
                    <li>Click the <strong>Install App icon</strong> (computer screen icon with down arrow) in your top-right address bar.</li>
                    <li>Or open browser menu (<strong>⋮</strong>) → Select <strong>Install DSWReturnRefund...</strong></li>
                    <li>Click <strong>Install</strong> to add to your Windows Start menu and Taskbar.</li>
                  </ol>
                </div>
              )}
            </div>
          ) : activeTab === "mac" ? (
            /* MACOS TAB */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-teal-brand font-mono flex items-center gap-1.5">
                    <Laptop className="h-4 w-4 text-slate-800" />
                    <span>macOS App Experience</span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">Safari & Chrome</span>
                </div>
                <p className="text-xs text-ink-600 leading-relaxed font-medium">
                  Run DSWReturnRefund as a native macOS Dock app. Enjoy keyboard search shortcuts, retina clarity, and offline return window tracking.
                </p>
              </div>

              {deferredPrompt ? (
                <Button
                  onClick={handleInstallClick}
                  variant="teal"
                  className="w-full h-12 text-xs sm:text-sm font-bold shadow-md shadow-teal-brand/20 flex items-center justify-center gap-2 rounded-2xl"
                >
                  <Download className="h-4 w-4" />
                  <span>Install App on Mac</span>
                </Button>
              ) : (
                <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs text-ink space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Command className="h-4 w-4 text-teal-brand" />
                    <span>macOS Install Instructions:</span>
                  </div>
                  <ul className="space-y-2 text-ink-700">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">1</span>
                      <span><strong>Safari (Sonoma+):</strong> File → <strong>Add to Dock</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">2</span>
                      <span><strong>Chrome/Brave:</strong> Click address bar install icon <Download className="h-3.5 w-3.5 inline text-teal-brand" /> → Click <strong>Install</strong>.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* MOBILE (iOS & Android) TAB */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wide text-teal-brand font-mono flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile PWA Features</span>
                </h4>
                <p className="text-xs text-ink-600 leading-relaxed font-medium">
                  Access 150+ verified store return policies, return window countdowns, and receipt recovery guides directly from your phone home screen.
                </p>
              </div>

              {deferredPrompt ? (
                <Button
                  onClick={handleInstallClick}
                  variant="teal"
                  className="w-full h-12 text-xs sm:text-sm font-bold shadow-md shadow-teal-brand/20 flex items-center justify-center gap-2 rounded-2xl"
                >
                  <Download className="h-4 w-4" />
                  <span>Install Mobile Web App Now</span>
                </Button>
              ) : isIOS ? (
                <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-ink space-y-3">
                  <div className="flex items-center gap-2 font-bold text-teal-brand">
                    <Smartphone className="h-4 w-4" />
                    <span>iPhone & iPad Safari Instructions:</span>
                  </div>
                  <ol className="space-y-2.5 text-ink-700">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">1</span>
                      <span>Tap the <strong>Share</strong> button <Share className="h-3.5 w-3.5 inline-block text-blue-600" /> in Safari menu bar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">2</span>
                      <span>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="h-3.5 w-3.5 inline-block text-teal-brand" />.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">3</span>
                      <span>Tap <strong>Add</strong> in top-right corner. Done!</span>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-ink space-y-3">
                  <div className="flex items-center gap-2 font-bold text-teal-brand">
                    <Smartphone className="h-4 w-4" />
                    <span>Android Chrome Instructions:</span>
                  </div>
                  <ol className="space-y-2 text-ink-700">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">1</span>
                      <span>Tap browser menu (<strong>⋮</strong>) in top-right.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-brand text-[10px] font-bold text-white">2</span>
                      <span>Select <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
            <span>Standalone PWA Engine 2026</span>
          </span>
          <button onClick={onClose} className="text-red-600 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

