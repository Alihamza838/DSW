import * as React from "react";
import { Home, BookOpen, Store, ArrowLeftRight, Heart, X, Trash2, ExternalLink } from "lucide-react";
import { Link } from "../ui/Link";
import { getFavorites, subscribeFavorites, SavedFavorite, toggleFavorite } from "../../utils/favorites";

export function BottomNav() {
  const [favorites, setFavorites] = React.useState<SavedFavorite[]>(getFavorites());
  const [isFavoritesOpen, setIsFavoritesOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("/");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const pillRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };
    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    const unsubFav = subscribeFavorites(() => {
      setFavorites(getFavorites());
    });
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      unsubFav();
    };
  }, []);

  // Update sliding pill position for active tab
  const updatePill = React.useCallback((instant = false) => {
    if (!containerRef.current || !pillRef.current) return;
    const activeTab = containerRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
    if (activeTab) {
      if (instant) {
        pillRef.current.style.transition = "none";
      }
      pillRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      pillRef.current.style.width = `${activeTab.offsetWidth}px`;
      if (instant) {
        void pillRef.current.offsetHeight;
        pillRef.current.style.transition = "";
      }
    }
  }, []);

  React.useEffect(() => {
    updatePill(true);
    const handleResize = () => updatePill(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPath, isFavoritesOpen, updatePill]);

  const favCount = favorites.length;

  const isHome = currentPath === "/";
  const isBlog = currentPath.startsWith("/blog") || currentPath.startsWith("/guides");
  const isLocations = currentPath.startsWith("/stores") || currentPath.startsWith("/currency-guides");
  const isCompare = currentPath.startsWith("/compare");
  const isSaved = isFavoritesOpen;

  return (
    <>
      {/* Mobile Fixed Bottom Navigation Bar with Transitions.dev Sliding Pill */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-paper shadow-2xl md:hidden px-2 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
      >
        <div
          ref={containerRef}
          role="tablist"
          className="t-tabs relative flex items-center justify-between max-w-md mx-auto bg-slate-900/90 p-1 rounded-full border border-white/10 shadow-inner"
        >
          {/* Transitions.dev Sliding Pill Indicator */}
          <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />

          {/* 1. Home Tab */}
          <Link
            href="/"
            role="tab"
            aria-selected={isHome && !isSaved}
            className="t-tab flex-1 flex flex-col items-center justify-center min-h-[44px] px-1 py-1 rounded-full text-xs font-sans transition-colors cursor-pointer"
          >
            <Home className={`h-4 w-4 ${isHome && !isSaved ? "text-teal-400" : "text-slate-400"}`} />
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Home</span>
          </Link>

          {/* 2. Blog Tab (Replaced Store) */}
          <Link
            href="/blog"
            role="tab"
            aria-selected={isBlog && !isSaved}
            className="t-tab flex-1 flex flex-col items-center justify-center min-h-[44px] px-1 py-1 rounded-full text-xs font-sans transition-colors cursor-pointer"
          >
            <BookOpen className={`h-4 w-4 ${isBlog && !isSaved ? "text-teal-400" : "text-slate-400"}`} />
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Blog</span>
          </Link>

          {/* 3. Store Tab */}
          <Link
            href="/stores"
            role="tab"
            aria-selected={isLocations && !isSaved}
            className="t-tab flex-1 flex flex-col items-center justify-center min-h-[44px] px-1 py-1 rounded-full text-xs font-sans transition-colors cursor-pointer"
          >
            <Store className={`h-4 w-4 ${isLocations && !isSaved ? "text-teal-400" : "text-slate-400"}`} />
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Store</span>
          </Link>

          {/* 4. Compare Tab */}
          <Link
            href="/compare"
            role="tab"
            aria-selected={isCompare && !isSaved}
            className="t-tab flex-1 flex flex-col items-center justify-center min-h-[44px] px-1 py-1 rounded-full text-xs font-sans transition-colors cursor-pointer"
          >
            <ArrowLeftRight className={`h-4 w-4 ${isCompare && !isSaved ? "text-teal-400" : "text-slate-400"}`} />
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Compare</span>
          </Link>

          {/* 5. Saved Favorites Trigger Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={isSaved}
            onClick={() => setIsFavoritesOpen(true)}
            className="t-tab flex-1 flex flex-col items-center justify-center min-h-[44px] px-1 py-1 rounded-full text-xs font-sans transition-colors relative cursor-pointer"
          >
            <div className="relative">
              <Heart className={`h-4 w-4 ${isSaved ? "text-amber-400 fill-amber-400" : "text-amber-400/90"}`} />
              {favCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-teal-brand text-white font-mono font-extrabold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                  {favCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Saved</span>
          </button>
        </div>
      </nav>

      {/* CSS Styles for transitions.dev Tabs Sliding Pill */}
      <style>{`
        .t-tabs {
          --tabs-dur: 250ms;
          --tabs-ease: cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t-tab {
          position: relative;
          z-index: 1;
          color: rgba(226, 232, 240, 0.7);
          transition: color var(--tabs-dur) var(--tabs-ease);
        }
        .t-tab[aria-selected="true"] {
          color: #ffffff;
          font-weight: 800;
        }
        .t-tabs-pill {
          position: absolute;
          top: 3px;
          bottom: 3px;
          left: 0;
          width: 0;
          background: rgba(20, 184, 166, 0.25);
          border: 1px solid rgba(45, 212, 191, 0.4);
          box-shadow: 0 0 12px rgba(20, 184, 166, 0.3);
          border-radius: 9999px;
          transform: translateX(0);
          transition: transform var(--tabs-dur) var(--tabs-ease), width var(--tabs-dur) var(--tabs-ease);
          will-change: transform, width;
          z-index: 0;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .t-tabs-pill, .t-tab { transition: none !important; }
        }
      `}</style>

      {/* Saved Favorites Drawer Modal */}
      {isFavoritesOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
          <div className="bg-white text-ink w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl border border-ink-100 max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-ink-100 flex items-center justify-between bg-paper rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-amber-500 fill-amber-500" />
                <h3 className="font-display font-bold text-base text-ink">
                  Your Saved Stores & Deals ({favCount})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFavoritesOpen(false)}
                className="p-1.5 text-ink-400 hover:text-ink rounded-lg hover:bg-ink-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {favCount === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <Heart className="h-10 w-10 text-ink-300 mx-auto" />
                  <p className="text-sm font-bold text-ink">No saved items yet</p>
                  <p className="text-xs text-ink-500 max-w-xs mx-auto">
                    Bookmark stores or verified deals while browsing to quickly compare policies anytime.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsFavoritesOpen(false)}
                    className="inline-block mt-3 bg-teal-brand text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-teal-dark transition-colors"
                  >
                    Browse Global Deals
                  </Link>
                </div>
              ) : (
                favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-ink-100 bg-paper hover:border-teal-brand/40 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-mono text-teal-brand font-bold uppercase">
                        {fav.type} • {fav.brandOrStore}
                      </div>
                      <h4 className="text-xs font-bold text-ink line-clamp-1">
                        {fav.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {fav.type === "store" ? (
                        <Link
                          href={`/stores/${fav.slugOrUrl}`}
                          onClick={() => setIsFavoritesOpen(false)}
                          className="p-2 bg-teal-brand text-white rounded-lg text-xs font-bold hover:bg-teal-dark"
                        >
                          View Policy
                        </Link>
                      ) : (
                        <a
                          href={fav.slugOrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-teal-brand text-white rounded-lg text-xs font-bold hover:bg-teal-dark flex items-center gap-1"
                        >
                          <span>Buy</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleFavorite(fav)}
                        aria-label="Remove item"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-ink-100 bg-paper text-center rounded-b-2xl">
              <Link
                href="/products"
                onClick={() => setIsFavoritesOpen(false)}
                className="text-xs font-mono font-bold text-teal-brand hover:underline"
              >
                Browse All Deals & Product Policies →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
