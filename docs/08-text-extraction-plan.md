# 08 — Text Extraction & i18n Data Plan

Companion to `00`–`07`. This is the **content pipeline** doc: how the copy in `texts/*.docx` becomes the strings the site renders, and how those strings become EN/FR/ES data files for the future language toggle. It does **not** implement the toggle — that stays parked per `01` (i18n "re-add later without layout changes"); this doc makes the re-add trivial by keeping every string in versioned, slot-shaped data files.

**Key facts about the source material (verified by reading both docx):**
- `texts/text.docx` — EN source: section-by-section extract of all 7 pages (Home, Property, Legal, Private Client, Lifestyle, About, Inquiry) + nav, footer, form fields/placeholders. Contains Spanish internal notes ("dejalo en blank", "link a mariselacastro.com").
- `texts/Legal_Boutique_Advisers_FR_ES.docx` — complete FR (paras ~0–257) + ES (paras ~258–511) translations of the same document, translation notes retained.
- The docx are **not** the current source of truth for every string: `app/` copy already shipped (commit `802c376`) and differs in places (see §3). The docx is newer/different in spots — reconcile per-slot, don't blindly overwrite.

---

## 1. Why this exists (the i18n end-state)

The site is EN-only today; every string lives in `src/data/*.ts` + a few inline in components. The future toggle (per `01`) is "re-add later without layout changes" — that only stays true if today's extraction lands strings in a shape the toggle can consume without touching components:

```
src/data/            ← per-page slot objects (current: single-language strings)
src/data/locales/    ← FUTURE: fr.ts / es.ts mirroring each slot's string fields
```

**This plan's contract:** every translatable string must end up in a slot object field that is (a) named the same across EN/FR/ES, (b) grouped per page, (c) typed. When the toggle lands, swapping `data/home.ts` → `data/locales/{lang}/home.ts` (or a `t()` lookup over the same shape) is mechanical.

---

## 2. Extraction tooling (one-off, stays in `texts/`)

No new runtime deps. A single throwaway Python script (docx = zip + XML, no `python-docx` needed) extracts paragraphs in document order with their run text:

```python
# texts/extract_docx.py — run once, keep in repo for regeneration
import re, zipfile, sys
xml = zipfile.ZipFile(sys.argv[1]).read('word/document.xml').decode('utf-8')
paras = re.findall(r'<w:p[ >].*?</w:p>', xml, re.S)
for p in paras:
    t = ''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', p, re.S))
    if t.strip():
        print(t)
```

- Run on both files → `texts/extracted/en.txt`, `texts/extracted/fr.txt`, `texts/extracted/es.txt` (ES = paras 258+ of the FR_ES doc).
- **Unicode hygiene (non-negotiable):** keep curly apostrophes/quotes (`’ “ ”`), accents, guillemets (`« »`), and `&amp;` → literal `&`. No ASCII-folding. Verify with a diff spot-check (e.g. `DÍAZ VÁZQUEZ`, `L’EXPERTISE`, `« Su nombre completo »`).
- **Structured intermediate:** then convert the flat paragraph list into `texts/extracted/<lang>.json` grouped by page using the numbered section markers (`1. HOME PAGE`, `2. PROPERTY PAGE`, …) as anchors. This JSON is the machine-readable source of truth for the data-file build (§4).

---

## 3. Slot reconciliation (EN vs current app copy)

Before writing data files, diff each slot: **docx value ↔ current `app/src/data/*.ts` value.** Table of known deltas (verified reading both):

| Slot | docx (EN) | current app | Action |
|---|---|---|---|
| home intro heading | `MORE THAN PROPERTY.` | `More than property.` | Use docx (uppercase styling already applied by CSS; docx value is the canonical copy) |
| home intro body | single long sentence | single sentence | Accept docx |
| home hero sub | `A private advisory for international clients, their investments, properties and life in Spain.` | identical | — |
| legal hero title | `LEGAL EXPERTISE AT OUR CORE` | `Legal expertise at our core` | Use docx |
| legal hero subline | (absent in docx) | `Legal Advisory` | **Keep current** (docx omission is an extract gap, not a copy decision) |
| property hero subline | `A CONSIDERED APPROACH TO PROPERTY IN SPAIN.` | `A considered approach to property in Spain.` | Use docx |
| about hero title | `BUILT ON TRUST EVOLVED AROUND OUR CLIENTS.` | `Built on trust. Evolved around our clients.` | **Keep current** (punctuated variant reads better; docx drops the period-mid-title) |
| footer contact | absent in EN docx | address/phones/email present | Keep current (docx gap) |
| inquiry aside body | `Your enquiry is confidential and will be handled personally by a member of our team.` | `Your enquiry is read only by a partner. We never share your details…` | **Keep current** (sharper copy; docx is a rewrite candidate) |
| residences | docx: "dejalo en blank" | 1 placeholder card (home) | Keep current per `home.ts` ponytail note |

