import homeHero from '../assets/home-hero.jpg'
import residenceModern from '../assets/residence-modern.jpg'
import panelLegal from '../assets/panel-legal.jpg'
import type { Residence } from '../components/shared/ResidencesStrip'

export const hero = {
  image: homeHero,
  alt: 'Dusk villa terrace with infinity pool overlooking the coast',
  heading: 'Legal · Property · Private Client Services',
  sub: 'A private advisory for international clients, their investments, properties and life in Spain.',
}

export const intro = {
  heading: 'More than property.',
  body: [
    'We are lawyers with extensive experience in Spanish law. We combine legal expertise with property, tax and lifestyle advisory, offering one trusted point of contact throughout your journey in Spain and the ongoing care of your home.',
  ],
  sideTitle: 'Legal expertise at our core',
  sideBody: 'All our services are delivered with a legal foundation, ensuring your interests are protected at every step.',
  sideLink: { label: 'Legal Practice', url: 'https://mariselacastro.com' },
}

export const practiceAreas = [
  {
    num: '01',
    title: 'Property',
    to: '/property',
    items: ['Buy', 'Sell', 'Private Search', 'Selected Residences'],
    image: undefined,
  },
  {
    num: '02',
    title: 'Legal',
    to: '/legal',
    items: ['Real Estate Law', 'Tax & Structuring', 'Corporate & Investment', 'Residency & Relocation'],
    image: panelLegal,
  },
  {
    num: '03',
    title: 'Private Client',
    to: '/private-client',
    items: ['Relocation to Spain', 'Architecture & Renovation', 'Private Home Management', 'Concierge Services'],
    image: undefined,
  },
  {
    num: '04',
    title: 'Lifestyle',
    to: '/lifestyle',
    items: ['Golf', 'Schools', 'Destinations', 'Culture & Wellness', 'Local Knowledge'],
    image: undefined,
  },
]

// ponytail: docx says residences section stays blank for now (no real houses yet).
// Grid tolerates fewer cards; we keep one real card so the section isn't empty.
export const residences: Residence[] = [
  { image: residenceModern, alt: 'Modern cliffside villa with infinity pool', title: 'Villa Horizonte', meta: 'Marbella · Estepona', slug: '/property/residences/villa-horizonte' },
]

export const cta = { heading: 'Every client is different.', subline: 'Tell us what brings you to Spain.' }
