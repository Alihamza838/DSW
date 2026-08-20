# DSWReturnRefund: Guide Image Asset Checklist

To enable custom header images for Expert Policy Guides without broken asset requests or layout shifts, place image files in `/public/images/guides/` matching the filenames listed below.

Once an image file is added to `/public/images/guides/`, open `/src/components/ui/GuideImage.tsx` and uncomment the `<img />` element marked with `TODO`.

---

## 📸 Expected Guide Image File Checklist

| Filename | Associated Guide Title | Category | Status |
| :--- | :--- | :--- | :--- |
| `american-eagle-return-policy-guide.png` | American Eagle Return & Exchange Policy 2026 | Store Guide | ⬜ Pending |
| `ulta-return-and-exchange-policy-guide.png` | Ulta Return & Exchange Policy: 60-Day Guarantee | Store Guide | ⬜ Pending |
| `home-depot-plant-return-policy-guide.png` | Home Depot Plant Return Policy: 1-Year Guarantee | Store Guide | ⬜ Pending |
| `dsw-online-return-policy.png` | DSW Online Returns & Exchange Window | Store Guide | ⬜ Pending |
| `dsw-return-policy-with-receipt.png` | DSW Return Policy With Receipt: 90-Day Cash Refunds | Store Guide | ⬜ Pending |
| `dillards-return-policy.png` | Dillard's Return Policy 2026: 30-Day Window | Store Guide | ⬜ Pending |
| `halara-return-policy.png` | Halara Return Policy: 30-Day Activewear Guarantee | Store Guide | ⬜ Pending |
| `loft-return-policy.png` | LOFT Return Policy 2026: 30-Day Window & Final Sale | Store Guide | ⬜ Pending |
| `home-depot-appliance-return-policy.png` | Home Depot Appliance Return Policy: 48-Hour Inspection Window | Store Guide | ⬜ Pending |
| `dsw-complete-guide.png` | DSW Return Policy 2026: Complete Shopper's Guide | Store Guide | ⬜ Pending |
| `dsw-return-policy-without-receipt.png` | Can You Return DSW Shoes Without a Receipt? | Store Guide | ⬜ Pending |
| `dsw-shoes-return-policy.png` | DSW Worn & Opened Shoe Return Rules | Store Guide | ⬜ Pending |
| `dsw-avoid-shipping-fee.png` | How to Avoid DSW Return Shipping Fees | Store Guide | ⬜ Pending |
| `walmart-return-policy-without-receipt.png` | Walmart Return Policy Without a Receipt: 2026 Cashier Lookup | Store Guide | ⬜ Pending |
| `target-return-policy-explained.png` | Target Return Policy Explained: 90 Days & RedCard Perks | Store Guide | ⬜ Pending |
| `costco-electronics-return-policy.png` | Costco Electronics Return Policy: The 90-Day Rule | Store Guide | ⬜ Pending |
| `amazon-return-policy-guide.png` | Amazon Return Policy 2026: Free Kohl's & UPS Drop-off | Store Guide | ⬜ Pending |
| `best-buy-open-box-return-policy.png` | Best Buy Open Box Return Policy: 14-Day Window | Store Guide | ⬜ Pending |
| `nike-worn-shoes-return-policy.png` | Can You Return Worn Nike Shoes? 60-Day Member Rule | Store Guide | ⬜ Pending |
| `sephora-vs-ulta-return-policy.png` | Sephora vs. Ulta Return Policy Comparison | Comparison | ⬜ Pending |
| `pakistan-daraz-return-policy.png` | Daraz Pakistan Return Policy: 14-Day Buyer Protection | Country Guide | ⬜ Pending |
| `india-ecommerce-return-laws.png` | India Consumer Protection Act 2026: E-Commerce Return Rights | Country Guide | ⬜ Pending |
| `dubai-uae-consumer-rights-returns.png` | Dubai & UAE Consumer Protection Law: 14-Day Return Rights | Country Guide | ⬜ Pending |
| `ksa-saudi-consumer-protection-returns.png` | KSA Consumer Protection Association: Saudi Arabia Return Rights | Country Guide | ⬜ Pending |
| `store-credit-vs-cash-refund.png` | Store Credit vs. Original Payment Method Refund | Consumer Rights | ⬜ Pending |
| `final-sale-item-return-exceptions.png` | What Does 'Final Sale' Mean? Consumer Rights & Exceptions | Consumer Rights | ⬜ Pending |
| `best-retail-return-policies.png` | Top 10 Best Retail Return Policies in 2026 | Trends | ⬜ Pending |
| `holiday-extended-return-policies.png` | Holiday Extended Return Windows 2026: Store Deadlines | Seasonal | ⬜ Pending |
| `amazon-drop-off-locations-guide.png` | Where to Drop Off Amazon Returns: Kohl's, Staples, Whole Foods | Store Guide | ⬜ Pending |
| `return-policy-trends-2026.png` | Retail Return Policy Trends 2026: Restocking Fees & Digital Receipts | Trends | ⬜ Pending |
| `return-shipping-fees-retailers.png` | Retailers Charging Return Shipping Fees in 2026 | Trends | ⬜ Pending |
| `ftc-affiliate-disclosure-rules.png` | FTC Guidelines §255: Retailing Affiliate Transparency | Compliance | ⬜ Pending |

---

## 🖼️ Store Hero & Category Image Conventions

- Store Logos: `/public/images/stores/[storeId]-logo.png`
- Store Hero Banners: `/public/images/stores/[storeId]-hero.png`
- Product / Deal Visuals: Kept active dynamically via fallback unsplash assets in `/src/data/products.ts`.
