import { buildImageKitUrl, ImageKitOptions } from "./imagekit";

/**
 * Smart Image Candidate URL Generator
 * Given any image URL/path, generates an ordered list of candidate URLs
 * testing .png, .jpg, .jpeg, .webp, and .svg formats so that the UI seamlessly
 * loads whichever file format is pasted into the /public directory.
 */
export function getImageCandidates(src: string, options?: ImageKitOptions): string[] {
  if (!src) {
    return ["/images/stores/default.png", "/images/stores/default.jpg"];
  }

  // External URLs (e.g. Unsplash, CDN) are returned with ImageKit options if applicable
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return [buildImageKitUrl(src, options)];
  }

  // Parse path and extension
  const match = src.match(/^(.*?)(\.(png|jpg|jpeg|webp|svg))?$/i);
  const basePath = match && match[1] ? match[1] : src;
  const originalExt = match && match[3] ? `.${match[3].toLowerCase()}` : ".png";

  const allSupportedExts = [".png", ".jpg", ".jpeg", ".webp", ".svg"];

  // Put originalExt first, followed by the rest in priority order
  const orderedExts = [originalExt, ...allSupportedExts.filter((ext) => ext !== originalExt)];

  // Deduplicate, apply ImageKit transformation if enabled, and map to full paths
  const candidates = Array.from(new Set(orderedExts.map((ext) => {
    const localPath = `${basePath}${ext}`;
    return buildImageKitUrl(localPath, options);
  })));

  return candidates;
}

