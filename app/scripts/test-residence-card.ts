// Residences card checks: renders the real card for every fixture listing in
// EN/FR/ES and asserts the text a visitor would read — price formatting, the
// "price on application" fallback, availability badges and the translated area /
// type labels. This covers the copy the dead-copy audit cannot see, because that
// audit renders the page before its data has loaded.
//
// Run: node --experimental-strip-types scripts/test-residence-card.ts

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createServer } from 'vite'

const store: Record<string, string> = {}
;(globalThis as unknown as { localStorage: unknown }).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => {
    store[k] = String(v)
  },
  removeItem: (k: string) => {
    delete store[k]
  },
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const load = (path: string) => server.ssrLoadModule(path)

const { LangProvider } = await load('/src/lib/lang.tsx')
const { PropertyCard } = await load('/src/components/ui/PropertyCard.tsx')
const { devResidences } = (await load('/src/data/seed/residences.ts')) as {
  devResidences: () => import('../src/lib/properties.ts').Property[]
}
type Property = import('../src/lib/properties.ts').Property

const properties = devResidences()
const byRef = (ref: string): Property => {
  const found = properties.find((p) => p.refCode === ref)
  if (!found) throw new Error(`No fixture residence with reference ${ref}`)
  return found
}

function renderCard(property: Property, lang: 'en' | 'fr' | 'es'): string {
  return renderPage('/', lang, React.createElement(PropertyCard, { property, showLink: true }))
}

// Mounts a component at a path. `pattern` matters for anything reading useParams
// (the residence page): without a matching route the slug is empty.
function renderPage(
  path: string,
  lang: 'en' | 'fr' | 'es',
  element: React.ReactElement,
  pattern = '*',
): string {
  store['lba-lang'] = lang
  return renderToStaticMarkup(
    React.createElement(
      LangProvider,
      null,
      React.createElement(
        MemoryRouter,
        { initialEntries: [path] },
        React.createElement(Routes, null, React.createElement(Route, { path: pattern, element })),
      ),
    ),
  )
}

function cardHtml(property: Property, lang: 'en' | 'fr' | 'es'): string {
  return renderCard(property, lang)
}

function stripHtml(html: string): string {
  // Attributes carry real copy too (placeholders, aria-labels, alt text).
  const attrs = [...html.matchAll(/(?:alt|placeholder|aria-label|title)="([^"]*)"/g)].map((m) => m[1])
  return (html.replace(/<[^>]+>/g, ' ') + ' ' + attrs.join(' '))
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cardText(property: Property, lang: 'en' | 'fr' | 'es'): string {
  return stripHtml(renderCard(property, lang))
}

let passed = 0
const failures: string[] = []

function has(name: string, haystack: string, needle: string) {
  if (haystack.includes(needle)) passed++
  else failures.push(`${name}\n    expected to contain: ${JSON.stringify(needle)}\n    in: ${haystack.slice(0, 220)}`)
}

function lacks(name: string, haystack: string, needle: string) {
  if (!haystack.includes(needle)) passed++
  else failures.push(`${name}\n    expected NOT to contain: ${JSON.stringify(needle)}`)
}

function equals(name: string, actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) passed++
  else failures.push(`${name}\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`)
}

const noop = () => {}

// --- English: formatting, specs, location line, badges ---------------------
const villa = cardText(byRef('LBA-0421'), 'en')
has('en: price', villa, '€6,450,000')
has('en: beds', villa, '5 bed')
has('en: baths', villa, '6 bath')
has('en: built area', villa, '620 m²')
has('en: location line', villa, 'Marbella · Golden Mile · Villa')
has('en: card links to the residence', cardHtml(byRef('LBA-0421'), 'en'), 'href="/property/residences/villa-infinity-pool-golden-mile"')
has('en: view link copy', villa, 'View residence')
lacks('en: no availability badge when available', villa, 'Available')

