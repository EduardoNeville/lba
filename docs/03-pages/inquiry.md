# Page Spec — Inquiry (`/inquiry`)

**Source template:** `.thumbs/inquiry-page.jpg`
**Status:** layout contract; copy = slots. This page owns the site's **only Firestore write**. Shell reused; footer variant resolved below.

---

## 1. Section-by-section UI breakdown

### 1.1 Header — no delta (INQUIRE button shows active/filled state here: `bg-ink text-cream`).

### 1.2 Hero — split, sentence-case serif headline

- Same 50/50 `PageHero` skeleton as property.md §1.2 with deltas:
  - `h1` here is **sentence case** ("How can we assist you?" slot), display serif `text-4xl md:text-5xl leading-tight` — not uppercase.
  - No subline/CTA button; two short paragraphs instead.
- → `PageHero` prop `titleCase: "upper" | "sentence"` (default upper). One shared component now covers all page heroes.
- Right image full-bleed, fixed heights, `object-cover`.

### 1.3 Inquiry form — 2-col: form left (~7/12) + emblem aside right (~5/12)

- Section `border-t border-hairline`, container, `py-16 md:py-24`, `grid lg:grid-cols-12 gap-12`.

**Left `lg:col-span-7`:**
1. Micro heading ("PLEASE TELL US ABOUT YOUR ENQUIRY").
2. **Interest selector** — label "I AM INTERESTED IN" micro; then `grid grid-cols-2 md:grid-cols-4 gap-3` of **radio cards**:
   - `border border-hairline px-4 py-5 text-center` with line icon (`h-5 w-5 mx-auto text-oxblood`) + micro uppercase 2-line label `mt-3 text-[9px] tracking-[0.18em]`.
   - Selected: `border-oxblood bg-parchment` (visible ring via border color swap, keep 1px to preserve rhythm).
   - Implement as real `<input type="radio" class="sr-only">` + `peer`/label styling, or `role="radiogroup"` with buttons — radios preferred (keyboard/free a11y).
3. **Fields** (each: micro uppercase label `mb-2` + control):
   - Control base: `w-full border border-hairline bg-transparent px-4 py-3 text-sm text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none transition-colors`.
   - FULL NAME (full width) → row: EMAIL + PHONE `md:grid-cols-2 gap-4` → COUNTRY OF RESIDENCE (`<select>` with chevron `appearance-none` + absolute svg) → HOW CAN WE ASSIST YOU? (`textarea rows={5}`).
4. **Consent**: square checkbox (`h-4 w-4 border-hairline accent-oxblood` or custom) + `text-[11px] text-taupe` with underlined Privacy Policy link (required).
5. **Submit**: `w-full bg-oxblood text-cream py-4 micro uppercase tracking-[0.25em] hover:bg-ink transition` + `→`.
6. States: `idle | submitting (opacity-60 pointer-events-none, label "SENDING…") | error (taupe micro line under button) | success` — success **replaces form** with centered serif sentence-case thank-you + micro note (no alert()).
7. Validation: required = interest, name, email (format), consent. Inline micro error text under offending field, oxblood border on invalid after touch. No library — 30 lines of state.

**Right aside `lg:col-span-5`:**
- `border border-hairline p-10 md:p-12 text-center self-start` (box panel):
  1. Emblem: monogram in laurel — implement as inline SVG slot (serif "LBA" + two hairline arcs), `h-14 mx-auto`, oxblood stroke.
  2. Heading display serif sentence-case `text-2xl md:text-[1.75rem] leading-snug mt-6` ("Discretion is at the heart of everything we do." slot).
  3. Hairline `w-10 h-px bg-ink/50 mx-auto mt-6`.
  4. Paragraph `mt-6 text-[12px] text-taupe leading-relaxed`.
- Sticky on desktop (`lg:sticky lg:top-28`) so it holds while form scrolls.

### 1.4 Footer — EXPANDED 4-column variant observed (light here, dark elsewhere)

Templates disagree: home/property/private-client = slim dark band; inquiry = expanded light 4-col; about = slim light.
**Canonical resolution (ratify in `02-design-system.md`):** ONE expanded footer, dark oxblood background:
- Row `grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] py-14`:
  1. Lockup (cream) + one-line micro tagline.
  2. "OUR SERVICES" micro heading + 5 stacked micro links (area pages).
  3. "INFORMATION" micro heading + Privacy / Legal / Cookies links.
  4. "CONTACT" micro heading + address / phone / email micro lines + outlined cream button "MAKE A PRIVATE ENQUIRY" (→ top of this page / `#form` anchor).
- Bottom bar `border-t border-cream/20 py-6 flex justify-between text-[10px] micro uppercase text-cream/60`: © left, credit/links right.
- `about-us.md` §2.7 and `home.md` §1.7 both superseded by this.

---

## 2. Component tree

```
InquiryPage (src/pages/InquiryPage.jsx)
├── SiteHeader                       shared
├── PageHero titleCase="sentence"    shared
├── InquirySection                   page
│   ├── InquiryForm
│   │   ├── InterestRadios (radio cards)
│   │   ├── Field (label + control + error)  ui primitive
│   │   └── submit states
│   └── DiscretionAside              page (emblem panel)
└── SiteFooter (expanded dark)       shared, final form
```

## 3. File structure delta

```
src/
├── pages/InquiryPage.jsx
├── components/inquiry/InquiryForm.jsx, DiscretionAside.jsx
├── components/ui/Field.jsx
└── lib/submitInquiry.js   ← Firestore write, isolated for testing
```

## 4. Firebase mapping (the real one)

- Collection `inquiries`: `{interest, fullName, email, phone, country, message, consent:true, createdAt: serverTimestamp()}` via `addDoc`.
- `lib/submitInquiry.js` exports one async fn; form imports it — swap to Cloud Function later without touching UI.
- Rules: `allow read: if false; allow create: if request.resource.data.email is string && request.resource.data.consent == true;` (write-only from client).
- Lazy Firebase init (`getFirestore` on first submit import) so form page is the only chunk pulling Firestore SDK — `React.lazy` the page in router to keep it out of the main bundle.
- Success/error copy slots; never expose Firestore error strings.

## 5. Responsive & a11y

- Radio cards 4→2 cols; EMAIL/PHONE row collapses at `md`.
- Labels are real `<label for>`; errors `role="alert"` + `aria-describedby`.
- Aside un-stickies below `lg`, renders after form on mobile (DOM order: form → aside).
- Contrast: placeholder taupe/60 is decorative only (labels carry meaning).

## 6. Build order

1. `Field` + `InterestRadios` + validation state machine.
2. `submitInquiry.js` with lazy Firestore.
3. `DiscretionAside` + expanded dark `SiteFooter` (site-wide swap).
4. Test: submit happy path against emulator; offline → error state.
