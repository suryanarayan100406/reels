# Phase 5: Reaction System - Technical Research

**Goal:** Implement ❤️ reaction buttons on reel cards. Reactions persist server-side. Admin can view reaction dashboard.

## Domain Analysis

### Technical Challenges & Patterns

#### 1. Backend Route & DB Structure
- We already have a `reactions` table defined in `server/src/config/db.js`:
  ```sql
  CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reel_id INTEGER NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reel_id, visitor_id)
  );
  ```
- **Endpoints Needed:**
  - `POST /api/reels/:id/reactions` - Add or remove a reaction (toggle). Expects `{ visitor_id }` in body.
  - `GET /api/reels/:id/reactions/:visitor_id` - Check if a user reacted to a reel. Alternatively, the `GET /api/reels` endpoint could return reaction state, but passing `visitor_id` in a public GET header is cleaner.
  - **Optimized approach:** Modify `GET /api/reels` to accept an optional `?visitor_id=` query param. If provided, the backend joins the `reactions` table and adds `has_reacted: boolean` and `reaction_count: number` to each reel object. This prevents N+1 queries.

#### 2. Frontend State Management
- `visitorId`: A utility function will check `localStorage.getItem('visitor_id')`. If missing, it uses `crypto.randomUUID()` and saves it.
- **Optimistic UI Updates:** When the user clicks the heart, we immediately toggle the `has_reacted` state in the React component before waiting for the API response. If the API fails, we revert the state.

#### 3. Admin Requirements (ADMN-09)
- Since Phase 6 is entirely dedicated to the Admin Panel UI, we will only build the API endpoint `GET /api/admin/reactions` in this phase. This endpoint will return reaction counts grouped by reel, protected by the `requireAuth` middleware.

## Implementation Path
1. **Backend API:**
   - Update `GET /api/reels` to return `reaction_count` and `has_reacted` (if `visitor_id` query param is present).
   - Create `POST /api/reels/:id/react` to toggle a reaction.
   - Create `GET /api/admin/reactions` for ADMN-09.
2. **Frontend Logic:**
   - Create `client/src/utils/visitor.js` to manage the persistent visitor ID.
   - Update `Gallery.jsx` to pass the `visitor_id` to the fetch call.
3. **Frontend UI:**
   - Add the Heart button to `ReelCard.jsx`.
   - Implement optimistic UI toggling and the `POST` request on click.
