import { Container } from '../components/ui/Container'
import { PageHero } from '../components/shared/PageHero'
import { CtaBand } from '../components/shared/CtaBand'
import { ValueItem } from '../components/ui/ValueItem'
import { useLang } from '../lib/lang'
import { hero, assist, cta } from '../data/lifestyle'
import { fr, es } from '../data/locales/lifestyle'

function useLifeData() {
  const { lang } = useLang()
  if (lang === 'fr') {
    return { hero: { ...fr.hero, image: hero.image }, assist: fr.assist, cta: { ...fr.cta, image: cta.image } }
  }
  if (lang === 'es') {
    return { hero: { ...es.hero, image: hero.image }, assist: es.assist, cta: { ...es.cta, image: cta.image } }
  }
  return { hero, assist, cta }
}

function AssistRow() {
  const { assist } = useLifeData()
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-display mb-2 text-center text-xl uppercase tracking-[0.12em]">How We Can Assist</p>
        <div className="mx-auto mb-10 h-px w-8 bg-oxblood" />
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-5">
          {assist.map((a) => (
            <ValueItem key={a.title} icon={a.icon} title={a.title} body={a.body} />
          ))}
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
      {/* ponytail: InsiderAccess removed per spec p12 — "quita todo esto... tengo q verlo con mama" */}
      <CtaBand heading={cta.heading} subline={cta.subline} image={cta.image} cta={{ to: '/inquiry', label: 'Tell us what you are looking for' }} tone="light" />
    </>
  )
}
