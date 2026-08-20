import { useState, useEffect } from "react";

const QUEUE_STORAGE_KEY = "rpf_compare_queue_v1";

export function getCompareQueue(): string[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveCompareQueue(queue: string[]): void {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue.slice(-3))); // max 3 items
  } catch (e) {
    // ignore
  }
}

export function useCompareQueue() {
  const [queue, setQueue] = useState<string[]>(() => getCompareQueue());

  useEffect(() => {
    const handleStorage = () => {
      setQueue(getCompareQueue());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addToQueue = (slug: string) => {
    setQueue((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug].slice(-3);
      saveCompareQueue(next);
      return next;
    });
  };

  const removeFromQueue = (slug: string) => {
    setQueue((prev) => {
      const next = prev.filter((s) => s !== slug);
      saveCompareQueue(next);
      return next;
    });
  };

  const clearQueue = () => {
    setQueue([]);
    saveCompareQueue([]);
  };

  const isInQueue = (slug: string) => queue.includes(slug);

  return {
    queue,
    addToQueue,
    removeFromQueue,
    clearQueue,
    isInQueue,
  };
}
