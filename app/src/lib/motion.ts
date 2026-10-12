// One source for the motion preference. The carousel's autoplay and the featured
// band's slow zoom both defer to it; CSS handles the scrolling side
// (index.css turns scroll-behavior off under the same query).
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
