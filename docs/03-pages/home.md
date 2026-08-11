# Page Spec — Home (`/`)

**Source template:** `.thumbs/ChatGPT Image Aug 10, 2026, 10_12_49 PM.jpg`
**Status:** layout contract. Copy/photos = placeholder slots; grids, ratios, hairlines = truth. Shared shell (header/footer/CTA) described in `about-us.md` is reused; this file notes deltas.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — shared shell, no delta
Same cream sticky bar as `about-us.md` §2.1 (logo lockup / 5 micro links / outlined INQUIRE).

### 1.2 Hero — full-bleed image, centered stack (contrast to About's split hero)

- `relative isolate min-h-[75vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden`.
- Background image `absolute inset-0 -z-20 w-full h-full object-cover object-center` (wide villa/dusk slot).
- Scrim for arbitrary images: `absolute inset-0 -z-10 bg-ink/35` plus optional bottom gradient `bg-gradient-to-t from-ink/50 via-transparent` — template text is cream-on-photo; scrim guarantees AA with any asset.
- Centered content `text-center px-6 max-w-3xl`:
  1. `h1` display serif uppercase, **cream** (`text-cream`), `text-4xl md:text-6xl leading-[1.1] tracking-wide`. Template shows 2 lines with `·` separators between words — render headline as slot but keep the middle-dot pattern as a style option (`LEGAL · PROPERTY · PRIVATE CLIENT` → join words with ` · `).
  2. Sub-paragraph `mt-6 text-cream/85 text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto`.
  3. Solid button `mt-8` `bg-oxblood text-cream px-8 py-3 micro uppercase tracking-[0.2em] hover:bg-cream hover:text-ink transition-colors` → `/about` ("DISCOVER THE FIRM" slot).
- No eyebrow rule here (centered hero omits the left rule device).

### 1.3 Intro split — "MORE THAN PROPERTY" (7/5 with hairline divider)

- Container, `py-20 md:py-28`, `grid lg:grid-cols-12 gap-12`.
- **Left `lg:col-span-7`:**
  - `h2` uppercase serif `text-3xl md:text-4xl` (slot).
  - 2 paragraphs `mt-6 space-y-4 text-taupe text-sm max-w-prose`.
  - Text link `mt-8`: `ArrowLink` micro uppercase `text-[11px] tracking-[0.2em]` with `→`, hover oxblood + arrow nudge → `/about`.
- **Right `lg:col-span-5 lg:border-l lg:border-hairline lg:pl-12`:**
  - Small line icon (column glyph, oxblood, `h-6 w-6`) top.
  - Micro-uppercase subhead `mt-4 text-[11px] tracking-[0.25em] text-ink`.
  - Short paragraph `mt-3 text-[13px] text-taupe`.
  - `ArrowLink` `mt-6` → values anchor or `/about#approach`.
- Vertical hairline between columns is the signature move here — keep at `lg+` only.

### 1.4 Practice areas — 4 bordered vertical panels (page's signature block)

- Container, `pb-20 md:pb-28`. No section heading in template — panels start directly.
- Grid `grid sm:grid-cols-2 lg:grid-cols-4 gap-5`.
- **PracticePanel** — `border border-hairline bg-parchment/60 flex flex-col`:
  1. Top row `flex items-baseline justify-between px-5 pt-5`: micro number `01` (`text-[10px] tracking-[0.2em] text-taupe`) + optional tiny line icon right.
  2. Title `px-5 mt-3 font-display uppercase tracking-[0.12em] text-lg` (PROPERTY / LEGAL / PRIVATE CLIENT / LIFESTYLE slots).
  3. Item list `px-5 mt-4`: 4–5 micro links, each `block py-2 border-t border-hairline text-[10px] uppercase tracking-[0.18em] text-taupe hover:text-oxblood` — hairline above every item.
  4. Image pinned to panel bottom `mt-auto w-full aspect-[3/4] object-cover` (sharp corners, flush to border — no padding around image).
- Equal heights: `flex flex-col` + `mt-auto` image keeps 4 panels aligned regardless of list length (lists are fixed 4–5 slots; bio text not present here).
- Whole panel links to area page (`/property`, `/legal`, …) or panel title is the link; items deep-link.
- **Responsive:** 4 → 2 (`sm`) → 1 col; panels keep internal order.

### 1.5 Selected residences — label row + 4-up property cards

