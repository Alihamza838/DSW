/**
 * ReturnChecker.tsx - "Can I still return it?" A shopper standing over a parcel wants a yes or no,
 * not a policy essay. Four quick answers turn the verified rules into a verdict: days left on every
 * deadline, plus only the rules that matter for their situation (opened item, no receipt, online
 * order). Everything runs in the browser; the prerendered page shows the questions.
 */
import { useId, useMemo, useState } from "react";
import type { VerifiedPolicy } from "../data/policies";
import { icsFor, visitorLocale } from "./DeadlineCalculator";
import { noLimit } from "./ui";

const DAY = 86400000;
type Opened = "sealed" | "opened" | null;
type Proof = "yes" | "no" | null;
type Channel = "online" | "store" | null;

const RULES: Record<string, RegExp> = {
  opened: /open|sealed|unused|used|worn|wash|condition|restocking|deduct|tag|hygien/i,
  noProof: /receipt|proof|look ?up|lookup|credit|card|clubcard|account|record/i,
  online: /online|mail|post|drop-?off|label|ship|deliver|courier|pickup|collection/i,
  store: /store|in-store|in store|shop|counter|warehouse/i,
};

function pick(p: VerifiedPolicy, re: RegExp, max = 3) {
  const all = [...p.facts.map((f) => `${f.label}: ${f.value}`), ...p.exceptions];
  return [...new Set(all.filter((t) => re.test(t)))].slice(0, max);
}

