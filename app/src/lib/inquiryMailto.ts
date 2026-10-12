// Composes the enquiry as an email in the visitor's own mail client.
//
// There is deliberately no backend: clicking the form's button opens the visitor's
// email programme with the fields filled in, and the message travels from their
// mailbox to the practice inbox. Nothing is stored on the website, so no enquiry
// content ever passes through a third party — and no credentials, SMTP or DNS
// records are needed to make it work.

/** Where enquiries go. The only place this address is defined for the form. */
export const INQUIRY_INBOX = 'info@legalboutiqueadvisers.com';

export interface InquiryDraft {
  /** Localised label of the chosen area of interest, e.g. "Legal Advisory". */
  interestLabel: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
}

/** Localised strings the composed message is built from. */
export interface InquiryCopy {
  /** Subject prefix, e.g. "Enquiry" / "Demande" / "Consulta". */
  subjectPrefix: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
}

export interface InquiryMail {
  subject: string;
  body: string;
  /** The `mailto:` URL to open. */
  url: string;
}

/**
 * Body of the email: the form fields as a readable block, then the visitor's own
 * message. Empty optional fields are left out rather than sent as blanks.
 */
export function buildInquiryBody(draft: InquiryDraft, copy: InquiryCopy): string {
  const rows: [string, string][] = [
    [copy.fullName, draft.fullName],
    [copy.email, draft.email],
  ];
  if (draft.phone) rows.push([copy.phone, draft.phone]);
  if (draft.country) rows.push([copy.country, draft.country]);
  if (draft.interestLabel) rows.push([copy.interest, draft.interestLabel]);

  // Align the values so the block reads like a form in the inbox.
  const width = Math.max(...rows.map(([label]) => label.length)) + 1;
  const fields = rows
    .map(([label, value]) => `${`${label}:`.padEnd(width)}  ${value.trim()}`)
    .join('\r\n');

  // Mail clients expect CRLF, and the textarea hands us bare LF: normalise the lot
  // so a message never arrives as one long line in desktop clients.
  const message = draft.message?.trim().replace(/\r\n|\r|\n/g, '\r\n');
  return message ? `${fields}\r\n\r\n${message}` : fields;
}

export function buildInquirySubject(draft: InquiryDraft, copy: InquiryCopy): string {
  return [copy.subjectPrefix, draft.interestLabel]
    // A newline in a name or reference would break the subject header.
    .map((part) => part?.replace(/[\r\n]+/g, ' ').trim())
    .filter(Boolean)
    .join(' — ');
}

/**
 * Builds the whole mailto: link. `encodeURIComponent` gives %20 for spaces and
 * %0D%0A for the line breaks, which is what mail clients expect here.
 *
 * Very long messages can exceed what some desktop clients accept in a mailto URL;
 * the enquiry page therefore also offers the composed text for copying.
 */
export function buildInquiryMail(
  draft: InquiryDraft,
  copy: InquiryCopy,
  inbox: string = INQUIRY_INBOX,
): InquiryMail {
  const subject = buildInquirySubject(draft, copy);
  const body = buildInquiryBody(draft, copy);
  return {
    subject,
    body,
    url: `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

/**
 * Copies text to the clipboard, falling back to the legacy path when the async
 * clipboard API is unavailable (http, older browsers) or denied. Returns whether
 * it worked, so the caller never claims a copy that did not happen.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    if (typeof document === 'undefined') return false;
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  } catch {
    return false;
  }
}
