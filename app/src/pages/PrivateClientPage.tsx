import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/icons'
import { PageHero } from '../components/shared/PageHero'
import { CtaBand } from '../components/shared/CtaBand'
import { ServiceCard } from '../components/ui/ServiceCard'
import { Checklist } from '../components/ui/Checklist'
import { ButtonLink } from '../components/ui/ButtonLink'
import { hero, contactPoints, services, featureSplit, partners, cta } from '../data/privateClient'

function ContactPoints() {
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <p className="micro mb-3 text-center text-ink">{contactPoints.heading}</p>
        <p className="font-display mb-12 text-center text-sm italic text-taupe md:text-base">
          {contactPoints.subline}
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactPoints.items.map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <Icon name={c.icon} />
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink">{c.title}</h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-taupe">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="micro mb-10 text-center text-ink">Our Private Client Services</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function FeatureSplit() {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid lg:grid-cols-2">
          <div className="h-72 lg:h-full">
            <img src={featureSplit.image} alt={featureSplit.alt} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center bg-parchment px-8 py-12 md:px-12">
            <p className="micro text-ink">{featureSplit.eyebrow}</p>
            <h2 className="font-display mt-4 text-2xl uppercase leading-snug md:text-3xl">{featureSplit.heading}</h2>
            <p className="mt-4 text-[13px] text-taupe">{featureSplit.body}</p>
            <div className="mt-6">
              <Checklist items={featureSplit.checks} columns={2} />
            </div>
            <p className="font-display mt-6 text-sm italic text-taupe">{featureSplit.note}</p>
            <div className="mt-8 self-start">
              <ButtonLink to={featureSplit.cta.to}>{featureSplit.cta.label}</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TrustedNetwork() {
  return (
    <section className="bg-parchment py-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="micro text-ink">{partners.heading}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-taupe">{partners.body}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {partners.list.map((p) => (
              <span key={p} className="text-center text-[10px] uppercase leading-snug tracking-[0.18em] text-ink/70 transition-colors hover:text-oxblood">
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export function PrivateClientPage() {
  return (
    <>
      <PageHero {...hero} />
      <ContactPoints />
      <ServicesGrid />
      <FeatureSplit />
      <TrustedNetwork />
      <CtaBand heading={cta.heading} subline={cta.subline} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} />
    </>
  )
}
