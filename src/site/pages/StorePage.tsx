import { Link, useParams } from "react-router-dom";
import { getPolicy, type VerifiedPolicy } from "../../data/policies";
import Seo from "../Seo";
import { breadcrumbSchema, faqSchema } from "../schema";
import { Breadcrumbs, Container, FactTable, FaqList, PolicyImage, Section, StoreCard, Timeline, WindowBadge } from "../ui";
import DeadlineCalculator from "../DeadlineCalculator";
import { categoryOf, formatDate, pairSlug, pairsFor, relatedStores, storeOg } from "../data";
import { guidesForStore } from "../guides";
import { AUTHORS, absoluteUrl, href } from "../config";
import { NotFoundContent } from "./NotFoundPage";

export function clamp(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + ".";
}

/** "DSW Return Policy 2026: 60 days for a full refund…" kept within 60 characters. */
export function storeTitle(p: VerifiedPolicy) {
  const base = `${p.name} Return Policy 2026`;
  const options = [
    `${base}: ${p.headline.charAt(0).toUpperCase()}${p.headline.slice(1)}`,
    p.windowDays ? `${base}: ${p.windowDays}-Day Rules & Exceptions` : "",
    `${base}: Rules, Receipts & Fees`,
    base,
  ].filter(Boolean);
  return options.find((t) => t.length <= 60) ?? base;
}

export function storeDescription(p: VerifiedPolicy) {
  const month = new Date(`${p.checked}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  return clamp(`${p.name} return policy, checked ${month} on the official site: ${p.headline}. ${p.exceptions[0] ?? p.facts[1]?.value ?? ""}`, 158);
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Component() {
  const { slug } = useParams<{ slug: string }>();
  const p = getPolicy(slug);
  if (!p) return <NotFoundContent />;

  const path = `/stores/${p.slug}`;
  const cat = categoryOf(p);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    ...(cat ? [{ name: cat.name, path: `/stores/category/${cat.slug}` }] : []),
    { name: `${p.name} return policy`, path },
  ];
  const guides = guidesForStore(p.slug);
  const pairs = pairsFor(p.slug);
  const related = relatedStores(p);
  const author = AUTHORS["ali-hamza"];
  const faqs = p.faqs;

  return (
    <article>
      <Seo
        title={storeTitle(p)}
        description={storeDescription(p)}
        path={path}
        image={storeOg(p.slug)}
        type="article"
        modified={p.checked}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${p.name} return policy`,
            url: absoluteUrl(path),
            dateModified: p.checked,
            about: { "@type": "Organization", name: p.name, url: p.source },
            author: { "@type": "Person", name: author.name, url: absoluteUrl("/about") },
            primaryImageOfPage: absoluteUrl(storeOg(p.slug)),
          },
          faqSchema(faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      <div className="border-b border-line bg-card">
        <Container className="py-8 sm:py-10">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                {p.country} · {p.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-ink sm:text-[2.6rem]">{p.name} return policy</h1>
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-4">
                <WindowBadge p={p} size="lg" />
                <p className="font-serif text-xl font-semibold leading-snug text-brand-900 sm:text-2xl">{p.headline}</p>
              </div>
              <p className="mt-5 text-lg text-ink-2">{p.summary}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  Checked {formatDate(p.checked)}
                </span>
                <span>
                  by{" "}
                  <Link to="/about/" className="font-semibold text-ink-2 underline underline-offset-2">
                    {author.name}
                  </Link>{" "}
                  against{" "}
                  <a href={p.source} target="_blank" rel="noopener nofollow" className="font-semibold text-brand-700 underline underline-offset-2">
                    {hostOf(p.source)}
                  </a>
                </span>
              </p>
            </div>
            <PolicyImage p={p} eager />
          </div>
        </Container>
      </div>

      <Container className="pb-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            {p.holiday && (
              <aside className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5" aria-label="Holiday return rules">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-800">Holiday rules right now</p>
                <p className="mt-1 text-amber-950">{p.holiday}</p>
              </aside>
            )}

            <Section id="key-facts" title={`${p.name} return policy at a glance`}>
              <FactTable facts={p.facts} />
            </Section>

            {p.timeline.length > 1 && (
              <Section id="timeline" title="Your return timeline" intro="Each date counts from the day the window starts (purchase or delivery, see above).">
                <Timeline points={p.timeline} />
                <div className="mt-6">
                  <DeadlineCalculator p={p} />
                </div>
              </Section>
            )}

            <Section id="exceptions" title="Exceptions and fine print">
              <ul className="space-y-2.5">
                {p.exceptions.map((e) => (
                  <li key={e} className="flex gap-3 rounded-xl border border-line bg-card px-4 py-3 text-ink-2">
                    <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
                    {e}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="how-to-return" title={`How to return to ${p.name}`}>
              <ol className="space-y-3">
                {p.steps.map((s, i) => (
                  <li key={s} className="flex gap-4 rounded-xl border border-line bg-card px-4 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span>
                    <span className="pt-1 text-ink-2">{s}</span>
                  </li>
                ))}
              </ol>
            </Section>

            {p.tips.length > 0 && (
              <Section id="tips" title="Tips that save a return">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.tips.map((t) => (
                    <li key={t} className="rounded-xl bg-soft px-4 py-3 text-ink-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section id="faq" title={`${p.name} returns: common questions`}>
              <FaqList faqs={faqs} />
            </Section>

            <section className="mt-12 rounded-2xl border border-line bg-card p-5 text-sm text-ink-2" aria-label="Sources">
              <p>
                <strong className="text-ink">Source:</strong>{" "}
                <a href={p.source} target="_blank" rel="noopener nofollow" className="break-all font-semibold text-brand-700 underline">
                  {p.source}
                </a>{" "}
                (checked {formatDate(p.checked)}).
              </p>
              {p.unconfirmed && (
                <p className="mt-2">
                  <strong className="text-ink">Not confirmed:</strong> {p.unconfirmed}
                </p>
              )}
              <p className="mt-2">
                This is an independent summary, not {p.name}'s official policy. Stores can change their rules at any time, so check the final details on the official page
                before you return. Spotted a change?{" "}
                <Link to="/contact/" className="font-semibold text-brand-700 underline">
                  Tell us
                </Link>
                .
              </p>
            </section>
          </div>

          <aside className="mt-12 space-y-6 lg:sticky lg:top-24 lg:self-start" aria-label="More">
            <nav aria-label="On this page" className="hidden rounded-2xl border border-line bg-card p-5 lg:block">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-3">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  ["key-facts", "At a glance"],
                  ...(p.timeline.length > 1 ? [["timeline", "Timeline & deadline calculator"]] : []),
                  ["exceptions", "Exceptions"],
                  ["how-to-return", "How to return"],
                  ["faq", "Questions"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-ink-2 hover:text-brand-700 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {pairs.length > 0 && (
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-3">Compare {p.name}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {pairs.map(([a, b]) => (
                    <li key={pairSlug(a, b)}>
                      <Link to={href(`/compare/${pairSlug(a, b)}`)} className="font-semibold text-brand-700 hover:underline">
                        {getPolicy(a)?.name} vs {getPolicy(b)?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {guides.length > 0 && (
              <div className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-3">Guides</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {guides.slice(0, 5).map((g) => (
                    <li key={g.slug}>
                      <Link to={href(`/blog/${g.slug}`)} className="text-ink-2 hover:text-brand-700 hover:underline">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <Section title={cat ? `Other ${cat.name.toLowerCase()} return policies` : "Similar stores"}>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <StoreCard key={r.slug} p={r} />
              ))}
            </div>
          </Section>
        )}
      </Container>
    </article>
  );
}
