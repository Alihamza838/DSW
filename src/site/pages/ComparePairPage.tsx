import { Link, useParams } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema } from "../schema";
import { Breadcrumbs, Container, Section } from "../ui";
import CompareView, { compareSummary } from "../CompareView";
import { COMPARE_PAIRS, compareOg, pairSlug, parsePair } from "../data";
import { getPolicy } from "../../data/policies";
import { href } from "../config";
import { clamp } from "./StorePage";
import { NotFoundContent } from "./NotFoundPage";

export function Component() {
  const { pair } = useParams<{ pair: string }>();
  const found = parsePair(pair);
  if (!found || !pair) return <NotFoundContent />;
  const [a, b] = found;
  const path = `/compare/${pair}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `${a.name} vs ${b.name}`, path },
  ];
  const faqs = [
    { q: `Which has the longer return window, ${a.name} or ${b.name}?`, a: compareSummary(a, b)[0] },
    { q: `What is ${a.name}'s return policy?`, a: `${a.headline}. ${a.summary}` },
    { q: `What is ${b.name}'s return policy?`, a: `${b.headline}. ${b.summary}` },
  ];
  const title = `${a.name} vs ${b.name} Return Policy: Which Is Better?`;
  const others = COMPARE_PAIRS.filter(([x, y]) => pairSlug(x, y) !== pair).slice(0, 8);

  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title={title.length <= 60 ? title : `${a.name} vs ${b.name} Return Policy Compared`}
        description={clamp(`${a.name} vs ${b.name} return policy, side by side: ${a.name} ${a.headline.toLowerCase()}; ${b.name} ${b.headline.toLowerCase()}.`, 158)}
        path={path}
        image={compareOg(pair)}
        jsonLd={[faqSchema(faqs), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">
        {a.name} vs {b.name} return policy
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">
        Both policies side by side, from each store's official returns page. Use it to decide where to buy, or to check which rule applies to something you already
        bought.
      </p>
      <div className="mt-8">
        <CompareView a={a} b={b} />
      </div>
      <Section title="Questions">
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="font-sans text-base font-semibold text-ink">{f.q}</h3>
              <p className="mt-1 text-ink-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="More comparisons">
        <ul className="flex flex-wrap gap-2">
          {others.map(([x, y]) => (
            <li key={pairSlug(x, y)}>
              <Link to={href(`/compare/${pairSlug(x, y)}`)} className="inline-flex rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-ink-2 hover:border-brand-500 hover:text-brand-700">
                {getPolicy(x)?.name} vs {getPolicy(y)?.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/compare/" className="inline-flex rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
              Compare any two stores
            </Link>
          </li>
        </ul>
      </Section>
    </Container>
  );
}
