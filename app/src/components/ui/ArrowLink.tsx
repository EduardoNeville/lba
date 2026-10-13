import { Link } from 'react-router-dom'

export function ArrowLink({
  to,
  children,
  className = '',
  hitArea = false,
}: {
  to: string
  children: React.ReactNode
  className?: string
  /** Expand the tap target to the 44px floor. The negative margin keeps the link's
   *  footprint where it was, so a baseline-aligned row does not move. */
  hitArea?: boolean
}) {
  const cls = `micro group inline-flex items-center gap-2 text-[11px] text-ink transition-colors hover:text-oxblood ${
    hitArea ? 'min-h-11 -my-3 py-3' : ''
  } ${className}`
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
