import { ArrowLink } from '../ui/ArrowLink'
import { Container } from '../ui/Container'
import { PropertyCard } from '../ui/PropertyCard'
import type { Property } from '../../lib/properties'
import { useUi } from '../../lib/nav'

// The four-up strip used by the property page. Renders nothing when there is
// nothing to show, rather than a heading above an empty grid.
export function ResidencesStrip({
  properties,
  showLink = false,
  allLink,
}: {
  properties: Property[]
  showLink?: boolean
  allLink?: string
}) {
  const ui = useUi()
  if (properties.length === 0) return null

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="micro text-[11px] text-ink">{ui.selectedResidences}</p>
          {allLink && (
            <ArrowLink to={allLink} hitArea>
              {ui.viewAllProperties}
            </ArrowLink>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.slug} property={property} showLink={showLink} />
          ))}
        </div>
      </Container>
    </section>
  )
}
