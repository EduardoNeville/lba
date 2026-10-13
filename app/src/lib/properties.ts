// Residences (real-estate) model — the one place that knows the shape of a
// Firestore `properties` document, the canonical option lists the admin and the
// public filters share, and the read path for the public site.
//
// Read strategy (see .pi/PLAN.md §5): one query — `where('status','==','published')` —
// then every search/filter/sort runs in memory. That keeps the read cost at N docs
// per visitor per 2 minutes, needs zero composite indexes, and makes the filters
// instant. Revisit only if the inventory passes a few hundred listings.

import { getDb } from './firestore'

export type PropertyStatus = 'draft' | 'published'
export type Availability = 'available' | 'reserved' | 'sold'
export type Operation = 'sale' | 'rent'

export const PROPERTY_TYPES = ['villa', 'apartment', 'penthouse', 'townhouse', 'plot', 'finca', 'commercial'] as const
export type PropertyType = (typeof PROPERTY_TYPES)[number]

export const PROPERTY_AREAS = [
  'Marbella',
  'Golden Mile',
  'Nueva Andalucía',
  'Puerto Banús',
  'San Pedro de Alcántara',
  'Benahavís',
  'Estepona',
  'Sotogrande',
  'Málaga',
  'Other',
] as const

export const PROPERTY_FEATURES = [
  'Sea view',
  'Golf view',
  'Mountain view',
  'Private pool',
  'Communal pool',
  'Garden',
  'Terrace',
  'Lift',
  'Garage',
  'Gated community',
  'New build',
  'Renovated',
  'Walk to beach',
  'Furnished',
  'Guest apartment',
  'Gym',
  'Spa',
] as const

// English labels — the fallback for every locale the site does not translate, and
// what the (English-only) admin panel reads.
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  villa: 'Villa',
  apartment: 'Apartment',
  penthouse: 'Penthouse',
  townhouse: 'Townhouse',
  plot: 'Plot',
  finca: 'Finca',
  commercial: 'Commercial',
}

export const OPERATION_LABELS: Record<Operation, string> = { sale: 'For sale', rent: 'For rent' }
export const AVAILABILITY_LABELS: Record<Availability, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
}

export interface PropertyImage {
  /** The large rendition: what the full-screen viewer shows. */
  url: string
  path?: string // Storage path, kept so an admin delete can clean up the object
  /** The small rendition: what grids, strips and thumbnails download. Absent on
   *  photographs uploaded before the two-rendition pipeline, in which case the
   *  large one is used. */
  cardUrl?: string
  cardPath?: string
  alt?: string
}

export interface Property {
  slug: string // document id
  refCode: string // "LBA-0421" — shown on cards, quoted in enquiries
  status: PropertyStatus // visibility: drives the rules, the query and SEO
  availability: Availability // badge + filter; independent of visibility
  operation: Operation
  type: PropertyType

  title: string
  excerpt: string // card blurb + <meta description> fallback
  descriptionMarkdown: string
  area: string
  district?: string

  price: number | null // EUR; null renders as the localized "price on application"
  priceLabel?: 'fixed' | 'from' | 'reduced'

  beds?: number
  baths?: number
  buildArea?: number // m²
  terraceArea?: number
  plotArea?: number
  yearBuilt?: number
  energyRating?: string
  features: string[]

  images: PropertyImage[] // [0] is the cover

  featured: boolean // eligible for the home carousel
  featuredRank: number // lower first

  createdAt?: unknown
  updatedAt?: unknown
  publishedAt?: unknown
  createdBy?: string
}

const CACHE_TTL = 120_000 // 2 minutes, in memory + sessionStorage (cuts repeat reads)
const CACHE_KEY = 'lba-properties-v1'
// Fixtures are for non-production environments only: the dev site (built with
// `--mode development`, which is what CI deploys to the dev target) and the dev
// server. A production build folds this to false and drops the branch — and the
// fixture's dynamic import — from the bundle. VITE_SEED=0 switches it off.
const DEV_FIXTURES = import.meta.env.MODE !== 'production' && import.meta.env.VITE_SEED !== '0'

let cache: { at: number; items: Property[] } | null = null
let inflight: Promise<Property[]> | null = null

export function invalidatePropertiesCache(): void {
  cache = null
  try {
    sessionStorage.removeItem(CACHE_KEY)
  } catch {
    /* private mode */
  }
}

// Residences that are available *right now*, synchronously: the memory cache when
// it is still fresh, otherwise the sessionStorage mirror (which hydration also
// adopts). Pages use this as their initial state, so a client-side navigation —
// or a reload within the session — renders the real content immediately instead
// of flashing a skeleton.
export function cachedProperties(): Property[] {
  if (cache && Date.now() - cache.at < CACHE_TTL) return cache.items
  const stored = readSession()
  if (stored) {
    cache = stored
    return stored.items
  }
  return []
}

