import { useEffect, useState } from 'react'
import { Icon } from '../ui/icons'
import { useLang } from '../../lib/lang'
import { PROPERTY_AREAS, PROPERTY_FEATURES, PROPERTY_TYPES } from '../../lib/properties'
import {
  countActiveFilters,
  formatPrice,
  type ResidenceFilters as Filters,
  type SortKey,
  SORT_KEYS,
} from '../../lib/propertyFilters'
import { labelFor, useResidencesCopy } from '../../lib/residencesCopy'

const controlCls =
  'w-full border border-hairline bg-white px-3 py-2.5 text-[13px] text-ink focus:border-oxblood focus:outline-none transition-colors'
const labelCls = 'micro mb-2 block text-[10px] text-taupe'
const chipCls =
  'inline-flex min-h-9 items-center gap-2 border px-3 text-[10px] uppercase tracking-[0.16em] transition-colors'

// The filter bar. It owns no state beyond the search text and the open/closed
// panel: every change is applied to the URL by the page, so a filtered view is
// shareable and the back button steps through the filters the visitor applied.
export function ResidenceFilters({
  filters,
  count,
  loading = false,
  onPatch,
  onClear,
}: {
  filters: Filters
  count: number
  loading?: boolean
  onPatch: (patch: Partial<Filters>, replace?: boolean) => void
  onClear: () => void
}) {
  const copy = useResidencesCopy()
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState(filters.q)

  // Keep the input in step with the URL (back button, "clear all").
  useEffect(() => {
    setText(filters.q)
  }, [filters.q])

  // Debounced so typing does not rewrite the URL on every keystroke.
  useEffect(() => {
    if (text === filters.q) return
    const timer = setTimeout(() => onPatch({ q: text }, true), 150)
    return () => clearTimeout(timer)
  }, [text, filters.q, onPatch])

  const active = countActiveFilters(filters)

  const chips: { key: string; label: string; patch: Partial<Filters> }[] = []
  if (filters.q.trim()) chips.push({ key: 'q', label: `“${filters.q.trim()}”`, patch: { q: '' } })
  if (filters.operation !== 'any')
    chips.push({
      key: 'operation',
      label: filters.operation === 'rent' ? copy.filters.rent : copy.filters.sale,
      patch: { operation: 'any' },
    })
  if (filters.type !== 'any')
    chips.push({ key: 'type', label: labelFor(copy.types, filters.type), patch: { type: 'any' } })
  if (filters.area !== 'any')
    chips.push({ key: 'area', label: labelFor(copy.areas, filters.area), patch: { area: 'any' } })
  if (filters.beds > 0)
    chips.push({ key: 'beds', label: `${filters.beds}+ ${copy.filters.beds}`, patch: { beds: 0 } })
  if (filters.baths > 0)
    chips.push({ key: 'baths', label: `${filters.baths}+ ${copy.filters.baths}`, patch: { baths: 0 } })
  const minPrice = formatPrice({ price: filters.priceMin }, lang)
  if (minPrice) chips.push({ key: 'priceMin', label: `≥ ${minPrice}`, patch: { priceMin: 0 } })
  const maxPrice = formatPrice({ price: filters.priceMax }, lang)
  if (maxPrice) chips.push({ key: 'priceMax', label: `≤ ${maxPrice}`, patch: { priceMax: 0 } })
  if (filters.minBuild > 0)
    chips.push({ key: 'minBuild', label: `≥ ${filters.minBuild} m²`, patch: { minBuild: 0 } })
  if (filters.availability !== 'all')
    chips.push({
      key: 'availability',
      label: copy.availability[filters.availability],
      patch: { availability: 'all' },
    })
  for (const feature of filters.features)
    chips.push({
      key: `feature:${feature}`,
      label: labelFor(copy.features, feature),
      patch: { features: filters.features.filter((f) => f !== feature) },
    })

  const toggleFeature = (feature: string) =>
    onPatch({
      features: filters.features.includes(feature)
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    })

  return (
    <div className="sticky top-14 z-30 border-y border-hairline bg-cream/95 backdrop-blur-sm lg:top-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-4 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[200px] flex-1">
            <label className="sr-only" htmlFor="residence-search">
              {copy.search.label}
            </label>
            <input
              id="residence-search"
              type="search"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={copy.search.placeholder}
              className={`${controlCls} placeholder:text-taupe/70`}
            />
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="residence-filters"
            className={`${chipCls} min-h-11 ${
              open || active > 0 ? 'border-ink bg-ink text-cream' : 'border-hairline bg-white text-ink hover:bg-parchment'
            }`}
          >
            <Icon name="sliders" className="h-4 w-4 !text-current" />
            {copy.filters.toggle}
            {active > 0 && <span aria-hidden>· {active}</span>}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="micro text-[10px] text-taupe" aria-live="polite">
            {loading ? copy.results.loading : `${count} ${count === 1 ? copy.results.one : copy.results.many}`}
          </p>
          <label className="flex items-center gap-2">
            <span className="micro text-[10px] text-taupe">{copy.sort.label}</span>
            <select
              value={filters.sort}
              onChange={(event) => onPatch({ sort: event.target.value as SortKey })}
              className="border border-hairline bg-white px-2 py-2 text-[11px] uppercase tracking-[0.16em] text-ink focus:border-oxblood focus:outline-none"
            >
              {SORT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {copy.sort[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {open && (
          <div id="residence-filters" className="mt-4 border-t border-hairline bg-parchment/40 p-4 md:p-5">
            <p className="micro mb-4 text-[10px] text-ink">{copy.filters.panel}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelCls} htmlFor="filter-operation">
                  {copy.filters.operation}
                </label>
                <select
                  id="filter-operation"
                  value={filters.operation}
                  onChange={(event) => onPatch({ operation: event.target.value as Filters['operation'] })}
                  className={controlCls}
                >
                  <option value="any">{copy.filters.anyOperation}</option>
                  <option value="sale">{copy.filters.sale}</option>
                  <option value="rent">{copy.filters.rent}</option>
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-type">
                  {copy.filters.type}
                </label>
                <select
                  id="filter-type"
                  value={filters.type}
                  onChange={(event) => onPatch({ type: event.target.value as Filters['type'] })}
                  className={controlCls}
                >
                  <option value="any">{copy.filters.anyType}</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {labelFor(copy.types, type)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-area">
                  {copy.filters.area}
                </label>
                <select
                  id="filter-area"
                  value={filters.area}
                  onChange={(event) => onPatch({ area: event.target.value })}
                  className={controlCls}
                >
                  <option value="any">{copy.filters.anyArea}</option>
                  {PROPERTY_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {labelFor(copy.areas, area)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-beds">
                  {copy.filters.beds}
                </label>
                <select
                  id="filter-beds"
                  value={filters.beds}
                  onChange={(event) => onPatch({ beds: Number(event.target.value) })}
                  className={controlCls}
                >
                  <option value={0}>{copy.filters.anyBeds}</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-baths">
                  {copy.filters.baths}
                </label>
                <select
                  id="filter-baths"
                  value={filters.baths}
                  onChange={(event) => onPatch({ baths: Number(event.target.value) })}
                  className={controlCls}
                >
                  <option value={0}>{copy.filters.anyBeds}</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-availability">
                  {copy.filters.availability}
                </label>
                <select
                  id="filter-availability"
                  value={filters.availability}
                  onChange={(event) => onPatch({ availability: event.target.value as Filters['availability'] })}
                  className={controlCls}
                >
                  <option value="all">{copy.filters.anyAvailability}</option>
                  <option value="available">{copy.availability.available}</option>
                  <option value="reserved">{copy.availability.reserved}</option>
                  <option value="sold">{copy.availability.sold}</option>
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-price-min">
                  {copy.filters.priceMin}
                </label>
                <input
                  id="filter-price-min"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={50000}
                  value={filters.priceMin || ''}
                  onChange={(event) => onPatch({ priceMin: Number(event.target.value) })}
                  className={controlCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-price-max">
                  {copy.filters.priceMax}
                </label>
                <input
                  id="filter-price-max"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={50000}
                  value={filters.priceMax || ''}
                  onChange={(event) => onPatch({ priceMax: Number(event.target.value) })}
                  className={controlCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="filter-min-build">
                  {copy.filters.minBuild}
                </label>
                <input
                  id="filter-min-build"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={10}
                  value={filters.minBuild || ''}
                  onChange={(event) => onPatch({ minBuild: Number(event.target.value) })}
                  className={controlCls}
                />
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className={labelCls}>{copy.filters.features}</legend>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_FEATURES.map((feature) => {
                  const on = filters.features.includes(feature)
                  return (
                    <button
                      key={feature}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleFeature(feature)}
                      className={`${chipCls} min-h-10 ${
                        on ? 'border-oxblood text-oxblood' : 'border-hairline bg-white text-taupe hover:border-taupe hover:text-ink'
                      }`}
                    >
                      {labelFor(copy.features, feature)}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {active > 0 && (
              <button
                type="button"
                onClick={onClear}
                className={`${chipCls} mt-6 min-h-11 border-ink bg-white text-ink hover:bg-ink hover:text-cream`}
              >
                {copy.filters.clear}
              </button>
            )}
          </div>
        )}

        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-hairline pt-3">
            <span className="micro text-[10px] text-taupe">{copy.active.label}</span>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => onPatch(chip.patch)}
                aria-label={`${copy.active.remove}: ${chip.label}`}
                className={`${chipCls} min-h-9 border-hairline bg-white text-ink hover:border-oxblood hover:text-oxblood`}
              >
                {chip.label}
                <span aria-hidden>×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={onClear}
              className="micro ml-1 text-[10px] text-taupe underline underline-offset-4 hover:text-oxblood"
            >
              {copy.filters.clear}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
