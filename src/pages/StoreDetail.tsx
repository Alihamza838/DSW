import * as React from "react";
import { SchemaMarkup } from "../components/seo/SchemaMarkup";
import { QuickAnswerCard } from "../components/store/QuickAnswerCard";
import { PolicyBadgeRow } from "../components/store/PolicyBadgeRow";
import { PolicyTable } from "../components/store/PolicyTable";
import { StepGuide } from "../components/store/StepGuide";
import { FAQs } from "../components/store/FAQs";
import { RelatedBrands } from "../components/store/RelatedBrands";
import { Button } from "../components/ui/button";
import { Link } from "../components/ui/Link";
import { storesData } from "../data/stores";
import { guidesData } from "../data/guides";
import { getStoreImagePath } from "../data/assets";
import { useSEO } from "../hooks/useSEO";
import { InternationalCounterpartsCallout } from "../components/store/InternationalCounterpartsCallout";
import { QuickCompareWidget } from "../components/store/QuickCompareWidget";
import { ReceiptLossHackWidget } from "../components/store/ReceiptLossHackWidget";
import { RelatedGuidesWidget } from "../components/store/RelatedGuidesWidget";
import { FeedbackWidget } from "../components/feedback/FeedbackWidget";
import { BreadcrumbNav } from "../components/ui/BreadcrumbNav";
import { FloatingQuickCompare } from "../components/store/FloatingQuickCompare";
import { RestockingFeeCalculator } from "../components/store/RestockingFeeCalculator";
import { SimilarStorePolicies } from "../components/store/SimilarStorePolicies";
import { SidebarTopStoresWidget, SidebarPopularGuidesWidget } from "../components/sidebar/SidebarInternalLinks";
import { Alert } from "../components/ui/Alert";
import { AffiliateDisclosure } from "../components/ui/AffiliateDisclosure";
import { ArticleImagePlaceholder } from "../components/article/ArticleImagePlaceholder";
import { ReportInaccuracy } from "../components/article/ReportInaccuracy";
import { AuthorBioCard } from "../components/article/AuthorBioCard";
import { CountryFlag } from "../components/ui/CountryFlag";
import {
  ShieldCheck,
  Clock,
  FileCheck,
  Truck,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ListOrdered,
  Check,
  UserCheck,
  Package,
  HelpCircle
} from "lucide-react";

