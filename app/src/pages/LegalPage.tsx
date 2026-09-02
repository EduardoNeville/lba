import { Container } from "../components/ui/Container";
import { Icon } from "../components/ui/icons";
import { ArrowLink } from "../components/ui/ArrowLink";
import { PageHero } from "../components/shared/PageHero";
import { ValueItem } from "../components/ui/ValueItem";
import { ServiceCard } from "../components/ui/ServiceCard";
import { CrossLinkBand } from "../components/shared/CrossLinkBand";
import { CtaBand } from "../components/shared/CtaBand";
import { ButtonLink } from "../components/ui/ButtonLink";
import { useLang } from "../lib/lang";
import { hero, pillars, areas, practice, cta } from "../data/legal";
import { fr, es } from "../data/locales/legal";

function useLegalData() {
  const { lang } = useLang();
  if (lang === "fr")
    return {
      hero: { ...hero, ...fr.hero },
      pillars: fr.pillars,
      areas: fr.areas,
      practice: { ...practice, ...fr.practice, image: practice.image },
      cta: { ...cta, ...fr.cta, image: cta.image },
    };
  if (lang === "es")
    return {
      hero: { ...hero, ...es.hero },
      pillars: es.pillars,
      areas: es.areas,
      practice: { ...practice, ...es.practice, image: practice.image },
      cta: { ...cta, ...es.cta, image: cta.image },
    };
  return { hero, pillars, areas, practice, cta };
}

function Pillars() {
  const { pillars } = useLegalData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-display mx-auto max-w-2xl text-center text-xl leading-snug text-ink md:text-2xl">
          We provide independent legal advice to private and international
          clients, their businesses and their families.
        </p>
        <div className="mx-auto mt-4 h-px w-8 bg-oxblood" />
        <div className="mt-12 grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <ValueItem
              key={p.title}
              icon={p.icon}
              title={p.title}
              body={p.body}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function AdviceGrid() {
  const { areas } = useLegalData();
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <p className="micro mb-2 text-center text-oxblood">
          Our Areas of Legal Advice
        </p>
        <div className="mx-auto mb-10 h-px w-8 bg-oxblood" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <ServiceCard key={a.title} {...a} link="/inquiry" />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function LegalPage() {
  const { hero, practice, cta } = useLegalData();
  return (
    <>
      <PageHero {...hero} />
      <Pillars />
      <AdviceGrid />
      <CrossLinkBand
        left={
          <div>
            <p className="micro text-oxblood">{practice.eyebrow}</p>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug">
              {practice.heading}
            </h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">{practice.body}</p>
            <div className="mt-8">
              <ButtonLink to={practice.cta.to} variant="outline">
                {practice.cta.label}
              </ButtonLink>
            </div>
          </div>
        }
        center={
          <div aria-hidden className="hidden overflow-hidden lg:block">
            <img
              src={practice.image}
              alt={practice.alt}
              className="h-full w-full object-cover"
            />
          </div>
        }
        right={
          <div>
            <ul>
              {practice.right.map((row) => (
                <li
                  key={row.title}
                  className="flex items-start gap-4 border-t border-hairline py-4"
                >
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
      <CtaBand
        heading={cta.heading}
        subline={cta.subline}
        image={cta.image}
        cta={{ to: "/inquiry", label: "Make a private enquiry" }}
      />
    </>
  );
}
