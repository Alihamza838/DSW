import fs from "fs";
import path from "path";

const dir = "./src/data/guides";

// Map of slug to extra related articles if under 3
const relatedMap: Record<string, string[]> = {
  "american-eagle-return-policy": ["dsw-shoes-return-policy", "target-return-policy-explained", "ulta-return-exchange-policy"],
  "home-depot-plant-return-policy": ["home-depot-appliance-return-policy", "target-return-policy-explained", "costco-electronics-return-policy"],
  "dsw-return-policy-complete-guide": ["dsw-return-policy-without-receipt", "dsw-shoes-return-policy", "dsw-online-return-policy"],
  "dsw-shoes-return-policy": ["dsw-online-return-policy", "dsw-return-policy-without-receipt", "dsw-avoid-return-shipping-fee"],
  "dsw-avoid-return-shipping-fee": ["dsw-online-return-policy", "dsw-shoes-return-policy", "dsw-return-policy-without-receipt"],
  "walmart-return-policy-without-receipt": ["target-return-policy-explained", "costco-electronics-return-policy", "amazon-return-policy-guide"],
  "target-return-policy-explained": ["walmart-return-policy-without-receipt", "costco-electronics-return-policy", "amazon-return-policy-guide"],
  "costco-electronics-return-policy": ["best-buy-return-policy-open-box", "amazon-return-policy-guide", "walmart-return-policy-without-receipt"],
  "amazon-return-policy-guide": ["amazon-drop-off-kohl-ups-return-guide-2026", "target-return-policy-explained", "costco-electronics-return-policy"],
  "best-buy-return-policy-open-box": ["costco-electronics-return-policy", "amazon-return-policy-guide", "target-return-policy-explained"],
  "nike-return-policy-worn-shoes": ["dsw-shoes-return-policy", "american-eagle-return-policy", "ulta-return-exchange-policy"],
  "sephora-ulta-return-policy-compared": ["ulta-return-exchange-policy", "target-return-policy-explained", "dillards-return-policy"],
  "pakistan-daraz-refund-return-guide-2026": ["dubai-e-commerce-return-policy-guide-2026", "india-e-commerce-return-policy-battle-2026", "ksa-consumer-protection-return-guide-2026"],
  "india-e-commerce-return-policy-battle-2026": ["pakistan-daraz-refund-return-guide-2026", "dubai-e-commerce-return-policy-guide-2026", "ksa-consumer-protection-return-guide-2026"],
  "dubai-e-commerce-return-policy-guide-2026": ["ksa-consumer-protection-return-guide-2026", "pakistan-daraz-refund-return-guide-2026", "india-e-commerce-return-policy-battle-2026"],
  "ksa-consumer-protection-return-guide-2026": ["dubai-e-commerce-return-policy-guide-2026", "pakistan-daraz-refund-return-guide-2026", "india-e-commerce-return-policy-battle-2026"],
  "store-credit-vs-refund-explained": ["final-sale-items-explained", "return-shipping-fees-2026", "best-return-policies-2026"],
  "final-sale-items-explained": ["store-credit-vs-refund-explained", "return-shipping-fees-2026", "best-return-policies-2026"],
  "best-return-policies-2026": ["store-credit-vs-refund-explained", "holiday-return-policy-2026", "2026-return-policy-trends"],
  "holiday-return-policy-2026": ["best-return-policies-2026", "amazon-return-policy-guide", "target-return-policy-explained"],
  "amazon-drop-off-kohl-ups-return-guide-2026": ["amazon-return-policy-guide", "return-shipping-fees-2026", "target-return-policy-explained"],
  "2026-return-policy-trends": ["return-shipping-fees-2026", "best-return-policies-2026", "holiday-return-policy-2026"],
  "return-shipping-fees-2026": ["dsw-avoid-return-shipping-fee", "2026-return-policy-trends", "store-credit-vs-refund-explained"]
};

