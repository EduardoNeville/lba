export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to: string
  children?: NavChild[]
}

export const NAV: NavItem[] = [
  { label: 'Property', to: '/property' },
  { label: 'Legal', to: '/legal' },
  { label: 'Private Client Services', to: '/private-client' },
  { label: 'Lifestyle', to: '/lifestyle' },
  { label: 'Journal', to: '/blog' },
  { label: 'About', to: '/about' },
]

export const FOOTER_SERVICES = [
  { label: 'Property Advisory', to: '/property' },
  { label: 'Legal Advisory', to: '/legal' },
  { label: 'Private Client Advisory', to: '/private-client' },
  { label: 'Lifestyle', to: '/lifestyle' },
]

export const FOOTER_INFO = [
  { label: 'About', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
]
