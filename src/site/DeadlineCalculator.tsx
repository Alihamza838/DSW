/**
 * DeadlineCalculator.tsx - "When is my last day to return this?" Pick the purchase (or delivery)
 * date and every milestone of the store's timeline turns into a calendar date. Runs only in the
 * browser after the visitor picks a date, so the prerendered HTML never depends on "today".
 *
 * Dates are written the way the visitor's own browser language writes them (13 December 2026 in
 * the UK, December 13, 2026 in the US), and each deadline can be saved to their calendar as an
 * .ics file that is built in the browser: nothing is sent anywhere.
 */
import { useId, useState } from "react";
import type { VerifiedPolicy } from "../data/policies";

const DAY = 86400000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function visitorLocale() {
  try {
    return navigator.language || "en-US";
  } catch {
    return "en-US";
  }
}

function icsFor(p: VerifiedPolicy, label: string, end: Date) {
  const ymd = (d: Date) => iso(d).replace(/-/g, "");
  const next = new Date(end.getTime() + DAY);
  const remind = new Date(end.getTime() - 3 * DAY);
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DSWReturnRefund//Return deadline//EN",
    "BEGIN:VEVENT",
    `UID:${p.slug}-${ymd(end)}-${label.replace(/\W+/g, "-").toLowerCase()}@dswreturnrefund.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${ymd(end)}`,
    `DTEND;VALUE=DATE:${ymd(next)}`,
    `SUMMARY:Last day: ${p.name} return (${label})`,
    `DESCRIPTION:Check the official policy before returning: ${p.source}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${p.name} return deadline in 3 days`,
    `TRIGGER;VALUE=DATE-TIME:${ymd(remind)}T090000Z`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(text)}`;
}

export default function DeadlineCalculator({ p }: { p: VerifiedPolicy }) {
  const id = useId();
  const [date, setDate] = useState("");
  const milestones = p.timeline.filter((t) => t.day > 0);
  if (!milestones.length) return null;

  const locale = date ? visitorLocale() : "en-US";
  const fmt = (d: Date) => d.toLocaleDateString(locale, { weekday: "short", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const start = date ? new Date(`${date}T12:00:00Z`) : null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const quick = [
    ["Today", 0],
    ["Yesterday", 1],
    ["A week ago", 7],
  ] as const;

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
      <label htmlFor={id} className="block font-semibold text-brand-900">
        Purchase or delivery date
      </label>
      <p className="text-sm text-brand-800">Use the date the window starts from (see the facts above).</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          id={id}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-12 w-full max-w-xs rounded-xl border border-brand-200 bg-white px-3 text-ink"
        />
        {quick.map(([label, back]) => (
          <button
            key={label}
            type="button"
            onClick={() => setDate(iso(new Date(todayUtc - back * DAY)))}
            className="min-h-[44px] rounded-full border border-brand-200 bg-white px-4 text-sm font-semibold text-brand-800 hover:border-brand-500"
          >
            {label}
          </button>
        ))}
      </div>
      {start && (
        <ul className="mt-4 space-y-2" aria-live="polite">
          {milestones.map((m) => {
            const end = new Date(start.getTime() + m.day * DAY);
            const left = Math.round((end.getTime() - todayUtc) / DAY);
            return (
              <li key={m.label} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3">
                <span className="font-medium text-ink">{m.label}</span>
                <span className="text-right">
                  <span className="block font-semibold text-ink">{fmt(end)}</span>
                  <span className={`text-sm font-semibold ${left < 0 ? "text-rose-700" : left <= 7 ? "text-amber-700" : "text-brand-700"}`}>
                    {left < 0 ? `${-left} days ago` : left === 0 ? "Today is the last day" : `${left} days left`}
                  </span>
                  {left >= 0 && (
                    <a
                      href={icsFor(p, m.label, end)}
                      download={`${p.slug}-return-deadline.ics`}
                      className="ms-3 inline-block py-1 text-sm font-semibold text-brand-700 underline underline-offset-2"
                    >
                      Add to calendar
                    </a>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-brand-800">
        A guide only: the store's receipt or order page shows the official last day. Calendar files are made in your browser and include a reminder 3 days before.
      </p>
    </div>
  );
}
