import { Eyebrow } from "../components/ui/Eyebrow";
import { Container } from "../components/ui/Container";
import { ValueItem } from "../components/ui/ValueItem";
import { CtaBand } from "../components/shared/CtaBand";
import { Icon } from "../components/ui/icons";
import { useLang } from "../lib/lang";
import { team, values } from "../data/team";
import { fr, es } from "../data/locales/about";
import ctaCoast from "../assets/cta-coast.jpg";
import aboutHero from "../assets/about-hero.jpg";
import aboutLegacy from "../assets/about-legacy.jpg";
import musicaImage from "../assets/musica-cultural.png";

function useAboutData() {
  const { lang } = useLang();
  const photoMap = Object.fromEntries(team.map((m) => [m.name, m.photo]));
  if (lang === "fr")
    return {
      ...fr,
      team: {
        ...fr.team,
        members: fr.team.members.map((m) => ({
          ...m,
          photo: photoMap[m.name],
        })),
      },
    };
  if (lang === "es")
    return {
      ...es,
      team: {
        ...es.team,
        members: es.team.members.map((m) => ({
          ...m,
          photo: photoMap[m.name],
        })),
      },
    };
  return {
    hero: {
      eyebrow: "About Us",
      title: "Built on trust. Evolved around our clients.",
      body: [
        "Legal Boutique Advisers was founded in 2021 as a boutique legal practice with a simple principle: every client’s circumstances are different, and their advice should be too.",
        "Over the years, our international clients increasingly turned to us not only for legal matters, but for guidance around their properties, investments and lives in Spain.",
        "Our firm has evolved around those needs.",
        "Today, Legal Boutique Advisers brings together legal expertise, property advisory and private client services, providing one trusted point of contact for clients establishing, investing or maintaining interests in Spain.",
      ],
    },
    legacy: {
      eyebrow: "From one generation to the next",
      title: "A legacy of experience. A vision for the future.",
      body: [
        "Founded by lawyer Marisela Castro Abad, Legal Boutique Advisers is now entering a new chapter with the expansion of its property and private client advisory.",
        "Bringing together established legal experience with a new generation of international perspective, the firm continues to evolve while remaining intentionally boutique.",
        "Our commitment is unchanged: personal relationships, discreet advice and solutions tailored to each client’s life and goals in Spain.",
      ],
    },
    team: {
      heading: "Our Team",
      members: team.map((m) => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        photo: m.photo,
      })),
    },
    values,
    cta: {
      heading: "Let’s talk.",
      subline: "We would be delighted to learn more about your plans in Spain.",
    },
    culture: {
      eyebrow: "Cultural Commitment",
      title: "Supporting Culture.\nInvesting in the Future.",
      body: [
        "At Legal Boutique Advisers, we believe culture enriches life and strengthens the communities we are part of.",
        "We are proud to support and participate in Música con Encanto, a non-profit association dedicated to bringing classical music and cultural experiences to the Costa del Sol.",
        "Through concerts, educational programmes and artistic initiatives, Música con Encanto inspires young talent and creates meaningful connections through the universal language of music.",
        "We share their vision of a more beautiful, creative and harmonious future.",
      ],
      bottomEyebrow: "Legal Boutique Advisers",
      bottomSub: "Proud collaborators of Música con Encanto",
      linkLabel: "Discover the association →",
      linkHref: "https://musicaconencanto.org/",
      tagline: "Inspiring through music,\nenriching our community.",
    },
  };
}

function AboutHero() {
  const { hero } = useAboutData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
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
                alt="Boutique office arched shelves with stone vases and warm light"
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
  const { legacy } = useAboutData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={aboutLegacy}
              alt="Library with law books and architectural plans representing legacy and vision"
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
  const { culture } = useAboutData() as any;
  return (
    <section className="py-20 md:py-28 bg-cream/50">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
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
          <div className="lg:col-span-5 lg:border-l lg:border-hairline lg:pl-12 flex flex-col items-center justify-center text-center">
            <img src={musicaImage} alt="Centro de Divulgación Musical del Mediterráneo" className="h-48 w-48 object-contain" />
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
    <section className="py-20 md:py-28">
      <Container>
        <p className="micro mb-12 text-center text-taupe">{team.heading}</p>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className="font-display mt-1 text-[11px] italic text-taupe">
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
  const { values } = useAboutData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="micro mb-12 text-center text-taupe">Our Approach</p>
        <div className="mt-10 grid gap-10 pt-12 text-center sm:grid-cols-2 lg:grid-cols-4">
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
        cta={{ to: "/inquiry", label: "Make a private enquiry" }}
      />
    </>
  );
}
