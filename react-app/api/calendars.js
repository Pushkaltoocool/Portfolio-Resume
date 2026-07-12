// GET /api/calendars (admin) — setup diagnostics: which configured calendars the
// service account can actually read. Use this to verify calendar sharing.

import { freeBusy, configuredCalendarIds, loadServiceAccount } from './_lib/google.js';
import { send, fail, requireAdmin } from './_lib/util.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return fail(res, 405, 'Method not allowed.');
  if (!requireAdmin(req, res)) return;

  try {
    const creds = loadServiceAccount();
    const ids = configuredCalendarIds();
    if (!ids.length) {
      return send(res, 200, {
        ok: true,
        serviceAccount: creds.client_email,
        calendars: [],
        hint: 'Set GOOGLE_CALENDAR_IDS to a comma-separated list of calendar IDs.',
      });
    }

    const now = new Date();
    const { errors } = await freeBusy(now.toISOString(), new Date(now.getTime() + 3600e3).toISOString(), ids);

    return send(res, 200, {
      ok: true,
      serviceAccount: creds.client_email,
      calendars: ids.map((id) => ({
        id,
        accessible: !errors[id],
        error: errors[id] || undefined,
      })),
      hint: Object.keys(errors).length
        ? `Share the listed calendars with ${creds.client_email} (Google Calendar → Settings → Share with specific people). The booking calendar needs "Make changes to events"; others need at least "See free/busy".`
        : 'All configured calendars are accessible.',
    });
  } catch (err) {
    console.error('calendars error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