const sold = cardText(byRef('LBA-0422'), 'en')
has('en: sold badge', sold, 'Sold')
has('en: finca type label', sold, 'Finca')

const reduced = cardText(byRef('LBA-0423'), 'en')
has('en: reserved badge', reduced, 'Reserved')
has('en: reduced qualifier', reduced, 'Reduced €1,895,000')

const from = cardText(byRef('LBA-0425'), 'en')
has('en: from qualifier', from, 'From €685,000')

const poa = cardText(byRef('LBA-0426'), 'en')
has('en: price on application', poa, 'Price on application')
lacks('en: no euro price for poa', poa, '€')

// --- French ----------------------------------------------------------------
const frSold = cardText(byRef('LBA-0422'), 'fr')
has('fr: sold badge', frSold, 'Vendue')
has('fr: type label', frSold, 'Finca')
has('fr: beds abbreviation', frSold, '6 ch.')
has('fr: view link copy', frSold, 'Voir la résidence')
has('fr: price on application', cardText(byRef('LBA-0426'), 'fr'), 'Prix sur demande')
has('fr: qualifier', cardText(byRef('LBA-0425'), 'fr'), 'À partir de')

// --- Spanish: the area map actually translates -----------------------------
const esVilla = cardText(byRef('LBA-0421'), 'es')
has('es: type label', esVilla, 'Villa')
has('es: sold badge', cardText(byRef('LBA-0422'), 'es'), 'Vendida')
has('es: price on application', cardText(byRef('LBA-0426'), 'es'), 'Precio a consultar')
has('es: hab. abbreviation', esVilla, '5 hab.')
has('es: baths abbreviation', esVilla, '6 baños')
// The type map translates; the district stays as published (free text, see PLAN §16).
has('es: translated type (penthouse -> Ático)', cardText(byRef('LBA-0423'), 'es'), 'Ático')
has('es: district shown as published', esVilla, 'Golden Mile')

// --- the listing page itself (server-rendered, before its data arrives) ----
// The filters live in the query string, so the chips row has to reflect a URL
// that arrives from a shared link. The panel stays closed until asked for.
const { ResidencesPage } = await load('/src/pages/ResidencesPage.tsx')

function pageText(search: string, lang: 'en' | 'fr' | 'es'): string {
  return stripHtml(renderPage(`/property/residences${search}`, lang, React.createElement(ResidencesPage)))
}

const page = pageText('', 'en')
has('page: hero title', page, 'Selected residences')
has('page: search placeholder', page, 'Name, area or reference')
has('page: filters toggle', page, 'Filters')
has('page: sort default', page, 'Newest first')
has('page: announces that it is loading', page, 'Loading residences…')
lacks('page: does not report a false count while loading', page, '0 residences')
lacks('page: filter panel is closed by default', page, 'Property type')
lacks('page: no empty state while the data is still loading', page, 'No residences match your search.')

const frPage = pageText('?type=villa&beds=4&sort=price-desc', 'fr')
has('fr page: hero title', frPage, 'Résidences sélectionnées')
has('fr page: translated sort options', frPage, 'Plus récentes')
has('fr page: chip from the URL (beds)', frPage, '4+ Chambres')
has('fr page: chip from the URL (type)', frPage, 'Villa')
has('fr page: filter count badge', frPage, 'Filtres · 2')

// --- the nav highlights exactly one section --------------------------------
// /property/residences sits under /property, so without `end` on the parent both
// nav items light up (the bug reported on the dev site). Prefix matching must stay
// for items that have no children: a journal post still highlights "Journal".
const { SiteHeader } = await load('/src/components/layout/SiteHeader.tsx')

function activeNavItems(path: string): string[] {
  const html = renderPage(path, 'en', React.createElement(SiteHeader))
  const active: string[] = []
  for (const match of html.matchAll(/<a([^>]*)>([^<]*)<\/a>/g)) {
    const [, attrs, label] = match
    // Only the active desktop style carries a permanent underline; inactive links
    // merely have hover:text-oxblood, so this cannot match them.
    if (attrs.includes('underline-offset-8')) active.push(label.trim())
  }
  return active
}

