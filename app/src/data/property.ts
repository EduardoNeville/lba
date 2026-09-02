import heroImage from "../assets/lifestyle-golf.jpg";
import ctaCoast from "../assets/cta-coast.jpg";
import type { Residence } from "../components/shared/ResidencesStrip";

export const hero = {
  eyebrow: "Property",
  title: "Property",
  subline: "A considered approach to property in Spain.",
  body: "Buying or selling property involves more than finding the right home. We advise our clients throughout the process, bringing together property expertise, legal insight and a trusted professional network.",
  cta: { to: "/inquiry", label: "Discuss your requirements" },
  image: heroImage,
  alt: "Golf fairway with bunkers at dusk",
};

export const services = [
  {
    icon: "figure",
    title: "Private Search",
    body: "Some of the most desirable properties are never publicly marketed. We conduct a tailored search through our network to find opportunities that meet your needs.",
    link: "/inquiry",
  },
  {
    icon: "key",
    title: "Buying",
    body: "From our first conversation to the moment you receive the keys. We help you find the right property and guide you through every step of the acquisition.",
    link: "/inquiry",
  },
  {
    icon: "building",
    title: "Selling",
    body: "A discreet and strategic approach to selling your property, from positioning and presentation to identifying qualified buyers and managing the transaction.",
    link: "/inquiry",
  },
];

// ponytail: docx says residences section stays blank for now
export const residences: Residence[] = [];

export const crossLink = {
  left: {
    eyebrow: "Property, with legal expertise",
    heading: "Property, with legal expertise.",
    body: "Our legal background informs every property transaction, allowing us to consider what lies beyond the surface.",
    checks: [
      "Legal Due Diligence",
      "Tax & Structuring",
      "Contracts & Negotiation",
      "Ownership & Regulation",
      "Residency & Relocation",
    ],
    link: { to: "/legal", label: "Explore legal services" },
  },
  right: {
    eyebrow: "Beyond the transaction",
    heading: "Beyond the transaction.",
    body: "Our relationship doesn't end at completion. We are here to help you settle in, manage your home and make the most of life in Spain.",
    checks: [
      "Private Home Management",
      "Architecture & Renovation",
      "Relocation to Spain",
      "Concierge Services",
      "Lifestyle & Local Knowledge",
    ],
    link: { to: "/private-client", label: "Explore private client" },
  },
};

export const cta = {
  heading: "Considering property in Spain?",
  subline: "We would be delighted to hear from you.",
  image: ctaCoast,
};
