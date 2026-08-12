import { ButtonLink } from '../ui/ButtonLink'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

export function PageHero({
  eyebrow,
  title,
  subline,
  body,
  cta,
  image,
  alt,
  titleCase = 'upper',
}: {
  eyebrow: string
  title: string
  subline?: string
  body?: string
  cta?: { to: string; label: string }
  image?: string
  alt?: string
  titleCase?: 'upper' | 'sentence'
}) {
  return (
    <section className="relative isolate">
      <Container>
        {/* text column: bound to the container's x-margin, fills the viewport (minus sticky header), no more */}
        <div className="flex flex-col justify-center py-16 md:py-20 lg:min-h-[calc(100svh_-_5rem)] lg:py-10">
          {/* ends exactly at the 50vw midline, so it never collides with the absolute image on the right */}
          <div className="max-w-[560px] lg:max-w-[min(560px,calc(50vw_-_40px))]">
            <Eyebrow>{eyebrow}</Eyebrow>
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
      {image && (
        <>
          {/* desktop: fills the right half of the viewport at exactly the hero's height */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <img src={image} alt={alt ?? ''} className="h-full w-full object-cover object-top" />
          </div>
          {/* mobile: stacked below the text */}
          <div className="h-64 md:h-80 lg:hidden">
            <img src={image} alt={alt ?? ''} className="h-full w-full object-cover object-top" />
          </div>
        </>
      )}
    </section>
  )
}
