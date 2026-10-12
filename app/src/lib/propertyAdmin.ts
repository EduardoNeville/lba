// Writes for the residences collection. Reads for the public site live in
// lib/properties.ts and only ever return published documents; the admin needs the
// drafts too, so it has its own list.
import { getDb } from './firestore'
import {
  invalidatePropertiesCache,
  normaliseProperty,
  type Availability,
  type Operation,
  type Property,
  type PropertyImage,
  type PropertyStatus,
  type PropertyType,
} from './properties'
import { refNumber } from './propertyFilters'
import { slugify } from './posts'

export interface PropertyInput {
  slug: string
  refCode: string
  status: PropertyStatus
  availability: Availability
  operation: Operation
  type: PropertyType
  title: string
  excerpt: string
  descriptionMarkdown: string
  area: string
  district: string
  price: number | null
  priceLabel: 'fixed' | 'from' | 'reduced'
  beds: number | null
  baths: number | null
  buildArea: number | null
  terraceArea: number | null
  plotArea: number | null
  yearBuilt: number | null
  energyRating: string
  features: string[]
  images: PropertyImage[]
  featured: boolean
  featuredRank: number
}

// Everything, drafts included, newest edit first.
export async function listAllProperties(): Promise<Property[]> {
  const { collection, getDocs } = await import('firebase/firestore')
  const db = await getDb()
  const snap = await getDocs(collection(db, 'properties'))
  return snap.docs
    .map((doc) => normaliseProperty(doc.id, doc.data() as Record<string, unknown>))
    .sort((a, b) => seconds(b.updatedAt) - seconds(a.updatedAt))
}

const seconds = (value: unknown): number => {
  const s = (value as { seconds?: number } | null | undefined)?.seconds
  return typeof s === 'number' ? s : 0
}

// "LBA-0421" → the next free number, so the office does not have to remember it.
export function nextRefCode(items: Property[]): string {
  const highest = items.reduce((max, item) => Math.max(max, refNumber(item.refCode)), 0)
  return `LBA-${String(highest + 1).padStart(4, '0')}`
}

// ---------------------------------------------------------------------------
// The editor's shape. Numbers are held as strings so a field can be left empty
// (empty price = "price on application", empty area = not published), and these two
// mappers are the only place that knows how the form and the document relate.
// ---------------------------------------------------------------------------

export interface ResidenceForm {
  title: string
  slug: string
  refCode: string
  status: PropertyStatus
  availability: Availability
  operation: Operation
  type: PropertyType
  excerpt: string
  descriptionMarkdown: string
  area: string
  district: string
  price: string
  priceLabel: 'fixed' | 'from' | 'reduced'
  beds: string
  baths: string
  buildArea: string
  terraceArea: string
  plotArea: string
  yearBuilt: string
  energyRating: string
  features: string[]
  images: PropertyImage[]
  featured: boolean
  featuredRank: string
}

export const emptyResidenceForm: ResidenceForm = {
  title: '',
  slug: '',
  refCode: '',
  status: 'draft',
  availability: 'available',
  operation: 'sale',
  type: 'villa',
  excerpt: '',
  descriptionMarkdown: '',
  area: 'Marbella',
  district: '',
  price: '',
  priceLabel: 'fixed',
  beds: '',
  baths: '',
  buildArea: '',
  terraceArea: '',
  plotArea: '',
  yearBuilt: '',
  energyRating: '',
  features: [],
  images: [],
  featured: false,
  featuredRank: '100',
}

const asText = (value: number | undefined): string => (value === undefined || value === null ? '' : String(value))

