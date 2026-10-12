import type { EmailMessage } from './mailer'

/** Shape written by app/src/lib/submitInquiry.ts into the `inquiries` collection. */
export interface Enquiry {
  interest?: string
  fullName?: string
  email?: string
  phone?: string
  country?: string
  message?: string
  consent?: boolean
  createdAt?: { toDate(): Date } | Date | null
}

// Mirrors `options` in app/src/data/locales/en.ts — the form sends the raw value.
const INTEREST_LABELS: Record<string, string> = {
  property: 'Property Advisory',
  legal: 'Legal Advisory',
  'private-client': 'Private Client Advisory',
  other: 'Another Matter',
}

const FALLBACK = '—'

export function interestLabel(interest?: string): string {
  if (!interest) return 'General enquiry'
  return INTEREST_LABELS[interest] ?? interest
}

export function renderEnquiryEmail(
  enquiry: Enquiry,
  meta: { to: string; from: string; id: string },
): EmailMessage {
  const name = enquiry.fullName?.trim() || 'Unnamed enquirer'
  const interest = interestLabel(enquiry.interest)
  const received = formatReceivedAt(enquiry.createdAt)

  const fields: [string, string][] = [
    ['Name', name],
    ['Email', enquiry.email?.trim() || FALLBACK],
    ['Phone', enquiry.phone?.trim() || FALLBACK],
    ['Country', enquiry.country?.trim() || FALLBACK],
    ['Interest', interest],
    ['Received', received],
  ]

  const text = [
    `New enquiry from the website: ${interest}`,
    '',
    ...fields.map(([label, value]) => `${`${label}:`.padEnd(10)}${value}`),
    '',
    'Message:',
    enquiry.message?.trim() || '(no message)',
    '',
    '—',
    `Reference ${meta.id}. Reply to this email to answer ${name} directly.`,
  ].join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;background:#f5f1ec;padding:24px;font-family:Georgia,'Times New Roman',serif;color:#1c1a19;">
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2dad1;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #e2dad1;">
      <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8c2851;">New website enquiry</p>
      <h1 style="margin:8px 0 0;font-size:20px;font-weight:400;">${escapeHtml(interest)}</h1>
    </td></tr>
    <tr><td style="padding:8px 28px 4px;">
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        ${fields
          .map(
            ([label, value]) => `<tr>
          <td style="padding:8px 0;width:110px;color:#8b8178;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;">${escapeHtml(value)}</td>
        </tr>`,
          )
          .join('\n        ')}
      </table>
    </td></tr>
    <tr><td style="padding:8px 28px 24px;">
      <p style="margin:0 0 8px;color:#8b8178;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(enquiry.message?.trim() || '(no message)')}</p>
    </td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid #e2dad1;background:#faf8f5;color:#8b8178;font-family:Helvetica,Arial,sans-serif;font-size:12px;">
      Reply to this email to answer ${escapeHtml(name)} directly. Reference ${escapeHtml(meta.id)}.
    </td></tr>
  </table>
</body></html>`

  return {
    to: meta.to,
    from: meta.from,
    replyTo: enquiry.email?.trim() || undefined,
    subject: `New enquiry — ${interest} — ${name}`,
    text,
    html,
  }
}

function formatReceivedAt(createdAt: Enquiry['createdAt']): string {
  const date = createdAt instanceof Date ? createdAt : createdAt?.toDate?.()
  if (!date) return FALLBACK
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(date)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
