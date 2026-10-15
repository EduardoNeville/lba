import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { PropertyCard } from '../components/ui/PropertyCard'
import { ArrowLink } from '../components/ui/ArrowLink'
import { CtaBand } from '../components/shared/CtaBand'
import { ResidenceFilters } from '../components/residences/ResidenceFilters'
import { cachedProperties, loadPublishedProperties, type Property } from '../lib/properties'
import {
  applyFilters,
  parseFilters,
  serializeFilters,
  type ResidenceFilters as Filters,
} from '../lib/propertyFilters'
import { useResidencesCopy } from '../lib/residencesCopy'
import { localeDict } from '../lib/i18n'
import { useLang } from '../lib/lang'
import { en as propertyEn, es as propertyEs, fr as propertyFr } from '../data/locales/property'
import { cta as propertyCta } from '../data/property'

const GRID = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'

// The residences listing. The URL is the filter state: every control writes to the
// query string, so a filtered view can be shared, bookmarked and unwound with the
// back button. Filtering itself happens in memory over one query (lib/properties).
export function ResidencesPage() {
  const copy = useResidencesCopy()
  const { lang } = useLang()
  const [params, setParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(params), [params])

  // Start from whatever is already cached so a client-side navigation (or a reload
  // inside the session) paints the residences instead of a skeleton.
  const [items, setItems] = useState<Property[] | null>(() => {
    const cached = cachedProperties()
    return cached.length > 0 ? cached : null
  })
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadPublishedProperties()
      .then((loaded) => {
        if (!cancelled) setItems(loaded)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Functional update so the callback stays stable and never reads a stale URL:
  // the debounced search in ResidenceFilters depends on this identity.
  const patch = useCallback(
    (next: Partial<Filters>, replace = false) => {
      setParams((prev) => serializeFilters({ ...parseFilters(prev), ...next }), { replace })
    },
    [setParams],
  )

  const clear = useCallback(() => setParams(new URLSearchParams(), { replace: false }), [setParams])

  const results = useMemo(() => (items ? applyFilters(items, filters) : []), [items, filters])

  const propertyCopy = useMemo(
    () => localeDict(propertyEn, lang === 'fr' ? propertyFr : lang === 'es' ? propertyEs : undefined),
    [lang],
  )

  const loading = items === null && !failed

  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          {/* The rule alone — the mockup drops the word above the title. */}
          <span aria-hidden className="block h-px w-8 bg-ink/60" />
          <h1 className="font-display mt-4 max-w-[22ch] text-4xl uppercase leading-[1.08] tracking-wide md:text-5xl">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-prose text-sm leading-relaxed text-taupe md:text-[15px]">{copy.hero.subline}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-taupe md:text-[15px]">{copy.hero.body}</p>
        </Container>
      </section>

      <ResidenceFilters filters={filters} count={results.length} loading={loading} onPatch={patch} onClear={clear} />

      <section className="py-14 md:py-20">
        <Container>
          {failed && <p className="micro text-oxblood">{copy.results.error}</p>}

          {loading && (
            <div className={GRID} aria-hidden>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <div key={n}>
                  <div className="aspect-[4/3] w-full bg-parchment" />
                  <div className="mt-4 h-3 w-3/4 bg-parchment" />
                  <div className="mt-3 h-2.5 w-1/2 bg-parchment" />
                  <div className="mt-3 h-2.5 w-1/3 bg-parchment" />
                </div>
              ))}
            </div>
          )}

          {!loading && !failed && results.length === 0 && (
            <div className="max-w-prose border border-hairline bg-parchment/40 p-8">
              <p className="font-display text-lg uppercase tracking-wide">{copy.results.empty}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">{copy.results.emptyBody}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={clear}
                  className="micro min-h-11 border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-cream"
                >
                  {copy.results.clear}
                </button>
                <ArrowLink to="/inquiry" hitArea>
                  {copy.hero.privateSearch}
                </ArrowLink>
              </div>
            </div>
          )}

          {!loading && !failed && results.length > 0 && (
            <div className={GRID}>
              {results.map((property, index) => (
                <PropertyCard key={property.slug} property={property} showLink priority={index < 3} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaBand
        image={propertyCta.image}
        cta={{ to: '/inquiry', label: propertyCopy.hero.cta.label }}
      />
    </>
  )
}
