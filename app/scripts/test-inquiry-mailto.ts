// Checks the enquiry mailto composer — the whole "backend" of the enquiry form.
// Run: npm run test:inquiry   (or: node scripts/test-inquiry-mailto.ts)
import {
  INQUIRY_INBOX,
  buildInquiryMail,
  type InquiryCopy,
} from '../src/lib/inquiryMailto.ts'

const copy: InquiryCopy = {
  subjectPrefix: 'Enquiry',
  fullName: 'Full name',
  email: 'Email',
  phone: 'Phone',
  country: 'Country of residence',
  interest: 'I am interested in',
}

let failures = 0
function check(name: string, condition: boolean, extra?: unknown) {
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}`)
  if (!condition) {
    failures++
    if (extra !== undefined) console.log('      →', JSON.stringify(extra))
  }
}

// URLSearchParams already percent-decodes, so these return the composed text as written.
const queryOf = (url: string) => new URL(url).searchParams
const bodyOf = (url: string) => queryOf(url).get('body') ?? ''
const subjectOf = (url: string) => queryOf(url).get('subject') ?? ''

// ---- full enquiry ----------------------------------------------------------
const full = buildInquiryMail(
  {
    interestLabel: 'Legal Advisory',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+34 600 123 456',
    country: 'United Kingdom',
    message: 'We are buying a villa in Marbella.\nCould you help with the purchase contract?',
  },
  copy,
)

check('goes to the practice inbox', full.url.startsWith(`mailto:${INQUIRY_INBOX}?`), full.url.slice(0, 60))
check('subject = prefix + area', full.subject === 'Enquiry — Legal Advisory', full.subject)
check('body starts with the fields block', full.body.startsWith('Full name:'), full.body.slice(0, 40))

const expectedBody = [
  'Full name:             Jane Doe',
  'Email:                 jane@example.com',
  'Phone:                 +34 600 123 456',
  'Country of residence:  United Kingdom',
  'I am interested in:    Legal Advisory',
  '',
  'We are buying a villa in Marbella.',
  'Could you help with the purchase contract?',
].join('\r\n')
check('body is the aligned block + message', full.body === expectedBody, full.body)
check('every line break is CRLF', !/(?<!\r)\n/.test(full.body), JSON.stringify(full.body))
check('textarea LF input becomes CRLF', full.body.includes('Marbella.\r\nCould you'), JSON.stringify(full.body.slice(-90)))

check('url round-trips the body byte for byte', bodyOf(full.url) === full.body, bodyOf(full.url))
check('url round-trips the subject', subjectOf(full.url) === full.subject)
check('no raw spaces or newlines in the url', !/\s/.test(full.url), full.url.slice(0, 80))
check('line breaks encoded as %0D%0A', full.url.includes('%0D%0A') && !/(?<!%0D)%0A/.test(full.url))
check('spaces encoded as %20, not +', full.url.includes('%20') && !full.url.includes('+'))

// ---- optional fields -------------------------------------------------------
const minimal = buildInquiryMail(
  { interestLabel: 'Another Matter', fullName: 'Sam', email: 'sam@example.com' },
  copy,
)
check(
  'omits empty phone/country/message',
  minimal.body === 'Full name:           Sam\r\nEmail:               sam@example.com\r\nI am interested in:  Another Matter',
  minimal.body,
)
check('no trailing blank line without a message', !minimal.body.endsWith('\n'))
check('minimal url has no empty body param', !minimal.url.includes('body=&'))

// ---- unicode, ampersands, percent signs ------------------------------------
const accents = buildInquiryMail(
  {
    interestLabel: 'Conseil juridique',
    fullName: 'María Fernández-Gómez',
    email: 'maria@example.com',
    message: 'Rénovation à 100 % & frais (TVA) — merci',
  },
  copy,
)
check('accents survive the round trip', bodyOf(accents.url).includes('María Fernández-Gómez'), bodyOf(accents.url))
check('& and % survive the round trip', bodyOf(accents.url).includes('100 % & frais (TVA) — merci'))
check('subject keeps the accent, encoded once', subjectOf(accents.url) === 'Enquiry — Conseil juridique', subjectOf(accents.url))
check('percent is encoded once (%25), not twice (%2525)', accents.url.includes('%25') && !accents.url.includes('%2525'))

// ---- hostile input ---------------------------------------------------------
const hostile = buildInquiryMail(
  {
    interestLabel: 'Legal Advisory',
    fullName: 'Jane\nBcc: someone@else.com',
    email: 'jane@example.com',
    message: 'x',
  },
  copy,
)
check('newlines cannot be injected into the subject', !/[\r\n]/.test(hostile.subject), hostile.subject)
check('subject injection flattened to one line', hostile.subject === 'Enquiry — Legal Advisory', hostile.subject)

// ---- localised copy --------------------------------------------------------
const french: InquiryCopy = { ...copy, subjectPrefix: 'Demande', interest: 'Je suis intéressé(e) par :' }
const mailFr = buildInquiryMail({ interestLabel: 'Conseil immobilier', fullName: 'Jean', email: 'jean@example.com' }, french)
check('french subject prefix', mailFr.subject === 'Demande — Conseil immobilier', mailFr.subject)
check('french field labels', mailFr.body.includes('Je suis intéressé(e) par :'), mailFr.body)

// ---- length sanity ---------------------------------------------------------
const long = buildInquiryMail(
  {
    interestLabel: 'Property Advisory',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+34 600 123 456',
    country: 'United Kingdom',
    message: 'x'.repeat(1200),
  },
  copy,
)
check('a 1200-char message stays under 2000 url chars', long.url.length < 2000, long.url.length)

// ---- the inbox is defined in exactly one place -----------------------------
check('inbox constant is the practice address', INQUIRY_INBOX === 'info@legalboutiqueadvisers.com', INQUIRY_INBOX)

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
