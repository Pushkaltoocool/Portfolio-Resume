// Minimal local emulator for the Vercel serverless functions in /api.
// `npm run dev` starts this next to Vite; Vite proxies /api → here.

import 'dotenv/config';
import http from 'node:http';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const PORT = Number(process.env.API_DEV_PORT || 8787);
const API_DIR = path.resolve(process.cwd(), 'api');

const ROUTES = [
  { pattern: /^\/api\/posts\/?$/, file: 'posts/index.js' },
  { pattern: /^\/api\/posts\/([^/]+)\/?$/, file: 'posts/[slug].js', param: 'slug' },
  { pattern: /^\/api\/upload\/?$/, file: 'upload.js' },
  { pattern: /^\/api\/availability\/?$/, file: 'availability.js' },
  { pattern: /^\/api\/book\/?$/, file: 'book.js' },
  { pattern: /^\/api\/calendars\/?$/, file: 'calendars.js' },
  { pattern: /^\/api\/bookings\/?$/, file: 'bookings/index.js' },
  { pattern: /^\/api\/bookings\/([^/]+)\/?$/, file: 'bookings/[id].js', param: 'id' },
  { pattern: /^\/api\/oauth\/start\/?$/, file: 'oauth/start.js' },
  { pattern: /^\/api\/oauth\/callback\/?$/, file: 'oauth/callback.js' },
  { pattern: /^\/api\/oauth\/status\/?$/, file: 'oauth/status.js' },
];

function enhance(req, res, params, query, body) {
  req.query = { ...query, ...params };
  req.body = body;
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(obj));
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const route = ROUTES.map((r) => ({ r, m: url.pathname.match(r.pattern) })).find((x) => x.m);

  if (!route) {
    res.statusCode = 404;
    res.end(JSON.stringify({ ok: false, error: `No API route for ${url.pathname}` }));
    return;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let body = Buffer.concat(chunks).toString('utf8') || undefined;
  if (body && (req.headers['content-type'] || '').includes('application/json')) {
    try {
      body = JSON.parse(body);
    } catch {
      /* leave as string */
    }
  }

  const params = route.r.param ? { [route.r.param]: decodeURIComponent(route.m[1]) } : {};
  enhance(req, res, params, Object.fromEntries(url.searchParams), body);

  try {
    const mod = await import(pathToFileURL(path.join(API_DIR, route.r.file)).href);
    await mod.default(req, res);
  } catch (err) {
    console.error(`[dev-api] ${req.method} ${url.pathname} crashed:`, err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
  }
});

server.listen(PORT, () => {
  console.log(`[dev-api] serving /api on http://localhost:${PORT}`);
});
