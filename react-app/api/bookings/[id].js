// GET    /api/bookings/:id?token=…       fetch one request (admin OR email token)
// POST   /api/bookings/:id               body { action: 'confirm'|'decline', message?, token? }
//   confirm → create the event AS the owner (OAuth) inviting the guest, so Google
//             emails them a native RSVP invite. Marks the request confirmed.
//   decline → mark declined and email the guest (best-effort).
// DELETE /api/bookings/:id (admin only)  remove the request record.
//
// Auth is the admin passcode OR the per-booking actionToken from the owner's email
// (lets the owner approve/decline straight from the notification without logging in).

import { db, BOOKINGS } from '../_lib/firestore.js';
import { createOwnerEvent, isConnected } from '../_lib/oauth.js';
import { configuredCalendarIds } from '../_lib/google.js';
import { sendEmail } from '../_lib/emailjs.js';
import { send, fail, getBody, isAdmin, bookingConfig } from '../_lib/util.js';

export default async function handler(req, res) {
  const id = String(req.query?.id || '');
  if (!id) return fail(res, 400, 'Missing booking id.');
  const ref = db().collection(BOOKINGS).doc(id);

  try {
    const snap = await ref.get();
    if (!snap.exists) return fail(res, 404, 'Booking not found.');
    const booking = snap.data();

    const body = getBody(req);
    const token = req.query?.token || body.token;
    const admin = isAdmin(req);
    const tokenOk = Boolean(booking.actionToken) && token === booking.actionToken;
    if (!admin && !tokenOk) return fail(res, 401, 'Unauthorized.');

    const config = bookingConfig();
    const ownerName = process.env.OWNER_NAME || 'Pushkal Vashist';
    const whenGuest = new Intl.DateTimeFormat('en-SG', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: config.timezone,
    }).format(new Date(booking.start));

    // Fetch a single request (for the admin list detail or the email response page).
    if (req.method === 'GET') {
      const { name, email, topic, notes, start, end, durationMinutes, timezone, overlapsBusy, status, htmlLink } = booking;
      return send(res, 200, {
        ok: true,
        booking: { id, name, email, topic, notes, start, end, durationMinutes, timezone, overlapsBusy, status, htmlLink },
      });
    }

    if (req.method === 'DELETE') {
      if (!admin) return fail(res, 401, 'Admin only.');
      await ref.delete();
      return send(res, 200, { ok: true });
    }

    if (req.method !== 'POST') return fail(res, 405, 'Method not allowed.');

    const action = body.action;

    if (action === 'confirm') {
      if (booking.status === 'confirmed') return fail(res, 409, 'Already confirmed.');
      if (!(await isConnected())) {
        return fail(res, 400, 'Connect your Google Calendar in the dashboard before confirming — that is what sends the invite.');
      }

      const bookingCalendar = process.env.BOOKING_CALENDAR_ID || configuredCalendarIds()[0];
      const summary = `📅 ${booking.name}${booking.topic ? ` — ${booking.topic}` : ' — intro call'}`;
      const description = [
        `Confirmed from a portfolio booking request (${booking.durationMinutes} min).`,
        '',
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        booking.topic ? `Topic: ${booking.topic}` : null,
        booking.notes ? `Notes:\n${booking.notes}` : null,
      ]
        .filter((l) => l !== null)
        .join('\n');

      const event = await createOwnerEvent(bookingCalendar, {
        summary,
        description,
        start: { dateTime: booking.start, timeZone: config.timezone },
        end: { dateTime: booking.end, timeZone: config.timezone },
        attendees: [{ email: booking.email, displayName: booking.name }],
        reminders: { useDefault: true },
      });

      await ref.update({
        status: 'confirmed',
        eventId: event.id || null,
        htmlLink: event.htmlLink || null,
        confirmedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return send(res, 200, { ok: true, status: 'confirmed', htmlLink: event.htmlLink || null, invited: true });
    }

    if (action === 'decline') {
      const message = String(body.message || '').trim().slice(0, 1000);
      await ref.update({
        status: 'declined',
        declineMessage: message || null,
        declinedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const emailRes = await sendEmail({
        to_email: booking.email,
        to_name: booking.name,
        reply_to: process.env.OWNER_EMAIL || '',
        subject: `Update on your request to meet ${ownerName}`,
        message: `Hi ${booking.name},\n\nThanks for reaching out. Unfortunately I can't make ${whenGuest} (${config.timezone}).${message ? `\n\n${message}` : '\n\nFeel free to pick another time on the booking page.'}\n\n— ${ownerName}`,
        action_url: `${process.env.SITE_URL || ''}/book`,
        action_label: 'Pick another time',
      });

      return send(res, 200, { ok: true, status: 'declined', guestNotified: Boolean(emailRes?.sent) });
    }

    return fail(res, 400, "action must be 'confirm' or 'decline'.");
  } catch (err) {
    console.error('bookings/[id] error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
