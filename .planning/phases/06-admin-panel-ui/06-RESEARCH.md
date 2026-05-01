# Phase 6: Admin Panel UI - Technical Research

**Goal:** Build the complete admin interface.

## Domain Analysis

### 1. Admin Authentication & Routing
- Frontend will use React Router.
- We need an `/admin/login` page that posts to `POST /api/auth/login`.
- If successful, the backend sets an HttpOnly cookie.
- The React app should check auth status via `GET /api/auth/verify`.
Wait, does `GET /api/auth/verify` exist? I need to check `server/src/routes/auth.js`.
(Assuming it doesn't, we might need to add it, or simply try fetching the admin dashboard endpoint and catch 401). Let's use a `GET /api/auth/verify` for a cleaner frontend routing experience.

### 2. Site Content Backend
- The `site_content` table has `key` and `value`.
- `GET /api/site_content` should return `{ hero_message: '...' }`.
- `POST /api/site_content` (protected) should accept `{ hero_message: '...' }` and UPSERT into the table.
- Default hero message: "A small collection of things that made me think of you."

### 3. Dashboard Structure
- We can combine the Reel Management (CRUD) and Reaction Dashboard into one unified table view for simplicity.
- Columns: Thumbnail, Note, IG URL, Reactions, Actions (Edit/Delete).
- A floating action button or top-level button "Add Reel" opens a modal or navigates to a form.

### 4. Admin API Endpoints Needed
- `GET /api/auth/verify` -> returns `{ authenticated: true }` or 401.
- `GET /api/site_content` -> public.
- `POST /api/site_content` -> protected.
