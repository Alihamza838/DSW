import * as React from "react";
import { cn } from "../../lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textClassName?: string;
  variant?: "color" | "dark" | "light";
  animated?: boolean;
  onClick?: () => void;
}

export function BrandLogoIcon({
  className,
  variant = "color",
  animated = true,
}: {
  className?: string;
  variant?: "color" | "dark" | "light";
  animated?: boolean;
}) {
  const [shouldAnimate, setShouldAnimate] = React.useState(false);

  React.useEffect(() => {
    if (!animated) return;
    try {
      const hasAnimated = sessionStorage.getItem("rpf_logo_animated");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!hasAnimated && !prefersReducedMotion) {
        setShouldAnimate(true);
        sessionStorage.setItem("rpf_logo_animated", "true");
      }
    } catch {
      // Fallback if sessionStorage is disabled
    }
  }, [animated]);

  const isDarkVariant = variant === "dark";

  const badgeFill = isDarkVariant ? "#0F172A" : "#EF4444";
  const loopStroke = isDarkVariant ? "#F87171" : "#FFFFFF";
  const accentColor = isDarkVariant ? "#EF4444" : "#FEF2F2";
  const badgeBorder = isDarkVariant ? "rgba(248, 113, 113, 0.25)" : "rgba(255, 255, 255, 0.3)";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-full h-full shrink-0 select-none overflow-visible group-hover:scale-105 transition-transform duration-300",
        className
      )}
      aria-label="dswReturnRefund Return Loop Badge"
    >
      <defs>
        <filter id={`rpfBadgeGlow-${variant}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor={isDarkVariant ? "#000000" : "#DC2626"}
            floodOpacity="0.3"
          />
        </filter>

        <linearGradient id={`rpfRedLoopGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={loopStroke} />
          <stop offset="100%" stopColor={isDarkVariant ? "#FCA5A5" : "#FFFFFF"} />
        </linearGradient>
      </defs>

      {/* Rounded Red Badge Container (rx=26) */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="26"
        ry="26"
        fill={badgeFill}
        stroke={badgeBorder}
        strokeWidth="2.5"
        filter={`url(#rpfBadgeGlow-${variant})`}
      />

      {/* Hand-drawn style circular slanted oval return loop matching user's sketch */}
      <path
        d="M 42 22 C 24 36, 20 62, 34 78 C 48 92, 76 86, 84 62 C 90 38, 72 20, 46 19 C 36 18, 28 22, 24 28"
        fill="none"
        stroke={`url(#rpfRedLoopGrad-${variant})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: shouldAnimate ? 320 : undefined,
          strokeDashoffset: shouldAnimate ? 0 : undefined,
          animation: shouldAnimate ? "rpfLogoDraw 700ms ease-out forwards" : undefined,
        }}
      />

      {/* Directional Return Arrowhead at Top Lobe styled as a sharp crisp arrow */}
      <polygon
        points="12,18 29,25 21,37"
        fill={loopStroke}
        stroke={loopStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Optical Accent Node */}
      <circle cx="48" cy="20" r="3.5" fill={accentColor} />
    </svg>
  );
}

export function BrandLogo({
  className,
  size = "md",
  showText = true,
  textClassName,
  variant = "color",
  animated = true,
  onClick,
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-base font-black",
    md: "text-lg font-black",
    lg: "text-2xl font-black",
    xl: "text-3xl font-black",
  };

  const isLightVariant = variant === "light";

  return (
    <div
      onClick={onClick}
      className={cn("inline-flex items-center gap-2.5 group cursor-pointer select-none", className)}
    >
      <div className={cn("relative shrink-0 transition-transform duration-300 group-hover:scale-105", sizeClasses[size])}>
        <BrandLogoIcon variant={variant} animated={animated} />
      </div>

      {showText && (
        <span className={cn("font-display tracking-tight flex items-baseline", textSizes[size], textClassName)}>
          <span className={isLightVariant ? "text-white font-black" : "text-slate-900 font-black"}>
            dsw
          </span>
          <span className={isLightVariant ? "text-red-300 font-black" : "text-red-500 font-black"}>
            Return
          </span>
          <span className={isLightVariant ? "text-red-100 font-black" : "text-red-600 font-black"}>
            Refund
          </span>
        </span>
      )}
    </div>
  );
}
