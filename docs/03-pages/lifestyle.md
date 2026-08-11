# Page Spec — Lifestyle (`/lifestyle`)

**Source template:** `.thumbs/lifestyle-section.jpg`
**Status:** layout contract; copy = slots. Completes the area-page set.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — no delta (LIFESTYLE active).

### 1.2 PageHero — shared, no delta
Eyebrow ("LIFE IN SPAIN"), two-line uppercase title, paragraph, solid `ButtonLink`.

### 1.3 Assist row — 5 icon columns WITH explore links

- Centered micro heading ("HOW WE CAN ASSIST") `mb-12`.
- `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center`.
- Item = `ValueItem` + trailing `ArrowLink` ("EXPLORE →" `mt-4 text-[10px] justify-center`) → sub-page/anchor slots (GOLF / SCHOOLS & EDUCATION / DESTINATIONS / CULTURE / WELLNESS).
- 5 columns is the delta vs 4 elsewhere — grid handles it; `md` falls back to 3+2 wrap.
- Promote to `ui/ValueItem` with optional `link` prop (legal.md pillars use it without).

### 1.4 Insider Access — text+checklist left / image mosaic right

- Container `py-20`, `grid lg:grid-cols-[2fr_3fr] gap-12 items-start`.
- **Left:**
  1. Micro heading ("INSIDER ACCESS").
  2. Paragraph `mt-4 text-[13px] text-taupe`.
  3. `Checklist marker="check"` `mt-6 space-y-2.5` — ~8 items, **check glyph** (`✓` inline SVG `h-3 w-3 text-oxblood`) instead of square outline; item text `text-[11px] tracking-[0.08em] text-ink/80` (sentence-case here, not uppercase — check variant reads as list copy).
- **Right: MosaicGrid** — `grid grid-cols-3 grid-rows-2 gap-3`:
  - 6 image cells, each `w-full h-full object-cover` with row height set by `aspect-[4/3]` on cells (grid auto-rows equal).
  - Sharp corners; hover: none (static collage) — keep it calm.
  - Data slot `mosaic[6]` images; component tolerates exactly 6 (grid fixed) — if fewer, render what exists (grid auto-flow).
- **Responsive:** `< lg` stacks text → mosaic; mosaic keeps 3 cols down to `sm`, then 2 cols (`grid-cols-2` with 6 cells = 3 rows).

### 1.5 CTA — `CtaBand variant="image" tone="dark"` ("YOUR LIFESTYLE, YOUR WAY" + italic subline + solid button). No delta.
### 1.6 Footer — expanded dark per inquiry.md §1.4. No delta.

---

## 2. Component tree

```
LifestylePage (src/pages/LifestylePage.jsx)
├── SiteHeader                  shared
├── PageHero                    shared
├── AssistRow                   = ValueItem(link) ×5
├── InsiderAccess               page
│   ├── Checklist marker="check"
│   └── MosaicGrid              new small ui component
├── CtaBand                     shared
└── SiteFooter                  shared
```

## 3. File structure delta

```
src/
├── pages/LifestylePage.jsx
├── components/ui/MosaicGrid.jsx
└── data/lifestyle.js ← assist items(+links), access checks, mosaic images
```

## 4. Firebase mapping
- None new; static slots.

## 5. Responsive & a11y
- 5-col row: `lg:grid-cols-5 md:grid-cols-3 grid-cols-2` (last item wraps centered on odd counts — acceptable).
- Mosaic images get individual `alt` slots; decorative duplicates use `alt=""`.
- Check glyphs `aria-hidden`.

## 6. Build order
1. `ValueItem` link prop; `Checklist` check marker.
2. `MosaicGrid`.
3. Compose page from `data/lifestyle.js`.
