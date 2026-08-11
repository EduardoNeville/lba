# 05 — Asset Map: `images/*.png` → template slots

Each source PNG matched against the 7 templates. Copy targets assume files are renamed into `src/assets/` (suggested names given). Full-bleed slots need ≥1600px wide; column slots ≥900px.

| # | Source file | Reads as | Primary slot | Component / prop | Notes |
|---|---|---|---|---|---|
| 1 | `imagen1portada.png` | Wide dusk villa terrace, infinity pool, potted olive tree, coastline + pines, warm gold light | **Home hero background** | `HomeHero` image (home.md §1.2) | 16:9-ish landscape; dusk tone pairs with cream text + `bg-ink/35` scrim. Rename → `home-hero.jpg` (re-encode: 2MB PNG is overkill). Fallback alt slot: `CtaBand variant="image"` on any page. |
| 2 | `portada2.png` | Wide cream-stone villa right, loungers, infinity pool foreground, calm sea left, soft gold sky | **Home ResidencesStrip card #1** (modern cliffside villa slot) | `PropertyCard` image (home.md §1.5) | Native 16:9 → clean 4:3 crop. Alt: `/property` strip card. Rename → `residence-modern.jpg`. |
| 3 | `portada2.2.png` | Whitewashed finca courtyard: arcade right, bougainvillea, potted olives, terracotta jars, sepia warmth | **Property ResidencesStrip card** — heritage finca slot (`PropertyCard` #3, “FINCA …” slot) | `ResidencesStrip` on `/property` (property.md §1.4) | Near-4:3 crop-friendly; also fits Legal `ServiceCard` imagery (white heritage facade). Rename → `residence-finca.jpg`. |
| 4 | `portada2.3.png` | Ultra-wide minimal coastline: hazy mountain ridges, calm sea, pine branch right; sepia sky | **CtaBand full-bleed background** on `/property` (property.md §1.6, `variant="image" tone="dark"`) | `CtaBand` image prop | ~2.6:1 aspect = ideal band crop; light image → use `tone="light"` (ink text) + `bg-cream/40` scrim per about-us.md §2.6. Fallback: `/legal` or `/lifestyle` CTA band. Rename → `cta-coast.jpg`. |
| 5 | `portada 3 .png` | Golf fairway with bunkers, dusk mountains, umbrella pine right | **Lifestyle MosaicGrid cell** — golf slot (lifestyle.md §1.4) | `MosaicGrid` images[0] | 16:9 crops cleanly into 4:3 cell. Alt: future `/lifestyle#golf` sub-page hero. Rename → `lifestyle-golf.jpg`. |
| 6 | `portada 3.2.png` | Portrait 3:4 — silver suitcase in cream stone corridor, potted olive, wooden door | **Private Client ServiceCard #1** “RELOCATION TO SPAIN” (template card shows this exact scene) | `ServiceCard` image (private-client.md §1.4) | Native portrait fits `aspect-[4/3]`? No — card slot is 4:3 landscape; this is 3:4. Use `object-cover` (center crop keeps suitcase) OR swap card slot aspect to `aspect-[3/4]` site-wide for service cards. **Decision: keep 4:3 + object-cover; suitcase survives center crop.** Rename → `pc-relocation.jpg`. |
| 7 | `portada3.3.png` | Portrait 3:4 — private pool terrace, loungers + outdoor sofa, bay view framed by pines/olives | **Private Client ServiceCard #2** “PRIVATE HOME MANAGEMENT” (template card = pool/sea view) | `ServiceCard` image | Center-crop to 4:3 keeps pool + horizon. Alt: home `ResidencesStrip` card. Rename → `pc-home-mgmt.jpg`. |
| 8 | `portada3.4.png` | Portrait 3:4 — villa arched entrance, lanterns, terracotta urns, cypress, sea glimpse | **Legal ServiceCard #4** “RESIDENCY & GOLDEN VISA” (legal template card 4 shows this arched doorway) | `ServiceCard(checks)` image (legal.md §1.5) | Center-crop OK (arch is mid-frame). Alt: property `ResidencesStrip` card. Rename → `legal-residency.jpg`. |
| 9 | `portada3.5.png` | Portrait 3:4 — sculpted golf green + bunkers, pine line, sea + island horizon | **Private Client ServiceCard #4** “CONCIERGE & LIFESTYLE” (template card 4 = golf course) | `ServiceCard` image | Portrait native; 4:3 center-crop keeps green + sea. Rename → `pc-concierge-golf.jpg`. |
| 10 | `portada3.6.png` | Keys + leather tag on oak, leaf shadow — **content occupies left ~40%; rest is flat cream padding** | **Private Client FeatureSplit left image** (private-client.md §1.5 — template shows this keys still-life) | `FeatureSplit` image | **Pre-crop required:** trim cream padding at re-encode (e.g. `ffmpeg -vf crop=iw*0.4:ih:0:0`), else `object-cover` in the tall slot will show blank cream. Rename → `pc-keys.jpg`. |
| 11 | `portada3.7.png` | Ultra-wide dusk coast, olive + pine branches framing edges | **CtaBand background on `/lifestyle`** (“YOUR LIFESTYLE, YOUR WAY” band shows dusk coast) | `CtaBand variant="image"` | Light-mid image → `tone="light"` + `bg-cream/40` scrim. Alt: `/about` CTA. Rename → `cta-lifestyle.jpg`. |
| 12 | `image 4 .png` | Portrait 1:2 — minimal stone stair, arch niche, potted olive, plaster wall negative space | **Home PracticePanel #02 LEGAL** bottom image (home template panel 02 = stair interior) | `PracticePanel` image (home.md §1.4) | Native portrait fits `aspect-[3/4]` flush bottom. Alt: legal `ServiceCard` #2 “TAX & STRUCTURING”. Rename → `panel-legal.jpg`. |
| 13 | `image6.png` | Olive branch + soft shadow on cream plaster, ultra-wide | **Home CtaBand accent botanical** (home.md §1.6 left-edge image with right fade mask) | `CtaBand variant="accent"` decorative img | Already cream-matched; `aria-hidden`, `[mask-image:linear-gradient(to_right,black,transparent)]`. Rename → `cta-botanical.jpg`. |
| 14 | `imagelegal.png` | Portrait 3:4 — walnut desk, brass lamp, LAW book, arched lit niche with volumes | **Legal PageHero right image** (legal template hero = books/desk scene) | `PageHero` image on `/legal` | Portrait native; hero slot is tall → perfect. Alt: legal `CrossLinkBand` center image. Rename → `legal-hero.jpg`. |
| 15 | `imagen 1 property.png` | Portrait 1:2.5 — modern villa terrace edge, glass rail, dusk sea left, pines | **Property PageHero right image** (tall slot, portrait native — beats wide crop) | `PageHero` image on `/property` (property.md §1.2) | `object-cover` top-anchored (`object-top`) keeps terrace + horizon. Rename → `property-hero.jpg`. |

## Per-page placement summary

| Page | Slot ← asset |
|---|---|
| `/` | hero ← `imagen1portada`; residences[0] ← `portada2`; panel LEGAL ← `image 4`; CTA accent ← `image6` |
| `/about` | — none of the 15 fit cleanly (see gaps) |
| `/property` | hero ← `imagen 1 property`; residences finca ← `portada2.2`; CTA ← `portada2.3` |
| `/legal` | hero ← `imagelegal`; card RESIDENCY ← `portada3.4` |
| `/private-client` | cards ← `portada 3.2` (relocation), `portada3.3` (home mgmt), `portada3.5` (concierge); FeatureSplit ← `portada3.6` (crop first) |
| `/lifestyle` | mosaic[0] golf ← `portada 3`; CTA ← `portada3.7` |
| `/inquiry` | — none (hero slot still open) |

## Gaps (slots with no asset yet)

- About: hero, legacy still-life, 4 team portraits, CTA band.
- Home: panels 01/03/04, residences[1-3].
- Legal: cards 1–3, cross-link center.
- Private-client: card 3 (architecture/interiors).
- Lifestyle: mosaic cells 2–6.
- Inquiry: hero (needs interior with window/sea, portrait-friendly).

## Pipeline notes

- Re-encode all to JPG q80 at ≤1600px wide on ingest (`ffmpeg -vf scale=1600:-2 -q:v 3`); current 2MB PNGs would ship ~30MB. Keep PNGs only as source.
- `portada3.6.png`: crop cream padding before ingest (`crop=iw*0.4:ih:0:0`).
- Portrait assets in 4:3 slots rely on `object-cover`; portrait assets in tall slots (heroes) use `object-top`.
- Import via `src/assets/` with the rename column; data files reference imports, not URLs.
