import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedPolicies, SavedPolicyItem } from "../../lib/savedPolicies";
import { cn } from "../../lib/utils";

interface SavePolicyButtonProps {
  slug: string;
  title: string;
  type?: "store" | "article";
  returnWindow?: string;
  logo?: string;
  image?: string;
  category?: string;
  variant?: "icon" | "button" | "pill" | "badge";
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function SavePolicyButton({
  slug,
  title,
  type = "store",
  returnWindow,
  logo,
  image,
  category,
  variant = "button",
  size = "md",
  className,
  showText = true,
}: SavePolicyButtonProps) {
  const { isSaved, toggleSave } = useSavedPolicies();
  const saved = isSaved(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave({
      slug,
      title,
      type,
      returnWindow,
      logo,
      image,
      category,
    });
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-xs gap-1.5",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={saved ? "Remove from My Policies" : "Save to My Policies"}
        aria-label={saved ? `Remove ${title} from saved policies` : `Save ${title} policy`}
        className={cn(
          "p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-90",
          saved
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25"
            : "bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-teal-600 hover:bg-slate-200 border border-slate-200 dark:border-slate-700",
          className
        )}
      >
        {saved ? (
          <BookmarkCheck className={cn(iconSizes[size], "fill-amber-500 text-amber-500")} />
        ) : (
          <Bookmark className={iconSizes[size]} />
        )}
      </button>
    );
  }

  if (variant === "badge") {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={saved ? "Saved in My Policies" : "Bookmark this policy"}
        className={cn(
          "inline-flex items-center rounded-full font-bold transition-all cursor-pointer select-none active:scale-95 shadow-2xs",
          sizeClasses[size],
          saved
            ? "bg-amber-500 text-slate-950 border border-amber-400 font-extrabold"
            : "bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-700 hover:border-teal-400/60",
          className
        )}
      >
        {saved ? (
          <BookmarkCheck className={cn(iconSizes[size], "fill-slate-950 text-slate-950")} />
        ) : (
          <Bookmark className={iconSizes[size]} />
        )}
        {showText && <span>{saved ? "Saved" : "Save Policy"}</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={saved ? "Remove from My Policies" : "Save to My Policies"}
      className={cn(
        "inline-flex items-center justify-center font-bold rounded-xl transition-all cursor-pointer select-none active:scale-95 shadow-2xs border",
        sizeClasses[size],
        saved
          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 hover:bg-amber-100"
          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400",
        className
      )}
    >
      {saved ? (
        <BookmarkCheck className={cn(iconSizes[size], "fill-amber-500 text-amber-600 dark:text-amber-400")} />
      ) : (
        <Bookmark className={cn(iconSizes[size], "text-slate-400 group-hover:text-teal-500")} />
      )}
      {showText && <span>{saved ? "Saved to Profile" : "Save Policy"}</span>}
    </button>
  );
}
