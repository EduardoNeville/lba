import { lazy, Suspense } from "react";
import { Container } from "../components/ui/Container";
import { ArrowLink } from "../components/ui/ArrowLink";
import { Eyebrow } from "../components/ui/Eyebrow";
import { PageHero } from "../components/shared/PageHero";
import { CrossLinkBand } from "../components/shared/CrossLinkBand";
import { CtaBand } from "../components/shared/CtaBand";
import { Checklist } from "../components/ui/Checklist";
import { useLang } from "../lib/lang";
import { hero, approach as approachMedia, band as bandMedia, cta } from "../data/property";

// Lazy for the same reason the home band is: the strip sits below the fold, and it is
// what would otherwise drag the residences model and three languages of copy into the
// entry chunk that every route loads.
const PropertyStrip = lazy(() =>
  import("../components/shared/PropertyStrip").then((m) => ({ default: m.PropertyStrip })),
);
import { en, fr, es } from "../data/locales/property";
import { useUi } from "../lib/nav";
import propertyCrosslink from "../assets/property-crosslink.jpg";

function usePropertyData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    approach: d.approach,
    featured: d.featured,
    band: d.band,
    servicesHeading: d.servicesHeading,
    services: d.services,
    crossLink: d.crossLink,
    crossLinkAlt: d.crossLinkAlt,
  };
}

// The residences strip loads after paint — see PropertyStrip.

/** Full-bleed photo left / copy right, as in the client's reference. */
function ApproachSplit() {
  const { approach } = usePropertyData();
  return (
    <section className="grid items-stretch lg:grid-cols-2">
      <div className="min-h-72 lg:min-h-full">
        <img
          src={approachMedia.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-14 md:px-16 lg:py-20">
        <Eyebrow>{approach.eyebrow}</Eyebrow>
        <h2 className="font-display mt-4 max-w-lg text-3xl leading-snug md:text-4xl">
          {approach.heading}
        </h2>
        <p className="mt-5 max-w-md text-[13px] leading-relaxed text-taupe">
          {approach.body}
        </p>
        <div className="mt-7">
          <ArrowLink to={approach.link.to} hitArea>
            {approach.link.label}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

/** Buying in Spain — dark panel beside the photograph. */
function BuyingInSpain() {
  const { band } = usePropertyData();
  return (
    <section className="grid items-stretch lg:grid-cols-2">
      <div className="min-h-72 lg:min-h-full">
        <img
          src={bandMedia.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center bg-ink px-6 py-14 md:px-16 lg:py-20">
        <p className="micro text-[11px] text-cream/70">{band.eyebrow}</p>
        <h2 className="font-display mt-4 max-w-lg text-3xl leading-snug text-cream md:text-4xl">
          {band.heading}
        </h2>
        <p className="mt-5 max-w-md text-[13px] leading-relaxed text-cream/75">
          {band.body}
        </p>
        <div className="mt-7">
          <ArrowLink to={band.link.to} tone="dark" hitArea>
            {band.link.label}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { services, servicesHeading } = usePropertyData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="border-t border-hairline pt-12">
          <h2 className="font-display text-2xl uppercase tracking-[0.12em]">
            {servicesHeading}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title}>
                <h3 className="font-display text-sm uppercase tracking-[0.2em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-taupe">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PropertyPage() {
  const { hero, featured, crossLink, crossLinkAlt } = usePropertyData();
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} titleCase="sentence" />
      <ApproachSplit />
      <Suspense fallback={null}>
        <PropertyStrip title={featured.title} />
      </Suspense>
      <BuyingInSpain />
      <ServicesGrid />
      <CrossLinkBand
        size="sm"
        left={
          <div>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug">
              {crossLink.left.heading}
            </h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">{crossLink.left.body}</p>
            <div className="mt-5">
              <Checklist items={crossLink.left.checks} />
            </div>
            <div className="mt-6">
              <ArrowLink to={crossLink.left.link.to}>
                {crossLink.left.link.label}
              </ArrowLink>
            </div>
          </div>
        }
        center={
          <img
            src={propertyCrosslink}
            alt={crossLinkAlt}
            className="hidden h-full w-full object-cover lg:block"
          />
        }
        right={
          <div>
            <h2 className="font-display mt-3 text-2xl uppercase leading-snug">
              {crossLink.right.heading}
            </h2>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <p className="mt-4 text-[13px] text-taupe">
              {crossLink.right.body}
            </p>
            <div className="mt-5">
              <Checklist items={crossLink.right.checks} />
            </div>
            <div className="mt-6">
              <ArrowLink to={crossLink.right.link.to}>
                {crossLink.right.link.label}
              </ArrowLink>
            </div>
          </div>
        }
      />
      <CtaBand
        image={cta.image}
        cta={{ to: "/inquiry", label: ui.privateEnquiry }}
        tone="light"
      />
    </>
  );
}
