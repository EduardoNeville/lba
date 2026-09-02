import { Link } from 'react-router-dom'

export function ArrowLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: React.ReactNode
  className?: string
}) {
  const cls = `micro group inline-flex items-center gap-2 text-[11px] text-ink transition-colors hover:text-oxblood ${className}`
  const arrow = (
    <span aria-hidden>
      →
    </span>
  )
  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls}>
        {children}
        {arrow}
      </a>
    )
  }
  return (
    <Link to={to} className={cls}>
      {children}
      {arrow}
    </Link>
  )
}
