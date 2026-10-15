import { createContext, useContext } from 'react'

// A page that is still on its way (a lazily-imported route) reports itself here, so the
// veil knows the difference between "the page has not arrived yet" and "the page is on
// screen". The context lives apart from the components that provide and consume it,
// which keeps fast refresh happy.
export interface RoutePending {
  pending: boolean
  setPending: (pending: boolean) => void
}

export const RoutePendingContext = createContext<RoutePending>({ pending: false, setPending: () => {} })

export function useRoutePending() {
  return useContext(RoutePendingContext)
}
