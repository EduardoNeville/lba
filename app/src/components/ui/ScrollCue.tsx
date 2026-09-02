import { Icon } from './icons'

export function ScrollCue() {
  return (
    <span aria-hidden className="scroll-bob">
      <Icon name="chevron-down" className="h-6 w-6" />
    </span>
  )
}