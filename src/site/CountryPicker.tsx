/**
 * CountryPicker.tsx - "Where do you shop?" tiles, grouped by region.
 *
 * Every tile is a normal link, so the static HTML works without JavaScript and crawlers see all
 * country pages. After hydration the visitor's last-picked country (kept only in this browser's
 * localStorage, never sent anywhere) is highlighted and offered as a shortcut.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, COUNTRY_GROUPS, getCountry, inCountry, storesInCountry, type Country } from "../data/countries";
import { CountryBadge } from "./ui";
import { href } from "./config";

const KEY = "dswrr-country";

export function rememberCountry(slug: string) {
  try {
    window.localStorage.setItem(KEY, slug);
  } catch {
    /* private mode or storage blocked: nothing to remember */
  }
}

export function useSavedCountry(): Country | undefined {
  const [saved, setSaved] = useState<Country | undefined>();
  useEffect(() => {
    try {
      setSaved(getCountry(window.localStorage.getItem(KEY) ?? undefined));
    } catch {
      setSaved(undefined);
    }
  }, []);
  return saved;
}

function windowRange(c: Country) {
  const days = storesInCountry(c)
    .map((p) => p.windowDays)
    .filter((d): d is number => d !== null);
  if (!days.length) return "";
  const min = Math.min(...days);
  const max = Math.max(...days);
  return min === max ? `${min} days` : `${min}–${max} days`;
}

export default function CountryPicker({ compact = false }: { compact?: boolean }) {
  const saved = useSavedCountry();
  return (
    <div>
      {saved && (
        <p className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-900">
          <CountryBadge code={saved.code} colors={saved.badge} size="sm" />
          <span>
            You last looked at <strong>{saved.name}</strong>.
          </span>
          <Link to={href(`/countries/${saved.slug}`)} className="font-semibold text-brand-800 underline underline-offset-2">
            Go to {saved.name} stores →
          </Link>
        </p>
      )}
      <div className={`grid gap-6 ${compact ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {COUNTRY_GROUPS.map((g) => {
          const list = COUNTRIES.filter((c) => c.group === g);
          if (!list.length) return null;
          return (
            <div key={g}>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-3">{g}</p>
              <ul className="mt-2 space-y-2">
                {list.map((c) => {
                  const count = storesInCountry(c).length;
                  const active = saved?.slug === c.slug;
                  return (
                    <li key={c.slug}>
                      <Link
                        to={href(`/countries/${c.slug}`)}
                        onClick={() => rememberCountry(c.slug)}
                        aria-current={active ? "true" : undefined}
                        className={`group flex min-h-[56px] items-center gap-3 rounded-2xl border bg-card px-3 py-2 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md ${
                          active ? "border-brand-600 ring-2 ring-brand-200" : "border-line"
                        }`}
                      >
                        <CountryBadge code={c.code} colors={c.badge} />
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-ink group-hover:text-brand-700">{c.name}</span>
                          <span className="block text-sm text-ink-3">
                            {count} {count === 1 ? "store" : "stores"}
                            {windowRange(c) && ` · ${windowRange(c)}`}
                          </span>
                        </span>
                        <span aria-hidden="true" className="text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-brand-700">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Best guess of the visitor's country from the browser's own time zone and language. Nothing is
 * looked up online; it only decides which country page to suggest.
 */
const ZONE_TO_COUNTRY: [RegExp, string][] = [
  [/^Europe\/(London|Belfast)$/, "united-kingdom"],
  [/^Europe\/Berlin$/, "germany"],
  [/^Europe\/Paris$/, "france"],
  [/^Asia\/Karachi$/, "pakistan"],
  [/^Asia\/(Kolkata|Calcutta)$/, "india"],
  [/^Asia\/Dubai$/, "uae"],
  [/^Asia\/Riyadh$/, "saudi-arabia"],
  [/^Australia\//, "australia"],
  [/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Whitehorse|Yellowknife|Iqaluit)$/, "canada"],
  [/^(America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana\/.+|Kentucky\/.+)|Pacific\/Honolulu)$/, "united-states"],
];

export function guessCountry(): Country | undefined {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const hit = ZONE_TO_COUNTRY.find(([re]) => re.test(zone));
    return hit ? getCountry(hit[1]) : undefined;
  } catch {
    return undefined;
  }
}

const DISMISS_KEY = "dswrr-suggest-dismissed";

/** A small card in the corner (fixed position, so it never pushes the page around). */
export function CountrySuggestion({ pathname }: { pathname: string }) {
  const [c, setC] = useState<Country | undefined>();
  useEffect(() => {
    try {
      if (window.localStorage.getItem(KEY) || window.localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return;
    }
    const g = guessCountry();
    if (!g) return;
    const t = window.setTimeout(() => setC(g), 1500);
    return () => window.clearTimeout(t);
  }, []);
  if (!c || pathname.startsWith(`/countries/${c.slug}`)) return null;
  const close = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setC(undefined);
  };
  return (
    <aside
      aria-label="Suggested country"
      className="toast-in fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-line bg-card p-4 shadow-2xl shadow-navy/20 sm:right-auto"
    >
      <div className="flex items-start gap-3">
        <CountryBadge code={c.code} colors={c.badge} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">Shopping in {inCountry(c)}?</p>
          <p className="text-sm text-ink-2">See local store policies and your legal rights there.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to={href(`/countries/${c.slug}`)}
              onClick={() => rememberCountry(c.slug)}
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800"
            >
              See local stores
            </Link>
            <Link to="/countries/" onClick={close} className="inline-flex min-h-[44px] items-center rounded-xl border border-line px-4 text-sm font-semibold text-ink-2 hover:border-brand-500">
              Other country
            </Link>
          </div>
        </div>
        <button type="button" onClick={close} aria-label="Dismiss" className="-me-1 -mt-1 flex h-11 w-11 items-center justify-center rounded-xl text-ink-3 hover:bg-soft hover:text-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
