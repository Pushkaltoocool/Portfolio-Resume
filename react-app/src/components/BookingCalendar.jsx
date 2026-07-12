import { useMemo, useState } from 'react';
import { buildDaySlots, ymdInTimezone, zonedWallTimeToUtc, addDays } from '../lib/time.js';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const keyOf = (y, m, d) => y * 10000 + m * 100 + d;

// Month-grid date picker for the booking flow. Bookable range is today →
// +44 days (inside the availability window we fetch). A green dot marks days
// that still have free slots for the chosen duration.
export default function BookingCalendar({ ownerTz, config, busy, duration, value, onSelect }) {
  const today = ymdInTimezone(new Date(), ownerTz);
  const max = ymdInTimezone(addDays(new Date(), 44), ownerTz);
  const todayKey = keyOf(today.year, today.month, today.day);
  const minKey = todayKey;
  const maxKey = keyOf(max.year, max.month, max.day);

  const sel = value ? ymdInTimezone(value, ownerTz) : null;
  const selKey = sel ? keyOf(sel.year, sel.month, sel.day) : null;

  const [view, setView] = useState({ year: today.year, month: today.month });
  const viewNum = view.year * 100 + view.month;
  const minMonth = today.year * 100 + today.month;
  const maxMonth = max.year * 100 + max.month;

  const cells = useMemo(() => {
    const { year: y, month: m } = view;
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const firstWeekday = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
    const out = [];
    for (let i = 0; i < firstWeekday; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const k = keyOf(y, m, d);
      const inRange = k >= minKey && k <= maxKey;
      let freeCount = 0;
      if (inRange && config && busy) {
        const dayInstant = zonedWallTimeToUtc(y, m, d, 12, 0, ownerTz);
        freeCount = buildDaySlots({
          dayInstant,
          config: { ...config, timezone: ownerTz },
          busy,
          durationMinutes: duration,
        }).filter((s) => s.available).length;
      }
      out.push({ d, k, inRange, freeCount });
    }
    return out;
  }, [view, config, busy, duration, ownerTz, minKey, maxKey]);

  const step = (delta) => {
    setView((v) => {
      const total = v.year * 12 + (v.month - 1) + delta;
      return { year: Math.floor(total / 12), month: (total % 12) + 1 };
    });
  };

  const pick = (d) => onSelect(zonedWallTimeToUtc(view.year, view.month, d, 12, 0, ownerTz));

  return (
    <div className="w-full sm:max-w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-white">
          {MONTHS[view.month - 1]} {view.year}
        </span>
        <div className="flex gap-1.5">
          <button onClick={() => step(-1)} disabled={viewNum <= minMonth} className="day-nav-btn" aria-label="Previous month">
            ‹
          </button>
          <button onClick={() => step(1)} disabled={viewNum >= maxMonth} className="day-nav-btn" aria-label="Next month">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-center text-[10px] font-mono uppercase text-white-500 py-1">
            {w}
          </span>
        ))}
        {cells.map((cell, i) =>
          cell === null ? (
            <span key={`blank-${i}`} aria-hidden />
          ) : (
            <button
              key={cell.k}
              type="button"
              disabled={!cell.inRange}
              onClick={() => pick(cell.d)}
              aria-current={cell.k === selKey ? 'date' : undefined}
              aria-label={`${MONTHS[view.month - 1]} ${cell.d}${cell.freeCount ? `, ${cell.freeCount} slots` : ''}`}
              className={[
                'relative flex flex-col items-center justify-center gap-1 rounded-lg py-2 text-sm transition-colors',
                !cell.inRange
                  ? 'text-white-500/25 cursor-not-allowed'
                  : cell.k === selKey
                    ? 'bg-blue-500/20 border border-blue-400/70 text-white'
                    : 'border border-transparent text-white-700 hover:bg-white/5 hover:text-white',
                cell.k === todayKey && cell.k !== selKey ? 'ring-1 ring-white/15' : '',
              ].join(' ')}>
              <span>{cell.d}</span>
              <span
                className={`h-1 w-1 rounded-full ${
                  cell.inRange && cell.freeCount > 0 ? 'bg-green-400' : 'bg-transparent'
                }`}
              />
            </button>
          ),
        )}
      </div>
    </div>
  );
}
