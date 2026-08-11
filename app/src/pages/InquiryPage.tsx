import { useState } from 'react'
import { Container } from '../components/ui/Container'
import { Field } from '../components/ui/Field'
import { Icon } from '../components/ui/icons'
import { PageHero } from '../components/shared/PageHero'
import { submitInquiry, InquiryError } from '../lib/submitInquiry'
import { options } from '../data/inquiry'

const controlCls =
  'w-full border border-hairline bg-transparent px-4 py-3 text-sm text-ink placeholder:text-taupe/60 focus:border-oxblood focus:outline-none transition-colors'

interface FormState {
  interest: string
  fullName: string
  email: string
  phone: string
  country: string
  message: string
  consent: boolean
}

const initial: FormState = { interest: '', fullName: '', email: '', phone: '', country: '', message: '', consent: false }

function InterestRadios({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div>
      <p className="micro mb-2 text-ink">I am interested in</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4" role="radiogroup" aria-label="Area of interest">
        {options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer border px-4 py-5 text-center transition-colors ${
              value === o.value ? 'border-oxblood bg-parchment' : 'border-hairline hover:border-taupe'
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
            <span className="micro mt-3 block text-[9px] tracking-[0.18em]">{o.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="micro mt-2 text-[9px] text-oxblood">
          {error}
        </p>
      )}
    </div>
  )
}

function InquiryForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof FormState, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }))
    setError('')
  }

  const errors = {
    interest: !form.interest ? 'Please select an area of interest.' : '',
    fullName: !form.fullName.trim() ? 'Please tell us your name.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Please enter a valid email address.' : '',
    consent: !form.consent ? 'We need your consent to contact you.' : '',
  }

  const showError = (k: keyof typeof errors) => (touched[k] ? errors[k] : undefined)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ interest: true, fullName: true, email: true, consent: true })
    const hasError = Object.values(errors).some(Boolean)
    if (hasError) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    try {
      await submitInquiry({
        interest: form.interest,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        country: form.country.trim() || undefined,
        message: form.message.trim() || undefined,
      })
      setForm(initial)
      setStatus('idle')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof InquiryError ? err.message : 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl leading-snug md:text-3xl">Thank you. We will be in touch shortly.</p>
        <p className="micro mt-4 text-taupe">We reply to every enquiry, usually within one working day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="micro mb-8 text-ink">Please tell us about your enquiry</p>
      <InterestRadios value={form.interest} onChange={(v) => set('interest', v)} error={showError('interest')} />
      <div className="mt-8 space-y-6">
        <Field label="Full name" error={showError('fullName')}>
          {(id) => (
            <input
              id={id}
              type="text"
              placeholder="Your full name"
              className={controlCls}
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
            />
          )}
        </Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email" error={showError('email')}>
            {(id) => (
              <input
                id={id}
                type="email"
                placeholder="Your email address"
                className={controlCls}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
            )}
          </Field>
          <Field label="Phone">
            {(id) => (
              <input
                id={id}
                type="tel"
                placeholder="Your phone number"
                className={controlCls}
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            )}
          </Field>
        </div>
        <Field label="Country of residence">
          {(id) => (
            <div className="relative">
              <select id={id} className={`${controlCls} appearance-none pr-10`} value={form.country} onChange={(e) => set('country', e.target.value)}>
                <option value="">Select a country</option>
                <option>United Kingdom</option>
                <option>Spain</option>
                <option>United States</option>
                <option>Germany</option>
                <option>France</option>
                <option>Other</option>
              </select>
              <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          )}
        </Field>
        <Field label="How can we assist you?">
          {(id) => (
            <textarea
              id={id}
              rows={5}
              placeholder="Please tell us more about your enquiry"
              className={controlCls}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
            />
          )}
        </Field>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 h-4 w-4 border-hairline accent-oxblood"
            />
            <span className="text-[11px] leading-relaxed text-taupe">
              I confirm that I have read and accept the{' '}
              <a href="#" className="underline transition-colors hover:text-oxblood">Privacy Policy</a>.
            </span>
          </label>
          {showError('consent') && (
            <p role="alert" className="micro mt-2 text-[9px] text-oxblood">
              {errors.consent}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="micro mt-8 w-full bg-oxblood py-4 text-cream transition-colors hover:bg-ink disabled:pointer-events-none disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit enquiry →'}
      </button>
      {error && (
        <p role="alert" className="micro mt-4 text-center text-[9px] text-oxblood">
          {error}
        </p>
      )}
    </form>
  )
}

function DiscretionAside() {
  return (
    <aside className="self-start border border-hairline p-10 text-center md:p-12 lg:sticky lg:top-28">
      <Icon name="laurel" className="mx-auto h-14 w-14" />
      <p className="font-display mt-6 text-2xl leading-snug md:text-[1.75rem]">
        Discretion is at the heart of everything we do.
      </p>
      <div aria-hidden className="mx-auto mt-6 h-px w-10 bg-ink/50" />
      <p className="mt-6 text-[12px] leading-relaxed text-taupe">
        Your enquiry is read only by a partner. We never share your details, never add you to lists
        and never discuss your affairs with anyone else.
      </p>
    </aside>
  )
}

export function InquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquire"
        title="How can we assist you?"
        titleCase="sentence"
        body="We understand that every situation is unique. Please share a few details about your enquiry and a member of our team will be in touch."
        subline="All enquiries are treated with the utmost discretion."
      />
      <section id="form" className="border-t border-hairline py-16 md:py-24">
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
  )
}
