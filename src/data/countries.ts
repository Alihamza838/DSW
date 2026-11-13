/**
 * countries.ts - the countries and multi-country brands the site covers.
 *
 * Country pages (/countries/:country/) and brand pages (/brands/:brand/) are generated from this
 * file plus the verified policies. Each country links to its official consumer authority, checked
 * on 2026-11-13 (research/verified-2026-11.md). Store lists are never typed here: a store belongs
 * to a country through its `country` field in the policy data.
 */
import { POLICIES, getPolicy, type VerifiedPolicy } from "./policies";

export interface CountryLink {
  name: string;
  url: string;
}
export interface Country {
  slug: string;
  /** ISO 3166 code, shown in the badge */
  code: string;
  name: string;
  /** Value of VerifiedPolicy.country for stores in this country */
  policyCountry: string;
  group: "North America" | "Europe" | "Gulf" | "South Asia" | "Oceania";
  /** Colour pair for the country badge (background, text): AA contrast */
  badge: [string, string];
  intro: string;
  /** What the law says, in plain words */
  law: string[];
  authority: CountryLink & { note: string };
  extraLinks?: CountryLink[];
  /** How shoppers here usually buy and return, turned into practical tips (from the store data) */
  habits: { title: string; tip: string }[];
  faqs: { q: string; a: string }[];
}

