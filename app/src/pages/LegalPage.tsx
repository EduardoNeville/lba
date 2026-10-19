import { Container } from "../components/ui/Container";
import { PageHero } from "../components/shared/PageHero";
import { CtaBand } from "../components/shared/CtaBand";
import { ServiceCard } from "../components/ui/ServiceCard";
import { useLang } from "../lib/lang";
import { useUi } from "../lib/nav";
import { hero, firm } from "../data/legal";
import { en, fr, es } from "../data/locales/legal";

function useLegalData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    statement: d.statement,
    areasHeading: d.areasHeading,
    areas: d.areas,
    firm: { ...d.firm, image: firm.image },
  };
}

/* The centred statement — the four value tiles that sat under it are gone
   (client, part 1); what followed moves up. */
function Statement() {
  const { statement } = useLegalData();
  return (
    <section className="py-20 md:py-24">
      <Container>
        <p className="font-display mx-auto max-w-2xl text-center text-xl leading-snug text-ink md:text-2xl">
          {statement}
        </p>
        <div className="mx-auto mt-4 h-px w-8 bg-oxblood" />
      </Container>
    </section>
  );
}

/* "Our Areas of Legal Advice" — the three columns with their checklists. Removed
   in the first pass by misreading the part-1 docx; restored on round-trip
   feedback, straight after the hero. */
function AdviceGrid() {
  const { areas, areasHeading } = useLegalData();
  return (
    <section className="pb-20 md:pb-28">
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

/* "Our Law Firm" — dictated copy left, Marisela's portrait right, kept to a
   restrained column ("no pongas la foto super grande"). */
function LawFirm() {
  const { firm: data } = useLegalData();
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="micro text-oxblood">{data.eyebrow}</p>
            <div className="mt-3 h-px w-8 bg-oxblood" />
            <h2 className="font-display mt-8 max-w-[24ch] text-3xl leading-tight md:text-4xl">
              {data.headline}
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-taupe">
              {data.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <img
              src={data.image}
              alt={data.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LegalPage() {
  const { hero } = useLegalData();
  const ui = useUi();
  return (
    <>
      <PageHero {...hero} />
      <Statement />
      <AdviceGrid />
      <LawFirm />
      {/* Image and spacing gone (client, part 1): the button alone, sitting higher. */}
      <CtaBand cta={{ to: "/inquiry", label: ui.privateEnquiry }} />
    </>
  );
}
