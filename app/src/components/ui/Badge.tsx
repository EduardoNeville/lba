const tones = {
  default: 'border-ink/40 bg-cream/90 text-ink',
  accent: 'border-oxblood/60 bg-cream/90 text-oxblood',
  muted: 'border-hairline bg-cream/90 text-taupe',
  plain: 'border-hairline bg-transparent text-taupe',
} as const

// Micro outline pill. Sharp corners, hairline border, no shadow — the same
// grammar as the rest of the site (docs/02-design-system.md).
export function Badge({
  children,
  tone = 'default',
  className = '',
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      className={`micro inline-flex items-center border px-2 py-1 text-[9px] leading-none tracking-[0.18em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
