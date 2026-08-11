import { Eyebrow } from '../components/ui/Eyebrow'
import { Container } from '../components/ui/Container'
import { ValueItem } from '../components/ui/ValueItem'
import { CtaBand } from '../components/shared/CtaBand'
import { team, values } from '../data/team'

function AboutHero() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>About Us</Eyebrow>
            <h1 className="font-display mt-6 max-w-[22ch] text-4xl uppercase leading-[1.08] tracking-wide md:text-5xl lg:text-[3.5rem]">
              Built on trust. Evolved around our clients.
            </h1>
            <div className="mt-8 max-w-prose space-y-5 text-sm leading-relaxed text-taupe md:text-[15px]">
              <p>
                Legal Boutique Advisers was founded as a boutique legal practice with a simple
                principle: every client's circumstances are different, and their advice should be too.
              </p>
              <p>
                Over the years, our international clients increasingly turned to us not only for legal
                matters, but for guidance around their properties, investments and lives in Spain.
              </p>
              <p>Our firm has evolved around those needs.</p>
              <p>
                Today, Legal Boutique Advisers brings together legal expertise, property advisory and
                private client services, providing one trusted point of contact for clients
                establishing, investing or maintaining interests in Spain.
              </p>
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
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full bg-parchment" aria-hidden />
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow>From one generation to the next</Eyebrow>
            <h2 className="font-display mt-5 max-w-[26ch] text-3xl uppercase leading-snug md:text-4xl">
              A legacy of experience. A vision for the future.
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-taupe">
              <p>
                Founded by lawyer Marisela Castro Abad, Legal Boutique Advisers is now entering a new
                chapter with the expansion of its property and private client advisory.
              </p>
              <p>
                Bringing together established legal experience with a new generation of international
                perspective, the firm continues to evolve while remaining intentionally boutique.
              </p>
              <p>
                Our commitment is unchanged: personal relationships, discreet advice and solutions
                tailored to each client's life and goals in Spain.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <p className="micro mb-12 text-center text-taupe">Our Team</p>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.slug}>
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
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <Eyebrow center>Our Approach</Eyebrow>
        <div className="mt-10 grid gap-10 border-t border-hairline pt-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <ValueItem key={v.title} icon={v.icon} title={v.title} body={v.body} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <LegacySplit />
      <TeamSection />
      <ApproachSection />
      <CtaBand
        heading="Let's talk."
        subline="We would be delighted to learn more about your plans in Spain."
        cta={{ to: '/inquiry', label: 'Make a private enquiry' }}
      />
    </>
  )
}
