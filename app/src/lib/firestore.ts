import type { Firestore } from 'firebase/firestore'
import { firestoreDb, getApp } from './firebase'

// The Firestore SDK is imported on demand so it stays in its own chunk
// (docs/01 §Firebase reuse). Every caller — journal, residences, inquiry —
// goes through this one function so the dev/prod database switch lives in
// exactly one place (VITE_FIRESTORE_DB is only set in development).
export async function getDb(): Promise<Firestore> {
  const { getFirestore } = await import('firebase/firestore')
  return firestoreDb ? getFirestore(getApp(), firestoreDb) : getFirestore(getApp())
}
