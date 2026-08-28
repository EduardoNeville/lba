import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { LangProvider } from './lib/lang'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PropertyPage } from './pages/PropertyPage'
import { LegalPage } from './pages/LegalPage'
import { PrivateClientPage } from './pages/PrivateClientPage'
import { LifestylePage } from './pages/LifestylePage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'

// Lazy: keeps the Firestore SDK out of the main bundle (inquiry.md §4)
const InquiryPage = lazy(() => import('./pages/InquiryPage').then((m) => ({ default: m.InquiryPage })))
const AdminPage = lazy(() => import('./pages/AdminPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/private-client" element={<PrivateClientPage />} />
            <Route path="/lifestyle" element={<LifestylePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<div className="min-h-[50vh]" />}>
                  <AdminPage />
                </Suspense>
              }
            />
            <Route
              path="/inquiry"
              element={
                <Suspense fallback={<div className="min-h-[50vh]" />}>
                  <InquiryPage />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </LangProvider>
  )
}

export default App
