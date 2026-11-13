import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../Seo";
import { faqSchema, organizationSchema, websiteSchema } from "../schema";
import { Container, CountryBadge, FaqList, Section, StoreCard, windowLabel } from "../ui";
import { POLICIES, getPolicy } from "../../data/policies";
import { CATEGORIES, COMPARE_PAIRS, formatDate, pairSlug, storesInCategory } from "../data";
import { GUIDES } from "../guides";
import { href } from "../config";
import CountryPicker from "../CountryPicker";
import { BRANDS, COUNTRIES, brandStores, countryOfPolicy } from "../../data/countries";

const POPULAR = ["dsw", "walmart", "target", "amazon", "costco", "kohls", "nike", "sephora", "best-buy", "shein", "temu", "daraz"];
const QUICK = ["dsw", "walmart", "amazon", "amazon-uk", "ikea-uk", "noon", "daraz", "flipkart"];

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
    q: "Do you cover stores outside the United States?",
    a: "Yes. We cover stores in the US, UK, Germany, France, Canada, Australia, the UAE, Saudi Arabia, India and Pakistan. Each country page lists its stores, the legal rights there and the official consumer authority.",
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
        description={`Return policies for ${POLICIES.length} stores in ${COUNTRIES.length} countries, from DSW, Walmart and Amazon to ASOS, noon and Daraz, each checked on the official site and dated.`}
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
              {POLICIES.length} stores · {COUNTRIES.length} countries · last checked {formatDate(latestChecked)}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Store return policies, <span className="text-brand-700">checked and explained simply</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-2">
              How many days you have, whether you need the receipt, and what it costs, for DSW and {POLICIES.length - 1} other stores in the US, UK, Europe, the Gulf,
              India, Pakistan and beyond. Every page is checked against the store's own website and shows the date.
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

      {/* Trust band: real numbers from the data */}
      <section aria-label="What we cover" className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            [POLICIES.length, "", "store policies, each read on the official site"],
            [COUNTRIES.length, "", "countries, with the legal rights explained"],
            [POLICIES.length + COUNTRIES.length, "", "official sources linked, never paraphrased blind"],
            [BRANDS.length, "", "brands compared across borders"],
          ].map(([n, suffix, label]) => (
            <div key={String(label)} data-reveal>
              <p className="font-serif text-4xl font-bold text-brand-700 sm:text-5xl">
                <span data-count={n} data-suffix={suffix}>
                  {n}
                  {suffix}
                </span>
              </p>
              <p className="mt-1 text-sm leading-snug text-ink-2">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <Container>
        <Section
          id="where"
          title="Where do you shop?"
          intro="Pick your country to see local stores, what the law gives you there, and the official place to complain if a store says no."
        >
          <CountryPicker />
        </Section>

        <Section id="brand-abroad" title="Same brand, different rules" intro="A brand's return policy can change completely when you cross a border. Here is the main window for each country store.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BRANDS.slice(0, 6).map((b) => (
              <Link key={b.slug} to={href(`/brands/${b.slug}`)} className="rise group block rounded-2xl border border-line bg-card p-5 transition hover:border-brand-500">
                <span className="font-serif text-xl font-bold text-ink group-hover:text-brand-700">{b.name}</span>
                <span className="mt-3 grid gap-1.5">
                  {brandStores(b).map((p) => {
                    const c = countryOfPolicy(p);
                    return (
                      <span key={p.slug} className="flex items-center gap-2 text-sm">
                        {c && <CountryBadge code={c.code} colors={c.badge} size="sm" />}
                        <span className="min-w-0 flex-1 text-ink-2">{c?.name ?? p.country}</span>
                        <span className="font-semibold text-ink">{windowLabel(p).big}</span>
                      </span>
                    );
                  })}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5">
            <Link to="/brands/" className="inline-block py-2 font-semibold text-brand-700 underline underline-offset-2">
              All {BRANDS.length} brands compared by country
            </Link>
          </p>
        </Section>

        <Section id="process" title="How every policy is checked" intro="The same four steps for every store, in every country. That is why each page shows a date and a source link.">
          <ol className="relative grid gap-4 md:grid-cols-4" data-stagger>
            {[
              ["Find the official page", "We go to the retailer's own returns page or terms, never a forum, coupon site or old news story."],
              ["Read it in full", "Windows, exceptions, fees, receipts and holiday rules, including the fine print in the local language."],
              ["Write it plainly", "One clear answer first, then the exceptions and steps, with the store's own source linked."],
              ["Date it and re-check", "Each page shows the day we checked. When a store changes its rules, the page and its date change too."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl border border-line bg-card p-5">
                <span className="font-mono text-xs font-bold tracking-widest text-brand-700">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-lg font-bold text-ink">{t}</h3>
                <p className="mt-1 text-sm text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            <Link to="/editorial-policy/" className="inline-block py-2 font-semibold text-brand-700 underline underline-offset-2">
              Read our editorial policy
            </Link>
          </p>
        </Section>

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
