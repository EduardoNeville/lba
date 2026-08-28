import { Link } from 'react-router-dom'
import { FOOTER_INFO, FOOTER_SERVICES } from '../../data/navigation'
import { useLang } from '../../lib/lang'
import { useFooter, FOOTER_NAV_KEYS, useNav } from '../../lib/nav'
import { Icon } from '../ui/icons'

const SOCIALS = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/legalboutiqueadvisers/' },
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/legal-boutique-advisers/' },
]

export function SiteFooter() {
  const { lang, setLang } = useLang()
  const footer = useFooter()
  const nav = useNav()

  return (
    <footer className="bg-maroon text-cream">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Lockup + tagline */}
        <div>
          <p className="font-display text-lg uppercase tracking-[0.15em] text-cream">
            Legal Boutique Advisers
          </p>
          <p className="micro mt-3 text-[10px] text-cream/60">{footer.tagline}</p>
        </div>

        {/* Our pages + the enquiry CTA lives with them */}
        <nav aria-label={footer.services}>
          <h2 className="micro text-cream/60">{footer.services}</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.servicesLinks.map((label, i) => (
              <li key={i}>
                <Link
                  to={FOOTER_SERVICES[i]?.to ?? '/'}
                  className="micro text-[10px] text-cream/80 transition-colors hover:text-cream"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/inquiry#form"
            className="micro mt-6 inline-block border border-cream/40 px-5 py-2 text-[10px] text-cream transition-colors hover:bg-cream hover:text-maroon"
          >
            {footer.enquire}
          </Link>
        </nav>

        {/* Information / legal pages */}
        <nav aria-label={footer.information}>
          <h2 className="micro text-cream/60">{footer.information}</h2>
          <ul className="mt-4 space-y-2.5">
            {footer.informationLinks.map((label, i) => {
              const to = FOOTER_INFO[i]?.to ?? '/'
              return (
                <li key={i}>
                  {to.startsWith('http') ? (
                    <a
                      href={to}
                      target="_blank"
                      rel="noreferrer"
                      className="micro text-[10px] text-cream/80 transition-colors hover:text-cream"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link to={to} className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                      {label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="micro text-cream/60">{footer.contact}</h2>
          <address className="mt-4 space-y-2.5 text-[10px] not-italic uppercase tracking-[0.18em] text-cream/80">
            <p>{footer.address[0]}</p>
            <p>{footer.address[1]}</p>
            <p>{footer.address[2]}</p>
            <p>
              <a href={`mailto:${footer.address[3]}`} className="transition-colors hover:text-cream">
                {footer.address[3]}
              </a>
            </p>
          </address>
          <div className="mt-5 flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-white transition-colors hover:text-white">
                <Icon name={s.name} className="h-4 w-4 !text-white" />
              </a>
            ))}
            <span className="ml-2 flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cream/60">
              {(['en', 'fr', 'es'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-label={`Switch to ${l.toUpperCase()}`}
                  className={`px-1.5 py-1 transition-colors ${lang === l ? 'text-white underline underline-offset-4' : 'text-cream/70 hover:text-cream'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-2 px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-cream/60 md:flex-row md:px-10">
          <p>{footer.rights}</p>
          <p className="flex gap-4">
            {FOOTER_NAV_KEYS.map((k) => (
              <Link key={k} to={nav.find((n) => n.en === k)?.to ?? '/'} className="transition-colors hover:text-cream">
                {nav.find((n) => n.en === k)?.label ?? k}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}