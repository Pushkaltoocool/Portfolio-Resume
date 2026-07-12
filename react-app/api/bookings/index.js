// GET /api/bookings (admin) — list booking requests, newest first.
// Optional ?status=pending|confirmed|declined to filter.

import { db, BOOKINGS } from '../_lib/firestore.js';
import { send, fail, requireAdmin } from '../_lib/util.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return fail(res, 405, 'Method not allowed.');
  if (!requireAdmin(req, res)) return;

  try {
    const snap = await db().collection(BOOKINGS).get();
    let bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const status = req.query?.status;
    if (status) bookings = bookings.filter((b) => b.status === status);

    // Pending first, then by soonest meeting time.
    const rank = { pending: 0, confirmed: 1, declined: 2 };
    bookings.sort((a, b) => {
      const r = (rank[a.status] ?? 3) - (rank[b.status] ?? 3);
      return r !== 0 ? r : String(a.start).localeCompare(String(b.start));
    });

    res.setHeader('Cache-Control', 'no-store');
    return send(res, 200, { ok: true, bookings });
  } catch (err) {
    console.error('bookings/index error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
