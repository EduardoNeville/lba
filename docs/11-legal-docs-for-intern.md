# Legal Docs Draft

You're drafting the **Privacy Policy** and **Terms & Conditions** for the Legal
Boutique Advisers website (legalboutiqueadvisers.com). The site currently runs
on placeholder text in these two sections. Your job: replace the placeholders
below with firm-approved, legally sound copy in English (a Spanish and French
version will be done later).

Return the finished documents in this same structure — our dev team maps
sections 1:1 into the page, so keep every heading.

---

## Facts you must reflect (from the live site)

- **Firm:** Legal Boutique Advisers. Address: Calle Nuestra Señora de Gracia,
  26, bajo, 29601 Marbella, Spain. Tel: +34 952 777 991 · +34 663 109 014.
  Email: info@legalboutiqueadvisers.com.
- **Data collected** via the contact form ("Make a private enquiry" / `/inquiry`):
  full name, email address, phone (optional), country of residence (optional),
  message (optional), and a selected area of interest. Submitting requires an
  explicit "I have read and accept the Privacy Policy" consent checkbox.
- **What happens to it:** enquiries are stored (Firestore database) with a
  timestamp, read by partners only, used solely to respond; never shared,
  never sold, never added to mailing lists.
- **Cookies/analytics:** the site sets **no cookies** and runs **no analytics**.
- **Jurisdiction:** the firm operates in Spain (Marbella). GDPR applies to EU
  residents.
- **Engagement rule:** submitting an enquiry does not create a
  lawyer–client relationship (a relationship starts only on written
  acceptance of an engagement).

---

## Document 1 — Privacy Policy

Page: `/privacy` · Footer link: "Privacy Policy"
Meta title (auto-generated): "Privacy Policy — Legal Boutique Advisers"
The page shows the title, a "Last updated:" line, a short intro, then each section below.

### Intro (2 short paragraphs)

> PLACEHOLDER — draft an intro: who the policy covers, that it explains how
> the site collects and uses personal data, and a sentence noting the firm
> may update it and the "last updated" date reflects the current version.

### 1. Who we are

> PLACEHOLDER — firm identity, registered name, address (Marbella), email.
> Add any registration/bar-membership numbers if the firm wants them public.

### 2. Information we collect

> PLACEHOLDER — list the form fields actually collected (name, email, phone
> (optional), country (optional), area of interest, message), state that the
> site uses no cookies, and that personal data is never sold or rented.

### 3. How we use your information

> PLACEHOLDER — respond to enquiries only; no mailing lists without separate
> consent; enquiries read by partners only.

### 4. Legal basis

> PLACEHOLDER — consent (explicit checkbox on the form) + legitimate interest
> in responding to prospective-client enquiries. Confirm with the firm's
> counsel which additional bases (e.g. contract performance) apply.

### 5. Retention

> PLACEHOLDER — how long enquiries are kept (currently: deleted once the
> enquiry and any resulting engagement are closed — confirm a concrete period
> with the firm, e.g. 12/24 months).

### 6. Your rights

> PLACEHOLDER — GDPR rights: access, rectification, erasure, restriction,
> portability, objection; email to exercise them; right to lodge a complaint
> with the Spanish DPA (**AEPD** — add contact details).

### 7. Data sharing / processors

> PLACEHOLDER — hosting/backend processors (Google Cloud / Firebase) —
> confirm whether the firm wants this named, and add any other processors.

### 8. Changes to this policy

> PLACEHOLDER — the "Last updated" date reflects the current version.

---

## Document 2 — Terms & Conditions

Page: `/terms` · Footer link: "Terms & Conditions"
Meta title (auto-generated): "Terms & Conditions — Legal Boutique Advisers"

### Intro (2 short paragraphs)

> PLACEHOLDER — what these terms govern (use of the website, not the firm's
> legal services), and that using the site implies acceptance.

### 1. Nature of the content

> PLACEHOLDER — site content is general information, not legal/tax/investment
> advice; no lawyer–client relationship from browsing.

### 2. Enquiries

> PLACEHOLDER — submitting an enquiry creates no engagement; a relationship
> forms only upon written acceptance by the firm.

### 3. Intellectual property

> PLACEHOLDER — site content/design/branding owned by the firm; no
> reproduction without written consent.

### 4. Third-party links

> PLACEHOLDER — external links (e.g. social media pages, partner sites) — the
> firm is not responsible for their content or privacy practices.

### 5. Limitation of liability

> PLACEHOLDER — review what the firm wants to exclude/limit; must be drafted
> to comply with Spanish consumer law.

### 6. Governing law & jurisdiction

> PLACEHOLDER — Spanish law; courts of Marbella. Confirm this matches the
> firm's preference.

### 7. Contact

> PLACEHOLDER — email for questions about the terms.

---

## Before you return it

- [ ] All placeholders replaced; nothing marked "PLACEHOLDER" left in.
- [ ] Facts above match the live site (form fields, no cookies, contact details).
- [ ] Read by the firm / its counsel before we put it live.