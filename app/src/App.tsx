import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PropertyPage } from './pages/PropertyPage'
import { LegalPage } from './pages/LegalPage'
import { PrivateClientPage } from './pages/PrivateClientPage'
import { LifestylePage } from './pages/LifestylePage'

// Lazy: keeps the Firestore SDK out of the main bundle (inquiry.md §4)
const InquiryPage = lazy(() => import('./pages/InquiryPage').then((m) => ({ default: m.InquiryPage })))

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/property" element={<PropertyPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/private-client" element={<PrivateClientPage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
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
  )
}

export default App
