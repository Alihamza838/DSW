import React, { useState, useEffect, useMemo } from "react";
import { Image as ImageIcon, Camera, Upload, Maximize2 } from "lucide-react";
import { getImageCandidates } from "../../utils/imageUtils";

interface ArticleImagePlaceholderProps {
  src: string;
  alt: string;
  caption: string;
  badge?: string;
  className?: string;
   fitMode?: "contain" | "cover" | "natural";
  maxHeight?: string;
}

export function ArticleImagePlaceholder({
  src,
  alt,
  caption,
  badge = "Article Photo Slot",
  className = "",
   fitMode = "contain",
  maxHeight = "max-h-[580px]",
}: ArticleImagePlaceholderProps) {
  const candidateList = useMemo(() => getImageCandidates(src), [src]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setImageError(false);
    setIsLoaded(false);

  }, [src]);

  const handleError = () => {
    if (currentIndex < candidateList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const currentSrc = candidateList[currentIndex] || src;

  return (
    <figure className={`my-8 font-sans ${className}`}>
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-sm group">
        {!imageError ? (
          <div className={`relative w-full flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[320px] ${maxHeight}`}>
            {/* Ambient Blurred Backdrop - fills any surrounding space seamlessly without distorting the main photo */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 pointer-events-none transition-opacity duration-500"
              style={{ backgroundImage: `url(${currentSrc})` }}
              aria-hidden="true"
            />

            {/* Subtle contrast dark gradient overlay for ambient layer */}
            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

            {/* Loading shimmer skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center z-10">
                <span className="text-xs font-mono text-slate-300">Loading full image...</span>
              </div>
            )}

            {/* The Main High-Fidelity Uncropped Image */}
            <img
              src={currentSrc}
              alt={alt}
              onError={handleError}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
              decoding="async"
              className={`relative z-10 w-auto h-auto max-w-full ${maxHeight} ${
                fitMode === "cover" ? "w-full h-full object-cover" : "object-contain"
              } transition-all duration-300 group-hover:scale-[1.008] [image-rendering:-webkit-optimize-contrast]`}
            />

            {/* Zoom / Full Preview Trigger */}
            <a
              href={currentSrc}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full resolution image in new tab"
              className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/80 hover:bg-red-600 text-white text-xs font-mono px-2.5 py-1.5 rounded-lg border border-white/20 backdrop-blur-xs flex items-center gap-1.5 shadow-md"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Full Res</span>
            </a>
          </div>
        ) : (
          /* Clean Placeholder State when image file is not yet added */
          <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-slate-100/90 to-slate-200/50 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] relative border-2 border-dashed border-slate-300 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-white text-red-600 shadow-sm border border-slate-200 flex items-center justify-center mb-3">
              <Camera className="h-7 w-7 text-red-600" />
            </div>
            <div className="space-y-1 max-w-md">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                {badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 pt-1">
                Image Placeholder Slot
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-mono">
                Target path: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-red-600">{src}</code>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-slate-500 bg-white/80 px-3 py-1 rounded-lg border border-slate-200">
              <Upload className="h-3.5 w-3.5 text-slate-400" />
              <span>Replace with your image asset anytime (.png or .webp or .jpg)</span>
            </div>
          </div>
        )}

        {/* Top Badge Overlay */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
            <ImageIcon className="h-3 w-3 text-red-600" />
            <span>{badge}</span>
          </span>
        </div>
      </div>

      {/* Caption & Alt Info */}
      <figcaption className="mt-2.5 text-xs text-slate-600 font-sans flex items-start gap-2 px-1">
        <span className="font-bold text-red-600 shrink-0 mt-0.5">•</span>
        <span className="leading-relaxed">
          <strong className="text-slate-900">{caption}</strong>
        </span>
      </figcaption>
    </figure>
  );
}