export const COUNTRIES: Country[] = [
  {
    slug: "united-states",
    code: "US",
    name: "United States",
    policyCountry: "United States",
    group: "North America",
    badge: ["#1E3A8A", "#FFFFFF"],
    intro:
      "In the United States there is no general federal right to return something just because you changed your mind, so the store's own policy is what counts. That is why the gap between stores is so wide: from no fixed limit at Costco to 14 days at Apple.",
    law: [
      "Store policy decides change-of-mind returns; no federal law requires a return window.",
      "The FTC says that once a seller accepts a return, most refunds should be made within 7 business days, depending on how you paid.",
      "The FTC Cooling-Off Rule gives 3 days to cancel certain sales made at your home or at a temporary location, such as a fair.",
      "Faulty products are covered by the manufacturer's warranty and state law, separate from the store's return window.",
    ],
    authority: {
      name: "Federal Trade Commission: returns, refunds and other resolutions",
      url: "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions",
      note: "Official US consumer advice on returns, refunds and how to complain.",
    },
    habits: [
      { title: "Receipts are often optional", tip: "Many US stores (Kohl's, Macy's, Old Navy) can find a purchase from your card or rewards account. Pay by card and join the free program." },
      { title: "Holiday shopping starts in October", tip: "Walmart, Kohl's and Amazon stretch deadlines to January 31 for purchases from October or November, so early gifts are safe." },
      { title: "Electronics get the short window", tip: "Big-box stores give 90 days on most things but 14\u201330 days on phones and electronics. Check the category line." },
      { title: "Mail returns can cost money", tip: "Gap charges $6, Zara $4.95 by drop-off. Returning in a store is almost always free." },
    ],
    faqs: [
      { q: "Is there a legal right to return items in the US?", a: "Not for a change of mind. US stores set their own return policies; the FTC Cooling-Off Rule only covers certain door-to-door and temporary-location sales." },
      { q: "Which US store has the longest return window?", a: "Of the stores we cover, Costco: most items have no fixed limit. IKEA US gives 365 days for unopened products." },
      { q: "Who do I complain to about a US store refund?", a: "Contact the store first; if that fails, the FTC explains how to report a problem at ReportFraud.ftc.gov and to your state attorney general." },
    ],
  },
  {
    slug: "united-kingdom",
    code: "GB",
    name: "United Kingdom",
    policyCountry: "United Kingdom",
    group: "Europe",
    badge: ["#1F2A44", "#FFFFFF"],
    intro:
      "UK shoppers have two layers of protection. Online orders come with a legal 14-day cancellation right, and many stores add their own longer policy on top, usually 28 to 35 days, with extra time at Christmas.",
    law: [
      "Online and phone orders: 14 days to cancel after delivery under the Consumer Contracts Regulations, then 14 days to send the item back.",
      "Faulty goods: under the Consumer Rights Act 2015 you can reject a faulty item for a full refund within 30 days.",
      "In-store change-of-mind returns are not a legal right; the store's own policy applies.",
      "Sealed hygiene items, personalised goods and perishables can be excluded from the 14-day right once unsealed.",
    ],
    authority: {
      name: "GOV.UK: consumer protection rights",
      url: "https://www.gov.uk/consumer-protection-rights",
      note: "Official UK government guide to your rights when you buy goods.",
    },
    extraLinks: [{ name: "Citizens Advice: consumer help", url: "https://www.citizensadvice.org.uk/consumer/" }],
    habits: [
      { title: "Click & Collect and in-store returns", tip: "UK shoppers return online orders at the shop: free at Zara, H&M and JD Sports, and Primark has no postal returns at all." },
      { title: "Loyalty cards double as receipts", tip: "Tesco can find a purchase on your Clubcard for 30 days. Keep the card scanned at the till." },
      { title: "Sale items get less time", tip: "Next gives 7 days on sale and clearance, M&S and H&M 14. Full-price items get 28\u201330." },
      { title: "You always have 14 days online", tip: "Even if a store's policy is stricter, the Consumer Contracts Regulations give 14 days to cancel most online orders." },
    ],
    faqs: [
      { q: "How long do I have to return an online order in the UK?", a: "At least 14 days after delivery under the cancellation right. Many stores give more: ASOS and Next 28 days, John Lewis 30, Boots 35, IKEA UK 365." },
      { q: "Can I return something bought in a UK shop if I changed my mind?", a: "Only if the store's policy allows it; there's no legal right for in-store change-of-mind returns. Most big UK stores do accept them." },
      { q: "What if a product is faulty?", a: "Under the Consumer Rights Act 2015, you can reject it for a full refund within 30 days." },
    ],
  },
  {
    slug: "canada",
    code: "CA",
    name: "Canada",
    policyCountry: "Canada",
    group: "North America",
    badge: ["#B91C1C", "#FFFFFF"],
    intro:
      "Canadian stores don't have to take back items that aren't faulty, so each store's own policy decides. The good news: most big Canadian chains are generous, with 30 to 90 days for unopened items.",
    law: [
      "Businesses are not required to accept returns of non-defective items; the store's policy applies.",
      "Stores can exclude sale items, limit refunds to store credit or charge restocking fees, as long as their policy says so.",
      "Defective products can be repaired, replaced or refunded by the seller.",
      "Provinces have their own consumer protection laws for contracts and some types of sales.",
    ],
    authority: {
      name: "Office of Consumer Affairs: refund and exchange",
      url: "https://ised-isde.canada.ca/site/office-consumer-affairs/en/business-practices-and-consumer-concerns/refund-and-exchange",
      note: "Government of Canada guidance on store refund and exchange policies.",
    },
    habits: [
      { title: "Keep the box sealed", tip: "Canadian Tire and Best Buy Canada want unopened items or charge restocking fees on some opened ones." },
      { title: "Card purchases can be looked up", tip: "Canadian Tire finds card purchases for 90 days if the receipt is lost." },
      { title: "Holiday deadlines run into January", tip: "Best Buy Canada extends purchases from November 2 until January 10, 2027." },
    ],
    faqs: [
      { q: "Do Canadian stores have to give refunds?", a: "Not for items that aren't defective. Each store sets its own policy, so read it before you buy." },
      { q: "Which Canadian store has the longest return window?", a: "Of the stores we cover, Canadian Tire: 90 days for most unopened items with a receipt." },
      { q: "Is Best Buy Canada's policy the same as the US?", a: "No. Best Buy Canada gives 30 days for most products, while Best Buy US gives 15 (60 for paid members)." },
    ],
  },
  {
    slug: "australia",
    code: "AU",
    name: "Australia",
    policyCountry: "Australia",
    group: "Oceania",
    badge: ["#0F3D7A", "#FFFFFF"],
    intro:
      "Australia separates two things clearly: change-of-mind returns, which are a store's choice, and faulty products, which the Australian Consumer Law always covers. Big chains like Kmart and Target Australia still offer long change-of-mind windows.",
    law: [
      "Change of mind is not a legal right; a store must honour its own change-of-mind policy if it has one.",
      "For a major problem with a product, you can choose a refund or a replacement under the consumer guarantees.",
      "'No refunds' signs are unlawful because they suggest you can't get a refund even for a major fault.",
      "Consumer guarantees can still apply after a manufacturer's warranty ends.",
    ],
    authority: {
      name: "ACCC: repair, replace, refund, cancel",
      url: "https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/repair-replace-refund-cancel",
      note: "Australian Competition and Consumer Commission guide to consumer guarantees.",
    },
    habits: [
      { title: "OnePass means a year", tip: "Kmart and Target Australia give OnePass members up to 365 days for change-of-mind returns." },
      { title: "Unwrapping can cost 20%", tip: "JB Hi-Fi wants unopened items; unpacked-but-unused ones may carry a 20% fee." },
      { title: "Faults are a separate right", tip: "Whatever the change-of-mind policy says, the Australian Consumer Law covers faulty products." },
    ],
    faqs: [
      { q: "Is change of mind a legal right in Australia?", a: "No, but if a store has a change-of-mind policy it must follow it. Faulty goods are always covered by the Australian Consumer Law." },
      { q: "Which Australian store gives the longest change-of-mind window?", a: "Kmart and Target Australia give OnePass members up to 365 days; everyone else gets 60 days at Kmart." },
      { q: "Can a store refuse a refund for a faulty product?", a: "Not for a major problem: you can choose a refund or a replacement." },
    ],
  },
  {
    slug: "india",
    code: "IN",
    name: "India",
    policyCountry: "India",
    group: "South Asia",
    badge: ["#C2410C", "#FFFFFF"],
    intro:
      "Indian return windows are short and depend on the category: often 7 days for electronics, 15 to 30 for fashion, and some products are replacement-only. Always read the return line on the product page, because that is where the platforms put the rule that applies.",
    law: [
      "Store and platform policies decide change-of-mind returns; windows are set per category.",
      "The Consumer Protection Act 2019 covers defective goods and deficient services.",
      "The National Consumer Helpline takes complaints about e-commerce companies and forwards them for resolution.",
      "Unresolved cases can go to a Consumer Commission, generally within two years.",
    ],
    authority: {
      name: "National Consumer Helpline (Department of Consumer Affairs)",
      url: "https://consumerhelpline.gov.in/public/",
      note: "File a complaint online or call 1915 / 1800-11-4000.",
    },
    habits: [
      { title: "Read the product page, not the FAQ", tip: "Amazon India, Meesho and Tata CLiQ set return windows per item. The line next to the price is the rule that applies." },
      { title: "Cash on delivery refunds go to a bank", tip: "Nykaa and other platforms refund COD orders by bank transfer, so keep your account details ready." },
      { title: "Record the unboxing", tip: "Croma wants delivery damage reported within 48 hours; a video makes a replacement claim easy." },
      { title: "Store balance is fastest", tip: "Meesho Balance refunds in up to 2 business days, against 3\u20137 for cards or UPI." },
    ],
    faqs: [
      { q: "How many days do Indian online stores give for returns?", a: "It depends on the category: Amazon India often 7 days, H&M India 15, Nykaa 15, Zara India and Tata CLiQ apparel 30." },
      { q: "Where can I complain about an online refund in India?", a: "Contact the seller's grievance officer first, then the National Consumer Helpline (1915 or consumerhelpline.gov.in)." },
      { q: "Why are some items replacement-only?", a: "Platforms such as Amazon India and Croma set some categories, mainly electronics, as replacement-only for defects." },
    ],
  },
  {
    slug: "pakistan",
    code: "PK",
    name: "Pakistan",
    policyCountry: "Pakistan",
    group: "South Asia",
    badge: ["#14532D", "#FFFFFF"],
    intro:
      "In Pakistan, most fashion brands offer exchanges or store credit rather than cash refunds, and the deadlines can be very short: J. gives 3 days and Gul Ahmed wants notice within 3 days. Check the brand's page the day your parcel arrives.",
    law: [
      "Brand policies decide change-of-mind returns; exchanges and store credit are the norm.",
      "Provincial consumer protection laws (such as the Punjab Consumer Protection Act 2005) cover defective products.",
      "In Punjab, send the seller a 15-day legal notice first, then you can file in the Consumer Court within the next 15 days, with no court fee.",
    ],
    authority: {
      name: "Punjab Consumer Protection Council: guidelines for consumers",
      url: "https://pcpc.punjab.gov.pk/guidelines",
      note: "Official guidance on notices and Consumer Court claims in Punjab.",
    },
    habits: [
      { title: "Check the parcel the day it arrives", tip: "J. gives 3 days, Gul Ahmed wants notice within 3 days and Limelight wants damage reported in 2 working days." },
      { title: "Expect an exchange, not cash", tip: "Outfitters, Limelight, Gul Ahmed and Bonanza Satrangi exchange or give credit; cash refunds are rare." },
      { title: "Sale means final", tip: "Most brands (Sapphire, Limelight, Bonanza Satrangi) don't take back sale items at all." },
      { title: "Requests often go by WhatsApp or email", tip: "Limelight accepts exchange requests by WhatsApp, SMS or email. Keep the paper invoice from the parcel." },
    ],
    faqs: [
      { q: "Do Pakistani clothing brands give cash refunds?", a: "Mostly not. Outfitters and Gul Ahmed give exchanges, and Sapphire usually gives store credit." },
      { q: "Which brand has the shortest return window in Pakistan?", a: "J. (Junaid Jamshed): 3 days from delivery to claim a return or exchange." },
      { q: "How do I complain about a defective product in Punjab?", a: "Send a 15-day legal notice to the seller, then file in the Consumer Court within 15 days if it's not resolved." },
    ],
  },
  {
    slug: "uae",
    code: "AE",
    name: "United Arab Emirates",
    policyCountry: "United Arab Emirates",
    group: "Gulf",
    badge: ["#065F46", "#FFFFFF"],
    intro:
      "UAE stores usually give 14 days, and many accept only unused items in their original packaging with the invoice. Shops must display their return policy, so ask to see it before paying, especially in electronics stores that charge restocking fees.",
    law: [
      "Federal Law No. 15 of 2020 on Consumer Protection covers goods and services, including e-commerce by UAE-registered sellers.",
      "Defective goods: the supplier must repair, replace or refund.",
      "Stores must display their return, exchange and refund policy in Arabic and English.",
      "Change-of-mind returns depend on the store's policy.",
    ],
    authority: {
      name: "UAE Government portal: consumer protection",
      url: "https://u.ae/en/information-and-services/justice-safety-and-the-law/consumer-protection",
      note: "Ministry of Economy consumer line: 800 1222.",
    },
    habits: [
      { title: "Don't cut the security tag", tip: "Namshi can reject a return or deduct up to 30% if the tag is removed." },
      { title: "Unopened is the rule", tip: "IKEA UAE and Sephora UAE accept unopened items only; Sharaf DG charges a restocking fee on opened ones." },
      { title: "Keep the invoice", tip: "Centrepoint, IKEA UAE and Sephora UAE ask for the invoice and original packaging." },
    ],
    faqs: [
      { q: "How long do UAE stores give for returns?", a: "Usually 14 days: Namshi, Centrepoint, Sharaf DG and Sephora UAE all use 14 days; Amazon.ae gives 15 for most items." },
      { q: "Can I return opened items in the UAE?", a: "Often not for a change of mind. Sephora UAE wants unopened products, and Sharaf DG charges a restocking fee on opened items." },
      { q: "Where do I complain in the UAE?", a: "Call the Ministry of Economy on 800 1222, or your emirate's Department of Economic Development." },
    ],
  },
  {
    slug: "saudi-arabia",
    code: "SA",
    name: "Saudi Arabia",
    policyCountry: "Saudi Arabia",
    group: "Gulf",
    badge: ["#14532D", "#FFFFFF"],
    intro:
      "In Saudi Arabia, the Ministry of Commerce says a store that has a return policy must follow it, and a store without one may not refuse returns or exchanges. Windows vary from 3 days at Jarir to 15 at Amazon.sa.",
    law: [
      "A store with a return and exchange policy must follow it.",
      "A store without a policy may not prevent returns or exchanges.",
      "Online shoppers should confirm an item is returnable before buying.",
      "Complaints: toll-free 1900 or the Commercial Violation Report app, with the invoice and photos.",
    ],
    authority: {
      name: "Ministry of Commerce: guide to consumer rights",
      url: "https://mc.gov.sa/en/guides/Documents/CustomerGuide.pdf",
      note: "Official consumer guide (PDF). Complaints: 1900.",
    },
    habits: [
      { title: "Online beats showroom", tip: "eXtra gives 14 days for website orders against 7 in the showroom." },
      { title: "Electronics are mostly final", tip: "Jarir and eXtra exclude phones, computers and games unless defective." },
      { title: "Ask for the policy", tip: "A Saudi store with a return policy must follow it; a store without one may not refuse returns." },
    ],
    faqs: [
      { q: "Do Saudi stores have to accept returns?", a: "A store that has a return policy must follow it, and one without a policy may not refuse returns or exchanges." },
      { q: "How long does Amazon.sa give for returns?", a: "15 days for most items, 30 for some categories such as TVs and large appliances." },
      { q: "How do I complain in Saudi Arabia?", a: "Complain to the store first, then report to the Ministry of Commerce on 1900 or through the Commercial Violation Report app." },
    ],
  },
  {
    slug: "germany",
    code: "DE",
    name: "Germany",
    policyCountry: "Germany",
    group: "Europe",
    badge: ["#1F2937", "#FFFFFF"],
    intro:
      "Germany follows the EU rules: 14 days to withdraw from an online purchase, plus a 2-year legal guarantee for defects. Many shops add more, like Zalando's free 30 days, but in-store purchases have no legal return right at all.",
    law: [
      "Online purchases: 14-day right of withdrawal from receipt, without giving a reason (EU rule).",
      "Defects: at least a 2-year legal guarantee.",
      "In-store purchases: no legal return right; the shop's policy applies.",
      "Sealed hygiene items, custom-made goods and perishables can be excluded from withdrawal.",
    ],
    authority: {
      name: "Your Europe: guarantees and returns",
      url: "https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm",
      note: "Official EU guide to the 14-day withdrawal right and the 2-year guarantee.",
    },
    habits: [
      { title: "Free 30 days is common", tip: "Zalando and OTTO both give 30 free days, on top of the 14-day legal withdrawal." },
      { title: "In-store needs a card", tip: "MediaMarkt only accepts in-store returns from myMediaMarkt members." },
      { title: "Christmas orders get until January", tip: "OTTO gives orders since 1 November until 31 January 2027." },
    ],
    faqs: [
      { q: "How long do I have to return an online order in Germany?", a: "At least 14 days from receipt. Zalando and many Amazon.de categories give 30 days." },
      { q: "Can I return something bought in a German shop?", a: "There's no legal right for in-store purchases; MediaMarkt, for example, gives 30 days only to myMediaMarkt members." },
      { q: "What about faulty products?", a: "The EU 2-year legal guarantee applies." },
    ],
  },
  {
    slug: "france",
    code: "FR",
    name: "France",
    policyCountry: "France",
    group: "Europe",
    badge: ["#1E3A8A", "#FFFFFF"],
    intro:
      "France uses the same EU base rules: 14 days to withdraw from online purchases and a 2-year guarantee for defects. Some French retailers go much further, like Decathlon's up-to-365-day returns for account holders.",
    law: [
      "Online purchases: 14-day right of withdrawal from receipt (EU rule).",
      "Defects: at least a 2-year legal guarantee.",
      "In-store change-of-mind returns depend on the shop's policy.",
    ],
    authority: {
      name: "Your Europe: guarantees and returns",
      url: "https://europa.eu/youreurope/citizens/consumers/shopping/guarantees-returns/index_en.htm",
      note: "Official EU guide to the 14-day withdrawal right and the 2-year guarantee.",
    },
    habits: [
      { title: "Account holders get far more time", tip: "Decathlon gives up to 365 days with a free account, 30 without." },
      { title: "Drop it at the store", tip: "Fnac store drop-off is free and refunds are immediate; posting it back is at your cost." },
      { title: "Holiday returns until mid-January", tip: "Fnac purchases from 1 November to 31 December 2026 can come back until 15 January 2027." },
    ],
    faqs: [
      { q: "How long is the return period for online orders in France?", a: "At least 14 days from receipt under EU rules." },
      { q: "Which French store has the longest return window?", a: "Of the stores we cover, Decathlon: up to 365 days with a free Decathlon account." },
      { q: "Do French shops have to accept in-store returns?", a: "No, that depends on the shop's own policy." },
    ],
  },
];

