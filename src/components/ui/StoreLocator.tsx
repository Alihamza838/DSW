import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin,
  Search,
  Phone,
  Clock,
  ShieldCheck,
  ExternalLink,
  Navigation,
  Store,
  ChevronRight,
  ListFilter,
  Compass,
  Map as MapIcon,
  LocateFixed,
  RefreshCw,
  Award,
  CheckCircle2,
  FileCheck,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { storeLocationsData, type StoreLocation } from "../../data/storeLocations";
import { Button } from "./button";
import { Link } from "./Link";
import { Pagination } from "./Pagination";
import { StoreMap } from "./StoreMap";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { Skeleton, StoreCardSkeleton } from "./skeleton";
import { cn } from "../../lib/utils";
import {
  calculateDistanceMiles,
  formatDistanceDisplay,
  getStoreOpenStatus,
  sanityCheckDistances,
} from "../../utils/distanceUtils";
import { useSavedStores } from "../../hooks/useSavedStores";
import { StoreLocatorCard } from "../locator/StoreLocatorCard";

const LOCATIONS_PER_PAGE = 8;

interface StoreLocatorProps {
  initialBrandSlug?: string;
  className?: string;
}

// Preset city centers with exact latitude & longitude coordinates
const PRESET_CITIES = [
  { label: "10001 (NYC)", zip: "10001", city: "New York", lat: 40.7505, lng: -73.9882 },
  { label: "90048 (LA)", zip: "90048", city: "Los Angeles", lat: 34.075, lng: -118.375 },
  { label: "60603 (Chicago)", zip: "60603", city: "Chicago", lat: 41.882, lng: -87.628 },
  { label: "75211 (Dallas)", zip: "75211", city: "Dallas", lat: 32.755, lng: -96.895 },
  { label: "M6H 4A9 (Toronto)", zip: "M6H 4A9", city: "Toronto", lat: 43.655, lng: -79.435 },
  { label: "W1C 1DA (London)", zip: "W1C 1DA", city: "London", lat: 51.515, lng: -0.142 },
  { label: "00000 (Dubai)", zip: "00000", city: "Dubai", lat: 25.118, lng: 55.201 },
  { label: "54000 (Lahore)", zip: "54000", city: "Lahore", lat: 31.478, lng: 74.364 },
];