- Header row `flex items-baseline justify-between mb-8`:
  - Left: micro uppercase label `text-[11px] tracking-[0.25em]` ("SELECTED RESIDENCES" slot).
  - Right: `ArrowLink` "VIEW ALL PROPERTIES →" → `/property`.
- Grid `grid sm:grid-cols-2 lg:grid-cols-4 gap-6`.
- **PropertyCard** (`<a>` group):
  1. Image `aspect-[4/3] w-full object-cover`, hover `group-hover:scale-[1.03] transition duration-700` inside `overflow-hidden` wrapper (subtle, optional).
  2. Title row `mt-3 flex justify-between items-baseline`: micro uppercase name `text-[11px] tracking-[0.2em] text-ink`.
  3. Meta `mt-1 text-[10px] uppercase tracking-[0.18em] text-taupe` (location slot).
- Data slot: `residences[4]` = `{image, title, meta, slug}`; grid tolerates 4–8 (wraps).

### 1.6 CTA band — parchment variant with left botanical accent

- Delta from About's full-bleed `CtaBand`: this template shows a **light parchment band** with a decorative botanical photo bleeding in from the left edge.
- Implementation: `relative overflow-hidden bg-parchment py-20 md:py-24 text-center`.
  - Decorative image `absolute left-0 top-0 h-full w-1/4 object-cover opacity-90 hidden md:block` with right-edge fade (`[mask-image:linear-gradient(to_right,black,transparent)]`) so any botanical asset dissolves into the band.
- Centered stack (same voice as shared CTA):
  1. Line 1: uppercase display serif `text-2xl md:text-3xl` ("EVERY CLIENT IS DIFFERENT." slot).
  2. Line 2: italic serif `mt-2 text-sm md:text-base text-taupe italic`.
  3. Solid oxblood button `mt-8` → `/inquiry`.
- **CtaBand component gets a `variant` prop:** `"image"` (About full-bleed) | `"accent"` (this one). One component, two skins.

### 1.7 Footer — DARK variant observed here

- This template renders the footer as a **deep oxblood/maroon band with cream text**, while `about-us.jpg` showed a cream footer.
- Canonical decision (to be ratified in `02-design-system.md`): **dark footer site-wide** — it anchors every page and matches this home template; `about-us.md` §2.7 superseded accordingly.
- Structure identical to about-us §2.7 but tokens inverted: `bg-oxblood` (or `bg-[#4A1D1A]` deep maroon), text `cream/80`, hairlines `cream/20`, hover `text-cream`. Logo lockup cream.
- **Superseded by `inquiry.md` §1.4:** canonical footer is the EXPANDED 4-column dark variant (lockup+tagline / services / information / contact + bottom bar). Keep dark tokens from this section.

---

## 2. Component tree

```
HomePage (src/pages/HomePage.jsx)
├── SiteHeader                 shared
├── HomeHero                   page (full-bleed centered)
├── IntroSplit                 page (7/5 + vertical hairline)
├── PracticeAreas              page
│   └── PracticePanel ×4
├── ResidencesStrip            page
│   └── PropertyCard ×4
├── CtaBand variant="accent"   shared
└── SiteFooter (dark)          shared

ui primitives added:
└── ArrowLink   (micro uppercase + →, hover nudge)
```

## 3. File structure delta

```
src/
├── pages/HomePage.jsx
├── components/home/HomeHero.jsx, IntroSplit.jsx,
│   PracticeAreas.jsx, ResidencesStrip.jsx
└── data/practiceAreas.js, residences.js
```

## 4. Firebase mapping

- Static slots now; later: Firestore `residences` collection `{image, title, meta, slug, featured:true, order}` for the strip; `practiceAreas` stays static (structural nav, not content).
- No auth needed. Hosting rewrite already covers `/`.

## 5. Responsive & a11y contract

- Hero text stays centered and legible at 320px: `text-4xl` floor, scrim mandatory.
- Panels: `sm:grid-cols-2` keeps 2×2 tablet layout; images keep `aspect-[3/4]`.
- Decorative botanical image: `aria-hidden="true"` + `alt=""`.
- All cards are single `<a>` wrappers with `focus-visible` ring (one tab stop per card).

## 6. Build order

1. Shared shell + tokens (from about-us spec, footer dark).
2. `HomeHero` → `IntroSplit` → `PracticeAreas` → `ResidencesStrip` → `CtaBand(accent)`.
3. Verify 320 / 768 / 1280; check hero scrim contrast with a light and a dark test image.
