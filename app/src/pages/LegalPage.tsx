import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/icons'
import { ArrowLink } from '../components/ui/ArrowLink'
import { PageHero } from '../components/shared/PageHero'
import { StatementBand } from '../components/ui/StatementBand'
import { ValueItem } from '../components/ui/ValueItem'
import { ServiceCard } from '../components/ui/ServiceCard'
import { CrossLinkBand } from '../components/shared/CrossLinkBand'
import { CtaBand } from '../components/shared/CtaBand'
import { ButtonLink } from '../components/ui/ButtonLink'
import { useLang } from '../lib/lang'
import { hero, statement, pillars, areas, practice, cta } from '../data/legal'
import { fr, es } from '../data/locales/legal'

function useLegalData() {
  const { lang } = useLang()
  if (lang === 'fr') return { hero: fr.hero, statement: fr.statement, pillars: fr.pillars, areas: fr.areas, practice: fr.practice, cta: fr.cta }
  if (lang === 'es') return { hero: es.hero, statement: es.statement, pillars: es.pillars, areas: es.areas, practice: es.practice, cta: es.cta }
  return { hero, statement, pillars, areas, practice, cta }
}

function Pillars() {
  const { pillars } = useLegalData()
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <ValueItem key={p.title} icon={p.icon} title={p.title} body={p.body} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function AdviceGrid() {
  const { areas } = useLegalData()
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <p className="micro mb-10 text-center text-ink">Our Areas of Legal Advice</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <ServiceCard key={a.title} {...a} link="/inquiry" />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function LegalPage() {
  const { hero, statement, practice, cta } = useLegalData()
  return (
    <>
      <PageHero {...hero} />
      <StatementBand>{statement}</StatementBand>
      <Pillars />
      <AdviceGrid />
      <CrossLinkBand
        left={
          <div>
            <p className="micro text-ink">{practice.eyebrow}</p>
            <h2 className="font-display mt-4 text-2xl uppercase leading-snug">{practice.heading}</h2>
            <p className="mt-4 text-[13px] text-taupe">{practice.body}</p>
            <div className="mt-8">
              <ButtonLink to={practice.cta.to} variant="outline">
                {practice.cta.label}
              </ButtonLink>
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
            <ul>
              {practice.right.map((row) => (
                <li key={row.title} className="flex items-start gap-4 border-t border-hairline py-4">
                  <Icon name={row.icon} />
                  <div>
                    <h3 className="micro text-ink">{row.title}</h3>
                    <p className="mt-1 text-[11px] text-taupe">{row.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <ArrowLink to="/about">Meet the team</ArrowLink>
            </div>
          </div>
        }
      />
      <CtaBand heading={cta.heading} subline={cta.subline} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} />
    </>
  )
}
