import * as React from "react";
import { getImageCandidates } from "../../utils/imageUtils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string; // e.g. "16/9" or "1/1"
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio = "16/9",
  className = "",
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const candidateList = React.useMemo(() => {
    const numericWidth = typeof width === "number" ? width : undefined;
    const numericHeight = typeof height === "number" ? height : undefined;
    return getImageCandidates(src, {
      width: numericWidth || 800,
      height: numericHeight || 450,
      quality: 92,
      cropMode: "at_max",
      dpr: 2,
    });
  }, [src, width, height]);

  React.useEffect(() => {
    setCurrentIndex(0);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (currentIndex < candidateList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const currentSrc = candidateList[currentIndex] || src;

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">
          Loading...
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-2 text-center text-slate-400 font-mono text-xs">
          <span>Image Unavailable</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      )}
    </div>
  );
}
