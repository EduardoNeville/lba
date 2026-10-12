import { useEffect, useState } from 'react'
import { getApp } from './firebase'

export interface AdminUser {
  uid: string
  email: string | null
}

// Shared by every /admin panel (journal, residences). The auth SDK is lazy so it
// never lands in the public bundle.
export function useAdminUser(): { user: AdminUser | null; loading: boolean } {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    let cancelled = false
    ;(async () => {
      const { getAuth, onAuthStateChanged } = await import('firebase/auth')
      unsubscribe = onAuthStateChanged(getAuth(getApp()), (u) => {
        if (cancelled) return
        setUser(u ? { uid: u.uid, email: u.email } : null)
        setLoading(false)
      })
    })()
    return () => {
      cancelled = true
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return { user, loading }
}

export async function signIn(email: string, password: string): Promise<void> {
  const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
  try {
    await signInWithEmailAndPassword(getAuth(getApp()), email.trim(), password)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Login failed'
    throw new Error(message.includes('auth/') ? 'Invalid email or password.' : message)
  }
}

export async function signOutAdmin(): Promise<void> {
  const { getAuth, signOut } = await import('firebase/auth')
  await signOut(getAuth(getApp()))
}
