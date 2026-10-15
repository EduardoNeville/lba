# Copy and languages

The site is trilingual: **EN** is the master copy, **FR** and **ES** override it. This is
how that stays true as pages are added.

## Where copy lives

`app/src/data/locales/`

| File | Holds |
|---|---|
| `en.ts` · `fr.ts` · `es.ts` | the globals: `nav`, `footer`, `ui`, `form`, `options`, `aside` |
| `<page>.ts` | one dictionary per page: `home`, `about`, `legal`, `property`, `privateClient`, `residences`, `journal`, `notFound` |

Pages read a dictionary with `localeDict()` (`src/lib/i18n.ts`), which merges one level
deep so a half-translated section still renders instead of disappearing.

## The four guarantees

1. **TypeScript** — `fr` and `es` are annotated `typeof en` (the globals import the
   master's types with `import type`), so a key en has and a translation lacks is a
   **compile error**: `error TS2741: Property 'scrollDown' is missing in type …`.
2. **Array lengths** — `npm run check:locales` fails when an array (the address, a list
   of services, the pillars) has a different number of entries than en. Types cannot see
   this, and a short list silently drops copy.
3. **Discovery, not lists** — `scripts/locale-registry.ts` reads the folder, so a new
   dictionary is covered by the check **and** by the copy export the moment the file
   exists. Neither script has a hand-written list to forget.
4. **The build runs it** — `npm run build` and `npm run build:dev` begin with
   `check:locales`, so a gap cannot reach `develop`.

`npm run check:locales -- --allow-gaps` is for when a translation is genuinely coming
later: it reports gaps instead of failing, but still fails on structural errors (an
orphan key, a shape mismatch, a missing `en`).

## The copy deck

`npm run export:copy` → `docs/12-copy-all-languages.md`, the document the client reviews
(pandoc it to `.docx` if they want Word). It is generated from the same registry as the
check, so it covers every page and cannot fall behind; it ends with the list of anything
still untranslated. Edits belong in the dictionaries, and the file says so at the top.

## Copy that lives outside the dictionaries

`check:locales` also prints string literals it finds inside pages and components — the
thing no dictionary check can see. It is a hint for a human, never a failure. Two areas
sit outside on purpose:

- **Per-route SEO titles** (`App.tsx`). The site is one URL per page and switches language
  in the browser, so crawlers see a single language. Localising these belongs with
  per-language URLs and `hreflang`, not with the dictionaries.
- **The admin pages** — internal tooling, read by the team in English.

## Adding a page

1. Create `app/src/data/locales/<page>.ts` with `en`, `fr: typeof en`, `es: typeof en`.
2. Read it with `localeDict(...)` — see `pages/BlogListPage.tsx`.
3. `npm run check:locales && npm run export:copy`.
4. If the deck should place it somewhere other than the end, add it to `DECK_ORDER` in
   `scripts/locale-registry.ts`.
