# Page Spec — Property (`/property`)

**Source template:** `.thumbs/ChatGPT Image Aug 11, 2026, 11_27_45 AM.jpg`
**Status:** layout contract. Copy/photos = placeholder slots. Shared shell per `about-us.md`/`home.md`; deltas below. This template doubles as the **pattern for all four area pages** (`/property`, `/legal`, `/private-client`, `/lifestyle`) — same skeleton, different slots.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — delta: dropdown nav

- Same cream sticky bar, but nav items show **carets** on the four area links (`PROPERTY ⌄  LEGAL ⌄  PRIVATE CLIENT ⌄  LIFESTYLE ⌄  ABOUT`) — each area owns a dropdown of sub-links.
- Desktop: click/hover opens a cream panel `absolute top-full border border-hairline bg-cream px-6 py-4` with stacked micro links (`text-[10px] tracking-[0.2em] uppercase py-1.5 hover:text-oxblood`). Active top-level item rendered in oxblood with hairline underline.
- Mobile overlay menu: same items as accordions (chevron rotates, `max-h` transition).
- Dropdown contents = the page's own section anchors/subpages (e.g. Property → Buying / Selling / Private Search / Residences).
- A11y: `aria-expanded`, `aria-haspopup`, Esc closes, focus trap not required (simple menu) but Esc + outside-click close is mandatory.

### 1.2 Page hero — 50/50 split, text left / full-bleed image right (new shared `PageHero`)

- `grid lg:grid-cols-2`, min-height ≈ `min-h-[420px] lg:min-h-[520px]`.
- **Left (cream) `px-6 md:px-14 py-16 flex flex-col justify-center`:**
  1. `Eyebrow` with left rule ("OUR EXPERTISE" slot).
  2. `h1` uppercase display serif `text-5xl md:text-6xl` single word slot.
  3. Micro subline `mt-3 text-[11px] tracking-[0.25em] uppercase text-taupe` ("A CONSIDERED APPROACH TO …" slot).
  4. Body paragraph `mt-6 text-sm text-taupe max-w-prose`.
  5. Solid oxblood `ButtonLink` `mt-8` with `→` ("DISCUSS YOUR REQUIREMENTS").
- **Right:** image `w-full h-64 md:h-80 lg:h-full object-cover` flush to viewport right edge (no container padding on this section — full-bleed row).
- **Responsive:** stacks text → image; image `h-64`.
- **Reuse:** this is the canonical hero for `/legal`, `/private-client`, `/lifestyle` too — props: `{eyebrow, title, subline, body, cta, image}`.

### 1.3 Services trio — 3 icon columns

- Container, `py-16 md:py-24`, `grid md:grid-cols-3 gap-12`.
- **ServiceColumn:** line icon (key / building / figure glyph, oxblood `h-6 w-6 stroke-1`) → `h3` micro-uppercase? No — title is small display serif uppercase `text-sm tracking-[0.2em]` ("BUYING" slot) `mt-4` → body `mt-3 text-[13px] text-taupe leading-relaxed` → `ArrowLink` `mt-5`.
- Left-aligned (not centered — differs from About's centered ValueItem).
- Optional hairline `border-t border-hairline pt-12` on the grid (consistent with About approach row; template shows generous whitespace either way — choose hairline for rhythm).

### 1.4 Selected residences — strip with per-card arrow link

- Same header row as home §1.5 (label left / `VIEW ALL … →` right).
- Grid `sm:grid-cols-2 lg:grid-cols-4 gap-6`.
- **PropertyCard delta:** after title + meta, add `ArrowLink` "VIEW RESIDENCE →" `mt-3 text-[10px]`. Card is `<a>` to `/property/residences/:slug`; inner link is decorative (whole card clickable — keep single tab stop, arrow is `aria-hidden`).
- Promote `PropertyCard` to shared component with `showLink` prop (home uses `showLink=false`).

### 1.5 Cross-link band — text | image | text

- Container, `pb-20 md:pb-28`, `grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-center`.
- **Side panels** (×2, mirrored content):
  1. `h3` display serif uppercase `text-xl md:text-2xl leading-snug` (two-line slot).
  2. Paragraph `mt-4 text-[13px] text-taupe`.
  3. **Checklist** `mt-5 space-y-2.5`: each item `flex gap-3 items-start` — marker = 10px square outline `border border-oxblood` (or tiny filled square) + micro uppercase text `text-[10px] tracking-[0.18em] text-ink/80`.
  4. `ArrowLink` `mt-6` → sibling area page.
- **Center image:** `w-full lg:w-[380px] aspect-[3/4] object-cover` (arched-interior slot), sharp corners.
- Purpose: internal SEO/navigation weave between area pages — left panel cross-links `/legal`, right `/private-client`. Slot-driven: `{heading, body, checks[5], link, image}`.
- **Responsive:** stacks panel / image / panel in DOM order; image `aspect-[4/3]` on mobile.

### 1.6 CTA band — full-bleed dark image variant

- `CtaBand variant="image"` (same as About §2.6): aerial-coast slot, heavier scrim `bg-ink/45` (template image is dark), heading uppercase serif **cream** + italic serif subline cream/85 + solid oxblood button.
- Delta noted: text color must flip with scrim — `CtaBand` props: `tone: "light" | "dark"` controlling text color.

### 1.7 Footer — dark variant confirmed (third template showing it)
Per `home.md` §1.7. This shot shows single-row layout: lockup left / micro links center / 4 social icons right — matches about-us §2.7 structure, inverted tokens.

---

## 2. Component tree

```
PropertyPage (src/pages/PropertyPage.jsx)   ← also template for Legal/PrivateClient/Lifestyle
├── SiteHeader (dropdown nav)        shared, upgraded
├── PageHero                         shared (area pages)
├── ServicesTrio                     page
│   └── ServiceColumn ×3
├── ResidencesStrip                  shared w/ home (PropertyCard showLink)
├── CrossLinkBand                    page (or shared w/ other area pages)
│   └── Checklist (ui primitive)
├── CtaBand variant="image" tone="dark"  shared
└── SiteFooter (dark)                shared
```

## 3. File structure delta

```
src/
├── pages/PropertyPage.jsx  (+ LegalPage, PrivateClientPage, LifestylePage reuse skeleton)
├── components/shared/PageHero.jsx, CrossLinkBand.jsx
├── components/ui/Checklist.jsx, ArrowLink.jsx (existing)
└── data/property.js  ← services, checks, cross-links slots
```

## 4. Firebase mapping

- `residences` collection (planned in home.md) now also backs `/property/residences/:slug` detail route (detail page not templated yet — hold route stub).
- Nav dropdown contents: static config `src/data/navigation.js` — single source for header + mobile accordion + footer.
- No new runtime deps.

## 5. Responsive & a11y contract

- PageHero image keeps `object-cover` fixed heights → no CLS.
- Dropdown menus keyboard-reachable (button + Esc + outside click).
- Checklist markers `aria-hidden`; text carries meaning.
- CrossLinkBand center image `order` stays middle on mobile (visual relief between text blocks).

## 6. Build order

1. Upgrade `SiteHeader` with dropdowns + `navigation.js`.
2. `PageHero` → `ServicesTrio` → shared `PropertyCard(showLink)` → `CrossLinkBand` + `Checklist` → `CtaBand(tone)`.
3. Clone skeleton for the other three area pages with slot data only.