function Choice<T extends string>({ name, value, set, options }: { name: string; value: T | null; set: (v: T) => void; options: [T, string][] }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => set(v)}
          className={`min-h-[44px] rounded-full border-2 px-4 text-sm font-bold transition ${value === v ? "border-ink bg-ink text-white" : "border-line bg-white text-ink-2 hover:border-brand-500"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function ReturnChecker({ p }: { p: VerifiedPolicy }) {
  const id = useId();
  const [date, setDate] = useState("");
  const [opened, setOpened] = useState<Opened>(null);
  const [proof, setProof] = useState<Proof>(null);
  const [channel, setChannel] = useState<Channel>(null);

  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
  const start = date ? new Date(`${date}T12:00:00Z`).getTime() : null;
  const locale = date ? visitorLocale() : "en-US";
  const fmt = (t: number) => new Date(t).toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  const verdict = useMemo(() => {
    if (start === null) return null;
    const elapsed = Math.round((todayUtc - start) / DAY);
    if (elapsed < 0) return { tone: "warn" as const, title: "That date is in the future", text: "Pick the day you bought it or it was delivered." };
    if (p.headline.startsWith("No change-of-mind")) return { tone: "no" as const, title: `${p.name} doesn't take change-of-mind returns`, text: "Only faulty or damaged items are handled. See the steps below." };
    if (p.windowDays === null)
      return noLimit(p)
        ? { tone: "yes" as const, title: "Very likely yes: no set deadline for most items", text: `Day ${elapsed} since purchase. Check the shorter windows below for electronics and other categories.` }
        : { tone: "warn" as const, title: "It depends on the item", text: "This store sets the window per product. Check the rules below or your order page." };
    const left = p.windowDays - elapsed;
    const end = start + p.windowDays * DAY;
    if (left > 7) return { tone: "yes" as const, title: `Yes, ${left} days left`, text: `The main window ends on ${fmt(end)}.`, end };
    if (left >= 0) return { tone: "warn" as const, title: left === 0 ? "Yes, but today is the last day" : `Yes, but only ${left} day${left === 1 ? "" : "s"} left`, text: `Return it by ${fmt(end)}.`, end };
    return { tone: "no" as const, title: `The main window closed ${-left} day${left === -1 ? "" : "s"} ago`, text: `It ended on ${fmt(end)}. A longer rule below may still apply, or ask the store about credit.`, end };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, p, todayUtc, locale]);

  const notes = [
    ...(opened === "opened" ? [{ title: "Because it's opened or used", lines: pick(p, RULES.opened) }] : []),
    ...(proof === "no" ? [{ title: "Without a receipt", lines: pick(p, RULES.noProof) }] : []),
    ...(channel === "online" ? [{ title: "For an online order", lines: pick(p, RULES.online) }] : []),
    ...(channel === "store" ? [{ title: "For a store purchase", lines: pick(p, RULES.store) }] : []),
  ].map((n) =>
    n.lines.length
      ? n
      : { ...n, lines: [`${p.name}'s official policy doesn't state a special rule for this. Bring the item in its original condition and ask at the returns desk.`] },
  );

  const milestones = p.timeline.filter((t) => t.day > 0);
  const tones = { yes: "border-emerald-600 bg-emerald-50", warn: "border-amber-500 bg-amber-50", no: "border-rose-600 bg-rose-50" };
  const icons = { yes: "✓", warn: "!", no: "✕" };
  const iconBg = { yes: "bg-emerald-700", warn: "bg-amber-600", no: "bg-rose-700" };

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-brand-900/10">
      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
        <div>
          <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-ink-3">
            1 · When did you buy it (or get it)?
          </label>
          <input id={id} type="date" value={date} max={iso(todayUtc)} onChange={(e) => setDate(e.target.value)} className="mt-2 h-12 w-full rounded-xl border-2 border-line bg-paper px-3 text-ink focus:border-brand-500 focus:outline-none" />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(
              [
                ["Today", 0],
                ["Yesterday", 1],
                ["1 week ago", 7],
                ["1 month ago", 30],
              ] as const
            ).map(([label, back]) => (
              <button key={label} type="button" onClick={() => setDate(iso(todayUtc - back * DAY))} className="min-h-[36px] rounded-full bg-soft px-3 text-xs font-bold text-ink-2 hover:bg-brand-100">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">2 · Is it opened or used?</p>
            <div className="mt-2">
              <Choice name="Opened or used" value={opened} set={setOpened} options={[["sealed", "Still sealed"], ["opened", "Opened / used"]]} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">3 · Do you have the receipt?</p>
            <div className="mt-2">
              <Choice name="Receipt" value={proof} set={setProof} options={[["yes", "Yes / order email"], ["no", "No receipt"]]} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">4 · Where did you buy it?</p>
            <div className="mt-2">
              <Choice name="Where bought" value={channel} set={setChannel} options={[["online", "Online"], ["store", "In a store"]]} />
            </div>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="border-t-2 border-dashed border-line bg-paper p-5 sm:p-6">
        {!verdict ? (
          <p className="text-ink-2">
            <strong className="text-ink">Pick a date</strong> and we'll tell you if {p.name} will still take it back, with every deadline and the rules for your situation.
          </p>
        ) : (
          <div className="space-y-4">
            <div className={`flex items-start gap-4 rounded-2xl border-2 p-4 ${tones[verdict.tone]}`}>
              <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-extrabold text-white ${iconBg[verdict.tone]}`}>
                {icons[verdict.tone]}
              </span>
              <div>
                <p className="text-xl font-extrabold text-ink">{verdict.title}</p>
                <p className="mt-0.5 text-ink-2">{verdict.text}</p>
              </div>
            </div>
            {start !== null && milestones.length > 1 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {milestones.map((m) => {
                  const end = start + m.day * DAY;
                  const left = Math.round((end - todayUtc) / DAY);
                  return (
                    <li key={m.label} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 ring-1 ring-line">
                      <span className="text-sm text-ink-2">{m.label}</span>
                      <span className={`whitespace-nowrap font-mono text-sm font-bold ${left < 0 ? "text-rose-700" : left <= 7 ? "text-amber-700" : "text-emerald-700"}`}>{left < 0 ? "closed" : `${left}d left`}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {notes.map((n) => (
              <div key={n.title}>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{n.title}</p>
                <ul className="mt-1.5 space-y-1.5">
                  {n.lines.map((l) => (
                    <li key={l} className="flex gap-2 text-ink-2">
                      <span aria-hidden="true" className="text-brand-700">
                        →
                      </span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {proof === "yes" && opened === "sealed" && verdict.tone === "yes" && <p className="font-semibold text-emerald-800">Sealed, with proof of purchase and inside the window: this is the easiest kind of return.</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              {"end" in verdict && verdict.end && verdict.tone !== "no" && (
                <a href={icsFor(p, "main return window", new Date(verdict.end))} download={`${p.slug}-return-deadline.ics`} className="inline-flex min-h-[44px] items-center rounded-full bg-brand-700 px-5 text-sm font-bold text-white hover:bg-brand-800">
                  Add the deadline to my calendar
                </a>
              )}
              <a href={p.source} target="_blank" rel="noopener nofollow" className="inline-flex min-h-[44px] items-center rounded-full border-2 border-ink px-5 text-sm font-bold text-ink hover:bg-ink hover:text-white">
                Open {p.name}'s official policy ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
