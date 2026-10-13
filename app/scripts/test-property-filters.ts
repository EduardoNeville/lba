// Residences: filter, sort and formatting checks, run against the real dev fixture.
// Run: node --experimental-strip-types scripts/test-property-filters.ts
// (Loads the modules through Vite, like render-audit.ts, because they use
// `import.meta.glob` for the seed photography.)

import { createServer } from 'vite'

// The checks run against the fixtures rather than whatever the development database
// happens to hold, so their expectations are the same on every machine.
process.env.VITE_SEED = 'force'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const load = (path: string) => server.ssrLoadModule(path)

const { devResidences, allDevResidences } = (await load('/src/data/seed/residences.ts')) as {
  devResidences: () => Property[]
  allDevResidences: Property[]
}
const F = (await load('/src/lib/propertyFilters.ts')) as typeof import('../src/lib/propertyFilters.ts')
type Property = import('../src/lib/properties.ts').Property

let passed = 0
const failures: string[] = []

function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (ok) passed++
  else failures.push(`${name}\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`)
}

function checkThat(name: string, condition: boolean, detail = '') {
  if (condition) passed++
  else failures.push(`${name}${detail ? `\n    ${detail}` : ''}`)
}

const filter = (over: Partial<import('../src/lib/propertyFilters.ts').ResidenceFilters>) => ({
  ...F.emptyFilters(),
  ...over,
})
const list = devResidences()

// --- fixture sanity -------------------------------------------------------
check('published fixture count', list.length, 6)
check('all fixture entries', allDevResidences.length, 7)
checkThat('draft is excluded from devResidences()', list.every((p) => p.status === 'published'))
checkThat('every published listing has 4 images', list.every((p) => p.images.length === 4))
checkThat('slugs are unique', new Set(list.map((p) => p.slug)).size === list.length)
checkThat('ref codes are unique', new Set(list.map((p) => p.refCode)).size === list.length)
checkThat(
  'exactly one price-on-application listing',
  list.filter((p) => p.price === null).length === 1,
)
check('featured count', list.filter((p) => p.featured).length, 4)

// --- filtering ------------------------------------------------------------
check('empty filters return everything', F.applyFilters(list, filter({})).length, 6)
check('type=villa', F.applyFilters(list, filter({ type: 'villa' })).length, 3)
check(
  'area filter is exact',
  F.applyFilters(list, filter({ area: 'Benahavís' })).map((p) => p.refCode),
  ['LBA-0422'],
)
check(
  'beds >= 5',
  F.applyFilters(list, filter({ beds: 5 }))
    .map((p) => p.refCode)
    .sort(),
  ['LBA-0421', 'LBA-0422', 'LBA-0426'],
)
check(
  'price ceiling excludes price-on-application',
  F.applyFilters(list, filter({ priceMax: 4000000 }))
    .map((p) => p.refCode)
    .sort(),
  ['LBA-0422', 'LBA-0423', 'LBA-0424', 'LBA-0425'],
)
check(
  'availability=sold',
  F.applyFilters(list, filter({ availability: 'sold' })).map((p) => p.refCode),
  ['LBA-0422'],
)
check(
  'features are AND',
  F.applyFilters(list, filter({ features: ['Sea view', 'Spa'] })).map((p) => p.refCode),
  ['LBA-0426'],
)
check(
  'min build area 600 m²',
  F.applyFilters(list, filter({ minBuild: 600 }))
    .map((p) => p.refCode)
    .sort(),
  ['LBA-0421', 'LBA-0426'],
)
check(
  'combined: villa with garage under 4m',
  F.applyFilters(list, filter({ type: 'villa', features: ['Garage'], priceMax: 4000000 })).map((p) => p.refCode),
  ['LBA-0424'],
)

// --- search (accent- and case-insensitive, all tokens must match) ----------
const q = (text: string) => F.applyFilters(list, filter({ q: text })).map((p) => p.refCode).sort()
check('search: accent folded (malaga)', q('malaga'), ['LBA-0425'])
check('search: accent folded (andalucia)', q('andalucia'), ['LBA-0424'])
check('search: case insensitive', q('VILLA'), ['LBA-0421', 'LBA-0424', 'LBA-0426'])
check('search: reference code', q('lba-0423'), ['LBA-0423'])
check('search: two tokens must both match', q('penthouse sotogrande'), [])
check('search: two tokens', q('villa golf'), ['LBA-0424'])
check('search: no match', q('chalet in the alps'), [])

// --- sorting --------------------------------------------------------------
check(
  'price ascending',
  F.applyFilters(list, filter({ sort: 'price-asc' })).map((p) => p.refCode),
  ['LBA-0425', 'LBA-0423', 'LBA-0422', 'LBA-0424', 'LBA-0421', 'LBA-0426'],
)
check(
  'price descending keeps price-on-application last',
  F.applyFilters(list, filter({ sort: 'price-desc' })).map((p) => p.refCode),
  ['LBA-0421', 'LBA-0424', 'LBA-0422', 'LBA-0423', 'LBA-0425', 'LBA-0426'],
)
check(
  'newest first',
  F.applyFilters(list, filter({ sort: 'newest' })).map((p) => p.refCode),
  ['LBA-0425', 'LBA-0421', 'LBA-0426', 'LBA-0424', 'LBA-0423', 'LBA-0422'],
)
check('beds descending', F.applyFilters(list, filter({ sort: 'beds-desc' }))[0].refCode, 'LBA-0426')
check('size descending', F.applyFilters(list, filter({ sort: 'size-desc' }))[0].refCode, 'LBA-0426')

