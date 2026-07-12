// POST /api/upload (admin) — proxy image uploads to imgbb so the API key stays server-side.
// Body: { image: <base64 or data URL>, name?: string }

import { send, fail, requireAdmin, getBody } from './_lib/util.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed.');
  if (!requireAdmin(req, res)) return;

  const key = process.env.IMGBB_API_KEY;
  if (!key) return fail(res, 500, 'IMGBB_API_KEY is not configured.');

  try {
    const body = getBody(req);
    let image = String(body.image || '');
    if (!image) return fail(res, 400, 'Missing image data.');
    // Strip data-URL prefix if present; imgbb wants raw base64.
    const comma = image.indexOf(',');
    if (image.startsWith('data:') && comma !== -1) image = image.slice(comma + 1);

    const form = new URLSearchParams();
    form.set('image', image);
    if (body.name) form.set('name', String(body.name).slice(0, 100));

    const r = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data?.success) {
      return fail(res, 502, data?.error?.message || 'imgbb upload failed.');
    }

    return send(res, 200, {
      ok: true,
      url: data.data.url,
      displayUrl: data.data.display_url,
      thumb: data.data.thumb?.url || data.data.url,
      deleteUrl: data.data.delete_url,
      width: data.data.width,
      height: data.data.height,
    });
  } catch (err) {
    console.error('upload error:', err);
    return fail(res, 500, err.message || 'Internal error');
  }
}
