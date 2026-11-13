import { Link, useParams } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryBadge, FaqList, Section, windowLabel } from "../ui";
import { BRANDS, brandStores, countryOfPolicy, getBrand } from "../../data/countries";
import type { VerifiedPolicy } from "../../data/policies";
import { formatDate } from "../data";
import { href } from "../config";
import { clamp } from "./StorePage";
import { NotFoundContent } from "./NotFoundPage";

const countryName = (p: VerifiedPolicy) => countryOfPolicy(p)?.name ?? p.country;

function brandFaqs(name: string, stores: VerifiedPolicy[]) {
  const timed = stores.filter((p) => p.windowDays !== null);
  const longest = [...timed].sort((a, b) => (b.windowDays ?? 0) - (a.windowDays ?? 0))[0];
  const shortest = [...timed].sort((a, b) => (a.windowDays ?? 0) - (b.windowDays ?? 0))[0];
  const faqs = [
    {
      q: `Is ${name}'s return policy the same in every country?`,
      a: `No. Each country's ${name} store has its own policy. ${stores.map((p) => `${countryName(p)}: ${p.headline}`).join("; ")}.`,
    },
    {
      q: `Can I return ${/^[AEIOU]/i.test(name) ? "an" : "a"} ${name} purchase in a different country?`,
      a: `Generally no. Each ${name} store handles returns for its own market, so return the item to the country store you bought it from and check that store's page.`,
    },
  ];
  if (longest && shortest && longest.slug !== shortest.slug) {
    faqs.splice(1, 0, {
      q: `Where does ${name} give the most time to return?`,
      a: `Of the countries we checked, ${countryName(longest)} gives the longest main window (${longest.windowDays} days) and ${countryName(shortest)} the shortest (${shortest.windowDays} days).`,
    });
  }
  return faqs;
}

export function Component() {
  const { brand } = useParams<{ brand: string }>();
  const b = getBrand(brand);
  if (!b) return <NotFoundContent />;
  const stores = brandStores(b);
  const path = `/brands/${b.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
    { name: b.name, path },
  ];
  const max = Math.max(...stores.map((p) => p.windowDays ?? 0), 1);
  const faqs = brandFaqs(b.name, stores);
  const checked = stores.reduce((m, p) => (p.checked > m ? p.checked : m), "");
  const others = BRANDS.filter((x) => x.slug !== b.slug);

  return (
    <>
      <Seo
        title={`${b.name} Return Policy by Country (${stores.length} Countries)`}
        description={clamp(`${b.name} return policy in ${stores.map(countryName).join(", ")}, side by side and checked on each official ${b.name} site. ${b.intro}`)}
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            `${b.name} return policies by country`,
            stores.map((p) => ({ name: `${p.name} return policy`, path: `/stores/${p.slug}` })),
          ),
          faqSchema(faqs),
        ]}
      />

      <div className="border-b border-line bg-card">
        <Container className="py-8 sm:py-10">
          <Breadcrumbs items={crumbs} />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-700">Brand · {stores.length} countries</p>
          <h1 className="mt-1 text-3xl font-bold text-ink sm:text-[2.6rem]">{b.name} return policy by country</h1>
          <p className="mt-4 max-w-3xl text-lg text-ink-2">{b.intro}</p>
          <p className="mt-4 text-sm text-ink-3">Every country store checked on its own official site · last checked {formatDate(checked)}</p>
        </Container>
      </div>

      <Container className="pb-8">
        <Section id="windows" title="How many days you get in each country" intro="The bar shows each store's main return window. Category exceptions are on each store page.">
          <ul className="space-y-3 rounded-2xl border border-line bg-card p-5">
            {stores.map((p) => {
              const c = countryOfPolicy(p);
              const w = windowLabel(p);
              const pct = p.windowDays ? Math.max(4, (p.windowDays / max) * 100) : 0;
              return (
                <li key={p.slug} className="grid items-center gap-2 sm:grid-cols-[180px_minmax(0,1fr)_110px]">
                  <Link to={href(`/stores/${p.slug}`)} className="flex items-center gap-2 font-semibold text-ink hover:text-brand-700 hover:underline">
                    {c && <CountryBadge code={c.code} colors={c.badge} size="sm" />}
                    {countryName(p)}
                  </Link>
                  <span className="block h-3 overflow-hidden rounded-full bg-soft" aria-hidden="true">
                    <span className="bar-grow block h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="font-serif text-lg font-bold text-ink sm:text-right">{w.big}</span>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="side-by-side" title={`${b.name} rules side by side`}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((p) => {
              const c = countryOfPolicy(p);
              return (
                <article key={p.slug} className="flex h-full flex-col rounded-2xl border border-line bg-card p-5" aria-labelledby={`h-${p.slug}`}>
                  <div className="flex items-center gap-3">
                    {c && <CountryBadge code={c.code} colors={c.badge} />}
                    <div>
                      <h3 id={`h-${p.slug}`} className="font-serif text-lg font-bold text-ink">
                        {p.name}
                      </h3>
                      <p className="text-sm text-ink-3">{countryName(p)}</p>
                    </div>
                  </div>
                  <p className="mt-3 font-semibold text-brand-800">{p.headline}</p>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {p.facts.slice(0, 4).map((f) => (
                      <div key={f.label}>
                        <dt className="inline text-ink-3">{f.label}: </dt>
                        <dd className="inline text-ink">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {p.exceptions[0] && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950">{p.exceptions[0]}</p>}
                  <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm">
                    <Link to={href(`/stores/${p.slug}`)} className="font-semibold text-brand-700 underline underline-offset-2">
                      Full {countryName(p)} policy
                    </Link>
                    <a href={p.source} target="_blank" rel="noopener nofollow" className="text-ink-2 underline underline-offset-2">
                      Official page<span className="sr-only"> for {p.name} (opens in a new tab)</span>
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="faq" title={`${b.name} returns abroad: common questions`}>
          <FaqList faqs={faqs} />
        </Section>

        <nav aria-labelledby="other-brands" className="mt-12">
          <h2 id="other-brands" className="text-xl font-bold text-ink">
            Other brands by country
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={href(`/brands/${o.slug}`)} className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}
