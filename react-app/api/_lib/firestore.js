// Firebase Admin Firestore, initialized from the same service account as Calendar.

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { loadServiceAccount } from './google.js';

export function db() {
  if (!getApps().length) {
    const creds = loadServiceAccount();
    initializeApp({ credential: cert(creds), projectId: creds.project_id });
  }
  return getFirestore();
}

export const POSTS = 'blog_posts';
export const BOOKINGS = 'bookings';
