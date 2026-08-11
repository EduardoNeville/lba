import { initializeApp } from 'firebase/app'

// ponytail: key kept in .env.local per 01; project legal-boutique-advisers-bf25a
const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'legal-boutique-advisers-bf25a.firebaseapp.com',
  projectId: 'legal-boutique-advisers-bf25a',
  storageBucket: 'legal-boutique-advisers-bf25a.firebasestorage.app',
})

export const getApp = () => app
