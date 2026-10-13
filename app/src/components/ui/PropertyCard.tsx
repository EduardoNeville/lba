import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { useLang } from '../../lib/lang'
import type { Property } from '../../lib/properties'
import { formatArea, formatPrice, publishedSeconds } from '../../lib/propertyFilters'
import { labelFor, useResidencesCopy } from '../../lib/residencesCopy'

const NEW_FOR_SECONDS = 30 * 24 * 60 * 60

// Takes the whole residence: a card shows the cover, the location, the headline
// figures and the price, all of which come from one document. The card is a single
// link (one tab stop) — the "view residence" line is a decorative span, never a
// nested anchor.
export function PropertyCard({
  property,
  showLink = false,
  priority = false,
}: {
  property: Property
  showLink?: boolean
  priority?: boolean
}) {
  const copy = useResidencesCopy()
  const { lang } = useLang()
  const cover = property.images[0]
  const area = labelFor(copy.areas, property.area)
  const type = labelFor(copy.types, property.type)
  const price = formatPrice(property, lang)
  const qualifier =
    property.priceLabel === 'from' ? copy.card.from : property.priceLabel === 'reduced' ? copy.card.reduced : null
  const specs = [
    property.beds ? `${property.beds} ${copy.card.bed}` : null,
    property.baths ? `${property.baths} ${copy.card.bath}` : null,
    formatArea(property.buildArea, lang),
  ].filter((s): s is string => Boolean(s))

  const status = property.availability !== 'available' ? copy.availability[property.availability] : null
  const isNew = !status && Date.now() / 1000 - publishedSeconds(property) < NEW_FOR_SECONDS

  return (
    <Link to={`/property/residences/${property.slug}`} className="group flex flex-col">
      <div className="relative overflow-hidden bg-parchment">
        {cover ? (
          <img
            /* The small rendition: a grid of six cards should not download six
               full-screen photographs. Falls back for photographs uploaded before
               the two-rendition pipeline. */
            src={cover.cardUrl || cover.url}
            alt={cover.alt || `${property.title}, ${area}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[4/3] w-full" aria-hidden />
        )}
        {(status || isNew) && (
          <div className="absolute left-3 top-3 flex gap-2">
            {status && <Badge tone={property.availability === 'sold' ? 'muted' : 'accent'}>{status}</Badge>}
            {isNew && <Badge>{copy.badge.new}</Badge>}
          </div>
        )}
      </div>
      <span className="micro mt-3 block text-[11px] text-ink">{property.title}</span>
      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-taupe">
        {[area, property.district, type].filter(Boolean).join(' · ')}
      </p>
      {specs.length > 0 && <p className="mt-2 text-[11px] text-taupe">{specs.join(' · ')}</p>}
      <p className="font-display mt-2 text-[15px] uppercase leading-snug tracking-[0.06em] text-ink">
        {qualifier && <span className="text-taupe">{qualifier} </span>}
        {price ?? copy.card.priceOnApplication}
      </p>
      {showLink && (
        <span
          aria-hidden
          className="micro mt-3 inline-flex items-center gap-2 text-[11px] text-ink transition-colors group-hover:text-oxblood"
        >
          {copy.card.view} →
        </span>
      )}
    </Link>
  )
}
