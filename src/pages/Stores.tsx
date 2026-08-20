import * as React from "react";
import { LayoutGrid, Globe } from "lucide-react";
import { storesData } from "../data/stores";
import { Link } from "../components/ui/Link";
import { useSEO } from "../hooks/useSEO";
import { StaggerContainer, StaggerItem } from "../components/layout/PageTransition";
import { Pagination } from "../components/ui/Pagination";
import { StoreCardSkeleton } from "../components/ui/skeleton";
import { BrandLogoIcon } from "../components/ui/BrandLogo";
import { StoreCard } from "../components/store/StoreCard";
import { StoreDirectoryHeader } from "../components/store/StoreDirectoryHeader";

const ITEMS_PER_PAGE = 12;

export function StoresPage() {
  const [searchVal, setSearchVal] = React.useState("");
  const [currentQuery, setCurrentQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filterAlertsOnly, setFilterAlertsOnly] = React.useState(false);

  useSEO({
    title: "All Retailer Return Policies Directory - Global 2026 Index",
    description: "Browse our comprehensive directory of 2026 verified store return, refund, and exchange policies. Search and filter across major international platforms in the US, India, Pakistan, Canada, and China.",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Stores", item: "/stores" },
    ],
  });

  // Count stores with active policy alerts
  const alertStoresCount = React.useMemo(() => {
    return storesData.filter((s) => !!s.policyAlert).length;
  }, []);

  // Handle temporary skeleton loading state on filter change
  const handleCountryChange = (countryCode: string) => {
    setIsLoading(true);
    setSelectedCountry(countryCode);
    setFilterAlertsOnly(false);
    setTimeout(() => setIsLoading(false), 250);
  };

  // Read search query from URL search parameters on popstate / load
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("q") || "";
    setSearchVal(queryParam);
    setCurrentQuery(queryParam.toLowerCase().trim());

    // Setup an event listener for popstate to sync URL search with input state
    const handlePopState = () => {
      const liveParams = new URLSearchParams(window.location.search);
      const liveQuery = liveParams.get("q") || "";
      setSearchVal(liveQuery);
      setCurrentQuery(liveQuery.toLowerCase().trim());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchVal.trim();
    if (cleanQuery) {
      window.history.pushState({}, "", `/stores?q=${encodeURIComponent(cleanQuery)}`);
    } else {
      window.history.pushState({}, "", "/stores");
    }
    const popEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popEvent);
  };

  const filtered = storesData.filter((s) => {
    let matchesSearch = true;
    if (currentQuery) {
      const brandMatch = s.brand.toLowerCase().includes(currentQuery);
      const descMatch = s.metaDescription?.toLowerCase().includes(currentQuery);
      const windowMatch = s.quickAnswer.returnWindow.toLowerCase().includes(currentQuery);
      const refundMatch = s.quickAnswer.refundMethod.toLowerCase().includes(currentQuery);
      const categoryMatch = s.category?.some((c) => c.toLowerCase().includes(currentQuery));
      const alertMatch = s.policyAlert?.title.toLowerCase().includes(currentQuery) || s.policyAlert?.message.toLowerCase().includes(currentQuery);
      matchesSearch = brandMatch || descMatch || windowMatch || refundMatch || categoryMatch || alertMatch;
    }
    const storeCountry = s.country || "US";
    const matchesCountry = selectedCountry === "All" ? true : storeCountry === selectedCountry;
    const matchesAlerts = filterAlertsOnly ? !!s.policyAlert : true;
    return matchesSearch && matchesCountry && matchesAlerts;
  });

  // Reset page when filters or query change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [currentQuery, selectedCountry, filterAlertsOnly]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedStores = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh] font-sans">
      {/* Refactored Fully Responsive Directory Header Section */}
      <StoreDirectoryHeader
        alertStoresCount={alertStoresCount}
        totalStoresCount={storesData.length}
        filterAlertsOnly={filterAlertsOnly}
        setFilterAlertsOnly={setFilterAlertsOnly}
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        searchVal={searchVal}
        setSearchVal={(val) => {
          setSearchVal(val);
          setCurrentQuery(val.toLowerCase().trim());
        }}
        onSearchSubmit={handleSearchSubmit}
        showingCount={paginatedStores.length}
        totalFilteredCount={filtered.length}
      />

      <div className="mt-8">
        {/* Dynamic Search Route Guides (GEO/AEO friendly) */}
        {(currentQuery.includes("dubai") || currentQuery.includes("uae") || currentQuery.includes("saudi") || currentQuery.includes("ksa") || currentQuery.includes("noon") || currentQuery.includes("shein") || currentQuery.includes("middle")) && (
          <div className="mb-6 p-4 rounded-2xl border border-red-200 bg-red-50/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded tracking-wide">Featured 2026 Guide</span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1.5">Dubai & Saudi Arabia E-Commerce Returns Showdown</h4>
              <p className="text-xs text-slate-600 mt-1">Read our deep-dives on Amazon, Noon, eBay, Etsy, and Shein returns in Dubai (UAE) and Saudi Arabia (KSA).</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/blog/dubai-e-commerce-return-policy-guide-2026">
                <button className="px-3.5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer shadow-2xs">
                  Dubai 🇦🇪 Guide
                </button>
              </Link>
              <Link href="/blog/ksa-consumer-protection-return-guide-2026">
                <button className="px-3.5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer shadow-2xs">
                  Saudi 🇸🇦 Guide
                </button>
              </Link>
            </div>
          </div>
        )}

        {(currentQuery.includes("ebay") || currentQuery.includes("global") || currentQuery.includes("international") || currentQuery.includes("country")) && (
          <div className="mb-6 p-4 rounded-2xl border border-red-200 bg-red-50/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase bg-red-600 text-white px-2 py-0.5 rounded tracking-wide">Featured 2026 Guide</span>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1.5">eBay Global Return Policy & Guarantee</h4>
              <p className="text-xs text-slate-600 mt-1">Get the complete country-by-country breakdown of eBay&apos;s return regulations (US, UK, CA, AU, UAE, KSA).</p>
            </div>
            <Link href="/blog/global-marketplaces-guide" className="shrink-0">
              <button className="px-3.5 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4 shrink-0" />
                <span>Read Global Guide</span>
              </button>
            </Link>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <StoreCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          /* Store Card Grid Container: Image slots and brand details rendered in StoreCard */
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {paginatedStores.map((store) => (
              <StaggerItem key={store.slug} className="h-full">
                {/* Store Card Item Component - Includes Store Image Slot */}
                <StoreCard store={store} query={currentQuery} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Reusable Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 300, behavior: "smooth" });
          }}
          className="mt-8"
        />

        {/* Global Retail Return Directory FAQs Section */}
        <section className="mt-16 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">Master Directory FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Frequently Asked Questions About Store Return Policies
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Everything you need to know about return windows, receipt lookups, return shipping fees, and store credits in 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>How do store return windows work in 2026?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                Most major retailers offer return windows ranging from 30 to 90 days from the date of purchase or online delivery. Electronics and seasonal items often have shorter windows (14 to 30 days).
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Can I return items to stores without a receipt?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                Yes! Most major chains (DSW, Target, American Eagle, Sephora, Nike) can look up receipts digitally using your credit/debit card, phone number, or store account. Unverified returns without proof receive store credit at the lowest recent selling price.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Which retailers charge for online mail return shipping?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                Many fast-fashion and department stores deduct $5.00–$8.50 from your refund for mail return shipping labels unless you are a rewards member. In-store returns at local physical locations are almost always 100% free.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>What is the difference between a cash refund and store credit?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                Returns made within the standard window with proof of purchase are refunded to your original payment method (cash, debit, or credit card). Returns made after deadline or with gift receipts are issued as store merchandise credits.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>Are restocking fees common on returned items?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                Restocking fees (typically 15%) are charged primarily on opened high-value electronics, major appliances, camera gear, and special order furniture. Apparel and footwear rarely carry restocking fees.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <span className="text-red-600 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                <span>How do extended holiday return policies work?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                During Q4 (October through December 25), most retailers extend their return window until January 31 of the following year, giving gift recipients ample time to exchange or return items.
              </p>
            </div>
          </div>
        </section>

        {filtered.length === 0 && (
          <div className="text-center py-12 border border-dashed border-slate-300 rounded-2xl bg-white mt-4 space-y-3">
            <div className="mx-auto h-12 w-12 text-slate-300 opacity-60">
              <BrandLogoIcon variant="dark" animated={false} />
            </div>
            <p className="text-slate-500 font-medium text-sm">No matching retailers found in our directory.</p>
            <button
              type="button"
              onClick={() => {
                setSearchVal("");
                setFilterAlertsOnly(false);
                setSelectedCountry("All");
                window.history.pushState({}, "", "/stores");
                const popEvent = new PopStateEvent("popstate");
                window.dispatchEvent(popEvent);
              }}
              className="mt-3 text-red-600 hover:underline font-bold text-xs cursor-pointer"
            >
              Clear filters and view all
            </button>
          </div>
        )}
      </div>

    </div>
  );
}


