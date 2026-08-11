# 06 — Build Plan (executable)

Companion to `00`–`05`. Every step cites its spec. Order matters; each phase ends shippable.

**Decisions locked:**
- New app **in `~/websites/lba`** (this dir), TypeScript, reusing source project's Firebase project + `.env` key.
- Hosting: **static** `dist` + SPA rewrite (simpler than source's Web-Frameworks mode; same project/credentials).
- Deps added beyond Vite/React/Tailwind: `react-router-dom`, `firebase`. Nothing else. (i18n/slick/js-cookie dropped per `01`.)

---

## Phase 0 — Scaffold

```bash
cd ~/websites/lba
npm create vite@latest app -- --template react-ts   # then move app/* to repo root (keep docs/, images/)
npm i && npm i react-router-dom firebase
npm i -D tailwindcss@3.4 postcss autoprefixer
npx tailwindcss init -p
cp ~/projects/marisela/lba/.env .env.local          # key stays out of git
cp ~/projects/marisela/lba/.firebaserc .            # default project alias
```

- Delete Vite boilerplate (`App.css`, assets/react.svg, demo CSS).
- `index.html`: title "Legal Boutique Advisers", Google Fonts `<link>` — `Cormorant+Garamond:ital,wght@0,400..700;1,400..600` (`display=swap`), meta description, favicon (simple LBA monogram svg later).
- `.gitignore`: `node_modules`, `dist`, `.env.local`, `.firebase`.

**Exit:** `npm run dev` serves blank page, fonts load, `tsc -b` clean.

## Phase 1 — Tokens & base styles (`02`)

- `tailwind.config.js`: content globs; `extend.colors` = cream/parchment/ink/taupe/hairline/oxblood/maroon (values in `02`); `fontFamily.display = ['"Cormorant Garamond"','Georgia','serif']`.
- `src/index.css`: `@tailwind base/components/utilities`; base layer — `body bg-cream text-ink`, `::selection bg-oxblood text-cream`, global `:focus-visible` outline oxblood offset 4, `img { @apply block }`.
- Utility classes via components layer: `.micro` (10-11px uppercase tracking .2em+), `.hairline-t` etc. only if used 3+ times — else inline.

**Exit:** tokens visible in a scratch route; delete scratch.

## Phase 2 — UI primitives (`02` props contract)

One file each under `src/components/ui/`: `Container, Eyebrow, ButtonLink, ArrowLink, StatementBand, Checklist, ValueItem, ServiceCard, PropertyCard, Field, MosaicGrid, icons.tsx` (inline stroke SVGs: key, building, figure, scales, shield, globe, columns, search, eye-off, knot, check, arrow-right, chevron-down, instagram, linkedin, mail, laurel-emblem).

Rules: no primitive gets a prop it doesn't use on day one; `ButtonLink` variants `solid|outline`, `tone` only where CtaBand needs it.

**Exit:** primitives render in isolation on scratch route with placeholder text; scratch deleted.

## Phase 3 — Shell (`about-us §2.1`, `inquiry §1.4`)

- `src/data/navigation.ts`: `[{label, to, children?[]}]` for PROPERTY/LEGAL/PRIVATE CLIENT/LIFESTYLE/ABOUT + footer columns (services/information/contact) — single source.
- `SiteHeader`: sticky, 3-zone; desktop dropdowns (click + Esc + outside-click, `aria-expanded`); mobile full-screen accordion overlay with scroll lock.
- `SiteFooter`: expanded dark maroon 4-col + bottom bar (inquiry §1.4).
- `App.tsx`: `BrowserRouter` + `<SiteHeader/>` + `<Routes>` + `<SiteFooter/>`; route `*` → `/`.

**Exit:** shell on `/` with stub routes, nav works at 320/768/1280.

## Phase 4 — Shared blocks (`property §1.2/1.4`, `home §1.6`, `about §2.6`)

`src/components/shared/`: `PageHero` (titleCase prop), `CtaBand` (variant image|accent, tone), `ResidencesStrip` (uses `PropertyCard showLink`), `CrossLinkBand` (children slots), `ResidencesStrip` header row with right `ArrowLink`.

**Exit:** blocks demoed once on scratch, then wired only via pages.

## Phase 5 — Pages (order = template difficulty; cite specs)

Each page = `src/pages/XPage.tsx` + `src/components/<page>/*` sections + `src/data/<page>.ts` slots. Build top-down per spec section numbers; verify each at 320/768/1280 before next.

1. **About** (`about-us.md`): AboutHero, LegacySplit, TeamSection(+TeamCard inline), ApproachSection (ValueItem). *Assets: none of the 15 fit — use neutral placeholders from `images/` only where aspect matches; team = 4 grey `aspect-[3/4]` divs until real portraits.*
2. **Home** (`home.md`): HomeHero ← `imagen1portada`; IntroSplit; PracticeAreas (panels; LEGAL panel ← `image 4`, others placeholder parchment blocks); ResidencesStrip ← `portada2` + placeholders; CtaBand accent ← `image6`.
3. **Property** (`property.md`): PageHero ← `imagen 1 property` (`object-top`); ServicesTrio; ResidencesStrip showLink ← `portada2.2`; CrossLinkBand; CtaBand ← `portada2.3` tone light.
4. **Private Client** (`private-client.md`): PageHero placeholder; ContactPoints; ServicesGrid ← `portada 3.2/3.3/3.5` + 1 placeholder; FeatureSplit ← `portada3.6` (cropped); TrustedNetwork; CtaBand placeholder.
5. **Legal** (`legal.md`): PageHero ← `imagelegal`; StatementBand; Pillars (ValueItem); AdviceGrid (ServiceCard checks; #4 ← `portada3.4`); practice CrossLinkBand (left outline button, right IconList); CtaBand.
6. **Lifestyle** (`lifestyle.md`): PageHero placeholder; AssistRow (ValueItem link); InsiderAccess (Checklist check + MosaicGrid ← `portada 3` + 5 placeholders); CtaBand ← `portada3.7`.
7. **Inquiry** (`inquiry.md`): PageHero sentence-case (placeholder image); InquiryForm + DiscretionAside; `React.lazy` this page in `App.tsx`.

**Exit:** all 7 routes match thumbs side-by-side.

## Phase 6 — Asset pipeline (`05`)

```bash
mkdir -p src/assets && cd images
# re-encode + rename per 05 table; example:
ffmpeg -y -i "imagen1portada.png" -vf "scale=1600:-2" -q:v 3 ../src/assets/home-hero.jpg
ffmpeg -y -i "portada3.6.png" -vf "crop=iw*0.4:ih:0:0,scale=1200:-2" -q:v 3 ../src/assets/pc-keys.jpg
# …repeat for all 15 with rename column
```

- Import assets in `data/*.ts` (`import homeHero from "../assets/home-hero.jpg"`) — Vite hashes + tree-shakes.
- Portraits in tall slots get `object-top` via prop on PageHero image wrapper.

**Exit:** `du -sh src/assets` < 3MB; no PNG imports.

## Phase 7 — Firebase (`01`, `inquiry §4`)

- `src/lib/firebase.ts`: `initializeApp({apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain/projectId/storageBucket/appId: legal-boutique-advisers-bf25a …})`; export `getApp` only. No analytics in v1.
- `src/lib/submitInquiry.ts`: lazy `getFirestore`, `addDoc(collection(db,"inquiries"), {..., createdAt: serverTimestamp()})`, typed input, throws typed `InquiryError`.
- `firestore.rules`: create-only per `01`; `firebase deploy --only firestore:rules`.
- Emulator test: `firebase emulators:start --only firestore`, submit happy path + missing-consent reject.

**Exit:** inquiry writes visible in emulator UI; build shows firestore chunk only in `/inquiry` route (`npm run build` + inspect).

## Phase 8 — Hosting (`01`)

`firebase.json`:
```json
{ "hosting": { "public": "dist",
  "ignore": ["firebase.json","**/.*","**/node_modules/**"],
  "rewrites": [{ "source": "**", "destination": "/index.html" }] } }
```
```bash
npm run build && firebase deploy --only hosting
```
Smoke: `/`, `/about`, `/inquiry` deep links 200 on live URL; form submits against prod rules.

## Phase 9 — QA & hardening

- Lighthouse ≥ 90 perf / ≥ 95 a11y on `/` and `/inquiry`.
- CLS ≈ 0 (all images fixed aspect); hero LCP image `fetchpriority="high"`.
- Keyboard pass: tab through header dropdowns, radio cards, form; Esc closes menus.
- Copy sweep: replace remaining placeholder slots via `data/*.ts` only.
- `tsc -b && npm run lint` clean.

## Done-when

All boxes in `04` checklist + side-by-side visual match of 7 routes vs `.thumbs/*.jpg`.

## Explicitly NOT in v1 (re-add without rework)

i18n, residence detail pages, Firestore-backed team/residences/partners, analytics, cookie banner, CMS, OG images/sitemap.
