# Phase 6: Admin Panel UI - Context & Decisions

## Design & Architecture
- **Admin Layout:**
  - Route: `/admin` for dashboard, `/admin/login` for login.
  - Protected using a `RequireAdmin` wrapper that checks a `/api/auth/verify` endpoint (if available) or relies on API 401 responses.
  - Styling: The admin panel should remain simple, retaining the site's warm palette but with a more functional layout (e.g., standard table, distinct buttons).
- **Hero Editor:**
  - Need to create backend routes `GET /api/site_content` and `POST /api/site_content` to persist the hero message in the `site_content` table.
- **Reel Management:**
  - "Add Reel" form takes an Instagram URL and an optional Note. It calls the `POST /api/reels` endpoint.
  - Editing allows changing the URL or Note.
- **Reactions Dashboard:**
  - Display the stats returned from `GET /api/reels/stats/reactions`.
  - Can be a column in the main Reels table.
