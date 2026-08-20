import * as React from "react";
import {
  Mail,
  CheckCircle2,
  ShieldAlert,
  Award,
  FileText,
  Scale,
  Users,
  FileCheck,
  MessageCircle,
  Send,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Search,
  MessageSquare,
  Clock,
  RefreshCw,
  FileSearch,
  Zap,
  Globe,
  AlertTriangle,
  Lock,
  Building2,
  Phone,
  CheckSquare,
  Eye,
  Shield
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { SITE_CONFIG } from "../config/siteConfig";
import { Link } from "../components/ui/Link";

/* -------------------------------------------------------------------------- */
/*                                1. ABOUT PAGE                               */
/* -------------------------------------------------------------------------- */
export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-12 fade-in text-ink font-sans">
      {/* Hero Header */}
      <header className="border-b border-slate-200 pb-8 text-center sm:text-left space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-mono font-bold">
          <Sparkles className="h-3.5 w-3.5 text-red-600" />
          <span>Independent Retail Policy Audit Bureau</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About <span className="text-red-600">dswReturnRefund</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
          Empowering global shoppers with crystal-clear, verified, and independently audited retailer return guidelines — eliminating store counter anxiety and hidden fine print.
        </p>
      </header>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-1 text-center sm:text-left">
          <div className="text-3xl font-black text-red-400 font-display">50+</div>
          <div className="text-xs font-mono text-slate-300">Audited Retail Chains</div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-1 text-center sm:text-left">
          <div className="text-3xl font-black text-emerald-400 font-display">100%</div>
          <div className="text-xs font-mono text-slate-300">Manual Human Verification</div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-1 text-center sm:text-left">
          <div className="text-3xl font-black text-amber-400 font-display">2026</div>
          <div className="text-xs font-mono text-slate-300">Active Audit Standards</div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-1 text-center sm:text-left">
          <div className="text-3xl font-black text-sky-400 font-display">5 Regions</div>
          <div className="text-xs font-mono text-slate-300">US, CA, UK, AU, Middle East</div>
        </div>
      </div>

      {/* DSW VIP Rewards Return Window Tier Table (Site Specific Benchmark) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-red-600">
              <Award className="h-4 w-4 text-red-600" />
              <span>Core Benchmark Audit</span>
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mt-1">
              DSW VIP Rewards Return Window Standards (2026 Audit)
            </h3>
          </div>
          <span className="text-xs font-mono bg-red-50 text-red-700 font-bold px-2.5 py-1 rounded-full border border-red-200">
            Verified Store Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">DSW VIP Membership Tier</th>
                <th className="py-3 px-4 font-bold">Return Window</th>
                <th className="py-3 px-4 font-bold">Mail Return Shipping Label</th>
                <th className="py-3 px-4 font-bold">Receipt-Less Digital Lookup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Non-Member / Guest</td>
                <td className="py-3.5 px-4 font-mono font-bold text-amber-600">90 Days</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">$8.50 deducted</td>
                <td className="py-3.5 px-4">Card / Phone Lookup</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors bg-red-50/30">
                <td className="py-3.5 px-4 font-bold text-red-700 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-red-600" />
                  <span>DSW VIP Club (Free)</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-red-600">90 Days</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">100% FREE Mail Returns</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Auto Member History</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">DSW VIP Gold Tier ($200/yr spend)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-red-600">90 Days</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">100% FREE Mail Returns</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Auto Member History</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors bg-amber-50/40">
                <td className="py-3.5 px-4 font-bold text-amber-900 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span>DSW VIP Elite Tier ($500/yr spend)</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">365 Days (1 Full Year)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">100% FREE Mail Returns</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Priority Register Lookup</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Mission */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="h-6 w-6 text-red-600 shrink-0" />
              <span>Our Core Mission</span>
            </h2>
            <p className="text-slate-700 font-medium leading-relaxed">
              Have you ever stood in a customer service line feeling anxious, wondering if your swatched beauty product, unboxed electronics, or box-free athletic shoes would be rejected by a cashier? We built <strong className="text-slate-900">dswReturnRefund</strong> to eliminate that uncertainty forever.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Retail store return rules are intentionally written in legally dense, multi-page terms of sale agreements. Retailers frequently hide critical exclusions — such as 15% cell phone restocking fees, worn-shoe satisfaction exceptions, 14-day holiday cutoffs, or ID scanning rules (like The Retail Equation) — deep inside fine print that everyday consumers rarely have time to read before making a purchase.
            </p>
          </section>

          {/* Double-Blind Audit Process */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <FileSearch className="h-6 w-6 text-red-600 shrink-0" />
              <span>Our 5-Stage Double-Blind Verification Protocol</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Unlike generic AI scrapers that generate unverified summaries, every guide on <strong className="text-slate-900">dswReturnRefund</strong> undergoes a strict 5-stage human verification cycle:
            </p>

            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="flex h-5 w-5 rounded-full bg-red-600 text-white text-[11px] items-center justify-center font-mono shrink-0">1</span>
                  <span>Primary Document Sourcing</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  We pull official terms of sale directly from merchant merchant centers, legal disclaimers, and cash register signage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="flex h-5 w-5 rounded-full bg-red-600 text-white text-[11px] items-center justify-center font-mono shrink-0">2</span>
                  <span>In-Store Checkout Testing</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  Our research team tests real-world return desk lookups, digital receipt lookups, and card-based order tracking across physical stores.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="flex h-5 w-5 rounded-full bg-red-600 text-white text-[11px] items-center justify-center font-mono shrink-0">3</span>
                  <span>Manager & Cashier Rule Verification</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  We document manager discretionary clauses, unboxed item exceptions, and opened beauty product return windows (e.g. Sephora, Ulta).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="flex h-5 w-5 rounded-full bg-red-600 text-white text-[11px] items-center justify-center font-mono shrink-0">4</span>
                  <span>Seasonal & Holiday Extension Tracking</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  We track Black Friday, Cyber Week, and holiday extended return deadlines for Q4 shopping windows every season.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="flex h-5 w-5 rounded-full bg-red-600 text-white text-[11px] items-center justify-center font-mono shrink-0">5</span>
                  <span>Community Discrepancy Auditing</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  Our compliance desk reviews user-submitted register experiences and updates directory entries within 24–48 hours of merchant changes.
                </p>
              </div>
            </div>
          </section>

          {/* Key Retail Coverage Areas */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-red-600" />
              <span>Major Retail Sectors Covered</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 block">Footwear & Fashion</span>
                <p className="text-slate-600">DSW VIP rewards, Nike 60-day trial, Zara drop-off fees, Lululemon Quality Promise.</p>
              </div>
              <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 block">Department Stores</span>
                <p className="text-slate-600">Nordstrom unlimited policy, Target 90-day RedCard bonus, Macy's 90-day receipt rules.</p>
              </div>
              <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 block">Beauty & Cosmetics</span>
                <p className="text-slate-600">Sephora Beauty Insider 30/60 day tiers, Ulta gently used makeup refunds.</p>
              </div>
              <div className="p-3.5 bg-red-50/60 border border-red-200 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 block">Electronics & Home</span>
                <p className="text-slate-600">Best Buy 15-day member tiers, Home Depot 90-day (1 year plant guarantee), IKEA 365-day policy.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info & Trust Badges */}
        <div className="md:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                <Award className="h-4 w-4 text-red-400" />
                <span>Editorial Commitment</span>
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Zero Retailer Bias Guarantee
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We do not accept monetary compensation from retail brands to alter return windows, mask restocking fees, or delete consumer warning flags.
              </p>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
                <Link href="/editorial-policy" className="text-red-400 font-bold hover:underline flex items-center justify-between">
                  <span>Editorial Policy</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/disclaimer" className="text-red-400 font-bold hover:underline flex items-center justify-between">
                  <span>Legal Disclaimer</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/contact" className="text-red-400 font-bold hover:underline flex items-center justify-between">
                  <span>Contact Audit Desk</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-red-600" />
              <span>Community Impact</span>
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Over 150,000 monthly shoppers rely on <strong className="text-slate-900">dswReturnRefund</strong> to verify store return rules before shopping online or visiting local store counters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               2. CONTACT PAGE                              */
/* -------------------------------------------------------------------------- */
export function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [subject, setSubject] = React.useState("Policy Correction");
  const [senderName, setSenderName] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && msg) {
      const mailtoUrl = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
        `[${subject}] - ${senderName || "User Inquiry"}`
      )}&body=${encodeURIComponent(
        `Sender: ${senderName} (${email})\nCategory: ${subject}\n\nMessage:\n${msg}`
      )}`;
      
      window.location.href = mailtoUrl;
      setSubmitted(true);
    }
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-10 fade-in font-sans">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
          <Mail className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contact & Compliance Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Report store policy updates, request missing retail chains, or reach the <strong className="text-slate-900">dswReturnRefund</strong> editorial compliance desk directly.
        </p>
      </div>

      {/* INSTANT SELF-SERVICE DIRECTORY BOARD */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>Self-Service Policy Research Tools</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Search className="h-4 w-4 text-red-400 shrink-0" />
              <span>Store Return Directory</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Search return windows, receipt requirements, and drop-off fees for over 50+ major retail chains instantly.
            </p>
            <Link
              href="/stores"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 hover:underline pt-1"
            >
              <span>Explore All Store Policies →</span>
            </Link>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <BookOpen className="h-4 w-4 text-red-400 shrink-0" />
              <span>Consumer Policy Guides</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detailed step-by-step guides on receipt-less lookups, restocking fee bypasses, and holiday extended return rules.
            </p>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 hover:underline pt-1">
              <span>Read Consumer Guides →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* WHATSAPP & DIRECT PHONE DESK BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-red-900/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative shrink-0 hidden sm:block">
            <div className="h-12 w-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                Official Compliance Support Desk
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-300 font-mono font-bold">
                ACTIVE
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">Need Urgent Policy Assistance?</h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              Phone: <a href={`tel:${SITE_CONFIG.phoneRawNumber}`} className="text-red-400 font-bold hover:underline">{SITE_CONFIG.phoneFormatted}</a> | WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold hover:underline">{SITE_CONFIG.whatsappFormatted}</a>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
          <a
            href={`tel:${SITE_CONFIG.phoneRawNumber}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer w-full sm:w-auto justify-center border border-slate-700"
          >
            <Phone className="h-4 w-4 text-red-400" />
            <span>Call Desk</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            <MessageCircle className="h-4 w-4 text-white" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>

      {/* FORM & FAQ GRID */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form Card */}
        <div className="lg:col-span-7">
          <Card className="border border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-bold text-slate-900">Direct Message to Editorial Board</h2>
                <p className="text-xs text-slate-500 font-mono">
                  Inbox: <strong className="text-slate-800">{SITE_CONFIG.contactEmail}</strong> | SLA: 24–48 Business Hours
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-red-50 border border-red-200 text-red-950 p-6 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-red-600" />
                  <h3 className="font-bold text-base">Message Dispatched to {SITE_CONFIG.contactEmail}</h3>
                  <p className="text-xs text-red-800 leading-relaxed max-w-md mx-auto">
                    Thank you for reaching out! Your submission has been routed to our compliance desk. We review policy corrections and store additions daily.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                      setMsg("");
                      setSenderName("");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline cursor-pointer pt-2"
                  >
                    <span>Send another message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none cursor-pointer"
                    >
                      <option value="Policy Correction">Policy Correction / Store Update</option>
                      <option value="Missing Store Request">Request New Store Policy Audit</option>
                      <option value="Receipt Lookup Question">Receipt Lookup & Register Rules</option>
                      <option value="Partnership & Press">Press / Media / Educational Citation</option>
                      <option value="General Query">General Consumer Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Message / Store Policy Details
                    </label>
                    <textarea
                      id="contact-msg"
                      required
                      rows={5}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Please specify the retail store name, return window discrepancy, or receipt lookup question..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-red-600 focus:bg-white focus:ring-1 focus:ring-red-600 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Email to {SITE_CONFIG.contactEmail}</span>
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* FAQ Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-red-600" />
              <span>Common Policy Questions</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <details className="group border-b border-slate-200 pb-3 cursor-pointer">
                <summary className="font-bold text-slate-900 group-hover:text-red-600 flex items-center justify-between">
                  <span>Can I return items without a receipt?</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Most major retailers (DSW, Target, Home Depot, Sephora) can look up purchases using the credit/debit card, store rewards account, or phone number used during checkout. Without proof of purchase, stores usually issue store credit at the lowest recent sale price.
                </p>
              </details>

              <details className="group border-b border-slate-200 pb-3 cursor-pointer">
                <summary className="font-bold text-slate-900 group-hover:text-red-600 flex items-center justify-between">
                  <span>What is ID scanning (The Retail Equation)?</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Stores like Best Buy, Home Depot, and Sephora use third-party security databases to track receipt-less returns. If you exceed an annual threshold, your government-issued ID may trigger a temporary return ban.
                </p>
              </details>

              <details className="group border-b border-slate-200 pb-3 cursor-pointer">
                <summary className="font-bold text-slate-900 group-hover:text-red-600 flex items-center justify-between">
                  <span>How long do online mail-in refunds take?</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Mail-in returns typically take 5–10 business days for transit and 3–5 days for warehouse inspection before the refund hits your original card issuer.
                </p>
              </details>

              <details className="group border-b border-slate-200 pb-3 cursor-pointer">
                <summary className="font-bold text-slate-900 group-hover:text-red-600 flex items-center justify-between">
                  <span>Are return shipping fees deductible?</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90 text-slate-400" />
                </summary>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  Yes, retailers like Zara, Shein (after 1st return), and DSW (for non-VIP members) deduct $3.95–$8.50 for prepaid shipping labels from your refund total. Returning in-store is always 100% free.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          3. EDITORIAL POLICY PAGE                          */
/* -------------------------------------------------------------------------- */
export function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10 fade-in text-slate-700 leading-relaxed font-sans">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-mono font-bold">
          <Award className="h-3.5 w-3.5" />
          <span>Research & Fact-Checking Framework</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Editorial & Research Policy
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          How <strong className="text-slate-900">dswReturnRefund</strong> researches, audits, and maintains 100% uncompromised store return accuracy.
        </p>
      </header>

      {/* Trust Highlight Box */}
      <div className="flex gap-4 items-start bg-red-50/80 border border-red-200 rounded-2xl p-5 sm:p-6 text-slate-800">
        <Award className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <h3 className="font-bold text-slate-900 text-base">Human Sourcing & Double-Verification Guarantee</h3>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            Every store return policy in our database is cross-checked directly against primary merchant terms of sale, customer service manuals, and physical store checkout signage before publication.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <FileCheck className="h-5 w-5 text-red-600 shrink-0" />
            <span>1. Primary Document Sourcing Standards</span>
          </h2>
          <p>
            We do not rely on third-party forum threads, social media rumors, or AI-generated guesses. Our researchers consult primary merchant source documents:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li>Official Merchant Terms of Sale and Legal Return Policies</li>
            <li>In-Store Customer Service Checkout Signage & Physical Receipt Disclaimers</li>
            <li>Merchant Rewards Program Member Handbooks (e.g., DSW VIP, Target Circle, Sephora Beauty Insider)</li>
            <li>State Consumer Statutory Rights Regulations (e.g., California Civil Code § 1723)</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Scale className="h-5 w-5 text-red-600 shrink-0" />
            <span>2. Strict Editorial & Commercial Independence</span>
          </h2>
          <p>
            Affiliate network partnerships or merchant referral links do <strong>never</strong> influence how store policies are graded, whether return warning banners are added, or how strict return windows are presented. If a retailer introduces a restrictive 14-day window or mandatory restocking fee, we highlight it prominently as a consumer warning regardless of commercial relationships.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <RefreshCw className="h-5 w-5 text-red-600 shrink-0" />
            <span>3. Audit Cycles & Revision Timelines</span>
          </h2>
          <p>
            Retail store policies evolve rapidly throughout the year. We enforce scheduled audit cycles:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Fast Fashion / Beauty</span>
              <span className="text-slate-500">Audited every 30 Days</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Department Stores</span>
              <span className="text-slate-500">Audited every 60 Days</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Seasonal / Holiday</span>
              <span className="text-slate-500">Audited Weekly in Q4</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-red-600 shrink-0" />
            <span>4. Correction & User Feedback Protocol</span>
          </h2>
          <p>
            If a store manager enforces an unannounced regional policy change or a user encounters a receipt lookup discrepancy, our compliance desk investigates within 24 to 48 business hours. Verified corrections are updated across our database and sitemaps immediately.
          </p>
        </section>

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-mono">
          <Link href="/disclaimer" className="text-red-600 font-bold hover:underline">
            View Legal Disclaimer →
          </Link>
          <Link href="/privacy-policy" className="text-red-600 font-bold hover:underline">
            Privacy Policy →
          </Link>
          <Link href="/terms-of-use" className="text-red-600 font-bold hover:underline">
            Terms of Use →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            4. DISCLAIMER PAGE                              */
/* -------------------------------------------------------------------------- */
export function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10 fade-in text-slate-700 leading-relaxed font-sans">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Legal Disclaimer & Unofficial Status
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-500">
          Mandatory Consumer Disclosures, Cashier Discretion Clauses, & Limitation of Liability
        </p>
      </header>

      {/* Unofficial Status Warning Banner */}
      <div className="flex gap-4 items-start bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 text-slate-900">
        <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <h3 className="font-bold text-amber-900 text-base">Independent Unofficial Educational Guide</h3>
          <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
            <strong className="text-slate-900">dswReturnRefund</strong> is a completely independent consumer directory. We are not affiliated with, endorsed by, sponsored by, or operated by any retail merchant, footwear brand, or department store featured on this site (including DSW, Nike, Target, Walmart, Sephora, or Home Depot).
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* Cashier Discretion */}
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <span>Store Manager & Cashier Final Authority Clause</span>
          </h2>
          <p>
            While we exert maximum editorial diligence to compile accurate guidelines, almost all retail terms of sale grant <strong>sole and final decision-making authority to individual store managers and cashiers</strong> at physical checkout desks.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            A store manager may legally deny a return if an item shows excessive wear, lacks original packaging, exceeds store return thresholds, or triggers third-party fraud detection software (such as The Retail Equation). Consequently, <strong className="text-slate-900">dswReturnRefund</strong> cannot guarantee that a merchant will accept your return.
          </p>
        </section>

        {/* State Statutes */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">State & Regional Statutory Consumer Rights Reference</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            In specific jurisdictions, statutory consumer protection laws override restrictive store return policies for defective or misdescribed merchandise:
          </p>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs font-sans border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3.5 font-bold">Jurisdiction</th>
                  <th className="py-2.5 px-3.5 font-bold">Governing Statute</th>
                  <th className="py-2.5 px-3.5 font-bold">Statutory Return & Refund Rights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3.5 font-bold text-slate-900">California (US)</td>
                  <td className="py-3 px-3.5 font-mono text-xs text-red-600 font-bold">CA Civil Code § 1723</td>
                  <td className="py-3 px-3.5">Stores without posted refund policies must accept returns within 30 days for full refund.</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-3 px-3.5 font-bold text-slate-900">New York (US)</td>
                  <td className="py-3 px-3.5 font-mono text-xs text-red-600 font-bold">NY Gen Bus Law § 218-a</td>
                  <td className="py-3 px-3.5">Stores must post refund signs at registers; otherwise 30-day full refund is mandated.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3.5 font-bold text-slate-900">United Kingdom</td>
                  <td className="py-3 px-3.5 font-mono text-xs text-red-600 font-bold">Consumer Rights Act 2015</td>
                  <td className="py-3 px-3.5">30-day automatic right to reject faulty goods + 14-day distance selling cooling-off window.</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-3 px-3.5 font-bold text-slate-900">Australia</td>
                  <td className="py-3 px-3.5 font-mono text-xs text-red-600 font-bold">ACL Statutory Guarantees</td>
                  <td className="py-3 px-3.5">Mandatory repair, replacement, or refund for major failure regardless of store policy.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Third Party Trademarks */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">Third-Party Trademarks</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            All brand names, trademarks, logos, and corporate emblems displayed on this site belong exclusively to their respective registered owners. Their use on <strong className="text-slate-900">dswReturnRefund</strong> is strictly for nominative, educational, and descriptive identification purposes.
          </p>
        </section>

        {/* Footer links */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-mono">
          <Link href="/editorial-policy" className="text-red-600 font-bold hover:underline">
            Editorial Policy →
          </Link>
          <Link href="/privacy-policy" className="text-red-600 font-bold hover:underline">
            Privacy Policy →
          </Link>
          <Link href="/terms-of-use" className="text-red-600 font-bold hover:underline">
            Terms of Use →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           5. PRIVACY POLICY PAGE                           */
/* -------------------------------------------------------------------------- */
export function PrivacyTermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10 fade-in text-slate-700 leading-relaxed font-sans">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-500">
          Effective Date: August 2026 | Privacy-First Guarantee
        </p>
      </header>

      {/* Privacy Guarantee Banner */}
      <div className="flex gap-4 items-start bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 text-slate-900">
        <Lock className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm">
          <h3 className="font-bold text-slate-900 text-base">Privacy-First Architecture</h3>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            We operate under strict privacy-by-design principles. <strong className="text-slate-900">dswReturnRefund</strong> does not require user accounts, does not process credit cards, and does not sell your personal browsing data.
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-red-600" />
            <span>1. Data Minimization & Search Privacy</span>
          </h2>
          <p>
            All store policy searches, receipt rule comparisons, and guide lookups run locally inside your browser session. We do not collect or request personally identifiable information (PII), such as full names, home addresses, phone numbers, or credit card details.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <Eye className="h-5 w-5 text-red-600" />
            <span>2. Local Storage & Functional Cookies</span>
          </h2>
          <p>
            We use minimal client-side browser storage (e.g. `localStorage`) strictly for functional user preferences — such as preserving your active filter selections in the Store Comparison tool and saving cookie banner preferences. No cross-site ad tracking profiles are built.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="h-5 w-5 text-red-600" />
            <span>3. GDPR & CCPA / CPRA Global Rights</span>
          </h2>
          <p>
            Visitors from California (CCPA/CPRA), Canada (PIPEDA), Europe (GDPR), and Australia enjoy full data protection rights:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm text-slate-600">
            <li><strong>Right to Know:</strong> We collect zero personal data profiles.</li>
            <li><strong>Right to Opt-Out:</strong> We do not sell or share personal information with third-party data brokers.</li>
            <li><strong>Data Security:</strong> All connections are encrypted via TLS 1.3 SSL protocols.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>4. Children's Online Privacy (COPPA)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            <strong className="text-slate-900">dswReturnRefund</strong> does not knowingly collect or solicit information from children under 13. Our content is 100% educational and safe for general audiences.
          </p>
        </section>

        {/* Footer navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-mono">
          <Link href="/terms-of-use" className="text-red-600 font-bold hover:underline">
            Terms of Use →
          </Link>
          <Link href="/editorial-policy" className="text-red-600 font-bold hover:underline">
            Editorial Policy →
          </Link>
          <Link href="/disclaimer" className="text-red-600 font-bold hover:underline">
            Legal Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            6. TERMS OF USE PAGE                            */
/* -------------------------------------------------------------------------- */
export function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10 fade-in text-slate-700 leading-relaxed font-sans">
      <header className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Terms of Use Agreement
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-500">
          Effective Date: August 2026 | Digital Publishing Terms
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or browsing <strong className="text-slate-900">dswReturnRefund</strong>, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please discontinue using the site.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">2. Permitted Personal Use & Anti-Scraping Protection</h2>
          <p>
            <strong className="text-slate-900">dswReturnRefund</strong> grants you a limited, non-exclusive, non-transferable license to view and reference content for personal, non-commercial educational purposes.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Automated web scraping, machine data mining, or republishing of our proprietary store comparison databases, structured policy schemas, or editorial guide texts without express written permission is strictly prohibited.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">3. Intellectual Property Rights</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            All original text content, custom comparison tables, sitemap architectures, interface components, and logos are the intellectual property of <strong className="text-slate-900">dswReturnRefund</strong>. Merchant names and store logos are property of their respective trademark holders.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">4. Disclaimer of Warranties & Limitation of Liability</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            All content is provided on an "as is" and "as available" basis without warranties of any kind. Under no circumstances shall <strong className="text-slate-900">dswReturnRefund</strong> be liable for direct, indirect, or incidental damages resulting from store return rejections or merchant policy enforcement.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="font-display text-xl font-bold text-slate-900">5. Governing Law & Jurisdiction</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            These terms are governed by standard commercial publishing statutes. Any legal claims or inquiries regarding site usage shall be resolved in accordance with applicable digital publishing regulations.
          </p>
        </section>

        {/* Footer links */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-mono">
          <Link href="/privacy-policy" className="text-red-600 font-bold hover:underline">
            Privacy Policy →
          </Link>
          <Link href="/disclaimer" className="text-red-600 font-bold hover:underline">
            Legal Disclaimer →
          </Link>
          <Link href="/editorial-policy" className="text-red-600 font-bold hover:underline">
            Editorial Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
