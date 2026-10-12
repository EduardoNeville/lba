import nodemailer from 'nodemailer'

export interface EmailMessage {
  to: string
  from: string
  replyTo?: string
  subject: string
  text: string
  html: string
}

/** Which transport the environment resolves to; `null` = nothing usable is configured. */
export type Provider = 'resend' | 'smtp' | 'dry-run'

/**
 * Transport order: explicit dry-run → Resend → SMTP.
 * Credentials come from `app/functions/.env` (loaded by the Firebase CLI on deploy)
 * or from any env var source on the deployed function.
 */
export function providerFromEnv(env: NodeJS.ProcessEnv = process.env): Provider | null {
  if (env.EMAIL_DRY_RUN === '1' || env.EMAIL_DRY_RUN === 'true') return 'dry-run'
  if (env.RESEND_API_KEY?.trim()) return 'resend'
  if (env.SMTP_HOST?.trim() && env.SMTP_USER?.trim() && env.SMTP_PASS) return 'smtp'
  return null
}

export async function sendMail(
  message: EmailMessage,
  env: NodeJS.ProcessEnv = process.env,
): Promise<Provider> {
  const provider = providerFromEnv(env)

  if (!provider) {
    throw new Error(
      'No email transport configured: set RESEND_API_KEY, or SMTP_HOST/SMTP_USER/SMTP_PASS, in app/functions/.env',
    )
  }
  if (provider === 'dry-run') return provider
  if (provider === 'resend') {
    await sendWithResend(message, env)
  } else {
    await sendWithSmtp(message, env)
  }
  return provider
}

async function sendWithResend(message: EmailMessage, env: NodeJS.ProcessEnv): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`)
  }
}

async function sendWithSmtp(message: EmailMessage, env: NodeJS.ProcessEnv): Promise<void> {
  const port = Number(env.SMTP_PORT ?? 587)
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
    auth: { user: env.SMTP_USER as string, pass: env.SMTP_PASS as string },
  })

  try {
    await transport.sendMail({
      from: message.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })
  } finally {
    transport.close()
  }
}
