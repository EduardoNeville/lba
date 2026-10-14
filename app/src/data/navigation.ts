// Routes only — labels live in src/data/locales/{en,fr,es}.ts under `nav.label`,
// keyed by `key` here.
export interface NavChild {
  key: string
  to: string
}

export interface NavItem {
  key: string
  to: string
  // `end` keeps the parent link from matching its own sub-pages: /property owns the
  // /property/residences listing, which now lives in the dropdown, so the header
  // lights the parent up from its children instead (see SiteHeader). Items without
  // children keep the prefix behaviour on purpose — a journal post keeps "Journal"
  // highlighted.
  end?: boolean
  /** Sub-pages of this section: a dropdown on desktop, nested links in the mobile menu. */
  children?: NavChild[]
}

export const NAV: NavItem[] = [
  { key: 'legal', to: '/legal' },
  {
    key: 'property',
    to: '/property',
    end: true,
    children: [{ key: 'residences', to: '/property/residences' }],
  },
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
