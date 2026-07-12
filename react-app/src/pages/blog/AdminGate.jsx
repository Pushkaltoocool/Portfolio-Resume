import { useCallback, useEffect, useState } from 'react';
import { api, getAdminToken, setAdminToken, clearAdminToken } from '../../lib/api.js';

// Wraps admin pages: asks for the passcode (ADMIN_SECRET) and verifies it
// against the API before rendering children.
const AdminGate = ({ children }) => {
  const [status, setStatus] = useState(getAdminToken() ? 'checking' : 'locked');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const verify = useCallback(async () => {
    try {
      await api('/api/posts?all=1', { admin: true });
      setStatus('open');
    } catch (e) {
      clearAdminToken();
      setError(e.status === 401 ? 'Wrong passcode.' : e.message);
      setStatus('locked');
    }
  }, []);

  useEffect(() => {
    if (status === 'checking') verify();
  }, [status, verify]);

  if (status === 'open') return children;

  if (status === 'checking') {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="font-mono text-white-500 animate-pulse">$ verifying credentials…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center c-space">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!code.trim()) return;
          setAdminToken(code.trim());
          setError('');
          setStatus('checking');
        }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-black-200/80 p-8">
        <p className="font-mono text-sm text-blue-300/80">$ sudo edit dev-log</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Admin access</h1>
        <label htmlFor="admin-code" className="mt-6 block text-sm text-white-600">
          Passcode
        </label>
        <input
          id="admin-code"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg bg-black/60 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-400/60"
        />
        {error && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-white text-black font-semibold py-3 hover:bg-white-800 transition-colors">
          Unlock
        </button>
      </form>
    </div>
  );
};

export default AdminGate;
