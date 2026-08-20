/**
 * ImageKit.io Integration & Optimization Utility
 * 
 * Provides automated real-time image optimization, format conversion (auto WebP/AVIF),
 * retina DPR scaling (dpr-2 for crisp non-blurry images on 4K/retina displays),
 * and smart cropping/padding so store logos and banners never stretch or pixelate ("phatna").
 */

export interface ImageKitOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100 (Default: 92 for high clarity)
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  cropMode?: "maintain_ratio" | "force" | "at_max" | "pad_resize" | "extract";
  focus?: "auto" | "center" | "top" | "bottom" | "left" | "right";
  dpr?: number; // 1, 2, 3 (Default: 2 for sharp screens)
  background?: string; // Hex color without # (e.g. "FFFFFF")
}

/**
 * Returns the configured ImageKit Endpoint URL or empty string if not set.
 */
export function getImageKitEndpoint(): string {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  const envEndpoint = metaEnv?.VITE_IMAGEKIT_URL_ENDPOINT;
  if (envEndpoint && typeof envEndpoint === "string") {
    return envEndpoint.replace(/\/+$/, "");
  }
  return "";
}

/**
 * Transforms an image path or URL into an optimized ImageKit URL with real-time transformations.
 * If ImageKit endpoint is not configured, it returns the original path cleanly.
 */
export function buildImageKitUrl(src: string, options: ImageKitOptions = {}): string {
  if (!src) return "/images/stores/default.png";

  const endpoint = getImageKitEndpoint();

  // Set crisp defaults
  const quality = options.quality || 92;
  const format = options.format || "auto";
  const dpr = options.dpr || 2; // Default 2x DPR prevents blurriness on mobile/retina screens

  const trParams: string[] = [
    `f-${format}`,
    `q-${quality}`,
    `dpr-${dpr}`,
  ];

  if (options.width) trParams.push(`w-${Math.round(options.width)}`);
  if (options.height) trParams.push(`h-${Math.round(options.height)}`);

  if (options.cropMode) {
    if (options.cropMode === "pad_resize") {
      trParams.push("cm-pad_resize");
      if (options.background) {
        trParams.push(`bg-${options.background.replace("#", "")}`);
      }
    } else if (options.cropMode === "at_max") {
      trParams.push("c-at_max");
    } else if (options.cropMode === "maintain_ratio") {
      trParams.push("c-maintain_ratio");
    }
  }

  if (options.focus) {
    trParams.push(`fo-${options.focus}`);
  }

  const trString = `tr=${trParams.join(",")}`;

  // If ImageKit URL Endpoint is set, route through ImageKit
  if (endpoint) {
    // Strip leading slash if relative
    const cleanPath = src.startsWith("http://") || src.startsWith("https://")
      ? src
      : src.startsWith("/") ? src : `/${src}`;

    // Append transformation query param
    const separator = cleanPath.includes("?") ? "&" : "?";
    return `${endpoint}${cleanPath}${separator}${trString}`;
  }

  // Fallback: If no ImageKit endpoint configured yet, return path as is
  return src;
}

/**
 * Helper to build ultra-crisp Store Logo URLs
 */
export function getStoreLogoImageKitUrl(src: string, width = 240, height = 240): string {
  return buildImageKitUrl(src, {
    width,
    height,
    quality: 95,
    cropMode: "pad_resize",
    background: "FFFFFF",
    dpr: 2,
  });
}

/**
 * Helper to build sharp Article Banner & Hero URLs
 */
export function getGuideBannerImageKitUrl(src: string, width = 800, height = 450): string {
  return buildImageKitUrl(src, {
    width,
    height,
    quality: 92,
    cropMode: "at_max",
    focus: "center",
    dpr: 2,
  });
}