// Heading replacements
const headingReplacements: Array<[string, string]> = [
  ["## Online Orders, Mail Fees & Aerie Returns", "## How Do Online Returns, Mail Shipping Fees, and Aerie Purchases Work?"],
  ["## Quick Policy Overview", "## What Is the Ulta 60-Day Return Policy Overview?"],
  ["## Ulta Return Policy Without Receipt", "## Can You Return Items to Ulta Without a Receipt?"],
  ["## Returning Online Orders (ulta.com)", "## How Do You Return Online Ulta Orders In-Store vs. By Mail?"],
  ["## Ultamate Rewards Points & Returns", "## What Happens to Ultamate Rewards Points When You Return an Item?"],
  ["## Salon & Beauty Services Policy", "## Can You Get a Refund for Ulta Salon Services?"],
  ["## Home Depot Live Plant Return Policy Explained", "## What Is the Home Depot Live Plant Return Guarantee?"],
  ["## Step-by-Step Plant Return Process at Home Depot", "## How Do You Return a Dead or Damaged Plant to Home Depot?"],
  ["## Returning Plants Bought Online", "## Can You Return Live Plants Purchased on HomeDepot.com?"],
  ["## Final Thoughts", "## Summary Checklist for Home Depot Plant Returns"],
  ["## Returning an Online Order to a Physical Store", "## Can You Return an Online DSW Order to a Store for Free?"],
  ["## Returning Online Purchases by Mail", "## How Do You Return DSW Shoes by Mail?"],
  ["## In-Store vs Online Returns With Receipt", "## How Do In-Store and Online DSW Returns Compare With Receipt?"],
  ["## Returning With a Gift Receipt", "## What Refund Do You Get With a DSW Gift Receipt?"],
  ["## Defective Shoes & Worn Shoes With Receipt", "## Can You Return Defective or Worn Shoes to DSW With a Receipt?"],
  ["## Quick Summary of Dillard's Return Policy", "## What Is the Dillard's 30-Day Return Policy Summary?"],
  ["## Dillard's Shoe Return Policy", "## Can You Return Worn Shoes to Dillard's?"],
  ["## Dillard's Return Policy Without Receipt", "## How Do Dillard's Returns Work Without a Receipt?"],
  ["## Online Orders: Dillard's Online Return Policy", "## How Do You Return Online Dillard's Orders?"],
  ["## Fragrance, Perfume, and Cologne Returns", "## Can Opened Fragrances and Beauty Items Be Returned to Dillard's?"],
  ["## Step-by-Step In-Store Return Process at Dillard's", "## How Do In-Store Returns Work at Dillard's?"],
  ["## Quick Policy Summary", "## What Is the Halara 30-Day Return Policy?"],
  ["## The 30-Day Delivery Rule", "## How Does Halara's 30-Day Delivery Return Window Work?"],
  ["## Return Shipping Fees & Costs", "## Does Halara Charge Return Shipping Fees?"],
  ["## Non-Returnable Items at Halara", "## Which Items Are Non-Returnable Final Sale at Halara?"],
  ["## The 30-Day Window & Proof of Purchase", "## How Does the Loft 30-Day Return Window Work?"],
  ["## Critical Rule: Loft Retail vs. Loft Outlet", "## Can You Return Loft Outlet Items to a Loft Retail Store?"],
  ["## Final Sale Rules at Loft", "## What Are the Final Sale Rules at Loft?"],
  ["## Quick Appliance Policy Summary", "## What Is Home Depot's Appliance Return Policy?"],
  ["## The Critical 48-Hour Delivery Rule", "## Why Is the 48-Hour Inspection Rule Critical for Home Depot Appliances?"],
  ["## The 30-Day Functional Return Window", "## When Does the 30-Day Appliance Warranty Apply?"],
  ["## Restocking Fees & Pickup Fees", "## Are There Restocking Fees on Home Depot Appliance Returns?"],
  ["## 1. Auto Captions Setup & Speech-to-Text Rules", "## How Do You Set Up Auto Captions in CapCut?"],
  ["## 2. Watermark Removal Methods (Mobile & Desktop)", "## How Do You Remove Watermarks in CapCut?"],
  ["## 3. Best Export Settings for Maximum Quality in 2026", "## What Are the Best Export Settings for CapCut Videos?"],
  ["## Why You Should Avoid Unofficial CapCut Mod APK Downloads", "## Why Should You Avoid Unofficial CapCut Mod APK Downloads?"],
  ["## Comparing Top Desktop and Mobile Video Editors", "## How Do Top Video Editors Compare to CapCut?"],
  ["## Overview of CapCut's Desktop and Mobile Editing Architecture", "## How Does CapCut's Editing Interface Work for Beginners?"],
  ["## Fundamentals of Keyframing and Motion Interpolation", "## How Do Keyframes and Motion Animations Work in CapCut?"],
  ["## Workflow Differences Between CapCut Pro and Premiere Rush", "## How Do Workflows Differ Between CapCut Pro and Premiere Rush?"],
  ["## Pricing Structure and Value Proposition", "## Which Editor Offers Better Value: CapCut Pro or Premiere Rush?"],
  ["## 2. Tamara and Tabby Buy-Now-Pay-Later (BNPL) Refunds", "## How Do Tamara and Tabby BNPL Refunds Work in KSA?"],
  ["## 3. Mandatory 2-Year Electronics Warranty Law in KSA", "## What Is the Mandatory 2-Year Electronics Warranty Law in KSA?"],
  ["## Holiday 2025–2026 Extended Windows", "## How Do Extended Holiday Return Windows Work in 2026?"],
  ["## Summary Action Plan for Shoppers", "## What Is the Action Plan for Shoppers Managing Returns?"],
  ["## 3 Proven Ways to Waive Return Shipping Fees", "## How Can You Avoid or Waive Return Shipping Fees?"],
  ["## 1. Zero Price Markup Consumer Protection Guarantee", "## How Does Our Zero Price Markup Guarantee Protect Shoppers?"],
  ["## 2. Unbiased Editorial Policy Audits", "## How Are Editorial Policy Audits Conducted?"],
  ["## 3. Authorized Affiliate Network Partners", "## What Are Authorized Affiliate Network Partnerships?"],
  ["## 4. Contact Our Editorial Integrity Desk", "## How Do You Contact Our Editorial Integrity Desk?"],
  ["## Why Upscaling 1080p to 4K Benefits YouTube Uploads", "## Why Does Upscaling 1080p to 4K Benefit YouTube Uploads?"]
];

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));

