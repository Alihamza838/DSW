/**
 * DeadlineCalculator.tsx - "When is my last day to return this?" Pick the purchase (or delivery)
 * date and every milestone of the store's timeline turns into a calendar date. Runs only in the
 * browser after the visitor picks a date, so the prerendered HTML never depends on "today".
 */
import { useId, useState } from "react";
import type { VerifiedPolicy } from "../data/policies";

export default function DeadlineCalculator({ p }: { p: VerifiedPolicy }) {
  const id = useId();
  const [date, setDate] = useState("");
  const milestones = p.timeline.filter((t) => t.day > 0);
  if (!milestones.length) return null;

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  const start = date ? new Date(`${date}T12:00:00Z`) : null;
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 12);

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
      <label htmlFor={id} className="block font-semibold text-brand-900">
        Purchase or delivery date
      </label>
      <p className="text-sm text-brand-800">Use the date the window starts from (see the facts above).</p>
      <input
        id={id}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mt-3 h-12 w-full max-w-xs rounded-xl border border-brand-200 bg-white px-3 text-ink"
      />
      {start && (
        <ul className="mt-4 space-y-2" aria-live="polite">
          {milestones.map((m) => {
            const end = new Date(start.getTime() + m.day * 86400000);
            const left = Math.round((end.getTime() - todayUtc) / 86400000);
            return (
              <li key={m.label} className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-white px-4 py-3">
                <span className="font-medium text-ink">{m.label}</span>
                <span className="text-right">
                  <span className="block font-semibold text-ink">{fmt(end)}</span>
                  <span className={`text-sm font-semibold ${left < 0 ? "text-rose-700" : left <= 7 ? "text-amber-700" : "text-brand-700"}`}>
                    {left < 0 ? `${-left} days ago` : left === 0 ? "Today is the last day" : `${left} days left`}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-brand-800">A guide only: the store's receipt or order page shows the official last day.</p>
    </div>
  );
}
