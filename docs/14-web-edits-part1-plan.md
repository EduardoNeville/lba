# Web Edits Plan — Part 1 — from "NEW EDITS PART1 WEBSITE.docx"

**Branch:** `feat/web-edits-part1` · **worktree:** `/home/eduardoneville/websites/lba-web-edits-part1` (based on `develop` @ `d6a0cae`)
**Sources:** the client's brief is committed as `docs/14-web-edits-part1-source.docx`; the thirteen annotated screenshots extracted from it live in `assets/edits-part1/01…13-*.png|jpg`. The client's raw drops stay out of git in the main working copy: `assets/Terraza Mediterránea con Piscina Infinita.png` (the "IMAGENNUEVA1" hero) and `assets/Foto Marisela.jpg` (the portrait for the law-firm section).

**Run:** `cd app && npm run dev` · **build + preview:** `npm run review` (:4173) · **checks:** `npm run check:locales`, `npm run lint`, `npm run build`

---

## Status

| § | Change | Status |
| 1 | Header lockup in black (not brown) | [todo] |
| 2 | Home: new centred hero (brand title + descriptor line, terrace image) | [todo] |
| 3 | Home: service cards reordered — 01 Legal, 02 Real Estate | [todo] |
| 4 | Home: featured-residences band removed | [todo] |
| 5 | Home: CTA band reduced to the enquiry button only | [todo] |
| 6 | Footer services links → Law Firm / Real Estate / Private Client Advisory | [todo] |
| 7 | Nav labels per the mockup — Law / Real Estate / Property Management | [todo] |
| 8 | Legal: value-pillar tiles removed (statement stays) | [todo] |
| 9 | Legal: areas grid + "Business vision" band replaced by "Our Law Firm" (text + Marisela portrait) | [todo] |
| 10 | Legal: CTA band reduced to the button only, tighter spacing | [todo] |
| 11 | Real Estate: dropdown + page title "Properties" (was Residences) | [todo] |
| 12 | Real Estate: new hero copy (Sotogrande + wider-portfolio paragraph) | [todo] |
| 13 | FR + ES translations for every changed string | [todo] |

---

## File map

| Change | Files |
| --- | --- |
| Black lockup | `app/src/assets/logo-lba-black.png` (new), `app/src/components/layout/SiteHeader.tsx` |
| Home hero | `app/src/data/home.ts`, `app/src/data/locales/home.ts` (en/fr/es), `app/src/pages/HomePage.tsx` |
| Cards order | `app/src/data/home.ts`, `app/src/data/locales/home.ts` (en/fr/es) |
| Featured band | `app/src/pages/HomePage.tsx`, delete `app/src/components/shared/FeaturedResidences.tsx`, drop `featured` key from `app/src/data/locales/residences.ts` (en/fr/es) |
| CTA bands | `app/src/pages/HomePage.tsx`, `app/src/pages/LegalPage.tsx`, `app/src/components/shared/CtaBand.tsx` (padding), drop `cta` keys from `app/src/data/locales/home.ts`, drop `practice`/`cta` from `app/src/data/locales/legal.ts` + `app/src/data/legal.ts` |
| Our Law Firm | `app/src/pages/LegalPage.tsx`, `app/src/data/legal.ts`, `app/src/data/locales/legal.ts` (en/fr/es), `app/src/assets/marisela-portrait.jpg` (new) |
| Footer services | `app/src/data/locales/{en,fr,es}.ts` (`footer.servicesLinks`) |
| Nav labels | `app/src/data/locales/{en,fr,es}.ts` (`nav.label`) |
| Properties rename | `app/src/data/locales/residences.ts` (en/fr/es), `app/src/pages/ResidencesPage.tsx` |

---

## 1. Brand — header lockup in black

The header renders `logo-lba-ink.png`, whose artwork is `#241E18` — warm enough to read as brown against the cream header, which is what the client is pointing at. The lockup becomes true black (`#000000`), alpha preserved, so it sits crisply on the beige.

- Generate `app/src/assets/logo-lba-black.png` from the existing PNG:
  `ffmpeg -i logo-lba-ink.png -vf "format=rgba,lutrgb=r='0':g='0':b='0'" logo-lba-black.png` (verified: 15 KB, transparent background intact).
