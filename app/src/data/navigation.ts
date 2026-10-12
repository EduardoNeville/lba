// Routes only — labels live in src/data/locales/{en,fr,es}.ts under `nav.label`,
// keyed by `key` here.
export interface NavItem {
  key: string
  to: string
  // `end` marks a link whose children are separate nav items: /property owns the
  // /property/residences listing, so without `end` both light up there (NavLink
  // matches on a path prefix by default). Items without children keep the prefix
  // behaviour on purpose — a journal post keeps "Journal" highlighted.
  end?: boolean
}

export const NAV: NavItem[] = [
  { key: 'property', to: '/property', end: true },
  { key: 'residences', to: '/property/residences' },
  { key: 'legal', to: '/legal' },
  { key: 'privateClient', to: '/private-client' },
  { key: 'journal', to: '/blog' },
  { key: 'about', to: '/about' },
]

export const FOOTER_SERVICES = [
  { to: '/property' },
  { to: '/legal' },
  { to: '/private-client' },
]

export const FOOTER_INFO = [
  { to: '/about' },
  { to: '/privacy' },
  { to: '/terms' },
]
