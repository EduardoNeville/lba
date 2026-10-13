import { Icon } from './icons'

const tones = {
  dark: 'text-ink hover:text-oxblood',
  // For the residences' gallery, where the cue sits over a photograph rather than a
  // cream scrim.
  light: 'text-cream hover:text-cream/70',
} as const

export function ScrollCue({ tone = 'dark' }: { tone?: keyof typeof tones }) {
  return (
    <button
      type="button"
      aria-label="Scroll down"
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      className={`scroll-bob cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood/40 ${tones[tone]}`}
    >
      <Icon name="chevron-down" className="h-9 w-9 !text-current" />
    </button>
  )
}