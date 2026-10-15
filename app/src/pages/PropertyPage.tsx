import { Container } from "../components/ui/Container";
import { ArrowLink } from "../components/ui/ArrowLink";
import { ScrollCue } from "../components/ui/ScrollCue";
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

/* The split lockup hero: cream text panel left — eyebrow, huge sentence-case
   "Real Estate", the dictated intro as two columns on a vertical hairline — and
   the photograph right. PageHero keeps its overlay style for the other pages.
   Placeholder photograph until the client's golf picture arrives. */
function SplitHero() {
  const { hero: h } = usePropertyData();
  return (
    <section className="grid items-stretch lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 md:px-16 lg:py-20">
        <p className="micro flex items-center gap-3 text-ink">
          <span aria-hidden className="h-px w-8 bg-oxblood" />
          {h.eyebrow}
        </p>
        <h1 className="font-display mt-6 text-6xl leading-[1.02] md:text-8xl">
          {h.title}
        </h1>
        <div className="mt-10 grid max-w-xl gap-6 text-sm leading-relaxed text-taupe sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-hairline">
          {h.body.map((p, i) => (
            <p key={p.slice(0, 32)} className={i === 0 ? "sm:pr-8" : "sm:pl-8"}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="relative isolate min-h-72 lg:min-h-full">
        <img
          src={h.image}
          alt={h.alt}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <ScrollCue tone="light" />
        </div>
      </div>
    </section>
  );
}

/* Buying in Spain — the brown panel keeps its copy and gains the client's villa
   photograph, larger type and a step lighter brown ("un marron menos oscuro"). */
function OpportunitiesBand() {
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
      <div className="flex flex-col justify-center bg-umber px-6 py-14 md:px-16 lg:py-20">
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
  const { crossLink, crossLinkAlt } = usePropertyData();
  const ui = useUi();
  return (
    <>
      <SplitHero />
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
