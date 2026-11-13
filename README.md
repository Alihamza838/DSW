# DSWReturnRefund

Plain-English summaries of store return policies (DSW, Walmart, Target, Amazon and 40 more), each checked
against the retailer's own website and dated. Live at https://dswreturnrefund.com.

Independent guide — not affiliated with DSW Designer Shoe Warehouse or any retailer.

## How it's built

- **Static site generation:** React 19 + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) + React
  Router. Every page (stores, comparisons, categories, guides) is rendered to its own HTML file at build time, with its
  own title, description, canonical URL, Open Graph image and JSON-LD.
- **One source of truth:** `src/data/policies.ts` holds the verified policy for every store (window, receipt rules,
  fees, exceptions, steps, FAQs, holiday rules, official source link, date checked). Store pages, comparisons, category
  tables, images and structured data are all generated from it. Research notes: `research/verified-2026-11.md`.
- **Guides:** Markdown files in `src/content/guides/*.md` (frontmatter + body; `## Frequently asked questions` with
  `### Question` headings becomes FAQ schema). Store facts in guides must match `policies.ts`.
- **Images:** `npm run images` draws the timeline graphic for each store, guide covers and comparison cards
  (no store logos) from the data, with Playwright + sharp.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # prerender all pages, then scripts/verify-build.mjs
npm run preview    # serve dist/ on http://localhost:4173
npm run images     # redraw images after changing a policy or adding a guide
npm run typecheck
```

`npm run build` fails if a page has no or a duplicate title, a title over 60 characters, a missing description or
canonical, too little text, a broken internal link or image, a redirect to a missing page, or is missing from the sitemap.

## Updating a policy

1. Re-read the store's official returns page.
2. Edit its record in `src/data/policies.ts` and set `checked` to today.
3. If something isn't stated on the official page, put it in `unconfirmed` instead of guessing.
4. `npm run images -- <slug>` and `npm run build`.

## Redirects

Old URLs (retired guides, old sections) are listed in `scripts/redirects.mjs`; run `node scripts/write-vercel.mjs`
to regenerate `vercel.json`. The build checks every destination exists.
