import * as React from "react";
import { Globe } from "lucide-react";
import { Link } from "../ui/Link";
import { Button } from "../ui/button";

interface Counterpart {
  slug: string;
  brand: string;
}

interface InternationalCounterpartsCalloutProps {
  currentBrand: string;
  currentSlug: string;
  counterparts: Counterpart[];
}

export function InternationalCounterpartsCallout({
  currentBrand,
  currentSlug,
  counterparts,
}: InternationalCounterpartsCalloutProps) {
  if (counterparts.length === 0) return null;

  return (
    <div className="mb-8 p-4 bg-teal-light/20 border border-teal-brand/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm shadow-2xs">
      <div className="flex items-start sm:items-center gap-3">
        <Globe className="h-5 w-5 text-teal-brand shrink-0" />
        <div>
          <p className="text-ink-600 font-semibold">
            Shopping internationally? Compare country-specific policies:
          </p>
          <p className="text-xs text-ink-400 mt-0.5">
            Return windows, receipt rules, and requirements differ by territory for{" "}
            {currentBrand.replace(" Canada", "").replace(" UK", "").replace(" Australia", "")}.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {counterparts.map((cp) => (
          <Link key={cp.slug} href={`/compare/${currentSlug}-vs-${cp.slug}`}>
            <Button
              variant="outline"
              className="text-xs font-bold py-1.5 px-3 bg-white hover:bg-teal-light/10 border-ink-100 hover:border-teal-brand text-ink cursor-pointer"
            >
              {currentBrand} vs {cp.brand}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
