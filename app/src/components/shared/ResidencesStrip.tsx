import { ArrowLink } from '../ui/ArrowLink'
import { Container } from '../ui/Container'
import { PropertyCard } from '../ui/PropertyCard'
import { useUi } from '../../lib/nav'

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
  const ui = useUi()
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-8 flex items-baseline justify-between">
          <p className="micro text-[11px] text-ink">{ui.selectedResidences}</p>
          {allLink && <ArrowLink to={allLink}>{ui.viewAllProperties}</ArrowLink>}
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
