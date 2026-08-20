import { Link } from "../ui/Link";
import type { StoreFrontmatter } from "../../types";
import { StaggerContainer, StaggerItem } from "../layout/PageTransition";
import { StoreCard } from "../store/StoreCard";

export function FeaturedStores({ stores }: { stores: StoreFrontmatter[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">Popular Return Policies</h2>
          <p className="text-sm text-ink-600 mt-1 font-normal">Direct access to verified 2026 consumer audit terms and refund windows.</p>
        </div>
        <Link href="/stores" className="text-xs font-semibold text-teal-brand hover:text-teal-dark border border-teal-brand/30 hover:border-teal-brand bg-white px-4 py-2 rounded-xl transition-all shrink-0 inline-flex items-center gap-1.5 shadow-2xs">
          <span>View All Stores</span>
          <span>→</span>
        </Link>
      </div>
      
      <StaggerContainer className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <StaggerItem key={store.slug} className="h-full">
            <StoreCard store={store} className="h-full" />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