- Swap the import in `SiteHeader.tsx` (`logo-lba-ink.png` → `logo-lba-black.png`). Sizing/`max-w-[52vw]` guard unchanged.
- Favicon untouched. `logo-lba-ink.png` stays in the repo until sign-off, then can go the way of `logo-lba-brush.svg`.

## 2. Home — centred hero

The mockup (`assets/edits-part1/02-home-hero-mockup.png`) replaces the right-aligned statement hero with a brand lockup hero, centred on the image:

- **Title:** `LEGAL BOUTIQUE ADVISERS` — Cormorant Garamond is already the site's `font-display`, so no font work; large, white, centred, sentence-as-brand (uppercase).
- **Descriptor line:** `LAW · REAL ESTATE · PROPERTY MANAGEMENT` — "pon ese punto en medio": middle dots (·) as separators, letterspaced micro type, white, centred.
- **Image:** the client's terrace shot (`assets/Terraza Mediterránea con Piscina Infinita.png` — the mockup uses exactly this photo). Convert to `app/src/assets/home-hero-terrace.jpg` (ffmpeg, ~2200 px wide, q3 ≈ 330 KB) and point `data/home.ts → hero.image` at it.
- **Layout change:** centred block (`text-center mx-auto`), no cream scrim — a light bottom-up ink gradient keeps the white type legible on the bright photo; scroll cue kept; `hero-screen` kept.
- **Copy:** `sub` ("Based in Marbella") and `body` go away in all three languages; `heading` becomes the brand name in EN/FR/ES (a firm name does not translate), the descriptor translates:
  - EN `Law · Real Estate · Property Management`
  - FR `Droit · Immobilier · Gestion de biens`
  - ES `Derecho · Inmobiliaria · Gestión de propiedades`
- New alt text per language (terrace, infinity pool, sea view).

## 3. Home — service cards reordered

`Cambia el orden 1 legal, 2 real estate`: the three cards become **01 Legal · 02 Real Estate · 03 Private Client Services**.

- `data/locales/home.ts` (en/fr/es): reorder the `practiceAreas` array and renumber (`num` lives in the copy).
- `data/home.ts`: reorder the parallel array so the images/links follow (office-despacho → `/legal` first, home-hero → `/property` second, pc-keys → `/private-client` third).

## 4. Home — featured-residences band removed

`Quita las Properties aquí`: the dark carousel (Featured Residences / "TEST") comes off the home page.

