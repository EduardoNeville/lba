import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { localeDict } from '../lib/i18n'
import { useLang } from '../lib/lang'
import { en as notFoundEn, fr as notFoundFr, es as notFoundEs } from '../data/locales/notFound'
import { setPageMeta } from '../lib/seo'

export function NotFoundPage() {
  const { lang } = useLang()
  const t = localeDict(notFoundEn, lang === 'fr' ? notFoundFr : lang === 'es' ? notFoundEs : undefined)
  useEffect(() => {
    setPageMeta('Page not found · Legal Boutique Advisers', 'The page you were looking for does not exist.')
  }, [])

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="micro text-taupe">{t.eyebrow}</p>
          <h1 className="font-display mt-4 text-3xl uppercase leading-[1.08] tracking-wide md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-taupe">{t.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/" className="micro inline-block border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-cream">
              {t.back}
            </Link>
            <Link to="/inquiry" className="micro inline-block bg-oxblood px-6 py-3 text-cream transition-colors hover:bg-ink">
              {t.enquire}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}