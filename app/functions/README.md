# Cloud Functions

One function, one job: **every `/inquiry` submission is emailed to
`info@legalboutiqueadvisers.com`.**

```
app/src/lib/submitInquiry.ts            →  addDoc(inquiries, {…})
app/functions/src/index.ts  notifyInquiry →  emails the practice inbox
```

`notifyInquiry` is a Firestore `onDocumentCreated` trigger on `inquiries/{id}`
(Gen 2, `europe-west1`). The submission is already stored before it runs, so a
mail failure never loses an enquiry — it is logged and flagged on the document
as `emailNotification.status = "error"`.

## One-time setup

Pick **one** transport, put it in `app/functions/.env` (git-ignored — start from
`.env.example`), then deploy.

| Transport | When to use | `.env` |
| --- | --- | --- |
| **Resend** | Fastest to stand up; needs the domain verified in Resend (DNS records). | `RESEND_API_KEY=re_…` |
| **SMTP** | Send through the existing mailbox; no third-party account, no DNS changes. | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (+ `SMTP_SECURE=true` for port 465) |
| **Dry run** | Emulator / local checks: logs the email instead of sending it. | `EMAIL_DRY_RUN=1` |

Optional overrides: `MAIL_TO` (default `info@legalboutiqueadvisers.com`),
`MAIL_FROM` (default `Legal Boutique Advisers <info@legalboutiqueadvisers.com>`).

```bash
cd app/functions
cp .env.example .env      # then fill in one transport
npm install
cd .. && firebase deploy --only functions
```

Cloud Functions need the project on the **Blaze** plan; the first deploy may also
ask to enable Cloud Build, Artifact Registry and Eventarc.

Prefer Secret Manager over a plaintext `.env` once this stops being temporary:
`firebase functions:secrets:set RESEND_API_KEY`, then bind it with
`defineSecret('RESEND_API_KEY')` in `src/index.ts` (`secrets: [...]` in the
trigger options) and delete the `.env` entry.

## Day-to-day

```bash
npm run typecheck   # tsc --noEmit
npm run build       # tsc → lib/ (required before deploy; `firebase deploy` does it too)
npm run serve       # emulators: firestore + functions (run with EMAIL_DRY_RUN=1)
npm run logs        # tail production logs
npm run deploy      # build + firebase deploy --only functions
```

`firebase.json` runs `npm --prefix $RESOURCE_DIR run build` as a `predeploy`
hook, so a normal `firebase deploy --only functions` from `app/` is enough.

### Notes

- **Dev database:** the trigger watches the default Firestore database only. Dev
  builds write to `lba-dev` (`VITE_FIRESTORE_DB`), so testing on the dev site
  cannot email the real inbox — use `EMAIL_DRY_RUN=1` against the emulator.
- **Retries are off on purpose** (`retry: false`): a retried delivery would email
  the same enquiry twice.
- **Replies** go straight back to the enquirer (`replyTo` = the form's email
  field).
- **Spam:** the form is open to the public and nothing filters it yet. If junk
  starts arriving, add reCAPTCHA/Turnstile on the client and verify the token
  here before sending.
