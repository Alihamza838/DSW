import type { StoreTopicFrontmatter } from "../types";

export const topicsData: StoreTopicFrontmatter[] = [
  {
    brand: "Walmart",
    brandSlug: "walmart",
    topic: "without-receipt",
    title: "Walmart Return Policy Without Receipt (2026 Hacks)",
    metaDescription: "Can you return something to Walmart with no receipt? Yes - with a valid photo ID and a database lookup. Here's exactly how it works.",
    lastVerified: "2026-07-01",
    quickAnswer: "Yes. Walmart accepts no-receipt in-store returns with a valid government-issued photo ID, checked against its purchase database. Expect an exchange or Walmart gift card rather than cash back.",
    faqs: [
      {
        question: "Do I need ID to return something to Walmart without a receipt?",
        answer: "Yes, a valid government-issued photo ID is required to process any return without receipt, and Walmart monitors these to prevent abuse.",
      },
      {
        question: "Will I get cash back without a receipt?",
        answer: "Usually not - approved returns without a receipt get a direct product exchange or a Walmart gift card instead of standard cash/card refunds.",
      },
    ],
    steps: [
      {
        title: "Check Purchase History",
        text: "Sign into your Walmart account first - the purchase may already be there if you swiped your app.",
      },
      {
        title: "Try Receipt Lookup",
        text: "The associate can use your card's last 4 digits, the store, date, and total to reconstruct the receipt.",
      },
      {
        title: "Bring a photo ID",
        text: "As a last resort, bring the item and a valid government-issued photo ID to any Walmart checkout customer service desk.",
      },
    ],
    proseContent: `
This page covers the no-receipt path specifically. For Walmart's full return policy - including category-by-category windows and refund methods - see the [complete Walmart return policy guide](/stores/walmart).

### The fast version
No receipt doesn't mean no return. Walmart will look up eligible purchases using a valid photo ID, but the refund options are narrower than a standard receipted return: exchange, Walmart gift card, or a manufacturer-repair referral.

### The ID Tracking System
Walmart uses a secure verification database to track returns made without a receipt. If a customer exceeds the permitted frequency or monetary caps within a rolling 45-day window, the system may flag and automatically decline subsequent returns.
`,
  },
  {
    brand: "Target",
    brandSlug: "target",
    topic: "without-receipt",
    title: "Target Return Policy Without Receipt",
    metaDescription: "Lost your Target receipt? Here's how to return items using account purchases lookup or government ID.",
    lastVerified: "2026-07-01",
    quickAnswer: "Yes, you can return items to Target without a receipt! Guest Services can look up purchases via your Target Circle barcode, card swipes, or photo ID.",
    faqs: [
      {
        question: "Can Target look up a receipt with a credit card?",
        answer: "Yes, if you swiped your credit card, debit card, or Target RedCard, they can scan the card at the register and retrieve the transaction.",
      },
      {
        question: "What is the annual limit for Target returns without a receipt?",
        answer: "Target has a yearly limit of $150 for returns made without a receipt that cannot be looked up in their system. This is tied to your ID.",
      },
    ],
    steps: [
      {
        title: "Check your Target Circle App",
        text: "Most purchases made with linked cards are saved in the app under 'Purchase History'.",
      },
      {
        title: "Provide linked payment card",
        text: "Provide the physical credit or debit card used at checkout for receipt extraction.",
      },
      {
        title: "Present ID for store credit",
        text: "If no purchase is found, show your ID to receive a Target merchandise return card (subject to annual limits).",
      },
    ],
    proseContent: `
This page is a specialized deep-dive on Target's no-receipt policies. To view the standard target terms including category-by-category windows, see the [main Target return policy page](/stores/target).

### The receipt recovery options
Target has built an extremely modern lookup system. You rarely have to rely on raw ID returns because:
- **Card Lookup:** Registries search swipes of MasterCard, Visa, American Express, Discover, RedCard, and personal checks.
- **Circle Barcode:** Scanning your loyalty app barcode captures in-store and online receipts automatically.

### The $150 Annual ID Ceiling
If all lookup options fail, Target can approve a return based on your photo ID. However, Target restricts these unverified returns to **$150 per calendar year** per customer ID to prevent retail fraud.
`,
  },
];