equals('nav: home highlights nothing', activeNavItems('/'), [])
equals('nav: /property highlights Property only', activeNavItems('/property'), ['Property'])
equals('nav: /property/residences highlights Residences only', activeNavItems('/property/residences'), ['Residences'])
equals(
  'nav: a residence keeps Residences highlighted',
  activeNavItems('/property/residences/villa-infinity-pool-golden-mile'),
  ['Residences'],
)
equals('nav: /legal highlights Legal only', activeNavItems('/legal'), ['Legal'])
equals('nav: a journal post keeps Journal highlighted', activeNavItems('/blog/any-post'), ['Journal'])

// --- one residence page: gallery, specifications, copy, enquiry link ---------
const { ResidenceDetail, ResidencePage } = await load('/src/pages/ResidencePage.tsx')
const { PropertyGallery } = await load('/src/components/residences/PropertyGallery.tsx')
const { Carousel } = await load('/src/components/ui/Carousel.tsx')

const villaProperty = byRef('LBA-0421')

const galleryHtml = renderPage(
  '/',
  'en',
  React.createElement(PropertyGallery, { images: villaProperty.images, title: villaProperty.title }),
)
const gallery = stripHtml(galleryHtml)
equals('gallery: a slide per photograph', (galleryHtml.match(/aria-roledescription="slide"/g) ?? []).length, 4)
has('gallery: region label', gallery, 'Residence photographs')
has('gallery: previous arrow', gallery, 'Previous photograph')
has('gallery: next arrow', gallery, 'Next photograph')
has('gallery: counter', gallery, '1 / 4')
has('gallery: offers a full-screen view', gallery, 'View full screen')
has('gallery: cover carries the fixture alt text', gallery, 'Infinity pool and stone terrace')
lacks('gallery: thumbnails wait for the full-screen view', galleryHtml, 'View photograph 1')

// The full-screen view is its own dialog, so it is checked directly.
const { GalleryLightbox } = await load('/src/components/residences/GalleryLightbox.tsx')
const boxHtml = renderPage(
  '/',
  'en',
  React.createElement(GalleryLightbox, {
    images: villaProperty.images,
    title: villaProperty.title,
    index: 0,
    onIndexChange: noop,
    onClose: noop,
  }),
)
const box = stripHtml(boxHtml)
has('full screen: is a modal dialog', boxHtml, 'aria-modal="true"')
has('full screen: counter', box, '1 / 4')
has('full screen: can be left', box, 'Close')
equals('full screen: a thumbnail per photograph', (boxHtml.match(/aria-label="View photograph \d"/g) ?? []).length, 4)
equals('full screen: thumbnails are decorative', (boxHtml.match(/alt=""/g) ?? []).length, 4)
has('full screen: the untruncated rendition is shown', boxHtml, 'object-contain')

// --- two renditions per photograph -----------------------------------------
// The large one is for the gallery and the viewer, the small one for anything that
// shows several photographs at once. Records predating the split only have the large
// one, and must keep working.
const twoRenditions = {
  ...villaProperty,
  images: [{ url: 'https://example.test/full.jpg', cardUrl: 'https://example.test/card.jpg', alt: 'Alt text' }],
}
const legacyImage = { ...villaProperty, images: [{ url: 'https://example.test/legacy.jpg', alt: 'Alt text' }] }
has('card: downloads the small rendition', cardHtml(twoRenditions, 'en'), 'src="https://example.test/card.jpg"')
lacks('card: never the large one', cardHtml(twoRenditions, 'en'), 'src="https://example.test/full.jpg"')
has(
  'gallery: shows the large rendition',
  renderPage('/', 'en', React.createElement(PropertyGallery, { images: twoRenditions.images, title: 'x' })),
  'src="https://example.test/full.jpg"',
)
has(
  'full screen: thumbnails use the small rendition',
  renderPage(
    '/',
    'en',
    React.createElement(GalleryLightbox, {
      images: twoRenditions.images,
      title: 'x',
      index: 0,
      onIndexChange: noop,
      onClose: noop,
    }),
  ),
  'src="https://example.test/card.jpg"',
)
has('card: falls back on a record with only one rendition', cardHtml(legacyImage, 'en'), 'src="https://example.test/legacy.jpg"')