export async function loadPublishedProperties(): Promise<Property[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL) return cache.items
  if (inflight) return inflight

  inflight = fetchPublished()
  try {
    const items = await inflight
    cache = { at: Date.now(), items }
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: cache.at, items }))
    } catch {
      /* private mode / quota */
    }
    return items
  } finally {
    inflight = null
  }
}

async function fetchPublished(): Promise<Property[]> {
  const stored = readSession()
  if (stored) {
    cache = stored
    return stored.items
  }
  try {
    const { collection, getDocs, query, where } = await import('firebase/firestore')
    const db = await getDb()
    const snap = await getDocs(query(collection(db, 'properties'), where('status', '==', 'published')))
    const items = snap.docs.map((doc) => normaliseProperty(doc.id, doc.data() as Record<string, unknown>))
    if (items.length > 0) return items
    // Empty collection in development → the fixture, so the UI can be built and
    // reviewed before any real listing exists (see data/seed/residences.ts).
    return await devSeed()
  } catch (err) {
    const seed = await devSeed()
    if (seed.length > 0) return seed
    throw err
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  const items = await loadPublishedProperties()
  const hit = items.find((p) => p.slug === slug)
  if (hit) return hit
  try {
    const { doc, getDoc } = await import('firebase/firestore')
    const db = await getDb()
    const snap = await getDoc(doc(db, 'properties', slug))
    if (!snap.exists()) return null
    const property = normaliseProperty(snap.id, snap.data() as Record<string, unknown>)
    return property.status === 'published' ? property : null
  } catch {
    return null
  }
}

function readSession(): { at: number; items: Property[] } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at: number; items: Property[] }
    if (!parsed || !Array.isArray(parsed.items) || Date.now() - parsed.at > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

// Non-production only (see DEV_FIXTURES). The dynamic import disappears from a
// production build along with the branch that calls it.
async function devSeed(): Promise<Property[]> {
  if (!DEV_FIXTURES) return []
  const { devResidences } = await import('../data/seed/residences')
  return devResidences()
}

const str = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() ? v : undefined)
const num = (v: unknown): number | undefined => {
  const n = typeof v === 'string' ? Number(v) : v
  return typeof n === 'number' && Number.isFinite(n) ? n : undefined
}
const oneOf = <T extends string>(v: unknown, allowed: readonly T[], fallback: T): T =>
  typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : fallback

// Documents are written by hand in the admin, so a partial or malformed one must
// never crash a public page.
export function normaliseProperty(slug: string, raw: Record<string, unknown>): Property {
  const images: PropertyImage[] = Array.isArray(raw.images)
    ? (raw.images as unknown[])
        .filter((i): i is Record<string, unknown> => typeof i === 'object' && i !== null)
        .map((i) => ({
          url: str(i.url) ?? '',
          path: str(i.path),
          cardUrl: str(i.cardUrl),
          cardPath: str(i.cardPath),
          alt: str(i.alt),
        }))
        .filter((i) => i.url !== '')
    : []
  const price = num(raw.price)
  return {
    slug,
    refCode: str(raw.refCode) ?? '',
    status: raw.status === 'published' ? 'published' : 'draft',
    availability: oneOf<Availability>(raw.availability, ['available', 'reserved', 'sold'], 'available'),
    operation: oneOf<Operation>(raw.operation, ['sale', 'rent'], 'sale'),
    type: oneOf<PropertyType>(raw.type, PROPERTY_TYPES, 'villa'),
    title: str(raw.title) ?? '',
    excerpt: str(raw.excerpt) ?? '',
    descriptionMarkdown: str(raw.descriptionMarkdown) ?? '',
    area: str(raw.area) ?? '',
    district: str(raw.district),
    price: price !== undefined && price > 0 ? price : null,
    priceLabel: oneOf(raw.priceLabel, ['fixed', 'from', 'reduced'] as const, 'fixed'),
    beds: num(raw.beds),
    baths: num(raw.baths),
    buildArea: num(raw.buildArea),
    terraceArea: num(raw.terraceArea),
    plotArea: num(raw.plotArea),
    yearBuilt: num(raw.yearBuilt),
    energyRating: str(raw.energyRating),
    features: Array.isArray(raw.features) ? raw.features.filter((f): f is string => typeof f === 'string') : [],
    images,
    featured: raw.featured === true,
    featuredRank: num(raw.featuredRank) ?? 100,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    publishedAt: raw.publishedAt,
    createdBy: str(raw.createdBy),
  }
}