export function StoreLocator({ initialBrandSlug, className }: StoreLocatorProps) {
  const [zipInput, setZipInput] = useState("10001");
  const [selectedBrand, setSelectedBrand] = useState(initialBrandSlug || "all");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "receipt" | "curbside" | "instant" | "saved"
  >("all");
  const [distanceRadius, setDistanceRadius] = useState<number>(100); // miles
  const [unit, setUnit] = useState<"mi" | "km">("mi");
  const [sortBy, setSortBy] = useState<"distance" | "name" | "features">("distance");
  const [locatorPage, setLocatorPage] = useState(1);

  // Saved Stores hook for persistent bookmarking
  const { savedIds, isSaved, toggleSave, savedCount } = useSavedStores();

  // Mobile filter sheet state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Copy feedback state
  const [copiedAddressId, setCopiedAddressId] = useState<string | null>(null);

  // Search anchor coordinates state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>({
    lat: 40.7505,
    lng: -73.9882, // Default NYC Herald Sq
  });
  const [locationLabel, setLocationLabel] = useState("New York, NY (10001)");
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // View Mode: List View vs Interactive Visual Map Preview vs Split View
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMapStore, setSelectedMapStore] = useState<StoreLocation | null>(null);

  // Expandable feature tags state per card
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});

  // Reset page on filter changes
  useEffect(() => {
    setLocatorPage(1);
  }, [selectedBrand, activeFilter, zipInput, distanceRadius, sortBy]);

  // Sync initial brand slug when route prop changes
  useEffect(() => {
    if (initialBrandSlug) {
      setSelectedBrand(initialBrandSlug);
    }
  }, [initialBrandSlug]);

  // Sanity check distances in dev/mount
  useEffect(() => {
    if (userCoords) {
      sanityCheckDistances(storeLocationsData, userCoords.lat, userCoords.lng);
    }
  }, [userCoords]);

  // Unique list of brands
  const uniqueBrands = useMemo(() => {
    const brandsMap = new Map<string, string>();
    storeLocationsData.forEach((loc) => {
      brandsMap.set(loc.brandSlug, loc.brandName);
    });
    return Array.from(brandsMap.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  // Handle Real-time Geolocation Detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setIsGeolocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setLocationLabel("Your Current GPS Location");
        setZipInput(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);

        setTimeout(() => {
          setIsGeolocating(false);
        }, 400);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setGeoError("Unable to retrieve location. Select a quick city below.");
        setIsGeolocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle Quick City Preset Click
  const handlePresetSelect = (cityPreset: (typeof PRESET_CITIES)[0]) => {
    setIsSearching(true);
    setZipInput(cityPreset.zip);
    setUserCoords({ lat: cityPreset.lat, lng: cityPreset.lng });
    setLocationLabel(`${cityPreset.city} (${cityPreset.zip})`);
    setGeoError(null);

    setTimeout(() => {
      setIsSearching(false);
    }, 250);
  };

  // Handle Locate Form Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const query = zipInput.trim().toLowerCase();

    // Match preset cities or zip codes in database
    const matchedPreset = PRESET_CITIES.find(
      (p) => p.zip.toLowerCase().includes(query) || p.city.toLowerCase().includes(query)
    );

    if (matchedPreset) {
      setUserCoords({ lat: matchedPreset.lat, lng: matchedPreset.lng });
      setLocationLabel(`${matchedPreset.city} (${matchedPreset.zip})`);
    } else {
      const matchLoc = storeLocationsData.find(
        (l) =>
          l.zip.toLowerCase().includes(query) ||
          l.city.toLowerCase().includes(query) ||
          l.address.toLowerCase().includes(query)
      );
      if (matchLoc) {
        setUserCoords({ lat: matchLoc.lat, lng: matchLoc.lng });
        setLocationLabel(`${matchLoc.city}, ${matchLoc.state} (${matchLoc.zip})`);
      } else {
        setLocationLabel(`Results for "${zipInput}"`);
      }
    }

    setTimeout(() => {
      setIsSearching(false);
    }, 250);
  };

  // Handle copy address to clipboard
  const handleCopyAddress = (loc: StoreLocation) => {
    const fullText = `${loc.brandName}, ${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}, ${loc.country}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAddressId(loc.id);
    setTimeout(() => setCopiedAddressId(null), 2000);
  };

  // Toggle feature tag expansion per store card
  const toggleFeatureExpand = (storeId: string) => {
    setExpandedFeatures((prev) => ({ ...prev, [storeId]: !prev[storeId] }));
  };

  // Compute distance & sort store locations dynamically
  const processedLocations = useMemo(() => {
    return storeLocationsData
      .map((store) => {
        let distMiles = 0;
        if (userCoords) {
          distMiles = calculateDistanceMiles(userCoords.lat, userCoords.lng, store.lat, store.lng);
        }
        return {
          ...store,
          distanceMiles: distMiles,
        };
      })
      .filter((store) => {
        // 1. Brand match
        if (selectedBrand !== "all" && store.brandSlug !== selectedBrand) {
          return false;
        }

        // 2. Desk Perk / Bookmark Filter
        if (activeFilter === "saved") {
          if (!savedIds.includes(store.id)) return false;
        } else if (activeFilter === "receipt" && !store.hasReceiptLookup) {
          return false;
        } else if (activeFilter === "curbside" && !store.hasCurbsideDropoff) {
          return false;
        } else if (activeFilter === "instant" && !store.hasInstantRefund) {
          return false;
        }

        // 3. Radius filter
        if (store.distanceMiles > distanceRadius) {
          const q = zipInput.toLowerCase().trim();
          const matchZip = store.zip.toLowerCase().includes(q);
          const matchCity = store.city.toLowerCase().includes(q);
          if (!matchZip && !matchCity) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.brandName.localeCompare(b.brandName);
        }
        if (sortBy === "features") {
          return b.features.length - a.features.length;
        }
        // Default sort: Nearest distance first
        return a.distanceMiles - b.distanceMiles;
      });
  }, [selectedBrand, activeFilter, zipInput, userCoords, distanceRadius, sortBy, savedIds]);

  // Set default selected map store when list updates
  useEffect(() => {
    if (processedLocations.length > 0 && !selectedMapStore) {
      setSelectedMapStore(processedLocations[0]);
    }
  }, [processedLocations, selectedMapStore]);

  const showSkeleton = isGeolocating || isSearching;

  return (
    <div
      className={cn(
        "bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden font-sans [container-type:inline-size] w-full min-w-0",
        className
      )}
    >
      {/* ----------------- HEADER & SEARCH SEARCH BAR ----------------- */}
      <div className="bg-ink text-white p-5 md:p-7 relative overflow-hidden">
        {/* Subtle mesh pattern accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-brand/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-brand/20 text-teal-light text-xs font-mono font-bold">
              <Compass className="h-3.5 w-3.5 text-teal-light animate-spin-slow" />
              <span>Verified Real-time Retail Return Locator</span>
            </div>
            {/* MICROCOPY FIX: Shortened clear main title */}
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Find your nearest return desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans font-medium">
              Locate physical return counters with card receipt lookup capability, drive-up curbside dropoff, and instant refund processing.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher */}
            <div className="bg-white/10 p-1 rounded-xl border border-white/10 flex items-center gap-1 text-xs font-sans">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  viewMode === "list"
                    ? "bg-teal-brand text-white shadow-2xs"
                    : "text-white/80 hover:text-white"
                )}
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span>List View</span>
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5",
                  viewMode === "map"
                    ? "bg-teal-brand text-white shadow-2xs"
                    : "text-white/80 hover:text-white"
                )}
              >
                <MapIcon className="h-3.5 w-3.5" />
                <span>Map Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input Form & Real-time Location Controls */}
        <div className="relative z-10 mt-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                placeholder="Enter Zip Code, Postal Code, or City (e.g. 10001, 90048, Toronto)..."
                className="w-full pl-10 pr-4 py-2.5 bg-paper text-ink text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-teal-brand focus:ring-2 focus:ring-teal-brand/30 font-sans font-medium placeholder:text-ink-400"
              />
            </div>

            {/* Brand Filter Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => {
                setIsSearching(true);
                setSelectedBrand(e.target.value);
                setTimeout(() => setIsSearching(false), 200);
              }}
              className="px-3 py-2.5 bg-paper text-ink text-xs sm:text-sm rounded-xl border border-slate-300 font-sans font-bold focus:outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="all">All Retail Chains</option>
              {uniqueBrands.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Primary Action Button */}
            <Button
              type="submit"
              variant="teal"
              className="font-sans font-extrabold text-xs sm:text-sm py-2.5 px-6 shrink-0 gap-1.5 shadow-md hover:brightness-105"
            >
              <Search className="h-4 w-4" />
              <span>Locate Stores</span>
            </Button>

            {/* Detect GPS Location Button */}
            <Button
              type="button"
              onClick={handleDetectLocation}
              disabled={isGeolocating}
              className="bg-white/10 hover:bg-white/20 text-white font-sans font-bold text-xs sm:text-sm py-2.5 px-4 shrink-0 gap-1.5 border border-white/20 cursor-pointer"
            >
              {isGeolocating ? (
                <RefreshCw className="h-4 w-4 animate-spin text-teal-light" />
              ) : (
                <LocateFixed className="h-4 w-4 text-teal-light" />
              )}
              <span>{isGeolocating ? "Detecting..." : "Detect GPS"}</span>
            </Button>
          </form>

          {/* Quick Cities Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-mono text-slate-300 font-bold mr-1">
              Quick Cities:
            </span>
            {PRESET_CITIES.map((city) => (
              <button
                key={city.zip}
                type="button"
                onClick={() => handlePresetSelect(city)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium transition-colors cursor-pointer border",
                  zipInput === city.zip
                    ? "bg-teal-brand text-white border-teal-brand font-bold shadow-2xs"
                    : "bg-white/10 hover:bg-white/20 text-white/90 border-white/10"
                )}
              >
                {city.label}
              </button>
            ))}
          </div>

          {/* Location Status Strip with Microcopy Date Transparency */}
          <div className="flex items-center justify-between text-xs text-slate-300 font-mono bg-white/5 p-2.5 rounded-xl border border-white/10 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-teal-light" />
              <span>
                Search Anchor: <strong className="text-teal-light">{locationLabel}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* MICROCOPY FIX: "as of July 2026" */}
              <span className="text-emerald-400 font-bold">
                {processedLocations.length} Stores Verified as of July 2026
              </span>
              <button
                onClick={() => setUnit(unit === "mi" ? "km" : "mi")}
                className="hover:text-white underline cursor-pointer text-[10px]"
              >
                Unit: {unit.toUpperCase()}
              </button>
            </div>
          </div>

          {geoError && (
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-200 border border-red-500/30 text-xs flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-red-300 shrink-0" />
              <span>{geoError}</span>
            </div>
          )}
        </div>
      </div>

      {/* ----------------- DESKTOP & MOBILE FILTER BAR ----------------- */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs font-sans">
        {/* Mobile Filter Sheet Trigger Button */}
        <div className="block sm:hidden w-full">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 font-bold text-ink flex items-center justify-between shadow-2xs cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-teal-brand" />
              <span>Filter & Sort Options</span>
            </span>
            <span className="text-xs font-mono font-bold text-teal-brand bg-teal-brand/10 px-2.5 py-0.5 rounded-full">
              {processedLocations.length} Results
            </span>
          </button>
        </div>

        {/* Desktop Desk Feature Filters */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <ListFilter className="h-4 w-4 text-ink-500" />
          <span className="font-bold text-ink-800">Filter Desk Features:</span>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer",
                activeFilter === "all"
                  ? "bg-ink text-white"
                  : "bg-white text-ink-700 border border-slate-200 hover:bg-slate-100"
              )}
            >
              All Desks
            </button>
            <button
              onClick={() => setActiveFilter("receipt")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1",
                activeFilter === "receipt"
                  ? "bg-teal-brand text-white"
                  : "bg-white text-ink-700 border border-slate-200 hover:bg-slate-100"
              )}
            >
              <CheckCircle2 className="h-3 w-3" /> Card Receipt Lookup
            </button>
            <button
              onClick={() => setActiveFilter("curbside")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1",
                activeFilter === "curbside"
                  ? "bg-amber-700 text-white"
                  : "bg-white text-ink-700 border border-slate-200 hover:bg-slate-100"
              )}
            >
              <Navigation className="h-3 w-3" /> Curbside Drive-Up
            </button>
            <button
              onClick={() => setActiveFilter("instant")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1",
                activeFilter === "instant"
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-ink-700 border border-slate-200 hover:bg-slate-100"
              )}
            >
              <ShieldCheck className="h-3 w-3" /> Instant Card Refund
            </button>
            {savedCount > 0 && (
              <button
                onClick={() => setActiveFilter("saved")}
                className={cn(
                  "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1",
                  activeFilter === "saved"
                    ? "bg-purple-700 text-white"
                    : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50"
                )}
              >
                <BookmarkCheck className="h-3 w-3" /> Saved Desks ({savedCount})
              </button>
            )}
          </div>
        </div>

        {/* Desktop Radius & Sort Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-ink-500 font-mono">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 bg-white text-ink border border-slate-300 rounded-lg text-xs font-bold cursor-pointer font-sans"
            >
              <option value="distance">Distance (nearest)</option>
              <option value="name">Store name (A-Z)</option>
              <option value="features">Most audited features</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-ink-500 font-mono">Radius:</span>
            <select
              value={distanceRadius}
              onChange={(e) => setDistanceRadius(Number(e.target.value))}
              className="px-2 py-1 bg-white text-ink border border-slate-300 rounded-lg text-xs font-bold cursor-pointer font-sans"
            >
              <option value={10}>Under 10 miles</option>
              <option value={25}>Under 25 miles</option>
              <option value={50}>Under 50 miles</option>
              <option value={100}>Under 100 miles</option>
              <option value={5000}>Worldwide / All</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Overlay */}
      <MobileFilterSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        distanceRadius={distanceRadius}
        setDistanceRadius={setDistanceRadius}
        sortBy={sortBy}
        setSortBy={setSortBy}
        savedCount={savedCount}
        totalResults={processedLocations.length}
      />

      {/* ----------------- CONTENT AREA: CARDS LIST vs LEAFLET MAP PREVIEW ----------------- */}
      {showSkeleton ? (
        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="p-4 sm:p-6 space-y-6">
          {processedLocations.length === 0 ? (
            /* EMPTY STATE WITH RECOVERY ACTIONS */
            <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto font-sans">
              <div className="p-4 rounded-full bg-slate-100 text-slate-400 w-16 h-16 mx-auto flex items-center justify-center">
                <Store className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-lg font-bold text-ink">
                  No return desks found in this search radius
                </h3>
                <p className="text-xs text-ink-500">
                  Try widening your distance limit or select a nearby metropolitan hub below.
                </p>
              </div>

              {/* Recovery Cities Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {PRESET_CITIES.slice(0, 4).map((city) => (
                  <button
                    key={city.zip}
                    onClick={() => handlePresetSelect(city)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-teal-brand/10 hover:text-teal-brand border border-slate-200 transition-colors cursor-pointer"
                  >
                    Try {city.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedBrand("all");
                  setActiveFilter("all");
                  setZipInput("10001");
                  setDistanceRadius(100);
                  setUserCoords({ lat: 40.7505, lng: -73.9882 });
                }}
                className="text-xs text-teal-brand font-bold underline hover:text-teal-dark cursor-pointer pt-2 block mx-auto"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* STORE CARDS GRID WITH OPTIMIZED CONTAINER QUERY RESPONSIVE LAYOUT */
            <div className="grid grid-cols-1 @[540px]:grid-cols-2 @[900px]:grid-cols-3 gap-5 w-full min-w-0">
              {processedLocations
                .slice((locatorPage - 1) * LOCATIONS_PER_PAGE, locatorPage * LOCATIONS_PER_PAGE)
                .map((loc) => (
                  <StoreLocatorCard
                    key={loc.id}
                    location={loc}
                    unit={unit}
                    isBookmarked={isSaved(loc.id)}
                    onToggleBookmark={(id) => toggleSave(id)}
                    isCopied={copiedAddressId === loc.id}
                    onCopyAddress={(l) => handleCopyAddress(l)}
                    isExpanded={!!expandedFeatures[loc.id]}
                    onToggleExpand={(id) => toggleFeatureExpand(id)}
                  />
                ))}
            </div>
          )}

          {/* Pagination Controls */}
          <Pagination
            currentPage={locatorPage}
            totalPages={Math.ceil(processedLocations.length / LOCATIONS_PER_PAGE)}
            onPageChange={(p) => setLocatorPage(p)}
            className="pt-4"
          />
        </div>
      ) : (
        /* ----------------- REAL LEAFLET MAP PREVIEW SPLIT VIEW ----------------- */
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
          {/* Real Leaflet Map Container */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-300 overflow-hidden shadow-sm min-h-[440px] bg-slate-100 relative">
            <StoreMap
              locations={processedLocations}
              selectedStore={selectedMapStore}
              onSelectStore={(store) => setSelectedMapStore(store)}
              userCoords={userCoords}
              unit={unit}
              className="w-full h-full min-h-[440px]"
            />
          </div>

          {/* Map Side Synchronized Cards List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-sans font-bold text-ink text-sm flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-teal-brand" />
                <span>Interactive Map Pins</span>
              </h3>
              <span className="text-xs font-mono font-bold text-teal-brand">
                {processedLocations.length} Stores
              </span>
            </div>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {processedLocations.map((store) => {
                const isSelected = selectedMapStore?.id === store.id;
                const distDisplay = formatDistanceDisplay(store.distanceMiles, unit);

                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedMapStore(store)}
                    className={cn(
                      "p-3.5 rounded-xl border transition-all cursor-pointer font-sans space-y-1.5",
                      isSelected
                        ? "bg-teal-brand/10 border-teal-brand ring-2 ring-teal-brand/40 shadow-xs"
                        : "bg-white border-slate-200 hover:border-teal-brand/50"
                    )}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-ink text-sm">{store.brandName}</span>
                      <span className="text-[10px] font-mono font-bold bg-teal-brand/10 text-teal-brand px-2 py-0.5 rounded">
                        {distDisplay}
                      </span>
                    </div>

                    <p className="text-xs text-ink-600 line-clamp-1">
                      {store.address}, {store.city}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-100">
                      <span className="text-emerald-700 font-mono text-[10px] font-bold inline-flex items-center gap-1">
                        {store.hasReceiptLookup ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 shrink-0" />
                            <span>Receipt Lookup</span>
                          </>
                        ) : (
                          "Photo ID"
                        )}
                      </span>
                      <Link
                        href={`/stores/${store.brandSlug}`}
                        className="text-teal-brand font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>Policy record →</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
