import lifestyleGolf from '../assets/lifestyle-golf.jpg'
import ctaLifestyle from '../assets/cta-lifestyle.jpg'

export const hero = {
  eyebrow: 'Life in Spain',
  title: 'Lifestyle',
  subline: 'Local knowledge. Trusted introductions.',
  body: 'Beyond properties and legal matters, we help our clients discover and enjoy the best of life in Spain through curated recommendations and trusted relationships. Consider it local knowledge, at your service.',
  cta: { to: '/inquiry', label: 'Discuss your needs' },
  image: lifestyleGolf,
  alt: 'Golf fairway with bunkers at dusk',
}

export const assist = [
  { icon: 'globe', title: 'Golf', body: 'Access to premier golf courses, memberships and reservations at leading clubs.', link: { to: '/lifestyle#golf', label: 'Explore' } },
  { icon: 'columns', title: 'Schools & Education', body: 'Guidance on international and private schools, universities and educational options.', link: { to: '/lifestyle#schools', label: 'Explore' } },
  { icon: 'search', title: 'Destinations', body: 'Handpicked places across Spain for holidays, weekends and extended stays.', link: { to: '/lifestyle#destinations', label: 'Explore' } },
  { icon: 'laurel', title: 'Culture', body: 'Curated experiences in art, architecture, gastronomy and local traditions.', link: { to: '/lifestyle#culture', label: 'Explore' } },
  { icon: 'shield', title: 'Wellness', body: 'Wellness, sports and leisure recommendations for a balanced and inspired lifestyle.', link: { to: '/lifestyle#wellness', label: 'Explore' } },
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
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
]

export const cta = {
  heading: 'Your lifestyle, your way.',
  subline: 'Whether you are here for a few weeks or all year round, we are here to help you make the most of life in Spain.',
  image: ctaLifestyle,
}
