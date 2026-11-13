import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container, Section } from "../ui";
import CompareView from "../CompareView";
import { COMPARE_PAIRS, pairSlug } from "../data";
import { POLICIES, getPolicy } from "../../data/policies";
import { href } from "../config";

export function Component() {
  const [a, setA] = useState("walmart");
  const [b, setB] = useState("target");
  // Allow /compare/?a=dsw&b=nike links (read after load, so the prerendered page stays stable)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (getPolicy(q.get("a") ?? "")) setA(q.get("a")!);
    if (getPolicy(q.get("b") ?? "")) setB(q.get("b")!);
  }, []);
  const pa = getPolicy(a)!;
  const pb = getPolicy(b)!;
  const sorted = [...POLICIES].sort((x, y) => x.name.localeCompare(y.name));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
  ];
  const select = (value: string, set: (v: string) => void, label: string) => (
    <label className="block">
      <span className="text-sm font-semibold text-ink-3">{label}</span>
      <select value={value} onChange={(e) => set(e.target.value)} className="mt-1 h-12 w-full rounded-xl border border-line bg-card px-3 text-ink">
        {sorted.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.name} ({p.country})
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title="Compare Store Return Policies Side by Side"
        description="Pick any two stores and compare their return windows, receipt rules, fees and holiday extensions side by side, from each store's official policy page."
        path="/compare"
        jsonLd={[
          breadcrumbSchema(crumbs),
          itemListSchema(
            "Popular return policy comparisons",
            COMPARE_PAIRS.map(([x, y]) => ({ name: `${getPolicy(x)?.name} vs ${getPolicy(y)?.name}`, path: `/compare/${pairSlug(x, y)}` })),
          ),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">Compare return policies</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">Choose two stores. The table updates straight away with each store's verified rules.</p>
      <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-card p-5 sm:grid-cols-2">
        {select(a, setA, "First store")}
        {select(b, setB, "Second store")}
      </div>
      <div className="mt-8">{a === b ? <p className="text-ink-2">Pick two different stores.</p> : <CompareView a={pa} b={pb} />}</div>
      <Section title="Popular comparisons" intro="Each has its own page you can bookmark or share.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COMPARE_PAIRS.map(([x, y]) => (
            <li key={pairSlug(x, y)}>
              <Link
                to={href(`/compare/${pairSlug(x, y)}`)}
                className="rise flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3 font-semibold text-ink hover:border-brand-500 hover:text-brand-700"
              >
                {getPolicy(x)?.name} vs {getPolicy(y)?.name}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
