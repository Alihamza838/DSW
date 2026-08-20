import { useState, useEffect } from "react";

const STORAGE_KEY = "savedStoreLocations";

export function useSavedStores() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn("Failed to persist saved stores to localStorage", e);
    }
  }, [savedIds]);

  const toggleSave = (storeId: string) => {
    setSavedIds((prev) =>
      prev.includes(storeId)
        ? prev.filter((id) => id !== storeId)
        : [...prev, storeId]
    );
  };

  const isSaved = (storeId: string) => savedIds.includes(storeId);

  return {
    savedIds,
    isSaved,
    toggleSave,
    savedCount: savedIds.length,
  };
}
