/**
 * gulf.ts - verified return policies for stores in the UAE and Saudi Arabia.
 * Checked on each retailer's official site on 2026-11-13 (notes: research/verified-2026-11.md).
 */
import type { VerifiedPolicy } from "../policies";

const CHECKED = "2026-11-13";

export const GULF_POLICIES: VerifiedPolicy[] = [
  {
    slug: "amazon-ae",
    name: "Amazon UAE",
    country: "United Arab Emirates",
    region: "me",
    category: "Online marketplace",
    headline: "15 days for most items; some up to 30",
    windowDays: 15,
    timeline: [
      { day: 0, label: "Received" },
      { day: 15, label: "Most items end" },
      { day: 30, label: "Longest category window" },
    ],
    summary:
      "Most items shipped by Amazon.ae can be returned within 15 days of receipt, and some categories get up to 30 days; the product page shows the exact window. Non-returnable items are marked on the product page. For marketplace sellers, an A-to-z Guarantee claim can be filed within 15 days of receipt.",
    facts: [
      { label: "Most items shipped by Amazon.ae", value: "15 days from receipt" },
      { label: "Some categories", value: "Up to 30 days" },
      { label: "Non-returnable items", value: "Marked on the product page" },
      { label: "Marketplace sellers", value: "A-to-z claim within 15 days of receipt" },
      { label: "Global Store", value: "15–30 days" },
    ],
    exceptions: ["Items marked non-returnable on the product page can't be returned for a change of mind."],
    steps: [
      "Go to Your Orders and choose Return or Replace Items.",
      "Pick a reason and a pickup or drop-off option.",
      "Pack the item with its accessories and hand it over.",
    ],
    tips: ["Look for the return window under the price on the product page before you buy."],
    faqs: [
      { q: "How many days does Amazon UAE give for returns?", a: "15 days from receipt for most items shipped by Amazon.ae; some categories get up to 30 days." },
      { q: "What if a marketplace seller won't help?", a: "You can file an A-to-z Guarantee claim within 15 days of receipt." },
      { q: "Are all items returnable on Amazon.ae?", a: "No. Non-returnable items are marked on the product page." },
    ],
    source: "https://www.amazon.ae/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },
  {
    slug: "amazon-sa",
    name: "Amazon Saudi Arabia",
    country: "Saudi Arabia",
    region: "me",
    category: "Online marketplace",
    headline: "15 days for most items; TVs and large appliances 30",
    windowDays: 15,
    timeline: [
      { day: 0, label: "Received" },
      { day: 15, label: "Most items end" },
      { day: 30, label: "TVs & large appliances end" },
    ],
    summary:
      "Most items shipped by Amazon.sa can be returned within 15 days of receipt, while some categories such as TVs and large appliances get 30 days. Third-party sellers set their own policy, with 15 days as the default. Refunds show in 3–5 business days.",
    facts: [
      { label: "Most items shipped by Amazon.sa", value: "15 days from receipt" },
      { label: "TVs, large appliances", value: "30 days" },
      { label: "Third-party sellers", value: "Own policy, default 15 days" },
      { label: "Global Store", value: "30 days (baby products 90)" },
      { label: "Refund time", value: "3–5 business days" },
    ],
    exceptions: ["Seller-fulfilled items may follow the seller's own rules."],
    steps: [
      "Open Your Orders and select Return or Replace Items.",
      "Choose a reason and a pickup slot.",
      "Hand the packed item to the courier.",
    ],
    tips: ["Check 'Ships from' and 'Sold by' on the product page: it decides whose policy applies."],
    faqs: [
      { q: "How long is Amazon Saudi Arabia's return window?", a: "15 days for most items, 30 days for some categories such as TVs and large appliances." },
      { q: "How long does an Amazon.sa refund take?", a: "3–5 business days to show after it's processed." },
      { q: "Do third-party sellers have the same policy?", a: "They set their own, with 15 days as the default." },
    ],
    source: "https://www.amazon.sa/-/en/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },
  {
    slug: "ikea-uae",
    name: "IKEA UAE",
    country: "United Arab Emirates",
    region: "me",
    category: "Furniture",
    headline: "90 days unopened; 120 days for IKEA Family",
    windowDays: 90,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 90, label: "Standard window ends" },
      { day: 120, label: "IKEA Family ends" },
    ],
    summary:
      "IKEA UAE accepts unopened items within 90 days, or 120 days for IKEA Family members, with the receipt and original packaging. Refunds go to the original payment method, but delivery and assembly charges are not refunded. Mattresses can be exchanged once within 90 days.",
    facts: [
      { label: "Unopened items", value: "90 days" },
      { label: "IKEA Family members", value: "120 days" },
      { label: "Needed", value: "Receipt and original packaging; ID may be requested" },
      { label: "Refund to", value: "Original payment method" },
      { label: "Mattresses", value: "One exchange within 90 days" },
    ],
    exceptions: [
      "Delivery and assembly fees are not refunded.",
      "Items must be unopened, unlike IKEA in the US and UK.",
    ],
    steps: [
      "Keep the item unopened in its packaging.",
      "Bring it with the receipt (and ID if asked) to an IKEA store.",
      "The refund goes to your original payment method.",
    ],
    tips: ["Join IKEA Family for free before you buy to get 120 days."],
    faqs: [
      { q: "How long is IKEA UAE's return policy?", a: "90 days for unopened items, 120 days for IKEA Family members." },
      { q: "Can I return assembled IKEA furniture in the UAE?", a: "IKEA UAE's policy covers unopened items, so assembled furniture generally can't be returned for a change of mind." },
      { q: "Are delivery charges refunded?", a: "No, delivery and assembly charges are not refunded." },
    ],
    source: "https://www.ikea.com/ae/en/customer-service/returns-claims/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "sephora-uae",
    name: "Sephora UAE",
    country: "United Arab Emirates",
    region: "me",
    category: "Beauty",
    headline: "14 days; sale items 3 days",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 3, label: "Sale items end" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Sephora Middle East accepts returns in the UAE within 14 days of purchase (or delivery for online orders), and only 3 days for sale items. Products must be unused and unopened in the original packaging, with the invoice. You can get a card refund or store credit valid for one year.",
    facts: [
      { label: "Return window", value: "14 days" },
      { label: "Sale items", value: "3 days" },
      { label: "Condition", value: "Unused, unopened, original packaging, invoice" },
      { label: "Refund", value: "To card (up to 14 days) or store credit valid 1 year" },
      { label: "Online orders", value: "Can be returned in UAE stores" },
    ],
    exceptions: [
      "Personalised items are not returnable.",
      "Opened products can't be returned, unlike Sephora in the US.",
    ],
    steps: [
      "Keep the product sealed and find your invoice.",
      "Return in a Sephora store in the UAE or start an online return.",
      "Choose a card refund or store credit.",
    ],
    tips: ["Sale items have only 3 days; decide quickly."],
    faqs: [
      { q: "Can I return opened Sephora products in the UAE?", a: "No. Sephora UAE accepts unused, unopened products only." },
      { q: "How long do I have to return to Sephora UAE?", a: "14 days, or 3 days for sale items." },
      { q: "Can I return an online order in a Sephora store?", a: "Yes, in Sephora stores in the UAE." },
    ],
    source: "https://www.sephora.me/ae-en/faq/cancellation-and-refund",
    checked: CHECKED,
  },
  {
    slug: "namshi",
    name: "Namshi",
    country: "United Arab Emirates",
    region: "me",
    category: "Online fashion",
    headline: "14 days, free returns",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Received" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Namshi gives 14 days from receiving your order to return eligible items for free. Items must be unused, unworn and unwashed with tags and the original packaging. A removed or tampered security tag can lead to rejection or a deduction of up to 30% (up to 70% if the loop is missing).",
    facts: [
      { label: "Return window", value: "14 days from receipt" },
      { label: "Cost", value: "Free" },
      { label: "Security tag removed", value: "Rejection or up to 30% deducted (70% if loop missing)" },
      { label: "Pickup (UAE)", value: "Within 2 days" },
      { label: "Refund", value: "Started 2 days after pickup; cards 5–7 business days" },
    ],
    exceptions: [
      "Beauty and hygiene items are not returnable.",
      "Repeated returns may bring fees.",
    ],
    steps: [
      "Request the return in the Namshi app within 14 days.",
      "Keep the security tag on and pack with all tags.",
      "Hand the parcel to the courier at pickup.",
    ],
    tips: ["Never cut the Namshi security tag until you're keeping the item."],
    faqs: [
      { q: "Are Namshi returns free?", a: "Yes, for eligible items within 14 days." },
      { q: "What if I removed the security tag?", a: "Namshi can reject the return or deduct up to 30%, or up to 70% if the loop is missing." },
      { q: "How long does a Namshi refund take?", a: "It starts 2 days after pickup; card refunds take 5–7 business days." },
    ],
    source: "https://www.namshi.com/uae-en/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "centrepoint",
    name: "Centrepoint",
    country: "United Arab Emirates",
    region: "me",
    category: "Department store",
    headline: "14 days: online refunds, in-store exchanges",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Centrepoint gives a refund on online orders returned within 14 days of delivery, and an exchange on store purchases within 14 days. Items must be new and unused, in original packaging with the invoice and tags. Credit notes are valid for six months.",
    facts: [
      { label: "Online orders", value: "Refund within 14 days of delivery" },
      { label: "Store purchases", value: "Exchange within 14 days" },
      { label: "Condition", value: "New, unused, packaging, invoice, tags" },
      { label: "Credit note", value: "Valid 6 months" },
      { label: "Bank refund time", value: "2–15 business days" },
    ],
    exceptions: [
      "Online orders can't be exchanged directly.",
      "Store exchanges exclude toiletries, cosmetics, jewellery, perfume, lingerie, underwear and fashion accessories.",
    ],
    steps: [
      "Online: request the return in your account within 14 days.",
      "In store: bring the item, tags and invoice for an exchange.",
      "Card refunds take 2–15 business days.",
    ],
    tips: ["If you need a different size of an online order, return it and reorder."],
    faqs: [
      { q: "Does Centrepoint give refunds?", a: "On online orders, yes, within 14 days of delivery. Store purchases are exchanged." },
      { q: "How long is a Centrepoint credit note valid?", a: "Six months." },
      { q: "Can I exchange perfume at Centrepoint?", a: "No, perfume is excluded from store exchanges." },
    ],
    source: "https://www.centrepointstores.com/ae/en/termsandconditions",
    checked: CHECKED,
  },
  {
    slug: "sharaf-dg",
    name: "Sharaf DG",
    country: "United Arab Emirates",
    region: "me",
    category: "Electronics",
    headline: "14 days; restocking fee on opened items",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Collected / delivered" },
      { day: 7, label: "Open-box units end" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Sharaf DG accepts returns within 14 days of collection or home delivery. Opened items carry a restocking fee, and refunds take 7–14 business days after the return. Open-box and display units have 7-day returns and a 6-month warranty.",
    facts: [
      { label: "Return window", value: "14 days" },
      { label: "Opened items", value: "Restocking fee" },
      { label: "Open-box / display units", value: "7 days, 6-month warranty" },
      { label: "Refund time", value: "7–14 business days" },
    ],
    exceptions: [
      "Opened personal care and hygiene products are not returnable.",
      "Service, delivery and installation charges are not refunded.",
    ],
    steps: [
      "Decide before opening if you can; opened items cost a fee.",
      "Bring the product, packaging and invoice to a Sharaf DG store.",
      "Wait 7–14 business days for the refund.",
    ],
    tips: ["Ask the restocking fee amount in store before opening an expensive item."],
    faqs: [
      { q: "How long is Sharaf DG's return policy?", a: "14 days from collection or delivery." },
      { q: "Does Sharaf DG charge a restocking fee?", a: "Yes, on opened items." },
      { q: "Can I return an open-box item?", a: "Yes, within 7 days." },
    ],
    source: "https://uae.sharafdg.com/return-exchange-and-warranty/",
    checked: CHECKED,
  },
  {
    slug: "jarir",
    name: "Jarir Bookstore",
    country: "Saudi Arabia",
    region: "me",
    category: "Electronics",
    headline: "Return in 3 days, exchange in 7",
    windowDays: 7,
    timeline: [
      { day: 0, label: "Purchase / received" },
      { day: 3, label: "Return ends" },
      { day: 7, label: "Exchange ends" },
    ],
    summary:
      "Jarir accepts returns within 3 days and exchanges within 7 days of purchase, counted from receiving the order for online purchases. Books, electronics, software, video games and prepaid cards are excluded unless they have a manufacturing defect. Refunds may be issued as vouchers or account points.",
    facts: [
      { label: "Return", value: "3 days" },
      { label: "Exchange", value: "7 days" },
      { label: "Needed", value: "Original packaging and invoice" },
      { label: "Defective devices", value: "Replaced within 3 days if no scratches or misuse" },
      { label: "Refund form", value: "May be vouchers or account points" },
    ],
    exceptions: ["Books, electronics, software, video games and prepaid cards are excluded unless defective."],
    steps: [
      "Act within 3 days for a return, 7 for an exchange.",
      "Bring the invoice and full original packaging.",
      "Defective devices: report within 3 days for a replacement.",
    ],
    tips: ["Test electronics on day one: the change-of-mind route isn't available for them."],
    faqs: [
      { q: "How long is Jarir's return policy?", a: "3 days for returns and 7 days for exchanges." },
      { q: "Can I return a phone to Jarir?", a: "Electronics are excluded unless there's a manufacturing defect." },
      { q: "Do Jarir refunds go to my card?", a: "Refunds may be given as vouchers or account points." },
    ],
    source: "https://www.jarir.com/sa-en/customer-care/return-and-exchange",
    checked: CHECKED,
  },
];
