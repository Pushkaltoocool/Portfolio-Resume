# Portfolio — Setup & Run

A React + Vite portfolio with two backed features served by Vercel serverless
functions in `/api`:

- **Dev Log (blog)** — Firebase Firestore storage, a Tiptap rich-text editor,
  image hosting via imgbb, passcode-gated admin.
- **Book a call** — live free/busy from Google Calendar, creates a real event on
  booking, optional confirmation emails via EmailJS.

---

## Run it locally

```bash
cd react-app
npm install
npm run dev
```

- App: <http://localhost:5173>
- `npm run dev` runs **two** processes via `concurrently`:
  - `vite` — the frontend on :5173
  - `node scripts/dev-api.mjs` — a local stand-in for the Vercel functions on
    :8787. Vite proxies `/api/*` to it (see `vite.config.js`).
- `npm run dev:web` / `npm run dev:api` run them individually.
- `npm run build` → production bundle in `dist/`. `npm run lint` → ESLint.

Routes:

| Route | What |
| --- | --- |
| `/` | Portfolio home |
| `/blog` | Public dev log |
| `/blog/:slug` | A published post |
| `/blog/admin` | Admin dashboard (passcode) |
| `/blog/admin/new`, `/blog/admin/edit/:id` | Editor |
| `/book` | Booking page |

---

## Environment variables

Copy `.env.example` → `.env` and fill it in. On Vercel, add the same keys under
**Project Settings → Environment Variables**.

| Var | Used by | Notes |
| --- | --- | --- |
| `ADMIN_SECRET` | blog admin | The passcode you type at `/blog/admin`. Make it long and random. |
| `GOOGLE_APPLICATION_CREDENTIALS` | Firestore + Calendar | **Local:** path to the service-account JSON file. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Firestore + Calendar | **Vercel:** paste the full JSON string here instead (there is no file on Vercel). |
| `IMGBB_API_KEY` | image uploads | From <https://api.imgbb.com>. |
| `EMAILJS_SERVICE_ID` / `EMAILJS_PUBLIC_KEY` / `EMAILJS_PRIVATE_KEY` / `EMAILJS_BOOKING_TEMPLATE_ID` | booking emails | Optional. Without a template id, booking still works — the guest just uses the "Add to Google Calendar" button instead of getting an email. |
| `OWNER_NAME` / `OWNER_EMAIL` | booking | Shown in invites; owner gets a notification email. |
| `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET` | booking invites | OAuth client so confirmed bookings send guests a real Google invite. See "Google OAuth" below. |
| `GOOGLE_OAUTH_REDIRECT_URI` | booking invites | Must exactly match a redirect registered on the OAuth client, e.g. `http://localhost:5173/api/oauth/callback` (dev) or `https://yourdomain/api/oauth/callback` (prod). |
| `SITE_URL` | emails | Public base URL used in notification email links (e.g. `https://yourdomain`). |
| `GOOGLE_CALENDAR_IDS` | booking | Comma-separated calendars to read free/busy from. |
| `BOOKING_CALENDAR_ID` | booking | Calendar the new event is written to. |
| `BOOKING_TIMEZONE` | booking | IANA tz, e.g. `Asia/Singapore`. |
| `BOOKING_START_HOUR` / `BOOKING_END_HOUR` | booking | Daily bookable window in owner tz (24h). For "any hour", use `0` / `24`. |
| `BOOKING_MIN_NOTICE_HOURS` | booking | Earliest a slot can be booked from now. |
| `BOOKING_MAX_DAYS_AHEAD` | booking | How far ahead the calendar shows. |

> **Never commit `.env` or the service-account JSON.** Both are already in
> `.gitignore`. If a key ever lands in a commit, rotate it immediately.

---

## Firebase (blog) — one-time setup

1. Create a Firebase project and enable **Firestore** (Native mode).
2. Project Settings → Service accounts → **Generate new private key**. Save the
   JSON somewhere outside version control and point `GOOGLE_APPLICATION_CREDENTIALS`
   at it (or paste it into `GOOGLE_SERVICE_ACCOUNT_JSON` on Vercel).
3. Posts are stored in the `blog_posts` collection. No client SDK and no
   security rules to write — all reads/writes go through the server functions,
   which use the Admin SDK and check `ADMIN_SECRET` for writes.

