# Phase 2: Reel CRUD & oEmbed Integration - Technical Research

**Goal:** Build the reel management API — admin can add reels via Instagram URL, backend fetches embed data and thumbnail, supports edit/delete operations.

## Domain Analysis

This phase connects our backend to Instagram's infrastructure and implements the core data management for the reels collection. It is purely backend/API focused.

### Requirement Mapping
- **ADMN-03**: POST `/api/reels` takes `{ instagram_url, personal_note }`
- **ADMN-04 / INFRA-03**: Backend calls Meta oEmbed API to get `html` (the embed code).
- **ADMN-05**: Backend fetches the `instagram_url` directly via HTTP GET and parses the HTML to extract `<meta property="og:image" content="...">` for the thumbnail.
- **ADMN-06**: Store `personal_note` in DB.
- **ADMN-07**: PUT `/api/reels/:id` updates note or URL (if URL changes, re-fetch oEmbed and thumbnail).
- **ADMN-08**: DELETE `/api/reels/:id` removes reel from DB.

### Technical Challenges & Patterns

#### 1. Instagram oEmbed API
The official way to embed Instagram content is the oEmbed API.
**Endpoint:** `https://graph.facebook.com/v19.0/instagram_oembed`
**Params:** `url={REEL_URL}&access_token={APP_ID}|{APP_SECRET}`
**Response:**
```json
{
  "version": "1.0",
  "html": "<blockquote class=\"instagram-media\" ...>...</blockquote>",
  "width": 400,
  "author_name": "...",
  "author_url": "..."
  // thumbnail_url is missing as of late 2025
}
```
**Important:** We need to provide `.env` vars for `META_APP_ID` and `META_APP_SECRET`. We will generate the App Access Token dynamically as `META_APP_ID|META_APP_SECRET`.

#### 2. Manual Thumbnail Extraction
Because `thumbnail_url` was removed from oEmbed responses, we must scrape the `og:image` from the Instagram URL directly.
**Approach:**
```javascript
const response = await fetch(instagramUrl);
const html = await response.text();
// Use a regex or lightweight HTML parser (like node-html-parser or cheerio)
// Cheerio is safest:
// const $ = cheerio.load(html);
// const thumbnailUrl = $('meta[property="og:image"]').attr('content');
```
We need to add `cheerio` as a production dependency for robust HTML parsing.

#### 3. Data Integrity & Validation
The `reels` table schema defined in Phase 1:
```sql
CREATE TABLE IF NOT EXISTS reels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instagram_url TEXT NOT NULL UNIQUE,
  embed_html TEXT,
  thumbnail_url TEXT,
  personal_note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- URL must be validated before inserting (must match `instagram.com/reel/`).
- If oEmbed fails, we should reject the addition (keeps our DB clean).
- The `updated_at` field should be managed via SQLite triggers or manually in the UPDATE query.

## Validation Architecture

1. **Authentication:** All CRUD routes must use the `requireAuth` middleware implemented in Phase 1 (except a public GET for the frontend).
2. **Service Layer Testing:** `oEmbed` fetch and thumbnail extraction should be testable without hitting the real API every time (mocking `fetch`).
3. **Endpoint Validation:**
   - POST `/api/reels`: Returns 201 Created and the reel object.
   - GET `/api/reels`: Returns 200 OK and array of reels (public route).
   - GET `/api/reels/:id`: Returns single reel.
   - PUT `/api/reels/:id`: Returns 200 OK and updated reel.
   - DELETE `/api/reels/:id`: Returns 200 OK.

## Implementation Path

1. **Dependency:** `npm install cheerio node-fetch` (if Node < 18, but Node 22 has global `fetch`. We will use native `fetch` and just install `cheerio`).
2. **Service:** Create `server/src/services/instagram.js` with `fetchOEmbedData(url)` and `extractThumbnail(url)` functions.
3. **Controller/Routes:** Create `server/src/routes/reels.js` and mount it to `/api/reels` in `index.js`.
4. **Middleware Validation:** Apply `requireAuth` to POST, PUT, DELETE. GET is public.
5. **Testing:** Stub out fetch in Vitest to test the service functions and supertest the API endpoints.

## Dependencies / Libraries
- `cheerio` (for `og:image` scraping)
- Native `fetch` (Node 22)

---
*Research completed.*
