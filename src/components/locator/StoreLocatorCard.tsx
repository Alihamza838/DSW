import React from "react";
import {
  MapPin,
  Clock,
  FileCheck,
  ShieldCheck,
  Phone,
  Navigation,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { StoreLocation } from "../../data/storeLocations";
import { formatDistanceDisplay, getStoreOpenStatus } from "../../utils/distanceUtils";

interface StoreLocatorCardProps {
  location: StoreLocation & { distanceMiles?: number };
  unit?: "mi" | "km";
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  isCopied?: boolean;
  onCopyAddress?: (loc: StoreLocation) => void;
  isExpanded?: boolean;
  onToggleExpand?: (id: string) => void;
}

export function StoreLocatorCard({
  location,
  unit = "mi",
  isBookmarked = false,
  onToggleBookmark,
  isCopied = false,
  onCopyAddress,
  isExpanded = false,
  onToggleExpand,
}: StoreLocatorCardProps) {
  const distDisplay = formatDistanceDisplay(location.distanceMiles, unit);
  const openStatus = getStoreOpenStatus(location.returnDeskHours);

  const visibleFeatures = isExpanded ? location.features : location.features.slice(0, 3);
  const hiddenCount = location.features.length - 3;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&query=${encodeURIComponent(
    `${location.brandName} ${location.address} ${location.city}`
  )}`;

  return (
    <div
      className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-red-600 hover:shadow-receipt transition-all duration-300 flex flex-col justify-between space-y-4 relative group font-sans w-full min-w-0"
      id={`store-card-${location.id}`}
    >
      {/* 1. CARD HEADER STRIP */}
      <div className="pb-3 border-b border-dashed border-slate-200 flex items-start justify-between gap-3 min-w-0 w-full">
        <div className="space-y-1 min-w-0 flex-1">
          {/* Store Name in Fraunces / Serif Display Typography with natural word boundary wrapping */}
          <h3
            title={`${location.brandName} (Store #${location.storeCode})`}
            className="font-display font-semibold text-ink text-base sm:text-lg tracking-tight group-hover:text-red-600 transition-colors leading-snug min-w-0 break-words [overflow-wrap:break-word] [word-break:normal]"
          >
            {location.brandName}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-ink-600 font-medium min-w-0 flex-wrap">
            <span className="truncate min-w-0 max-w-full">{location.address}</span>
            {onCopyAddress && (
              <button
                type="button"
                onClick={() => onCopyAddress(location)}
                title="Copy full address"
                className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer p-0.5 shrink-0"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-red-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>

          <p className="text-xs text-ink-400 font-mono min-w-0 break-words">
            {location.city}, {location.state} {location.zip}, {location.country}
          </p>
        </div>

        {/* TOP RIGHT: Single Audited 2026 badge + bookmark */}
        <div className="shrink-0 flex items-center gap-1.5">
          {onToggleBookmark && (
            <button
              type="button"
              onClick={() => onToggleBookmark(location.id)}
              title={isBookmarked ? "Remove from saved stores" : "Save store desk"}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-purple-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Quiet, flexible-width Audited Badge */}
          <span className="inline-flex items-center gap-1 border border-red-300 text-red-800 bg-red-50 font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap">
            <Award className="h-3 w-3 text-red-600 shrink-0" />
            <span>AUDITED</span>
          </span>
        </div>
      </div>

      {/* 2. DEDICATED PROXIMITY STRIP (Full width, reserved layout, no overlapping) */}
      <div className="w-full flex items-center justify-between text-xs font-mono bg-paper-muted/80 px-3.5 py-2 rounded-xl border border-slate-200/80">
        <span className="text-ink-600 font-medium flex items-center gap-1.5 text-xs shrink-0">
          <MapPin className="h-3.5 w-3.5 text-red-600 shrink-0" />
          <span>Proximity:</span>
        </span>
        <span className="font-extrabold text-red-600 text-xs whitespace-nowrap font-mono">
          {distDisplay} away
        </span>
      </div>

      {/* 3. LEDGER DATA ROWS (Label Left, Value Right, Thin Top/Bottom Borders) */}
      <div className="space-y-1.5 py-0.5 font-sans text-xs">
        {/* Row 1: Hours Today */}
        <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200 gap-2">
          <span className="text-ink-500 font-medium flex items-center gap-1.5 text-xs shrink-0">
            <Clock className="h-3.5 w-3.5 text-red-600 shrink-0" />
            <span>Hours Today:</span>
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 whitespace-nowrap ${openStatus.badgeClass}`}
          >
            {openStatus.label}
          </span>
        </div>

        {/* Row 2: POS Receipt Lookup */}
        <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200 gap-2">
          <span className="text-ink-500 font-medium flex items-center gap-1.5 text-xs shrink-0">
            <FileCheck className="h-3.5 w-3.5 text-red-600 shrink-0" />
            <span>Receipt lookup:</span>
          </span>
          <span className="font-mono font-bold text-ink-900 text-xs shrink-0 whitespace-nowrap">
            {location.hasReceiptLookup ? "Verified POS" : "Photo ID"}
          </span>
        </div>

        {/* Row 3: Restocking Fee */}
        <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200 gap-2">
          <span className="text-ink-500 font-medium flex items-center gap-1.5 text-xs shrink-0">
            <ShieldCheck className="h-3.5 w-3.5 text-red-600 shrink-0" />
            <span>Restocking fee:</span>
          </span>
          <span className="bg-red-100 text-red-900 border border-red-300 font-extrabold font-mono px-2 py-0.5 rounded text-[10px] shrink-0 whitespace-nowrap">
            $0
          </span>
        </div>

        {/* Row 4: Phone Contact */}
        <div className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200 gap-2">
          <span className="text-ink-500 font-medium flex items-center gap-1.5 text-xs shrink-0">
            <Phone className="h-3.5 w-3.5 text-red-600 shrink-0" />
            <span>Phone:</span>
          </span>
          <a
            href={`tel:${location.phone}`}
            className="font-mono font-bold text-red-600 hover:underline text-xs shrink-0 whitespace-nowrap"
          >
            {location.phone}
          </a>
        </div>
      </div>

      {/* 4. AUDITED DESK FEATURE TAGS */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-400">
          Desk Capabilities:
        </div>
        <div className="flex flex-wrap gap-1">
          {visibleFeatures.map((feat, fIdx) => (
            <span
              key={fIdx}
              className="text-[10px] font-sans font-medium bg-slate-100 text-ink-700 px-2 py-0.5 rounded-md border border-slate-200"
            >
              {feat}
            </span>
          ))}
          {hiddenCount > 0 && onToggleExpand && !isExpanded && (
            <button
              type="button"
              onClick={() => onToggleExpand(location.id)}
              className="text-[10px] font-mono font-bold text-red-600 hover:underline px-1 py-0.5 cursor-pointer flex items-center gap-0.5"
            >
              <span>+{hiddenCount} more</span>
              <ChevronDown className="h-3 w-3" />
            </button>
          )}
          {isExpanded && onToggleExpand && (
            <button
              type="button"
              onClick={() => onToggleExpand(location.id)}
              className="text-[10px] font-mono font-bold text-red-600 hover:underline px-1 py-0.5 cursor-pointer flex items-center gap-0.5"
            >
              <span>Show less</span>
              <ChevronUp className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* 5. ACTION BUTTONS: Clear Primary (Filled) vs Secondary (Outline) Hierarchy */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span>Get Directions</span>
        </a>

        <a
          href={`tel:${location.phone}`}
          className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-red-600 hover:bg-red-50/50 text-ink font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          title="Call store counter"
        >
          <Phone className="h-3.5 w-3.5 text-red-600" />
          <span className="hidden sm:inline">Call Desk</span>
        </a>
      </div>
    </div>
  );
}
