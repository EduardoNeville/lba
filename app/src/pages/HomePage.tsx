import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { ScrollCue } from "../components/ui/ScrollCue";
import { CtaBand } from "../components/shared/CtaBand";
import { useLang } from "../lib/lang";
import { useUi } from "../lib/nav";
import { hero, practiceAreas, cta } from "../data/home";
import { en, fr, es } from "../data/locales/home";

// Lazy: the band pulls in the residences loader (and through it the Firestore SDK)
// plus five full-bleed photographs. Mounting it after the page has painted keeps
// the hero as the only thing competing for the first view.
const FeaturedResidences = lazy(() =>
  import("../components/shared/FeaturedResidences").then((m) => ({ default: m.FeaturedResidences })),
);

function useHomeData() {
  const { lang } = useLang();
  const ui = useUi();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    intro: d.intro,
    practiceAreas: d.practiceAreas.map((p, i) => ({ ...p, ...practiceAreas[i] })),
    why: d.why,
    cta: { ...d.cta, image: cta.image, ctaLabel: ui.privateEnquiry },
  };
}

function HomeHero() {
  const { hero } = useHomeData();
  return (
    <section className="relative isolate flex hero-screen items-center overflow-hidden bg-cream">
      <img
        src={hero.image}
        alt={hero.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-cream/60" />
      {/* Right-aligned block: the heading answers the logo and nav on the left. */}
      <Container>
        <div className="ml-auto max-w-2xl text-right">
          <h1 className="font-display whitespace-pre-line text-4xl uppercase leading-[1.1] tracking-wide text-ink md:text-6xl">
            {hero.heading}
          </h1>
          {hero.sub && (
            <p className="micro mt-4 text-[11px] text-ink/70">{hero.sub}</p>
          )}
          {hero.body && (
            <p className="mt-4 text-sm leading-relaxed text-ink/75 md:text-[15px]">
              {hero.body}
            </p>
          )}
        </div>
      </Container>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  );
}

function IntroSplit() {
  const { intro } = useHomeData();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="font-display text-3xl uppercase md:text-4xl">
          {intro.heading}
        </h2>
        <div className="mt-6 max-w-prose space-y-4 text-sm leading-relaxed text-taupe">
          {intro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PracticeAreas() {
  const { practiceAreas } = useHomeData();
  const ui = useUi();
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((p) => (
            <Link
              key={p.num}
              to={p.to}
              className="group flex flex-col border border-hairline bg-parchment/60 overflow-hidden"
            >
              <div className="px-5 pt-5">
                <span className="text-[10px] tracking-[0.2em] text-taupe">
                  {p.num}
                </span>
              </div>
              <h2 className="font-display px-5 pt-3 text-lg uppercase tracking-[0.12em]">
                {p.title}
              </h2>
              <p className="mt-3 px-5 text-[13px] leading-relaxed text-taupe">
                {p.body}
              </p>
              <div className="mt-4" />
              <div className="mt-auto">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className={`aspect-square w-full object-cover ${p.imagePos ?? "object-center"}`}
                  />
                ) : (
                  <div
                    className="aspect-square w-full bg-parchment"
                    aria-hidden
                  />
                )}
              </div>
              <div className="px-5 pb-4 pt-3">
                <span className="micro text-[10px] text-ink group-hover:text-oxblood">
                  {ui.explore} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyOneFirm() {
  const { why } = useHomeData();
  return (
    <section className="bg-parchment py-20 md:py-28">
      <Container>
        <h2 className="font-display max-w-3xl text-3xl leading-tight md:text-4xl">
          {why.heading}
        </h2>
        <ul className="mt-10 border-t border-hairline">
          {why.rows.map((row) => (
            <li
              key={row.title}
              className="grid gap-2 border-b border-hairline py-6 md:grid-cols-2 md:gap-10 md:py-8"
            >
              <p className="font-display text-xl leading-snug text-ink md:text-2xl">
                {row.title}
              </p>
              <p className="text-sm leading-relaxed text-taupe md:pt-1">
                {row.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function HomePage() {
  const { cta } = useHomeData();
  return (
    <>
      <HomeHero />
      <IntroSplit />
      <PracticeAreas />
      <WhyOneFirm />
      <Suspense fallback={null}>
        <FeaturedResidences />
      </Suspense>
      <CtaBand
        variant="accent"
        heading={cta.heading}
        subline={cta.subline}
        image={cta.image}
        cta={{ to: "/inquiry", label: cta.ctaLabel }}
      />
    </>
  );
}
