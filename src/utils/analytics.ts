/**
 * Lightweight Analytics & Affiliate Event Tracking Engine
 * Tracks affiliate outbound clicks, store searches, deal views, and favorite bookmarks.
 */

export interface AffiliateClickEvent {
  id: string;
  timestamp: string;
  merchant: string;
  url: string;
  campaignTag: string;
  deviceType: "mobile" | "desktop";
  referrerPath: string;
}

const LOCAL_STORAGE_KEY = "rpf_affiliate_click_events";
const LISTENERS: Array<() => void> = [];

export function getAffiliateEvents(): AffiliateClickEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function trackAffiliateClick(url: string, merchant?: string, tag?: string) {
  if (typeof window === "undefined") return;

  const events = getAffiliateEvents();
  const hostname = extractHostname(url);
  const detectedMerchant = merchant || hostname || "Partner Store";

  const newEvent: AffiliateClickEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    merchant: detectedMerchant,
    url,
    campaignTag: tag || "organic_click",
    deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
    referrerPath: window.location.pathname,
  };

  const updated = [newEvent, ...events].slice(0, 200); // keep last 200 events
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    // Notify subscribers
    LISTENERS.forEach((fn) => fn());
  } catch {
    // ignore quota errors
  }
}

export function subscribeAffiliateEvents(callback: () => void): () => void {
  LISTENERS.push(callback);
  return () => {
    const index = LISTENERS.indexOf(callback);
    if (index > -1) LISTENERS.splice(index, 1);
  };
}

function extractHostname(url: string): string {
  try {
    const parsed = new URL(url);
    let host = parsed.hostname.replace("www.", "");
    const parts = host.split(".");
    if (parts.length > 1) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return host;
  } catch {
    return "Partner Store";
  }
}

/**
 * Initializes global event listener for affiliate links automatically.
 */
export function initGlobalAffiliateTracker() {
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest("a");
    if (!target) return;

    const href = target.getAttribute("href") || "";
    const isAffiliate =
      target.getAttribute("data-affiliate") === "true" ||
      href.includes("outbound") ||
      href.includes("ref=dswreturnrefund") ||
      href.includes("subid=");

    if (isAffiliate && href) {
      const merchant = target.getAttribute("data-merchant") || undefined;
      const tag = target.getAttribute("data-tag") || undefined;
      trackAffiliateClick(href, merchant, tag);
    }
  });
}
