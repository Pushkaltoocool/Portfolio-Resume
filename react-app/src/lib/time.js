// Timezone-aware slot math for the booking page. No external deps.

// Offset (ms) of a given instant in an IANA timezone (UTC = wall + offset... we
// return wallAsUTC - instant, i.e. add to a UTC guess to correct it).
function tzOffsetMs(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  const asUTC = Date.UTC(map.year, map.month - 1, map.day, map.hour === '24' ? 0 : map.hour, map.minute, map.second);
  return asUTC - date.getTime();
}

// Convert a wall-clock time in `timeZone` to the correct UTC Date. month is 1-based.
export function zonedWallTimeToUtc(year, month, day, hour, minute, timeZone) {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset = tzOffsetMs(new Date(guess), timeZone);
  return new Date(guess - offset);
}

// The Y/M/D of an instant as seen in a timezone (for iterating days safely).
export function ymdInTimezone(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const map = {};
  for (const p of parts) map[p.type] = p.value;
  return { year: Number(map.year), month: Number(map.month), day: Number(map.day) };
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function formatTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatDayLabel(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
  }).format(date);
}

export function formatDayNumber(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', { timeZone, day: 'numeric' }).format(date);
}

export function formatMonth(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', { timeZone, month: 'short' }).format(date);
}

export function formatFullDate(date, timeZone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function localTimezoneName() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'local';
  }
}

// Short timezone abbreviation (e.g. "GMT+8") for a timezone.
export function tzAbbrev(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
    hour: 'numeric',
  }).formatToParts(date);
  return parts.find((p) => p.type === 'timeZoneName')?.value || timeZone;
}

// Build all bookable slots for a single day (given as an owner-tz instant),
// honoring the owner's window, min-notice, and busy intervals.
export function buildDaySlots({ dayInstant, config, busy, durationMinutes, now = new Date() }) {
  const { timezone, startHour, endHour, slotMinutes, minNoticeHours } = config;
  const { year, month, day } = ymdInTimezone(dayInstant, timezone);
  const earliest = now.getTime() + minNoticeHours * 3600 * 1000;
  const busyRanges = busy.map((b) => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }));

  const slots = [];
  const stepCount = Math.floor(((endHour - startHour) * 60) / slotMinutes);
  for (let i = 0; i < stepCount; i++) {
    const minutesFromStart = i * slotMinutes;
    const hour = startHour + Math.floor(minutesFromStart / 60);
    const minute = minutesFromStart % 60;
    const start = zonedWallTimeToUtc(year, month, day, hour, minute, timezone);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    // Must finish within the bookable window (end hour, owner tz).
    const endWithinWindow = (hour * 60 + minute + durationMinutes) <= endHour * 60;
    const inFuture = start.getTime() >= earliest;
    const overlapsBusy = busyRanges.some((b) => start.getTime() < b.end && end.getTime() > b.start);

    slots.push({
      start,
      end,
      available: endWithinWindow && inFuture && !overlapsBusy,
      reason: !endWithinWindow ? 'window' : !inFuture ? 'past' : overlapsBusy ? 'busy' : 'ok',
    });
  }
  return slots;
}
