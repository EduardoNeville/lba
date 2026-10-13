import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/ButtonLink'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Checklist } from '../components/ui/Checklist'
import { PropertyCard } from '../components/ui/PropertyCard'
import { CtaBand } from '../components/shared/CtaBand'
import { PropertyGallery } from '../components/residences/PropertyGallery'
import { SpecRow } from '../components/residences/SpecRow'
import { cachedProperties, getProperty, type Property } from '../lib/properties'
import { formatDate, formatPrice, similarResidences } from '../lib/propertyFilters'
import { labelFor, useResidencesCopy } from '../lib/residencesCopy'
import { useJsonLd } from '../lib/jsonLd'
import { localeDict } from '../lib/i18n'
import { useLang } from '../lib/lang'
import { useUi } from '../lib/nav'
import { renderMarkdown } from '../lib/markdown'
import { setPageMeta } from '../lib/seo'
import { cta as propertyCta } from '../data/property'
import { en as propertyEn, es as propertyEs, fr as propertyFr } from '../data/locales/property'

// The residence itself, split from the data/404 handling below so it can be
// rendered directly (by the dead-copy audit and by scripts/test-residence-card).
export function ResidenceDetail({ property, similar }: { property: Property; similar: Property[] }) {
  const copy = useResidencesCopy()
  const { lang } = useLang()
  const ui = useUi()
  // The section CTA is the property page's, so both residences pages end the same way.
  const sectionCopy = useMemo(
    () => localeDict(propertyEn, lang === 'fr' ? propertyFr : lang === 'es' ? propertyEs : undefined),
    [lang],
  )

  const price = formatPrice(property, lang)
  const area = labelFor(copy.areas, property.area)
  const type = labelFor(copy.types, property.type)
  const place = [area, property.district].filter(Boolean).join(' · ')
  const published = formatDate(property.publishedAt, lang)
  const qualifier =
    property.priceLabel === 'from' ? copy.card.from : property.priceLabel === 'reduced' ? copy.card.reduced : null
  // Interest and reference travel with the enquiry, so the office knows which
  // residence a message is about without asking.
  const enquiry = `/inquiry?interest=property&ref=${encodeURIComponent(property.refCode)}&subject=${encodeURIComponent(property.title)}`

  return (
    <>
      <div className="border-b border-hairline">
        <Container>
          <div className="py-3">
            <Link to="/property/residences" className="micro text-[10px] text-taupe transition-colors hover:text-oxblood">
              ← {copy.detail.back}
            </Link>
          </div>
        </Container>
      </div>

      {/* One screen of photographs, with the identity of the residence floating over
          the bottom of them on a diffused panel: the brief, the price and the way in. */}
      <PropertyGallery images={property.images} title={property.title}>
        <Container>
          <div className="max-w-[760px] border border-cream/20 bg-ink/35 p-5 backdrop-blur-md md:p-7">
            <div className="flex flex-wrap items-center gap-3">
              {property.availability !== 'available' && (
                <Badge tone={property.availability === 'sold' ? 'muted' : 'accent'}>
                  {copy.availability[property.availability]}
                </Badge>
              )}
              <span className="micro text-[10px] text-cream/80">
                {type} · {copy.detail.reference} {property.refCode}
              </span>
              {place && <span className="micro text-[10px] text-cream/70">{place}</span>}
            </div>

            <h1 className="font-display mt-3 text-3xl uppercase leading-[1.08] tracking-wide text-cream md:text-5xl">
              {property.title}
            </h1>

            {property.excerpt && (
              <p className="font-display mt-3 line-clamp-2 text-[15px] italic leading-relaxed text-cream/85 md:line-clamp-none md:text-[17px]">
                {property.excerpt}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="micro text-[10px] text-cream/70">{copy.detail.price}</p>
                <p className="font-display mt-1 text-2xl leading-tight text-cream md:text-3xl">
                  {qualifier && <span className="text-cream/70">{qualifier} </span>}
                  {price ?? copy.card.priceOnApplication}
                </p>
              </div>
              <ButtonLink to={enquiry}>{copy.detail.enquire}</ButtonLink>
            </div>
          </div>
        </Container>
      </PropertyGallery>

      <section className="py-10 md:py-14">
        <Container>
          <SpecRow property={property} />
        </Container>
      </section>

      <section className="pb-12 md:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {property.descriptionMarkdown && (
              <div>
                <h2 className="micro text-[10px] text-ink">{copy.detail.about}</h2>
                {published && (
                  <p className="micro mt-2 text-[10px] text-taupe">
                    {copy.detail.published} {published}
                  </p>
                )}
                <div
                  className="rich-text mt-2"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(property.descriptionMarkdown) }}
                />
              </div>
            )}
            <div className="space-y-10">
              {property.features.length > 0 && (
                <div>
                  <h2 className="micro text-[10px] text-ink">{copy.detail.features}</h2>
                  <div className="mt-4">
                    <Checklist
                      items={property.features.map((feature) => labelFor(copy.features, feature))}
                      marker="square"
                      columns={1}
                    />
                  </div>
                </div>
              )}
              <div>
                <h2 className="micro text-[10px] text-ink">{copy.detail.location}</h2>
                {place && <p className="mt-3 text-[13px] leading-relaxed text-ink">{place}</p>}
                <p className="mt-2 text-[11px] leading-relaxed text-taupe">{copy.detail.locationNote}</p>
              </div>
            </div>
          </div>

          <p className="micro mt-12 border-t border-hairline pt-6 text-[10px] leading-relaxed text-taupe">
            {copy.detail.legal}
          </p>
        </Container>
      </section>

      {similar.length > 0 && (
        <section className="pb-16 md:pb-24">
          <Container>
            <div className="mb-8 flex flex-col items-start gap-3 border-t border-hairline pt-10 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="micro text-[11px] text-ink">{copy.detail.similar}</p>
              <ArrowLink to="/property/residences" hitArea>
                {ui.viewAllProperties}
              </ArrowLink>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item) => (
                <PropertyCard key={item.slug} property={item} showLink />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand
        heading={sectionCopy.cta.heading}
        subline={sectionCopy.cta.subline}
        image={propertyCta.image}
        cta={{ to: enquiry, label: ui.privateEnquiry }}
      />
    </>
  )
}

