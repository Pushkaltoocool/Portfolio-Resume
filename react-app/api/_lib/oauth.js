// OAuth 2.0 "as the owner" — lets the app create events *as Pushkal* so guests
// get a real Google Calendar invite (RSVP + auto-add), which a service account on
// a personal Gmail cannot do. The refresh token is stored in Firestore so it
// survives redeploys; connect once from the admin dashboard.

import { randomUUID } from 'node:crypto';
import { OAuth2Client } from 'google-auth-library';
import { db } from './firestore.js';

// calendar.events is enough to create events and invite attendees.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];
const CONFIG = 'config';
const OAUTH_DOC = 'google_oauth';
const NONCE_DOC = 'oauth_nonce';
const NONCE_TTL_MS = 10 * 60 * 1000;

export function oauthConfigured() {
  return Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET);
}

// The redirect must exactly match one registered on the OAuth client in Google
// Cloud. Prefer an explicit env var; fall back to deriving it from the request.
export function redirectUri(req) {
  if (process.env.GOOGLE_OAUTH_REDIRECT_URI) return process.env.GOOGLE_OAUTH_REDIRECT_URI;
  const proto = String(req?.headers?.['x-forwarded-proto'] || 'http').split(',')[0];
  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host || 'localhost:5173';
  return `${proto}://${host}/api/oauth/callback`;
}

function client(req) {
  return new OAuth2Client(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri(req),
  );
}

const oauthRef = () => db().collection(CONFIG).doc(OAUTH_DOC);
const nonceRef = () => db().collection(CONFIG).doc(NONCE_DOC);

// Build the Google consent URL and stash a one-time state nonce in Firestore.
export async function beginAuth(req) {
  const nonce = randomUUID();
  await nonceRef().set({ nonce, exp: Date.now() + NONCE_TTL_MS });
  const url = client(req).generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // force a refresh_token every time
    scope: SCOPES,
    state: nonce,
  });
  return url;
}

export async function verifyNonce(state) {
  const snap = await nonceRef().get();
  if (!snap.exists) return false;
  const { nonce, exp } = snap.data();
  await nonceRef().delete().catch(() => {});
  return Boolean(state) && state === nonce && Date.now() < exp;
}

export async function exchangeAndStore(req, code) {
  const { tokens } = await client(req).getToken(code);
  if (!tokens.refresh_token) {
    throw new Error('Google did not return a refresh token. Remove prior access at myaccount.google.com/permissions and try again.');
  }
  await oauthRef().set(
    { refresh_token: tokens.refresh_token, connectedAt: new Date().toISOString() },
    { merge: true },
  );
  return true;
}

export async function loadRefreshToken() {
  const snap = await oauthRef().get();
  if (snap.exists && snap.data().refresh_token) return snap.data().refresh_token;
  return process.env.GOOGLE_OAUTH_REFRESH_TOKEN || null;
}

export async function isConnected() {
  return Boolean(await loadRefreshToken());
}

export async function disconnect() {
  await oauthRef().delete().catch(() => {});
}

// Create an event AS the owner and invite the guest. sendUpdates=all makes Google
// email the guest a native invitation with RSVP.
export async function createOwnerEvent(calendarId, event) {
  const refresh = await loadRefreshToken();
  if (!refresh) throw new Error('Google Calendar is not connected. Connect it in the admin dashboard first.');

  const c = client();
  c.setCredentials({ refresh_token: refresh });
  const { token } = await c.getAccessToken();
  if (!token) throw new Error('Could not obtain a Google access token (re-connect may be required).');

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Calendar API error (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}
