/**
 * Distance Calculation Utilities using Haversine formula
 * and Store Operating Hours Status Engine
 */

export interface LocationCoords {
  lat: number;
  lng: number;
}

/**
 * Calculates physical distance in miles between two GPS coordinates using Haversine formula
 */
export function calculateDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  const R = 3958.8; // Earth's mean radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c;
  return isNaN(dist) ? 0 : dist;
}

/**
 * Formats distance with "At this location" guard for < 0.05 mi
 */
export function formatDistanceDisplay(
  distanceMiles: number,
  unit: "mi" | "km" = "mi"
): string {
  if (distanceMiles < 0.05) {
    return "In-Store Desk";
  }
  const val = unit === "km" ? distanceMiles * 1.60934 : distanceMiles;
  return `${val.toFixed(1)} ${unit} away`;
}

/**
 * Sanity check utility to verify distance calculations prevent duplicates for distinct coordinates
 */
export function sanityCheckDistances<T extends { lat: number; lng: number; address: string }>(
  locations: T[],
  userLat: number,
  userLng: number
): { isSanityPassed: boolean; duplicateWarnings: string[] } {
  const seenCoords = new Map<string, string>();
  const duplicateWarnings: string[] = [];

  for (const loc of locations) {
    const key = `${loc.lat.toFixed(4)},${loc.lng.toFixed(4)}`;
    if (seenCoords.has(key)) {
      duplicateWarnings.push(`Duplicate coordinates found for ${loc.address} and ${seenCoords.get(key)}`);
    } else {
      seenCoords.set(key, loc.address);
    }
  }

  return {
    isSanityPassed: duplicateWarnings.length === 0,
    duplicateWarnings,
  };
}

export type StoreOpenStatusType = "open" | "closing-soon" | "closed";

export interface StoreOpenStatusResult {
  status: StoreOpenStatusType;
  label: string;
  badgeClass: string;
}

/**
 * Computes live open/closed status from return desk hours string and current system time
 */
export function getStoreOpenStatus(hoursStr: string): StoreOpenStatusResult {
  if (!hoursStr) {
    return {
      status: "open",
      label: "Open Today",
      badgeClass: "bg-red-50 text-red-800 border-red-200",
    };
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Simple heuristic parsing for typical store hours format e.g. "Mon-Sat: 8:00 AM - 10:00 PM | Sun: 8:00 AM - 9:00 PM" or "Daily: 9:00 AM - 9:00 PM"
  // Default range assumed if complex string: 8 AM (480 mins) to 9 PM (1260 mins)
  let openMinutes = 8 * 60; // 8:00 AM
  let closeMinutes = 21 * 60; // 9:00 PM

  // Try extracting PM time if present in string e.g. "10:00 PM" -> 22:00 -> 1320 mins
  const pmMatch = hoursStr.match(/(\d{1,2}):(\d{2})\s*PM/i);
  if (pmMatch) {
    const pmHour = parseInt(pmMatch[1], 10);
    const pmMin = parseInt(pmMatch[2], 10);
    const hour24 = pmHour === 12 ? 12 : pmHour + 12;
    closeMinutes = hour24 * 60 + pmMin;
  }

  const amMatch = hoursStr.match(/(\d{1,2}):(\d{2})\s*AM/i);
  if (amMatch) {
    const amHour = parseInt(amMatch[1], 10);
    const amMin = parseInt(amMatch[2], 10);
    const hour24 = amHour === 12 ? 0 : amHour;
    openMinutes = hour24 * 60 + amMin;
  }

  const minutesUntilClose = closeMinutes - currentTotalMinutes;

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    if (minutesUntilClose <= 60 && minutesUntilClose > 0) {
      return {
        status: "closing-soon",
        label: `Closes soon (${Math.ceil(minutesUntilClose)}m)`,
        badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
      };
    }
    return {
      status: "open",
      label: "Open now",
      badgeClass: "bg-red-50 text-red-800 border-red-200",
    };
  }

  return {
    status: "closed",
    label: "Closed now",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
  };
}
