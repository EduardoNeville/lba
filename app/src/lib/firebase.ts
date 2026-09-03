import { initializeApp } from 'firebase/app'

// Project chosen at build time: set VITE_FIREBASE_* in .env.production / .env.development.
// Defaults = production project; only override what a dev environment needs.
// Dev uses Firestore multi-database ('lba-dev') in the same project: posts are physically
// separate, so dev posts can never surface on the real site.
export const firestoreDb = (import.meta.env.VITE_FIRESTORE_DB || undefined) as string | undefined

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'legal-boutique-advisers-bf25a.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'legal-boutique-advisers-bf25a',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'legal-boutique-advisers-bf25a.firebasestorage.app',
})

export const getApp = () => app
