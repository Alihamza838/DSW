import * as React from "react";
import { ShieldCheck, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Link } from "./Link";
import { StoreImage } from "./StoreImage";

export interface PerkItem {
  id: string;
  store: string;
  storeSlug: string;
  title: string;
  perkSummary: string;
  returnWindow: string;
  category: string;
  officialUrl: string;
  guideSlug?: string;
  badge?: string;
  perkImage?: string;
  keyBenefits: string[];
}

export function DealCard({ deal, index = 0 }: { deal: PerkItem; index?: number }) {
  const imageSrc = deal.perkImage || `/images/perks/${deal.id}.png`;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -35 : 35, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Card className="hover:shadow-receipt transition-all duration-300 border border-slate-200/90 hover:border-teal-brand flex flex-col justify-between h-full bg-white overflow-hidden group rounded-2xl">
      <div>
        {/* Banner Image */}
        <div className="relative h-36 w-full overflow-hidden bg-paper-muted border-b border-dashed border-ink-200">
          <StoreImage
            src={imageSrc}
            alt={`${deal.store} ${deal.title}`}
            storeSlug={deal.storeSlug}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
          
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="text-[9px] font-mono uppercase bg-emerald-950 text-emerald-200 border border-emerald-700/60 px-2 py-0.5 rounded font-extrabold shadow-2xs tracking-wider">
              {deal.badge || "Verified Perk"}
            </span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="font-serif text-base font-extrabold tracking-tight text-white drop-shadow-sm">
              {deal.store}
            </span>
            <span className="text-[10px] font-mono bg-black/60 backdrop-blur px-2 py-0.5 rounded text-white border border-white/20">
              {deal.returnWindow}
            </span>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col justify-between space-y-3 font-sans">
          <div>
            <h3 className="font-serif font-extrabold text-ink text-base line-clamp-2 group-hover:text-teal-brand transition-colors">
              {deal.title}
            </h3>
            
            <p className="text-xs text-ink-600 mt-1.5 leading-relaxed font-sans">
              {deal.perkSummary}
            </p>

            {/* Key benefits list */}
            <ul className="mt-3 space-y-1.5 border-t border-dashed border-ink-100 pt-2.5">
              {deal.keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-[11px] text-ink-800 font-sans font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-brand shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0 space-y-2 border-t border-ink-100 mt-2">
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/stores/${deal.storeSlug}`} className="w-full">
            <Button variant="teal" size="sm" className="w-full flex items-center justify-center gap-1 font-extrabold text-[11px] py-2 shadow-2xs">
              <span>View Policy</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>

          {deal.guideSlug ? (
            <Link href={`/blog/${deal.guideSlug}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 font-bold text-[11px] py-2">
                <FileText className="h-3 w-3 text-teal-brand" />
                <span>Read Audit</span>
              </Button>
            </Link>
          ) : (
            <a href={deal.officialUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 font-bold text-[11px] py-2 text-ink-700">
                <ShieldCheck className="h-3 w-3 text-teal-brand" />
                <span>Official Terms</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </Card>
    </motion.div>
  );
}
