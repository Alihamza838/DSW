# Shopper Return Policy Guide: MDX Frontmatter & Content Specification

This document details the standardized schema and structure for authoring new shopper return policy guides and blog articles on DSWReturnRefund.

Every article is automatically rendered via the reusable `<ArticleLayout />` system, generating both high-conversion visual UI components and complete schema markup (Article + FAQPage + BreadcrumbList JSON-LD).

---

## 1. MDX Frontmatter Schema Example

```yaml
---
title: "Can You Return DSW Shoes Without a Receipt?"
slug: "dsw-return-policy-no-receipt"
category: "store-guide"
storeId: "dsw"
publishedDate: "2026-07-30"
updatedDate: "2026-07-30"
readingTime: "5 min read"
heroImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
author: "DSWReturnRefund Editorial Team"
verifiedSourceUrl: "https://www.dsw.com/en/us/content/returns-refunds-exchanges"
verifiedSourceDate: "2026-07-30"
quickAnswer: "Yes, DSW accepts returns without a receipt using your rewards account, phone number, or the card used for purchase. Without any purchase verification, you will receive store credit at the item's lowest recent selling price, and a valid government photo ID is required."
factRows:
  - label: "Receipt Lookup Support"
    value: "Phone Number / VIP Account / Card Lookup"
    status: "yes"
  - label: "Unverified Return Refund"
    value: "Store Credit at Lowest Sale Price"
    status: "warning"
  - label: "Photo ID Requirement"
    value: "Mandatory for No-Receipt Returns"
    status: "no"
faq:
  - q: "Does DSW require a photo ID for no-receipt returns?"
    a: "Yes. DSW requires a valid state-issued photo ID for all unverified returns without a receipt or VIP account match."
  - q: "Can I return worn shoes to DSW without a receipt?"
    a: "No. Shoes must be in unworn, original condition unless returning due to a verified manufacturer defect."
sources:
  - title: "Official DSW Returns & Exchanges Terms"
    url: "https://www.dsw.com/en/us/content/returns-refunds-exchanges"
    publisher: "DSW Inc."
    dateAccessed: "2026-07-30"
relatedSlugs:
  - "dsw-complete-return-policy-guide"
  - "target-return-policy-no-receipt"
  - "walmart-return-policy-without-receipt"
---
```

---

## 2. Nine-Point Content Enrichment Rules (Part 4 Compliance)

1. **Question-Phrased H1 & Headings**: Titles must follow real search queries (`Can You Return...`, `How Do I...`, `What Is...`).
2. **Direct Quick Answer Box**: Placed immediately below the title; 2-3 concise sentences providing a self-contained answer for Google AI Overviews and GEO citation.
3. **Structured Fact Table Ledger**: Key data points (return window, fees, ID rules) expressed as key-value pairs (`factRows`).
4. **Freshness & Audits**: `publishedDate` and `updatedDate` must be set and updated every 90 days.
5. **Verified Primary Sources**: Every article must include `verifiedSourceUrl` pointing directly to official retailer terms.
6. **Paragraph Length**: Paragraphs must be 60-100 words with single-claim declarative statements (Wikipedia tone).
7. **No Internal Dead Ends**: Minimum 2-3 `relatedSlugs` for internal cluster navigation.
8. **Inline Deal Callout**: Integrated via `storeId` with `rel="nofollow sponsored"`.
9. **FAQ & JSON-LD**: FAQ Q&As in frontmatter generate both visual accordions and valid FAQPage schema.