const similar = [byRef('LBA-0424'), byRef('LBA-0426')]
const detailHtml = renderPage('/', 'en', React.createElement(ResidenceDetail, { property: villaProperty, similar }))
const detail = stripHtml(detailHtml)
has('detail: title', detail, 'Villa with infinity pool above the Golden Mile')
has('detail: reference', detail, 'Reference LBA-0421')
has('detail: price', detail, '€6,450,000')
has('detail: back link', detail, '← All residences')
// The order the reader meets them in: the photographs and their floating panel,
// then the figures, then the description. ('View full screen' is body text inside
// the gallery, unlike the gallery's aria-label, which the text strip appends at the
// end.)
equals(
  'detail: gallery, then identity, then specifications, then description',
  detail.indexOf('View full screen') < detail.indexOf('Villa with infinity pool above the Golden Mile') &&
    detail.indexOf('Villa with infinity pool above the Golden Mile') < detail.indexOf('Bedrooms') &&
    detail.indexOf('Bedrooms') < detail.indexOf('A modern villa on Marbella'),
  true,
)
has('detail: bedroom spec', detail, 'Bedrooms')
has('detail: bath spec', detail, 'Bathrooms')
has('detail: built area spec', detail, '620 m²')
has('detail: terrace spec', detail, '180 m²')
has('detail: energy rating spec', detail, 'Energy rating')
has('detail: markdown heading rendered', detail, 'A modern villa on Marbella')
has('detail: markdown list rendered', detail, 'Five bedrooms, all en suite')
has('detail: features', detail, 'Gated community')
has('detail: location note', detail, 'The exact address is shared on request')
has('detail: legal line', detail, 'not contractually binding')
has('detail: enquiry call to action', detail, 'Enquire about this residence')
has('detail: enquiry link carries the reference', detailHtml, 'ref=LBA-0421')
has('detail: similar residences', detail, 'Front-line golf villa in Nueva Andalucía')
has('detail: no availability badge when available', detail, 'LBA-0421')
lacks('detail: available residence has no badge', detail, 'Available')

has(
  'detail: price on application',
  stripHtml(renderPage('/', 'en', React.createElement(ResidenceDetail, { property: byRef('LBA-0426'), similar: [] }))),
  'Price on application',
)
has(
  'detail: sold badge',
  stripHtml(renderPage('/', 'en', React.createElement(ResidenceDetail, { property: byRef('LBA-0422'), similar: [] }))),
  'Sold',
)
const frDetail = stripHtml(renderPage('/', 'fr', React.createElement(ResidenceDetail, { property: villaProperty, similar: [] })))
has('fr detail: spec labels', frDetail, 'Salles de bain')
has('fr detail: legal line', frDetail, "n'ont pas de valeur contractuelle")
has('fr detail: enquire copy', frDetail, 'Se renseigner sur cette résidence')
const esDetail = stripHtml(renderPage('/', 'es', React.createElement(ResidenceDetail, { property: villaProperty, similar: [] })))
has('es detail: spec labels', esDetail, 'Certificado energético')
has('es detail: legal line', esDetail, 'no tiene carácter contractual')
has('es detail: translated feature', esDetail, 'Vistas al mar')
has(
  'es detail: sold badge',
  stripHtml(renderPage('/', 'es', React.createElement(ResidenceDetail, { property: byRef('LBA-0422'), similar: [] }))),
  'Vendida',
)

