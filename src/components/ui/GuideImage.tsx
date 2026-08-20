import * as React from "react";
import { ShieldCheck, BookOpen } from "lucide-react";
import { getGuideImagePath } from "../../data/assets";
import { getImageCandidates } from "../../utils/imageUtils";

interface GuideImageProps {
  slug: string;
  title: string;
  image?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
  fitMode?: "cover" | "contain" | "ambient";
}

export function GuideImage({ slug, title, image, alt, className = "h-40 w-full", fitMode = "ambient" }: GuideImageProps) {
  // Use centralized asset lookup
  const primaryImagePath = image || getGuideImagePath(slug);
  const imageAltText = alt || title;
  const candidateList = React.useMemo(() => {
    return getImageCandidates(primaryImagePath, {
      width: 1200,
      height: 675,
      quality: 95,
      cropMode: "at_max",
      focus: "center",
      dpr: 2,
    });
  }, [primaryImagePath]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
    setIsLoaded(false);
  }, [primaryImagePath]);

  const handleError = () => {
    if (currentIndex < candidateList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const currentSrc = candidateList[currentIndex] || primaryImagePath;

  if (!hasError) {
    return (
       <div className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-2xs ${className}`}>
        {/* Ambient Blurred Backdrop to avoid stretching or cutting while filling container */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${currentSrc})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />

        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center z-10">
            <span className="text-xs font-mono text-slate-400">Loading image...</span>
          </div>
        )}
         <img
          src={currentSrc}
          alt={imageAltText}
          loading="lazy"
          decoding="async"
          className={`relative z-10 w-full h-full ${
            fitMode === "cover" ? "object-cover" : "object-contain"
          } transition-opacity duration-300 [image-rendering:-webkit-optimize-contrast] ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
        />
        {isLoaded && fitMode === "cover" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 border border-slate-700/60 shadow-2xs ${className}`}>
      {/* Clean, Neutral & Professional Card Visual Header */}
      <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none font-sans">
        <div className="flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 border border-teal-500/30 px-2.5 py-1 rounded-full backdrop-blur-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
            <span>Policy Audit Guide</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 opacity-80">
            2026 Verified
          </span>
        </div>

        <div className="space-y-1 relative z-10 my-auto pt-2">
          <p className="text-xs sm:text-sm font-display font-bold text-white leading-tight line-clamp-2 drop-shadow-xs">
            {title}
          </p>
        </div>

        <div className="flex items-center justify-between z-10 pt-1 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-slate-300 font-semibold">
            <BookOpen className="h-3 w-3 text-teal-400" />
            <span>Official Rules & Fine Print</span>
          </span>
          <span className="text-slate-500 text-[9px]">/images/guides/{slug}.png</span>
        </div>

        {/* Subtle Decorative Canvas Grid Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:16px_16px]" />
      </div>
    </div>
  );
}


