import React from "react";
import { Link } from "../ui/Link";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ShoppingBag } from "lucide-react";
import type { ArticleGuide, StoreFrontmatter } from "../../types";

interface SidebarWidgetProps {
  relatedStores: StoreFrontmatter[];
  relatedGuides: ArticleGuide[];
}

export function SidebarWidget({ relatedStores, relatedGuides }: SidebarWidgetProps) {
  return (
    <aside className="space-y-8 mt-12 font-sans">
      {/* Related Stores Audited Section */}
      {relatedStores.length > 0 && (
        <div className="bg-[#FAF8F3]/80 border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[#14213D] mb-3 flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4 text-teal-brand shrink-0" />
            <span>Related Retailers Audited</span>
          </h3>
          <p className="text-xs text-ink-500 mb-4 leading-relaxed font-medium">
            Direct access to official return guidelines, step-by-step handbooks, and contact sheets for retailers reviewed in this guide:
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedStores.map((st) => (
              <Link key={st.slug} href={`/stores/${st.slug}`}>
                <Badge
                  variant="outline"
                  className="bg-white text-ink hover:text-teal-brand hover:border-teal-brand cursor-pointer text-xs py-1.5 px-3 rounded-xl border-slate-200 font-bold transition-all shadow-2xs"
                >
                  {st.brand} {st.country ? `(${st.country})` : "(US)"}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Policy Guides Cards */}
      {relatedGuides.length > 0 && (
        <div className="border-t border-slate-200 pt-8">
          <h2 className="mb-5 font-sans text-xl font-bold text-ink">Recommended Policy Guides</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedGuides.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group block h-full">
                <Card className="h-full transition-all duration-300 border-slate-200/90 group-hover:shadow-receipt group-hover:border-teal-brand group-hover:bg-teal-light/5 rounded-2xl">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                    <p className="text-sm font-bold text-ink group-hover:text-teal-brand transition-colors line-clamp-3">
                      {r.title}
                    </p>
                    <span className="text-[10px] font-mono text-ink-400 uppercase tracking-wider font-extrabold">{r.readingTime} read</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
