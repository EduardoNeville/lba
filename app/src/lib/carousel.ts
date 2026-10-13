// Reading a carousel's scroll position back into an index.
//
// Two things have to be told apart: the visitor scrolling, which must move the index,
// and the browser animating to a slide this component asked for, which must not.
//
// Mid-flight, a smooth scroll passes through positions that round to the slide it is
// leaving — at 40% of the way from slide 0 to slide 1, Math.round says 0 again. Accept
// that and the index goes backwards, which asks the carousel to scroll back, which
// produces more mid-flight positions. With one carousel that merely stutters; with
// two sharing one index — the gallery and its full-screen viewer — they push each
// other back and forth indefinitely.
//
// Hence: the component records where it is animating to, and the scroll position is
// only read as an index once that animation has arrived (or was never started).

export interface CarouselScrollSample {
  scrollLeft: number
  slideWidth: number
  /** The index the component is currently showing. */
  index: number
  /** The slide a programmatic scroll is on its way to, if there is one. */
  animatingTo: number | null
}

export interface CarouselScrollDecision {
  /** The slide to adopt, or null to leave the index alone. */
  index: number | null
  /** Cleared once the animation has arrived, so later scrolling is read again. */
  animatingTo: number | null
}

const ARRIVAL_TOLERANCE_PX = 2
const ARRIVAL_TOLERANCE_RATIO = 0.02

export function readCarouselScroll({
  scrollLeft,
  slideWidth,
  index,
  animatingTo,
}: CarouselScrollSample): CarouselScrollDecision {
  if (!(slideWidth > 0)) return { index: null, animatingTo }

  if (animatingTo !== null) {
    const target = animatingTo * slideWidth
    const tolerance = Math.max(ARRIVAL_TOLERANCE_PX, slideWidth * ARRIVAL_TOLERANCE_RATIO)
    return { index: null, animatingTo: Math.abs(scrollLeft - target) <= tolerance ? null : animatingTo }
  }

  const settled = Math.round(scrollLeft / slideWidth)
  return { index: settled === index ? null : settled, animatingTo: null }
}

/** Where an arrow press lands: one screen further on, wrapping when the carousel
 *  loops and stopping at the end when it does not. */
export function nextIndex({
  index,
  delta,
  perView,
  last,
  loop,
}: {
  index: number
  delta: number
  perView: number
  last: number
  loop: boolean
}): number {
  let next = index + delta * Math.max(1, perView)
  if (next > last) next = loop ? 0 : last
  if (next < 0) next = loop ? last : 0
  return next
}
