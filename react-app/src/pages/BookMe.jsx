import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../sections/Navbar.jsx';
import Footer from '../sections/Footer.jsx';
import BookingCalendar from '../components/BookingCalendar.jsx';
import { api } from '../lib/api.js';
import { addDays, buildDaySlots, formatFullDate, formatTime, localTimezoneName, tzAbbrev } from '../lib/time.js';

const DURATIONS = [15, 30, 45, 60];
const STEPS = [
  { n: 1, label: 'When' },
  { n: 2, label: 'Details' },
  { n: 3, label: 'Done' },
];

const BookMe = () => {
  const [data, setData] = useState(null); // { busy, config }
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(30);
  const [selectedDayInstant, setSelectedDayInstant] = useState(() => new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tzMode, setTzMode] = useState('owner'); // 'owner' | 'local'

  const [form, setForm] = useState({ name: '', email: '', topic: '', notes: '', website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState('');

  const localTz = localTimezoneName();

  const loadAvailability = useCallback(() => {
    setError('');
    setData(null);
    const start = new Date();
    const end = addDays(start, 45);
    api(`/api/availability?start=${start.toISOString()}&end=${end.toISOString()}`)
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    document.title = 'Book a call — Pushkal Vashist';
    loadAvailability();
  }, [loadAvailability]);

  const ownerTz = data?.config?.timezone || 'Asia/Singapore';
  const displayTz = tzMode === 'owner' ? ownerTz : localTz;
  const selectedDay = selectedDayInstant;

  const daySlots = useMemo(() => {
    if (!data || !selectedDay) return [];
    return buildDaySlots({
      dayInstant: selectedDay,
      config: { ...data.config, timezone: ownerTz },
      busy: data.busy || [],
      durationMinutes: duration,
    });
  }, [data, selectedDay, duration, ownerTz]);

  const shownSlots = useMemo(() => daySlots.filter((s) => s.available || s.reason === 'busy'), [daySlots]);
  const hasBusyShown = shownSlots.some((s) => !s.available);
  const selectedBusy = Boolean(selectedSlot && !selectedSlot.available);

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);
    setFormError('');
    try {
      const res = await api('/api/book', {
        method: 'POST',
        body: {
          start: selectedSlot.start.toISOString(),
          durationMinutes: duration,
          name: form.name,
          email: form.email,
          topic: form.topic,
          notes: form.notes,
          website: form.website,
        },
      });
      setResult(res);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const goToStep = (n) => {
    if (n === 2 && !selectedSlot) return;
    if (n <= 2 && result) return; // can't go back after submitting
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto relative c-space pt-32 pb-20 min-h-screen">
        <header data-aos="fade-up">
          <p className="font-mono text-sm text-blue-300/80">~/pushkal/schedule</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight text-balance">Book a call</h1>
          <p className="mt-4 text-white-600 leading-relaxed max-w-xl">
            Every booking is a request I confirm — you'll get a <span className="text-white-800">Google Calendar
            invite</span> by email the moment I do. Only my free/busy is shown, never what I'm actually doing.
          </p>
        </header>

        {/* Stepper */}
        <nav className="mt-8" aria-label="Booking progress">
          <ol className="wizard-steps">
            {STEPS.map((s, i) => {
              const state = step === s.n ? 'active' : step > s.n ? 'done' : 'todo';
              const clickable = state === 'done' && !result;
              return (
                <li key={s.n} className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => clickable && goToStep(s.n)}
                    disabled={!clickable}
                    aria-current={state === 'active' ? 'step' : undefined}
                    className={`wizard-step wizard-step-${state}`}>
                    <span className="wizard-step-dot">{state === 'done' ? '✓' : s.n}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span className={`wizard-connector ${step > s.n ? 'wizard-connector-done' : ''}`} />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {error && (
          <div className="mt-8 terminal-note" role="alert">
            <p className="text-red-400">$ couldn't load availability: {error}</p>
            <button onClick={loadAvailability} className="mt-3 text-blue-300 hover:text-blue-200">
              retry →
            </button>
          </div>
        )}

        {data?.calendarErrors && step === 1 && (
          <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
            Some calendars aren't shared with the booking service yet, so their busy times may be missing.
          </div>
        )}

        {/* ── Step 1: pick a time ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="wizard-panel mt-8 booking-panel" key="step-when">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" role="group" aria-label="Meeting length">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDuration(d);
                      setSelectedSlot(null);
                    }}
                    className={`duration-pill ${duration === d ? 'duration-pill-active' : ''}`}>
                    {d} min
                  </button>
                ))}
              </div>
              <button
                onClick={() => setTzMode((m) => (m === 'owner' ? 'local' : 'owner'))}
                className="font-mono text-xs text-white-500 hover:text-white transition-colors"
                title="Switch timezone display">
                <i className="fa-regular fa-clock mr-1.5" />
                {tzMode === 'owner' ? `SGT · ${tzAbbrev(new Date(), ownerTz)}` : `your time · ${localTz}`}
              </button>
            </div>

            {/* Calendar + slots */}
            <div className="mt-8 grid md:grid-cols-[minmax(0,320px)_1fr] gap-6 md:gap-8">
              <div className="md:border-r md:border-white/10 md:pr-8">
                <BookingCalendar
                  ownerTz={ownerTz}
                  config={data?.config}
                  busy={data?.busy}
                  duration={duration}
                  value={selectedDay}
                  onSelect={(inst) => {
                    setSelectedDayInstant(inst);
                    setSelectedSlot(null);
                  }}
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <p className="text-white-800 font-medium text-sm">
                    {formatFullDate(selectedDay, ownerTz)}
                    <span className="text-white-500 font-normal">
                      {' '}· {tzMode === 'owner' ? 'SGT' : 'your time'}
                    </span>
                  </p>
                  {data && hasBusyShown && (
                    <div className="slot-legend" aria-hidden>
                      <span>
                        <span className="slot-legend-dot bg-white/30" />free
                      </span>
                      <span>
                        <span className="slot-legend-dot bg-amber-400/70" />busy
                      </span>
                    </div>
                  )}
                </div>

                {!data && (
                  <div className="slot-grid" aria-hidden>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="h-12 rounded-lg bg-black-200 animate-pulse" />
                    ))}
                  </div>
                )}

                {data && shownSlots.length === 0 && (
                  <div className="terminal-note">
                    <p className="text-white-500">$ nothing bookable this day — try another date or duration.</p>
                  </div>
                )}

                {data && shownSlots.length > 0 && (
                  <div className="slot-grid">
                    {shownSlots.map((slot) => {
                      const active = selectedSlot && slot.start.getTime() === selectedSlot.start.getTime();
                      const busy = !slot.available;
                      return (
                        <button
                          key={slot.start.toISOString()}
                          onClick={() => setSelectedSlot(slot)}
                          aria-label={
                            busy
                              ? `${formatTime(slot.start, displayTz)} — I'm busy then, requestable but not guaranteed`
                              : formatTime(slot.start, displayTz)
                          }
                          title={busy ? "I'm busy then — you can still request it, but I may not accept." : undefined}
                          className={
                            busy
                              ? `slot-btn slot-btn-busy ${active ? 'slot-btn-busy-active' : ''}`
                              : `slot-btn ${active ? 'slot-btn-active' : ''}`
                          }>
                          {formatTime(slot.start, displayTz)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Continue */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-sm text-white-500 font-mono min-w-0 truncate">
                {selectedSlot ? (
                  <>
                    <span className="text-white-700">{formatTime(selectedSlot.start, displayTz)}</span>
                    <span className="hidden sm:inline"> · {duration} min</span>
                  </>
                ) : (
                  'select a time →'
                )}
              </p>
              <button
                onClick={() => goToStep(2)}
                disabled={!selectedSlot}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-6 py-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: your details ────────────────────────────────────────── */}
        {step === 2 && selectedSlot && (
          <form className="wizard-panel mt-8 booking-form-panel" onSubmit={submitBooking} key="step-details">
            <div
              className={`flex items-start justify-between gap-4 rounded-xl border p-4 ${
                selectedBusy ? 'border-amber-400/30 bg-amber-500/5' : 'border-blue-400/20 bg-blue-500/5'
              }`}>
              <div>
                <p className={`text-xs font-mono ${selectedBusy ? 'text-amber-300/90' : 'text-blue-300/80'}`}>
                  {selectedBusy ? 'selected · busy time' : 'selected'}
                </p>
                <p className="mt-1 text-white font-semibold">{formatFullDate(selectedSlot.start, displayTz)}</p>
                <p className="text-white-700">
                  {formatTime(selectedSlot.start, displayTz)} – {formatTime(selectedSlot.end, displayTz)}
                  <span className="text-white-500 text-sm"> · {duration} min</span>
                </p>
                {tzMode === 'owner' && (
                  <p className="mt-1 text-xs text-white-500">
                    {formatTime(selectedSlot.start, localTz)} your time ({localTz})
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="font-mono text-xs text-white-500 hover:text-white transition-colors shrink-0">
                change
              </button>
            </div>

            {selectedBusy && (
              <div
                className="mt-4 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100/90"
                role="alert">
                <i className="fa-solid fa-triangle-exclamation mt-0.5 text-amber-300" aria-hidden />
                <p>
                  I'm <span className="font-semibold">already busy</span> at this time, so I may not be able to accept
                  it. You can still send the request — I'll confirm by email or suggest a nearby time that works.
                </p>
              </div>
            )}

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Field id="bk-name" label="Your name" required value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Jane Doe" autoComplete="name" />
              <Field id="bk-email" label="Email" type="email" required value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="jane@company.com" autoComplete="email" />
            </div>
            <div className="mt-4">
              <Field id="bk-topic" label="What's it about?" value={form.topic} onChange={(v) => setForm((f) => ({ ...f, topic: v }))} placeholder="AI project, internship, collab…" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="bk-notes" className="text-sm text-white-600">
                Notes <span className="text-white-500">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="rounded-lg bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-blue-400/50 resize-none"
                placeholder="Anything I should know beforehand?"
              />
            </div>
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            {formError && (
              <p className="mt-4 text-sm text-red-400" role="alert">
                {formError}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="font-mono text-sm text-white-500 hover:text-white transition-colors">
                ← back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`rounded-xl text-white font-bold px-6 py-3 transition-all disabled:opacity-50 ${
                  selectedBusy
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                }`}>
                {submitting ? 'Sending request…' : selectedBusy ? 'Request anyway' : 'Send request'}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-white-500">
              I'll review your request and send a Google Calendar invite once I confirm.
            </p>
          </form>
        )}

        {/* ── Step 3: sent ────────────────────────────────────────────────── */}
        {step === 3 && result && (
          <div key="step-done" className="wizard-panel">
            <Confirmation result={result} slot={selectedSlot} duration={duration} displayTz={displayTz} />
          </div>
        )}
      </main>
      <div className="max-w-7xl mx-auto">
        <Footer />
      </div>
    </>
  );
};

const Field = ({ id, label, required, type = 'text', value, onChange, placeholder, autoComplete }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm text-white-600">
      {label} {required && <span className="text-blue-400">*</span>}
    </label>
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="rounded-lg bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-blue-400/50 placeholder:text-white-500/60"
    />
  </div>
);

const Confirmation = ({ result, slot, duration, displayTz }) => (
  <div className="mt-10 max-w-xl mx-auto text-center">
    <div className="mx-auto w-16 h-16 rounded-full grid place-items-center text-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400">
      <i className="fa-solid fa-paper-plane" />
    </div>
    <h2 className="mt-6 text-3xl font-bold text-white">Request sent ⏳</h2>
    <p className="mt-3 text-white-600">
      {slot && (
        <>
          {formatFullDate(slot.start, displayTz)} at {formatTime(slot.start, displayTz)} ({duration} min).
        </>
      )}
    </p>

    <div className="mt-6 rounded-xl border border-white/10 bg-black-200/60 p-5 text-left font-mono text-sm text-white-600">
      <p>
        <span className="text-white-500">status:</span>{' '}
        <span className="text-amber-300">pending — waiting for Pushkal to confirm</span>
      </p>
      <p className="mt-1">
        <span className="text-white-500">invite:</span>{' '}
        <span className="text-white-600">a Google Calendar invite lands in your inbox the moment it's confirmed</span>
      </p>
      {result.overlapsBusy && (
        <p className="mt-1">
          <span className="text-white-500">note:</span>{' '}
          <span className="text-amber-300">this time overlaps an existing commitment, so it's less likely</span>
        </p>
      )}
    </div>

    <p className="mt-6 text-sm text-white-500">
      No calendar hold is placed until I confirm. If I can't make it, I'll email you to suggest another time.
    </p>

    <div className="mt-8">
      <Link to="/" className="text-white-500 hover:text-white transition-colors">
        Back to home →
      </Link>
    </div>
  </div>
);

export default BookMe;
