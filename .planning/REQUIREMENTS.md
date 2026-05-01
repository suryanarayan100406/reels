# Requirements: If You Ever Wondered

**Defined:** 2026-05-02
**Core Value:** She opens a link and immediately feels warmth — every reel she sees was personally chosen for her, with a note that says why.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Hero & Landing

- [ ] **HERO-01**: Visitor sees "If You Ever Wondered" as the page title with elegant typography
- [ ] **HERO-02**: Visitor sees an editable personal message below the title (curator can change via admin)
- [ ] **HERO-03**: Visitor sees "curated by Silent Admirer" branding in the hero section
- [ ] **HERO-04**: Page uses cat lover aesthetic — warm cream (#F5EFE6), dusty rose (#C9A0A0), terracotta (#C17F5C), charcoal (#2E2E2E) palette
- [ ] **HERO-05**: Page background has subtle paw print pattern or cat silhouette watermark (low opacity SVG)
- [ ] **HERO-06**: Browser tab shows "If You Ever Wondered" with cat-ear favicon
- [ ] **HERO-07**: Footer displays "Made with 🐾 for Mrs Mansu"
- [ ] **HERO-08**: Paw print decorative dividers between sections

### Admin Panel

- [ ] **ADMN-01**: Curator can log in with password to access the admin panel
- [ ] **ADMN-02**: Admin routes are protected — unauthenticated users are redirected to login
- [ ] **ADMN-03**: Curator can add a reel by pasting an Instagram reel URL
- [ ] **ADMN-04**: Backend validates the Instagram URL and fetches embed data via oEmbed API
- [ ] **ADMN-05**: Backend extracts thumbnail from Instagram page og:image meta tag
- [ ] **ADMN-06**: Curator can write a personal note for each reel (free-text, supports line breaks)
- [ ] **ADMN-07**: Curator can edit the personal note or URL of an existing reel
- [ ] **ADMN-08**: Curator can delete a reel from the collection
- [ ] **ADMN-09**: Curator can view which reels have been ❤️ reacted to (reaction dashboard)
- [ ] **ADMN-10**: Curator can edit the hero personal message from the admin panel

### Reel Gallery

- [ ] **REEL-01**: Visitor sees curated reels displayed in a card grid layout
- [ ] **REEL-02**: Grid is responsive — 1 column on mobile, 2 columns on tablet, 3 columns on desktop
- [ ] **REEL-03**: Each card shows the reel thumbnail image
- [ ] **REEL-04**: Each card shows a truncated personal note with "read more" indication
- [ ] **REEL-05**: Cards have rounded corners (2xl), soft shadows, no harsh borders
- [ ] **REEL-06**: Cards have hover effect — slight lift + soft warm glow (desktop)
- [ ] **REEL-07**: Clicking a card opens a lightbox/modal overlay
- [ ] **REEL-08**: Lightbox displays the reel via embedded Instagram player (plays inline)
- [ ] **REEL-09**: Lightbox shows the full personal note below the video with line breaks preserved
- [ ] **REEL-10**: Lightbox has dark overlay background with centered content
- [ ] **REEL-11**: Lightbox can be closed with ✕ button or clicking outside
- [ ] **REEL-12**: Reels are ordered by most recently added first

### Reaction System

- [ ] **REACT-01**: Visitor can tap a ❤️ button on any reel card
- [ ] **REACT-02**: Reaction is persisted server-side (survives page refresh)
- [ ] **REACT-03**: Visitor's reaction state is tracked via localStorage visitor ID
- [ ] **REACT-04**: Duplicate reactions from same visitor on same reel are prevented
- [ ] **REACT-05**: ❤️ button shows filled/unfilled state based on visitor's reaction status

### UX & Polish

- [ ] **UX-01**: Page is mobile-first — optimized for phone browsers (WhatsApp link opens)
- [ ] **UX-02**: Smooth fade-in animations on scroll as reel cards enter viewport
- [ ] **UX-03**: Loading state shows an animated cat icon while content loads
- [ ] **UX-04**: Empty state shows a cute cat illustration + "Nothing here yet... 🐱" when no reels exist
- [ ] **UX-05**: Error state shows a friendly cat-themed message if API calls fail
- [ ] **UX-06**: Page loads in under 3 seconds on mobile connection
- [ ] **UX-07**: Smooth scroll behavior throughout the page

### Infrastructure

- [ ] **INFRA-01**: Express backend proxies all Instagram API calls — access token never exposed to frontend
- [ ] **INFRA-02**: SQLite database stores reels, reactions, admin credentials, and site content
- [ ] **INFRA-03**: Instagram oEmbed API integration with Meta App Access Token
- [ ] **INFRA-04**: Admin password stored as bcrypt hash in database
- [ ] **INFRA-05**: .env.example file provided with all required environment variables documented
- [ ] **INFRA-06**: README.md with setup instructions including how to get Instagram oEmbed access
- [ ] **INFRA-07**: CORS configured for frontend-backend communication
- [ ] **INFRA-08**: Helmet security headers on all backend responses

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Curation

- **CURE-01**: Curator can reorder reels via drag-and-drop in admin panel
- **CURE-02**: Curator can tag reels with categories (funny, cats, aesthetic, etc.)
- **CURE-03**: Visitor can filter reels by category tags

### Social Features

- **SOCL-01**: Visitor can leave a short text reaction/comment on reels
- **SOCL-02**: Curator receives notification when visitor reacts

### Analytics

- **ANLY-01**: Admin dashboard shows visit count and most-viewed reels
- **ANLY-02**: Admin can see when visitor last visited the site

## Out of Scope

| Feature | Reason |
|---------|--------|
| Instagram home feed integration | API does not expose user's feed content — technically impossible |
| Instagram saved posts access | API does not expose saved collections |
| Like/comment counts from Instagram | She avoids social media — metrics would feel wrong |
| Infinite scroll | Replicates social media dopamine loops — against the design intent |
| User accounts / viewer login | Zero friction gift experience — no auth barriers |
| Search/filter functionality | Small curated collection doesn't need discovery tools |
| Share buttons | Private experience between two people |
| Push notifications | Intrusive for a gift site |
| Dark mode toggle | Single cohesive warm aesthetic — no choices needed |
| Photo carousel support | Reels/video only per user specification |
| Background music | User decided against it |
| Real-time notifications | One-way sharing experience |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-07 | Phase 1 | Pending |
| INFRA-08 | Phase 1 | Pending |
| ADMN-01 | Phase 1 | Pending |
| ADMN-02 | Phase 1 | Pending |
| ADMN-03 | Phase 2 | Pending |
| ADMN-04 | Phase 2 | Pending |
| ADMN-05 | Phase 2 | Pending |
| ADMN-06 | Phase 2 | Pending |
| ADMN-07 | Phase 2 | Pending |
| ADMN-08 | Phase 2 | Pending |
| INFRA-03 | Phase 2 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 3 | Pending |
| HERO-06 | Phase 3 | Pending |
| HERO-07 | Phase 3 | Pending |
| HERO-08 | Phase 3 | Pending |
| REEL-01 | Phase 4 | Pending |
| REEL-02 | Phase 4 | Pending |
| REEL-03 | Phase 4 | Pending |
| REEL-04 | Phase 4 | Pending |
| REEL-05 | Phase 4 | Pending |
| REEL-06 | Phase 4 | Pending |
| REEL-07 | Phase 4 | Pending |
| REEL-08 | Phase 4 | Pending |
| REEL-09 | Phase 4 | Pending |
| REEL-10 | Phase 4 | Pending |
| REEL-11 | Phase 4 | Pending |
| REEL-12 | Phase 4 | Pending |
| REACT-01 | Phase 5 | Pending |
| REACT-02 | Phase 5 | Pending |
| REACT-03 | Phase 5 | Pending |
| REACT-04 | Phase 5 | Pending |
| REACT-05 | Phase 5 | Pending |
| ADMN-09 | Phase 5 | Pending |
| ADMN-10 | Phase 6 | Pending |
| UX-01 | Phase 7 | Pending |
| UX-02 | Phase 7 | Pending |
| UX-03 | Phase 7 | Pending |
| UX-04 | Phase 7 | Pending |
| UX-05 | Phase 7 | Pending |
| UX-06 | Phase 7 | Pending |
| UX-07 | Phase 7 | Pending |
| INFRA-05 | Phase 7 | Pending |
| INFRA-06 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 39
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-02*
*Last updated: 2026-05-02 after initial definition*
