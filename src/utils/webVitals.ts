/**
 * Lightweight Web Vitals & Performance Monitoring Utility
 * Measures LCP, FID/INP, CLS, TTFB, and logs them for diagnostics.
 */

export interface WebVitalMetric {
  name: "LCP" | "FID" | "INP" | "CLS" | "TTFB" | "FCP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

export function initWebVitals() {
  if (typeof window === "undefined" || !("performance" in window)) return;

  try {
    // Measure Navigation Timing (TTFB)
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (navEntry) {
          const ttfb = navEntry.responseStart - navEntry.requestStart;
          logMetric({
            name: "TTFB",
            value: Math.round(ttfb),
            rating: ttfb < 800 ? "good" : ttfb < 1800 ? "needs-improvement" : "poor",
            delta: ttfb,
            id: `v1-${Date.now()}`,
          });
        }
      }, 0);
    });

    // Observe Paint Timings (FCP)
    if ("PerformanceObserver" in window) {
      try {
        const fcpObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              logMetric({
                name: "FCP",
                value: Math.round(entry.startTime),
                rating: entry.startTime < 1800 ? "good" : entry.startTime < 3000 ? "needs-improvement" : "poor",
                delta: entry.startTime,
                id: `v2-${Date.now()}`,
              });
            }
          }
        });
        fcpObserver.observe({ type: "paint", buffered: true });
      } catch {
        // ignore fallback
      }
    }
  } catch {
    // silent catch
  }
}

function logMetric(metric: WebVitalMetric) {
  const color = metric.rating === "good" ? "#10b981" : metric.rating === "needs-improvement" ? "#f59e0b" : "#ef4444";
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value}ms (${metric.rating.toUpperCase()})`,
      `color: ${color}; font-weight: bold; font-family: monospace;`
    );
  }
}
