import type { ReactElement } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const icons: Record<string, ReactElement> = {
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12 20 3M16 7l3 3M14 9l2 2" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M4 21V5l8-2v18M4 21h16M12 21V9l8 2v10M8 7h.01M8 11h.01M8 15h.01M16 13h.01M16 17h.01" />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 10v6M8 13l4 3 4-3M12 16v5" />
    </svg>
  ),
  scales: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M12 3v18M12 5 5 8M12 5l7 3M5 8v8a3 3 0 0 0 6 0V8M5 8h6M19 8v8a3 3 0 0 1-6 0V8m6 0h-6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
    </svg>
  ),
  columns: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 5 5" />
    </svg>
  ),
  'eye-off': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M3 3l18 18M10.5 5.2A9.8 9.8 0 0 1 12 5c5 0 9 4 9 7a9.7 9.7 0 0 1-2.6 3.9M6.3 6.6A9.3 9.3 0 0 0 3 12c0 3 4 7 9 7 1.6 0 3-.4 4.3-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  ),
  knot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M12 3c2 2.5 2 15.5 0 18M12 3c-2 2.5-2 15.5 0 18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  ),
  laurel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M8 4c-3 2-3 6-3 10a10 10 0 0 0 3 6M16 4c3 2 3 6 3 10a10 10 0 0 1-3 6M12 7v10" />
    </svg>
  ),
  'arrow-right': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  ),
  'chevron-down': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="4" y="4" width="16" height="16" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 0 1 4 0v3" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="4" y="6" width="16" height="12" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
}

export function Icon({ name, className = 'h-6 w-6' }: { name: keyof typeof icons | string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 text-oxblood ${className}`} aria-hidden>
      {icons[name] ?? null}
    </span>
  )
}