// The page finds a cached residence synchronously, so a warm session paints it
// immediately; an unknown slug stays in the loading state until it 404s.
// The page paints a cached residence synchronously when the session is warm (from a
// listing visit); warm the loader the way a real navigation would.
const loader = (await load('/src/lib/properties.ts')) as typeof import('../src/lib/properties.ts')
await loader.loadPublishedProperties()

const detailPage = stripHtml(
  renderPage(
    '/property/residences/villa-infinity-pool-golden-mile',
    'en',
    React.createElement(ResidencePage),
    '/property/residences/:slug',
  ),
)
has('residence page: renders a cached residence', detailPage, 'Villa with infinity pool above the Golden Mile')
lacks('residence page: a known slug is not a 404', detailPage, 'no longer available')
has(
  'residence page: an unknown slug keeps loading until it resolves',
  stripHtml(
    renderPage('/property/residences/not-a-real-slug', 'en', React.createElement(ResidencePage), '/property/residences/:slug'),
  ),
  'Loading residences…',
)

// --- the enquiry a residence hands over -------------------------------------
// /inquiry?interest=property&ref=…&subject=… must arrive with the property already
// identified, in the visitor's language, and still editable.
const { InquiryPage } = await load('/src/pages/InquiryPage.tsx')
const inquiryPath = `/inquiry?interest=property&ref=LBA-0421&subject=${encodeURIComponent(villaProperty.title)}`
const inquiryHtml = renderPage(inquiryPath, 'en', React.createElement(InquiryPage))
const inquiry = stripHtml(inquiryHtml)
has('enquiry: says what it is about', inquiry, 'Regarding')
has('enquiry: names the residence from the URL', inquiry, villaProperty.title)
has('enquiry: quotes the reference from the URL', inquiry, 'LBA-0421')
has('enquiry: seeds the message', inquiry, 'I would like to know more about')
equals(
  'enquiry: preselects the property interest',
  /checked=""[^>]*value="property"|value="property"[^>]*checked=""/.test(inquiryHtml),
  true,
)
equals('enquiry: exactly one interest selected', (inquiryHtml.match(/checked=""/g) ?? []).length, 1)
const frInquiry = stripHtml(renderPage(inquiryPath, 'fr', React.createElement(InquiryPage)))
has('fr enquiry: regarding label', frInquiry, 'À propos de')
has('fr enquiry: seeded message', frInquiry, 'Je souhaiterais en savoir plus sur')
const esInquiry = stripHtml(renderPage(inquiryPath, 'es', React.createElement(InquiryPage)))
has('es enquiry: regarding label', esInquiry, 'Sobre')
has('es enquiry: seeded message', esInquiry, 'Me gustaría saber más sobre')

