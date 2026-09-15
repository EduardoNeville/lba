import pcRelocation from "../assets/pc-relocation.jpg";
import pcHomeMgmt from "../assets/pc-home-mgmt.jpg";
import pcArchitecture from "../assets/pc-architecture.jpg";
import pcConciergeLifestyle from "../assets/golf-lake-villa-padierna.jpg";
import pcPeace from "../assets/pc-peace.jpg";
import pcTerraceHero from "../assets/pc-terrace-hero.jpg";
import ctaCoast from "../assets/cta-coast.jpg";

// Non-text data for the Private Client page — copy lives in
// src/data/locales/privateClient.ts. Service images are joined by index.
export const hero = { image: pcTerraceHero };

export const services = [
  { image: pcRelocation },
  { image: pcHomeMgmt },
  { image: pcArchitecture },
  { image: pcConciergeLifestyle },
];

export const featureSplit = { image: pcPeace };
export const cta = { image: ctaCoast };
