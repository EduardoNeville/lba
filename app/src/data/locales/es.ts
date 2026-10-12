// Spanish copy — mirrors the EN shapes in src/data/*.ts. Only strings differ; icons/values/links unchanged.
export const nav = {
  label: {
    property: "Propiedad",
    legal: "Legal",
    privateClient: "Servicios para clientes privados",
    journal: "Blog",
    about: "Nosotros",
  },
};

export const footer = {
  tagline: "Abogados y Asesores Privados",
  services: "Nuestros Servicios",
  servicesLinks: [
    "Asesoramiento inmobiliario",
    "Asesoramiento jurídico",
    "Asesoramiento para clientes privados",
  ],
  information: "Información",
  informationLinks: [
    "Nosotros",
    "Política de Privacidad",
    "Términos y Condiciones",
  ],
  contact: "Contacto",
  address: [
    "Calle Nuestra Señora de Gracia, 26, bajo",
    "Marbella, Málaga, España",
    "+34 952 777 991 · +34 663 109 014",
    "info@legalboutiqueadvisers.com",
  ],
  enquire: "Realizar una consulta privada",
  rights: "© 2021 Legal Boutique Advisers. Todos los derechos reservados.",
};

export const ui = {
  inquire: "Contacto",
  discoverMore: "Descubrir más",
  viewAllProperties: "Ver todas las propiedades",
  viewResidence: "Ver la residencia",
  explore: "Explorar",
  meetTheTeam: "Conocer al equipo",
  selectedResidences: "Residencias seleccionadas",
  privateEnquiry: "Realizar una consulta privada",
};

export const form = {
  interestLabel: "Estoy interesado/a en:",
  fullName: "Nombre completo",
  fullNamePlaceholder: "Su nombre completo",
  email: "Correo electrónico",
  emailPlaceholder: "Su dirección de correo electrónico",
  phone: "Teléfono",
  phonePlaceholder: "Su número de teléfono",
  country: "País de residencia",
  countryPlaceholder: "Seleccione un país",
  message: "¿Cómo podemos ayudarle?",
  messagePlaceholder: "Cuéntenos más sobre su consulta",
  consent: "Confirmo que he leído y acepto la Política de Privacidad.",
  submit: "Enviar consulta",
  sending: "Enviando…",
  thankYou: "Gracias. Nos pondremos en contacto con usted en breve.",
  replyNote: "Respondemos a cada consulta, normalmente en un día laborable.",
  errorGeneric: "Algo ha fallado. Por favor, inténtelo de nuevo.",
  hero: {
    title: "¿Cómo podemos ayudarle?",
  },
  errorInterest: "Por favor, seleccione un área de interés.",
  errorName: "Por favor, indíquenos su nombre.",
  errorEmail:
    "Por favor, introduzca una dirección de correo electrónico válida.",
  errorConsent: "Necesitamos su consentimiento para contactarle.",
};

export const options = [
  { icon: "key", label: "Asesoramiento inmobiliario", value: "property" },
  { icon: "scales", label: "Asesoramiento jurídico", value: "legal" },
  {
    icon: "figure",
    label: "Asesoramiento para clientes privados",
    value: "private-client",
  },
  { icon: "globe", label: "Otro asunto", value: "other" },
];

export const aside = {
  heading: "La discreción está en el centro de todo lo que hacemos.",
  body: "Su consulta es confidencial y será atendida personalmente por un miembro de nuestro equipo.",
};
