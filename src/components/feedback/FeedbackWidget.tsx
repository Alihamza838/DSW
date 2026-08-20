import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Check, Sparkles, Send, Star, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "../../config/siteConfig";

interface FeedbackWidgetProps {
  pageTitle?: string;
  itemKey?: string;
}

const CLARITY_TAGS = [
  "Easy to understand",
  "Clear return window",
  "Helpful receipt tips",
  "Needs exception details",
  "Outdated timeline",
  "Confusing store terms",
];

export function FeedbackWidget({ pageTitle = "Store Policy Audit", itemKey = "general" }: FeedbackWidgetProps) {
  const [selectedRating, setSelectedRating] = useState<"up" | "down" | "idea" | null>(null);
  const [stars, setStars] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const storageKey = `rpf_feedback_${itemKey}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSubmitted(true);
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rating) setSelectedRating(parsed.rating);
        if (parsed.stars) setStars(parsed.stars);
        if (parsed.comment) setComment(parsed.comment);
        if (parsed.selectedTags) setSelectedTags(parsed.selectedTags);
      } catch {
        // ignore parse error
      }
    }
  }, [storageKey]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleQuickVote = (vote: "up" | "down" | "idea") => {
    setSelectedRating(vote);
    if (vote === "up" && stars === 0) setStars(5);
    if (vote === "down" && stars === 0) setStars(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating && stars === 0) return;

    const payload = {
      pageTitle,
      itemKey,
      rating: selectedRating,
      stars,
      selectedTags,
      comment,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));
    setSubmitted(true);

    // Send payload to backend feedback API
    try {
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.log("Feedback dispatch log:", err));
    } catch (e) {
      // Fallback silent handle
    }
  };

  return (
    <div id="policy-feedback" className="my-8 p-6 rounded-3xl bg-gradient-to-br from-paper via-white to-red-600/5 border border-red-600/20 shadow-xs font-sans scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-100 pb-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/10 text-red-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5 text-red-600" />
            <span>Policy Clarity & Feedback Audit</span>
          </div>
          <h3 className="text-base font-bold text-ink">Was this policy breakdown clear & helpful?</h3>
          <p className="text-xs text-ink-500 mt-0.5">
            Help fellow shoppers and our 2026 verification team maintain pristine clarity.
          </p>
        </div>

        {/* 5-Star Rating Buttons */}
        <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-2xl border border-ink-100 shadow-2xs">
          <span className="text-[10px] font-mono font-bold uppercase text-ink-400 mr-1">Clarity:</span>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setStars(s);
                if (!selectedRating) setSelectedRating(s >= 4 ? "up" : "down");
              }}
              className="p-1 hover:scale-110 transition-transform cursor-pointer"
              aria-label={`Rate clarity ${s} out of 5 stars`}
            >
              <Star
                className={`h-4 w-4 ${
                  s <= stars ? "text-amber-400 fill-amber-400" : "text-ink-200"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {submitted ? (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in text-xs font-semibold">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">Thank You for Rating Policy Clarity!</p>
              <p className="text-red-700 text-[11px] mt-0.5">
                Your vote ({selectedRating === "up" ? "Helpful & Clear" : selectedRating === "down" ? "Needs Clarification" : "Update Suggested"}) has been recorded for our 2026 editorial desk.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem(storageKey);
              setSubmitted(false);
            }}
            className="text-[11px] underline text-red-700 hover:text-red-900 font-bold cursor-pointer shrink-0"
          >
            Change My Vote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleQuickVote("up")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedRating === "up"
                  ? "bg-red-600 text-white border-red-600 shadow-2xs scale-[1.02]"
                  : "bg-white text-ink border-ink-200 hover:border-red-600 hover:bg-red-50/50"
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Yes, Very Clear</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickVote("down")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedRating === "down"
                  ? "bg-rose-600 text-white border-rose-600 shadow-2xs scale-[1.02]"
                  : "bg-white text-ink border-ink-200 hover:border-rose-400 hover:bg-rose-50"
              }`}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>No, Needs Clarification</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickVote("idea")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedRating === "idea"
                  ? "bg-amber-500 text-white border-amber-500 shadow-2xs scale-[1.02]"
                  : "bg-white text-ink border-ink-200 hover:border-amber-400 hover:bg-amber-50"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Suggest Rule Update</span>
            </button>
          </div>

          {(selectedRating || stars > 0) && (
            <div className="space-y-3 pt-2 animate-fade-in border-t border-ink-100">
              {/* Optional Quick Tag Selection */}
              <div>
                <span className="text-[11px] font-mono font-bold text-ink-500 uppercase tracking-wider block mb-2">
                  Select Quick Feedback Tags (Optional):
                </span>
                <div className="flex flex-wrap gap-2">
                  {CLARITY_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-50 text-red-700 border-red-300 font-bold"
                            : "bg-white text-ink-600 border-ink-200 hover:border-red-300"
                        }`}
                      >
                        {isSelected ? "Selected: " : "+ "}{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional: Tell us what policy details were confusing or add a receipt tip..."
                className="w-full rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-xs text-ink focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none resize-none"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[11px] text-ink-400 font-mono flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5 text-red-600 inline" />
                  <span>Feedback sent to compliance desk ({SITE_CONFIG.contactEmail})</span>
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Policy Feedback</span>
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
