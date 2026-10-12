/**
 * Emails every new enquiry from the /inquiry form to the practice inbox.
 *
 * The site writes submissions straight into the `inquiries` collection
 * (app/src/lib/submitInquiry.ts). This trigger is the only piece that turns them
 * into mail, so the transport can change — or the function be dropped — without
 * touching the UI. See ../README.md for the one-time setup.
 */
import { initializeApp } from 'firebase-admin/app'
import { FieldValue } from 'firebase-admin/firestore'
// Deep import on purpose: the `firebase-functions` root entry pulls
// firebase-admin/auth → jwks-rsa → jose (ESM-only), which the Firebase CLI's
// bundled Node cannot `require()` while analysing the source for deploy.
import { logger } from 'firebase-functions/logger'
import { defineSecret } from 'firebase-functions/params'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { renderEnquiryEmail, type Enquiry } from './enquiryEmail'
import { providerFromEnv, sendMail } from './mailer'

initializeApp()

// SMTP password lives in Secret Manager, not in source or .env:
//   firebase functions:secrets:set SMTP_PASS
// Binding it here makes it available as an env var in `process.env` at runtime.
const SMTP_PASS = defineSecret('SMTP_PASS')

// The practice inbox. Override with MAIL_TO for testing.
const INBOX = (process.env.MAIL_TO || '').trim() || 'info@legalboutiqueadvisers.com'
// Must be an address the chosen transport is allowed to send as.
const SENDER = (process.env.MAIL_FROM || '').trim() || `Legal Boutique Advisers <${INBOX}>`

export const notifyInquiry = onDocumentCreated(
  {
    document: 'inquiries/{inquiryId}',
    region: 'europe-west1',
    memory: '256MiB',
    maxInstances: 5,
    timeoutSeconds: 30,
    // Never retry: a retry would email the same enquiry twice.
    retry: false,
    secrets: [SMTP_PASS],
  },
  async (event) => {
    const snapshot = event.data
    if (!snapshot) {
      logger.warn('inquiries trigger fired without a document', { id: event.params.inquiryId })
      return
    }

    const enquiry = snapshot.data() as Enquiry
    const message = renderEnquiryEmail(enquiry, {
      to: INBOX,
      from: SENDER,
      id: snapshot.id,
    })

    try {
      const provider = await sendMail(message)
      if (provider === 'dry-run') {
        logger.info('EMAIL_DRY_RUN set — enquiry not sent', { id: snapshot.id, subject: message.subject })
        console.info(message.text)
      } else {
        logger.info('enquiry emailed', { id: snapshot.id, provider, to: message.to })
      }
      await snapshot.ref.set(
        {
          emailNotification: {
            status: provider === 'dry-run' ? 'dry-run' : 'sent',
            provider,
            sentAt: FieldValue.serverTimestamp(),
          },
        },
        { merge: true },
      )
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      // The enquiry itself is already saved, so nothing is lost — but this needs
      // to be visible: log at error level and flag the document.
      logger.error('enquiry email failed', { id: snapshot.id, error: detail })
      await snapshot.ref
        .set(
          {
            emailNotification: {
              status: 'error',
              error: detail,
              attemptedAt: FieldValue.serverTimestamp(),
            },
          },
          { merge: true },
        )
        .catch((writeError: unknown) =>
          logger.error('could not record the email failure', { id: snapshot.id, writeError }),
        )
    }
  },
)

// Fails fast at deploy time (functions:log stays quiet otherwise) if nothing is configured.
if (process.env.FUNCTIONS_EMULATOR !== 'true' && !providerFromEnv()) {
  logger.warn(
    'No email transport configured (RESEND_API_KEY or SMTP_*): new enquiries will be stored but not emailed.',
  )
}
