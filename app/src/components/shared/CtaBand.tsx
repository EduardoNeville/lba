import { ButtonLink } from "../ui/ButtonLink";
import { Container } from "../ui/Container";

export function CtaBand({
  heading,
  subline,
  cta,
  variant = "image",
  tone = "light",
  image,
}: {
  heading?: string;
  subline?: string;
  cta: { to: string; label: string };
  variant?: "image" | "accent";
  tone?: "light" | "dark";
  image?: string;
}) {
  const dark = tone === "dark";
  // Without a heading the band is the enquiry box alone — the treatment every page
  // except the home page uses.
  const ctaOnly = !heading && !subline;
  return (
    <section
      className={`relative isolate overflow-hidden ${ctaOnly ? "py-10 md:py-12" : "py-20 md:py-28"} ${variant === "accent" ? "bg-parchment" : ""}`}
    >
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      {variant === "image" && (
        <div
          className={`absolute inset-0 -z-10 ${dark ? "bg-ink/45" : "bg-cream/40"}`}
        />
      )}
      <Container>
        {heading && (
          <h2 className="font-display text-center text-3xl uppercase md:text-4xl text-ink">
            {heading}
          </h2>
        )}
        {subline && (
          <p className="font-display mt-3 text-center text-4xl italic md:text-5xl text-ink">
            {subline}
          </p>
        )}
        <div className={`flex justify-center ${ctaOnly ? "" : "mt-8"}`}>
          <ButtonLink to={cta.to} tone={dark ? "dark" : undefined}>
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
