/**
 * americas-oceania.ts - verified return policies for more stores in Canada and Australia.
 * Checked on each retailer's official site on 2026-11-13 (notes: research/verified-2026-11.md).
 */
import type { VerifiedPolicy } from "../policies";

const CHECKED = "2026-11-13";

export const AMERICAS_OCEANIA_POLICIES: VerifiedPolicy[] = [
  {
    slug: "amazon-ca",
    name: "Amazon Canada",
    country: "Canada",
    region: "ca",
    category: "Online marketplace",
    headline: "30 days from delivery",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivered" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Amazon.ca accepts most items back within 30 days of delivery in original or unused condition, and Amazon devices within 30 days in new condition. Final Sale items, perishables, pet medication and some digital products are not returnable. A fee can be charged if an item comes back damaged.",
    facts: [
      { label: "Return window", value: "30 days from delivery" },
      { label: "Condition", value: "Original or unused" },
      { label: "Amazon devices", value: "30 days, new condition" },
      { label: "Damage", value: "A fee may be deducted" },
    ],
    exceptions: ["Final Sale items, perishables, pet medication and some digital products are not returnable."],
    steps: [
      "Go to Your Orders and select Return or Replace Items.",
      "Print the label or get a QR code.",
      "Drop the parcel off within the window.",
    ],
    tips: ["Check for 'Final Sale' on the product page before buying."],
    faqs: [
      { q: "How long is Amazon Canada's return policy?", a: "30 days from delivery for most items." },
      { q: "Can I return Final Sale items on Amazon.ca?", a: "No." },
      { q: "Can Amazon.ca deduct money from my refund?", a: "Yes, if the item is returned damaged or not in its original condition." },
    ],
    source: "https://www.amazon.ca/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },
  {
    slug: "canadian-tire",
    name: "Canadian Tire",
    country: "Canada",
    region: "ca",
    category: "Department store",
    headline: "90 days unopened with a receipt",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Electronics & e-scooters end" },
      { day: 90, label: "Most items end" },
    ],
    summary:
      "Canadian Tire accepts most unopened items in their original packaging within 90 days with a receipt. Electronics, e-scooters and gas-powered outdoor equipment have 30 days. Card purchases can be looked up without a receipt within 90 days, and photo ID may be required.",
    facts: [
      { label: "Most items", value: "90 days, unopened, with receipt" },
      { label: "Electronics, e-scooters, gas outdoor equipment", value: "30 days" },
      { label: "No receipt", value: "Card purchases can be looked up within 90 days" },
      { label: "ID", value: "Photo ID may be required" },
    ],
    exceptions: ["Opened or damaged items may be refused.", "Delivery fees are not refunded."],
    steps: [
      "Keep the item unopened in its packaging.",
      "Bring the receipt, or the card you paid with.",
      "Return at any Canadian Tire store; bring photo ID.",
    ],
    tips: ["Pay by card so the purchase can be found if you lose the receipt."],
    faqs: [
      { q: "How long is Canadian Tire's return policy?", a: "90 days for most unopened items with a receipt; 30 days for electronics, e-scooters and gas outdoor equipment." },
      { q: "Can I return to Canadian Tire without a receipt?", a: "Card purchases can be looked up within 90 days." },
      { q: "Are delivery fees refunded?", a: "No." },
    ],
    source: "https://www.canadiantire.ca/en/customer-service/returns.html",
    checked: CHECKED,
  },
  {
    slug: "best-buy-ca",
    name: "Best Buy Canada",
    country: "Canada",
    region: "ca",
    category: "Electronics",
    headline: "30 days; carrier-plan phones 15",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 15, label: "Carrier-plan phones end" },
      { day: 30, label: "Most items end" },
    ],
    summary:
      "Best Buy Canada gives 30 days to return most products: from purchase in store, from delivery online. Phones on a carrier plan have 15 days (30 for persons with a disability). Products must be like new in the original packaging, and some opened cameras, drones, lenses and projectors carry a 15% restocking fee.",
    facts: [
      { label: "Most products", value: "30 days" },
      { label: "Carrier-plan phones", value: "15 days (30 for persons with a disability)" },
      { label: "Restocking fee", value: "15% on some opened cameras, drones, lenses, projectors" },
      { label: "Marketplace items", value: "Returned to the seller by mail" },
    ],
    exceptions: ["Gift cards and digital downloads are not returnable."],
    steps: [
      "Repack the product like new with all accessories.",
      "Return in store or start an online return.",
      "Marketplace items go back to the seller by mail.",
    ],
    tips: ["Canada gets 30 days, double the US Best Buy standard of 15."],
    faqs: [
      { q: "How long is Best Buy Canada's return policy?", a: "30 days for most products; 15 days for phones on a carrier plan." },
      { q: "Does Best Buy Canada charge a restocking fee?", a: "15% on some opened cameras, drones, lenses and projectors." },
      { q: "What is Best Buy Canada's holiday return policy?", a: "Items bought November 2 to December 31, 2026 can be returned until January 10, 2027, or within the standard period if later." },
    ],
    holiday: "Items bought November 2 to December 31, 2026 can be returned until January 10, 2027, or within the standard period if that is later.",
    source: "https://www.bestbuy.ca/en-ca/help/returns-and-exchanges/best-buy-return-and-exchange-policies",
    checked: CHECKED,
  },
  {
    slug: "kmart-au",
    name: "Kmart Australia",
    country: "Australia",
    region: "au",
    category: "Department store",
    headline: "60 days change of mind; 365 for OnePass",
    windowDays: 60,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 60, label: "Change of mind ends" },
      { day: 365, label: "OnePass members end" },
    ],
    summary:
      "Kmart Australia accepts change-of-mind returns within 60 days with proof of purchase, for unused items in their original packaging. OnePass members get 365 days, though returns after day 60 are paid as an exchange voucher. Refunds go to the original payment method within up to 5 business days.",
    facts: [
      { label: "Change of mind", value: "60 days" },
      { label: "OnePass members", value: "365 days (exchange voucher after day 60)" },
      { label: "Marketplace items", value: "30 days, back to the seller" },
      { label: "Refund", value: "Original payment, up to 5 business days" },
    ],
    exceptions: [
      "Event products, such as Christmas and Easter items, are excluded from the OnePass extension.",
      "Delivery fees are not refunded.",
    ],
    steps: [
      "Bring the item unused with its packaging and proof of purchase.",
      "Return at any Kmart store or by post for online orders.",
      "OnePass members: show your membership.",
    ],
    tips: ["Faulty items are covered by the Australian Consumer Law, beyond these windows."],
    faqs: [
      { q: "How long is Kmart Australia's return policy?", a: "60 days for change of mind; 365 days for OnePass members." },
      { q: "What happens after 60 days with OnePass?", a: "You get an exchange voucher instead of a refund." },
      { q: "Are marketplace items covered?", a: "They have 30 days and go back to the seller." },
    ],
    source: "https://www.kmart.com.au/change-of-mind-returns-policy/",
    checked: CHECKED,
  },
  {
    slug: "jb-hi-fi",
    name: "JB Hi-Fi",
    country: "Australia",
    region: "au",
    category: "Electronics",
    headline: "30 days unopened; CDs, DVDs and games 90",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Most items end" },
      { day: 90, label: "CDs, DVDs, games end" },
    ],
    summary:
      "JB Hi-Fi accepts change-of-mind returns within 30 days for unused, unopened items, and 90 days for CDs, DVDs and games. Headphones and wearables must still be sealed. Unpacked but unused items are accepted at JB Hi-Fi's discretion with a 20% restocking fee.",
    facts: [
      { label: "Most items", value: "30 days, unused and unopened" },
      { label: "CDs, DVDs, games", value: "90 days" },
      { label: "Headphones, wearables", value: "Must be sealed" },
      { label: "Unpacked but unused", value: "At discretion, 20% restocking fee" },
      { label: "Marketplace", value: "30 days, buyer pays return postage" },
    ],
    exceptions: ["PC games and software can't be refunded.", "Delivery fees are not refunded."],
    steps: [
      "Keep the product sealed if you might return it.",
      "Bring it to a JB Hi-Fi store with proof of purchase.",
      "Faulty items are handled under the Australian Consumer Law.",
    ],
    tips: ["Opening the box can cost 20%; decide before you unwrap."],
    faqs: [
      { q: "How long is JB Hi-Fi's return policy?", a: "30 days for unused, unopened items, 90 for CDs, DVDs and games." },
      { q: "Does JB Hi-Fi charge a restocking fee?", a: "20% on unpacked but unused items, accepted at its discretion." },
      { q: "Can I return opened headphones?", a: "No, headphones and wearables must be sealed for a change-of-mind return." },
    ],
    source: "https://support.jbhifi.com.au/hc/en-au/articles/360053005194-Refunds-Warranties-guide",
    checked: CHECKED,
  },
  {
    slug: "myer",
    name: "Myer",
    country: "Australia",
    region: "au",
    category: "Department store",
    headline: "30 days change of mind",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Myer accepts change-of-mind returns within 30 days for items in their original condition with proof of purchase. Purchases made in November and December can be returned until 31 January. Exchanges are for in-store purchases only; online orders are refunded.",
    facts: [
      { label: "Change of mind", value: "30 days" },
      { label: "Holiday", value: "November–December purchases until 31 January" },
      { label: "Exchanges", value: "In-store purchases only" },
      { label: "Online orders", value: "Refunded" },
    ],
    exceptions: [
      "Clearance items, Big & Bulky, custom items, alcohol, hosiery, personal care, perishables and gift cards are excluded.",
    ],
    steps: [
      "Keep the item unworn with tags and proof of purchase.",
      "Return in a Myer store or by post for online orders.",
      "Faults are covered under the Australian Consumer Law.",
    ],
    tips: ["Clearance items can't come back, so check the tag before buying."],
    faqs: [
      { q: "How long is Myer's return policy?", a: "30 days for change of mind." },
      { q: "Does Myer extend returns at Christmas?", a: "Yes, November and December purchases can be returned until 31 January." },
      { q: "Can I exchange an online order at Myer?", a: "No, online orders are refunded; exchanges are for in-store purchases." },
    ],
    holiday: "Purchases made in November and December 2026 can be returned until 31 January 2027.",
    source: "https://www.myer.com.au/content/returns-exchanges",
    checked: CHECKED,
  },
];
