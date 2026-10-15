import homeHero from '../assets/home-hero.jpg'
import homeHeroTerrace from '../assets/home-hero-terrace.jpg'
import officeDespacho from '../assets/office-despacho.jpg'
import pcKeys from '../assets/pc-keys.jpg'

// Non-text data for the Home page — copy lives in src/data/locales/home.ts
export const hero = { image: homeHeroTerrace }

// Card order follows the client's part-1 edits: 01 Legal, 02 Real Estate, 03 Private Client.
export const practiceAreas = [
  { to: '/legal', image: officeDespacho, imagePos: 'object-right' },
  { to: '/property', image: homeHero },
  { to: '/private-client', image: pcKeys },
]
