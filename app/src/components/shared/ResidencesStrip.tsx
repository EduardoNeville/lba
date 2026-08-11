import { ArrowLink } from '../ui/ArrowLink'
import { Container } from '../ui/Container'
import { PropertyCard } from '../ui/PropertyCard'

export interface Residence {
  image?: string
  alt?: string
  title: string
  meta: string
  slug: string
}

export function ResidencesStrip({
  residences,
  showLink = false,
  allLink,
}: {
  residences: Residence[]
  showLink?: boolean
  allLink?: string
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-8 flex items-baseline justify-between">
          <p className="micro text-[11px] text-ink">Selected Residences</p>
          {allLink && <ArrowLink to={allLink}>View all properties</ArrowLink>}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {residences.map((r) => (
            <PropertyCard key={r.title} {...r} showLink={showLink} />
          ))}
        </div>
      </Container>
    </section>
  )
}
