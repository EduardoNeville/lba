import { Link } from 'react-router-dom'
import { FOOTER_INFO, FOOTER_SERVICES, NAV } from '../../data/navigation'
import { Icon } from '../ui/icons'

const SOCIALS = [
  { name: 'instagram', label: 'Instagram' },
  { name: 'linkedin', label: 'LinkedIn' },
  { name: 'mail', label: 'Email' },
]

export function SiteFooter() {
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
          <p className="micro mt-4 text-[10px] text-cream/60">Lawyers & Private Advisors</p>
        </div>
        <nav aria-label="Services">
          <h2 className="micro text-cream/60">Our Services</h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_SERVICES.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Information">
          <h2 className="micro text-cream/60">Information</h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_INFO.map((s) =>
              s.to.startsWith('http') ? (
                <li key={s.label}>
                  <a href={s.to} target="_blank" rel="noreferrer" className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.to}>
                  <Link to={s.to} className="micro text-[10px] text-cream/80 transition-colors hover:text-cream">
                    {s.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div>
          <h2 className="micro text-cream/60">Contact</h2>
          <address className="mt-4 space-y-2.5 text-[10px] not-italic uppercase tracking-[0.18em] text-cream/80">
            <p>Calle Nuestra Señora de Gracia, 26, bajo</p>
            <p>Marbella, Spain</p>
            <p>+34 952 777 991 · +34 663 109 014</p>
            <p>
              <a href="mailto:info@legalboutiqueadvisers.com" className="transition-colors hover:text-cream">
                info@legalboutiqueadvisers.com
              </a>
            </p>
          </address>
          <div className="mt-5 flex gap-4">
            {SOCIALS.map((s) => (
              <a key={s.name} href="#" aria-label={s.label} className="text-cream/70 transition-colors hover:text-cream">
                <Icon name={s.name} className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Link
            to="/inquiry#form"
            className="micro mt-6 inline-block border border-cream/40 px-5 py-2 text-[10px] text-cream transition-colors hover:bg-cream hover:text-maroon"
          >
            Make a private enquiry
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-between gap-2 px-6 py-6 text-[10px] uppercase tracking-[0.2em] text-cream/60 md:flex-row md:px-10">
          <p>© 2024 Legal Boutique Advisers. All rights reserved.</p>
          <p className="flex gap-4">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="transition-colors hover:text-cream">
                {n.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
