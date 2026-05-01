---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md", "02-PLAN.md"]
files_modified:
  - client/src/components/admin/Dashboard.jsx
  - client/src/components/admin/ReelsTable.jsx
autonomous: true
---

# Phase 6: Admin Panel UI - Plan 03 (Dashboard & Reactions)

## Task 1: Admin Dashboard Layout
<read_first>
- client/src/App.jsx
</read_first>
<action>
1. Create `client/src/components/admin/Dashboard.jsx`.
2. Layout: A simple sidebar or top navigation with "Reels" and "Hero Content" tabs, and a "Logout" button.
3. Integrate the `HeroEditor` component (from Plan 02) into the "Hero Content" tab.
4. Update `client/src/App.jsx` to render `Dashboard` at the `/admin` route.
</action>
<acceptance_criteria>
- Admin can navigate between managing reels and the hero message.
</acceptance_criteria>

## Task 2: Reels Table Component
<read_first>
</read_first>
<action>
1. Create `client/src/components/admin/ReelsTable.jsx`.
2. Fetch data from `GET /api/reels/stats/reactions` on mount.
3. Render a table with columns: Thumbnail (from `instagram_url` or DB if available, wait the endpoint returns `instagram_url` and `personal_note`. We should update the backend `stats/reactions` endpoint to also return `thumbnail_url` so we can show it in the table). 
   - Actually, let's just fetch `GET /api/reels` which has all data, AND fetch `GET /api/reels/stats/reactions`, or update `GET /api/reels` to return reaction_count for admins too. Since Phase 5 updated `GET /api/reels` to return `reaction_count` by default! The stats endpoint might be redundant for the table, we can just use `GET /api/reels` and sort.
   - Wait, `GET /api/reels` is public and returns `reaction_count`. Let's use `fetch('/api/reels')`.
4. Table Columns: Thumbnail (img), Note (truncated), Reactions (number), Actions (Edit/Delete buttons - placeholders for now).
5. Integrate `ReelsTable` into the "Reels" tab of the Dashboard.
</action>
<acceptance_criteria>
- Admin sees a tabular overview of all reels and their reaction counts.
</acceptance_criteria>
