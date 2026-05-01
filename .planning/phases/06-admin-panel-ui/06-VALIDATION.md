# Phase 6: Admin Panel UI - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** admin-panel-ui

## 1. Goal Backward Verification
**Goal:** Build the complete admin interface — login page, reel management (add/edit/delete with forms), hero message editor, and reaction dashboard.

**Must-Haves for Goal to be True:**
1. Navigating to `/admin` without being logged in redirects to `/admin/login`.
2. Logging in with the correct password grants access to the dashboard.
3. The dashboard displays a table of all reels with their reaction counts (ADMN-09).
4. The dashboard has an interface to add a new reel (URL + note) (ADMN-03, ADMN-06).
5. The dashboard has an interface to edit a reel (ADMN-07) and delete a reel (ADMN-08).
6. The dashboard has an interface to edit the site hero message (ADMN-10).

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **ADMN-01** (Login) | Visit `/admin/login`, enter correct password, verify redirection to `/admin`. |
| **ADMN-02** (Protected routes) | Visit `/admin` in Incognito mode, verify redirection to login. |
| **ADMN-03** (Add URL) | Add a valid IG Reel URL via the form and verify it appears in the table. |
| **ADMN-06** (Personal note) | Add text with line breaks in the note field, verify it renders correctly in gallery. |
| **ADMN-07** (Edit reel) | Click 'Edit' on a reel, modify the note, save, and verify the change in the table. |
| **ADMN-08** (Delete reel) | Click 'Delete' on a reel, confirm, and verify it disappears from the table. |
| **ADMN-09** (Reaction stats) | Verify the table displays a "Reactions" column populated from `/api/reels/stats/reactions`. |
| **ADMN-10** (Edit hero) | Update the hero message via the admin form, then verify the change on the public homepage. |

## 3. Test Infrastructure
- Add backend tests for `/api/auth/verify` and `/api/site_content`.
- Manual QA of the admin flow (Login -> Add -> Edit -> Delete -> Check public gallery).
