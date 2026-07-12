// Shared helpers for Vercel serverless functions.

export function send(res, status, data) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(data);
}

export function fail(res, status, message, extra = {}) {
  send(res, status, { ok: false, error: message, ...extra });
}

export function isAdmin(req) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  return Boolean(token) && token === secret;
}

export function requireAdmin(req, res) {
  if (!process.env.ADMIN_SECRET) {
    fail(res, 500, 'ADMIN_SECRET is not configured on the server.');
    return false;
  }
  if (!isAdmin(req)) {
    fail(res, 401, 'Unauthorized — invalid admin passcode.');
    return false;
  }
  return true;
}

// Vercel parses JSON bodies into req.body; be tolerant of raw strings (local dev shim).
export function getBody(req) {
  if (req.body == null) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'post';
}

export function readingTimeMinutes(html) {
  const text = String(html || '').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Merge overlapping/adjacent [{start,end}] ISO intervals into a minimal sorted set.
export function mergeIntervals(intervals) {
  const sorted = intervals
    .map((b) => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }))
    .filter((b) => Number.isFinite(b.start) && Number.isFinite(b.end) && b.end > b.start)
    .sort((a, b) => a.start - b.start);

  const merged = [];
  for (const cur of sorted) {
    const last = merged[merged.length - 1];
    if (last && cur.start <= last.end) {
      last.end = Math.max(last.end, cur.end);
    } else {
      merged.push({ ...cur });
    }
  }
  return merged.map((b) => ({
    start: new Date(b.start).toISOString(),
    end: new Date(b.end).toISOString(),
  }));
}

// Hour-of-day (with minutes as fraction) of a UTC instant in a given IANA timezone.
export function hourInTimezone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return hour + minute / 60;
}

export function bookingConfig() {
  return {
    timezone: process.env.BOOKING_TIMEZONE || 'Asia/Singapore',
    startHour: Number(process.env.BOOKING_START_HOUR ?? 9),
    endHour: Number(process.env.BOOKING_END_HOUR ?? 21),
    minNoticeHours: Number(process.env.BOOKING_MIN_NOTICE_HOURS ?? 2),
    maxDaysAhead: Number(process.env.BOOKING_MAX_DAYS_AHEAD ?? 60),
    slotMinutes: 30,
    durations: [15, 30, 45, 60],
  };
}
