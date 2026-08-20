import * as React from "react";
import { Check, ShieldCheck, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "../ui/Link";
import { StoreImage } from "../ui/StoreImage";
import { calculatePolicyGrade } from "../../lib/utils";
import type { PolicyBadge } from "../../types";
import { storesData } from "../../data/stores";

interface ComparisonCardProps {
  brand: string;
  slug: string;
  lastVerified: string;
  returnWindow: string;
  badges: PolicyBadge[];
  borderClass: string;
  bgClass: string;
  textClass: string;
  index?: number;
}

export function ComparisonCard({
  brand,
  slug,
  lastVerified,
  returnWindow,
  badges,
  borderClass,
  bgClass,
  textClass,
  index = 0,
}: ComparisonCardProps) {
  const storeObj = storesData.find(s => s.slug === slug);
  const grade = storeObj ? calculatePolicyGrade(storeObj.quickAnswer) : { grade: "A", label: "Highly Consumer Friendly", colorClass: "border-red-600 text-red-600", bgClass: "bg-red-50" };
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="h-full"
    >
      <Card className={`border-t-4 ${borderClass} shadow-md hover:shadow-lg transition-all rounded-2xl overflow-hidden bg-white h-full`}>
      <CardContent className="p-6 space-y-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3">
            <StoreImage
              storeSlug={slug}
              alt={`${brand} return policy audit logo`}
              src={storeObj?.logo}
              className="h-12 w-12 rounded-2xl border border-ink-100 object-contain p-1.5 bg-slate-50 shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold text-ink">{brand}</h3>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${grade.colorClass} ${grade.bgClass}`}>
                  Grade {grade.grade}
                </span>
              </div>
              <p className="text-[11px] font-mono text-ink-400 mt-1 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-red-600" />
                Verified: {new Date(lastVerified).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </p>
            </div>
          </div>
          <Link href={`/stores/${slug}`}>
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1 rounded-xl hover:bg-red-50 border-ink-200">
              <span>Full Audit</span>
              <ArrowRight className="h-3 w-3 text-red-600" />
            </Button>
          </Link>
        </div>

        <div className={`rounded-xl ${bgClass} p-4 border border-red-600/20 font-mono text-xs ${textClass} space-y-1`}>
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[10px]">Standard Return Window:</span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-white/80 px-2 py-0.5 rounded border border-red-200">
              <ShieldCheck className="h-3 w-3" /> 2026 Terms
            </span>
          </div>
          <p className="text-base font-bold text-ink">{returnWindow}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-400 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-red-600" /> Verified Policy Highlights
          </h4>
          <ul className="space-y-2 text-sm text-ink-600">
            {badges.map((badge) => (
              <li key={badge.label} className="flex gap-2.5 items-start text-xs bg-slate-50/80 p-2 rounded-xl border border-slate-100">
                <Check className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink">{badge.label}</span>
                  {badge.note && <span className="text-ink-500 block text-[11px] font-normal">{badge.note}</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
