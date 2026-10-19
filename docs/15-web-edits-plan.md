# Web Edits Plan — Parts 1 + 2 — from "NEW EDITS PART{1,2} WEBSITE.docx"

**Branch:** `feat/web-edits-part1` · **worktree:** `/home/eduardoneville/websites/lba-web-edits-part1` (based on `develop` @ `d6a0cae`)
**Sources:**
- **Part 1** committed as `docs/15-web-edits-part1-source.docx`; thirteen annotated screenshots in `assets/edits-part1/01…13-*.png|jpg`.
- **Part 2** ("CONTINUACION DESDE REAL ESTATE PAGE") committed as `docs/15-web-edits-part2-source.docx`; ten annotated screenshots in `assets/edits-part2/01…10-*.png|jpg`.

The client's raw drops stay out of git in the main working copy, referenced here by path:
- `assets/Terraza Mediterránea con Piscina Infinita.png` — the "IMAGENNUEVA1" home hero (delivered ✓)
- `assets/Foto Marisela.jpg` — portrait for the law-firm section (delivered ✓)
- `assets/real estate.png` — villa photo for the brown opportunities box (delivered ✓)
- `assets/Salón mediterráneo abierto al jardín.png` — the private-client hero ("AHORA TE ENVIO LA IMAGEN", delivered ✓)
- golf photo for the real-estate hero — **she will send it** ("te enviare la foto de golf")

**Run:** `cd app && npm run dev` · **build + preview:** `npm run review` (:4173) · **checks:** `npm run check:locales`, `npm run lint`, `npm run build`

**Checks:** `tsc` clean · `oxlint` clean (1 pre-existing warning) · `check:locales` 0 gaps / 0 errors · build OK · SSR dumps verified in EN/FR/ES

---

## Status

| § | Change | Status |
| --- | --- | --- |
| **Part 1** | | |
| 1 | Header lockup in black (not brown) | **[done]** |
| 2 | Home: new centred hero (brand title + descriptor line, terrace image) | **[done]** |
| 3 | Home: service cards reordered — 01 Legal, 02 Real Estate | **[done]** |
| 4 | Home: featured-residences band removed | **[done]** |
| 5 | Home: CTA band reduced to the enquiry button only | **[done]** |
| 6 | Footer services links → Law Firm / Real Estate / Private Client Advisory | **[done]** |
| 7 | Nav labels per the mockup — Law / Real Estate / Property Management | **[done]** |
| 8 | Legal: value-pillar tiles removed (statement stays) | **[done]** |
| 9 | Legal: "Business vision" band replaced by "Our Law Firm" (text + Marisela portrait); Areas of Legal Advice kept — restored after round-trip feedback | **[done]** |
| 10 | Legal: CTA band reduced to the button only, tighter spacing | **[done]** |
| 11 | Real Estate: dropdown + page title "Properties" (was Residences) | **[done]** |
| 12 | Real Estate: new hero copy (Sotogrande + wider-portfolio paragraph) | **[done]** |
| 13 | FR + ES translations for every changed string | **[done]** |
| **Part 2** | | |
| 14 | Property: split hero rebuilt (eyebrow + "Real Estate" + two-column intro, golf photo right) | **[done]** — golf photo placeholder |
| 15 | Property: "A Curated Approach" split removed | **[done]** |
| 16 | Property: featured-properties strip removed | **[done]** |
| 17 | Property: brown box restyled (villa photo, bigger letters, lighter brown) | **[done]** |
| 18 | Property: services renamed — Buying / Selling | **[done]** |
| 19 | Property: cross-link band restyled (new eyebrows/headings/bodies, checklists out, photo kept) | **[done]** |
| 20 | Property: CTA band reduced to the button only | **[done]** |
| 21 | Private Client: hero rebuilt ("Your Home, Our Priority.", salon image, no discover link) | **[done]** |
| 22 | Private Client: "A Trusted Network" band removed | **[done]** |
| 23 | Private Client: CTA band reduced to the button only | **[done]** |
| 24 | About: CTA band reduced to the button only | **[done]** |
| 25 | FR + ES for all Part-2 strings | **[done]** |

