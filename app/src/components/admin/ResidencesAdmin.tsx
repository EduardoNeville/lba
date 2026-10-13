import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { PropertyCard } from '../ui/PropertyCard'
import { ImageManager } from './ImageManager'
import { btnCls, controlCls, ghostBtnCls, hintCls, labelCls, panelCls, primaryBtnCls, rowCls } from './styles'
import {
  AVAILABILITY_LABELS,
  OPERATION_LABELS,
  PROPERTY_AREAS,
  PROPERTY_FEATURES,
  PROPERTY_TYPES,
  PROPERTY_TYPE_LABELS,
  type Availability,
  type Operation,
  type Property,
  type PropertyStatus,
  type PropertyType,
} from '../../lib/properties'
import {
  deleteProperty,
  emptyResidenceForm,
  listAllProperties,
  nextRefCode,
  saveProperty,
  toForm,
  toInput,
  toPreview,
  type ResidenceForm,
} from '../../lib/propertyAdmin'
import { formatPrice, normaliseText } from '../../lib/propertyFilters'
import { slugify } from '../../lib/posts'

function validate(form: ResidenceForm): string | null {
  if (!form.title.trim()) return 'A title is required.'
  if (!slugify(form.slug || form.title)) return 'A URL slug is required.'
  if (form.status === 'published' && form.images.length === 0) {
    return 'Add at least one photograph before publishing.'
  }
  const numbers: [string, string][] = [
    ['Price', form.price],
    ['Bedrooms', form.beds],
    ['Bathrooms', form.baths],
    ['Built area', form.buildArea],
    ['Terrace area', form.terraceArea],
    ['Plot', form.plotArea],
    ['Year built', form.yearBuilt],
  ]
  for (const [field, value] of numbers) {
    if (value.trim() !== '' && !Number.isFinite(Number(value))) return `${field} must be a number.`
  }
  return null
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id?: string
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label}
      </label>
      {children}
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  )
}

