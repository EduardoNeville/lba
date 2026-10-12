// Pure filter/sort/format logic for the residences listing. No React, no Vite
// globals, no Firestore — so it can be unit-tested from a plain node script
// (see scripts/test-property-filters.ts) and reused by the admin preview.
//
// The listing page keeps this state in the URL, which makes every filtered view
// shareable and the back button work.

import type { Availability, Operation, Property, PropertyType } from './properties'
import { PROPERTY_TYPES } from './properties'

export type Lang = 'en' | 'fr' | 'es'
export type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'beds-desc' | 'size-desc' | 'area'

export const SORT_KEYS: readonly SortKey[] = ['newest', 'price-asc', 'price-desc', 'beds-desc', 'size-desc', 'area']
const OPERATIONS: readonly Operation[] = ['sale', 'rent']
const AVAILABILITIES: readonly Availability[] = ['available', 'reserved', 'sold']

export interface ResidenceFilters {
  q: string
  operation: Operation | 'any'
  type: PropertyType | 'any'
  area: string | 'any'
  beds: number // 0 = any, otherwise "at least n"
  baths: number
  priceMin: number
  priceMax: number // 0 = no ceiling
  minBuild: number
  features: string[]
  availability: 'all' | Availability
  sort: SortKey
}

export function emptyFilters(): ResidenceFilters {
  return {
    q: '',
    operation: 'any',
    type: 'any',
    area: 'any',
    beds: 0,
    baths: 0,
    priceMin: 0,
    priceMax: 0,
    minBuild: 0,
    features: [],
    availability: 'all',
    sort: 'newest',
  }
}

// Firestore Timestamps ({ seconds, nanoseconds }) are what production stores; the
// dev fixture uses the same shape so there is one code path.
export function timestampSeconds(value: unknown): number {
  const seconds = (value as { seconds?: number } | null | undefined)?.seconds
  return typeof seconds === 'number' && Number.isFinite(seconds) ? seconds : 0
}

export function publishedSeconds(p: Property): number {
  return timestampSeconds(p.publishedAt) || timestampSeconds(p.updatedAt) || timestampSeconds(p.createdAt)
}

// "Málaga" must match a search for "malaga", and "Nueva Andalucía" for "andalucia".
export function normaliseText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function searchBlob(p: Property): string {
  return normaliseText(
    [p.title, p.excerpt, p.area, p.district, p.refCode, p.type, ...p.features].filter(Boolean).join(' '),
  )
}

function matchesQuery(p: Property, query: string): boolean {
  const tokens = normaliseText(query).split(' ').filter(Boolean)
  if (tokens.length === 0) return true
  const blob = searchBlob(p)
  return tokens.every((token) => blob.includes(token))
}

export function matchesFilters(p: Property, f: ResidenceFilters): boolean {
  if (f.operation !== 'any' && p.operation !== f.operation) return false
  if (f.type !== 'any' && p.type !== f.type) return false
  if (f.area !== 'any' && p.area !== f.area) return false
  if (f.availability !== 'all' && p.availability !== f.availability) return false
  if (f.beds > 0 && (p.beds ?? 0) < f.beds) return false
  if (f.baths > 0 && (p.baths ?? 0) < f.baths) return false
  if (f.minBuild > 0 && (p.buildArea ?? 0) < f.minBuild) return false
  if (f.priceMin > 0 && (p.price ?? 0) < f.priceMin) return false
  if (f.features.length > 0 && !f.features.every((feature) => p.features.includes(feature))) return false
  // An explicit ceiling excludes the "price on application" listings: we cannot
  // know whether they fit, and promising a budget we cannot honour is worse.
  if (f.priceMax > 0 && (p.price === null || p.price > f.priceMax)) return false
  if (!matchesQuery(p, f.q)) return false
  return true
}

function compareNullable(a: number | null, b: number | null, direction: 1 | -1): number {
  if (a === null && b === null) return 0
  if (a === null) return 1 // "price on application" always sorts last
  if (b === null) return -1
  return (a - b) * direction
}

const COMPARATORS: Record<SortKey, (a: Property, b: Property) => number> = {
  newest: (a, b) => publishedSeconds(b) - publishedSeconds(a),
  'price-asc': (a, b) => compareNullable(a.price, b.price, 1),
  'price-desc': (a, b) => compareNullable(a.price, b.price, -1),
  'beds-desc': (a, b) => (b.beds ?? 0) - (a.beds ?? 0),
  'size-desc': (a, b) => (b.buildArea ?? 0) - (a.buildArea ?? 0),
  area: (a, b) => a.area.localeCompare(b.area) || (b.price ?? 0) - (a.price ?? 0),
}

