import { Link, useParams } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, Section, StoreCard, windowLabel } from "../ui";
import { CATEGORIES, storesInCategory } from "../data";
import { href } from "../config";
import { NotFoundContent } from "./NotFoundPage";

export function Component() {
  const { category } = useParams<{ category: string }>();
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) return <NotFoundContent />;
  const stores = storesInCategory(c).sort((a, b) => (b.windowDays ?? 400) - (a.windowDays ?? 400));
  const path = `/stores/category/${c.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: c.name, path },
  ];
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title={c.title}
        description={c.description}
        path={path}
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema(c.title, stores.map((p) => ({ name: `${p.name} return policy`, path: `/stores/${p.slug}` })))]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">{c.name} return policies</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">{c.intro}</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[620px] text-left text-[15px]">
          <caption className="sr-only">{c.name} return policies compared</caption>
          <thead className="bg-soft text-sm text-ink">
            <tr>
              <th scope="col" className="px-4 py-3">Store</th>
              <th scope="col" className="px-4 py-3">Main window</th>
              <th scope="col" className="px-4 py-3">In short</th>
              <th scope="col" className="px-4 py-3">Holiday rules</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {stores.map((p) => (
              <tr key={p.slug}>
                <th scope="row" className="px-4 py-3">
                  <Link to={href(`/stores/${p.slug}`)} className="font-semibold text-brand-700 underline underline-offset-2">
                    {p.name}
                  </Link>
                  <span className="block text-xs font-normal text-ink-3">{p.country}</span>
                </th>
                <td className="px-4 py-3 font-semibold text-ink">{windowLabel(p).big}</td>
                <td className="px-4 py-3 text-ink-2">{p.headline}</td>
                <td className="px-4 py-3 text-sm text-ink-2">{p.holiday ? "Yes, see store page" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Section title="Store by store">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((p) => (
            <StoreCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <Section title="Other categories">
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => (
            <li key={x.slug}>
              <Link to={href(`/stores/category/${x.slug}`)} className="inline-flex rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                {x.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
