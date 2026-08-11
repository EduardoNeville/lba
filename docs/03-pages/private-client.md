# Page Spec — Private Client (`/private-client`)

**Source template:** `.thumbs/ChatGPT Image Aug 11, 2026, 11_30_48 AM.jpg`
**Status:** layout contract; copy/photos = slots. Reuses shell + `PageHero` (property.md §1.2), `Checklist`, `ArrowLink`, `CtaBand`, dark footer.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — no delta (PRIVATE CLIENT active in oxblood)

### 1.2 PageHero — shared pattern confirmed
Identical skeleton to property.md §1.2: cream text column (eyebrow rule, one-word+ `h1` uppercase serif, micro subline, paragraph, solid oxblood `ButtonLink →`) / full-bleed image right. Props already slot-driven — no new work.

### 1.3 Contact-points row — centered heading + 4 icon-left items

- Centered micro heading ("ONE POINT OF CONTACT IN SPAIN" slot) + one italic/serif or taupe subline beneath, `mb-12`.
- `grid sm:grid-cols-2 lg:grid-cols-4 gap-8`.
- **ContactPoint:** `flex items-start gap-4` — line icon left (`h-6 w-6 stroke-1 text-oxblood shrink-0`), then stack: title `text-[11px] uppercase tracking-[0.2em] text-ink` + sub `mt-1 text-[10px] uppercase tracking-[0.15em] text-taupe` (e.g. "Bilingual team / English · Spanish").
- Differs from About's centered ValueItem and Property's stacked ServiceColumn → third icon layout voice; keep all three (each used once, no premature unification).

### 1.4 Services — 4 image-top cards

- Centered micro heading ("OUR PRIVATE CLIENT SERVICES") `mb-10`.
- `grid sm:grid-cols-2 lg:grid-cols-4 gap-8`.
- **ServiceCard:**
  1. Image `aspect-[4/3] w-full object-cover` sharp corners.
  2. Title `mt-5 font-display uppercase tracking-[0.15em] text-sm`.
  3. Body `mt-3 text-[13px] text-taupe leading-relaxed line-clamp-5` (even heights with arbitrary copy).
  4. `ArrowLink` "LEARN MORE →" `mt-4 text-[10px]`.
- Whole card = `<a>` (single tab stop); arrow `aria-hidden`.
- Tolerates 3–6 cards.

### 1.5 Feature split — image left / parchment panel right with 2-col checklist

- Container, `py-20`, `grid lg:grid-cols-2 gap-0` (flush join):
  - **Left:** image `w-full h-72 lg:h-full object-cover` (still-life slot), flush.
  - **Right:** `bg-parchment px-8 md:px-12 py-12 flex flex-col justify-center`:
    1. Micro eyebrow ("PRIVATE HOME SUPPORT").
    2. `h2` display serif uppercase `text-2xl md:text-3xl leading-snug` ("PEACE OF MIND, ALL YEAR ROUND." slot).
    3. Paragraph `mt-4 text-[13px] text-taupe`.
    4. `Checklist` **2-column**: `mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5` (square outline markers per property.md §1.5).
    5. Solid oxblood `ButtonLink` `mt-8` self-start.
- **Responsive:** image stacks above panel.
- `Checklist` primitive gains `columns?: 1|2` prop.

### 1.6 Trusted network — text wordmark wall (no logos-as-images)

- `bg-parchment` full-bleed band, `py-16`.
- Inner container `grid lg:grid-cols-[1fr_2fr] gap-12 items-center`:
  - **Left:** micro heading ("A TRUSTED NETWORK" slot) + short paragraph `text-[13px] text-taupe`.
  - **Right:** wordmark grid `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6` — each entry two-line micro uppercase text (`text-[10px] tracking-[0.18em] text-ink/70`, second line lighter) e.g. "Architecture / Interiors". **Text-only marks** — no image assets, survives any partner list; hover `text-oxblood`.
- Data slot: `partners[12]` = `{line1, line2}`.

### 1.7 CTA band — `variant="image" tone="dark"` (coast slot) — shared, no delta.

### 1.8 Footer — dark, no delta.

---

## 2. Component tree

```
PrivateClientPage (src/pages/PrivateClientPage.jsx)
├── SiteHeader                    shared
├── PageHero                      shared
├── ContactPoints                 page
│   └── ContactPoint ×4
├── ServicesGrid                  page
│   └── ServiceCard ×4
├── FeatureSplit                  page (uses Checklist cols=2 + ButtonLink)
├── TrustedNetwork                page (wordmark wall)
├── CtaBand                       shared
└── SiteFooter                    shared
```

## 3. File structure delta

```
src/
├── pages/PrivateClientPage.jsx
├── components/private-client/ContactPoints.jsx, ServicesGrid.jsx,
│   FeatureSplit.jsx, TrustedNetwork.jsx
└── data/privateClient.js  ← points, services, checks, partners slots
```

## 4. Firebase mapping
- All slots static for now; `partners` is the one list that may become Firestore `partners` collection later (client-editable) — same lazy pattern as `team`.
- No new runtime deps.

## 5. Responsive & a11y
- ContactPoints 4→2→1; ServiceCards 4→2→1; wordmarks 6→3→2.
- FeatureSplit panel keeps `justify-center` so short copy still balances against tall image.
- Wordmarks are `span`s, not links, until partners get URLs (avoid dead `<a href="#">`).

## 6. Build order
1. `ContactPoints` → `ServicesGrid` → `FeatureSplit` (Checklist cols prop) → `TrustedNetwork`.
2. Verify card clamp keeps row heights equal at 768px.
