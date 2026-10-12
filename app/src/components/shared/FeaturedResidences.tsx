import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from '../ui/Carousel'
import { Container } from '../ui/Container'
import { ArrowLink } from '../ui/ArrowLink'
import { cachedProperties, loadPublishedProperties, type Property } from '../../lib/properties'
import { featuredResidences, formatArea, formatPrice } from '../../lib/propertyFilters'
import { labelFor, useResidencesCopy } from '../../lib/residencesCopy'
import { useLang } from '../../lib/lang'
import { useUi } from '../../lib/nav'
import { prefersReducedMotion } from '../../lib/motion'

const SLIDES = 5

// The home page band: full-bleed photographs, one residence at a time, with the
// figure of each residence over the image. It renders nothing when there is
// nothing to show, and it is mounted lazily from HomePage so the photographs and
// the Firestore chunk never compete with the hero for the first paint.
export function FeaturedResidences() {
  const copy = useResidencesCopy()
  const ui = useUi()
  const { lang } = useLang()
  const [items, setItems] = useState<Property[]>(() => featuredResidences(cachedProperties(), SLIDES))
  const [index, setIndex] = useState(0)
  const reduceMotion = prefersReducedMotion()

  useEffect(() => {
    let cancelled = false
    loadPublishedProperties()
      .then((all) => {
        if (!cancelled) setItems(featuredResidences(all, SLIDES))
      })
      .catch(() => {
        /* no data, no band */
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (items.length === 0) return null

  return (
    <section className="bg-ink">
      <Carousel
        items={items}
        ariaLabel={copy.featured.eyebrow}
        labels={{
          previous: copy.gallery.previous,
          next: copy.gallery.next,
          pause: copy.gallery.pause,
          play: copy.gallery.play,
        }}
        autoplayMs={7000}
        pauseControl
        loop
        counter
        index={index}
        onIndexChange={setIndex}
        className="h-[70svh] min-h-[460px] md:h-[78svh]"
        trackClassName="h-full"
        itemClassName="basis-full h-full"
        renderItem={(property, slideIndex) => {
          const cover = property.images[0]
          const price = formatPrice(property, lang)
          const qualifier =
            property.priceLabel === 'from'
              ? copy.card.from
              : property.priceLabel === 'reduced'
                ? copy.card.reduced
                : null
          const facts = [
            labelFor(copy.areas, property.area),
            property.district,
            labelFor(copy.types, property.type),
            property.beds ? `${property.beds} ${copy.card.bed}` : null,
            property.baths ? `${property.baths} ${copy.card.bath}` : null,
            formatArea(property.buildArea, lang),
          ].filter((fact): fact is string => Boolean(fact))
          const href = `/property/residences/${property.slug}`
          // The active slide drifts slowly outward, for the sake of the band being
          // the liveliest thing on a quiet page — unless motion is unwelcome.
          const drift = slideIndex === index && !reduceMotion

          return (
            <div className="relative h-full w-full">
              {cover ? (
                <img
                  src={cover.url}
                  alt={cover.alt ?? property.title}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-transform ease-out ${
                    drift ? 'scale-[1.04] duration-[7000ms]' : 'scale-100 duration-700'
                  }`}
                />
              ) : (
                <div className="h-full w-full bg-ink" aria-hidden />
              )}
              <div className="absolute inset-0 bg-ink/40" aria-hidden />

              <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-28">
                <Container>
                  {/* One link, one tab stop: the whole overlay opens the residence and
                      the button is its visual affordance; "View all properties" is the
                      only other link because it goes somewhere else. */}
                  <div className="max-w-[42ch]">
                    <Link to={href} className="group block">
                      <p className="micro text-[10px] text-cream/70">{copy.featured.eyebrow}</p>
                      <h2 className="font-display mt-3 text-3xl uppercase leading-[1.1] tracking-wide text-cream transition-colors group-hover:text-cream/80 md:text-5xl">
                        {property.title}
                      </h2>
                      {facts.length > 0 && (
                        <p className="micro mt-4 text-[10px] text-cream/80">{facts.join(' · ')}</p>
                      )}
                      <p className="font-display mt-4 text-2xl leading-tight text-cream md:text-3xl">
                        {qualifier && <span className="text-cream/70">{qualifier} </span>}
                        {price ?? copy.card.priceOnApplication}
                      </p>
                      <span className="micro mt-6 inline-flex min-h-11 items-center gap-3 bg-oxblood px-8 py-3 text-cream transition-colors group-hover:bg-cream group-hover:text-ink">
                        {copy.card.view}
                      </span>
                    </Link>
                    <div className="mt-6">
                      <ArrowLink to="/property/residences" className="!text-cream hover:!text-cream/80">
                        {ui.viewAllProperties}
                      </ArrowLink>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          )
        }}
      />
    </section>
  )
}
