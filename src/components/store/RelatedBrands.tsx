import { Card, CardContent } from "../ui/card";
import { Link } from "../ui/Link";
import { storesData } from "../../data/stores";

export function RelatedBrands({ slugs, currentSlug }: { slugs?: string[]; currentSlug?: string }) {
  if (!slugs || slugs.length === 0) return null;
  
  const related = slugs
    .map((slug) => storesData.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (related.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-ink">Related Brand Returns</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
        {related.map((store) => (
          <Link key={store.slug} href={`/stores/${store.slug}`} className="block group">
            <Card className="transition-all duration-200 group-hover:shadow-receipt group-hover:border-teal-brand group-hover:bg-teal-light/10 h-full border border-ink-100 bg-white">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <p className="font-bold text-ink group-hover:text-teal-brand transition-colors text-xs sm:text-sm">{store.brand}</p>
                <p className="text-[11px] text-ink-400 leading-snug">{store.quickAnswer.returnWindow}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {currentSlug && (
        <div className="pt-3 border-t border-ink-100 bg-teal-light/5 rounded p-3 mt-4 space-y-2 border border-teal-brand/10">
          <h4 className="text-[10px] font-mono font-bold uppercase text-teal-dark tracking-wider">🆚 Side-by-Side Audit Lookup</h4>
          <div className="flex flex-col gap-1.5">
            {related.slice(0, 3).map((otherStore) => (
              <Link
                key={otherStore.slug}
                href={`/compare/${currentSlug}-vs-${otherStore.slug}`}
                className="text-xs text-teal-brand font-semibold hover:text-teal-dark hover:underline flex items-center justify-between"
              >
                <span>Compare {otherStore.brand} Policy</span>
                <span className="text-[10px] text-ink-400 font-mono">Vs. {otherStore.brand} →</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
