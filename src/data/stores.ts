import type { StoreFrontmatter } from "../types";

export const storesData: StoreFrontmatter[] = [
  {
    brand: "American Eagle",
    slug: "american-eagle",
    category: ["clothing", "fashion", "denim"],
    logo: "/images/stores/american-eagle.png",
    image: "/images/stores/american-eagle.png",
    lastVerified: "2026-08-03",
    officialPolicyUrl: "https://www.ae.com/us/en/content/help/return-policy",
    metaDescription: "American Eagle Return Policy 2026: No strict deadline with proof of purchase. Learn rules for unworn clothing, Aerie items, $5 mail fee, and no-receipt returns.",
    quickAnswer: {
      returnWindow: "No strict deadline with proof of purchase",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or Store Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "No Hard Return Deadline",
        status: "yes",
        note: "Returns accepted anytime for unworn items with receipt",
      },
      {
        label: "Aerie Items Accepted",
        status: "yes",
        note: "Return Aerie items at AE stores or online portal",
      },
      {
        label: "In-Store Free Returns",
        status: "yes",
        note: "Avoid $5 return shipping fee by dropping off in-store",
      },
      {
        label: "No-Receipt Store Credit",
        status: "yes",
        note: "Store credit at current selling price with valid ID",
      },
    ],
    policyTable: [
      {
        category: "Unworn Clothing & Jeans",
        window: "No hard deadline",
        condition: "Unworn condition with tags or proof of purchase",
        fee: "None ($0)",
      },
      {
        category: "Aerie Apparel & Leggings",
        window: "No hard deadline",
        condition: "Unworn with tags or receipt",
        fee: "None ($0)",
      },
      {
        category: "Aerie Swimwear & Underwear",
        window: "No hard deadline",
        condition: "Hygiene liner intact & unworn",
        fee: "None ($0)",
      },
      {
        category: "Mail Returns (ae.com)",
        window: "No hard deadline",
        condition: "With order confirmation slip",
        fee: "$5 shipping fee deducted",
      },
      {
        category: "Final Sale Items",
        window: "Not Returnable",
        condition: "Final sale items explicitly marked at checkout",
        fee: "N/A",
      },
    ],
    steps: [
      {
        title: "Gather Item and Proof of Purchase",
        text: "Keep tags attached if possible and bring paper receipt, AE app order, or card for lookup.",
      },
      {
        title: "Choose Return Method",
        text: "Return to any local American Eagle / Aerie store for FREE or start a return on ae.com portal ($5 fee).",
      },
      {
        title: "Receive Refund or Exchange",
        text: "Get an immediate refund to original payment or store credit if returning without receipt.",
      },
    ],
    faqs: [
      {
        question: "Is there a time limit for American Eagle returns?",
        answer: "American Eagle doesn't impose a strict return deadline for most items when you have proof of purchase. Returns are evaluated on condition rather than a calendar cutoff.",
      },
      {
        question: "Can I return Aerie items to American Eagle stores?",
        answer: "Yes! Aerie purchases can be returned to any American Eagle store location under the same return conditions.",
      },
      {
        question: "Does American Eagle charge for return shipping?",
        answer: "Mail returns carry a $5 return shipping fee deducted from your refund. Returning in-store is completely free.",
      },
    ],
  },
  {
    brand: "Home Depot",
    slug: "home-depot",
    category: ["home-improvement", "gardening", "tools"],
    logo: "/images/stores/home-depot.png",
    image: "/images/stores/home-depot.png",
    lastVerified: "2026-08-03",
    officialPolicyUrl: "https://www.homedepot.com/c/Return_Policy",
    metaDescription: "Home Depot Return Policy 2026: 90-day standard window, 365-day tree & perennial plant guarantee, Home Depot Cardholder 1-year perk, and dead plant return rules.",
    quickAnswer: {
      returnWindow: "90 days (365 days for Plants & HD Cardholders)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or Store Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "1-Year Plant Guarantee",
        status: "yes",
        note: "365 days for trees, shrubs, & perennials",
      },
      {
        label: "HD Cardholder 365-Day Window",
        status: "yes",
        note: "1 full year for Home Depot Credit Card holders",
      },
      {
        label: "Dead Plants Accepted",
        status: "yes",
        note: "Accepted in original pot with receipt or ID",
      },
      {
        label: "No-Receipt ID Credit",
        status: "yes",
        note: "POS lookup via card/phone or store credit with photo ID",
      },
    ],
    policyTable: [
      {
        category: "Trees, Shrubs & Perennials",
        window: "365 days (1 Year)",
        condition: "Dead or thriving with receipt or pot",
        fee: "None ($0)",
      },
      {
        category: "Annuals & Houseplants",
        window: "90 days",
        condition: "In original nursery container",
        fee: "None ($0)",
      },
      {
        category: "General Hardware & Tools",
        window: "90 days (365 for HD Card)",
        condition: "New or unopened condition",
        fee: "None ($0)",
      },
      {
        category: "Gas-Powered Outdoor Equipment",
        window: "30 days",
        condition: "Unopened or defective with receipt",
        fee: "None ($0)",
      },
      {
        category: "Opened Soil & Fertilizers",
        window: "90 days",
        condition: "With receipt or proof of purchase",
        fee: "None ($0)",
      },
    ],
    steps: [
      {
        title: "Locate Proof of Purchase",
        text: "Gather paper receipt, order confirmation email, or scan Home Depot app barcode.",
      },
      {
        title: "Bring Plant or Item In-Store",
        text: "Bring the plant in its nursery pot or item to any local Home Depot customer service desk.",
      },
      {
        title: "Receive Refund or Replacement",
        text: "Get instant refund to original card, replacement plant, or store credit.",
      },
    ],
    faqs: [
      {
        question: "What is Home Depot's plant return policy?",
        answer: "Trees, shrubs, and perennials are covered by a 1-year (365-day) guarantee. Annuals, houseplants, and other live goods are covered for 90 days.",
      },
      {
        question: "Can I return a dead plant to Home Depot?",
        answer: "Yes! Home Depot accepts dead plant returns within the eligible window (1 year for trees/perennials, 90 days for annuals). Bring the plant in its pot with receipt or ID.",
      },
      {
        question: "Can I return Home Depot items without a receipt?",
        answer: "Yes. Store staff can look up receipts via credit card or phone number. Unverified returns receive store credit at current price with valid ID.",
      },
    ],
  },
  {
    brand: "Target",
    slug: "target",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/target.svg",
    lastVerified: "2026-08-01",
    officialPolicyUrl: "https://www.target.com/returns",
    policyAlert: {
      type: "updated",
      title: "Cat & Jack 365-Day Receipt Strictness Updated",
      message: "Target updated its 1-Year Cat & Jack kids clothing guarantee: digital app account receipt or store purchase history is now strictly required. ID lookup without receipt is capped at $100/year.",
      updatedDate: "August 2026",
      actionNote: "Scan Target App barcode at checkout to guarantee 365-day returns"
    },
    metaDescription: "Target's Return Policy for 2026: 90-day standard window, 365 days for Cat & Jack and Target-owned brands, Circle 360 120-day perk, and no-receipt ID lookup rules.",
    quickAnswer: {
      returnWindow: "90 days (365 days for Target brands & Cat & Jack)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method, RedCard credit, or Target Gift Card",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Cat & Jack 365-Day Guarantee",
        status: "yes",
        note: "1 full year for kids clothing with receipt",
      },
      {
        label: "Circle Card 120-Day Window",
        status: "yes",
        note: "Extra 30 days for RedCard/Circle Card holders",
      },
      {
        label: "No-Receipt Lookup",
        status: "yes",
        note: "Lookup via card, account, or photo ID ($100 annual limit)",
      },
      {
        label: "Free Mail Return Shipping",
        status: "yes",
        note: "Free prepaid UPS return labels",
      },
    ],
    policyTable: [
      {
        category: "Target-Owned Brands (Cat & Jack, Threshold)",
        window: "365 days (1 Year)",
        condition: "Receipt or account history required",
        fee: "None",
      },
      {
        category: "General Clothing & Household",
        window: "90 days (120 for Circle Card)",
        condition: "Unworn with tags or opened satisfaction",
        fee: "None",
      },
      {
        category: "Consumer Electronics & Tech",
        window: "30 days",
        condition: "Original packaging with all accessories",
        fee: "None",
      },
      {
        category: "Apple Products & Mobile Phones",
        window: "15 days",
        condition: "Unopened or defective with receipt",
        fee: "None",
      },
      {
        category: "Opened Beauty Products",
        window: "90 days",
        condition: "Satisfactory condition (even if partially used)",
        fee: "None",
      },
      {
        category: "Gift Registry Items",
        window: "365 days",
        condition: "Unused in original packaging",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Locate Proof of Purchase",
        text: "Scan your Target App barcode, enter your phone number at checkout, or bring your credit card used for purchase.",
      },
      {
        title: "Verify Category Window",
        text: "Confirm your item is within 90 days (120 for Circle Card, 365 for Cat & Jack / Target brands, 15 for Apple).",
      },
      {
        title: "Choose Return Method",
        text: "Visit Guest Services at any Target store for instant refunds, or generate a free prepaid UPS label on Target.com.",
      },
      {
        title: "Receive Instant Credit",
        text: "Refunds post to your original payment method, Circle balance, or a Target Gift Card without a receipt.",
      },
    ],
    faqs: [
      {
        question: "How does the Cat & Jack 365-day return policy work at Target?",
        answer: "If your child outgrows or wears out Cat & Jack clothing within 1 year of purchase, Target will grant a full refund or exchange with a valid receipt or Target app transaction record.",
      },
      {
        question: "Can I return an item to Target without a receipt?",
        answer: "Yes. Target can look up your purchase using the credit/debit card, Target app barcode, or phone number used at checkout. Without a receipt or account record, Target allows up to $100 in unverified returns per year with a government photo ID.",
      },
      {
        question: "Does Target Circle or RedCard extend the return window?",
        answer: "Yes! Paying with a Target Circle Card (formerly RedCard) or holding a Circle 360 subscription adds an extra 30 days, expanding the standard 90-day window to 120 days.",
      },
      {
        question: "Can I return opened beauty products to Target?",
        answer: "Yes! Opened makeup, skincare, and hair care products can be returned within 90 days if you are unsatisfied with the formula.",
      },
    ],
    relatedBrands: ["walmart", "costco", "kohls"],
    proseContent: `
Target has built one of the most customer-friendly return frameworks in the retail industry. In 2026, Target's return policy combines a standard **90-day return window** for general merchandise with a massive **365-day (one full year) satisfaction guarantee** for Target-owned private brands.

---

## ⏱️ Target Return Windows Comparison (2026)

To help you understand how Target's return timelines differ depending on membership status, payment method, or brand category, our auditing team has compiled a detailed timeline breakdown:

[BAR_CHART: Target Return Windows by Category (Days) | Target-Owned Brands (Cat & Jack): 365 | Target Registry Items: 365 | Target Circle 360 Members: 120 | Target RedCard (Circle Card) Holders: 120 | Standard Guest Return Window: 90 | Consumer Electronics / Tech: 30 | Apple Products: 15 | Mobile Phones (Contract): 14]

This chart demonstrates that while general electronics have standard restrictions, loyalty-linked purchases and Target-exclusive private labels (like Cat & Jack, Goodfellow, or threshold) offer exceptional return flexibility that rivals luxury department stores.

---

## 💎 The Target-Owned Brands Loophole: 365-Day Guarantee

The most legendary hack within Target’s return systems is the **365-day satisfaction guarantee** on all Target private-label items. If you purchase any item from one of their 45+ owned brands and are not fully satisfied, you can bring it back with a receipt within one full year for a 100% refund or exchange.

### What brands are covered?
* **Kids & Clothing:** *Cat & Jack*, *Art Class*, *All in Motion*, *Universal Thread*, *Goodfellow & Co*, *A New Day*, *Wild Fable*.
* **Home Goods & Furniture:** *Threshold*, *Pillowfort*, *Room Essentials*, *Opalhouse*, *Hearth & Hand with Magnolia*, *Project 62*.
* **Groceries & Consumables:** *Good & Gather*, *Favorite Day*.

*💡 Expert Auditor Tip: This guarantee is extremely valuable for parents buying children's footwear and clothing under the **Cat & Jack** label. If your children outgrow, tear, or wear out their Cat & Jack shoes or shirts within a year, Target will issue a full refund as long as you have the digital or printed receipt!*

---

## 🔍 Target No-Receipt Returns & ID Tracking Systems

Can you return items to Target if you lose your receipt? **Yes, but under highly structured conditions.** Target cashiers have advanced POS lookup utilities that can track down your purchase electronically:

### 1. Payment Card & Account Search
If you scanned your free **Target Circle** app barcode, paid with a **Target Circle Card (formerly RedCard)**, or swiped the same credit card, debit card, or gift card used for the transaction, the register can locate the receipt in seconds. This completely bypasses the need for a physical receipt and ensures a full refund to your original payment method.

### 2. Government-Issued ID Returns
If the purchase was cash-based and you did not scan your Target loyalty app, Guest Services can process the return using a valid state driver's license, passport, or military ID.
* **The Return Limit:** Target limits no-receipt ID-verified returns to a maximum cumulative value of **$150** per calendar year.
* **The Refund Outcome:** You will receive a non-transferable **Target Merchandise Return Card** (store credit) valued at the item's lowest selling price over the past 90 days.
* *Warning: Target uses the third-party security software "The Retail Equation" to log state IDs. If you exceed the return frequency threshold, your profile will be flagged, resulting in an automatic denial of all receiptless returns for 180 days.*

---

## 🆚 Store Showdowns: Target vs. Competitors

Before purchasing, compare Target's return terms side-by-side with other giants:
* **Target vs. Walmart:** Target offers a massive 365-day guarantee on its own brands, whereas Walmart caps its own labels (like Time and Tru or George) at their standard 90-day window. To see a full breakdown of this battle, review our [Target vs Walmart Return Policy comparison](/compare/target-vs-walmart).
* **Target vs. Best Buy:** Standard Best Buy electronics returns are limited to a tight 15 days, whereas Target gives you a full 30 days for general tech items.

For more helpful guides on shopping smart, review the [Target Return Policy Explained blog guide](/blog/target-return-policy-explained) or explore the [Store Return Policy Directory](/stores).
`,
  },
  {
    brand: "Walmart",
    slug: "walmart",
    category: ["department-stores", "grocery-bigbox", "clothing"],
    logo: "/logos/walmart.svg",
    lastVerified: "2026-08-01",
    officialPolicyUrl: "https://www.walmart.com/help/article/return-policy",
    policyAlert: {
      type: "critical",
      title: "No-Receipt ID Limit Cap Enforced",
      message: "Walmart strict 3-receiptless-return cap per 45-day rolling window is active. Maximum store credit allowance per ID scan is enforced at register.",
      updatedDate: "August 2026",
      actionNote: "Use Walmart Pay or save digital receipt in Walmart app to avoid ID limits"
    },
    metaDescription: "Walmart's return policy: 90-day standard window, shorter windows for electronics and phones, and how no-receipt returns work with a photo ID.",
    quickAnswer: {
      returnWindow: "90 days (30 for electronics, 14 for phones)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method, or gift card without a receipt",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "No-Receipt Returns",
        status: "yes",
        note: "ID-based database lookup",
      },
      {
        label: "Shorter Electronics Window",
        status: "warning",
        note: "30 days for most electronics",
      },
      {
        label: "Marketplace Item Exceptions",
        status: "warning",
      },
      {
        label: "Free In-Store Returns",
        status: "yes",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise",
        window: "90 days",
        condition: "New or defective",
        fee: "None",
      },
      {
        category: "Consumer Electronics",
        window: "30 days",
        condition: "Original packaging required",
        fee: "None",
      },
      {
        category: "Wireless Phones",
        window: "14 days",
        condition: "All accessories included",
        fee: "None",
      },
      {
        category: "Marketplace (3rd-party)",
        window: "30 days (varies by seller)",
        condition: "Seller-dependent",
        fee: "Varies",
      },
    ],
    steps: [
      {
        title: "Check Purchase History",
        text: "Sign into your Walmart account - card purchases and app-scanned receipts often show up automatically.",
      },
      {
        title: "Try Receipt Lookup",
        text: "Use the store location, date, total, and card's last 4 digits to pull up a lost receipt.",
      },
      {
        title: "Bring a photo ID",
        text: "If no digital record exists, bring the item and a valid government-issued ID to any store.",
      },
      {
        title: "Receive your outcome",
        text: "Expect an exchange, Walmart gift card, or manufacturer repair routing for no-receipt returns.",
      },
    ],
    faqs: [
      {
        question: "Can I return to Walmart without a receipt?",
        answer: "Yes - Walmart accepts no-receipt in-store returns with a valid government-issued photo ID, matched against its purchase database.",
      },
      {
        question: "What's the return window for Walmart electronics?",
        answer: "Most consumer electronics have a 30-day window, and wireless phones have a shorter 14-day window.",
      },
      {
        question: "Do online orders count as no-receipt returns?",
        answer: "No - online orders carry a digital barcode/receipt in your Purchase History, so they're rarely true no-receipt returns.",
      },
    ],
    relatedBrands: ["target", "costco"],
    proseContent: `
Walmart’s return framework is highly structured, featuring a wide standard **90-day return window** for general merchandise alongside significantly tighter restrictions for electronic goods, contract phones, and third-party marketplace purchases.

---

## ⏱️ Walmart Return Windows by Department (2026)

To protect itself from retail arbitrage and rapid depreciation, Walmart divides its inventory into distinct return windows:

[BAR_CHART: Walmart Return Windows by Product Type (Days) | General Merchandise (Clothing, Toys, Home): 90 | Walmart-Exclusive Groceries (Satisfaction): 90 | Most Electronics (TVs, PCs, Tablets): 30 | Major Appliances (Refrigerators, Washers): 30 | Third-Party Marketplace Items (Standard): 30 | Contract & Prepaid Wireless Phones: 14 | Opened Software / Video Games (Exchange Only): 0]

While general clothing and household products enjoy a massive 90 days, tech and electronics must be handled with care as they carry strict 30 or 14-day cutoff points.

---

## 📄 The Lost Receipt Protocol: How Walmart's ID Database Works

If you lose your physical receipt, Walmart does not leave you stranded. Their Guest Services registers are integrated with advanced receipt-recovery tools:

### 1. Payment Card Lookup & Digital Purchase History
If you paid using a credit card, debit card, Walmart Gift Card, or scanned your **Walmart App** barcode (linked to your Walmart Pay account) at checkout, the cashier can run a digital sweep. The POS database can search up to **90 days** of transaction history to locate your receipt and print a duplicate copy, restoring 100% of your refund value back to your original payment card.

### 2. State-Issued ID Scanner Tracking
If you paid cash and did not use the Walmart app, Guest Services can process a no-receipt return using a valid government-issued photo ID (driver’s license, passport, or military ID).
* **The Scan Process:** The cashier will physically swipe or scan the barcode on the back of your ID.
* **The Return Threshold:** Walmart enforces a strict limit of **3 receiptless returns** within a rolling 45-day window. If you exceed this frequency, the register will print a denial notice.
* **The Refund Outcome:** No-receipt returns are restricted to a **Walmart Merchandise Gift Card** (which can only be spent in-store or on Walmart.com) equivalent to the item's lowest selling price.
* *💡 Pro Tip: Walmart-exclusive brands (such as Great Value, Equate, Mainstays, and Athletic Works) carry a 100% Satisfaction Guarantee. Even if you don't have the receipt, store managers are highly authorized to approve direct exchanges or gift card refunds on these specific items.*

---

## 🛍️ Third-Party Marketplace Returns: The Amazon Effect

Items purchased on Walmart.com that are fulfilled or sold by third-party **Marketplace Sellers** are subject to independent policies.
* **The Minimum Window:** Walmart mandates that all Marketplace sellers must provide at least a **30-day return window**, mimicking Amazon's standard rules.
* **The Shipping Catch:** While most items can be returned directly to a local physical Walmart store, some bulky marketplace items require you to package and mail them directly back to the merchant. Always check your online order details page before driving to Guest Services.

For a side-by-side comparison with Target, browse our [Target vs Walmart Return Policy comparison](/compare/target-vs-walmart). To learn more about receiptless refund rules, explore our deep-dive [Walmart No-Receipt Return Guide](/blog/walmart-return-policy-without-receipt).
`,
  },
  {
    brand: "Costco",
    slug: "costco",
    category: ["grocery-bigbox", "electronics"],
    logo: "/logos/costco.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://customerservice.costco.com/app/answers/detail/a_id/1108",
    metaDescription: "Costco's return policy has no general time limit - except electronics, capped at 90 days. Here's what's covered and what isn't.",
    quickAnswer: {
      returnWindow: "No limit (90 days for most electronics)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "No Time Limit (Most Items)",
        status: "yes",
      },
      {
        label: "90-Day Electronics Cap",
        status: "warning",
      },
      {
        label: "Membership-Linked Purchases",
        status: "yes",
        note: "Often no receipt needed",
      },
      {
        label: "Free Returns",
        status: "yes",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise",
        window: "No time limit",
        condition: "Satisfaction guaranteed",
        fee: "None",
      },
      {
        category: "Electronics (TVs, computers, cameras)",
        window: "90 days",
        condition: "Original packaging preferred",
        fee: "None",
      },
      {
        category: "Major Appliances",
        window: "90 days",
        condition: "Delivery/install terms may apply",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Confirm the category",
        text: "Check whether the item falls under Costco's general no-limit policy or the 90-day electronics exception.",
      },
      {
        title: "Bring your membership card",
        text: "Costco ties purchases to your membership, so a physical receipt often isn't required.",
      },
      {
        title: "Return in-store or start online",
        text: "Bring the item to the returns desk, or initiate a return through your Costco.com account for online orders.",
      },
    ],
    faqs: [
      {
        question: "Does Costco's no-time-limit return policy apply to everything?",
        answer: "No - most electronics, including TVs, computers, and cameras, are capped at a 90-day return window even under a membership.",
      },
      {
        question: "Do I need a receipt to return something to Costco?",
        answer: "Usually not. Costco can look up purchases tied to your membership number.",
      },
    ],
    relatedBrands: ["best-buy", "walmart"],
    proseContent: `
Costco's legendary **100% Satisfaction Guarantee** is widely recognized as the absolute gold standard in the retail industry. For the vast majority of items, Costco members are granted an **infinite, no-time-limit return window** - meaning you can return an item years after purchase if it fails to live up to your expectations.

---

## ⏱️ Costco Return Cutoffs & Exceptions (2026)

While most grocery, home goods, and clothing items have no expiration date, Costco enforces strict, protective return caps on high-value and rapidly depreciating tech categories:

[BAR_CHART: Costco Return Cutoffs by Department | General Merchandise (Furniture, Apparel, Tools): 365 | Diamond Jewelry (Requires Lab Audit): 365 | Consumer Electronics (TVs, PCs, Projectors): 90 | Major Smart Appliances (Refrigerators, Range): 90 | Smart Watches & Fitness Trackers: 90 | Gold Bars & Bullion (Final Sale): 0 | Custom Spec Optical/Prescription Items: 0]

Understanding these electronics and luxury category limits is essential before making high-ticket purchases at the warehouse.

---

## 🔍 The Costco Advantage: Frictionless No-Receipt Returns

At Costco, losing your receipt is almost never an issue. Since Costco is a closed, member-only wholesale club, every single transaction is automatically logged in their central database:

### 1. Membership Card Tracking
When checking out, cashiers must scan your physical membership card or digital app QR code. Because of this, Guest Services at the returns counter can instantly look up your entire purchase history going back multiple years. You do not need a physical paper receipt, the original packaging, or even the barcode tags.
* *💡 Pro Tip: If you need to make a return but lost your membership card, you can pull up your digital card on the official Costco mobile app, or show your government ID at the membership desk first to get a temporary voucher.*

---

## 💎 Under-the-Radar Perks & Guidelines

### 1. The Membership Refund Loophole
Costco's satisfaction guarantee doesn't just cover products - it also covers your annual membership fee. If you are ever dissatisfied with your wholesale club experience, you can request a **100% refund of your active membership fee** ($60 or $120) at any point during the year, no questions asked.

### 2. Diamond Audits
When returning diamonds or fine jewelry over 1.0 carat, Costco cannot issue an immediate cash or card refund at the desk. The jewelry must be shipped to Costco’s central grading laboratory for verification by a certified gemologist to confirm that the stone has not been swapped or compromised. This process usually takes **2 to 5 business days**.

### 3. Return Shipping & Costco.com
For items purchased online at Costco.com, you can choose to mail them back using a free prepaid shipping label generated via your online account, or simply carry them into your local physical warehouse. Returns processed in-store are refunded immediately, including shipping and handling fees.

For a deep-dive into electronics guidelines, review our [Costco Electronics Return Guide](/blog/costco-electronics-return-policy) or compare timelines with tech retailers in our [Costco vs Best Buy comparison](/compare/costco-vs-best-buy).
`,
  },
  {
    brand: "Kohl's",
    slug: "kohls",
    category: ["department-stores", "clothing"],
    logo: "/logos/kohls.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://cs.kohls.com",
    metaDescription: "Kohl's return policy features a 180-day window for most items, with a 30-day cap on electronics.",
    quickAnswer: {
      returnWindow: "180 days (30 days for electronics)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or Kohl's merchandise credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Generous 180-day Window",
        status: "yes",
      },
      {
        label: "Electronics Exceptions",
        status: "warning",
        note: "30-day limit for electronics",
      },
      {
        label: "Sephora at Kohl's exceptions",
        status: "warning",
        note: "60-day limit for beauty items",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise",
        window: "180 days",
        condition: "New or lightly used",
        fee: "None",
      },
      {
        category: "Electronics",
        window: "30 days",
        condition: "Original box required",
        fee: "None",
      },
      {
        category: "Sephora at Kohl's Items",
        window: "60 days",
        condition: "New or gently used",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Find your purchase proof",
        text: "Kohl's can look up purchases with a Kohl's Card, charge card, or order history.",
      },
      {
        title: "Bring tags and items to Guest Services",
        text: "Take your items to any checkout or customer service station.",
      },
      {
        title: "Get your refund",
        text: "You will receive cash, card refund, or Kohl's Merchandise Credit.",
      },
    ],
    faqs: [
      {
        question: "Can I return Kohl's items without a receipt?",
        answer: "Yes, Kohl's can look up your order with credit cards or loyalty identifiers. If they cannot find it, they will issue Kohl's Merchandise Credit.",
      },
    ],
    relatedBrands: ["target", "macys"],
  },
  {
    brand: "Macy's",
    slug: "macys",
    category: ["department-stores", "clothing"],
    logo: "/logos/macys.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.macys.com",
    metaDescription: "Macy's allows returns for up to 30 days on most items, a tighter window than some major department stores.",
    quickAnswer: {
      returnWindow: "30 days for most items",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or store credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-day Return Window",
        status: "warning",
        note: "Recently shortened from 90 days",
      },
      {
        label: "Free In-Store Returns",
        status: "yes",
      },
    ],
    policyTable: [
      {
        category: "Standard Merchandise",
        window: "30 days",
        condition: "Must have tags attached",
        fee: "None",
      },
      {
        category: "Fine Jewelry",
        window: "30 days",
        condition: "Tags attached, security tags intact",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Keep your receipt or invoice",
        text: "Macy's strictly requires a receipt, packing slip, or order barcode.",
      },
      {
        title: "Visit a Macy's Store",
        text: "In-store returns are free. Mail returns are subject to a return shipping fee.",
      },
    ],
    faqs: [
      {
        question: "Did Macy's change their return window?",
        answer: "Yes, Macy's recently shortened their general return window from 90 days down to 30 days.",
      },
    ],
    relatedBrands: ["target", "kohls"],
  },
  {
    brand: "Best Buy",
    slug: "best-buy",
    category: ["electronics"],
    logo: "/logos/bestbuy.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.bestbuy.com/returns",
    metaDescription: "Best Buy has a standard 15-day return window. Learn about open-box policies and membership extensions.",
    quickAnswer: {
      returnWindow: "15 days (extended for Plus/Total members)",
      receiptRequired: true,
      restockingFee: true,
      refundMethod: "Original payment method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Standard 15-day Window",
        status: "warning",
        note: "Crucial to check dates",
      },
      {
        label: "Restocking Fees on Some Items",
        status: "warning",
        note: "Applies to activated devices and high-end cameras",
      },
      {
        label: "Plus/Total Member Extensions",
        status: "yes",
        note: "Plus/Total members get up to 60 days",
      },
    ],
    policyTable: [
      {
        category: "Electronics",
        window: "15 days",
        condition: "All original packaging required",
        fee: "None",
      },
      {
        category: "Cell Phones & Tablets",
        window: "14 days",
        condition: "Original packaging and accessories",
        fee: "Restocking fee applies ($45)",
      },
      {
        category: "Plus/Total Member items",
        window: "60 days",
        condition: "Satisfactory condition",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Gather accessories",
        text: "Make sure all cords, documentation, and components are back in the box.",
      },
      {
        title: "Visit store or ship back",
        text: "Bring your store receipt or shipping invoice for faster in-store processing.",
      },
    ],
    faqs: [
      {
        question: "What are Best Buy's restocking fees?",
        answer: "Best Buy charges a restocking fee on activated cell phones ($45), tablet devices, and specialized photography gear.",
      },
    ],
    relatedBrands: ["costco", "walmart"],
    proseContent: `
Best Buy enforces one of the tightest and most rigorous return policies in the consumer electronics sector. Their standard **15-day return window** can catch shoppers off guard if they aren't careful, though paid membership tiers unlock much longer privileges.

---

## ⏱️ Best Buy Return Windows & Restocking Fees (2026)

To prevent "rental shopping" of premium gear for short-term events, Best Buy separates returns by product category and membership status:

[BAR_CHART: Best Buy Return Windows by Membership Tier | Plus & Total Members (All Tech): 60 | Standard Customers (General Tech): 15 | Major Smart Appliances (All Customers): 15 | Contract Cellular Devices (All Customers): 14 | Opened Software & Games (Exchange Only): 0]

While general appliances and gadgets carry a baseline 15-day window, paid members enjoy twice the flexibility of standard buyers.

---

## 👥 Membership Tier Impact: How to Get 60 Days

To get around Best Buy's restrictive 15-day limit, you must belong to one of their paid loyalty programs:

1. **Standard Members (Free to Join):** Standard buyers receive the basic **15-day window** from the date of purchase (or delivery).
2. **My Best Buy Plus™ ($49.99/yr):** Unlocks a full **60-day return window** on almost all electronics, appliances, and smart home accessories.
3. **My Best Buy Total™ ($179.99/yr):** Also unlocks the **60-day return window** along with complimentary AppleCare+ protection, 24/7 tech support, and product warranties.

*💡 Expert Auditor Tip: If you are purchasing a high-ticket item like an OLED TV, premium gaming laptop, or high-end sound system, signing up for **My Best Buy Plus** is an excellent security measure. The $50 annual fee pays for itself by giving you an extra 45 days to test for pixel defects, thermal performance, or sound quality in your actual home environment.*

---

## ⚠️ The Restocking Fee Catch: What You Will Pay

Even inside your active return window, Best Buy charges **restocking fees** on specific high-ticket and activated categories if the item has been opened:

| Product Category | Restocking Fee (Opened Items) | Exemption Status |
| :--- | :--- | :--- |
| **Activated Cell Phones & Tablets** | **$45 Flat Fee** | None (Charged to all customers) |
| **Drones & Professional Photography Gear** | **15% of Purchase Price** | **No fee** if unopened / My Best Buy members in select states |
| **Projectors & High-End DSLR Lenses** | **15% of Purchase Price** | **No fee** if unopened / My Best Buy members in select states |
| **Rideables (E-Bikes, Scooters)** | **15% of Purchase Price** | **No fee** if unopened |

*Note: Restocking fees are legally void in states where prohibited by law, including Ohio, Maryland, and Hawaii.*

---

## 🛡️ Anti-Fraud Systems: Serial Number Tracking

Best Buy runs an industry-leading anti-fraud return database.
* **Serial Number Scans:** Every computer, phone, TV, and gaming console has its unique serial number scanned and bound to your receipt at checkout. When you return the item, the cashier will scan the hardware serial number to ensure it matches the purchased SKU.
* **ID Sweep:** Like other major retailers, Best Buy uses computerized ID scanners to monitor receiptless return frequencies, and reserves the right to deny returns that appear fraudulent.

For a full breakdown of open-box discount guidelines, review our [Best Buy Return Policy Open Box guide](/blog/best-buy-return-policy-open-box). To compare Best Buy with warehouse club policies, explore our [Costco vs Best Buy comparison](/compare/costco-vs-best-buy).
`,
  },
  {
    brand: "Amazon",
    slug: "amazon",
    category: ["marketplaces", "electronics", "clothing"],
    logo: "/logos/amazon.svg",
    lastVerified: "2026-08-01",
    officialPolicyUrl: "https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    policyAlert: {
      type: "updated",
      title: "Staples & Kohl's Label-Free QR Returns Expanded",
      message: "Amazon expanded free unboxed, label-free QR code dropoffs across Staples, Kohl's, Whole Foods, and UPS Stores. Gift card refunds processed within 2-4 hours of counter scan.",
      updatedDate: "August 2026",
      actionNote: "Show smartphone QR code at counter without packing box"
    },
    metaDescription: "Complete Amazon Return Policy Guide (2026): 30-day standard window, 90 days for Amazon Renewed, label-free & box-free dropoffs at Whole Foods, Kohl's, Staples, and UPS, plus returnless refund rules.",
    quickAnswer: {
      returnWindow: "30 days (90 days for Renewed & Baby Registry)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or Amazon Gift Card Balance",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Standard Return Window",
        status: "yes",
        note: "30 days from delivery date",
      },
      {
        label: "Label-Free, Box-Free Drop-Offs",
        status: "yes",
        note: "Whole Foods, Kohl's, Staples & UPS Stores",
      },
      {
        label: "Amazon Renewed 90-Day Guarantee",
        status: "yes",
        note: "90 days for refurbished devices",
      },
      {
        label: "A-to-z Guarantee Protection",
        status: "yes",
        note: "Covers 3rd-party seller orders",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise (FBA)",
        window: "30 days",
        condition: "New, opened or used with accessories",
        fee: "Free drop-off at designated locations",
      },
      {
        category: "Amazon Renewed / Refurbished",
        window: "90 days",
        condition: "Satisfactory functional state",
        fee: "Free return shipping",
      },
      {
        category: "Baby Registry Items",
        window: "365 days",
        condition: "Unopened original packaging",
        fee: "Free return shipping",
      },
      {
        category: "Apparel, Shoes & Accessories",
        window: "30 days",
        condition: "New condition with tags",
        fee: "Free return shipping",
      },
      {
        category: "Heavy & Large Appliances",
        window: "30 days",
        condition: "Unopened or defective",
        fee: "Freight pickup (Fees vary by seller)",
      },
      {
        category: "Third-Party Sellers (FBM)",
        window: "30 days minimum",
        condition: "Per merchant return guidelines",
        fee: "Seller may charge return postage",
      },
    ],
    steps: [
      {
        title: "Initiate Return in Amazon Orders",
        text: "Sign into your Amazon account, go to 'Your Orders', select the item, and tap 'Return or Replace Items'.",
      },
      {
        title: "Select Return Reason & Method",
        text: "Select your return reason (e.g. wrong size, defective, no longer needed) and choose your refund destination (Amazon Gift Card or Original Payment Method).",
      },
      {
        title: "Choose Drop-Off Spot",
        text: "Select a nearby partner drop-off point: Whole Foods Market, Kohl's Customer Service, Staples, or a UPS Store.",
      },
      {
        title: "Present QR Code at Counter",
        text: "Bring your unboxed item and item accessories to the drop-off counter. The associate scans your smartphone QR code, bags the item, and issues an instant receipt.",
      },
    ],
    faqs: [
      {
        question: "Can I return Amazon items without the original box or shipping label?",
        answer: "Yes! Amazon's partner drop-off locations (Whole Foods, Kohl's, Staples, and UPS Stores) offer label-free and box-free returns. Simply bring the loose item and present the QR code on your phone.",
      },
      {
        question: "How long does an Amazon return refund take?",
        answer: "Gift card refunds are issued within 2 to 4 hours after your QR code is scanned at a drop-off counter. Credit card refunds take 3 to 5 business days after warehouse arrival.",
      },
      {
        question: "What is Amazon's Extended Holiday Return Policy?",
        answer: "Items purchased between October 1 and December 31 can be returned through January 31 of the following year.",
      },
      {
        question: "What is an Amazon Returnless Refund?",
        answer: "For low-cost items or items where return shipping exceeds item value, Amazon's algorithm may automatically grant a full refund while instructing you to keep or donate the item.",
      },
    ],
    relatedBrands: ["walmart", "target", "costco"],
    proseContent: `
# Amazon Return Policy Guide (2026 Audit)

Amazon offers the largest e-commerce return network in North America, Western Europe, and the Middle East. Understanding Amazon's drop-off partnerships and return category limits ensures instant refund processing.

---

### 📦 Amazon Drop-Off Network & Speed Comparison

| Drop-Off Partner | Label Required? | Box Required? | Refund Speed | Fee |
| :--- | :--- | :--- | :--- | :--- |
| **Whole Foods Market** | ❌ No Label Needed | ❌ No Box Needed | **Instant (2-4 Hours)** | **$0 Free** |
| **Kohl's Customer Service** | ❌ No Label Needed | ❌ No Box Needed | **Instant (2-4 Hours)** | **$0 Free** |
| **Staples** | ❌ No Label Needed | ❌ No Box Needed | **Instant (2-4 Hours)** | **$0 Free** |
| **UPS Store** | ❌ No Label Needed | ❌ No Box Needed | **Instant (2-4 Hours)** | **$0 Free** |
| **UPS Pickup (Home)** | ✅ Label Printed | ✅ Sealed Box | **3-5 Days** | $6.99 (Free if defective) |

---

## 1. Amazon A-to-z Guarantee for Third-Party Marketplace Purchases
When buying from third-party sellers (Fulfilled by Merchant / FBM), Amazon enforces the **A-to-z Guarantee**. Third-party sellers must offer return policies at least as favorable as Amazon's standard 30-day window. If a seller fails to respond to a return request within 48 hours or refuses a valid return, Amazon automatically steps in to issue a full refund from the seller's account.

## 2. Amazon Renewed 90-Day Guarantee
Refurbished smartphones, laptops, headphones, and gaming consoles purchased through the **Amazon Renewed** program carry an extended **90-day satisfaction guarantee** (or 1 full year for Amazon Renewed Premium). If the item shows battery degradation or cosmetic flaws beyond the listing description, a replacement or full refund is guaranteed.
`
  },
  {
    brand: "Nike",
    slug: "nike",
    category: ["activewear", "clothing"],
    logo: "/logos/nike.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.nike.com/help/a/returns-policy",
    metaDescription: "Nike standard return policy: 30 days (60 for Nike Members) even if you have worn the shoes.",
    quickAnswer: {
      returnWindow: "30 days (60 days for Nike Members)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "60 days for Members",
        status: "yes",
        note: "Joining Nike Membership is free",
      },
      {
        label: "Worn shoes accepted",
        status: "yes",
        note: "Allows testing shoes on the court or run",
      },
      {
        label: "Free online return shipping",
        status: "yes",
      },
    ],
    policyTable: [
      {
        category: "Worn shoes & apparel",
        window: "30/60 days",
        condition: "Worn lightly for performance trial",
        fee: "None",
      },
      {
        category: "Unworn shoes & gear",
        window: "Unlimited (with receipt)",
        condition: "Brand new, tags attached",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Become a member",
        text: "Sign up on Nike.com or the Nike app to unlock the extended 60-day testing window.",
      },
      {
        title: "Initiate return",
        text: "Start the process inside your Member account to generate a prepaid USPS/UPS label.",
      },
    ],
    faqs: [
      {
        question: "Can I return Nike shoes after running in them?",
        answer: "Yes, Nike's unique satisfaction guarantee allows you to wear and test out shoes. You can return them within 60 days even if they have been worn on a run.",
      },
    ],
    relatedBrands: ["target"],
  },
  {
    brand: "Sephora",
    slug: "sephora",
    category: ["beauty"],
    logo: "/logos/sephora.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.sephora.com",
    metaDescription: "Sephora standard return policy: 30 days for original payment, up to 60 days for store credit.",
    quickAnswer: {
      returnWindow: "30 days (up to 60 for store credit)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment or store credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Used/Opened Beauty accepted",
        status: "yes",
        note: "Must be in gently used condition",
      },
      {
        label: "Store credit extended window",
        status: "yes",
        note: "Days 31-60 get store credit",
      },
    ],
    policyTable: [
      {
        category: "Gently used cosmetics",
        window: "30 days",
        condition: "Under 50% used",
        fee: "None",
      },
      {
        category: "Gently used cosmetics (extended)",
        window: "31-60 days",
        condition: "Under 50% used",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Confirm condition",
        text: "Ensure the cosmetic or skincare item is in 'gently used' or new condition.",
      },
      {
        title: "Account look up",
        text: "Use your Beauty Insider account at register to look up the purchase without receipt.",
      },
    ],
    faqs: [
      {
        question: "Can you return opened makeup to Sephora?",
        answer: "Yes, Sephora accepts returns of gently used cosmetics, skincare, and fragrances if they are within 60 days of purchase.",
      },
    ],
    relatedBrands: ["ulta", "kohls"],
  },
  {
    brand: "Ulta",
    slug: "ulta",
    category: ["beauty"],
    logo: "/logos/ulta.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.ulta.com",
    metaDescription: "Ulta Beauty return policy offers a generous 60-day return window for both new and opened cosmetics.",
    quickAnswer: {
      returnWindow: "60 days for full refund",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or store credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Gently used items accepted",
        status: "yes",
        note: "Accepted with all components",
      },
      {
        label: "60-day standard window",
        status: "yes",
        note: "Double the time of beauty competitors",
      },
    ],
    policyTable: [
      {
        category: "Opened cosmetics & tools",
        window: "60 days",
        condition: "Gently used, with all original components",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Bring original pieces",
        text: "Make sure to bring original caps, applicators, and packaging if returning makeup.",
      },
      {
        title: "Scan your Ultamate Rewards card",
        text: "Ultamate Rewards purchases can be looked up instantly at register.",
      },
    ],
    faqs: [
      {
        question: "Is Ulta's return policy better than Sephora's?",
        answer: "Generally yes, as Ulta provides a full 60 days for a refund to the original payment method, while Sephora limits original payment refunds to 30 days and switches to store credit thereafter.",
      },
    ],
    relatedBrands: ["sephora"],
  },
  {
    brand: "Walmart Canada",
    slug: "walmart-ca",
    country: "CA",
    countryName: "Canada",
    category: ["department-stores", "grocery-bigbox", "clothing"],
    logo: "/logos/walmart.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.walmart.ca/en/help/returns",
    metaDescription: "Walmart Canada's return policy explained: 90-day window for most items, but strict 14-day limit on many electronics (computers, cameras, tablets) and how to return.",
    quickAnswer: {
      returnWindow: "90 days (14 for electronics, 15 for cell phones)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or gift card",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Strict Receipt Requirement",
        status: "warning",
        note: "No-receipt returns require manager override",
      },
      {
        label: "14-Day Electronics Cap",
        status: "warning",
        note: "Strict 14 days for computers, cameras, and tablets (US has 30)",
      },
      {
        label: "Free In-Store Returns",
        status: "yes",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise",
        window: "90 days",
        condition: "New or defective, tags on apparel",
        fee: "None",
      },
      {
        category: "Computers & Laptops",
        window: "14 days",
        condition: "Unopened or defective, original box required",
        fee: "None",
      },
      {
        category: "Cell Phones & Smartwatches",
        window: "15 days",
        condition: "With all accessories",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Verify the Category Timeframe",
        text: "Make sure you return high-value electronics like tablets within the strict 14-day Canadian window (unlike the 30-day US window).",
      },
      {
        title: "Bring receipt and original payment",
        text: "Walmart Canada requires a valid receipt to process returns to the original payment method. Unreceipted returns are highly restricted.",
      },
    ],
    faqs: [
      {
        question: "How does Walmart Canada's return window differ from Walmart US?",
        answer: "While general merchandise gets 90 days in both countries, Walmart Canada has a much shorter 14-day window for laptops, tablets, GPS, video game consoles, and cameras, whereas Walmart US allows 30 days.",
      },
      {
        question: "Can I return Walmart Canada items without a receipt?",
        answer: "Walmart Canada is much stricter than its US counterpart. No-receipt returns are subjected to strict manager approval and are usually limited to exchanges or store credit for unopened items only.",
      },
    ],
    relatedBrands: ["walmart", "target-au", "sephora-ca"],
    proseContent: `
Walmart Canada offers a 90-day standard return window that matches Walmart US, but it is **much more restrictive** when it comes to high-value consumer electronics and receipt proof.

### The 14-Day Canadian Electronics Trap
While Walmart US offers a 30-day window for standard electronics, Walmart Canada caps returns for key tech products at **14 days**. This applies to:
- Computers, laptops, and tablets
- Cameras, camcorders, and GPS devices
- Video game consoles and handheld systems

If you miss this 14-day window, you will have to deal with the manufacturer's warranty directly.

### Strict Receipt and ID Checks
In Canada, returns without a receipt are not a guaranteed path. While the US offers a standard photo ID lookup up to three times, Walmart Canada requires a receipt for almost all refunds. Any exception requires strict store-manager override and is typically limited to an exact exchange.
`,
  },
  {
    brand: "Sephora Canada",
    slug: "sephora-ca",
    country: "CA",
    countryName: "Canada",
    category: ["beauty"],
    logo: "/logos/sephora.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.sephora.com/ca/en/beauty/returns-exchanges",
    metaDescription: "Sephora Canada return policy: Strict 30-day window for returns of gently used items. Unlike the US, no returns or store credit are accepted after 30 days.",
    quickAnswer: {
      returnWindow: "30 days (Strict cutoff, no credit after)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or store credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Used/Opened Beauty accepted",
        status: "yes",
        note: "Gently used cosmetics under 50% consumed",
      },
      {
        label: "Strict 30-Day Window",
        status: "warning",
        note: "No returns or credit accepted after day 30 (Unlike US 60-day rule)",
      },
      {
        label: "Beauty Insider Lookup",
        status: "yes",
        note: "Lookup via email or phone",
      },
    ],
    policyTable: [
      {
        category: "Gently used cosmetics",
        window: "30 days",
        condition: "Gently used, original packaging preferred",
        fee: "None",
      },
      {
        category: "Returns on day 31+",
        window: "Not accepted",
        condition: "Exceeded time limit",
        fee: "N/A",
      },
    ],
    steps: [
      {
        title: "Track the 30-day timeline",
        text: "Make sure you return or exchange the product within exactly 30 days of purchase or shipment delivery.",
      },
      {
        title: "Utilize Beauty Insider account",
        text: "Ensure the cashier scans your account at checkout so your purchase can be verified without a physical slip.",
      },
    ],
    faqs: [
      {
        question: "Can I return items to Sephora Canada after 30 days?",
        answer: "No. Unlike Sephora US, which allows store credit returns from days 31 to 60, Sephora Canada enforces a strict 30-day cutoff. No returns or exchanges are accepted after 30 days.",
      },
    ],
    relatedBrands: ["sephora", "ulta", "walmart-ca"],
    proseContent: `
Sephora Canada maintains high standards for customer satisfaction by allowing returns on opened or swatched makeup, but they enforce a **strictly shorter timeline** than their US counterparts.

### The Big Difference: No 31-60 Day Window
If you shop at Sephora in the United States, you can return gently used beauty items within 30 days for a full refund, and from day 31 to 60 for Sephora store credit. 

**Sephora Canada does not have this grace period.** 
- All returns, exchanges, and credits must occur within **exactly 30 days**.
- Once 30 days have elapsed, the transaction is completely final.

### Gentle Use Policy
Canadian customers can feel confident testing foundations or skincare formulations; as long as the item is less than 50% consumed and returned within 30 days, Sephora Canada will issue a full refund.
`,
  },
  {
    brand: "Target Australia",
    slug: "target-au",
    country: "AU",
    countryName: "Australia",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/target.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.target.com.au/help/returns-exchanges",
    metaDescription: "Target Australia's return policy: 60-day window for change of mind. Note: This is a separate Australian company and doesn't offer the 365-day Target US brand policy.",
    quickAnswer: {
      returnWindow: "60 days for change of mind",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or store credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "Change of Mind Terms",
        status: "warning",
        note: "Must be unworn and in resaleable condition with tags",
      },
      {
        label: "60-Day Return Window",
        status: "yes",
      },
      {
        label: "No 365-Day Private Brands Policy",
        status: "warning",
        note: "Not affiliated with Target US; no 1-year brand returns",
      },
    ],
    policyTable: [
      {
        category: "Change of Mind (Apparel)",
        window: "60 days",
        condition: "Resaleable, unworn, original tags attached",
        fee: "None",
      },
      {
        category: "Faulty Items",
        window: "Reasonable lifetime",
        condition: "Manufacturer defect",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Ensure items are resaleable",
        text: "Double check that clothing is unworn, unwashed, and has all original price tags and tags attached.",
      },
      {
        title: "Bring tax invoice or receipt",
        text: "You must present a clear receipt or proof of purchase. Target Australia does not have a linked credit card lookup database like Target US.",
      },
    ],
    faqs: [
      {
        question: "Is Target Australia affiliated with Target US?",
        answer: "No. Target Australia is owned and operated by Wesfarmers, an Australian conglomerate. It has no corporate connection to Target Corporation in the US, meaning policies like the 365-day Target brand return window do not apply.",
      },
      {
        question: "Can I return washed or worn clothes to Target Australia?",
        answer: "No. Unlike Target US, which is extremely lenient with worn clothing, Target Australia's change-of-mind policy requires items to be in pristine, resaleable condition with tags attached.",
      },
    ],
    relatedBrands: ["target", "walmart-ca"],
    proseContent: `
One of the most common sources of confusion for international shoppers is the relationship between **Target US** and **Target Australia**. 

### Two Entirely Different Corporations
Target Australia is an entirely independent company owned by Australia's Wesfarmers. They license the brand name and bullseye logo, but their supply chains, ownership, and policies are completely separate. 

As a result:
- **No 365-day private label warranty**: Target US's policy of returning Cat & Jack items for a full year does not exist in Australia.
- **Resaleable condition only**: While Target US frequently accepts washed clothes if you are unsatisfied, Target Australia requires garments to be completely unworn, unwashed, and in resaleable condition with tags on for standard change-of-mind returns.

### Standard 60-Day Window
Target Australia offers a standard **60-day return window** for change-of-mind returns. This is longer than some Australian department stores but shorter than Target US's 90-day baseline. Proof of purchase (such as a physical receipt or bank statement) is strictly required.
`,
  },
  {
    brand: "Nike UK",
    slug: "nike-uk",
    country: "UK",
    countryName: "United Kingdom",
    category: ["activewear", "clothing"],
    logo: "/logos/nike.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.nike.com/gb/help/a/returns-policy",
    metaDescription: "Nike UK return policy: 30 days to return or test items, even if they have been worn. Free online returns for registered accounts.",
    quickAnswer: {
      returnWindow: "30 days (for both members and guests)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Wear Test Trial",
        status: "yes",
        note: "Test your shoes on road or track",
      },
      {
        label: "Worn shoes accepted",
        status: "yes",
        note: "Accepted if you don't love the fit",
      },
      {
        label: "Free Returns",
        status: "yes",
        note: "Generate free shipping label via account",
      },
    ],
    policyTable: [
      {
        category: "Worn sneakers & gear",
        window: "30 days",
        condition: "Tested, light performance wear",
        fee: "None",
      },
      {
        category: "Unworn items",
        window: "Unlimited (with receipt)",
        condition: "Brand new, tags on",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Register a Nike account",
        text: "Make sure you log into your Nike account during purchase to track your return digitally and enjoy free return shipping labels.",
      },
      {
        title: "Return via digital postal service",
        text: "UK customers can generate a free Royal Mail or Evri QR code and drop the package off without needing a printed label.",
      },
    ],
    faqs: [
      {
        question: "Does Nike UK offer a 60-day return window like Nike US?",
        answer: "Typically no. Nike UK standardizes on a 30-day return window for all purchases, although they occasionally run extended promotional windows (like 60 days) during the Christmas holiday period.",
      },
    ],
    relatedBrands: ["nike", "amazon-uk"],
    proseContent: `
Nike UK provides the same excellent satisfaction guarantee as the US branch, allowing runners and athletes to test footwear under real conditions.

### Worn Shoe Performance Trial
UK athletes get **30 days** to wear and test out their Nike sneakers or sportswear. If the shoe causes blisters or doesn't perform to expectations, it can be returned for a full refund.

### Return Drop-offs in the UK
Nike UK makes return shipping extremely convenient. You can start your return in the Nike App to generate a digital QR barcode. 

No printer is required: simply take your package and the barcode to a local **Post Office (Royal Mail)** or **Evri ParcelShop**, and they will print and attach the shipping label for you free of charge.
`,
  },
  {
    brand: "Amazon UK",
    slug: "amazon-uk",
    country: "UK",
    countryName: "United Kingdom",
    category: ["marketplaces", "electronics", "clothing"],
    logo: "/logos/amazon.svg",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.amazon.co.uk/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    metaDescription: "Amazon UK's return policy: 30-day standard window. Returns can be dropped off at Evri, Post Office, or Amazon Lockers.",
    quickAnswer: {
      returnWindow: "30 days from delivery",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment or Amazon gift card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "30-Day Return Window",
        status: "yes",
      },
      {
        label: "Label-free postal drops",
        status: "yes",
        note: "Drop off at Evri, Post Office, or Royal Mail Collection",
      },
      {
        label: "Marketplace seller variation",
        status: "warning",
      },
    ],
    policyTable: [
      {
        category: "General Merchandise",
        window: "30 days",
        condition: "New and unused preferred",
        fee: "None",
      },
      {
        category: "Clothing & Shoes",
        window: "30 days",
        condition: "New with tags",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Initiate return on Amazon.co.uk",
        text: "Go to your 'Your Orders' section in your UK Amazon account and start the return process.",
      },
      {
        title: "Select postal drop-off",
        text: "Select Evri, Royal Mail, or an Amazon Locker near you as your drop-off point.",
      },
    ],
    faqs: [
      {
        question: "How do I return items to Amazon UK without a printer?",
        answer: "You can select the label-free, box-free options for Royal Mail or Evri. They will scan a QR code on your phone and print the shipping label on-site.",
      },
    ],
    relatedBrands: ["amazon", "nike-uk"],
    proseContent: `
Amazon UK mirrors the global 30-day return policy but operates with local UK logistics partnerships to provide frictionless return operations.

### Local UK Return Drop-off Partners
Unlike the US, where drops occur at Whole Foods or Kohl's, Amazon UK partners with:
- **Royal Mail (Post Office)**: You can schedule a home collection where a mail carrier picks up the return with a label, or drop it off at a branch.
- **Evri ParcelShop**: Highly popular drop-off points inside neighborhood convenience stores and supermarkets.
- **Amazon Lockers & Counters**: Standard automated package lockers for fully contactless drop-offs.
`,
  },
  {
    brand: "eBay",
    slug: "ebay",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/ebay.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.ebay.com/help/buying/returns-refunds/start-return?id=4041",
    metaDescription: "eBay's global 2026 return policy guide. Learn how eBay's Money Back Guarantee (MBG) protects buyers worldwide (US, UK, CA, AU, UAE, Saudi) even if a seller states 'No Returns'.",
    quickAnswer: {
      returnWindow: "30 days (eBay Money Back Guarantee)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or PayPal refund",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Money Back Guarantee",
        status: "yes",
        note: "Covers items not as described",
      },
      {
        label: "Seller-Specific Windows",
        status: "warning",
        note: "Sellers choose 0, 14, 30, or 60 days",
      },
      {
        label: "Free Returns Option",
        status: "yes",
        note: "Available on listings marked 'Free Returns'",
      },
    ],
    policyTable: [
      {
        category: "eBay Money Back Guarantee",
        window: "30 days from delivery",
        condition: "Defective, damaged, or not as described",
        fee: "None (Seller pays return shipping)",
      },
      {
        category: "Seller Returns (Standard)",
        window: "30 days (default)",
        condition: "Item must be in original sent condition",
        fee: "Varies (Seller or Buyer pays shipping)",
      },
      {
        category: "Seller Returns (Extended)",
        window: "60 days",
        condition: "Item must be in original sent condition",
        fee: "Varies",
      },
      {
        category: "No-Return Listings",
        window: "0 days (Buyer remorse)",
        condition: "Strictly non-returnable unless defective",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Find the item in your Purchase History",
        text: "Log into your eBay account, navigate to 'Purchase History', and locate the item you wish to return.",
      },
      {
        title: "Select 'Return this item'",
        text: "Click 'Return this item' and select a reason (e.g., 'Doesn't match description' or 'Wrong size').",
      },
      {
        title: "Wait for the seller's response",
        text: "The seller has 3 business days to accept the return, offer a partial refund, or send a return shipping label.",
      },
      {
        title: "Pack and ship the item",
        text: "Attach the provided eBay return label to your package and drop it off at the carrier post office.",
      },
    ],
    faqs: [
      {
        question: "Can I return an item on eBay if the seller says 'No Returns'?",
        answer: "Yes. eBay's Money Back Guarantee overrides any seller's individual 'No Returns' policy if the item arrives damaged, defective, or is significantly different from what was described in the original listing. You must file a claim within 30 days of the actual or estimated delivery date.",
      },
      {
        question: "Who pays for return shipping on eBay in 2026?",
        answer: "It depends on the reason for the return. If the return is due to seller error (defective item, damaged, wrong item), the seller is legally obligated to pay for return shipping. If the return is due to buyer's remorse (changed mind, didn't fit), the shipping cost is paid by the buyer unless the listing explicitly featured 'Free Returns'.",
      },
      {
        question: "What is eBay's Money Back Guarantee (MBG)?",
        answer: "The Money Back Guarantee is eBay's core consumer protection shield. It ensures buyers receive the exact item they ordered, or their money back. It covers almost all physical transactions completed on eBay.com, eBay.co.uk, eBay.ca, and eBay.com.au.",
      },
      {
        question: "How long does a seller have to refund me on eBay?",
        answer: "Once the tracking number confirms the seller has physically received the returned package, they have exactly two (2) business days to inspect the item and issue a full refund. If they fail to do so, you can 'Ask eBay to step in' to force an immediate automated credit.",
      },
    ],
    relatedBrands: ["amazon", "etsy"],
    proseContent: `
eBay operates as an international online auction house and peer-to-peer retail marketplace. Because transactions are fulfilled by individual professional sellers, small businesses, and hobbyists, return conditions differ from traditional brick-and-mortar stores.

### 🛡️ The Ultimate Consumer Shield: eBay Money Back Guarantee (MBG)
The most critical rule to understand is that **eBay's Money Back Guarantee completely overrides any seller's posted policy**. 
Even if a listing is marked **"Sellers does not accept returns"**, the seller is legally forced to accept the return and pay for shipping if:
1. The item arrives physically damaged or broken.
2. The item is counterfeit or a replica.
3. The seller shipped the incorrect size, color, or model.
4. The product is missing critical pieces listed in the description.

You have a strict window of **30 days** from the actual or estimated delivery date to report these issues and claim protection under the eBay MBG.

### 🔄 Buyer's Remorse Returns (Changed Your Mind)
If you simply do not like the item, want a different color, or it doesn't fit, the seller's specific policy applies:
- **No Returns:** Seller is not obligated to accept the return.
- **30-Day / 60-Day Returns:** Seller accepts remorse returns. The buyer typically pays the return postal shipping fee.
- **Free Returns:** Highly recommended for premium buyers. The seller accepts remorse returns and pays for the return postage label.
`,
  },
  {
    brand: "Etsy",
    slug: "etsy",
    category: ["clothing", "department-stores"],
    logo: "/logos/etsy.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.etsy.com/help/article/484",
    metaDescription: "Etsy's 2026 return and refund policies explained. Learn how individual handmade shops set return terms and how Etsy's Purchase Protection program shields orders up to $250.",
    quickAnswer: {
      returnWindow: "Varies by shop (typically 14 to 30 days)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Etsy Purchase Protection",
        status: "yes",
        note: "Up to $250 covered for qualifying orders",
      },
      {
        label: "Individual Shop Rules",
        status: "warning",
        note: "Sellers set their own terms",
      },
      {
        label: "Custom Goods Excluded",
        status: "warning",
        note: "Personalized products generally final sale",
      },
    ],
    policyTable: [
      {
        category: "Standard Handcrafted / Vintage Items",
        window: "14 to 30 days (varies by seller)",
        condition: "Unused and in original condition",
        fee: "Varies (buyer usually pays return shipping)",
      },
      {
        category: "Custom / Personalized Commissions",
        window: "Non-returnable",
        condition: "Unless damaged or incorrect spelling",
        fee: "None",
      },
      {
        category: "Etsy Purchase Protection Shield",
        window: "180 days from transaction date",
        condition: "Order arrives damaged or is lost in transit",
        fee: "Free (full refund issued by Etsy)",
      },
    ],
    steps: [
      {
        title: "Contact the Etsy shop owner",
        text: "Go to your Purchases, select the order, click 'Help with order', and message the artist directly.",
      },
      {
        title: "Request a return details statement",
        text: "The shop owner will guide you on their return address and postal carrier guidelines.",
      },
      {
        title: "Open a Case (if seller is unresponsive)",
        text: "If the seller does not reply within 3 business days or refuses a refund for a damaged item, escalate to Etsy support.",
      },
    ],
    faqs: [
      {
        question: "Can I return personalized or custom items on Etsy?",
        answer: "Generally no. Under standard consumer laws and Etsy policy, custom-made, personalized, or bespoke commissions (such as jewelry with engraved initials, custom family portraits, or tailor-made garments) are strictly non-returnable unless they arrive physically damaged or with manufacturing errors.",
      },
      {
        question: "How does Etsy's Purchase Protection Program work in 2026?",
        answer: "Etsy's Purchase Protection program shields buyers for qualifying transactions up to $250 USD. If your package is lost in transit, arrives damaged, or does not match the seller's listing photographs, Etsy will refund you 100% of the cost, often funding the refund themselves to protect both you and the small business artist.",
      },
      {
        question: "Who pays for return postage on Etsy?",
        answer: "By default, the buyer is responsible for return shipping costs unless the shop owner explicitly offers free return shipping in their individual listing policy, or if the item arrived broken, in which case the seller must cover shipping.",
      },
    ],
    relatedBrands: ["ebay", "amazon"],
    proseContent: `
Etsy is a global marketplace focusing on handmade, vintage, and creative craft goods. Because there is no central warehouse, returns are managed individually by independent artists and collectors worldwide.

### 🎨 The Small Business Reality: Shop-Specific Policies
Every Etsy creator sets their own return window and guidelines. Before completing a checkout, always click the **"Shipping & Returns"** tab on the listing:
- **No Returns Accepted:** Standard for many independent crafters who manufacture goods to order.
- **14-Day EU Right of Withdrawal:** Under European consumer laws, sellers trading with EU citizens must accept returns on non-customized goods within 14 days of delivery, regardless of their default store policy.
- **30-Day Window:** Offered by larger, high-volume boutique stores on the platform.

### 🛡️ Etsy Case Resolution and Protection
If an item arrives broken, damaged, or completely different from the description, and the shop owner refuses to cooperate, you can open a formal "Case". Etsy's support desk will step in to review shipping logs and photos. If approved, a full refund will be processed directly to your original payment card.
`,
  },
  {
    brand: "Noon",
    slug: "noon",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/noon.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://help.noon.com",
    metaDescription: "Noon's official 2026 return policy for Dubai (UAE) and Saudi Arabia. Read about the strict 15-day return window, noon express free pickups, and buyer protection guidelines.",
    quickAnswer: {
      returnWindow: "15 days from delivery date",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Noon credits wallet or original payment card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Noon Express Pickup",
        status: "yes",
        note: "Free courier pickup at your home or office",
      },
      {
        label: "Factory Sealed Electronics",
        status: "warning",
        note: "Opened electronics are non-returnable",
      },
      {
        label: "15-Day Middle East Window",
        status: "yes",
        note: "Applicable in UAE, Saudi Arabia, and Egypt",
      },
    ],
    policyTable: [
      {
        category: "Fashion, Shoes & Eyewear",
        window: "15 days",
        condition: "Tags attached, unworn, original packaging",
        fee: "Free pickup",
      },
      {
        category: "Electronics, Phones & Laptops",
        window: "15 days",
        condition: "Must be factory sealed, unopened box",
        fee: "None",
      },
      {
        category: "Cosmetics & Perfumes",
        window: "Non-returnable",
        condition: "Due to health and sanitary regulations",
        fee: "None",
      },
      {
        category: "Damaged / Incorrect Items",
        window: "15 days (report within 48h)",
        condition: "Accepted with original barcodes",
        fee: "Free pickup & full refund",
      },
    ],
    steps: [
      {
        title: "Go to your Noon Account",
        text: "Tap 'My Account' on Noon.com or the Noon app, select 'Returns', and click 'Create Return Request'.",
      },
      {
        title: "Select the return package reason",
        text: "Select your items and state the reason for return. Choose between original card refund or Noon store credits.",
      },
      {
        title: "Schedule Courier Collection",
        text: "A Noon courier will call you to arrange free pickup from your address within 24-48 hours.",
      },
      {
        title: "Verification at Noon Warehouse",
        text: "Once the item reaches Noon's hub, their team inspects the seals. Refunds are processed within 5-7 working days.",
      },
    ],
    faqs: [
      {
        question: "Can I return opened electronics to Noon in Dubai or Saudi Arabia?",
        answer: "No. Noon enforces a very strict unopened policy for consumer electronics, smartphones, tablets, and laptops. If you break the clear shrinkwrap or manufacturer seal, the item becomes ineligible for return unless it has a verified hardware defect covered by Noon's 2-year warranty.",
      },
      {
        question: "What items are completely excluded from Noon returns?",
        answer: "In compliance with Middle East health and safety standards, the following items cannot be returned to Noon: cosmetics, perfumes, underwear, swimwear, socks, books, digital software cards, and baby hygiene products.",
      },
      {
        question: "Does Noon charge for return courier collections?",
        answer: "No. Noon offers 100% free return courier collections at your doorstep for all eligible return requests across Dubai, Abu Dhabi, Riyadh, Jeddah, and other major cities in the UAE and Saudi Arabia.",
      },
    ],
    relatedBrands: ["amazon", "shein"],
    proseContent: `
Noon is the leading local e-commerce platform operating across the United Arab Emirates (UAE), Kingdom of Saudi Arabia (KSA), and Egypt. Noon provides a unified shopping experience with localized customer support.

### 🇦🇪🇸🇦 The 15-Day Gulf return window
Noon operates a standard **15-day return window** from the date of physical delivery. This applies to both **Noon Express** (items fulfilled from Noon's own hyper-warehouses) and Marketplace products.

### 🛡️ Unboxing Verification & Sealed Requirements
To prevent return abuse, Noon enforces strict product conditions upon courier arrival:
1. **Fashion & Clothing:** Must be completely unworn with all cardboard designer tags intact and attached.
2. **Electronics & Tech:** Must be in their completely pristine, unopened factory packaging. Once you tear the clear plastic seal or boot the device, a return is blocked.
3. **Damaged on Arrival:** If you receive a damaged or broken item, you must report it to Noon customer support within **48 hours of delivery** to guarantee an automatic refund.
`,
  },
  {
    brand: "Shein",
    slug: "shein",
    category: ["clothing"],
    logo: "/logos/shein.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.shein.com/Return-Policy-a-281.html",
    metaDescription: "Shein's 2026 return policy: 35-day window, first return label is 100% free, and rules for swimwear, lingerie, and makeup.",
    quickAnswer: {
      returnWindow: "35 days from delivery date",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Shein Wallet balance or original payment card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Free First Return Label",
        status: "yes",
        note: "No shipping fee for the first parcel in any order",
      },
      {
        label: "35-Day Return Window",
        status: "yes",
        note: "Extended from historical 30 days",
      },
      {
        label: "Hygiene Seal Rules",
        status: "warning",
        note: "Swimwear and underwear require seals intact",
      },
    ],
    policyTable: [
      {
        category: "Clothing & Apparel",
        window: "35 days",
        condition: "Unworn, unwashed, original zip-lock bags",
        fee: "Free (first label); subsequent labels $7.99",
      },
      {
        category: "Swimwear & Lingerie",
        window: "35 days",
        condition: "Hygiene sticker must be completely untorn",
        fee: "Free (first label)",
      },
      {
        category: "Cosmetics & Makeup",
        window: "Non-returnable",
        condition: "Due to sanitation standards",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Open a Return Ticket",
        text: "Log into the Shein App, go to 'My Orders', click 'Return Item', and check the products you want to send back.",
      },
      {
        title: "Select your return shipping method",
        text: "Select your postal carrier drop-off (such as USPS, UPS, Evri, or Aramex depending on your country).",
      },
      {
        title: "Print and attach the barcoded label",
        text: "Print the generated Shein return label and tape it onto the shipping bag. First return is completely free.",
      },
      {
        title: "Receive your refund",
        text: "Refunds are processed within 7-10 days of reaching Shein's hub, sent to your Shein Wallet or original card.",
      },
    ],
    faqs: [
      {
        question: "Can I return Shein items if I threw away the original zip-lock bags?",
        answer: "Yes, but it is highly discouraged. Shein uses the unique SKU barcode sticker on each item's individual zip-lock plastic bag to scan and identify items at their robotic fulfillment centers. If you threw them away, place the items in clean, clear bags and write the SKU number clearly on the outside to prevent refund rejection.",
      },
      {
        question: "What is Shein's return policy for swimwear and lingerie?",
        answer: "Shein accepts returns on swimwear, lingerie, and bodysuits, but only if the protective hygiene sanitary sticker is completely untorn, clean, and in place on the garment crotch liner. If the liner is removed or dirty, the return is immediately declined.",
      },
      {
        question: "How much does Shein charge for return shipping?",
        answer: "Your first return label for **any single order** is 100% free. If you decide to return additional items from the same order at a later date, you must pay a flat shipping fee (typically $7.99 in the US, £6.50 in the UK, or equivalent in AED/SAR) which is deducted directly from your refund amount.",
      },
    ],
    relatedBrands: ["noon", "amazon"],
    proseContent: `
Shein is an international ultra-fast-fashion e-commerce giant delivering apparel and accessories to customers in over 150 countries. 

### ⏱️ The 35-Day return policy
Shein's standard return window is **35 days** from the physical delivery date. This provides ample time to try on outfits at home and initiate a return if you are unsatisfied with the fabric, sewing, or fit.

### 🎒 The Original Bag & Barcode requirement
Every Shein garment is shipped inside a reusable, barcoded zip-lock plastic bag. When returning clothing, Shein's warehouse scanners depend on these barcodes. **Do not throw these bags away** until you have confirmed you are keeping the entire order. 

If you lost the original bag, write the product SKU number (found on your order confirmation page) onto a clear sticker and apply it to a substitute transparent polybag to guarantee your credit.
`,
  },
  {
    brand: "Daraz",
    slug: "daraz",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/daraz.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.daraz.pk/helpcenter/returns-refunds/",
    metaDescription: "Daraz Pakistan's official 2026 return policy. Learn how to return items in Lahore, Karachi, and Islamabad, Daraz Mall 14-day windows, and refund procedures.",
    country: "PK",
    countryName: "Pakistan",
    quickAnswer: {
      returnWindow: "14 days (DarazMall) / 7 days (Standard)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Daraz Wallet, bank transfer, or Easypaisa/JazzCash",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "DarazMall 14-Day Guarantee",
        status: "yes",
        note: "14 days return for official brand shops",
      },
      {
        label: "Easy Drop-off Partners",
        status: "yes",
        note: "Free drop-offs at any Daraz Shop or TCS Express Center",
      },
      {
        label: "Change of Mind Optional",
        status: "warning",
        note: "Sellers must opt-in for change of mind",
      },
    ],
    policyTable: [
      {
        category: "DarazMall Brand Purchases",
        window: "14 days from delivery",
        condition: "Unused, tags intact, original brand box",
        fee: "Free drop-off / Free pickup in major cities",
      },
      {
        category: "Local Marketplace Sellers",
        window: "7 days from delivery",
        condition: "Defective, wrong item, or damaged on arrival",
        fee: "Free drop-off",
      },
      {
        category: "Cross-Border (Daraz Global)",
        window: "7 days from delivery",
        condition: "Strictly defective or not as described",
        fee: "Free drop-off",
      },
    ],
    steps: [
      {
        title: "Initiate return on the Daraz App",
        text: "Go to 'My Orders', select your order, and tap 'Return/Refund'. Fill out the reason form with photographic proof.",
      },
      {
        title: "Choose drop-off or pickup partner",
        text: "Select 'Drop-off' (to bring to any Daraz Shop, TCS Center, or Dex hub) or 'Pickup' (available in Karachi, Lahore, Islamabad).",
      },
      {
        title: "Pack the item securely with the Return Label",
        text: "Place the item in its original brand box and outer packaging. Print the generated Daraz return label or write the Return Number (RA) clearly on the package.",
      },
      {
        title: "Receive refund via Easypaisa, JazzCash, or Bank Account",
        text: "Once approved at the Jamil Town or Korangi warehouse, refunds take 3-5 working days to hit your bank or mobile wallet.",
      },
    ],
    faqs: [
      {
        question: "Is 'Change of Mind' return allowed on Daraz Pakistan in 2026?",
        answer: "Only for selected products! 'Change of mind' returns are strictly restricted to products that display the 'Change of Mind Allowed' tag on their main listing page. Items like innerwear, electronics, custom prints, and makeup can never be returned for change of mind.",
      },
      {
        question: "How do I ship my return back to Daraz for free?",
        answer: "Daraz Pakistan offers 100% free return shipments if you select the 'Drop-off' option and take your package to any official Daraz Shop or any TCS Express Courier Center across Pakistan. You do not have to pay the TCS agent any delivery fees.",
      },
      {
        question: "Can I receive my Daraz refund via Easypaisa or JazzCash?",
        answer: "Yes! Daraz is fully integrated with Pakistani mobile banking services. You can select Easypaisa, JazzCash, Daraz Wallet credit, or a standard Bank Account Transfer during your digital return process. Mobile wallet refunds are typically completed within 24-48 hours after warehouse verification.",
      },
    ],
    relatedBrands: ["amazon", "ebay"],
    proseContent: `
Daraz is the leading e-commerce portal in Pakistan, serving millions of consumers in Karachi, Lahore, Rawalpindi, Islamabad, Faisalabad, and Peshawar. 

### ⏱️ DarazMall vs. Standard Seller Windows
* **DarazMall (Official Brand Outlets):** Offers an extended **14-day return window** from delivery. This guarantees that buying official products from brands like Sapphire, Nike, Samsung, or Xiaomi is risk-free.
* **Standard Sellers:** Restricted to a **7-day return window**. You must submit your request quickly to ensure coverage.

### 📦 Strict Package Inspection Guidelines
Daraz's Quality Assurance (QA) team at their main sorting hubs (like Karachi, Lahore, and Islamabad) is highly strict. Your return will be rejected if:
1. The manufacturer packaging is taped over, torn, or discarded.
2. The item has been washed, soiled, or worn outdoors.
3. High-value mobile phones or laptops have been locked with passwords, personal Google Accounts, or iCloud profiles.
4. Serial numbers on the device do not match the digital footprint saved at dispatch.
`,
  },
  {
    brand: "Flipkart",
    slug: "flipkart",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/logos/flipkart.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.flipkart.com/helpcentre",
    metaDescription: "Flipkart India's 2026 return and exchange policy. Learn about product replacement windows, reverse pickup processes, and refund timelines.",
    country: "IN",
    countryName: "India",
    quickAnswer: {
      returnWindow: "7 to 10 days (varies by seller & category)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Bank account, UPI, Flipkart gift card, or original card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Open Box Delivery Support",
        status: "yes",
        note: "Inspect expensive items before sharing OTP",
      },
      {
        label: "Free Doorstep Pickups",
        status: "yes",
        note: "Wishmasters collect returns from your home",
      },
      {
        label: "Exchange Option Available",
        status: "yes",
        note: "Seamless size exchanges for apparel",
      },
    ],
    policyTable: [
      {
        category: "Clothing, Shoes & Apparel",
        window: "10 days",
        condition: "Tags attached, unworn, original box",
        fee: "Free doorstep pickup",
      },
      {
        category: "Electronics, Phones & Appliances",
        window: "7 days (Replacement Only)",
        condition: "Requires brand service center verification",
        fee: "Free pickup",
      },
      {
        category: "Books, Toys & Homeware",
        window: "7 days",
        condition: "Prone to verification on delivery",
        fee: "Free pickup",
      },
    ],
    steps: [
      {
        title: "Request return in Flipkart app",
        text: "Select the order in your app, click 'Return', and choose either Replacement, Exchange, or Refund.",
      },
      {
        title: "Pick your refund mode",
        text: "Select your preferred refund destination: UPI, original bank card, or Flipkart Gift Card voucher.",
      },
      {
        title: "Wishmaster pickup and verification",
        text: "Flipkart's delivery executive (Wishmaster) will visit your home. They will do a physical check of tags, barcodes, and serial numbers before accepting.",
      },
      {
        title: "Instant refund processing",
        text: "Once the Wishmaster scans and accepts the parcel at your doorstep, the refund is initiated instantly via UPI.",
      },
    ],
    faqs: [
      {
        question: "What is Flipkart's 'Open Box Delivery' policy in 2026?",
        answer: "For expensive devices like smartphones, laptops, and refrigerators, Flipkart enforces 'Open Box Delivery'. The delivery partner will open the factory seal in front of you. You must inspect the physical device for cracks, correct color, and accessories. Once you share the OTP with the delivery partner, you confirm receipt in perfect condition, and returns for physical damage are strictly blocked thereafter.",
      },
      {
        question: "How long does a Flipkart UPI refund take to complete?",
        answer: "Flipkart UPI refunds are lightning fast. Once the reverse pickup partner physically scans the product at your home in India and marks it as 'Received', the refund is dispatched to your UPI account, usually landing within 5-15 minutes.",
      },
      {
        question: "Can I return a phone on Flipkart if it has a software issue?",
        answer: "Under the 2026 policy, smartphones are eligible for a 'Replacement Only' within 7 days. If there is a software bug, Flipkart will dispatch a technician or request you to visit an authorized brand service center (Samsung, Apple, Xiaomi, etc.) to obtain a Defect Verification Certificate before they process a swap.",
      },
    ],
    relatedBrands: ["amazon", "myntra"],
    proseContent: `
Flipkart is India's leading homegrown e-commerce titan, serving customers in Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, and thousands of Tier-2 and Tier-3 towns.

### 🚪 Flipkart Doorstep Quality Check (QC)
Flipkart's return process is heavily integrated with physical doorstep inspection. When a "Wishmaster" agent arrives to pick up your returned apparel or footwear:
1. They will check the shoe sole for outdoor dirt or scuffs.
2. They will scan the product barcode printed on the tag.
3. They will verify that any accessories or free promotional gifts are returned in the package.

If these criteria are not met, the agent is system-blocked from accepting the package, and your return ticket will be closed.

### 💳 Local Indian Refund Gateways
Refunds on Flipkart are tailored for Indian banking ecosystems:
* **UPI (Unified Payments Interface):** The absolute fastest method. Instant transfer to GPay, PhonePe, or Paytm accounts.
* **IMPS / Bank Transfer:** Takes 1-2 business days.
* **Credit / Debit Cards:** Standard processing takes 3-5 business days.
`,
  },
  {
    brand: "Myntra",
    slug: "myntra",
    category: ["clothing"],
    logo: "/logos/myntra.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.myntra.com/faqs",
    metaDescription: "Myntra's official 2026 return and exchange policy for Indian fashion consumers. Learn about the 14-day window and doorstep trial refunds.",
    country: "IN",
    countryName: "India",
    quickAnswer: {
      returnWindow: "14 days from delivery date",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Myntra Credit, UPI, bank account, or original card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "14-Day Free Returns",
        status: "yes",
        note: "Unused apparel and accessories are fully eligible",
      },
      {
        label: "Instant Doorstep QC",
        status: "yes",
        note: "Wishmasters verify items and initiate instant UPI refunds",
      },
      {
        label: "No Questions Asked Policy",
        status: "yes",
        note: "Applies to most general apparel",
      },
    ],
    policyTable: [
      {
        category: "Clothing & Footwear",
        window: "14 days",
        condition: "Tags attached, brand tags intact, unworn, unwashed",
        fee: "Free reverse pickup",
      },
      {
        category: "Fine Jewellery & Watches",
        window: "7 days",
        condition: "Original certificate of authenticity must be included",
        fee: "Free pickup",
      },
      {
        category: "Cosmetics & Skincare",
        window: "Non-returnable",
        condition: "Unless received expired or damaged",
        fee: "None",
      },
    ],
    steps: [
      {
        title: "Request a return on the Myntra App",
        text: "Open 'My Orders', select the item, and tap 'Return'. Select a reason (e.g., 'Size too large' or 'Material not as expected').",
      },
      {
        title: "Select your refund route",
        text: "Choose between Myntra Credit, UPI, or original payment card.",
      },
      {
        title: "Hand over to the Myntra pickup agent",
        text: "The agent will physically verify the brand tag, barcode, and wash-care labels at your doorstep.",
      },
      {
        title: "Receive refund instantly",
        text: "UPI and credit refunds are completed immediately upon doorstep collection.",
      },
    ],
    faqs: [
      {
        question: "Can I return Myntra clothing if I cut off the tags?",
        answer: "No. Myntra enforces a very strict price-tag policy. The cardboard Myntra tag and any official brand tags (e.g., Nike, Zara, H&M) must remain fully attached to the clothing with the original plastic loop. Cut or re-tied tags will trigger an immediate rejection at doorstep inspection.",
      },
      {
        question: "Does Myntra charge return fees for frequent returners?",
        answer: "Yes, in 2026 Myntra charges a minimal convenience fee (called a 'Customer Convenience Fee') on delivery for accounts with exceptionally high return-to-order ratios. Standard customers enjoy completely free returns.",
      },
    ],
    relatedBrands: ["flipkart", "amazon"],
    proseContent: `
Myntra is India's premium fashion, lifestyle, and beauty destination, known for its extensive catalogue of domestic and international fashion brands.

### ⏱️ The 14-Day Fashion Window
Myntra offers a generous **14-day return window** across the majority of its fashion catalogue. This gives ample opportunity to assess the sewing, color matching, and size in home mirrors.

### 🛡️ Preventing Return Abuse
To combat fashion rental fraud (wearing clothes to events and returning them), Myntra's doorstep agents use advanced handheld scanners to check for perfume odors, makeup stains, armpit creases, and fabric stretching.
`,
  },
  {
    brand: "AliExpress",
    slug: "aliexpress",
    category: ["department-stores", "clothing"],
    logo: "/logos/aliexpress.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://service.aliexpress.com",
    metaDescription: "AliExpress 2026 global return policy. Learn how the 'Free Return' badge protects your purchases and how local warehouse drop-offs work.",
    country: "CN",
    countryName: "China",
    quickAnswer: {
      returnWindow: "15 days from delivery date",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method or AliExpress bonus",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "Free Return Badge",
        status: "yes",
        note: "Look for 'Free Return' on listing for free local drop-offs",
      },
      {
        label: "15-Day Protection Window",
        status: "yes",
        note: "Standard across participating products",
      },
      {
        label: "Dispute Escalation Center",
        status: "yes",
        note: "AliExpress steps in if seller is unhelpful",
      },
    ],
    policyTable: [
      {
        category: "Listings with 'Free Return' Badge",
        window: "15 days",
        condition: "Unused, original packaging",
        fee: "100% Free (local domestic sorting hub)",
      },
      {
        category: "Standard Listings (No Badge)",
        window: "15 days",
        condition: "Unused",
        fee: "Buyer pays international shipping (often very high)",
      },
      {
        category: "Not as Described / Counterfeit",
        window: "15 days",
        condition: "Accepted with photographic/video proof",
        fee: "Free return or refund without return",
      },
    ],
    steps: [
      {
        title: "Open a dispute on AliExpress",
        text: "Go to 'My Orders', select the item, and click 'Return / Refund' to open a formal dispute.",
      },
      {
        title: "Select return option and wait for code",
        text: "If the listing had a 'Free Return' label, AliExpress will instantly generate a free local return prepaid shipping label (USPS, Canada Post, Royal Mail, etc.).",
      },
      {
        title: "Drop off at local sorting office",
        text: "Pack the item, attach the barcode label, and drop it off at your domestic postal partner. You do not ship to China.",
      },
      {
        title: "Receive refund at your bank",
        text: "Refund is processed automatically within 3-15 business days after the local domestic sorting hub registers your package scan.",
      },
    ],
    faqs: [
      {
        question: "Do I have to ship my return all the way back to China?",
        answer: "No! For listings with the 'Free Return' badge, AliExpress utilizes local domestic consolidation warehouses in the US, UK, Canada, Australia, and Middle East. You print a local postal label and ship to a local city within your own country. If there is no 'Free Return' badge, however, you may have to pay high postal rates to mail it directly to China.",
      },
      {
        question: "Why is a video required for an AliExpress refund dispute?",
        answer: "To prevent fraudulent claims, AliExpress's automated dispute resolution center requires high-resolution photos and video evidence. Videos showing the item malfunctioning, electronic diagnostic logs, or measuring tape checking incorrect sizing are highly effective in securing immediate refunds.",
      },
    ],
    relatedBrands: ["temu", "ebay"],
    proseContent: `
AliExpress is China's leading international retail marketplace, allowing global consumers to purchase factory-direct items from manufacturing hubs in Shenzhen, Guangzhou, and Yiwu.

### 🛡️ The 'Free Return' Badge Lifesaver
When browsing AliExpress, **always look for the 'Free Return' icon** on the product description page. This guarantees that you can return the item for any reason within 15 days, for free, to a local domestic sorting depot in your own country.

### ⚖️ The Dispute Resolution Process
If an item is damaged or does not match descriptions, and the seller tries to negotiate or refuse your refund, do not accept their proposal. Click **"Escalate to AliExpress"**. Their corporate support staff will arbitrate and issue a refund directly.
`,
  },
  {
    brand: "Temu",
    slug: "temu",
    category: ["department-stores", "clothing"],
    logo: "/logos/temu.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.temu.com/return-policy.html",
    metaDescription: "Temu's official 2026 return policy: extended 90-day return window, first return label is completely free, and refund speed analysis.",
    country: "CN",
    countryName: "China",
    quickAnswer: {
      returnWindow: "90 days from purchase date",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Temu balance or original payment card",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "90-Day Return Window",
        status: "yes",
        note: "Extremely generous trial window",
      },
      {
        label: "Free Return Shipping",
        status: "yes",
        note: "First label for every order is 100% free",
      },
      {
        label: "Keep-It Program (Selected items)",
        status: "yes",
        note: "Low-cost defective items refunded with no return required",
      },
    ],
    policyTable: [
      {
        category: "All Eligible Products",
        window: "90 days from purchase date",
        condition: "Unused, tags attached, original plastic bags",
        fee: "Free (first return package); subsequent packages $7.99",
      },
      {
        category: "Low-Value Damaged Goods",
        window: "90 days",
        condition: "No return required (instant automated refund)",
        fee: "$0",
      },
    ],
    steps: [
      {
        title: "Start return request on Temu app",
        text: "Go to your orders panel, select 'Return/Refund', check items, and choose a return reason.",
      },
      {
        title: "Print your free shipping label",
        text: "Select your local shipping partner (USPS, UPS, Evri, Australia Post, etc.) and print your barcode label.",
      },
      {
        title: "Drop off package at nearby location",
        text: "Drop the package off at your local post office or carrier counter. Shipping is completely pre-paid by Temu.",
      },
      {
        title: "Get refunded instantly",
        text: "Temu initiates refunds the moment the postal agent scans your return label, rather than waiting for the package to reach their warehouse.",
      },
    ],
    faqs: [
      {
        question: "Is Temu's return window really 90 days in 2026?",
        answer: "Yes! Temu offers an exceptionally long return window of ninety (90) days, calculated from the original date of purchase. This is one of the most generous return policies of any major global e-commerce platform.",
      },
      {
        question: "Does Temu let you keep some return items?",
        answer: "Yes, frequently. For low-cost items (typically under $10 - $15) that arrive damaged, defective, or incorrect, Temu's automated AI system will often prompt: 'No Return Required: Please keep or donate this item'. They will issue a full credit or refund instantly to save on reverse logistics shipping costs.",
      },
    ],
    relatedBrands: ["aliexpress", "shein"],
    proseContent: `
Temu is an ultra-viral e-commerce marketplace owned by PDD Holdings. It connects global buyers with third-party manufacturers, dispatching orders from major logistics hubs in China directly to your home.

### ⏱️ The 90-Day Return Rule
Temu offers a massive **90-day return window** from the date of purchase. Almost all apparel, household goods, small electronics, and pet accessories can be sent back.

### 📦 Quick Scan Refund Engine
Temu utilizes a modern "Scan-Triggered Refund" mechanism. Instead of waiting weeks for your box to reach their central depots, Temu's systems detect when your local post office scans the return shipping label. Once scanned by the postal carrier, Temu will instantly credit your Temu Wallet balance.
`,
  },
  {
    brand: "DSW",
    slug: "dsw",
    country: "US",
    countryName: "United States",
    category: ["clothing", "activewear"],
    logo: "/images/stores/dsw.png",
    lastVerified: "2026-08-01",
    officialPolicyUrl: "https://www.dsw.com/en/us/legal/return-policy",
    policyAlert: {
      type: "extended",
      title: "DSW VIP Tiered Window Benefit Active",
      message: "DSW confirmed 365-day return window for Elite VIP tier, 90 days for Club VIPs, and 60 days for guests. $8.50 mail return shipping fee waived for all logged-in VIP members.",
      updatedDate: "August 2026",
      actionNote: "Sign into free DSW VIP account to unlock free return shipping"
    },
    metaDescription: "DSW Return Policy Guide for 2026: 90 days for VIP members, 60 days for guests, and 365 days for Elite VIPs. Unworn shoe rules, no-receipt lookups, and clearance exceptions.",
    quickAnswer: {
      returnWindow: "90 Days for VIP / 60 for Guests / 365 for Elite",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method, store credit, or exchange",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "VIP Free Returns",
        status: "yes",
        note: "Free in-store and free mail for VIPs",
      },
      {
        label: "Worn Shoe Limit",
        status: "warning",
        note: "Shoes must be unworn unless defective",
      },
      {
        label: "No-Receipt Lookup",
        status: "yes",
        note: "Lookup via DSW VIP account",
      },
      {
        label: "Clearance returns",
        status: "yes",
        note: "Eligible unless marked Final Sale",
      }
    ],
    policyTable: [
      {
        category: "VIP Club Members",
        window: "90 days",
        condition: "Unworn with box preferred",
        fee: "Free return shipping"
      },
      {
        category: "DSW VIP Elite Members",
        window: "365 days",
        condition: "Unworn with box",
        fee: "Free return shipping"
      },
      {
        category: "Guest / Non-VIP",
        window: "60 days",
        condition: "Unworn with box",
        fee: "$8.50 mail fee (Free in-store)"
      },
      {
        category: "Worn / Used Shoes",
        window: "No returns",
        condition: "Only if defective",
        fee: "None"
      }
    ],
    steps: [
      {
        title: "Verify your DSW VIP account or receipt",
        text: "Make sure you have your paper receipt, order confirmation email, or your DSW VIP rewards account ready."
      },
      {
        title: "Keep shoes in original unworn state",
        text: "Ensure the shoes have not been worn outside. Keep them in the original shoe box if possible."
      },
      {
        title: "Choose: Store drop-off or pre-paid mail label",
        text: "In-store returns are instantly refunded and 100% free. Online returns can be shipped back (free for Gold/Elite/VIP, $8.50 for guests)."
      },
      {
        title: "Process exchange or instant refund",
        text: "Receive your refund to your credit card, PayPal, or exchange instantly for a different style or size."
      }
    ],
    faqs: [
      {
        question: "Can I return worn shoes to DSW?",
        answer: "No, DSW's standard return policy requires shoes to be in unworn, resaleable condition in their original packaging. However, if the shoes have a clear manufacturing defect (such as sole separation or broken stitching) under normal use, DSW will replace or refund them."
      },
      {
        question: "How long is the DSW return window?",
        answer: "Standard DSW VIP members get 90 days to make returns. Guests (non-members) get 60 days, and DSW VIP Elite tier members get an extremely generous 365 days from the date of purchase."
      },
      {
        question: "Can I return online DSW orders to a store?",
        answer: "Yes! Any purchase made on DSW.com can be returned or exchanged at any DSW physical store location for free. This avoids any mail return shipping fees."
      }
    ],
    relatedBrands: ["nike", "target", "walmart"],
    proseContent: `
Designer Shoe Warehouse (DSW) offers a highly flexible, tiered return structure closely integrated with its DSW VIP loyalty program. Understanding your tier and the condition of your shoes is key to a smooth return.

### 👥 The DSW VIP Loyalty Tiers
Your return window and shipping costs depend on your membership status:
* **Guests / Non-members:** 60-day return window. If returned by mail, an $8.50 return shipping fee is deducted from your refund. In-store returns are free.
* **DSW VIP Members (Free tier):** 90-day return window. Free return shipping when starting the return online. Free in-store returns.
* **DSW VIP Elite Members:** 365-day return window. Free return shipping and free in-store returns.

### 👟 Worn Shoe Rules: The Golden Rule of Footwear Returns
DSW strictly enforces that returned shoes must be **unworn** and in their original packaging (original shoebox). Walking around outside on pavement will scratch the soles and trigger a rejection during store inspection. 
* *Indoor Try-On:* Always test your new sneakers, boots, or heels on carpet first to check sizing before wearing them outside.
* *Defect Exception:* If the shoe breaks or splits due to a manufacturing quality issue, you can request an audit for a defect exchange even if worn.

### 📄 No Receipt Return Solutions
If you misplaced your printed store receipt, DSW can easily track your transaction if:
1. You scanned your **DSW VIP Rewards account** at checkout.
2. The cashier can look up your credit/debit card.
3. If they cannot locate any proof of purchase, DSW may issue a merchandise credit (store gift card) for the item's lowest recent selling price, subject to showing a valid photo ID.
`
  },
  {
    brand: "Nordstrom",
    slug: "nordstrom",
    country: "US",
    countryName: "United States",
    category: ["department-stores", "clothing", "beauty"],
    logo: "/images/stores/nordstrom.png",
    lastVerified: "2026-07-01",
    officialPolicyUrl: "https://www.nordstrom.com/browse/customer-service/return-policy",
    metaDescription: "Nordstrom's legendary return policy explained: No formal deadlines, case-by-case evaluation, worn shoe acceptance, and Nordstrom Rack exceptions.",
    quickAnswer: {
      returnWindow: "No strict limit (30 days for Nordstrom Rack)",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Original payment method, gift card, or exchange",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "No Strict Deadlines",
        status: "yes",
        note: "Case-by-case standard",
      },
      {
        label: "Worn Items Allowed",
        status: "yes",
        note: "Under reasonable wear-and-tear",
      },
      {
        label: "Frictionless Lookup",
        status: "yes",
        note: "Phone, email, or card lookup",
      },
      {
        label: "Free Mail Shipping",
        status: "yes",
        note: "Prepaid label included",
      }
    ],
    policyTable: [
      {
        category: "Nordstrom Mainline Purchases",
        window: "No formal deadline",
        condition: "Gently worn or new",
        fee: "Free return shipping"
      },
      {
        category: "Nordstrom Rack Items",
        window: "30 days",
        condition: "Unworn with tags attached",
        fee: "$5.95 mail fee (Free in-store)"
      },
      {
        category: "Fine Jewelry & Designer Apparel",
        window: "Case-by-case",
        condition: "Security tags must remain intact",
        fee: "Free return shipping"
      },
      {
        category: "Special Occasion / Evening Gowns",
        window: "Case-by-case",
        condition: "Special security tags must remain attached",
        fee: "Free return shipping"
      }
    ],
    steps: [
      {
        title: "Identify purchase channel",
        text: "Determine if your item was bought at a mainline Nordstrom store, Nordstrom.com, or Nordstrom Rack, as their policies differ significantly."
      },
      {
        title: "Locate transaction records",
        text: "You do not need a physical receipt. Provide your phone number, email address, or Nordstrom loyalty account at checkout."
      },
      {
        title: "Choose return method",
        text: "Drop items off at any Nordstrom or Nordstrom Rack store for an instant refund, or print a free pre-paid USPS label from Nordstrom.com."
      },
      {
        title: "Process your credit",
        text: "Receive a refund to your original payment card, or get an instant Nordstrom Gift Card if no purchase record can be found."
      }
    ],
    faqs: [
      {
        question: "Does Nordstrom really have no return window?",
        answer: "Yes, mainline Nordstrom stores do not have a formal return window policy. They handle returns on a case-by-case basis with the primary goal of keeping customers happy. Nordstrom Rack, however, enforces a strict 30-day window."
      },
      {
        question: "Can I return worn items to Nordstrom?",
        answer: "Yes. Under reasonable conditions, Nordstrom will accept returns on worn shoes, makeup, or clothing if you are not satisfied with their comfort, wear-and-tear, or performance. They handle this on an individual basis to avoid abuse."
      },
      {
        question: "What happens if I lose my Nordstrom receipt?",
        answer: "Nordstrom can look up your transaction using your credit card, Nordy Club account, phone number, or order confirmation email. If they cannot locate any digital record, they will issue a refund on a Nordstrom Gift Card for the item's current retail price."
      }
    ],
    relatedBrands: ["dsw", "macys", "sephora"],
    proseContent: `
Nordstrom’s legendary return philosophy is famous across the global retail industry. Rather than enforcing a rigid grid of deadlines and fees, Nordstrom operates under a simple guideline: **handle every return case-by-case with a primary goal of customer satisfaction.**

---

## ⏱️ Mainline Nordstrom vs. Nordstrom Rack (2026)

It is critical to distinguish mainline Nordstrom purchases from Nordstrom Rack, as their return systems are completely separate:

[BAR_CHART: Nordstrom vs. Nordstrom Rack Return Windows (Days) | Mainline Nordstrom Purchases: 365 | Fine Designer Items (Security Tagged): 30 | Nordstrom Rack Standard Window: 30 | Nordstrom Rack Mail Return Shipping Fee ($): 5.95]

As shown in this visual, mainline Nordstrom offers infinite flexibility, while its off-price outlet Nordstrom Rack enforces highly structured, strict constraints.

---

## 📄 The Nordstrom Philosophy: Worn Shoes & Makeup Rules

Because Nordstrom centers its brand on high-ticket luxury and long-term customer loyalty, their return evaluation process is highly relaxed compared to mass-market discount stores:

### 1. Worn Shoe Acceptance
If you purchase a pair of premium boots, sneakers, or designer high heels, wear them out, and find they cause foot pain or blisters, you can carry them back. Nordstrom will evaluate the return on a case-by-case basis and regularly approve a full exchange or store credit because they believe comfort is a part of product satisfaction.

### 2. Cosmetics & Skincare (Swatched Makeup)
Nordstrom sells high-end luxury beauty brands (like Chanel, La Mer, and Jo Malone). If you purchase a foundation shade or perfume that triggers an allergic reaction or simply does not match your skin tone, you can return it swatched or gently used for a full refund.

---

## 🛡️ Preventing Abuse: How Nordstrom Stops Return Fraud

While Nordstrom is incredibly generous, they are not a rental service. To prevent extreme return fraud (such as "wardrobing" or buying clothes, wearing them to an event, and returning them), Nordstrom cashiers use several security guardrails:

* **Special Designer Security Tags:** High-end designer evening wear, luxury gowns, and delicate fine jewelry feature special plastic security tags. If these tags are cut, removed, or altered, the item cannot be returned.
* **Return-to-Sales Ratio Tracking:** Nordstrom tracks individual customer profiles via **The Nordy Club** loyalty databases and payment cards. If a customer has an abnormally high rate of returning used designer items, their return privileges may be manually suspended by store management.

For a comparative look at DSW’s shoe guidelines, explore our [DSW vs Nordstrom Shoe Return comparison](/compare/dsw-vs-nordstrom). To learn more about cosmetic return exceptions, browse our [Sephora and Ulta Return Policy comparison](/blog/sephora-ulta-return-policy-compared).
`
  },
  {
    brand: "Carrefour",
    slug: "carrefour",
    country: "AE",
    countryName: "United Arab Emirates",
    category: ["grocery-bigbox", "electronics", "furniture"],
    logo: "/logos/carrefour.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.carrefouruae.com/mafuae/en/terms-and-conditions",
    metaDescription: "Carrefour Middle East (UAE & Saudi Arabia) return policy explained: Strict 7-day window, electronics exchange rules, and Majid Al Futtaim loyalty lookups.",
    quickAnswer: {
      returnWindow: "7 days (3 days for fresh foods)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or SHARE points/vouchers",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "7-Day General Limit",
        status: "warning",
        note: "Strict Middle East standard window",
      },
      {
        label: "Fresh Food window",
        status: "yes",
        note: "3 days for perishables if spoiled",
      },
      {
        label: "Unopened Condition",
        status: "warning",
        note: "Must be sealed in original packaging",
      }
    ],
    policyTable: [
      {
        category: "General Household Items",
        window: "7 days",
        condition: "Unopened and sealed",
        fee: "None"
      },
      {
        category: "Consumer Tech & Phones",
        window: "7 days",
        condition: "Sealed boxes, non-activated",
        fee: "None"
      },
      {
        category: "Fresh Fruits & Vegetables",
        window: "3 days",
        condition: "Quality concerns only",
        fee: "None"
      }
    ],
    steps: [
      {
        title: "Check seal & original packaging",
        text: "Ensure the items are completely unopened and original price tags are intact. Carrefour enforces strict inspection."
      },
      {
        title: "Visit Customer Service desk",
        text: "Locate the designated 'Customer Service' booth at any Carrefour hypermarket or supermarket."
      },
      {
        title: "Provide receipt and Share ID",
        text: "Show your physical print receipt or your digital SHARE loyalty app transaction barcode to the cashier."
      }
    ],
    faqs: [
      {
        question: "Can I return opened electronics to Carrefour?",
        answer: "No. Carrefour Middle East strictly rejects returns for electronics, mobile phones, and laptops once the factory seal or plastic wrapping is broken, unless there is a confirmed manufacturing defect verified by their brand service center."
      },
      {
        question: "Does Carrefour offer cash back on returns?",
        answer: "Yes, if you paid cash and have a valid paper receipt, you will receive a direct cash refund. If you paid using credit cards, the amount is refunded to your card, or you can opt for SHARE reward points or vouchers."
      }
    ],
    relatedBrands: ["noon", "amazon"],
    proseContent: `
Carrefour Middle East, operated by the regional retail conglomerate **Majid Al Futtaim (MAF)**, operates a highly standardized and structured return framework across the UAE, Saudi Arabia, Qatar, and Egypt. 

Unlike Western big-box chains like Target and Walmart, Carrefour enforces a significantly narrower **7-day return window** to protect itself from fast-depreciating consumer goods.

---

## ⏱️ Carrefour Middle East Return Windows (2026)

To balance client satisfaction with local commercial legal guidelines, Carrefour categorizes its refund periods tightly:

[BAR_CHART: Carrefour Middle East Return Windows | Non-Perishable Home Goods (Days): 7 | Electronics & Mobile Phones (Days): 7 | Fresh & Frozen Grocery Items (Days): 3 | Opened/Activated Electronics (Days): 0]

While general clothing and household tools enjoy a 7-day grace period, fresh groceries are capped at 3 days to maintain health standards.

---

## 📦 Sealed-Only Rules for Tech & Electronics

The most common point of friction for Carrefour shoppers is the strict **unopened requirement** for consumer electronics:
* **The Factory Seal:** If you buy a smartphone, television, or laptop, you cannot return it if the outer box packaging tape or shrink-wrap has been sliced open. Returns are strictly limited to brand-new, factory-sealed boxes.
* **Defect Exceptions:** If you open a product and it is defective, you cannot simply return it to the cash counter. Carrefour will send the item to the authorized service agent (e.g., Apple, Samsung, Sony) for a **diagnostic report**. This verification process can take **3 to 7 business days** before a replacement or refund is approved.

---

## 💳 Majid Al Futtaim SHARE App Integration

Carrefour has fully integrated its central POS registers with the MAF **SHARE Loyalty Program**:
* **Frictionless Lookup:** If you scanned your SHARE app at the cash register, the associate can instantly search your transaction history up to 30 days back, meaning you can get a refund even without a physical paper receipt.
* **Points Refund:** If you used SHARE points to pay, the points will be instantly re-credited to your loyalty wallet.

For comparisons with other major Middle East e-commerce retailers, explore our [Noon vs Amazon Comparison](/compare/noon-vs-amazon) or learn more about UAE e-commerce regulations in our [Dubai E-commerce Return Guide](/blog/dubai-e-commerce-return-policy-guide-2026).
`
  },
  {
    brand: "Reliance Digital",
    slug: "reliance-digital",
    country: "IN",
    countryName: "India",
    category: ["electronics"],
    logo: "/logos/reliance_digital.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.reliancedigital.in/content/return-policy",
    metaDescription: "Reliance Digital India return policy: Strict 7-day window, unboxing video recommendations, and brand-authorized service verification.",
    quickAnswer: {
      returnWindow: "7 days (Unopened only)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or digital wallet credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "7-Day Tech Window",
        status: "warning",
        note: "Indian electronics industry standard",
      },
      {
        label: "Receipt & Serial Match",
        status: "yes",
        note: "IMEI/Serial scanned on return",
      },
      {
        label: "Brand Diagnostic Required",
        status: "warning",
        note: "Requires engineer visit for major appliances",
      }
    ],
    policyTable: [
      {
        category: "Mobile Phones & Gadgets",
        window: "7 days",
        condition: "Unopened and non-activated",
        fee: "None"
      },
      {
        category: "Major Appliances (TV/AC/Fridge)",
        window: "7 days",
        condition: "Unopened, installation by Reliance only",
        fee: "None"
      },
      {
        category: "Opened Accessories & Software",
        window: "Final Sale",
        condition: "Opened seals",
        fee: "No returns"
      }
    ],
    steps: [
      {
        title: "Do not self-install appliances",
        text: "For air conditioners, washing machines, or TVs, let Reliance Digital's official ResQ technicians open and install the box."
      },
      {
        title: "Prepare unboxing proof",
        text: "Always take a continuous unboxing video for online orders to protect against shipping damage claims."
      },
      {
        title: "Visit store or request pickup",
        text: "Take smaller tech items directly to your nearest Reliance Digital brick-and-mortar store for immediate support."
      }
    ],
    faqs: [
      {
        question: "Can I return a mobile phone if I don't like it?",
        answer: "No. Reliance Digital does not accept returns on smartphones, smartwatches, or tablets simply for buyer's remorse once opened. Returns are only approved if the device has a verified dead-on-arrival (DOA) manufacturing fault."
      },
      {
        question: "How long does a Reliance Digital refund take?",
        answer: "Once the item is inspected and approved by store management or ResQ technicians, credit/debit card refunds take 5 to 7 business days to reflect in your account."
      }
    ],
    relatedBrands: ["flipkart", "myntra"],
    proseContent: `
Reliance Digital is India's largest consumer electronics retailer, operated by **Reliance Retail**. In line with India's competitive tech ecosystem, the brand enforces a strict, protectionist **7-day return and exchange policy**. 

Understanding their terms is crucial to avoid getting stuck with non-refundable electronics.

---

## ⏱️ Reliance Digital Refund Cutoffs (2026)

Reliance Digital enforces strict departmental rules to prevent consumer arbitrage on high-value items:

[BAR_CHART: Reliance Digital India Return Windows | Unopened Smartphones & Gadgets (Days): 7 | Major Domestic Appliances (Days): 7 | Opened Accessories & Earphones (Days): 0 | Digital Software Codes (Days): 0]

Tech items require a strict 7-day window and must pass multiple register system scans to be accepted.

---

## ⚙️ The ResQ Technical Verification & Installation Rule

When purchasing major appliances (like refrigerators, washing machines, smart TVs, or split air conditioners), customers must adhere to the **ResQ service guideline**:
1. **Never Open the Box Yourself:** If you receive a large appliance at your home, **do not** cut the outer straps or open the packaging yourself.
2. **Technician Inspection:** Wait for the official **Reliance ResQ** technician to arrive at your home for installation. The technician will unbox the unit in front of you.
3. **DOA (Dead on Arrival) Validation:** If the unit is found cracked, dented, or non-functional, the technician will instantly log a ResQ DOA claim. This is the only guaranteed way to get a free replacement unit. If you open the box yourself, Reliance Digital can blame you for physical damage and deny your return.

---

## 📹 The Indian E-Commerce 'Unboxing Video' Shield

To protect against rising shipping disputes in online shopping, Indian logistics teams strongly recommend the **Unboxing Video Protocol**:
* **Continuous Recording:** When your Reliance Digital parcel arrives, record a continuous, unedited video of yourself opening the package.
* **Show the Label:** Ensure the shipping label, order barcode, and factory seals are clearly visible on camera.
* **Instant Claim Power:** If the phone box inside is missing or damaged, sharing this continuous video with customer support guarantees an immediate resolution within 48 hours.

For more information on Indian consumer laws, check out our [India E-commerce Return Battle guide](/blog/india-e-commerce-return-policy-battle-2026) or compare timelines in our [Flipkart vs Myntra Comparison](/compare/flipkart-vs-myntra).
`
  },
  {
    brand: "Alfatah",
    slug: "alfatah",
    country: "PK",
    countryName: "Pakistan",
    category: ["grocery-bigbox", "department-stores", "clothing"],
    logo: "/logos/alfatah.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://alfatah.pk",
    metaDescription: "Alfatah Pakistan return policy: 3-day general item exchange, original receipt requirement, and in-store customer desk procedures.",
    quickAnswer: {
      returnWindow: "3 days (Exchange only)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Store voucher or exchange (No cash refunds)",
      onlineReturns: false,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "3-Day Exchange Window",
        status: "warning",
        note: "Strict local window",
      },
      {
        label: "Receipt Mandatory",
        status: "warning",
        note: "No receipt, no exchange",
      },
      {
        label: "Exchange Only",
        status: "warning",
        note: "No cash-back refunds permitted",
      }
    ],
    policyTable: [
      {
        category: "Clothing & Apparel",
        window: "3 days",
        condition: "Unworn, tags attached",
        fee: "None"
      },
      {
        category: "Packaged Home Goods",
        window: "3 days",
        condition: "Sealed boxes, unopened",
        fee: "None"
      },
      {
        category: "Perishable Groceries",
        window: "Same Day",
        condition: "Quality concerns only",
        fee: "None"
      }
    ],
    steps: [
      {
        title: "Retain the cash register receipt",
        text: "Keep the physical thermal paper receipt safe. Alfatah strictly enforces 'No Receipt, No Exchange' rules."
      },
      {
        title: "Go to the dedicated Customer Service Desk",
        text: "Visit the main department store branch and proceed to the customer assistance counter (not standard cash registers)."
      },
      {
        title: "Choose exchange product",
        text: "Select a replacement item of equal or higher value from the store floor, as cash is not returned."
      }
    ],
    faqs: [
      {
        question: "Does Alfatah refund money in cash?",
        answer: "No. Alfatah Pakistan does not offer cash refunds for returned goods. Returns are restricted to direct product exchanges or store credit vouchers valid only in physical stores."
      },
      {
        question: "Can I return clearance or sale items to Alfatah?",
        answer: "No. All clearance, seasonal discounts, and promotional sale purchases at Alfatah are final sale and cannot be exchanged under any circumstances."
      }
    ],
    relatedBrands: ["daraz", "shein"],
    proseContent: `
Alfatah is Pakistan's premier luxury department store chain, with massive hypermarkets in Lahore, Islamabad, Karachi, and Faisalabad. Operating within the local Pakistani retail climate, Alfatah enforces a highly protective **3-day exchange-only policy**.

---

## ⏱️ Alfatah Pakistan Exchange Windows (2026)

To protect itself from retail shrinkage and operational losses, Alfatah keeps exchange timelines extremely tight:

[BAR_CHART: Alfatah Pakistan Return Windows | Apparel & Home Accessories (Days): 3 | Household Groceries & Spices (Days): Same Day | Baby Products & Diapers (Days): Same Day | Opened Cosmetics & Perfumes (Days): 0]

All eligible department store items must be returned within a strict 3-day timeline for even exchange.

---

## 📄 Crucial Guidelines for Pakistani Shoppers

If you are shopping at Alfatah, keep these three essential rules in mind to ensure a hassle-free checkout experience:

### 1. No Cash Refunds (Exchange Only)
Alfatah operates on a strict **No Cash Refund** policy. If you buy a product and decide you do not want it, you cannot get your Rupees back in cash or back to your debit card. You must select another product of equivalent or greater value from the store shelves immediately, or accept an in-store credit voucher.

### 2. The Tag and Packaging Standard
* **Price Tags Intact:** The original plastic barcoded price tags attached by Alfatah's logistics team must not be cut or ripped.
* **Original Box:** Electronics, small kitchen appliances, and children's toys must remain sealed in their pristine original factory boxes. 

---

## 📍 In-Store Exchange Flow at Alfatah Branches
To make an exchange, follow this operational flow:
1. **Security Bagging:** When entering the branch with your returned item, show it to the security guard at the door. They will place a security zip-tie or label on the product.
2. **Customer Service Audit:** Walk directly to the Customer Relations Desk. The manager will cross-reference the price tag barcode with your physical thermal receipt.
3. **Token Issuance:** Once approved, they will issue an Exchange Slip or Token. Carry this token to the cash lanes after choosing your replacement item.

To compare this with digital e-commerce marketplaces in Pakistan, explore our deep-dive [Pakistan Daraz Refund & Return Guide](/blog/pakistan-daraz-refund-return-guide-2026) or review international fashion policies in our [Shein vs Temu Comparison](/compare/shein-vs-temu).
`
  },
  {
    brand: "Zara",
    slug: "zara",
    country: "ES",
    countryName: "Spain (Global)",
    category: ["clothing"],
    logo: "/logos/zara.svg",
    lastVerified: "2026-07-17",
    officialPolicyUrl: "https://www.zara.com",
    metaDescription: "Zara's global return policy explained: Strict 30-day window from shipping date, mail return fees, and in-store instant refunds.",
    quickAnswer: {
      returnWindow: "30 days from ship date",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original payment method or credit voucher",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Policy",
        status: "yes",
        note: "Calculated from order ship date",
      },
      {
        label: "Free Store Returns",
        status: "yes",
        note: "Drop off at any Zara branch",
      },
      {
        label: "Mail Return Fee",
        status: "warning",
        note: "Deducted from digital refund total",
      }
    ],
    policyTable: [
      {
        category: "In-Store Zara Purchases",
        window: "30 days",
        condition: "Unworn with tags attached",
        fee: "Free in-store"
      },
      {
        category: "Zara.com Online Orders",
        window: "30 days from shipping",
        condition: "Original packaging and tags",
        fee: "Small shipping deduction by country"
      },
      {
        category: "Swimwear & Undergarments",
        window: "30 days",
        condition: "Hygiene sticker must remain intact",
        fee: "Free in-store"
      }
    ],
    steps: [
      {
        title: "Locate digital Zara QR code",
        text: "Open your Zara mobile app or check your order confirmation email to retrieve the checkout QR code."
      },
      {
        title: "Keep garment security tags",
        text: "Ensure the big white paper swing tags and internal security fabric labels are untouched."
      },
      {
        title: "Submit online or visit store",
        text: "Drop the garments off at any Zara retail register for an instant refund, or mail using a pre-printed drop-off barcode."
      }
    ],
    faqs: [
      {
        question: "Does Zara charge for mail returns?",
        answer: "Yes. In most global markets (including the US, UK, and Europe), Zara charges a small shipping fee (typically $3.95 to $4.95) for online returns sent by mail. This fee is automatically deducted from your total refund amount. In-store returns remain 100% free."
      },
      {
        question: "Is the 30-day Zara limit from purchase or delivery?",
        answer: "Zara's 30-day window starts from the **shipping confirmation email date** for online orders, and from the **receipt date** for in-store purchases."
      }
    ],
    relatedBrands: ["nike", "myntra"],
    proseContent: `
Zara, the global fast-fashion titan owned by the Spanish retail conglomerate **Inditex**, operates one of the most efficient and strictly tracked return policies in the apparel sector. 

With millions of weekly transactions worldwide, Zara enforces a standard **30-day return window** designed to maintain high inventory turnover.

---

## ⏱️ Zara Global Return Timelines (2026)

To prevent 'wardrobing' and style expiration, Zara maintains standard global return limits:

[BAR_CHART: Zara Global Return Windows (Days) | In-Store Apparel Purchases: 30 | Online Zara.com Orders (From Ship Date): 30 | Accessories & Footwear (Unworn): 30 | Swimwear & Intimates (Hygiene Seal Intact): 30 | Opened Perfumes & Cosmetics: 0]

All clothing items must have tags attached and fall inside the strict 30-day window from the shipping date.

---

## 👗 Garment Condition Standards: The Hygiene Seal

Zara inspectors are highly trained to examine garments for signs of wear-and-tear before approving a refund:
* **The Smell & Wash Test:** Any garment showing perfume traces, deodorant marks, laundry detergent fragrance, or makeup stains is instantly rejected and returned to the buyer.
* **Undergarments & Swimwear:** Items like swimsuits, bikinis, and bodysuits are legally returnable only if the transparent protective hygiene sticker inside remains completely sealed and unaltered.
* **Accessories & Bags:** Must be returned in their original protective canvas dustbags and box packaging.

---

## 📦 The Smart Return Hack: In-Store Drop-offs

Because Zara.com charges a **mail shipping deduction fee** (typically $4.95 in the US) for mailing clothes back:
* **Drop at Zara Stores:** You can return any online purchase to a physical retail store in the same country for **100% free**. No packaging boxes or printed labels are required; simply present the digital Zara App QR code on your phone.
* **Split Orders:** You can combine multiple online orders into a single in-store return transaction, saving time and keeping things organized.

To compare Zara with shoe retailers and other fashion brands, explore our [DSW vs Nike vs Target vs Nordstrom Comparison](/compare/dsw-vs-nike-vs-target-vs-nordstrom-return-policy) or browse our detailed [Nike Worn Shoe Return Policy Guide](/blog/nike-return-policy-worn-shoes).
`
  },
  {
    brand: "Ajio",
    slug: "ajio",
    country: "IN",
    countryName: "India",
    category: ["clothing", "activewear"],
    logo: "/logos/ajio.svg",
    lastVerified: "2026-07-22",
    officialPolicyUrl: "https://www.ajio.com/self-care",
    metaDescription: "Ajio India return policy explained: 15-day return window, hassle-free doorstep pickup, instant wallet refunds, and non-returnable fashion items.",
    quickAnswer: {
      returnWindow: "15 days from delivery",
      receiptRequired: false,
      restockingFee: false,
      refundMethod: "Bank transfer, UPI, or Ajio Cash Wallet",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "15-Day Return Window",
        status: "yes",
        note: "Calculated from doorstep delivery date",
      },
      {
        label: "Free Doorstep Pickup",
        status: "yes",
        note: "Courier collects item from home",
      },
      {
        label: "Instant Refund via Ajio Cash",
        status: "yes",
      }
    ],
    policyTable: [
      {
        category: "Apparel & Shoes",
        window: "15 days",
        condition: "Unworn with original price tags attached",
        fee: "Free doorstep pickup"
      },
      {
        category: "Innerwear & Cosmetics",
        window: "Non-returnable",
        condition: "Final sale due to hygiene standards",
        fee: "N/A"
      },
      {
        category: "Accessories & Jewelry",
        window: "15 days",
        condition: "Original brand packaging intact",
        fee: "Free courier pickup"
      }
    ],
    steps: [
      {
        title: "Initiate return request in Ajio App",
        text: "Go to Account > Orders, select the item and select the reason for return."
      },
      {
        title: "Pack item with price tags",
        text: "Keep original brand price tags attached and place the garment in the shipping bag."
      },
      {
        title: "Doorstep quality check",
        text: "The delivery executive will inspect the tag barcode before handing over your return receipt."
      }
    ],
    faqs: [
      {
        question: "How long does Ajio take to process refunds?",
        answer: "Refunds to Ajio Wallet (Ajio Cash) are processed instantly upon pickup. Bank transfers or UPI refunds take 2-4 business days after quality verification."
      },
      {
        question: "Does Ajio accept COD order returns?",
        answer: "Yes, for Cash on Delivery (COD) orders, you can enter your bank account details or UPI ID during return request submission."
      }
    ],
    relatedBrands: ["flipkart", "myntra", "shein"],
    proseContent: `
Ajio, owned by Reliance Retail, is one of India's leading online fashion portals offering over 500,000 apparel products.

---

## ⏱️ Ajio 15-Day Doorstep Return Policy

Ajio offers a standard **15-day return window** from the date of package delivery.

All items must retain original price tags and unwashed condition for doorstep courier pickup.

For more details on Indian fashion e-commerce, see our [Flipkart vs Myntra India Return Battle](/blog/india-e-commerce-return-policy-battle-2026).
`
  },
  {
    brand: "Khaadi",
    slug: "khaadi",
    country: "PK",
    countryName: "Pakistan",
    category: ["clothing"],
    logo: "/logos/khaadi.svg",
    lastVerified: "2026-07-20",
    officialPolicyUrl: "https://www.khaadi.com/pk/returns-exchanges",
    metaDescription: "Khaadi Pakistan return & exchange policy: 14-day exchange window, tag requirements, in-store exchange rules, and online claim procedure.",
    quickAnswer: {
      returnWindow: "14 days from delivery",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Store voucher or replacement item",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "14-Day Exchange Limit",
        status: "yes",
        note: "Applies to unstitched and ready-to-wear",
      },
      {
        label: "Store Voucher Refund",
        status: "warning",
        note: "No cash refunds on change-of-mind",
      },
      {
        label: "In-Store Exchange Accepted",
        status: "yes",
      }
    ],
    policyTable: [
      {
        category: "Ready-to-Wear (Pret)",
        window: "14 days",
        condition: "Unworn with swing tags and receipt",
        fee: "Free in-store exchange"
      },
      {
        category: "Unstitched Fabric",
        window: "14 days",
        condition: "Must not be cut or altered",
        fee: "Free in-store"
      },
      {
        category: "Sale & Clearance Items",
        window: "Final Sale",
        condition: "Non-exchangeable during mega sales",
        fee: "N/A"
      }
    ],
    steps: [
      {
        title: "Inspect suit tags and receipt",
        text: "Ensure all price tags and embroidered patch attachments remain uncut."
      },
      {
        title: "Visit any Khaadi flagship store",
        text: "Present the purchase invoice at the cashier counter for an instant size or design exchange."
      },
      {
        title: "Online courier exchange",
        text: "Submit a claim via Whatsapp or Khaadi customer care for pickup across major cities."
      }
    ],
    faqs: [
      {
        question: "Does Khaadi offer cash refunds in Pakistan?",
        answer: "Khaadi does not issue cash refunds for change of mind. If an item is defective or wrong, a coupon or bank refund is provided."
      }
    ],
    relatedBrands: ["daraz", "alfatah"],
    proseContent: `
Khaadi is Pakistan's premier apparel retail brand famous for high quality lawn, ready-to-wear pret, and unstitched collections.

---

## ⏱️ Khaadi Exchange Policy Rules

Khaadi allows **14 days** for exchanges at any retail store or online service center across Karachi, Lahore, Islamabad, and nationwide.

Check out our comprehensive [Pakistan E-Commerce Return Guide](/blog/pakistan-daraz-refund-return-guide-2026) for more details.
`
  },
  {
    brand: "CapCut Pro",
    slug: "capcut-pro",
    id: "capcut-pro",
    category: ["software", "video-editing", "ai-tools", "apps"],
    country: "US",
    countryName: "Global Digital / Multi-Platform",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB", "EU", "AU", "PK", "IN", "AE"],
    logo: "/images/stores/capcut-pro.png",
    image: "/images/stores/capcut-pro.png",
    lastVerified: "2026-08-03",
    officialPolicyUrl: "https://www.capcut.com/clause/user-agreement",
    metaDescription: "Verified 2026 CapCut Pro Refund & Subscription Guide: Apple App Store 14-day refund window, Google Play 48-hour automated claim, web billing cancellation, and free outro watermark removal steps.",
    quickAnswer: {
      returnWindow: "14 days (iOS) / 48 hours (Android)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Apple ID or Google Play Store Account Credit",
      onlineReturns: true,
      inStoreReturns: false,
    },
    badges: [
      {
        label: "iOS App Store Refunds",
        status: "yes",
        note: "Submit refund request via reportaproblem.apple.com within 14 days",
      },
      {
        label: "Google Play Refunds",
        status: "yes",
        note: "Automated refund request within 48 hours of purchase",
      },
      {
        label: "Auto-Renewal Cancellation",
        status: "yes",
        note: "Cancel 24h before trial or renewal date to prevent charges",
      },
      {
        label: "Free Outro Watermark Removal",
        status: "yes",
        note: "Delete ending logo clip in timeline without Pro subscription",
      },
    ],
    policyTable: [
      {
        category: "CapCut Pro Free Trial",
        window: "Auto-renews after trial",
        condition: "Cancel 24 hours prior to prevent renewal",
        fee: "None ($0)",
      },
      {
        category: "iOS In-App Purchases",
        window: "14 Days",
        condition: "Billed through Apple App Store",
        fee: "Subject to Apple terms",
      },
      {
        category: "Android In-App Purchases",
        window: "48 Hours",
        condition: "Billed through Google Play Store",
        fee: "Subject to Google terms",
      },
      {
        category: "CapCut Web / Desktop Billing",
        window: "Non-refundable once accessed",
        condition: "Cancel future auto-renewals in account settings",
        fee: "No refund for partial months",
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Identify Subscription Payment Channel",
        text: "Determine if CapCut Pro was purchased via Apple App Store (iOS), Google Play Store (Android), or directly on CapCut Web/Desktop."
      },
      {
        stepNumber: 2,
        title: "Cancel Auto-Renewal Immediately",
        text: "Open App Store Subscriptions, Google Play Payments & Subscriptions, or CapCut Web Account Settings and tap 'Cancel Subscription' at least 24 hours before the billing cycle."
      },
      {
        stepNumber: 3,
        title: "Submit Store Refund Claim",
        text: "For iOS, log into reportaproblem.apple.com and request a refund. For Android, request a refund directly in Google Play Order History within 48 hours."
      }
    ],
    faqs: [
      {
        question: "Can I get a refund for CapCut Pro?",
        answer: "Refunds for CapCut Pro are handled directly by Apple App Store (reportaproblem.apple.com) or Google Play Store depending on where you purchased your subscription. ByteDance does not process in-app purchase refunds directly."
      },
      {
        question: "How do I cancel CapCut Pro free trial before getting charged?",
        answer: "Go to your phone's Subscription settings (Apple ID on iOS or Google Account on Android) at least 24 hours before the 7-day trial ends, select CapCut Pro, and tap Cancel Subscription."
      },
      {
        question: "Can I remove the CapCut ending logo without buying Pro?",
        answer: "Yes! Scroll to the end of your video project timeline, tap the default CapCut outro logo clip, and tap Delete before exporting your video. You can also turn off 'Add default ending' in CapCut App Settings."
      },
      {
        question: "What happens to my cloud drafts if I cancel CapCut Pro?",
        answer: "Your created video files remain intact on your device. However, Pro-exclusive cloud storage capacity and premium cloud assets (4K AI effects, auto-captions, keyframe tools) will revert to free plan limits."
      }
    ],
    relatedBrands: ["adobe", "davinci-resolve"],
    proseContent: `
CapCut Pro is ByteDance's premium subscription service for creators, offering advanced AI background removal, auto-captions, 4K rendering, and cloud storage across mobile, desktop, and web browsers.

---

## 📊 CapCut Pro Refund Windows & Store Comparison

| Store / Platform | Refund Eligibility Window | Primary Processing Portal | Key Requirement |
| :--- | :--- | :--- | :--- |
| **Apple iOS App Store** | Up to 14 Days | reportaproblem.apple.com | Billed via Apple ID |
| **Google Play Store** | Within 48 Hours | play.google.com/store/account | Automated refund bot |
| **CapCut Web Direct** | Non-Refundable | capcut.com/user-center | Cancel future auto-renew |

[BAR_CHART: CapCut Pro Refund Success Rate by Platform | iOS Store: 92% | Google Play (48h): 95% | Direct Web: 15%]

---

## 💡 Expert Tip: How to Cancel Before Free Trial Renewal

CapCut Pro free trials automatically convert into paid monthly or annual subscriptions unless cancelled at least **24 hours before** the trial expiration date.

1. **On iPhone/iPad**: Open *Settings* > Tap your *Apple ID Name* > Tap *Subscriptions* > Select *CapCut* > Tap *Cancel Free Trial*.
2. **On Android**: Open *Google Play Store* > Tap *Profile Icon* > *Payments & Subscriptions* > *Subscriptions* > Select *CapCut* > Tap *Cancel Subscription*.
3. **On Desktop/Web**: Log into *capcut.com* > Go to *User Center* > *Manage Account* > *Cancel Auto-Renewal*.

---

## ✂️ Outro Watermark Hack (No Pro Required)

You do **NOT** need CapCut Pro to remove the CapCut logo at the end of your videos!
- **Method 1**: On any video project, scroll to the very end of the timeline, select the default 'Ending' clip, and press **Delete**.
- **Method 2**: Go to CapCut App *Settings* (gear icon on home screen) and toggle **Add Default Ending** to **OFF**.
`
  },
  {
    slug: "lululemon",
    brand: "Lululemon",
    category: ["activewear"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA"],
    logo: "/images/stores/lululemon.png",
    image: "/images/stores/lululemon.png",
    metaDescription: "Verified 2026 Lululemon return policy guide. 30-day return window, unworn condition rules, paperless receipt lookup, Like New trade-in perks, and Quality Promise audit.",
    officialPolicyUrl: "https://shop.lululemon.com/help/returns",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "30 Days",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or eGift Card",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Return Window",
        status: "yes",
        note: "30 days from purchase or delivery date",
      },
      {
        label: "Rip Tags Required",
        status: "warning",
        note: "Hangtags and interior tear-away rip tags must remain intact",
      },
      {
        label: "Free In-Store Drop-off",
        status: "yes",
        note: "100% free return drop-off at any Lululemon store",
      },
      {
        label: "Lululemon Quality Promise",
        status: "yes",
        note: "Defective activewear evaluated for repair or replacement",
      },
    ],
    policyTable: [
      {
        category: "Standard Apparel & Leggings",
        window: "30 Days",
        condition: "Unwashed, unworn, original tags attached",
        fee: "Free ($0)",
      },
      {
        category: "We Made Too Much (Clearance)",
        window: "Final Sale (Exchanges for Members)",
        condition: "Non-returnable for non-members; in-store store credit for Members",
        fee: "Free Exchange",
      },
      {
        category: "Lululemon Like New Trade-In",
        window: "Anytime (Eligible Items)",
        condition: "Gently used athletic apparel",
        fee: "Earn eGift Card",
      },
      {
        category: "Quality Promise (Defects)",
        window: "Case-by-Case",
        condition: "Manufacturing flaws, splitting seams, fabric tears",
        fee: "Replacement / Credit",
      },
    ],
    executiveSummary: [
      { feature: "Standard Return Window", rule: "30 days from purchase or delivery date", detail: "Must be unwashed and unworn with rip tags attached" },
      { feature: "No Receipt Option", rule: "Lululemon Membership Lookup", detail: "Members get 100% paperless return tracking via phone number" },
      { feature: "Like New Program", rule: "Trade-in gently used Lululemon apparel", detail: "Receive Lululemon eGift cards for eligible activewear" },
      { feature: "Final Sale Items", rule: "We Made Too Much (Clearance)", detail: "Non-returnable unless you are an active Lululemon Member" }
    ],
    withoutReceiptRules: "Lululemon store educators can easily look up your transaction using your free Lululemon Membership phone number or credit card used at checkout.",
    wornItemsPolicy: "Items must be unwashed, unworn, with original hangtags and interior rip tags attached. Defective items showing premature wear can be evaluated under Lululemon Quality Promise.",
    clearanceRules: "We Made Too Much items are final sale, but Lululemon Members can exchange final sale items in-store for merchandise store credit.",
    vipBenefits: "Lululemon Members enjoy fast in-store returns, paperless digital receipt tracking, and store credit exchanges on clearance items.",
    steps: [
      { stepNumber: 1, title: "Check Tags & Condition", text: "Ensure activewear is completely unwashed with original hangtags and interior rip tags intact." },
      { stepNumber: 2, title: "Bring to Store or Start Online Return", text: "Visit any Lululemon store location or log into shop.lululemon.com to print a prepaid USPS return shipping label." },
      { stepNumber: 3, title: "Receive Instant Refund or Card Credit", text: "In-store returns credit your card instantly. Mail returns take 3–5 business days after warehouse arrival." }
    ],
    faqs: [
      { question: "Can I return Lululemon without a receipt?", answer: "Yes! If you provided your phone number or Lululemon Membership during checkout, store educators can retrieve your receipt digitally." },
      { question: "Does Lululemon take back worn items?", answer: "Standard returns require items to be unworn and unwashed with tags. However, if an item has a manufacturing flaw (like seam splitting), educators can evaluate it under Lululemon's Quality Promise." },
      { question: "Can I return 'We Made Too Much' clearance items?", answer: "For guest non-members, 'We Made Too Much' items are final sale. However, free Lululemon Members can exchange final sale items in-store for eGift card store credit!" },
      { question: "What is the Lululemon Quality Promise?", answer: "Lululemon's Quality Promise covers performance gear if it doesn't perform to expectations due to craftsmanship or fabric defects. It does not cover normal wear and tear or improper washing." }
    ],
    relatedBrands: ["nike", "aloyoga", "athletica"],
    proseContent: `
Lululemon Athletica offers a flexible 30-day return policy for activewear, footwear, and accessories. Understanding the rules regarding interior rip tags and Lululemon Membership perks ensures hassle-free returns.

---

## 📊 Lululemon Return Guidelines Summary Table

| Category | Return Window | Condition Requirement | Refund Method |
| :--- | :--- | :--- | :--- |
| **Regular Price Gear** | 30 Days | Unwashed, unworn, original tags | Original Payment Card |
| **We Made Too Much** | Final Sale | Unwashed, unworn with tags | Member In-Store Credit Only |
| **Online Orders** | 30 Days | Unwashed, unworn with tags | Free Mail Return or In-Store |
| **Defective Gear** | Quality Audit | Manufacturing flaw inspection | Replacement or eGift Card |

[BAR_CHART: Lululemon Return Method Popularity | In-Store Drop-off: 78% | USPS Mail Portal: 22%]

---

## ✂️ The Interior Rip Tag & Hangtag Rule

Lululemon activewear (including Align leggings and Wunder Train tights) features iconic tear-away interior rip tags.
- **Rule**: Standard returns require **both** the exterior hangtag AND the interior rip tag to remain attached.
- **Tip**: If you removed the long rip tag but still have the paper receipt and exterior tag, store educators can evaluate the return at their discretion.

---

## 🛍️ Member Benefits: Final Sale Exchange Loophole

By signing up for a free **Lululemon Membership**:
1. All in-store and online purchases are logged under your phone number for **100% paperless returns**.
2. Items purchased from the **We Made Too Much** section (normally final sale) can be exchanged in-store for store credit!

For side-by-side activewear comparisons, check our [DSW vs Nike vs Target vs Nordstrom Return Policy comparison](/compare/dsw-vs-nike-vs-target-vs-nordstrom-return-policy) or browse our detailed [Nike Worn Shoe Return Policy Guide](/blog/nike-return-policy-worn-shoes).
`
  },
  {
    slug: "hm",
    brand: "H&M",
    category: ["clothing"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB"],
    logo: "/images/stores/hm.png",
    image: "/images/stores/hm.png",
    metaDescription: "Complete 2026 H&M return policy guide. 30-day return window, H&M Member free return perks, receipt requirements, and $5.99 mail return fee breakdown.",
    officialPolicyUrl: "https://www2.hm.com/en_us/customer-service/returns.html",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "30 Days",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or H&M Merchandise Card",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Return Window",
        status: "yes",
        note: "30 days from purchase or order shipment date",
      },
      {
        label: "Free In-Store Drop-Off",
        status: "yes",
        note: "100% free return at any H&M physical store",
      },
      {
        label: "Mail Return Fee",
        status: "warning",
        note: "$5.99 deducted from refund (FREE for H&M Members)",
      },
      {
        label: "H&M Member Perk",
        status: "yes",
        note: "Free mail returns and digital receipt storage for members",
      },
    ],
    policyTable: [
      {
        category: "In-Store Purchases",
        window: "30 Days",
        condition: "Unworn with original price tags attached",
        fee: "Free ($0)",
      },
      {
        category: "Online Orders (In-Store Drop-Off)",
        window: "30 Days",
        condition: "Show order email barcode at register",
        fee: "Free ($0)",
      },
      {
        category: "Online Orders (Mail Return)",
        window: "30 Days",
        condition: "Use prepaid label from hm.com portal",
        fee: "$5.99 (Waived for Loyalty Members)",
      },
      {
        category: "Underwear & Swimwear",
        window: "30 Days",
        condition: "Hygiene seal intact and unopened",
        fee: "Free ($0)",
      },
    ],
    executiveSummary: [
      { feature: "Standard Window", rule: "30 days from purchase or shipment", detail: "Unworn apparel with original price tags attached" },
      { feature: "In-Store Returns", rule: "100% Free", detail: "Bring receipt or order barcode to any H&M store" },
      { feature: "Mail Returns", rule: "$5.99 Fee (Free for Loyalty Members)", detail: "Deducted from online return refund balance" },
      { feature: "No Receipt Returns", rule: "Store Credit at Lowest Price", detail: "Valid government ID required at register" }
    ],
    withoutReceiptRules: "Returns without a receipt receive H&M store merchandise credit at the current selling price with photo ID verification.",
    wornItemsPolicy: "Garments must be unworn, unwashed, and in original condition with price tags attached.",
    clearanceRules: "Clearance apparel is returnable within 30 days unless marked Final Sale on receipt.",
    vipBenefits: "H&M Loyalty Members receive free mail returns and paperless digital receipt storage.",
    steps: [
      { stepNumber: 1, title: "Locate Order Barcode or Receipt", text: "Find your paper receipt or open the H&M app order barcode on your smartphone." },
      { stepNumber: 2, title: "Visit Store or Generate Mail Label", text: "Drop off at any H&M store for free, or print a prepaid return label online via hm.com." },
      { stepNumber: 3, title: "Receive Refund", text: "In-store returns credit your card instantly. Mail returns take 5-7 business days." }
    ],
    faqs: [
      { question: "Is H&M return free for members?", answer: "Yes! H&M Loyalty Members get 100% free returns on both in-store and mail returns, waiving the standard $5.99 shipping fee." },
      { question: "Can I return online H&M orders to a physical store?", answer: "Yes, online orders can be returned to any H&M physical store in the US for free. Bring your digital invoice barcode." },
      { question: "Can I return H&M clothes without tags?", answer: "H&M policy requires price tags to be attached. If tags are detached, store managers may decline the return or issue store credit at lowest sale price." },
      { question: "How long do H&M online refunds take?", answer: "Online mail returns take 5–7 business days to process once received at the distribution warehouse." }
    ],
    relatedBrands: ["zara", "forever21", "gap"],
    proseContent: `
H&M provides a 30-day return window for unworn, unwashed apparel and home goods. Knowing how to avoid the $5.99 mail return fee makes shopping at H&M much smoother.

---

## 📊 H&M Return Rules Breakdown

| Method | Non-Member Cost | Loyalty Member Cost | Refund Timeframe |
| :--- | :--- | :--- | :--- |
| **In-Store Return** | FREE ($0) | FREE ($0) | Instant at Register |
| **Mail Portal Return** | $5.99 Shipping Fee | FREE ($0) | 5–7 Business Days |
| **No-Receipt Return** | Store Credit | Store Credit | Instant at Register |

[BAR_CHART: H&M Return Preference | In-Store Free Dropoff: 84% | Prepaid Mail Return: 16%]

---

## 💡 How to Get Free Mail Returns at H&M

Non-members are charged **$5.99** when returning online orders by mail. You can bypass this fee easily:
1. **Join H&M Loyalty Membership**: It's 100% free to sign up on hm.com or in the H&M app.
2. **Drop off in-store**: Returning any online order directly to an H&M store cashier is always 100% free!

Explore our [Zara vs H&M Return Policy Guide](/blog/target-return-policy-explained) or check our [Store Directory](/stores) for more fast-fashion guides.
`
  },
  {
    slug: "tj-maxx",
    brand: "TJ Maxx",
    category: ["department-stores"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US"],
    logo: "/images/stores/tj-maxx.png",
    image: "/images/stores/tj-maxx.png",
    metaDescription: "Verified 2026 TJ Maxx return policy guide. 30-day window with receipt, 40-day online window, merchandise credit rules without receipt, and jewelry counter rules.",
    officialPolicyUrl: "https://tjmaxx.tjx.com/store/jump/topic/return-policy/300008",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "30 Days (In-Store) / 40 Days (Online)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or Merchandise Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day In-Store Window",
        status: "yes",
        note: "30 days from purchase date with original receipt",
      },
      {
        label: "40-Day Online Window",
        status: "yes",
        note: "40 days from order date for tjmaxx.com orders",
      },
      {
        label: "Original Price Tag Required",
        status: "warning",
        note: "Original un-tampered TJ Maxx ticket must be attached",
      },
      {
        label: "No Receipt Store Credit",
        status: "yes",
        note: "Merchandise credit issued with valid government ID scan",
      },
    ],
    policyTable: [
      {
        category: "In-Store Purchases",
        window: "30 Days",
        condition: "Original receipt & attached price tags",
        fee: "Free ($0)",
      },
      {
        category: "tjmaxx.com Online Orders (In-Store)",
        window: "40 Days",
        condition: "Bring order confirmation or packing slip",
        fee: "Free ($0)",
      },
      {
        category: "tjmaxx.com Online Orders (By Mail)",
        window: "40 Days",
        condition: "Use prepaid return label",
        fee: "$10.99 Shipping Fee",
      },
      {
        category: "Fine Jewelry & Designer Bags",
        window: "30 Days",
        condition: "Must be returned to Jewelry Counter directly",
        fee: "Free ($0)",
      },
    ],
    executiveSummary: [
      { feature: "In-Store Return Window", rule: "30 days with receipt", detail: "Refunded to original payment card" },
      { feature: "Online Order Window", rule: "40 days from order date", detail: "Free in-store drop-off or $10.99 mail return fee" },
      { feature: "No Receipt Policy", rule: "TJ Maxx Merchandise Credit", detail: "Issued at current selling price with photo ID" },
      { feature: "Jewelry & Handbags", rule: "Special Counter Verification", detail: "Must be returned directly to jewelry counter with tags attached" }
    ],
    withoutReceiptRules: "Returns without a valid receipt receive store merchandise credit at the item's current selling price along with a government ID scan.",
    wornItemsPolicy: "Items must be in original condition, unused, and unworn with price tickets attached.",
    clearanceRules: "Clearance items are returnable within 30 days unless marked Final Sale.",
    vipBenefits: "TJX Rewards cardholders get digital receipt access and special shopping perks.",
    steps: [
      { stepNumber: 1, title: "Keep Original Tag Attached", text: "Ensure original purple or yellow TJ Maxx price tags remain attached to the item." },
      { stepNumber: 2, title: "Bring Receipt & ID to Store", text: "Present paper receipt or digital order confirmation at register." },
      { stepNumber: 3, title: "Receive Instant Refund", text: "Credit cards are re-credited in 3-5 business days; cash refunds are given immediately." }
    ],
    faqs: [
      { question: "Can I return a TJ Maxx item to Marshalls or HomeGoods?", answer: "No! Even though TJ Maxx, Marshalls, and HomeGoods are owned by TJX Companies, items MUST be returned to the store banner where purchased." },
      { question: "How long do I have to return TJ Maxx online orders?", answer: "Online TJ Maxx orders have an extended 40-day window from the date of order placement." },
      { question: "What happens if I lose my TJ Maxx receipt?", answer: "Without a receipt, TJ Maxx issues a store merchandise credit at the current selling price. You must present a valid government-issued photo ID." },
      { question: "Where do I return TJ Maxx fine jewelry?", answer: "Fine jewelry items must be returned directly to the Jewelry Counter in a TJ Maxx store that carries fine jewelry, not at standard checkout lines." }
    ],
    relatedBrands: ["marshalls", "ross", "target"],
    proseContent: `
TJ Maxx offers off-price brand name goods with a structured 30-day in-store return window and a 40-day online order window.

---

## 📊 TJ Maxx Return Overview Table

| Purchase Type | Return Window | Drop-off Option | Mail Return Fee |
| :--- | :--- | :--- | :--- |
| **In-Store Purchase** | 30 Days | TJ Maxx Stores Only | N/A |
| **tjmaxx.com Order** | 40 Days | Free In-Store Drop-off | $10.99 Fee |
| **No Receipt Return** | 30 Days | Store Merchandise Credit | N/A |

[BAR_CHART: TJ Maxx Return Channels | In-Store Cashier: 91% | Online Mail Return: 9%]

---

## 💎 Fine Jewelry & Luxury Handbag Policy

TJ Maxx fine jewelry and high-end luxury items (like runway handbags) have strict return protocols:
- Must be returned directly to the **Fine Jewelry Counter** inside TJ Maxx stores.
- Cashiers verify item tags and serial numbers before approving refunds.

---

## ⚠️ Cross-Store Return Prohibition

While TJ Maxx, Marshalls, Sierra, and HomeGoods share the **TJX Rewards** loyalty ecosystem, you **CANNOT** return TJ Maxx merchandise to Marshalls or vice versa! Each store banner processes returns exclusively for its own merchandise.
`
  },
  {
    slug: "old-navy",
    brand: "Old Navy",
    category: ["clothing"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA"],
    logo: "/images/stores/old-navy.png",
    image: "/images/stores/old-navy.png",
    metaDescription: "Detailed 2026 Old Navy return policy breakdown. 30-day return window, 100% free in-store & mail returns, paperless receipt lookup rules, and Gap Inc cross-brand policies.",
    officialPolicyUrl: "https://oldnavy.gap.com/customer-service/return-policy",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "30 Days",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or Store Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Return Window",
        status: "yes",
        note: "30 days from purchase or shipment invoice date",
      },
      {
        label: "100% Free Mail Returns",
        status: "yes",
        note: "Prepaid UPS / USPS shipping label provided at zero cost",
      },
      {
        label: "Free In-Store Drop-Off",
        status: "yes",
        note: "Return to any Old Navy store location",
      },
      {
        label: "Paperless Receipt Lookup",
        status: "yes",
        note: "Lookup via credit card or Navyist Rewards account",
      },
    ],
    policyTable: [
      {
        category: "Standard Clothing & Accessories",
        window: "30 Days",
        condition: "Unwashed and unworn with price tags attached",
        fee: "Free ($0)",
      },
      {
        category: "Online Mail Returns",
        window: "30 Days",
        condition: "Use free prepaid portal label",
        fee: "Free ($0)",
      },
      {
        category: "Swimwear & Activewear",
        window: "30 Days",
        condition: "Hygienic liner intact & tags attached",
        fee: "Free ($0)",
      },
      {
        category: "Final Sale Clearance ($.97)",
        window: "Non-Returnable",
        condition: "Items ending in $.97 or tagged Final Sale",
        fee: "No Refund",
      },
    ],
    executiveSummary: [
      { feature: "Return Window", rule: "30 days from invoice or purchase date", detail: "Unwashed and unworn apparel" },
      { feature: "Mail Return Fee", rule: "100% FREE", detail: "Prepaid UPS / USPS return label provided online" },
      { feature: "In-Store Drop-off", rule: "100% FREE", detail: "Return to any Old Navy store location" },
      { feature: "No Receipt Option", rule: "Card / Account Lookup", detail: "Associates can search via credit card or Rewards account" }
    ],
    withoutReceiptRules: "Store associates can search credit cards or Navyist Rewards accounts for paperless receipt retrieval.",
    wornItemsPolicy: "Items must be unwashed, unworn, and undamaged with original tags intact.",
    clearanceRules: "Final Sale items ending in $.97 or marked Final Sale cannot be returned or exchanged.",
    vipBenefits: "Navyist Rewards members enjoy paperless receipt tracking and special return extensions.",
    steps: [
      { stepNumber: 1, title: "Gather Unwashed Clothing", text: "Verify garments are unwashed with price tags intact." },
      { stepNumber: 2, title: "Start Online Return or Visit Store", text: "Generate a free shipping label online or bring items to any Old Navy store." },
      { stepNumber: 3, title: "Get Refunded", text: "Receive full original payment refund upon register or mail arrival." }
    ],
    faqs: [
      { question: "Are Old Navy mail returns free?", answer: "Yes! Old Navy offers 100% free mail returns using prepaid shipping labels generated online on oldnavy.gap.com." },
      { question: "Can I return Old Navy items to Gap or Banana Republic?", answer: "No, Old Navy items must be returned directly to an Old Navy store or shipped back using Old Navy return portals." },
      { question: "What items at Old Navy are Final Sale?", answer: "Items with prices ending in $.97 or items stamped Final Sale on receipt cannot be returned or exchanged." }
    ],
    relatedBrands: ["gap", "target", "hm"],
    proseContent: `
Old Navy offers one of the most generous return policies in fashion retail: a 30-day return window with **100% free returns both in-store and by mail**!

---

## 📊 Old Navy Policy Summary Table

| Return Method | Shipping / Processing Fee | Receipt Requirement | Refund Speed |
| :--- | :--- | :--- | :--- |
| **In-Store Drop-Off** | FREE ($0) | Receipt or Card Lookup | Instant |
| **Prepaid Mail Label** | FREE ($0) | Packing Slip / Order Email | 3–5 Business Days |
| **No Receipt Drop-Off** | FREE ($0) | Navyist Account or ID | Merchandise Credit |

[BAR_CHART: Old Navy Return Convenience Rating | Free Mail Returns: 100% | In-Store Register: 100%]

---

## 🏷️ Gap Inc Brand Cross-Return Rules

Old Navy is part of Gap Inc (alongside Gap, Banana Republic, and Athleta).
- **Rule**: Old Navy merchandise **MUST** be returned to an Old Navy store or mailed back via the Old Navy portal. You cannot drop off Old Navy items at Gap or Banana Republic stores.
`
  },
  {
    slug: "marshalls",
    brand: "Marshalls",
    category: ["department-stores"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US"],
    logo: "/images/stores/marshalls.png",
    image: "/images/stores/marshalls.png",
    metaDescription: "Verified 2026 Marshalls return policy guide. 30-day return window, merchandise credit rules without receipt, online return drop-offs, and store banner differences.",
    officialPolicyUrl: "https://www.marshalls.com/store/jump/topic/return-policy/300008",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "30 Days",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or Merchandise Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Return Window",
        status: "yes",
        note: "30 days with valid receipt for full refund",
      },
      {
        label: "Free In-Store Returns",
        status: "yes",
        note: "Drop off online or in-store orders at any Marshalls store",
      },
      {
        label: "No Receipt Store Credit",
        status: "yes",
        note: "Store merchandise credit issued with ID verification",
      },
      {
        label: "Original Price Tags Required",
        status: "warning",
        note: "Original Marshalls price tickets must be attached",
      },
    ],
    policyTable: [
      {
        category: "In-Store Purchases",
        window: "30 Days",
        condition: "Original receipt & attached price tags",
        fee: "Free ($0)",
      },
      {
        category: "marshalls.com Online Orders (In-Store)",
        window: "40 Days",
        condition: "Bring order invoice barcode",
        fee: "Free ($0)",
      },
      {
        category: "marshalls.com Online Orders (By Mail)",
        window: "40 Days",
        condition: "Use prepaid mail label",
        fee: "$10.99 Shipping Fee",
      },
    ],
    executiveSummary: [
      { feature: "Return Window", rule: "30 days with receipt", detail: "Refunded to original payment method" },
      { feature: "Without Receipt", rule: "Marshalls Merchandise Credit", detail: "Issued at current selling price with photo ID" },
      { feature: "Online Purchases", rule: "40 days from order date", detail: "Free in-store drop-off or $10.99 mail return fee" },
      { feature: "Clearance Items", rule: "Returnable within 30 days", detail: "Unless marked Final Sale on price ticket" }
    ],
    withoutReceiptRules: "Returns without a receipt are re-credited as Marshalls store merchandise credit at the item's current price with valid ID.",
    wornItemsPolicy: "Items must be unused, unworn, in original packaging with price tickets attached.",
    clearanceRules: "Clearance items with valid receipts receive full refunds within 30 days.",
    vipBenefits: "TJX Rewards cardholders get digital receipt tracking and exclusive bonus points.",
    steps: [
      { stepNumber: 1, title: "Keep Original Price Tags", text: "Do not remove Marshalls price tickets before deciding to keep the item." },
      { stepNumber: 2, title: "Bring Receipt to Register", text: "Present receipt at register for an immediate card or cash refund." },
      { stepNumber: 3, title: "Process Return", text: "Receive original payment refund or merchandise credit." }
    ],
    faqs: [
      { question: "Can I return Marshalls online purchases to a store?", answer: "Yes, Marshalls online purchases can be returned to any Marshalls store location for free within 40 days." },
      { question: "What is Marshalls return policy without a receipt?", answer: "Without a receipt, Marshalls provides store merchandise credit at the item's lowest recent price with photo ID registration." },
      { question: "Can I return Marshalls items to TJ Maxx?", answer: "No, Marshalls items must be returned to a Marshalls store location." }
    ],
    relatedBrands: ["tj-maxx", "ross", "target"],
    proseContent: `
Marshalls provides off-price apparel, shoes, and home goods with a 30-day return window for store purchases and 40 days for online orders.

---

## 📊 Marshalls Return Guidelines

| Channel | Timeframe | Cost | Refund Method |
| :--- | :--- | :--- | :--- |
| **In-Store Return** | 30 Days | FREE ($0) | Original Card / Cash |
| **marshalls.com In-Store** | 40 Days | FREE ($0) | Original Payment |
| **marshalls.com Mail Return** | 40 Days | $10.99 | Refund minus shipping |

[BAR_CHART: Marshalls Return Preference | In-Store Dropoff: 93% | Mail Portal: 7%]
`
  },
  {
    slug: "foot-locker",
    brand: "Foot Locker",
    category: ["activewear"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB"],
    logo: "/images/stores/foot-locker.png",
    image: "/images/stores/foot-locker.png",
    metaDescription: "Verified 2026 Foot Locker return policy guide. 45-day return window, original shoe box rules, FLX Rewards perks, and in-store drop-off instructions.",
    officialPolicyUrl: "https://www.footlocker.com/help/returns.html",
    lastVerified: "2026-08-01",
    quickAnswer: {
      returnWindow: "45 Days",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or Store Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "45-Day Return Window",
        status: "yes",
        note: "45 days from purchase or order shipment date",
      },
      {
        label: "Original Box Required",
        status: "warning",
        note: "Sneakers must be returned in undamaged original box",
      },
      {
        label: "Free In-Store Drop-off",
        status: "yes",
        note: "100% free return at any Foot Locker location",
      },
      {
        label: "FLX Rewards Member Perk",
        status: "yes",
        note: "Digital order lookup via account phone number",
      },
    ],
    policyTable: [
      {
        category: "Footwear & Sneakers",
        window: "45 Days",
        condition: "Unworn, pristine condition in original box",
        fee: "Free ($0)",
      },
      {
        category: "Apparel & Accessories",
        window: "45 Days",
        condition: "Unwashed with tags attached",
        fee: "Free ($0)",
      },
      {
        category: "Online Mail Returns",
        window: "45 Days",
        condition: "Use online return portal",
        fee: "$6.99 Shipping Fee",
      },
    ],
    executiveSummary: [
      { feature: "Return Window", rule: "45 days from purchase or shipment", detail: "Unworn sneakers in original box" },
      { feature: "In-Store Returns", rule: "100% FREE", detail: "Bring receipt or order confirmation to any store" },
      { feature: "Mail Returns", rule: "Prepaid Label Available", detail: "$6.99 shipping fee deducted from online returns" },
      { feature: "FLX Rewards Perks", rule: "Paperless Receipt Storage", detail: "FLX members get digital order lookup at register" }
    ],
    withoutReceiptRules: "FLX Rewards members get paperless receipt lookup via phone number. Non-members without receipts receive store credit at current selling price.",
    wornItemsPolicy: "Footwear must be unworn in pristine condition with original box and tags intact.",
    clearanceRules: "Clearance items are returnable within 45 days unless designated as Final Sale or Hype Release.",
    vipBenefits: "FLX Rewards members get digital receipt storage, early release access, and easy order tracking.",
    steps: [
      { stepNumber: 1, title: "Keep Original Sneaker Box", text: "Ensure shoe box is undamaged with original size label intact." },
      { stepNumber: 2, title: "Bring Receipt or Order Number", text: "Present receipt at any Foot Locker store or start a mail return online via footlocker.com." },
      { stepNumber: 3, title: "Receive Instant Refund", text: "In-store returns process immediately back to your original payment method." }
    ],
    faqs: [
      { question: "Can I return worn shoes to Foot Locker?", answer: "No, Foot Locker requires shoes to be brand new, unworn, and in original packaging with box intact." },
      { question: "How long is Foot Locker's return window?", answer: "Foot Locker offers a generous 45-day return window from the date of purchase or order shipment." },
      { question: "Can I return Foot Locker online orders to a store?", answer: "Yes! Online orders can be returned to any Foot Locker store location for free, saving the $6.99 mail return fee." }
    ],
    relatedBrands: ["nike", "dsw", "adidas"],
    proseContent: `
Foot Locker offers a 45-day return window for unworn footwear, apparel, and accessories.

---

## 📊 Foot Locker Return Summary Table

| Return Method | Timeframe | Cost | Requirements |
| :--- | :--- | :--- | :--- |
| **In-Store Return** | 45 Days | FREE ($0) | Original Box & Receipt |
| **Mail Portal Return** | 45 Days | $6.99 | Prepaid shipping label |
| **FLX Member Return** | 45 Days | FREE | Digital phone number lookup |

[BAR_CHART: Foot Locker Return Convenience | In-Store Drops: 88% | Mail Returns: 12%]
`
  },
  {
    slug: "ikea",
    brand: "IKEA",
    category: ["home", "furniture"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB", "EU", "AE", "IN", "AU"],
    logo: "/images/stores/ikea.png",
    image: "/images/stores/ikea.png",
    metaDescription: "Verified 2026 IKEA return policy guide: 365 days for unopened items, 180 days for opened furniture, 90-day mattress exchange, and IKEA Family receipt storage.",
    officialPolicyUrl: "https://www.ikea.com/us/en/customer-service/returns-claims/return-policy/",
    lastVerified: "2026-08-11",
    quickAnswer: {
      returnWindow: "365 Days (Unopened) / 180 Days (Opened)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment or Store Credit",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "365 Days Unopened",
        status: "yes",
        note: "365 days for unopened products in original box",
      },
      {
        label: "180 Days Opened / Assembled",
        status: "yes",
        note: "180 days for clean, undamaged opened furniture",
      },
      {
        label: "90-Day Mattress Guarantee",
        status: "yes",
        note: "Exchange once within 90 days under Love It or Exchange It",
      },
      {
        label: "IKEA Family Receipt Perk",
        status: "yes",
        note: "Automatic digital purchase tracking via member app",
      },
    ],
    policyTable: [
      {
        category: "Unopened Products & Flat-Packs",
        window: "365 Days (1 Year)",
        condition: "Original unopened packaging",
        fee: "Free ($0)",
      },
      {
        category: "Opened / Assembled Furniture",
        window: "180 Days",
        condition: "Clean, complete, re-sellable condition",
        fee: "Free ($0)",
      },
      {
        category: "Mattresses",
        window: "90 Days",
        condition: "Love It or Exchange It exchange program",
        fee: "Exchange Credit",
      },
      {
        category: "As-Is Clearance Corner",
        window: "Final Sale",
        condition: "Purchased from As-Is department",
        fee: "Non-refundable",
      },
    ],
    executiveSummary: [
      { feature: "Unopened Items", rule: "365 days (1 full year)", detail: "Full refund in original packaging" },
      { feature: "Opened / Assembled Items", rule: "180 days", detail: "Clean, re-sellable condition with proof of purchase" },
      { feature: "Mattress Guarantee", rule: "90-Day Exchange", detail: "Love It or Exchange It: exchange once for equal or higher value" },
      { feature: "IKEA Family Card", rule: "Paperless Receipt Storage", detail: "Automatic purchase lookup via account barcode" }
    ],
    withoutReceiptRules: "IKEA Family members get digital receipt lookup. Unverified returns receive merchandise credit at current lowest selling price.",
    wornItemsPolicy: "Furniture must be clean, complete with all hardware, and free of structural damage or alterations.",
    clearanceRules: "As-Is department items are final sale and non-refundable.",
    vipBenefits: "Free IKEA Family membership gives digital receipt tracking, extra price protection, and 90-day mattress trial.",
    steps: [
      { stepNumber: 1, title: "Bring Item & Order Receipt", text: "Bring flat-pack boxes or assembled furniture to IKEA Customer Service desk." },
      { stepNumber: 2, title: "Scan Account Barcode", text: "Scan IKEA Family app or card for paperless purchase verification." },
      { stepNumber: 3, title: "Receive Refund", text: "Funds credit back to original payment card within 3-5 business days." }
    ],
    faqs: [
      { question: "Can I return assembled IKEA furniture?", answer: "Yes! As long as the furniture is clean, undamaged, and complete with all hardware, you can return opened/assembled furniture within 180 days." },
      { question: "How long do I have to return unopened IKEA boxes?", answer: "IKEA gives a full 365 days (1 year) to return unopened products in original packaging." },
      { question: "What is IKEA's mattress return policy?", answer: "IKEA offers a 90-day 'Love It or Exchange It' trial on mattresses, allowing a one-time exchange for another mattress." }
    ],
    relatedBrands: ["target", "home-depot", "walmart"],
    proseContent: `
IKEA offers an industry-leading return window: **365 days (1 full year)** for unopened products and **180 days** for opened or assembled furniture in clean condition.

---

## 📊 IKEA Return Window Matrix

| Item Condition | Return Window | Refund Type | Requirement |
| :--- | :--- | :--- | :--- |
| **Unopened Flat-Pack** | 365 Days | Original Payment | Original Box & Receipt |
| **Opened / Assembled** | 180 Days | Original Payment | Clean condition & receipt |
| **Mattresses** | 90 Days | One-Time Exchange | Proof of purchase |
| **As-Is Items** | Final Sale | None | As-Is sticker |

[BAR_CHART: IKEA Return Window Duration | Unopened Products: 365 Days | Opened Furniture: 180 Days | Mattresses: 90 Days]
`
  },
  {
    slug: "adidas",
    brand: "Adidas",
    category: ["footwear", "apparel", "sports"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB", "EU", "AU"],
    logo: "/images/stores/adidas.png",
    image: "/images/stores/adidas.png",
    metaDescription: "Verified 2026 Adidas return policy guide: 30-day return window, free return shipping for adiClub members, and Confirmed app hype drop rules.",
    officialPolicyUrl: "https://www.adidas.com/us/help/returns",
    lastVerified: "2026-08-13",
    quickAnswer: {
      returnWindow: "30 Days (Free for adiClub Members)",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment Method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "30-Day Window",
        status: "yes",
        note: "30 days from purchase or delivery date",
      },
      {
        label: "Free adiClub Shipping",
        status: "yes",
        note: "Free return labels for all adiClub loyalty members",
      },
    ],
    policyMatrix: [
      {
        category: "Standard Sneakers & Apparel",
        window: "30 Days",
        condition: "Unworn with original tags and shoe box",
        fee: "FREE for adiClub / $4.99 Non-Members",
      },
      {
        category: "Confirmed App / Hype Releases",
        window: "14 Days",
        condition: "Unopened / Pristine condition",
        fee: "Original Payment or Final Sale",
      },
    ],
    executiveSummary: [
      { feature: "Standard Return Window", rule: "30 Days", detail: "From delivery or store purchase date" },
      { feature: "adiClub Member Perk", rule: "100% FREE Return Shipping", detail: "Free prepaid UPS/FedEx drop-off labels" },
      { feature: "In-Store Drop Off", rule: "FREE ($0 Fee)", detail: "Instant refund to original card at Adidas Retail Stores" },
      { feature: "Hype / Yeezy Drops", rule: "14-Day Limit / Final Sale", detail: "Strict window for limited edition drops" }
    ],
    withoutReceiptRules: "Must present order confirmation email or adiClub account barcode. Unverified store returns receive merchandise credit at current price.",
    wornItemsPolicy: "Items must be unworn and unwashed with tags attached. Manufacturing defects are eligible for warranty evaluation.",
    clearanceRules: "Final sale items marked $.99 or explicitly stamped final sale cannot be returned.",
    vipBenefits: "adiClub membership is free and unlocks unlimited $0 return shipping labels and paperless digital order tracking.",
    steps: [
      { stepNumber: 1, title: "Start Online Return Portal", text: "Log into your adiClub account and select the order items to return." },
      { stepNumber: 2, title: "Print Prepaid Label", text: "Download the free return label or use QR code drop-off at UPS Access Points." },
      { stepNumber: 3, title: "Drop Off & Track Refund", text: "Drop package at carrier center. Refund processes within 3-5 business days." }
    ],
    faqs: [
      { question: "Is Adidas return shipping free?", answer: "Yes! Joining the free adiClub program grants free prepaid return shipping labels for all online orders." },
      { question: "Can I return worn Adidas sneakers?", answer: "Adidas requires items to be unworn and in original packaging, unless returning under a manufacturing defect warranty." },
      { question: "Can I return Adidas online orders to a store?", answer: "Yes! You can return online purchases to any official Adidas Brand Center or Outlet for an immediate card credit." }
    ],
    relatedBrands: ["nike", "foot-locker", "dsw"],
    proseContent: `
Adidas operates a customer-friendly return structure integrated with its free **adiClub** loyalty program.

---

## 📊 Adidas Policy Overview

| Retail Channel | Return Window | Mail Fee | In-Store Drop Fee |
| :--- | :--- | :--- | :--- |
| **adiClub Members** | 30 Days | **FREE ($0)** | **FREE ($0)** |
| **Non-Members** | 30 Days | $4.99 | **FREE ($0)** |
| **Confirmed Drops** | 14 Days | Varies | In-Store / Mail |
`
  },
  {
    slug: "apple",
    brand: "Apple Store",
    category: ["electronics", "tech"],
    country: "US",
    countryName: "United States",
    countryCode: "US",
    shipsTo: ["US", "CA", "GB", "EU", "AU"],
    logo: "/images/stores/apple.png",
    image: "/images/stores/apple.png",
    metaDescription: "Verified 2026 Apple Store return policy guide: 14-day window for iPhones, MacBooks, iPads, zero restocking fees, and iCloud Find My unlinking rules.",
    officialPolicyUrl: "https://www.apple.com/shop/help/returns_refund",
    lastVerified: "2026-08-13",
    quickAnswer: {
      returnWindow: "14 Days from delivery/pickup",
      receiptRequired: true,
      restockingFee: false,
      refundMethod: "Original Payment Method",
      onlineReturns: true,
      inStoreReturns: true,
    },
    badges: [
      {
        label: "14-Day Window",
        status: "yes",
        note: "14 days for iPhones, MacBooks, iPads, and accessories",
      },
      {
        label: "Zero Restocking Fee",
        status: "yes",
        note: "$0 restocking fee even for opened devices",
      },
    ],
    policyMatrix: [
      {
        category: "iPhones, MacBooks, iPads, Apple Watch",
        window: "14 Days",
        condition: "Complete with original box, cords, and power adapters",
        fee: "FREE ($0) - No restocking fee",
      },
      {
        category: "Opened Software / Subscriptions",
        window: "Non-Refundable",
        condition: "Digital downloads once activated",
        fee: "Final Sale",
      },
    ],
    executiveSummary: [
      { feature: "Standard Window", rule: "14 Days", detail: "From date of delivery or store pickup" },
      { feature: "Restocking Fee", rule: "$0 (Zero)", detail: "No penalty for opened electronics" },
      { feature: "Mail Return Shipping", rule: "FREE ($0)", detail: "Prepaid FedEx / UPS shipping label" },
      { feature: "Apple ID Unlink", rule: "Required", detail: "Must erase device and turn off Find My" }
    ],
    withoutReceiptRules: "Apple Store purchases are tracked electronically via serial number, Apple ID, or receipt barcode.",
    wornItemsPolicy: "Hardware must be undamaged and include all original boxes, power bricks, cables, and documentation.",
    clearanceRules: "Opened digital software downloads, gift cards, and developer products are final sale.",
    vipBenefits: "Apple Trade-In program allows instant credit towards new purchases in-store.",
    steps: [
      { stepNumber: 1, title: "Turn Off Find My & Erase", text: "Sign out of iCloud and erase all content and settings on your Apple device." },
      { stepNumber: 2, title: "Pack Device in Original Box", text: "Include original charging cable, power brick, and documentation." },
      { stepNumber: 3, title: "Return In-Store or via Mail", text: "Drop off at Apple Store Genius Bar or mail with prepaid label." }
    ],
    faqs: [
      { question: "Does Apple charge a restocking fee?", answer: "No! Apple charges zero restocking fees, even if the iPhone or MacBook box has been opened and tested." },
      { question: "Can I return an opened iPhone to Apple?", answer: "Yes, within 14 days of purchase or delivery, provided all original accessories and packaging are included." },
      { question: "What is Apple's holiday return policy?", answer: "Apple expands its return window during the holidays: items purchased between early November and December 25 can typically be returned through January 8." }
    ],
    relatedBrands: ["best-buy", "amazon", "target"],
    proseContent: `
Apple enforces a strict **14-day return window** across all hardware products including iPhone, Mac, iPad, Apple Watch, and AirPods.

---

## 📊 Apple Store Return Policy Summary

| Product Category | Return Window | Restocking Fee | In-Store Return |
| :--- | :--- | :--- | :--- |
| **iPhones / iPads** | 14 Days | $0 | YES |
| **MacBooks / Macs** | 14 Days | $0 | YES |
| **AirPods / Accessories** | 14 Days | $0 | YES |
| **Opened Software** | Final Sale | N/A | NO |
`
  }
];



