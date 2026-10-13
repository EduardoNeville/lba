import { lazy, Suspense } from "react";
import { Container } from "../components/ui/Container";
import { Icon } from "../components/ui/icons";
import { ArrowLink } from "../components/ui/ArrowLink";
import { PageHero } from "../components/shared/PageHero";
import { CrossLinkBand } from "../components/shared/CrossLinkBand";
import { CtaBand } from "../components/shared/CtaBand";
import { Checklist } from "../components/ui/Checklist";
import { useLang } from "../lib/lang";
import { hero, cta } from "../data/property";

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
    services: d.services,
    crossLink: d.crossLink,
    crossLinkAlt: d.crossLinkAlt,
    cta: { ...d.cta, image: cta.image },
  };
}

// The residences strip loads after paint — see PropertyStrip.

function ServicesTrio() {
  const { services } = usePropertyData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-8 border-t border-hairline pt-12 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title}>
              <Icon name={s.icon} />
              <h2 className="font-display mt-4 text-sm uppercase tracking-[0.2em]">
                {s.title}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-taupe">
                {s.body}
              </p>
              {/* ponytail: spec p5 — Enquire ×3 deleted */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PropertyPage() {
  const { hero, crossLink, crossLinkAlt, cta } = usePropertyData();
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} />
      <ServicesTrio />
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
      <Suspense fallback={null}>
        <PropertyStrip />
      </Suspense>
      <CtaBand
        heading={cta.heading}
        subline={cta.subline}
        image={cta.image}
        cta={{ to: "/inquiry", label: ui.privateEnquiry }}
        tone="light"
      />
    </>
  );
}
