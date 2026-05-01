---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md"]
files_modified:
  - server/src/routes/reels.js
  - server/src/index.js
  - server/tests/reels.test.js
autonomous: true
---

# Phase 2: Reel CRUD & oEmbed Integration - Plan 02 (Wave 2: Routes)

## Task 1: Create Reels Router and CRUD Endpoints
<read_first>
- server/src/routes/reels.js
- server/src/index.js
</read_first>
<action>
1. Create `server/src/routes/reels.js`:
   - Import `express`, `db`, `requireAuth` from middleware, and `fetchOEmbedData`, `extractThumbnail` from `../services/instagram.js`.
   - GET `/` (Public): `SELECT * FROM reels ORDER BY created_at DESC`. Return rows.
   - POST `/` (Protected): Takes `{ instagram_url, personal_note }`.
     - Call `fetchOEmbedData` to get `embed_html`.
     - Call `extractThumbnail` to get `thumbnail_url`.
     - Insert into `reels` table. Return 201 with the inserted row. Catch UNIQUE constraint error and return 409 Conflict.
   - PUT `/:id` (Protected): Takes `{ instagram_url, personal_note }`.
     - If `instagram_url` changed, re-fetch `embed_html` and `thumbnail_url`.
     - Update row in `reels` table by `id`. Return 200 with updated row.
   - DELETE `/:id` (Protected): `DELETE FROM reels WHERE id = ?`. Return 200.
2. Update `server/src/index.js` to import `reelsRoutes` and mount via `app.use('/api/reels', reelsRoutes)`.
</action>
<acceptance_criteria>
- `server/src/routes/reels.js` contains `router.post('/', requireAuth`
- `server/src/routes/reels.js` contains `fetchOEmbedData`
- `server/src/index.js` contains `/api/reels`
</acceptance_criteria>

## Task 2: Create Integration Tests for Reels
<read_first>
- server/tests/reels.test.js
- server/src/routes/reels.js
</read_first>
<action>
Create `server/tests/reels.test.js` using Vitest and Supertest:
1. Mock the `instagram.js` service methods using `vi.mock('../src/services/instagram.js')` so they return fixed strings instead of making network calls.
2. `beforeAll`: Clear `reels` table. Create an admin session via login route (or mock middleware) to get an auth cookie.
3. Test GET `/api/reels`: Returns 200 and empty array.
4. Test POST `/api/reels` WITHOUT auth: Returns 401.
5. Test POST `/api/reels` WITH auth cookie and valid data: Returns 201 and the inserted reel object.
6. Test POST `/api/reels` with duplicate URL: Returns 409.
7. Test PUT `/api/reels/:id`: Returns 200 and updated data.
8. Test DELETE `/api/reels/:id`: Returns 200. Verify GET `/api/reels` is empty again.
</action>
<acceptance_criteria>
- `server/tests/reels.test.js` contains `vi.mock('../src/services/instagram.js')`
- `npm run test --prefix server -- server/tests/reels.test.js` passes
</acceptance_criteria>
