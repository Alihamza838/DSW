import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, StoreCard } from "../ui";
import { POLICIES, REGIONS } from "../../data/policies";
import { CATEGORIES } from "../data";
import { COUNTRIES } from "../../data/countries";
import { CountryBadge } from "../ui";
import { href } from "../config";

export function Component() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("all");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("q");
    if (v) setQ(v);
  }, []);
  const needle = q.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      POLICIES.filter(
        (p) =>
          (region === "all" || p.region === region) &&
          (!needle || `${p.name} ${p.country} ${p.category} ${p.headline}`.toLowerCase().includes(needle)),
      ),
    [needle, region],
  );
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
  ];
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title={`Store Return Policies: ${POLICIES.length} Retailers Checked`}
        description={`Return windows, receipt rules and fees for ${POLICIES.length} stores in the US, UK, Europe, Canada, Australia, the Gulf, India and Pakistan, each checked on the official site.`}
        path="/stores"
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema("Store return policies", POLICIES.map((p) => ({ name: `${p.name} return policy`, path: `/stores/${p.slug}` })))]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">All store return policies</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">
        {POLICIES.length} stores, each summarised from its own official returns page and dated, so you know how fresh the information is.
      </p>

      <nav aria-label="Browse by country" className="mt-5">
        <ul className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <li key={c.slug}>
              <Link to={href(`/countries/${c.slug}`)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-card py-1 pl-1.5 pr-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                <CountryBadge code={c.code} colors={c.badge} size="sm" />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 rounded-2xl border border-line bg-card p-4">
        <label className="block">
          <span className="sr-only">Filter stores</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a store name, e.g. DSW or Walmart"
            className="h-12 w-full rounded-xl border border-line bg-paper px-4 text-ink placeholder:text-ink-3 focus:border-brand-500 focus:outline-none"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Region">
          {[{ id: "all", name: "All regions" }, ...REGIONS].map((r) => (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={region === r.id}
              onClick={() => setRegion(r.id)}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition ${
                region === r.id ? "border-brand-600 bg-brand-700 text-white" : "border-line bg-card text-ink-2 hover:border-brand-500"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-3" aria-live="polite">
        Showing {filtered.length} of {POLICIES.length} stores
      </p>
      {REGIONS.map((r) => {
        const list = filtered.filter((p) => p.region === r.id);
        if (!list.length) return null;
        return (
          <section key={r.id} className="mt-6" aria-labelledby={`region-${r.id}`}>
            <h2 id={`region-${r.id}`} className="text-xl font-bold text-ink">
              {r.name}
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <StoreCard key={p.slug} p={p} />
              ))}
            </div>
          </section>
        );
      })}
      {!filtered.length && (
        <p className="mt-6 rounded-2xl border border-line bg-card p-6 text-ink-2">
          No store matches “{q}”. We cover {POLICIES.length} stores so far; <Link to="/contact/" className="font-semibold text-brand-700 underline">suggest one</Link>.
        </p>
      )}

      <section className="mt-14" aria-labelledby="cats">
        <h2 id="cats" className="text-xl font-bold text-ink">
          Compare by category
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={href(`/stores/category/${c.slug}`)} className="block rounded-xl border border-line bg-card px-4 py-3 font-semibold text-ink hover:border-brand-500 hover:text-brand-700">
                {c.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
