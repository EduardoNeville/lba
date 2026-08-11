import { ButtonLink } from '../ui/ButtonLink'

export function CtaBand({
  heading,
  subline,
  cta,
  variant = 'image',
  tone = 'dark',
  image,
}: {
  heading: string
  subline?: string
  cta: { to: string; label: string }
  variant?: 'image' | 'accent'
  tone?: 'light' | 'dark'
  image?: string
}) {
  const dark = tone === 'dark'
  return (
    <section className={`relative isolate overflow-hidden py-20 md:py-28 ${variant === 'accent' ? 'bg-parchment' : ''}`}>
      {variant === 'accent' && image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute left-0 top-0 hidden h-full w-1/4 object-cover opacity-90 [mask-image:linear-gradient(to_right,black,transparent)] md:block"
        />
      )}
      {variant === 'image' && image && (
        <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" />
      )}
      {variant === 'image' && (
        <div className={`absolute inset-0 -z-10 ${dark ? 'bg-ink/45' : 'bg-cream/40'}`} />
      )}
      <div className="relative mx-auto w-full max-w-[1200px] px-6 text-center md:px-10">
        <h2 className={`font-display text-3xl uppercase md:text-4xl ${dark ? 'text-cream' : 'text-ink'}`}>{heading}</h2>
        {subline && (
          <p className={`font-display mt-3 text-sm italic md:text-base ${dark ? 'text-cream/85' : 'text-ink/80'}`}>
            {subline}
          </p>
        )}
        <div className="mt-8">
          <ButtonLink to={cta.to} tone={dark ? 'dark' : undefined}>
            {cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
