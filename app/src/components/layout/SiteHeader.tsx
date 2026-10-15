import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../../lib/lang'
import { useNav, useUi } from '../../lib/nav'
import { Icon } from '../ui/icons'
import logo from '../../assets/logo-lba-ink.png'

function Logo() {
  const ui = useUi()
  return (
    <Link to="/" className="flex items-center -my-1" aria-label={ui.logoLabel}>
      {/* The lockup is a wide one (1474×472 against the old brush mark's square), so it
          is sized by height with a viewport guard: at 320px the mark, the language
          switcher and the menu button otherwise compete for the same row. */}
      <img
        src={logo}
        alt="Legal Boutique Advisers"
        className="h-9 w-auto max-w-[52vw] object-contain sm:h-12 md:h-[52px] lg:h-14"
      />
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  /* The one section whose submenu is open. The disclosure button is the only thing
     that opens it: opening on hover as well meant the button's click landed on a panel
     the pointer had already opened, so it looked like the button did the opposite of
     what was asked. Closing is deliberate — the button again, Escape, a click
     elsewhere, or navigating. */
  const [submenu, setSubmenu] = useState<string | null>(null)
  const location = useLocation()
  const { lang, setLang } = useLang()
  const nav = useNav()
  const ui = useUi()

  useEffect(() => {
    setOpen(false)
    setSubmenu(null)
  }, [location.pathname])

  // Escape and a click anywhere outside the section close it, so the menu is never
  // stuck open behind the visitor.
  useEffect(() => {
    if (!submenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSubmenu(null)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target?.closest?.('[data-nav-group]')) setSubmenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [submenu])

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
        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-6">
            {nav.map((item) => {
              const expanded = submenu === item.key
              // /property and its sub-pages: the parent link does not match them (it
              // carries `end`), so the section lights up from the child instead.
              const inSection = item.children.some(
                (child) => location.pathname === child.to || location.pathname.startsWith(`${child.to}/`),
              )
              return (
                <li key={item.key} data-nav-group className="relative flex h-20 items-center">
                  <div className="flex items-center gap-0.5">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => `micro text-[10px] xl:text-[11px] pb-1 transition-colors hover:text-oxblood ${isActive || inSection ? 'text-oxblood underline underline-offset-8' : 'text-ink'}`}
                    >
                      {item.label}
                    </NavLink>
                    {item.children.length > 0 && (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`submenu-${item.key}`}
                        aria-label={`${ui.showSubmenu} ${item.label}`}
                        onClick={() => setSubmenu(expanded ? null : item.key)}
                        className={`flex h-11 w-6 items-center justify-center transition-colors hover:text-oxblood ${expanded || inSection ? 'text-oxblood' : 'text-ink'}`}
                      >
                        <Icon name="chevron-down" className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.children.length > 0 && (
                    /* Click-only, so the button is always truthful. Closed it is
                       `invisible`, which keeps its links out of the tab order — keyboard
                       visitors open it with the button, as the disclosure pattern
                       intends. */
                    <ul
                      id={`submenu-${item.key}`}
                      className={`absolute left-0 top-full z-20 min-w-44 border border-hairline bg-cream py-1 shadow-[0_12px_32px_rgba(36,30,24,0.10)] transition-opacity duration-150 ${expanded ? 'visible opacity-100' : 'invisible opacity-0'}`}
                    >
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) => `micro block whitespace-nowrap px-4 py-2.5 text-[10px] transition-colors hover:text-oxblood ${isActive ? 'text-oxblood' : 'text-ink'}`}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em]">
            {(['en', 'fr', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-label={`${ui.switchLanguage} ${l.toUpperCase()}`}
                className={`px-1.5 py-1 transition-colors ${lang === l ? 'text-oxblood underline underline-offset-4' : 'text-taupe hover:text-oxblood'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/inquiry" className="micro hidden min-h-11 items-center border border-ink px-5 py-2 transition-colors hover:bg-ink hover:text-cream xl:flex">
            {ui.inquire}
          </Link>
          <button
            type="button"
            aria-label={open ? ui.closeMenu : ui.openMenu}
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
            {nav.map((item) => (
              <li key={item.key} data-nav-group>
                <div className="flex items-center justify-between gap-3">
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `micro text-sm tracking-[0.25em] ${isActive ? 'text-oxblood' : 'text-ink'}`}
                  >
                    {item.label}
                  </NavLink>
                  {item.children.length > 0 && (
                    <button
                      type="button"
                      aria-expanded={submenu === item.key}
                      aria-controls={`submenu-mobile-${item.key}`}
                      aria-label={`${ui.showSubmenu} ${item.label}`}
                      onClick={() => setSubmenu(submenu === item.key ? null : item.key)}
                      className="-mr-3 flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-oxblood"
                    >
                      <Icon
                        name="chevron-down"
                        className={`h-4 w-4 transition-transform ${submenu === item.key ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>
                {item.children.length > 0 && submenu === item.key && (
                  <ul id={`submenu-mobile-${item.key}`} className="mt-4 space-y-4 border-l border-hairline pl-4">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) => `micro text-[13px] tracking-[0.25em] ${isActive ? 'text-oxblood' : 'text-taupe'}`}
                        >
                          {child.label}
                        </NavLink>
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
                className={`px-2 py-2 transition-colors ${lang === l ? 'text-oxblood underline underline-offset-4' : 'text-taupe hover:text-oxblood'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/inquiry" className="micro mt-10 block w-full bg-ink py-4 text-center text-cream">
            {ui.inquire}
          </Link>
        </div>
      )}
    </header>
  )
}
