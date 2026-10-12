// Residences card checks: renders the real card for every fixture listing in
// EN/FR/ES and asserts the text a visitor would read — price formatting, the
// "price on application" fallback, availability badges and the translated area /
// type labels. This covers the copy the dead-copy audit cannot see, because that
// audit renders the page before its data has loaded.
//
// Run: node --experimental-strip-types scripts/test-residence-card.ts

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

const store: Record<string, string> = {}
;(globalThis as unknown as { localStorage: unknown }).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => {
    store[k] = String(v)
  },
  removeItem: (k: string) => {
    delete store[k]
  },
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const load = (path: string) => server.ssrLoadModule(path)

const { LangProvider } = await load('/src/lib/lang.tsx')
const { PropertyCard } = await load('/src/components/ui/PropertyCard.tsx')
const { devResidences } = (await load('/src/data/seed/residences.ts')) as {
  devResidences: () => import('../src/lib/properties.ts').Property[]
}
type Property = import('../src/lib/properties.ts').Property

const properties = devResidences()
const byRef = (ref: string): Property => {
  const found = properties.find((p) => p.refCode === ref)
  if (!found) throw new Error(`No fixture residence with reference ${ref}`)
  return found
}

function renderCard(property: Property, lang: 'en' | 'fr' | 'es'): string {
  store['lba-lang'] = lang
  return renderToStaticMarkup(
    React.createElement(
      LangProvider,
      null,
      React.createElement(MemoryRouter, null, React.createElement(PropertyCard, { property, showLink: true })),
    ),
  )
}

function cardHtml(property: Property, lang: 'en' | 'fr' | 'es'): string {
  return renderCard(property, lang)
}

function stripHtml(html: string): string {
  // Attributes carry real copy too (placeholders, aria-labels, alt text).
  const attrs = [...html.matchAll(/(?:alt|placeholder|aria-label|title)="([^"]*)"/g)].map((m) => m[1])
  return (html.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' '))
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cardText(property: Property, lang: 'en' | 'fr' | 'es'): string {
  return stripHtml(renderCard(property, lang))
}

let passed = 0
const failures: string[] = []

function has(name: string, haystack: string, needle: string) {
  if (haystack.includes(needle)) passed++
  else failures.push(`${name}\n    expected to contain: ${JSON.stringify(needle)}\n    in: ${haystack.slice(0, 220)}`)
}

function lacks(name: string, haystack: string, needle: string) {
  if (!haystack.includes(needle)) passed++
  else failures.push(`${name}\n    expected NOT to contain: ${JSON.stringify(needle)}`)
}

function equals(name: string, actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) passed++
  else failures.push(`${name}\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`)
}

// --- English: formatting, specs, location line, badges ---------------------
const villa = cardText(byRef('LBA-0421'), 'en')
has('en: price', villa, '€6,450,000')
has('en: beds', villa, '5 bed')
has('en: baths', villa, '6 bath')
has('en: built area', villa, '620 m²')
has('en: location line', villa, 'Marbella · Golden Mile · Villa')
has('en: card links to the residence', cardHtml(byRef('LBA-0421'), 'en'), 'href="/property/residences/villa-infinity-pool-golden-mile"')
has('en: view link copy', villa, 'View residence')
lacks('en: no availability badge when available', villa, 'Available')

const sold = cardText(byRef('LBA-0422'), 'en')
has('en: sold badge', sold, 'Sold')
has('en: finca type label', sold, 'Finca')

const reduced = cardText(byRef('LBA-0423'), 'en')
has('en: reserved badge', reduced, 'Reserved')
has('en: reduced qualifier', reduced, 'Reduced €1,895,000')

const from = cardText(byRef('LBA-0425'), 'en')
has('en: from qualifier', from, 'From €685,000')

const poa = cardText(byRef('LBA-0426'), 'en')
has('en: price on application', poa, 'Price on application')
lacks('en: no euro price for poa', poa, '€')

// --- French ----------------------------------------------------------------
const frSold = cardText(byRef('LBA-0422'), 'fr')
has('fr: sold badge', frSold, 'Vendue')
has('fr: type label', frSold, 'Finca')
has('fr: beds abbreviation', frSold, '6 ch.')
has('fr: view link copy', frSold, 'Voir la résidence')
has('fr: price on application', cardText(byRef('LBA-0426'), 'fr'), 'Prix sur demande')
has('fr: qualifier', cardText(byRef('LBA-0425'), 'fr'), 'À partir de')

