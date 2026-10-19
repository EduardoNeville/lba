import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo-lba-ink.png'
import { prefersReducedMotion } from '../../lib/motion'
import { useRoutePending } from '../../lib/routePending'

// A hair after the click, so the veil covers the page being arrived at rather than the
// one being left. The veil is opaque, so this is about which content sits behind it.
const ARM_MS = 60
// How long it stays once it is up. This is a brand moment, not a spinner, and it was
// asked to read as one — it is also the cost of it, on every single page change.
const MIN_VISIBLE_MS = 1300
// Blur in, and blur out. The entrance is the slower of the two: arriving is the
// deliberate part, leaving should feel like it is getting out of the way.
const IN_MS = 600
const OUT_MS = 500
// If something never resolves — a chunk that fails, a dead network — the page is let
// through anyway rather than sitting behind a logo for ever.
const MAX_HOLD_MS = 4000

/**
 * The page-change animation: the lockup blurs in over the cream canvas as a page is
 * opened, and blurs out as it arrives.
 *
 * It covers the first paint of the site and every page change after it, holds for a
 * moment of its own, and stays up for as long as a lazily-loaded route is genuinely
 * still on its way. It renders nothing on the server, so crawlers and no-JS readers get
 * the page content immediately instead of a splash screen — there is no hidden content
 * to un-hide.
 *
 * The timings below are the whole cost of it: roughly 1.9s from click to page, on every
 * page change.
 */
export function RouteVeil() {
  const { pending } = useRoutePending()
  const { pathname } = useLocation()
  const reduceMotion = prefersReducedMotion()

  const [visible, setVisible] = useState(false)
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const shownAt = useRef(0)
  // The pathname the veil has already been armed for, so that finishing one animation
  // does not arm the next one (the effect depends on `visible`, which flips when the
  // veil unmounts — without this it would show itself for ever).
  const armedFor = useRef<string | null>(null)

  // The veil covers the first paint of the site and every page change after it. Covering
  // only the slow routes was too subtle: the chunks are cached after the first visit, so
  // a navigation that is waiting on nothing looked like no navigation at all.
  useEffect(() => {
    if (armedFor.current === pathname) return
    if (visible) {
      // A change while it is up: leave it up. The animation keeps its own timeline
      // rather than restarting, so clicking through several pages quickly does not
      // stack up a queue of veils.
      armedFor.current = pathname
      return
    }
    armedFor.current = pathname
    const timer = setTimeout(() => {
      shownAt.current = Date.now()
      setEntered(false)
      setLeaving(false)
      setVisible(true)
    }, ARM_MS)
    return () => clearTimeout(timer)
  }, [pathname, visible])

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
      : 'opacity-0 blur-[10px] scale-[1.02]'
    : entered || reduceMotion
      ? 'opacity-100 blur-0 scale-100'
      : 'opacity-0 blur-[14px] scale-[0.96]'

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-cream transition-opacity ease-out ${
        leaving ? 'opacity-0 duration-[500ms]' : 'opacity-100 duration-[280ms]'
      }`}
    >
      <img
        src={logo}
        alt=""
        className={`h-12 w-auto object-contain transition-all ease-out md:h-16 ${mark}`}
        style={{ transitionDuration: `${leaving ? OUT_MS : IN_MS}ms` }}
      />
    </div>
  )
}
