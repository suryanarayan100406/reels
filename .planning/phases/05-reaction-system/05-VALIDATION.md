# Phase 5: Reaction System - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** reaction-system

## 1. Goal Backward Verification
**Goal:** Implement ❤️ reaction buttons on reel cards. Reactions persist server-side. Admin can view reaction dashboard.

**Must-Haves for Goal to be True:**
1. A persistent UUID is generated and stored in `localStorage` for the visitor.
2. The `ReelCard` displays a heart button.
3. Clicking the heart toggles its visual state and sends a POST request to the backend.
4. Refreshing the page preserves the correct reaction state for the visitor.
5. The backend accurately prevents duplicate reactions (enforced by DB `UNIQUE` constraint).

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **REACT-01** (Tap heart) | Visually verify heart button on `ReelCard` and that it intercepts clicks properly (doesn't open lightbox). |
| **REACT-02** (Persisted server-side) | Check SQLite database `reactions` table after clicking. Refresh page to confirm state is fetched. |
| **REACT-03** (localStorage ID) | Open DevTools Application tab -> Local Storage -> verify `visitor_id` exists. |
| **REACT-04** (No duplicates) | Attempt to send concurrent POST requests or verify DB `UNIQUE` constraint blocks double inserts. |
| **REACT-05** (Filled/unfilled state) | Visual check: inactive is outline, active is filled terracotta. |
| **ADMN-09** (Admin dashboard stats) | Test the protected `GET /api/admin/reactions` endpoint via cURL/Supertest to ensure it returns aggregated stats. |

## 3. Test Infrastructure
- **Integration Tests:** Update or add tests in `server/tests/reels.test.js` (or a new file) to verify the `/react` endpoint and the modified `GET /api/reels` endpoint.
- **Frontend QA:** Click the heart, refresh the page, open in incognito (should be un-liked since `localStorage` is isolated), like it there. Check DB.
