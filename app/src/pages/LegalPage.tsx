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
import { hero, practice, cta } from "../data/legal";
import { en, fr, es } from "../data/locales/legal";
import { useUi } from "../lib/nav";

function useLegalData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    statement: d.statement,
    areasHeading: d.areasHeading,
    pillars: d.pillars,
    areas: d.areas,
    practice: { ...d.practice, image: practice.image },
    cta: { ...d.cta, image: cta.image },
  };
}

function Pillars() {
  const { pillars, statement } = useLegalData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="font-display mx-auto max-w-2xl text-center text-xl leading-snug text-ink md:text-2xl">
          {statement}
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
  const { areas, areasHeading } = useLegalData();
  return (
    <section className="pb-0">
      <Container>
        <p className="micro mb-2 text-center text-oxblood">
          {areasHeading}
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
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} />
      <Pillars />
      <AdviceGrid />
      <CrossLinkBand
        size="sm"
        narrow
        left={
          <div>
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
              <ArrowLink to="/about">{ui.meetTheTeam}</ArrowLink>
            </div>
          </div>
        }
      />
      <CtaBand
        heading={cta.heading}
        subline={cta.subline}
        image={cta.image}
        cta={{ to: "/inquiry", label: ui.privateEnquiry }}
      />
    </>
  );
}