That's it — the blog is fully functional once the credentials resolve.

---

## Google Calendar (booking) — one-time setup

The service account authenticates through the **same** JSON as Firebase, but the
Calendar API is a separate Google Cloud service and calendars must be shared
explicitly.

1. **Enable the Calendar API** for the project:
   <https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=portfolio-resume-5c469>
   → **Enable**. (Wait a couple of minutes to propagate.)
2. **Share your calendar** with the service account:
   `firebase-adminsdk-fbsvc@portfolio-resume-5c469.iam.gserviceaccount.com`
   - Google Calendar → the calendar's **Settings and sharing** → *Share with
     specific people* → add that address.
   - The **booking** calendar (`BOOKING_CALENDAR_ID`) needs **"Make changes to
     events"**.
   - Any other read-only calendars in `GOOGLE_CALENDAR_IDS` need at least
     **"See free/busy"**.
3. Verify: go to `/blog/admin`, scroll to **Booking diagnostics**, click *Run
   check*. Every calendar should show a green ✓.

The service account is used only to **read free/busy** for the availability grid.
Creating the event and inviting the guest happens through OAuth (next section).

---

## How the booking (approval) flow works

Bookings are **requests**, not instant confirmations:

1. A visitor picks a slot and submits → a **pending** request is saved to Firestore
   (`bookings` collection). No calendar event yet; the guest is told it's pending.
2. You get a notification email (if EmailJS is set) and see it under **Booking
   requests** in `/blog/admin`.
3. You click **Confirm** or **Decline**:
   - **Confirm** → the event is created *as you* (via OAuth) with the guest as an
     attendee, so Google emails them a real invite (RSVP + auto-add).
   - **Decline** → the request is marked declined and the guest is emailed (with an
     optional note).

Confirm is disabled until Google OAuth is connected — that connection is what
sends the invite.

---

## Google OAuth (real guest invites) — one-time setup

A service account on a personal Gmail cannot invite attendees, so invites are sent
by acting **as you** via OAuth.

1. **Google Cloud Console → APIs & Services → OAuth consent screen**: choose
   *External*, fill the app name/email, add the scope
   `.../auth/calendar.events`, and add your own Google account under *Test users*
   (test mode is fine — no verification needed for just you).
2. **Credentials → Create credentials → OAuth client ID → Web application.**
   Add **Authorized redirect URIs**:
   - `http://localhost:5173/api/oauth/callback` (local dev)
   - `https://YOURDOMAIN/api/oauth/callback` (production)
3. Copy the **Client ID** and **Client secret** into `GOOGLE_OAUTH_CLIENT_ID` /
   `GOOGLE_OAUTH_CLIENT_SECRET`, and set `GOOGLE_OAUTH_REDIRECT_URI` to the matching
   URL for the environment.
4. Start the app, open `/blog/admin` → **Google Calendar invites** → **Connect
   Google**. Approve the consent screen. You'll bounce back with a green
   "connected". The refresh token is stored in Firestore, so it survives redeploys.

To move hosts, add that host's redirect URI in step 2 and reconnect once there.

---

## Deploy to Vercel

1. Import the repo; set the project root to `react-app`.
2. Framework preset: **Vite**. Build `npm run build`, output `dist`.
3. Add every env var from the table above. Use `GOOGLE_SERVICE_ACCOUNT_JSON`
   (full JSON string), **not** `GOOGLE_APPLICATION_CREDENTIALS`.
4. `/api/*` deploy automatically as serverless functions; `vercel.json` rewrites
   all other paths to `index.html` for client-side routing.

---

## Where things live

```
api/                     Vercel serverless functions
  _lib/                  google (calendar), firestore, emailjs, util helpers
  availability.js        GET free/busy + booking window
  book.js                POST create a booking
  calendars.js           GET admin diagnostics
  posts/index.js         GET list / POST create
  posts/[slug].js        GET / PUT / DELETE a post
  upload.js              POST image → imgbb proxy
scripts/dev-api.mjs      local emulator for the above
src/lib/                 api client, timezone math, image upload
src/pages/BookMe.jsx     booking UI
src/pages/blog/          index, post, admin dashboard, editor, admin gate
src/components/editor/    Tiptap rich-text editor + toolbar
```
