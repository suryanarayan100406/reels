# Phase 2: Reel CRUD & oEmbed Integration - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** reel-crud-oembed-integration

## 1. Goal Backward Verification
**Goal:** Build the reel management API — admin can add reels via Instagram URL, backend fetches embed data and thumbnail, supports edit/delete operations.

**Must-Haves for Goal to be True:**
1. Backend correctly integrates with Instagram oEmbed API using Meta App credentials.
2. Backend reliably extracts the thumbnail `og:image` from Instagram reel URLs.
3. `/api/reels` POST, PUT, DELETE endpoints are protected by authentication.
4. `/api/reels` GET returns the stored reels with thumbnails and HTML embed codes.
5. All database operations (insert, update, delete) work reliably and prevent duplicate URL insertions.

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **ADMN-03** (Add reel by URL) | Unit test POST `/api/reels` payload parsing and insertion |
| **ADMN-04** (Fetch oEmbed) | Unit test the Instagram service fetch logic (mocked) and integration test |
| **ADMN-05** (Extract thumbnail) | Unit test the HTML parser logic with mock Instagram HTML |
| **ADMN-06** (Personal note) | Verify personal note is saved and returned in GET responses |
| **ADMN-07** (Edit note/URL) | Unit test PUT `/api/reels/:id` and ensure oEmbed is re-fetched if URL changes |
| **ADMN-08** (Delete reel) | Unit test DELETE `/api/reels/:id` and ensure row is removed |
| **INFRA-03** (oEmbed integration) | Verify app access token format and API endpoint usage |

## 3. Test Infrastructure
- **Vitest:** Used for all tests.
- **Supertest:** Used for testing API endpoints.
- **Mocking:** `global.fetch` must be mocked in service tests to prevent live requests to Instagram during CI/test runs.
- **Test Database:** Tests run against the local SQLite database. Ensure tables are cleared in `beforeEach` hooks where appropriate.

## 4. Edge Cases & Constraints
1. **Invalid URL:** Reject non-Instagram URLs with 400 Bad Request.
2. **Instagram Private/Deleted Reel:** oEmbed API will return 400/404. Service must catch this and return a friendly error.
3. **No og:image:** If thumbnail extraction fails, save reel without thumbnail (null) rather than failing the whole insertion, or use a default.
4. **Unique Constraint:** Adding the same URL twice must be rejected with 409 Conflict.
5. **Missing .env variables:** If `META_APP_ID` is missing, service should log a warning or fail gracefully.
