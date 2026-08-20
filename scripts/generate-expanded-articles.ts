import fs from "fs";
import path from "path";
import { guidesData } from "../src/data/guides";

/**
 * Utility script to audit article lengths and generate 500+ word structured markdown content
 * with H2/H3 subheadings focused on high-intent consumer search queries.
 */

function countWords(str: string): number {
  return str.trim().split(/\s+/).length;
}

function auditArticles() {
  console.log("🔍 Auditing all 38 DSWReturnRefund guide articles...\n");
  let totalShort = 0;

  guidesData.forEach((guide) => {
    const fullText = `${guide.title} ${guide.summary} ${guide.proseContent} ${(guide.faqs || []).map(f => f.question + " " + f.answer).join(" ")}`;
    const wordCount = countWords(fullText);

    if (wordCount < 500) {
      totalShort++;
      console.log(`⚠️ Short Guide [${guide.slug}]: ~${wordCount} words (Target: 500+)`);
    } else {
      console.log(`✅ Robust Guide [${guide.slug}]: ~${wordCount} words`);
    }
  });

  console.log(`\n📊 Audit Summary: ${guidesData.length - totalShort}/${guidesData.length} articles meet 500+ word SEO threshold.`);
}

auditArticles();
