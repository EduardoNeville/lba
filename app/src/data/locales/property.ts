// Copy for the Property page. `en` is the source of truth; fr/es replace text only —
// images and links live in src/data/property.ts.
// Part-2 edits: the hero is a split lockup ("Real Estate" + the dictated two-column
// intro), the curated split and the featured strip are gone, the services read
// Buying/Selling, and the cross-link band carries eyebrows, sentence headings and a
// single body line each — no checklists.
export const en = {
  hero: {
    eyebrow: 'Real Estate',
    title: 'Real Estate',
    body: [
      'We provide tailored real estate advisory services to international clients looking to buy, sell or invest in property across Spain. From luxury residences and second homes to investment opportunities, we guide our clients through every stage of the process.',
      'Based in Marbella, with a strong focus on the Costa del Sol, we offer access to a carefully selected portfolio of properties, including exclusive off-market opportunities. We also provide a personalised property search service tailored to each client’s individual requirements.',
    ],
    alt: 'Golf fairway with bunkers at dusk',
  },
  band: {
    eyebrow: 'Buying in Spain',
    heading: 'Access to the Finest Opportunities.',
    body: 'From contemporary villas to historic townhouses, we offer exclusive access to exceptional properties across the most sought-after locations in Spain.',
    link: { to: '/property/residences', label: 'Our properties' },
  },
  servicesHeading: 'Our Services',
  services: [
    { title: 'Property Search', body: 'Some of the most desirable properties are never publicly marketed. We conduct a tailored search through our network to find opportunities that meet your needs.' },
    { title: 'Buying', body: 'From our first conversation to the moment you receive the keys. We help you find the right property and guide you through every step of the acquisition.' },
    { title: 'Selling', body: 'A discreet and strategic approach to selling your property, from positioning and presentation to identifying qualified buyers and managing the transaction.' },
    { title: 'Investment Advisory', body: 'Independent advice for property investment across Spain’s key markets.' },
  ],
}

export const fr: typeof en = {
  hero: {
    eyebrow: 'Immobilier',
    title: 'Immobilier',
    body: [
      'Nous offrons un conseil immobilier sur mesure à une clientèle internationale qui souhaite acheter, vendre ou investir dans l’immobilier en Espagne. Des résidences de luxe et résidences secondaires aux opportunités d’investissement, nous guidons nos clients à chaque étape du processus.',
      'Basés à Marbella, avec un fort ancrage sur la Costa del Sol, nous donnons accès à un portefeuille de biens soigneusement sélectionné, incluant des opportunités hors marché exclusives. Nous proposons également un service de recherche personnalisée adapté aux exigences de chaque client.',
    ],
    alt: 'Parcours de golf avec bunkers au crépuscule',
  },
  band: {
    eyebrow: 'Acheter en Espagne',
    heading: 'Accès aux plus belles opportunités.',
    body: "Des villas contemporaines aux maisons de ville historiques, nous offrons un accès exclusif à des biens d’exception dans les adresses les plus recherchées d’Espagne.",
    link: { to: '/property/residences', label: 'Nos propriétés' },
  },
  servicesHeading: 'Nos services',
  services: [
    { title: 'Recherche de biens', body: "Certains des biens les plus recherchés ne sont jamais proposés publiquement. Nous menons une recherche sur mesure au sein de notre réseau afin d’identifier les opportunités correspondant à vos critères." },
    { title: 'Achat', body: "De notre premier échange jusqu’à la remise des clés, nous vous aidons à trouver le bien qui vous correspond et vous accompagnons à chaque étape de l’acquisition." },
    { title: 'Vente', body: "Une approche discrète et stratégique de la vente de votre bien, du positionnement et de la présentation à l’identification d’acquéreurs qualifiés et à la gestion de la transaction." },
    { title: 'Conseil en investissement', body: 'Un conseil indépendant pour vos investissements immobiliers sur les principaux marchés espagnols.' },
  ],
}

export const es: typeof en = {
  hero: {
    eyebrow: 'Inmobiliaria',
    title: 'Inmobiliaria',
    body: [
      'Ofrecemos asesoramiento inmobiliario a medida a clientes internacionales que desean comprar, vender o invertir en propiedades en España. Desde residencias de lujo y segundas viviendas hasta oportunidades de inversión, acompañamos a nuestros clientes en cada etapa del proceso.',
      'Con base en Marbella, con especial dedicación a la Costa del Sol, ofrecemos acceso a una cartera de propiedades cuidadosamente seleccionada, que incluye oportunidades exclusivas fuera de mercado. También ofrecemos un servicio de búsqueda personalizado adaptado a los requisitos de cada cliente.',
    ],
    alt: 'Campo de golf con bunkers al atardecer',
  },
  band: {
    eyebrow: 'Comprar en España',
    heading: 'Acceso a las mejores oportunidades.',
    body: 'Desde villas contemporáneas hasta casas señoriales, ofrecemos acceso exclusivo a propiedades excepcionales en las ubicaciones más demandadas de España.',
    link: { to: '/property/residences', label: 'Nuestras propiedades' },
  },
  servicesHeading: 'Nuestros servicios',
  services: [
    { title: 'Búsqueda de propiedades', body: 'Algunas de las propiedades más exclusivas nunca llegan al mercado público. Realizamos una búsqueda a medida a través de nuestra red para encontrar oportunidades que se ajusten a sus necesidades.' },
    { title: 'Compra', body: 'Desde nuestra primera conversación hasta el momento en que recibe las llaves. Le ayudamos a encontrar la propiedad adecuada y le acompañamos en cada etapa de la adquisición.' },
    { title: 'Venta', body: 'Un enfoque discreto y estratégico para la venta de su propiedad, desde el posicionamiento y la presentación hasta la identificación de compradores cualificados y la gestión de la operación.' },
    { title: 'Asesoramiento en inversión', body: 'Asesoramiento independiente para la inversión inmobiliaria en los principales mercados de España.' },
  ],
}
