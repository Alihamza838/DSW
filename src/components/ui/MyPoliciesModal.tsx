import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Bookmark,
  BookmarkCheck,
  X,
  Trash2,
  ExternalLink,
  Store,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
} from "lucide-react";
import { useSavedPolicies, SavedPolicyItem } from "../../lib/savedPolicies";
import { Link, navigate } from "./Link";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface MyPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyPoliciesModal({ isOpen, onClose }: MyPoliciesModalProps) {
  const { savedPolicies, count, removeSave, clearAll } = useSavedPolicies();
  const [filter, setFilter] = useState<"all" | "store" | "article">("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen || typeof document === "undefined") return null;

  const filteredItems = savedPolicies.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-[9999] w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100"
        >
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <BookmarkCheck className="h-6 w-6 text-teal-600 dark:text-teal-400 fill-teal-500/20" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black font-display tracking-tight text-slate-900 dark:text-white">
                    My Saved Policies
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold">
                    {count} {count === 1 ? "Item" : "Items"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Your bookmarked store return policies & guide articles
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Bar & Search */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  filter === "all"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                All ({savedPolicies.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("store")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  filter === "store"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Store className="h-3.5 w-3.5" />
                Stores ({savedPolicies.filter((i) => i.type === "store").length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("article")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  filter === "article"
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Guides ({savedPolicies.filter((i) => i.type === "article").length})
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved..."
                className="w-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 border border-transparent"
              />
            </div>
          </div>

          {/* Items List Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 min-h-[220px]">
            {filteredItems.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                  <Bookmark className="h-6 w-6 stroke-1" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {searchQuery ? "No matching saved policies" : "No saved policies yet"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {searchQuery
                      ? "Try searching for a different retailer name or keyword."
                      : "Click the 'Save Policy' bookmark button on any store page or guide to save it here for quick offline reference."}
                  </p>
                </div>
                {!searchQuery && (
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <Button
                      variant="teal"
                      size="sm"
                      onClick={() => {
                        onClose();
                        navigate("/stores");
                      }}
                      className="font-bold text-xs"
                    >
                      Browse All Stores
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onClose();
                        navigate("/blog");
                      }}
                      className="font-bold text-xs"
                    >
                      Explore Guides
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredItems.map((item) => {
                  const targetUrl =
                    item.type === "article"
                      ? `/blog/${item.slug}`
                      : `/stores/${item.slug}`;

                  return (
                    <div
                      key={item.slug}
                      className="group p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 hover:shadow-md transition-all flex items-center justify-between gap-3"
                    >
                      <Link
                        href={targetUrl}
                        onClick={onClose}
                        className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                      >
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0 text-teal-600 dark:text-teal-400">
                          {item.type === "article" ? (
                            <BookOpen className="h-5 w-5" />
                          ) : (
                            <Store className="h-5 w-5" />
                          )}
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
                              {item.title}
                            </h4>
                            {item.returnWindow && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold shrink-0">
                                {item.returnWindow}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="capitalize font-mono text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                              {item.type}
                            </span>
                            <span>•</span>
                            <span>
                              Saved {new Date(item.savedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={targetUrl}
                          onClick={onClose}
                          className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 transition-colors text-xs font-bold flex items-center gap-1"
                        >
                          <span>View</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeSave(item.slug)}
                          title="Remove from saved"
                          className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          {savedPolicies.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex items-center justify-between text-xs shrink-0">
              <button
                type="button"
                onClick={clearAll}
                className="text-red-600 dark:text-red-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All Saved</span>
              </button>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-500" />
                <span>Stored locally in browser</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