// The residences panel of /admin: the list, and the editor for one residence.
export function ResidencesAdmin() {
  const [items, setItems] = useState<Property[] | null>(null)
  const [editing, setEditing] = useState<Property | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState<ResidenceForm>(emptyResidenceForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | PropertyStatus>('all')

  const set = <K extends keyof ResidenceForm>(key: K, value: ResidenceForm[K]) => setForm((f) => ({ ...f, [key]: value }))

  async function load() {
    const loaded = await listAllProperties()
    setItems(loaded)
    return loaded
  }

  useEffect(() => {
    load().catch(() => setError('Could not load the residences.'))
  }, [])

  function startNew() {
    setIsNew(true)
    setEditing(null)
    setForm({ ...emptyResidenceForm, refCode: nextRefCode(items ?? []) })
    setError('')
  }

  function startEdit(property: Property) {
    setIsNew(false)
    setEditing(property)
    setForm(toForm(property))
    setError('')
  }

  function stopEditing() {
    setEditing(null)
    setIsNew(false)
    setForm(emptyResidenceForm)
    setError('')
  }

  async function handleSave() {
    setError('')
    const problem = validate(form)
    if (problem) {
      setError(problem)
      return
    }
    setSaving(true)
    try {
      await saveProperty(toInput(form), editing)
      await load()
      stopEditing()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(property: Property) {
    if (!confirm(`Delete "${property.title}" (${property.refCode})? This cannot be undone.`)) return
    try {
      await deleteProperty(property.slug)
      await load()
      if (editing?.slug === property.slug) stopEditing()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  // Featured is the one decision worth a single click: it drives the home page band.
  async function toggleFeatured(property: Property) {
    setError('')
    try {
      const flipped = { ...toForm(property), featured: !property.featured }
      await saveProperty(toInput(flipped), property)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update.')
    }
  }

  const isEditing = editing !== null || isNew
  const needle = normaliseText(query)
  const visible = (items ?? []).filter((property) => {
    if (statusFilter !== 'all' && property.status !== statusFilter) return false
    if (!needle) return true
    return normaliseText(`${property.title} ${property.refCode} ${property.area} ${property.district ?? ''}`).includes(needle)
  })

  if (!isEditing) {
    return (
      <>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, reference or area"
              aria-label="Search residences"
              className={`${controlCls} w-64 py-2 text-[13px]`}
            />
            <div className="flex items-center gap-1">
              {(['all', 'published', 'draft'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatusFilter(option)}
                  aria-pressed={statusFilter === option}
                  className={`${btnCls} ${statusFilter === option ? 'border-ink bg-ink text-cream' : ''}`}
                >
                  {option === 'all' ? `All ${items ? `(${items.length})` : ''}` : option}
                </button>
              ))}
            </div>
          </div>
          <button onClick={startNew} className={primaryBtnCls}>
            + New residence
          </button>
        </div>

        {error && <p className="micro mt-4 text-oxblood">{error}</p>}

        <div className="mt-6 divide-y divide-hairline border-y border-hairline">
          {items === null && <p className="py-8 text-sm text-taupe">Loading…</p>}
          {items !== null && items.length === 0 && (
            <p className="py-8 text-sm text-taupe">No residences yet. Create the first one.</p>
          )}
          {items !== null && items.length > 0 && visible.length === 0 && (
            <p className="py-8 text-sm text-taupe">Nothing matches that search.</p>
          )}
          {visible.map((property) => (
            <div key={property.slug} className={rowCls}>
              <div className="flex min-w-0 items-center gap-4">
                {property.images[0] ? (
                  <img src={property.images[0].url} alt="" className="h-16 w-24 shrink-0 object-cover" />
                ) : (
                  <span className="h-16 w-24 shrink-0 bg-parchment" aria-hidden />
                )}
                <div className="min-w-0">
                  <p className="font-display uppercase leading-snug">{property.title || '(untitled)'}</p>
                  <p className="micro mt-1 flex flex-wrap items-center gap-3 text-taupe">
                    <span>{property.refCode}</span>
                    <span>{property.area}</span>
                    <span>{formatPrice(property, 'en') ?? 'Price on application'}</span>
                    <span className={property.status === 'published' ? 'text-oxblood' : ''}>● {property.status}</span>
                    {property.availability !== 'available' && (
                      <Badge tone={property.availability === 'sold' ? 'muted' : 'accent'}>
                        {AVAILABILITY_LABELS[property.availability]}
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeatured(property)}
                  aria-pressed={property.featured}
                  title={property.featured ? 'Shown in the home page band' : 'Not in the home page band'}
                  className={`${btnCls} ${property.featured ? 'border-oxblood text-oxblood' : ''}`}
                >
                  {property.featured ? '★ Featured' : '☆ Feature'}
                </button>
                <button onClick={() => startEdit(property)} className={btnCls}>
                  Edit
                </button>
                <button onClick={() => handleDelete(property)} className={`${btnCls} text-oxblood`}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={stopEditing} className={ghostBtnCls}>
            ← Back to list
          </button>
          {editing?.status === 'published' && (
            <Link to={`/property/residences/${editing.slug}`} className={btnCls}>
              View public page →
            </Link>
          )}
        </div>

        <Field id="res-title" label="Title *">
          <input
            id="res-title"
            value={form.title}
            onChange={(event) =>
              setForm((f) => ({
                ...f,
                title: event.target.value,
                slug: isNew ? slugify(event.target.value) : f.slug,
              }))
            }
            placeholder="Villa with sea views, Golden Mile"
            className={controlCls}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="res-slug" label="Slug (URL)">
            <input
              id="res-slug"
              value={form.slug}
              onChange={(event) => set('slug', slugify(event.target.value))}
              placeholder="villa-sea-views-golden-mile"
              className={`${controlCls} font-mono text-xs`}
            />
            <p className={hintCls}>/property/residences/{form.slug || '…'}</p>
          </Field>
          <Field id="res-ref" label="Reference">
            <input
              id="res-ref"
              value={form.refCode}
              onChange={(event) => set('refCode', event.target.value)}
              placeholder="LBA-0427"
              className={controlCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field id="res-type" label="Type">
            <select id="res-type" value={form.type} onChange={(event) => set('type', event.target.value as PropertyType)} className={controlCls}>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {PROPERTY_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="res-operation" label="Operation">
            <select
              id="res-operation"
              value={form.operation}
              onChange={(event) => set('operation', event.target.value as Operation)}
              className={controlCls}
            >
              {(['sale', 'rent'] as const).map((operation) => (
                <option key={operation} value={operation}>
                  {OPERATION_LABELS[operation]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="res-availability" label="Availability">
            <select
              id="res-availability"
              value={form.availability}
              onChange={(event) => set('availability', event.target.value as Availability)}
              className={controlCls}
            >
              {(['available', 'reserved', 'sold'] as const).map((availability) => (
                <option key={availability} value={availability}>
                  {AVAILABILITY_LABELS[availability]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="res-area" label="Area">
            <select id="res-area" value={form.area} onChange={(event) => set('area', event.target.value)} className={controlCls}>
              {PROPERTY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </Field>
          <Field id="res-district" label="District / urbanisation" hint="Free text, shown as published — the exact address is never public.">
            <input
              id="res-district"
              value={form.district}
              onChange={(event) => set('district', event.target.value)}
              placeholder="Golden Mile"
              className={controlCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="res-price" label="Price (€)" hint="Leave empty for “price on application”.">
            <input
              id="res-price"
              type="number"
              inputMode="numeric"
              min={0}
              step={50000}
              value={form.price}
              onChange={(event) => set('price', event.target.value)}
              className={controlCls}
            />
          </Field>
          <Field id="res-price-label" label="Price qualifier">
            <select
              id="res-price-label"
              value={form.priceLabel}
              onChange={(event) => set('priceLabel', event.target.value as ResidenceForm['priceLabel'])}
              className={controlCls}
            >
              <option value="fixed">Fixed price</option>
              <option value="from">From</option>
              <option value="reduced">Reduced</option>
            </select>
          </Field>
          <Field id="res-energy" label="Energy rating">
            <input
              id="res-energy"
              value={form.energyRating}
              onChange={(event) => set('energyRating', event.target.value)}
              placeholder="B"
              className={controlCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="res-beds" label="Bedrooms">
            <input id="res-beds" type="number" min={0} value={form.beds} onChange={(event) => set('beds', event.target.value)} className={controlCls} />
          </Field>
          <Field id="res-baths" label="Bathrooms">
            <input id="res-baths" type="number" min={0} value={form.baths} onChange={(event) => set('baths', event.target.value)} className={controlCls} />
          </Field>
          <Field id="res-year" label="Year built">
            <input id="res-year" type="number" min={1800} max={2100} value={form.yearBuilt} onChange={(event) => set('yearBuilt', event.target.value)} className={controlCls} />
          </Field>
          <Field id="res-build" label="Built area (m²)">
            <input id="res-build" type="number" min={0} value={form.buildArea} onChange={(event) => set('buildArea', event.target.value)} className={controlCls} />
          </Field>
          <Field id="res-terrace" label="Terrace (m²)">
            <input id="res-terrace" type="number" min={0} value={form.terraceArea} onChange={(event) => set('terraceArea', event.target.value)} className={controlCls} />
          </Field>
          <Field id="res-plot" label="Plot (m²)">
            <input id="res-plot" type="number" min={0} value={form.plotArea} onChange={(event) => set('plotArea', event.target.value)} className={controlCls} />
          </Field>
        </div>

        <Field id="res-excerpt" label="Short description (cards, listings and search engines)">
          <textarea
            id="res-excerpt"
            value={form.excerpt}
            onChange={(event) => set('excerpt', event.target.value)}
            rows={2}
            maxLength={180}
            placeholder="One or two sentences for the card…"
            className={controlCls}
          />
          <p className={`${hintCls} text-right`}>{form.excerpt.length}/180</p>
        </Field>

        <Field
          id="res-description"
          label="Description (Markdown)"
          hint="## Heading, **bold**, *italic*, - list, > quote, [link](https://…)"
        >
          <textarea
            id="res-description"
            value={form.descriptionMarkdown}
            onChange={(event) => set('descriptionMarkdown', event.target.value)}
            rows={14}
            placeholder={'## About this residence\n\nWrite the description here…\n\n- first point\n- second point'}
            className={`${controlCls} font-mono text-xs leading-relaxed`}
          />
        </Field>

        <fieldset>
          <legend className={labelCls}>Features</legend>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_FEATURES.map((feature) => {
              const on = form.features.includes(feature)
              return (
                <button
                  key={feature}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    set('features', on ? form.features.filter((f) => f !== feature) : [...form.features, feature])
                  }
                  className={`micro min-h-10 border px-3 text-[10px] transition-colors ${
                    on ? 'border-oxblood text-oxblood' : 'border-hairline bg-white text-taupe hover:border-taupe hover:text-ink'
                  }`}
                >
                  {feature}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div>
          <p className={labelCls}>Photographs</p>
          <ImageManager
            images={form.images}
            scope={form.slug || 'draft'}
            onChange={(images) => set('images', images)}
            onError={setError}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 border border-hairline bg-parchment/50 p-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => set('featured', event.target.checked)}
              className="h-4 w-4 accent-oxblood"
            />
            <span className="micro text-ink">Featured on the home page</span>
          </label>
          <label className="flex items-center gap-2">
            <span className={hintCls}>Order</span>
            <input
              type="number"
              min={1}
              max={999}
              value={form.featuredRank}
              onChange={(event) => set('featuredRank', event.target.value)}
              aria-label="Featured order"
              className={`${controlCls} w-20 px-2 py-1 text-[13px]`}
            />
          </label>
          <span className={hintCls}>Lower numbers come first in the band.</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 border border-hairline bg-parchment/50 p-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.status === 'published'}
              onChange={(event) => set('status', event.target.checked ? 'published' : 'draft')}
              className="h-4 w-4 accent-oxblood"
            />
            <span className="micro text-ink">Published</span>
          </label>
          <span className={hintCls}>
            {form.status === 'published'
              ? 'Visible at /property/residences and, if featured, on the home page'
              : 'Draft · only signed-in admins can see it'}
          </span>
        </div>

        {error && <p className="micro text-oxblood">{error}</p>}

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className={`${primaryBtnCls} flex-1`}>
            {saving ? 'Saving…' : form.status === 'published' ? 'Save & publish' : 'Save draft'}
          </button>
          <button onClick={stopEditing} className="micro border border-hairline px-6 py-3 hover:bg-parchment">
            Cancel
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className={`${panelCls} sticky top-24`}>
          <p className="micro text-taupe">Card preview</p>
          <div className="mt-4">
            <PropertyCard property={toPreview(form)} />
          </div>
          <p className={hintCls}>
            The card as it appears on the listing. Photographs, price and figures update as you type.
          </p>
        </div>
      </div>
    </div>
  )
}
