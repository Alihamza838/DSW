import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryBadge, windowLabel } from "../ui";
import { BRANDS, brandStores, countryOfPolicy } from "../../data/countries";
import { href } from "../config";

export function Component() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Brands", path: "/brands" },
  ];
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title="Same Brand, Different Country: Return Policies Compared"
        description="Amazon, IKEA, Zara, H&M, Apple, Sephora, Nike, Walmart and Best Buy return policies compared country by country, each checked on the official local site."
        path="/brands"
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema("Brand return policies by country", BRANDS.map((b) => ({ name: `${b.name} return policy by country`, path: `/brands/${b.slug}` })))]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">Same brand, different country</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">
        Big brands run a separate store in each country, and each one writes its own return policy to fit local law. A return that's easy in London can be impossible in
        Mumbai. Pick a brand to see its rules side by side.
      </p>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {BRANDS.map((b) => {
          const stores = brandStores(b);
          return (
            <li key={b.slug}>
              <Link to={href(`/brands/${b.slug}`)} className="rise group block h-full rounded-3xl border border-line bg-card p-5 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-lg">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-2xl font-bold text-ink group-hover:text-brand-700">{b.name}</span>
                  <span className="text-sm font-semibold text-ink-3">{stores.length} countries</span>
                </span>
                <span className="mt-2 block text-ink-2">{b.intro}</span>
                <span className="mt-4 grid gap-1.5">
                  {stores.map((p) => {
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
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
