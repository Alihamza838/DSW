import React, { useState } from "react";
import {
  FileText,
  PackageCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Check,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Copy,
  ShieldCheck,
} from "lucide-react";
import { CopySectionLink } from "../ui/CopySectionLink";
import type { Step } from "../../types";

interface VisualStepGuideProps {
  title?: string;
  steps: Step[];
  brandName?: string;
}

// Icon helper based on step title / index
function getStepIcon(index: number, title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("receipt") || lower.includes("account") || lower.includes("log") || lower.includes("proof") || index === 0) {
    return <FileText className="h-5 w-5" />;
  }
  if (lower.includes("pack") || lower.includes("box") || lower.includes("label") || lower.includes("print") || index === 1) {
    return <PackageCheck className="h-5 w-5" />;
  }
  if (lower.includes("drop") || lower.includes("ship") || lower.includes("store") || lower.includes("tcs") || lower.includes("ups") || index === 2) {
    return <Truck className="h-5 w-5" />;
  }
  return <CreditCard className="h-5 w-5" />;
}

// Estimated durations per step stage
const STEP_ESTIMATED_TIMES = [
  "2-3 mins prep",
  "5 mins packaging",
  "Dropoff or 1-3 days transit",
  "Instant to 3-5 days refund",
];

export function VisualStepGuide({
  title = "Step-by-Step Return & Refund Procedure",
  steps,
  brandName = "Store",
}: VisualStepGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const sectionId = "return-steps-guide";

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const progressPercentage = Math.round(
    (completedSteps.length / (steps.length || 1)) * 100
  );

  return (
    <div
      id={sectionId}
      className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs font-sans space-y-6 scroll-mt-24"
    >
      {/* Header with Title & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dashed border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-teal-brand bg-teal-brand/10 border border-teal-brand/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              <span>Interactive Workflow</span>
            </span>
            <span className="text-xs font-mono text-ink-500">
              {steps.length} Simple Steps
            </span>
          </div>
          <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <CopySectionLink
            sectionId={sectionId}
            label="Share Return Guide"
            variant="button"
          />
        </div>
      </div>

      {/* Real-time Progress Bar Indicator & Step Tracker */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-ink-700 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-teal-brand" />
            <span>Return Progress Tracker</span>
          </span>
          <span className="font-extrabold text-teal-brand">
            {completedSteps.length} of {steps.length} Steps Completed ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-brand to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Dynamic Current Step vs Next Step Banner */}
        {(() => {
          const currentStepIdx = steps.findIndex((_, i) => !completedSteps.includes(i));
          if (currentStepIdx === -1) {
            return (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>All steps completed! You are ready to receive your store refund.</span>
              </div>
            );
          }
          const currentStep = steps[currentStepIdx];
          const nextStep = steps[currentStepIdx + 1];
          return (
            <div className="p-3 bg-teal-brand/10 border border-teal-brand/20 rounded-xl text-xs font-sans space-y-1">
              <div className="flex items-center gap-2 text-teal-brand font-extrabold">
                <ArrowRight className="h-4 w-4 shrink-0" />
                <span>Current Step ({currentStepIdx + 1}/{steps.length}): {currentStep.title}</span>
              </div>
              {nextStep && (
                <div className="text-ink-600 pl-6 text-[11px] font-medium">
                  Next Step: <span className="font-bold text-ink-800">{nextStep.title}</span>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Step Cards Grid & Timeline Flow */}
      <div className="relative space-y-4">
        {/* Connecting Vertical Bar on Desktop */}
        <div className="hidden md:block absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-200 -z-0" />

        {steps.map((step, idx) => {
          const isDone = completedSteps.includes(idx);
          const stepId = `step-${idx + 1}`;
          const estTime = STEP_ESTIMATED_TIMES[idx] || "~5 mins";

          return (
            <div
              key={step.title}
              id={stepId}
              className={`relative z-10 transition-all duration-300 rounded-2xl border ${
                isDone
                  ? "bg-emerald-50/60 border-emerald-300/80 shadow-2xs"
                  : "bg-white border-slate-200/90 hover:border-teal-brand/60 shadow-2xs hover:shadow-receipt"
              } p-4 sm:p-5 scroll-mt-24`}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Numbered Avatar Badge & Icon */}
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <button
                    onClick={() => toggleStep(idx)}
                    title={isDone ? "Mark step incomplete" : "Mark step complete"}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                      isDone
                        ? "bg-emerald-600 text-white shadow-xs scale-105"
                        : "bg-teal-brand text-white hover:bg-teal-dark shadow-2xs"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span className="flex items-center gap-1">
                        0{idx + 1}
                      </span>
                    )}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-teal-brand font-bold uppercase tracking-wider flex items-center gap-1">
                        {getStepIcon(idx, step.title)}
                        <span>Phase 0{idx + 1}</span>
                      </span>
                      <span className="text-[10px] font-mono text-ink-400 bg-paper-muted px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-ink-400" />
                        {estTime}
                      </span>
                    </div>
                    <h3
                      className={`font-sans text-base sm:text-lg font-extrabold tracking-tight ${
                        isDone ? "text-emerald-950 line-through opacity-80" : "text-ink"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Right toolbar controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => toggleStep(idx)}
                    className={`text-xs font-sans font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isDone
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-slate-100 hover:bg-teal-light/20 text-ink-700 hover:text-teal-brand border-slate-200"
                    }`}
                  >
                    {isDone ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 shrink-0" />
                        <span>Done</span>
                      </span>
                    ) : (
                      "Mark Done"
                    )}
                  </button>
                  <CopySectionLink sectionId={stepId} variant="icon" />
                </div>
              </div>

              {/* Step instructions text */}
              <div className="mt-3 sm:ml-14 pt-3 border-t border-dashed border-slate-200/80">
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-medium">
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Return Guarantee Footer note */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-ink-500 bg-paper-muted rounded-xl p-3 border border-slate-200/80">
        <span className="flex items-center gap-1.5 text-teal-brand font-bold">
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>Need help with your {brandName} return receipt?</span>
        </span>
        <span className="text-ink-600">
          Check out our receipt loss hacks & local return counter map below.
        </span>
      </div>
    </div>
  );
}
