import { Link, useParams } from "react-router-dom";
import { ReadingProgress } from "../ScrollEffects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import Seo from "../Seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "../schema";
import { Breadcrumbs, Container, Section, StoreCard } from "../ui";
import { formatDate, guideImage, guideOg } from "../data";
import { getGuide, relatedGuides, slugify } from "../guides";
import { getPolicy } from "../../data/policies";
import { AUTHORS, href } from "../config";
import { NotFoundContent } from "./NotFoundPage";

const text = (n: ReactNode): string => (typeof n === "string" ? n : Array.isArray(n) ? n.map(text).join("") : "");

export function Component() {
  const { slug } = useParams<{ slug: string }>();
  const g = getGuide(slug);
  if (!g) return <NotFoundContent />;
  const path = `/blog/${g.slug}`;
  const author = AUTHORS[g.author] ?? AUTHORS["ali-hamza"];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
    { name: g.title, path },
  ];
  const stores = g.stores.map((s) => getPolicy(s)).filter((p): p is NonNullable<typeof p> => !!p);
  const related = relatedGuides(g);

  return (
    <article>
      <ReadingProgress />
      <Seo
        title={g.title}
        description={g.description}
        path={path}
        image={guideOg(g.slug)}
        type="article"
        modified={g.updated}
        jsonLd={[
          articleSchema({ title: g.title, description: g.description, path, image: guideOg(g.slug), published: g.date, modified: g.updated, author: author.name }),
          ...(g.faqs.length ? [faqSchema(g.faqs)] : []),
          breadcrumbSchema(crumbs),
        ]}
      />
      <Container className="py-8 sm:py-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-700">{g.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-[2.6rem]">{g.title}</h1>
            <p className="mt-4 text-lg text-ink-2">{g.description}</p>
            <p className="mt-4 text-sm text-ink-3">
              By{" "}
              <Link to="/about/" className="font-semibold text-ink-2 underline underline-offset-2">
                {author.name}
              </Link>{" "}
              · Published {formatDate(g.date)}
              {g.updated !== g.date && <> · Updated {formatDate(g.updated)}</>} · {g.readingMinutes} min read
            </p>
            <img
              src={guideImage(g.slug)}
              alt={`${g.title}: illustration`}
              width={800}
              height={420}
              fetchPriority="high"
              decoding="async"
              className="mt-6 aspect-[40/21] w-full rounded-2xl border border-line bg-soft object-cover"
            />
            <div className="prose-read mt-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 id={slugify(text(children))}>{children}</h2>,
                  a: ({ href: h, children }) =>
                    h && h.startsWith("/") ? (
                      <Link to={href(h)}>{children}</Link>
                    ) : (
                      <a href={h} target="_blank" rel="noopener nofollow">
                        {children}
                      </a>
                    ),
                }}
              >
                {g.body}
              </ReactMarkdown>
            </div>
            <aside className="mt-10 rounded-2xl border border-line bg-card p-5 text-sm text-ink-2">
              <p>
                <strong className="text-ink">About the author:</strong> {author.bio}
              </p>
            </aside>
          </div>
          <aside className="mt-10 space-y-6 lg:sticky lg:top-24 lg:mt-0 lg:self-start" aria-label="Article navigation">
            {g.headings.length > 2 && (
              <nav aria-label="On this page" className="rounded-2xl border border-line bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-3">On this page</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {g.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink-2 hover:text-brand-700 hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>
        </div>
        {stores.length > 0 && (
          <Section title="Store policies in this guide">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stores.map((p) => (
                <StoreCard key={p.slug} p={p} />
              ))}
            </div>
          </Section>
        )}
        {related.length > 0 && (
          <Section title="Related guides">
            <ul className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={href(`/blog/${r.slug}`)} className="block h-full rounded-2xl border border-line bg-card p-5 hover:border-brand-500">
                    <span className="font-serif text-lg font-bold text-ink">{r.title}</span>
                    <span className="mt-1 block text-sm text-ink-2">{r.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </Container>
    </article>
  );
}
