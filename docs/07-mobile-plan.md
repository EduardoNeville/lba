# 07 — Mobile Plan (executable)

Companion to `00`–`06`, same numbering and phase discipline. Reads against the current `app/` source (commits through `802c376`). Mobile is **not** a second codebase and not a rewrite — it is a disciplined final pass over the existing responsive classes. Same tokens, same components, same routes, same cream/ink/oxblood aesthetic; only composition, tap targets, and touch behavior change.

**Existing mobile behavior (from the build plan):** all grids collapse (`sm:grid-cols-2`, `lg:` splits), `SiteHeader` already has a full-screen cream overlay menu, and the docs mandate a 320px floor. What is genuinely missing: a mobile **composition** pass (headers/CTAs sized for the small canvas), touch ergonomics, performance on constrained devices, and the whole-page 320px walkthrough.

**Locked decisions:**
- Mobile = `< 768px` viewport (`lg` breakpoint is the nav pivot). Same DOM, same routes, same data files.
- Breakpoints: **320 / 375 / 768** — the phone set (see Phase 9 matrix). Existing `sm`/`md`/`lg` classes stay; the plan only adds classes where a real deficiency exists.
- Header height drops `h-20 → h-14` on mobile; nav lockup swaps to a single-line `LBA` mark below `sm`.
- Hero headline floor becomes `text-3xl` at 320px (currently `text-4xl`) — 4xl at ~15ch forces a 3-line wrap on a 320px canvas.
- `PageHero`, `CtaBand`, `CrossLinkBand`, `PropertyCard` get mobile tweaks (below); everything else already stacks acceptably.
- No new runtime deps. No separate `mobile/` component tree — per-section `className` deltas only, or a single `components/mobile/` for a component if it grows past ~40 lines (see Phase 6).