export const numberOrNull = (value: string): number | null => {
  const trimmed = value.trim()
  if (trimmed === '') return null
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

export function toForm(property: Property): ResidenceForm {
  return {
    title: property.title,
    slug: property.slug,
    refCode: property.refCode,
    status: property.status,
    availability: property.availability,
    operation: property.operation,
    type: property.type,
    excerpt: property.excerpt,
    descriptionMarkdown: property.descriptionMarkdown,
    area: property.area,
    district: property.district ?? '',
    price: asText(property.price ?? undefined),
    priceLabel: property.priceLabel ?? 'fixed',
    beds: asText(property.beds),
    baths: asText(property.baths),
    buildArea: asText(property.buildArea),
    terraceArea: asText(property.terraceArea),
    plotArea: asText(property.plotArea),
    yearBuilt: asText(property.yearBuilt),
    energyRating: property.energyRating ?? '',
    features: [...property.features],
    images: property.images.map((image) => ({ ...image })),
    featured: property.featured,
    featuredRank: asText(property.featuredRank ?? 100),
  }
}

export function toInput(form: ResidenceForm): PropertyInput {
  return {
    slug: slugify(form.slug || form.title),
    refCode: form.refCode.trim(),
    status: form.status,
    availability: form.availability,
    operation: form.operation,
    type: form.type,
    title: form.title.trim(),
    excerpt: form.excerpt.trim(),
    descriptionMarkdown: form.descriptionMarkdown,
    area: form.area,
    district: form.district.trim(),
    price: numberOrNull(form.price),
    priceLabel: form.priceLabel,
    beds: numberOrNull(form.beds),
    baths: numberOrNull(form.baths),
    buildArea: numberOrNull(form.buildArea),
    terraceArea: numberOrNull(form.terraceArea),
    plotArea: numberOrNull(form.plotArea),
    yearBuilt: numberOrNull(form.yearBuilt),
    energyRating: form.energyRating.trim(),
    features: form.features,
    images: form.images,
    featured: form.featured,
    featuredRank: numberOrNull(form.featuredRank) ?? 100,
  }
}

// The card the editor previews: the public component, fed from the form as typed.
export function toPreview(form: ResidenceForm): Property {
  const input = toInput(form)
  return {
    ...input,
    slug: input.slug || 'preview',
    title: input.title || 'Untitled residence',
    district: input.district || undefined,
    beds: input.beds ?? undefined,
    baths: input.baths ?? undefined,
    buildArea: input.buildArea ?? undefined,
    terraceArea: input.terraceArea ?? undefined,
    plotArea: input.plotArea ?? undefined,
    yearBuilt: input.yearBuilt ?? undefined,
    energyRating: input.energyRating || undefined,
    excerpt: input.excerpt,
    descriptionMarkdown: input.descriptionMarkdown,
    area: input.area,
  }
}

export async function saveProperty(input: PropertyInput, existing: Property | null, createdBy?: string): Promise<void> {
  const { deleteDoc, doc, serverTimestamp, setDoc } = await import('firebase/firestore')
  const db = await getDb()

  const payload: Record<string, unknown> = {
    slug: input.slug,
    refCode: input.refCode,
    status: input.status,
    availability: input.availability,
    operation: input.operation,
    type: input.type,
    title: input.title,
    excerpt: input.excerpt,
    descriptionMarkdown: input.descriptionMarkdown,
    area: input.area,
    district: input.district || null,
    // null is meaningful here: it is what the public site renders as
    // "price on application".
    price: input.price,
    priceLabel: input.priceLabel,
    beds: input.beds,
    baths: input.baths,
    buildArea: input.buildArea,
    terraceArea: input.terraceArea,
    plotArea: input.plotArea,
    yearBuilt: input.yearBuilt,
    energyRating: input.energyRating || null,
    features: input.features,
    images: input.images.map((image) => ({ url: image.url, path: image.path ?? null, alt: image.alt ?? null })),
    featured: input.featured,
    featuredRank: input.featuredRank,
    updatedAt: serverTimestamp(),
    createdBy: createdBy ?? null,
  }

  // Both dates are set once. Re-saving a published residence must not re-date it —
  // "newest first" is what the listing sorts on by default.
  if (!existing) payload.createdAt = serverTimestamp()
  if (input.status === 'published' && !existing?.publishedAt) payload.publishedAt = serverTimestamp()

  // The slug is the document id, so a rename writes a new document and removes the
  // old one (the same trade-off the journal makes: the old URL stops working).
  const renamed = existing !== null && existing.slug !== input.slug
  await setDoc(doc(db, 'properties', input.slug), payload, { merge: !renamed })
  if (renamed && existing) await deleteDoc(doc(db, 'properties', existing.slug))
  invalidatePropertiesCache()
}

// The Storage objects are left behind on purpose: a failed delete would block the
// save, and the bucket lifecycle rule is the backstop for orphans (docs/09 §C).
export async function deleteProperty(slug: string): Promise<void> {
  const { deleteDoc, doc } = await import('firebase/firestore')
  const db = await getDb()
  await deleteDoc(doc(db, 'properties', slug))
  invalidatePropertiesCache()
}
