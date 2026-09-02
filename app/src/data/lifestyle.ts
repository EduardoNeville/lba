import lifestyleHero from '../assets/property-hero.jpg'
import ctaLifestyle from '../assets/cta-lifestyle.jpg'

export const hero = {
  eyebrow: 'Lifestyle',
  title: 'Local knowledge',
  subline: 'Trusted introductions.',
  body: 'Beyond properties and legal matters, we help our clients discover and enjoy the best of life in Spain through curated recommendations and trusted relationships. Consider it local knowledge, at your service.',
  cta: { to: '/inquiry', label: 'Discover life in Spain' },
  image: lifestyleHero,
  alt: 'Modern villa terrace with glass rail overlooking the sea at dusk',
}

// ponytail: spec p12 — remove Explore, use nicer icons, larger titles
export const assist = [
  { icon: 'globe', title: 'Golf', body: 'Access to premier golf courses, memberships and reservations at leading clubs.' },
  { icon: 'columns', title: 'Schools & Education', body: 'Guidance on international and private schools, universities and educational options.' },
  { icon: 'search', title: 'Destinations', body: 'Handpicked places across Spain for holidays, weekends and extended stays.' },
  { icon: 'laurel', title: 'Culture', body: 'Curated experiences in art, architecture, gastronomy and local traditions.' },
  { icon: 'shield', title: 'Wellness', body: 'Wellness, sports and leisure recommendations for a balanced and inspired lifestyle.' },
]

export const access = {
  heading: 'Insider Access',
  body: 'We open doors to the people, places and experiences that make life in Spain exceptional.',
  checks: [
    'Members-Only Clubs',
    'Restaurant Reservations',
    'Private Events',
    'Yachting & Boating',
    'Wine & Gastronomy',
    'Art & Cultural Institutions',
    'Health & Wellness',
    'Tailored Recommendations',
  ],
}

export const mosaic = [
  { src: lifestyleGolf, alt: 'Golf fairway with bunkers at dusk' },
  { src: ctaLifestyle, alt: 'Dusk coast framed by olive branches' },
]

export const cta = {
  heading: 'Your lifestyle, your way.',
  subline: 'Whether you are here for a few weeks or all year round, we are here to help you make the most of life in Spain.',
  image: ctaLifestyle,
}
