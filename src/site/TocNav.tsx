/**
 * TocNav.tsx - "On this page" list that highlights the section you are reading (scrollspy).
 * Works as plain anchor links without JavaScript.
 */
import { useEffect, useState } from "react";

export default function TocNav({ items, title = "On this page" }: { items: { id: string; text: string }[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={title} className="rounded-2xl border border-line bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-ink-3">{title}</p>
      <ol className="mt-3 space-y-1 border-l-2 border-line text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-0.5 block border-l-2 py-1.5 pl-3 transition ${active === i.id ? "border-brand-600 font-semibold text-brand-700" : "border-transparent text-ink-2 hover:text-ink"}`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
