# Page Spec — About Us (`/about`)

**Source template:** `.thumbs/about us.jpg` (full-page desktop screenshot)
**Status:** layout contract. All copy/names/photos in the screenshot are **placeholders** — the grid, rhythm, and component structure below are the source of truth. Content slots must accept arbitrary text lengths and image subjects without breaking layout.

---

## 1. Overall character

- Editorial / luxury-law-boutique aesthetic: warm cream canvas, ink-brown type, oxblood accent, hairline rules, lots of whitespace.
- Typography is two-voice:
  - **Display serif** (Cormorant Garamond / EB Garamond class) — headings set in **uppercase**, generous leading, slight tracking.
  - **Micro labels** — tiny (10–11px) uppercase, heavily letter-spaced (0.2em–0.3em) sans or small-caps serif — used for nav, eyebrows, buttons, roles, footer links.
- Body copy: small (14–15px), muted taupe, comfortable line-height (~1.8), narrow measure (max-w-prose / ~55ch).
- No rounded corners anywhere (sharp rectangles), no shadows, no gradients. Depth comes from image blocks and alternating cream tones.
- Hairline borders (`1px`, warm gray) separate sections and columns — the primary structural device.

### Token usage on this page (formalized later in `02-design-system.md`)

| Token | Approx value | Used for |
|---|---|---|
| `cream` | `#F3EEE5` | page background |
| `parchment` | `#ECE5D8` | alternate band bg (subtle shift) |
| `ink` | `#241E18` | headings, primary text, header border |
| `taupe` | `#7D7266` | body copy, secondary text |
| `hairline` | `#D9D0C0` | 1px rules, card dividers |
| `oxblood` | `#6D2A24` | CTA button fill, link hover, icons |

Type scale: `h1` ≈ clamp(2.5rem→3.75rem) uppercase serif; `h2` ≈ 2–2.5rem uppercase serif; micro = 10–11px `tracking-[0.25em]` uppercase; body = `text-sm md:text-[15px] leading-relaxed`.

Container: `max-w-[1200px] mx-auto px-6 md:px-10`. Section rhythm: `py-20 md:py-28`.

---

## 2. Section-by-section UI breakdown

### 2.1 Site header (shared shell — described here once, reused on all pages)

- Sticky top bar, `bg-cream/95 backdrop-blur`, `border-b border-hairline`, height ≈ `h-20`.
- 3-zone flex row, `items-center justify-between`:
  1. **Logo lockup (left):** serif monogram "LBA" (`font-display text-2xl tracking-wide`) + stacked 2-line micro wordmark to its right (`text-[9px] tracking-[0.3em] uppercase leading-snug`, second line lighter/taupe). Whole lockup is one `<a href="/">`.
  2. **Nav (center-right, `hidden lg:flex gap-8`):** 5 micro-uppercase links (`text-[11px] tracking-[0.2em]`), ink color, hover → oxblood + underline offset. Active page gets oxblood or underline.
  3. **Action (right):** outlined button `border border-ink px-5 py-2 micro uppercase tracking-[0.2em]`, hover inverts (`hover:bg-ink hover:text-cream`). Routes to `/inquiry`.
- **Mobile (`< lg`):** hamburger button (2 thin lines, not 3 — matches hairline aesthetic) toggling a full-screen cream overlay menu: stacked micro-uppercase links `text-sm tracking-[0.25em]`, inquire button at bottom. Body scroll locked while open.

### 2.2 Hero — asymmetric split (text left / portrait image right)

- Grid: `lg:grid-cols-12 gap-12 lg:gap-16`, `py-16 md:py-24`.
- **Left `lg:col-span-7`:**
  - `Eyebrow` component: micro-uppercase label ("ABOUT US" slot) preceded by a short 24–32px horizontal hairline (`inline-block w-8 h-px bg-ink/60 mr-3 align-middle`).
  - `h1`: uppercase display serif, 3-line wrap in screenshot → keep `leading-[1.08]`, `max-w-[14ch]`-ish so any headline wraps tall and editorial. `text-4xl md:text-5xl lg:text-[3.5rem]`.
  - Two body paragraphs `mt-8 space-y-5 text-taupe max-w-prose`. Slot accepts 1–3 paragraphs.