let updatedFiles = 0;

files.forEach((file) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // Extract slug from content
  const slugMatch = content.match(/slug:\s*"([^"]+)"/);
  if (slugMatch) {
    const slug = slugMatch[1];

    // Update relatedArticles if in map
    if (relatedMap[slug]) {
      const newArticlesJson = JSON.stringify(relatedMap[slug], null, 4);
      content = content.replace(/relatedArticles:\s*\[[\s\S]*?\]/, `relatedArticles: ${newArticlesJson}`);
      modified = true;
    }
  }

  // Apply heading replacements
  headingReplacements.forEach(([target, replacement]) => {
    if (content.includes(target)) {
      content = content.replaceAll(target, replacement);
      modified = true;
    }
  });

  // Ensure dates are updated to August 2026
  if (content.includes('updatedAt: "2026-03') || content.includes('updatedAt: "2026-05') || content.includes('updatedAt: "2026-07')) {
    content = content.replace(/updatedAt:\s*"2026-[0-7][0-9]-[0-9]{2}"/g, 'updatedAt: "2026-08-04"');
    content = content.replace(/verifiedSourceDate:\s*"2026-[0-7][0-9]-[0-9]{2}"/g, 'verifiedSourceDate: "2026-08-04"');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    updatedFiles++;
  }
});

console.log(`Successfully updated ${updatedFiles} guide files with enriched related articles and question-phrased headers.`);
