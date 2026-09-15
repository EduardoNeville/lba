// Routes only — labels live in src/data/locales/{en,fr,es}.ts under `nav.label`,
// keyed by `key` here.
export interface NavItem {
  key: string
  to: string
}

export const NAV: NavItem[] = [
  { key: 'property', to: '/property' },
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