- **Right `lg:col-span-5`:**
  - Single image, **sharp corners**, `w-full h-[320px] md:h-[420px] lg:h-[560px] object-cover`. Image top aligns with eyebrow, not with h1 (i.e., both columns start at same y — use `items-start`).
  - Fixed aspect/height prevents CLS regardless of source image.
- **Responsive:** `< lg` stacks — text block first, image after at `h-72 w-full`.

### 2.3 Legacy split — reversed two-column (image left / text right)

- Same container; `grid lg:grid-cols-12 gap-12 items-center`, `pb-20 md:pb-28`.
- **Image `lg:col-span-5`:** near-square still-life, `aspect-[4/5] w-full object-cover`.
- **Text `lg:col-span-7 lg:pl-8`:**
  - Eyebrow slot ("FROM ONE DESK TO THE NEXT").
  - `h2` uppercase serif, two-line wrap, `text-3xl md:text-4xl leading-snug max-w-[24ch]`.
  - 3 short paragraphs `mt-6 space-y-4 text-taupe text-sm max-w-prose`.
- **Responsive:** stacks image → text (image first preserves visual rhythm against hero's text-first).

### 2.4 Team section — 4-up card grid

- Centered micro heading slot ("THE PEOPLE BEHIND …") — `text-center micro uppercase tracking-[0.25em] text-taupe`, `mb-12`.
- Grid: `grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14`.
- **TeamCard** (vertical stack, left-aligned):
  1. Photo: `aspect-[3/4] w-full object-cover` sharp corners. Grayscale→color on hover is optional polish, **not** in template — skip.
  2. Name: `mt-5 font-display uppercase tracking-[0.12em] text-base md:text-lg`.
  3. Role: `mt-1 text-[11px] italic text-taupe` (serif italic, sentence case) — visually distinct from the micro-uppercase voice.
  4. Bio: `mt-3 text-[13px] leading-relaxed text-taupe`, clamp to ~4 lines (`line-clamp-4`) so card heights stay even with arbitrary copy.
  5. Link: `mt-4 micro uppercase text-[10px] tracking-[0.2em] inline-flex items-center gap-2` with `→` arrow glyph; hover: oxblood + arrow translates `group-hover:translate-x-1 transition`. Routes to `/team/:slug` (or `#` until profile pages exist).
- No card borders/backgrounds — whitespace + alignment do the separation (matches screenshot).
- **Data:** array of 4 slot objects `{name, role, bio, photo, slug}` — static `src/data/team.js` now, Firestore `team` collection later (see §5). Grid must tolerate 3–6 items (wraps cleanly).

### 2.5 Approach / values — 4-up icon row

- Centered eyebrow slot ("OUR APPROACH"), `mb-10`.
- `border-t border-hairline pt-12` on the grid container (hairline above the row is visible in template).
- Grid: `grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center`.
- **ValueItem:**
  1. Icon: 24–28px **stroke line icon** (`stroke-1`, ink or oxblood), centered. Use 4 distinct minimal glyphs (search/precision, eye-off or seal/discretion, knot or scales/integrity, columns or key/stewardship) — inline SVG, stroke inherits `currentColor`.
  2. Title: `mt-4 micro uppercase tracking-[0.25em] text-ink`.
  3. Text: `mt-3 text-[13px] text-taupe leading-relaxed max-w-[26ch] mx-auto`.
- **Responsive:** 4 → 2 → 1 cols.

### 2.6 CTA band — full-bleed image with centered overlay

- `relative isolate overflow-hidden`, min-height ≈ `py-24 md:py-32`.
- Background image `absolute inset-0 -z-10 w-full h-full object-cover` (wide landscape slot).
- Scrim for contrast safety: `absolute inset-0 -z-10 bg-cream/40` (template image is light; text is ink — scrim keeps WCAG contrast with arbitrary images).
- Centered stack:
  1. `h2` uppercase display serif `text-3xl md:text-4xl` ("LET'S TALK." slot).
  2. One italic serif subline `mt-3 text-sm md:text-base italic text-ink/80`.
  3. **Solid button** `mt-8 inline-block bg-oxblood text-cream px-8 py-3 micro uppercase tracking-[0.2em] hover:bg-ink transition-colors` → routes `/inquiry`.
- This band is a **shared component** (`CtaBand`) — reuse on every page.

### 2.7 Site footer (shared shell)

> **Superseded by `home.md` §1.7:** canonical footer is the DARK oxblood variant site-wide. Structure below unchanged; invert tokens (`bg-oxblood`/deep maroon, `text-cream/80`, hairlines `cream/20`, hover `text-cream`).

- `border-t border-hairline bg-cream`, `py-14`.
- Top row: `flex flex-col md:flex-row md:items-center justify-between gap-8`:
  1. Logo lockup (same as header, smaller).
  2. Inline link list (micro uppercase, `gap-6 flex-wrap`) — same routes as nav.
  3. Social icons: 2–3 inline SVGs (Instagram, LinkedIn, mail), `h-4 w-4`, taupe → oxblood hover, `aria-label` each.
- Bottom row after `mt-10 border-t border-hairline pt-6`: `flex justify-between text-[10px] micro uppercase tracking-[0.2em] text-taupe` — © line left, privacy/terms links right. Stacks on mobile.

---

## 3. Component tree

```
AboutPage (src/pages/AboutPage.jsx)
├── SiteHeader            shared
├── AboutHero             page
├── LegacySplit           page
├── TeamSection           page
│   └── TeamCard ×N
├── ApproachSection       page
│   └── ValueItem ×4
├── CtaBand               shared (props: heading, subline)
└── SiteFooter            shared

ui primitives:
├── Eyebrow      (rule + micro label, optional centered)
├── ButtonLink   (variants: outline | solid)
└── Container    (max-w + padding wrapper)
```

## 4. File structure (fits existing React+Vite+Tailwind app)

```
src/
├── pages/AboutPage.jsx
├── components/
│   ├── layout/SiteHeader.jsx, SiteFooter.jsx
│   ├── shared/CtaBand.jsx
│   ├── ui/Eyebrow.jsx, ButtonLink.jsx, Container.jsx
│   └── about/AboutHero.jsx, LegacySplit.jsx,
│       TeamSection.jsx, ApproachSection.jsx
└── data/team.js, values.js   ← placeholder content slots
```

Images: import from `src/assets/about/` (hero, legacy, cta, team-1..4) — swap files later without touching components.

## 5. Firebase mapping

- **Now:** zero runtime Firebase deps for this page; content is static slots.
- **Later (optional):** Firestore `team` collection `{name, role, bio, photoURL, slug, order}` read in `TeamSection` with static fallback while loading (`getDocs` client-side, no SSR in Vite).
- CTA/Inquire buttons → internal route `/inquiry` (that page owns the Firestore write / email flow).
- **Hosting:** `firebase.json` → `"hosting": {"public": "dist", "rewrites": [{"source": "**", "destination": "/index.html"}]}`; `npm run build && firebase deploy --only hosting`. SPA rewrite is required for `/about` deep links.

## 6. Responsive & a11y contract

- Breakpoints: mobile-first; `sm` = 2-col grids; `lg` = full 4-col / split layouts; nav collapses below `lg`.
- Every image: fixed height or aspect ratio + `object-cover` + descriptive `alt` slot (no layout shift with arbitrary assets).
- Heading order `h1 → h2 → h3` per section; micro labels are `p`/`span`, not headings.
- Focus states: `focus-visible:outline focus-visible:outline-oxblood focus-visible:outline-offset-4`.
- Oxblood-on-cream and ink-on-cream both pass AA; never set taupe on parchment for micro text.

## 7. Build order for this page

1. Tokens in `tailwind.config` + base `index.css` (fonts, selection color).
2. `Container`, `Eyebrow`, `ButtonLink`, `SiteHeader`, `SiteFooter`, `CtaBand`.
3. `AboutPage` sections top-down with placeholder slots.
4. Swap in real copy/photos; verify 320px / 768px / 1280px.

---

*Next: repeat this spec per remaining template in `.thumbs/`, then consolidate shared tokens/shell into `00-overview.md`, `01-stack-and-firebase.md`, `02-design-system.md`, and `04-migration-plan.md`.*
