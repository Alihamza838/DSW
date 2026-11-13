import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../Seo";
import { faqSchema, organizationSchema, websiteSchema } from "../schema";
import { Container, FaqList, Section, StoreCard } from "../ui";
import { POLICIES, getPolicy } from "../../data/policies";
import { CATEGORIES, COMPARE_PAIRS, formatDate, pairSlug, storesInCategory } from "../data";
import { GUIDES } from "../guides";
import { href } from "../config";

const POPULAR = ["dsw", "walmart", "target", "amazon", "costco", "kohls", "nike", "sephora", "best-buy", "shein", "temu", "daraz"];
const QUICK = ["dsw", "walmart", "target", "amazon", "nike", "shein"];

const HOME_FAQS = [
  {
    q: "Is DSWReturnRefund part of DSW or any store?",
    a: "No. It is an independent guide, not affiliated with DSW Designer Shoe Warehouse or any retailer. We summarise each store's own public policy and link to it.",
  },
  {
    q: "How do you know the policies are up to date?",
    a: "Every store page shows the date we last checked the retailer's official returns page and links to that page. When a store changes its rules, we rewrite the summary and update the date.",
  },
  {
    q: "What if the store's page says something different?",
    a: "The store's official policy always wins. Rules can change between our checks, so confirm the final details on the official page, and tell us so we can update the summary.",
  },
  {
    q: "Which store has the longest return window?",
    a: "Among the stores we cover, Costco has no fixed window for most items, IKEA US gives 365 days for unopened products, and Home Depot gives 365 days when you pay with a Home Depot card.",
  },
];

export function Component() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const latestChecked = POLICIES.reduce((m, p) => (p.checked > m ? p.checked : m), "");
  const holiday = POLICIES.filter((p) => p.holiday);
  const dsw = getPolicy("dsw")!;

  return (
    <>
      <Seo
        title="Store Return Policies, Checked & Explained Simply"
        description={`Return windows, receipt rules and fees for DSW, Walmart, Target, Amazon and ${POLICIES.length - 4} more stores, each checked against the official policy and dated.`}
        path="/"
        image="/og/default.jpg"
        jsonLd={[organizationSchema(), websiteSchema(), faqSchema(HOME_FAQS)]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-card">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-100 opacity-60 blur-3xl" />
        <Container className="relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {POLICIES.length} stores · last checked {formatDate(latestChecked)}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Store return policies, <span className="text-brand-700">checked and explained simply</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              How many days you have, whether you need the receipt, and what it costs, for DSW and {POLICIES.length - 1} other stores. Every page is checked against the
              store's own website and shows the date.
            </p>
            <form
              role="search"
              action="/stores/"
              method="get"
              className="mt-7 flex max-w-xl gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(q.trim() ? `/stores/?q=${encodeURIComponent(q.trim())}` : "/stores/");
              }}
            >
              <label className="flex-1">
                <span className="sr-only">Store name</span>
                <input
                  name="q"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Which store? e.g. DSW, Walmart, SHEIN"
                  className="h-14 w-full rounded-2xl border border-line bg-paper px-5 text-lg text-ink placeholder:text-ink-3 focus:border-brand-500 focus:outline-none"
                />
              </label>
              <button type="submit" className="h-14 rounded-2xl bg-brand-700 px-6 text-lg font-semibold text-white hover:bg-brand-800">
                Search
              </button>
            </form>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Popular stores">
              {QUICK.map((s) => {
                const p = getPolicy(s)!;
                return (
                  <li key={s}>
                    <Link to={href(`/stores/${s}`)} className="inline-flex min-h-[40px] items-center rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* A real example card, from the verified data */}
          <Link to={href("/stores/dsw")} className="group block rotate-1 rounded-3xl border border-line bg-paper p-6 shadow-xl shadow-brand-900/10 transition hover:rotate-0">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">Example · DSW</p>
            <p className="mt-3 font-serif text-5xl font-bold text-brand-700">{dsw.windowDays} days</p>
            <p className="mt-1 font-semibold text-ink">{dsw.headline}</p>
            <dl className="mt-5 space-y-2 border-t border-dashed border-line pt-4 text-sm">
              {dsw.facts.slice(1, 5).map((f) => (
                <div key={f.label} className="flex justify-between gap-4">
                  <dt className="text-ink-3">{f.label}</dt>
                  <dd className="text-right font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm font-semibold text-brand-700 group-hover:underline">Read the full DSW return policy →</p>
          </Link>
        </Container>
      </section>

      <Container>
        <Section title="How to use this site" intro="Three quick checks before you head back to the store.">
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              ["Find your store", "Search or pick from the list. Each page starts with the answer: how many days you have."],
              ["Check the exceptions", "Electronics, sale items and worn shoes often have different rules. They are listed on every page."],
              ["Work out your last day", "Enter your purchase date in the calculator and see the deadline for every rule."],
            ].map(([t, d], i) => (
              <li key={t} className="rise rounded-2xl border border-line bg-card p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl font-bold text-ink">{t}</h3>
                <p className="mt-1 text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Popular stores">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR.map((s) => (
              <StoreCard key={s} p={getPolicy(s)!} />
            ))}
          </div>
          <p className="mt-5">
            <Link to="/stores/" className="inline-block py-2 font-semibold text-brand-700 underline underline-offset-2">
              See all {POLICIES.length} stores
            </Link>
          </p>
        </Section>

        {holiday.length > 0 && (
          <Section title="Holiday return rules for 2026" intro="These stores have extended or special rules for holiday purchases right now.">
            <ul className="grid gap-3 md:grid-cols-2">
              {holiday.slice(0, 10).map((p) => (
                <li key={p.slug} className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <Link to={href(`/stores/${p.slug}`)} className="font-serif text-lg font-bold text-amber-950 underline-offset-2 hover:underline">
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm text-amber-950">{p.holiday}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Compare by category">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={href(`/stores/category/${c.slug}`)} className="rise block h-full rounded-2xl border border-line bg-card p-5 transition hover:border-brand-500">
                  <span className="font-serif text-xl font-bold text-ink">{c.name}</span>
                  <span className="mt-1 block text-sm text-ink-2">{storesInCategory(c).map((p) => p.name).slice(0, 5).join(", ")}…</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Popular comparisons">
          <ul className="flex flex-wrap gap-2">
            {COMPARE_PAIRS.slice(0, 12).map(([a, b]) => (
              <li key={pairSlug(a, b)}>
                <Link to={href(`/compare/${pairSlug(a, b)}`)} className="inline-flex min-h-[40px] items-center rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                  {getPolicy(a)?.name} vs {getPolicy(b)?.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {GUIDES.length > 0 && (
          <Section title="Guides">
            <ul className="grid gap-4 md:grid-cols-3">
              {GUIDES.slice(0, 6).map((g) => (
                <li key={g.slug}>
                  <Link to={href(`/blog/${g.slug}`)} className="rise block h-full rounded-2xl border border-line bg-card p-5 transition hover:border-brand-500">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{g.category}</span>
                    <span className="mt-2 block font-serif text-lg font-bold leading-snug text-ink">{g.title}</span>
                    <span className="mt-2 block text-sm text-ink-2">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="About this site">
          <FaqList faqs={HOME_FAQS} />
        </Section>
      </Container>
    </>
  );
}
