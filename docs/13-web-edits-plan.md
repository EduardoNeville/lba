# Web Edits Plan — from "EDITS DE LA PAGINA WEB.docx"

**Branch:** `feat/web-edits` · **worktree:** `/home/eduardoneville/websites/lba-web-edits` (based on `develop` @ `a96811f`)
**Sources:** the client's brief is committed as `docs/13-web-edits-source.docx`; the nine annotated screenshots extracted from it live in `assets/edits-pagina-web/01…09-*.png`. The logo masters stay out of git (`assets/NUEVO LOGO.png|jpg` in the working copy).

**Run:** `cd app && npm run dev` · **build + preview:** `npm run review` (:4173) · **checks:** `npm run check:locales`, `npm run lint`, `npm run build`
**Screenshots of the result** (EN/FR/ES + mobile): tailnet gallery → http://100.110.137.43:54419/ · originals in `/tmp/shots/` (transient)

---

## Status

| § | Change | Status |
|---|---|---|
| 1 | New LBA logo | **[done]** |
| 2 | Home: hero, intro, cards, "Why one firm" | **[done]** |
| 3 | Property page rebuild (approach, featured strip, band, 4 services) | **[done]** |
| 4 | Legal: hero CTA removed | **[done]** |
| 5 | Private Client: hero CTA + contact-points band removed | **[done]** |
| 6 | Enquiry-only CTA band on every page but home | **[done]** |
| 7 | Inquiry page: interest tiles removed | **[done]** |
| 8 | FR + ES translations | **[done]** |
| — | Featured-property photos/descriptions | **[waiting]** — client sends them |
| — | Header/hero inspiration model | **[waiting]** — client sends it |
| — | Footer tagline wording | **[?]** — see Open questions |

Checks: `tsc` clean · `oxlint` clean (1 pre-existing warning) · `check:locales` 0 errors / 0 untranslated · build OK · no console errors on any page · verified visually in EN, FR, ES and at 390px.

---

## Decisions

| # | Question | Decision |
|---|---|---|
| 1 | Inquiry page scope | **Tiles removed; page heading and the "Discretion…" box kept.** Rationale: the tiles are the only *gate* on the form (and the only required field), and the client has consistently dropped decorative rows/side boxes; the heading and the discretion note are the page's context and trust signal. Both are one-line reverts if they want a barer page. The form still records an interest — from `?interest=` on links arriving from the property/legal/private-client/residence pages, otherwise `other`. |
| 2 | Home cards: lists vs descriptions | **Lists replaced** by the one-liners (see §2.3). The docx's list-item edits (Inheritance & Donations, Private Home Management order) are therefore moot; the inheritance signal was folded into the Legal one-liner. |
| 3 | "Buying in Spain" band | **Added** (§3.5). |
| 4 | FR / ES translations | **Authored here**, matching the existing tone; `check:locales` reports 0 untranslated keys. |

---

## 1. Brand — logo **[done]**

