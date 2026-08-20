import * as React from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { BreadcrumbNav } from "../ui/BreadcrumbNav";
import { ReturnEligibilityQuiz } from "../ui/ReturnEligibilityQuiz";
import { PolicyWatchAlert } from "./PolicyWatchAlert";
import { StoreSearchBar } from "./StoreSearchBar";
import { CountryFilterChips } from "./CountryFilterChips";

interface StoreDirectoryHeaderProps {
  alertStoresCount: number;
  totalStoresCount: number;
  filterAlertsOnly: boolean;
  setFilterAlertsOnly: (val: boolean) => void;
  selectedCountry: string;
  setSelectedCountry: (code: string) => void;
  searchVal: string;
  setSearchVal: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  showingCount: number;
  totalFilteredCount: number;
}

export function StoreDirectoryHeader({
  alertStoresCount,
  totalStoresCount,
  filterAlertsOnly,
  setFilterAlertsOnly,
  selectedCountry,
  setSelectedCountry,
  searchVal,
  setSearchVal,
  onSearchSubmit,
  showingCount,
  totalFilteredCount,
}: StoreDirectoryHeaderProps) {
  const [showQuiz, setShowQuiz] = React.useState(false);

  return (
    <div className="space-y-6 font-sans">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav items={[{ label: "Store", href: "/stores" }]} />

      {/* Main Directory Title & Quiz Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Store Return Policies Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse 2026 verified return, refund, and exchange guidelines for major US and international retailers. 
            Every policy is double-checked against official terms.
          </p>
        </div>

        {/* Return Quiz Toggle Button */}
        <button
          type="button"
          onClick={() => setShowQuiz((prev) => !prev)}
          className={`w-full sm:w-auto min-h-[44px] shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer active:scale-95 ${
            showQuiz
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>{showQuiz ? "Hide Return Quiz" : "Test Return Eligibility Quiz"}</span>
          {showQuiz ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
        </button>
      </div>

      {/* Unified Search Bar & Filter Chips Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
        <StoreSearchBar
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          onSearchSubmit={onSearchSubmit}
        />

        <div className="pt-3 border-t border-slate-100">
          <CountryFilterChips
            selectedCountry={selectedCountry}
            onSelectCountry={(code) => {
              setSelectedCountry(code);
              setFilterAlertsOnly(false);
            }}
            filterAlertsOnly={filterAlertsOnly}
            onToggleAlerts={() => setFilterAlertsOnly(!filterAlertsOnly)}
            alertStoresCount={alertStoresCount}
            totalStoresCount={totalStoresCount}
          />
        </div>
      </div>

      {/* Collapsible Return Eligibility Quiz */}
      {showQuiz && (
        <div className="animate-fade-in pt-1">
          <ReturnEligibilityQuiz />
        </div>
      )}

      {/* 2026 Critical Policy Watch Alert Banner */}
      {!filterAlertsOnly && (
        <PolicyWatchAlert
          alertCount={alertStoresCount}
          onViewAlerts={() => {
            setFilterAlertsOnly(true);
            setSelectedCountry("All");
          }}
        />
      )}
    </div>
  );
}
