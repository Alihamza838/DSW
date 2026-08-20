import * as React from "react";
import { Menu, X, ChevronDown, Search, ShieldCheck, BookOpen, Store, HelpCircle, Scale, Globe } from "lucide-react";
import { Link } from "../ui/Link";
import { BrandLogo } from "../ui/BrandLogo";
import { CommandPalette } from "../ui/CommandPalette";
import { ReadingProgressBar } from "../ui/ReadingProgressBar";
import { cn } from "../../lib/utils";
import { storesData } from "../../data/stores";

interface HeaderProps {
  onOpenPwaModal?: (tab?: "desktop" | "mobile") => void;
}

const MORE_PAGES = [
  { name: "Compare Stores", href: "/compare" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Editorial Policy", href: "/editorial-policy" },
  { name: "Legal Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
];

export function Header({ onOpenPwaModal }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<"stores" | "more" | null>(null);
  const [currentPath, setCurrentPath] = React.useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Sync currentPath on location popstate / interval
  React.useEffect(() => {
    const syncPath = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener("popstate", syncPath);
    const interval = setInterval(syncPath, 300);
    return () => {
      window.removeEventListener("popstate", syncPath);
      clearInterval(interval);
    };
  }, []);

  // Global keyboard shortcut for Ctrl+K / Cmd+K search palette trigger
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

  const handleMouseEnter = (menu: "stores" | "more") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Route active checks
  const isHomeActive = currentPath === "/" || currentPath === "";
  const isBlogActive = currentPath.startsWith("/blog") || currentPath.startsWith("/guides");
  const isCompareActive = currentPath === "/compare" || currentPath === "/compare/" || currentPath === "/stores/compare";
  const isStoresActive = (currentPath.startsWith("/stores") && !isCompareActive);
  const isMoreActive = MORE_PAGES.some(p => currentPath.startsWith(p.href) || (p.href === "/privacy-policy" && currentPath === "/privacy") || (p.href === "/terms-of-use" && currentPath === "/terms"));

  return (
    <>
      <ReadingProgressBar />
      <CommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo Left */}
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-center focus:outline-none hover:opacity-90 transition-opacity">
              <BrandLogo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 font-sans text-sm font-semibold">
              <Link
                href="/"
                className={cn(
                  "px-3.5 py-2 rounded-xl transition-all duration-150 relative group",
                  isHomeActive
                    ? "text-red-600 bg-red-50/90 font-bold shadow-2xs"
                    : "text-slate-700 hover:text-red-600 hover:bg-slate-100/80"
                )}
              >
                <span>Home</span>
                <span className={cn(
                  "absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full transition-all duration-200",
                  isHomeActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )} />
              </Link>

              {/* Blog Link */}
              <Link
                href="/blog"
                className={cn(
                  "px-3.5 py-2 rounded-xl transition-all duration-150 relative group",
                  isBlogActive
                    ? "text-red-600 bg-red-50/90 font-bold shadow-2xs"
                    : "text-slate-700 hover:text-red-600 hover:bg-slate-100/80"
                )}
              >
                <span>Blog</span>
                <span className={cn(
                  "absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full transition-all duration-200",
                  isBlogActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )} />
              </Link>

              {/* Other Stores Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("stores")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/stores"
                  onClick={() => setActiveDropdown(null)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5 relative group cursor-pointer",
                    isStoresActive
                      ? "text-red-600 bg-red-50/90 font-bold shadow-2xs"
                      : "text-slate-700 hover:text-red-600 hover:bg-slate-100/80"
                  )}
                >
                  <span>Other Stores</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 text-slate-400 group-hover:text-red-600", activeDropdown === "stores" && "rotate-180 text-red-600")} />
                  <span className={cn(
                    "absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full transition-all duration-200",
                    isStoresActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  )} />
                </Link>

                {activeDropdown === "stores" && (
                  <div className="absolute left-0 top-full mt-1.5 w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                          Retailer Directory ({storesData.length})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                        2026 Audited
                      </span>
                    </div>

                    <div className="text-[10px] font-mono font-bold uppercase text-slate-400 mb-1.5 px-1">
                      Popular Store Return Desks
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
                      {storesData.map((store) => {
                        const isThisStoreActive = currentPath === `/stores/${store.slug}`;
                        return (
                          <Link
                            key={store.slug}
                            href={`/stores/${store.slug}`}
                            onClick={() => setActiveDropdown(null)}
                            className={cn(
                              "flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all text-xs group",
                              isThisStoreActive
                                ? "bg-red-50 text-red-700 font-bold border-l-2 border-red-600"
                                : "hover:bg-slate-50 text-slate-700 hover:text-red-600"
                            )}
                          >
                            <span className="truncate font-medium group-hover:font-semibold">
                              {store.brand}
                            </span>
                            <span className="text-[9px] font-mono font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md group-hover:bg-red-100 group-hover:text-red-700 shrink-0">
                              {store.quickAnswer.returnWindow.split(" ")[0]}d
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between px-1">
                      <Link
                        href="/compare"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-slate-700 hover:text-red-600 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Scale className="h-3.5 w-3.5 text-red-600" />
                        <span>Compare Matrix</span>
                      </Link>
                      <Link
                        href="/stores"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Browse All Stores</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("more")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "more" ? null : "more")}
                  className={cn(
                    "px-3.5 py-2 rounded-xl transition-all duration-150 inline-flex items-center gap-1 cursor-pointer relative group",
                    isMoreActive
                      ? "text-red-600 bg-red-50/90 font-bold shadow-2xs"
                      : "text-slate-700 hover:text-red-600 hover:bg-slate-100/80"
                  )}
                >
                  <span>More</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200 text-slate-400 group-hover:text-red-600", activeDropdown === "more" && "rotate-180 text-red-600")} />
                  <span className={cn(
                    "absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full transition-all duration-200",
                    isMoreActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  )} />
                </button>

                {activeDropdown === "more" && (
                  <div className="absolute left-0 top-full mt-1.5 w-[420px] bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
                    {/* Featured Tool Banner inside More Menu */}
                    <div className="mb-3.5 p-3 bg-slate-900 rounded-xl text-white shadow-xs flex items-center justify-between border border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-red-600 rounded-lg text-white">
                          <Scale className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-snug flex items-center gap-1.5">
                            <span>Compare Stores Matrix</span>
                            <span className="text-[9px] font-mono bg-red-500/30 text-red-300 border border-red-500/40 px-1.5 py-0.2 rounded">Live Tool</span>
                          </div>
                          <div className="text-[10px] text-slate-300">Side-by-side return window & fee benchmark</div>
                        </div>
                      </div>
                      <Link
                        href="/compare"
                        onClick={() => setActiveDropdown(null)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-all shadow-2xs shrink-0 cursor-pointer"
                      >
                        Compare
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* DSW Return Guides Column (Main Focus) */}
                      <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                        <div className="text-[11px] font-mono font-bold uppercase text-red-600 tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-200/80 mb-2">
                          <BookOpen className="h-3.5 w-3.5 text-red-600" />
                          <span>DSW Guides (Main)</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          <Link
                            href="/blog/dsw-return-policy-complete-guide"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2 py-1 rounded-lg text-slate-800 hover:text-red-600 hover:bg-white font-medium transition-colors"
                          >
                            DSW Complete 2026 Audit
                          </Link>
                          <Link
                            href="/blog/dsw-vip-rewards-return-policy-perks-guide"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2 py-1 rounded-lg text-slate-800 hover:text-red-600 hover:bg-white font-medium transition-colors"
                          >
                            VIP 90-Day & Points Perks
                          </Link>
                          <Link
                            href="/blog/dsw-in-store-exchanges-and-clearance-rack-returns-guide"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2 py-1 rounded-lg text-slate-800 hover:text-red-600 hover:bg-white font-medium transition-colors"
                          >
                            In-Store & Clearance Rules
                          </Link>
                          <Link
                            href="/blog/dsw-shoes-return-policy"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2 py-1 rounded-lg text-slate-800 hover:text-red-600 hover:bg-white font-medium transition-colors"
                          >
                            Worn Shoes Guidelines
                          </Link>
                          <Link
                            href="/blog/dsw-return-policy-without-receipt"
                            onClick={() => setActiveDropdown(null)}
                            className="block px-2 py-1 rounded-lg text-slate-800 hover:text-red-600 hover:bg-white font-medium transition-colors"
                          >
                            Lost Receipt Lookup Hacks
                          </Link>
                        </div>
                      </div>

                      {/* Editorial & Governance Column */}
                      <div className="p-1">
                        <div className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100 mb-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                          <span>Company & Legal</span>
                        </div>
                        <div className="space-y-1 text-xs">
                          {MORE_PAGES.map((p) => {
                            const isPageActive = currentPath === p.href;
                            return (
                              <Link
                                key={p.href}
                                href={p.href}
                                onClick={() => setActiveDropdown(null)}
                                className={cn(
                                  "block px-2.5 py-1.5 rounded-lg transition-colors",
                                  isPageActive
                                    ? "bg-red-50 text-red-700 font-bold border-l-2 border-red-600"
                                    : "text-slate-700 hover:text-red-600 hover:bg-slate-50 font-medium"
                                )}
                              >
                                {p.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compare Stores Link (Moved after More) */}
              <Link
                href="/compare"
                className={cn(
                  "px-3.5 py-2 rounded-xl transition-all duration-150 inline-flex items-center gap-1.5 relative group",
                  isCompareActive
                    ? "text-red-600 bg-red-50/90 font-bold shadow-2xs"
                    : "text-slate-700 hover:text-red-600 hover:bg-slate-100/80"
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span>Compare Stores</span>
                <span className={cn(
                  "absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full transition-all duration-200",
                  isCompareActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                )} />
              </Link>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Command Palette Search trigger */}
            <button
              type="button"
              onClick={() => setIsCmdPaletteOpen(true)}
              className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2.5 transition-all cursor-pointer border border-slate-200/90 shadow-2xs hover:shadow-xs active:scale-98 shrink-0 whitespace-nowrap"
              title={`Search store policies (${isMac ? "⌘K" : "Ctrl+K"})`}
            >
              <Search className="h-4 w-4 text-red-600 shrink-0" />
              <span className="hidden sm:inline-block">Search policies...</span>
              <kbd className="hidden sm:inline-flex items-center font-mono text-[10px] font-bold bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-500 shadow-2xs">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1 font-semibold text-sm">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl transition-colors",
                  isHomeActive
                    ? "bg-red-50 text-red-600 font-bold border-l-2 border-red-600"
                    : "hover:bg-slate-100 text-slate-800"
                )}
              >
                Home (DSW Return Policy)
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl transition-colors",
                  isBlogActive
                    ? "bg-red-50 text-red-600 font-bold border-l-2 border-red-600"
                    : "hover:bg-slate-100 text-slate-800"
                )}
              >
                Blog Guides
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl transition-colors",
                  isCompareActive
                    ? "bg-red-50 text-red-600 font-bold border-l-2 border-red-600"
                    : "hover:bg-slate-100 text-slate-800"
                )}
              >
                Compare Policies Side-by-Side
              </Link>
              <Link
                href="/stores"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl transition-colors",
                  isStoresActive
                    ? "bg-red-50 text-red-600 font-bold border-l-2 border-red-600"
                    : "hover:bg-slate-100 text-slate-800"
                )}
              >
                Other Stores Directory
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-mono font-bold uppercase text-slate-400 px-3 mb-2">
                Popular Retailers
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {storesData.slice(0, 8).map((st) => (
                  <Link
                    key={st.slug}
                    href={`/stores/${st.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg truncate transition-colors",
                      currentPath === `/stores/${st.slug}`
                        ? "bg-red-50 text-red-700 font-bold"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {st.brand}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-500 px-3">
              {MORE_PAGES.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "hover:text-red-600 transition-colors",
                    currentPath === p.href && "text-red-600 font-bold underline"
                  )}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
