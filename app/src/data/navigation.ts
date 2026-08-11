export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to: string
  children?: NavChild[]
}

export const LEGAL_PRACTICE_URL = 'https://mariselacastro.com'

export const NAV: NavItem[] = [
  { label: 'Property', to: '/property', children: [
    { label: 'Buying', to: '/property#buying' },
    { label: 'Selling', to: '/property#selling' },
    { label: 'Private Search', to: '/property#private-search' },
    { label: 'Selected Residences', to: '/property#residences' },
  ] },
  { label: 'Legal', to: '/legal', children: [
    { label: 'Real Estate Law', to: '/legal#real-estate' },
    { label: 'Tax & Structuring', to: '/legal#tax' },
    { label: 'Corporate & Investment', to: '/legal#corporate' },
    { label: 'Residency & Relocation', to: '/legal#residency' },
  ] },
  { label: 'Private Client Services', to: '/private-client', children: [
    { label: 'Relocation to Spain', to: '/private-client#relocation' },
    { label: 'Architecture & Renovation', to: '/private-client#architecture' },
    { label: 'Private Home Management', to: '/private-client#home-management' },
    { label: 'Concierge Services', to: '/private-client#concierge' },
  ] },
  { label: 'Lifestyle', to: '/lifestyle', children: [
    { label: 'Golf', to: '/lifestyle#golf' },
    { label: 'Schools', to: '/lifestyle#schools' },
    { label: 'Destinations', to: '/lifestyle#destinations' },
    { label: 'Culture', to: '/lifestyle#culture' },
    { label: 'Wellness', to: '/lifestyle#wellness' },
  ] },
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
  { label: 'Legal Practice', to: LEGAL_PRACTICE_URL },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
]
