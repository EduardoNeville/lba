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
  heading: string;
  subline?: string;
  cta: { to: string; label: string };
  variant?: "image" | "accent";
  tone?: "light" | "dark";
  image?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={`relative isolate overflow-hidden py-20 md:py-28 ${variant === "accent" ? "bg-parchment" : ""}`}
    >
      {variant === "accent" && image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      {variant === "image" && image && (
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
        <h2 className="font-display text-center text-3xl uppercase md:text-4xl text-ink">
          {heading}
        </h2>
        {subline && (
          <p className="font-display mt-3 text-center text-4xl italic md:text-5xl text-ink">
            {subline}
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <ButtonLink to={cta.to} tone={dark ? "dark" : undefined}>
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
