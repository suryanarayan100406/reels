---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - server/package.json
  - server/src/services/instagram.js
  - server/tests/instagram.test.js
autonomous: true
---

# Phase 2: Reel CRUD & oEmbed Integration - Plan 01 (Wave 1: Instagram Service)

## Task 1: Install cheerio and configure environment
<read_first>
- server/package.json
- server/.env.example
</read_first>
<action>
1. Add `cheerio` to `server/package.json` dependencies (or just install it via npm). Actually, write a script to install it, or just add `"cheerio": "^1.0.0-rc.12"` to `dependencies`. Since executor will run this, instruct it to run `npm install cheerio` in `server/`.
2. Add `META_APP_ID=` and `META_APP_SECRET=` to `server/.env.example`.
</action>
<acceptance_criteria>
- `server/package.json` contains `cheerio`
- `server/.env.example` contains `META_APP_ID=`
</acceptance_criteria>

## Task 2: Create Instagram service module
<read_first>
- server/src/services/instagram.js
</read_first>
<action>
Create `server/src/services/instagram.js` with two functions:
1. `fetchOEmbedData(url)`:
   - Validates the url contains `instagram.com/reel/`. Throws Error if invalid.
   - Requires `process.env.META_APP_ID` and `process.env.META_APP_SECRET`. Throws Error if missing.
   - Generates access token: `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`
   - Calls `https://graph.facebook.com/v19.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${accessToken}&omitscript=true`
   - Returns the JSON payload (specifically the `html` string).
2. `extractThumbnail(url)`:
   - Calls the `url` directly via native `fetch`.
   - Passes the text response to `cheerio.load(html)`.
   - Returns `$('*[property="og:image"]').attr('content')` or `$('meta[property="og:image"]').attr('content')`.
   - Returns null if not found.
Export both functions.
</action>
<acceptance_criteria>
- `server/src/services/instagram.js` contains `fetchOEmbedData` and `extractThumbnail`
- `server/src/services/instagram.js` contains `graph.facebook.com`
- `server/src/services/instagram.js` contains `cheerio.load`
</acceptance_criteria>

## Task 3: Create tests for Instagram service
<read_first>
- server/tests/instagram.test.js
</read_first>
<action>
Create `server/tests/instagram.test.js` using Vitest:
1. Mock `global.fetch` using `vi.spyOn(global, 'fetch')`.
2. Test `fetchOEmbedData` with valid URL: mock fetch to return JSON with `{ html: "<blockquote>...</blockquote>" }`. Verify it returns the HTML.
3. Test `fetchOEmbedData` with invalid URL (e.g. `youtube.com`): verify it throws an error.
4. Test `extractThumbnail`: mock fetch to return HTML string `<meta property="og:image" content="https://example.com/thumb.jpg" />`. Verify it returns `https://example.com/thumb.jpg`.
</action>
<acceptance_criteria>
- `server/tests/instagram.test.js` contains `vi.spyOn(global, 'fetch')`
- `npm run test --prefix server -- server/tests/instagram.test.js` passes
</acceptance_criteria>
