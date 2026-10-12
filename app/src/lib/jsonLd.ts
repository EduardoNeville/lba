import { useEffect } from 'react'

const ATTR = 'data-lba-jsonld'

// Structured data for a page (residences use schema.org Residence/Offer). Injected
// after render: Google reads it, since it renders the page; social crawlers do not
// (they never run JS), which is why per-residence OG tags are still out of scope.
export function useJsonLd(data: Record<string, unknown> | null): void {
  const serialized = data ? JSON.stringify(data) : ''
  useEffect(() => {
    if (!serialized) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(ATTR, '')
    script.textContent = serialized
    document.head.appendChild(script)
    return () => script.remove()
  }, [serialized])
}
