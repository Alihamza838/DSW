/**
 * policies.ts - the verified return policy for every store on the site.
 *
 * Every fact here was checked against the retailer's own website on the `checked` date (see
 * research/verified-2026-11.md for the notes). Anything we could not confirm on an official page
 * is left out or stated as "not confirmed", never guessed. Store pages, comparisons, the images
 * and the structured data are all generated from this file, so fix a fact here and it is fixed
 * everywhere.
 *
 * When a retailer changes its policy: update the record, set `checked` to the new date and run
 * `npm run images` to redraw its timeline graphic.
 */
export interface PolicyFact {
  label: string;
  value: string;
}
export interface PolicyFaq {
  q: string;
  a: string;
}
export interface TimelinePoint {
  day: number;
  label: string;
}
export interface VerifiedPolicy {
  slug: string;
  name: string;
  /** Market the rules apply to */
  country: string;
  region: "us" | "ca" | "uk" | "eu" | "au" | "me" | "south-asia" | "global";
  category: string;
  /** Short answer shown first, e.g. "60 days with a receipt" */
  headline: string;
  /** Main window in days (for sorting and the timeline); null when there is no fixed window */
  windowDays: number | null;
  /** Milestones drawn on the timeline image */
  timeline: TimelinePoint[];
  summary: string;
  facts: PolicyFact[];
  exceptions: string[];
  steps: string[];
  tips: string[];
  faqs: PolicyFaq[];
  /** Temporary holiday rules, shown in a highlighted box */
  holiday?: string;
  /** What the official pages did not confirm */
  unconfirmed?: string;
  source: string;
  checked: string;
}

import { EUROPE_POLICIES } from "./world/europe";
import { GULF_POLICIES } from "./world/gulf";
import { SOUTH_ASIA_POLICIES } from "./world/south-asia";
import { AMERICAS_OCEANIA_POLICIES } from "./world/americas-oceania";
import { MORE_POLICIES } from "./world/more";

const CHECKED = "2026-11-13";

