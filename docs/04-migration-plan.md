# 04 — Migration Plan

## Target file tree

```
src/
├── main.tsx, App.tsx (router + lazy /inquiry)
├── index.css                     tokens base: fonts, selection, focus rings
├── lib/firebase.ts, submitInquiry.ts
├── data/navigation.js, team.js, practiceAreas.js, residences.js,
│   privateClient.js, legal.js, lifestyle.js
├── components/
│   ├── layout/SiteHeader.tsx, SiteFooter.tsx
│   ├── shared/PageHero.tsx, CtaBand.tsx, CrossLinkBand.tsx, ResidencesStrip.tsx
│   ├── ui/Container.tsx, Eyebrow.tsx, ButtonLink.tsx, ArrowLink.tsx,
│   │   StatementBand.tsx, Checklist.tsx, ValueItem.tsx, ServiceCard.tsx,
│   │   PropertyCard.tsx, Field.tsx, MosaicGrid.tsx, Icon(s).tsx
│   └── per-page sections (home/, about/, property/, private-client/, legal/, lifestyle/, inquiry/)
└── pages/HomePage.tsx, AboutPage.tsx, PropertyPage.tsx, LegalPage.tsx,
    PrivateClientPage.tsx, LifestylePage.tsx, InquiryPage.tsx (lazy)
```

## Routes

```
/                HomePage
/about           AboutPage
/property        PropertyPage        (+ /property/residences/:slug stub later)
/legal           LegalPage
/private-client  PrivateClientPage
/lifestyle       LifestylePage
/inquiry         InquiryPage (React.lazy)
*                redirect /
```

## Phases (each independently shippable)

**P1 — Shell & tokens (1 session)**
Scaffold in place (copy project or fresh Vite; keep TS). Tokens + fonts + `index.css`; `Container/Eyebrow/ButtonLink/ArrowLink`; `SiteHeader` (dropdowns, `navigation.js`, mobile accordion); `SiteFooter` expanded dark. Verify: header/footer render on blank route at 320/768/1280.

**P2 — Shared blocks**
`PageHero`, `CtaBand` (both variants/tones), `Checklist`, `ValueItem`, `ServiceCard`, `PropertyCard`, `StatementBand`, `MosaicGrid`. Each with placeholder slots; no page yet.

**P3 — Pages in template order**
1. `/about` (split hero, legacy split, team grid, approach row)
2. `/` (full-bleed hero, intro split, practice panels, residences, accent CTA)
3. `/property` (trio, strip+links, cross-link band)
4. `/private-client` (contact points, service cards, feature split, network wall)
5. `/legal` (statement band, pillars, cards+checks, practice split)
6. `/lifestyle` (assist row, insider access + mosaic)
7. `/inquiry` (form + aside + Firestore write)

**P4 — Firebase**
`.env.local` key; `lib/firebase.ts`; `submitInquiry.ts`; rules deploy; lazy chunk verified in build output; emulator happy-path + offline error test.

**P5 — Content swap & QA**
Replace placeholder slots with real copy/photos via `data/*.js` only (no component edits); Lighthouse a11y ≥ 95; CLS ≈ 0 (fixed aspects); sitemap/OG later if asked.

## Hosting steps

1. `npm i -g firebase-tools && firebase login`
2. Keep source `firebase.json` (Web Frameworks, `europe-west1`) **or** switch to static `dist` + SPA rewrite (01-stack-and-firebase.md).
3. `firebase deploy` (frameworks) / `npm run build && firebase deploy --only hosting` (static).
4. Smoke-test deep links `/about`, `/inquiry` on live URL.

## Done-when checklist

- [ ] All 7 routes match thumbs at 3 breakpoints (side-by-side).
- [ ] Footer/CTA/header identical across pages (single component each).
- [ ] No new deps beyond source set minus slick/i18n/js-cookie.
- [ ] Inquiry writes to Firestore; success/error states visible.
- [ ] `tsc -b` clean; build chunk for Firestore only on `/inquiry`.

## Skipped (YAGNI)

i18n, carousels, CMS, auth, analytics gating, residence detail pages, partner URLs — all re-addable without layout rework because content lives in `data/*.js` slots.
