import * as React from "react";
import { Globe, MapPin, X, Check, ChevronDown, Info } from "lucide-react";
import { SUPPORTED_COUNTRIES, getCountryMeta } from "../../lib/geo";
import { CountryFlag } from "./CountryFlag";

interface MarketSelectorProps {
  activeMarket: string;
  onSelectMarket: (marketCode: string) => void;
  showNotice?: boolean;
  onDismissNotice?: () => void;
  className?: string;
}

export function MarketSelector({
  activeMarket,
  onSelectMarket,
  showNotice = true,
  onDismissNotice,
  className = "",
}: MarketSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isGlobalMode = activeMarket === "global";
  const currentMeta = isGlobalMode ? null : getCountryMeta(activeMarket);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Region Selector Bar & Dropdown */}
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink-200 bg-white hover:bg-paper-muted text-ink text-xs font-bold shadow-sm transition-all focus:outline-none"
        >
          <MapPin className="h-3.5 w-3.5 text-teal-brand shrink-0" />
          <span>
            {isGlobalMode ? (
              <span className="flex items-center gap-1.5">
                <CountryFlag code="GLOBAL" size="sm" />
                <span>All Global Markets</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <CountryFlag code={currentMeta?.code || "US"} size="sm" />
                <span>{currentMeta?.name} ({currentMeta?.currency})</span>
              </span>
            )}
          </span>
          <ChevronDown className={`h-3.5 w-3.5 text-ink-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-72 rounded-xl bg-white border border-ink-100 shadow-2xl z-50 p-2 space-y-1 text-xs font-sans fade-in">
            <div className="px-3 py-2 border-b border-ink-100">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Select Market / Delivery Scope
              </p>
              <p className="text-[11px] text-ink-600 mt-0.5">
                Filter deals by verified store shipping routes
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1 py-1">
              {/* Option: Global Mode */}
              <button
                type="button"
                onClick={() => {
                  onSelectMarket("global");
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  isGlobalMode
                    ? "bg-amber-50 text-amber-900 font-bold border border-amber-200"
                    : "hover:bg-paper-muted text-ink"
                }`}
              >
                <span className="flex items-center gap-2">
                  <CountryFlag code="GLOBAL" size="sm" />
                  <div>
                    <div className="font-bold">Browse All Global Markets</div>
                    <div className="text-[10px] text-ink-400">Shows all catalog items with shipping badges</div>
                  </div>
                </span>
                {isGlobalMode && <Check className="h-4 w-4 text-amber-600 shrink-0" />}
              </button>

              <div className="my-1 border-t border-ink-100" />

              {/* Supported Regional Markets */}
              {Object.values(SUPPORTED_COUNTRIES).map((c) => {
                const isSelected = !isGlobalMode && activeMarket.toUpperCase() === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onSelectMarket(c.code.toLowerCase());
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-teal-light/10 text-teal-dark font-bold border border-teal-brand/30"
                        : "hover:bg-paper-muted text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CountryFlag code={c.code} size="sm" />
                      <div>
                        <div className="font-bold">{c.name}</div>
                        <div className="text-[10px] text-ink-400 font-mono">
                          {c.currency} ({c.currencySymbol}) • {c.regionLabel}
                        </div>
                      </div>
                    </span>
                    {isSelected && <Check className="h-4 w-4 text-teal-brand shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dismissible Region Notice */}
      {showNotice && !isGlobalMode && (
        <div className="flex items-center justify-between gap-3 px-3.5 py-2 bg-teal-light/10 border border-teal-brand/20 text-teal-dark rounded-xl text-xs font-medium fade-in">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-teal-brand" />
            <span>
              Showing products available in <strong>{currentMeta?.name}</strong>.
            </span>
            <button
              type="button"
              onClick={() => onSelectMarket("global")}
              className="font-bold underline text-teal-brand hover:text-teal-dark font-sans ml-1"
            >
              Browse All Markets
            </button>
          </div>
          {onDismissNotice && (
            <button
              type="button"
              onClick={onDismissNotice}
              className="text-ink-400 hover:text-ink p-1 rounded-full hover:bg-black/5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
