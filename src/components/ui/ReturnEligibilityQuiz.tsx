import * as React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  Calendar,
  Receipt,
  Tag,
  Store,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  ShieldCheck,
  FileText,
  ExternalLink,
  Info,
  Clock,
  DollarSign
} from "lucide-react";
import { storesData } from "../../data/stores";
import { StoreFrontmatter } from "../../types";
import { Link } from "./Link";
import { CountryFlag } from "./CountryFlag";

interface QuizState {
  selectedStoreSlug: string;
  daysAgoCategory: "14" | "30" | "60" | "90" | "365" | "365+";
  exactDaysAgo?: number;
  receiptType: "paper" | "digital" | "card_lookup" | "gift" | "none";
  itemCondition: "new_tags" | "opened_unused" | "used_worn" | "defective" | "final_sale";
  membershipTier: "standard" | "loyalty_card" | "prime" | "vip_elite";
}

const DEFAULT_QUIZ_STATE: QuizState = {
  selectedStoreSlug: "target",
  daysAgoCategory: "30",
  receiptType: "digital",
  itemCondition: "new_tags",
  membershipTier: "standard",
};

export function ReturnEligibilityQuiz({ initialStoreSlug }: { initialStoreSlug?: string }) {
  const [quizState, setQuizState] = React.useState<QuizState>(() => ({
    ...DEFAULT_QUIZ_STATE,
    selectedStoreSlug: initialStoreSlug || "target",
  }));

  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [storeSearch, setStoreSearch] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  // Sync initialStoreSlug if provided
  React.useEffect(() => {
    if (initialStoreSlug && storesData.some((s) => s.slug === initialStoreSlug)) {
      setQuizState((prev) => ({ ...prev, selectedStoreSlug: initialStoreSlug }));
    }
  }, [initialStoreSlug]);

  const currentStore: StoreFrontmatter =
    storesData.find((s) => s.slug === quizState.selectedStoreSlug) || storesData[0];

  // Store filtering for search
  const filteredStores = React.useMemo(() => {
    if (!storeSearch.trim()) return storesData.slice(0, 12);
    const q = storeSearch.toLowerCase().trim();
    return storesData.filter((s) => s.brand.toLowerCase().includes(q) || s.slug.includes(q));
  }, [storeSearch]);

  // Eligibility Evaluation Logic
  const evaluationResult = React.useMemo(() => {
    let score = 100;
    const notes: string[] = [];
    const warnings: string[] = [];

    // 1. Timeframe Check
    const days = parseInt(quizState.daysAgoCategory) || 30;
    const isCostco = currentStore.slug === "costco";
    const isTargetBrand365 = currentStore.slug === "target" && (days <= 365);
    const isDswElite = currentStore.slug === "dsw" && quizState.membershipTier === "vip_elite";

    if (quizState.daysAgoCategory === "365+") {
      if (isCostco) {
        score -= 10;
        notes.push("Costco has no general return time limit (except 90 days for electronics).");
      } else if (isTargetBrand365) {
        score -= 15;
        notes.push("Target allows 365 days ONLY for Target-owned brands (Cat & Jack, Threshold) with receipt.");
      } else {
        score -= 80;
        warnings.push(`Purchase was made over 1 year ago. Most return windows for ${currentStore.brand} have expired.`);
      }
    } else if (days > 90) {
      if (isCostco || isTargetBrand365 || isDswElite) {
        notes.push(`Within extended window allowance for ${currentStore.brand}.`);
      } else {
        score -= 60;
        warnings.push(`Over 90 days ago. Standard ${currentStore.brand} return window is usually capped at 30 to 90 days.`);
      }
    } else if (days > 30) {
      if (currentStore.quickAnswer.returnWindow.includes("30") && !currentStore.quickAnswer.returnWindow.includes("90")) {
        score -= 40;
        warnings.push(`Standard window for this item category at ${currentStore.brand} may be 30 days.`);
      } else {
        notes.push(`Within standard 90-day return window for ${currentStore.brand}.`);
      }
    } else {
      notes.push(`Fresh purchase (within 30 days). Well inside standard return window.`);
    }

    // 2. Receipt Check
    if (quizState.receiptType === "paper" || quizState.receiptType === "digital") {
      notes.push("Valid receipt or digital order record provided - eligible for original payment method refund.");
    } else if (quizState.receiptType === "card_lookup") {
      notes.push("Register payment card lookup supported at most major stores including " + currentStore.brand + ".");
    } else if (quizState.receiptType === "gift") {
      score -= 10;
      notes.push("Gift receipt provided - refund will be issued as store credit or merchandise gift card.");
    } else if (quizState.receiptType === "none") {
      if (!currentStore.quickAnswer.receiptRequired) {
        score -= 20;
        warnings.push(`${currentStore.brand} allows receiptless returns with government photo ID (lookup limit applies). Refund will be store credit.`);
      } else {
        score -= 50;
        warnings.push(`${currentStore.brand} strictly requires a physical receipt or account transaction record for returns.`);
      }
    }

    // 3. Condition Check
    if (quizState.itemCondition === "final_sale") {
      score -= 80;
      warnings.push("Final sale and clearance items are non-refundable and non-exchangeable.");
    } else if (quizState.itemCondition === "defective") {
      score += 10;
      notes.push("Defective or damaged items qualify for immediate replacement or full refund under consumer protection rules.");
    } else if (quizState.itemCondition === "used_worn") {
      if (currentStore.slug === "nike") {
        notes.push("Nike allows 60-day wear tests even on worn shoes!");
      } else {
        score -= 30;
        warnings.push("Used or worn items must be in resalable condition, unless defective.");
      }
    }

    // Determine Final Status
    let status: "eligible" | "partial" | "ineligible" = "eligible";
    if (score >= 75) status = "eligible";
    else if (score >= 40) status = "partial";
    else status = "ineligible";

    return {
      score: Math.max(10, Math.min(100, score)),
      status,
      notes,
      warnings,
    };
  }, [quizState, currentStore]);

  const handleCopySummary = () => {
    const text = `Return Eligibility Result for ${currentStore.brand}:
Status: ${evaluationResult.status.toUpperCase()} (${evaluationResult.score}% match)
Return Window: ${currentStore.quickAnswer.returnWindow}
Receipt Rules: ${currentStore.quickAnswer.receiptRequired ? "Receipt required" : "Lookup supported"}
Check full policy: https://dswreturnrefund.com/stores/${currentStore.slug}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden font-sans text-ink-900 my-8">
      {/* Quiz Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/20 rounded-xl text-teal-300 border border-teal-400/30 shrink-0">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-teal-400/20 text-teal-200 border border-teal-300/30 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                Interactive Eligibility Checker
              </span>
              <span className="text-xs font-mono text-emerald-300">
                Step {currentStep} of 4
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Can I Return This? 30-Second Quiz
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
              Answer 4 quick questions about your purchase to check refund eligibility against 2026 audited store terms.
            </p>
          </div>
        </div>

        {currentStep > 1 && (
          <button
            onClick={() => {
              setCurrentStep(1);
              setQuizState({ ...DEFAULT_QUIZ_STATE, selectedStoreSlug: currentStore.slug });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restart Quiz</span>
          </button>
        )}
      </div>

      {/* Progress Bar Header */}
      <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
        <div
          className="bg-teal-brand h-full transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Quiz Body Container */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* STEP 1: Select Retailer */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
                  <Store className="h-5 w-5 text-teal-brand" />
                  <span>Step 1: Where did you purchase the item?</span>
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  Select a store from our directory or search below.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search store name..."
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:border-teal-brand focus:outline-none focus:ring-1 focus:ring-teal-brand bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredStores.map((s) => {
                const isSelected = quizState.selectedStoreSlug === s.slug;
                return (
                  <button
                    key={s.slug}
                    onClick={() => setQuizState((prev) => ({ ...prev, selectedStoreSlug: s.slug }))}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? "border-teal-brand bg-teal-50/70 ring-2 ring-teal-brand/30 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CountryFlag code={s.country || "US"} size="sm" />
                      <span className="font-bold text-xs text-ink-900 truncate">{s.brand}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-teal-brand shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Purchase Timeframe */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-brand" />
                <span>Step 2: When was the item purchased?</span>
              </h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Select the approximate number of days elapsed since purchase or delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { val: "14", label: "0 - 14 Days Ago", desc: "Fresh purchase (Inside all standard windows)" },
                { val: "30", label: "15 - 30 Days Ago", desc: "Standard window (Fits Amazon, Apple, tech items)" },
                { val: "60", label: "31 - 60 Days Ago", desc: "Medium window (Fits Target, Walmart, DSW VIP)" },
                { val: "90", label: "61 - 90 Days Ago", desc: "Quarterly window (Fits Target 90-day, Home Depot)" },
                { val: "365", label: "91 - 365 Days Ago", desc: "1-Year window (Fits Cat & Jack, Costco, DSW Elite)" },
                { val: "365+", label: "Over 1 Year Ago (> 365 Days)", desc: "Expired for standard items (Fits Costco non-tech)" },
              ].map((item) => {
                const isSelected = quizState.daysAgoCategory === item.val;
                return (
                  <button
                    key={item.val}
                    onClick={() => setQuizState((prev) => ({ ...prev, daysAgoCategory: item.val as any }))}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? "border-teal-brand bg-teal-50/70 ring-2 ring-teal-brand/30 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-ink-900">{item.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-teal-brand" />}
                    </div>
                    <p className="text-[11px] text-ink-500">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-600 hover:text-ink-900 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Step 3</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Receipt & Proof */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-teal-brand" />
                <span>Step 3: What proof of purchase do you have?</span>
              </h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Choose the receipt or transaction proof format available to you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  val: "digital",
                  title: "Digital Receipt / App Account Order",
                  desc: "Saved in Target App, Amazon Orders, Walmart.com, or email order confirmation.",
                },
                {
                  val: "paper",
                  title: "Physical Paper Store Receipt",
                  desc: "Original printed paper receipt with barcode intact.",
                },
                {
                  val: "card_lookup",
                  title: "Paid via Credit/Debit Card (No Receipt)",
                  desc: "Swiped payment card can be looked up at POS register.",
                },
                {
                  val: "gift",
                  title: "Gift Receipt",
                  desc: "Printed gift barcode or digital gift slip without price details.",
                },
                {
                  val: "none",
                  title: "No Receipt & Paid Cash",
                  desc: "No paper receipt or card record. Will require state photo ID scan.",
                },
              ].map((item) => {
                const isSelected = quizState.receiptType === item.val;
                return (
                  <button
                    key={item.val}
                    onClick={() => setQuizState((prev) => ({ ...prev, receiptType: item.val as any }))}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? "border-teal-brand bg-teal-50/70 ring-2 ring-teal-brand/30 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-ink-900">{item.title}</span>
                      {isSelected && <Check className="h-4 w-4 text-teal-brand" />}
                    </div>
                    <p className="text-[11px] text-ink-500">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-600 hover:text-ink-900 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Step 4</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Item Condition & Category */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h3 className="font-display text-lg font-bold text-ink-900 flex items-center gap-2">
                <Tag className="h-5 w-5 text-teal-brand" />
                <span>Step 4: What is the item's condition?</span>
              </h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Current condition of the item and packaging state.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  val: "new_tags",
                  title: "Brand New / Unopened / Tags Attached",
                  desc: "Pristine condition in original box with price tags attached.",
                },
                {
                  val: "opened_unused",
                  title: "Opened Packaging / Unused Item",
                  desc: "Unboxed to inspect or try on, but completely unused.",
                },
                {
                  val: "used_worn",
                  title: "Lightly Worn / Used / Tried On",
                  desc: "Worn clothing or shoes, or opened cosmetics.",
                },
                {
                  val: "defective",
                  title: "Defective / Damaged / Missing Parts",
                  desc: "Arrived broken, failed under warranty, or missing components.",
                },
                {
                  val: "final_sale",
                  title: "Clearance / Final Sale Stamp",
                  desc: "Marked as clearance, liquidation, or non-refundable.",
                },
              ].map((item) => {
                const isSelected = quizState.itemCondition === item.val;
                return (
                  <button
                    key={item.val}
                    onClick={() => setQuizState((prev) => ({ ...prev, itemCondition: item.val as any }))}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? "border-teal-brand bg-teal-50/70 ring-2 ring-teal-brand/30 shadow-2xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-ink-900">{item.title}</span>
                      {isSelected && <Check className="h-4 w-4 text-teal-brand" />}
                    </div>
                    <p className="text-[11px] text-ink-500">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-600 hover:text-ink-900 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(5)}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Calculate Eligibility Result</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RESULT BREAKDOWN */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Header Banner */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                evaluationResult.status === "eligible"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                  : evaluationResult.status === "partial"
                  ? "bg-amber-50 border-amber-200 text-amber-950"
                  : "bg-rose-50 border-rose-200 text-rose-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    evaluationResult.status === "eligible"
                      ? "bg-emerald-500 text-white"
                      : evaluationResult.status === "partial"
                      ? "bg-amber-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {evaluationResult.status === "eligible" ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : evaluationResult.status === "partial" ? (
                    <AlertTriangle className="h-7 w-7" />
                  ) : (
                    <XCircle className="h-7 w-7" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-current">
                      {evaluationResult.score}% Compatibility Score
                    </span>
                    <span className="text-xs font-mono font-bold">
                      {currentStore.brand} Policy
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-2xl font-extrabold tracking-tight mt-1">
                    {evaluationResult.status === "eligible"
                      ? "HIGHLY ELIGIBLE - Full Refund Expected"
                      : evaluationResult.status === "partial"
                      ? "CONDITIONALLY ELIGIBLE - Store Credit or Exchange Likely"
                      : "EXPIRED OR FINAL SALE - Special Exception Needed"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 bg-white rounded-xl border border-current shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{copied ? "Copied!" : "Copy Summary"}</span>
                </button>

                <Link
                  href={`/stores/${currentStore.slug}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>Full Policy Page</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Fact Ledger Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-teal-brand" />
                  <span>Verified {currentStore.brand} Policy Match</span>
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Official Return Window:</span>
                    <span className="font-bold text-slate-900">{currentStore.quickAnswer.returnWindow}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Receipt Lookup Support:</span>
                    <span className="font-bold text-slate-900">
                      {currentStore.quickAnswer.receiptRequired ? "Mandatory Paper/Digital" : "Easy Card/App Lookup"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Restocking Fee:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {currentStore.quickAnswer.restockingFee ? "Applies to select categories" : "$0 (No Restocking Fee)"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Refund Method:</span>
                    <span className="font-bold text-slate-900">{currentStore.quickAnswer.refundMethod}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px] tracking-wider flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-teal-brand" />
                  <span>Evaluation Insights & Rules</span>
                </h4>

                <div className="space-y-2">
                  {evaluationResult.notes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </div>
                  ))}

                  {evaluationResult.warnings.map((warn, i) => (
                    <div key={i} className="flex items-start gap-2 text-amber-800 text-xs font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Checklist */}
            <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-xl space-y-2">
              <h4 className="font-bold text-teal-950 text-xs uppercase font-mono tracking-wider">
                Recommended Return Action Plan for {currentStore.brand}:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                <li className="p-2.5 bg-white border border-teal-200/60 rounded-lg flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Gather receipt barcode or app order history</span>
                </li>
                <li className="p-2.5 bg-white border border-teal-200/60 rounded-lg flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>Keep all original tags and hardware accessories</span>
                </li>
                <li className="p-2.5 bg-white border border-teal-200/60 rounded-lg flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-teal-100 text-teal-800 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>Bring valid photo ID for register verification</span>
                </li>
              </ul>
            </div>

            {/* Restart Button Footer */}
            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Check another store item</span>
              </button>

              <Link
                href="/lost-receipt-checker"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 underline decoration-teal-300 underline-offset-2"
              >
                Try Lost Receipt Calculator →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
