// English copy — the source of truth for the shared dictionaries.
// fr.ts / es.ts mirror these shapes; any key they omit falls back to the English here.
export const nav = {
  label: {
    property: "Property",
    legal: "Legal",
    privateClient: "Private Client Services",
    journal: "Journal",
    about: "About",
  },
};

export const footer = {
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

export const ui = {
  inquire: "Inquire",
  discoverMore: "Discover more",
  viewAllProperties: "View all properties",
  viewResidence: "View residence",
  explore: "Explore",
  meetTheTeam: "Meet the team",
  selectedResidences: "Selected Residences",
  privateEnquiry: "Make a private enquiry",
};

export const form = {
  interestLabel: "I am interested in",
  fullName: "Full name",
  fullNamePlaceholder: "Your full name",
  email: "Email",
  emailPlaceholder: "Your email address",
  phone: "Phone",
  phonePlaceholder: "Your phone number",
  country: "Country of residence",
  countryPlaceholder: "Select a country",
  message: "How can we assist you?",
  messagePlaceholder: "Please tell us more about your enquiry",
  consent: "I confirm that I have read and accept the Privacy Policy.",
  submit: "Submit enquiry →",
  sending: "Sending…",
  thankYou: "Thank you. We will be in touch shortly.",
  replyNote: "We reply to every enquiry, usually within one working day.",
  errorGeneric: "Something went wrong. Please try again.",
  errorInterest: "Please select an area of interest.",
  errorName: "Please tell us your name.",
  errorEmail: "Please enter a valid email address.",
  errorConsent: "We need your consent to contact you.",
  hero: {
    title: "How can we assist you?",
  },
};

export const options = [
  { icon: "key", label: "Property Advisory", value: "property" },
  { icon: "scales", label: "Legal Advisory", value: "legal" },
  { icon: "figure", label: "Private Client Advisory", value: "private-client" },
  { icon: "globe", label: "Another Matter", value: "other" },
];

export const aside = {
  heading: "Discretion is at the heart of everything we do.",
  body: "Your enquiry is confidential and will be read only by a partner.",
};
