import { Container } from "../components/ui/Container";
import { ArrowLink } from "../components/ui/ArrowLink";
import { PageHero } from "../components/shared/PageHero";
import { CrossLinkBand } from "../components/shared/CrossLinkBand";
import { CtaBand } from "../components/shared/CtaBand";
import { useLang } from "../lib/lang";
import { band as bandMedia, hero } from "../data/property";
import { en, fr, es } from "../data/locales/property";
import { useUi } from "../lib/nav";
import propertyCrosslink from "../assets/property-crosslink.jpg";

function usePropertyData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    band: d.band,
    servicesHeading: d.servicesHeading,
    services: d.services,
    crossLink: d.crossLink,
    crossLinkAlt: d.crossLinkAlt,
  };
}

/* Access to the Finest Opportunities — the split the part-2 mockup gave the
   hero, moved here on the client's round-trip feedback: umber panel left (the
   band's copy, larger type) with the villa photograph right, wrapped in the
   Container so the band's edges meet the same x-axis margin as the rest of the
   page (px-6 md:px-10 inside max-w-[1200px]). */
function OpportunitiesBand() {
  const { band } = usePropertyData();
  return (
    <section>
      <Container>
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-umber px-8 py-14 md:px-14 lg:py-20">
            <p className="micro text-[11px] text-cream/70">{band.eyebrow}</p>
            <h2 className="font-display mt-4 max-w-lg text-4xl leading-snug text-cream md:text-5xl">
              {band.heading}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">
              {band.body}
            </p>
            <div className="mt-7">
              <ArrowLink to={band.link.to} tone="dark" hitArea>
                {band.link.label}
              </ArrowLink>
            </div>
          </div>
          <div className="min-h-72 lg:min-h-full">
            <img
              src={bandMedia.image}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
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
  const { hero, crossLink, crossLinkAlt } = usePropertyData();
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} titleCase="sentence" />
      <ServicesGrid />
      <OpportunitiesBand />
      {/* Order per the client's part-2 note: hero, our services, the brown box,
          then this cross-link band. The centre photograph is unchanged; the side
          columns are eyebrow + sentence heading + one line + arrow link. */}
      <CrossLinkBand
        size="sm"
        left={
          <div>
            <p className="micro border-b border-hairline pb-3 text-oxblood">
              {crossLink.left.eyebrow}
            </p>
            <h2 className="font-display mt-5 max-w-[22ch] text-3xl leading-tight md:text-4xl">
              {crossLink.left.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-taupe">
              {crossLink.left.body}
            </p>
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
            <p className="micro border-b border-hairline pb-3 text-oxblood">
              {crossLink.right.eyebrow}
            </p>
            <h2 className="font-display mt-5 max-w-[22ch] text-3xl leading-tight md:text-4xl">
              {crossLink.right.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-taupe">
              {crossLink.right.body}
            </p>
            <div className="mt-6">
              <ArrowLink to={crossLink.right.link.to}>
                {crossLink.right.link.label}
              </ArrowLink>
            </div>
          </div>
        }
      />
      <CtaBand cta={{ to: "/inquiry", label: ui.privateEnquiry }} />
    </>
  );
}
