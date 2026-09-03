import { getApp } from './firebase'

export interface InquiryInput {
  interest: string
  fullName: string
  email: string
  phone?: string
  country?: string
  message?: string
}

export class InquiryError extends Error {}

// The Firestore SDK is loaded via dynamic import, so it only lands in the
// /inquiry route chunk (per 01 / inquiry §4). Only the app init stays eager.
export async function submitInquiry(input: InquiryInput): Promise<void> {
  try {
    const { addDoc, collection, getFirestore, serverTimestamp } = await import('firebase/firestore')
    const db = getFirestore(getApp(), firestoreDb)
    await addDoc(collection(db, 'inquiries'), {
      ...input,
      consent: true,
      createdAt: serverTimestamp(),
    })
  } catch {
    throw new InquiryError('We could not send your enquiry right now. Please try again in a moment.')
  }
}
