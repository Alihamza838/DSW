import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { getStoreImagePath } from "../../data/assets";
import { getImageCandidates } from "../../utils/imageUtils";

interface StoreImageProps {
  src?: string;
  alt: string;
  className?: string;
  storeSlug?: string;
  priority?: boolean;
  fitMode?: "contain" | "cover";
  bgContainerClass?: string;
}

export function StoreImage({
  src,
  alt,
  className = "",
  storeSlug = "",
  priority = false,
  fitMode = "contain",
  bgContainerClass = "bg-white",
}: StoreImageProps) {
  // Primary path lookup
  const primarySrc = src || (storeSlug ? getStoreImagePath(storeSlug) : "/images/stores/default.png");

  // Pass ImageKit optimization options so logos render razor sharp (2x DPR, high quality, padded)
  const candidateList = React.useMemo(() => {
    return getImageCandidates(primarySrc, {
      width: 300,
      height: 300,
      quality: 95,
      cropMode: fitMode === "contain" ? "pad_resize" : "at_max",
      background: "FFFFFF",
      dpr: 2,
    });
  }, [primarySrc, fitMode]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setCurrentIndex(0);
    setHasError(false);
    setIsLoaded(false);
  }, [primarySrc]);

  const handleError = () => {
    if (currentIndex < candidateList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const currentSrc = candidateList[currentIndex] || primarySrc;

  // Extract clean brand initial for fallback
  const initial = (alt || storeSlug || "S").trim().charAt(0).toUpperCase();

  if (hasError) {
    return (
      <div className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-dark font-sans flex items-center justify-center p-4 overflow-hidden select-none ${className}`}>
        {/* Subtle decorative background glow */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-teal-brand/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#2A6F77_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Center Brand Monogram & Shield */}
        <div className="relative z-10 flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 shadow-md">
          <div className="w-9 h-9 rounded-xl bg-teal-brand text-white flex items-center justify-center font-display font-black text-lg shadow-sm border border-white/20">
            {initial}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-tight line-clamp-1">
              {storeSlug ? storeSlug.replace(/-/g, " ").toUpperCase() : "VERIFIED STORE"}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-teal-light font-medium">
              <ShieldCheck className="h-3 w-3 text-teal-light" />
              <span>Official 2026 Policy</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  const objectFitClass = fitMode === "contain" ? "object-contain p-2 sm:p-3" : "object-cover";

  return (
    <div className={`relative overflow-hidden ${bgContainerClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full ${objectFitClass} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ imageRendering: "auto" }}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}



