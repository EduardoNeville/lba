# Page Spec — Legal (`/legal`)

**Source template:** `.thumbs/legal-part.jpg`
**Status:** layout contract; copy = slots. Highest reuse ratio of any page — nearly every block is an existing primitive.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — no delta (LEGAL active).

### 1.2 PageHero — shared, multi-line uppercase title
Same split hero; title slot wraps two lines ("LEGAL EXPERTISE AT OUR CORE"). No component change — `title` accepts any wrap. Solid `ButtonLink →`.

### 1.3 StatementBand — NEW shared primitive

- Full-width band `py-12 md:py-16 border-b border-hairline` (hairline below observed).
- Centered single sentence, display serif sentence-case `text-xl md:text-2xl leading-snug max-w-3xl mx-auto text-ink` ("We provide independent legal advice to …" slot).
- `components/ui/StatementBand.jsx` — one `<p>` in a container; reuse candidate on other area pages.

### 1.4 Pillars — 4 centered icon columns = About's `ValueItem`

- `grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center`, `py-16 md:py-24`.
- Items: INDEPENDENT ADVICE / DISCRETION / INTERNATIONAL PERSPECTIVE / TRUSTED NETWORK — icon (scales/shield/globe/columns line glyphs, oxblood) → micro uppercase title → 1–2 line taupe body `max-w-[26ch] mx-auto`.
- **Direct reuse of `about/ApproachSection` item component** — promote `ValueItem` to `ui/` when second use lands (this page is that second use).

### 1.5 Areas of advice — 4 ServiceCards with checklists

- Centered micro heading ("OUR AREAS OF LEGAL ADVICE") `mb-10`.
- `grid sm:grid-cols-2 lg:grid-cols-4 gap-8`.
- **Card = private-client `ServiceCard` + `Checklist` inserted between body and link:**
  1. Image `aspect-[4/3]`.
  2. Title uppercase serif `text-sm tracking-[0.15em] mt-5`.
  3. Body `text-[13px] text-taupe mt-3`.
  4. `Checklist` `mt-4` 1-col, items `text-[10px]` (4–6 per card).
  5. `ArrowLink` "LEARN MORE →".
- `ServiceCard` gains optional `checks` prop. Equal heights via existing flex column + `mt-auto` on link.

### 1.6 Practice split — text | image | icon-list (CrossLinkBand variant)

- `grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center`, `py-20`.
- **Left:** micro eyebrow ("THE LEGAL PRACTICE") + `h2` uppercase serif two-line ("COMMERCIAL MINDS. LEGAL EXCELLENCE.") + paragraph + **outlined** `ButtonLink` (variant="outline") — first template using outline CTA mid-page; `ButtonLink` already has the variant.
- **Center:** image `aspect-[3/4] lg:w-[340px]` (signage/still-life slot).
- **Right:** `IconList` — 3 stacked rows `flex gap-4 items-start py-4 border-t border-hairline` (first also bordered top): line icon + micro uppercase title + `text-[11px]` taupe one-liner; below list an `ArrowLink`.
  - This is CrossLinkBand's right column swapped from Checklist → IconList. Generalize `CrossLinkBand` to accept `left`/`right` as children slots instead of fixed props (small refactor, keeps both property & legal layouts).
- **Responsive:** stacks left → image → right.

### 1.7 CTA — `CtaBand variant="image" tone="dark"` ("NEED LEGAL ADVICE?" slot). No delta.
### 1.8 Footer — expanded dark per inquiry.md §1.4. No delta.

---

## 2. Component tree

```
LegalPage (src/pages/LegalPage.jsx)
├── SiteHeader                       shared
├── PageHero                         shared
├── StatementBand                    shared (new)
├── PillarsRow                       = ValueItem ×4 (promoted to ui/)
├── AdviceGrid                       = ServiceCard(checks) ×4
├── CrossLinkBand                    shared, children slots
│   ├── left: eyebrow+h2+body+outline ButtonLink
│   ├── center: image
│   └── right: IconList + ArrowLink   (new small page component)
├── CtaBand                          shared
└── SiteFooter                       shared
```

## 3. File structure delta

```
src/
├── pages/LegalPage.jsx
├── components/ui/StatementBand.jsx, ValueItem.jsx (promoted), IconList.jsx
└── data/legal.js ← pillars, areas(+checks), practice rows slots
```

## 4. Firebase mapping
- None new. All static slots.

## 5. Responsive & a11y
- Pillars 4→2→1; AdviceGrid 4→2→1 with checklist keeping cards equal-height (flex + `mt-auto` link).
- IconList rows are text (no dead links) until targets exist.
- StatementBand sentence stays `max-w-3xl` so it never runs edge-to-edge on desktop.

## 6. Build order
1. Promote `ValueItem`; add `StatementBand`.
2. `ServiceCard` checks prop; `CrossLinkBand` children refactor.
3. Compose `LegalPage` from slots — should be ~150 lines of JSX, proof the primitive set is complete.
