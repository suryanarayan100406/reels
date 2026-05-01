---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - server/src/index.js
  - server/src/routes/site.js
  - client/src/components/admin/HeroEditor.jsx
autonomous: true
---

# Phase 6: Admin Panel UI - Plan 02 (Site Content)

## Task 1: Site Content Backend Endpoints
<read_first>
- server/src/index.js
</read_first>
<action>
1. Create `server/src/routes/site.js`.
2. Add `GET /` (public) -> fetch all key/value pairs from `site_content` table and return as a JSON object (e.g., `{ hero_message: "..." }`).
3. Add `POST /` (protected by `requireAuth`) -> accepts `{ hero_message }`. UPSERT into `site_content`: 
   `INSERT INTO site_content (key, value) VALUES ('hero_message', ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP`
4. Mount `/api/site_content` to `siteRoutes` in `server/src/index.js`.
</action>
<acceptance_criteria>
- Frontend `Hero` component successfully fetches from this endpoint.
- Admin can save new messages securely.
</acceptance_criteria>

## Task 2: Hero Editor Component
<read_first>
</read_first>
<action>
1. Create `client/src/components/admin/HeroEditor.jsx`.
2. Fetches current message from `GET /api/site_content` on mount.
3. Renders a textarea and a Save button.
4. On save, sends `POST /api/site_content`. Shows success message.
</action>
<acceptance_criteria>
- Hero message can be updated via the UI.
</acceptance_criteria>