// --- the home band ----------------------------------------------------------
// Mounted lazily from HomePage, so it is checked here with the cache warm (which is
// what a visitor sees a moment after the page has painted).
const { FeaturedResidences } = await load('/src/components/shared/FeaturedResidences.tsx')
const bandHtml = renderPage('/', 'en', React.createElement(FeaturedResidences))
const band = stripHtml(bandHtml)
equals('band: one slide per featured residence', (bandHtml.match(/aria-roledescription="slide"/g) ?? []).length, 4)
has('band: eyebrow', band, 'Featured residences')
has('band: names the residence', band, 'Villa with infinity pool above the Golden Mile')
has('band: shows the price', band, '€6,450,000')
has('band: shows the place and the figures', band, 'Marbella · Golden Mile · Villa · 5 bed · 6 bath · 620 m²')
has('band: links to the residence', bandHtml, 'href="/property/residences/villa-infinity-pool-golden-mile"')
equals(
  'band: one link per residence (single tab stop)',
  (bandHtml.match(/href="\/property\/residences\/villa-infinity-pool-golden-mile"/g) ?? []).length,
  1,
)
has('band: offers the listing', band, 'View all properties')
has('band: counter', band, '1 / 4')
has('band: previous control', band, 'Previous photograph')
has('band: next control', band, 'Next photograph')
has('band: autoplay can be paused', bandHtml, '>Pause<')
has('band: the active photograph drifts', bandHtml, 'scale-[1.04]')
has('band: renders the full-bleed photograph', bandHtml, villaProperty.images[0].url)
has('band: a price-on-application residence still renders', band, 'Price on application')
// --- the property page strip -------------------------------------------------
// Loaded after paint from PropertyPage (it is what would otherwise pull the
// residences model into the entry chunk), which is also why the dead-copy audit
// cannot see it: it renders before the lazy component resolves.
const { PropertyStrip } = await load('/src/components/shared/PropertyStrip.tsx')
const stripText = stripHtml(renderPage('/property', 'en', React.createElement(PropertyStrip)))
has('strip: heading', stripText, 'Selected Residences')
has('strip: link to the listing', stripText, 'View all properties')
has('strip: shows the featured residences', stripText, 'Villa with infinity pool above the Golden Mile')
equals(
  'strip: one link per card',
  (renderPage('/property', 'en', React.createElement(PropertyStrip)).match(/href="\/property\/residences\//g) ?? []).length,
  4,
)

// --- the admin panels -------------------------------------------------------
// Import-safe and server-safe: the shell must not touch Firebase before it knows
// who is signed in, and the panels must render their empty state with no database.
const { AdminPage } = await load('/src/pages/AdminPage.tsx')
const { JournalAdmin } = await load('/src/components/admin/JournalAdmin.tsx')
const { ResidencesAdmin } = await load('/src/components/admin/ResidencesAdmin.tsx')
const adminHtml = renderPage('/admin', 'en', React.createElement(AdminPage))
has('admin: waits for auth before rendering a panel', stripHtml(adminHtml), 'Loading…')
lacks('admin: does not render the sign-in gate while still loading', adminHtml, 'Sign in to manage')
has(
  'admin: residences panel renders its shell',
  stripHtml(renderPage('/admin?tab=residences', 'en', React.createElement(ResidencesAdmin))),
  'New residence',
)
has(
  'admin: journal panel renders its shell',
  stripHtml(renderPage('/admin', 'en', React.createElement(JournalAdmin))),
  'New post',
)

equals('band: rank order is honoured', band.indexOf('Villa with infinity pool') < band.indexOf('Front-line golf villa'), true)
const frBand = stripHtml(renderPage('/', 'fr', React.createElement(FeaturedResidences)))
has('fr band: eyebrow', frBand, 'Résidences en vedette')
has('fr band: view copy', frBand, 'Voir la résidence')

// The home page mounts the band lazily: the server-rendered markup must not carry
// it, or five full-bleed photographs would compete with the hero for first paint.
const { HomePage } = await load('/src/pages/HomePage.tsx')
const homeHtml = renderPage('/', 'en', React.createElement(HomePage))
lacks('home: the band is not in the first paint', homeHtml, 'Featured residences')
has('home: the hero still renders', stripHtml(homeHtml), 'Lawyers & Property Advisers')

// --- carousel props ---------------------------------------------------------
const labels = { previous: 'Previous photograph', next: 'Next photograph', pause: 'Pause', play: 'Play' }
const carouselHtml = renderPage(
  '/',
  'en',
  React.createElement(Carousel, {
    items: ['a', 'b', 'c'],
    renderItem: (item: string) => React.createElement('span', null, item),
    ariaLabel: 'Test carousel',
    labels,
    dots: true,
  }),
)
equals('carousel: a group per item', (carouselHtml.match(/aria-roledescription="slide"/g) ?? []).length, 3)
has('carousel: region is labelled', carouselHtml, 'aria-label="Test carousel"')
has('carousel: previous control', carouselHtml, 'aria-label="Previous photograph"')
has('carousel: next control', carouselHtml, 'aria-label="Next photograph"')
equals(
  'carousel: a dot per item',
  (carouselHtml.match(/aria-current="(?:true|false)"/g) ?? []).length,
  3,
)
lacks('carousel: no pause control unless autoplay is on', carouselHtml, '>Pause<')
equals(
  'carousel: pause control appears with autoplay',
  (
    renderPage(
      '/',
      'en',
      React.createElement(Carousel, {
        items: ['a', 'b'],
        renderItem: (item: string) => React.createElement('span', null, item),
        ariaLabel: 'Test carousel',
        labels,
        autoplayMs: 7000,
        pauseControl: true,
      }),
    ).match(/>Pause</g) ?? []
  ).length,
  1,
)

// --- the admin writes what the public site reads ----------------------------
// The editor and the public reader are separate modules, so a field renamed on one
// side would silently publish an empty residence. This is that contract.
const Admin = (await load('/src/lib/propertyAdmin.ts')) as typeof import('../src/lib/propertyAdmin.ts')
const Reader = (await load('/src/lib/properties.ts')) as typeof import('../src/lib/properties.ts')
const adminForm = Admin.toForm(villaProperty)
const roundTripped = Reader.normaliseProperty(
  'villa-infinity-pool-golden-mile',
  Admin.toInput(adminForm) as unknown as Record<string, unknown>,
)
equals('admin → public: price', roundTripped.price, villaProperty.price)
equals('admin → public: figures', [roundTripped.beds, roundTripped.baths, roundTripped.buildArea, roundTripped.plotArea], [5, 6, 620, 1150])
equals('admin → public: text', [roundTripped.title, roundTripped.excerpt, roundTripped.area, roundTripped.district], [villaProperty.title, villaProperty.excerpt, villaProperty.area, villaProperty.district])
equals('admin → public: features', roundTripped.features, villaProperty.features)
equals('admin → public: availability and type', [roundTripped.availability, roundTripped.type], ['available', 'villa'])
equals('admin → public: photographs keep their order, url, path and alt', roundTripped.images, villaProperty.images)
equals('admin → public: featured flags', [roundTripped.featured, roundTripped.featuredRank], [true, 1])
equals('admin: an empty price means price on application', Admin.toInput({ ...adminForm, price: '' }).price, null)
equals(
  'admin → public: price on application survives the reader',
  Reader.normaliseProperty('x', Admin.toInput({ ...adminForm, price: '' }) as unknown as Record<string, unknown>).price,
  null,
)
equals('admin: the next reference follows the highest in use', Admin.nextRefCode(properties), 'LBA-0427')
equals('admin: loading a residence into the editor is lossless', Admin.toInput(Admin.toForm(byRef('LBA-0426'))).price, null)

// --- copy the audit cannot see ---------------------------------------------
// render-audit.ts deliberately leaves residences.ts unregistered (a catalogue's copy
// depends on which residences exist and on interaction), so this file carries that
// verification: the filter panel, the empty state, the "new" badge, and every label
// in the area/type/feature maps in all three languages.
const Filters = (await load('/src/lib/propertyFilters.ts')) as typeof import('../src/lib/propertyFilters.ts')
const Dicts = (await load('/src/data/locales/residences.ts')) as typeof import('../src/data/locales/residences.ts')
const { PROPERTY_AREAS, PROPERTY_FEATURES, PROPERTY_TYPES } = Reader

// A residence that uses whatever label is under test, with a neutral title so the
// assertion cannot pass on the title by accident.
function synthetic(overrides: Partial<Property>): Property {
  return {
    ...villaProperty,
    slug: 'synthetic',
    refCode: 'LBA-9999',
    title: 'Test residence',
    excerpt: '',
    district: undefined,
    ...overrides,
  }
}

const { ResidenceFilters } = await load('/src/components/residences/ResidenceFilters.tsx')
const panelText = (lang: 'en' | 'fr' | 'es') =>
  stripHtml(
    renderPage(
      '/property/residences',
      lang,
      React.createElement(ResidenceFilters, {
        // Something applied, so the panel's "clear" affordance is rendered too.
        filters: { ...Filters.emptyFilters(), beds: 3 },
        count: 0,
        defaultOpen: true,
        onPatch: noop,
        onClear: noop,
      }),
    ),
  )

const enPanel = panelText('en')
for (const label of ['Operation', 'Property type', 'Area', 'Bedrooms', 'Bathrooms', 'Status', 'Price from', 'Price to', 'Built area from', 'Features', 'Clear all']) {
  has(`panel[en]: ${label}`, enPanel, label)
}
for (const label of ['Chambres', 'Salles de bain', "Prix jusqu'à", 'Caractéristiques']) {
  has(`panel[fr]: ${label}`, panelText('fr'), label)
}
for (const label of ['Dormitorios', 'Baños', 'Precio desde', 'Características']) {
  has(`panel[es]: ${label}`, panelText('es'), label)
}

// The empty state: a warm session, and a filter nothing matches.
const emptyText = stripHtml(renderPage('/property/residences?type=plot', 'en', React.createElement(ResidencesPage)))
has('listing: empty state', emptyText, 'No residences match your search.')
has('listing: empty state explains', emptyText, 'or tell us what you are looking for')
has('listing: empty state can be cleared', emptyText, 'Clear all filters')
has('listing: empty state offers the private search', emptyText, 'Ask about our private search')

// The "new" badge only appears for a residence published in the last 30 days.
const justPublished = synthetic({ publishedAt: { seconds: Math.floor(Date.now() / 1000) } })
has('card: a fresh residence is flagged [en]', cardText(justPublished, 'en'), Dicts.en.badge.new)
has('card: a fresh residence is flagged [fr]', cardText(justPublished, 'fr'), Dicts.fr.badge.new)
has('card: a fresh residence is flagged [es]', cardText(justPublished, 'es'), Dicts.es.badge.new)

// Every label map, every language: the fixtures only use some of them, so each value
// gets its own render.
for (const lang of ['en', 'fr', 'es'] as const) {
  const dict = Dicts[lang]
  for (const type of PROPERTY_TYPES) {
    has(`types[${lang}].${type}`, cardText(synthetic({ type }), lang), dict.types[type])
  }
  for (const area of PROPERTY_AREAS) {
    has(`areas[${lang}].${area}`, cardText(synthetic({ area }), lang), dict.areas[area])
  }
  const allFeatures = stripHtml(
    renderPage(
      '/',
      lang,
      React.createElement(ResidenceDetail, { property: synthetic({ features: [...PROPERTY_FEATURES] }), similar: [] }),
    ),
  )
  for (const feature of PROPERTY_FEATURES) {
    has(`features[${lang}].${feature}`, allFeatures, dict.features[feature])
  }
  for (const availability of ['reserved', 'sold'] as const) {
    has(
      `availability[${lang}].${availability}`,
      cardText(synthetic({ availability }), lang),
      dict.availability[availability],
    )
  }
}

// A photograph with no description must fall back to the residence title, never to
// an empty alt attribute.
const noAlt = synthetic({ images: [{ url: 'test.jpg' }] })
has('card: an undescribed photograph falls back to the title', cardHtml(noAlt, 'en'), 'alt="Test residence, Marbella"')
lacks('card: never an empty alt', cardHtml(noAlt, 'en'), 'alt=""')

console.log(`\n${passed} passed, ${failures.length} failed\n`)
for (const failure of failures) console.log(`✗ ${failure}\n`)
await server.close()
process.exit(failures.length > 0 ? 1 : 0)
