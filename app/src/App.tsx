import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { LangProvider } from './lib/lang'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PropertyPage } from './pages/PropertyPage'
import { LegalPage } from './pages/LegalPage'
import { PrivateClientPage } from './pages/PrivateClientPage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogPostPage } from './pages/BlogPostPage'

import { NotFoundPage } from './pages/NotFoundPage'
import { LegalDocPage } from './pages/LegalDocPage'
import { setPageMeta } from './lib/seo'
import { privacyDoc, termsDoc } from './data/legalDocs'

// Lazy: keeps the Firestore SDK out of the main bundle (inquiry.md §4)
const InquiryPage = lazy(() => import('./pages/InquiryPage').then((m) => ({ default: m.InquiryPage })))
const AdminPage = lazy(() => import('./pages/AdminPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// EN-only meta; fr/es defaults to English until locale coverage lands.
const ROUTE_META: Record<string, { title: string; description?: string }> = {
  '/': {
    title: 'Legal Boutique Advisers | Legal, property & private client advice in Spain',
    description: 'Independent legal, property and private client advice in Spain · personal, discreet and tailored to international clients.',
  },
  '/about': {
    title: 'About Us · Legal Boutique Advisers',
    description: 'A boutique legal practice in Marbella: legal expertise, property advisory and private client services under one trusted roof.',
  },
  '/property': {
    title: 'Property Advisory in Spain · Legal Boutique Advisers',
    description: 'Acquiring, structuring and letting property in Spain with independent, client-side advice.',
  },
  '/legal': {
    title: 'Legal Advice in Spain · Legal Boutique Advisers',
    description: 'Residency, tax, inheritance, corporate and commercial legal advice for private and international clients in Spain.',
  },
  '/private-client': {
    title: 'Private Client Services · Legal Boutique Advisers',
    description: 'Relocation, home management, lifestyle and concierge services for international clients living in Spain.',
  },
  '/blog': {
    title: 'Journal · Legal Boutique Advisers',
    description: 'Notes on living, investing and building a life in Spain, from the Legal Boutique Advisers team.',
  },
  '/inquiry': {
    title: 'Enquire · Legal Boutique Advisers',
    description: 'Tell us about your plans in Spain. Every enquiry is read by a partner and treated with discretion.',
  },
}

function ApplyMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = ROUTE_META[pathname] ?? ROUTE_META['/']
    setPageMeta(m.title, m.description)
  }, [pathname])
  return null
}

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ApplyMeta />
        <SiteHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/private-client" element={<PrivateClientPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<LegalDocPage doc={privacyDoc} />} />
            <Route path="/terms" element={<LegalDocPage doc={termsDoc} />} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </BrowserRouter>
    </LangProvider>
  )
}

export default App
