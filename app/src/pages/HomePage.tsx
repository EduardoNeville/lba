import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/icons'
import { Container } from '../components/ui/Container'
import { ButtonLink } from '../components/ui/ButtonLink'
import { ResidencesStrip } from '../components/shared/ResidencesStrip'
import { CtaBand } from '../components/shared/CtaBand'
import { useLang } from '../lib/lang'
import { useUi } from '../lib/nav'
import { hero, intro, practiceAreas, residences, cta } from '../data/home'
import { fr, es } from '../data/locales/home'

function useHomeData() {
  const { lang } = useLang()
  const ui = useUi()
  if (lang === 'fr') {
    return {
      hero: { ...fr.hero, image: hero.image },
      intro: fr.intro,
      practiceAreas: fr.practiceAreas.map((p, i) => ({ ...p, to: practiceAreas[i].to, image: practiceAreas[i].image })),
      residences: residences,
      cta: { ...fr.cta, image: cta.image, ctaLabel: ui.inquire },
    }
  }
  if (lang === 'es') {
    return {
      hero: { ...es.hero, image: hero.image },
      intro: es.intro,
      practiceAreas: es.practiceAreas.map((p, i) => ({ ...p, to: practiceAreas[i].to, image: practiceAreas[i].image })),
      residences: residences,
      cta: { ...es.cta, image: cta.image, ctaLabel: ui.inquire },
    }
  }
  return { hero, intro, practiceAreas, residences, cta: { ...cta, ctaLabel: ui.inquire } }
}

function HomeHero() {
  const { hero } = useHomeData()
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream">
      <img src={hero.image} alt={hero.alt} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cream/85 via-cream/35 to-transparent" />
      <div className="px-6 text-center">
        <h1 className="font-display text-4xl uppercase leading-[1.1] tracking-wide text-ink md:text-6xl">
          {hero.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink/75 md:text-[15px]">
          {hero.sub}
        </p>
        <div className="mt-8">
          <ButtonLink to="/about">Discover more →</ButtonLink>
        </div>
      </div>
    </section>
  )
}

function IntroSplit() {
  const { intro } = useHomeData()
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl uppercase md:text-4xl">{intro.heading}</h2>
            <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-taupe">
              {intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-hairline lg:pl-12">
            <Icon name="columns" />
            <p className="micro mt-4 text-[11px] tracking-[0.25em] text-ink">{intro.sideTitle}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-taupe">{intro.sideBody}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PracticeAreas() {
  const { practiceAreas } = useHomeData()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((p) => (
            <Link key={p.num} to={p.to} className="group flex flex-col border border-hairline bg-parchment/60 overflow-hidden">
              <div className="px-5 pt-5">
                <span className="text-[10px] tracking-[0.2em] text-taupe">{p.num}</span>
              </div>
              <h2 className="font-display px-5 pt-3 text-lg uppercase tracking-[0.12em]">{p.title}</h2>
              <ul className="mt-4 px-5">
                {p.items.map((item) => (
                  <li key={item} className="border-t border-hairline py-2 text-[10px] uppercase tracking-[0.18em] text-taupe transition-colors group-hover:text-oxblood">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4" />
              <div className="mt-auto">
                {p.image ? (
                  <img src={p.image} alt="" aria-hidden className="aspect-[3/4] w-full object-fill" />
                ) : (
                  <div className="aspect-[3/4] w-full bg-parchment" aria-hidden />
                )}
              </div>
              <div className="px-5 pb-4 pt-3">
                <span className="micro text-[10px] text-ink group-hover:text-oxblood">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function HomePage() {
  const { residences, cta } = useHomeData()
  return (
    <>
      <HomeHero />
      <IntroSplit />
      <PracticeAreas />
      <ResidencesStrip residences={residences} allLink="/property" />
      <CtaBand variant="accent" heading={cta.heading} subline={cta.subline} image={cta.image} cta={{ to: '/inquiry', label: 'MAKE A PRIVATE INQUIRY' }} />
    </>
  )
}