export function applyFilters(items: Property[], f: ResidenceFilters): Property[] {
  return items.filter((p) => matchesFilters(p, f)).sort(COMPARATORS[f.sort] ?? COMPARATORS.newest)
}

// Which residences to surface when space is limited (the property-page strip and
// the home carousel): the flagged ones in curated order, otherwise the newest.
// Shared so both surfaces agree on what "featured" means.
export function featuredResidences(items: Property[], limit = 5): Property[] {
  const featured = items
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredRank - b.featuredRank || publishedSeconds(b) - publishedSeconds(a))
  if (featured.length > 0) return featured.slice(0, limit)
  return [...items].sort(COMPARATORS.newest).slice(0, limit)
}

export function countActiveFilters(f: ResidenceFilters): number {
  let n = 0
  if (f.q.trim()) n++
  if (f.operation !== 'any') n++
  if (f.type !== 'any') n++
  if (f.area !== 'any') n++
  if (f.beds > 0) n++
  if (f.baths > 0) n++
  if (f.priceMin > 0) n++
  if (f.priceMax > 0) n++
  if (f.minBuild > 0) n++
  if (f.features.length > 0) n++
  if (f.availability !== 'all') n++
  return n
}

// ---------------------------------------------------------------------------
// URL <-> state. Short keys keep shared links readable.
// ---------------------------------------------------------------------------

const KEY = {
  q: 'q',
  operation: 'op',
  type: 'type',
  area: 'area',
  beds: 'beds',
  baths: 'baths',
  priceMin: 'pmin',
  priceMax: 'pmax',
  minBuild: 'm2',
  features: 'feat',
  availability: 'avail',
  sort: 'sort',
} as const

const positiveInt = (value: string | null): number => {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0
}

export function parseFilters(params: URLSearchParams): ResidenceFilters {
  const f = emptyFilters()
  const oneOf = <T extends string, F extends string>(
    value: string | null,
    allowed: readonly T[],
    fallback: F,
  ): T | F => (value && (allowed as readonly string[]).includes(value) ? (value as T) : fallback)

  f.q = params.get(KEY.q)?.slice(0, 80) ?? ''
  f.operation = oneOf(params.get(KEY.operation), OPERATIONS, 'any')
  f.type = oneOf(params.get(KEY.type), PROPERTY_TYPES, 'any')
  f.area = params.get(KEY.area)?.slice(0, 60) || 'any'
  f.beds = positiveInt(params.get(KEY.beds))
  f.baths = positiveInt(params.get(KEY.baths))
  f.priceMin = positiveInt(params.get(KEY.priceMin))
  f.priceMax = positiveInt(params.get(KEY.priceMax))
  f.minBuild = positiveInt(params.get(KEY.minBuild))
  f.features = (params.get(KEY.features) ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12)
  f.availability = oneOf(params.get(KEY.availability), AVAILABILITIES, 'all')
  f.sort = oneOf(params.get(KEY.sort), SORT_KEYS, 'newest')
  return f
}

export function serializeFilters(f: ResidenceFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (f.q.trim()) params.set(KEY.q, f.q.trim())
  if (f.operation !== 'any') params.set(KEY.operation, f.operation)
  if (f.type !== 'any') params.set(KEY.type, f.type)
  if (f.area !== 'any') params.set(KEY.area, f.area)
  if (f.beds > 0) params.set(KEY.beds, String(f.beds))
  if (f.baths > 0) params.set(KEY.baths, String(f.baths))
  if (f.priceMin > 0) params.set(KEY.priceMin, String(f.priceMin))
  if (f.priceMax > 0) params.set(KEY.priceMax, String(f.priceMax))
  if (f.minBuild > 0) params.set(KEY.minBuild, String(f.minBuild))
  if (f.features.length > 0) params.set(KEY.features, f.features.join(','))
  if (f.availability !== 'all') params.set(KEY.availability, f.availability)
  if (f.sort !== 'newest') params.set(KEY.sort, f.sort)
  return params
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

const LOCALES: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR', es: 'es-ES' }

// Returns null when the price is withheld, so the caller can render the
// localized "price on application" string from the dictionary.
export function formatPrice(p: Pick<Property, 'price'>, lang: Lang): string | null {
  if (p.price === null || !Number.isFinite(p.price) || p.price <= 0) return null
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(p.price)
}

export function formatArea(value: number | undefined, lang: Lang): string | null {
  if (!value || value <= 0) return null
  return `${new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: 0 }).format(value)} m²`
}

// "LBA-0421" -> 421, so the admin can suggest the next reference number.
export function refNumber(refCode: string): number {
  const digits = refCode.replace(/\D+/g, '')
  return digits ? Number(digits) : 0
}
