// DEV-ONLY fixture. Development falls back to these residences when Firestore has
// no published `properties` documents, so the listing, the detail page and the home
// carousel can be built and reviewed before any real listing exists.
//
// Everything here is placeholder: the copy is illustrative and the photographs are
// the project's existing stock-style assets, reused because they are already in the
// repo (no downloads, no new binaries). Replace with real listings through
// /admin — see .pi/PLAN.md P1/P5. Names, prices and references are fictional.
//
// This module is imported dynamically behind `import.meta.env.DEV`, so a production
// build never includes it.

import type { Property } from '../../lib/properties'

// Vite resolves the glob at build time; dev only cares about the URL of each file.
const assetUrls = import.meta.glob('../../assets/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const img = (file: string, alt: string) => {
  const url = assetUrls[`../../assets/${file}`]
  if (!url) throw new Error(`Seed image not found: ${file}`)
  return { url, alt }
}

const at = (iso: string) => ({ seconds: Math.floor(Date.parse(iso) / 1000) })

export const allDevResidences: Property[] = [
  {
    slug: 'villa-infinity-pool-golden-mile',
    refCode: 'LBA-0421',
    status: 'published',
    availability: 'available',
    operation: 'sale',
    type: 'villa',
    title: 'Villa with infinity pool above the Golden Mile',
    excerpt:
      'A contemporary five-bedroom villa on the hillside above the Golden Mile, with an infinity pool, sea views from every principal room and a private lift to all levels.',
    descriptionMarkdown: `## A modern villa on Marbella's most established address

Set on a quiet cul-de-sac a few minutes from the beach, the villa was completed in 2021 by a local architect known for restrained, light-filled houses. The principal floor opens entirely to the terrace, where the infinity pool appears to meet the sea.

## The layout

- Five bedrooms, all en suite, arranged over three levels served by a private lift
- Open living and dining room with a bespoke kitchen and a separate service kitchen
- Principal suite with dressing room, private terrace and sea views
- Spa level with indoor pool, gym and wine cellar

## Outside

The garden is planted with olive, pine and mature citrus, all on drip irrigation. A shaded pergola provides outdoor dining for ten, and the pool terrace faces south-west — the house catches the last of the light.

> A rare opportunity to acquire a completed, immaculately presented house on a street where very little comes to market.`,
    area: 'Marbella',
    district: 'Golden Mile',
    price: 6450000,
    priceLabel: 'fixed',
    beds: 5,
    baths: 6,
    buildArea: 620,
    terraceArea: 180,
    plotArea: 1150,
    yearBuilt: 2021,
    energyRating: 'B',
    features: ['Sea view', 'Private pool', 'Gated community', 'New build', 'Lift', 'Garage', 'Garden', 'Walk to beach'],
    images: [
      img('residence-modern.jpg', 'Infinity pool and stone terrace of a modern villa overlooking the sea'),
      img('pc-home-mgmt.jpg', 'Pool terrace with sun loungers facing the Mediterranean'),
      img('home-hero.jpg', 'Covered lounge beside the pool at sunset'),
      img('pc-terrace-hero.jpg', 'Shaded terrace table with an olive tree and sea views'),
    ],
    featured: true,
    featuredRank: 1,
    createdAt: at('2026-01-12T10:00:00Z'),
    updatedAt: at('2026-06-02T09:30:00Z'),
    publishedAt: at('2026-06-02T09:30:00Z'),
  },
  {
    slug: 'cortijo-olive-grove-benahavis',
    refCode: 'LBA-0422',
    status: 'published',
    availability: 'sold',
    operation: 'sale',
    type: 'finca',
    title: 'Cortijo with olive grove in the Benahavís hills',
    excerpt:
      'A restored Andalusian cortijo on 1.2 hectares, twenty minutes from Puerto Banús, with six bedrooms, a pool and its own olive production.',
    descriptionMarkdown: `## An Andalusian cortijo, restored with care

The original structure dates from the 1970s and was comprehensively restored in 2022: hand-made terracotta floors, lime-washed walls and reclaimed timber, with underfloor heating and full air conditioning throughout.

## Accommodation

- Six bedrooms across the main house and a separate two-bedroom guest apartment
- Shaded central courtyard, planted with jasmine and olive trees
- Country kitchen with a stone fireplace and a pantry
- Studio, laundry and machine rooms

## The land

Just over a hectare of gently sloping olive terraces, an orchard and a kitchen garden. The working olive press produces roughly 400 litres a year for the owner's own consumption.

**Availability:** this property is now sold. Similar cortijos in the area can be sourced through our private search.`,
    area: 'Benahavís',
    district: 'Monte Mayor',
    price: 2380000,
    beds: 6,
    baths: 5,
    buildArea: 480,
    terraceArea: 140,
    plotArea: 12400,
    yearBuilt: 1978,
    energyRating: 'C',
    features: ['Mountain view', 'Private pool', 'Garden', 'Renovated', 'Guest apartment', 'Furnished'],
    images: [
      img('residence-finca.jpg', 'Whitewashed courtyard with arches and an olive tree at a restored cortijo'),
      img('cta-coast.jpg', 'Distant view of the Mediterranean coast from the hills'),
      img('pc-relocation.jpg', 'Stone hallway with a terracotta urn and morning light'),
      img('home-hero-new.jpg', 'Panoramic view of Marbella bay and the coastline'),
    ],
    featured: false,
    featuredRank: 100,
    createdAt: at('2025-11-04T08:00:00Z'),
    updatedAt: at('2026-04-18T16:20:00Z'),
    publishedAt: at('2025-11-06T09:00:00Z'),
  },
  {
    slug: 'penthouse-puerto-banus-marina',
    refCode: 'LBA-0423',
    status: 'published',
    availability: 'reserved',
    operation: 'sale',
    type: 'penthouse',
    title: 'Penthouse overlooking the Puerto Banús marina',
    excerpt:
      'A three-bedroom penthouse with a 90 m² roof terrace, direct marina views and a short walk to the beach clubs and restaurants of Puerto Banús.',
    descriptionMarkdown: `## Above the marina

The penthouse occupies the top two floors of a well-run community built in 2008. The living floor is glazed on three sides, so the marina and the boats are part of the room; the roof terrace above is arranged for outdoor dining and late sun.

## Details

- Three bedrooms, three bathrooms, all on one level
- 90 m² of private terrace with pergola, outdoor kitchen and shower
- Communal pool and garden, gated with 24-hour concierge
- Two parking spaces and a store room in the basement

## Location

Plaza Antonio Banderas, El Corte Inglés and the beach are all within a five-minute walk, and Málaga airport is 50 minutes by car.

*Currently reserved — enquiries for similar penthouses along the marina are welcome.*`,
    area: 'Puerto Banús',
    district: 'Marina',
    price: 1895000,
    priceLabel: 'reduced',
    beds: 3,
    baths: 3,
    buildArea: 210,
    terraceArea: 90,
    plotArea: 0,
    yearBuilt: 2008,
    energyRating: 'D',
    features: ['Sea view', 'Terrace', 'Communal pool', 'Lift', 'Garage', 'Walk to beach', 'Gym'],
    images: [
      img('cta-private-client.jpg', 'Terrace at dusk with lanterns, looking out over the coast'),
      img('cta-lifestyle.jpg', 'Sea and pine trees seen from the coastline'),
      img('pc-terrace-hero.jpg', 'Shaded terrace table with an olive tree and sea views'),
      img('home-hero-new.jpg', 'Panoramic view of Marbella bay and the coastline'),
    ],
    featured: true,
    featuredRank: 3,
    createdAt: at('2026-02-02T11:00:00Z'),
    updatedAt: at('2026-05-21T14:05:00Z'),
    publishedAt: at('2026-02-03T10:00:00Z'),
  },
  {
    slug: 'front-line-golf-villa-nueva-andalucia',
    refCode: 'LBA-0424',
    status: 'published',
    availability: 'available',
    operation: 'sale',
    type: 'villa',
    title: 'Front-line golf villa in Nueva Andalucía',
    excerpt:
      'Four bedrooms, a south-facing pool and uninterrupted views across the fairway and lake of one of the valley’s best-known courses.',
    descriptionMarkdown: `## Front line, south facing

A single-storey villa on the first line of the golf course, built in 2004 and renovated in 2023. The living rooms and the principal suite face the fairway and the lake beyond; the second wing holds three further bedrooms for family and guests.

## Accommodation

- Four bedrooms, five bathrooms
- Open-plan living and dining with a covered terrace running the length of the house
- Kitchen with island and breakfast area
- Guest cloakroom, laundry and garage for two cars

## The garden

A heated pool with a shallow shelf, lawns, and mature palms and cypresses that give complete privacy from the neighbouring properties. Golf membership is available separately, and the clubhouse is a four-minute walk.`,
    area: 'Nueva Andalucía',
    district: 'Golf Valley',
    price: 3150000,
    beds: 4,
    baths: 5,
    buildArea: 410,
    terraceArea: 120,
    plotArea: 1020,
    yearBuilt: 2004,
    energyRating: 'C',
    features: ['Golf view', 'Private pool', 'Garage', 'Gated community', 'Furnished', 'Garden'],
    images: [
      img('golf-lake-villa-padierna.jpg', 'Golf course with a lake and a villa among the trees'),
      img('lifestyle-golf.jpg', 'Golf fairway at golden hour with the mountains behind'),
      img('pc-home-mgmt.jpg', 'Pool terrace with sun loungers facing the Mediterranean'),
      img('cta-coast.jpg', 'Distant view of the Mediterranean coast from the hills'),
    ],
    featured: true,
    featuredRank: 4,
    createdAt: at('2026-03-09T09:15:00Z'),
    updatedAt: at('2026-06-20T08:45:00Z'),
    publishedAt: at('2026-03-10T09:00:00Z'),
  },
  {
    slug: 'sea-view-apartment-la-malagueta',
    refCode: 'LBA-0425',
    status: 'published',
    availability: 'available',
    operation: 'sale',
    type: 'apartment',
    title: 'Sea-view apartment beside La Malagueta, Málaga',
    excerpt:
      'A bright two-bedroom apartment a block from the beach in Málaga, with a covered terrace, communal pool and parking.',
    descriptionMarkdown: `## City life, with the sea in front

Málaga has become the most interesting city on the coast, and this apartment sits a block behind the beach at La Malagueta: morning swims, the Pompidou and the old town all within walking distance.

## The apartment

- Two bedrooms and two bathrooms, one en suite
- South-facing covered terrace with sea views
- Open living, dining and kitchen, fully reformed in 2024
- Ducted air conditioning, double glazing and a lift to the garage

## Practical notes

Community fees are modest and the building is well maintained. A parking space and a store room are included in the price — genuinely useful in this part of the city.`,
    area: 'Málaga',
    district: 'La Malagueta',
    price: 685000,
    priceLabel: 'from',
    beds: 2,
    baths: 2,
    buildArea: 118,
    terraceArea: 30,
    plotArea: 0,
    yearBuilt: 1999,
    energyRating: 'D',
    features: ['Sea view', 'Communal pool', 'Lift', 'Garage', 'Walk to beach', 'Renovated'],
    images: [
      img('pc-relocation.jpg', 'Stone hallway with a terracotta urn and morning light'),
      img('cta-lifestyle.jpg', 'Sea and pine trees seen from the coastline'),
      img('home-hero.jpg', 'Covered lounge beside the pool at sunset'),
      img('pc-terrace-hero.jpg', 'Shaded terrace table with an olive tree and sea views'),
    ],
    featured: false,
    featuredRank: 100,
    createdAt: at('2026-06-01T07:30:00Z'),
    updatedAt: at('2026-06-28T12:00:00Z'),
    publishedAt: at('2026-06-28T12:00:00Z'),
  },
  {
    slug: 'architect-villa-sotogrande',
    refCode: 'LBA-0426',
    status: 'published',
    availability: 'available',
    operation: 'sale',
    type: 'villa',
    title: 'Architect-designed villa above Sotogrande',
    excerpt:
      'A seven-bedroom house of stone and glass, completed in 2024, with a spa, a gym, and views over the marina and the strait.',
    descriptionMarkdown: `## Stone, glass and light

The house was designed for a family who wanted to live outside: every principal room opens directly onto stone terraces, and the pool runs along the southern edge of the plot so that the sea is always in view.

## Accommodation

- Seven bedrooms, eight bathrooms, over two floors and a lower spa level
- Indoor pool, gym, sauna and a treatment room
- Cinema, wine cellar and a separate guest casita
- Staff accommodation with its own entrance

## The plot

3,400 m² of landscaped grounds with mature olives, cypresses and a kitchen garden. The property is offered **fully furnished**, and the price is available on application for reasons of confidentiality. Viewings are accompanied and strictly by appointment.`,
    area: 'Sotogrande',
    district: 'Kings and Queens',
    price: null,
    beds: 7,
    baths: 8,
    buildArea: 980,
    terraceArea: 320,
    plotArea: 3400,
    yearBuilt: 2024,
    energyRating: 'A',
    features: ['Sea view', 'Private pool', 'Garden', 'Gym', 'Spa', 'Gated community', 'New build', 'Guest apartment'],
    images: [
      img('property-hero.jpg', 'Modern stone villa with a glass balustrade terrace at sunset'),
      img('lifestyle-golf.jpg', 'Golf fairway at golden hour with the mountains behind'),
      img('pc-home-mgmt.jpg', 'Pool terrace with sun loungers facing the Mediterranean'),
      img('home-hero.jpg', 'Covered lounge beside the pool at sunset'),
    ],
    featured: true,
    featuredRank: 2,
    createdAt: at('2026-04-14T10:40:00Z'),
    updatedAt: at('2026-06-11T15:10:00Z'),
    publishedAt: at('2026-04-15T09:00:00Z'),
  },
  {
    slug: 'townhouse-san-pedro-alcantara',
    refCode: 'LBA-0427',
    status: 'draft',
    availability: 'available',
    operation: 'sale',
    type: 'townhouse',
    title: 'Townhouse a short walk from San Pedro beach',
    excerpt: 'Three-bedroom townhouse with a private garden, two minutes from the seafront promenade.',
    descriptionMarkdown: `Draft listing — copy, photography and the energy certificate are still to be supplied by the vendor.

- Three bedrooms, two bathrooms
- Private garden and terrace
- Community pool`,
    area: 'San Pedro de Alcántara',
    district: 'Playa',
    price: 540000,
    beds: 3,
    baths: 2,
    buildArea: 165,
    terraceArea: 40,
    plotArea: 180,
    yearBuilt: 1996,
    energyRating: 'E',
    features: ['Communal pool', 'Garden', 'Walk to beach', 'Garage'],
    images: [img('residence-modern.jpg', 'Placeholder image for a draft listing')],
    featured: false,
    featuredRank: 100,
    createdAt: at('2026-07-02T09:00:00Z'),
    updatedAt: at('2026-07-02T09:00:00Z'),
  },
]

// What the public site would see — a draft must never leave the admin.
export function devResidences(): Property[] {
  return allDevResidences.filter((p) => p.status === 'published')
}
