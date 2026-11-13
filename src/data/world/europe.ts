/**
 * europe.ts - verified return policies for stores in the United Kingdom and the European Union.
 * Checked on each retailer's official site on 2026-11-13 (notes: research/verified-2026-11.md).
 */
import type { VerifiedPolicy } from "../policies";

const CHECKED = "2026-11-13";

export const EUROPE_POLICIES: VerifiedPolicy[] = [
  // ─── United Kingdom ─────────────────────────────────────────────────────────
  {
    slug: "ikea-uk",
    name: "IKEA UK",
    country: "United Kingdom",
    region: "uk",
    category: "Furniture",
    headline: "365 days: unopened for a refund, opened for a refund card",
    windowDays: 365,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 14, label: "Online cancellation right ends" },
      { day: 365, label: "Return window ends" },
    ],
    summary:
      "IKEA UK gives 365 days to return most products. Unopened items in good condition get a full refund, while opened or assembled items are refunded on an IKEA refund card. Mattresses can be exchanged once within 365 days under the Sleep On It promise. Food, cut flowers and plants, and custom-made items are excluded.",
    facts: [
      { label: "Return window", value: "365 days" },
      { label: "Unopened items", value: "Full refund to the original payment" },
      { label: "Opened or assembled", value: "Refund card (good condition, at IKEA's discretion)" },
      { label: "Mattresses", value: "One exchange within 365 days" },
      { label: "Proof of purchase", value: "Needed; without it a return may be refused or paid on a refund card" },
      { label: "Online orders", value: "Also have the 14-day legal cancellation right" },
    ],
    exceptions: [
      "Food and drink, cut flowers and plants are not returnable.",
      "Custom-made products, such as made-to-measure worktops, are excluded.",
      "Damaged or heavily used products can be refused.",
    ],
    steps: [
      "Find your receipt or the order confirmation in your IKEA account.",
      "Repack the product; unopened items get a full refund.",
      "Take it to an IKEA store, or book a collection from your order page for large items.",
      "The refund goes to your payment method, or to a refund card for opened items.",
    ],
    tips: [
      "Keep flat-pack boxes until you're sure: unopened means a refund, not a card.",
      "Losing the receipt is costly here; save the email receipt or use an IKEA Family card.",
      "The mattress exchange is once only, so test it properly before you swap.",
    ],
    faqs: [
      {
        q: "How long do I have to return something to IKEA UK?",
        a: "365 days. Unopened products get a full refund; opened or assembled ones are refunded on a refund card if they are in good condition.",
      },
      {
        q: "Can I return assembled IKEA furniture in the UK?",
        a: "Yes, within 365 days, if it is in good condition. Assembled items are refunded on an IKEA refund card rather than to your card.",
      },
      {
        q: "Can I return an IKEA mattress?",
        a: "IKEA UK allows one mattress exchange within 365 days of purchase.",
      },
    ],
    source: "https://www.ikea.com/gb/en/customer-service/returns-claims/return-policy/",
    checked: CHECKED,
  },
  {
    slug: "zara-uk",
    name: "Zara UK",
    country: "United Kingdom",
    region: "uk",
    category: "Clothing",
    headline: "30 days, free in any Zara store",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Shipped / bought" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Zara UK gives 30 days to return items: counted from the shipping date for online orders and from the purchase date in store. Returning in any Zara store in the UK is free. If you use a drop-off point instead, Zara deducts the return cost from your refund.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "Counted from", value: "Shipping date (online) or purchase date (store)" },
      { label: "In store", value: "Free, any Zara store in the UK" },
      { label: "Drop-off point", value: "Return cost deducted from the refund" },
      { label: "Refund to", value: "Original payment method" },
    ],
    exceptions: [
      "Items must be in the condition you received them, with labels attached.",
      "Returns must go back in the same country where you ordered.",
    ],
    steps: [
      "Open your order in the Zara app or account and choose the items to return.",
      "Pick store return (free) or drop-off point (fee deducted).",
      "Pack the items with their labels and the return code.",
      "Your refund is issued to the original payment method once the return is checked.",
    ],
    tips: [
      "The 30 days start when Zara ships the order, not when it arrives, so don't wait.",
      "Use a store if one is nearby: it costs nothing.",
    ],
    faqs: [
      {
        q: "Are Zara returns free in the UK?",
        a: "In store, yes. Drop-off point returns have the return cost taken off your refund.",
      },
      {
        q: "How many days do I have to return to Zara UK?",
        a: "30 days from the shipping date for online orders, or from the purchase date for store purchases.",
      },
      {
        q: "Can I return a Zara online order in a store?",
        a: "Yes, in any Zara store in the UK, free of charge.",
      },
    ],
    source: "https://www.zara.com/uk/en/help-center/HowToReturn",
    checked: CHECKED,
  },
  {
    slug: "hm-uk",
    name: "H&M UK",
    country: "United Kingdom",
    region: "uk",
    category: "Clothing",
    headline: "30 days; sale and designer collections 14 days",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Order received" },
      { day: 14, label: "Sale & designer end" },
      { day: 30, label: "Full-price items end" },
    ],
    summary:
      "H&M UK gives 30 days after you receive an order to register a return, or 14 days for sale items and designer collaborations. Returning in an H&M store is free, while online returns cost £2.99 for each brand you send back. The 30 days are the legal 14-day cancellation period plus 16 extra days for full-price items.",
    facts: [
      { label: "Full-price items", value: "30 days from receipt" },
      { label: "Sale & designer collections", value: "14 days" },
      { label: "In store", value: "Free" },
      { label: "Online return fee", value: "£2.99 per brand returned" },
      { label: "Legal basis", value: "14-day cancellation right + 16 extra days" },
    ],
    exceptions: [
      "Sale items and designer collaborations only get 14 days.",
      "Hygiene items such as underwear and pierced jewellery have stricter rules; check the product page.",
    ],
    steps: [
      "Register the return in your H&M account within the window.",
      "Choose a store return (free) or an online return (£2.99 per brand).",
      "Pack items unworn with tags attached.",
      "Refunds go back to your original payment method.",
    ],
    tips: [
      "Check whether an item was sale or full price: the deadline is 14 or 30 days.",
      "Returning several items from one brand together costs one fee, not one per item.",
    ],
    faqs: [
      {
        q: "Is it free to return H&M online orders in the UK?",
        a: "Only in store. Online returns cost £2.99 for each brand returned.",
      },
      {
        q: "How long do you have to return H&M sale items in the UK?",
        a: "14 days after you receive them. Full-price items get 30 days.",
      },
      {
        q: "Can I return H&M online orders in store?",
        a: "Yes, and store returns are free.",
      },
    ],
    source: "https://www2.hm.com/en_gb/customer-service/returns.html",
    checked: CHECKED,
  },
  {
    slug: "apple-uk",
    name: "Apple UK",
    country: "United Kingdom",
    region: "uk",
    category: "Electronics",
    headline: "14 days from the day you receive it",
    windowDays: 14,
    timeline: [
      { day: 0, label: "Received" },
      { day: 14, label: "Return window ends" },
    ],
    summary:
      "Products bought from the Apple Store in the UK can be returned within 14 days of taking possession. Refunds go back to the original payment method. Apple may reduce the refund if a product is returned damaged or shows more handling than needed to check it.",
    facts: [
      { label: "Return window", value: "14 days from taking possession" },
      { label: "Refund to", value: "Original payment method" },
      { label: "Condition", value: "Damage or excess handling can reduce the refund" },
      { label: "Where", value: "Within the UK, in store or by arranging a return online" },
    ],
    exceptions: [
      "Returns are handled in the UK only.",
      "A product returned damaged may be refunded at a reduced amount.",
    ],
    steps: [
      "Start the return from your Apple order page, or visit an Apple Store.",
      "Back up and erase the device, then sign out of Find My.",
      "Pack it with all accessories and the box.",
      "The refund is made to the card or payment method you used.",
    ],
    tips: [
      "Keep the box and all accessories for the first 14 days.",
      "Turn off Find My before returning, or the return can be delayed.",
    ],
    faqs: [
      {
        q: "How long is Apple's return policy in the UK?",
        a: "14 days from the day you receive the product.",
      },
      {
        q: "Will Apple UK refund a used product?",
        a: "Apple may reduce the refund if the product is damaged or has been handled more than needed to inspect it.",
      },
      {
        q: "Is Apple UK's return policy the same as in the US?",
        a: "Both give 14 days, but they are separate stores: return a UK purchase in the UK.",
      },
    ],
    source: "https://www.apple.com/uk/shop/help/returns_refund",
    checked: CHECKED,
  },
  {
    slug: "argos",
    name: "Argos",
    country: "United Kingdom",
    region: "uk",
    category: "Department store",
    headline: "30 days to request, then 30 days to send it back",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Delivered / collected" },
      { day: 30, label: "Request deadline" },
    ],
    summary:
      "Argos lets you request a return within 30 days of delivery or collection, and then gives you 30 days to return the item. Items should be unused, in the original packaging, with proof of purchase. Items from Trusted Sellers go back through the online returns portal, not to Argos stores.",
    facts: [
      { label: "Request a return", value: "Within 30 days of delivery or collection" },
      { label: "Send it back", value: "Within 30 days of the request" },
      { label: "Condition", value: "Unused, original packaging, proof of purchase" },
      { label: "Large-item collection", value: "£30 unless faulty" },
      { label: "Refund time", value: "Up to 5 working days to your card" },
      { label: "Trusted Seller items", value: "Returns portal only, not stores" },
    ],
    exceptions: [
      "Delivery charges are refunded only when the whole order is returned.",
      "Trusted Seller items cannot be returned in Argos stores.",
    ],
    steps: [
      "Request the return within 30 days, online or in store.",
      "Repack the item unused in its original packaging.",
      "Return it in a store, or book a collection (£30 for large items).",
      "The refund reaches your card within about 5 working days.",
    ],
    tips: [
      "Check whether the item was sold by a Trusted Seller before going to a store.",
      "Faulty large items are collected free; change-of-mind collections cost £30.",
    ],
    faqs: [
      {
        q: "How long do I have to return to Argos?",
        a: "Request the return within 30 days of delivery or collection, then return the item within 30 days of the request.",
      },
      {
        q: "Can I return a Trusted Seller item to an Argos store?",
        a: "No. Trusted Seller items are returned through the online returns portal.",
      },
      {
        q: "How long does an Argos refund take?",
        a: "Card refunds can take up to 5 working days.",
      },
    ],
    holiday: "Trusted Seller items bought 23 September to 25 December 2026 can be returned until 31 January 2027.",
    source: "https://help.argos.co.uk/help/terms-and-conditions/terms-&-conditions/3907544526653875560",
    checked: CHECKED,
  },
  {
    slug: "marks-and-spencer",
    name: "Marks & Spencer",
    country: "United Kingdom",
    region: "uk",
    category: "Department store",
    headline: "28 days; sale items 14 days",
    windowDays: 28,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 14, label: "Sale items end" },
      { day: 28, label: "Return window ends" },
    ],
    summary:
      "Marks & Spencer accepts returns within 28 days in the UK, or 14 days for sale items. Returns outside those dates are not accepted. In the Republic of Ireland the window is 35 days.",
    facts: [
      { label: "Return window (UK)", value: "28 days" },
      { label: "Sale items", value: "14 days" },
      { label: "Ireland", value: "35 days" },
      { label: "Late returns", value: "Not accepted outside the dates" },
    ],
    exceptions: [
      "Sale items have only 14 days.",
      "Returns after the deadline are refused, with no store-credit fallback stated.",
    ],
    steps: [
      "Check the purchase date: 28 days, or 14 for sale items.",
      "Bring the item and your receipt or order details to an M&S store, or return by post.",
      "Refunds go back to your original payment.",
    ],
    tips: [
      "Put the deadline in your phone: M&S does not accept late returns.",
      "Shopping in Ireland? You get 35 days there.",
    ],
    faqs: [
      {
        q: "How long is the M&S return policy?",
        a: "28 days in the UK, 14 days for sale items, and 35 days in the Republic of Ireland.",
      },
      {
        q: "Will M&S accept a return after 28 days?",
        a: "No. M&S says returns are not accepted outside the stated dates.",
      },
      {
        q: "Can I return M&S sale items?",
        a: "Yes, within 14 days.",
      },
    ],
    source: "https://www.marksandspencer.com/help-and-support/returns-and-refunds",
    checked: CHECKED,
  },
  {
    slug: "next",
    name: "Next",
    country: "United Kingdom",
    region: "uk",
    category: "Clothing",
    headline: "28 days; sale and clearance 7 days",
    windowDays: 28,
    timeline: [
      { day: 0, label: "Delivered / bought" },
      { day: 7, label: "Sale & clearance end" },
      { day: 28, label: "Return window ends" },
    ],
    summary:
      "Next gives 28 days to return most items to a mainline store or by post, counted from the day after delivery for online orders. Sale items, outlet and clearance purchases and Christmas decorations have only 7 days. Late returns get an eVoucher valid for six months instead of a refund.",
    facts: [
      { label: "Most items", value: "28 days" },
      { label: "Sale, outlet, clearance", value: "7 days" },
      { label: "Late returns", value: "eVoucher valid 6 months" },
      { label: "Card refunds in store", value: "Bring the card and the cardholder" },
      { label: "Airport stores", value: "No returns" },
    ],
    exceptions: [
      "Swimwear and underwear only if unworn and unused, or faulty.",
      "Made-to-measure items and assembled furniture are not returnable unless faulty.",
      "Airport stores do not accept returns.",
    ],
    steps: [
      "Check whether the item was full price (28 days) or sale/clearance (7 days).",
      "Return to a mainline Next store or book a return in your account.",
      "For a card refund in store, bring the card used and the cardholder.",
      "Refunds go to the original payment; late returns get an eVoucher.",
    ],
    tips: [
      "Sale items have a very short window; try them on the day they arrive.",
      "An eVoucher expires after six months, so return on time to keep cash.",
    ],
    faqs: [
      {
        q: "How long do I have to return to Next?",
        a: "28 days for most items. Sale, outlet, clearance and Christmas decorations have 7 days.",
      },
      {
        q: "What happens if I return to Next late?",
        a: "Next gives an eVoucher valid for six months instead of a refund.",
      },
      {
        q: "Can I return to a Next airport store?",
        a: "No. Airport stores don't accept returns.",
      },
    ],
    source: "https://zendesk.next.co.uk/hc/en-gb/articles/16963491072913-Our-Returns-Policy",
    checked: CHECKED,
  },
  {
    slug: "asos",
    name: "ASOS",
    country: "United Kingdom",
    region: "uk",
    category: "Online fashion",
    headline: "28 days; free for account holders on qualifying orders",
    windowDays: 28,
    timeline: [
      { day: 0, label: "Delivered" },
      { day: 28, label: "Return window ends" },
    ],
    summary:
      "ASOS gives 28 days from delivery to return items. Returns are free for account holders on qualifying orders, but under its Fair Use Policy ASOS may charge £3.95, and guest orders always pay £3.95. Refunds are made within 14 days of ASOS receiving the return.",
    facts: [
      { label: "Return window", value: "28 days from delivery" },
      { label: "Account holders", value: "Free on qualifying orders" },
      { label: "Fair Use Policy", value: "May deduct £3.95" },
      { label: "Guest orders", value: "£3.95 per return" },
      { label: "Refund time", value: "Within 14 days of receipt" },
      { label: "Brand Partner items", value: "Free, sent back to the brand" },
    ],
    exceptions: [
      "Frequent returners may be charged under the Fair Use Policy.",
      "Brand Partner items go back to the brand, not ASOS.",
    ],
    steps: [
      "Start the return in My Orders within 28 days.",
      "Pack items unworn with labels attached.",
      "Drop the parcel at the chosen carrier point.",
      "Expect the refund within 14 days of ASOS receiving it.",
    ],
    tips: [
      "Order with an account rather than as a guest to avoid the £3.95 fee.",
      "Returning most of every order can trigger the Fair Use charge.",
    ],
    faqs: [
      {
        q: "Are ASOS returns free?",
        a: "For account holders on qualifying orders, yes, but ASOS may charge £3.95 under its Fair Use Policy. Guest orders pay £3.95.",
      },
      {
        q: "How long do I have to return to ASOS?",
        a: "28 days from delivery.",
      },
      {
        q: "How long does an ASOS refund take?",
        a: "ASOS refunds within 14 days of receiving the return.",
      },
    ],
    source: "https://www.asos.com/customer-care/returns-refunds/what-is-your-returns-policy/",
    checked: CHECKED,
  },
  {
    slug: "john-lewis",
    name: "John Lewis",
    country: "United Kingdom",
    region: "uk",
    category: "Department store",
    headline: "30 days in original condition",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "John Lewis accepts returns within 30 days if the item is in its original condition and you have proof of purchase. Refunds go back to the same payment method within 14 days. Some products have their own restrictions, which are shown on the product page.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "Condition", value: "Original condition, proof of purchase" },
      { label: "Refund", value: "Same payment method, within 14 days" },
      { label: "Exceptions", value: "Product-specific restrictions apply" },
    ],
    exceptions: ["Some products have different rules; check the product page before buying."],
    steps: [
      "Check you're within 30 days and have proof of purchase.",
      "Return in a John Lewis shop or start a return online.",
      "The refund goes to the payment method used, within 14 days.",
    ],
    tips: ["Festive purchases get extra time, so gifts bought in October are still safe in January."],
    faqs: [
      {
        q: "How long is John Lewis's return policy?",
        a: "30 days, with the item in its original condition and proof of purchase.",
      },
      {
        q: "Does John Lewis extend returns at Christmas?",
        a: "Yes. Items bought 1 October to 24 December 2026 can be returned until 23 January 2027.",
      },
      {
        q: "How long does a John Lewis refund take?",
        a: "Up to 14 days, to the payment method you used.",
      },
    ],
    holiday: "Items bought 1 October to 24 December 2026 can be returned until 23 January 2027.",
    source: "https://johnlewis.com/customer-services/returns/our-refund-policy",
    checked: CHECKED,
  },
  {
    slug: "primark",
    name: "Primark",
    country: "United Kingdom",
    region: "uk",
    category: "Clothing",
    headline: "28 days in store with the till receipt",
    windowDays: 28,
    timeline: [
      { day: 0, label: "Purchase / collection" },
      { day: 28, label: "Return window ends" },
    ],
    summary:
      "Primark accepts returns within 28 days of purchase (or of collection for Click + Collect) in saleable condition, with the original till receipt and tags attached. There are no postal returns, so everything goes back to a store. A gift receipt gets an exchange.",
    facts: [
      { label: "Return window", value: "28 days" },
      { label: "Proof", value: "Original till receipt, tags attached" },
      { label: "Postal returns", value: "Not offered" },
      { label: "Gift receipt", value: "Exchange" },
      { label: "Bank refund time", value: "5–10 working days" },
    ],
    exceptions: [
      "Briefs and boxers, pierced jewellery, opened health and beauty products, gift cards and face masks are not returnable.",
      "Swimwear without its hygiene seal is not accepted.",
    ],
    steps: [
      "Keep the paper till receipt; Primark needs the original.",
      "Bring the item with tags to any Primark store within 28 days.",
      "Card refunds take 5–10 working days to show.",
    ],
    tips: [
      "Take a photo of the receipt too, but bring the original.",
      "Check the hygiene seal on swimwear before trying it on.",
    ],
    faqs: [
      {
        q: "How many days does Primark give for returns?",
        a: "28 days from purchase, or from collection for Click + Collect orders.",
      },
      {
        q: "Can I return to Primark without a receipt?",
        a: "Primark asks for the original till receipt. A gift receipt gets you an exchange.",
      },
      {
        q: "Can I post a return to Primark?",
        a: "No. Primark doesn't offer postal returns.",
      },
    ],
    source: "https://www.help.primark.com/hc/en-gb/articles/115005690845-Refunds-and-Returns-Policy",
    checked: CHECKED,
  },
  {
    slug: "currys",
    name: "Currys",
    country: "United Kingdom",
    region: "uk",
    category: "Electronics",
    headline: "30 days; online orders even if opened",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Purchase / delivery" },
      { day: 14, label: "Online cancellation right ends" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Currys gives 30 days to return products. Online purchases can come back even if opened to inspect them, while in-store purchases must still be sealed. A full refund needs the product to be like new, unused and resaleable.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "Online purchases", value: "Returnable even if opened for inspection" },
      { label: "In-store purchases", value: "Must be sealed" },
      { label: "Full refund", value: "Like new, unused, resaleable" },
      { label: "Online orders", value: "Also covered by the 14-day legal cancellation right" },
    ],
    exceptions: ["SIM and airtime products have their own rules."],
    steps: [
      "Check whether you bought online (opened OK) or in store (must be sealed).",
      "Repack with all accessories and manuals.",
      "Return to a Currys store or arrange a return from your account.",
    ],
    tips: ["Bought in store and unsure? Don't break the seal until you've decided."],
    faqs: [
      {
        q: "Can I return an opened item to Currys?",
        a: "If you bought it online, yes, within 30 days, if it's like new. In-store purchases must be sealed.",
      },
      {
        q: "How long is Currys' return policy?",
        a: "30 days.",
      },
      {
        q: "Are phone contracts returnable at Currys?",
        a: "SIM and airtime products follow separate rules; check them before you buy.",
      },
    ],
    source: "https://www.currys.co.uk/services/shopping-with-us/returns-refunds.html",
    checked: CHECKED,
  },
  {
    slug: "boots",
    name: "Boots",
    country: "United Kingdom",
    region: "uk",
    category: "Beauty",
    headline: "35 days, unopened with proof of purchase",
    windowDays: 35,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 35, label: "Return window ends" },
    ],
    summary:
      "Boots accepts returns within 35 days with proof of purchase, as long as the product is unopened, unused and its seals are intact. Opened medicines, food, personalised gifts and cosmetics are not accepted unless faulty. Refunds take 3–5 working days.",
    facts: [
      { label: "Return window", value: "35 days" },
      { label: "Condition", value: "Unopened, unused, seals intact" },
      { label: "Proof", value: "Proof of purchase needed" },
      { label: "Refund time", value: "3–5 working days" },
      { label: "Supplier-shipped items", value: "Returned to the supplier" },
    ],
    exceptions: ["Opened medicines, food, personalised gifts and cosmetics are excluded unless faulty."],
    steps: [
      "Keep the item sealed and find your receipt or order email.",
      "Return in a Boots store or by post for online orders.",
      "Items shipped directly by a supplier go back to that supplier.",
    ],
    tips: ["Patch-test from a tester before opening, since opened cosmetics can't come back."],
    faqs: [
      {
        q: "How long do I have to return to Boots?",
        a: "35 days with proof of purchase.",
      },
      {
        q: "Can I return opened make-up to Boots?",
        a: "Not for a change of mind. Opened cosmetics are excluded unless faulty.",
      },
      {
        q: "How long does a Boots refund take?",
        a: "Usually 3–5 working days.",
      },
    ],
    source: "https://www.boots.com/returns-exchanges",
    checked: CHECKED,
  },
  // ─── Germany & France ───────────────────────────────────────────────────────
  {
    slug: "amazon-de",
    name: "Amazon Germany",
    country: "Germany",
    region: "eu",
    category: "Online marketplace",
    headline: "30 days for many categories, 14 days for some",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Received" },
      { day: 14, label: "Legal withdrawal ends" },
      { day: 30, label: "Amazon guarantee ends" },
    ],
    summary:
      "Amazon.de offers a voluntary 30-day return guarantee for many categories, such as clothing, shoes, beauty and Amazon devices. Since 23 June 2025 several categories, including books, software, toys, DIY, kitchen and large appliances, only have the 14-day legal withdrawal right. The product page shows which applies.",
    facts: [
      { label: "Many categories", value: "30 days (voluntary guarantee)" },
      { label: "Books, toys, DIY, kitchen, large appliances…", value: "14-day legal withdrawal" },
      { label: "Where to check", value: "Each product page" },
      { label: "Legal warranty", value: "2 years for defects" },
    ],
    exceptions: ["The 30-day guarantee doesn't cover every category since June 2025."],
    steps: [
      "Open Meine Bestellungen and choose the item.",
      "Check the return deadline shown for that item.",
      "Print the label or use a QR code at a drop-off point.",
    ],
    tips: ["Look at the return window on the product page before buying gifts."],
    faqs: [
      {
        q: "Is Amazon.de's return window 30 days?",
        a: "For many categories, yes. Some categories, such as books, toys and kitchen items, only have the 14-day legal withdrawal right since June 2025.",
      },
      {
        q: "What is the legal withdrawal period in Germany?",
        a: "14 days from receipt for most online purchases, which Amazon.de always honours.",
      },
      {
        q: "Does Amazon.de give a warranty on defects?",
        a: "Yes, the 2-year legal warranty applies to defective products.",
      },
    ],
    source: "https://www.amazon.de/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    checked: CHECKED,
  },
  {
    slug: "zalando",
    name: "Zalando",
    country: "Germany",
    region: "eu",
    category: "Online fashion",
    headline: "30 days, free returns",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Received" },
      { day: 14, label: "Legal withdrawal ends" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "Zalando gives 30 days to return items for free in Germany, including items sold by partners. The legal 14-day withdrawal right from receipt also applies.",
    facts: [
      { label: "Return window", value: "30 days" },
      { label: "Cost", value: "Free" },
      { label: "Partner items", value: "Also 30 days" },
      { label: "Legal withdrawal", value: "14 days from receipt" },
    ],
    exceptions: ["Items should be unworn with labels attached."],
    steps: [
      "Register the return in your Zalando account.",
      "Pack the items with labels attached.",
      "Drop the parcel at the chosen carrier.",
    ],
    tips: ["Partner items follow the same 30 days, so you can shop them with confidence."],
    faqs: [
      { q: "Are Zalando returns free?", a: "Yes, in Germany returns are free within 30 days." },
      { q: "How many days does Zalando give for returns?", a: "30 days." },
      { q: "Do partner items have the same rules?", a: "Yes, partner items also have 30 days." },
    ],
    source: "https://en.zalando.de/faq/what-is-your-return-policy.html",
    checked: CHECKED,
  },
  {
    slug: "mediamarkt",
    name: "MediaMarkt",
    country: "Germany",
    region: "eu",
    category: "Electronics",
    headline: "Online 30 days; in store with a myMediaMarkt card",
    windowDays: 30,
    timeline: [
      { day: 0, label: "Received / bought" },
      { day: 30, label: "Return window ends" },
    ],
    summary:
      "MediaMarkt Germany accepts online orders back within 30 days of receipt. In-store purchases have no legal return right, but myMediaMarkt members get 30 days. Products must be complete, undamaged and in the original packaging.",
    facts: [
      { label: "Online orders", value: "30 days from receipt" },
      { label: "In store", value: "30 days with a myMediaMarkt card (no legal right otherwise)" },
      { label: "Condition", value: "Complete, undamaged, original packaging" },
      { label: "Refund to", value: "Original payment method" },
    ],
    exceptions: [
      "Hygiene items such as electric toothbrushes and razors are excluded.",
      "Unsealed software, audio and video are excluded.",
      "Marketplace sellers have their own terms.",
    ],
    steps: [
      "Check whether you bought online or in store.",
      "Repack the product completely in its original box.",
      "Return online via your account, or in a store with your myMediaMarkt card.",
    ],
    tips: ["Sign up for the free myMediaMarkt card before buying in store to get the 30 days."],
    faqs: [
      { q: "Can I return an in-store purchase to MediaMarkt?", a: "With a myMediaMarkt card, within 30 days. Without one, there's no legal return right for store purchases." },
      { q: "How long is MediaMarkt's online return window?", a: "30 days from receipt." },
      { q: "Can I return an electric toothbrush?", a: "No, hygiene items are excluded." },
    ],
    source: "https://faq.mediamarkt.de/app/answers/detail/a_id/7377",
    checked: CHECKED,
  },
  {
    slug: "decathlon-fr",
    name: "Decathlon France",
    country: "France",
    region: "eu",
    category: "Sportswear",
    headline: "Up to 365 days with a free account; 30 days without",
    windowDays: 365,
    timeline: [
      { day: 0, label: "Purchase" },
      { day: 30, label: "Without an account" },
      { day: 365, label: "With a Decathlon account" },
    ],
    summary:
      "Decathlon France gives up to 365 days to return products bought with a free Decathlon account, and 30 days with a receipt if you have no account. Online orders can be returned but not exchanged directly. Marketplace partner items have free returns within 30 days.",
    facts: [
      { label: "With a Decathlon account", value: "Up to 365 days" },
      { label: "Without an account", value: "30 days with receipt" },
      { label: "Online orders", value: "Returns only, no direct exchange" },
      { label: "Marketplace partners", value: "Free returns within 30 days of receipt" },
      { label: "Loyalty points", value: "Deducted on refunds" },
    ],
    exceptions: ["Marketplace items are limited to 30 days."],
    steps: [
      "Create a free Decathlon account and link your purchases.",
      "Bring the product to a store or start the return online.",
      "Refunds deduct any loyalty points earned on the item.",
    ],
    tips: ["Give your account number at the till: it turns 30 days into up to a year."],
    faqs: [
      { q: "How long is Decathlon's return policy in France?", a: "Up to 365 days with a free Decathlon account, or 30 days with a receipt without one." },
      { q: "Can I exchange a Decathlon online order?", a: "Not directly. Return it and order again." },
      { q: "What about marketplace items?", a: "Partner items have free returns within 30 days of receipt." },
    ],
    source: "https://www.decathlon.fr/retour-echange-en-magasin.html",
    checked: CHECKED,
  },
];
