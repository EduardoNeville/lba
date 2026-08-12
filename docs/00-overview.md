# 00 — Overview: LBA Site Migration

Migrate the existing React + Vite + Tailwind + Firebase app at `~/projects/marisela/lba` to the 7 visual templates in `.thumbs/*.jpg`. The templates define **layout only**; all copy/names/photos in them are placeholder slots.

## Template → route map

| Template | Route | Spec |
|---|---|---|
| `ChatGPT Image Aug 10, 2026, 10_12_49 PM.jpg` | `/` | `03-pages/home.md` |
| `about us.jpg` | `/about` | `03-pages/about-us.md` |
| `ChatGPT Image Aug 11, 2026, 11_27_45 AM.jpg` | `/property` | `03-pages/property.md` |
| `ChatGPT Image Aug 11, 2026, 11_30_48 AM.jpg` | `/private-client` | `03-pages/private-client.md` |
| `legal-part.jpg` | `/legal` | `03-pages/legal.md` |
| `lifestyle-section.jpg` | `/lifestyle` | `03-pages/lifestyle.md` |
| `inquiry-page.jpg` | `/inquiry` | `03-pages/inquiry.md` |

## Design language (one line)

Warm cream canvas, ink-brown display serif in uppercase, micro letter-spaced labels, oxblood accent, hairline rules, sharp corners, image blocks for depth — no shadows, no rounded corners, no gradients except hero scrims.

## Canonical decisions (ratified across specs)

1. **Footer:** expanded 4-column, dark oxblood (inquiry.md §1.4). Supersedes slim variants.
2. **CTA band:** one `CtaBand` component, `variant="image"|"accent"`, `tone="light"|"dark"`.
3. **Page hero:** one `PageHero` (split text/image), `titleCase` prop.
4. **Cards:** `PropertyCard(showLink)`, `ServiceCard(checks)` shared across pages.
5. **Lists:** `Checklist` with `marker="square"|"check"`, `columns` prop.
6. **Icons:** inline stroke SVGs (`stroke-1`, currentColor), no icon library.
7. **Nav:** dropdowns on desktop, accordion overlay on mobile, driven by `data/navigation.js`.

## Doc index

- `01-stack-and-firebase.md` — source project facts, what to keep/drop, Firebase reuse + hosting.
- `02-design-system.md` — tokens, type scale, primitives + props.
- `03-pages/*.md` — per-template layout contracts (7 files).
- `04-migration-plan.md` — phases, routes, file tree, build order, checklist.
- `07-mobile-plan.md` — mobile pass: 320/375/768 composition, touch ergonomics, perf, QA matrix.
- `08-text-extraction-plan.md` — reconcile docx ↔ app copy (few string swaps); FR/ES stay parked in the docx until the toggle is required.
