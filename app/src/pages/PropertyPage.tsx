import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/icons'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHero } from '../components/shared/PageHero'
import { ResidencesStrip } from '../components/shared/ResidencesStrip'
import { CrossLinkBand } from '../components/shared/CrossLinkBand'
import { CtaBand } from '../components/shared/CtaBand'
import { Checklist } from '../components/ui/Checklist'
import { useLang } from '../lib/lang'
import { hero, services, residences, crossLink, cta } from '../data/property'
import { fr, es } from '../data/locales/property'

function usePropertyData() {
  const { lang } = useLang()
  if (lang === 'fr') {
    return { hero: { ...fr.hero, image: hero.image }, services: fr.services, residences: fr.residences, crossLink: fr.crossLink, cta: { ...fr.cta, image: cta.image } }
  }
  if (lang === 'es') {
    return { hero: { ...es.hero, image: hero.image }, services: es.services, residences: es.residences, crossLink: es.crossLink, cta: { ...es.cta, image: cta.image } }
  }
  return { hero, services, residences, crossLink, cta }
}

function ServicesTrio() {
  const { services } = usePropertyData()
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 border-t border-hairline pt-12 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title}>
              <Icon name={s.icon} />
              <h2 className="font-display mt-4 text-sm uppercase tracking-[0.2em]">{s.title}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">{s.body}</p>
              {/* ponytail: spec p5 — Enquire ×3 deleted */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function PropertyPage() {
  const { hero, residences, crossLink, cta } = usePropertyData()
  return (
    <>
      <PageHero {...hero} />
      <ServicesTrio />
      <ResidencesStrip residences={residences} showLink allLink="/property" />
      <CrossLinkBand
        left={
          <div>
            <p className="micro text-oxblood">{crossLink.left.eyebrow}</p>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug">{crossLink.left.heading}</h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">{crossLink.left.body}</p>
            <div className="mt-5">
              <Checklist items={crossLink.left.checks} />
            </div>
            <div className="mt-6">
              <ArrowLink to={crossLink.left.link.to}>{crossLink.left.link.label}</ArrowLink>
            </div>
          </div>
        }
        center={
          <img src={cta.image} alt="" aria-hidden className="hidden h-full w-full object-cover lg:block" />
        }
        right={
          <div>
            <p className="micro text-oxblood">{crossLink.right.eyebrow}</p>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug">{crossLink.right.heading}</h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">{crossLink.right.body}</p>
            <div className="mt-5">
              <Checklist items={crossLink.right.checks} />
            </div>
            <div className="mt-6">
              <ArrowLink to={crossLink.right.link.to}>{crossLink.right.link.label}</ArrowLink>
            </div>
          </div>
        }
      />
      <CtaBand heading={cta.heading} subline={cta.subline} image={cta.image} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} tone="light" />
    </>
  )
}
