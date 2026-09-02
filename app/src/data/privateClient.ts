import pcRelocation from "../assets/pc-relocation.jpg";
import pcHomeMgmt from "../assets/pc-home-mgmt.jpg";
import pcArchitecture from "../assets/pc-architecture.jpg";
import pcConciergeLifestyle from "../assets/pc-concierge-lifestyle.jpg";
import pcPeace from "../assets/pc-peace.jpg";
import pcTerraceHero from "../assets/pc-terrace-hero.jpg";
import ctaPrivate from "../assets/cta-private-client.jpg";

export const hero = {
  eyebrow: "Private Client Services",
  title: "Private Client Services",
  subline: "Your life, well placed in Spain.",
  body: "We provide ongoing support that extends far beyond the transaction. From relocation to home management and everyday needs, we are your trusted point of contact in Spain.",
  cta: { to: "/inquiry", label: "Discuss your needs" },
  image: pcTerraceHero,
  alt: "Terrace with olive tree overlooking the sea",
};

export const contactPoints = {
  heading: "One point of contact in Spain",
  subline:
    "We simplify what can be a complex process. You tell us what you need; we take care of the rest.",
  items: [
    { icon: "figure", title: "Personal service", sub: "Tailored to you" },
    { icon: "globe", title: "Trusted network", sub: "Carefully selected" },
    { icon: "eye-off", title: "Discretion", sub: "Always" },
    {
      icon: "laurel",
      title: "Trilingual team",
      sub: "English · Spanish · French",
    },
  ],
};

export const services = [
  {
    image: pcRelocation,
    alt: "Silver suitcase in a cream stone corridor",
    title: "Relocation to Spain",
    body: "We assist you and your family with every step of your move to Spain, from visa and residency to settling in and integrating into local life.",
    link: "/inquiry",
  },
  {
    image: pcHomeMgmt,
    alt: "Private pool terrace with loungers and a bay view",
    title: "Private Home Management",
    body: "We look after your home in Spain as if it were our own. Regular oversight, maintenance, and coordination of trusted staff and services.",
    link: "/inquiry",
  },
  {
    image: pcArchitecture,
    alt: "Architect table with blueprints and stone samples in a limestone villa under renovation",
    title: "Architecture & Renovation",
    body: "From concept to completion, we manage your renovation or new build with carefully selected architects, builders and artisans.",
    link: "/inquiry",
  },
  {
    image: pcConciergeLifestyle,
    alt: "Candlelit terrace table at dusk overlooking a Mediterranean harbour",
    title: "Concierge & Lifestyle",
    body: "From everyday requests to exceptional experiences, we provide solutions that save you time and enhance your life in Spain.",
    link: "/inquiry",
  },
];

export const featureSplit = {
  image: pcPeace,
  alt: "Impeccably prepared villa entrance hall with white flowers and folded linens, arched doorway to sea terrace",
  eyebrow: "Private Home Membership",
  heading: "Peace of mind, all year round.",
  body: "Our Private Home Membership offers ongoing supervision and care of your property in Spain, with regular visits, detailed reporting and priority access to our network of professionals.",
  checks: [
    "Regular property inspections",
    "Maintenance & repairs management",
    "Housekeeping & services",
    "Key holding & security",
    "Arrival preparation",
    "Vendor coordination",
    "Monthly reporting",
    "Priority support",
  ],
  note: "Available by private arrangement.",
  cta: { to: "/inquiry", label: "Discuss your needs" },
};

export const partners = {
  heading: "A Trusted Network",
  body: "We work with a select network of professionals who share our values and standards. Lawyers, tax advisors, architects, bankers, interior designers, chefs, and more.",
  list: [
    "Architecture Studios",
    "Private Bankers",
    "Boutique Law Firms",
    "Tax Advisors",
    "Yachting Services",
    "Lifestyle Partners",
  ],
};

export const cta = {
  heading: "How can we assist you?",
  subline: "Tell us what brings you to Spain.",
  image: ctaPrivate,
};
