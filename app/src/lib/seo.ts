export function setPageMeta(title: string, description?: string) {
  document.title = title
  if (!description) return
  const el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (el) el.content = description
}