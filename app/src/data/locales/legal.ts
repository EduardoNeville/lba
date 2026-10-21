// Copy for the Legal page. `en` is the source of truth; fr/es replace text only —
// images live in src/data/legal.ts.
// Part-1 edits: the four value tiles are gone, and the areas grid plus the
// "Business vision" band are replaced by the "Our Law Firm" section with the
// client's dictated copy and Marisela's portrait beside it.
export const en = {
  hero: {
    title: 'Legal expertise at our core',
    body: "We advise international clients with clarity, discretion and a deep understanding of the local legal landscape.",
    alt: 'Walnut desk with brass lamp and law books in an arched niche',
  },
  statement: 'We provide independent legal advice to private and international clients, their businesses and their families.',
  areasHeading: 'Our Areas of Legal Advice',
  areas: [
    { num: '01', title: 'Real Estate Law', body: 'Comprehensive legal support for the acquisition, ownership and sale of property in Spain.', checks: ['Purchase & Sale', 'Due Diligence', 'Contracts & Negotiation', 'Co-ownership & Development', 'Leases & Tenancy'] },
    { num: '02', title: 'Tax & Structuring', body: 'Tailored tax advice and structuring solutions for individuals, families and their assets.', checks: ['Tax Planning', 'Wealth Structuring', 'Inheritance & Succession', 'Tax Compliance', 'International Mobility'] },
    { num: '03', title: 'Corporate & Investment', body: 'Legal advice for companies, investors and entrepreneurs operating in or investing in Spain.', checks: ['Company Formation', 'Commercial Contracts', 'M&A & Transactions', 'Shareholders Agreements', 'Regulatory Matters'] },
  ],
  firm: {
    eyebrow: 'Our Law Firm',
    headline: 'Our law firm was founded by Marisela Castro, a Spanish lawyer with over 25 years of experience advising international clients in Spain.',
    body: [
      'Under her leadership, our firm combines a deep legal expertise with a personal, pragmatic and solutions-oriented approach, offering tailored advice to individuals, families, investors and businesses on all aspects of their legal and property matters in Spain.',
      'From real estate transactions to tax and corporate matters, we provide clear, strategic and discreet legal support, always with a focus on our client’s long-term interests.',
    ],
  },
}

export const fr: typeof en = {
  statement: 'Nous offrons un conseil juridique indépendant à une clientèle privée et internationale, ainsi qu’à leurs familles et leurs entreprises.',
  areasHeading: 'Nos domaines d’expertise juridique',
  areas: [
    { num: '01', title: 'Droit immobilier', body: 'Accompagnement juridique complet pour l’acquisition, la détention et la vente de biens immobiliers en Espagne.', checks: ['Achat & vente', 'Due diligence', 'Contrats & négociation', 'Copropriété & promotion immobilière', 'Baux & location'] },
    { num: '02', title: 'Fiscalité & structuration', body: 'Conseil fiscal sur mesure et solutions de structuration pour les particuliers, les familles et leur patrimoine.', checks: ['Planification fiscale', 'Structuration patrimoniale', 'Héritage & succession', 'Conformité fiscale', 'Mobilité internationale'] },
    { num: '03', title: 'Droit des sociétés & investissement', body: 'Conseil juridique aux entreprises, investisseurs et entrepreneurs exerçant ou investissant en Espagne.', checks: ['Constitution de sociétés', 'Contrats commerciaux', 'Fusions-acquisitions & transactions', 'Pactes d’actionnaires', 'Questions réglementaires'] },
  ],
  hero: {
    title: 'L’expertise juridique au cœur de notre approche',
    body: "Nous conseillons une clientèle internationale sur le droit espagnol avec clarté, discrétion et une connaissance approfondie du paysage juridique local.",
    alt: 'Bureau en noyer avec lampe en laiton et livres de droit dans une niche voûtée',
  },
  firm: {
    eyebrow: 'Notre cabinet',
    headline: 'Notre cabinet a été fondé par Marisela Castro, avocate espagnole forte de plus de 25 ans d’expérience au service d’une clientèle internationale en Espagne.',
    body: [
      'Sous sa direction, notre cabinet allie une expertise juridique approfondie à une approche personnelle, pragmatique et orientée vers les solutions, en conseillant particuliers, familles, investisseurs et entreprises sur tous les aspects de leurs questions juridiques et immobilières en Espagne.',
      'Des transactions immobilières aux questions fiscales et sociétaires, nous offrons un accompagnement juridique clair, stratégique et discret, toujours attentif aux intérêts à long terme de nos clients.',
    ],
  },
}

export const es: typeof en = {
  statement: 'Prestamos asesoramiento jurídico independiente a clientes privados e internacionales, así como a sus familias y empresas.',
  areasHeading: 'Nuestras áreas de asesoramiento jurídico',
  areas: [
    { num: '01', title: 'Derecho inmobiliario', body: 'Asesoramiento jurídico integral para la adquisición, tenencia y venta de propiedades en España.', checks: ['Compraventa', 'Due diligence', 'Contratos y negociación', 'Copropiedad y promoción', 'Arrendamientos'] },
    { num: '02', title: 'Fiscalidad y estructuración', body: 'Asesoramiento fiscal personalizado y soluciones de estructuración para particulares, familias y su patrimonio.', checks: ['Planificación fiscal', 'Estructuración patrimonial', 'Herencias y sucesiones', 'Cumplimiento fiscal', 'Movilidad internacional'] },
    { num: '03', title: 'Derecho societario e inversión', body: 'Asesoramiento jurídico para empresas, inversores y emprendedores que operan o invierten en España.', checks: ['Constitución de sociedades', 'Contratos mercantiles', 'M&A y operaciones', 'Pactos de socios', 'Cuestiones regulatorias'] },
  ],
  hero: {
    title: 'La experiencia jurídica, en el centro de nuestro trabajo',
    body: "Asesoramos a clientes internacionales en derecho español con claridad, discreción y un profundo conocimiento del marco jurídico local.",
    alt: 'Escritorio de nogal con lámpara de latón y libros de derecho en un nicho arqueado',
  },
  firm: {
    eyebrow: 'Nuestro despacho',
    headline: 'Nuestro despacho fue fundado por Marisela Castro, abogada española con más de 25 años de experiencia asesorando a clientes internacionales en España.',
    body: [
      'Bajo su dirección, nuestro despacho combina una profunda experiencia jurídica con un enfoque personal, pragmático y orientado a soluciones, ofreciendo asesoramiento a medida a particulares, familias, inversores y empresas en todos los aspectos de sus asuntos jurídicos y patrimoniales en España.',
      'Desde transacciones inmobiliarias hasta asuntos fiscales y societarios, ofrecemos un acompañamiento jurídico claro, estratégico y discreto, siempre con la mirada puesta en los intereses a largo plazo de nuestros clientes.',
    ],
  },
}