// --- which residences reach the strip and the home band --------------------
check(
  'featured run in curated order',
  F.featuredResidences(list, 5).map((p) => p.refCode),
  ['LBA-0421', 'LBA-0426', 'LBA-0423', 'LBA-0424'],
)
check('featured respects the limit', F.featuredResidences(list, 2).map((p) => p.refCode), ['LBA-0421', 'LBA-0426'])
check(
  'without a curated flag the newest are used instead',
  F.featuredResidences(
    list.map((p) => ({ ...p, featured: false })),
    5,
  ).map((p) => p.refCode),
  ['LBA-0425', 'LBA-0421', 'LBA-0426', 'LBA-0424', 'LBA-0423'],
)
check('an empty inventory yields nothing to show', F.featuredResidences([], 5).length, 0)
check(
  'similar residences prefer the same area, then the same type, newest first',
  F.similarResidences(list, list[0], 3).map((p) => p.refCode),
  ['LBA-0426', 'LBA-0424'],
)
check(
  'similar residences never include the residence itself',
  F.similarResidences(list, list[0], 3).some((p) => p.refCode === 'LBA-0421'),
  false,
)

// --- URL round trip -------------------------------------------------------
const complex = filter({
  q: 'sea view',
  type: 'villa',
  area: 'Marbella',
  beds: 4,
  baths: 3,
  priceMin: 500000,
  priceMax: 7000000,
  minBuild: 200,
  features: ['Private pool', 'Garage'],
  availability: 'available',
  sort: 'price-desc',
})
const roundTrip = F.parseFilters(F.serializeFilters(complex))
check('serialize -> parse round trip', roundTrip, complex)
check('empty filters produce an empty query string', F.serializeFilters(F.emptyFilters()).toString(), '')
check('unknown enum values in a URL fall back to any', F.parseFilters(new URLSearchParams('op=barter&sort=cheap')).operation, 'any')
check('unknown sort falls back to newest', F.parseFilters(new URLSearchParams('sort=cheap')).sort, 'newest')
check('garbage numbers are ignored', F.parseFilters(new URLSearchParams('beds=-3&pmax=abc')).beds, 0)
check('query string is trimmed to 80 chars', F.parseFilters(new URLSearchParams(`q=${'a'.repeat(120)}`)).q.length, 80)

// --- counters & formatting ----------------------------------------------
check('active filter count', F.countActiveFilters(complex), 10)
check('active filter count when empty', F.countActiveFilters(F.emptyFilters()), 0)
check('price on application formats to null', F.formatPrice({ price: null }, 'en'), null)
check('price formats for en-GB', F.formatPrice({ price: 685000 }, 'en'), '€685,000')
checkThat('price formats for fr-FR with a thousands separator', (F.formatPrice({ price: 685000 }, 'fr') ?? '').includes('685'))
check('refNumber', F.refNumber('LBA-0421'), 421)
check('publishedSeconds reads Firestore-style timestamps', F.publishedSeconds(list[0]) > 0, true)

// --- read path -----------------------------------------------------------
// loadPublishedProperties() must fall back to the dev fixture when the dev
// collection is empty (and when it is unreachable) — either way the page gets
// published residences and never drafts. Exercises the cache too.
const P = (await load('/src/lib/properties.ts')) as typeof import('../src/lib/properties.ts')
const loaded = await P.loadPublishedProperties()

// A denied public read is a deployment state (the rules for `properties` are not
// deployed yet), not a failure a visitor can act on: the section shows its empty state
// instead of an error. Anything else — offline, quota — stays an error.
check('loader: a permission error is recognised', P.isPermissionDenied({ code: 'permission-denied' }), true)
check('loader: a network error is not', P.isPermissionDenied({ code: 'unavailable' }), false)
check('loader: something else entirely is not', P.isPermissionDenied(new Error('boom')), false)
checkThat('loader returns residences', loaded.length >= 6, `got ${loaded.length}`)
checkThat('loader never returns drafts', loaded.every((p) => p.status === 'published'))
const cached = await P.loadPublishedProperties()
checkThat('second load is served from cache', cached === loaded)
checkThat('getProperty finds a listing by slug', (await P.getProperty(list[0].slug))?.refCode === list[0].refCode)
check('getProperty returns null for an unknown slug', await P.getProperty('does-not-exist'), null)
check('normaliseProperty tolerates a partial document', P.normaliseProperty('x', { title: 'Only a title' }), {
  slug: 'x',
  refCode: '',
  status: 'draft',
  availability: 'available',
  operation: 'sale',
  type: 'villa',
  title: 'Only a title',
  excerpt: '',
  descriptionMarkdown: '',
  area: '',
  district: undefined,
  price: null,
  priceLabel: 'fixed',
  beds: undefined,
  baths: undefined,
  buildArea: undefined,
  terraceArea: undefined,
  plotArea: undefined,
  yearBuilt: undefined,
  energyRating: undefined,
  features: [],
  images: [],
  featured: false,
  featuredRank: 100,
  createdAt: undefined,
  updatedAt: undefined,
  publishedAt: undefined,
  createdBy: undefined,
})

// --- reporting -----------------------------------------------------------
console.log(`\n${passed} passed, ${failures.length} failed\n`)
for (const failure of failures) console.log(`✗ ${failure}\n`)
await server.close()
process.exit(failures.length > 0 ? 1 : 0)
