// FR + ES copy for the Property page — mirrors the EN shape in src/data/property.ts
export const fr = {
  hero: {
    eyebrow: 'Propriété',
    title: 'Propriété',
    subline: 'Une approche réfléchie de l’immobilier en Espagne.',
    body: 'Acheter ou vendre un bien immobilier ne se résume pas à trouver la bonne propriété. Nous accompagnons nos clients tout au long du processus en réunissant expertise immobilière, savoir-faire juridique et réseau de professionnels de confiance.',
    cta: { to: '/inquiry', label: 'Échanger sur vos critères' },
    alt: 'Terrasse de villa moderne avec garde-corps en verre donnant sur la mer au crépuscule',
  },
  services: [
    { icon: 'key', title: 'Achat', body: 'De notre premier échange jusqu’à la remise des clés, nous vous aidons à trouver le bien qui vous correspond et vous accompagnons à chaque étape de l’acquisition.', link: '/inquiry' },
    { icon: 'building', title: 'Vente', body: 'Une approche discrète et stratégique de la vente de votre propriété, depuis son positionnement et sa présentation jusqu’à l’identification d’acquéreurs qualifiés et la gestion de la transaction.', link: '/inquiry' },
    { icon: 'figure', title: 'Recherche privée', body: 'Certaines des propriétés les plus recherchées ne sont jamais proposées publiquement. Nous menons une recherche sur mesure au sein de notre réseau afin d’identifier les opportunités correspondant à vos critères.', link: '/inquiry' },
  ],
  residences: [],
  crossLink: {
    left: {
      eyebrow: 'L’immobilier, avec une expertise juridique',
      heading: 'L’immobilier, avec une expertise juridique.',
      body: 'Notre formation juridique éclaire chaque transaction immobilière et nous permet d’examiner ce qui se trouve au-delà des apparences.',
      checks: ['Audit juridique', 'Fiscalité & structuration', 'Contrats & négociation', 'Propriété & réglementation', 'Résidence & relocalisation'],
      link: { to: 'https://mariselacastro.com', label: 'Visiter notre cabinet juridique' },
    },
    right: {
      eyebrow: 'Au-delà de la transaction',
      heading: 'Au-delà de la transaction.',
      body: 'Notre relation ne s’arrête pas à la signature. Nous restons à vos côtés pour faciliter votre installation, gérer votre résidence et vous permettre de profiter pleinement de la vie en Espagne.',
      checks: ['Gestion privée de résidence', 'Architecture & rénovation', 'Installation en Espagne', 'Services de conciergerie', 'Art de vivre & connaissance locale'],
      link: { to: '/private-client', label: 'Découvrir la clientèle privée' },
    },
  },
  cta: { heading: 'Vous envisagez un projet immobilier en Espagne ?', subline: 'Nous serions ravis d’échanger avec vous.' },
}

export const es = {
  hero: {
    eyebrow: 'Propiedad',
    title: 'Propiedad',
    subline: 'Una forma cuidada de entender la propiedad en España.',
    body: 'Comprar o vender una propiedad implica mucho más que encontrar la vivienda adecuada. Asesoramos a nuestros clientes durante todo el proceso, aunando experiencia inmobiliaria, conocimiento jurídico y una red de profesionales de confianza.',
    cta: { to: '/inquiry', label: 'Háblenos de sus necesidades' },
    alt: 'Terraza de villa moderna con barandilla de cristal sobre el mar al atardecer',
  },
  services: [
    { icon: 'key', title: 'Compra', body: 'Desde nuestra primera conversación hasta el momento en que recibe las llaves. Le ayudamos a encontrar la propiedad adecuada y le acompañamos en cada etapa de la adquisición.', link: '/inquiry' },
    { icon: 'building', title: 'Venta', body: 'Un enfoque discreto y estratégico para la venta de su propiedad, desde el posicionamiento y la presentación hasta la identificación de compradores cualificados y la gestión de la operación.', link: '/inquiry' },
    { icon: 'figure', title: 'Búsqueda privada', body: 'Algunas de las propiedades más exclusivas nunca llegan al mercado público. Realizamos una búsqueda a medida a través de nuestra red para encontrar oportunidades que se ajusten a sus necesidades.', link: '/inquiry' },
  ],
  residences: [],
  crossLink: {
    left: {
      eyebrow: 'Propiedad, con experiencia jurídica',
      heading: 'Propiedad, con experiencia jurídica.',
      body: 'Nuestra formación jurídica orienta cada operación inmobiliaria, permitiéndonos valorar aquello que va más allá de lo visible.',
      checks: ['Due diligence jurídica', 'Fiscalidad y estructuración', 'Contratos y negociación', 'Propiedad y regulación', 'Residencia y reubicación'],
      link: { to: 'https://mariselacastro.com', label: 'Visite nuestro despacho jurídico' },
    },
    right: {
      eyebrow: 'Más allá de la operación',
      heading: 'Más allá de la operación.',
      body: 'Nuestra relación no termina con el cierre de la operación. Estamos aquí para ayudarle a instalarse, gestionar su hogar y disfrutar al máximo de la vida en España.',
      checks: ['Gestión privada del hogar', 'Arquitectura y reforma', 'Reubicación en España', 'Servicios de concierge', 'Estilo de vida y conocimiento local'],
      link: { to: '/private-client', label: 'Explorar cliente privado' },
    },
  },
  cta: { heading: '¿Está considerando una propiedad en España?', subline: 'Estaremos encantados de atenderle.' },
}
