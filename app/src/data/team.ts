import teamMarisela from '../assets/team-marisela.jpg'
import teamJoseLuis from '../assets/team-joseluis.jpg'
import teamGalina from '../assets/team-galina.jpg'

export interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
  slug: string
}

export const team: TeamMember[] = [
  {
    name: 'Marisela Castro Abad',
    role: 'Founder & Managing Lawyer',
    bio: 'Lawyer and founder of Legal Boutique Advisers, with extensive experience in real estate, taxation and international private client matters.',
    photo: teamMarisela,
    slug: '/team/marisela-castro-abad',
  },
  {
    name: 'Esther Neville',
    role: 'Property & Private Client Adviser',
    bio: "With a background in law and a Master's in Law and Economics, Esther leads the firm's property and private client advisory, working with an international clientele on their investments and life in Spain.",
    slug: '/team/esther-neville',
  },
  {
    name: 'Bettina R. Lindstrøm',
    role: 'Collaborating Architect',
    bio: 'Architect specialising in architecture, urban planning and environmentally considered design. She collaborates with our clients on projects ranging from renovations to new builds.',
    slug: '/team/bettina-lindstrom',
  },
  {
    name: 'José Luis Díaz Vázquez',
    role: 'Legal Counsel',
    bio: 'Lawyer specialising in employment and labour law, advising both companies and individuals across Spain.',
    photo: teamJoseLuis,
    slug: '/team/jose-luis-diaz-vazquez',
  },
  {
    name: 'Galina Dimitrova Nencheva',
    role: 'Client Services Manager',
    bio: 'Marketing por la Universidad de Economía de Varna (Bulgaria). Forma parte del equipo, aportando una amplia experiencia en atención al cliente internacional, gestión de servicios y coordinación administrativa. A lo largo de más de diez años de trayectoria profesional ha desarrollado sólidas habilidades organizativas, contribuyendo a ofrecer un servicio cercano, eficiente y de alta calidad.',
    photo: teamGalina,
    slug: '/team/galina-dimitrova-nencheva',
  },
]

export const values = [
  { icon: 'figure', title: 'Personal', body: 'We take the time to understand what matters to you.' },
  { icon: 'eye-off', title: 'Discreet', body: 'Confidentiality and discretion are at the core of everything we do.' },
  { icon: 'scales', title: 'Independent', body: 'Objective advice, tailored to your best interests.' },
  { icon: 'globe', title: 'Connected', body: 'A trusted network of specialists to guide you at every step.' },
]
