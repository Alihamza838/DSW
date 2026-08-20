# DSWReturnRefund Brand Guidelines & Icon System (2026 Edition)

## Overview & Brand Philosophy
**DSWReturnRefund** represents "returns as an ongoing cycle of trust." Our primary brand mark is a symmetrical, mathematically precise closed figure-eight infinity return loop. It signifies continuous consumer confidence, frictionless policy verification, and transparent retail workflows.

---

## 1. The Infinity Return-Loop Mark

### Construction Specifications
* **Geometry**: Closed figure-eight infinity path constructed using matched cubic Bezier curves with exact 180-degree control point symmetry left-to-right.
* **Proportions**: Height-to-width ratio of approximately 1:1.9 for the loop inside a square badge. Center crossing point at `(50, 50)` in a 100x100 coordinate system.
* **Stroke Weight**: Fixed stroke width equal to 6.25% of the total badge container width (`strokeWidth="6.25"` on a 100x100 viewBox).
* **Joins & Endcaps**: Rounded stroke endcaps (`stroke-linecap="round"`) and joins (`stroke-linejoin="round"`).
* **Center Crossing Openness**: The center intersection retains a visually open 45-degree crossing clearance to prevent pinching or muddying when rendered down to 16×16 pixels.
* **Container Badge**: Rounded-square badge with a corner radius of 22% of badge width (`rx="22"` / `ry="22"`).

---

## 2. Approved Color Variants & Hex Tokens

### Variant 1: Light-Background ("Color") — Default Primary Mark
* **Used For**: Light canvas pages, web headers, white cards, search results, marketing banners.
* **Badge Fill**: `#0D9488` (Deep Brand Teal)
* **Loop Stroke**: `#FFFFFF` (Pure White / Cream gradient)
* **Accent Node / Arrow**: `#5EEAD4` (Bright Cyan / Lighter Teal)
* **Badge Outer Border**: `rgba(255, 255, 255, 0.2)`

### Variant 2: Dark-Background ("Dark") — Night Mode / Dark Components
* **Used For**: Assistant panel (`SupportChat.tsx`), dark mobile drawers, terminal tools, high-contrast dark sections.
* **Badge Fill**: `#0F1729` (Midnight Navy)
* **Loop Stroke**: `#5EEAD4` (Lighter Teal / Cyan)
* **Accent Node / Arrow**: `#0D9488` (Brand Teal)
* **Badge Outer Border**: `rgba(94, 234, 212, 0.25)`

### Variant 3: Safari Pinned Tab / Monochrome Vector
* **Used For**: macOS Safari pinned tab mask icon (`/safari-pinned-tab.svg`).
* **Fill / Mask**: `#0D9488` or `#000000` monochrome vector path.

---

## 3. SVG Source Code Reference

### Primary Light Variant SVG (100x100 ViewBox)
```xml
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="96" height="96" rx="22" ry="22" fill="#0D9488" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
  <path
    d="M 50 50 C 62 33, 84 33, 84 50 C 84 67, 62 67, 50 50 C 38 33, 16 33, 16 50 C 16 67, 38 67, 50 50 Z"
    fill="none"
    stroke="#FFFFFF"
    stroke-width="6.25"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path d="M 75 35 L 82 33 L 83 40" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="82" cy="33" r="3" fill="#5EEAD4" />
</svg>
```

### Dark Variant SVG (100x100 ViewBox)
```xml
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="96" height="96" rx="22" ry="22" fill="#0F1729" stroke="rgba(94,234,212,0.25)" stroke-width="2" />
  <path
    d="M 50 50 C 62 33, 84 33, 84 50 C 84 67, 62 67, 50 50 C 38 33, 16 33, 16 50 C 16 67, 38 67, 50 50 Z"
    fill="none"
    stroke="#5EEAD4"
    stroke-width="6.25"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path d="M 75 35 L 82 33 L 83 40" fill="none" stroke="#5EEAD4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="82" cy="33" r="3" fill="#0D9488" />
</svg>
```

---

## 4. Clear Space & Size Constraints

* **Clear Space Rule**: Maintain minimum clear space around the badge equal to `0.5 × Badge Height` on all sides to prevent visual clutter.
* **Minimum Sizes**:
  * **Icon-only Badge**: Minimum 16px × 16px (favicon / tab usage).
  * **Full Wordmark Lockup**: Minimum width 120px.
* **Wordmark Gap**: Spacing between badge and typography is set to `0.4 × Badge Height` (`gap-2.5` in Tailwind).

---

## 5. Micro-Interactions & Motion Rules

* **First-Load Draw Animation**: On session entry, the infinity path draws itself in over 700ms using CSS `stroke-dasharray` / `stroke-dashoffset` keyframes (`rpfLogoDraw`). The state is tracked via `sessionStorage.getItem("rpf_logo_animated")` so it triggers once per visit.
* **Hover Interaction**: Hovering over the brand lockup applies a subtle 1.05× scale transition on the badge with smooth cubic-bezier easing.
* **Reduced Motion Compliance**: Evaluates `(prefers-reduced-motion: reduce)`. When enabled by user system preference, all stroke drawing animations are disabled immediately and the static path is rendered cleanly without motion.

---

## 6. Favicon & Asset Export Structure

| File | Purpose | Resolution / Format |
|---|---|---|
| `/public/icon.svg` | High-Resolution SVG Master & PWA Tile | Vector SVG (512x512) |
| `/public/favicon.svg` | Browser Tab Favicon | 32x32 Clean SVG |
| `/public/safari-pinned-tab.svg` | Safari Touch Bar / Mask Icon | Vector Monochrome SVG |
| `/public/manifest.json` | Web App Manifest Metadata | JSON (references icons) |

---

## 7. Incorrect Usage (Forbidden Modifications)

* ❌ **Do NOT** stretch or distort the figure-eight aspect ratio.
* ❌ **Do NOT** apply heavy 3D bevels, arbitrary drop shadows, or unapproved rainbow gradients.
* ❌ **Do NOT** alter the stroke width unevenly across the lobes.
* ❌ **Do NOT** pinch or collapse the central crossing point `(50, 50)`.
* ❌ **Do NOT** place the light-background variant directly on low-contrast teal surfaces without the badge container.

---

## 8. Site-Wide Icon System Rules & Standards

* **Single Icon Library**: All icons across the site MUST come strictly from `lucide-react`. No emoji characters as UI icons, no external icon packs (FontAwesome, Material, etc.), and no image file (`.png`/`.svg`) icons for generic UI elements (except official store brand logos and the primary DSWReturnRefund infinity brand mark).
* **Icon Sizing Standard**:
  * **16px** (`h-4 w-4`): Small inline text indicators, table metadata, list bullets, tag icons.
  * **20px** (`h-5 w-5`): Standard button icons, card header badges, form controls, navigation links.
  * **24px** (`h-6 w-6`): Hero section callouts, major feature grid titles, primary section headers.
* **Stroke & Color Rules**:
  * Standard stroke width is `strokeWidth={1.75}` or `2.0`.
  * Icons must inherit from the application color palette (`text-teal-brand`, `text-slate-700`, `text-emerald-600`, `text-amber-600`) using Tailwind utility classes rather than hardcoded fill colors.

