import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { JournalAdmin } from '../components/admin/JournalAdmin'
import { ResidencesAdmin } from '../components/admin/ResidencesAdmin'
import { signIn, signOutAdmin, useAdminUser } from '../lib/adminAuth'
import { controlCls } from '../components/admin/styles'

const TABS = [
  { key: 'journal', label: 'Journal' },
  { key: 'residences', label: 'Residences' },
] as const

type TabKey = (typeof TABS)[number]['key']

// The admin shell: the auth gate, the tabs and the sign-out button. Each tab is its
// own panel (components/admin/*Admin), so the journal and the residences editor stay
// out of each other's way — and the tab lives in the URL, so a reload keeps it.
export function AdminPage() {
  const { user, loading } = useAdminUser()
  const [params] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [busy, setBusy] = useState(false)
  const tab: TabKey = params.get('tab') === 'residences' ? 'residences' : 'journal'

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setAuthError('')
    setBusy(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-sm text-taupe">Loading…</p>
        </Container>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-[420px] border border-hairline bg-white p-8 md:p-10">
            <h1 className="font-display text-2xl uppercase">Admin</h1>
            <p className="mt-2 text-sm text-taupe">Sign in to manage the journal and the residences.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="micro mb-2 block text-ink">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={controlCls}
                  placeholder="you@legalboutiqueadvisers.com"
                  required
                />
              </div>
              <div>
                <label className="micro mb-2 block text-ink">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={controlCls}
                  placeholder="••••••••"
                  required
                />
              </div>
              {authError && <p className="micro text-oxblood">{authError}</p>}
              <button
                type="submit"
                disabled={busy}
                className="micro w-full bg-ink py-3 text-cream transition-colors hover:bg-oxblood disabled:opacity-50"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="mt-6 text-center text-[11px] text-taupe">
              <Link to="/" className="underline hover:text-ink">
                ← Back to site
              </Link>
            </p>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <h1 className="font-display text-2xl uppercase">Admin</h1>
            <p className="micro mt-1 text-taupe">{user.email}</p>
          </div>
          <button
            onClick={() => signOutAdmin()}
            className="micro border border-ink px-4 py-2 transition-colors hover:bg-ink hover:text-cream"
          >
            Sign out
          </button>
        </div>

        <nav aria-label="Admin sections" className="mt-6 flex gap-6 border-b border-hairline">
          {TABS.map((item) => {
            const active = item.key === tab
            return (
              <Link
                key={item.key}
                to={`/admin?tab=${item.key}`}
                aria-current={active ? 'page' : undefined}
                className={`micro -mb-px border-b pb-3 transition-colors ${
                  active ? 'border-oxblood text-oxblood' : 'border-transparent text-taupe hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {tab === 'journal' ? <JournalAdmin /> : <ResidencesAdmin />}
      </Container>
    </section>
  )
}

// default export for lazy()
export default AdminPage
