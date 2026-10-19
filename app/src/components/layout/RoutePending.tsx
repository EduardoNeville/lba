import { useEffect, useState } from 'react'
import { RoutePendingContext, useRoutePending } from '../../lib/routePending'

export function RoutePendingProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(false)
  return (
    <RoutePendingContext.Provider value={{ pending, setPending }}>{children}</RoutePendingContext.Provider>
  )
}

// The Suspense fallback for the routes. It stays deliberately quiet — the veil is what
// the visitor sees — but it announces the wait and reports it upward while it is
// mounted, which is what tells the veil a page is genuinely on its way.
export function RouteFallback() {
  const { setPending } = useRoutePending()

  useEffect(() => {
    setPending(true)
    return () => setPending(false)
  }, [setPending])

  return <div className="min-h-[60vh]" aria-busy="true" />
}
