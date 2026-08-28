import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: true })

// ponytail: trusted intern content only. Add DOMPurify if you ever open to UGC.
export function renderMarkdown(md: string): string {
  if (!md) return ''
  return marked.parse(md) as string
}
