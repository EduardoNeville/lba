import { Eyebrow } from "../components/ui/Eyebrow";
import { Container } from "../components/ui/Container";
import { ValueItem } from "../components/ui/ValueItem";
import { CtaBand } from "../components/shared/CtaBand";
import { Icon } from "../components/ui/icons";
import { useLang } from "../lib/lang";
import { team } from "../data/team";
import { en, fr, es } from "../data/locales/about";
import { useUi } from "../lib/nav";
import ctaCoast from "../assets/cta-coast.jpg";
import aboutHero from "../assets/about-hero.jpg";
import aboutLegacy from "../assets/about-legacy.jpg";
import musicaImage from "../assets/musica-cultural.png";

function useAboutData() {
  const { lang } = useLang();
  const photoMap = Object.fromEntries(team.map((m) => [m.name, m.photo]));
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    ...d,
    team: {
      ...d.team,
      members: d.team.members.map((m) => ({ ...m, photo: photoMap[m.name] })),
    },
  };
}

function AboutHero() {
  const { hero, alts } = useAboutData();
  return (
    <section className="pt-20 pb-10 md:pt-28 md:pb-14">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display max-w-[22ch] text-4xl uppercase leading-[1.08] tracking-wide md:text-5xl lg:text-[3.5rem]">
              {hero.title}
            </h1>
            <div className="mt-8 max-w-prose space-y-5 text-sm leading-relaxed text-taupe md:text-[15px]">
              {hero.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-72 w-full overflow-hidden lg:h-[560px]">
              <img
                src={aboutHero}
                alt={alts.hero}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LegacySplit() {
  const { legacy, alts } = useAboutData();
  return (
    <section className="py-10 md:py-14">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={aboutLegacy}
              alt={alts.legacy}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
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
  );
}

function CultureSplit() {
  const { culture, alts } = useAboutData();
  return (
    <section className="py-10 md:py-14 bg-cream/50">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-ink/60" />
              <p className="micro text-ink">{culture.eyebrow}</p>
            </div>
            <h2 className="font-display mt-4 whitespace-pre-line text-3xl uppercase leading-[1.08] md:text-4xl">{culture.title}</h2>
            <div className="mt-6 max-w-prose space-y-4 text-[13px] leading-relaxed text-taupe">
              {culture.body.map((p: string) => (
                <p key={p}>{p.includes("Música con Encanto") ? (<>{p.split("Música con Encanto")[0]}<span className="text-oxblood">Música con Encanto</span>{p.split("Música con Encanto")[1]}</>) : p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-hairline lg:pl-10 flex flex-col items-center justify-center text-center">
            <img src={musicaImage} alt={alts.culture} className="h-48 w-48 object-contain" />
            <p className="font-display mt-6 whitespace-pre-line text-center text-lg italic leading-relaxed text-taupe">{culture.tagline}</p>
            <div className="mx-auto mt-4 h-px w-8 bg-oxblood" />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 bg-parchment px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Icon name="violin" className="h-6 w-6" />
            <div>
              <p className="micro text-ink">{culture.bottomEyebrow}</p>
              <p className="font-display text-sm italic text-taupe">{culture.bottomSub}</p>
            </div>
          </div>
          <a href={culture.linkHref} target="_blank" rel="noreferrer" className="micro inline-flex items-center gap-2 text-oxblood transition-colors hover:text-ink">
            {culture.linkLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}

function TeamSection() {
  const { team } = useAboutData();
  return (
    <section className="pt-10 pb-8 md:pt-14 md:pb-10">
      <Container>
        <p className="micro mb-12 text-center text-taupe">{team.heading}</p>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((m) => (
            <div key={m.name}>
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="aspect-[3/4] w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[3/4] w-full bg-parchment" aria-hidden />
              )}
              <h3 className="font-display mt-5 text-base uppercase tracking-[0.12em] md:text-lg">
                {m.name}
              </h3>
              <p className="font-display mt-1 text-[13px] italic text-taupe">
                {m.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ApproachSection() {
  const { values, approach } = useAboutData();
  return (
    <section className="py-10 md:py-14">
      <Container>
        <p className="micro mb-12 text-center text-taupe">{approach.heading}</p>
        <div className="mt-10 grid gap-8 pt-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <ValueItem
              key={v.title}
              icon={v.icon}
              title={v.title}
              body={v.body}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutPage() {
  const { cta } = useAboutData();
  const ui = useUi();
  return (
    <>
      <AboutHero />
      <LegacySplit />
      <CultureSplit />
      <TeamSection />
      <ApproachSection />
      <CtaBand
        heading={cta.heading}
        subline={cta.subline}
        image={ctaCoast}
        cta={{ to: "/inquiry", label: ui.privateEnquiry }}
      />
    </>
  );
}
