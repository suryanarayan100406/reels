---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - server/src/routes/auth.js
  - server/src/index.js
  - client/src/App.jsx
  - client/src/components/admin/Login.jsx
  - client/src/components/admin/RequireAdmin.jsx
autonomous: true
---

# Phase 6: Admin Panel UI - Plan 01 (Auth & Routing)

## Task 1: Auth Verify Endpoint
<read_first>
- server/src/routes/auth.js
</read_first>
<action>
1. Add a `GET /api/auth/verify` endpoint to `server/src/routes/auth.js`.
2. Use the `requireAuth` middleware.
3. If it passes middleware, return `res.json({ authenticated: true })`.
</action>
<acceptance_criteria>
- Endpoint returns 200 `{ authenticated: true }` if session exists.
- Returns 401 otherwise.
</acceptance_criteria>

## Task 2: RequireAdmin Wrapper Component
<read_first>
</read_first>
<action>
1. Create `client/src/components/admin/RequireAdmin.jsx`.
2. Component checks `/api/auth/verify` on mount using `fetch`.
3. While loading, show a loading indicator.
4. If 401, redirect to `/admin/login` using React Router's `Navigate`.
5. If 200, render `children`.
</action>
<acceptance_criteria>
- Unauthenticated users are redirected.
- Authenticated users see the children.
</acceptance_criteria>

## Task 3: Login Page UI
<read_first>
</read_first>
<action>
1. Create `client/src/components/admin/Login.jsx`.
2. Render a simple login form centered on screen with a password input and submit button.
3. On submit, `POST /api/auth/login` with `{ password }`.
4. If success, redirect to `/admin`.
5. If error, show styled error message (e.g., "Incorrect password").
</action>
<acceptance_criteria>
- Login form functions correctly and establishes session.
</acceptance_criteria>

## Task 4: Setup Client Routes
<read_first>
- client/src/App.jsx
</read_first>
<action>
1. Wrap `App` in React Router if not already done (import `BrowserRouter`, `Routes`, `Route`). Note: `main.jsx` usually holds `BrowserRouter`. Update `App.jsx` to use `Routes` and `Route`.
2. The public gallery should be at `Route path="/"`.
3. The admin login at `Route path="/admin/login"`.
4. The admin dashboard at `Route path="/admin"` wrapped in `<RequireAdmin>`. For now, render a placeholder `<div>Admin Dashboard</div>`.
</action>
<acceptance_criteria>
- Routing structure cleanly separates public and admin areas.
</acceptance_criteria>
