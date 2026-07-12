// GET /api/availability?start=ISO&end=ISO
// Returns merged busy intervals across ALL configured calendars — start/end only,
// never event titles or details — plus the booking window config.

import { freeBusy, configuredCalendarIds } from './_lib/google.js';
import { send, fail, mergeIntervals, bookingConfig } from './_lib/util.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return fail(res, 405, 'Method not allowed.');

  try {
    const config = bookingConfig();
    const now = Date.now();
    const maxEnd = now + config.maxDaysAhead * 24 * 3600 * 1000;

    let start = req.query?.start ? new Date(req.query.start).getTime() : now;
    let end = req.query?.end ? new Date(req.query.end).getTime() : now + 14 * 24 * 3600 * 1000;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return fail(res, 400, 'Invalid start/end.');

    start = Math.max(start, now - 24 * 3600 * 1000);
    end = Math.min(end, maxEnd + 24 * 3600 * 1000);
    if (end <= start) return fail(res, 400, 'end must be after start.');
    if (end - start > 45 * 24 * 3600 * 1000) end = start + 45 * 24 * 3600 * 1000;

    const calendarIds = configuredCalendarIds();
    if (!calendarIds.length) return fail(res, 500, 'GOOGLE_CALENDAR_IDS is not configured.');

    const { busy, errors } = await freeBusy(new Date(start).toISOString(), new Date(end).toISOString(), calendarIds);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return send(res, 200, {
      ok: true,
      busy: mergeIntervals(busy),
      config,
      // Which calendars could not be read (not shared with the service account yet).
      calendarErrors: Object.keys(errors).length ? errors : undefined,
    });
  } catch (err) {
    console.error('availability error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
