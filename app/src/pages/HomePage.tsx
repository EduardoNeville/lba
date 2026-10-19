import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { ScrollCue } from "../components/ui/ScrollCue";
import { CtaBand } from "../components/shared/CtaBand";
import { useLang } from "../lib/lang";
import { useUi } from "../lib/nav";
import { hero, practiceAreas } from "../data/home";
import { en, fr, es } from "../data/locales/home";

function useHomeData() {
  const { lang } = useLang();
  const d = lang === "fr" ? { ...en, ...fr } : lang === "es" ? { ...en, ...es } : en;
  return {
    hero: { ...d.hero, image: hero.image },
    intro: d.intro,
    practiceAreas: d.practiceAreas.map((p, i) => ({ ...p, ...practiceAreas[i] })),
    why: d.why,
  };
}

function HomeHero() {
  const { hero } = useHomeData();
  return (
    <section className="relative isolate flex hero-screen items-center justify-center overflow-hidden bg-cream">
      <img
        src={hero.image}
        alt={hero.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* The type sits directly on the photograph as in the mock; a veil rising from
          the foot keeps it legible over the pool line without grey-washing the room. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/40 via-ink/10 to-ink/5" />
      <Container>
        <div className="text-center">
          <h1 className="font-display text-5xl uppercase leading-[1.05] tracking-wide text-cream md:text-7xl">
            {hero.heading}
          </h1>
          {hero.sub && (
            <p className="micro mt-5 text-[11px] tracking-[0.35em] text-cream/90 md:text-xs">
              {hero.sub}
            </p>
          )}
        </div>
      </Container>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ScrollCue tone="light" />
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
  const ui = useUi();
  return (
    <>
      <HomeHero />
      <IntroSplit />
      <PracticeAreas />
      <WhyOneFirm />
      {/* The enquiry button alone — the image and the "Every client is unique." lines
          are gone (client, part 1). */}
      <CtaBand cta={{ to: "/inquiry", label: ui.privateEnquiry }} />
    </>
  );
}