**Rule:** docx wins for copy phrasing unless the current app copy is deliberately better (marked above). All reconciliation is logged in `texts/reconciliation.md` so the client sees what changed and why.

---

## 4. Data file build (the actual "write into website")

Each page's `src/data/*.ts` gets its strings replaced from the reconciled EN values; the FR/ES values are parked as **sibling data files, not wired in**:

```
src/data/
├── home.ts            ← EN (reconciled) — rendered today
├── locales/
│   ├── fr/home.ts     ← FR values, same shape, NOT imported anywhere (YAGNI until toggle)
│   └── es/home.ts     ← ES values, same shape
```

Mechanics per file:
- Keep the **exact object shape** of today's `data/*.ts` (hero `{eyebrow,title,subline,body,cta}`, etc.). Strings change; shape and types don't.
- `locales/*` files import the same assets (image URLs are language-independent) and export the same-shaped object — only string fields differ.
- The form/`inquiry.ts` `options` (interest labels), `navigation.ts` labels, footer labels, and `team.ts` name/role/bio all get locale siblings too (they're translatable strings living outside page data).
- **Inline component strings** (the ones NOT in data files today) must be **moved into data files as part of this pass** — they're currently trapped in JSX (`SiteHeader` "Inquire", `SiteFooter` headings/contact, `InquiryPage` field labels/placeholders/validation messages, `ResidencesStrip`/`PropertyCard` micro-labels, `AboutPage` prose paragraphs, button labels). The extraction must reach them, or the future toggle can't translate them. Create `src/data/ui.ts` (site chrome: nav labels already in `navigation.ts`, footer, header, buttons, form labels, a11y strings) and `src/data/about.ts` (the 4 prose blocks + team already in `team.ts`).
- **Alt text** (`hero.alt`, card `alt`): translate too — screen readers are the audience. `locales/*` carry translated alts.

**Exit:** every string rendered on any page resolves from a data file (no hardcoded JSX strings except brand-constant "LBA"); every data file has an FR and ES sibling of identical shape; `tsc -b` clean; site renders byte-identical to today (strings swapped, layout untouched).

---

## 5. Slot-coverage check (the guarantee)

A `tsc`-checked script or a simple node check that walks both directions:

1. **Every docx string → a data file.** For each extracted EN string (from §2 JSON), assert it appears in exactly one `src/data/*.ts` slot (fuzzy: normalize whitespace/case for micro-uppercase labels which are rendered via CSS `uppercase` — docx stores them uppercase, data stores them sentence case; normalize both sides).
2. **Every data-file string → a docx string or a documented exception.** Exceptions = the deliberate keeps (§3 table) + brand constants (`LBA`, `Legal Boutique Advisers`) + address/phones (absent from EN docx) + placeholder slots (residences empty, team roles).
3. **Locale parity:** for every string key in EN data, the same key exists in `locales/fr` and `locales/es` (and non-empty). Run as `npm run check:i18n` (a 60-line node script, no framework) in `app/`.

Failures are blockers — a missing ES translation must be flagged before merge, not discovered by a Spanish visitor.

---

## 6. Build order

1. `texts/extract_docx.py` → run → `texts/extracted/{en,fr,es}.txt` + `{en,fr,es}.json`.
2. Reconciliation: `texts/reconciliation.md` (the §3 table, expanded to every slot).
3. EN pass: rewrite `src/data/*.ts` strings from reconciled EN; move inline component strings into `data/ui.ts` + `data/about.ts`; swap components to import from data.
4. Locale siblings: `src/data/locales/{fr,es}/*.ts` for all data files, from extracted JSON.
5. `npm run check:i18n` green (coverage + parity).
6. Visual smoke: all 7 routes unchanged at 320/768/1280 (this pass is string-only; the mobile plan `07` Phase 9 matrix applies).

---

## 7. Explicitly NOT in this pass

- **The language toggle itself** — parked per `01`/`06`. When it ships: read locale from `localStorage`/URL, swap the data module (or a `t()` wrapper), add the header control (the FR/ES docx already specifies the footer icon `ES` — "changement de langue"). Nothing in this doc's file shape blocks that.
- FR/ES **routing** (`/fr/...`, `/es/...`) — same park.
- Any layout or component change beyond string-sourcing (this is a data-layer refactor only).
