import pcHeroSalon from "../assets/pc-hero-salon.jpg";
import pcRelocation from "../assets/pc-relocation.jpg";
import pcHomeMgmt from "../assets/pc-home-mgmt.jpg";
import pcArchitecture from "../assets/pc-architecture.jpg";
import pcConciergeLifestyle from "../assets/golf-lake-villa-padierna.jpg";
import pcPeace from "../assets/pc-peace.jpg";

// Non-text data for the Private Client page — copy lives in
// src/data/locales/privateClient.ts. Service images are joined by index.
// Hero: the client's salon photograph ("AHORA TE ENVIO LA IMAGEN", part 2).
export const hero = { image: pcHeroSalon };

export const services = [
  { image: pcRelocation },
  { image: pcHomeMgmt },
  { image: pcArchitecture },
  { image: pcConciergeLifestyle },
];

export const featureSplit = { image: pcPeace };
