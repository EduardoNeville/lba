import { Icon } from './icons'

export function ValueItem({
  icon,
  title,
  body,
  link,
}: {
  icon: string
  title: string
  body: string
  link?: { to: string; label: string }
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon name={icon} className="h-7 w-7" />
      <h3 className="font-display mt-4 text-lg uppercase tracking-[0.08em] text-ink">{title}</h3>
      <p className="mt-3 max-w-[26ch] text-[13px] leading-relaxed text-taupe">{body}</p>
      {link && (
        <a href={link.to} className="micro group mt-4 inline-flex items-center gap-2 text-[10px] text-ink transition-colors hover:text-oxblood">
          {link.label}
          <span aria-hidden>→</span>
        </a>
      )}
    </div>
  )
}
