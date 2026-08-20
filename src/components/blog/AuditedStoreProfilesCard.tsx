import React from "react";
import { Building2, ChevronRight } from "lucide-react";
import { Link } from "../ui/Link";
import { StoreImage } from "../ui/StoreImage";
import type { StoreFrontmatter } from "../../types";

interface AuditedStoreProfilesCardProps {
  stores: StoreFrontmatter[];
  maxDisplay?: number;
}

export function AuditedStoreProfilesCard({ stores, maxDisplay = 4 }: AuditedStoreProfilesCardProps) {
  if (!stores || stores.length === 0) return null;

  const displayedStores = stores.slice(0, maxDisplay);

  return (
    <div id="audited-retailers" className="p-5 rounded-3xl bg-white border border-ink-100 shadow-2xs space-y-4 font-sans scroll-mt-24">
      <div className="flex items-center justify-between border-b border-ink-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-800">
          <Building2 className="h-4 w-4 text-teal-brand" />
          <span>Audited Store Profiles</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-teal-dark bg-teal-brand/10 px-2 py-0.5 rounded-full">
          2026 Verified
        </span>
      </div>

      <div className="space-y-2.5">
        {displayedStores.map((st) => {
          const returnWindow = st.quickAnswer?.returnWindow || "Standard Policy";
          const receiptReq = st.quickAnswer?.receiptRequired;

          return (
            <Link
              key={st.slug}
              href={`/stores/${st.slug}`}
              className="group flex items-center justify-between gap-3 p-3 rounded-2xl border border-ink-100 hover:border-teal-brand/40 bg-paper hover:bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Store Logo or Clean Initial Monogram */}
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center font-bold font-mono text-xs text-ink-800 shrink-0 overflow-hidden shadow-2xs group-hover:border-teal-brand/40 transition-colors">
                  <StoreImage storeSlug={st.slug} alt={`${st.brand} Logo`} className="w-full h-full object-contain p-1" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-ink group-hover:text-teal-brand transition-colors truncate">
                      {st.brand}
                    </span>
                  </div>
                  <div className="text-[11px] text-ink-500 font-mono truncate max-w-[170px]">
                    <span className="font-semibold text-ink-700">{returnWindow}</span>
                    <span className="mx-1">•</span>
                    <span>{receiptReq ? "Receipt Req." : "Lookup Allowed"}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-ink-400 group-hover:text-teal-brand group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          );
        })}
      </div>

      <div className="pt-1 border-t border-ink-100">
        <Link
          href="/stores"
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-brand hover:text-teal-dark transition-colors"
        >
          <span>See all audited stores →</span>
        </Link>
      </div>
    </div>
  );
}
