import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../../data/navigation'
import { useLang } from '../../lib/lang'
import { useNav } from '../../lib/nav'
import logoBrush from '../../assets/logo-lba-brush.svg'

function Logo() {
  return (
    <Link to="/" className="flex items-center -my-1" aria-label="Legal Boutique Advisers home page">
      <img src={logoBrush} alt="Legal Boutique Advisers" className="h-12 w-auto object-contain md:h-[52px] lg:h-14" />
    </Link>
  )
}

function navFrLabel(label: string): string {
  const map: Record<string, string> = {
    Property: 'Propriété',
    Legal: 'Juridique',
    'Private Client Services': 'Services aux clients privés',
    Lifestyle: 'Art de vivre',
    Journal: 'Journal',
    About: 'À propos',
  }
  return map[label] ?? label
}
function navEsLabel(label: string): string {
  const map: Record<string, string> = {
    Property: 'Propiedad',
    Legal: 'Legal',
    'Private Client Services': 'Servicios para clientes privados',
    Lifestyle: 'Estilo de vida',
    Journal: 'Journal',
    About: 'Nosotros',
  }
  return map[label] ?? label
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { lang, setLang } = useLang()
  const nav = useNav()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream">
      <div className="flex h-14 items-center justify-between px-6 md:px-10 lg:h-20">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `micro pb-1 transition-colors hover:text-oxblood ${isActive ? 'text-oxblood underline underline-offset-8' : 'text-ink'}`}
                >
                  {lang === 'fr' ? navFrLabel(item.label) : lang === 'es' ? navEsLabel(item.label) : nav.find((n) => n.to === item.to)?.label ?? item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em]">
            {(['en', 'fr', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-label={`Switch to ${l.toUpperCase()}`}
                className={`px-1.5 py-1 transition-colors ${lang === l ? 'text-oxblood underline underline-offset-4' : 'text-taupe hover:text-oxblood'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/inquiry" className="micro hidden min-h-11 items-center border border-ink px-5 py-2 transition-colors hover:bg-ink hover:text-cream lg:flex">
            {lang === 'fr' ? 'Nous contacter' : lang === 'es' ? 'Contacto' : 'Inquire'}
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-14 z-40 overflow-y-auto bg-cream px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden lg:top-20">
          <ul className="space-y-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `micro text-sm tracking-[0.25em] ${isActive ? 'text-oxblood' : 'text-ink'}`}
                >
                  {lang === 'fr' ? navFrLabel(item.label) : lang === 'es' ? navEsLabel(item.label) : nav.find((n) => n.to === item.to)?.label ?? item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-1 border-t border-hairline pt-6 text-[10px] uppercase tracking-[0.2em]">
            {(['en', 'fr', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-label={`Switch to ${l.toUpperCase()}`}
                className={`px-2 py-2 transition-colors ${lang === l ? 'text-oxblood underline underline-offset-4' : 'text-taupe hover:text-oxblood'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/inquiry" className="micro mt-10 block w-full bg-ink py-4 text-center text-cream">
            {lang === 'fr' ? 'Nous contacter' : lang === 'es' ? 'Contacto' : 'Inquire'}
          </Link>
        </div>
      )}
    </header>
  )
}
