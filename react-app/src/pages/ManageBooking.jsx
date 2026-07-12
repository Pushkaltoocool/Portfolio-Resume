import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../sections/Navbar.jsx';
import { api } from '../lib/api.js';

const fmtWhen = (iso, tz = 'Asia/Singapore') =>
  new Intl.DateTimeFormat('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: tz,
  }).format(new Date(iso));

// Owner-facing page reached from the notification email. The token in the URL
// authorizes confirm/decline for this one request — buttons POST the action, so
// merely opening the link never changes anything.
const ManageBooking = () => {
  const [params] = useSearchParams();
  const id = params.get('id');
  const token = params.get('token');
  const intent = params.get('intent'); // 'confirm' | 'decline' | null — just pre-highlights

  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [done, setDone] = useState(null); // { status, htmlLink }
  const [note, setNote] = useState('');

  const load = useCallback(() => {
    if (!id || !token) {
      setError('This link is missing its id or token.');
      return;
    }
    api(`/api/bookings/${id}?token=${encodeURIComponent(token)}`)
      .then((d) => setBooking(d.booking))
      .catch((e) => setError(e.status === 401 ? 'This link is invalid or has expired.' : e.message));
  }, [id, token]);

  useEffect(() => {
    document.title = 'Respond to booking — Pushkal Vashist';
    load();
  }, [load]);

  const act = async (action) => {
    setBusy(action);
    setError('');
    try {
      const res = await api(`/api/bookings/${id}`, {
        method: 'POST',
        body: { action, token, message: action === 'decline' ? note : undefined },
      });
      setDone({ status: res.status, htmlLink: res.htmlLink });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto relative c-space pt-32 pb-20 min-h-screen">
        <p className="font-mono text-sm text-blue-300/80">~/pushkal/booking</p>
        <h1 className="mt-3 text-4xl font-black text-white tracking-tight">Respond to request</h1>

        {error && (
          <div className="mt-10 terminal-note" role="alert">
            <p className="text-red-400">$ {error}</p>
            <Link to="/blog/admin" className="mt-3 inline-block text-blue-300 hover:text-blue-200">
              Open the admin dashboard instead →
            </Link>
          </div>
        )}

        {!booking && !error && <div className="mt-10 h-40 rounded-2xl bg-black-200 animate-pulse" aria-hidden />}

        {booking && !done && (
          <div className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-black-200/60 p-6">
              <p className="text-white text-xl font-semibold">{booking.name}</p>
              <a href={`mailto:${booking.email}`} className="text-blue-300/80 hover:text-blue-200 text-sm">
                {booking.email}
              </a>
              <div className="mt-4 space-y-1 font-mono text-sm text-white-600">
                <p>
                  <span className="text-white-500">when:</span> {fmtWhen(booking.start, booking.timezone)} (
                  {booking.timezone})
                </p>
                <p>
                  <span className="text-white-500">length:</span> {booking.durationMinutes} min
                </p>
                {booking.topic && (
                  <p>
                    <span className="text-white-500">topic:</span> {booking.topic}
                  </p>
                )}
                {booking.overlapsBusy && <p className="text-amber-300">⚠️ overlaps an existing calendar event</p>}
              </div>
              {booking.notes && <p className="mt-3 text-white-600 whitespace-pre-wrap">{booking.notes}</p>}
            </div>

            {booking.status !== 'pending' ? (
              <p className="mt-6 font-mono text-sm text-amber-300">
                This request is already {booking.status}. Nothing more to do.
              </p>
            ) : (
              <>
                <label className="mt-6 block text-sm text-white-600">
                  Optional note to the guest (used if you decline)
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. that slot no longer works — try Thursday?"
                    className="mt-2 w-full rounded-lg bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-blue-400/50 resize-none"
                  />
                </label>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => act('confirm')}
                    disabled={Boolean(busy)}
                    className={`rounded-xl bg-green-500/90 hover:bg-green-500 text-black font-bold px-6 py-3 transition-colors disabled:opacity-50 ${
                      intent === 'confirm' ? 'ring-2 ring-green-400/60' : ''
                    }`}>
                    {busy === 'confirm' ? 'Confirming…' : 'Confirm & send invite'}
                  </button>
                  <button
                    onClick={() => act('decline')}
                    disabled={Boolean(busy)}
                    className={`rounded-xl border border-white/15 text-white-700 hover:text-white hover:border-white/30 font-semibold px-6 py-3 transition-colors disabled:opacity-50 ${
                      intent === 'decline' ? 'ring-2 ring-red-400/50' : ''
                    }`}>
                    {busy === 'decline' ? 'Declining…' : 'Decline'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {done && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-black-200/60 p-6" data-aos="fade-up">
            {done.status === 'confirmed' ? (
              <>
                <p className="text-green-400 text-xl font-semibold">✓ Confirmed — invite sent</p>
                <p className="mt-2 text-white-600">The guest just got a Google Calendar invite and it's on your calendar.</p>
                {done.htmlLink && (
                  <a
                    href={done.htmlLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-blue-300 hover:text-blue-200">
                    Open the event →
                  </a>
                )}
              </>
            ) : (
              <>
                <p className="text-amber-300 text-xl font-semibold">Declined</p>
                <p className="mt-2 text-white-600">The guest has been emailed. No calendar event was created.</p>
              </>
            )}
            <div className="mt-5">
              <Link to="/blog/admin" className="text-white-500 hover:text-white transition-colors">
                Go to admin dashboard →
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ManageBooking;