/** "the United Kingdom", "the United Arab Emirates", but "India" */
export const inCountry = (c: Country) => (/^United /.test(c.name) ? `the ${c.name}` : c.name);

export const COUNTRY_GROUPS: Country["group"][] = ["North America", "Europe", "Gulf", "South Asia", "Oceania"];

const BY_SLUG = new Map(COUNTRIES.map((c) => [c.slug, c]));
export const getCountry = (slug: string | undefined) => (slug ? BY_SLUG.get(slug) : undefined);
export const countryOfPolicy = (p: VerifiedPolicy) => COUNTRIES.find((c) => c.policyCountry === p.country);
export const storesInCountry = (c: Country) => POLICIES.filter((p) => p.country === c.policyCountry);
/** Stores that ship worldwide (marketplaces and apps without one home country page) */
export const globalStores = () => POLICIES.filter((p) => p.region === "global");

// ─── Brands that run separate stores in several countries ───────────────────
export interface Brand {
  slug: string;
  name: string;
  intro: string;
  /** Store slugs, home market first */
  members: string[];
}

export const BRANDS: Brand[] = [
  {
    slug: "amazon",
    name: "Amazon",
    intro:
      "Amazon runs a separate store in each country, and the return window changes a lot between them: 30 days in the US, UK and Canada, 15 days in the UAE and Saudi Arabia, and a per-category window, often 7 days, in India.",
    members: ["amazon", "amazon-uk", "amazon-ca", "amazon-de", "amazon-ae", "amazon-sa", "amazon-in"],
  },
  {
    slug: "ikea",
    name: "IKEA",
    intro:
      "IKEA is generous in the US (365 days unopened, 180 opened) and the UK (365 days, opened items refunded on a card), but IKEA UAE only takes back unopened items, within 90 days (120 for IKEA Family).",
    members: ["ikea", "ikea-uk", "ikea-uae"],
  },
  {
    slug: "zara",
    name: "Zara",
    intro: "Zara gives 30 days in the US, UK and India, but the cost of returning by mail or home collection differs by country.",
    members: ["zara", "zara-uk", "zara-in"],
  },
  {
    slug: "hm",
    name: "H&M",
    intro: "H&M's window and fees change by country: the UK gives 30 days (14 for sale items) with a fee for online returns, while India gives 15 days with free returns.",
    members: ["hm", "hm-uk", "hm-in"],
  },
  {
    slug: "apple",
    name: "Apple",
    intro: "Apple gives 14 days to return in the US and UK, but Apple India does not accept change-of-mind returns at all.",
    members: ["apple", "apple-uk", "apple-in"],
  },
  {
    slug: "sephora",
    name: "Sephora",
    intro: "Sephora gives 30 days in the US and Canada (Sephora Canada even takes gently used products), but Sephora in the UAE only takes back unused, unopened items within 14 days (3 for sale items).",
    members: ["sephora", "sephora-ca", "sephora-uae"],
  },
  {
    slug: "nike",
    name: "Nike",
    intro: "Nike US gives 60 days for any reason. Nike UK's pages confirm receipt-free member returns but don't publish a day count, so the 14-day legal cancellation right is the safe minimum there.",
    members: ["nike", "nike-uk"],
  },
  {
    slug: "walmart",
    name: "Walmart",
    intro: "Walmart US and Walmart Canada are separate stores with their own rules for windows, electronics and holiday returns.",
    members: ["walmart", "walmart-ca"],
  },
  {
    slug: "best-buy",
    name: "Best Buy",
    intro: "Best Buy Canada gives 30 days to everyone, while Best Buy US gives 15 days unless you're a paid My Best Buy member.",
    members: ["best-buy", "best-buy-ca"],
  },
];

const BRAND_BY_SLUG = new Map(BRANDS.map((b) => [b.slug, b]));
export const getBrand = (slug: string | undefined) => (slug ? BRAND_BY_SLUG.get(slug) : undefined);
export const brandOfPolicy = (p: VerifiedPolicy) => BRANDS.find((b) => b.members.includes(p.slug));
export const brandStores = (b: Brand) => b.members.map((s) => getPolicy(s)).filter((p): p is VerifiedPolicy => Boolean(p));