// Data, 404s and metadata. Drafts read as missing to the public: the rules only
// return published documents, and a deep link to a draft slug lands on the same
// "not found" state as a typo.
export function ResidencePage() {
  const { slug = '' } = useParams()
  const copy = useResidencesCopy()
  const [state, setState] = useState<{ status: 'loading' | 'ready' | 'missing'; property?: Property; similar: Property[] }>(
    () => {
      const cached = cachedProperties()
      const hit = cached.find((item) => item.slug === slug)
      return hit
        ? { status: 'ready', property: hit, similar: similarResidences(cached, hit) }
        : { status: 'loading', similar: [] }
    },
  )

  useEffect(() => {
    let cancelled = false
    getProperty(slug)
      .then((hit) => {
        if (cancelled) return
        if (!hit) {
          setState({ status: 'missing', similar: [] })
          return
        }
        setState({ status: 'ready', property: hit, similar: similarResidences(cachedProperties(), hit) })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'missing', similar: [] })
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const property = state.property
  useEffect(() => {
    if (property) setPageMeta(`${property.title} · Legal Boutique Advisers`, property.excerpt)
  }, [property])

  const jsonLd = useMemo(
    () =>
      property
        ? {
            '@context': 'https://schema.org',
            '@type': 'Residence',
            name: property.title,
            description: property.excerpt,
            image: property.images.map((image) => image.url),
            numberOfRooms: property.beds,
            numberOfBathroomsTotal: property.baths,
            floorSize: property.buildArea
              ? { '@type': 'QuantitativeValue', value: property.buildArea, unitCode: 'MTK' }
              : undefined,
            address: {
              '@type': 'PostalAddress',
              addressLocality: property.area,
              addressRegion: property.district,
              addressCountry: 'ES',
            },
            ...(property.price
              ? { offers: { '@type': 'Offer', price: property.price, priceCurrency: 'EUR', availability: 'https://schema.org/InStock' } }
              : {}),
          }
        : null,
    [property],
  )
  useJsonLd(jsonLd)

  if (state.status === 'loading') {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm text-taupe">{copy.results.loading}</p>
        </Container>
      </section>
    )
  }

  if (state.status === 'missing' || !property) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <p className="micro text-taupe">{copy.hero.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-[24ch] text-3xl uppercase leading-snug">{copy.detail.notFound}</h1>
          <p className="mt-4 max-w-prose text-[13px] leading-relaxed text-taupe">{copy.detail.notFoundBody}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink to="/property/residences" variant="outline">
              {copy.detail.back}
            </ButtonLink>
            <ArrowLink to="/inquiry" hitArea>
              {copy.hero.privateSearch}
            </ArrowLink>
          </div>
        </Container>
      </section>
    )
  }

  return <ResidenceDetail property={property} similar={state.similar} />
}
