import { Eyebrow } from '../components/ui/Eyebrow'
import { Container } from '../components/ui/Container'
import { ValueItem } from '../components/ui/ValueItem'
import { CtaBand } from '../components/shared/CtaBand'
import { useLang } from '../lib/lang'
import { team, values } from '../data/team'
import { fr, es } from '../data/locales/about'
import ctaCoast from '../assets/cta-coast.jpg'

function useAboutData() {
  const { lang } = useLang()
  if (lang === 'fr') return fr
  if (lang === 'es') return es
  return {
    hero: {
      eyebrow: 'About Us',
      title: 'Built on trust. Evolved around our clients.',
      body: [
        'Legal Boutique Advisers was founded in 2021 as a boutique legal practice with a simple principle: every client’s circumstances are different, and their advice should be too.',
        'Over the years, our international clients increasingly turned to us not only for legal matters, but for guidance around their properties, investments and lives in Spain.',
        'Our firm has evolved around those needs.',
        'Today, Legal Boutique Advisers brings together legal expertise, property advisory and private client services, providing one trusted point of contact for clients establishing, investing or maintaining interests in Spain.',
      ],
    },
    legacy: {
      eyebrow: 'From one generation to the next',
      title: 'A legacy of experience. A vision for the future.',
      body: [
        'Founded by lawyer Marisela Castro Abad, Legal Boutique Advisers is now entering a new chapter with the expansion of its property and private client advisory.',
        'Bringing together established legal experience with a new generation of international perspective, the firm continues to evolve while remaining intentionally boutique.',
        'Our commitment is unchanged: personal relationships, discreet advice and solutions tailored to each client’s life and goals in Spain.',
      ],
    },
    team: {
      heading: 'Our Team',
      members: team.map((m) => ({ name: m.name, role: m.role, bio: m.bio })),
    },
    values,
    cta: { heading: 'Let’s talk.', subline: 'We would be delighted to learn more about your plans in Spain.' },
  }
}

function AboutHero() {
  const { hero } = useAboutData()
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-[22ch] text-4xl uppercase leading-[1.08] tracking-wide md:text-5xl lg:text-[3.5rem]">
              {hero.title}
            </h1>
            <div className="mt-8 max-w-prose space-y-5 text-sm leading-relaxed text-taupe md:text-[15px]">
              {hero.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-72 w-full lg:h-[560px]">
              <div className="h-full w-full bg-parchment" aria-hidden />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function LegacySplit() {
  const { legacy } = useAboutData()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full bg-parchment" aria-hidden />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow>{legacy.eyebrow}</Eyebrow>
            <h2 className="font-display mt-5 max-w-[26ch] text-3xl uppercase leading-snug md:text-4xl">
              {legacy.title}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-taupe">
              {legacy.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TeamSection() {
  const { team } = useAboutData()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <p className="micro mb-12 text-center text-taupe">{team.heading}</p>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m) => (
            <div key={m.name}>
              <div className="aspect-[3/4] w-full bg-parchment" aria-hidden />
              <h3 className="font-display mt-5 text-base uppercase tracking-[0.12em] md:text-lg">{m.name}</h3>
              <p className="font-display mt-1 text-[11px] italic text-taupe">{m.role}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">{m.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ApproachSection() {
  const { values } = useAboutData()
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <Eyebrow center>Our Approach</Eyebrow>
        <div className="mt-2 h-px w-8 bg-oxblood mx-auto" />
        <div className="mt-10 grid gap-10 pt-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <ValueItem key={v.title} icon={v.icon} title={v.title} body={v.body} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function AboutPage() {
  const { cta } = useAboutData()
  return (
    <>
      <AboutHero />
      <LegacySplit />
      <TeamSection />
      <ApproachSection />
      <CtaBand heading={cta.heading} subline={cta.subline} image={ctaCoast} cta={{ to: '/inquiry', label: 'Make a private enquiry' }} />
    </>
  )
}
