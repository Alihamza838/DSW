import { useEffect, useState, useRef } from "react";

export interface PerformanceMetrics {
  ttiMs: number | null;
  pageLoadMs: number | null;
  maxScrollDepthPercent: number;
  timeOnPageSeconds: number;
  navigationType: string;
}

export function usePerformanceTracking(pageTitle?: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    ttiMs: null,
    pageLoadMs: null,
    maxScrollDepthPercent: 0,
    timeOnPageSeconds: 0,
    navigationType: "navigate",
  });

  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;

    // 1. Measure Navigation Timing (Page load & TTI estimate)
    const updateNavigationTiming = () => {
      if (typeof window !== "undefined" && window.performance) {
        const perfEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        if (perfEntries && perfEntries.length > 0) {
          const nav = perfEntries[0];
          const loadTime = Math.round(nav.loadEventEnd - nav.startTime);
          const ttiEstimate = Math.round(nav.domInteractive - nav.startTime);

          setMetrics((prev) => ({
            ...prev,
            pageLoadMs: loadTime > 0 ? loadTime : null,
            ttiMs: ttiEstimate > 0 ? ttiEstimate : null,
            navigationType: nav.type,
          }));
        }
      }
    };

    if (document.readyState === "complete") {
      updateNavigationTiming();
    } else {
      window.addEventListener("load", updateNavigationTiming, { once: true });
    }

    // 2. Monitor Scroll Depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentPercent = Math.round((window.scrollY / scrollHeight) * 100);
        if (currentPercent > maxScrollRef.current) {
          maxScrollRef.current = Math.min(100, currentPercent);
          setMetrics((prev) => ({
            ...prev,
            maxScrollDepthPercent: maxScrollRef.current,
          }));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Track Time on Page Interval
    const timer = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setMetrics((prev) => ({
        ...prev,
        timeOnPageSeconds: elapsedSec,
      }));
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, [pageTitle]);

  return metrics;
}
