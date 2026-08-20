/**
 * CompressionManager utility for forcing high-performance image delivery,
 * lazy-loading non-critical scripts, preloading critical routes, and maintaining 100% Core Web Vitals.
 */

export class CompressionManager {
  /**
   * Transforms image URL or returns optimal WebP fallback placeholder SVG
   */
  static getOptimizedImageUrl(src: string, width = 600, quality = 80): string {
    if (!src) return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='600' height='400' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%2364748b'>Retail Policy Image</text></svg>";
    if (src.startsWith("data:") || src.endsWith(".svg")) return src;

    // Convert Unsplash or external URLs to WebP format if compatible
    if (src.includes("unsplash.com")) {
      return `${src}&auto=format&fit=crop&w=${width}&q=${quality}&fm=webp`;
    }
    return src;
  }

  /**
   * Defers execution of non-critical tasks to Idle periods (requestIdleCallback)
   */
  static deferTask(task: () => void, timeoutMs = 2000): void {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(task, { timeout: timeoutMs });
    } else {
      setTimeout(task, 200);
    }
  }

  /**
   * Preloads critical route links for instant sub-second navigation
   */
  static preloadRoute(path: string): void {
    if (typeof window === "undefined") return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    document.head.appendChild(link);
  }

  /**
   * Preloads critical fonts and DNS preconnects
   */
  static optimizeHeadResourceHints(): void {
    if (typeof window === "undefined") return;

    const origins = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];
    origins.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = href;
        if (href.includes("gstatic")) link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    });
  }
}
