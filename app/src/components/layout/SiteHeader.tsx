import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, type NavItem } from '../../data/navigation'
import { useLang } from '../../lib/lang'
import { useNav } from '../../lib/nav'
import { Icon } from '../ui/icons'

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-baseline gap-3" aria-label="Legal Boutique Advisers — home">
      <span className={`font-display text-2xl tracking-wide ${dark ? 'text-cream' : 'text-ink'}`}>LBA</span>
      <span className={`micro hidden text-[9px] leading-snug tracking-[0.3em] sm:block ${dark ? 'text-cream/70' : 'text-taupe'}`}>
        Legal Boutique
        <br />
        Advisers
      </span>
    </Link>
  )
}

function Dropdown({ item, close }: { item: NavItem; close: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const location = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label = lang === 'fr' ? navFrLabel(item.label) : lang === 'es' ? navEsLabel(item.label) : item.label

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`micro flex items-center gap-1.5 pb-1 transition-colors hover:text-oxblood ${
          location.pathname.startsWith(item.to) ? 'text-oxblood underline underline-offset-8' : 'text-ink'
        }`}
      >
        {label}
        <Icon name="chevron-down" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="absolute left-0 top-full border border-hairline bg-cream px-6 py-4">
          {item.children!.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                onClick={() => {
                  setOpen(false)
                  close()
                }}
                className="micro block py-1.5 text-[10px] text-ink/80 transition-colors hover:text-oxblood"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

// label lookup for the 4 dropdown items + About
function navFrLabel(label: string): string {
  const map: Record<string, string> = {
    Property: 'Propriété',
    Legal: 'Juridique',
    'Private Client Services': 'Services aux clients privés',
    Lifestyle: 'Art de vivre',
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
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-6 md:px-10">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) =>
              item.children ? (
                <Dropdown key={item.to} item={item} close={() => setOpen(false)} />
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `micro pb-1 transition-colors hover:text-oxblood ${
                        isActive ? 'text-oxblood underline underline-offset-8' : 'text-ink'
                      }`
                    }
                  >
                    {nav.find((n) => n.to === item.to)?.label ?? item.label}
                  </NavLink>
                </li>
              ),
            )}
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
                className={`px-1.5 py-1 transition-colors ${lang === l ? 'text-oxblood' : 'text-taupe hover:text-oxblood'}`}
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
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-cream px-6 py-8 lg:hidden">
          <ul className="space-y-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `micro text-sm tracking-[0.25em] ${isActive ? 'text-oxblood' : 'text-ink'}`
                  }
                >
                  {nav.find((n) => n.to === item.to)?.label ?? item.label}
                </NavLink>
                {item.children && (
                  <ul className="mt-3 space-y-2 border-l border-hairline pl-4">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link to={c.to} className="micro text-[10px] text-taupe hover:text-oxblood">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
                className={`px-2 py-2 transition-colors ${lang === l ? 'text-oxblood' : 'text-taupe hover:text-oxblood'}`}
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
