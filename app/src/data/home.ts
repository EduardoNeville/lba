import homeHero from '../assets/home-hero.jpg'
import officeDespacho from '../assets/office-despacho.jpg'
import ctaBotanical from '../assets/cta-botanical.jpg'
import pcKeys from '../assets/pc-keys.jpg'
import lifestyleGolf from '../assets/lifestyle-golf.jpg'
import type { Residence } from '../components/shared/ResidencesStrip'

export const hero = {
  eyebrow: 'Home',
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
    image: homeHero,
  },
  {
    num: '02',
    title: 'Legal',
    to: '/legal',
    items: ['Real Estate Law', 'Tax & Structuring', 'Corporate & Investment', 'Residency & Relocation'],
    image: officeDespacho,
  },
  {
    num: '03',
    title: 'Private Client Services',
    to: '/private-client',
    items: ['Relocation to Spain', 'Architecture & Renovation', 'Private Home Management', 'Concierge Services'],
    image: pcKeys,
  },
  {
    num: '04',
    title: 'Lifestyle',
    to: '/lifestyle',
    items: ['Golf', 'Schools', 'Destinations', 'Culture & Wellness', 'Local Knowledge'],
    image: lifestyleGolf,
  },
]

// ponytail: spec p3 — leave blank until real properties exist (was: one demo card)
export const residences: Residence[] = []

export const cta = { heading: 'Every client is different.', subline: 'Tell us what brings you to Spain.', image: ctaBotanical }
