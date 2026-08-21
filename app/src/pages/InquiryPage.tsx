import { useState } from "react";
import { Container } from "../components/ui/Container";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Field } from "../components/ui/Field";
import { Icon } from "../components/ui/icons";
import { submitInquiry, InquiryError } from "../lib/submitInquiry";
import inquiryHero from "../assets/inquiry-hero.jpg";
import { useLang } from "../lib/lang";
import { options as optionsEn } from "../data/inquiry";
import {
  form as formFr,
  options as optionsFr,
  aside as asideFr,
} from "../data/locales/fr";
import {
  form as formEs,
  options as optionsEs,
  aside as asideEs,
} from "../data/locales/es";

const controlCls =
  "w-full border border-hairline bg-transparent px-4 py-3 text-sm text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none transition-colors";

interface FormState {
  interest: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  consent: boolean;
}

const initial: FormState = {
  interest: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  message: "",
  consent: false,
};

const COUNTRIES = [
  "United Kingdom",
  "Spain",
  "United States",
  "Germany",
  "France",
  "Other",
];

function useInquiryDict() {
  const { lang } = useLang();
  if (lang === "fr")
    return {
      form: formFr,
      options: optionsFr,
      aside: asideFr,
      hero: formFr.hero,
    };
  if (lang === "es")
    return {
      form: formEs,
      options: optionsEs,
      aside: asideEs,
      hero: formEs.hero,
    };
  return {
    form: {
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
    },
    options: optionsEn,
    aside: {
      heading: "Discretion is at the heart of everything we do.",
      body: "Your enquiry is read only by a partner. We never share your details, never add you to lists and never discuss your affairs with anyone else.",
    },
    hero: {
      eyebrow: "Enquire",
      title: "How can we assist you?",
      body: "We understand that every situation is unique. Please share a few details about your enquiry and a member of our team will be in touch.",
      subline: "All enquiries are treated with the utmost discretion.",
    },
  };
}

function InterestRadios({
  value,
  onChange,
  error,
  label,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  label: string;
  options: { icon: string; label: string; value: string }[];
}) {
  return (
    <div>
      <p className="micro mb-2 text-ink">{label}</p>
      <div
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
        role="radiogroup"
        aria-label="Area of interest"
      >
        {options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer border px-4 py-5 text-center transition-colors ${
              value === o.value
                ? "border-oxblood bg-parchment"
                : "border-hairline hover:border-taupe"
            }`}
          >
            <input
              type="radio"
              name="interest"
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <Icon name={o.icon} className="h-5 w-5" />
            <span className="micro mt-3 block text-[9px] tracking-[0.18em]">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="micro mt-2 text-[9px] text-oxblood">
          {error}
        </p>
      )}
    </div>
  );
}

function InquiryForm() {
  const { form, options } = useInquiryDict();
  const [formState, setFormState] = useState<FormState>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof FormState, v: string | boolean) => {
    setFormState((f) => ({ ...f, [k]: v }));
    setError("");
  };

  const errors = {
    interest: !formState.interest ? form.errorInterest : "",
    fullName: !formState.fullName.trim() ? form.errorName : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
      ? form.errorEmail
      : "",
    consent: !formState.consent ? form.errorConsent : "",
  };

  const showError = (k: keyof typeof errors) =>
    touched[k] ? errors[k] : undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ interest: true, fullName: true, email: true, consent: true });
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await submitInquiry({
        interest: formState.interest,
        fullName: formState.fullName.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim() || undefined,
        country: formState.country.trim() || undefined,
        message: formState.message.trim() || undefined,
      });
      setFormState(initial);
      setStatus("idle");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof InquiryError ? err.message : form.errorGeneric);
      setStatus("idle");
    }
  }

  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          {form.thankYou}
        </p>
        <p className="micro mt-4 text-taupe">{form.replyNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <InterestRadios
        value={formState.interest}
        onChange={(v) => set("interest", v)}
        error={showError("interest")}
        label={form.interestLabel}
        options={options}
      />
      <div className="mt-8 space-y-6">
        <Field label={form.fullName} error={showError("fullName")}>
          {(id) => (
            <input
              id={id}
              type="text"
              placeholder={form.fullNamePlaceholder}
              className={controlCls}
              value={formState.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            />
          )}
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={form.email} error={showError("email")}>
            {(id) => (
              <input
                id={id}
                type="email"
                placeholder={form.emailPlaceholder}
                className={controlCls}
                value={formState.email}
                onChange={(e) => set("email", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
            )}
          </Field>
          <Field label={form.phone}>
            {(id) => (
              <input
                id={id}
                type="tel"
                placeholder={form.phonePlaceholder}
                className={controlCls}
                value={formState.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            )}
          </Field>
        </div>
        <Field label={form.country}>
          {(id) => (
            <div className="relative">
              <select
                id={id}
                className={`${controlCls} appearance-none pr-10`}
                value={formState.country}
                onChange={(e) => set("country", e.target.value)}
              >
                <option value="">{form.countryPlaceholder}</option>
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <Icon
                name="chevron-down"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
              />
            </div>
          )}
        </Field>
        <Field label={form.message}>
          {(id) => (
            <textarea
              id={id}
              rows={5}
              placeholder={form.messagePlaceholder}
              className={controlCls}
              value={formState.message}
              onChange={(e) => set("message", e.target.value)}
            />
          )}
        </Field>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formState.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 h-4 w-4 border-hairline accent-oxblood"
            />
            <span className="text-[11px] leading-relaxed text-taupe">
              {form.consent}
            </span>
          </label>
          {showError("consent") && (
            <p role="alert" className="micro mt-2 text-[9px] text-oxblood">
              {errors.consent}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="micro mt-8 w-full bg-oxblood py-4 text-cream transition-colors hover:bg-ink disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "submitting" ? form.sending : form.submit}
      </button>
      {error && (
        <p
          role="alert"
          className="micro mt-4 text-center text-[9px] text-oxblood"
        >
          {error}
        </p>
      )}
    </form>
  );
}

function DiscretionAside() {
  const { aside } = useInquiryDict();
  return (
    <aside className="self-start border border-hairline p-10 text-center md:p-12 lg:sticky lg:top-28">
      <Icon name="laurel" className="mx-auto h-14 w-14" />
      <p className="font-display mt-6 text-2xl leading-snug md:text-[1.75rem]">
        {aside.heading}
      </p>
      <div aria-hidden className="mx-auto mt-6 h-px w-10 bg-ink/50" />
      <p className="mt-6 text-[12px] leading-relaxed text-taupe">
        {aside.body}
      </p>
    </aside>
  );
}

function InquiryHero() {
  const { hero } = useInquiryDict();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="font-display mt-6 max-w-[22ch] text-4xl leading-[1.08] tracking-wide md:text-5xl lg:text-[3.5rem]">{hero.title}</h1>
            {hero.body && <p className="mt-6 max-w-prose text-sm leading-relaxed text-taupe md:text-[15px]">{hero.body}</p>}
            {hero.subline && <p className="mt-4 max-w-prose font-display text-sm italic text-taupe">{hero.subline}</p>}
          </div>
          <div className="lg:col-span-5">
            <div className="h-72 w-full overflow-hidden lg:h-[520px]">
              <img src={inquiryHero} alt="Open book with brass pen on stone table, olive branch" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function InquiryPage() {
  return (
    <>
      <InquiryHero />
      <section id="form" className="border-t border-hairline py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <InquiryForm />
            </div>
            <div className="lg:col-span-5">
              <DiscretionAside />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
