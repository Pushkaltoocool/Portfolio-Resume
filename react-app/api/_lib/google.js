// Google service-account auth + Calendar REST helpers.
// Credentials come from GOOGLE_SERVICE_ACCOUNT_JSON (full JSON string — use this
// on Vercel) or GOOGLE_APPLICATION_CREDENTIALS (file path — local dev).

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { JWT } from 'google-auth-library';

let cachedCreds = null;

export function loadServiceAccount() {
  if (cachedCreds) return cachedCreds;

  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    cachedCreds = JSON.parse(inline);
  } else {
    const file = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!file) {
      throw new Error(
        'Google credentials missing: set GOOGLE_SERVICE_ACCOUNT_JSON (Vercel) or GOOGLE_APPLICATION_CREDENTIALS (local path).',
      );
    }
    const resolved = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
    cachedCreds = JSON.parse(readFileSync(resolved, 'utf8'));
  }
  // Env vars sometimes escape newlines in the private key.
  if (cachedCreds.private_key?.includes('\\n')) {
    cachedCreds.private_key = cachedCreds.private_key.replace(/\\n/g, '\n');
  }
  return cachedCreds;
}

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';
let jwtClient = null;

async function getCalendarToken() {
  if (!jwtClient) {
    const creds = loadServiceAccount();
    jwtClient = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: [CALENDAR_SCOPE],
    });
  }
  const { token } = await jwtClient.getAccessToken();
  if (!token) throw new Error('Failed to obtain Google access token.');
  return token;
}

async function calendarFetch(url, options = {}) {
  const token = await getCalendarToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || `Google Calendar API error (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.reason = data?.error?.errors?.[0]?.reason;
    throw err;
  }
  return data;
}

export function configuredCalendarIds() {
  return (process.env.GOOGLE_CALENDAR_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// Free/busy across calendars. Returns { busy: [{start,end}], errors: {calendarId: message} }.
export async function freeBusy(timeMinISO, timeMaxISO, calendarIds) {
  const data = await calendarFetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    body: JSON.stringify({
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      items: calendarIds.map((id) => ({ id })),
    }),
  });

  const busy = [];
  const errors = {};
  for (const [id, cal] of Object.entries(data.calendars || {})) {
    if (cal.errors?.length) {
      errors[id] = cal.errors.map((e) => e.reason).join(', ');
    }
    for (const b of cal.busy || []) busy.push(b);
  }
  return { busy, errors };
}

// Insert an event. Tries to invite the guest as an attendee (works only with
// domain-wide delegation); falls back to a plain event otherwise.
export async function insertBookingEvent(calendarId, { summary, description, startISO, endISO, timezone, guestEmail, status }) {
  const base = {
    summary,
    description,
    start: { dateTime: startISO, timeZone: timezone },
    end: { dateTime: endISO, timeZone: timezone },
    reminders: { useDefault: true },
    source: { title: 'Portfolio booking', url: 'https://pushkal.dev' },
    // 'tentative' when the guest booked over an existing commitment.
    ...(status ? { status } : {}),
  };
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`;

  try {
    const event = await calendarFetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...base, attendees: guestEmail ? [{ email: guestEmail }] : undefined }),
    });
    return { event, invitedGuest: Boolean(guestEmail) };
  } catch (err) {
    // Service accounts without domain-wide delegation cannot invite attendees.
    if (err.status === 403 && guestEmail) {
      const event = await calendarFetch(url, { method: 'POST', body: JSON.stringify(base) });
      return { event, invitedGuest: false };
    }
    throw err;
  }
}

// "Add to Google Calendar" link for the guest (their side of the invite).
export function addToGoogleCalendarUrl({ title, details, startISO, endISO }) {
  const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details,
    dates: `${fmt(startISO)}/${fmt(endISO)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
