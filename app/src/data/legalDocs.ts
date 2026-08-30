// PLACEHOLDER COPY — replace with firm-approved legal text before launch.
// Enquiries collect: name, email, phone (optional), country (optional),
// message (optional), interest area, and explicit consent. See /inquiry.

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

export const privacyDoc: LegalDoc = {
  title: "Privacy Policy",
  updated: "Last updated: 2026",
  intro: [
    'This Privacy Policy explains how Legal Boutique Advisers ("we", "our", "us") collects, uses and protects personal information provided through this website.',
    "Placeholder text: the firm will replace this policy with its approved version. Nothing below is final legal advice.",
  ],
  sections: [
    {
      heading: "Who we are",
      body: [
        "Legal Boutique Advisers, Calle Nuestra Señora de Gracia, 26, bajo, Marbella, Málaga, Spain. Contact: info@legalboutiqueadvisers.com.",
      ],
    },
    {
      heading: "Information we collect",
      body: [
        "When you use the enquiry form we collect the details you submit: your name, email address, phone number (optional), country of residence (optional), the area of interest and your message. We do not use cookies and we do not sell or rent personal information to anyone.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "We use your details solely to respond to your enquiry and, where you have requested it, to provide the services you are interested in. We do not add you to mailing lists without your separate consent.",
      ],
    },
    {
      heading: "Legal basis",
      body: [
        "We process your enquiry on the basis of the consent you provide when submitting the form, and our legitimate interest in responding to prospective client enquiries.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "Enquiry details are kept only for as long as needed to handle your enquiry and any resulting engagement, after which they are deleted.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the GDPR you may request access to, rectification of, or erasure of your personal information, restriction of processing, data portability and to object to processing. To exercise any of these rights, email info@legalboutiqueadvisers.com.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        'We may update this policy from time to time. The "Last updated" date above reflects the current version.',
      ],
    },
  ],
};

export const termsDoc: LegalDoc = {
  title: "Terms & Conditions",
  updated: "Last updated: 2026",
  intro: [
    "These terms govern your use of the Legal Boutique Advisers website. By using this site you accept these terms.",
    "Placeholder text: the firm will replace these terms with its approved version. Nothing below is final legal advice.",
  ],
  sections: [
    {
      heading: "Nature of the content",
      body: [
        "Content on this website is provided for general information only and does not constitute legal, tax or investment advice, nor does it create a lawyer–client relationship. Always seek advice from a qualified professional on your specific circumstances.",
      ],
    },
    {
      heading: "Enquiries",
      body: [
        "Submitting an enquiry does not create a lawyer–client relationship. A relationship is formed only upon written acceptance of an engagement by the firm.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "All content, design and branding on this site belongs to Legal Boutique Advisers and may not be reproduced without our prior written consent.",
      ],
    },
    {
      heading: "Third-party links",
      body: [
        "This site may link to external websites. We are not responsible for the content or privacy practices of those sites.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, Legal Boutique Advisers accepts no liability for any loss arising from the use of, or reliance on, information on this website.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by Spanish law and the courts of Marbella have jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms: info@legalboutiqueadvisers.com."],
    },
  ],
};

