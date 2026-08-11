import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/icons'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHero } from '../components/shared/PageHero'
import { ResidencesStrip } from '../components/shared/ResidencesStrip'
import { CrossLinkBand } from '../components/shared/CrossLinkBand'
import { CtaBand } from '../components/shared/CtaBand'
import { Checklist } from '../components/ui/Checklist'
import { hero, services, residences, crossLink, cta } from '../data/property'

function ServicesTrio() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 border-t border-hairline pt-12 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title}>
              <Icon name={s.icon} />
              <h2 className="font-display mt-4 text-sm uppercase tracking-[0.2em]">{s.title}</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">{s.body}</p>
              <div className="mt-5">
                <ArrowLink to={s.link}>Enquire</ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function PropertyPage() {
  return (
    <>
      <PageHero {...hero} />
      <ServicesTrio />
      <ResidencesStrip residences={residences} showLink allLink="/property" />
      <CrossLinkBand
        left={
          <div>
            <p className="micro text-ink">{crossLink.left.eyebrow}</p>
            <h2 className="font-display mt-4 text-2xl uppercase leading-snug">{crossLink.left.heading}</h2>
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
          <div aria-hidden className="hidden lg:block">
            <div className="aspect-[3/4] w-full bg-parchment" />
          </div>
        }
        right={
          <div>
            <p className="micro text-ink">{crossLink.right.eyebrow}</p>
            <h2 className="font-display mt-4 text-2xl uppercase leading-snug">{crossLink.right.heading}</h2>
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
