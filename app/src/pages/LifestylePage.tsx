import { Container } from '../components/ui/Container'
import { PageHero } from '../components/shared/PageHero'
import { CtaBand } from '../components/shared/CtaBand'
import { ValueItem } from '../components/ui/ValueItem'
import { Checklist } from '../components/ui/Checklist'
import { MosaicGrid } from '../components/ui/MosaicGrid'
import { useLang } from '../lib/lang'
import { hero, assist, access, mosaic, cta } from '../data/lifestyle'
import { fr, es } from '../data/locales/lifestyle'

function useLifeData() {
  const { lang } = useLang()
  if (lang === 'fr') {
    return { hero: { ...fr.hero, image: hero.image }, assist: fr.assist, access: fr.access, cta: { ...fr.cta, image: cta.image } }
  }
  if (lang === 'es') {
    return { hero: { ...es.hero, image: hero.image }, assist: es.assist, access: es.access, cta: { ...es.cta, image: cta.image } }
  }
  return { hero, assist, access, cta }
}

function AssistRow() {
  const { assist } = useLifeData()
  return (
    <section className="pt-16 md:pt-24">
      <Container>
        <p className="micro mb-12 text-center text-ink">How We Can Assist</p>
        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-3 lg:grid-cols-5">
          {assist.map((a) => (
            <ValueItem key={a.title} icon={a.icon} title={a.title} body={a.body} link={a.link} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function InsiderAccess() {
  const { access } = useLifeData()
  return (
    <section className="py-20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="micro text-ink">{access.heading}</p>
            <p className="mt-4 max-w-prose text-[13px] leading-relaxed text-taupe">{access.body}</p>
            <div className="mt-6">
              <Checklist items={access.checks} marker="check" />
            </div>
          </div>
          <MosaicGrid images={mosaic.filter((m) => m.src)} />
        </div>
      </Container>
    </section>
  )
}

export function LifestylePage() {
  const { hero, cta } = useLifeData()
  return (
    <>
      <PageHero {...hero} />
      <AssistRow />
      <InsiderAccess />
      <CtaBand heading={cta.heading} subline={cta.subline} image={cta.image} cta={{ to: '/inquiry', label: 'Tell us what you are looking for' }} tone="light" />
    </>
  )
}
