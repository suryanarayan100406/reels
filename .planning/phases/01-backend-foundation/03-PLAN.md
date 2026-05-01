---
nyquist_compliant: true
wave: 2
depends_on: ["02-PLAN.md"]
files_modified:
  - server/src/middleware/auth.js
  - server/src/routes/auth.js
  - server/src/index.js
  - server/tests/auth.test.js
autonomous: true
---

# Phase 1: Backend Foundation - Plan 03 (Wave 2 Authentication)

## Task 1: Setup auth middleware and session store
<read_first>
- server/src/index.js
- server/src/config/db.js
- server/src/middleware/auth.js
</read_first>
<action>
1. In `server/src/index.js`, add session middleware BEFORE routes.
   - Import `express-session` and `better-sqlite3-session-store`.
   - Setup `SqliteStore = betterSqlite3SessionStore(session)`.
   - Add `app.use(session({ ... }))` with `secret: process.env.SESSION_SECRET || 'dev_secret'`, `resave: false`, `saveUninitialized: false`, and `store: new SqliteStore({ client: db, expired: { clear: true, intervalMs: 900000 } })`.
2. Create `server/src/middleware/auth.js` with a `requireAuth` middleware function:
   - Checks if `req.session.isAdmin` is true.
   - Returns 401 `{ error: 'Unauthorized' }` if false.
   - Calls `next()` if true.
</action>
<acceptance_criteria>
- `server/src/index.js` contains `better-sqlite3-session-store`
- `server/src/index.js` contains `app.use(session(`
- `server/src/middleware/auth.js` contains `req.session.isAdmin`
</acceptance_criteria>

## Task 2: Create Auth Routes and update tests
<read_first>
- server/src/routes/auth.js
- server/src/index.js
- server/src/config/db.js
- server/tests/auth.test.js
</read_first>
<action>
1. Create `server/src/routes/auth.js`:
   - POST `/api/auth/login`: Gets `password` from body. Fetches admin from DB. Uses `bcrypt.compare` with stored hash. If matches, sets `req.session.isAdmin = true`, returns 200. Else 401.
   - POST `/api/auth/logout`: Calls `req.session.destroy()`, returns 200.
   - GET `/api/auth/me`: Uses `requireAuth` middleware. Returns 200 `{ admin: true }`.
2. Update `server/src/index.js` to mount `app.use('/api/auth', authRoutes)`.
3. Update `server/tests/auth.test.js`:
   - Seed a test admin in DB with `bcrypt.hash('testpass', 10)`.
   - Test POST `/api/auth/login` with 'testpass' returns 200 and a `set-cookie` header.
   - Test GET `/api/auth/me` with cookie returns 200, without returns 401.
</action>
<acceptance_criteria>
- `server/src/routes/auth.js` contains `bcrypt.compare`
- `server/src/routes/auth.js` contains `req.session.destroy`
- `npm run test --prefix server -- server/tests/auth.test.js` passes
</acceptance_criteria>
