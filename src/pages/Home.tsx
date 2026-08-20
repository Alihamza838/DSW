import * as React from "react";
import { useSEO } from "../hooks/useSEO";
import { Link } from "../components/ui/Link";
import { BreadcrumbNav } from "../components/ui/BreadcrumbNav";
import { ArticleImagePlaceholder } from "../components/article/ArticleImagePlaceholder";
import { ReportInaccuracy } from "../components/article/ReportInaccuracy";
import { AuthorBioCard } from "../components/article/AuthorBioCard";
import { SidebarTopStoresWidget, SidebarPopularGuidesWidget } from "../components/sidebar/SidebarInternalLinks";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Package,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  UserCheck,
  Gift,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Truck,
  Check,
  Calendar,
  ListOrdered
} from "lucide-react";

export function HomePage() {
  const dswFaqs = [
    {
      question: "What is DSW's return policy?",
      answer: "DSW allows returns for unworn merchandise in its original packaging within 60 days for non-VIP guests, 90 days for standard DSW VIP Club members, and 365 days for DSW VIP Elite tier members. In-store returns are 100% free, while mail returns are free for VIP members or cost $8.50 for guests."
    },
    {
      question: "How long is the DSW return window?",
      answer: "Non-VIP guests have 60 days from the purchase or delivery date to return items. Free DSW VIP Club and Gold members get 90 days. Top-tier DSW VIP Elite members enjoy a full 365-day return window."
    },
    {
      question: "Can I return shoes to DSW without a receipt?",
      answer: "Yes. If you made the purchase using your free DSW VIP account or a registered credit/debit card, store associates can look up your purchase in seconds. If no proof of purchase can be located, DSW may issue store credit at the current selling price after verifying your government-issued ID."
    },
    {
      question: "Can you return worn shoes to DSW?",
      answer: "Standard returns require shoes to be unworn and in resaleable condition with the original box. However, if the shoes exhibit a clear manufacturing defect under normal use (such as detached soles or broken stitching), DSW will issue a full replacement or refund."
    },
    {
      question: "Does DSW charge for online return shipping?",
      answer: "Mail returns are 100% FREE for all DSW VIP members (Club, Gold, and Elite). Guests who check out without signing into a VIP account will have an $8.50 shipping fee deducted from their refund. Returning online purchases to any physical DSW store is always 100% free for everyone."
    },
    {
      question: "What happens if I return items after the return window expires?",
      answer: "If you return unworn shoes with proof of purchase after your applicable window (60 or 90 days), DSW will issue a DSW merchandise credit rather than a refund to your original payment method."
    },
    {
      question: "Can I return clearance items to DSW?",
      answer: "Yes, standard clearance items (marked with red clearance tags) can be returned within your standard return window as long as they are unworn. Items explicitly stamped 'Final Sale' at checkout cannot be returned or exchanged."
    },
    {
      question: "How do gift returns work at DSW?",
      answer: "If you bring a gift receipt or gift order slip to DSW, you will receive a DSW merchandise credit for the full original purchase price. The gift giver will not be notified of the return."
    },
    {
      question: "What are the DSW VIP return perks?",
      answer: "DSW VIP membership is 100% free to join. VIP perks include extending your return window from 60 days to 90 days, free return shipping by mail, automatic digital receipt storage, and bonus points on every purchase."
    },
    {
      question: "Can I return shoes bought with Klarna, Afterpay, or PayPal to DSW?",
      answer: "Yes. If returned in-store with a receipt, refunds for Klarna, Afterpay, or PayPal orders are credited back to the original digital provider account or issued as store credit if returned past deadline."
    },
    {
      question: "What if I lost the original shoe box? Can I still return to DSW?",
      answer: "DSW policy requests the original shoe box. If you no longer have the box, bring the unworn shoes and receipt to a store. Store managers may accept the return for merchandise credit or apply a small repackaging deduction."
    },
    {
      question: "How do size or color exchanges work at DSW?",
      answer: "In-store exchanges are fast and 100% free. If exchanging for the same style in a different size or color, associates do a direct 1:1 swap. If exchanging by mail, re-order the desired size on dsw.com and send back the original pair."
    },
    {
      question: "Can I return an online dsw.com order at a physical DSW store?",
      answer: "Yes! In-store drop-off is the fastest and easiest way to return dsw.com orders. Bring your shoes, original packing slip or order confirmation email, and payment card to any store for an immediate refund with zero shipping fees."
    },
    {
      question: "How long does it take for DSW to credit my bank account or credit card?",
      answer: "In-store returns process immediately, with funds posting to your card within 3–5 business days. Mail returns take 5–7 business days to process once received at the warehouse, plus 2–4 days for bank processing."
    },
    {
      question: "What is DSW's extended holiday return window?",
      answer: "Items purchased between October 25 and December 25 are eligible for an extended holiday return period, allowing returns through January 31 of the following year or your standard return window, whichever is longer."
    },
    {
      question: "How does DSW handle defective footwear or shoe failure?",
      answer: "If shoes develop manufacturing defects under normal wear (detached soles, broken zippers, failed seams), bring them to any store. Managers inspect the defect and provide a full replacement or refund."
    },
    {
      question: "Can I return items bought with DSW VIP Rewards points or certificates?",
      answer: "Yes! If you return an item purchased using VIP reward certificates, the cash portion is refunded to your card and the reward points/certificates are re-credited back to your DSW VIP rewards balance."
    },
    {
      question: "Can I return DSW Canada purchases at US stores?",
      answer: "No. DSW US and DSW Canada operate as separate retail entities with independent inventory and register systems. Canadian purchases must be returned to Canadian stores or via DSW Canada's return portal."
    }
  ];

  useSEO({
    title: "DSW Return Policy (2026 Complete Guide) | dswReturnRefund",
    description: "Complete 2026 DSW return policy breakdown: 90 days for VIP members, 60 days for guests, and 365 days for Elite VIPs. Rules for unworn shoes, no-receipt returns, clearance, and online returns.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "DSW Return Policy (2026 Complete Guide)",
      "description": "Comprehensive guide to DSW's return policy including return windows, receipt lookups, worn shoe exceptions, clearance rules, and VIP perks.",
      "author": {
        "@type": "Person",
        "name": "Marcus Vance",
        "jobTitle": "Senior Retail Policy Analyst",
        "worksFor": {
          "@type": "Organization",
          "name": "dswReturnRefund"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "dswReturnRefund",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dswreturnrefund.com/images/logo.png"
        }
      },
      "datePublished": "2026-01-10",
      "dateModified": "2026-08-01",
      "mainEntityOfPage": "https://dswreturnrefund.com/"
    }
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dswFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const tocItems = React.useMemo(() => [
    { id: "return-window", title: "1. Return Window Policy" },
    { id: "without-receipt", title: "2. Returns Without Receipt" },
    { id: "online-returns", title: "3. Online Return Rules" },
    { id: "worn-shoes", title: "4. Worn Shoes Policy" },
    { id: "clearance-items", title: "5. Clearance & Final Sale" },
    { id: "refund-exchange", title: "6. Refund Timelines" },
    { id: "holiday-returns", title: "7. Extended Holiday Policy" },
    { id: "defective-items", title: "8. Defective Footwear" },
    { id: "gift-returns", title: "9. Gift Returns" },
    { id: "vip-rewards", title: "10. VIP Tier Benefits" },
    { id: "special-categories", title: "11. Special Product Categories" },
    { id: "competitor-comparison", title: "12. DSW vs Other Retailers" },
    { id: "how-to-return", title: "13. Step-by-Step & Pre-Store Checklist" },
    { id: "editorial-verification", title: "14. How We Verify Data" },
    { id: "final-thoughts", title: "15. Summary & Takeaways" },
    { id: "faq", title: "16. FAQs (18 Detailed Answers)" }
  ], []);

  const [activeSection, setActiveSection] = React.useState<string>("return-window");
  const [mobileTocOpen, setMobileTocOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -50% 0px", threshold: 0.1 }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      setMobileTocOpen(false);
    }
  };

  return (
    <article className="min-h-screen bg-slate-50/50 pb-20 pt-6 sm:pt-10 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header Card */}
        <header className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-red-600 to-rose-700" />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-50 text-red-800 border border-red-200">
              <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
              VERIFIED 2026 AUDIT
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Updated August 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            DSW Return Policy (2026 Complete Guide)
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            Returning shoes should be as simple and stress-free as buying them. Whether you ordered sneakers on dsw.com that didn&apos;t fit or purchased boots at your local warehouse without keeping the paper receipt, this guide breaks down DSW&apos;s exact return rules, deadlines, VIP benefits, clearance exceptions, and step-by-step return processes in one place.
          </p>

          {/* Main Article Hero Photo Slot #1 */}
          <ArticleImagePlaceholder
            src="/images/dsw-return-policy-hero-cover.png"
            alt="DSW Warehouse Footwear Display and Return Desk"
            caption="Figure 1.0: DSW Customer Service Return Desk: Shoppers can return or exchange shoes free of charge at any DSW warehouse store."
            badge="Main Hero Cover Image #1"
            className="my-6"
          />

          {/* Author Byline Header Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 flex-wrap gap-4 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-red-400 font-extrabold flex items-center justify-center text-sm border border-slate-700">
                MU
              </div>
              <div>
                <div className="font-bold text-slate-900">MALIK UMAR</div>
                <div className="text-slate-500 text-xs">Senior Retail Policy Analyst & Consumer Advocate</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs font-mono">
              <BookOpen className="h-3.5 w-3.5 text-red-600" />
              <span>8 Min Read</span>
            </div>
          </div>
        </header>

        {/* Quick Access Jump Links Row */}
        <section className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick Access Jump Links</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => scrollToSection("return-window")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <Clock className="h-3 w-3 text-red-400" />
              <span>Return Window</span>
            </button>
            <button
              onClick={() => scrollToSection("online-returns")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <Truck className="h-3 w-3 text-red-400" />
              <span>Online Returns</span>
            </button>
            <button
              onClick={() => scrollToSection("worn-shoes")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <span>Worn Shoes</span>
            </button>
            <button
              onClick={() => scrollToSection("holiday-returns")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <Gift className="h-3 w-3 text-red-400" />
              <span>Holiday Returns</span>
            </button>
            <button
              onClick={() => scrollToSection("without-receipt")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <FileCheck className="h-3 w-3 text-red-400" />
              <span>Without Receipt</span>
            </button>
          </div>
        </section>

        {/* Mobile Collapsible Sticky TOC Bar */}
        <div className="lg:hidden sticky top-16 z-30 mb-8">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-md">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-900 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ListOrdered className="h-4 w-4 text-red-600" />
                <span>Table of Contents</span>
                <span className="text-[11px] font-mono font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  Active: {tocItems.find((i) => i.id === activeSection)?.title || "Section"}
                </span>
              </div>
              <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform ${mobileTocOpen ? "rotate-90" : ""}`} />
            </button>

            {mobileTocOpen && (
              <div className="mt-3 pt-3 border-t border-slate-100 max-h-60 overflow-y-auto space-y-1">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-red-50 text-red-700 font-bold border-l-4 border-red-500"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.title}</span>
                      {isActive && <Check className="h-3.5 w-3.5 text-red-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Top 2-Column Row: Executive Summary + Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Executive Summary & Section 1 (Left 8 Columns) */}
          <div className="lg:col-span-8 min-w-0 space-y-8">
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                      EXECUTIVE SUMMARY
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      DSW Return Policy at a Glance
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-red-50 text-red-800 border border-red-200">
                    Verified 2026 Rules
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                        <th className="p-3 sm:p-4 rounded-tl-xl w-1/3">Policy Area</th>
                        <th className="p-3 sm:p-4 rounded-tr-xl w-2/3">Quick Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Return Window</td>
                        <td className="p-3 sm:p-4">
                          <strong className="text-slate-900">60 Days</strong> for Guests, <strong className="text-red-600">90 Days</strong> for DSW VIP Club, and <strong className="text-red-600">365 Days</strong> for VIP Elite tier.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Receipt Required</td>
                        <td className="p-3 sm:p-4">
                          Preferred (Paper receipt or Order Email). Free digital lookup via VIP phone number or credit card.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Item Condition</td>
                        <td className="p-3 sm:p-4">
                          Shoes must be <strong className="text-slate-900">unworn and resaleable</strong> in original box. Defective items eligible for replacement.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Online Orders</td>
                        <td className="p-3 sm:p-4">
                          Return 100% FREE at any DSW store, or by mail (FREE for VIPs, $8.50 fee for guests).
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Refund Method</td>
                        <td className="p-3 sm:p-4">
                          Refunded to original payment method, or DSW merchandise credit for gift/late returns.
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Exchanges</td>
                        <td className="p-3 sm:p-4 font-bold text-red-600">
                          100% Free in-store or online (Zero shipping or restocking fee).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 1. DSW Return Window Policy */}
            <section id="return-window" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="h-4 w-4" />
                <span>Section 1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Return Window Policy
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                DSW operates a tiered return window structure tied directly to your DSW VIP loyalty status. Non-member guest shoppers receive a standard <strong>60-day window</strong> from the date of purchase or order shipment. However, joining the free DSW VIP Club immediately extends your return period to <strong>90 days</strong>, while top-tier VIP Elite members enjoy an industry-leading <strong>365-day return window</strong>.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Customer Tier</th>
                      <th className="p-3 border border-slate-800">Standard Return Window</th>
                      <th className="p-3 border border-slate-800">Late Return Period (Store Credit)</th>
                      <th className="p-3 border border-slate-800">Mail Return Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Guest / Non-VIP</td>
                      <td className="p-3 font-semibold text-amber-700">60 Days</td>
                      <td className="p-3">61 – 365 Days</td>
                      <td className="p-3">$8.50 Fee (Free in-store)</td>
                    </tr>
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-red-900">DSW VIP Club (Free)</td>
                      <td className="p-3 font-bold text-red-600">90 Days</td>
                      <td className="p-3">91 – 365 Days</td>
                      <td className="p-3 font-bold text-red-600">FREE</td>
                    </tr>
                    <tr className="bg-red-50/50">
                      <td className="p-3 font-bold text-red-950">DSW VIP Gold</td>
                      <td className="p-3 font-bold text-red-600">90 Days</td>
                      <td className="p-3">91 – 365 Days</td>
                      <td className="p-3 font-bold text-red-600">FREE</td>
                    </tr>
                    <tr className="bg-red-100/50">
                      <td className="p-3 font-extrabold text-slate-950">DSW VIP Elite</td>
                      <td className="p-3 font-extrabold text-red-700">365 Days</td>
                      <td className="p-3 font-bold">Full Year Original Payment</td>
                      <td className="p-3 font-bold text-red-600">FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Managing DSW Return Windows:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Sign up for the free DSW VIP account at checkout to instantly gain an extra 30 days.</li>
                  <li>If you miss the 90-day cutoff, you can still return unworn footwear up to 365 days for DSW store credit.</li>
                  <li>Store credit never expires and can be redeemed in-store or online.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-return-policy-complete-guide"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read our deep-dive guide: DSW Return Window Rules & Late Return Options</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>
          </div>

          {/* Table of Contents & Internal Linking Sidebar (Right 4 Columns) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 self-start hidden lg:block space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                    <ListOrdered className="h-4 w-4 text-red-600" />
                    <span>Table of Contents</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {tocItems.length} Sections
                  </span>
                </div>

                <nav className="space-y-1">
                  {tocItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-red-50 text-red-700 font-extrabold border-l-4 border-red-500 shadow-2xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className={`font-mono text-[11px] ${isActive ? "text-red-600 font-bold" : "text-slate-400"}`}>
                            {index + 1}.
                          </span>
                          <span className="truncate">{item.title}</span>
                        </span>
                        {isActive && <ChevronRight className="h-3.5 w-3.5 text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-600 shrink-0" />
                  <span>Verified Retail Audit</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug font-sans">
                  Continuously updated against DSW legal terms and store register protocols.
                </p>
              </div>
            </div>

            {/* Sidebar Internal Linking Widget: Top Stores */}
            <SidebarTopStoresWidget limit={4} />
          </aside>
        </div>

        {/* Full-Width Main Stream (100% Width matching Header) */}
        <div className="w-full space-y-10">

            {/* Main Featured Photo Slot #2 */}
            <ArticleImagePlaceholder
              src="/images/dsw-return-policy-summary-guide.png"
              alt="DSW Return Policy Matrix Infographic and Shoe Box Setup"
              caption="Figure 2.0: DSW Return & Refund Policy Matrix Infographic: Keep original box and tags attached for instant store refunds."
              badge="Main Featured Image #2"
            />

            {/* 2. DSW Return Policy Without Receipt */}
            <section id="without-receipt" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <FileCheck className="h-4 w-4" />
                <span>Section 2</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Return Policy Without Receipt
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Losing a paper receipt does not automatically disqualify you from getting a refund at DSW. DSW registers can perform digital purchase lookups using your VIP rewards phone number, email address, or the debit/credit card used during checkout.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Return Scenario</th>
                      <th className="p-3 border border-slate-800">Lookup Method</th>
                      <th className="p-3 border border-slate-800">Refund Outcome</th>
                      <th className="p-3 border border-slate-800">Verification Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">VIP Account Purchase</td>
                      <td className="p-3">Phone number / Email lookup</td>
                      <td className="p-3 font-bold text-slate-900">Full Refund to Original Payment</td>
                      <td className="p-3 font-bold text-red-600">100% Guaranteed</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Credit / Debit Card Purchase</td>
                      <td className="p-3">Swipe physical card at register</td>
                      <td className="p-3 font-bold text-slate-900">Full Refund to Original Payment</td>
                      <td className="p-3 font-bold text-red-600">High Success</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Gift Without Receipt</td>
                      <td className="p-3">Gift receipt or recipient lookup</td>
                      <td className="p-3">DSW Merchandise Credit</td>
                      <td className="p-3 font-semibold text-red-600">Standard</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Unverified No-Receipt Return</td>
                      <td className="p-3">Valid Photo ID registration</td>
                      <td className="p-3">Store Credit at lowest recent price</td>
                      <td className="p-3 font-semibold text-amber-700">Manager Discretion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for No-Receipt Returns:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Always give your VIP phone number during checkout to guarantee 100% digital receipt tracking.</li>
                  <li>Bring a government-issued photo ID for any return missing a paper receipt.</li>
                  <li>Order confirmation emails on your phone count as official receipts at all DSW stores.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-return-policy-without-receipt"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read our full guide: How to Return Items to DSW Without a Receipt</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* 3. DSW Return Policy Online Returns */}
            <section id="online-returns" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Truck className="h-4 w-4" />
                <span>Section 3</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Return Policy Online Returns
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Orders placed on dsw.com can be returned either by dropping them off at any physical DSW warehouse store or by mailing them back using DSW&apos;s online return portal.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Return Method</th>
                      <th className="p-3 border border-slate-800">Return Shipping Fee</th>
                      <th className="p-3 border border-slate-800">Refund Processing Time</th>
                      <th className="p-3 border border-slate-800">Packaging Needed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-slate-900">In-Store Drop-off</td>
                      <td className="p-3 font-bold text-red-600">$0 (100% Free for all)</td>
                      <td className="p-3 font-bold text-slate-900">Instant at Register</td>
                      <td className="p-3">Original shoe box or bag</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Pre-Paid Mail (VIP Member)</td>
                      <td className="p-3 font-bold text-red-600">$0 (Free for VIPs)</td>
                      <td className="p-3">7–10 Business Days</td>
                      <td className="p-3">Outer shipping box required</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Pre-Paid Mail (Guest Non-VIP)</td>
                      <td className="p-3 font-bold text-amber-700">$8.50 Fee Deducted</td>
                      <td className="p-3">7–10 Business Days</td>
                      <td className="p-3">Outer shipping box required</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Online Returns:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Drop off online orders at a local DSW store to avoid the $8.50 fee and get your refund instantly.</li>
                  <li>Reuse the original cardboard shipping carton when mailing back items.</li>
                  <li>Save your carrier drop-off tracking receipt until the credit appears in your bank statement.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-avoid-return-shipping-fee"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read our guide: How to Avoid DSW Online Return Shipping Fees</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* 4. DSW Worn Shoes Return Policy */}
            <section id="worn-shoes" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Section 4</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Worn Shoes Return Policy
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Like most major footwear retailers, DSW requires returned shoes to be in unworn, resaleable condition with the original packaging. Shoes worn outdoors that show scuffed outsoles or creased leather cannot be returned for a change of mind.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Shoe Condition</th>
                      <th className="p-3 border border-slate-800">Return Eligible?</th>
                      <th className="p-3 border border-slate-800">Action & Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-slate-900">Tried on indoors on carpet</td>
                      <td className="p-3 font-bold text-red-600">YES</td>
                      <td className="p-3">Full Refund to Original Payment</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Worn outdoors / Scuffed soles</td>
                      <td className="p-3 font-bold text-rose-700">NO</td>
                      <td className="p-3 font-semibold text-rose-700">Non-Returnable (Unless Defective)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Missing original shoe box</td>
                      <td className="p-3 font-bold text-red-600">YES (with box fee)</td>
                      <td className="p-3">Store credit or refund minus box adjustment</td>
                    </tr>
                    <tr className="bg-red-50/50">
                      <td className="p-3 font-bold text-slate-900">Manufacturing Defect (Sole split, seam tear)</td>
                      <td className="p-3 font-bold text-red-700">YES (Defect Clause)</td>
                      <td className="p-3 font-bold text-red-700">Full Replacement or Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Trying On New DSW Shoes:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Always try on new shoes indoors on clean carpet to test fit and comfort.</li>
                  <li>Keep the original branded shoe box until you are 100% certain you will keep them.</li>
                  <li>Wipe light indoor dust off outsoles before bringing them into a store.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-shoes-return-policy"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read detailed breakdown: Can You Return Worn Shoes to DSW?</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* Photo Placeholder Slot 2 */}
            <ArticleImagePlaceholder
              src="/images/dsw-instore-counter-return.png"
              alt="DSW Store Customer Service Counter and Register Lookup"
              caption="Figure 2: DSW In-Store Customer Service Desk: Associates lookup paperless receipts instantly using your phone number or credit card."
              badge="DSW Photo Guide Slot #2"
            />

            {/* 5. DSW Return Policy Clearance Items */}
            <section id="clearance-items" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <RotateCcw className="h-4 w-4" />
                <span>Section 5</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Return Policy Clearance Items
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                DSW clearance merchandise (red clearance tags or yellow price stickers) IS eligible for return under standard 60/90 day return windows, UNLESS the item is explicitly marked as &quot;Final Sale&quot; at checkout.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Clearance Tag Type</th>
                      <th className="p-3 border border-slate-800">Returnable?</th>
                      <th className="p-3 border border-slate-800">Return Window</th>
                      <th className="p-3 border border-slate-800">Refund Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-slate-900">Standard Clearance (Red Tag)</td>
                      <td className="p-3 font-bold text-red-600">YES</td>
                      <td className="p-3">60–90 Days</td>
                      <td className="p-3">Original Payment Method</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Final Sale (Marked at register)</td>
                      <td className="p-3 font-bold text-rose-700">NO</td>
                      <td className="p-3 font-semibold text-rose-700">Non-Returnable</td>
                      <td className="p-3 font-semibold text-rose-700">Final Sale (No Refund)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">BOGO Promotional Clearance</td>
                      <td className="p-3 font-bold text-red-600">YES</td>
                      <td className="p-3">60–90 Days</td>
                      <td className="p-3">Prorated BOGO Refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Clearance Purchases:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Check your printed paper receipt: if an item says &quot;FINAL SALE&quot;, it cannot be returned or exchanged.</li>
                  <li>Clearance items returned after 90 days receive DSW store credit at the item&apos;s current price.</li>
                  <li>Returning one pair from a BOGO deal recalculates the refund based on the remaining item&apos;s full price.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-return-policy-complete-guide"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read complete guide: DSW Clearance & Final Sale Rules</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

            {/* 6. DSW Refund & Exchange Policy */}
            <section id="refund-exchange" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <RefreshCw className="h-4 w-4" />
                <span>Section 6</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                DSW Refund & Exchange Policy
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Refund processing times depend on your original payment method. In-store returns are processed immediately, while mail returns take 5–10 business days after reaching the fulfillment warehouse.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Original Payment Method</th>
                      <th className="p-3 border border-slate-800">In-Store Refund Speed</th>
                      <th className="p-3 border border-slate-800">Mail Return Processing Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Credit Card (Visa/MC/Amex)</td>
                      <td className="p-3 font-semibold text-red-600">2–5 Business Days</td>
                      <td className="p-3">5–10 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Debit Card</td>
                      <td className="p-3 font-semibold text-red-600">1–3 Business Days</td>
                      <td className="p-3">5–10 Business Days</td>
                    </tr>
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-red-900">DSW Gift Card / VIP Points</td>
                      <td className="p-3 font-bold text-red-600">Instant eGift Card</td>
                      <td className="p-3 font-bold text-red-600">24–48 Hours</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">PayPal / Klarna / Afterpay</td>
                      <td className="p-3">3–5 Business Days</td>
                      <td className="p-3">7–10 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Cash Payment</td>
                      <td className="p-3 font-bold text-red-600">Immediate Cash at Register</td>
                      <td className="p-3">Check mailed (for cash over $200)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Exchanges & Refunds:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Exchanges at DSW never carry return shipping fees or restocking fees.</li>
                  <li>If you paid with Klarna or Afterpay, bring the virtual card number from your app to the store register.</li>
                  <li>VIP reward points redeemed on returned items are re-credited to your account balance automatically.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/blog/dsw-return-policy-with-receipt"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
                >
                  <span>Read complete guide: DSW Refund Timelines & Payment Method Rules</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </section>

          {/* 7. DSW Holiday Returns Policy */}
          <section id="holiday-returns" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Gift className="h-4 w-4" />
              <span>Section 7</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              DSW Extended Holiday Return Policy
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              During the annual holiday shopping period (typically purchases made between November 1 and December 24), DSW extends its return deadlines so holiday shoe gifts can be safely exchanged or returned in January.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800">Purchase Window</th>
                    <th className="p-3 border border-slate-800">Standard Return Deadline</th>
                    <th className="p-3 border border-slate-800">Extended Holiday Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Nov 1 – Dec 24 (Guest)</td>
                    <td className="p-3">60 Days</td>
                    <td className="p-3 font-bold text-red-600">Extended through January 31</td>
                  </tr>
                  <tr className="bg-red-50/30">
                    <td className="p-3 font-bold text-red-900">Nov 1 – Dec 24 (VIP Member)</td>
                    <td className="p-3">90 Days</td>
                    <td className="p-3 font-bold text-red-600">Extended through January 31 or 90 days</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-bold text-red-950">Nov 1 – Dec 24 (VIP Elite)</td>
                    <td className="p-3">365 Days</td>
                    <td className="p-3 font-bold text-red-700">Full 365 Days from purchase</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" />
                <span>Pro Tips for Holiday Shoe Gifts:</span>
              </h3>
              <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Always ask for a gift receipt at checkout when buying holiday footwear gifts.</li>
                <li>Keep original shoe boxes intact until after the holiday season.</li>
                <li>Visit DSW stores early in January to avoid peak holiday return register lines.</li>
              </ul>
            </div>
          </section>

          {/* 8. DSW Return Policy Defective Items */}
          <section id="defective-items" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Section 8</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              DSW Return Policy Defective Items
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              While normal wear-and-tear is not returnable, DSW stands behind product quality. Footwear with clear manufacturing flaws or structural defects under reasonable use is eligible for a full replacement or refund.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800">Issue Type</th>
                    <th className="p-3 border border-slate-800">Covered as Defect?</th>
                    <th className="p-3 border border-slate-800">Action Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-red-50/40">
                    <td className="p-3 font-bold text-slate-900">Sole separation / Delamination</td>
                    <td className="p-3 font-bold text-red-600">YES</td>
                    <td className="p-3 font-bold text-red-700">Full replacement or refund</td>
                  </tr>
                  <tr className="bg-red-50/40">
                    <td className="p-3 font-bold text-slate-900">Broken zipper or eyelet tear</td>
                    <td className="p-3 font-bold text-red-600">YES</td>
                    <td className="p-3 font-bold text-red-700">Full replacement or refund</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Scuffed toe / Normal outsole wear</td>
                    <td className="p-3 font-bold text-rose-700">NO</td>
                    <td className="p-3">Standard 60/90 day window applies</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Water damage / Improper care</td>
                    <td className="p-3 font-bold text-rose-700">NO</td>
                    <td className="p-3 font-semibold text-rose-700">Non-returnable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" />
                <span>Pro Tips for Defective Items:</span>
              </h3>
              <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Take clear photos of the manufacturing defect before bringing the shoes into the store.</li>
                <li>Speak directly to a store manager for faster resolution on defective footwear.</li>
                <li>Genuine manufacturing flaws can bypass standard return deadlines at manager discretion.</li>
              </ul>
            </div>
          </section>

          {/* 9. DSW Gift Returns Policy */}
          <section id="gift-returns" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Gift className="h-4 w-4" />
              <span>Section 9</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              DSW Gift Returns Policy
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Received a gift from DSW that doesn&apos;t fit or match your style? DSW allows gift recipients to return or exchange footwear privately without notifying the original gift giver.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800">Proof Brought</th>
                    <th className="p-3 border border-slate-800">Refund Type</th>
                    <th className="p-3 border border-slate-800">Gift Giver Notified?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-red-50/30">
                    <td className="p-3 font-bold text-slate-900">Gift Receipt</td>
                    <td className="p-3 font-bold text-red-700">DSW Merchandise Credit</td>
                    <td className="p-3 font-bold text-red-600">NO (Completely Private)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Order Number / Shipping Slip</td>
                    <td className="p-3 font-bold text-red-700">DSW Merchandise Credit</td>
                    <td className="p-3 font-bold text-red-600">NO (Completely Private)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">No Receipt / No Order #</td>
                    <td className="p-3">Store Credit at current lowest price</td>
                    <td className="p-3 font-bold text-red-600">NO</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" />
                <span>Pro Tips for Gift Returns:</span>
              </h3>
              <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Gift receipts guarantee you get the full original purchase price as merchandise credit.</li>
                <li>You can exchange a gift directly for a different size of the same style without price adjustments.</li>
                <li>DSW merchandise credit never expires and can be redeemed in-store or online.</li>
              </ul>
            </div>
          </section>

          {/* 10. DSW Return Policy VIP Rewards */}
          <section id="vip-rewards" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Section 10</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              DSW Return Policy VIP Rewards
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              The DSW VIP rewards program is 100% free to join and significantly enhances your return privileges. Below is a breakdown of return benefits across all three VIP membership tiers.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800">VIP Tier</th>
                    <th className="p-3 border border-slate-800">Annual Spend</th>
                    <th className="p-3 border border-slate-800">Return Window</th>
                    <th className="p-3 border border-slate-800">Mail Return Shipping Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-red-50/30">
                    <td className="p-3 font-bold text-red-900">VIP Club</td>
                    <td className="p-3 font-bold text-red-600">$0 (Free Signup)</td>
                    <td className="p-3 font-bold text-red-600">90 Days</td>
                    <td className="p-3 font-bold text-red-600">FREE</td>
                  </tr>
                  <tr className="bg-red-50/50">
                    <td className="p-3 font-bold text-red-950">VIP Gold</td>
                    <td className="p-3 font-semibold">$200 / year</td>
                    <td className="p-3 font-bold text-red-600">90 Days</td>
                    <td className="p-3 font-bold text-red-600">FREE</td>
                  </tr>
                  <tr className="bg-red-100/50">
                    <td className="p-3 font-extrabold text-slate-950">VIP Elite</td>
                    <td className="p-3 font-semibold">$500 / year</td>
                    <td className="p-3 font-extrabold text-red-700">365 Days</td>
                    <td className="p-3 font-bold text-red-600">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-500" />
                <span>Pro Tips for DSW VIP Members:</span>
              </h3>
              <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Sign up for a free VIP account before checking out to unlock free return shipping on all online orders.</li>
                <li>VIP Elite members get a full 365 days for returns with zero shipping fees.</li>
                <li>Purchases made with VIP rewards points re-credit your points balance upon return.</li>
              </ul>
            </div>
          </section>

          {/* Photo Placeholder Slot 3 */}
          <ArticleImagePlaceholder
            src="/images/dsw-vip-rewards-label-return.png"
            alt="DSW VIP Rewards Member Prepaid Return Label and Package Setup"
            caption="Figure 3: Free VIP Prepaid Shipping Label Setup: DSW VIP members generate free FedEx return labels online to ship mail returns with zero fees."
            badge="DSW Photo Guide Slot #3"
          />

          {/* 11. Special Product Categories & Rules */}
          <section id="special-categories" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Package className="h-4 w-4" />
              <span>Section 11</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Special Product Categories & Return Rules
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              While standard footwear follows DSW&apos;s general 60 to 90-day rules, specific merchandise categories have targeted return requirements:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800 w-1/4">Category</th>
                    <th className="p-3 border border-slate-800 w-1/4">Return Condition</th>
                    <th className="p-3 border border-slate-800 w-1/4">Eligible Window</th>
                    <th className="p-3 border border-slate-800">Special Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Handbags & Backpacks</td>
                    <td className="p-3">Unused with security tags intact</td>
                    <td className="p-3 font-semibold text-red-600">60 / 90 / 365 Days</td>
                    <td className="p-3 text-xs">Must include dust bags & original straps</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Socks & Insoles / Orthotics</td>
                    <td className="p-3">Unopened original packaging</td>
                    <td className="p-3 font-semibold text-red-600">60 / 90 Days</td>
                    <td className="p-3 text-xs">Hygiene rules restrict opened socks</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Luxury & Designer Footwear</td>
                    <td className="p-3">Unworn, undamaged soles</td>
                    <td className="p-3 font-semibold text-red-600">Standard VIP Window</td>
                    <td className="p-3 text-xs">Must include designer box & authenticity cards</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">Final Sale Clearance</td>
                    <td className="p-3 font-bold text-red-600">NOT Returnable</td>
                    <td className="p-3 font-bold text-red-600">0 Days</td>
                    <td className="p-3 text-xs">Explicitly stamped &apos;Final Sale&apos; on receipt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 12. DSW Return Policy vs Other Retailers */}
          <section id="competitor-comparison" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <RotateCcw className="h-4 w-4" />
              <span>Section 12</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              DSW vs Other Shoe Retailers (2026 Comparison)
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              How does DSW&apos;s return policy stack up against major retail shoe competitors? Below is a quick comparative breakdown:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800">Retailer</th>
                    <th className="p-3 border border-slate-800">Return Window</th>
                    <th className="p-3 border border-slate-800">Mail Return Fee</th>
                    <th className="p-3 border border-slate-800">In-Store Returns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-red-50/50 font-bold">
                    <td className="p-3 text-red-900 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0" />
                      <span>DSW (Designer Shoe Warehouse)</span>
                    </td>
                    <td className="p-3 text-red-600">90 Days (365 for Elite VIP)</td>
                    <td className="p-3 text-emerald-700">FREE for VIPs ($8.50 Guest)</td>
                    <td className="p-3 text-emerald-700">100% Free</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">Famous Footwear</td>
                    <td className="p-3">30 Days</td>
                    <td className="p-3 text-slate-600">$7.95 Shipping Fee</td>
                    <td className="p-3 text-emerald-700">100% Free</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">Zappos</td>
                    <td className="p-3 font-semibold text-emerald-700">365 Days</td>
                    <td className="p-3 text-emerald-700">FREE Mail Shipping</td>
                    <td className="p-3 text-slate-500">Mail Only (No Stores)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">Foot Locker</td>
                    <td className="p-3">45 Days</td>
                    <td className="p-3 text-slate-600">$6.99 Shipping Fee</td>
                    <td className="p-3 text-emerald-700">100% Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 13. How to Return Items to DSW */}
          <section id="how-to-return" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <ListOrdered className="h-4 w-4" />
              <span>Section 13</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              How to Return Items to DSW (Step-by-Step)
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Follow this clear step-by-step process to ensure a smooth, fast return or exchange at DSW.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                    <th className="p-3 border border-slate-800 w-16">Step #</th>
                    <th className="p-3 border border-slate-800 w-1/3">Action Required</th>
                    <th className="p-3 border border-slate-800">Details & Best Practices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-mono font-bold text-red-600 bg-slate-50">Step 1</td>
                    <td className="p-3 font-bold text-slate-900">Inspect Footwear</td>
                    <td className="p-3">Ensure shoes are clean, unworn, and placed inside the original branded shoe box.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-red-600 bg-slate-50">Step 2</td>
                    <td className="p-3 font-bold text-slate-900">Gather Proof of Purchase</td>
                    <td className="p-3">Locate paper receipt, email order confirmation, or VIP account phone number.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-red-600 bg-slate-50">Step 3</td>
                    <td className="p-3 font-bold text-slate-900">Select Return Channel</td>
                    <td className="p-3">Choose FREE In-Store Drop-off or log into dsw.com for a pre-paid mail label.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-red-600 bg-slate-50">Step 4</td>
                    <td className="p-3 font-bold text-slate-900">Receive Refund / Exchange</td>
                    <td className="p-3">Get an instant refund or exchange in-store, or wait 5–7 days for mail returns.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/blog/dsw-return-policy-complete-guide"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group"
              >
                <span>Read complete walkthrough: Step-by-Step DSW Return & Exchange Process</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* 14. How Do We Verify DSW Policy Information? */}
          <section id="editorial-verification" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="h-4 w-4" />
              <span>Section 14</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              How Do We Verify DSW Policy Information?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              At dswReturnRefund, accuracy and transparency are our highest editorial priorities. We never rely on outdated third-party summaries or unverified AI outputs.
            </p>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Direct Legal Terms Inspection</strong>
                  We monitor and inspect DSW&apos;s official legal terms page (<a href="https://www.dsw.com/en/us/legal/return-policy" target="_blank" rel="noopener noreferrer" className="text-red-600 font-mono underline hover:text-red-800">dsw.com/en/us/legal/return-policy</a>) directly.
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Customer Support Verification</strong>
                  We periodically cross-check edge cases (such as damaged shoe box fees and worn defective shoe claims) directly with DSW customer service representatives.
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Monthly Manual Audits</strong>
                  Our team conducts monthly audits across major retailers to catch quiet policy adjustments, holiday extensions, or VIP tier updates before you shop.
                </div>
              </div>
            </div>
          </section>

          {/* 15. Final Thoughts */}
          <section id="final-thoughts" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Check className="h-4 w-4" />
              <span>Section 15</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Final Summary & Takeaways
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              DSW offers one of the most generous and flexible return policies in retail footwear, provided you take advantage of its free VIP rewards program. With up to 90 days for standard VIP members and 365 days for Elite VIPs, free in-store drop-offs, and automatic digital receipt storage, returning shoes at DSW is hassle-free.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Whenever you shop at DSW, make sure to give your phone number at checkout, keep original shoe boxes until you&apos;re sure about the fit, and drop off any returns in-store whenever possible to save time and money.
            </p>
          </section>

          {/* 16. Frequently Asked Questions */}
          <section id="faq" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="h-4 w-4" />
              <span>Section 16</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">
              Frequently Asked Questions ({dswFaqs.length} Detailed Answers)
            </h2>

            <div className="space-y-6">
              {dswFaqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Full-Width Internal Linking Network Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <SidebarTopStoresWidget limit={6} />
            <SidebarPopularGuidesWidget limit={5} />
          </section>

          {/* Report Inaccuracy & Author Bio 50/50 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportInaccuracy pageTitle="DSW Official Return & Refund Guide 2026" itemKey="dsw-home" />
            <AuthorBioCard authorName="MALIK UMAR" updatedDate="August 2026" />
          </div>

          {/* Author Byline Box */}
          <footer className="mt-12 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-red-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 border-2 border-red-400 shadow-md">
              MU
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">About the Author: MALIK UMAR</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                  Senior Analyst
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                MALIK UMAR is a Senior Retail Policy Analyst with over 10 years of experience evaluating store return policies, consumer protection laws, and warranty terms. He has tested and verified return procedures across 50+ top global retailers to help consumers shop with complete confidence.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-red-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified Retail Expert
                </span>
                <span>•</span>
                <Link href="/editorial-policy" className="hover:underline text-slate-300">Read Editorial Policy</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
