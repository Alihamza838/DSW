import { Link } from "react-router-dom";
import Seo from "../Seo";
import { breadcrumbSchema, itemListSchema } from "../schema";
import { Breadcrumbs, Container } from "../ui";
import { formatDate, guideImage } from "../data";
import { GUIDES } from "../guides";
import { AUTHORS, href } from "../config";

export function Component() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
  ];
  return (
    <Container className="py-8 sm:py-10">
      <Seo
        title="Return Policy Guides: Receipts, Deadlines & Refunds"
        description="Practical guides on store returns: returning without a receipt, holiday deadlines, store credit vs refunds, final sale rules and your legal rights."
        path="/blog"
        jsonLd={[breadcrumbSchema(crumbs), itemListSchema("Return policy guides", GUIDES.map((g) => ({ name: g.title, path: `/blog/${g.slug}` })))]}
      />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-6 text-3xl font-bold text-ink sm:text-[2.6rem]">Guides</h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-2">Plain-English help for the questions people ask at the returns desk. Store facts in these guides come from the verified store pages.</p>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link to={href(`/blog/${g.slug}`)} className="rise group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-brand-500 hover:shadow-lg">
              <img src={guideImage(g.slug)} alt="" width={800} height={420} loading="lazy" decoding="async" className="aspect-[40/21] w-full bg-soft object-cover" />
              <span className="flex flex-1 flex-col p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{g.category}</span>
                <span className="mt-2 font-serif text-lg font-bold leading-snug text-ink group-hover:text-brand-700">{g.title}</span>
                <span className="mt-2 flex-1 text-sm text-ink-2">{g.description}</span>
                <span className="mt-3 text-xs text-ink-3">
                  {AUTHORS[g.author]?.name ?? g.author} · Updated {formatDate(g.updated)} · {g.readingMinutes} min read
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
