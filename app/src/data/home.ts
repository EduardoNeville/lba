import homeHero from '../assets/home-hero.jpg'
import heroBg from '../assets/home-hero-new.jpg'
import officeDespacho from '../assets/office-despacho.jpg'
import ctaBotanical from '../assets/cta-botanical.jpg'
import pcKeys from '../assets/pc-keys.jpg'
import type { Residence } from '../components/shared/ResidencesStrip'

// Non-text data for the Home page — copy lives in src/data/locales/home.ts
export const hero = { image: heroBg }

export const practiceAreas = [
  { to: '/property', image: homeHero },
  { to: '/legal', image: officeDespacho, imagePos: 'object-right' },
  { to: '/private-client', image: pcKeys },
]

// ponytail: spec p3 — leave blank until real properties exist (was: one demo card)
export const residences: Residence[] = []

export const cta = { image: ctaBotanical }
