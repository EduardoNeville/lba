// Copy for the Home page. `en` is the source of truth; fr/es replace text only —
// images, links and positions live in src/data/home.ts.
// Part-1 edits: the hero is the brand lockup over the terrace photograph — the
// descriptor line carries the middle dots the client asked for; the CTA band is the
// bare enquiry button, so the cta copy is gone.
export const en = {
  hero: {
    alt: 'Mediterranean terrace of a modern villa with an infinity pool over the sea',
    heading: 'Legal Boutique Advisers',
    sub: 'Law · Real Estate · Property Management',
  },
  intro: {
    heading: "Three Services. One Firm.",
    body: [
      "We combine a law firm, real estate agency and a property management company working as one team. Offering personalized and secure services for our international clients in Spain.",
    ],
  },
  practiceAreas: [
    {
      num: '01',
      title: 'Legal',
      body: 'Legal and tax advice for property, business and family matters, including inheritance and donations.',
    },
    {
      num: '02',
      title: 'Real Estate',
      body: 'Acquisition, sale and investment advisory across Spain.',
    },
    {
      num: '03',
      title: 'Private Client Services',
      body: 'Property management, relocation and ongoing support.',
    },
  ],
  why: {
    heading: 'Why one firm makes a difference',
    rows: [
      { title: 'One person to call.', body: 'You always know who to ask.' },
      {
        title: 'Legal and tax advice from day one.',
        body: 'Our lawyers are involved before you make an offer, not after.',
      },
      {
        title: 'We don’t disappear after completion.',
        body: 'When you get the keys, we’re still here.',
      },
    ],
  },
}

export const fr: typeof en = {
  hero: {
    alt: 'Terrasse méditerranéenne d’une villa moderne avec piscine à débordement sur la mer',
    heading: 'Legal Boutique Advisers',
    sub: 'Droit · Immobilier · Gestion de biens',
  },
  intro: {
    heading: 'Trois métiers. Une seule équipe.',
    body: [
      "Nous réunissons un cabinet d’avocats, une agence immobilière et une société de gestion de biens immobiliers qui travaillent main dans la main. Des services personnalisés et sécurisés pour notre clientèle internationale en Espagne.",
    ],
  },
  practiceAreas: [
    {
      num: '01',
      title: 'Juridique',
      body: 'Conseil juridique et fiscal en matière immobilière, professionnelle et familiale, y compris successions et donations.',
    },
    {
      num: '02',
      title: 'Immobilier',
      body: 'Conseil à l’acquisition, à la vente et à l’investissement partout en Espagne.',
    },
    {
      num: '03',
      title: 'Clientèle privée',
      body: 'Gestion de résidence, installation et accompagnement dans la durée.',
    },
  ],
  why: {
    heading: 'Pourquoi tout réunir fait la différence',
    rows: [
      { title: 'Un seul interlocuteur.', body: 'Vous savez toujours à qui vous adresser.' },
      {
        title: 'Conseil juridique et fiscal dès le premier jour.',
        body: 'Nos avocats interviennent avant votre offre, pas après.',
      },
      {
        title: 'Nous ne disparaissons pas après la vente.',
        body: 'Une fois les clés remises, nous restons à vos côtés.',
      },
    ],
  },
}

export const es: typeof en = {
  hero: {
    alt: 'Terraza mediterránea de una villa moderna con piscina infinita frente al mar',
    heading: 'Legal Boutique Advisers',
    sub: 'Derecho · Inmobiliaria · Gestión de propiedades',
  },
  intro: {
    heading: 'Tres servicios. Una sola firma.',
    body: [
      "Reunimos un despacho de abogados, una agencia inmobiliaria y una empresa de gestión de propiedades que trabajan como un solo equipo. Servicios personalizados y seguros para nuestros clientes internacionales en España.",
    ],
  },
  practiceAreas: [
    {
      num: '01',
      title: 'Legal',
      body: 'Asesoramiento jurídico y fiscal en asuntos inmobiliarios, empresariales y familiares, incluidas herencias y donaciones.',
    },
    {
      num: '02',
      title: 'Inmobiliaria',
      body: 'Asesoramiento en compra, venta e inversión en toda España.',
    },
    {
      num: '03',
      title: 'Cliente privado',
      body: 'Gestión de la vivienda, reubicación y acompañamiento continuo.',
    },
  ],
  why: {
    heading: 'Por qué una sola firma marca la diferencia',
    rows: [
      { title: 'Un solo interlocutor.', body: 'Siempre sabrá a quién preguntar.' },
      {
        title: 'Asesoramiento jurídico y fiscal desde el primer día.',
        body: 'Nuestros abogados intervienen antes de que haga una oferta, no después.',
      },
      {
        title: 'No desaparecemos tras la compra.',
        body: 'Cuando reciba las llaves, seguiremos aquí.',
      },
    ],
  },
}
