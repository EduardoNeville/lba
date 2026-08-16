import { Link } from 'react-router-dom'
import { FOOTER_INFO, FOOTER_SERVICES } from '../../data/navigation'
import { useLang } from '../../lib/lang'
import { useFooter, FOOTER_NAV_KEYS, useNav } from '../../lib/nav'
import { Icon } from '../ui/icons'

const SOCIALS = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'mail', label: 'Email' },
]

export function SiteFooter() {
  const { lang, setLang } = useLang()
  const footer = useFooter()
  const nav = useNav()

  const servicesLinks: string[] = footer.servicesLinks
  const infoLinks: string[] = footer.informationLinks

  return (
    <footer className="bg-maroon text-cream">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-baseline gap-3" aria-label="Legal Boutique Advisers — home">
            <span className="font-display text-2xl tracking-wide text-cream">LBA</span>
            <span className="micro text-[9px] leading-snug tracking-[0.3em] text-cream/70">
              Legal Boutique
              <br />
              Advisers
            </span>
          </Link>
          <p className="micro mt-4 text-[10px] text-cream/60">{footer.tagline}</p>
        </div>
        <nav aria-label="Services">
          <h2 className="micro text-cream/60">{footer.services}</h2>
          <ul className="mt-4 space-y-2.5">
            {servicesLinks.map((label: string, i: number) => (
              <li key={i}>
                <Link to={FOOTER_SERVICES[i]?.to ?? '/'} className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Information">
          <h2 className="micro text-cream/60">{footer.information}</h2>
          <ul className="mt-4 space-y-2.5">
            {infoLinks.map((label: string, i: number) => (
              <li key={i}>
                <Link to={FOOTER_INFO[i]?.to ?? '/'} className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
              <a key={s.name} href="#" aria-label={s.label} className="text-white transition-colors hover:text-white">
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
          <Link
            to="/inquiry#form"
            className="micro mt-6 inline-block border border-cream/40 px-5 py-2 text-[10px] text-cream transition-colors hover:bg-cream hover:text-maroon"
          >
            {footer.enquire}
          </Link>
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
