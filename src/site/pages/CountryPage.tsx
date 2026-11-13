import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, CountryBadge, FaqList, Section, StoreCard, windowLabel } from "../ui";
import { rememberCountry } from "../CountryPicker";
import { COUNTRIES, BRANDS, brandStores, getCountry, globalStores, storesInCountry } from "../../data/countries";
import { formatDate } from "../data";
import { href } from "../config";
import { clamp } from "./StorePage";
import { NotFoundContent } from "./NotFoundPage";

export function Component() {
  const { country } = useParams<{ country: string }>();
  const c = getCountry(country);
  useEffect(() => {
    if (c) rememberCountry(c.slug);
  }, [c]);
  if (!c) return <NotFoundContent />;

  const path = `/countries/${c.slug}`;
  const stores = [...storesInCountry(c)].sort((a, b) => (b.windowDays ?? 9999) - (a.windowDays ?? 9999) || a.name.localeCompare(b.name));
  // A store with no fixed window and no returns (e.g. Apple India) belongs at the end
  stores.sort((a, b) => Number(windowLabel(a).big === "No returns") - Number(windowLabel(b).big === "No returns"));
  const brandsHere = BRANDS.filter((b) => brandStores(b).some((p) => p.country === c.policyCountry));
  const checked = stores.reduce((m, p) => (p.checked > m ? p.checked : m), "");
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/countries" },
    { name: c.name, path },
  ];
  const others = COUNTRIES.filter((x) => x.slug !== c.slug);

  return (
    <>
      <Seo
        title={`${c.name} Store Return Policies 2026: ${stores.length} Stores`}
        description={clamp(
          `Return policies for ${stores.length} stores in ${c.name}, checked ${new Date(`${checked}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })} on each official site: ${stores
            .slice(0, 4)
            .map((p) => p.name)
            .join(", ")} and more, plus your legal rights.`,
        )}
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            `${c.name} store return policies`,
            stores.map((p) => ({ name: `${p.name} return policy`, path: `/stores/${p.slug}` })),
          ),
          faqSchema(c.faqs),
        ]}
      />

      <div className="border-b border-line bg-card">
        <Container className="py-8 sm:py-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex items-start gap-4">
            <CountryBadge code={c.code} colors={c.badge} size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{c.group}</p>
              <h1 className="text-3xl font-bold text-ink sm:text-[2.6rem]">Store return policies in {c.name}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-lg text-ink-2">{c.intro}</p>
          <p className="mt-4 text-sm text-ink-3">
            {stores.length} stores · each checked on the store's official site · last checked {formatDate(checked)}
          </p>
        </Container>
      </div>

      <Container className="pb-8">
        <Section id="at-a-glance" title={`Return windows in ${c.name} at a glance`} intro="Sorted from the longest main window to the shortest. Tap a store for exceptions, steps and a deadline calculator.">
          <div className="overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-soft text-ink">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Store</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Main window</th>
                  <th scope="col" className="px-4 py-3 font-semibold">The rule in one line</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Official page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {stores.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row" className="px-4 py-3 align-top font-semibold">
                      <Link to={href(`/stores/${p.slug}`)} className="text-brand-700 underline-offset-2 hover:underline">
                        {p.name}
                      </Link>
                      <span className="block text-xs font-normal text-ink-3">{p.category}</span>
                    </th>
                    <td className="whitespace-nowrap px-4 py-3 align-top font-serif text-base font-bold text-ink">{windowLabel(p).big}</td>
                    <td className="px-4 py-3 align-top text-ink-2">{p.headline}</td>
                    <td className="px-4 py-3 align-top">
                      <a href={p.source} target="_blank" rel="noopener nofollow" className="font-medium text-ink-2 underline underline-offset-2 hover:text-brand-700">
                        {p.name} site<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="rights" title={`Your legal rights in ${c.name}`}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <ul className="space-y-2.5">
              {c.law.map((l) => (
                <li key={l} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3 text-ink-2">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                  {l}
                </li>
              ))}
            </ul>
            <aside className="rounded-2xl border border-brand-200 bg-brand-50 p-5" aria-label="Official consumer authority">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-800">Official source</p>
              <a href={c.authority.url} target="_blank" rel="noopener" className="mt-2 block font-serif text-lg font-bold leading-snug text-brand-900 underline underline-offset-2">
                {c.authority.name}
              </a>
              <p className="mt-2 text-sm text-brand-900">{c.authority.note}</p>
              {c.extraLinks?.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener" className="mt-3 block text-sm font-semibold text-brand-800 underline underline-offset-2">
                  {l.name}
                </a>
              ))}
              <p className="mt-4 text-xs text-brand-900">This is a plain-language summary, not legal advice.</p>
            </aside>
          </div>
        </Section>

        <Section id="stores" title={`All ${c.name} stores we cover`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((p) => (
              <StoreCard key={p.slug} p={p} />
            ))}
          </div>
        </Section>

        {brandsHere.length > 0 && (
          <Section id="brands" title="Global brands here, compared with other countries" intro="Same name, different rules. See how each brand's policy here compares with its stores abroad.">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {brandsHere.map((b) => {
                const local = brandStores(b).find((p) => p.country === c.policyCountry)!;
                return (
                  <li key={b.slug}>
                    <Link to={href(`/brands/${b.slug}`)} className="block h-full rounded-2xl border border-line bg-card p-4 transition hover:border-brand-500">
                      <span className="font-serif text-lg font-bold text-ink">{b.name} in {brandStores(b).length} countries</span>
                      <span className="mt-1 block text-sm text-ink-2">
                        Here: <strong className="text-ink">{windowLabel(local).big}</strong> · {local.headline}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        <Section id="global" title="Shopping on global apps?" intro="These platforms sell into many countries. Their pages explain the rules for the market we checked.">
          <ul className="flex flex-wrap gap-2">
            {globalStores().map((p) => (
              <li key={p.slug}>
                <Link to={href(`/stores/${p.slug}`)} className="inline-flex min-h-[40px] items-center rounded-full border border-line bg-card px-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="faq" title={`Returns in ${c.name}: common questions`}>
          <FaqList faqs={c.faqs} />
        </Section>

        <nav aria-labelledby="other-countries" className="mt-12">
          <h2 id="other-countries" className="text-xl font-bold text-ink">
            Other countries
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={href(`/countries/${o.slug}`)} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-card py-1 pl-1.5 pr-4 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                  <CountryBadge code={o.code} colors={o.badge} size="sm" />
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
