import { useState, useEffect } from "react";

export interface SavedPolicyItem {
  slug: string;
  title: string;
  type: "store" | "article";
  returnWindow?: string;
  logo?: string;
  image?: string;
  category?: string;
  savedAt: number;
}

const STORAGE_KEY = "rpf_saved_policies";
const CHANGE_EVENT = "rpf_saved_policies_changed";

export function getSavedPolicies(): SavedPolicyItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse saved policies from localStorage:", err);
    return [];
  }
}

export function isPolicySaved(slug: string): boolean {
  const list = getSavedPolicies();
  return list.some((item) => item.slug === slug);
}

export function toggleSavePolicy(
  item: Omit<SavedPolicyItem, "savedAt">
): boolean {
  if (typeof window === "undefined") return false;
  const list = getSavedPolicies();
  const index = list.findIndex((i) => i.slug === item.slug);
  let isSavedNow = false;

  let newList: SavedPolicyItem[];
  if (index >= 0) {
    newList = list.filter((i) => i.slug !== item.slug);
    isSavedNow = false;
  } else {
    const newItem: SavedPolicyItem = {
      ...item,
      savedAt: Date.now(),
    };
    newList = [newItem, ...list];
    isSavedNow = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: newList }));
  } catch (err) {
    console.error("Failed to save policy to localStorage:", err);
  }

  return isSavedNow;
}

export function removeSavedPolicy(slug: string): void {
  if (typeof window === "undefined") return;
  const list = getSavedPolicies();
  const newList = list.filter((i) => i.slug !== slug);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: newList }));
  } catch (err) {
    console.error("Failed to remove saved policy:", err);
  }
}

export function clearAllSavedPolicies(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: [] }));
  } catch (err) {
    console.error("Failed to clear saved policies:", err);
  }
}

export function useSavedPolicies() {
  const [savedPolicies, setSavedPolicies] = useState<SavedPolicyItem[]>(() =>
    getSavedPolicies()
  );

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      if ("detail" in e && Array.isArray((e as CustomEvent).detail)) {
        setSavedPolicies((e as CustomEvent).detail);
      } else {
        setSavedPolicies(getSavedPolicies());
      }
    };

    window.addEventListener(CHANGE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const isSaved = (slug: string) => savedPolicies.some((p) => p.slug === slug);

  const toggleSave = (item: Omit<SavedPolicyItem, "savedAt">) =>
    toggleSavePolicy(item);

  const removeSave = (slug: string) => removeSavedPolicy(slug);

  const clearAll = () => clearAllSavedPolicies();

  return {
    savedPolicies,
    count: savedPolicies.length,
    isSaved,
    toggleSave,
    removeSave,
    clearAll,
  };
}