- Remove the lazy import + `<Suspense>` block from `HomePage.tsx`.
- Delete `components/shared/FeaturedResidences.tsx` — home-only (the Property page's "Featured Properties" strip is the separate `PropertyStrip`), and git history keeps it if the band returns.
- Drop the now-orphaned `featured` copy key from `data/locales/residences.ts` (en/fr/es).

## 5. Home — CTA band reduced to the button

`Aqui quita la imagen y el texto solo deja MAKE A PRIVATE INQUIRY`: the "Every client is unique. / Tell us about your plans in Spain." band loses the botanical image and the two lines; the slim enquiry-only band (what every other page already uses) remains.

- `HomePage.tsx`: `<CtaBand cta={{ to: '/inquiry', label: ui.privateEnquiry }} />` — no `variant`, no `image`.
- Drop `cta` from `data/locales/home.ts` (en/fr/es) and the `cta.image` export from `data/home.ts`.
- Spelling: the site is consistently "enquiry" (header/footer/inquiry page); the docx wrote "inquiry". Keep "enquiry" unless the client insists.

## 6. Footer — services links

`Aquí poner: LAW FIRM, REAL ESTATE, PRIVATE CLIENT ADVISORY` — `footer.servicesLinks` in all three locales:

- EN `Law Firm` / `Real Estate` / `Private Client Advisory`
- FR `Cabinet d'avocats` / `Immobilier` / `Conseil aux clients privés`
- ES `Despacho de abogados` / `Inmobiliaria` / `Asesoramiento a clientes privados`

`FOOTER_SERVICES` targets (`/property`, `/legal`, `/private-client`) are unchanged — "Law Firm" links to `/legal`, matching the docx order.

## 7. Nav labels — per the hero mockup

The mockup's header reads **LAW · REAL ESTATE · PROPERTY MANAGEMENT · JOURNAL · ABOUT** (the client did not dictate it in words, but it is what the approved reference shows and it matches the new descriptor). `nav.label` becomes:

| key | EN | FR | ES |
| --- | --- | --- | --- |
| legal | Law | Droit | Derecho |
| property | Real Estate (unchanged) | Immobilier (unchanged) | Inmobiliaria (unchanged) |
| privateClient | Property Management | Gestion de biens | Gestión de propiedades |
| journal / about | unchanged | unchanged | unchanged |

One-line reverts per language if she only meant the hero. Flagged in Open questions.

## 8. Legal — pillars removed

`ESTO QUITARLO Y subir el resto` (screenshot crops exactly the four tiles — Independent Advice / Discretion / International Perspective / Trusted Network):

- Remove the `Pillars` grid from `LegalPage.tsx`; keep the centred statement paragraph above it (the crop excludes it; flagged in Open questions).
- Drop `pillars` from `data/locales/legal.ts` (en/fr/es) and the `ValueItem` import if now unused.

## 9. Legal — "Our Law Firm" replaces the areas grid + business-vision band

`Eso quitarlo y poner this instead` — the Advice grid and the "Business vision. Legal excellence." band go, replaced by the mockup's two-column section (text left, portrait right):

- **Eyebrow:** `OUR LAW FIRM` with the short oxblood rule, as in the mock.
- **Headline (serif, sentence case, large — not uppercase):** "Our law firm was founded by Marisela Castro, a Spanish lawyer with over 25 years of experience advising international clients in Spain."
- **Body, exactly as dictated:**
  1. "Under her leadership, our firm combines a deep legal expertise with a personal, pragmatic and solutions-oriented approach, offering tailored advice to individuals, families, investors and businesses on all aspects of their legal and property matters in Spain."
  2. "From real estate transactions to tax and corporate matters, we provide clear, strategic and discreet legal support, always with a focus on our client's long-term interests."
- **Portrait:** `assets/Foto Marisela.jpg` → `app/src/assets/marisela-portrait.jpg` (ffmpeg resize to 820 px ≈ 134 KB). "no pongas la foto super grande" — a restrained column (~4/5 aspect, `max-w-md/lg`), not a full-bleed.
- **Copy data:** new `firm` block in `data/locales/legal.ts` (en/fr/es) replacing `areas`, `areasHeading` and `practice`; `data/legal.ts` swaps `practice`/`cta` exports for `firm = { image: mariselaPortrait }`.

FR / ES (authored here, matching the existing tone):

- FR headline: "Notre cabinet a été fondé par Marisela Castro, avocate espagnole forte de plus de 25 ans d'expérience au service d'une clientèle internationale en Espagne."
- FR body: "Sous sa direction, notre cabinet allie une expertise juridique approfondie à une approche personnelle, pragmatique et orientée vers les solutions, en conseillant particuliers, familles, investisseurs et entreprises sur tous les aspects de leurs questions juridiques et immobilières en Espagne." / "Des transactions immobilières aux questions fiscales et sociétaires, nous offrons un accompagnement juridique clair, stratégique et discret, toujours attentif aux intérêts à long terme de nos clients."
- ES headline: "Nuestro despacho fue fundado por Marisela Castro, abogada española con más de 25 años de experiencia asesorando a clientes internacionales en España."
- ES body: "Bajo su dirección, nuestro despacho combina una profunda experiencia jurídica con un enfoque personal, pragmático y orientado a soluciones, ofreciendo asesoramiento a medida a particulares, familias, inversores y empresas en todos los aspectos de sus asuntos jurídicos y patrimoniales en España." / "Desde transacciones inmobiliarias hasta asuntos fiscales y societarios, ofrecemos un acompañamiento jurídico claro, estratégico y discreto, siempre con la mirada puesta en los intereses a largo plazo de nuestros clientes."

## 10. Legal — CTA band reduced to the button

`Aquí same quita y solo deja la caja en rojo, intenta subirlo para que no haya tantos espacios`:

- `LegalPage.tsx`: drop `image` from the `CtaBand` — the coast photo and its dark overlay go; the slim band with the single oxblood button stays.
- Tighten the cta-only band padding in `CtaBand.tsx` (`py-14 md:py-16` → `py-10 md:py-12`) so the page doesn't end on a stretch of cream. Affects every cta-only page uniformly — in keeping with "no tantos espacios".

## 11. Real Estate — "Properties" (was Residences)

`PON PROPERTIES (instead of residences)` — the Real Estate dropdown item, and with it the listing page title:

- `nav.label.residences`: EN `Residences` → `Properties`, FR `Résidences` → `Propriétés`, ES → `Propiedades` (desktop dropdown + mobile nested menu follow automatically).
- Listing hero title (`data/locales/residences.ts → hero.title`): EN `Selected residences` → `Properties` (FR `Propriétés`, ES `Propiedades`); the eyebrow word is dropped (the mockup shows the rule only) — `ResidencesPage.tsx` renders the rule bare when the eyebrow is empty.
- Routes untouched (`/property/residences` stays; a redirect/rename is a bigger question, not requested).

## 12. Real Estate — new hero copy

- **Subline:** "A curated selection of properties across Marbella, Sotogrande and Spain." (was "…across Marbella, the Costa del Sol and Spain.").
- **Second paragraph (new):** "In addition to the properties shown here, we have access to a wider portfolio and also carry out a private search tailored to your needs."
- The old "Dream home not here? …" arrow link leaves the hero (the new second paragraph says it); it stays in the empty-results box, where it still earns its place.
- FR: "Une sélection de biens à Marbella, Sotogrande et dans le reste de l'Espagne." / "En plus des biens présentés ici, nous avons accès à un portefeuille plus large et réalisons également une recherche privée adaptée à vos besoins."
- ES: "Una selección de propiedades en Marbella, Sotogrande y España." / "Además de las propiedades mostradas aquí, tenemos acceso a una cartera más amplia y realizamos también una búsqueda privada adaptada a sus necesidades."

## 13. Translations

Every new/changed string authored in EN, FR and ES as above; `npm run check:locales` must end at 0 errors / 0 untranslated. The shared-doc keys the client's edits orphan (`hero.sub`/`hero.body` on home, `cta` on home, `areas*`/`practice` on legal, `pillars`, `featured`) are dropped from all three languages rather than left invisible — matching the October round's treatment of unused strings.

---

## Verification

1. `npm run check:locales` — 0 errors / 0 untranslated.
2. `npm run lint` — oxlint clean (1 pre-existing warning acceptable).
3. `npm run build` — clean.
4. `npm run dev` walkthrough in EN, FR, ES: home (hero, cards order, no featured band, slim CTA), legal (statement, Our Law Firm, slim CTA), /property/residences (Properties title + copy), nav dropdown, footer.
5. 390 px mobile pass (nav labels, hero centring, Our Law Firm columns stacking, footer).
6. Screenshot gallery for the client via `serve_media`.

---

## Decisions

| # | Question | Decision |
| 1 | Nav labels (mockup) | **Implement Law / Real Estate / Property Management** — it is what the approved mockup shows and it matches the new descriptor; per-language one-line revert if she meant hero only. |
| 2 | Legal statement paragraph | **Keep** — the "remove this" screenshot crops only the four tiles; "subir el resto" implies the rest moves up. |
| 3 | Orphaned copy keys | **Dropped** from all three locales (October-round precedent: unused strings go). |
| 4 | Featured band component | **Deleted** (home-only; history keeps it). |
| 5 | "Enquiry" spelling | **Site convention wins** ("enquiry" everywhere; the docx's "inquiry" read as loose typing). |
| 6 | Plan + sources committed on the branch, not develop | **Branch** — develop currently carries another session's uncommitted locale work (`locale-registry.ts`, `check-locales.ts`, `journal/notFound` locales); committing there risks sweeping that in. Merge up with it later. |

## Open questions (client)

1. **Nav wording vs footer** — nav will read Law / Real Estate / Property Management while the footer reads Law Firm / Real Estate / Private Client Advisory, exactly as the two mockups dictate; confirm both are intended.
2. **Footer tagline** "Lawyers & Private Advisors" — carried over from the October round, still inconsistent with the new descriptor. Change to "Law · Real Estate · Property Management"?
3. **"Residences" wording elsewhere** — filters, result counts ("12 residences"), "View residence", empty states stay this round; say the word and they become "properties" across the board.
4. **Home hero** — brand name untranslated in FR/ES; descriptor translated. Confirm, and confirm the terrace image is final (IMAGENNUEVA1).

## Waiting on the client

- Confirmation on the open questions above.
- Any further "PART 2" batch.
