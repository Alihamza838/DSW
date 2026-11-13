import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryBadge, Section, StoreCard } from "../ui";
import CountryPicker from "../CountryPicker";
import { BRANDS, COUNTRIES, brandStores, countryOfPolicy, globalStores, storesInCountry } from "../../data/countries";
import { href } from "../config";

export function Component() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/countries" },
  ];
  const total = COUNTRIES.reduce((n, c) => n + storesInCountry(c).length, 0);
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title="Return Policies by Country: US, UK, India, UAE & More"
        description={`Store return policies for ${COUNTRIES.length} countries, from the US and UK to India, Pakistan, the UAE and Saudi Arabia, with each country's legal rights and official links.`}
        path="/countries"
        jsonLd={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            "Return policies by country",
            COUNTRIES.map((c) => ({ name: `${c.name} store return policies`, path: `/countries/${c.slug}` })),
          ),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">Return policies by country</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">
        The same store can have different rules in different countries, and the law behind them changes too. Pick where you shop to see {total} local stores, what the
        law gives you there, and the official consumer authority to contact if a store says no.
      </p>

      <div className="mt-8">
        <CountryPicker />
      </div>

      <Section
        id="law"
        title="What the law gives you, country by country"
        intro="The store's own policy is usually more generous than the law, but the law is your floor. Each link opens the official government or regulator page."
      >
        <div className="overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-soft text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Country</th>
                <th scope="col" className="px-4 py-3 font-semibold">Key legal rule</th>
                <th scope="col" className="px-4 py-3 font-semibold">Official source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COUNTRIES.map((c) => (
                <tr key={c.slug}>
                  <th scope="row" className="px-4 py-3 align-top font-semibold text-ink">
                    <Link to={href(`/countries/${c.slug}`)} className="inline-flex items-center gap-2 hover:text-brand-700 hover:underline">
                      <CountryBadge code={c.code} colors={c.badge} size="sm" />
                      {c.name}
                    </Link>
                  </th>
                  <td className="px-4 py-3 align-top text-ink-2">{c.law[0]}</td>
                  <td className="px-4 py-3 align-top">
                    <a href={c.authority.url} target="_blank" rel="noopener" className="font-semibold text-brand-700 underline underline-offset-2">
                      {c.authority.name.split(":")[0]}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="brands" title="One brand, different rules" intro="These brands run separate stores in several countries. Each brand page puts the rules side by side.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BRANDS.map((b) => (
            <li key={b.slug}>
              <Link to={href(`/brands/${b.slug}`)} className="rise block h-full rounded-2xl border border-line bg-card p-4 transition hover:border-brand-500">
                <span className="font-serif text-lg font-bold text-ink">{b.name}</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {brandStores(b).map((p) => {
                    const c = countryOfPolicy(p);
                    return c ? <CountryBadge key={p.slug} code={c.code} colors={c.badge} size="sm" /> : null;
                  })}
                </span>
                <span className="mt-2 block text-sm text-ink-2">{brandStores(b).length} countries compared →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="global" title="Global online stores" intro="These apps sell into many countries from one platform. Their rules can depend on where you live, so check the store page for your market.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {globalStores().map((p) => (
            <StoreCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
