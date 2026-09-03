import { useLang } from "../lib/lang";
import { NAV } from "../data/navigation";
import {
  nav as navFr,
  footer as footerFr,
  ui as uiFr,
} from "../data/locales/fr";
import {
  nav as navEs,
  footer as footerEs,
  ui as uiEs,
} from "../data/locales/es";

// EN fallbacks (data/navigation.ts exports NAV, not a dict)
const navEnFooter = {
  tagline: "Lawyers & Private Advisors",
  services: "Our Services",
  servicesLinks: [
    "Property Advisory",
    "Legal Advisory",
    "Private Client Advisory",
  ],
  information: "Information",
  informationLinks: ["About", "Privacy Policy", "Terms & Conditions"],
  contact: "Contact",
  address: [
    "Calle Nuestra Señora de Gracia, 26, bajo",
    "Marbella, Málaga, Spain",
    "+34 952 777 991 · +34 663 109 014",
    "info@legalboutiqueadvisers.com",
  ],
  enquire: "Make a private enquiry",
  rights: "© 2021 Legal Boutique Advisers. All rights reserved.",
};
const navEnUi = {
  inquire: "Inquire",
  discoverMore: "Discover more",
  viewAllProperties: "View all properties",
  viewAllResidences: "View all residences",
  viewResidence: "View residence",
  learnMore: "Learn more",
  explore: "Explore",
  meetTheTeam: "Meet the team",
  discuss: "Discuss your needs",
  submit: "Submit enquiry",
  selectedResidences: "Selected Residences",
};

export function useNav() {
  const { lang } = useLang();
  const dict = lang === "fr" ? navFr : lang === "es" ? navEs : null;
  return NAV.map((item) => {
    const label = dict
      ? (dict.label[item.to.replace("/", "") as keyof typeof dict.label] ??
        item.label)
      : item.label;
    return { label, to: item.to, en: item.label };
  });
}

export function useFooter() {
  const { lang } = useLang();
  if (lang === "fr") return footerFr;
  if (lang === "es") return footerEs;
  return navEnFooter;
}

export function useUi() {
  const { lang } = useLang();
  if (lang === "fr") return uiFr;
  if (lang === "es") return uiEs;
  return navEnUi;
}

export const FOOTER_NAV_KEYS = [
  "property",
  "legal",
  "privateClient",
  "about",
] as const;
export type FooterNavKey = (typeof FOOTER_NAV_KEYS)[number];
