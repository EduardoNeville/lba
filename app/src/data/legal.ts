import officeDespacho from "../assets/office-despacho.jpg";
import legalPracticeVertical from "../assets/legal-practice-vertical.jpg";
import homeHero from "../assets/home-hero.jpg";
import ctaCoast from "../assets/cta-coast.jpg";
import ctaBotanical from "../assets/cta-botanical.jpg";

export const hero = {
  eyebrow: "Legal",
  title: "Legal expertise at our core",
  subline: "",
  body: "Our legal background is the foundation of everything we do. We advise international clients with clarity, discretion and a deep understanding of the Spanish legal landscape.",
  cta: { to: "https://mariselacastro.com", label: "Visit our legal practice" },
  image: officeDespacho,
  alt: "Walnut desk with brass lamp and law books in an arched niche",
};

export const statement =
  "We provide independent legal advice to private and international clients, their businesses and their families.";

export const pillars = [
  {
    icon: "scales",
    title: "Independent Advice",
    body: "Objective guidance focused on your interests.",
  },
  {
    icon: "eye-off",
    title: "Discretion",
    body: "Confidentiality and sensitivity in every matter.",
  },
  {
    icon: "globe",
    title: "International Perspective",
    body: "Cross-border experience with a local understanding.",
  },
  {
    icon: "columns",
    title: "Trusted Network",
    body: "Long-standing relationships with leading professionals.",
  },
];

// ponytail: p7 — reuse existing assets until new shoots arrive (spec says reuse portada images)
export const areas = [
  {
    num: "01",
    title: "Real Estate Law",
    body: "Comprehensive legal support for the acquisition, ownership and sale of property in Spain.",
    checks: [
      "Purchase & Sale",
      "Due Diligence",
      "Contracts & Negotiation",
      "Co-ownership & Development",
      "Leases & Tenancy",
    ],
    image: homeHero,
    alt: "Modern villa",
  },
  {
    num: "02",
    title: "Tax & Structuring",
    body: "Tailored tax advice and structuring solutions for individuals, families and their assets.",
    checks: [
      "Tax Planning",
      "Wealth Structuring",
      "Inheritance & Succession",
      "Tax Compliance",
      "International Mobility",
    ],
    image: ctaBotanical,
    alt: "Botanical detail",
  },
  {
    num: "03",
    title: "Corporate & Investment",
    body: "Legal advice for companies, investors and entrepreneurs operating in or investing in Spain.",
    checks: [
      "Company Formation",
      "Commercial Contracts",
      "M&A & Transactions",
      "Shareholders Agreements",
      "Regulatory Matters",
    ],
    image: ctaCoast,
    alt: "Coastal view",
  },
];

export const practice = {
  eyebrow: "Our Legal Practice",
  heading: "Commercial minds. Legal excellence.",
  body: "Our connected law firm provides full-service legal advice to businesses and private clients in Spain and internationally. Complex matters. Clear solutions.",
  cta: { to: "https://mariselacastro.com", label: "Visit our legal practice" },
  image: legalPracticeVertical,
  alt: "Walnut desk with brass lamp and law books in an arched niche",
  right: [
    {
      icon: "scales",
      title: "Business Law",
      body: "Corporate, commercial, contracts and regulatory advice.",
    },
    {
      icon: "globe",
      title: "International Services",
      body: "Cross-border transactions and international legal coordination.",
    },
    {
      icon: "shield",
      title: "Compliance",
      body: "Compliance, risk management and corporate governance.",
    },
  ],
};

export const cta = {
  heading: "Need legal advice?",
  subline: "We are here to help.",
  image: ctaCoast,
};
