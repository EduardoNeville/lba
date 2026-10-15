// French copy — mirrors the EN shapes in src/data/*.ts. Only strings differ; icons/values/links unchanged.
// Type-only import of the master copy: a key en has and this file lacks is a
// compile error, before any check runs.
import type {
  nav as NavEn,
  footer as FooterEn,
  ui as UiEn,
  form as FormEn,
  options as OptionsEn,
  aside as AsideEn,
} from './en.ts'

export const nav: typeof NavEn = {
  label: {
    property: "Immobilier",
    residences: "Résidences",
    legal: "Juridique",
    privateClient: "Services aux clients privés",
    journal: "Blog",
    about: "À propos",
  },
};

export const footer: typeof FooterEn = {
  tagline: "Juristes & Conseillers Privés",
  services: "Nos Services",
  servicesLinks: [
    "Conseil immobilier",
    "Conseil juridique",
    "Conseil aux clients privés",
  ],
  information: "Informations",
  informationLinks: [
    "À propos",
    "Politique de confidentialité",
    "Conditions générales",
  ],
  contact: "Contact",
  address: [
    "Calle Nuestra Señora de Gracia, 26, bajo",
    "Marbella, Málaga, Espagne",
    "+34 952 777 991 · +34 663 109 014",
    "info@legalboutiqueadvisers.com",
  ],
  enquire: "Faire une demande privée",
  whatsapp: "WhatsApp",
  whatsappMessage: "Bonjour, je souhaiterais faire une demande concernant vos services en Espagne.",
  rights: "© 2021 Legal Boutique Advisers. Tous droits réservés.",
};

export const ui: typeof UiEn = {
  showSubmenu: "Afficher le sous-menu de",
  mainNav: "Navigation principale",
  logoLabel: "Legal Boutique Advisers — page d’accueil",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  switchLanguage: "Changer la langue :",
  scrollDown: "Faire défiler",
  inquire: "Nous contacter",
  discoverMore: "Découvrir",
  viewAllProperties: "Voir toutes les propriétés",
  viewResidence: "Voir la résidence",
  explore: "Explorer",
  meetTheTeam: "Rencontrer l’équipe",
  selectedResidences: "Résidences sélectionnées",
  privateEnquiry: "Faire une demande privée",
};

export const form: typeof FormEn = {
  fullName: "Nom complet",
  fullNamePlaceholder: "Votre nom complet",
  email: "E-mail",
  emailPlaceholder: "Votre adresse e-mail",
  phone: "Téléphone",
  phonePlaceholder: "Votre numéro de téléphone",
  country: "Pays de résidence",
  countryPlaceholder: "Sélectionnez un pays",
  message: "Comment pouvons-nous vous aider ?",
  messagePlaceholder: "Merci de nous en dire plus sur votre demande",
  consent: "Je confirme avoir lu et accepté la Politique de confidentialité.",
  regarding: "À propos de",
  enquiryAbout: "Je souhaiterais en savoir plus sur",
  submit: "Envoyer la demande",
  sending: "Envoi en cours…",
  thankYou: "Merci. Nous vous répondrons rapidement.",
  replyNote:
    "Nous répondons à chaque demande, généralement sous un jour ouvré.",
  errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
  hero: {
    title: "Comment pouvons-nous vous accompagner ?",
  },
  errorName: "Veuillez nous indiquer votre nom.",
  errorEmail: "Veuillez saisir une adresse e-mail valide.",
  errorConsent: "Votre consentement est requis pour vous contacter.",
};

export const options: typeof OptionsEn = [
  { icon: "key", label: "Conseil immobilier", value: "property" },
  { icon: "scales", label: "Conseil juridique", value: "legal" },
  {
    icon: "figure",
    label: "Conseil aux clients privés",
    value: "private-client",
  },
  { icon: "globe", label: "Autre demande", value: "other" },
];

export const aside: typeof AsideEn = {
  heading: "La discrétion est au cœur de tout ce que nous faisons.",
  body: "Votre demande est confidentielle et sera traitée personnellement par un membre de notre équipe.",
};
