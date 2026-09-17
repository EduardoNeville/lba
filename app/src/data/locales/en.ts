// English copy — the source of truth for the shared dictionaries.
// fr.ts / es.ts mirror these shapes; any key they omit falls back to the English here.
export const nav = {
  label: {
    property: "Property",
    legal: "Legal",
    privateClient: "Private Client Services",
    journal: "Journal",
    about: "About",
    inquire: "Inquire",
  },
  children: {
    buying: "Buying",
    selling: "Selling",
    privateSearch: "Private Search",
    selectedResidences: "Selected Residences",
    realEstate: "Real Estate Law",
    tax: "Tax & Structuring",
    corporate: "Corporate & Investment",
    residency: "Residency & Relocation",
    relocation: "Relocation to Spain",
    architecture: "Architecture & Renovation",
    homeManagement: "Private Home Management",
    concierge: "Concierge Services",
    golf: "Golf",
    schools: "Schools",
    destinations: "Destinations",
    culture: "Culture",
    wellness: "Wellness",
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
  viewAllResidences: "View all residences",
  viewResidence: "View residence",
  learnMore: "Learn more",
  explore: "Explore",
  meetTheTeam: "Meet the team",
  discuss: "Discuss your needs",
  submit: "Submit enquiry",
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
  errors: {
    interest: "Please select an area of interest.",
    fullName: "Please tell us your name.",
    email: "Please enter a valid email address.",
    consent: "We need your consent to contact you.",
  },
  hero: {
    eyebrow: "Enquire",
    title: "How can we assist you?",
    body: "We understand that every situation is unique. Please share a few details about your enquiry and a member of our team will be in touch.",
    subline: "All enquiries are treated with the utmost discretion.",
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
