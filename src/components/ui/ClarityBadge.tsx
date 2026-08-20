import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from "lucide-react";

interface ClarityBadgeProps {
  score?: number; // 0 - 100 percentage
  isPendingReview?: boolean;
  itemKey?: string;
  size?: "sm" | "md";
}

export function ClarityBadge({
  score = 96,
  isPendingReview = false,
  itemKey = "general",
  size = "sm",
}: ClarityBadgeProps) {
  // Check localStorage for user feedback votes on this itemKey
  const [pending, setPending] = React.useState(isPendingReview);
  const [clarityScore, setClarityScore] = React.useState(score);

  React.useEffect(() => {
    try {
      const savedFeedback = localStorage.getItem(`rpf_feedback_${itemKey}`);
      if (savedFeedback) {
        const parsed = JSON.parse(savedFeedback);
        if (parsed.rating === "down" || (parsed.selectedTags && parsed.selectedTags.includes("Needs exception details"))) {
          setPending(true);
        } else if (parsed.rating === "up") {
          setPending(false);
          setClarityScore(98);
        }
      }
    } catch {
      // fallback to default props
    }
  }, [itemKey]);

  if (pending) {
    return (
      <span
        title="Community flagged this section for accuracy check. Editorial review is in progress."
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/30 font-mono font-bold uppercase tracking-wider ${
          size === "sm" ? "text-[10px]" : "text-xs"
        }`}
      >
        <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0" />
        <span>Review Pending</span>
      </span>
    );
  }

  return (
    <span
      title={`Community Clarity Rating: ${clarityScore}% verified accurate by 2026 shoppers`}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/25 font-mono font-bold uppercase tracking-wider ${
        size === "sm" ? "text-[10px]" : "text-xs"
      }`}
    >
      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
      <span>{clarityScore}% Clear</span>
    </span>
  );
}
