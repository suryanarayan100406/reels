# Roadmap: If You Ever Wondered

**Created:** 2026-05-02
**Milestone:** v1.0 — Initial Release
**Phases:** 7
**Requirements:** 39

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Backend Foundation | 3/3 | Complete   | 2026-05-01 |
| 2 | Reel CRUD & oEmbed | Admin can add/edit/delete reels with Instagram integration | ADMN-03, ADMN-04, ADMN-05, ADMN-06, ADMN-07, ADMN-08, INFRA-03 | 4 |
| 3 | Frontend Foundation & Hero | React + Vite + TailwindCSS scaffold + hero/landing page | HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, HERO-07, HERO-08 | 4 |
| 4 | Reel Gallery & Lightbox | Public reel grid display + modal with embedded Instagram player | REEL-01, REEL-02, REEL-03, REEL-04, REEL-05, REEL-06, REEL-07, REEL-08, REEL-09, REEL-10, REEL-11, REEL-12 | 5 |
| 5 | Reaction System | ❤️ reactions on reels + admin reaction dashboard | REACT-01, REACT-02, REACT-03, REACT-04, REACT-05, ADMN-09 | 3 |
| 6 | Admin Panel UI | Full admin interface — reel management + hero editor + login | ADMN-10 | 3 |
| 7 | Polish & Deployment | Animations, loading/error/empty states, responsive tweaks, deployment config | UX-01, UX-02, UX-03, UX-04, UX-05, UX-06, UX-07, INFRA-05, INFRA-06 | 5 |

## Phase Details

### Phase 1: Backend Foundation
**Goal:** Set up Express server with SQLite database, admin authentication, and security hardening. This is the backbone everything else depends on.

**UI hint:** no

**Requirements:** INFRA-01, INFRA-02, INFRA-04, INFRA-07, INFRA-08, ADMN-01, ADMN-02

**Success Criteria:**
1. Express server starts and responds on configured port
2. SQLite database initializes with reels, reactions, admin, and site_content tables
3. Admin can log in with password (bcrypt-hashed) and receive a session cookie

**Depends on:** nothing

---

### Phase 2: Reel CRUD & oEmbed Integration
**Goal:** Build the reel management API — admin can add reels via Instagram URL, backend fetches embed data and thumbnail, supports edit/delete operations.

**UI hint:** no

**Requirements:** ADMN-03, ADMN-04, ADMN-05, ADMN-06, ADMN-07, ADMN-08, INFRA-03

**Success Criteria:**
1. POST /api/reels with Instagram URL returns embed HTML + extracted thumbnail
2. GET /api/reels returns list of all reels with thumbnails, notes, and timestamps
3. PUT /api/reels/:id updates reel note or URL (re-fetches embed data)
4. DELETE /api/reels/:id removes reel and associated reactions

**Depends on:** Phase 1

---

### Phase 3: Frontend Foundation & Hero
**Goal:** Scaffold React + Vite + TailwindCSS frontend with the cat lover design system and build the hero/landing section.

**UI hint:** yes

**Requirements:** HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, HERO-07, HERO-08

**Success Criteria:**
1. Vite dev server runs with TailwindCSS configured and Playfair Display + DM Sans fonts loaded
2. Hero section displays title, personal message (from API), and "curated by Silent Admirer" branding
3. Cat lover aesthetic applied — color palette, paw print background, cat-ear favicon, decorative dividers
4. Page is responsive and looks polished on mobile (375px width)

**Depends on:** Phase 1 (needs API for personal message)

---

### Phase 4: Reel Gallery & Lightbox
**Goal:** Display curated reels in a responsive card grid. Clicking a card opens a lightbox modal with embedded Instagram player and full personal note.

**UI hint:** yes

**Requirements:** REEL-01, REEL-02, REEL-03, REEL-04, REEL-05, REEL-06, REEL-07, REEL-08, REEL-09, REEL-10, REEL-11, REEL-12

**Success Criteria:**
1. Reel cards display in responsive grid (1/2/3 columns by breakpoint) with thumbnails and truncated notes
2. Cards have rounded corners, soft shadows, and hover lift effect
3. Clicking a card opens dark-overlay lightbox with embedded Instagram reel playing inline
4. Lightbox shows full personal note below video with preserved line breaks
5. Lightbox closes via ✕ button or clicking outside the modal

**Depends on:** Phase 2 (needs reel data API), Phase 3 (needs frontend scaffold)

---

### Phase 5: Reaction System
**Goal:** Implement ❤️ reaction buttons on reel cards. Reactions persist server-side. Admin can view reaction dashboard.

**UI hint:** yes

**Requirements:** REACT-01, REACT-02, REACT-03, REACT-04, REACT-05, ADMN-09

**Success Criteria:**
1. Each reel card has a ❤️ button that toggles filled/unfilled state on tap
2. Reactions are stored server-side with visitor fingerprint (localStorage ID)
3. Admin can see reaction counts per reel in the admin panel

**Depends on:** Phase 4 (needs reel cards to attach reactions to)

---

### Phase 6: Admin Panel UI
**Goal:** Build the complete admin interface — login page, reel management (add/edit/delete with forms), hero message editor, and reaction dashboard.

**UI hint:** yes

**Requirements:** ADMN-10

**Success Criteria:**
1. Admin login page with password field and styled error messages
2. Admin dashboard with reel list table (thumbnail, note preview, reaction count, edit/delete actions)
3. Add reel form with URL input + note textarea + live preview of fetched thumbnail

**Depends on:** Phase 2 (needs CRUD API), Phase 5 (needs reaction data)

---

### Phase 7: Polish & Deployment
**Goal:** Add animations, loading/error/empty states, final responsive tweaks, and deployment configuration.

**UI hint:** yes

**Requirements:** UX-01, UX-02, UX-03, UX-04, UX-05, UX-06, UX-07, INFRA-05, INFRA-06

**Success Criteria:**
1. Scroll fade-in animations on reel cards using Framer Motion
2. Animated cat loading state, empty state illustration, and cat-themed error state all render correctly
3. Page scores 90+ on Lighthouse mobile performance
4. .env.example and README.md with complete setup + deployment instructions are present
5. Site works correctly when accessed from mobile browser via direct URL

**Depends on:** Phase 6 (all features must be complete before polish)

---

*Roadmap created: 2026-05-02*
*Last updated: 2026-05-02 after initial creation*
