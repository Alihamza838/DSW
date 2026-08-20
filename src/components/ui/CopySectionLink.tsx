import React from "react";
import { Link2, Check, Copy } from "lucide-react";

interface CopySectionLinkProps {
  sectionId: string;
  label?: string;
  variant?: "icon" | "button" | "badge";
  className?: string;
}

export function CopySectionLink({
  sectionId,
  label = "Copy Section Link",
  variant = "button",
  className = "",
}: CopySectionLinkProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleCopy}
        title="Copy direct link to this policy section"
        aria-label="Copy section link"
        className={`p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:border-red-500 text-slate-600 hover:text-red-600 transition-all duration-200 cursor-pointer shadow-2xs ${className}`}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600 animate-in zoom-in" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>
    );
  }

  if (variant === "badge") {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-700 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-300 px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-2xs ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-600 shrink-0" />
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-red-600 shrink-0" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-xs font-sans font-extrabold text-slate-800 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-500 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span className="text-emerald-700 font-bold">Rule Link Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5 text-red-600 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
