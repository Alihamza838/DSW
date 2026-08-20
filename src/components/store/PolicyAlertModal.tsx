import React, { useState } from "react";
import { Bell, Check, X, Mail, ShieldCheck, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { Button } from "../ui/button";

interface PolicyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  storeSlug: string;
}

export function PolicyAlertModal({ isOpen, onClose, brandName, storeSlug }: PolicyAlertModalProps) {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState<"instant" | "holiday" | "monthly">("instant");
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    try {
      const existing = localStorage.getItem("rpf_policy_alerts") || "[]";
      const list = JSON.parse(existing);
      list.push({ email, storeSlug, brandName, frequency, date: new Date().toISOString() });
      localStorage.setItem("rpf_policy_alerts", JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-2xl p-6 sm:p-7 font-sans space-y-5 overflow-hidden">
        {/* Glowing Ambient Top Accent */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-teal-brand/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Close alert modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!subscribed ? (
          <>
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="relative p-3.5 bg-gradient-to-br from-teal-brand to-teal-dark text-white rounded-2xl shadow-md shadow-teal-brand/20">
                <Bell className="h-6 w-6 animate-bounce duration-1000" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-amber-400 rounded-full ring-2 ring-white animate-pulse" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-teal-brand bg-teal-brand/10 border border-teal-brand/20 px-2 py-0.5 rounded-md">
                  <Sparkles className="h-3 w-3" />
                  2026 Policy Watch
                </span>
                <h3 className="font-display font-bold text-xl text-ink tracking-tight mt-0.5">
                  {brandName} Policy Alerts
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-medium relative z-10">
              Never get caught off-guard by secret policy changes or restocking fee updates. We continuously monitor official <strong className="text-ink-900 font-bold">{brandName}</strong> return terms and notify you directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label htmlFor="alert-email" className="block text-[11px] font-mono font-bold uppercase text-ink-700 mb-1.5">
                  Your Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="alert-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-10 pr-3 py-2.5 text-xs sm:text-sm font-semibold text-ink focus:border-teal-brand focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-brand/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="alert-freq" className="block text-[11px] font-mono font-bold uppercase text-ink-700 mb-1.5">
                  Notification Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "instant", label: "Instant", desc: "Policy & Fee shifts" },
                    { id: "holiday", label: "Seasonal", desc: "Holiday extensions" },
                    { id: "monthly", label: "Monthly", desc: "Digest summary" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFrequency(opt.id as any)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        frequency === opt.id
                          ? "bg-teal-brand/10 border-teal-brand text-teal-dark font-bold shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-1 font-bold">
                        <Zap className={`h-3 w-3 ${frequency === opt.id ? "text-teal-brand" : "text-slate-400"}`} />
                        <span>{opt.label}</span>
                      </div>
                      <div className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-ink-500 font-sans bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-teal-brand shrink-0" />
                <span>Zero spam guarantee. Direct verification updates only. Unsubscribe anytime.</span>
              </div>

              <Button type="submit" variant="teal" className="w-full h-11 text-xs font-bold shadow-md shadow-teal-brand/20 rounded-2xl">
                Activate {brandName} Free Alerts
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-3 relative z-10">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-xl text-ink">Alert Successfully Activated!</h4>
            <p className="text-xs sm:text-sm text-ink-600 max-w-xs mx-auto leading-relaxed">
              We will notify you at <strong className="text-ink-900 underline">{email}</strong> if {brandName} modifies their return rules or fees.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

