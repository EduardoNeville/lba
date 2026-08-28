# 10 — SEO, Legal & Polish Plan

## Architecture constraint (read first)

Client-rendered SPA on Firebase static hosting. One shared `index.html`,
SPA rewrite `** → /index.html`, i18n in `localStorage` (EN default, no URL
variants). Non-JS crawlers/social crawlers see the single shell — so the
SEO items split on one decision:

- **Baseline (lazy):** static shell + runtime meta + site-wide OG/canonical.
  No per-page SEO for non-JS crawlers.
- **Prerender:** build-time SSR of each route → per-page title/desc/OG/
  canonical/404 in the served HTML. Proper, at the cost of a small build step.

Everything below assumes **Baseline** unless we pick Prerender.

## Bucket A — legal pages (content-gated: needs firm copy)

1. **Privacy policy** — `/privacy` route already referenced in footer
   (`FOOTER_INFO`), currently a dead link that redirects to `/`. New page +
   route. **Copy must come from the firm** — cannot fabricate legal terms.
   Minimal: one `LegalPage`-style layout, markdown or static prose, in `en`
   (+ fr/es later — the locales only cover partial copy today).
2. **Terms & conditions** — `/terms`, same treatment. Same layout reuse.
3. Wire both footer links to the real routes (they already exist in `nav.ts`).

## Bucket B — SEO additive (small code)

4. **Clear CTA** — already satisfied (header `Inquire`, `CtaBand`, footer
   CTA, form submit). Consistency pass only: confirm every page has a
   primary CTA and labels match. No new build.
5. **FAQ** — not present. **Defer**: no demand signal; add as a section on
   `/inquiry` or `/about` only when real questions exist. YAGNI.
6. **Meta titles** — one static `<title>` today. Add a tiny `usePageMeta`
   hook (sets `document.title`) per route. Blog already sets titles
   manually — fold into the hook.
7. **Meta descriptions** — same hook; update `meta[name=description]` per
   route. Blog posts: derive from `excerpt` (already stored).
8. **Social shares (OG/Twitter)** — add OG + Twitter card meta to
   `index.html`. **Site-wide only** under Baseline: OG crawlers don't run
   JS, so per-page OG needs Prerender. Use site fallback image (logo/og.jpg).
9. **Canonical URIs** — add `<link rel="canonical">`. EN-root canonical only
   (no URL-based i18n → no per-language variants to disambiguate).
10. **robots.txt** — one static file in `public/` → copied to `dist`.
    Allow all, point to `/sitemap.xml`. Ineffective only for non-JS crawlers
    (SPA), which Prerender fixes.
11. **sitemap.xml** — static in `public/` listing the 8 static routes.
    Blog slugs are dynamic (Firestore) → regenerate at build with a tiny
    script that also emits the current post URLs, or keep static and append
    posts manually. Lazy: static now, script only if the blog grows.

## Bucket C — correctness & QA

12. **Custom 404** — today `*` route `<Navigate to="/" replace />` silently
    bounces to home. Replace with a real `NotFoundPage` (like the existing
    blog "post does not exist" block). Add a `public/404.html` so Firebase
    serves a real 404 for missing static files (SPA rewrite means it only
    triggers for real 404s, which is correct).
13. **Alt text** — audit pass over every `<img>`: decorative use `alt=""`
    (already done for many), meaningful images get descriptive alt (foil
    logo already has one). Fix the audit's empty-meaningful cases.
14. **Accessibility** — audit pass, not a build. Form + header already good.
    Check: heading order, focus trap in the mobile menu overlay, color
    contrast, `lang` attr on HTML (already set by `LangProvider`).
15. **Test forms** — verification, not code. Run the inquiry submit against
    the Firestore emulator; verify validation triggers, success + error
    states, and the thank-you branch.
16. **Broken links** — run a link checker against the built `dist` (e.g.
    `npx linkinator dist --recurse`) incl. external links
    (`mariselacastro.com`, socials). Fix any dead targets.
17. **Performance** — biggest real win: the assets are **1MB+ PNGs**
    (`assets/*.png`, examples). Convert to WebP/AVIF + size them; huge
    images are the dominant page weight. Blog/inquiry Firestore SDK is
    already lazy-loaded. Fonts: preconnect exists; consider font-display
    swap (already implied). Run `vite build` + a bundle report to confirm.

## Status (implemented)

Done: /privacy + /terms pages (placeholder copy, EN-only — **firm copy pending**),
custom 404 page + public/404.html, robots.txt, sitemap.xml, per-route meta via
`lib/seo.ts` + ROUTE_META in App.tsx, canonical + OG/Twitter site-wide, og.jpg,
consent checkbox links to /privacy (all 3 locales), alt text on blog covers,
`loading="lazy"` on below-fold images. Build passes; linkinator: 0 broken links
across all 10 routes.

Deferred: cookie banner (no cookies on site), FAQ (no demand), WebP conversion
(images already ≤425KB JPEG), Firestore emulator form test (no JVM here —
manual: run `firebase emulators:start`, submit form, check `inquiries` doc).

## Priorities before launch
1. Replace placeholder privacy/terms copy with firm-approved text.
2. Confirm domain `legalboutiqueadvisers.com` (used in robots/sitemap/canonical/OG —
   the domain answers at HTTP 200, so it exists).
3. Deploy and re-run linkinator against the live site.

## Suggested order

1. Legal pages (content-gated — get copy first) + 404 + robots + sitemap
2. Meta hook (titles/desc) + canonical + OG/social
3. Alt-text + a11y + broken-link audits
4. Form test + performance (image compression)