- The header now uses develop's brand commit (`feat(brand): use the new LBA lockup in the header, and a
  real favicon`): `logo-lba-ink.png` at `h-9 … lg:h-14` with a `max-w-[52vw]` guard, plus the new
  favicon. This branch does not touch the header — an earlier attempt (transparent PNG, then the
  recolourable `logo-lba.svg`) was dropped in favour of that work. `logo-lba.svg` stays in the repo for
  a colour-adaptive render (`currentColor`) if the footer ever inlines it.
- The old `logo-lba-brush.svg` (317 KB) is no longer referenced — it can be deleted once the client confirms.
- Favicon (`public/favicon.svg`) already renders an "LBA" monogram on cream — left as is.
- The raw potrace trace (`assets/NUEVO_LOGO.svg`) is inverted — a black plate with cream artwork — which
  is why develop's `logo-lba.svg` paints through a mask instead of filling the paths directly.

## 2. Home page **[done]**

- **Hero** — `Law. Real Estate.` / `Private Client Services.`, block right-aligned, body cut to one sentence, "Discover more" button removed, scroll cue kept.
- **Intro** — "Three Services. One Firm." + the new paragraph; the "Legal expertise at our core" side column is gone (single column).
- **Cards** — `01 Real Estate` / `02 Legal` / `03 Private Client Services`, one-line descriptions replacing the item lists, photos **square** and still at the foot of the card, "Explore →" link kept.
- **New "Why one firm makes a difference"** — after the cards, `bg-parchment` (#ECE5D8, "un poco más oscuro que lo demás", **not** the dark brown of the mockups), statement left / explanation right, hairline dividers. Copy exactly as dictated.
- Everything below ("Every client is unique.") unchanged.

## 3. Property page **[done]**

- **Hero** — "One Firm. We guide you through every aspect of your property journey." (sentence case; `PageHero` now uses a wider measure for sentence titles), subline removed, new body, "Discuss your requirements" button kept.
- **A Curated Approach** — full-bleed photo left / copy right; eyebrow, "More Than Properties. A Partner at Every Step.", body, "Our approach →" (to `/about`).
- **Featured Properties** — the residences strip moved up (right after the approach split) and retitled `Featured Properties` on this page only (the shared `ui.selectedResidences` label is untouched elsewhere). It renders live residences from Firestore; the curated photos/descriptions the client sends next replace/extend this.
- **Buying in Spain** — full-bleed photo left / ink panel right: "Buying in Spain", "Access to the Finest Opportunities.", the body, "Our properties →" (to `/property/residences`).
- **Our Services** — title added, icons and photos removed, 4-up: Property Search · Acquisition Advisory · Sale Advisory · Investment Advisory ("Independent advice for property investment across Spain's key markets.").
- Cross-link band ("Property, with legal expertise." / "Beyond the transaction.") unchanged.

**Photo placeholders** (client imagery still to come — swap in `app/src/data/property.ts`):
- approach split → `panel-legal.jpg` (limestone arch/staircase)
- band → `pc-terrace-hero.jpg` (terrace, olive tree, keys on a book)

## 4. Legal **[done]** — hero "Visit our legal practice" button removed (the one lower down, in the "Business vision" band, stays).

## 5. Private Client **[done]** — hero "Discuss your needs" removed, whole "One point of contact in Spain" band (4 icon items) deleted. The Private Home Membership block keeps its own "Discuss your needs" button.

## 6. Enquiry-only CTA band **[done]** — `CtaBand` takes an optional heading; with no heading it renders just the "Make a private enquiry" button in a slimmer band. Applied to About, Property, Legal, Private Client, Residences, Residence detail, Journal list & post. Home keeps "Every client is unique."

## 7. Inquiry page **[done]** — the "I am interested in" tiles are gone; the form is name / email / phone / country / message / consent. `interest` rides along from the query string when a visitor arrives from a specific service or a residence, and defaults to `other`. The unused `interestLabel` / `errorInterest` strings were dropped from all three locale files.

## 8. Translations **[done]** — every new/changed string exists in EN, FR and ES (`nav.property` is now `Real Estate` / `Immobilier` / `Inmobiliaria`; the EN footer link reads "Real Estate Advisory").

---

## Follow-ups requested after the October edits

**Navbar** *(done)* — Legal now comes first; Real Estate follows it and owns **Residences** in a
dropdown (`NAV` in `src/data/navigation.ts` gained `children`, so the mobile menu nests the sub-page
and the desktop header renders a disclosure). The section — not the listing — carries the active
underline on `/property/residences`.

The disclosure is **click-only**: the chevron opens it, and the same chevron, Escape, a click
elsewhere or navigating closes it. An earlier version also opened on hover, which made the button
unreliable — the pointer (and the focus a click leaves behind) had already opened the panel, so the
click read as "close". Closed, the panel is `invisible`, so its links leave the tab order; keyboard
visitors open it with the button and tab in from there.

**WhatsApp in the footer** *(done)* — the contact row gained the WhatsApp mark beside Instagram and
LinkedIn, pointing at the business line (+34 663 109 014 → `wa.me/34663109014`) with the message the
visitor finds already written in the chat, in the language they are reading. The number as a visitor
reads it is unchanged in the address block.

**Copy and languages** *(done)* — the deck had a gap (it never carried the residences
dictionary) and nothing stopped a translation going missing. Both scripts now discover the
dictionaries from the folder, `check:locales` fails on a gap or a short list, fr/es are
type-checked against `en`, and the build runs the check — see `docs/14-copy-and-languages.md`.

**Still open:** the footer's bottom row (`FOOTER_NAV_KEYS`) still lists Real Estate before Legal — say
the word and it matches the header.

## Open questions

1. **Footer tagline** still reads "Lawyers & Private Advisors" (FR "Juristes & Conseillers Privés" / ES "Abogados y Asesores Privados") — now inconsistent with the new "Law. Real Estate. Private Client Services." descriptor. Change it too? (one line in each locale file)
2. **Card link wording** — the client's reference shows "Learn more →"; the site says "Explore →". Kept "Explore"; say the word if the reference wording wins.
3. **Featured Properties grid** — currently the live residence strip, 4 cards. If the curated selection is 3 properties (as in the reference), tell us and we'll pin the layout to 3.
4. **Old brush logo** — delete `logo-lba-brush.svg` (317 KB) from the repo once the new logo is signed off.
5. **Header logo colour** — the header renders the ink lockup. If the client wants their original taupe
   on cream, `logo-lba-taupe.png` (or `logo-lba.svg` with its `color` attribute changed) is the swap.

## Waiting on the client

- Featured-property photos + descriptions.
- The header/hero inspiration model (current hero is right-aligned per the note; easy to re-lay-out).
- Final imagery for the approach split and the Buying-in-Spain band.
