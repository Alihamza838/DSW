import React from "react";

interface GeminiProgressBarProps {
  isLoading?: boolean;
}

export function GeminiProgressBar({ isLoading = false }: GeminiProgressBarProps) {
  const [navActive, setNavActive] = React.useState(isLoading);
  const [navProgress, setNavProgress] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // 1. Brief top bar animation on path changes (Navigation feedback)
  React.useEffect(() => {
    setNavActive(true);
    setNavProgress(30);

    const timer1 = setTimeout(() => setNavProgress(70), 80);
    const timer2 = setTimeout(() => setNavProgress(100), 200);
    const timer3 = setTimeout(() => {
      setNavActive(false);
      setNavProgress(0);
    }, 350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [window.location.pathname]);

  React.useEffect(() => {
    if (isLoading) {
      setNavActive(true);
      setNavProgress(50);
    }
  }, [isLoading]);

  // 2. Real-time scroll depth tracking for reading pages (store detail, blog detail, etc.)
  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.location.pathname]);

  const activeProgress = navActive ? navProgress : scrollProgress;
  const isVisible = navActive || isLoading || scrollProgress > 0;

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] pointer-events-none h-1 overflow-hidden bg-slate-900/10">
      {/* Primary glowing Gemini gradient line */}
      <div
        className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 via-cyan-400 to-amber-400 shadow-[0_0_12px_rgba(20,184,166,0.9)] transition-all duration-150 ease-out"
        style={{
          width: `${activeProgress}%`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Secondary shimmer streak */}
      <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[geminiShimmer_1s_linear_infinite]" />

      <style>{`
        @keyframes geminiShimmer {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(100%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

