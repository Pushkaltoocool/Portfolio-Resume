// POST /api/book — submit a booking *request*.
// Body: { start: ISO, durationMinutes, name, email, topic?, notes?, website? (honeypot) }
// Flow: validate → record a PENDING request in Firestore → notify the owner.
// No calendar event and no guest invite are created until the owner confirms it
// in the admin dashboard (see api/bookings/[id].js).

import { randomUUID } from 'node:crypto';
import { freeBusy, configuredCalendarIds } from './_lib/google.js';
import { db, BOOKINGS } from './_lib/firestore.js';
import { sendEmail } from './_lib/emailjs.js';
import { send, fail, getBody, isValidEmail, hourInTimezone, bookingConfig } from './_lib/util.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed.');

  try {
    const body = getBody(req);

    // Honeypot: real users never fill this hidden field.
    if (body.website) return send(res, 200, { ok: true, pending: true });

    const config = bookingConfig();
    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().slice(0, 200);
    const location = String(body.location || '').trim().slice(0, 300);
    const topic = String(body.topic || '').trim().slice(0, 200);
    const notes = String(body.notes || '').trim().slice(0, 2000);
    const durationMinutes = Number(body.durationMinutes);

    if (!name) return fail(res, 400, 'Please enter your name.');
    if (!isValidEmail(email)) return fail(res, 400, 'Please enter a valid email address.');
    if (!location) return fail(res, 400, 'Please enter a location (e.g. Google Meet, Zoom, or a place).');
    if (!config.durations.includes(durationMinutes)) return fail(res, 400, 'Invalid meeting duration.');

    const start = new Date(String(body.start || ''));
    if (Number.isNaN(start.getTime())) return fail(res, 400, 'Invalid start time.');
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    const now = Date.now();
    if (start.getTime() < now + config.minNoticeHours * 3600 * 1000) {
      return fail(res, 400, `Bookings need at least ${config.minNoticeHours}h notice.`);
    }
    if (start.getTime() > now + config.maxDaysAhead * 24 * 3600 * 1000) {
      return fail(res, 400, `Bookings can be made up to ${config.maxDaysAhead} days ahead.`);
    }
    if (start.getMinutes() % 15 !== 0 || start.getSeconds() !== 0) {
      return fail(res, 400, 'Start time must be on a 15-minute boundary.');
    }

    // Must fall inside the owner's bookable window (in the owner's timezone).
    const startHour = hourInTimezone(start, config.timezone);
    const endHour = hourInTimezone(new Date(end.getTime() - 60000), config.timezone);
    if (startHour < config.startHour || endHour >= config.endHour || endHour < startHour) {
      return fail(res, 400, `Bookings must fall between ${config.startHour}:00 and ${config.endHour}:00 (${config.timezone}).`);
    }

    // Informational only: does this overlap something already on the calendar?
    // We don't reject — the owner decides — but we flag it for them.
    let overlapsBusy = false;
    try {
      const { busy } = await freeBusy(start.toISOString(), end.toISOString(), configuredCalendarIds());
      overlapsBusy = busy.some((b) => new Date(b.start) < end && new Date(b.end) > start);
    } catch (e) {
      console.warn('book: free/busy check failed (continuing):', e.message);
    }

    const ownerName = process.env.OWNER_NAME || 'Pushkal Vashist';
    const ownerEmail = process.env.OWNER_EMAIL || '';
    const nowISO = new Date().toISOString();
    // Secret token so the owner can approve/decline straight from the email link,
    // without logging into the dashboard. Only ever sent to the owner's inbox.
    const actionToken = randomUUID();

    const booking = {
      status: 'pending',
      name,
      email,
      location,
      topic,
      notes,
      start: start.toISOString(),
      end: end.toISOString(),
      durationMinutes,
      timezone: config.timezone,
      overlapsBusy,
      actionToken,
      createdAt: nowISO,
      updatedAt: nowISO,
    };
    const ref = await db().collection(BOOKINGS).add(booking);

    const whenOwner = new Intl.DateTimeFormat('en-SG', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: config.timezone,
    }).format(start);

    // Owner responds from the email via this token-authed page (buttons there
    // POST the action — no state changes on a mere link open, so email scanners
    // can't accidentally confirm).
    const site = process.env.SITE_URL || '';
    const base = `${site}/manage-booking?id=${ref.id}&token=${actionToken}`;
    const reviewUrl = base;
    const confirmUrl = `${base}&intent=confirm`;
    const declineUrl = `${base}&intent=decline`;

    // Nudge the owner to review it. Failure here doesn't undo the request.
    let ownerEmailResult = null;
    if (ownerEmail) {
      ownerEmailResult = await sendEmail({
        to_email: ownerEmail,
        to_name: ownerName,
        reply_to: email, // replying to the alert reaches the guest directly
        subject: `New booking request: ${name} — ${whenOwner} (${durationMinutes} min)`,
        message: `${name} (${email}) requested a call.\n\nWhen: ${whenOwner} (${config.timezone})\nDuration: ${durationMinutes} min\nLocation: ${location}\nTopic: ${topic || '—'}\nNotes: ${notes || '—'}${overlapsBusy ? '\n\n⚠️ This overlaps something already on your calendar.' : ''}\n\nRespond here (the guest is only invited once you confirm):\n✅ Confirm: ${confirmUrl}\n❌ Decline: ${declineUrl}\nReview: ${reviewUrl}`,
        action_url: reviewUrl,
        action_label: 'Review & respond',
        confirm_url: confirmUrl,
        decline_url: declineUrl,
      });
    }

    return send(res, 200, {
      ok: true,
      pending: true,
      id: ref.id,
      start: start.toISOString(),
      end: end.toISOString(),
      overlapsBusy,
      ownerNotified: Boolean(ownerEmailResult?.sent),
    });
  } catch (err) {
    console.error('book error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