**Build plan (`06`) deltas:** the `06` phases 2/3/5 already verified 320px per exit gate. This plan only covers what those gates left open: a dedicated small-screen composition pass, touch/tap-quality work, and the performance fixes (`06` Phase 9's Lighthouse ≥90 perf target is mobile-hard).

---

## Phase 1 — Viewport & tap-quality baseline

Single session, pure mechanical correctness before any composition work.

- `app/index.html`:
  - Viewport meta → `width=device-width, initial-scale=1.0, viewport-fit=cover` — fixes iOS Safari overscroll whitespace at the top/bottom and lets the sticky header sit under the notch (pairs with the `env(safe-area-inset-*)` padding below).
  - Add `<meta name="theme-color" content="#F3EEE5">` (cream) so the browser chrome blends with the page.
  - Add `<link rel="preload" as="image" href="/src/assets/home-hero.jpg">`? **No** — Vite hashes the asset path; the correct target is the LCP image on `/` (home hero). Skip at this phase; Phase 7 handles LCP.
  - `font-size: 16px` is untouched; inputs inherit 16px by default (iOS zero-zoom requirement).
- `app/src/index.css`, base layer:
  - `html { scrollbar-gutter: stable; }` — one-line fix for the ~15px horizontal jump when the mobile overlay menu opens and the scrollbar disappears (`SiteHeader` sets `body overflow: hidden`).
  - `@supports (padding: env(safe-area-inset-top))` block padding the `body` for the notch in landscape/notched phones. Keep the header background a solid cream (`bg-cream/95` is fine at 320px; blur is cheap enough).
  - Remove the `::selection` rule's reliance on desktop hover — it's fine as-is; no change.
- Tap targets — site-wide contract in `02-design-system.md` §A11y: **all interactive elements ≥ 44px tall** on mobile:
  - `ButtonLink` / `ArrowLink` — `px-8 py-3` is ~38px tall → add `min-h-11` mobile-only. The header `Inquire` outline button (`px-5 py-2`) → `min-h-11` under `lg` only (desktop nav keeps the slim look).
  - Mobile overlay menu links (`SiteHeader` `text-sm` rows) → `py-2.5` and the `Inquire` button in the overlay already `py-4`.
  - Footer links: `text-[10px]` rows → add `py-1` so adjacent rows give ~40px hit area (10px text at default line-height is ~18px — too small to tap precisely).
  - `PropertyCard` / `ServiceCard` whole-card links are fine (image = large target); the `ArrowLink` inside is decorative and `aria-hidden` on desktop — **do not** give it its own tap target; keep single-tab-stop cards per the a11y contract.
- `select` on the inquiry form: `appearance-none` + custom chevron already present (InquiryPage). Keep.

**Exit:** header menu opens/closes with no horizontal jump at 320px; no element on the critical paths (nav, CTA buttons, footer links) is under 44px tall; form inputs don't zoom on focus in iOS.

## Phase 2 — SiteHeader mobile pass (the one genuinely mobile component)

`SiteHeader` already has the full-screen cream overlay + scroll lock. The mobile pass is ergonomics, not rebuild:

- Header height: `h-20 → h-14` under `lg` (`lg:h-20`). Logo lockup: full two-line wordmark hides below `sm` (`hidden sm:inline-flex` on the wordmark); single `LBA` mark + hamburger at 320/375.
- Overlay (currently `fixed inset-0 top-20`): `top-14` to track the new height, `px-6 pt-8 pb-10`, and add `pb-[max(2rem,env(safe-area-inset-bottom))]` so the last links clear the iOS home indicator.
- Hamburger button: `h-10 w-10` is 40px — bump to `h-11 w-11` under `lg` (44px target). The two hairline strokes stay (the 2-line hamburger is a brand detail, per `about-us.md` §2.1).
- Overlay nav rows: `text-sm tracking-[0.25em]` → keep size, add `py-2.5` (44px). Child accordion rows already `py-2` text-10px → `py-2.5` under `lg`.
- Overlay `Inquire` button stays `py-4` — fine.
- **Accordion behavior:** child groups render expanded flat (current behavior) — verified acceptable; no chevron/`max-h` accordion work needed (YAGNI — flat children are fewer taps to reach a destination than an accordion; revisit only if the client specifically wants collapse).

**Exit:** at 320px the header is one clean row (LBA + hamburger); overlay lists all 5 sections + children + Inquire without scroll friction; last row not undercut by the home indicator; scroll lock still holds.

## Phase 3 — Home composition pass

The home page is where small-canvas layout is least forgiving (`home.md` §1.2–1.6):

- **HomeHero** (`HomePage.tsx`): `min-h-[75vh]` → `min-h-[70svh]` (one-line fix for the iOS URL-bar collapse; `svh` is stable, `vh` reflows). Headline `text-4xl md:text-6xl` → `text-3xl` at 320px with `text-[clamp(1.75rem,2.6rem,3rem)]`-ish behavior — simplest form: `text-3xl md:text-6xl` + `leading-[1.12]`, and widen the paragraph measure (`max-w-xl` is fine). Button stays `px-8 py-3` + `min-h-11`.
- **IntroSplit**: already stacks; add `mt-10` on the side column so it reads as a card block, not a smudged continuation (`grid gap-12` already does this — no change needed).
- **PracticeAreas**: `sm:grid-cols-2` gives 2×2 at 768 and 1-col at 320 — correct. `aspect-[3/4]` images `object-cover` → keep, but set `aspect-[4/3]` on 320px only (`min-[421px]:aspect-[3/4]`? — simpler: leave `aspect-[3/4]`; it's the template's signature).
- **ResidencesStrip**: one card at 320 = full-width hero card — fine. Header row `flex items-baseline justify-between` with micro label + ArrowLink wraps awkwardly at 320 → `flex-col items-start gap-2` under `sm`, `sm:flex-row sm:items-baseline sm:justify-between`.
- **CtaBand accent** (botanical variant): decorative image is `hidden md:block` — good, nothing to do. Text stack centers; `text-3xl` heading at 320 wraps to 2 lines — acceptable (see `02` type scale; don't shrink further).

**Exit:** home renders as a calm single column at 320 — hero headline 2–3 lines max, no horizontal scroll, CTA buttons ≥44px, residences header not split.

## Phase 4 — Area pages (`/property`, `/legal`, `/private-client`, `/lifestyle`)

Shared `PageHero` + shared blocks; all deltas live in `components/shared/`:

- **PageHero** (`PageHero.tsx`): on mobile the hero image is `h-64` **below** the text block. Two tweaks:
  1. Reorder on mobile: `flex flex-col-reverse` (or `order-first` on the image wrapper) so the image leads — matches the template's photo-led feel and keeps text from being the first thing a user scrolls past.
  2. `text-5xl` title (uppercase, `max-w-[14ch]`) → `text-4xl` at 320 (`text-4xl md:text-5xl lg:text-6xl`). Sentence-case variant already `text-4xl` — fine.
  3. `py-16` text column → `py-10` on mobile (hero is a first-view block, not a section).
- **CtaBand**: `py-20 md:py-28` → `py-16` on mobile; `text-3xl` heading stays (wraps 2 lines, on-brand); button full-width `w-full sm:w-auto` on mobile for a proper tap target.
- **CrossLinkBand** (`property.md` §1.5 / `legal.md` §1.6): center image is `aspect-[3/4]` and sits between text panels — on mobile it becomes a giant 3/4 column. Set `aspect-[4/3]` under `lg` (`lg:aspect-auto`) so the middle image reads as a divider, not a billboard. `gap-10` stays.
- **PropertyPage / LegalPage** shared blocks: `ServicesTrio` (`md:grid-cols-3`) stacks 1-col — fine; `Checklist columns={2}` collapses to 1 — fine; `StatementBand` `py-12 md:py-16` → fine.
- **MosaicGrid** (lifestyle): already `grid-cols-3 sm:grid-cols-3` — at 320px three `4/3` cells = ~92px tall each, tiny. Change to `grid-cols-2 sm:grid-cols-3` (6 cells → 3 rows of 2 on phones, per `lifestyle.md` §1.4's own responsive note).
- **PrivateClient FeatureSplit**: image `h-72` above parchment panel — fine; panel `px-8 py-12` → `px-6 py-10` at 320 so copy doesn't hug edges.

**Exit:** all four area pages read as photo → text → photo rhythm on mobile; no block is visually oversized (CrossLinkBand center, MosaicGrid cells); CTA buttons full-width.

## Phase 5 — Inquiry page & footer

- **InquiryPage**: radio cards `grid-cols-2` at mobile (already), `px-4 py-5` cards are ~46px tall — good. Field row EMAIL+PHONE collapses (`md:grid-cols-2`) — good. Submit button `w-full py-4` — good. DiscretionAside `p-10` → `p-6` at 320 so the border box doesn't crowd the screen; stays `lg:sticky` only on desktop. Form order (form → aside) already correct on mobile.
- **SiteFooter**: 4-col → 1-col at mobile already (`md:grid-cols-2`). `gap-10` fine. Bottom bar `flex-col` already stacks. Add `pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]` on the footer root so the © bar and last links clear the iOS home indicator. Footer `Inquire` outline button: `min-h-11`.
- **Consent checkbox row** (`text-[11px]`): 11px text next to a 16px checkbox is the smallest UI text on the site — bump the label to `text-[12px]` and add `py-2` for tap area on mobile only.

**Exit:** full inquiry flow thumb-usable on a 375px device without zoom; footer bottom bar not undercut by the home indicator.

## Phase 6 — Componentization check

The plan above is class-level deltas. Recheck the 40-line rule at each phase end:

- If `PageHero` mobile delta grows past the one `flex-col-reverse` + class swap, extract `PageHeroMobile`? — **no**: keep the single component; the deltas are 2 props' worth of classes.
- If the `SiteHeader` mobile block grows past ~40 lines it becomes `components/mobile/MenuOverlay.tsx` — likely not; the overlay is ~25 lines today.
- No new files expected. If a phase's diff is pure class-name churn in one file, apply it there; if it touches 4+ files with the same pattern (e.g., every `py-20` → `py-16`), consider a `@layer components` helper (`.section-pad`) — but only after the third repetition (YAGNI, per `06` Phase 1 utility rule).

## Phase 7 — Performance & assets

Mobile perf is the one place the plan adds real work. Baseline targets (mobile device, Lighthouse): **Perf ≥ 90, A11y ≥ 95, LCP ≤ 2.5s, CLS ≈ 0**.

- LCP: `/` home hero. It's `import homeHero from '../assets/home-hero.jpg'` — Vite serves a single ~227KB JPEG. Add a preloaded LCP hint:
  - Cleanest: in `src/data/home.ts`, the import is already the exact URL Vite hashes. Vite supports `<link rel="preload">` injection via `vite-plugin`? — **no new deps**. Practical option: set `fetchpriority="high"` on the hero `<img>` (React 19 supports it natively), plus `loading="eager"` (default). That's the whole fix; the image is above the fold so browser preload ordering is already favorable.
- Hero image size: `home-hero.jpg` is 1600px-wide. On a 375px device, a 2x display wants ~750px. Generate a mobile variant:
  ```bash
  # app/assets/ — keep desktop file; add small variant
  ffmpeg -y -i app/src/assets/home-hero.jpg -vf "scale=800:-2" -q:v 3 app/src/assets/home-hero-mobile.jpg
  ```
  Then `<img srcSet>` on the hero (`homeHeroMobile 800w, homeHero 1600w`) — one prop, no new tooling. Only the home hero needs this; other images are below the fold or already modest.
- Thematic: `legal-residency.jpg` (424KB) and `pc-home-mgmt.jpg` (362KB) are the two biggest — on mobile they render at card size (~350px wide). If Lighthouse flags them, the same srcSet treatment applies; skip unless flagged (YAGNI).
- CLS: all images already fixed aspect (no CLS). Hero `min-h-[70svh]` is layout-stable. Confirm at Phase 9.
- Fonts: Cormorant Garamond loads via Google Fonts `<link>` — `font-display=swap` already present. Fine.
- Overlay menu perf: trivial (one conditional render); no work.

**Exit:** Lighthouse mobile perf ≥ 90 on `/` with the home hero as LCP; no layout shift on route change; `dist/` size delta for the mobile variant is < 100KB.

## Phase 8 — Touch interactions & a11y (mobile-only behaviors)

- Hover-only affordances: site-wide, hover is decorative (color/underline/arrow nudge) — safe to ignore on touch. **Do not** remove hover classes; they're inert on touch devices.
- `SiteHeader` dropdowns are desktop-only (`hidden lg:block`); the overlay is the touch nav — already handled. Ensure `aria-expanded` on the hamburger reflects overlay state (it does).
- `ValueItem` `link` (Lifestyle assist row): currently an `<a>` with hover arrow — on touch the arrow nudge never fires, which is fine; the link itself is a full `Explore` row. Bump `py-2` for tap area.
- Focus: `:focus-visible` outline stays — on touch, browsers don't fire `focus-visible` for taps, so no double-outline issue. Keyboard focus (hardware keyboards) still gets the ring.
- `aria-hidden` decorative images: untouched.
- Form: iOS number pad for phone field — it's `type="tel"` already, correct.

**Exit:** every interactive element reachable and operable by touch at 320px; no dead hover-dependent UI; keyboard-only users unaffected.

## Phase 9 — QA walkthrough

Full-site pass at the phone set. **320 / 375 / 768** (768 = `sm`/`md` boundary where grids turn 2-col; 1024 stays covered by `06` desktop pass).

Per-route checklist (each of `/`, `/about`, `/property`, `/legal`, `/private-client`, `/lifestyle`, `/inquiry`):

- [ ] No horizontal scroll at any width (`overflow-x` check on `body` and each section).
- [ ] Header: one-row lockup, hamburger ≥44px, overlay scrolls full, Inquire reachable in 2 taps.
- [ ] Hero headline ≤ 3 lines at 320; scrim keeps cream text AA on the image.
- [ ] Grids: 1-col at 320, 2-col at 768, per `02` breakpoint contract.
- [ ] CTA buttons full-width at 320, ≥44px tall.
- [ ] Tap the whole page for dead hover-dependent elements.
- [ ] Inquiry form: no zoom on focus, radio cards thumb-sized, submit works (emulator).
- [ ] Footer: 1-col, bottom bar above the home indicator (`env(safe-area-inset-bottom)`).
- [ ] Scroll lock on overlay open; no horizontal jump when the scrollbar disappears.

Tooling: Chrome DevTools device emulation + `npm run dev` is sufficient; no new QA tooling. Physical-device smoke on one iOS and one Android phone at the end (Safari quirks: `svh`, `env(safe-area-inset-*)`, select styling).

**Exit:** all 7 routes pass the matrix at 320/375/768; `tsc -b && npm run lint` clean; Lighthouse mobile perf ≥ 90 on `/` and `/inquiry`.

---

## Done-when

- All boxes in the Phase 9 matrix ticked at 320/375/768.
- Desktop unaffected: `06`'s side-by-side visual match still holds at 1280 (mobile deltas are all `lg:`-guarded or mobile-only classes).
- No new deps; `src/` tree unchanged in structure (deltas are class-level; only `home-hero-mobile.jpg` is added, and only if Phase 7 flags LCP).
- `tsc -b`, `npm run lint`, and the Phase 9 walkthrough all green.

## Explicitly NOT in this pass (re-add without rework)

- Standalone PWA (manifest, service worker, offline shell) — nothing in the site needs offline; skip until asked.
- A separate mobile nav component — the existing overlay is the mobile nav; the pass only resizes it.
- `useMediaQuery` / JS-driven responsive logic — Tailwind classes suffice; JS adds a re-render path for zero visual gain.
- Touch gestures (swipe carousels, pull-to-refresh customization) — none in the templates.
- Per-device image sets beyond the home hero — add per Lighthouse numbers, not preemptively.
