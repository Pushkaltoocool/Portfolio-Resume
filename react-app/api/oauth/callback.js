// GET /api/oauth/callback?code=&state= — Google redirects here after consent.
// Verifies the one-time state nonce, exchanges the code for a refresh token,
// stores it, then bounces the browser back to the admin dashboard.

import { verifyNonce, exchangeAndStore } from '../_lib/oauth.js';

function redirect(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}

function errorPage(res, message) {
  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(
    `<!doctype html><meta charset="utf-8"><title>Connection failed</title>` +
      `<body style="font-family:system-ui;background:#010103;color:#e5e7eb;display:grid;place-items:center;height:100vh;margin:0">` +
      `<div style="max-width:32rem;padding:2rem;text-align:center">` +
      `<h1 style="color:#f87171">Couldn't connect Google Calendar</h1>` +
      `<p style="color:#9ca3af">${String(message).replace(/[<>&]/g, '')}</p>` +
      `<p><a href="/blog/admin" style="color:#93c5fd">← Back to admin</a></p></div></body>`,
  );
}

export default async function handler(req, res) {
  const { code, state, error } = req.query || {};
  if (error) return errorPage(res, `Google returned: ${error}`);
  if (!code) return errorPage(res, 'Missing authorization code.');

  try {
    if (!(await verifyNonce(state))) {
      return errorPage(res, 'Invalid or expired request. Start the connection again from the admin dashboard.');
    }
    await exchangeAndStore(req, code);
    return redirect(res, '/blog/admin?connected=1');
  } catch (err) {
    console.error('oauth/callback error:', err);
    return errorPage(res, err.message || 'Token exchange failed.');
  }
}
