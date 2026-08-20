import fs from "fs";
import path from "path";
import { guidesData } from "../src/data/guides";

export function generateMarkdownMirrors() {
  console.log("📝 Generating Markdown mirrors for AI crawlers & LLMs...");

  const publicBlogDir = path.join(process.cwd(), "public", "blog");
  const distBlogDir = path.join(process.cwd(), "dist", "blog");

  if (!fs.existsSync(publicBlogDir)) {
    fs.mkdirSync(publicBlogDir, { recursive: true });
  }

  let count = 0;

  guidesData.forEach((guide) => {
    const quickAnswer = guide.quickAnswer || guide.summary || guide.description;
    const author = guide.author || "DSWReturnRefund Editorial Team";
    const sourceUrl = guide.verifiedSourceUrl || "https://dswreturnrefund.com";
    const sourceDate = guide.verifiedSourceDate || guide.updatedAt;

    let mdContent = `# ${guide.title}\n\n`;
    mdContent += `> **Category:** ${guide.category} | **Published:** ${guide.publishedAt} | **Updated:** ${guide.updatedAt}\n`;
    mdContent += `> **Author:** ${author}\n`;
    mdContent += `> **Verified Source:** [Official Retailer Policy](${sourceUrl}) (Verified on ${sourceDate})\n\n`;

    mdContent += `## Quick Answer\n\n${quickAnswer}\n\n`;

    if (guide.factRows && guide.factRows.length > 0) {
      mdContent += `## Key Policy Facts\n\n`;
      mdContent += `| Policy Metric | Details | Status |\n`;
      mdContent += `|---|---|---|\n`;
      guide.factRows.forEach((row) => {
        mdContent += `| **${row.label}** | ${row.value} | ${row.status || "Policy Detail"} |\n`;
      });
      mdContent += `\n`;
    }

    mdContent += `## Overview & Analysis\n\n${guide.proseContent || guide.summary || guide.description}\n\n`;

    if (guide.steps && guide.steps.length > 0) {
      mdContent += `## Step-by-Step Return Instructions\n\n`;
      guide.steps.forEach((step, idx) => {
        mdContent += `${idx + 1}. **${step.title}**: ${step.text}\n`;
      });
      mdContent += `\n`;
    }

    if (guide.faqs && guide.faqs.length > 0) {
      mdContent += `## Frequently Asked Questions\n\n`;
      guide.faqs.forEach((faq) => {
        mdContent += `### ${faq.question}\n${faq.answer}\n\n`;
      });
    }

    if (guide.sources && guide.sources.length > 0) {
      mdContent += `## Cited References & Legal Frameworks\n\n`;
      guide.sources.forEach((src) => {
        mdContent += `- [${src.title}](${src.url}) - Published by ${src.publisher || "Official Source"}\n`;
      });
      mdContent += `\n`;
    }

    mdContent += `---\n`;
    mdContent += `*Canonical URL: https://dswreturnrefund.com/blog/${guide.slug}*\n`;
    mdContent += `*Published by DSWReturnRefund Independent Consumer Rights Advisory*\n`;

    // Write to public/blog/[slug].md
    const filePath = path.join(publicBlogDir, `${guide.slug}.md`);
    fs.writeFileSync(filePath, mdContent, "utf8");

    // Also write to dist/blog/[slug].md if dist exists
    if (fs.existsSync(distBlogDir)) {
      fs.writeFileSync(path.join(distBlogDir, `${guide.slug}.md`), mdContent, "utf8");
    }

    count++;
  });

  console.log(`✅ Generated ${count} Markdown mirror files in public/blog/*.md`);
}

generateMarkdownMirrors();
