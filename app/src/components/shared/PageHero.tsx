import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { ScrollCue } from '../ui/ScrollCue'

export function PageHero({
  eyebrow: _eyebrow,
  title,
  subline,
  body,
  cta,
  image,
  alt,
  titleCase = 'upper',
}: {
  eyebrow?: string
  title: string
  subline?: string
  body?: string
  cta?: { to: string; label: string }
  image?: string
  alt?: string
  titleCase?: 'upper' | 'sentence'
}) {
  return (
    <section className="relative isolate flex hero-screen items-center overflow-hidden">
      {image && <img src={image} alt={alt ?? ''} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />}
      <div className="absolute inset-0 -z-10 bg-cream/70" />
      <Container>
        <div className="max-w-[560px] py-16 md:py-20">
          <div>
            <h1
              className={`font-display mt-6 max-w-[14ch] leading-[1.08] tracking-wide ${
                titleCase === 'upper' ? 'text-4xl uppercase md:text-5xl lg:text-6xl' : 'text-4xl leading-tight md:text-5xl'
              }`}
            >
              {title}
            </h1>
            {subline && <p className="micro mt-3 text-[11px] text-taupe">{subline}</p>}
            {body && <p className="mt-6 max-w-prose text-sm leading-relaxed text-taupe">{body}</p>}
            {cta && (
              <div className="mt-8">
                <ButtonLink to={cta.to}>{cta.label} →</ButtonLink>
              </div>
            )}
          </div>
        </div>
      </Container>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  )
}
