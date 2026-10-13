import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from './icons'
import { prefersReducedMotion } from '../../lib/motion'
import { nextIndex, readCarouselScroll } from '../../lib/carousel'

// A dependency-free carousel: native scroll-snap does the moving, the browser does
// the swiping, and this component only drives the arrows, the dots, the counter and
// the optional autoplay. That keeps it small and keeps keyboard/trackpad/touch
// behaviour identical to the rest of the page.
//
// It is used twice on a residence page (the photographs, and the thumbnail strip
// that drives them) and again on the home page, so it takes its copy through props
// instead of pulling a dictionary. `index`/`onIndexChange` make it controllable:
// the gallery owner holds the index and both carousels agree on it.

interface CarouselLabels {
  previous: string
  next: string
  pause: string
  play: string
}

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  ariaLabel: string
  labels: CarouselLabels
  /** Slides visible at once — only used to decide how far an arrow jumps. */
  slidesPerView?: number
  /** Milliseconds between automatic advances. 0/undefined = no autoplay. */
  autoplayMs?: number
  /** Show the visible pause/play control (WCAG 2.2.2 for moving content). */
  pauseControl?: boolean
  arrows?: 'always' | 'never'
  dots?: boolean
  counter?: boolean
  loop?: boolean
  index?: number
  onIndexChange?: (index: number) => void
  className?: string
  trackClassName?: string
  itemClassName?: string
}

export function Carousel<T>({
  items,
  renderItem,
  ariaLabel,
  labels,
  slidesPerView = 1,
  autoplayMs = 0,
  pauseControl = false,
  arrows = 'always',
  dots = false,
  counter = false,
  loop = false,
  index: controlledIndex,
  onIndexChange,
  className = '',
  trackClassName = '',
  itemClassName = '',
}: CarouselProps<T>) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  // Where a scroll this component started is heading, so its own animation is not
  // mistaken for the visitor scrolling (see lib/carousel.ts).
  const animatingTo = useRef<number | null>(null)
  const [internalIndex, setInternalIndex] = useState(0)
  const index = controlledIndex ?? internalIndex
  const last = Math.max(0, items.length - 1)
  const many = items.length > 1

  const [userPaused, setUserPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [hiddenTab, setHiddenTab] = useState(false)

  const setIndex = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, last))
      setInternalIndex(clamped)
      if (clamped !== controlledIndex) onIndexChange?.(clamped)
    },
    [controlledIndex, last, onIndexChange],
  )

  // One slide's width, read from the DOM so every breakpoint works without the
  // component knowing the CSS: the first slide plus the flex gap.
  const stepSize = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    const first = track.firstElementChild as HTMLElement | null
    if (!first) return track.clientWidth
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0
    return first.offsetWidth + gap
  }, [])

  const scrollTo = useCallback(
    (target: number, immediate = false) => {
      const track = trackRef.current
      if (!track) return
      const size = stepSize() || track.clientWidth
      // The index is set here rather than read back from the animation, because the
      // scroll listener deliberately ignores positions we are animating through.
      setIndex(target)
      animatingTo.current = target
      track.scrollTo({
        left: target * size,
        behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth',
      })
    },
    [setIndex, stepSize],
  )

  const move = useCallback(
    (delta: number) => {
      scrollTo(nextIndex({ index, delta, perView: slidesPerView, last, loop }))
    },
    [index, last, loop, scrollTo, slidesPerView],
  )

  // Follow the visitor's own scrolling (swipe, trackpad, keyboard) back into state,
  // while ignoring the animation a programmatic move started.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const size = stepSize() || track.clientWidth
        const decision = readCarouselScroll({
          scrollLeft: track.scrollLeft,
          slideWidth: size,
          index,
          animatingTo: animatingTo.current,
        })
        animatingTo.current = decision.animatingTo
        if (decision.index !== null) setIndex(decision.index)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [index, setIndex, stepSize])

  // Taking hold of the carousel cancels any animation we started, so the index starts
  // following the visitor again immediately.
  const releaseAnimation = () => {
    animatingTo.current = null
  }

  // When the owner changes the index (a thumbnail click, a "next" on another
  // carousel), move the track — unless it is already there, so this never fights a
  // swipe in progress.
  useEffect(() => {
    if (controlledIndex === undefined) return
    const track = trackRef.current
    if (!track) return
    const size = stepSize() || track.clientWidth
    if (Math.abs(track.scrollLeft - controlledIndex * size) < size / 2) return
    scrollTo(controlledIndex)
  }, [controlledIndex, scrollTo, stepSize])

  useEffect(() => {
    const onVisibility = () => setHiddenTab(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const autoplayOn = autoplayMs > 0 && many && !userPaused && !interacting && !hiddenTab
  useEffect(() => {
    if (!autoplayOn || prefersReducedMotion()) return
    const timer = setInterval(() => move(1), autoplayMs)
    return () => clearInterval(timer)
  }, [autoplayOn, autoplayMs, move])

  const arrowCls =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-hairline bg-cream/90 text-ink transition-colors hover:bg-cream'

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={`relative ${className}`}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={ariaLabel}
        onPointerDown={releaseAnimation}
        onWheel={releaseAnimation}
        onKeyDown={releaseAnimation}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto ${trackClassName}`}
      >
        {items.map((item, itemIndex) => (
          <li
            key={itemIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`${itemIndex + 1} / ${items.length}`}
            className={`shrink-0 snap-start ${itemClassName}`}
          >
            {renderItem(item, itemIndex)}
          </li>
        ))}
      </ul>

      {arrows === 'always' && many && (
        <>
          <button type="button" onClick={() => move(-1)} aria-label={labels.previous} className={`${arrowCls} left-2 md:left-4`}>
            <Icon name="chevron-left" className="h-5 w-5 !text-current" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={labels.next} className={`${arrowCls} right-2 md:right-4`}>
            <Icon name="chevron-right" className="h-5 w-5 !text-current" />
          </button>
        </>
      )}

      {counter && many && (
        <p className="micro absolute bottom-4 left-1/2 -translate-x-1/2 border border-hairline bg-cream/90 px-3 py-1.5 text-[10px] text-ink md:bottom-6">
          {index + 1} / {items.length}
        </p>
      )}

      {dots && many && (
        <div className="mt-4 flex items-center justify-center gap-1">
          {items.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => scrollTo(dotIndex)}
              aria-label={`${dotIndex + 1} / ${items.length}`}
              aria-current={dotIndex === index}
              className="flex min-h-11 min-w-11 items-center justify-center"
            >
              {/* The dot stays small; the button around it is the tap target. */}
              <span
                aria-hidden
                className={`block h-2.5 w-2.5 border transition-colors ${
                  dotIndex === index ? 'border-oxblood bg-oxblood' : 'border-ink/50 bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {pauseControl && autoplayMs > 0 && many && (
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          className="micro absolute bottom-4 right-4 min-h-11 border border-hairline bg-cream/90 px-3 py-2 text-[10px] text-ink transition-colors hover:bg-cream md:bottom-6 md:right-6"
        >
          {userPaused ? labels.play : labels.pause}
        </button>
      )}
    </div>
  )
}
