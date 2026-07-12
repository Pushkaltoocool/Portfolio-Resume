// Thin client for the serverless API + admin passcode storage.

const TOKEN_KEY = 'pv_admin_token';

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setAdminToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => localStorage.removeItem(TOKEN_KEY);

export async function api(path, { method = 'GET', body, admin = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (admin) headers['Authorization'] = `Bearer ${getAdminToken()}`;

  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body */
  }

  if (!res.ok || data.ok === false) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export function formatDate(iso, opts = {}) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-SG', { day: '2-digit', month: 'short', year: 'numeric', ...opts }).format(
    new Date(iso),
  );
}
