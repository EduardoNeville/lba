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
| **Your Google account (Gmail SMTP)** · the one used here | No admin, no DNS, no third-party service; the account's own app password. Optionally verify a "Send mail as" alias so enquiries arrive From `info@legalboutiqueadvisers.com`. | `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER=<gmail address>`, `SMTP_PASS=<16-char app password>`; `MAIL_FROM` = the alias if verified, else the gmail address |\n| **Not used: Microsoft 365 SMTP** — basic auth for `smtp.office365.com` client submission was fully retired on **2026-04-30** (app passwords included). | Their mail is on M365 (`legalboutiqueadvisers-com.mail.protection.outlook.com`), so this needs no new vendor — just an app password. The mailbox (or tenant) must allow SMTP AUTH. | `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER=info@legalboutiqueadvisers.com`, `SMTP_PASS=…` |
| **Resend** | No M365 admin rights; needs the domain verified in Resend (DNS records). | `RESEND_API_KEY=re_…` |
| **SMTP (generic)** | Any other mailbox/provider. | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (+ `SMTP_SECURE=true` for port 465) |
| **Dry run** | Emulator / local checks: logs the email instead of sending it. | `EMAIL_DRY_RUN=1` |

Optional overrides: `MAIL_TO` (default `info@legalboutiqueadvisers.com`),
`MAIL_FROM` (default `Legal Boutique Advisers <info@legalboutiqueadvisers.com>`).

```bash
cd app/functions
cp .env.example .env      # then fill in one transport
npm install
cd .. && firebase deploy --only functions
```

Cloud Functions need the project on the **Blaze** plan (already enabled here).
The first deploy also enables Cloud Build, Artifact Registry, Eventarc and Pub/Sub
and creates the Eventarc trigger pointed at the `inquiries` collection — no manual
console work.

Prefer Secret Manager over a plaintext `.env` once this stops being temporary:
`firebase functions:secrets:set RESEND_API_KEY`, then bind it with
`defineSecret('RESEND_API_KEY')` in `src/index.ts` (`secrets: [...]` in the
trigger options) and delete the `.env` entry.

## Day-to-day

```bash
npm run typecheck   # tsc --noEmit
npm run build       # tsc → lib/ (deploy runs this automatically too)
firebase deploy --only functions --force   # from app/
npm run logs        # tail logs from the CLI
```

`firebase.json` runs a `predeploy` build, so `firebase deploy --only functions`
from `app/` is enough: `node ./functions/node_modules/typescript/bin/tsc -p functions`.
It is deliberately not the usual `npm --prefix "$RESOURCE_DIR" run build`: the
standalone `firebase` binary injects its own `script-shell`
(`~/.cache/firebase/runtime/shell`), and npm scripts run through it fail with
`/bin/sh: 0: Illegal option --`. Invoking `tsc` through `node` sidesteps that and
works with a normal npm-installed CLI too. `lib/` **is** uploaded (only
`node_modules`, `.env*` and logs are ignored).

## Deployment notes (learned the hard way)

- **Runtime is Node 24.** Node 20 is decommissioned 2026-10-30; `engines.node` in
  `package.json` is what selects the runtime.
- **`import { logger } from 'firebase-functions/logger'`, not from the package
  root.** The root entry pulls `firebase-admin/auth` → `jwks-rsa` → `jose`
  (ESM-only), which the CLI's bundled Node 20 cannot `require()` while analysing
  the source — deploy then fails with `ERR_REQUIRE_ESM`. Both admin and
  functions are on their current majors (14.x / 7.x) and deploy fine this way.
- **`firebase functions:log` lags and can miss entries.** Cloud Logging
  (`resource.type="cloud_run_revision"`, service `notifyinquiry`) is the source of
  truth: <https://console.cloud.google.com/logs/query?project=legal-boutique-advisers-bf25a>.
- After a function update, events can take ~30s to flow again before the new
  revision is serving — an enquiry is never lost, just delayed.

### Gmail app-password checklist

1. `myaccount.google.com` → **Security → 2-Step Verification** (app passwords
   require it).
2. **Security → App passwords** → create one for "Mail". Store it in Secret
   Manager (never source, never `.env`):
   `cd app && firebase functions:secrets:set SMTP_PASS`
   (`src/index.ts` binds it with `defineSecret('SMTP_PASS')`).
3. The rest of the connection lives in the git-ignored `app/functions/.env`:
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `MAIL_FROM` — see
   `.env.example`. `MAIL_FROM` must be the gmail address itself (firm name as
   display name) unless the optional **Send mail as** alias
   (`info@legalboutiqueadvisers.com`) has been verified in Gmail — an unverified
   From address makes Gmail reject the send.
4. Deploy: `cd app && firebase deploy --only functions`.

### Current status

The sender (commits `3506233` + `125297e`, previously deployed and tested) was
resurrected on top of master together with the restored Firestore write. The
function is **not deployed right now** — it was removed when the site went
mailto-only — and will be re-deployed with the Gmail transport from
`app/functions/.env`. Rendering, SMTP/Resend transports, the deploy manifest and
the failure paths are covered by suites run locally; after deploy, one real
enquiry is sent to the practice inbox as a live check.

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
