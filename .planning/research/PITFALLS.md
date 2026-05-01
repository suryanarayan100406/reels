# Pitfalls Research: If You Ever Wondered

## Critical Pitfalls

### 1. Instagram oEmbed Thumbnail Removal (HIGH RISK)
**What:** As of November 2025, Meta removed `thumbnail_url` from oEmbed API responses. If you rely on oEmbed for thumbnails, you'll get nothing.

**Warning Signs:** Empty thumbnail fields in API response. Cards showing broken images.

**Prevention:**
- Fetch the Instagram reel page HTML and extract the `og:image` meta tag as thumbnail
- Store thumbnail URL in database at reel-add time (not at render time)
- Have a fallback placeholder image if extraction fails

**Phase:** Should be addressed in the backend reel CRUD phase.

### 2. Instagram Embed Script in React (MEDIUM RISK)
**What:** Instagram embeds use a `<blockquote>` + external `embeds.js` script pattern. React strips `<script>` tags from `dangerouslySetInnerHTML`. The script must be manually loaded and `window.instgrm.Embeds.process()` called after render.

**Warning Signs:** Embed shows as plain text blockquote instead of iframe player. Script loads but doesn't process new embeds after React re-renders.

**Prevention:**
- Create a dedicated `InstagramEmbed` React component
- Use `useEffect` to load `embeds.js` script once globally
- Call `window.instgrm.Embeds.process()` after each modal open
- Set a `key` prop on the embed container to force re-render

**Phase:** Should be addressed in the lightbox modal phase.

### 3. Instagram Embed Rate Limits / Blocking (MEDIUM RISK)
**What:** Instagram embeds load content from Instagram's servers. If she watches many reels quickly, Instagram may throttle or temporarily block embed loading. Also, some reels may not be embeddable if the creator disabled embedding.

**Warning Signs:** Embeds showing "content unavailable" or spinning forever.

**Prevention:**
- Lazy-load embeds (only load when modal opens, not all at once)
- Show a fallback "Open on Instagram" link if embed fails
- When admin adds a reel, verify it's embeddable before saving
- Cache embed HTML in database to reduce API calls

**Phase:** Should be addressed in the lightbox modal and reel CRUD phases.

### 4. SQLite on Railway / Serverless Platforms (MEDIUM RISK)
**What:** SQLite writes to a file on disk. Serverless platforms (Vercel Functions) use ephemeral filesystems — your database gets wiped on each deployment. Railway supports persistent volumes but requires configuration.

**Warning Signs:** Data disappears after deployment. Database file not found errors.

**Prevention:**
- Use Railway (not Vercel) for the backend — it supports persistent volumes
- Configure a Railway volume mount for the SQLite file
- Include backup/export instructions in README
- Alternative: Use Turso (SQLite-compatible cloud database) if Railway volume is unreliable

**Phase:** Should be addressed in the deployment/infrastructure phase.

### 5. No Viewer Authentication = Reaction Spam (LOW RISK)
**What:** Since the viewer doesn't log in, reactions are tracked by a localStorage-based visitor ID. This can be spoofed, or she could clear her browser and re-react.

**Warning Signs:** Duplicate reactions from same person. Reaction counts seem inflated.

**Prevention:**
- Use a combination of localStorage ID + IP-based fingerprint
- Enforce UNIQUE(reel_id, visitor_id) constraint in database
- This is a gift for one person — over-engineering auth would hurt the UX
- Accept that reaction data is "best effort," not precise analytics

**Phase:** Should be addressed in the reaction system phase.

### 6. Mobile Instagram Embed Sizing (LOW RISK)
**What:** Instagram embeds have a fixed width and can overflow on small mobile screens. The iframe doesn't always respect the container's max-width.

**Warning Signs:** Horizontal scrollbar on mobile. Embed content cut off.

**Prevention:**
- Wrap embed in a container with `max-width: 100%` and `overflow: hidden`
- Use CSS to force the iframe to be responsive: `iframe { max-width: 100% !important; }`
- Test on actual mobile devices, not just browser dev tools

**Phase:** Should be addressed in the responsive design / polish phase.

### 7. Meta App Review for oEmbed (LOW RISK)
**What:** The Instagram oEmbed API requires a Meta App with "Meta oEmbed Read" permission. For personal use, you can use the app in development mode (up to ~25 users). No formal app review needed unless you scale.

**Warning Signs:** "Invalid OAuth access token" errors.

**Prevention:**
- Create a Meta App in development mode
- Generate an App Access Token (App ID|App Secret format)
- Store as environment variable
- Document the setup process clearly in README

**Phase:** Should be addressed in the backend foundation phase.

## Common Mistakes for This Domain

| Mistake | Why It's Tempting | Better Approach |
|---------|-------------------|-----------------|
| Using Instagram's API for feed content | Original spec asked for it | Accept API limitation, build manual curation |
| Over-engineering auth for a single viewer | Feels "insecure" without it | localStorage fingerprint is enough for a gift |
| Loading all embeds at once | Simpler code | Lazy-load in modal to avoid performance hit |
| Skipping mobile testing | Desktop development is easier | Test on actual phone early — she'll use mobile |
| Using a heavy database | "Professional" choice | SQLite is perfect for <1000 rows |
| Making it feel like Instagram | Familiar patterns | Deliberately different — cozy gallery, not social media |
