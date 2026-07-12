// GET /api/oauth/status (admin) — is the owner's Google Calendar connected?
// DELETE /api/oauth/status (admin) — disconnect (forget the refresh token).

import { send, fail, requireAdmin } from '../_lib/util.js';
import { oauthConfigured, isConnected, disconnect } from '../_lib/oauth.js';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    if (req.method === 'GET') {
      return send(res, 200, {
        ok: true,
        configured: oauthConfigured(),
        connected: oauthConfigured() ? await isConnected() : false,
      });
    }
    if (req.method === 'DELETE') {
      await disconnect();
      return send(res, 200, { ok: true, connected: false });
    }
    return fail(res, 405, 'Method not allowed.');
  } catch (err) {
    console.error('oauth/status error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
