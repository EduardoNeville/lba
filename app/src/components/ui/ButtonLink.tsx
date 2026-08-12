import { Link } from 'react-router-dom'

const variants = {
  solid: 'bg-oxblood text-cream hover:bg-ink',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-cream',
} as const

const tones = {
  dark: 'bg-oxblood text-cream hover:bg-cream hover:text-ink',
  light: 'bg-oxblood text-cream hover:bg-ink',
} as const

export function ButtonLink({
  to,
  variant = 'solid',
  tone,
  children,
  className = '',
}: {
  to: string
  variant?: 'solid' | 'outline'
  tone?: 'light' | 'dark'
  children: React.ReactNode
  className?: string
}) {
  const style = variant === 'solid' && tone ? tones[tone] : variants[variant]
  const cls = `micro inline-flex items-center gap-3 px-8 py-3 min-h-11 transition-colors ${style} ${className}`
  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  )
}
