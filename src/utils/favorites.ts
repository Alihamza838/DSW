/**
 * Utility to manage user saved favorite stores and affiliate product deals in localStorage.
 */

export interface SavedFavorite {
  id: string;
  type: "store" | "product";
  title: string;
  slugOrUrl: string;
  brandOrStore: string;
  imageOrLogo?: string;
  savedAt: string;
}

const FAVORITES_KEY = "rpf_user_saved_favorites";
const LISTENERS: Array<() => void> = [];

export function getFavorites(): SavedFavorite[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((item) => item.id === id);
}

export function toggleFavorite(item: Omit<SavedFavorite, "savedAt">): boolean {
  if (typeof window === "undefined") return false;

  const current = getFavorites();
  const exists = current.some((f) => f.id === item.id);

  let updated: SavedFavorite[];
  if (exists) {
    updated = current.filter((f) => f.id !== item.id);
  } else {
    updated = [{ ...item, savedAt: new Date().toISOString() }, ...current];
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    LISTENERS.forEach((fn) => fn());
  } catch {
    // ignore
  }

  return !exists;
}

export function subscribeFavorites(callback: () => void): () => void {
  LISTENERS.push(callback);
  return () => {
    const idx = LISTENERS.indexOf(callback);
    if (idx > -1) LISTENERS.splice(idx, 1);
  };
}
