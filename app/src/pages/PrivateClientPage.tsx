import { Container } from "../components/ui/Container";
import { Icon } from "../components/ui/icons";
import { PageHero } from "../components/shared/PageHero";
import { CtaBand } from "../components/shared/CtaBand";
import { ServiceCard } from "../components/ui/ServiceCard";
import { Checklist } from "../components/ui/Checklist";
import { ButtonLink } from "../components/ui/ButtonLink";
import { useLang } from "../lib/lang";
import { hero, services, featureSplit, cta } from "../data/privateClient";
import { en, fr, es } from "../data/locales/privateClient";
import { useUi } from "../lib/nav";

function usePCData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    contactPoints: d.contactPoints,
    servicesHeading: d.servicesHeading,
    services: d.services.map((s, i) => ({ ...s, ...services[i] })),
    featureSplit: { ...d.featureSplit, image: featureSplit.image },
    partners: d.partners,
    cta: { ...d.cta, image: cta.image },
  };
}

function ContactPoints() {
  const { contactPoints } = usePCData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="micro mb-3 text-center text-ink">
          {contactPoints.heading}
        </p>
        <p className="font-display mb-12 text-center text-sm italic text-taupe md:text-base">
          {contactPoints.subline}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactPoints.items.map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <Icon name={c.icon} />
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink">
                  {c.title}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-taupe">
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesGrid() {
  const { services, servicesHeading } = usePCData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <p className="micro mb-2 text-center text-oxblood">
          {servicesHeading}
        </p>
        <div className="mx-auto mb-10 h-px w-8 bg-oxblood" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureSplit() {
  const { featureSplit } = usePCData();
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="min-h-72 lg:min-h-full">
            <img
              src={featureSplit.image}
              alt={featureSplit.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-parchment px-8 py-12 md:px-12">
            <p className="micro text-oxblood">{featureSplit.eyebrow}</p>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug md:text-3xl">
              {featureSplit.heading}
            </h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">{featureSplit.body}</p>
            <div className="mt-6">
              <Checklist items={featureSplit.checks} columns={2} />
            </div>
            <p className="font-display mt-6 text-sm italic text-taupe">
              {featureSplit.note}
            </p>
            <div className="mt-8 self-start">
              <ButtonLink to={featureSplit.cta.to}>
                {featureSplit.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustedNetwork() {
  const { partners } = usePCData();
  return (
    <section className="bg-parchment py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="micro text-oxblood">{partners.heading}</p>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] leading-relaxed text-taupe">
              {partners.body}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {partners.list.map((p) => (
              <span
                key={p}
                className="text-center text-[10px] uppercase leading-snug tracking-[0.18em] text-ink/70 transition-colors hover:text-oxblood"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PrivateClientPage() {
  const { hero, cta } = usePCData();
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} />
      <ContactPoints />
      <ServicesGrid />
      <FeatureSplit />
      <TrustedNetwork />
      <CtaBand
        heading={cta.heading}
        subline={cta.subline}
        image={cta.image}
        cta={{ to: "/inquiry", label: ui.privateEnquiry }}
      />
    </>
  );
}
