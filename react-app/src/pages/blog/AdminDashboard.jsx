import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../sections/Navbar.jsx';
import AdminGate from './AdminGate.jsx';
import { api, formatDate, clearAdminToken } from '../../lib/api.js';

const fmtWhen = (iso) =>
  new Intl.DateTimeFormat('en-SG', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Singapore',
  }).format(new Date(iso));

// ── Google Calendar connection ─────────────────────────────────────────────
const GoogleConnection = ({ status, onChange }) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const connect = async () => {
    setBusy(true);
    setError('');
    try {
      const { url } = await api('/api/oauth/start', { method: 'POST', admin: true });
      window.location.href = url; // → Google consent, returns to /blog/admin?connected=1
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  };

  const disconnect = async () => {
    if (!window.confirm('Disconnect Google Calendar? You will not be able to confirm bookings until you reconnect.'))
      return;
    setBusy(true);
    setError('');
    try {
      await api('/api/oauth/status', { method: 'DELETE', admin: true });
      onChange?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const connected = status?.connected;
  const configured = status?.configured;

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-black-200/60 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-semibold flex items-center gap-2">
            <i className="fa-brands fa-google text-white-600" /> Google Calendar invites
          </h2>
          <p className="text-sm text-white-500 mt-1">
            {connected
              ? 'Connected — confirming a request sends the guest a real Google invite.'
              : 'Connect once so confirmed bookings send guests a Google Calendar invite.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 font-mono text-xs ${connected ? 'text-green-400' : 'text-amber-300'}`}>
            <span className={`h-2 w-2 rounded-full ${connected ? 'bg-green-400' : 'bg-amber-400'}`} />
            {connected ? 'connected' : 'not connected'}
          </span>
          {connected ? (
            <button
              onClick={disconnect}
              disabled={busy}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white-700 hover:text-white hover:border-white/30 transition-colors disabled:opacity-40">
              Disconnect
            </button>
          ) : (
            <button
              onClick={connect}
              disabled={busy || !configured}
              className="rounded-lg bg-white text-black font-semibold px-5 py-2 hover:bg-white-800 transition-colors disabled:opacity-40">
              {busy ? 'Opening…' : connected === undefined ? 'Connect' : 'Connect Google'}
            </button>
          )}
        </div>
      </div>
      {!configured && status && (
        <p className="mt-3 font-mono text-xs text-amber-300/90">
          Set GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET and GOOGLE_OAUTH_REDIRECT_URI to enable this. See SETUP.md.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
};

// ── Booking requests ────────────────────────────────────────────────────────
const statusStyle = {
  pending: 'bg-amber-400',
  confirmed: 'bg-green-400',
  declined: 'bg-red-400/70',
};

const BookingRequests = ({ googleConnected }) => {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');

  const load = () => {
    api('/api/bookings', { admin: true })
      .then((d) => setBookings(d.bookings))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const act = async (b, action) => {
    let message;
    if (action === 'decline') {
      const input = window.prompt('Optional note to the guest (or leave blank):', '');
      if (input === null) return; // cancelled
      message = input;
    } else if (!googleConnected) {
      setError('Connect Google Calendar below before confirming — that is what sends the invite.');
      return;
    }
    setBusyId(b.id);
    setError('');
    try {
      await api(`/api/bookings/${b.id}`, { method: 'POST', admin: true, body: { action, message } });
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId('');
    }
  };

  const remove = async (b) => {
    if (!window.confirm('Delete this request record?')) return;
    setBusyId(b.id);
    try {
      await api(`/api/bookings/${b.id}`, { method: 'DELETE', admin: true });
      setBookings((prev) => prev.filter((x) => x.id !== b.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId('');
    }
  };

  const pendingCount = (bookings || []).filter((b) => b.status === 'pending').length;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Booking requests
          {pendingCount > 0 && (
            <span className="rounded-full bg-amber-500/20 text-amber-200 text-sm font-mono px-2.5 py-0.5">
              {pendingCount} pending
            </span>
          )}
        </h2>
        <button onClick={load} className="text-sm text-white-500 hover:text-white transition-colors">
          Refresh
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-400" role="alert">
          {error}
        </p>
      )}

      {!bookings && !error && (
        <div className="mt-6 space-y-4" aria-hidden>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-black-200/70 animate-pulse" />
          ))}
        </div>
      )}

      {bookings && bookings.length === 0 && (
        <div className="mt-6 terminal-note">
          <p className="text-white-500">$ no booking requests yet.</p>
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="mt-6 space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-white/10 bg-black-200/50 p-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${statusStyle[b.status] || 'bg-white/30'}`} />
                  <span className="text-white font-semibold truncate">{b.name}</span>
                  <a href={`mailto:${b.email}`} className="text-sm text-blue-300/80 hover:text-blue-200 truncate">
                    {b.email}
                  </a>
                  {b.overlapsBusy && (
                    <span className="rounded bg-amber-500/15 text-amber-200 text-[11px] font-mono px-1.5 py-0.5">
                      overlaps busy
                    </span>
                  )}
                </div>
                <p className="mt-2 font-mono text-sm text-white-600">
                  {fmtWhen(b.start)} · {b.durationMinutes} min · SGT
                </p>
                {b.location && <p className="mt-1 text-sm text-white-600">Location: {b.location}</p>}
                {b.topic && <p className="mt-1 text-sm text-white-600">Topic: {b.topic}</p>}
                {b.notes && <p className="mt-1 text-sm text-white-500 whitespace-pre-wrap">{b.notes}</p>}
                {b.status === 'confirmed' && (
                  <p className="mt-2 font-mono text-xs text-green-400">
                    ✓ confirmed — guest invited
                    {b.htmlLink && (
                      <>
                        {' · '}
                        <a href={b.htmlLink} target="_blank" rel="noreferrer" className="underline hover:text-green-300">
                          open event
                        </a>
                      </>
                    )}
                  </p>
                )}
                {b.status === 'declined' && <p className="mt-2 font-mono text-xs text-red-400/80">✗ declined</p>}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {b.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => act(b, 'confirm')}
                      disabled={busyId === b.id}
                      title={googleConnected ? '' : 'Connect Google Calendar first'}
                      className="rounded-lg bg-green-500/90 hover:bg-green-500 text-black font-semibold px-4 py-2 text-sm transition-colors disabled:opacity-40">
                      {busyId === b.id ? '…' : 'Confirm'}
                    </button>
                    <button
                      onClick={() => act(b, 'decline')}
                      disabled={busyId === b.id}
                      className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white-700 hover:text-white hover:border-white/30 transition-colors disabled:opacity-40">
                      Decline
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => remove(b)}
                    disabled={busyId === b.id}
                    className="text-sm text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ── Booking diagnostics (calendar read access) ──────────────────────────────
const Diagnostics = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const run = async () => {
    setOpen(true);
    setReport(null);
    setError('');
    try {
      setReport(await api('/api/calendars', { admin: true }));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black-200/60 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-semibold">Booking diagnostics</h2>
          <p className="text-sm text-white-500 mt-1">
            Checks that the service account can read your Google Calendars (free/busy).
          </p>
        </div>
        <button
          onClick={run}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white-700 hover:text-white hover:border-white/30 transition-colors">
          Run check
        </button>
      </div>
      {open && (
        <div className="mt-4 font-mono text-sm">
          {!report && !error && <p className="text-white-500 animate-pulse">$ checking calendars…</p>}
          {error && <p className="text-red-400">$ {error}</p>}
          {report && (
            <>
              <p className="text-white-500">
                service account: <span className="text-white-700">{report.serviceAccount}</span>
              </p>
              <ul className="mt-2 space-y-1">
                {report.calendars.map((c) => (
                  <li key={c.id}>
                    <span className={c.accessible ? 'text-green-400' : 'text-red-400'}>{c.accessible ? '✓' : '✗'}</span>{' '}
                    <span className="text-white-700">{c.id}</span>
                    {c.error && <span className="text-white-500"> — {c.error}</span>}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-white-500 whitespace-pre-wrap">{report.hint}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState('');
  const [oauth, setOauth] = useState(null);

  const load = () => {
    api('/api/posts?all=1', { admin: true })
      .then((d) => setPosts(d.posts))
      .catch((e) => setError(e.message));
  };

  const loadOauth = () => {
    api('/api/oauth/status', { admin: true })
      .then(setOauth)
      .catch(() => setOauth({ configured: false, connected: false }));
  };

  useEffect(() => {
    document.title = 'Admin — Dev Log';
    load();
    loadOauth();
    // Clean the ?connected=1 marker Google's redirect leaves behind.
    if (new URLSearchParams(window.location.search).get('connected') === '1') {
      window.history.replaceState({}, '', '/blog/admin');
    }
  }, []);

  const remove = async (post) => {
    if (!window.confirm(`Delete "${post.title}" permanently? This cannot be undone.`)) return;
    setDeleting(post.id);
    try {
      await api(`/api/posts/${post.id}`, { method: 'DELETE', admin: true });
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting('');
    }
  };

  return (
    <AdminGate>
      <Navbar />
      <main className="max-w-7xl mx-auto relative c-space pt-32 pb-20 min-h-screen">
        <header className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="font-mono text-sm text-blue-300/80">~/pushkal/dev-log --admin</p>
            <h1 className="mt-3 text-4xl font-black text-white tracking-tight">Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                clearAdminToken();
                window.location.reload();
              }}
              className="rounded-lg px-4 py-2.5 text-sm text-white-500 hover:text-white transition-colors">
              Lock
            </button>
            <Link
              to="/blog/admin/new"
              className="rounded-lg bg-white text-black font-semibold px-5 py-2.5 hover:bg-white-800 transition-colors">
              + New entry
            </Link>
          </div>
        </header>

        <BookingRequests googleConnected={Boolean(oauth?.connected)} />

        {/* Blog entries */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-white">Dev log entries</h2>

          {error && (
            <p className="mt-4 text-red-400" role="alert">
              {error}
            </p>
          )}

          {!posts && !error && (
            <div className="mt-6 space-y-4" aria-hidden>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-black-200/70 animate-pulse" />
              ))}
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="mt-6 terminal-note">
              <p className="text-white-500">$ no entries yet — write your first one.</p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 divide-y divide-white/10 overflow-hidden">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-5 bg-black-200/40 hover:bg-black-200 transition-colors">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${post.status === 'published' ? 'bg-green-400' : 'bg-amber-400'}`}
                    title={post.status}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium truncate">{post.title}</p>
                    <p className="font-mono text-xs text-white-500 mt-1">
                      {post.status} · updated {formatDate(post.updatedAt)} · {post.readingTime} min
                    </p>
                  </div>
                  {post.status === 'published' && (
                    <Link to={`/blog/${post.slug}`} className="text-sm text-white-500 hover:text-white transition-colors">
                      View
                    </Link>
                  )}
                  <Link
                    to={`/blog/admin/edit/${post.id}`}
                    className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white-700 hover:text-white hover:border-white/30 transition-colors">
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(post)}
                    disabled={deleting === post.id}
                    className="text-sm text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-40">
                    {deleting === post.id ? '…' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <GoogleConnection status={oauth} onChange={loadOauth} />
        <Diagnostics />
      </main>
    </AdminGate>
  );
};

export default AdminDashboard;
