import { ArticleGuide } from "../../types";

export const dswWithoutReceiptGuide: ArticleGuide = {
  title: "Can You Return DSW Shoes Without a Receipt?",
  slug: "dsw-return-policy-without-receipt",
  description: "Lost your DSW receipt? Learn how VIP lookup works, what store credit you'll get, and photo ID requirements for unverified returns.",
  category: "how-to",
  tags: ["dsw", "no-receipt", "shoes"],
  publishedAt: "2026-02-18",
  updatedAt: "2026-08-01",
  readingTime: "5 min",
  heroImage: "/images/guides/dsw-return-policy-without-receipt.png",
  author: "Marcus Vance",
  relatedStores: ["dsw"],
  relatedArticles: [
    "dsw-online-return-policy",
    "dsw-return-policy-with-receipt",
    "dsw-complete-return-policy-guide"
  ],
  summary: "DSW accepts returns without a paper receipt using digital VIP phone number lookup or payment card lookup. Unverified returns yield store credit at the item's lowest recent price with mandatory photo ID.",
  quickAnswer: "Yes, DSW accepts returns without a receipt using your VIP Rewards phone number or payment card lookup. If no purchase record is found, unverified returns are processed with a valid government photo ID for store credit at the item's lowest recent sale price.",
  verifiedSourceUrl: "https://www.dsw.com/en/us/legal/return-policy",
  verifiedSourceDate: "2026-08-01",
  factRows: [
    {
      label: "VIP Phone Number Lookup",
      value: "Supported (Free VIP Account)",
      status: "yes"
    },
    {
      label: "Payment Card Lookup",
      value: "Supported In-Store",
      status: "yes"
    },
    {
      label: "Unverified Return Refund",
      value: "Merchandise Credit (Lowest Price)",
      status: "warning"
    },
    {
      label: "Photo ID Requirement",
      value: "Mandatory for No-Receipt Returns",
      status: "no"
    },
    {
      label: "Worn Shoes Eligibility",
      value: "Unworn Condition Required",
      status: "no"
    }
  ],
  sources: [
    {
      title: "DSW Official Returns & Exchanges Terms",
      url: "https://www.dsw.com/en/us/legal/return-policy",
      publisher: "Designer Brands Inc. Customer Care",
      dateAccessed: "2026-08-01"
    }
  ],
  faqs: [
    {
      question: "Do I need a photo ID to return shoes to DSW without a receipt?",
      answer: "Yes. DSW requires a valid government-issued photo ID for all unverified returns without a physical receipt or VIP lookup match."
    },
    {
      question: "Can DSW look up my receipt with my phone number?",
      answer: "Yes. If you provided your phone number or email at checkout (or registered for DSW VIP), cashiers can instantly retrieve your purchase receipt in their system."
    },
    {
      question: "Can I return worn shoes to DSW if I lost the receipt?",
      answer: "No. DSW policy strictly requires shoes to be in unworn, original condition unless returning due to a verified structural defect."
    }
  ],
  steps: [
    {
      title: "Provide VIP Account Information",
      text: "Give the cashier your phone number or email address linked to your DSW VIP membership to pull up the original transaction."
    },
    {
      title: "Present Card Used for Purchase",
      text: "If you did not use a VIP account, present the credit or debit card used during purchase for associate lookup."
    },
    {
      title: "Present Photo ID for Store Credit",
      text: "If no digital record is found, present a valid photo ID to receive DSW merchandise credit at the item's lowest recent selling price."
    }
  ],
  proseContent: `
## Can I Return DSW Items Without a Receipt?

DSW permits returns without a paper receipt provided the store associate can verify your purchase digitally. If you belong to the free DSW VIP program, cashiers can retrieve transaction records using your phone number or email address. Alternatively, associates can look up purchases made with credit or debit cards within standard return windows.

If no digital transaction record can be located, DSW processes unverified returns under manager discretion. Unverified returns require a valid government-issued photo ID and are issued as DSW merchandise credit equal to the item's lowest recent selling price.

## What Are the Requirements for No-Receipt DSW Returns?

To complete a return without a paper receipt at DSW, items must remain in unworn, original condition with original packaging intact. Worn shoes showing exterior scuffs or sole wear are ineligible for return regardless of receipt status.

DSW tracks unverified returns using customer photo ID data to prevent fraudulent return patterns. Excessive unverified return requests may result in manager refusal.

## How Does DSW VIP Receipt Lookup Work?

DSW VIP members benefit from automatic digital receipt archival. Club tier members enjoy a 90-day return window, while VIP Gold members receive 120 days, and VIP Elite members receive 365 days. 

When returning items in-store, providing your VIP registered phone number automatically attaches the purchase proof, enabling full refunds to your original payment method.
`
};
