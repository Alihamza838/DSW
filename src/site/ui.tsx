/**
 * ui.tsx - small building blocks shared by every page. Plain and readable on purpose:
 * big type, clear labels, one accent colour, no clutter.
 */
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { PolicyFact, PolicyFaq, TimelinePoint, VerifiedPolicy } from "../data/policies";
import { formatDate, storeImage } from "./data";
import { href } from "./config";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink-2">
                {c.name}
              </span>
            ) : (
              <Link to={href(c.path)} className="hover:text-brand-700 hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The main number people look for: "60 days", "No set limit", "Varies". */
export function windowLabel(p: VerifiedPolicy): { big: string; small: string } {
  if (p.windowDays === null && p.headline.startsWith("No change-of-mind")) return { big: "No returns", small: "change of mind" };
  if (p.windowDays === null) return { big: p.slug === "costco" ? "No set limit" : "Varies", small: p.slug === "costco" ? "most items" : "see details" };
  return { big: `${p.windowDays} days`, small: "main window" };
}

export function WindowBadge({ p, size = "md" }: { p: VerifiedPolicy; size?: "md" | "lg" }) {
  const w = windowLabel(p);
  return (
    <span className={`inline-flex flex-col items-center justify-center rounded-2xl bg-brand-700 text-white ${size === "lg" ? "shrink-0 px-4 py-3" : "min-w-[84px] shrink-0 px-3 py-2"}`}>
      <span className={`whitespace-nowrap font-serif font-bold leading-none ${size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"}`}>{w.big}</span>
      <span className="mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-brand-100">{w.small}</span>
    </span>
  );
}

export function StoreCard({ p }: { p: VerifiedPolicy }) {
  return (
    <Link
      to={href(`/stores/${p.slug}`)}
      className="rise group flex h-full items-start gap-4 rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-900/5"
    >
      <WindowBadge p={p} />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-serif text-lg font-bold text-ink group-hover:text-brand-700">{p.name}</span>
          <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-medium text-ink-3">{p.country}</span>
        </span>
        <span className="mt-1 block text-sm leading-snug text-ink-2">{p.headline}</span>
        <span className="mt-2 block text-xs text-ink-3">Checked {formatDate(p.checked)}</span>
      </span>
    </Link>
  );
}

export function FactTable({ facts }: { facts: PolicyFact[] }) {
  return (
    <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
      {facts.map((f) => (
        <div key={f.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4">
          <dt className="text-sm font-semibold text-ink-3">{f.label}</dt>
          <dd className="font-medium text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The return timeline as an accessible list: vertical on phones, a horizontal track on wide screens. */
export function Timeline({ points }: { points: TimelinePoint[] }) {
  if (points.length < 2) return null;
  return (
    <ol className="relative grid gap-4 sm:grid-flow-col sm:auto-cols-fr sm:gap-2">
      <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-brand-200 sm:left-2 sm:right-2 sm:top-[11px] sm:bottom-auto sm:h-0.5 sm:w-auto" />
      {points.map((pt, i) => (
        <li key={`${pt.day}-${pt.label}`} className="relative flex items-start gap-3 sm:flex-col sm:items-start sm:gap-2">
          <span
            className={`relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-4 ${
              i === 0 ? "border-brand-200 bg-white" : "border-white bg-brand-700 shadow"
            }`}
            aria-hidden="true"
          />
          <span>
            <span className="block font-serif text-lg font-bold text-ink">{pt.day === 0 ? "Day 0" : `Day ${pt.day}`}</span>
            <span className="block text-sm leading-snug text-ink-2">{pt.label}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ faqs }: { faqs: PolicyFaq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-base font-semibold">{f.q}</h3>
            <span aria-hidden="true" className="text-xl leading-none text-brand-600 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-2 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Section({ id, title, children, intro }: { id?: string; title: string; children: ReactNode; intro?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className="mt-12">
      <h2 id={id ? `${id}-h` : undefined} data-reveal="left" className="text-2xl font-bold text-ink sm:text-[1.7rem]">
        {title}
      </h2>
      {intro && <p className="mt-2 max-w-3xl text-ink-2">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function PolicyImage({ p, eager = false }: { p: VerifiedPolicy; eager?: boolean }) {
  return (
    <img
      src={storeImage(p.slug)}
      alt={`${p.name} return policy timeline: ${p.timeline.map((t) => (t.day === 0 ? t.label : `day ${t.day} ${t.label.toLowerCase()}`)).join(", ")}`}
      width={800}
      height={420}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className="aspect-[40/21] w-full rounded-2xl border border-line bg-soft object-cover"
    />
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-sm font-medium text-ink-2">{children}</span>;
}

/** Two-letter country code chip (no flag emoji: they render inconsistently and aren't accessible). */
export function CountryBadge({ code, colors, size = "md" }: { code: string; colors: [string, string]; size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "h-14 w-14 text-lg" : size === "sm" ? "h-7 w-7 text-[11px]" : "h-10 w-10 text-sm";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-sans font-extrabold tracking-wide ${dims}`}
      style={{ backgroundColor: colors[0], color: colors[1] }}
    >
      {code}
    </span>
  );
}
