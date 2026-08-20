import { ArticleGuide } from "../../types";

export const storeCreditVsRefundGuide: ArticleGuide = {
  title: "Store Credit vs Refund: Consumer Legal Protection Rights",
  slug: "store-credit-vs-refund-explained",
  description: "Know your legal rights when retailers refuse cash refunds and offer store credit instead - state laws in CA, TX, NY, and FL audited.",
  category: "consumer-rights",
  tags: [
    "consumer-rights",
    "store-credit",
    "refunds",
    "legal"
  ],
  publishedAt: "2026-03-22",
  updatedAt: "2026-08-01",
  readingTime: "8 min",
  heroImage: "/images/guides/store-credit-vs-refund-explained.png",
  author: "DSWReturnRefund Consumer Rights Bureau",
  relatedStores: [
    "walmart",
    "target",
    "best-buy"
  ],
  relatedArticles: [
    "final-sale-items-explained",
    "return-shipping-fees-2026",
    "best-return-policies-2026"
],
  summary: "US federal and state laws permit merchants to offer store credit instead of cash unless the item is defective or the merchant failed to post return terms visibly at point of sale.",
  quickAnswer: "Under US consumer protection laws (including CA, NY, TX, and FL), retailers are legally allowed to issue store credit instead of cash refunds if their return policy is clearly posted at the point of purchase.",
  verifiedSourceUrl: "https://www.ftc.gov/legal-library/browse/rules/refund-rules",
  verifiedSourceDate: "2026-08-01",
  factRows: [
    {
      label: "Cash Refund Obligation",
      value: "Required only if policy posted or item defective",
      status: "warning"
    },
    {
      label: "California Posted Notice Mandate",
      value: "Must post at register if policy < 7 Days",
      status: "yes"
    },
    {
      label: "Store Credit Expiration Rules",
      value: "Cannot expire in CA, NY, FL",
      status: "yes"
    }
  ],
  sources: [
    {
      title: "Federal Trade Commission Consumer Refund Rights",
      url: "https://www.ftc.gov/legal-library/browse/rules/refund-rules",
      publisher: "US FTC",
      dateAccessed: "2026-08-01"
    }
  ],
  faqs: [
    {
      question: "Can a store force me to accept store credit for a defective item?",
      answer: "No. Federal implied warranty laws require a full refund to original payment if an item is fundamentally defective upon purchase."
    }
  ],
  steps: [
    {
      title: "Inspect Posted Return Signage",
      text: "Check if the store posted return terms clearly at checkout."
    },
    {
      title: "Cite Defect if Applicable",
      text: "If the item is broken, state that you are claiming an implied warranty refund."
    },
    {
      title: "Escalate to Customer Relations",
      text: "Request store manager intervention or file a credit card chargeback if misrepresented."
    }
  ],
  proseContent: `
# Store Credit vs Refund: Consumer Legal Protection Rights

Understanding the legal distinction between a cash refund and store merchandise credit protects your wallet.

---

### ⚖️ State Consumer Law Breakdown

| State | Mandatory Signage Rule | Store Credit Expiration | Cash Refund Default? |
| :--- | :--- | :--- | :--- |
| **California** | Must post conspicuously if policy < 7 days | **Cannot Expire** | ❌ NO (If posted) |
| **New York** | Must post policy at register | **Cannot Expire** | ❌ NO (If posted) |
| **Texas** | Retailer sets policy terms | 5-Year Min | ❌ NO (If posted) |
| **Florida** | Must post if no refunds given | **Cannot Expire** | ❌ NO (If posted) |

---

## Can I legally demand a cash refund without a receipt?
No. Retailers are legally entitled to limit receiptless returns to store credit.

## What is the legal policy for defective electronics?
Under the **Magnuson-Moss Warranty Act**, if a merchant sells a defective product, consumers are entitled to a full cash/card refund, repair, or replacement.

## Do restocking fees violate consumer laws?
No, as long as restocking fees are disclosed prior to purchase.

## How are gift store credits handled legally?
Gift cards and merchandise return cards cannot expire in states like CA, NY, and FL.

## What happens if a merchant changes its policy after purchase?
The policy in effect at the exact timestamp of purchase governs the transaction.
`
};
