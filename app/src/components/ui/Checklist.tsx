const Markers = {
  square: (
    <span aria-hidden className="mt-1 h-[10px] w-[10px] shrink-0 border border-oxblood" />
  ),
  check: (
    <svg aria-hidden viewBox="0 0 12 12" className="mt-0.5 h-3 w-3 shrink-0 text-oxblood" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M2 6.5 4.5 9 10 3" />
    </svg>
  ),
} as const

export function Checklist({
  items,
  marker = 'square',
  columns = 1,
}: {
  items: string[]
  marker?: 'square' | 'check'
  columns?: 1 | 2
}) {
  return (
    <ul className={`${columns === 2 ? 'grid gap-x-6 gap-y-2.5 sm:grid-cols-2' : 'space-y-2.5'}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          {Markers[marker]}
          <span
            className={
              marker === 'check'
                ? 'text-[11px] tracking-[0.08em] text-ink/80'
                : 'micro text-[10px] tracking-[0.18em] text-ink/80'
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
