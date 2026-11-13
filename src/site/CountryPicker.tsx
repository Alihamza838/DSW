/**
 * CountryPicker.tsx - "Where do you shop?" tiles, grouped by region.
 *
 * Every tile is a normal link, so the static HTML works without JavaScript and crawlers see all
 * country pages. After hydration the visitor's last-picked country (kept only in this browser's
 * localStorage, never sent anywhere) is highlighted and offered as a shortcut.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COUNTRIES, COUNTRY_GROUPS, getCountry, storesInCountry, type Country } from "../data/countries";
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
