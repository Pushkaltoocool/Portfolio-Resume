// POST /api/oauth/start (admin) — returns the Google consent URL to connect the
// owner's calendar. The dashboard redirects the browser to it.

import { send, fail, requireAdmin } from '../_lib/util.js';
import { oauthConfigured, beginAuth } from '../_lib/oauth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed.');
  if (!requireAdmin(req, res)) return;
  if (!oauthConfigured()) {
    return fail(res, 500, 'OAuth is not configured: set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET.');
  }
  try {
    const url = await beginAuth(req);
    return send(res, 200, { ok: true, url });
  } catch (err) {
    console.error('oauth/start error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
