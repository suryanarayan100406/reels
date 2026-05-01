---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - server/src/routes/reels.js
  - server/tests/reels.test.js
autonomous: true
---

# Phase 5: Reaction System - Plan 01 (Backend API)

## Task 1: Update GET /reels Endpoint
<read_first>
- server/src/routes/reels.js
</read_first>
<action>
1. Modify `GET /api/reels` in `server/src/routes/reels.js`.
2. Extract `visitor_id` from `req.query`.
3. Update the SQL query to include reaction data. Example logic:
   ```javascript
   const stmt = db.prepare(`
     SELECT r.*, 
            COUNT(rx.id) as reaction_count,
            EXISTS(SELECT 1 FROM reactions WHERE reel_id = r.id AND visitor_id = ?) as has_reacted
     FROM reels r
     LEFT JOIN reactions rx ON r.id = rx.reel_id
     GROUP BY r.id
     ORDER BY r.created_at DESC
   `);
   const reels = stmt.all(visitor_id || null);
   // Format boolean
   reels.forEach(r => r.has_reacted = !!r.has_reacted);
   ```
</action>
<acceptance_criteria>
- `GET /api/reels` returns `reaction_count` and `has_reacted` fields.
- Avoids N+1 query problem by using JOIN and subquery/aggregation.
- Sorts by `created_at DESC`.
</acceptance_criteria>

## Task 2: Create POST /reels/:id/react Endpoint
<read_first>
- server/src/routes/reels.js
</read_first>
<action>
1. Add `POST /:id/react` route to `reels.js`. (No auth required, public endpoint).
2. Extract `visitor_id` from `req.body`. Validate it exists (return 400 if missing).
3. Validate `id` (reel ID) exists in database.
4. Logic: Toggle reaction.
   ```javascript
   const existing = db.prepare('SELECT id FROM reactions WHERE reel_id = ? AND visitor_id = ?').get(req.params.id, visitor_id);
   let action;
   if (existing) {
     db.prepare('DELETE FROM reactions WHERE id = ?').run(existing.id);
     action = 'removed';
   } else {
     db.prepare('INSERT INTO reactions (reel_id, visitor_id) VALUES (?, ?)').run(req.params.id, visitor_id);
     action = 'added';
   }
   res.json({ status: 'ok', action });
   ```
</action>
<acceptance_criteria>
- Toggles reaction state.
- Prevents duplicates (handled by logical check).
</acceptance_criteria>

## Task 3: Create Admin Stats Endpoint
<read_first>
- server/src/routes/reels.js
</read_first>
<action>
1. Add `GET /stats/reactions` to `reels.js`. Ensure it is protected by `requireAuth` middleware! Note: Mount it BEFORE `/:id` so it doesn't get captured by the ID param.
2. Logic: Return reaction counts per reel.
   ```javascript
   const stats = db.prepare(`
     SELECT r.id, r.instagram_url, r.personal_note, COUNT(rx.id) as reaction_count
     FROM reels r
     LEFT JOIN reactions rx ON r.id = rx.reel_id
     GROUP BY r.id
     ORDER BY reaction_count DESC
   `).all();
   res.json(stats);
   ```
</action>
<acceptance_criteria>
- Protected by `requireAuth`.
- Returns stats grouped by reel.
</acceptance_criteria>

## Task 4: Update Tests
<read_first>
- server/tests/reels.test.js
</read_first>
<action>
1. Add tests in `server/tests/reels.test.js`:
   - Test that `GET /api/reels` includes reaction fields.
   - Test `POST /api/reels/:id/react` adds a reaction.
   - Test `POST /api/reels/:id/react` again removes it (toggle).
</action>
<acceptance_criteria>
- Tests pass and verify the new behavior.
</acceptance_criteria>