// --- Spanish: the area map actually translates -----------------------------
const esVilla = cardText(byRef('LBA-0421'), 'es')
has('es: type label', esVilla, 'Villa')
has('es: sold badge', cardText(byRef('LBA-0422'), 'es'), 'Vendida')
has('es: price on application', cardText(byRef('LBA-0426'), 'es'), 'Precio a consultar')
has('es: hab. abbreviation', esVilla, '5 hab.')
has('es: baths abbreviation', esVilla, '6 baños')
// The type map translates; the district stays as published (free text, see PLAN §16).
has('es: translated type (penthouse -> Ático)', cardText(byRef('LBA-0423'), 'es'), 'Ático')
has('es: district shown as published', esVilla, 'Golden Mile')

// --- the listing page itself (server-rendered, before its data arrives) ----
// The filters live in the query string, so the chips row has to reflect a URL
// that arrives from a shared link. The panel stays closed until asked for.
const { ResidencesPage } = await load('/src/pages/ResidencesPage.tsx')

function pageText(search: string, lang: 'en' | 'fr' | 'es'): string {
  store['lba-lang'] = lang
  return stripHtml(
    renderToStaticMarkup(
      React.createElement(
        LangProvider,
        null,
        React.createElement(
          MemoryRouter,
          { initialEntries: [`/property/residences${search}`] },
          React.createElement(ResidencesPage),
        ),
      ),
    ),
  )
}

const page = pageText('', 'en')
has('page: hero title', page, 'Selected residences')
has('page: search placeholder', page, 'Name, area or reference')
has('page: filters toggle', page, 'Filters')
has('page: sort default', page, 'Newest first')
has('page: announces that it is loading', page, 'Loading residences…')
lacks('page: does not report a false count while loading', page, '0 residences')
lacks('page: filter panel is closed by default', page, 'Property type')
lacks('page: no empty state while the data is still loading', page, 'No residences match your search.')

const frPage = pageText('?type=villa&beds=4&sort=price-desc', 'fr')
has('fr page: hero title', frPage, 'Résidences sélectionnées')
has('fr page: translated sort options', frPage, 'Plus récentes')
has('fr page: chip from the URL (beds)', frPage, '4+ Chambres')
has('fr page: chip from the URL (type)', frPage, 'Villa')
has('fr page: filter count badge', frPage, 'Filtres · 2')

// --- the nav highlights exactly one section --------------------------------
// /property/residences sits under /property, so without `end` on the parent both
// nav items light up (the bug reported on the dev site). Prefix matching must stay
// for items that have no children: a journal post still highlights "Journal".
const { SiteHeader } = await load('/src/components/layout/SiteHeader.tsx')

function activeNavItems(path: string): string[] {
  store['lba-lang'] = 'en'
  const html = renderToStaticMarkup(
    React.createElement(
      LangProvider,
      null,
      React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(SiteHeader)),
    ),
  )
  const active: string[] = []
  for (const match of html.matchAll(/<a([^>]*)>([^<]*)<\/a>/g)) {
    const [, attrs, label] = match
    // Only the active desktop style carries a permanent underline; inactive links
    // merely have hover:text-oxblood, so this cannot match them.
    if (attrs.includes('underline-offset-8')) active.push(label.trim())
  }
  return active
}

equals('nav: home highlights nothing', activeNavItems('/'), [])
equals('nav: /property highlights Property only', activeNavItems('/property'), ['Property'])
equals('nav: /property/residences highlights Residences only', activeNavItems('/property/residences'), ['Residences'])
equals(
  'nav: a residence keeps Residences highlighted',
  activeNavItems('/property/residences/villa-infinity-pool-golden-mile'),
  ['Residences'],
)
equals('nav: /legal highlights Legal only', activeNavItems('/legal'), ['Legal'])
equals('nav: a journal post keeps Journal highlighted', activeNavItems('/blog/any-post'), ['Journal'])

console.log(`\n${passed} passed, ${failures.length} failed\n`)
for (const failure of failures) console.log(`✗ ${failure}\n`)
await server.close()
process.exit(failures.length > 0 ? 1 : 0)