const BASE_POLICIES: VerifiedPolicy[] = [
  // ─── United States ──────────────────────────────────────────────────────────
  {
    slug: "dsw",
    name: "DSW",
    country: "United States",
    region: "us",
    category: "Shoes",
    headline: "60 days for a full refund with a receipt",
    windowDays: 60,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 60, label: "Full refund window ends" },
    ],
    summary:
      "DSW (Designer Shoe Warehouse) gives a full refund on most shoes and accessories returned within 60 days of purchase with the receipt or packing slip. Items must be unworn and undamaged, and anything marked FINAL SALE cannot be returned. You can return in any DSW store or start a return at dsw.com.",
    facts: [
      { label: "Return window", value: "60 days from the purchase date" },
      { label: "Receipt", value: "Receipt or packing slip needed for a full refund" },
      { label: "Refund method", value: "Original form of payment" },
      { label: "Condition", value: "Unworn and undamaged" },
      { label: "Where to return", value: "Any DSW store, or online at dsw.com" },
      { label: "Final sale", value: "Items marked FINAL SALE are not returnable" },
    ],
    exceptions: [
      "Items marked FINAL SALE cannot be returned.",
      "Worn or damaged shoes are not accepted for a full refund.",
      "Without a receipt or packing slip, a full refund is not guaranteed; ask the store what they can offer.",
    ],
    steps: [
      "Check the purchase date: you have 60 days.",
      "Keep the shoes unworn, ideally in the original box.",
      "Find the receipt (in-store) or the packing slip / order email (online).",
      "Take everything to any DSW store, or start the return in your dsw.com account.",
      "The refund goes back to the card or payment method you used.",
    ],
    tips: [
      "Try new shoes on carpet at home first, so the soles stay clean if they don't fit.",
      "Keep the box: an unworn pair in its original box is the easiest return.",
      "Check the tag before buying clearance: FINAL SALE items cannot come back.",
    ],
    faqs: [
      {
        q: "How many days do I have to return shoes to DSW?",
        a: "60 days from the purchase date for a full refund, as long as you have the receipt or packing slip and the shoes are unworn and undamaged.",
      },
      {
        q: "Can I return worn shoes to DSW?",
        a: "DSW's policy asks for unworn, undamaged items for a full refund. If a pair is faulty, contact DSW customer service, since defects are handled differently from change-of-mind returns.",
      },
      {
        q: "Can I return a dsw.com order in a store?",
        a: "Yes. DSW accepts returns in store or at dsw.com. Bring the packing slip or order confirmation.",
      },
      {
        q: "Can I return FINAL SALE shoes to DSW?",
        a: "No. Items marked FINAL SALE are excluded from returns.",
      },
    ],
    unconfirmed:
      "DSW's public pages we checked do not describe VIP-only return windows or a mail return fee, so this page does not list any. Check your order details or call DSW at 1-866-379-7463 for those.",
    source: "https://www.dsw.com/customer-service/general-questions",
    checked: CHECKED,
  },
  {
    slug: "target",
    name: "Target",
    country: "United States",
    region: "us",
    category: "Department store",
    headline: "90 days for most items, 1 year for Target Owned Brands",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Electronics & Target Plus end" },
      { day: 90, label: "Most items end" },
      { day: 365, label: "Target Owned Brands end" },
    ],
    summary:
      "Most new, unopened items bought from Target can be returned within 90 days for a refund or exchange. Target Owned Brands get a full year with a receipt, while electronics, entertainment and most Target Plus items have 30 days. Paying with a Target Circle Card adds 30 extra days.",
    facts: [
      { label: "Most items", value: "90 days (new, unopened)" },
      { label: "Target Owned Brands", value: "1 year with a receipt" },
      { label: "Electronics & entertainment", value: "30 days" },
      { label: "Target Plus (partner sellers)", value: "30 days for most unopened items" },
      { label: "Target Circle Card", value: "Extra 30 days on most purchases" },
      { label: "Where to return", value: "Any Target store, or by mail for online orders" },
    ],
    exceptions: [
      "The extra Target Circle Card days do not apply to Target Optical, final sale items, contract mobile phones or online SNAP purchases made with EBT.",
      "Electronics and entertainment items (including most Apple and Beats products) normally have 30 days.",
      "Target Plus items follow a separate 30-day partner policy.",
    ],
    steps: [
      "Find the receipt, the order in the Target app, or the card you paid with.",
      "Check which window applies: 30 days, 90 days or 1 year for Target Owned Brands.",
      "Bring the item to Guest Services at any Target store, or start a mail return from your online order.",
      "The refund goes back to the original payment method.",
    ],
    tips: [
      "Target Owned Brands include many of Target's own clothing, home and kids' labels; the tag or product page tells you if an item qualifies.",
      "Paying with a Target Circle Card gives you 30 extra days on most purchases.",
      "Keep electronics boxes for 30 days, since that is their shorter window.",
    ],
    faqs: [
      {
        q: "How long is Target's return policy?",
        a: "90 days for most new, unopened items. Target Owned Brands have one year with a receipt, and electronics, entertainment and Target Plus items have 30 days.",
      },
      {
        q: "Does a Target Circle Card extend returns?",
        a: "Yes. Paying with a Target Circle Card (formerly RedCard) adds 30 extra days to most return windows, with a few exclusions such as Target Optical and final sale items.",
      },
      {
        q: "How long do I have to return electronics to Target?",
        a: "Usually 30 days. Target extends electronics returns for holiday purchases; see the holiday note on this page.",
      },
      {
        q: "Can I return a Target Plus item in store?",
        a: "Target Plus items are sold by partner sellers and follow a separate 30-day policy. Start the return from your Target.com order to see the options.",
      },
    ],
    holiday:
      "Holiday 2026: Target extends the return window for electronics and entertainment (including Apple & Beats) and most Target Plus items bought November 1 to December 24, 2026. The exact end date is on Target's returns page.",
    source: "https://www.target.com/help/article/000061980",
    checked: CHECKED,
  },
  {
    slug: "walmart",
    name: "Walmart",
    country: "United States",
    region: "us",
    category: "Department store",
    headline: "90 days for most items, 30 for electronics, 14 for phones",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 14, label: "Wireless phones end" },
      { day: 30, label: "Most electronics end" },
      { day: 90, label: "Most items end" },
    ],
    summary:
      "Walmart accepts most items back within 90 days of purchase or delivery. Most consumer electronics have 30 days and wireless phones 14 days. Items sold and shipped by Marketplace sellers follow the seller's policy, usually 30 days.",
    facts: [
      { label: "Most items", value: "90 days from purchase or delivery" },
      { label: "Consumer electronics", value: "30 days for most" },
      { label: "Wireless phones", value: "14 days" },
      { label: "Marketplace sellers", value: "Usually 30 days (seller's policy)" },
      { label: "Where to return", value: "Any Walmart store, or by mail / pickup for online orders" },
    ],
    exceptions: [
      "Wireless phones, protection plans, major appliances, Dyson products, food and beverages and some seasonal or luxury goods are excluded from the holiday extension.",
      "Items sold and shipped by Marketplace sellers follow that seller's return policy.",
    ],
    steps: [
      "Open the order in the Walmart app or find the receipt.",
      "Check the window: 90 days, 30 for electronics, 14 for phones.",
      "Start the return in the app (store drop-off, mail or pickup) or bring the item to the customer service desk.",
      "Refunds go back to the original payment method.",
    ],
    tips: [
      "Starting the return in the Walmart app first usually makes the store visit faster.",
      "Marketplace items show the seller's return window on the order page.",
    ],
    faqs: [
      {
        q: "How long do you have to return something to Walmart?",
        a: "90 days for most items. Most consumer electronics have 30 days and wireless phones 14 days.",
      },
      {
        q: "Does Walmart have a holiday return extension?",
        a: "Yes. Most items bought October 1 to December 31, 2026 can be returned through January 31, 2027, with some exceptions such as wireless phones and major appliances.",
      },
      {
        q: "Can I return a Marketplace item to a Walmart store?",
        a: "Marketplace items follow the seller's policy. Start the return from your online order to see whether a store drop-off is available.",
      },
    ],
    holiday:
      "Holiday 2026: most items bought October 1 to December 31, 2026 can be returned through January 31, 2027. Exceptions include wireless phones, protection plans, major appliances, Dyson products, food and beverages.",
    source: "https://www.walmart.com/help/article/walmart-standard-return-policy/adc0dfb692954e67a4de206fb8d9e03a",
    checked: CHECKED,
  },
  {
    slug: "amazon",
    name: "Amazon",
    country: "United States",
    region: "us",
    category: "Online marketplace",
    headline: "30 days from delivery for most items",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 30, label: "Most items end" },
    ],
    summary:
      "Most items bought on Amazon.com can be returned for a refund or replacement within 30 days of delivery, as long as they are in original or unused condition. Amazon can take up to 30 days to receive and process a return; after that, the refund reaches you at a speed that depends on how you paid.",
    facts: [
      { label: "Return window", value: "30 days from delivery" },
      { label: "Condition", value: "Original or unused condition" },
      { label: "Refund to gift card balance", value: "About 2–3 hours after processing" },
      { label: "Refund to credit card", value: "3–5 business days after processing" },
      { label: "Refund to debit card / bank", value: "Up to 10 business days after processing" },
      { label: "How to start", value: "Your Orders → Return or replace items" },
    ],
    exceptions: [
      "Some items have different windows or are not returnable; the product page and the order page show the rule for each item.",
      "Items from third-party sellers may follow the seller's return policy.",
    ],
    steps: [
      "Go to Your Orders on Amazon and choose Return or replace items.",
      "Pick a reason and a drop-off option shown for your order.",
      "Drop the item off or ship it with the label Amazon provides.",
      "Track the refund in Your Orders; timing depends on your payment method.",
    ],
    tips: [
      "Choosing a refund to your Amazon gift card balance is the fastest way to get the money back.",
      "Check the drop-off options in Your Orders: some locations accept returns without a box or label.",
    ],
    faqs: [
      {
        q: "How many days do I have to return an Amazon order?",
        a: "30 days from delivery for most items, in original or unused condition. Check the order page for items with a different rule.",
      },
      {
        q: "How long does an Amazon refund take?",
        a: "Amazon can take up to 30 days to receive and process the return. After that: gift card balance about 2–3 hours, credit card 3–5 business days, debit card or bank up to 10 business days.",
      },
      {
        q: "Does Amazon extend returns for the holidays?",
        a: "Yes. Most items bought November 1 to December 31, 2026 can be returned through January 31, 2027. Apple-branded products bought in that period can be returned through January 15, 2027.",
      },
    ],
    holiday:
      "Holiday 2026: most items bought November 1 to December 31, 2026 can be returned through January 31, 2027 (Apple-branded products through January 15, 2027).",
    source: "https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },
  {
    slug: "costco",
    name: "Costco",
    country: "United States",
    region: "us",
    category: "Warehouse club",
    headline: "No fixed window for most items, 90 days for electronics",
    windowDays: null,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 90, label: "Electronics & appliances end" },
    ],
    summary:
      "Costco's satisfaction guarantee lets members return most products for a refund with no set time limit. TVs, computers, tablets, cameras, cell phones, major appliances and similar electronics must come back within 90 days. The membership fee itself can be refunded at any time.",
    facts: [
      { label: "Most items", value: "No fixed window (satisfaction guarantee)" },
      { label: "Electronics & major appliances", value: "90 days (from receipt for online orders)" },
      { label: "Membership fee", value: "Refundable at any time" },
      { label: "Where to return", value: "Any Costco warehouse; online orders also via Costco.com" },
    ],
    exceptions: [
      "90-day items: televisions, projectors, major appliances, computers, tablets, smart wearables, cameras, drones, camcorders, MP3 players and cell phones.",
      "Not refundable: cigarettes, alcohol (where prohibited by law), precious metals, Shop Cards, gift cards, tickets, airline and live event items, and custom-made products.",
      "Cell phone returns also depend on the carrier contract.",
    ],
    steps: [
      "Bring the item and your membership card to the returns counter at any Costco warehouse.",
      "For online orders, you can also start the return on Costco.com.",
      "Refunds go back to the original payment method.",
    ],
    tips: [
      "Keep electronics boxes and accessories for the 90 days.",
      "A receipt is not always needed: Costco can look up purchases made with your membership.",
    ],
    faqs: [
      {
        q: "Does Costco have a time limit on returns?",
        a: "Not for most products: Costco's satisfaction guarantee has no fixed window. Electronics and major appliances must be returned within 90 days.",
      },
      {
        q: "Which items have Costco's 90-day limit?",
        a: "Televisions, projectors, major appliances, computers, tablets, smart wearables, cameras, drones, camcorders, MP3 players and cell phones.",
      },
      {
        q: "Can I get my Costco membership fee back?",
        a: "Yes. Costco says it will cancel and refund the membership fee at any time if you are not satisfied.",
      },
    ],
    source: "https://help.costco.com/s/article/bd-What-is-Costcos-return-policy",
    checked: CHECKED,
  },
  {
    slug: "kohls",
    name: "Kohl's",
    country: "United States",
    region: "us",
    category: "Department store",
    headline: "90 days for most items, 120 for Kohl's Cardholders",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Premium electronics & watches end" },
      { day: 90, label: "Most items end" },
      { day: 120, label: "Kohl's Cardholders end" },
    ],
    summary:
      "Kohl's accepts most merchandise back within 90 days of purchase, and Kohl's Cardholders get 120 days. Premium electronics and watches have 30 days and need the original packaging plus a receipt or account lookup. Returns without a receipt are possible but are paid as merchandise credit.",
    facts: [
      { label: "Most items", value: "90 days" },
      { label: "Kohl's Cardholders", value: "120 days" },
      { label: "Premium electronics & watches", value: "30 days, original packaging + receipt or lookup" },
      { label: "No receipt", value: "Merchandise credit at the lowest 13-week sale price" },
      { label: "Kohl's Cash", value: "May be reduced if a return drops the order below the earning amount" },
    ],
    exceptions: [
      "Premium electronics and watches: 30 days, original packaging, receipt or account lookup.",
      "Kohl's Cash earned on the purchase can be reduced or voided by a return; if it was already spent, the refund is reduced.",
    ],
    steps: [
      "Find the receipt, or bring the card you paid with so the store can look up the purchase.",
      "Check the window: 90 days, 120 with a Kohl's Card, 30 for premium electronics and watches.",
      "Return at any Kohl's store, or start a return from your online order.",
    ],
    tips: [
      "If you earned Kohl's Cash, check how a return affects it before you go.",
      "No receipt? The credit is based on the lowest sale price in the last 13 weeks, so a receipt is worth finding.",
    ],
    faqs: [
      {
        q: "How long is Kohl's return policy?",
        a: "90 days for most merchandise, or 120 days for Kohl's Cardholders. Premium electronics and watches have 30 days.",
      },
      {
        q: "Can I return to Kohl's without a receipt?",
        a: "Yes, most items. If the purchase cannot be looked up, you get merchandise credit based on the lowest sale price in the last 13 weeks.",
      },
      {
        q: "What happens to Kohl's Cash when I return something?",
        a: "If the return lowers your purchase below the amount needed to earn the Kohl's Cash, it can be reduced or voided, or your refund is reduced if you already spent it.",
      },
    ],
    holiday:
      "Holiday 2026: purchases made October 4 to December 30, 2026 can be returned through January 31, 2027, including premium electronics and watches.",
    source: "https://www.kohls.com/faq/article/893",
    checked: CHECKED,
  },
  {
    slug: "macys",
    name: "Macy's",
    country: "United States",
    region: "us",
    category: "Department store",
    headline: "30 days for most purchases",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 14, label: "Burberry ends" },
      { day: 30, label: "Most items end" },
    ],
    summary:
      "Most Macy's purchases can be returned within 30 days of purchase or delivery. An eReceipt counts as a receipt. Last Act clearance, altered or personalized items, food, live plants and gift cards are final sale, and a few departments such as Burberry have shorter windows.",
    facts: [
      { label: "Most items", value: "30 days from purchase or delivery" },
      { label: "Receipt", value: "Paper or eReceipt" },
      { label: "No receipt", value: "Store credit at the item's lowest recent selling price" },
      { label: "Gift registry", value: "90 days after the event date, with receipt" },
      { label: "Marketplace items", value: "Returned to the seller" },
    ],
    exceptions: [
      "Final sale: Last Act items, altered or personalized merchandise, food, beverages, live plants, gift cards and gourmet gifts.",
      "Burberry: 14 days.",
      "Jewelry and watches have extra inspection.",
      "Macy's Marketplace items go back to the third-party seller.",
    ],
    steps: [
      "Find the receipt or eReceipt, or the order in your Macy's account.",
      "Return in any Macy's store, or start a mail return from your online order.",
      "Refunds go back to the original payment method.",
    ],
    tips: [
      "Look for the Last Act tag before buying clearance: those items are final sale.",
      "Gift registry items count their window from the event date, not the purchase date.",
    ],
    faqs: [
      {
        q: "How many days do I have to return to Macy's?",
        a: "30 days from purchase or delivery for most items. Some departments, like Burberry (14 days), have shorter windows.",
      },
      {
        q: "Can I return to Macy's without a receipt?",
        a: "Macy's may look up the purchase by your account; otherwise it may issue store credit for the item's lowest recent selling price.",
      },
      {
        q: "Are Last Act items returnable?",
        a: "Macy's return policy lists Last Act items as final sale.",
      },
    ],
    source: "https://www.macys.com/customer-service/articles/what-is-macys-return-policy",
    checked: CHECKED,
  },
  {
    slug: "best-buy",
    name: "Best Buy",
    country: "United States",
    region: "us",
    category: "Electronics",
    headline: "15 days for most products, 60 for Plus and Total members",
    windowDays: 15,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 14, label: "Phones & activatable devices end" },
      { day: 15, label: "Most products end" },
      { day: 60, label: "Plus / Total members end" },
    ],
    summary:
      "Best Buy gives 15 days to return most products and 14 days for activatable devices such as cell phones. My Best Buy Plus and Total members get 60 days on most products. Some categories carry a restocking fee if the box has been opened.",
    facts: [
      { label: "Most products", value: "15 days" },
      { label: "Activatable devices (phones)", value: "14 days, also for members" },
      { label: "My Best Buy Plus / Total", value: "60 days on most products" },
      { label: "Restocking fee: activatable devices", value: "$45 (not prepaid phones)" },
      { label: "Restocking fee: drones, cameras, lenses, projectors…", value: "15% when opened" },
      { label: "Marketplace purchases", value: "Member extended windows do not apply" },
    ],
    exceptions: [
      "No restocking fee if the product is unopened, or for purchases made in AL, CO, HI, IA, MS, OH, OK or SC (or where prohibited by law).",
      "Member 60-day returns do not cover Marketplace (third-party seller) purchases.",
    ],
    steps: [
      "Check the window on your receipt or in your Best Buy account.",
      "Pack the item with all accessories, manuals and the original box.",
      "Return in store or start the return online.",
    ],
    tips: [
      "Leave expensive cameras and drones sealed until you are sure, to avoid the 15% restocking fee.",
      "If you have My Best Buy Plus or Total, make sure the purchase is linked to your account.",
    ],
    faqs: [
      {
        q: "How long do you have to return something to Best Buy?",
        a: "15 days for most products (14 for phones and other activatable devices). My Best Buy Plus and Total members get 60 days on most products.",
      },
      {
        q: "Does Best Buy charge a restocking fee?",
        a: "Opened activatable devices carry a $45 fee, and opened drones, digital cameras, lenses, camcorders, projectors and some other categories carry a 15% fee. Unopened items and purchases in some states are exempt.",
      },
      {
        q: "Does Best Buy have a holiday return policy?",
        a: "For members, purchases made October 30 to December 3, 2026 can be returned until January 31, 2027; purchases on or after December 4, 2026 get the full 60 days.",
      },
    ],
    holiday:
      "Holiday 2026 (My Best Buy Plus / Total members): purchases made October 30 to December 3, 2026 have a last return day of January 31, 2027.",
    source: "https://www.bestbuy.com/site/help-topics/return-exchange-policy/pcmcat260800050014.c?id=pcmcat260800050014",
    checked: CHECKED,
  },
  {
    slug: "nike",
    name: "Nike",
    country: "United States",
    region: "us",
    category: "Shoes & sportswear",
    headline: "60 days for most purchases, for any reason",
    windowDays: 60,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 60, label: "Return window ends" },
    ],
    summary:
      "Nike lets you return or exchange most purchases for any reason within 60 days. Nike Members get free returns with a prepaid label and can return without a receipt by linking the order to their account; guests can return too but pay their own return shipping.",
    facts: [
      { label: "Return window", value: "60 days, most purchases" },
      { label: "Nike Members", value: "Free returns, prepaid label, receipt-less returns" },
      { label: "Guests", value: "Can return, but pay return shipping" },
      { label: "Where to return", value: "Nike stores, or by mail from your order" },
    ],
    exceptions: [
      "Nike By You (custom) products have their own return rules.",
      "Member return benefits do not apply at Nike Clearance stores.",
    ],
    steps: [
      "Open the order in the Nike App or your Nike account (members), or find your order confirmation.",
      "Choose Return and print or save the label, or pick a store.",
      "Pack the item and drop it off with the carrier, or bring it to a Nike store.",
    ],
    tips: [
      "Joining Nike Membership (free) before you return can save the return shipping cost.",
      "Nike describes the member benefit as a 60-day wear test, so members can try gear out properly.",
    ],
    faqs: [
      {
        q: "How long does Nike give you to return shoes?",
        a: "60 days for most purchases, for any reason.",
      },
      {
        q: "Are Nike returns free?",
        a: "Free for Nike Members with a prepaid label. Guests can return but pay their own return shipping.",
      },
      {
        q: "Can I return custom Nike By You shoes?",
        a: "Nike By You products have separate return rules; check Nike's Nike By You return page before ordering.",
      },
    ],
    source: "https://www.nike.com/help/a/how-to-return/app",
    checked: CHECKED,
  },
  {
    slug: "sephora",
    name: "Sephora",
    country: "United States",
    region: "us",
    category: "Beauty",
    headline: "30 days with a receipt for a refund",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Refund window ends" },
    ],
    summary:
      "For purchases on or after April 24, 2025, Sephora refunds approved returns made within 30 days of purchase with a receipt, back to the original payment method. Proof of purchase is required to complete a return.",
    facts: [
      { label: "Return window", value: "30 days from purchase" },
      { label: "Receipt", value: "Proof of purchase required" },
      { label: "Refund method", value: "Original form of payment" },
      { label: "Store credit", value: "Usable in Sephora stores only (online credit: Sephora.com only)" },
    ],
    exceptions: ["Returns without proof of purchase cannot be completed."],
    steps: [
      "Find the receipt or the order in your Sephora account.",
      "Return in a Sephora store or mail the item back with the return label from your online order.",
      "The refund goes back to the original payment method.",
    ],
    tips: [
      "Sign in when you shop so your Beauty Insider account keeps a record of the purchase.",
      "The 30 days start from the purchase date, not the date you first open the product.",
    ],
    faqs: [
      {
        q: "How long is Sephora's return policy?",
        a: "30 days from purchase with a receipt for a refund to the original payment method (purchases on or after April 24, 2025).",
      },
      {
        q: "Can I return used makeup to Sephora?",
        a: "Sephora reviews returns and refunds approved returns made within 30 days with proof of purchase. Bring the receipt and ask in store.",
      },
      {
        q: "Does Sephora give store credit after 30 days?",
        a: "During the 2026 holiday period, Sephora allows exchanges and store or online credit for returns made by January 31, 2027. Outside that, see Sephora's returns page.",
      },
    ],
    holiday:
      "Holiday 2026: Sephora allows in-store exchanges and store credit (or online credit for mailed returns) for returns made on or before January 31, 2027.",
    source: "https://www.sephora.com/beauty/returns-exchanges/",
    checked: CHECKED,
  },
  {
    slug: "ulta",
    name: "Ulta Beauty",
    country: "United States",
    region: "us",
    category: "Beauty",
    headline: "30 days for a refund, 31–60 days for merchandise credit",
    windowDays: 60,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Refund window ends" },
      { day: 60, label: "Merchandise credit ends" },
    ],
    summary:
      "Ulta Beauty refunds returns made within 30 days of purchase to the original payment method. Returns made 31 to 60 days after purchase get merchandise credit instead. Ulta needs proof of purchase or a purchase it can find in its system.",
    facts: [
      { label: "Days 1–30", value: "Refund to original payment method" },
      { label: "Days 31–60", value: "Merchandise credit (e-gift card for mailed returns)" },
      { label: "Proof of purchase", value: "Required, or a purchase Ulta can verify" },
      { label: "Gift receipt", value: "Exchange or merchandise credit within 60 days" },
    ],
    exceptions: [
      "Gift cards cannot be returned.",
      "Purchases Ulta cannot verify are not eligible for refund, exchange or credit.",
      "DoorDash, Instacart and Uber Eats orders: return in store within 60 days with the app receipt (DoorDash/Instacart refunds as store credit).",
    ],
    steps: [
      "Find the receipt or sign in to Ulta Beauty Rewards so the purchase can be found.",
      "Return within 30 days for a refund, or 31–60 days for merchandise credit.",
      "Return in an Ulta store or by mail from your online order.",
    ],
    tips: ["Returning within 30 days matters: after that you get credit, not money back."],
    faqs: [
      {
        q: "How long do you have to return to Ulta?",
        a: "30 days for a refund to your original payment method, and 31 to 60 days for merchandise credit.",
      },
      {
        q: "Can I return to Ulta without a receipt?",
        a: "Only if Ulta can verify the purchase in its system, for example through your Ulta Beauty Rewards account.",
      },
      {
        q: "Does Ulta extend returns for the holidays?",
        a: "Yes. Eligible products bought November 1 to December 31, 2026 can be returned through January 31, 2027.",
      },
    ],
    holiday: "Holiday 2026: eligible products bought November 1 to December 31, 2026 can be returned through January 31, 2027.",
    source: "https://www.ulta.com/guestservices/all",
    checked: CHECKED,
  },
  {
    slug: "home-depot",
    name: "The Home Depot",
    country: "United States",
    region: "us",
    category: "Home improvement",
    headline: "90 days for most items, 365 days with a Home Depot card",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 90, label: "Most items end" },
      { day: 365, label: "Home Depot card purchases end" },
    ],
    summary:
      "Most Home Depot merchandise can be returned within 90 days with proof of purchase. Purchases made with The Home Depot Consumer Credit Card, Pro Xtra Credit Card or a Commercial Account get 365 days. Perennials, trees, roses and shrubs carry a one-year guarantee.",
    facts: [
      { label: "Most items", value: "90 days with proof of purchase" },
      { label: "Home Depot Consumer / Pro Xtra card or Commercial Account", value: "365 days" },
      { label: "Perennials, trees, roses, shrubs", value: "1-year guarantee (store credit)" },
      { label: "Cut flowers", value: "Not returnable" },
    ],
    exceptions: [
      "Cut flowers cannot be returned.",
      "Damaged or dead live goods from online orders must be reported within 3 days of delivery.",
    ],
    steps: [
      "Find the receipt or the order in your Home Depot account.",
      "Bring the item to the service desk at any Home Depot store, or start an online return.",
    ],
    tips: ["Paying with a Home Depot card quadruples the window for most items, which helps with big projects."],
    faqs: [
      {
        q: "How long is Home Depot's return policy?",
        a: "90 days for most items with proof of purchase, or 365 days when you paid with a Home Depot Consumer Credit Card, Pro Xtra Credit Card or Commercial Account.",
      },
      {
        q: "Can I return dead plants to Home Depot?",
        a: "Perennials, trees, roses and shrubs have a one-year guarantee and can be returned for store credit. Cut flowers are not returnable.",
      },
    ],
    source: "https://www.homedepot.com/c/Return_Policy",
    checked: CHECKED,
  },
  {
    slug: "american-eagle",
    name: "American Eagle",
    country: "United States",
    region: "us",
    category: "Clothing",
    headline: "30 days for a refund, 60 days for merchandise credit",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Full refund ends" },
      { day: 37, label: "Online orders (+7 days)" },
      { day: 60, label: "Merchandise credit ends" },
    ],
    summary:
      "American Eagle gives a full refund within 30 days of purchase and merchandise credit within 60 days. Online orders get 7 extra days. Items must be unworn and unwashed, and you need proof of purchase for a refund.",
    facts: [
      { label: "Full refund", value: "30 days from purchase (online orders +7 days)" },
      { label: "Merchandise credit", value: "60 days" },
      { label: "Proof of purchase", value: "Receipt, invoice or order email for a refund" },
      { label: "Online return fee", value: "$5 (free for Real Rewards Level 3 and cardmembers)" },
      { label: "Where to return", value: "Any AE, Aerie, Offline or AE Factory store" },
    ],
    exceptions: [
      "Without proof of purchase you can only exchange for a different size.",
      "In-store purchases must be returned in store.",
      "Items must be unworn, unwashed and undamaged; swim and underwear need hygienic liners in place.",
      "Free online returns also for Aerie bras, bralettes, swimsuits and third-party footwear.",
    ],
    steps: [
      "Find the receipt or the order email.",
      "Return in any AE, Aerie, Offline or AE Factory store, or start a mail return online.",
      "Refunds go to the original payment method or an AEO merchandise card.",
    ],
    tips: ["Return in a store to avoid the $5 online return fee."],
    faqs: [
      {
        q: "What is American Eagle's return policy?",
        a: "A full refund within 30 days of purchase (37 for online orders) and merchandise credit within 60 days, for unworn, unwashed items with proof of purchase.",
      },
      {
        q: "Are American Eagle online returns free?",
        a: "Online returns cost $5, except for Real Rewards Level 3 members, AE credit cardmembers and some items such as Aerie bras and swimsuits.",
      },
    ],
    holiday:
      "Holiday 2026: items bought on or after October 23, 2026 can be returned through February 1, 2027, or 60 days from purchase, whichever is later (proof of purchase or gift receipt needed).",
    source: "https://www.ae.com/us/en/content/help/return-policy",
    checked: CHECKED,
  },
  {
    slug: "nordstrom",
    name: "Nordstrom",
    country: "United States",
    region: "us",
    category: "Department store",
    headline: "No fixed window: returns handled case by case",
    windowDays: null,
    timeline: [{ day: 0, label: "Purchase" }],
    summary:
      "Nordstrom does not publish a fixed return window. It handles returns case by case, with the goal of keeping customers happy. Nordstrom Rack is a separate store with its own 40-day policy, and fine jewelry or designer items bought at Nordstrom cannot be returned to Rack stores.",
    facts: [
      { label: "Return window", value: "No fixed window (case by case)" },
      { label: "Nordstrom Rack", value: "Separate policy: 40 days" },
      { label: "Where to return", value: "Nordstrom stores, or by mail for online orders" },
    ],
    exceptions: [
      "Fine jewelry and designer items bought at Nordstrom cannot be returned to Nordstrom Rack stores.",
      "Nordstrom Rack purchases follow Rack's 40-day policy (unworn, tags or packaging, receipt; Final Sale not returnable).",
    ],
    steps: [
      "Bring the item and receipt (or the order in your Nordstrom account) to a Nordstrom store.",
      "For online orders, start a mail return from your account.",
    ],
    tips: ["Case by case still means the store decides: an unworn item with tags and a receipt is the easiest return."],
    faqs: [
      {
        q: "Does Nordstrom have a return time limit?",
        a: "Nordstrom does not publish a fixed window; it reviews returns case by case. Nordstrom Rack has a 40-day policy.",
      },
      {
        q: "What is Nordstrom Rack's return policy?",
        a: "40 days (online from the order date, in store from the purchase date) for unworn items with tags or packaging and a receipt. Final Sale items are not returnable.",
      },
    ],
    holiday: "Nordstrom Rack, holiday 2026: purchases made October 5 to December 24, 2026 can be returned by January 18, 2027, or 40 days after purchase, whichever is later.",
    source: "https://www.nordstrom.com/browse/customer-service/return-policy",
    checked: CHECKED,
  },
  {
    slug: "lululemon",
    name: "lululemon",
    country: "United States",
    region: "us",
    category: "Sportswear",
    headline: "30 days, unworn and unwashed with tags",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivery / purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "lululemon accepts returns within 30 days of delivery (online) or purchase (in store) for items that are unworn, unwashed and still have their hang tags. Shoes may be worn but must come back in their box. We Made Too Much sale items are final sale for non-members.",
    facts: [
      { label: "Return window", value: "30 days (online: from delivery; store: from purchase)" },
      { label: "Condition", value: "Unworn, unwashed, hang tags attached" },
      { label: "Shoes", value: "May be worn, must be in the original box" },
      { label: "Exchanges", value: "In store only" },
    ],
    exceptions: [
      "We Made Too Much (sale) items are final sale unless you are a member.",
      "Gift cards are final sale.",
      "Returns are not accepted at outlet stores.",
      "lululemon reviews every return case by case.",
    ],
    steps: [
      "Check the item: unworn, unwashed, tags on.",
      "Start a return online from your order, or bring it with proof of purchase to a lululemon store.",
      "Exchanges must be done in a store.",
    ],
    tips: ["Try leggings on at home before cutting any tags; once the tags are off, the item can't be returned."],
    faqs: [
      {
        q: "What is lululemon's return policy?",
        a: "30 days from delivery or purchase for unworn, unwashed items with hang tags. Shoes may be worn but must be in the box.",
      },
      {
        q: "Can I return We Made Too Much items?",
        a: "Sale items from We Made Too Much are final sale unless you are a lululemon member.",
      },
    ],
    source: "https://shop.lululemon.com/help/returns-and-refunds/policy",
    checked: CHECKED,
  },
  {
    slug: "hm",
    name: "H&M",
    country: "United States",
    region: "us",
    category: "Clothing",
    headline: "30 days in store or online",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "H&M gives you 30 days to return items, in stores or online, and does not accept returns after that. Returns in H&M stores in the US are free; mail-in returns of online orders carry a fee that is deducted from the refund.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "In-store returns", value: "Free (US stores, excluding Puerto Rico)" },
      { label: "Mail-in returns", value: "Fee deducted: shown as $2.99 for members, $5.99 for non-members; free for Plus members" },
      { label: "Refund method", value: "Original payment method" },
    ],
    exceptions: ["Shipping and handling costs are not refunded.", "No returns after 30 days, in store or online."],
    steps: [
      "Bring the item and receipt to any US H&M store, or start a return from your online order.",
      "Refunds go back to the original payment method.",
    ],
    tips: ["Return in a store to skip the mail-in fee."],
    faqs: [
      { q: "How long do I have to return to H&M?", a: "30 days, in stores or online." },
      {
        q: "Are H&M returns free?",
        a: "Returns in US H&M stores are free. Mail-in returns of online orders have a fee deducted from the refund, which H&M Plus members don't pay.",
      },
    ],
    source: "https://www2.hm.com/en_us/customer-service/returns.html",
    checked: CHECKED,
  },
  {
    slug: "tj-maxx",
    name: "T.J. Maxx",
    country: "United States",
    region: "us",
    category: "Off-price",
    headline: "30 days in store, 40 days for online orders",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / order" },
      { day: 30, label: "In-store purchases end" },
      { day: 40, label: "Online orders end" },
    ],
    summary:
      "In-store T.J. Maxx purchases can be returned within 30 days for a refund or exchange. Online orders get 40 days from the order date and can be returned to a T.J. Maxx store for free, or by mail for a fee. Returns later than that, with a receipt, get merchandise credit.",
    facts: [
      { label: "In-store purchases", value: "30 days" },
      { label: "Online orders", value: "40 days from the order date" },
      { label: "Online order → store return", value: "Free (T.J. Maxx stores only)" },
      { label: "Return by mail", value: "$11.99 deducted" },
      { label: "Receipt", value: "Receipt, packing slip or shipping confirmation email" },
    ],
    exceptions: [
      "Online orders can only be returned to T.J. Maxx stores (not Marshalls or HomeGoods).",
      "After the window, a return with a receipt gets merchandise credit.",
    ],
    steps: [
      "Bring the item with the receipt, packing slip or shipping email to any T.J. Maxx store.",
      "Or mail it back with the return label from your order (fee applies).",
    ],
    tips: ["Return online orders in a store to avoid the $11.99 mail fee."],
    faqs: [
      {
        q: "How long is T.J. Maxx's return policy?",
        a: "30 days for in-store purchases and 40 days for online orders.",
      },
      {
        q: "Can I return a tjmaxx.com order to a store?",
        a: "Yes, for free, within 40 days of the order date, but only to a T.J. Maxx store.",
      },
    ],
    holiday:
      "Holiday 2026: purchases made October 4 to December 24, 2026 can be returned through January 25, 2027 (in store) or February 4, 2027 (online orders).",
    source: "https://tjmaxx.tjx.com/store/jump/topic/FAQs/23900001p",
    checked: CHECKED,
  },
  {
    slug: "marshalls",
    name: "Marshalls",
    country: "United States",
    region: "us",
    category: "Off-price",
    headline: "30 days in store, 40 days for online orders",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / order" },
      { day: 30, label: "In-store purchases end" },
      { day: 40, label: "Online orders end" },
    ],
    summary:
      "Marshalls accepts in-store purchases back within 30 days for a refund or exchange. Online orders have 40 days from the order date, free when returned to a store or with an $11.99 fee by mail. Returns after 30 days, with a gift receipt or without a receipt get merchandise credit.",
    facts: [
      { label: "In-store purchases", value: "30 days" },
      { label: "Online orders", value: "40 days from the order date" },
      { label: "Return by mail", value: "$11.99 deducted" },
      { label: "Late / gift receipt / no receipt", value: "Merchandise credit" },
    ],
    exceptions: [
      "Gift cards are not returnable.",
      "Items paid with a gift card or PayPal may be refunded as merchandise credit.",
    ],
    steps: [
      "Bring the item and receipt (or order barcode from the shipping email) to any Marshalls store.",
      "Or mail an online order back using the return label (fee applies).",
    ],
    tips: ["Keep the shipping confirmation email: it counts as your receipt."],
    faqs: [
      {
        q: "What is Marshalls' return policy?",
        a: "30 days for in-store purchases and 40 days for online orders. Later returns, gift receipts and no-receipt returns get merchandise credit.",
      },
      { q: "Is there a fee to return Marshalls online orders by mail?", a: "Yes, $11.99 is deducted. Returning to a store is free." },
    ],
    holiday: "Holiday 2026: online purchases made October 4 to December 24, 2026 can be returned through February 4, 2027.",
    source: "https://www.marshalls.com/us/store/jump/topic/Find-Help/FAQs/22200018p",
    checked: CHECKED,
  },
  {
    slug: "old-navy",
    name: "Old Navy",
    country: "United States",
    region: "us",
    category: "Clothing",
    headline: "30 days, free returns and exchanges",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivery / purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Old Navy offers free returns and exchanges within 30 days: from delivery for online orders and from purchase for in-store buys. Without a receipt, the store can look up an in-store purchase with your Old Navy Rewards phone number or the card you paid with.",
    facts: [
      { label: "Return window", value: "30 days (online: from delivery; store: from purchase)" },
      { label: "Cost", value: "Free returns and exchanges" },
      { label: "No receipt", value: "Lookup by Rewards phone number or payment card" },
      { label: "Buy online, pick up in store", value: "30 days from when the order is ready" },
    ],
    exceptions: [
      "Final sale items cannot be returned or exchanged.",
      "In-store purchases must be returned in a store, not by mail.",
      "Returns go to the same brand (Old Navy items to Old Navy).",
    ],
    steps: [
      "Bring the item and receipt, or the card or Rewards phone number used, to an Old Navy store.",
      "Online orders can be returned in store or by mail from your order.",
    ],
    tips: ["Give your Rewards phone number at checkout so a lost receipt is never a problem."],
    faqs: [
      { q: "How many days do I have to return to Old Navy?", a: "30 days from delivery (online) or purchase (in store)." },
      {
        q: "Can I return to Old Navy without a receipt?",
        a: "For in-store purchases, yes: the store can look it up with your Old Navy Rewards phone number or the card you paid with.",
      },
    ],
    source: "https://oldnavy.gap.com/stores/ny/newyork/oldnavy-3743.html",
    checked: CHECKED,
  },
  {
    slug: "foot-locker",
    name: "Foot Locker",
    country: "United States",
    region: "us",
    category: "Shoes",
    headline: "45 days for unworn items",
    windowDays: 45,
    timeline: [
      { day: 0, label: "Purchase / shipment" },
      { day: 45, label: "Return window ends" },
    ],
    summary:
      "Foot Locker accepts unworn items in new condition, with the original tags, boxes and bags, within 45 days. FLX Rewards members get free returns on orders placed while logged in; other customers pay a $6.99 return shipping fee taken from the refund.",
    facts: [
      { label: "Return window", value: "45 days" },
      { label: "Condition", value: "Unworn, new, original tags, boxes and bags" },
      { label: "FLX Rewards members", value: "Free returns (logged in when ordering)" },
      { label: "Non-members", value: "$6.99 return shipping deducted" },
    ],
    exceptions: ["No international returns.", "No cash-on-delivery returns.", "Foot Locker may limit free returns if it sees return abuse."],
    steps: [
      "Keep the shoes unworn, in the original box with all tags.",
      "Start the return from your order online, or take it to a Foot Locker store.",
    ],
    tips: ["Log in to your FLX account before ordering so the return is free."],
    faqs: [
      { q: "How long do I have to return shoes to Foot Locker?", a: "45 days, for unworn items with the original tags and box." },
      { q: "Are Foot Locker returns free?", a: "Free for FLX Rewards members who were logged in when ordering; otherwise $6.99 is deducted from the refund." },
    ],
    unconfirmed: "Foot Locker's help pages differ on whether the 45 days count from the purchase date or the shipment date; return early to be safe.",
    source: "https://help.footlocker.com/hc/en-us/articles/360034123454-What-s-the-policy-for-returns",
    checked: CHECKED,
  },
  {
    slug: "ikea",
    name: "IKEA",
    country: "United States",
    region: "us",
    category: "Furniture",
    headline: "365 days unopened, 180 days opened",
    windowDays: 365,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 90, label: "Mattress exchange ends" },
      { day: 180, label: "Opened products end" },
      { day: 365, label: "Unopened products end" },
    ],
    summary:
      "IKEA US refunds new, unopened products returned within 365 days with proof of purchase, and opened products within 180 days. Mattresses can be exchanged once within 90 days. Plants, cut fabric, custom countertops and as-is items are not returnable.",
    facts: [
      { label: "New, unopened", value: "365 days" },
      { label: "Opened / assembled", value: "180 days" },
      { label: "Mattresses", value: "One exchange within 90 days" },
      { label: "Refund", value: "Original payment method, usually 5–7 business days" },
    ],
    exceptions: [
      "Not returnable: plants, cut fabric, custom countertops, as-is products.",
      "Modified, dirty, stained or damaged items may be refused.",
      "Opened mattresses are excluded from the 180-day opened-product window (exchange only).",
    ],
    steps: [
      "Find the receipt or order number.",
      "Bring the item to the returns area of an IKEA store, or arrange a return through IKEA customer service.",
    ],
    tips: ["Keep flat-pack boxes until the furniture is assembled and you are happy with it."],
    faqs: [
      { q: "How long is IKEA's return policy?", a: "365 days for new, unopened products and 180 days for opened ones, with proof of purchase." },
      { q: "Can I return an assembled IKEA product?", a: "Yes, opened or assembled products can be returned within 180 days if they are not damaged." },
    ],
    source: "https://www.ikea.com/us/en/customer-service/returns-claims/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "adidas",
    name: "adidas",
    country: "United States",
    region: "us",
    category: "Shoes & sportswear",
    headline: "30 days, free returns",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 7, label: "Hype releases end" },
      { day: 30, label: "Most items end" },
    ],
    summary:
      "adidas.com in the US offers free returns within 30 days, as long as the package ships from inside the US. Items should be unused and in their original packaging. Personalized products cannot be returned, and hype releases have only 7 days.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "Cost", value: "Free (shipped from inside the US)" },
      { label: "Condition", value: "Unused, original packaging" },
      { label: "Running / performance footwear", value: "30-day guarantee pages allow returns in any condition" },
    ],
    exceptions: ["Personalized or customized products cannot be returned.", "Hype releases: 7 days from delivery.", "The free label is not valid for APO/FPO returns via USPS."],
    steps: ["Start the return from your adidas order.", "Print the label and drop the package with the carrier."],
    tips: ["Returns can lower your adiClub points, because points earned on returned items are deducted."],
    faqs: [
      { q: "What is adidas' return policy?", a: "Free returns within 30 days on adidas.com in the US, for unused items in original packaging." },
      { q: "Can I return customized adidas shoes?", a: "No, personalized or customized products cannot be returned." },
    ],
    source: "https://www.adidas.com/us/how-do-i-return-my-products.html",
    checked: CHECKED,
  },
  {
    slug: "apple",
    name: "Apple",
    country: "United States",
    region: "us",
    category: "Electronics",
    headline: "14 days from receipt",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Received" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Apple Store purchases in the US can be returned or exchanged within 14 days of receiving them, if undamaged and with all accessories, packaging and the original or gift receipt. Refunds go to the original payment method, usually within 10 business days after inspection.",
    facts: [
      { label: "Return window", value: "14 days from receiving the product" },
      { label: "Condition", value: "Undamaged, with accessories and packaging" },
      { label: "Receipt", value: "Original or gift receipt" },
      { label: "Refund", value: "Original payment method, typically within 10 business days" },
    ],
    exceptions: ["Gift cards and software downloads are not eligible.", "Returns are generally accepted only in the country of purchase."],
    steps: [
      "Start a return in your Apple order online, or bring the product to an Apple Store.",
      "Include all accessories, cables and packaging.",
    ],
    tips: ["Erase and sign out of the device (Find My) before returning it."],
    faqs: [
      { q: "How long do you have to return to Apple?", a: "14 days from receiving the product, undamaged and with everything that came in the box." },
      {
        q: "Does Apple extend returns for the holidays?",
        a: "Apple usually announces a holiday extension each year based on the date you receive the product. Check Apple's returns page for this season's dates.",
      },
    ],
    unconfirmed: "Apple's 2026 holiday return extension was not yet confirmed on the pages we checked.",
    source: "https://www.apple.com/legal/sales-support/sales-policies/retail_us.html",
    checked: CHECKED,
  },
  {
    slug: "zara",
    name: "Zara",
    country: "United States",
    region: "us",
    category: "Clothing",
    headline: "30 days, free in store, $4.95 by drop-off",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Shipment / purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Zara US accepts returns within 30 days: from the shipment date for online orders, from the purchase date in store. Returning in a Zara store is free, including online orders; drop-off returns cost $4.95, taken from the refund.",
    facts: [
      { label: "Return window", value: "30 days (online: from shipment; store: from purchase)" },
      { label: "In-store return", value: "Free, also for online orders" },
      { label: "Drop-off return", value: "$4.95 per return request" },
      { label: "Refund", value: "Original payment method, up to 14 days to appear" },
    ],
    exceptions: ["Items must have their labels attached.", "Returns must be made in the same country where you bought the item."],
    steps: ["Start the return in your Zara account.", "Return in a Zara store for free, or use a drop-off point."],
    tips: ["Check your order details: Zara shows the exact last return date for each order."],
    faqs: [
      { q: "How long is Zara's return policy?", a: "30 days, counted from the shipment date for online orders and the purchase date in store." },
      { q: "Are Zara returns free?", a: "Free in Zara stores. Drop-off returns cost $4.95." },
    ],
    source: "https://www.zara.com/us/en/help-center/HowToReturn",
    checked: CHECKED,
  },

  // ─── Marketplaces & global platforms ──────────────────────────────────────
  {
    slug: "ebay",
    name: "eBay",
    country: "United States",
    region: "global",
    category: "Online marketplace",
    headline: "Seller's policy for change of mind; 30-day Money Back Guarantee",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 30, label: "Money Back Guarantee request ends" },
    ],
    summary:
      "On eBay, each seller sets its own return policy for change-of-mind returns, shown in the listing. If an item doesn't arrive or doesn't match the listing, the eBay Money Back Guarantee lets you open a request within 30 days of the actual or latest estimated delivery date.",
    facts: [
      { label: "Change of mind", value: "Seller's return policy in the listing" },
      { label: "Not received / not as described", value: "30 days from (estimated) delivery" },
      { label: "Trading cards, coins, bullion, 'for parts' items", value: "Seller's window, or 3 days if no returns offered" },
    ],
    exceptions: ["Final sale purchases are not covered for 'not as described' claims.", "Sellers who offer returns must honor the policy in their listing."],
    steps: [
      "Go to your Purchase history and choose Return this item or I didn't receive it.",
      "Pick the reason and follow the steps; eBay can step in if the seller doesn't resolve it.",
    ],
    tips: ["Read the 'Returns' line in the listing before buying: 'No returns' only limits change-of-mind returns."],
    faqs: [
      { q: "Can I return an eBay item if the seller says no returns?", a: "Not for change of mind, but if the item is not as described or didn't arrive, the eBay Money Back Guarantee still applies within 30 days." },
      { q: "How long do I have to open an eBay return?", a: "For change of mind: the seller's window. For not received or not as described: 30 days from the actual or estimated delivery date." },
    ],
    source: "https://www.ebay.com/help/policies/ebay-money-back-guarantee-policy/ebay-money-back-guarantee-policy?id=4210",
    checked: CHECKED,
  },
  {
    slug: "etsy",
    name: "Etsy",
    country: "United States",
    region: "global",
    category: "Online marketplace",
    headline: "Each shop sets its own policy; Purchase Protection for problems",
    windowDays: null,
    timeline: [{ day: 0, label: "Order" }],
    summary:
      "Every Etsy shop sets its own return policy for each listing, including 'no returns'. If an order is lost, very late, damaged or not as described, Etsy's Purchase Protection can refund you (Etsy covers up to $250) after you contact the shop and then open a case.",
    facts: [
      { label: "Change of mind", value: "The shop's policy, shown on each listing" },
      { label: "Purchase Protection covers", value: "Lost, 7+ days late, damaged, not as described" },
      { label: "Etsy covers", value: "Up to $250 of the refund" },
      { label: "Time limit", value: "Etsy refunds within 180 days of the transaction" },
    ],
    exceptions: ["Purchase Protection starts only after you message the shop through a Help request and then open a case."],
    steps: [
      "Open the order in Purchases and reviews and choose Help with order.",
      "Message the shop first; if it isn't resolved, open a case with Etsy.",
    ],
    tips: ["Screenshot the listing when you buy, so you can show what was promised."],
    faqs: [
      { q: "What is Etsy's return policy?", a: "Each shop sets its own. Check the Returns & exchanges section on the listing before you buy." },
      { q: "What does Etsy Purchase Protection cover?", a: "Orders that are lost, arrive 7+ days late, arrive damaged or differ significantly from the listing. Etsy covers up to $250 of the refund." },
    ],
    source: "https://help.etsy.com/hc/en-us/articles/7471925990807-Etsy-s-Purchase-Protection-Program",
    checked: CHECKED,
  },
  {
    slug: "shein",
    name: "SHEIN",
    country: "United States",
    region: "global",
    category: "Online fashion",
    headline: "30 days from delivery, first return per order free",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "SHEIN US accepts most items back within 30 days of delivery. The first return on each order is free under SHEIN's Fair Use Policy; each later return from the same order costs $6.99, taken from the refund. Other countries have different windows.",
    facts: [
      { label: "Return window (US)", value: "30 days from delivery" },
      { label: "First return per order", value: "Free (Fair Use Policy)" },
      { label: "Later returns, same order", value: "$6.99 deducted" },
      { label: "Refund timing", value: "About 5–7 days quality check, then 1–10 business days at your bank" },
    ],
    exceptions: ["The original shipping fee is not refunded.", "Some item types cannot be returned; check the product page.", "Other countries differ (for example 45 days in Australia and the UK, 15 days in the UAE)."],
    steps: ["Go to Orders, choose the item and Return.", "Pack it and drop it off with the label SHEIN provides."],
    tips: ["Put everything you want to return from one order into a single return, since only the first is free."],
    faqs: [
      { q: "How many days do I have to return to SHEIN?", a: "In the US, 30 days from delivery for most items." },
      { q: "Are SHEIN returns free?", a: "The first return per order is free; later returns from the same order cost $6.99." },
    ],
    source: "https://us.shein.com/Return-Policy-a-281.html",
    checked: CHECKED,
  },
  {
    slug: "temu",
    name: "Temu",
    country: "United States",
    region: "global",
    category: "Online marketplace",
    headline: "90 days for most items, first return per order free",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 90, label: "Return window ends" },
    ],
    summary:
      "Temu lets you return most items within 90 days of purchase, and the first return on each order is free. Some electronics and large appliances have shorter windows, and worn clothing, food and personal care items are excluded.",
    facts: [
      { label: "Return window", value: "90 days from purchase (most items)" },
      { label: "First return per order", value: "Free" },
      { label: "Some electronics / large appliances", value: "45–60 days" },
    ],
    exceptions: ["Not returnable: clothing that was worn, washed or damaged after delivery; grocery and food; health and personal care items.", "Rules can vary by country."],
    steps: ["Open the order in the Temu app and choose Return/Refund.", "Select the items and a drop-off or pickup option."],
    tips: ["Return several items from the same order together to keep the return free."],
    faqs: [
      { q: "How long is Temu's return policy?", a: "90 days from purchase for most items." },
      { q: "Are Temu returns free?", a: "The first return on each order is free." },
    ],
    source: "https://www.temu.com/support/c2/returns-f-50.html",
    checked: CHECKED,
  },
  {
    slug: "aliexpress",
    name: "AliExpress",
    country: "Global",
    region: "global",
    category: "Online marketplace",
    headline: "15 days for 'Free Return' items; Buyer Protection for problems",
    windowDays: 15,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 15, label: "Free Return window ends" },
    ],
    summary:
      "Items with the 'Free Return' badge on AliExpress can be returned within 15 days of delivery in selected countries, including the US, UK, Germany and Canada. Buyer Protection covers items that are not as described, damaged, missing or late. For other change-of-mind returns you usually pay the return shipping.",
    facts: [
      { label: "Free Return items", value: "15 days from delivery (selected countries)" },
      { label: "Buyer Protection", value: "Not as described, damaged, missing or late" },
      { label: "Other change-of-mind returns", value: "Buyer usually pays return shipping" },
      { label: "Refund", value: "Original payment method or AliExpress credit" },
    ],
    exceptions: ["Free Return items must be in perfect condition and original packaging.", "Excluded from returns: underwear, socks, food, batteries."],
    steps: ["Open the order and choose Return/refund.", "For Free Return items, follow the drop-off or pickup instructions."],
    tips: ["Look for the 'Free Return' badge on the product page before buying."],
    faqs: [
      { q: "How many days do I have to return to AliExpress?", a: "15 days from delivery for items with the Free Return badge, in selected countries." },
      { q: "What if my AliExpress item is not as described?", a: "Open a refund request under Buyer Protection from the order page." },
    ],
    source: "https://www.aliexpress.com/p/buyerprotection/index.html",
    checked: CHECKED,
  },
  {
    slug: "capcut-pro",
    name: "CapCut Pro",
    country: "Global",
    region: "global",
    category: "Subscription",
    headline: "Refund only within 14 days if Pro was not used",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Subscription starts" },
      { day: 14, label: "Unused-refund window ends" },
    ],
    summary:
      "CapCut's terms allow a full refund if you cancel within 14 calendar days of the subscription starting and have not used the Premium features. Otherwise subscriptions are generally non-refundable. If you paid through the App Store or Google Play, Apple or Google decide refunds under their own rules.",
    facts: [
      { label: "Refund (CapCut terms)", value: "Within 14 days, only if Premium was not used" },
      { label: "Cancel", value: "At least 24 hours before renewal to avoid the next charge" },
      { label: "App Store purchases", value: "Apple's refund process (Report a Problem)" },
      { label: "Google Play purchases", value: "Google Play refund process" },
    ],
    exceptions: ["Subscriptions are treated as virtual goods and are generally not refundable outside the conditions above."],
    steps: [
      "iPhone: Settings → your name → Subscriptions → CapCut → Cancel Subscription.",
      "Android: Google Play → profile → Payments & subscriptions → Subscriptions → CapCut → Cancel.",
      "For a refund on App Store purchases, use Apple's Report a Problem page; for Google Play, use the Google Play refund request.",
    ],
    tips: ["Cancelling keeps Pro until the end of the period you paid for, so cancel as soon as you decide."],
    faqs: [
      { q: "Can I get a refund for CapCut Pro?", a: "Under CapCut's terms, only if you cancel within 14 days of the start and have not used the Premium features. App Store and Google Play purchases follow Apple's or Google's refund rules." },
      { q: "How do I cancel CapCut Pro?", a: "In your phone's subscription settings (App Store or Google Play) at least 24 hours before renewal." },
    ],
    source: "https://www.capcut.com/clause/terms-of-service",
    checked: CHECKED,
  },
  // ─── Canada, UK, Australia ─────────────────────────────────────────────────
  {
    slug: "walmart-ca",
    name: "Walmart Canada",
    country: "Canada",
    region: "ca",
    category: "Department store",
    headline: "90 days for most items, 30 days for most electronics",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase / arrival" },
      { day: 30, label: "Most electronics end" },
      { day: 90, label: "Most items end" },
    ],
    summary:
      "With proof of purchase, almost anything bought from Walmart Canada, in store or on Walmart.ca, can be returned or exchanged within 90 days. Many electronics, such as TVs, computers, tablets, cameras, headphones and game consoles, have 30 days.",
    facts: [
      { label: "Most items", value: "90 days with proof of purchase" },
      { label: "Electronics (TVs, computers, tablets, cameras, headphones, consoles…)", value: "30 days" },
      { label: "Clock starts", value: "Online: order arrival; store: purchase date" },
      { label: "Marketplace sellers", value: "Usually at least 30 days; items over $250 CAD go back to the seller" },
    ],
    exceptions: ["Marketplace items sold and shipped by sellers follow the seller's policy.", "The holiday policy covers unopened items and excludes Marketplace seller items."],
    steps: ["Bring the item and receipt to any Walmart Canada store, or start a return from your Walmart.ca order."],
    tips: ["Check the product page: Walmart lists which electronics have the 30-day window."],
    faqs: [
      { q: "How long is Walmart Canada's return policy?", a: "90 days for most items with proof of purchase, 30 days for many electronics." },
      { q: "Does Walmart Canada have a holiday return policy?", a: "Yes, for unopened items bought November 1 to December 25. Marketplace seller items are excluded." },
    ],
    source: "https://www.walmart.ca/en/help/article/return-policy/6657a60d5a3f4e6cbd1409330b680562",
    checked: CHECKED,
  },
  {
    slug: "sephora-ca",
    name: "Sephora Canada",
    country: "Canada",
    region: "ca",
    category: "Beauty",
    headline: "30 days for a full refund",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Refund window ends" },
    ],
    summary:
      "Sephora Canada refunds new or gently used products returned within 30 days of purchase, to the original payment method, with proof of purchase. Online orders can be returned in any Sephora Canada store or by mail with a prepaid label, free of charge.",
    facts: [
      { label: "Return window", value: "30 days from purchase" },
      { label: "Condition", value: "New or gently used" },
      { label: "Cost", value: "Free, in store or by mail" },
      { label: "Exchanges", value: "In store within 30 days (not by mail)" },
    ],
    exceptions: ["Final sale: gift cards, some Sephora Favorites kits and some intimate care items.", "Shipping charges are generally not refunded unless Sephora made an error."],
    steps: ["Return in any Sephora Canada store, or mail it with the prepaid label from your order."],
    tips: ["Mailed returns can take up to 30 days to process, so return early."],
    faqs: [
      { q: "What is Sephora Canada's return policy?", a: "A full refund within 30 days of purchase with proof of purchase, for new or gently used products." },
      { q: "Are Sephora Canada returns free?", a: "Yes, in store or by mail with the prepaid label." },
    ],
    source: "https://www.sephora.com/ca/en/beauty/returns-exchanges",
    checked: CHECKED,
  },
  {
    slug: "target-au",
    name: "Target Australia",
    country: "Australia",
    region: "au",
    category: "Department store",
    headline: "60 days change of mind, 365 days for OnePass members",
    windowDays: 60,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 60, label: "Change of mind ends" },
      { day: 365, label: "OnePass members end (Returns Card)" },
    ],
    summary:
      "Target Australia accepts change-of-mind returns within 60 days of purchase. OnePass members get 365 days, but returns made from day 61 are paid as a Target Returns Card. Items must be unused and in resaleable condition with proof of purchase.",
    facts: [
      { label: "Change of mind", value: "60 days" },
      { label: "OnePass members", value: "365 days (days 61–365: Target Returns Card)" },
      { label: "Proof of purchase", value: "Receipt, photo of the receipt, tax invoice or OnePass statement" },
      { label: "Refund", value: "Original payment method; EFTPOS up to 5 business days" },
    ],
    exceptions: ["Personalised items cannot be returned for change of mind.", "Delivery fees are not refunded for change-of-mind returns.", "Pre-orders: 60 days from the release date."],
    steps: ["Bring the item, unused with tags and packaging, plus proof of purchase to any Target store."],
    tips: ["A clear photo of the full receipt (with barcode) is accepted, so photograph receipts for bigger buys."],
    faqs: [
      { q: "How long do you have to return to Target Australia?", a: "60 days for change of mind, or 365 days for OnePass members (Returns Card after day 60)." },
      { q: "Do I need a receipt at Target Australia?", a: "Yes, proof of purchase: the receipt, a clear photo of it, a tax invoice or a OnePass statement." },
    ],
    source: "https://www.target.com.au/help/change-of-mind-return",
    checked: CHECKED,
  },
  {
    slug: "nike-uk",
    name: "Nike UK",
    country: "United Kingdom",
    region: "uk",
    category: "Shoes & sportswear",
    headline: "Check the window on your order; 14-day legal right to cancel online",
    windowDays: null,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 14, label: "UK legal cancellation period ends" },
    ],
    summary:
      "Nike's UK pages we checked confirm that members can return or exchange receipt-free through the Nike App, but did not state a day count, so we don't list one. UK law separately gives a 14-day right to cancel most online purchases. For the 2026 holidays, Nike UK gives digital purchases a 60-day return window.",
    facts: [
      { label: "Nike Members", value: "Receipt-free returns and exchanges in the Nike App" },
      { label: "UK law (online purchases)", value: "14-day right to cancel most items" },
      { label: "Your window", value: "Shown on your order in the Nike App or account" },
    ],
    exceptions: ["Extensively worn, damaged or non-resaleable items may not get a standard refund.", "Nike By You products have their own rules."],
    steps: ["Open the order in the Nike App or your Nike account and choose Return.", "Use the return method offered for your order."],
    tips: ["Your order page shows the exact last return date."],
    faqs: [
      { q: "What is Nike UK's return policy?", a: "Check the window shown on your order. Members can return receipt-free in the Nike App, and UK law gives 14 days to cancel most online purchases." },
      { q: "Does Nike UK extend returns at Christmas?", a: "Yes: Nike digital purchases made 1 November to 31 December 2026 have a 60-day return window." },
    ],
    holiday: "Holiday 2026: Nike digital purchases made 1 November to 31 December 2026 have an extended 60-day return window.",
    unconfirmed: "The standard Nike UK return window (in days) was not stated on the UK pages we checked.",
    source: "https://www.nike.com/gb/help/a/return-exceptions",
    checked: CHECKED,
  },
  {
    slug: "amazon-uk",
    name: "Amazon UK",
    country: "United Kingdom",
    region: "uk",
    category: "Online marketplace",
    headline: "30 days from receipt for most items",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Receipt" },
      { day: 14, label: "Legal right to cancel ends" },
      { day: 30, label: "Amazon's returns window ends" },
    ],
    summary:
      "Amazon.co.uk accepts most items back within 30 days of receipt if they are unused and undamaged. On top of that, UK law gives a 14-day right to cancel most purchases. Items from marketplace sellers are covered by Amazon's A-to-z Guarantee.",
    facts: [
      { label: "Return window", value: "30 days from receipt (unused, undamaged)" },
      { label: "Legal right to cancel", value: "14 days for most items" },
      { label: "Amazon devices", value: "30 days in new condition" },
      { label: "Marketplace sellers", value: "A-to-z Guarantee" },
    ],
    exceptions: ["No returns after 30 days for consumables (batteries, ink, bulbs…) or for accidental damage and wear.", "Customised products are generally not returnable."],
    steps: ["Go to Your Orders → Return or replace items.", "Choose a drop-off or collection option and follow the instructions."],
    tips: ["The product page shows the exact return window for that item."],
    faqs: [
      { q: "How long do I have to return to Amazon UK?", a: "30 days from receipt for most items, unused and undamaged." },
      { q: "Does Amazon UK extend returns at Christmas?", a: "Yes: most items bought 1 November to 25 December 2026 can be returned until 31 January 2027, or within 30 days of receipt if later." },
    ],
    holiday: "Holiday 2026: most items bought 1 November to 25 December 2026 can be returned until 31 January 2027 (or 30 days from receipt, whichever is later).",
    source: "https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },

  // ─── Middle East ───────────────────────────────────────────────────────────
  {
    slug: "noon",
    name: "noon",
    country: "United Arab Emirates",
    region: "me",
    category: "Online marketplace",
    headline: "15 days from receipt for eligible items",
    windowDays: 15,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 7, label: "Refurbished items end" },
      { day: 15, label: "Eligible items end" },
    ],
    summary:
      "noon UAE accepts eligible items back within 15 days of receiving the shipment; refurbished products have 7 days. Grocery and perishables can't be returned. Once the return reaches noon, processing takes up to 2 business days and the refund 5–7 business days.",
    facts: [
      { label: "Return window", value: "15 days from receipt (eligible items)" },
      { label: "Refurbished", value: "7 days" },
      { label: "Refund timing", value: "Up to 2 business days processing + 5–7 business days" },
      { label: "Refund to", value: "Card or noon wallet" },
    ],
    exceptions: ["Grocery, food and perishable items are not returnable.", "Only items marked as returnable qualify."],
    steps: ["Open the order in the noon app and choose Return.", "Hand the item to the courier at pickup."],
    tips: ["Look for the free-returns tag on the product page before buying."],
    faqs: [
      { q: "How many days do I have to return to noon?", a: "15 days from receipt for eligible items, 7 days for refurbished products." },
      { q: "How long does a noon refund take?", a: "Up to 2 business days to process the return, then 5–7 business days to reach your card or noon wallet." },
    ],
    source: "https://www.noon.com/uae-en/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "carrefour",
    name: "Carrefour UAE",
    country: "United Arab Emirates",
    region: "me",
    category: "Hypermarket",
    headline: "7 days from purchase or delivery",
    windowDays: 7,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 7, label: "Return window ends" },
    ],
    summary:
      "Carrefour UAE online orders can be exchanged or refunded within 7 days of purchase or delivery, in original condition with the seal, box, order confirmation and accessories. Phones, laptops, tablets, watches, jewellery, hygiene items and consumables can only be returned if defective.",
    facts: [
      { label: "Return window", value: "7 days from purchase or delivery" },
      { label: "How", value: "Pickup (delivery charge may apply) or at a Carrefour hypermarket" },
      { label: "Refund", value: "Original payment method; cash on delivery refunded in store" },
    ],
    exceptions: [
      "Mobile phones, laptops, tablets, hygiene items, consumables, watches and jewellery: only if defective, within 7 days.",
      "Bundles must be returned together.",
      "Marketplace sellers follow their own terms.",
    ],
    steps: ["Keep the seal, box, order confirmation, delivery note, accessories and free gifts.", "Arrange a pickup through customer service or take it to a Carrefour hypermarket."],
    tips: ["Don't break the seal on electronics until you are sure you are keeping them."],
    faqs: [
      { q: "What is Carrefour UAE's return policy?", a: "7 days from purchase or delivery, in original condition. Some categories are only returnable if defective." },
      { q: "Can I return a phone to Carrefour UAE?", a: "Only if it is defective and returned within 7 days." },
    ],
    source: "https://www.carrefouruae.com/mafuae/en/helpcenter/topics/216-terms-and-conditions?articleId=4222",
    checked: CHECKED,
  },

  // ─── South Asia ─────────────────────────────────────────────────────────────
  {
    slug: "daraz",
    name: "Daraz",
    country: "Pakistan",
    region: "south-asia",
    category: "Online marketplace",
    headline: "14 days from delivery; change of mind only in some categories",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 14, label: "Return request window ends" },
    ],
    summary:
      "Daraz Pakistan lets you raise a return within 14 days of delivery for all items. Change-of-mind returns are accepted only for selected categories, mainly fashion clothing, shoes and accessories and sports and travel apparel. Other returns need a valid reason such as a wrong, damaged or defective item.",
    facts: [
      { label: "Return window", value: "14 days from delivery (all items)" },
      { label: "Change of mind", value: "Only fashion clothing, shoes, accessories and sports/travel apparel" },
      { label: "Fashion condition", value: "Unworn, unwashed, unaltered, tags intact" },
      { label: "DarazMall", value: "14-day return policy" },
    ],
    exceptions: ["Change of mind does not apply to phones, beauty, appliances, groceries, home goods and most other categories.", "Overseas (non-DarazMall) items are excluded from change of mind."],
    steps: ["Go to My Orders in the Daraz app and choose Return.", "Pick the reason, then drop the parcel off or wait for pickup."],
    tips: ["Record a short video while unboxing expensive items, in case you need to prove damage."],
    faqs: [
      { q: "How many days does Daraz give for returns?", a: "14 days from delivery to raise a return request." },
      { q: "Can I return a Daraz item if I changed my mind?", a: "Only in selected categories such as fashion clothing, shoes and accessories. Other items need a reason like wrong, damaged or defective." },
    ],
    source: "https://www.daraz.pk/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "khaadi",
    name: "Khaadi",
    country: "Pakistan",
    region: "south-asia",
    category: "Clothing",
    headline: "14 days from delivery for online orders",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 7, label: "Sale items: exchange ends" },
      { day: 14, label: "Online orders end" },
    ],
    summary:
      "Khaadi's online stores (US, UK and UAE sites) accept returns within 14 days of delivery, with tags, original packaging and the order confirmation. Exchanges are done in stores, and sale items can only be exchanged within 7 days, in store.",
    facts: [
      { label: "Online orders", value: "14 days from delivery" },
      { label: "Condition", value: "Tags, original packaging, order confirmation" },
      { label: "Exchanges", value: "In store" },
      { label: "Sale items", value: "Exchange within 7 days, in store" },
    ],
    exceptions: ["Jewellery and hair accessories are excluded (US and UK sites).", "Fabrics and home items are not exchangeable on the UK site."],
    steps: ["Start the return from your order on the Khaadi site for your country.", "For exchanges, visit a Khaadi store with the item and order confirmation."],
    tips: ["Each country site has its own rules; use the one you ordered from."],
    faqs: [
      { q: "What is Khaadi's return policy?", a: "Online orders on Khaadi's US, UK and UAE sites can be returned within 14 days of delivery, with tags and packaging." },
      { q: "Can I return Khaadi sale items?", a: "Sale items can be exchanged within 7 days, in stores only." },
    ],
    unconfirmed: "We did not find a Pakistan-specific return window on pk.khaadi.com; check that site or a Khaadi store in Pakistan.",
    source: "https://www.khaadi.com/return-exchange.html",
    checked: CHECKED,
  },
  {
    slug: "alfatah",
    name: "Al-Fatah",
    country: "Pakistan",
    region: "south-asia",
    category: "Department store",
    headline: "No change-of-mind returns online; defects only, as store credit",
    windowDays: 7,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 2, label: "Report defects quickly" },
      { day: 7, label: "Exchange / replacement requests end" },
    ],
    summary:
      "Al-Fatah's online store does not accept returns for items that arrive as described. Defective items should be reported quickly (the shipping policy says within 48 hours; the FAQ allows 7 days from delivery), and returns are settled as online store credit.",
    facts: [
      { label: "Change of mind", value: "Not accepted online" },
      { label: "Defective items", value: "Report within 48 hours (shipping policy) / 7 days (FAQ)" },
      { label: "Refund form", value: "Online store credit" },
      { label: "Cash on delivery orders", value: "Refunds and exchanges at physical stores" },
    ],
    exceptions: ["Sale or promotional items are generally not eligible unless damaged.", "Personalised or altered items, used consumables and items without original packaging are excluded."],
    steps: ["Report the problem to customer service (info@alfatah.pk) with photos as soon as the parcel arrives.", "For COD orders, visit an Al-Fatah store."],
    tips: ["Open and check the parcel the same day it arrives, since the reporting window is short."],
    faqs: [
      { q: "Can I return an Al-Fatah online order?", a: "Only for verified defects or exceptional cases. Items that arrive as described cannot be returned." },
      { q: "Do I get cash back from Al-Fatah?", a: "Online returns are settled as store credit. COD orders are handled in physical stores." },
    ],
    unconfirmed: "Al-Fatah's pages disagree on the defect reporting window (48 hours vs 7 days), so report problems immediately.",
    source: "https://alfatah.pk/pages/shipping-exchange-policy",
    checked: CHECKED,
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    country: "India",
    region: "south-asia",
    category: "Online marketplace",
    headline: "Varies by category and seller: check the product page",
    windowDays: 10,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 3, label: "Winterwear ends" },
      { day: 7, label: "Electronics & some lifestyle end" },
      { day: 10, label: "Large appliances & furniture end" },
    ],
    summary:
      "Flipkart's return window depends on the category and the seller, and every product page shows the rule that applies. Flipkart's own help content gives examples: 3 days for winterwear, 7 days for electronics and some lifestyle items, and 10 days for large appliances and furniture. Many listings offer replacement only.",
    facts: [
      { label: "Winterwear", value: "3 days" },
      { label: "Electronics & some lifestyle", value: "7 days, packaging and tags intact" },
      { label: "Large appliances & furniture", value: "10 days" },
      { label: "Many listings", value: "Replacement only (e.g. 10 days) or 30-day replacement guarantee" },
    ],
    exceptions: ["The product page is the final word: some items show 'returns not permitted'."],
    steps: ["Open My Orders, choose the item and Return or Replace.", "Keep the original packaging and tags for the pickup check."],
    tips: ["Check the 'Return policy' line on the product page before buying, especially for electronics."],
    faqs: [
      { q: "How many days does Flipkart give for returns?", a: "It depends on the category and seller: for example 3 days for winterwear, 7 for electronics, 10 for large appliances. The product page shows the exact rule." },
      { q: "Does Flipkart replace instead of refund?", a: "Many listings offer replacement only, shown on the product page." },
    ],
    source: "https://stories.flipkart.com/flipkart-product-returns-process",
    checked: CHECKED,
  },
  {
    slug: "myntra",
    name: "Myntra",
    country: "India",
    region: "south-asia",
    category: "Online fashion",
    headline: "14 days from receiving the order",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Myntra accepts returns within 14 days of receiving the order. You can also exchange for a different size, or for a different product, from the Orders page; price differences are refunded or charged.",
    facts: [
      { label: "Return window", value: "14 days from receipt" },
      { label: "Exchange", value: "Different size or a different product, from Orders" },
      { label: "Price difference", value: "Credited back or paid at checkout" },
    ],
    exceptions: ["Offer and sale terms can change return and refund rules for specific items."],
    steps: ["Open Orders in the Myntra app, choose the item and Return or Exchange.", "Hand it over at pickup."],
    tips: ["Exchanging instead of returning gets you the right size faster."],
    faqs: [
      { q: "What is Myntra's return policy?", a: "14 days from receiving the order." },
      { q: "Can I exchange for a different product on Myntra?", a: "Yes, from the Orders page; price differences are refunded or charged." },
    ],
    source: "https://www.myntra.com/return",
    checked: CHECKED,
  },
  {
    slug: "ajio",
    name: "AJIO",
    country: "India",
    region: "south-asia",
    category: "Online fashion",
    headline: "Shown on each product; apparel and footwear 10 days in the policy",
    windowDays: 10,
    timeline: [
      { day: 0, label: "Delivery" },
      { day: 7, label: "Sunglasses & watches end" },
      { day: 10, label: "Apparel, accessories, footwear end" },
    ],
    summary:
      "AJIO's returns policy lists 10 days for apparel, accessories and footwear and 7 days for sunglasses and watches, but each product page can set its own window, and it is the final word. Refunds come 7–10 business days after approval.",
    facts: [
      { label: "Apparel, accessories, footwear", value: "10 days (policy page)" },
      { label: "Sunglasses & watches", value: "7 days" },
      { label: "Refund", value: "7–10 business days after approval, to source or AJIO Wallet" },
      { label: "Shipping charges", value: "Not refunded, except for defective or damaged items" },
    ],
    exceptions: ["Items must be unused with tags intact and pass the quality check.", "AJIO's FAQ pages mention 15 or 30 days; the product page decides."],
    steps: ["Go to My Orders, choose Return and pick a reason.", "Keep tags and packaging for the pickup check."],
    tips: ["Screenshot the return window shown on the product page when you order."],
    faqs: [
      { q: "How many days return does AJIO give?", a: "The product page shows it. AJIO's policy lists 10 days for apparel, accessories and footwear." },
      { q: "How long does an AJIO refund take?", a: "7–10 business days after the refund is approved." },
    ],
    unconfirmed: "AJIO's own pages give different general windows (10, 15 and 30 days); always use the window on the product page.",
    source: "https://www.ajio.com/return-refund-policy",
    checked: CHECKED,
  },
  {
    slug: "reliance-digital",
    name: "Reliance Digital",
    country: "India",
    region: "south-asia",
    category: "Electronics",
    headline: "See the official policy for your product",
    windowDays: null,
    timeline: [{ day: 0, label: "Purchase" }],
    summary:
      "Reliance Digital's Cancellation and Return Policy covers cancellations, returns, replacements and refunds, but the official page we could read did not state a single return window, so we don't list one. Items generally need to be unused and in original packaging with proof of purchase.",
    facts: [
      { label: "Return window", value: "Not stated on the official page we checked" },
      { label: "Condition", value: "Unused, original packaging, proof of purchase" },
    ],
    exceptions: ["Electronics often have brand-specific rules; check the product page or ask the store."],
    steps: ["Contact Reliance Digital customer care or the store with your invoice.", "Keep the item unused in its original packaging."],
    tips: ["Ask the store about the return or replacement window before you open the box."],
    faqs: [
      { q: "What is Reliance Digital's return window?", a: "The official policy page we checked did not state a single window. Check the product page or ask the store before buying." },
    ],
    unconfirmed: "No day count was confirmed on Reliance Digital's official policy page.",
    source: "https://www.reliancedigital.in/c/cancellation-and-return-policy",
    checked: CHECKED,
  },
];

export const POLICIES: VerifiedPolicy[] = [
  ...BASE_POLICIES,
  ...EUROPE_POLICIES,
  ...GULF_POLICIES,
  ...SOUTH_ASIA_POLICIES,
  ...AMERICAS_OCEANIA_POLICIES,
  ...MORE_POLICIES,
];

export const POLICY_BY_SLUG = new Map(POLICIES.map((p) => [p.slug, p]));
export function getPolicy(slug: string | undefined) {
  return slug ? POLICY_BY_SLUG.get(slug) : undefined;
}

export const REGIONS: { id: VerifiedPolicy["region"]; name: string }[] = [
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
  { id: "eu", name: "Europe" },
  { id: "ca", name: "Canada" },
  { id: "au", name: "Australia" },
  { id: "me", name: "Gulf (UAE & Saudi Arabia)" },
  { id: "south-asia", name: "Pakistan & India" },
  { id: "global", name: "Online marketplaces" },
];
