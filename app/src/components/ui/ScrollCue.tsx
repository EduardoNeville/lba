import { Icon } from './icons'

export function ScrollCue() {
  return (
    <button
      type="button"
      aria-label="Scroll down"
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      className="scroll-bob cursor-pointer rounded-full text-ink transition-colors hover:text-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood/40"
    >
      <Icon name="chevron-down" className="h-9 w-9" />
    </button>
  )
}