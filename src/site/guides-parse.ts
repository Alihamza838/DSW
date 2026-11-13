/** Parses a Markdown guide (frontmatter + body). Shared by the site and the image script. */
export interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  stores: string[];
  body: string;
  readingMinutes: number;
  headings: { id: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function parseGuide(raw: string, file: string): Guide {
  const m = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  const body = m[2].trim();
  const words = body.split(/\s+/).length;
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => ({ text: h[1].trim(), id: slugify(h[1].trim()) }));
  const faqStart = body.search(/^## Frequently asked questions\s*$/im);
  const faqs =
    faqStart === -1
      ? []
      : [...body.slice(faqStart).matchAll(/^### (.+)\n+([\s\S]*?)(?=\n### |\n## |$)/gm)].map((f) => ({
          q: f[1].trim(),
          a: f[2].trim().replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
        }));
  for (const k of ["title", "slug", "description", "date", "author"]) if (!fm[k]) throw new Error(`${file}: missing ${k}`);
  return {
    slug: fm.slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated || fm.date,
    author: fm.author,
    category: fm.category || "Guide",
    stores: (fm.stores || "").split(",").map((s) => s.trim()).filter(Boolean),
    body,
    readingMinutes: Math.max(2, Math.round(words / 220)),
    headings,
    faqs,
  };
}