Commits: part-1 `438d421` · part-2 `4f25ccf`. The residences **listing and detail** CTA bands also went button-only (the restructure retired the `property.cta` image/label they consumed; aligned with the client's direction — see Open questions 5).

---

## File map

| Change | Files |
| --- | --- |
| Black lockup | `app/src/assets/logo-lba-black.png` (new), `app/src/components/layout/SiteHeader.tsx` |
| Home hero | `app/src/data/home.ts`, `app/src/data/locales/home.ts` (en/fr/es), `app/src/pages/HomePage.tsx` |
| Cards order | `app/src/data/home.ts`, `app/src/data/locales/home.ts` (en/fr/es) |
| Featured band | `app/src/pages/HomePage.tsx`, delete `app/src/components/shared/FeaturedResidences.tsx`, drop `featured` key from `app/src/data/locales/residences.ts` (en/fr/es) |
| CTA bands (home, legal, property, private client, about) | `app/src/pages/{Home,Legal,Property,PrivateClient,About}Page.tsx`, `app/src/components/shared/CtaBand.tsx` (padding), drop `cta` keys from `locales/home.ts`, `locales/legal.ts`, `locales/privateClient.ts`, `locales/property.ts` and the matching `data/*.ts` image exports |
| Our Law Firm | `app/src/pages/LegalPage.tsx`, `app/src/data/legal.ts`, `app/src/data/locales/legal.ts` (en/fr/es), `app/src/assets/marisela-portrait.jpg` (new) |
| Footer services | `app/src/data/locales/{en,fr,es}.ts` (`footer.servicesLinks`) |
| Nav labels | `app/src/data/locales/{en,fr,es}.ts` (`nav.label`) |
| Properties rename | `app/src/data/locales/residences.ts` (en/fr/es), `app/src/pages/ResidencesPage.tsx` |
| Property hero | `app/src/pages/PropertyPage.tsx`, `app/src/data/property.ts`, `app/src/data/locales/property.ts` (en/fr/es) |
| Property removals/restyling | `app/src/pages/PropertyPage.tsx`, `app/src/data/property.ts`, delete `app/src/components/shared/PropertyStrip.tsx`, drop `featured`/`approach` keys |
| Property cross-link | `app/src/pages/PropertyPage.tsx`, `app/src/data/locales/property.ts` (en/fr/es) |
| Private Client hero/network | `app/src/components/shared/PageHero.tsx` (render eyebrow), `app/src/pages/PrivateClientPage.tsx`, `app/src/data/privateClient.ts`, `app/src/data/locales/privateClient.ts` (en/fr/es), `app/src/assets/pc-hero-salon.jpg` (new) |

---

# Part 1

## 1. Brand — header lockup in black

The header renders `logo-lba-ink.png`, whose artwork is `#241E18` — warm enough to read as brown against the cream header, which is what the client is pointing at. The lockup becomes true black (`#000000`), alpha preserved, so it sits crisply on the beige.

- Generate `app/src/assets/logo-lba-black.png` from the existing PNG:
  `ffmpeg -i logo-lba-ink.png -vf "format=rgba,lutrgb=r='0':g='0':b='0'" logo-lba-black.png` (verified: 15 KB, transparent background intact).
- Swap the import in `SiteHeader.tsx` (`logo-lba-ink.png` → `logo-lba-black.png`). Sizing/`max-w-[52vw]` guard unchanged.
- Favicon untouched. `logo-lba-ink.png` stays in the repo until sign-off, then can go the way of `logo-lba-brush.svg`.

## 2. Home — centred hero

The mockup (`assets/edits-part1/02-home-hero-mockup.jpg`) replaces the right-aligned statement hero with a brand lockup hero, centred on the image:

- **Title:** `LEGAL BOUTIQUE ADVISERS` — Cormorant Garamond is already the site's `font-display`, so no font work; large, white, centred, uppercase.
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
- Delete `components/shared/FeaturedResidences.tsx` — home-only — and drop the now-orphaned `featured` copy key from `data/locales/residences.ts` (en/fr/es). Git history keeps both if the band returns.

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

## 9. Legal — "Our Law Firm" replaces the business-vision band

`Eso quitarlo y poner this instead` — the "Business vision. Legal excellence." band goes, replaced by the mockup's two-column section (text left, portrait right). **The "Our Areas of Legal Advice" grid stays** — round-trip feedback after the first pass: the docx's "quitarlo" read as covering the grid too, which it did not mean; the grid is back straight after the hero, ahead of this section:

- **Eyebrow:** `OUR LAW FIRM` with the short oxblood rule, as in the mock.
- **Headline (serif, sentence case, large — not uppercase):** "Our law firm was founded by Marisela Castro, a Spanish lawyer with over 25 years of experience advising international clients in Spain."
- **Body, exactly as dictated:**
  1. "Under her leadership, our firm combines a deep legal expertise with a personal, pragmatic and solutions-oriented approach, offering tailored advice to individuals, families, investors and businesses on all aspects of their legal and property matters in Spain."
  2. "From real estate transactions to tax and corporate matters, we provide clear, strategic and discreet legal support, always with a focus on our client's long-term interests."
- **Portrait:** `assets/Foto Marisela.jpg` → `app/src/assets/marisela-portrait.jpg` (ffmpeg resize to 820 px ≈ 134 KB). "no pongas la foto super grande" — a restrained column (~4/5 aspect, `max-w-md/lg`), not a full-bleed.
- **Copy data:** new `firm` block in `data/locales/legal.ts` (en/fr/es) replacing `practice` (`areasHeading`/`areas` restored after round-trip feedback); `data/legal.ts` swaps `practice`/`cta` exports for `firm = { image: mariselaPortrait }`.

FR / ES (authored here, matching the existing tone):

- FR headline: "Notre cabinet a été fondé par Marisela Castro, avocate espagnole forte de plus de 25 ans d'expérience au service d'une clientèle internationale en Espagne."
- FR body: "Sous sa direction, notre cabinet allie une expertise juridique approfondie à une approche personnelle, pragmatique et orientée vers les solutions, en conseillant particuliers, familles, investisseurs et entreprises sur tous les aspects de leurs questions juridiques et immobilières en Espagne." / "Des transactions immobilières aux questions fiscales et sociétaires, nous offrons un accompagnement juridique clair, stratégique et discret, toujours attentif aux intérêts à long terme de nos clients."
- ES headline: "Nuestro despacho fue fundado por Marisela Castro, abogada española con más de 25 años de experiencia asesorando a clientes internacionales en España."
- ES body: "Bajo su dirección, nuestro despacho combina una profunda experiencia jurídica con un enfoque personal, pragmático y orientado a soluciones, ofreciendo asesoramiento a medida a particulares, familias, inversores y empresas en todos los aspectos de sus asuntos jurídicos y patrimoniales en España." / "Desde transacciones inmobiliarias hasta asuntos fiscales y societarios, ofrecemos un acompañamiento jurídico claro, estratégico y discreto, siempre con la mirada puesta en los intereses a largo plazo de nuestros clientes."

## 10. Legal — CTA band reduced to the button

`Aquí same quita y solo deja la caja en rojo, intenta subirlo para que no haya tantos espacios`:

- `LegalPage.tsx`: drop `image` from the `CtaBand` — the coast photo and its overlay go; the slim band with the single oxblood button stays.
- Tighten the cta-only band padding in `CtaBand.tsx` (`py-14 md:py-16` → `py-10 md:py-12`) so no page ends on a stretch of cream. Affects every cta-only page uniformly — in keeping with "no tantos espacios".

## 11. Real Estate — "Properties" (was Residences)

`PON PROPERTIES (instead of residences)` — the Real Estate dropdown item, and with it the listing page title:

- `nav.label.residences`: EN `Residences` → `Properties`, FR `Résidences` → `Propriétés`, ES → `Propiedades` (desktop dropdown + mobile nested menu follow automatically).
- Listing hero title (`data/locales/residences.ts → hero.title`): EN `Selected residences` → `Properties` (FR `Propriétés`, ES `Propiedades`); the eyebrow word is dropped (the mockup shows the rule only) — `ResidencesPage.tsx` renders the rule bare when the eyebrow is empty.
- Routes untouched (`/property/residences` stays; a redirect/rename is a bigger question, not requested).

## 12. Real Estate listing — new hero copy

- **Subline:** "A curated selection of properties across Marbella, Sotogrande and Spain." (was "…across Marbella, the Costa del Sol and Spain.").
- **Second paragraph (new):** "In addition to the properties shown here, we have access to a wider portfolio and also carry out a private search tailored to your needs."
- The old "Dream home not here? …" arrow link leaves the hero (the new second paragraph says it); it stays in the empty-results box, where it still earns its place.
- FR: "Une sélection de biens à Marbella, Sotogrande et dans le reste de l'Espagne." / "En plus des biens présentés ici, nous avons accès à un portefeuille plus large et réalisons également une recherche privée adaptée à vos besoins."
- ES: "Una selección de propiedades en Marbella, Sotogrande y España." / "Además de las propiedades mostradas aquí, tenemos acceso a una cartera más amplia y realizamos también una búsqueda privada adaptada a sus necesidades."

## 13. Part-1 translations

Every new/changed string authored in EN, FR and ES as above; `npm run check:locales` must end at 0 errors / 0 untranslated. The shared-doc keys the client's edits orphan are dropped from all three languages rather than left invisible — matching the October round's treatment of unused strings.

---

# Part 2

## 14. Property — split hero rebuilt

The mockup (`assets/edits-part2/01-property-hero-mockup.jpg`) turns the overlay hero into a **split hero**: cream text panel left, golf photograph right (full height). `PageHero` stays overlay-style for the other pages, so `PropertyPage` grows its own split hero:

- **Eyebrow:** `REAL ESTATE` with the short rule, as in the mock ("portada").
- **Title:** `Real Estate` — huge serif, sentence case (the mock is explicit).
- **Intro, exactly as dictated, as two columns split by a vertical hairline:**
  1. "We provide tailored real estate advisory services to international clients looking to buy, sell or invest in property across Spain. From luxury residences and second homes to investment opportunities, we guide our clients through every stage of the process."
  2. "Based in Marbella, with a strong focus on the Costa del Sol, we offer access to a carefully selected portfolio of properties, including exclusive off-market opportunities. We also provide a personalised property search service tailored to each client's individual requirements."
- **Photo:** "Y te enviare la foto de golf a la derecha" — keep `lifestyle-golf.jpg` as the placeholder until her golf photo arrives (see Waiting on the client).
- The current hero `title` ("One Firm. We guide you…"), `body`, `subline` and `cta` ("Discuss your requirements") are replaced by this structure; the old keys are dropped from all three locales.
- FR / ES (authored): title `Immobilier` / `Inmobiliaria`; P1: "Nous offrons un conseil immobilier sur mesure à une clientèle internationale qui souhaite acheter, vendre ou investir dans l'immobilier en Espagne. Des résidences de luxe et résidences secondaires aux opportunités d'investissement, nous guidons nos clients à chaque étape du processus." / "Ofrecemos asesoramiento inmobiliario a medida a clientes internacionales que desean comprar, vender o invertir en propiedades en España. Desde residencias de lujo y segundas viviendas hasta oportunidades de inversión, acompañamos a nuestros clientes en cada etapa del proceso."; P2: "Basés à Marbella, avec un fort ancrage sur la Costa del Sol, nous donnons accès à un portefeuille de biens soigneusement sélectionné, incluant des opportunités hors marché exclusives. Nous proposons également un service de recherche personnalisée adapté aux exigences de chaque client." / "Con base en Marbella, con especial dedicación a la Costa del Sol, ofrecemos acceso a una cartera de propiedades cuidadosamente seleccionada, que incluye oportunidades exclusivas fuera de mercado. También ofrecemos un servicio de búsqueda personalizado adaptado a los requisitos de cada cliente."

## 15. Property — "A Curated Approach" split removed

`QUITAR ESTO` — the full-bleed limestone-staircase split ("More Than Properties. A Partner at Every Step.") goes entirely: section, `approach` copy key (en/fr/es) and `data/property.ts → approach` image export.

## 16. Property — featured-properties strip removed

`Quitar eso ya que es lo mismo que abajo` — the strip previews the same residences the listing shows: redundant.

- Remove the lazy `PropertyStrip` import + `<Suspense>` block and the `featured` key from `locales/property.ts` (en/fr/es).
- Delete `components/shared/PropertyStrip.tsx` — /property is its only user (git history keeps it).

## 17. Property — brown opportunities box restyled

The "Buying in Spain" band stays, with three changes ("Poner esta foto…, y poner las letras mas grande, y si es posible un marron menos oscuro"):

- **Photo:** the potted-plant terrace shot → the client's villa (`assets/real estate.png` → `app/src/assets/band-villa.jpg`, ~1600 px).
- **Letters bigger:** `text-3xl md:text-4xl` → `text-4xl md:text-5xl` for the heading.
- **Less-dark brown:** the panel is `bg-ink` (#241E18) — lift it to a lighter warm brown (proposed: `#3E3227`; keep cream text). A one-value tweak to revisit with her.
- **Position:** "Ponerlo mas arriba justo debajo del primero real estate text y foto de golf" and her explicit order summary ("Orden es: portada, our services, caja marron de opportunities y luego esto") disagree about whether the box sits right after the hero or after Our Services — the explicit order summary wins: **hero → Our Services → box → cross-link**. A one-line move if she corrects it.

## 18. Property — services renamed

`Cambiar Acquisition Advisory -- BUYING / SALE ADVISORY -- SELLING` — in `locales/property.ts` services (en/fr/es):

- EN: `Acquisition Advisory` → `Buying` · `Sale Advisory` → `Selling` (bodies unchanged; the 4-up layout stays).
- FR: `Conseil à l'acquisition` → `Achat` · `Conseil à la vente` → `Vente`.
- ES: `Asesoramiento en la adquisición` → `Compra` · `Asesoramiento en la venta` → `Venta`.

## 19. Property — cross-link band restyled

`Que ahora va a ser así: (no cambies la foto solo el text…, pero con la foto antigua)` — the centre arch photograph (`property-crosslink.jpg`) is kept; the side columns are rebuilt per the mock (`assets/edits-part2/06-property-crosslink-mockup.jpg`): eyebrow + big sentence-case serif heading + one body line + arrow link, **checklists removed**:

- **Left** — eyebrow `Legal Expertise` · heading `Expertise at Every Step.` · body "Our legal background ensures every property transaction is approached with care, precision and attention to detail." · link `Explore Legal Services →` (to `/legal`).
- **Right** — eyebrow `Private Client Services` · heading `Your Home, Our Priority.` · body "Our relationship extends beyond the transaction, with tailored services to help you settle in and enjoy your property in Spain." · link `Explore Private Client Services →` (to `/private-client`).
- FR: `Expertise juridique` / "L'expertise, à chaque étape." / "Notre formation juridique garantit que chaque transaction immobilière est abordée avec soin, précision et attention aux détails." — `Services aux clients privés` / "Votre maison, notre priorité." / "Notre relation ne s'arrête pas à la signature : des services sur mesure pour vous installer et profiter de votre résidence en Espagne."
- ES: `Experiencia jurídica` / "Experiencia en cada paso." / "Nuestra formación jurídica garantiza que cada operación inmobiliaria se aborde con cuidado, precisión y atención al detalle." — `Servicios a clientes privados` / "Su hogar, nuestra prioridad." / "Nuestra relación va más allá de la operación, con servicios a medida para ayudarle a instalarse y disfrutar de su propiedad en España."
- The old headings/bodies/checks keys are dropped from all three locales.

## 20. Property — CTA band reduced to the button

`Aquí igual q en los otros, quita la imagen y solo deja la cajita` — drop `image` from the `CtaBand` on `PropertyPage.tsx`; the slim button-only band remains (padding shared with §10).

## 21. Private Client — hero rebuilt

The mockup (`assets/edits-part2/08-private-client-hero-mockup.jpg`) keeps the overlay-style hero but with new copy and the client's salon photograph:

- **Eyebrow:** `PRIVATE CLIENT SERVICES` — `PageHero` currently accepts `eyebrow` and ignores it (`eyebrow: _eyebrow`); it learns to render it (micro type + short rule). No other page passes `eyebrow`, so this is safe.
- **Title:** `Your Home, Our Priority.` — sentence case (`titleCase="sentence"`).
- **Body:** "Our relationship extends beyond the transaction, with tailored services to help you settle in and enjoy your property in Spain." (`subline` and the old long `body` dropped).
- **No discover link** — "No pongas lo de discover .." (the mock shows `Discover Our Services →` and she struck it).
- **Image:** `assets/Salón mediterráneo abierto al jardín.png` → `app/src/assets/pc-hero-salon.jpg` (~2000 px), replacing `pc-terrace-hero.jpg` in `data/privateClient.ts`.
- FR: `Services aux clients privés` / "Votre maison, notre priorité." / "Notre relation ne s'arrête pas à la signature : des services sur mesure pour vous installer et profiter de votre résidence en Espagne."
- ES: `Servicios a clientes privados` / "Su hogar, nuestra prioridad." / "Nuestra relación va más allá de la operación, con servicios a medida para ayudarle a instalarse y disfrutar de su propiedad en España."

## 22. Private Client — "A Trusted Network" band removed

`ESTO QUITARLO TODO, solo deja la cajita` — the parchment band (heading, body, six partner labels) goes entirely: `TrustedNetwork` section, `partners` copy key (en/fr/es). The CTA button-only band stays (next item).

## 23. Private Client — CTA band reduced to the button

Same treatment: drop `image` (cta-coast) from `PrivateClientPage.tsx`; `data/privateClient.ts → cta` export removed.

## 24. About — CTA band reduced to the button

`Y en about también quitarlo y dejar cajita` — drop the `ctaCoast` image from the `CtaBand` on `AboutPage.tsx`; button-only band remains.

## 25. Part-2 translations

All new/changed strings authored in EN, FR, ES inline above; `check:locales` 0 errors / 0 untranslated; orphaned keys dropped.

---

## Verification

1. `npm run check:locales` — 0 errors / 0 untranslated.
2. `npm run lint` — oxlint clean (1 pre-existing warning acceptable).
3. `npm run build` — clean.
4. `npm run dev` walkthrough in EN, FR, ES: home (hero, cards order, no featured band, slim CTA), legal (statement, Our Law Firm, slim CTA), /property (split hero, services, brown box, cross-link, slim CTA — no approach split, no strip), /private-client (new hero, no network band, slim CTA), /about (slim CTA), /property/residences (Properties title + copy), nav dropdown, footer.
5. 390 px mobile pass (nav labels, hero centring/split stacking, Our Law Firm columns, footer).
6. Screenshot gallery for the client via `serve_media`.

---

## Decisions

| # | Question | Decision |
| 1 | Nav labels (mockup) | **Implement Law / Real Estate / Property Management** — it is what the approved mockup shows and it matches the new descriptor; per-language one-line revert if she meant hero only. |
| 2 | Legal statement paragraph | **Keep** — the "remove this" screenshot crops only the four tiles; "subir el resto" implies the rest moves up. |
| 3 | Orphaned copy keys | **Dropped** from all three locales (October-round precedent: unused strings go). |
| 4 | Featured band / strip components | **Deleted** (each had a single consumer; history keeps them). |
| 5 | "Enquiry" spelling | **Site convention wins** ("enquiry" everywhere; the docx's "inquiry" read as loose typing). |
| 6 | Plan + sources committed on the branch, not develop | **Branch** — develop currently carries another session's uncommitted locale work (`locale-registry.ts`, `check-locales.ts`, `journal/notFound` locales); committing there risks sweeping that in. Merge up with it later. |
| 7 | Brown-box position | **Order summary wins** (hero → Our Services → box → cross-link) over "justo debajo del primero real estate text" — one-line move if she corrects. |
| 8 | Lighter brown value | **`#3E3227` proposed** (between `ink` #241E18 and `taupe` #7D7266) — confirm with client. |
| 9 | Property split hero | **Bespoke section in `PropertyPage`** rather than a `PageHero` variant — only this page uses it; `PageHero` stays untouched except for the eyebrow fix PC needs. |
| 10 | "Our Areas of Legal Advice" | **Restored** after round-trip feedback — the first pass read the part-1 docx's "quitarlo y poner this instead" as covering the areas grid; it meant the business-vision band only. The grid sits straight after the hero (statement kept above it), and "Our Law Firm" follows it where the band used to be. |

## Open questions (client)

1. **Nav wording vs footer** — nav reads Law / Real Estate / Property Management while the footer reads Law Firm / Real Estate / Private Client Advisory, exactly as the two mockups dictate; confirm both are intended.
2. **Footer tagline** "Lawyers & Private Advisors" — carried over from the October round, still inconsistent with the new descriptor. Change to "Law · Real Estate · Property Management"?
3. **"Residences" wording elsewhere** — filters, result counts ("12 residences"), "View residence", empty states stay this round; say the word and they become "properties" across the board.
4. **Legal statement** — kept above Our Law Firm; confirm (one-line removal otherwise).
5. **Remaining image CTA bands** — after this round the journal list + post pages are the only ones still carrying the coast-photo CTA; every page the client reviewed is button-only. Align the journal too?
6. **Brown-box order** — after Our Services (implemented) vs right after the hero (her earlier sentence). Confirm.
7. **Lighter brown** — `#3E3227` (new `umber` token); confirm the tone.

## Waiting on the client

- **Golf photo** for the real-estate split hero ("te enviare la foto de golf") — `lifestyle-golf.jpg` stays as placeholder.
- Confirmation on the open questions above.
- Any further "PART 3" batch.
