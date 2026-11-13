/** Side-by-side comparison of two verified policies, with a factual summary. */
import { Link } from "react-router-dom";
import type { VerifiedPolicy } from "../data/policies";
import { formatDate } from "./data";
import { href } from "./config";
import { WindowBadge } from "./ui";

/** Plain facts only, computed from the two records. */
export function compareSummary(a: VerifiedPolicy, b: VerifiedPolicy): string[] {
  const out: string[] = [];
  const w = (p: VerifiedPolicy) => (p.windowDays === null ? null : p.windowDays);
  if (w(a) !== null && w(b) !== null && w(a) !== w(b)) {
    const [longer, shorter] = (w(a) as number) > (w(b) as number) ? [a, b] : [b, a];
    out.push(`${longer.name} gives more time for its main window: ${longer.windowDays} days, against ${shorter.windowDays} at ${shorter.name}.`);
  } else if (w(a) !== null && w(a) === w(b)) {
    out.push(`Both give ${a.windowDays} days for their main return window, so the exceptions decide which is easier.`);
  } else {
    const noFixed = w(a) === null ? a : b;
    const other = noFixed === a ? b : a;
    out.push(`${noFixed.name} has no single fixed window (${noFixed.headline.toLowerCase()}), while ${other.name}: ${other.headline.toLowerCase()}.`);
  }
  for (const p of [a, b]) if (p.holiday) out.push(`${p.name} has special holiday rules right now (see below).`);
  return out;
}

export default function CompareView({ a, b }: { a: VerifiedPolicy; b: VerifiedPolicy }) {
  const labels = [...new Set([...a.facts.map((f) => f.label), ...b.facts.map((f) => f.label)])];
  const val = (p: VerifiedPolicy, label: string) => p.facts.find((f) => f.label === label)?.value ?? "—";
  return (
    <div>
      <ul className="space-y-2">
        {compareSummary(a, b).map((s) => (
          <li key={s} className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-brand-900">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
        {[a, b].map((p) => (
          <Link key={p.slug} to={href(`/stores/${p.slug}`)} className="rounded-2xl border border-line bg-card p-4 text-center transition hover:border-brand-500 sm:p-6">
            <WindowBadge p={p} size="lg" />
            <p className="mt-3 font-serif text-xl font-bold text-ink">{p.name}</p>
            <p className="mt-1 text-sm text-ink-2">{p.headline}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[560px] text-left text-[15px]">
          <caption className="sr-only">
            {a.name} and {b.name} return policies compared
          </caption>
          <thead className="bg-soft text-sm text-ink">
            <tr>
              <th scope="col" className="px-4 py-3">
                Rule
              </th>
              <th scope="col" className="px-4 py-3">
                {a.name}
              </th>
              <th scope="col" className="px-4 py-3">
                {b.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            <tr>
              <th scope="row" className="px-4 py-3 font-semibold text-ink-3">
                In short
              </th>
              <td className="px-4 py-3 font-medium text-ink">{a.headline}</td>
              <td className="px-4 py-3 font-medium text-ink">{b.headline}</td>
            </tr>
            {labels.map((l) => (
              <tr key={l}>
                <th scope="row" className="px-4 py-3 font-semibold text-ink-3">
                  {l}
                </th>
                <td className="px-4 py-3 text-ink-2">{val(a, l)}</td>
                <td className="px-4 py-3 text-ink-2">{val(b, l)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-4 py-3 font-semibold text-ink-3">
                Holiday rules
              </th>
              <td className="px-4 py-3 text-ink-2">{a.holiday ?? "None listed"}</td>
              <td className="px-4 py-3 text-ink-2">{b.holiday ?? "None listed"}</td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 font-semibold text-ink-3">
                Checked
              </th>
              <td className="px-4 py-3 text-ink-2">{formatDate(a.checked)}</td>
              <td className="px-4 py-3 text-ink-2">{formatDate(b.checked)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[a, b].map((p) => (
          <div key={p.slug} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="font-serif text-lg font-bold text-ink">{p.name}: watch out for</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              {p.exceptions.slice(0, 4).map((e) => (
                <li key={e} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  {e}
                </li>
              ))}
            </ul>
            <Link to={href(`/stores/${p.slug}`)} className="mt-4 inline-block text-sm font-semibold text-brand-700 underline">
              Full {p.name} return policy
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
