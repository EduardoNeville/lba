import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo-lba-ink.png'
import { prefersReducedMotion } from '../../lib/motion'
import { useRoutePending } from '../../lib/routePending'

// A navigation that resolves within this shows nothing at all: a veil that flashes on
// every click is worse than no veil. It is the length of a real wait that earns one.
const ARM_MS = 100
// Once it is up, it stays long enough to read as an animation rather than a flicker.
const MIN_VISIBLE_MS = 220
const OUT_MS = 380
// If something never resolves — a chunk that fails, a dead network — the page is let
// through anyway rather than sitting behind a logo for ever.
const MAX_HOLD_MS = 2500

/**
 * The opening animation: the lockup blurs in over the cream canvas while a page is on
 * its way, then blurs out as it arrives.
 *
 * Two deliberate choices. It appears only when there is something to wait for (a
 * lazily-loaded route, or the first paint of the site) — never on an instant
 * navigation. And it renders nothing on the server, so crawlers and no-JS readers get
 * the page content immediately instead of a splash screen; there is no hidden content
 * to un-hide.
 */
export function RouteVeil() {
  const { pending } = useRoutePending()
  const { pathname } = useLocation()
  const reduceMotion = prefersReducedMotion()

  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const shownAt = useRef(0)
  const lastPath = useRef<string | null>(null)

  // Arm the veil: on the first paint of the site, and whenever a route reports that it
  // is still loading. A wait shorter than ARM_MS never shows anything.
  useEffect(() => {
    if (lastPath.current === pathname && !pending) return
    const firstPaint = lastPath.current === null
    lastPath.current = pathname
    if (visible) return
    if (!firstPaint && !pending) return
    const timer = setTimeout(() => {
      shownAt.current = Date.now()
      setEntered(false)
      setLeaving(false)
      setVisible(true)
    }, ARM_MS)
    return () => clearTimeout(timer)
  }, [pathname, pending, visible])

  // Blur in: mount blurred, then sharpen on the next frame so the transition has two
  // states to move between.
  useEffect(() => {
    if (!visible || leaving) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [visible, leaving])

  // Blur out once the page behind is ready — but only after the animation has been
  // seen, so a quick load does not look like a glitch.
  useEffect(() => {
    if (!visible || leaving || pending) return
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt.current))
    const timer = setTimeout(() => setLeaving(true), wait)
    return () => clearTimeout(timer)
  }, [visible, leaving, pending])

  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => setVisible(false), OUT_MS)
    return () => clearTimeout(timer)
  }, [leaving])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setLeaving(true), MAX_HOLD_MS)
    return () => clearTimeout(timer)
  }, [visible, pathname])

  if (!visible) return null

  // Under reduced motion the lockup simply fades: no blur, no scale.
  const mark = leaving
    ? reduceMotion
      ? 'opacity-0'
      : 'opacity-0 blur-md scale-[1.02]'
    : entered || reduceMotion
      ? 'opacity-100 blur-0 scale-100'
      : 'opacity-0 blur-lg scale-[0.97]'

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-cream transition-opacity ease-out ${
        leaving ? 'opacity-0 duration-[380ms]' : 'opacity-100 duration-[280ms]'
      }`}
    >
      <img src={logo} alt="" className={`h-12 w-auto object-contain transition-all ease-out duration-[380ms] md:h-16 ${mark}`} />
    </div>
  )
}
