import { ButtonLink } from '../ui/ButtonLink'
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
    <section className="grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-16 md:px-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className={`font-display mt-6 max-w-[14ch] leading-[1.08] tracking-wide ${
            titleCase === 'upper' ? 'text-5xl uppercase md:text-6xl' : 'text-4xl leading-tight md:text-5xl'
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
      {image && (
        <div className="h-64 md:h-80 lg:h-full lg:min-h-[520px]">
          <img src={image} alt={alt ?? ''} className="h-full w-full object-cover object-top" />
        </div>
      )}
    </section>
  )
}
