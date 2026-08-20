import * as React from "react";
import { Search } from "lucide-react";
import { VoiceSearchButton } from "../ui/VoiceSearchButton";

interface StoreSearchBarProps {
  searchVal: string;
  setSearchVal: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
}

export function StoreSearchBar({
  searchVal,
  setSearchVal,
  onSearchSubmit,
  placeholder = "Search store name (e.g., Target, DSW, Amazon)...",
  className = "",
}: StoreSearchBarProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <form
      onSubmit={onSearchSubmit}
      className={`w-full flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center ${className}`}
    >
      <div className="relative flex-1 group min-h-[44px]">
        <Search
          className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? "text-red-600 scale-110" : "text-slate-400"
          }`}
        />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full h-full min-h-[44px] rounded-2xl border bg-white py-3 pl-10 pr-11 text-sm font-medium transition-all duration-300 ease-out text-slate-900 placeholder:text-slate-400 ${
            isFocused
              ? "border-red-500 ring-4 ring-red-500/20 shadow-md bg-red-50/10"
              : "border-slate-300 shadow-2xs hover:border-slate-400 focus:outline-none"
          }`}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <VoiceSearchButton
            size="sm"
            onSearchQuery={(q) => {
              setSearchVal(q);
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full sm:w-auto min-h-[44px] px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer shrink-0 shadow-2xs flex items-center justify-center gap-2 active:scale-[0.98] ${
          isFocused ? "bg-red-700 shadow-md" : ""
        }`}
      >
        <Search className="h-4 w-4 sm:hidden" />
        <span>Search Stores</span>
      </button>
    </form>
  );
}