export function StoreDetailPage({ slug }: { slug: string }) {
  const store = storesData.find((s) => s.slug === slug);

  if (!store) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center font-sans">
        <h1 className="font-sans text-2xl font-bold text-slate-900">Retailer Guidelines Not Found</h1>
        <p className="text-sm text-slate-600 mt-2">
          We haven&apos;t compiled the return policy for &quot;{slug}&quot; yet. Check out other popular stores in our index.
        </p>
        <Link href="/stores" className="mt-6">
          <Button variant="brand">Browse All Stores</Button>
        </Link>
      </div>
    );
  }

  // Comprehensive Dynamic FAQs for Schema.org & Google Indexing
  const allFaqs = React.useMemo(() => {
    const list = [
      {
        question: `What is ${store.brand}'s return policy?`,
        answer: `${store.brand}'s standard return policy allows returns within ${store.quickAnswer.returnWindow}. Items must be in original condition with proof of purchase or digital lookup.`
      },
      {
        question: `How long do I have to return items to ${store.brand}?`,
        answer: `${store.brand}'s standard return window is ${store.quickAnswer.returnWindow}. Exceptions apply for select categories like electronics, seasonal goods, or final sale items.`
      },
      {
        question: `Can I return items to ${store.brand} without a receipt?`,
        answer: store.quickAnswer.receiptRequired
          ? `A receipt or proof of purchase is generally required. However, ${store.brand} store associates can usually look up transactions using your credit card, debit card, or member account.`
          : `Yes! If you lost your receipt, ${store.brand} can process receiptless returns via digital lookup (card/phone/account) or issue merchandise store credit.`
      },
      {
        question: `Does ${store.brand} charge a restocking fee?`,
        answer: store.quickAnswer.restockingFee
          ? `Yes, ${store.brand} may charge a restocking fee (typically 15%) on opened electronics or select returned categories.`
          : `No! ${store.brand} does NOT charge restocking fees on standard returnable items in original condition.`
      },
      {
        question: `Can I return online orders to a physical ${store.brand} store?`,
        answer: store.quickAnswer.inStoreReturns
          ? `Yes! Online purchases can be returned directly to any physical ${store.brand} store location for immediate processing and waived return shipping fees.`
          : `${store.brand} online orders must be shipped back using their official mail return portal or designated carrier drop-off counter.`
      },
      ...(store.faqs || [])
    ];

    const unique: typeof list = [];
    const seen = new Set<string>();
    for (const item of list) {
      const key = item.question.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }, [store]);

  useSEO({
    title: `${store.brand} Return Policy (2026 Complete Guide) | dswReturnRefund`,
    description: store.metaDescription || `Full breakdown of ${store.brand} return policy in 2026: ${store.quickAnswer.returnWindow} return window, receipt lookup rules, online returns, and step-by-step return instructions.`,
    ogImage: getStoreImagePath(store.slug),
    ogType: "article",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Stores", item: "/stores" },
      { name: store.brand, item: `/stores/${store.slug}` },
    ],
  });

  const relatedGuides = React.useMemo(() => {
    const directMatches = guidesData.filter((g) => g.relatedStores?.includes(store.slug));
    const secondaryMatches = guidesData.filter((g) => {
      if (directMatches.some((dm) => dm.slug === g.slug)) return false;
      const titleMatch = g.title.toLowerCase().includes(store.brand.toLowerCase());
      const tagMatch = store.category?.some((c) => g.tags?.includes(c));
      return titleMatch || tagMatch;
    });
    const fallbacks = guidesData.filter((g) => {
      if (directMatches.some((dm) => dm.slug === g.slug) || secondaryMatches.some((sm) => sm.slug === g.slug)) return false;
      return ["best-return-policies-guide", "store-credit-vs-refund-guide", "final-sale-explained-guide", "return-shipping-fees-guide"].includes(g.slug);
    });
    return [...directMatches, ...secondaryMatches, ...fallbacks].slice(0, 4);
  }, [store]);

  const internationalCounterparts = storesData.filter((s) => {
    if (s.slug === store.slug) return false;
    const getRootBrand = (str: string) => {
      if (str.startsWith("walmart")) return "walmart";
      if (str.startsWith("target")) return "target";
      if (str.startsWith("sephora")) return "sephora";
      if (str.startsWith("nike")) return "nike";
      if (str.startsWith("amazon")) return "amazon";
      return str;
    };
    return getRootBrand(s.slug) === getRootBrand(store.slug);
  });

  const tocItems = React.useMemo(() => [
    { id: "executive-summary", title: "1. Policy Summary" },
    { id: "return-window", title: "2. Return Window" },
    { id: "without-receipt", title: "3. Without Receipt Rules" },
    { id: "online-returns", title: "4. Online Return Rules" },
    { id: "item-condition", title: "5. Item Condition Rules" },
    { id: "clearance-items", title: "6. Clearance & Final Sale" },
    { id: "refund-exchange", title: "7. Refunds & Restocking" },
    { id: "how-to-return", title: "8. Step-by-Step Instructions" },
    { id: "faqs-section", title: "9. FAQs" },
  ], []);

  const [activeSection, setActiveSection] = React.useState<string>("executive-summary");
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
      <SchemaMarkup
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Stores", url: "/stores" },
          { name: store.brand, url: `/stores/${store.slug}` },
        ]}
        store={{
          name: `${store.brand} Return Policy`,
          url: `https://dswreturnrefund.com/stores/${store.slug}`,
          description: store.metaDescription || `Verified 2026 return rules for ${store.brand}`,
        }}
        faqs={allFaqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <BreadcrumbNav
          items={[
            { label: "Stores", href: "/stores" },
            { label: `${store.brand} Return Policy`, href: `/stores/${store.slug}` },
            { label: "2026 Audit Guide" },
          ]}
        />

        {/* Prominent Policy Advisory Callout (if active) */}
        {store.policyAlert && (
          <div className="mb-6">
            <Alert
              variant="warning"
              badgeText="2026 POLICY ADVISORY"
              title={store.policyAlert.title}
              description={
                <div className="space-y-1.5">
                  <p>{store.policyAlert.message}</p>
                  {store.policyAlert.actionNote && (
                    <p className="font-mono font-bold text-amber-900 bg-amber-200/60 border border-amber-300 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 text-[11px]">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                      <span>Action Required: {store.policyAlert.actionNote}</span>
                    </p>
                  )}
                </div>
              }
            />
          </div>
        )}

        {/* Article Header Card - Styled like Home.tsx */}
        <header className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-red-600 to-rose-700" />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-50 text-red-800 border border-red-200">
              <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
              VERIFIED 2026 AUDIT
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Updated {store.lastVerified || "August 2026"}
            </span>
            {store.countryName && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-3 py-0.5">
                <CountryFlag code={store.countryCode || store.country || "US"} size="sm" />
                <span>{store.countryName} Market</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            {store.brand} Return Policy (2026 Complete Guide)
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal max-w-4xl">
            {store.metaDescription || `Everything you need to know about returning, exchanging, or refunding purchases at ${store.brand}: return deadlines, paperless receipt lookups, online shipping fees, clearance exemptions, and step-by-step instructions.`}
          </p>

          {/* Author Byline Header Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 flex-wrap gap-4 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-red-400 font-extrabold flex items-center justify-center text-sm border border-slate-700">
                MV
              </div>
              <div>
                <div className="font-bold text-slate-900">Marcus Vance</div>
                <div className="text-slate-500 text-xs">Senior Retail Policy Analyst & Consumer Advocate</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs font-mono">
                <BookOpen className="h-3.5 w-3.5 text-red-600" />
                <span>6 Min Read</span>
              </div>
              <a
                href={store.officialPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Official {store.brand} Terms</span>
                <ExternalLink className="h-3.5 w-3.5 text-red-400" />
              </a>
            </div>
          </div>
        </header>

        {/* Store Main Front Photo Cover Placeholder Slot */}
        {/* Path: /public/images/stores/${store.slug}.png */}
        <ArticleImagePlaceholder
          src={`/images/stores/${store.slug}.png`}
          alt={`${store.brand} Storefront & Customer Return Desk`}
          caption={`Figure 1: ${store.brand} Customer Service Counter & Return Desk: Keep your order receipt or payment card ready for instant register processing.`}
          badge={`${store.brand} Main Cover Photo`}
          className="mb-8"
        />

        {/* Quick Access Jump Links Row */}
        <section className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick Access Jump Links</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => scrollToSection("executive-summary")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="h-3 w-3 text-red-400" />
              <span>Summary Table</span>
            </button>
            <button
              onClick={() => scrollToSection("return-window")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <Clock className="h-3 w-3 text-red-400" />
              <span>Return Window</span>
            </button>
            <button
              onClick={() => scrollToSection("without-receipt")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <FileCheck className="h-3 w-3 text-red-400" />
              <span>Without Receipt</span>
            </button>
            <button
              onClick={() => scrollToSection("online-returns")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <Truck className="h-3 w-3 text-red-400" />
              <span>Online Returns</span>
            </button>
            <button
              onClick={() => scrollToSection("item-condition")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <span>Item Condition</span>
            </button>
            <button
              onClick={() => scrollToSection("clearance-items")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3 text-red-400" />
              <span>Clearance Rules</span>
            </button>
            <button
              onClick={() => scrollToSection("how-to-return")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="h-3 w-3 text-red-400" />
              <span>How To Return</span>
            </button>
            <button
              onClick={() => scrollToSection("faqs-section")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700/80 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="h-3 w-3 text-red-400" />
              <span>FAQs</span>
            </button>
          </div>
        </section>

        {/* International Counterparts Callout Banner */}
        <InternationalCounterpartsCallout
          currentBrand={store.brand}
          currentSlug={store.slug}
          counterparts={internationalCounterparts}
        />

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
            <section id="executive-summary" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                      EXECUTIVE SUMMARY
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      {store.brand} Return Policy at a Glance
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-red-50 text-red-800 border border-red-200">
                    Verified 2026 Rules
                  </span>
                </div>

                {/* Status Badge Row */}
                <div className="mb-6">
                  <PolicyBadgeRow badges={store.badges} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                        <th className="p-3 sm:p-4 rounded-tl-xl w-1/3">Policy Parameter</th>
                        <th className="p-3 sm:p-4 rounded-tr-xl w-2/3">Official Rule & Term</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Return Window</td>
                        <td className="p-3 sm:p-4 font-bold text-red-600">{store.quickAnswer.returnWindow}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Receipt Required</td>
                        <td className="p-3 sm:p-4">
                          {store.quickAnswer.receiptRequired
                            ? "Required (Paper receipt or digital lookup via payment card / member account)"
                            : "Optional (Card/phone lookup or store credit issued)"}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Restocking Fee</td>
                        <td className="p-3 sm:p-4 font-bold text-slate-900">
                          {store.quickAnswer.restockingFee ? "Applicable on open box / select items" : "$0 (No Restocking Fees)"}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">In-Store Returns</td>
                        <td className="p-3 sm:p-4 font-semibold text-emerald-700">
                          {store.quickAnswer.inStoreReturns ? "100% Free at any physical location" : "Mail Return Portal Only"}
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 bg-slate-50/50">Refund Method</td>
                        <td className="p-3 sm:p-4">{store.quickAnswer.refundMethod}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 1: Return Window Guidelines */}
            <section id="return-window" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="h-4 w-4" />
                <span>Section 1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {store.brand} Return Window Guidelines
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {store.brand} offers a standard <strong>{store.quickAnswer.returnWindow}</strong> return window calculated from the original date of purchase for in-store transactions, or from the order delivery date for online purchases.
              </p>

              {/* Department Table Exceptions */}
              {store.policyTable && store.policyTable.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">Department & Category Timeframes:</h3>
                  <PolicyTable rows={store.policyTable} />
                </div>
              )}

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for {store.brand} Return Windows:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Save your physical or email receipt immediately after purchasing to ensure full window eligibility.</li>
                  <li>Check if signing into a member account gives extended return privileges or paperless tracking.</li>
                  <li>If you miss the primary cutoff date, ask cashiers for store merchandise credit options.</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Table of Contents Card (Right 4 Columns) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 self-start hidden lg:block space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
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

              <div className="pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div className="text-[11px] font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-red-600 shrink-0" />
                  <span>Verified Retail Audit</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-snug font-sans">
                  Continuously updated against {store.brand} legal terms and store register protocols.
                </p>
              </div>
            </div>

            {/* Sidebar Internal Linking Widget: Top Stores */}
            <SidebarTopStoresWidget currentSlug={store.slug} limit={4} />
          </aside>
        </div>

        {/* Full-Width Main Content Stream (100% Width matching Header) */}
        <div className="w-full space-y-10">

            {/* Photo Guide Placeholder Slot 1 */}
            {/* Path: /public/images/stores/${store.slug}-1.png */}
            <ArticleImagePlaceholder
              src={`/images/stores/${store.slug}-1.png`}
              alt={`${store.brand} Product Packaging & Receipt Guidelines`}
              caption={`Figure 2: Original ${store.brand} Receipt & Box Setup: Keep price tags attached and original packaging intact for fast register refunds.`}
              badge={`${store.brand} Photo Guide Slot #1`}
            />

            {/* Section 2: Returns Without Receipt */}
            <section id="without-receipt" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <FileCheck className="h-4 w-4" />
                <span>Section 2</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {store.brand} Return Policy Without Receipt
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {store.withoutReceiptRules || `Losing a paper receipt at ${store.brand} does not mean you cannot return your item. Cashiers can perform paperless digital lookups using the debit/credit card used during purchase, your member account phone number, or your order email address.`}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <UserCheck className="h-4 w-4 text-red-600" />
                    <span>Digital Card / Account Lookup</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Swipe your credit/debit card or provide your phone number at register to pull up the original transaction.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Package className="h-4 w-4 text-red-600" />
                    <span>Unverified No-Receipt Credit</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If no record is found, bringing a government photo ID may allow store credit at the item&apos;s lowest recent sale price.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for No-Receipt Returns:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Provide your phone number at checkout to ensure all store purchases are logged digitally.</li>
                  <li>Bring valid government photo ID for any return missing a original sales slip.</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Online Return Rules */}
            <section id="online-returns" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Truck className="h-4 w-4" />
                <span>Section 3</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {store.brand} Online Return Rules
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Orders placed on {store.brand}&apos;s website can be returned either by dropping them off at a local physical store location or by mailing them back through the official online returns portal.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left text-sm border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase">
                      <th className="p-3 border border-slate-800">Return Method</th>
                      <th className="p-3 border border-slate-800">Return Shipping Fee</th>
                      <th className="p-3 border border-slate-800">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-slate-900">In-Store Drop-off</td>
                      <td className="p-3 font-bold text-red-600">$0 (100% Free)</td>
                      <td className="p-3 font-bold text-slate-900">Instant at Register</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Pre-Paid Mail Label</td>
                      <td className="p-3 font-semibold text-slate-700">Standard carrier rate or free for members</td>
                      <td className="p-3">5–10 Business Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Pro Tips for Online Returns:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Return online orders in-store to avoid return shipping fees and get instant refunds.</li>
                  <li>Keep carrier tracking receipts when mailing items until the credit hits your bank account.</li>
                </ul>
              </div>
            </section>

            {/* Section 4: Item Condition & Worn Items */}
            <section id="item-condition" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Section 4</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {store.brand} Item Condition & Worn Items
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {store.wornItemsPolicy || `${store.brand} requires items to be in new, unused, and resaleable condition with original tags attached. Items showing heavy signs of wear, stains, or missing parts may be denied return unless a clear manufacturing defect exists.`}
              </p>

              <div className="bg-slate-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  <span>Condition Guidelines:</span>
                </h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Try on garments or footwear indoors before removing original tags or boxes.</li>
                  <li>Defective items (broken zippers, split seams) are covered under manufacturing warranty exchanges.</li>
                </ul>
              </div>
            </section>

            {/* Photo Guide Placeholder Slot 2 */}
            {/* Path: /public/images/stores/${store.slug}-2.png */}
            <ArticleImagePlaceholder
              src={`/images/stores/${store.slug}-2.png`}
              alt={`${store.brand} In-Store Customer Desk & Return Lookup`}
              caption={`Figure 3: ${store.brand} Customer Service Desk: Cashiers verify items and issue instant refunds or store merchandise credits.`}
              badge={`${store.brand} Photo Guide Slot #2`}
            />

            {/* Section 5: Clearance & Final Sale */}
            <section id="clearance-items" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <RotateCcw className="h-4 w-4" />
                <span>Section 5</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {store.brand} Clearance & Final Sale Rules
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {store.clearanceRules || `Standard clearance merchandise at ${store.brand} is eligible for return within the standard window, provided tags remain attached. However, items explicitly marked as 'Final Sale' or 'As-Is' at register cannot be returned or exchanged.`}
              </p>
            </section>

            {/* Section 6: Refund Speeds & Restocking Fees */}
            <section id="refund-exchange" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider">
                <RefreshCw className="h-4 w-4" />
                <span>Section 6</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {store.brand} Refund Processing & Restocking Fees
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                In-store returns process immediately back to your original payment method. Credit card refunds typically appear on bank statements within 2 to 5 business days.
              </p>

              {/* Net Refund & Restocking Fee Calculator Component */}
              <RestockingFeeCalculator
                brandName={store.brand}
                defaultRestockingPct={store.quickAnswer.restockingFee ? 15 : 0}
              />
            </section>

            {/* Section 7: Step-by-Step Return Instructions */}
            <section id="how-to-return" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <StepGuide
                steps={store.steps}
                title={`How to Return Items to ${store.brand}`}
                brandName={store.brand}
              />
            </section>

          {/* Section 8: Author & Editorial Verification Box */}
            <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white font-black text-lg flex items-center justify-center border-2 border-white/20">
                    MV
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Marcus Vance</h3>
                    <p className="text-xs text-slate-400">Senior Retail Policy Analyst & Consumer Advocate</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-mono text-red-400">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  <span>Verified 2026 Policy Audit</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-6">
                This {store.brand} policy guide is continuously verified against official terms and customer feedback. Rules can vary slightly by franchisee or location. Always confirm specific item terms on your printed receipt.
              </p>
            </section>

            {/* Section 9: Frequently Asked Questions */}
            <section id="faqs-section" className="scroll-mt-24 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs">
              <FAQs store={store} />
            </section>

            {/* Report Inaccuracy & Author Bio 50/50 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReportInaccuracy pageTitle={`${store.brand} Return Policy`} itemKey={store.slug} />
              <AuthorBioCard authorName="MALIK UMAR" updatedDate={store.lastVerified} />
            </div>

            {/* High-Impact Tools & Comparison Full-Width Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Compare Selector */}
              <QuickCompareWidget
                currentBrand={store.brand}
                currentSlug={store.slug}
                storesList={storesData}
              />

              {/* Receipt Loss Hack Widget */}
              <ReceiptLossHackWidget brand={store.brand} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Related Guides Widget */}
              <RelatedGuidesWidget brand={store.brand} guides={relatedGuides} />

              {/* Related Brands */}
              <RelatedBrands slugs={store.relatedBrands} currentSlug={store.slug} />
            </div>

            {/* User Feedback Widget & Affiliate Disclosure */}
            <AffiliateDisclosure variant="card" />
            <FeedbackWidget pageTitle={`${store.brand} Return Policy`} itemKey={store.slug} />
        </div>

        {/* Bottom Similar Store Return Policies */}
        <div className="pt-4">
          <SimilarStorePolicies currentStore={store} />
        </div>

        {/* Floating Quick Compare Button */}
        <FloatingQuickCompare currentSlug={store.slug} brandName={store.brand} />
      </div>
    </article>
  );
}



